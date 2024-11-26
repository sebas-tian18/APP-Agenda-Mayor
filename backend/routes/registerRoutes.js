const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Registro de administradores 
router.post('/register/admin', usuariosController.crearAdmin);

// Registro de profesionales 
router.post('/register/profesional', usuariosController.crearProfesional);

module.exports = router;