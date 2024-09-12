const db = require('../config/database');

const Service = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM usuarios');
    return rows;
  },

};

module.exports = Service;
