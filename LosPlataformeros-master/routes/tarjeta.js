const express = require('express');
const router = express.Router();
const tarjetaController = require('../controllers/tarjetacontroller');

// Rutas específicas primero
router.get('/', tarjetaController.listarTarjetas);
router.get('/:id', tarjetaController.obtenerTarjeta);

router.post('/', tarjetaController.crearTarjeta);
router.put('/:id', tarjetaController.actualizarTarjeta); // Cambiado a "actualizar"
router.delete('/:id', tarjetaController.eliminarTarjeta);

module.exports = router;