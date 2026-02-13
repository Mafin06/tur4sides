// const express = require('express');
// const router = express.Router();
// const pool = require('../config/database');
// const { body, validationResult } = require('express-validator');

// // Создать новое бронирование
// router.post('/', [
//   body('tour_id').isInt().withMessage('ID тура обязателен'),
//   body('tour_date_id').isInt().withMessage('ID даты тура обязателен'),
//   body('customer_name').trim().notEmpty().withMessage('Имя обязательно'),
//   body('customer_phone').trim().notEmpty().withMessage('Телефон обязателен'),
//   body('persons_count').isInt({ min: 1 }).withMessage('Количество человек должно быть больше 0'),
//   body('total_price').isFloat({ min: 0 }).withMessage('Цена должна быть положительной'),
//   body('tour_date').isDate().withMessage('Дата тура обязательна'),
//   body('participants').optional().isArray()
// ], async (req, res) => {
//   const client = await pool.connect();
  
//   try {
//     // Валидация
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     await client.query('BEGIN');

//     const {
//       tour_id,
//       tour_date_id,
//       customer_name,
//       customer_phone,
//       customer_email,
//       persons_count,
//       total_price,
//       tour_date,
//       comments,
//       participants = []
//     } = req.body;

//     // Проверяем наличие свободных мест
//     const dateCheck = await client.query(
//       `SELECT available_slots, booked_slots 
//        FROM tour_dates 
//        WHERE id = $1 FOR UPDATE`,
//       [tour_date_id]
//     );

//     if (dateCheck.rows.length === 0) {
//       throw new Error('Дата тура не найдена');
//     }

//     const availableSlots = dateCheck.rows[0].available_slots;
//     const bookedSlots = dateCheck.rows[0].booked_slots;
//     const freeSlots = availableSlots - bookedSlots;

//     if (freeSlots < persons_count) {
//       throw new Error(`Недостаточно свободных мест. Доступно: ${freeSlots}`);
//     }

//     // Генерируем номер бронирования
//     const bookingNumber = `BK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

//     // Создаем или находим пользователя
//     let userId = null;
//     if (customer_email || customer_phone) {
//       // Ищем существующего пользователя по email или телефону
//       const userQuery = await client.query(
//         `SELECT id FROM users 
//          WHERE email = $1 OR phone = $2 
//          LIMIT 1`,
//         [customer_email, customer_phone]
//       );

//       if (userQuery.rows.length > 0) {
//         userId = userQuery.rows[0].id;
//       } else {
//         // Создаем нового пользователя
//         const newUser = await client.query(
//           `INSERT INTO users (email, phone, full_name) 
//            VALUES ($1, $2, $3) 
//            RETURNING id`,
//           [customer_email, customer_phone, customer_name]
//         );
//         userId = newUser.rows[0].id;
//       }
//     }

//     // Создаем бронирование
//     const bookingQuery = `
//       INSERT INTO bookings (
//         tour_id, tour_date_id, user_id,
//         customer_name, customer_phone, customer_email,
//         persons_count, total_price, booking_date,
//         tour_date, status, payment_status, comments,
//         ip_address, user_agent
//       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
//       RETURNING id, uuid, booking_date
//     `;

//     const bookingValues = [
//       tour_id,
//       tour_date_id,
//       userId,
//       customer_name,
//       customer_phone,
//       customer_email || null,
//       persons_count,
//       total_price,
//       new Date(),
//       tour_date,
//       'pending',
//       'pending',
//       comments || null,
//       req.ip,
//       req.get('User-Agent') || null
//     ];

//     const bookingResult = await client.query(bookingQuery, bookingValues);
//     const bookingId = bookingResult.rows[0].id;

//     // Обновляем количество забронированных мест
//     await client.query(
//       `UPDATE tour_dates 
//        SET booked_slots = booked_slots + $1 
//        WHERE id = $2`,
//       [persons_count, tour_date_id]
//     );

//     // Добавляем участников, если есть
//     if (participants && participants.length > 0) {
//       for (const participant of participants) {
//         if (participant.full_name) {
//           await client.query(
//             `INSERT INTO booking_participants 
//              (booking_id, full_name, birth_date, document_number) 
//              VALUES ($1, $2, $3, $4)`,
//             [
//               bookingId,
//               participant.full_name,
//               participant.birth_date || null,
//               participant.document_number || null
//             ]
//           );
//         }
//       }
//     }

//     await client.query('COMMIT');

//     // Возвращаем успешный ответ
//     res.status(201).json({
//       success: true,
//       booking_id: bookingResult.rows[0].id,
//       uuid: bookingResult.rows[0].uuid,
//       booking_number: bookingNumber,
//       booking_date: bookingResult.rows[0].booking_date,
//       message: 'Бронирование успешно создано'
//     });

//   } catch (error) {
//     await client.query('ROLLBACK');
//     console.error('Error creating booking:', error);
//     res.status(500).json({ 
//       error: error.message || 'Ошибка при создании бронирования' 
//     });
//   } finally {
//     client.release();
//   }
// });

// // Получить бронирование по ID
// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const query = `
//       SELECT b.*, 
//              t.title as tour_title,
//              td.start_date, td.end_date
//       FROM bookings b
//       LEFT JOIN tours t ON b.tour_id = t.id
//       LEFT JOIN tour_dates td ON b.tour_date_id = td.id
//       WHERE b.id = $1 OR b.uuid::text = $1
//     `;
    
//     const result = await pool.query(query, [id]);
    
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Бронирование не найдено' });
//     }
    
//     // Получаем участников
//     const participantsQuery = `
//       SELECT * FROM booking_participants 
//       WHERE booking_id = $1
//     `;
    
//     const participantsResult = await pool.query(participantsQuery, [result.rows[0].id]);
    
//     const booking = {
//       ...result.rows[0],
//       participants: participantsResult.rows
//     };
    
//     res.json(booking);
//   } catch (error) {
//     console.error('Error fetching booking:', error);
//     res.status(500).json({ error: 'Ошибка при получении бронирования' });
//   }
// });

// // Отменить бронирование
// router.patch('/:id/cancel', async (req, res) => {
//   const client = await pool.connect();
  
//   try {
//     await client.query('BEGIN');
    
//     const { id } = req.params;
    
//     // Получаем информацию о бронировании
//     const bookingQuery = await client.query(
//       `SELECT id, tour_date_id, persons_count, status 
//        FROM bookings 
//        WHERE id = $1 OR uuid::text = $1`,
//       [id]
//     );
    
//     if (bookingQuery.rows.length === 0) {
//       throw new Error('Бронирование не найдено');
//     }
    
//     const booking = bookingQuery.rows[0];
    
//     if (booking.status === 'cancelled') {
//       throw new Error('Бронирование уже отменено');
//     }
    
//     // Обновляем статус бронирования
//     await client.query(
//       `UPDATE bookings 
//        SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP 
//        WHERE id = $1`,
//       [booking.id]
//     );
    
//     // Возвращаем места
//     await client.query(
//       `UPDATE tour_dates 
//        SET booked_slots = booked_slots - $1 
//        WHERE id = $2`,
//       [booking.persons_count, booking.tour_date_id]
//     );
    
//     await client.query('COMMIT');
    
//     res.json({ 
//       success: true, 
//       message: 'Бронирование отменено' 
//     });
    
//   } catch (error) {
//     await client.query('ROLLBACK');
//     console.error('Error cancelling booking:', error);
//     res.status(500).json({ error: error.message });
//   } finally {
//     client.release();
//   }
// });

// module.exports = router;
// backend/routes/bookings.js
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { body, validationResult } = require('express-validator');

// Создать бронирование
router.post('/', [
  body('tour_id').isInt().withMessage('ID тура обязателен'),
  body('customer_name').trim().notEmpty().withMessage('Имя обязательно'),
  body('customer_phone').trim().notEmpty().withMessage('Телефон обязателен'),
  body('persons_count').isInt({ min: 1 }).withMessage('Количество участников должно быть не менее 1'),
  body('total_price').isFloat({ min: 0 }).withMessage('Цена должна быть положительной'),
  body('tour_date').isDate().withMessage('Дата тура обязательна')
], async (req, res) => {
  const client = await pool.connect();
  
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await client.query('BEGIN');

    const {
      tour_id,
      tour_date_id,
      customer_name,
      customer_phone,
      customer_email,
      persons_count,
      total_price,
      tour_date,
      comments,
      participants
    } = req.body;

    // Генерируем номер бронирования
    const bookingNumber = `BK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Создаем или находим пользователя
    let userId = null;
    if (customer_email || customer_phone) {
      // Проверяем, существует ли пользователь
      const userQuery = customer_email 
        ? 'SELECT id FROM users WHERE email = $1'
        : 'SELECT id FROM users WHERE phone = $1';
      
      const userResult = await client.query(userQuery, [customer_email || customer_phone]);
      
      if (userResult.rows.length > 0) {
        userId = userResult.rows[0].id;
      } else {
        // Создаем нового пользователя
        const createUserQuery = `
          INSERT INTO users (email, phone, full_name)
          VALUES ($1, $2, $3)
          RETURNING id
        `;
        const newUser = await client.query(createUserQuery, [
          customer_email || null,
          customer_phone,
          customer_name
        ]);
        userId = newUser.rows[0].id;
      }
    }

    // Создаем бронирование
    const bookingQuery = `
      INSERT INTO bookings (
        uuid, tour_id, tour_date_id, user_id,
        customer_name, customer_phone, customer_email,
        persons_count, total_price, booking_date, tour_date,
        status, payment_status, comments
      ) VALUES (
        gen_random_uuid(), $1, $2, $3,
        $4, $5, $6,
        $7, $8, CURRENT_DATE, $9,
        'pending', 'pending', $10
      )
      RETURNING id, uuid
    `;

    const bookingResult = await client.query(bookingQuery, [
      tour_id,
      tour_date_id || null,
      userId,
      customer_name,
      customer_phone,
      customer_email || null,
      persons_count,
      total_price,
      tour_date,
      comments || null
    ]);

    const bookingId = bookingResult.rows[0].id;
    const bookingUuid = bookingResult.rows[0].uuid;

    // Добавляем участников
    if (participants && participants.length > 0) {
      for (const participant of participants) {
        if (participant.full_name && participant.full_name.trim() !== '') {
          const participantQuery = `
            INSERT INTO booking_participants (
              booking_id, full_name, birth_date, document_number
            ) VALUES ($1, $2, $3, $4)
          `;
          
          await client.query(participantQuery, [
            bookingId,
            participant.full_name,
            participant.birth_date || null,
            participant.document_number || null
          ]);
        }
      }
    }

    // Обновляем количество забронированных мест в tour_dates
    if (tour_date_id) {
      const updateSlotsQuery = `
        UPDATE tour_dates 
        SET booked_slots = booked_slots + $1
        WHERE id = $2
      `;
      await client.query(updateSlotsQuery, [persons_count, tour_date_id]);
    }

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      booking_id: bookingId,
      booking_number: bookingUuid,
      message: 'Бронирование успешно создано'
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating booking:', error);
    res.status(500).json({ 
      error: 'Ошибка при создании бронирования',
      details: error.message 
    });
  } finally {
    client.release();
  }
});

// Получить бронирование по ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT b.*, 
             t.title as tour_title,
             t.main_image_url,
             json_agg(
               json_build_object(
                 'id', bp.id,
                 'full_name', bp.full_name,
                 'birth_date', bp.birth_date,
                 'document_number', bp.document_number
               )
             ) as participants
      FROM bookings b
      LEFT JOIN tours t ON b.tour_id = t.id
      LEFT JOIN booking_participants bp ON b.id = bp.booking_id
      WHERE b.id = $1 OR b.uuid::text = $1
      GROUP BY b.id, t.title, t.main_image_url
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Бронирование не найдено' });
    }
    
    res.json(result.rows[0]);
    
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Ошибка при получении бронирования' });
  }
});

// Обновить статус бронирования
router.patch('/:id/status', [
  body('status').isIn(['pending', 'confirmed', 'cancelled', 'completed'])
], async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const query = `
      UPDATE bookings 
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2 OR uuid::text = $2
      RETURNING *
    `;
    
    const result = await pool.query(query, [status, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Бронирование не найдено' });
    }
    
    res.json(result.rows[0]);
    
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ error: 'Ошибка при обновлении статуса' });
  }
});

module.exports = router;