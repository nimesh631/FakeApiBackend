const { Pool } = require('pg'); // Import the Pool class from the 'pg' library

// Create a new pool of connections to the database
const pool = new Pool({
  host: 'localhost',     // Database host (default: localhost)
  user: 'postgres',      // Database username (usually 'postgres')
  password: 'nimesh',    // Database password (your PostgreSQL password)
  database: 'api',       // Database name (in your case, it's 'api')
  port: 5432,            // Database port (default PostgreSQL port is 5432)
});

module.exports = pool; // Export the pool instance to be used in other files
