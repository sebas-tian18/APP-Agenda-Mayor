const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.consultarUsuarios);

router.get('/adultoMayor', verifyToken, usuariosController.probarLogin); // Usar middleware

router.get("/:id/citas", usuariosController.consultarCitasPorUsuario); // Citas de usuario

router.get("/lista", usuariosController.getUserList);

router.get("/lista/:id", usuariosController.consultarIDProfesional);

router.get("/lista/adultomayor/:id", usuariosController.HallarAdultoMayor);
router.get("/lista/Citaadultomayor/:id", usuariosController.HallarCitaAdultoMayor
);



router.route("/:id")
    .get(usuariosController.consultarUsuario)
    .put(usuariosController.actualizarUsuario)
    .delete(usuariosController.deleteUser)

module.exports = router;
