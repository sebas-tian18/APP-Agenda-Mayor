const db = require('../config/database');
const errors = require('../utils/errors');

// Controlador que maneja las operaciones relacionadas a citas
class CitasController {
    constructor() {
    }

    async crearCita(req, res){
        const connection = db.promise(); // Usar promesas para las querys a la BD
        
        try{
            // Necesita id_profesional, id de adulto mayor es null
            const { id_profesional, fecha, hora_inicio, hora_termino, atencion_a_domicilio, 
                id_adulto_mayor, id_servicio } = req.body;

            // Iniciar transaccion
            await connection.beginTransaction();

            // Constantes
            const id_estado = 1 ;    // "Pendiente" por defecto
            const id_resolucion = 1; // "No realizado" por defecto
            const asistencia = 0;    // No asiste por defecto

            // Insertar en la tabla `cita`
            const [result] = await connection.query(`
                INSERT INTO cita 
                  (id_cita, id_profesional, id_estado, id_resolucion, fecha, hora_inicio, hora_termino, 
                  asistencia, atencion_a_domicilio, id_adulto_mayor, id_servicio)
                VALUES 
                  (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                [ id_profesional, id_estado, id_resolucion, fecha, hora_inicio, hora_termino, 
                  asistencia, atencion_a_domicilio, id_adulto_mayor, id_servicio ]);

            // Confirmar la transaccion
            await connection.commit();
            res.status(201).json({ 
                message: 'Cita creada exitosamente', 
                id_cita: result.insertId 
            });
        } catch (err) {
            // Si ocurre error revertir transaccion
            await connection.rollback();
            throw error;
        }
    } 

    // Se muestran las citas junto a los datos de profesional, centro, direccion, tipo de servicio
    async consultarCitas(req, res){
        const [rows] = await db.promise().query(`
            SELECT 
                c.id_cita,
                c.fecha,
                c.hora_inicio,
                c.hora_termino,
                c.asistencia,
                c.atencion_a_domicilio,
                CONCAT(u.nombre_usuario, ' ', u.apellido_paterno, ' ', u.apellido_materno) AS nombre_profesional,
                CONCAT(a.nombre_usuario, ' ', a.apellido_paterno, ' ', a.apellido_materno) AS nombre_asistente,
                s.nombre_servicio,
                e.nombre_estado,
                r.nombre_resolucion,
                cat.nombre_categoria AS nombre_categoria,
                esp.nombre_especialidad AS nombre_especialidad,
                cs.nombre_centro AS nombre_centro,
                CONCAT(d.calle, ' ', d.numero, ', ', d.nombre_sector) AS direccion_centro
            FROM cita c
            LEFT JOIN profesional p ON c.id_profesional = p.id_profesional
            LEFT JOIN usuario u ON p.id_usuario = u.id_usuario
            LEFT JOIN adulto_mayor am ON c.id_adulto_mayor = am.id_adulto_mayor
            LEFT JOIN usuario a ON am.id_usuario = a.id_usuario
            LEFT JOIN servicio s ON c.id_servicio = s.id_servicio
            LEFT JOIN estado e ON c.id_estado = e.id_estado
            LEFT JOIN resolucion r ON c.id_resolucion = r.id_resolucion
            LEFT JOIN categoria cat ON s.id_categoria = cat.id_categoria
            LEFT JOIN especialidad esp ON s.id_especialidad = esp.id_especialidad
            LEFT JOIN centro_servicio cs ON s.id_centro = cs.id_centro
            LEFT JOIN direccion d ON cs.id_direccion = d.id_direccion;`
        );
        res.status(200).json({
            success: true,
            message: 'Lista de citas obtenida exitosamente',
            data: rows
        });
    } 

    async consultarCitasnotomadas(req, res) {
        const { id } = req.params;
        const [rows] = await db.promise().query(`
            SELECT 
                c.id_cita,
                c.fecha,
                c.hora_inicio,
                c.hora_termino,
                c.asistencia,
                c.atencion_a_domicilio,
                CONCAT(u.nombre_usuario, ' ', u.apellido_paterno, ' ', u.apellido_materno) AS nombre_profesional,
                s.nombre_servicio,
                e.nombre_estado,
                r.nombre_resolucion,
                cat.nombre_categoria AS nombre_categoria,
                esp.nombre_especialidad AS nombre_especialidad
            FROM cita c
            LEFT JOIN profesional p ON c.id_profesional = p.id_profesional
            LEFT JOIN usuario u ON p.id_usuario = u.id_usuario
            LEFT JOIN adulto_mayor am ON c.id_adulto_mayor = am.id_adulto_mayor
            LEFT JOIN usuario a ON am.id_usuario = a.id_usuario
            LEFT JOIN servicio s ON c.id_servicio = s.id_servicio
            LEFT JOIN estado e ON c.id_estado = e.id_estado
            LEFT JOIN resolucion r ON c.id_resolucion = r.id_resolucion
            LEFT JOIN categoria cat ON s.id_categoria = cat.id_categoria
            LEFT JOIN especialidad esp ON s.id_especialidad = esp.id_especialidad
            WHERE c.id_adulto_mayor IS NULL
            AND esp.id_especialidad = ?;`,
            [id]
        );
    
        if (rows.length === 0) {
            throw errors.NotFoundError(`No se encontraron citas no tomadas para la especialidad`);
        }
        res.status(200).json({
            success: true,
            message: 'Lista de citas disponibles obtenida exitosamente',
            data: rows
        });
    }

    async consultarEspecialidadesDisponibles(req, res){
        const [rows] = await db.promise().query(`
            SELECT DISTINCT e.id_especialidad, e.nombre_especialidad
            FROM cita c
            LEFT JOIN servicio s ON c.id_servicio = s.id_servicio
            LEFT JOIN especialidad e ON s.id_especialidad = e.id_especialidad
            WHERE c.id_adulto_mayor IS NULL;`
        );
        res.status(200).json({
            success: true,
            message: 'Lista de especialidades disponibles obtenida exitosamente',
            data: rows
        });
    } 
    

    async CitasProfesional(req, res) {
        const { id } = req.params; // 'id' es el id_usuario del profesional
    
        try {
            const query = `
                SELECT * FROM cita WHERE id_profesional = ?`;
    
            const [rows] = await db.promise().query(query, [id]);
    
            if (rows.length === 0) {
                return res.status(404).json({ message: 'No se encontraron citas para este profesional' });
            }
    
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error al consultar citas para el profesional:', error.message);
            res.status(500).json({ message: 'Error al consultar citas para el profesional', error: error.message });
        }
    }
    

    async agendarCita(req, res) {
        const connection = db.promise(); // Usar promesas para las querys a la BD

        const { id } = req.params; // Obtener el id_cita desde los parametros de la URL
        const { id_usuario } = req.body; // Obtener el id_adulto_mayor desde el cuerpo de la solicitud

        if (!id_usuario || !id) {
            throw errors.BadRequestError('Faltan datos requeridos para agendar cita');
        }

        try {
            await connection.beginTransaction();

            // Obtener id_adulto_mayor
            const [rows] = await connection.query(`
                SELECT am.id_adulto_mayor 
                FROM usuario u
                JOIN adulto_mayor am ON u.id_usuario = am.id_usuario 
                WHERE u.id_usuario = ?;`, 
                [id_usuario]
            );

            const id_adulto_mayor = rows[0].id_adulto_mayor;

            if (!id_adulto_mayor) {
                throw errors.ForbiddenError('El usuario no posee los permisos para agendar citas.');
            }

            // Verificar si la cita ya ha sido tomada o si existe
            const [citaExistente] = await connection.query(
                'SELECT * FROM cita WHERE id_cita = ? AND id_adulto_mayor IS NULL', 
                [id]
            );

            if (citaExistente.length === 0) {
                throw errors.NotFoundError('La cita ya ha sido tomada o no existe'); // 404
            }

            // Actualizar la cita asignando el id_adulto_mayor
            const [result] = await connection.query(
                'UPDATE cita SET id_adulto_mayor = ? WHERE id_cita = ?', 
                [id_adulto_mayor, id]
            );

            if (result.affectedRows > 0) {
                // Realizar el commit
                await connection.commit();
                res.status(200).json({
                    success: true,
                    message: 'Cita agendada con éxito'
                });
            } else {
                throw errors.InternalServerError('No se pudo agendar la cita'); // 500
            }
        } catch (error) {
            await connection.rollback();  // Si hay error hacer rollback
            throw error;
        }
    }
}
module.exports = new CitasController();