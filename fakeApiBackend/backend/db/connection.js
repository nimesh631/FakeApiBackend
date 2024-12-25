require('dotenv').config();  // Load environment variables from .env file

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,  // Use environment variables
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool.promise();
