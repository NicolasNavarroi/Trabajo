const Categoria = require('../models/categoriamodel');

const categoriaController = {
  crearCategoria: (req, res) => {
    const { nombre, descripcion } = req.body;
    if (!nombre || !descripcion) {
      return res.status(400).json({ error: 'Nombre y descripción son requeridos' });
    }

    Categoria.crear(req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId });
    });
  },

  actualizarCategoria: (req, res) => {
    const { nombre, descripcion } = req.body;
    if (!nombre || !descripcion) {
      return res.status(400).json({ error: 'Nombre y descripción son requeridos' });
    }

    Categoria.actualizar(req.params.id, req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ affectedRows: result.affectedRows });
    });
  },

  eliminarCategoria: (req, res) => {
    Categoria.eliminar(req.params.id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ affectedRows: result.affectedRows });
    });
  },

  listarCategorias: (req, res) => {
    Categoria.listarTodas((err, resultados) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(resultados);
    });
  },

  obtenerCategoria: (req, res) => {
    Categoria.obtenerPorId(req.params.id, (err, resultados) => {
      if (err) return res.status(500).json({ error: err.message });
      if (resultados.length === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
      res.status(200).json(resultados[0]);
    });
  }
};

module.exports = categoriaController;