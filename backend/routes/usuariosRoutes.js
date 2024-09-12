const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.consultarUsuarios);

router.post('/', usuariosController.crearUsuario);

router.route("/:id")
    .get(usuariosController.consultarUsuario)
    .put(usuariosController.actualizarUsuario)
    .delete(usuariosController.eliminarUsuario);

module.exports = router;
