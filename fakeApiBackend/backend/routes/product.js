const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

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

// Fetch a single product by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // console.log(`Fetching product with ID: ${id}`);

  try {
    const productQuery = 'SELECT * FROM products WHERE id = $1';
    const productResult = await pool.query(productQuery, [Number(id)]);

    if (productResult.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = productResult.rows[0];
    res.json(product);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
