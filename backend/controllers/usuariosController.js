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
                // Configurar las opciones de la cookie
                res.cookie('token', result.token, {
                    // La cookie no puede ser accedida mediante JS en el cliente
                    httpOnly: true,
                    // En produccion true en desarrollo false. Necesita certificado para HTTPS
                    secure: process.env.NODE_ENV === 'production',
                    // En produccion 'strict' en desarrollo 'none'. Protege contra ataques CSRF
                    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'none',
                    // Expira en 1 hora
                    maxAge: 3600000
                });
                // Mostrar mensaje de exito
                res.status(200).json({ message: result.message});
            } else {
                res.status(401).json({ message: result.message });
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
}
  module.exports = new UsuariosController();