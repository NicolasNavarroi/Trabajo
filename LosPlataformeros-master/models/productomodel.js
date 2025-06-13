const db = require('../config/bd');

const Producto = {
  crear: (producto, callback) => {
    const sql = `INSERT INTO Producto SET ?`;
    db.query(sql, producto, callback);
  },

  editar: (id, datos, callback) => {
    const sql = `UPDATE Producto SET ? WHERE idProducto = ?`;
    db.query(sql, [datos, id], callback);
  },

  eliminar: (id, callback) => {
    const sql = 'DELETE FROM Producto WHERE idProducto = ?';
    db.query(sql, [id], callback);
  },

  obtenerPorId: (id, callback) => {
    const sql = 'SELECT * FROM Producto WHERE idProducto = ?';
    db.query(sql, [id], callback);
  },

  listarTodos: (callback) => {
    const sql = 'SELECT * FROM Producto';
    db.query(sql, callback);
  }
};

module.exports = Producto;