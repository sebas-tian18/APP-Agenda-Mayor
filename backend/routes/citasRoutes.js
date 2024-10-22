const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');


router.get('/', citasController.consultarCitas);
router.post('/', citasController.crearCita);
router.get('/:id/noagendadas', citasController.consultarCitasnotomadas);
router.patch('/agendar/:id', citasController.agendarCita);

module.exports = router;