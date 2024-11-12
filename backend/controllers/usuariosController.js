const db = require('../config/database');
const errors = require('../utils/errors');
const { registrarAdultoMayor  } = require('../services/registerMayorService');
const { registrarAdmin } = require('../services/registerAdminService');
const { registrarProfesional } = require('../services/registerProfesService');
const { authUsuario } = require('../services/authService');

class UsuariosController{
    constructor(){

    }
    
    async crearUsuario(req, res){
        const result = await registrarAdultoMayor(req.body);
        res.status(201).json({
            success: true,
            ...result
        });
    }

    async crearAdmin(req, res){
        const result = await registrarAdmin(req.body);
        res.status(201).json({
            success: true,
            ...result
        });
    }

    async crearProfesional(req, res){
        const result = await registrarProfesional(req.body);
        res.status(201).json({
            success: true,
            ...result
        });
    }

    async authUsuario(req,res){
        const {correo,contrasena} = req.body;

        // Verificar que el correo y contrasena son validos
        if (!correo || !contrasena) {
            throw errors.BadRequestError('Correo y contraseña son requeridos');
        }

        // Ejecuta el servicio de autenticacion
        const result = await authUsuario(correo, contrasena);

        // Enviar respuesta en caso de exito
        return res.status(200).json({
            success: true,
            message: result.message,  // Mensaje de éxito
            token: result.token       // Token de autenticación
        });
    }

    async consultarUsuarios(req, res){
        const [rows] = await db.promise().query('SELECT * FROM usuario');
        res.status(200).json(rows);
    }

    async consultarUsuario(req, res){
        const {id} = req.params;
        const [rows] = await db.promise().query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);

        if (rows.length === 0) {
            throw errors.NotFoundError('Usuario no encontrado');
        }

        res.status(200).json(rows[0]);
    }
    
    async actualizarUsuario(req, res){
        res.json({msg: 'Actualización de usuario'});
    }

    async eliminarUsuario(req, res){
        const {id} = req.params;
        const [result] = await db.promise().query('DELETE FROM usuario WHERE id_usuario = ?', [id]);

        if (result.affectedRows === 0) {
            throw errors.NotFoundError('Usuario no encontrado');
        }

        res.status(200).json({ message: 'Usuario eliminado' });
    }

    async probarLogin(req, res){
        res.status(200).json({ message: 'Bienvenido, Adulto Mayor' })
    }

    async consultarCitasPorUsuario(req, res) {
        const { id } = req.params; // 'id' es el id_usuario
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
                u.id_usuario = ?`;

        const [rows] = await db.promise().query(query, [id]);

        if (rows.length === 0) {
            throw errors.NotFoundError('Usuario no encontrado');
        }

        res.status(200).json(rows);
    }
}
  module.exports = new UsuariosController();