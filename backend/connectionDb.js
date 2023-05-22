// --- Connection mySql ---
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sitemelanie',
});

module.exports = connection;
