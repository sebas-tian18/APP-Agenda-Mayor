const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registro de administradores 
router.post('/register/admin', authController.crearAdmin);

// Registro de profesionales 
router.post('/register/profesional', authController.crearProfesional);

module.exports = router;