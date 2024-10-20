const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');


router.get('/', citasController.consultarCitas);
router.get('/:id/noagendadas', citasController.consultarCitasnotomadas);

module.exports = router;