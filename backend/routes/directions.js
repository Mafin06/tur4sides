const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Получить все направления
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT d.*, 
             COUNT(t.id) as tour_count,
             COALESCE(MIN(t.price), 0) as min_price
      FROM directions d
      LEFT JOIN tours t ON d.id = t.direction_id AND t.is_active = true
      GROUP BY d.id
      ORDER BY d.name
    `;
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching directions:', error);
    res.status(500).json({ error: 'Ошибка при получении направлений' });
  }
});

// Получить направление по slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const query = `
      SELECT d.*, 
             COUNT(t.id) as tour_count
      FROM directions d
      LEFT JOIN tours t ON d.id = t.direction_id AND t.is_active = true
      WHERE d.slug = $1
      GROUP BY d.id
    `;
    
    const result = await pool.query(query, [slug]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Направление не найдено' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching direction:', error);
    res.status(500).json({ error: 'Ошибка при получении направления' });
  }
});

module.exports = router;