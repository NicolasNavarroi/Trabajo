const Usuario = require('../models/usuariomodel');

const usuarioController = {
  listarUsuarios: (req, res) => {
    Usuario.listarTodos((err, resultados) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(resultados);
    });
  },

  obtenerUsuario: (req, res) => {
    Usuario.obtenerPorId(req.params.id, (err, resultados) => {
      if (err) return res.status(500).json({ error: err.message });
      if (resultados.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.status(200).json(resultados[0]);
    });
  },

  crearUsuario: (req, res) => {
    Usuario.verificarDuplicado(req.body, (err, resultados) => {
      if (err) return res.status(500).json({ error: err.message });
      if (resultados.length > 0) return res.status(409).json({ error: 'Usuario ya existe' });

      Usuario.crear(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId });
      });
    });
  },

  actualizarUsuario: (req, res) => {
    Usuario.actualizar(req.params.id, req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ affectedRows: result.affectedRows });
    });
  },

  eliminarUsuario: (req, res) => {
    Usuario.eliminar(req.params.id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ affectedRows: result.affectedRows });
    });
  }
};

module.exports = usuarioController;