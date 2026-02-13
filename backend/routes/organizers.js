const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Получить всех организаторов
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT * FROM organizers
      ORDER BY rating DESC
    `;
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching organizers:', error);
    res.status(500).json({ error: 'Ошибка при получении организаторов' });
  }
});

// Получить организатора по ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT o.*,
             COUNT(t.id) as tour_count,
             AVG(t.rating) as avg_tour_rating
      FROM organizers o
      LEFT JOIN tours t ON o.id = t.organizer_id
      WHERE o.id = $1
      GROUP BY o.id
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Организатор не найден' });
    }

    // Получить туры организатора
    const toursQuery = `
      SELECT id, title, slug, location, price, rating, main_image_url
      FROM tours
      WHERE organizer_id = $1 AND is_active = true
      ORDER BY created_at DESC
      LIMIT 10
    `;
    
    const toursResult = await pool.query(toursQuery, [id]);
    
    const organizer = {
      ...result.rows[0],
      tours: toursResult.rows
    };

    res.json(organizer);
  } catch (error) {
    console.error('Error fetching organizer:', error);
    res.status(500).json({ error: 'Ошибка при получении организатора' });
  }
});

module.exports = router;