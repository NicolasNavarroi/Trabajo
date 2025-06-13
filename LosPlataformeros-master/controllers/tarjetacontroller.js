const Tarjeta = require('../models/tarjetamodel');

const tarjetaController = {
  listarTarjetas: (req, res) => {
    Tarjeta.listarTodas((err, resultados) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(resultados);
    });
  },

  obtenerTarjeta: (req, res) => {
    Tarjeta.obtenerPorId(req.params.id, (err, resultados) => {
      if (err) return res.status(500).json({ error: err.message });
      if (resultados.length === 0) return res.status(404).json({ error: 'Tarjeta no encontrada' });
      res.status(200).json(resultados[0]);
    });
  },

  crearTarjeta: (req, res) => {
    Tarjeta.crear(req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId });
    });
  },

  actualizarTarjeta: (req, res) => {
    Tarjeta.actualizar(req.params.id, req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ affectedRows: result.affectedRows });
    });
  },

  eliminarTarjeta: (req, res) => {
    Tarjeta.eliminar(req.params.id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ affectedRows: result.affectedRows });
    });
  }
};

module.exports = tarjetaController;