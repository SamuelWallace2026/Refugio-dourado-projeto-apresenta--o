const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',      
  password: '200806', 
  database: 'refugio_dourado_db', 
  port: 3306
});

module.exports = pool;