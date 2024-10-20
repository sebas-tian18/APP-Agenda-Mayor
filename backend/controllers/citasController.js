const db = require('../config/database');

class CitasController {
    constructor() {
    }

    consultarCitas(req, res){
        try{
            db.query('SELECT * FROM cita', 
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
        try {
            db.query('SELECT * FROM cita WHERE id_adulto_mayor IS NULL',
            (err, rows) => {
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
        const { id_cita } = req.params; // ID de la cita que se va a agendar
        const { id_adulto_mayor } = req.body; // ID del adulto mayor que agenda la cita

        // Verificar que los parámetros están presentes
        if (!id_adulto_mayor || !id_cita) {
            return res.status(400).json({ message: 'Faltan datos requeridos para agendar la cita' });
        }

        try {
            // Verificar si la cita ya ha sido tomada
            const citaExistente = await db.query('SELECT * FROM cita WHERE id_cita = ? AND id_adulto_mayor IS NULL', [id_cita]);
            
            if (citaExistente.length === 0) {
                return res.status(404).json({ message: 'La cita ya ha sido tomada o no existe' });
            }

            // Actualizar la cita asignándole el id_adulto_mayor
            const result = await db.query('UPDATE cita SET id_adulto_mayor = ? WHERE id_cita = ?', [id_adulto_mayor, id_cita]);

            if (result.affectedRows > 0) {
                res.status(200).json({ message: 'Cita agendada con éxito' });
            } else {
                res.status(500).json({ message: 'No se pudo agendar la cita' });
            }
        } catch (error) {
            console.error('Error al agendar cita:', error.message);
            res.status(500).json({ message: 'Error del servidor', error });
        }
    }
}
module.exports = new CitasController();