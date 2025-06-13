const db = require('../config/bd');

const Categoria = {
  crear: (categoria, callback) => {
    const sql = 'INSERT INTO categoria SET ?';
    db.query(sql, categoria, callback);
  },

  actualizar: (id, datos, callback) => {
    const sql = 'UPDATE categoria SET ? WHERE id_categoria = ?';
    db.query(sql, [datos, id], callback);
  },

  eliminar: (id, callback) => {
    const sql = 'DELETE FROM categoria WHERE id_categoria = ?';
    db.query(sql, [id], callback);
  },

  obtenerPorId: (id, callback) => {
    const sql = 'SELECT * FROM categoria WHERE id_categoria = ?';
    db.query(sql, [id], callback);
  },

  listarTodas: (callback) => {
    const sql = 'SELECT * FROM categoria';
    db.query(sql, callback);
  }
};

module.exports = Categoria;