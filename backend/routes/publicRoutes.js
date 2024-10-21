const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.crearUsuario);
router.post('/login', authController.authUsuario);

module.exports = router;