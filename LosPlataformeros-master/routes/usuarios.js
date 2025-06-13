const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariocontroller');

// Rutas específicas primero
router.get('/', usuarioController.listarUsuarios);
router.get('/:id', usuarioController.obtenerUsuario); // Cambiado a singular

router.post('/', usuarioController.crearUsuario);
router.put('/:id', usuarioController.actualizarUsuario); // Cambiado a "actualizar"
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;