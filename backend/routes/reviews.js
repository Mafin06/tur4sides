const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { body, validationResult } = require('express-validator');

// Получить отзывы для тура
router.get('/tour/:tourId', async (req, res) => {
  try {
    const { tourId } = req.params;
    const { limit = 10, page = 1 } = req.query;
    const offset = (page - 1) * limit;

    const query = `
      SELECT r.* 
      FROM reviews r
      WHERE r.tour_id = $1 AND r.is_published = true
      ORDER BY r.created_at DESC
      LIMIT $2 OFFSET $3
    `;
    
    const result = await pool.query(query, [tourId, limit, offset]);
    
    // Получить общее количество
    const countQuery = `
      SELECT COUNT(*) 
      FROM reviews 
      WHERE tour_id = $1 AND is_published = true
    `;
    
    const countResult = await pool.query(countQuery, [tourId]);
    const total = parseInt(countResult.rows[0].count);

    res.json({
      reviews: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Ошибка при получении отзывов' });
  }
});

// Создать отзыв
router.post('/', [
  body('tour_id').isInt().withMessage('ID тура обязателен'),
  body('author_name').trim().notEmpty().withMessage('Имя автора обязательно'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Рейтинг должен быть от 1 до 5'),
  body('comment').trim().notEmpty().withMessage('Текст отзыва обязателен'),
  body('author_email').optional().isEmail().withMessage('Неверный формат email')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      tour_id,
      author_name,
      author_email,
      rating,
      comment
    } = req.body;

    // Проверяем существование тура
    const tourQuery = `SELECT id FROM tours WHERE id = $1 AND is_active = true`;
    const tourResult = await pool.query(tourQuery, [tour_id]);
    
    if (tourResult.rows.length === 0) {
      return res.status(404).json({ error: 'Тур не найден' });
    }

    const query = `
      INSERT INTO reviews (
        tour_id, author_name, author_email, rating, comment
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [
      tour_id,
      author_name,
      author_email || null,
      rating,
      comment
    ];

    const result = await pool.query(query, values);
    
    // Отправляем уведомление администратору о новом отзыве
    // await sendReviewNotification(result.rows[0]);

    res.status(201).json({
      success: true,
      review: result.rows[0],
      message: 'Отзыв успешно отправлен! Он будет опубликован после проверки модератором.'
    });

  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Ошибка при создании отзыва' });
  }
});

// Одобрить отзыв (админ)
router.patch('/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      UPDATE reviews 
      SET is_published = true, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Отзыв не найден' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error approving review:', error);
    res.status(500).json({ error: 'Ошибка при одобрении отзыва' });
  }
});

// Получить непроверенные отзывы (админ)
router.get('/admin/pending', async (req, res) => {
  try {
    const query = `
      SELECT r.*, t.title as tour_title
      FROM reviews r
      JOIN tours t ON r.tour_id = t.id
      WHERE r.is_published = false
      ORDER BY r.created_at DESC
    `;
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching pending reviews:', error);
    res.status(500).json({ error: 'Ошибка при получении непроверенных отзывов' });
  }
});

module.exports = router;