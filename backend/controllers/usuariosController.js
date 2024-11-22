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
        const {credencial, contrasena} = req.body;

        // Verificar que el correo y contrasena son validos
        if (!credencial || !contrasena) {
            throw errors.BadRequestError('Correo o RUT y contraseña son requeridos');
        }

        // Ejecuta el servicio de autenticacion
        const result = await authUsuario(credencial, contrasena);

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


    async getUserList(req, res) {
        try {
            const query = `
            SELECT 
                u.id_usuario AS id,
                u.nombre_usuario AS nombreUsuario,
                u.apellido_paterno AS apellidoPaterno,
                u.apellido_materno AS apellidoMaterno,
                u.rut,
                r.nombre_rol AS tipo,
                c.nombre_cargo AS nombreCargo
            FROM usuario u
            LEFT JOIN rol r ON u.id_rol = r.id_rol
            LEFT JOIN administrador a ON u.id_usuario = a.id_usuario
            LEFT JOIN cargo c ON a.id_cargo = c.id_cargo;
            `;
            const [users] = await db.promise().query(query);
            res.status(200).json(users);
        } catch (error) {
            console.error('Error al ejecutar el query:', error.message);
            res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
          }
    };



    async consultarUsuario(req, res){
        const {id} = req.params;
        const [rows] = await db.promise().query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);

        if (rows.length === 0) {
            throw errors.NotFoundError('Usuario no encontrado');
        }

        res.status(200).json(rows[0]);
    }
    
    async actualizarUsuario(req, res) {
        const {id_usuario} = req.params.id; // ID del usuario a actualizar
        const {
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            rut,
            correo,
            telefono,
            sexo,
            nacionalidad
        } = req.body;
    
        const connection = db.promise();

        try {
            
            const [result] = await connection.query(`
                UPDATE usuario
                SET
                    nombre_usuario = ?,
                    apellido_paterno = ?,
                    apellido_materno = ?,
                    rut = ?,
                    email = ?,
                    telefono = ?,
                    sexo = ?,
                    nacionalidad = ?
                WHERE id_usuario = ?`,
                [nombre, apellidoPaterno, apellidoMaterno, rut, correo, telefono, sexo, nacionalidad, id_usuario]
            );

            if (result.affectedRows === 0) {
                throw errors.NotFoundError('Usuario no encontrado');
            }
            
    
            res.json({ msg: 'Usuario actualizado con éxito.' });
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).json({ msg: 'Error al actualizar el usuario.' });
        }
    }
    
    

    async deleteUser(req, res){
        const { id } = req.params;
      
        try {
          // 1. Obtener el tipo de usuario
          const [user] = await db.promise().query('SELECT id_rol FROM usuario WHERE id_usuario = ?', [id]);
      
          if (user.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
          }
      
          const userType = user[0].id_rol;
      
          // 2. Manejar eliminación de dependencias según el tipo de usuario
          if (userType === 3) {
            // Eliminar dependencias de adulto mayor
            await db.promise().query('DELETE FROM adultos_mayores_organizaciones WHERE id_adulto_mayor = (SELECT id_adulto_mayor FROM adulto_mayor WHERE id_usuario = ?)', [id]);
            await db.promise().query('DELETE FROM cita WHERE id_adulto_mayor = (SELECT id_adulto_mayor FROM adulto_mayor WHERE id_usuario = ?)', [id]);
            await db.promise().query('DELETE FROM adulto_mayor WHERE id_usuario = ?', [id]);
          } else if (userType === 2) {
            // Eliminar dependencias de profesional
            await db.promise().query('DELETE FROM profesionales_servicios WHERE id_profesional = (SELECT id_profesional FROM profesional WHERE id_usuario = ?)', [id]);
            await db.promise().query('DELETE FROM cita WHERE id_profesional = (SELECT id_profesional FROM profesional WHERE id_usuario = ?)', [id]);
            await db.promise().query('DELETE FROM profesional WHERE id_usuario = ?', [id]);
          } else if (userType === 1) {
            // Eliminar dependencias de administrador
            await db.promise().query('DELETE FROM administrador WHERE id_usuario = ?', [id]);
          }
      
          // 3. Eliminar el usuario
          const [result] = await db.promise().query('DELETE FROM usuario WHERE id_usuario = ?', [id]);
      
          if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
          }
      
          res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar usuario:', error.message);
          res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
        }
      };

      

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