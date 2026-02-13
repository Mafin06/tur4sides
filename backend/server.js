const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Подключение к базе данных
const pool = require('./config/database');

// Тест соединения с БД
pool.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err.message);
  } else {
    console.log('✅ Успешное подключение к PostgreSQL');
  }
});

// Маршруты
const tourRoutes = require('./routes/tours');
const bookingRoutes = require('./routes/bookings');
const directionRoutes = require('./routes/directions');
const organizerRoutes = require('./routes/organizers');
const reviewRoutes = require('./routes/reviews');

app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/directions', directionRoutes);
app.use('/api/organizers', organizerRoutes);
app.use('/api/reviews', reviewRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: 'connected'
  });
});

// Обработка 404 для API маршрутов
app.use((req, res, next) => {
    res.status(404).json({ error: 'Маршрут не найден', path: req.path });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'development' ? err.message : 'Внутренняя ошибка сервера'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
});

// Импорт маршрута бронирований
const bookingsRouter = require('./routes/bookings');

// Подключение маршрутов
app.use('/api/bookings', bookingsRouter);

const sitemapRouter = require('./routes/sitemap');
app.use('/', sitemapRouter);

