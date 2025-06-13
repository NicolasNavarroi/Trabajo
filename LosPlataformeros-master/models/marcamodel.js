const db = require('../config/bd');

const Marca = {
  crear: (marca, callback) => {
    const sql = 'INSERT INTO marca SET ?';
    db.query(sql, marca, callback);
  },

  actualizar: (id, datos, callback) => {
    const sql = 'UPDATE marca SET ? WHERE id_marca = ?';
    db.query(sql, [datos, id], callback);
  },

  eliminar: (id, callback) => {
    const sql = 'DELETE FROM marca WHERE id_marca = ?';
    db.query(sql, [id], callback);
  },

  obtenerPorId: (id, callback) => {
    const sql = 'SELECT * FROM marca WHERE id_marca = ?';
    db.query(sql, [id], callback);
  },

  listarTodas: (callback) => {
    const sql = 'SELECT * FROM marca';
    db.query(sql, callback);
  }
};

module.exports = Marca;