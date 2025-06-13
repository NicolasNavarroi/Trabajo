const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productocontroller');

// Rutas específicas primero
router.get('/listar', productoController.listarProductos);
router.get('/:id', productoController.obtenerProducto); // Cambiado a singular

router.post('/crear', productoController.crearProducto);
router.put('/:id', productoController.editarProducto); // Corregido nombre del método
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;