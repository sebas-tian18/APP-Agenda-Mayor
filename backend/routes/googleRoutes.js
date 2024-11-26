const express = require('express');
const { oauth2Client, SCOPES } = require('../config/googleAuth');
const db = require('../config/database');
const { google } = require('googleapis');
const setGoogleCredentials = require('../middlewares/googleAuthMiddleware');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

// Endpoint para iniciar el flujo OAuth
router.get('/auth', verifyToken, (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Solicitar permisos offline para obtener el refresh_token
    scope: SCOPES, // Define los permisos necesarios
    state: req.user.id_usuario, // ID del usuario para vincular la cuenta
    prompt: 'consent', // Fuerza el consentimiento para recibir un refresh_token
    redirect_uri: 'http://localhost:3000/google/callback', // Debe coincidir con Google API Console
  });

  res.redirect(authUrl);
});

router.get('/auth-url', verifyToken, (req, res) => {
  try {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      state: req.user.id_usuario.toString(), // Usa el ID del usuario del token
    });

    res.json({ authUrl }); // Devuelve la URL al frontend
  } catch (error) {
    console.error("Error al generar la URL de autenticación:", error);
    res.status(500).json({ message: "Error interno al generar la URL de autenticación" });
  }
});

// Endpoint para verificar si hay una cuenta de Google vinculada
router.get('/check', verifyToken, async (req, res) => {
  const userId = req.user.id_usuario;

  try {
    // Realiza la consulta
    const [rows] = await db.promise().query('SELECT 1 FROM google_accounts WHERE id_usuario = ?', [userId]);

    if (rows.length > 0) {
      // Cuenta vinculada
      console.log("Cuenta de Google vinculada para el usuario:", userId);
      res.json({ vinculada: true });
    } else {
      // No hay cuenta vinculada
      console.log("No hay cuenta de Google vinculada para el usuario:", userId);
      res.json({ vinculada: false });
    }
  } catch (err) {
    // Error inesperado
    console.error('Error al verificar la cuenta de Google vinculada:', err);
    res.status(500).send('Error al verificar la cuenta de Google vinculada');
  }
});

// Endpoint para desvincular la cuenta de Google
router.post('/unlink', verifyToken, async (req, res) => {
  const userId = req.user.id_usuario;

  try {
    // Obtén los tokens desde la base de datos
    const [rows] = await db.promise().query(
      'SELECT refresh_token FROM google_accounts WHERE id_usuario = ?',
      [userId]
    );

    if (!rows.length) {
      return res.status(404).send('No hay cuenta de Google vinculada');
    }

    const { refresh_token } = rows[0];

    if (refresh_token) {
      // Revoca el token en Google
      const revokeUrl = `https://oauth2.googleapis.com/revoke?token=${refresh_token}`;
      const response = await fetch(revokeUrl, { method: 'POST' });

      if (!response.ok) {
        console.error(`Error al revocar el token de Google: ${response.statusText}`);
        return res.status(500).send('Error al revocar los permisos en Google');
      }

      console.log('Token revocado exitosamente en Google.');
    } else {
      console.log('No se encontró un refresh_token. Revocación omitida.');
    }

    // Elimina la entrada en la base de datos
    const query = 'DELETE FROM google_accounts WHERE id_usuario = ?';
    await db.promise().query(query, [userId]);

    res.send('Cuenta de Google desvinculada exitosamente');
  } catch (err) {
    console.error('Error al desvincular la cuenta de Google:', err);
    res.status(500).send('Error al desvincular la cuenta de Google');
  }
});

router.get('/callback', async (req, res) => {
  const { code, state } = req.query;

  if (!state) {
    return res.status(400).send('Falta el estado para identificar al usuario');
  }

  if (!code) {
    return res.status(400).send("Código de autorización no recibido.");
  }

  const userId = state;

  const connection = db.promise(); // Obtener conexión para la transacción
  try {
    // Iniciar la transacción
    await connection.beginTransaction();

    // Intercambiar el código de autorización por tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    console.log("Tokens recibidos de Google:", tokens);

    // Obtener información del perfil de usuario de Google
    const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
    const { data: profile } = await oauth2.userinfo.get();

    console.log("Perfil de Google:", profile);

    // Inserción en la base de datos
    const query = `
      INSERT INTO google_accounts (id_usuario, google_account_id, google_email, 
      refresh_token, access_token, token_expiry)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        access_token = VALUES(access_token),
        token_expiry = VALUES(token_expiry),
        updated_at = CURRENT_TIMESTAMP;
    `;
    await connection.query(query, [
      userId,
      profile.id,
      profile.email,
      tokens.refresh_token || null, // Manejar caso donde no haya refresh_token
      tokens.access_token,
      tokens.expiry_date ? new Date(tokens.expiry_date) : null, // Manejar caso sin expiry_date
    ]);

    // Confirmar la transacción
    await connection.commit();

    res.send('Autenticación completada con éxito. Puedes cerrar esta ventana.');
  } catch (error) {
    // Revertir los cambios si algo falla
    console.error("Error al procesar el callback de Google:", error);
    await connection.rollback();
    res.status(500).send("Error al procesar la autenticación de Google");
  } finally {
    // Liberar la conexión
    connection.release();
  }
});

// Endpoint para listar eventos de Google Calendar
router.get('/events', verifyToken, setGoogleCredentials, async (req, res) => {
  try {
    const calendar = google.calendar({ version: 'v3', auth: req.oauthClient });
    const events = await calendar.events.list({
      calendarId: 'primary',
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    res.json(events.data.items);
  } catch (err) {
    console.error('Error al obtener eventos:', err);
    res.status(500).send('Error al obtener eventos');
  }
});

// Endpoint para crear un evento de Google Calendar
router.post('/events', verifyToken, setGoogleCredentials, async (req, res) => {
  const calendar = google.calendar({ version: 'v3', auth: req.oauthClient });

  const event = {
    summary: req.body.summary,
    start: { dateTime: req.body.start },
    end: { dateTime: req.body.end },
  };

  try {
    const { data } = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    res.status(201).json(data);
  } catch (err) {
    console.error('Error al crear evento:', err);
    res.status(500).send('Error al crear evento');
  }
});

// Endpoint para exportar citas al Google Calendar
router.post('/export-citas', verifyToken, setGoogleCredentials, async (req, res) => {
  const userId = req.user.id_usuario;

  try {
    // Obtener el id_adulto_mayor vinculado al usuario
    const [userRow] = await db.promise().query(
      `SELECT am.id_adulto_mayor 
      FROM usuario u 
      LEFT JOIN adulto_mayor am ON u.id_usuario = am.id_usuario 
      WHERE u.id_usuario = ?`,
      [userId]
    );

    if (!userRow.length || !userRow[0].id_adulto_mayor) {
      return res.status(404).send('No se encontró un adulto mayor asociado a este usuario.');
    }

    const idAdultoMayor = userRow[0].id_adulto_mayor;

    // Obtén las citas asociadas al id_adulto_mayor
    const [citas] = await db.promise().query(
      `SELECT c.fecha, c.hora_inicio, c.hora_termino, 
      CONCAT(u.nombre_usuario, ' ', u.apellido_paterno, ' ', u.apellido_materno) AS nombre_profesional,
      s.nombre_servicio, esp.nombre_especialidad AS nombre_especialidad
      FROM cita c
      LEFT JOIN profesional p ON c.id_profesional = p.id_profesional
      LEFT JOIN usuario u ON p.id_usuario = u.id_usuario
      LEFT JOIN servicio s ON c.id_servicio = s.id_servicio
      LEFT JOIN especialidad esp ON s.id_especialidad = esp.id_especialidad
      WHERE c.id_adulto_mayor = ?`,
      [idAdultoMayor]
    );

    if (!citas.length) {
      return res.status(404).send('No hay citas disponibles para exportar.');
    }

    // Configura el cliente de Google Calendar
    const calendar = google.calendar({ version: 'v3', auth: req.oauthClient });

    // Resultados de la exportación
    const exportResults = [];


    const normalizeDate = (date) => {
      if (date instanceof Date) {
        // Extraer solo la parte de la fecha (YYYY-MM-DD)
        return date.toISOString().split('T')[0];
      }
      // Si ya es un string
      if (typeof date === 'string') {
        return date.split('T')[0];
      }
      throw new Error(`Formato de fecha inesperado: ${date}`);
    };

    // Itera sobre las citas y crea eventos en Google Calendar
    for (const cita of citas) {
      try {
        // Normalizar la fecha
        const fechaNormalizada = normalizeDate(cita.fecha);
    
        // Crear las combinaciones de fecha y hora
        const startDateTime = `${fechaNormalizada}T${cita.hora_inicio}`;
        const endDateTime = `${fechaNormalizada}T${cita.hora_termino}`;
    
        console.log('Fecha normalizada:', fechaNormalizada);
        console.log('Inicio:', startDateTime);
        console.log('Fin:', endDateTime);
    
        const event = {
          summary: `Cita médica: ${cita.nombre_servicio}`,
          start: {
            dateTime: startDateTime,
            timeZone: 'America/Santiago',
          },
          end: {
            dateTime: endDateTime,
            timeZone: 'America/Santiago',
          },
          description: `Servicio: ${cita.nombre_servicio}\nProfesional: ${cita.nombre_profesional}\nEspecialidad: ${cita.nombre_especialidad}`,
        };
    
        await calendar.events.insert({
          calendarId: 'primary',
          resource: event,
        });
    
        exportResults.push({
          id_cita: cita.id_cita,
          status: 'success',
          message: 'Evento creado exitosamente',
        });
      } catch (error) {
        console.error(`Error al procesar la cita: ${JSON.stringify(cita)}`, error.message);
        exportResults.push({
          id_cita: cita.id_cita,
          status: 'error',
          message: error.message,
        });
      }
    }
        
    res.status(200).json({
      message: 'Proceso de exportación completado',
      results: exportResults,
    });
  } catch (error) {
    console.error('Error al exportar citas a Google Calendar:', error);
    res.status(500).json({ message: 'Error al exportar citas a Google Calendar.', error: error.message });
  }
});

module.exports = router;
