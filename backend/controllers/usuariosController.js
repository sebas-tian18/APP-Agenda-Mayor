const db = require('../config/database');

class UsuariosController{
    constructor(){

    }

    consultarUsuarios(req, res){
        try{
            db.query('SELECT * FROM usuario', 
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

    consultarUsuario(req, res){
        const {id} = req.params;
        try{
            db.query('SELECT * FROM usuario WHERE id_usuario = ?', [id],
                (err, rows) => {
                    if(err){
                        res.status(400).send(err);
                    }
                    res.status(200).json(rows[0]);
                });

        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    
    actualizarUsuario(req, res){
        res.json({msg: 'Actualización de usuario'});
    }

    eliminarUsuario(req, res){
        const {id} = req.params;
        try{
            db.query(`
                DELETE 
                FROM usuario 
                WHERE id_usuario = ?`, [id],
                (err, rows) => {
                    if(err){
                        res.status(400).send(err);
                    }
                    if (rows.affectedRows == 1) {
                        res.status(200).json({ message: 'Usuario eliminado' });
                    }  
                })
        } catch (err) {
            res.status(500).send(err.message);            
        } 
    }
    probarLogin(req, res){
        res.status(200).json({ message: 'Bienvenido, Adulto Mayor' })
    }

    consultarDetallesUsuario(req, res) {
        const { id } = req.params; // 'id' es el id_usuario
        try {
            const query = `
                SELECT 
                    c.id_cita,
                    c.fecha,
                    c.hora_inicio,
                    c.hora_termino,
                    c.asistencia,
                    c.atencion_a_domicilio,
                    p.nombre_usuario AS nombre_profesional,
                    e.nombre_estado,
                    r.nombre_resolucion
                FROM 
                    cita c
                JOIN 
                    adulto_mayor am ON c.id_adulto_mayor = am.id_adulto_mayor
                JOIN 
                    usuario u ON am.id_usuario = u.id_usuario
                JOIN 
                    profesional pr ON c.id_profesional = pr.id_profesional
                JOIN 
                    usuario p ON pr.id_usuario = p.id_usuario
                JOIN 
                    estado e ON c.id_estado = e.id_estado
                JOIN 
                    resolucion r ON c.id_resolucion = r.id_resolucion
                WHERE 
                    u.id_usuario = ?
            `;
            
            db.query(query, [id], (err, rows) => {
                if (err) {
                    return res.status(400).send(err);
                }
    
                if (rows.length === 0) {
                    return res.status(404).json({ message: 'Usuario no encontrado' });
                }
    
                res.status(200).json(rows); // Devolver los detalles del usuario y sus citas
            });
        } catch (error) {
            res.status(500).json({ message: 'Error del servidor', error });
        }
    }
    

    
}
  module.exports = new UsuariosController();