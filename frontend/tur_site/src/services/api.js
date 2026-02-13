import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцепторы для обработки ошибок
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Показываем пользователю сообщение об ошибке
    if (error.response?.status === 404) {
      // Тур не найден
    } else if (error.response?.status === 400) {
      // Неверные данные
    } else if (error.response?.status === 500) {
      // Ошибка сервера
    }
    
    return Promise.reject(error);
  }
);

// Туры
export const tourService = {
  // Получить все туры
  getAll(params = {}) {
    return api.get('/tours', { params });
  },
  
  // Получить тур по ID или slug
  getById(id) {
    return api.get(`/tours/${id}`);
  },
  
  // Получить туры по направлению
  getByDirection(slug, params = {}) {
    return api.get(`/tours/direction/${slug}`, { params });
  },
  
  // Получить популярные туры
  getPopular(limit = 6) {
    return api.get(`/tours/popular/${limit}`);
  },
  
  // Поиск туров
  search(params) {
    return api.get('/tours', { params });
  }
};

// Бронирования
export const bookingService = {
  // Создать бронирование
  create(bookingData) {
    return api.post('/bookings', bookingData);
  },
  
  // Получить статус бронирования
  getStatus(uuid) {
    return api.get(`/bookings/status/${uuid}`);
  },
  
  // Отменить бронирование
  cancel(id) {
    return api.patch(`/bookings/${id}/status`, { status: 'cancelled' });
  }
};

// Направления
export const directionService = {
  getAll() {
    return api.get('/directions');
  },
  
  getBySlug(slug) {
    return api.get(`/directions/${slug}`);
  }
};

// Организаторы
export const organizerService = {
  getAll() {
    return api.get('/organizers');
  },
  
  getById(id) {
    return api.get(`/organizers/${id}`);
  }
};

// Отзывы
export const reviewService = {
  // Получить отзывы для тура
  getByTour(tourId) {
    return api.get(`/reviews/tour/${tourId}`);
  },
  
  // Создать отзыв
  create(reviewData) {
    return api.post('/reviews', reviewData);
  }
};

export default api;