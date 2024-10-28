const db = require('../config/database');

// Controlador que maneja las operaciones relacionadas a citas
class CitasController {
    constructor() {
    }

    async crearCita(req, res){

        const connection = db.promise(); // Usar promesas para las querys a la BD
        
        try{
            // Necesita id_profesional, id de adulto mayor es null
            const { id_profesional, fecha, hora_inicio, hora_termino, atencion_a_domicilio, 
                id_adulto_mayor, id_tipo_servicio } = req.body;

            // Iniciar transaccion
            await connection.beginTransaction();
    
            const id_estado = 1 ; // "Pendiente" por defecto
            const id_resolucion = 1; // "No realizado" por defecto
            const asistencia = 0; // No asiste por defecto

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

            // Retornar 200: Operacion Exitosa
            res.status(200).json({ message: 'Cita creada exitosamente', id_cita: result.insertId });
        } catch (err) {
            // Si ocurre error revertir transaccion
            await connection.rollback();
            // Mejorar errores
            res.status(500).send(err.message);
        }
    } 

    // Se muestran las citas junto a los datos de profesional, centro, direccion, tipo de servicio
    async consultarCitas(req, res){
        try{
            db.query(`
            SELECT 
                c.id_cita,
                c.fecha,
                c.hora_inicio,
                c.hora_termino,
                c.asistencia,
                c.atencion_a_domicilio,
                CONCAT(u.nombre_usuario, ' ', u.apellido_paterno, ' ', u.apellido_materno) AS nombre_profesional,
                CONCAT(a.nombre_usuario, ' ', a.apellido_paterno, ' ', a.apellido_materno) AS nombre_asistente,
                ts.nombre_servicio,
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
            LEFT JOIN servicio ts ON c.id_servicio = ts.id_servicio
            LEFT JOIN estado e ON c.id_estado = e.id_estado
            LEFT JOIN resolucion r ON c.id_resolucion = r.id_resolucion
            LEFT JOIN categoria cat ON ts.id_categoria = cat.id_categoria
            LEFT JOIN especialidad esp ON ts.id_especialidad = esp.id_especialidad
            LEFT JOIN centro_servicio cs ON ts.id_centro = cs.id_centro
            LEFT JOIN direccion d ON cs.id_direccion = d.id_direccion;`,
                (err, rows) => {
                    if(err){
                        res.status(400).send(err);
                    }
                    res.status(200).json(rows);
                });

        } catch (err) {
            res.status(500).send(err.message);
        }
    } 


    consultarCitasnotomadas(req, res) {
        const {id} = req.params;
        try {
            const query = `
                    SELECT 
                        c.id_cita,
                        c.fecha,
                        c.hora_inicio,
                        c.hora_termino,
                        c.asistencia,
                        c.atencion_a_domicilio,
                        CONCAT(u.nombre_usuario, ' ', u.apellido_paterno, ' ', u.apellido_materno) AS nombre_profesional,
                        ts.nombre_servicio,
                        e.nombre_estado,
                        r.nombre_resolucion,
                        cat.nombre_categoria AS nombre_categoria,
                        esp.nombre_especialidad AS nombre_especialidad
                    FROM cita c
                    LEFT JOIN profesional p ON c.id_profesional = p.id_profesional
                    LEFT JOIN usuario u ON p.id_usuario = u.id_usuario
                    LEFT JOIN adulto_mayor am ON c.id_adulto_mayor = am.id_adulto_mayor
                    LEFT JOIN usuario a ON am.id_usuario = a.id_usuario
                    LEFT JOIN servicio ts ON c.id_servicio = ts.id_servicio
                    LEFT JOIN estado e ON c.id_estado = e.id_estado
                    LEFT JOIN resolucion r ON c.id_resolucion = r.id_resolucion
                    LEFT JOIN categoria cat ON ts.id_categoria = cat.id_categoria
                    LEFT JOIN especialidad esp ON ts.id_especialidad = esp.id_especialidad
                    WHERE c.id_adulto_mayor IS NULL
                    AND esp.id_especialidad = ?;`;

            db.query(query,[id],(err, rows) => {
                if(err){
                    res.status(400).send(err);
                }
                res.status(200).json(rows);
            });
        } catch (error) {
            console.error('Error al consultar citas no tomadas:', error.message);
            res.status(500).json({ message: 'Error del servidor', error });
        }
    }


    async agendarCita(req, res) {

        const connection = db.promise(); // Usar promesas para las querys a la BD
        const { id } = req.params; // Obtener el id_cita desde los parámetros de la URL
        const { id_adulto_mayor } = req.body; // Obtener el id_adulto_mayor desde el cuerpo de la solicitud

        // Verificar que los parametros están presentes
        if (!id_adulto_mayor || !id) {
            return res.status(400).json({ message: 'Faltan datos requeridos para agendar la cita' });
        }

        try {
            await connection.beginTransaction();

            // Verificar si la cita ya ha sido tomada o si existe
            const [citaExistente] = await connection.query(
                'SELECT * FROM cita WHERE id_cita = ? AND id_adulto_mayor IS NULL', 
                [id]
            );

            if (citaExistente.length === 0) {
                await connection.rollback();  // Realizar el rollback
                return res.status(404).json({ message: 'La cita ya ha sido tomada o no existe' });
            }

            // Actualizar la cita asignando el id_adulto_mayor
            const [result] = await connection.query(
                'UPDATE cita SET id_adulto_mayor = ? WHERE id_cita = ?', 
                [id_adulto_mayor, id]
            );

            if (result.affectedRows > 0) {
                await connection.commit();  // Realizar el commit
                res.status(200).json({ message: 'Cita agendada con éxito' });
            } else {
                await connection.rollback();
                res.status(500).json({ message: 'No se pudo agendar la cita' });
            }
        } catch (error) {
            await connection.rollback();  // Si hay error hacer rollback
            console.error('Error al agendar cita:', error.message);
            res.status(500).json({ message: 'Error del servidor', error });
        }
    }
}
module.exports = new CitasController();