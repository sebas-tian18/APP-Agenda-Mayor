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

    crearUsuario(req, res){
        try {
            const {rut, nombre_usuario, apellido_paterno, apellido_materno, fecha_nacimiento, 
                telefono, email, password_hash, sexo, nacionalidad} = req.body;
            db.query(`INSERT INTO usuario 
                (id_usuario, rut, nombre_usuario, apellido_paterno, apellido_materno, fecha_nacimiento, 
                telefono, email, password_hash, sexo, nacionalidad) VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, 
            [rut, nombre_usuario, apellido_paterno, apellido_materno, fecha_nacimiento, 
                telefono, email, password_hash, sexo, nacionalidad], (err, rows) => {
                    if(err){
                        res.status(400).send(err);
                    }
                    res.status(201).json({id_usuario:rows.insertId});
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
        res.json({msg: 'Eliminación de usuario'});
    } 
  }

  module.exports = new UsuariosController();