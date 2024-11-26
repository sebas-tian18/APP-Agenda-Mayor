const { oauth2Client } = require('../config/googleAuth');
const db = require('../config/database');

async function setGoogleCredentials(req, res, next) {
  // Verifica que req.user este configurado
  if (!req.user || !req.user.id_usuario) {
    return res.status(401).send('Usuario no autenticado');
  }

  const userId = req.user.id_usuario; // ID del usuario autenticado
  console.log("ID de usuario autenticado:", userId);

  try {
    // Consulta para obtener las credenciales
    const [rows] = await db.promise().query(
      'SELECT refresh_token, access_token, token_expiry FROM google_accounts WHERE id_usuario = ?',
      [userId]
    );

    if (!rows.length) {
      console.log("No hay cuenta de Google vinculada para el usuario:", userId);
      return res.status(401).send('No hay cuenta de Google vinculada');
    }

    const { refresh_token, access_token, token_expiry } = rows[0];

    // Verifica si el token expiro
    if (new Date() >= new Date(token_expiry)) {
      console.log("El token ha expirado. Intentando refrescar...");

      try {
        oauth2Client.setCredentials({ refresh_token });
        const { credentials } = await oauth2Client.refreshAccessToken();
        const newAccessToken = credentials.access_token;

         // timestamp directamente para crear la fecha
        const newExpiryDate = new Date(credentials.expiry_date);

        // Convierte la fecha al formato compatible
        const formattedExpiryDate = newExpiryDate.toISOString().slice(0, 19).replace('T', ' ');

        // Actualiza la base de datos
        await db.promise().query(
          'UPDATE google_accounts SET access_token = ?, token_expiry = ? WHERE id_usuario = ?',
          [newAccessToken, formattedExpiryDate, userId]
        );

        console.log("Token refrescado exitosamente");
        oauth2Client.setCredentials(credentials);
      } catch (refreshError) {
        console.error("Error al refrescar el token de Google:", refreshError);
        return res.status(500).send('Error al refrescar token de Google');
      }
    } else {
      console.log("El token aún es válido. Configurando credenciales...");
      oauth2Client.setCredentials({ access_token });
    }

    // Adjunta el cliente OAuth al request
    req.oauthClient = oauth2Client;
    next();
  } catch (dbError) {
    console.error("Error al consultar la base de datos para credenciales de Google:", dbError);
    return res.status(500).send('Error al acceder a las credenciales de Google');
  }
}

module.exports = setGoogleCredentials;