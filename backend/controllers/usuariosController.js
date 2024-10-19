const db = require('../config/database');
const { crearUsuarioBD } = require('../services/usuariosService');
const { authUsuario } = require('../services/authService');

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

    async crearUsuario(req, res){
      //TODO: Mejorar codigos http
      try {
          const result = await crearUsuarioBD(req.body);
          res.status(201).json(result);
      } catch (error) {
          console.error('Error al crear usuario:', error.message); // Mostrar el error en consola
          res.status(500).json({ error: error.message }); // Mostrar el mensaje del error en la respuesta
      }
    }

    async authUsuario(req,res){
        const {correo,contrasena} = req.body;

        // Verificar que el correo y contrasena son validos
        if (!correo || !contrasena) {
          return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
        }

        try {
            // Ejecuta la autenticacion asincrona
            const result = await authUsuario(correo, contrasena);

            // Si las credenciales son correctas
            if (result.success) {
                // Enviar el token en la respuesta JSON (Bearer token)
                return res.status(200).json({ // Mostrar mensaje de exito
                    message: result.message,
                    token: result.token // Incluir el token en la respuesta
                });
            } else {
                res.status(401).json({ message: result.message }); // 401: No Autorizado
            }

        } catch (error) {
            res.status(500).json({ error: 'Error en la autenticación' });
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
            db.query('DELETE FROM usuario WHERE id_usuario = ?', [id],
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
        const { id } = req.params;
        try {
            const query = `
                SELECT 
                    u.id_usuario, u.rut, u.nombre_usuario, u.apellido_paterno, u.apellido_materno,
                    u.fecha_nacimiento, u.telefono, u.email, u.sexo, u.nacionalidad,
                    d.direccion, d.nombre_sector, d.tipo_domicilio, d.zona_rural,
                    am.edad, am.rsh_valido, am.problemas_movilidad
                FROM 
                    usuario u
                LEFT JOIN 
                    adulto_mayor am ON u.id_usuario = am.id_usuario
                LEFT JOIN 
                    direccion d ON am.id_direccion = d.id_direccion
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
    
                res.status(200).json(rows[0]); // Devolver los detalles del usuario encontrado
            });
    
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    
}
  module.exports = new UsuariosController();