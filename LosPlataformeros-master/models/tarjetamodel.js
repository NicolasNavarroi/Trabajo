const db = require('../config/bd');

const Tarjeta = {
  crear: (tarjeta, callback) => {
    const sql = `INSERT INTO Tarjeta_credito SET ?`;
    db.query(sql, tarjeta, callback);
  },

  actualizar: (id, datos, callback) => {
    const sql = `UPDATE Tarjeta_credito SET ? WHERE id_tarjeta = ?`;
    db.query(sql, [datos, id], callback);
  },

  eliminar: (id, callback) => {
    const sql = 'DELETE FROM Tarjeta_credito WHERE id_tarjeta = ?';
    db.query(sql, [id], callback);
  },

  obtenerPorId: (id, callback) => {
    const sql = 'SELECT * FROM Tarjeta_credito WHERE id_tarjeta = ?';
    db.query(sql, [id], callback);
  },

  listarTodas: (callback) => {
    const sql = 'SELECT * FROM Tarjeta_credito';
    db.query(sql, callback);
  }
};

module.exports = Tarjeta;