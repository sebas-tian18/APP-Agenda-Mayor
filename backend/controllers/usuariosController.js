const db = require('../config/database');

class UsuariosController{
    constructor(){

    }

    consultarUsuarios(req, res){
        res.json({msg: 'Consulta de usuarios'});
    }

    crearUsuario(req, res){
        res.json({msg: 'Creación de usuario'});
    }

    consultarUsuario(req, res){
        const {id} = req.params;
        res.json({msg: `Consulta de usuario con id: ${id}`});
    }
    
    actualizarUsuario(req, res){
        res.json({msg: 'Actualización de usuario'});
    }

    eliminarUsuario(req, res){
        res.json({msg: 'Eliminación de usuario'});
    } 
  }

  module.exports = new UsuariosController();