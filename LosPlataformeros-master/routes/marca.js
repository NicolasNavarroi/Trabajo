const express = require('express');
const router = express.Router();
const marcaController = require('../controllers/marcacontroller');

// Rutas RESTful estándar
router.get('/', marcaController.listarMarcas); // Cambiado de listadoMarcas a listarMarcas
router.get('/:id', marcaController.obtenerMarca);

router.post('/', marcaController.crearMarca);
router.put('/:id', marcaController.actualizarMarca); // Cambiado de editarMarca a actualizarMarca
router.delete('/:id', marcaController.eliminarMarca);

module.exports = router;