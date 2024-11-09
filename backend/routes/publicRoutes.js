const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.post('/register', usuariosController.crearUsuario);
router.post('/login', usuariosController.authUsuario);

module.exports = router;