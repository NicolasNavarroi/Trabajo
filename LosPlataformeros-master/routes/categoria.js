const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriacontroller');

// Rutas RESTful estándar
router.get('/', categoriaController.listarCategorias);
router.get('/:id', categoriaController.obtenerCategoria);

router.post('/', categoriaController.crearCategoria);
router.put('/:id', categoriaController.actualizarCategoria); // Cambiado de editarCategoria
router.delete('/:id', categoriaController.eliminarCategoria);

module.exports = router;