const express = require('express');
const router = express.Router();
const pool = require('../db/connection'); // Import the pool from connection.js

// Fetch products with limit and offset
router.get('/', async (req, res) => {
  const { limit = 4, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  console.log(`Limit: ${limit}, Page: ${page}, Offset: ${offset}`);

  try {
    const productsQuery = 'SELECT * FROM products LIMIT $1 OFFSET $2';
const countQuery = 'SELECT COUNT(*) AS total FROM products';

    const productsResult = await pool.query(productsQuery, [Number(limit), Number(offset)]);
    const countResult = await pool.query(countQuery);

    const products = productsResult.rows;
    const total = parseInt(countResult.rows[0].total, 10);

    res.json({ products, total });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
