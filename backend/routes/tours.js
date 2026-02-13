const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { body, validationResult } = require('express-validator');

// Добавьте в начало файла tours.js, после импортов
router.get('/debug/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Запрос тура с ID:', id);
    
    // Простой запрос для тестирования
    const query = 'SELECT id, title, location FROM tours WHERE id = $1';
    const result = await pool.query(query, [parseInt(id)]);
    
    console.log('Результат запроса:', result.rows);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Тур не найден' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка debug:', error);
    res.status(500).json({ error: 'Debug ошибка' });
  }
});

// Получить все туры с фильтрацией
// В tours.js добавьте обработку дополнительных параметров фильтрации

// В GET / роуте добавьте обработку новых параметров
// В tours.js, в роуте GET '/'
router.get('/', async (req, res) => {
  try {
    const {
      direction,
      type,
      minPrice,
      maxPrice,
      startDate,
      endDate,
      isNew,
      isHot,
      isFamily, // Добавляем новый параметр
      limit = 20,
      page = 1
    } = req.query;

    let query = `
      SELECT t.*, 
             d.name as direction_name,
             d.slug as direction_slug,
             o.name as organizer_name,
             COALESCE((
               SELECT MIN(td.price)
               FROM tour_dates td
               WHERE td.tour_id = t.id 
                 AND td.is_available = true 
                 AND td.start_date >= CURRENT_DATE
             ), t.price) as actual_price
      FROM tours t
      LEFT JOIN directions d ON t.direction_id = d.id
      LEFT JOIN organizers o ON t.organizer_id = o.id
      WHERE t.is_active = true
    `;
    
    const params = [];
    let paramCount = 1;

    if (direction) {
      query += ` AND d.slug = $${paramCount}`;
      params.push(direction);
      paramCount++;
    }

    if (type === 'new') {
      query += ` AND t.is_new = true`;
    } else if (type === 'hot') {
      query += ` AND t.is_hot = true`;
    }

    // Добавляем фильтрацию по семейным турам
    if (isFamily === 'true' || isFamily === true) {
      query += ` AND t.is_family = true`;
    }

    if (minPrice) {
      query += ` AND t.price >= $${paramCount}`;
      params.push(minPrice);
      paramCount++;
    }

    if (maxPrice) {
      query += ` AND t.price <= $${paramCount}`;
      params.push(maxPrice);
      paramCount++;
    }

    if (startDate) {
      query += ` AND t.start_date >= $${paramCount}`;
      params.push(startDate);
      paramCount++;
    }

    if (endDate) {
      query += ` AND t.end_date <= $${paramCount}`;
      params.push(endDate);
      paramCount++;
    }

    const offset = (page - 1) * limit;
    query += ` ORDER BY t.created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);
    
    // Получаем общее количество для пагинации
    let countQuery = `
      SELECT COUNT(*) FROM tours t
      LEFT JOIN directions d ON t.direction_id = d.id
      WHERE t.is_active = true
    `;
    
    const countParams = [];
    let countParamCount = 1;
    
    if (direction) {
      countQuery += ` AND d.slug = $${countParamCount}`;
      countParams.push(direction);
      countParamCount++;
    }
    
    if (isFamily === 'true' || isFamily === true) {
      countQuery += ` AND t.is_family = true`;
    }
    
    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    res.json({
      tours: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching tours:', error);
    res.status(500).json({ error: 'Ошибка при получении туров' });
  }
});

// Получить тур по ID или slug
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    const isNumericId = !isNaN(id);
    
    let query = `
      SELECT t.*, 
             d.name as direction_name,
             d.slug as direction_slug,
             d.description as direction_description,
             o.name as organizer_name,
             o.description as organizer_description,
             o.contact_phone as organizer_phone,
             o.contact_email as organizer_email,
             o.rating as organizer_rating,
             (
               SELECT COALESCE(
                 JSON_AGG(
                   JSON_BUILD_OBJECT(
                     'id', td.id,
                     'start_date', td.start_date,
                     'end_date', td.end_date,
                     'price', td.price,
                     'available_slots', td.available_slots,
                     'booked_slots', td.booked_slots,
                     'is_available', td.is_available
                   ) ORDER BY td.start_date
                 ),
                 '[]'::json
               )
               FROM tour_dates td
               WHERE td.tour_id = t.id 
                 AND td.is_available = true 
             ) as available_dates
      FROM tours t
      LEFT JOIN directions d ON t.direction_id = d.id
      LEFT JOIN organizers o ON t.organizer_id = o.id
      WHERE t.is_active = true AND 
    `;
    
    const params = [];
    
    if (isNumericId) {
      query += ` t.id = $1`;
      params.push(parseInt(id));
    } else {
      query += ` t.slug = $1`;
      params.push(id);
    }

    const result = await pool.query(query, params);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Тур не найден' });
    }

    // Получаем отзывы для тура
    const reviewsQuery = `
      SELECT r.* 
      FROM reviews r
      WHERE r.tour_id = $1 AND r.is_published = true
      ORDER BY r.created_at DESC
      LIMIT 10
    `;
    
    const reviewsResult = await pool.query(reviewsQuery, [result.rows[0].id]);
    
    // Получаем похожие туры
    const similarQuery = `
      SELECT t.id, t.title, t.slug, t.location, t.price, t.main_image_url
      FROM tours t
      WHERE t.direction_id = $1 
        AND t.id != $2 
        AND t.is_active = true
      ORDER BY t.rating DESC
      LIMIT 3
    `;
    
    const similarResult = await pool.query(similarQuery, [
      result.rows[0].direction_id,
      result.rows[0].id
    ]);

    const tour = {
      ...result.rows[0],
      reviews: reviewsResult.rows,
      similarTours: similarResult.rows
    };

    res.json(tour);
  } catch (error) {
    console.error('Error fetching tour:', error);
    res.status(500).json({ error: 'Ошибка при получении тура' });
  }
});

// Получить туры по направлению
router.get('/direction/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { limit = 12, page = 1 } = req.query;
    const offset = (page - 1) * limit;

    const query = `
      SELECT t.*, d.name as direction_name
      FROM tours t
      JOIN directions d ON t.direction_id = d.id
      WHERE d.slug = $1 AND t.is_active = true
      ORDER BY t.created_at DESC
      LIMIT $2 OFFSET $3
    `;

    const result = await pool.query(query, [slug, limit, offset]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tours by direction:', error);
    res.status(500).json({ error: 'Ошибка при получении туров по направлению' });
  }
});

// Получить популярные туры
router.get('/popular/:limit', async (req, res) => {
  try {
    const { limit = 6 } = req.params;
    
    const query = `
       SELECT t.*, 
         d.name as direction_name,
         d.slug as direction_slug,
         o.name as organizer_name
  FROM tours t
  LEFT JOIN directions d ON t.direction_id = d.id
  LEFT JOIN organizers o ON t.organizer_id = o.id
  WHERE t.is_active = true
  ORDER BY t.rating DESC, t.review_count DESC
  LIMIT $1
    `;

    const result = await pool.query(query, [limit]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching popular tours:', error);
    res.status(500).json({ error: 'Ошибка при получении популярных туров' });
  }
});

// Создать новый тур (админ)
router.post('/', [
  body('title').trim().notEmpty().withMessage('Название тура обязательно'),
  body('slug').trim().notEmpty().withMessage('Slug обязателен'),
  body('price').isFloat({ min: 0 }).withMessage('Цена должна быть положительной'),
  body('direction_id').isInt().withMessage('Направление обязательно')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      slug,
      short_description,
      full_description,
      location,
      direction_id,
      organizer_id,
      price,
      old_price,
      start_date,
      end_date,
      duration_days,
      transport,
      accommodation,
      meals,
      group_size,
      hotel_category,
      main_image_url,
      meta_title,
      meta_description,
      meta_keywords
    } = req.body;

    const query = `
      INSERT INTO tours (
        title, slug, short_description, full_description, location, 
        direction_id, organizer_id, price, old_price, start_date, 
        end_date, duration_days, transport, accommodation, meals, 
        group_size, hotel_category, main_image_url, meta_title, 
        meta_description, meta_keywords
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
      RETURNING *
    `;

    const values = [
      title, slug, short_description, full_description, location,
      direction_id, organizer_id, price, old_price, start_date,
      end_date, duration_days, transport, accommodation, meals,
      group_size, hotel_category, main_image_url, meta_title,
      meta_description, meta_keywords
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating tour:', error);
    
    if (error.code === '23505') { // Unique violation
      return res.status(400).json({ error: 'Тур с таким slug уже существует' });
    }
    
    res.status(500).json({ error: 'Ошибка при создании тура' });
  }
});

module.exports = router;