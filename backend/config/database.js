const mysql = require('mysql2');

const pool = mysql.createPool({
  host: '45.236.130.139',
  user: 'admin',
  password: 'scamersqlos1',
  database: 'agenda_mayor',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
