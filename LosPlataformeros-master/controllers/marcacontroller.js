const Marca = require('../models/marcamodel');

const marcaController = {
  crearMarca: (req, res) => {
    Marca.crear(req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId });
    });
  },

  actualizarMarca: (req, res) => {
    Marca.actualizar(req.params.id, req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ affectedRows: result.affectedRows });
    });
  },

  eliminarMarca: (req, res) => {
    Marca.eliminar(req.params.id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ affectedRows: result.affectedRows });
    });
  },

  listarMarcas: (req, res) => {
    Marca.listarTodas((err, resultados) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(resultados);
    });
  },

  obtenerMarca: (req, res) => {
    Marca.obtenerPorId(req.params.id, (err, resultados) => {
      if (err) return res.status(500).json({ error: err.message });
      if (resultados.length === 0) return res.status(404).json({ error: 'Marca no encontrada' });
      res.status(200).json(resultados[0]);
    });
  }
};

module.exports = marcaController;