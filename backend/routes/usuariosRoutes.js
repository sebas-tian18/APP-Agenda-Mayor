const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.consultarUsuarios);

router.get('/adultoMayor', verifyToken, usuariosController.probarLogin); // Usar middleware

router.get("/:id/citas", usuariosController.consultarCitasPorUsuario); // Citas de usuario

router.route("/:id")
    .get(usuariosController.consultarUsuario)
    .put(usuariosController.actualizarUsuario)
    .delete(usuariosController.eliminarUsuario)

module.exports = router;
