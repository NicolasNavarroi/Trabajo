const Producto = require('../models/productomodel');

const productoController = {
  crearProducto: (req, res) => {
    Producto.crear(req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId });
    });
  },

  editarProducto: (req, res) => {
    Producto.editar(req.params.id, req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ affectedRows: result.affectedRows });
    });
  },

  eliminarProducto: (req, res) => {
    Producto.eliminar(req.params.id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ affectedRows: result.affectedRows });
    });
  },

  obtenerProducto: (req, res) => {
    Producto.obtenerPorId(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
      res.status(200).json(results[0]);
    });
  },

  listarProductos: (req, res) => {
    Producto.listarTodos((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  }
};

module.exports = productoController;