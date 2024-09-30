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
        try {
            // Ejecuta la autenticacion asincrona
            const result = await authUsuario(correo, contrasena);
            // Si las credenciales son correctas
            if (result.success) {
                res.status(200).json({ message: result.message /*, token: result.token */ });
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

}
  module.exports = new UsuariosController();