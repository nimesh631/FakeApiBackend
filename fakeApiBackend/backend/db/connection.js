const { Pool } = require('pg'); // Import the Pool class from the 'pg' library

// Create a new pool of connections to the database
const pool = new Pool({
  host: 'localhost',  
  user: 'postgres',      
  password: 'nimesh',    
  database: 'api',    
  port: 5432,           
});

module.exports = pool;
