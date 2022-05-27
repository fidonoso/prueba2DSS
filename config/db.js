const mysql = require('mysql2');
require('dotenv').config({patch: '../.env'})

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'cft',
  port: process.env.PORT || 3306
});

module.exports = connection