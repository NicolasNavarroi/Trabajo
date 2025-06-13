const db = require('../config/bd');

const Usuario = {
  crear: (usuario, callback) => {
    const sql = `INSERT INTO Usuario SET ?`;
    db.query(sql, usuario, callback);
  },

  actualizar: (id, datos, callback) => {
    const sql = `UPDATE Usuario SET ? WHERE idUsuario = ?`;
    db.query(sql, [datos, id], callback);
  },

  eliminar: (id, callback) => {
    const sql = 'DELETE FROM Usuario WHERE idUsuario = ?';
    db.query(sql, [id], callback);
  },

  obtenerPorId: (id, callback) => {
    const sql = 'SELECT * FROM Usuario WHERE idUsuario = ?';
    db.query(sql, [id], callback);
  },

  listarTodos: (callback) => {
    const sql = 'SELECT * FROM Usuario';
    db.query(sql, callback);
  },

  verificarDuplicado: (campos, callback) => {
    const sql = 'SELECT * FROM Usuario WHERE Username = ? OR Email = ?';
    db.query(sql, [campos.Username, campos.Email], callback);
  }
};

module.exports = Usuario;