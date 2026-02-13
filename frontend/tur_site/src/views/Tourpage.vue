<template>
  <div class="tour-page">
    <!-- Состояние загрузки -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Загрузка данных о туре...</p>
    </div>

    <!-- Состояние ошибки -->
    <div v-else-if="error" class="error-container">
      <h2>Ошибка загрузки тура</h2>
      <p>{{ error }}</p>
      <button @click="fetchTourData" class="retry-btn">Повторить попытку</button>
    </div>

    <!-- Основной контент -->
    <div v-else>
      <!-- Хлебные крошки -->
      <nav class="breadcrumbs" aria-label="Навигация">
        <div class="container">
          <ol itemscope itemtype="https://schema.org/BreadcrumbList">
            <li
              itemprop="itemListElement"
              itemscope
              itemtype="https://schema.org/ListItem"
            >
              <router-link to="/" itemprop="item">
                <span itemprop="name">Главная</span>
              </router-link>
              <meta itemprop="position" content="1" />
            </li>
            <li
              itemprop="itemListElement"
              itemscope
              itemtype="https://schema.org/ListItem"
            >
              <router-link to="/tours-russia" itemprop="item">
                <span itemprop="name">Туры по России</span>
              </router-link>
              <meta itemprop="position" content="2" />
            </li>
            <li
              itemprop="itemListElement"
              itemscope
              itemtype="https://schema.org/ListItem"
            >
            <router-link :to="`/tours-${tour.direction_slug}`" itemprop="item">
                <span itemprop="name">{{ tour.direction_name }}</span>
              </router-link>
              <meta itemprop="position" content="3" />
            </li>
            <li
              itemprop="itemListElement"
              itemscope
              itemtype="https://schema.org/ListItem"
            >
              <span itemprop="name">{{ tour.title }}</span>
              <meta itemprop="position" content="4" />
            </li>
          </ol>
        </div>
      </nav>

      <!-- Основной контент -->
      <main class="tour-main">
        <div class="container">
          <!-- Заголовок тура -->
          <header class="tour-header">
            <div class="tour-badge" v-if="tour.is_new">Новинка</div>
            <div class="tour-badge" v-if="tour.is_hot">🔥 Горящий</div>
            <h1 class="tour-title">{{ tour.title }}</h1>
            <div class="tour-subtitle">
              <div class="tour-location">
                <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="#127698">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                </svg>
                <span>{{ tour.location }}</span>
              </div>
              <div class="tour-rating">
                <span class="rating-stars">{{ renderStars(tour.rating) }}</span>
                <span class="rating-count">({{ tour.review_count }} отзывов)</span>
              </div>
            </div>
          </header>

          <!-- Галерея изображений -->
          <section class="tour-gallery">
            <div class="gallery-main">
              <img 
                :src="currentImage" 
                :alt="`${tour.title} - главное фото`" 
                class="main-image"
                loading="lazy"
                @click="openLightbox(currentImage)"
              >
              <!-- Стрелки слайдера -->
              <button 
                class="slider-arrow slider-arrow-prev" 
                @click="prevImage"
                aria-label="Предыдущее изображение"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
                </svg>
              </button>
              <button 
                class="slider-arrow slider-arrow-next" 
                @click="nextImage"
                aria-label="Следующее изображение"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </button>
              
              <!-- Счетчик изображений -->
              <div class="image-counter">
                {{ currentImageIndex + 1 }} / {{ allImages.length }}
              </div>
            </div>
            
            <div class="gallery-thumbnails" v-if="allImages.length > 1">
              <img 
                v-for="(img, index) in allImages" 
                :key="index"
                :src="img" 
                :alt="`${tour.title} - фото ${index + 1}`"
                class="thumbnail"
                :class="{ 
                  active: currentImage === img,
                  'thumbnail-next': index === (currentImageIndex + 1) % allImages.length,
                  'thumbnail-prev': index === (currentImageIndex - 1 + allImages.length) % allImages.length
                }"
                @click="selectMainImage(img, index)"
                loading="lazy"
              >
            </div>
          </section>

          <!-- Основная информация и бронирование -->
          <div class="tour-content-wrapper">
            <!-- Левая колонка - информация о туре -->
            <div class="tour-info-column">
              <!-- Краткое описание -->
              <section class="tour-summary">
                <h2 class="section-title">О туре</h2>
                <p class="summary-text">{{ tour.short_description }}</p>
                
                <div v-if="tour.full_description" class="full-description">
                  <h3>Подробное описание</h3>
                  <div v-html="formatDescription(tour.full_description)"></div>
                </div>
              </section>

              <!-- Детали тура -->
              <section class="tour-details">
                <h2 class="section-title">Детали тура</h2>
                
                <div class="details-grid">
                  <div class="detail-card">
                    <div class="detail-icon">📅</div>
                    <div class="detail-content">
                      <h3>Длительность</h3>
                      <p>{{ tour.duration_days }} {{ getDayText(tour.duration_days) }}</p>
                      <small>Сезон: {{ tour.season }}</small>
                    </div>
                  </div>
                  
                  <div class="detail-card">
                    <div class="detail-icon">🚌</div>
                    <div class="detail-content">
                      <h3>Транспорт</h3>
                      <p>{{ tour.transport }}</p>
                      <small>Комфортабельный</small>
                    </div>
                  </div>
                  
                  <div class="detail-card">
                    <div class="detail-icon">🏨</div>
                    <div class="detail-content">
                      <h3>Проживание</h3>
                      <p>{{ tour.accommodation }}</p>
                      <small>{{ tour.hotel_category }}</small>
                    </div>
                  </div>
                  
                  <div class="detail-card">
                    <div class="detail-icon">👥</div>
                    <div class="detail-content">
                      <h3>Группа</h3>
                      <p>до {{ tour.group_size }} человек</p>
                      <small>Минимум: {{ tour.min_group_size }}</small>
                    </div>
                  </div>
                  
                  <div class="detail-card" v-if="tour.meals">
                    <div class="detail-icon">🍽️</div>
                    <div class="detail-content">
                      <h3>Питание</h3>
                      <p>{{ tour.meals }}</p>
                    </div>
                  </div>
                  
                  <div class="detail-card">
                    <div class="detail-icon">⭐</div>
                    <div class="detail-content">
                      <h3>Рейтинг</h3>
                      <p>{{ tour.rating }}/5</p>
                      <small>на основе {{ tour.review_count }} отзывов</small>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Программа тура -->
              <section class="tour-program" v-if="tour.program && tour.program.length > 0">
                <h2 class="section-title">Программа тура</h2>
                
                <div class="program-timeline">
                  <div class="program-day" v-for="day in tour.program" :key="day.id">
                    <div class="day-header">
                      <span class="day-number">День {{ day.day_number }}</span>
                      <span class="day-title">{{ day.title }}</span>
                    </div>
                    <div class="day-content">
                      <p>{{ day.description }}</p>
                      <div class="day-activities" v-if="day.activities">
                        <span class="activity" v-for="activity in day.activities" :key="activity">
                          • {{ activity }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- В стоимость включено -->
              <section class="tour-included" v-if="tour.inclusions && tour.inclusions.length > 0">
                <h2 class="section-title">В стоимость включено</h2>
                
                <div class="included-grid">
                  <div class="included-item" v-for="inclusion in tour.inclusions" :key="inclusion.id">
                    <div class="included-icon">✅</div>
                    <span>{{ inclusion.description }}</span>
                  </div>
                </div>
              </section>

              <!-- Организатор -->
              <section class="tour-organizer" v-if="tour.organizer_name">
                <h2 class="section-title">Организатор тура</h2>
                
                <div class="organizer-card">
                  <div class="organizer-info">
                    <h3>{{ tour.organizer_name }}</h3>
                    <p v-if="tour.organizer_description">{{ tour.organizer_description }}</p>
                    <div class="organizer-contacts">
                      <div class="contact-item" v-if="tour.organizer_phone">
                        <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="#127698">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                        <span>{{ tour.organizer_phone }}</span>
                      </div>
                      <div class="contact-item" v-if="tour.organizer_email">
                        <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="#127698">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                        </svg>
                        <span>{{ tour.organizer_email }}</span>
                      </div>
                      <div class="contact-item" v-if="tour.organizer_rating">
                        <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="#f1c40f">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                        <span>Рейтинг: {{ tour.organizer_rating }}/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Отзывы -->
              <section class="tour-reviews" v-if="tour.reviews && tour.reviews.length > 0">
                <h2 class="section-title">Отзывы туристов</h2>
                
                <div class="reviews-grid">
                  <div class="review-card" v-for="review in tour.reviews" :key="review.id">
                    <div class="review-header">
                      <div class="review-author">
                        <div class="author-avatar">
                          {{ getInitials(review.author_name) }}
                        </div>
                        <div class="author-info">
                          <strong>{{ review.author_name }}</strong>
                          <span>{{ formatDate(review.created_at) }}</span>
                        </div>
                      </div>
                      <div class="review-rating">
                        <span class="stars">{{ renderStars(review.rating) }}</span>
                      </div>
                    </div>
                    <div class="review-content">
                      <p>{{ review.comment }}</p>
                    </div>
                    <div class="review-verified" v-if="review.is_verified">
                      <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="#55c496">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span>Проверенный отзыв</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <!-- Правая колонка - бронирование -->
            <div class="booking-column">
              <div class="booking-card">
                <div class="booking-header">
                  <div class="price-section">
                    <div class="price-main">
                      <span class="price-current">{{ formatPrice(tour.price) }} ₽</span>
                      <span class="price-old" v-if="tour.old_price">{{ formatPrice(tour.old_price) }} ₽</span>
                    </div>
                    <div class="price-per">за 1 человека</div>
                    <div class="discount-badge" v-if="tour.discount_percent">
                      -{{ tour.discount_percent }}%
                    </div>
                  </div>
                </div>

                <!-- Выбор даты -->
                <div class="booking-dates" v-if="tour.available_dates && tour.available_dates.length > 0">
                  <label for="tour-date" class="date-label">
                    <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="#127698">
                      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
                    </svg>
                    Выберите дату:
                  </label>
                  
                  <div class="dates-selector">
                    <select 
                      id="tour-date" 
                      v-model="selectedDateId" 
                      class="date-select"
                      @change="updateSelectedDate"
                    >
                      <option value="" disabled>Выберите дату</option>
                      <option 
                        v-for="date in tour.available_dates" 
                        :key="date.id" 
                        :value="date.id"
                        :disabled="!date.is_available || (date.available_slots - date.booked_slots) <= 0"
                      >
                        {{ formatDateRange(date.start_date, date.end_date) }} 
                        - {{ formatPrice(date.price) }} ₽
                        <span v-if="(date.available_slots - date.booked_slots) <= 0">
                          (мест нет)
                        </span>
                        <span v-else>
                          (осталось {{ date.available_slots - date.booked_slots }} мест)
                        </span>
                      </option>
                    </select>
                  </div>
                </div>

                <!-- Выбор количества -->
                <div class="booking-persons">
                  <label class="persons-label">
                    <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="#127698">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                    </svg>
                    Количество человек:
                  </label>
                  
                  <div class="persons-selector">
                    <button 
                      class="persons-btn minus" 
                      @click="decreasePersons"
                      :disabled="persons <= 1"
                    >−</button>
                    
                    <span class="persons-count">{{ persons }}</span>
                    
                    <button 
                      class="persons-btn plus" 
                      @click="increasePersons"
                      :disabled="persons >= maxPersons"
                    >+</button>
                  </div>
                </div>

                <!-- Итоговая цена -->
                <div class="booking-total">
                  <div class="total-label">Итого:</div>
                  <div class="total-price">{{ formatPrice(totalPrice) }} ₽</div>
                </div>

                <!-- Кнопка бронирования -->
                <button 
                  class="book-btn-primary" 
                  @click="openBookingModal"
                  :disabled="!selectedDateId || isBookingDisabled"
                >
                  <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                  </svg>
                  {{ bookingButtonText }}
                </button>

                <!-- Быстрое бронирование -->
                <div class="quick-booking">
                  <p class="quick-text">Быстрое бронирование по телефону:</p>
                  <a href="tel:+74951234567" class="quick-phone">
                    <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="#127698">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    +7 (495) 123-45-67
                  </a>
                </div>

                <!-- Гарантии -->
                <div class="booking-guarantees">
                  <div class="guarantee-item">
                    <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="#55c496">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                    </svg>
                    <span>Безопасная оплата</span>
                  </div>
                  <div class="guarantee-item">
                    <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="#55c496">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Лучшая цена</span>
                  </div>
                  <div class="guarantee-item">
                    <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="#55c496">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                    </svg>
                    <span>Подтверждение за 24 часа</span>
                  </div>
                </div>
              </div>

              <!-- Направление -->
              <div class="direction-info" v-if="tour.direction_name">
                <h3>Направление</h3>
                <div class="direction-card">
                  <h4>{{ tour.direction_name }}</h4>
                  <p v-if="tour.direction_description">{{ tour.direction_description }}</p>
                  <router-link 
                    :to="`/tours/${tour.direction_slug}`" 
                    class="direction-link"
                  >
                    Все туры по {{ tour.direction_name.toLowerCase() }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ -->
          <section class="tour-faq" v-if="tour.faq && tour.faq.length > 0">
            <h2 class="section-title">Частые вопросы о туре</h2>
            
            <div class="faq-accordion">
              <div 
                class="faq-item" 
                v-for="(faq, index) in tour.faq" 
                :key="faq.id"
                :class="{ active: activeFaq === index }"
              >
                <div class="faq-question" @click="toggleFaq(index)">
                  <span>{{ faq.question }}</span>
                  <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="#127698">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                  </svg>
                </div>
                <div class="faq-answer">
                  <p>{{ faq.answer }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Похожие туры -->
          <section class="related-tours" v-if="similarTours.length > 0">
            <h2 class="section-title">Похожие туры</h2>
            
            <div class="related-grid">
              <div 
                class="related-card" 
                v-for="related in similarTours" 
                :key="related.id"
                @click="goToTour(related.id)"
              >
                <img :src="related.main_image_url || '/img/tour-default.jpg'" :alt="related.title" loading="lazy">
                <div class="related-content">
                  <h3>{{ related.title }}</h3>
                  <div class="related-location">
                    <svg class="icon" width="14" height="14" viewBox="0 0 24 24" fill="#666">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                    </svg>
                    <span>{{ related.location }}</span>
                  </div>
                  <div class="related-price">от {{ formatPrice(related.price) }} ₽</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <!-- Модальное окно бронирования -->
      <!-- Модальное окно бронирования -->
      <Teleport to="body">
        <div 
          class="modal-overlay" 
          v-if="showBookingModal" 
          @click.self="closeModal"
        >
          <div class="modal-content booking-modal">
            <div class="modal-header">
              <h2>Бронирование тура</h2>
              <button class="modal-close" @click="closeModal" aria-label="Закрыть">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6L18 18" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
            
            <div class="modal-body">
              <!-- Сводка бронирования -->
              <div class="booking-summary">
                <div class="summary-header">
                  <img 
                    :src="tour.main_image_url || '/img/tour-default.jpg'" 
                    :alt="tour.title"
                    class="summary-image"
                    @error="handleImageError"
                  >
                  <div class="summary-info">
                    <h3>{{ tour.title }}</h3>
                    <div class="summary-details">
                      <span>📍 {{ tour.location }}</span>
                      <span>📅 {{ selectedDate ? formatDateRange(selectedDate.start_date, selectedDate.end_date) : '' }}</span>
                      <span>👥 {{ persons }} {{ getPersonText(persons) }}</span>
                    </div>
                  </div>
                </div>
                <div class="summary-price">
                  <span class="price-label">К оплате:</span>
                  <span class="price-value">{{ formatPrice(totalPrice) }} ₽</span>
                </div>
              </div>

              <!-- Форма бронирования -->
              <form @submit.prevent="submitBooking" class="booking-form">
                <!-- Контактная информация -->
                <div class="form-section">
                  <h3>Контактная информация</h3>
                  <div class="form-grid">
                    <div class="form-group full-width">
                      <label for="customer-name">
                        ФИО полностью *
                        <span class="field-hint">Как в паспорте</span>
                      </label>
                      <input 
                        type="text" 
                        id="customer-name" 
                        v-model="bookingForm.name"
                        required
                        placeholder="Иванов Иван Иванович"
                        class="form-control"
                      >
                    </div>
                    
                    <div class="form-group">
                      <label for="customer-phone">
                        Телефон *
                        <span class="field-hint">Для связи</span>
                      </label>
                      <input 
                        type="tel" 
                        id="customer-phone" 
                        v-model="bookingForm.phone"
                        required
                        placeholder="+7 (___) ___-__-__"
                        class="form-control"
                        @input="formatPhone"
                      >
                    </div>
                    
                    <div class="form-group">
                      <label for="customer-email">
                        Email
                        <span class="field-hint">Для подтверждения</span>
                      </label>
                      <input 
                        type="email" 
                        id="customer-email" 
                        v-model="bookingForm.email"
                        placeholder="example@mail.ru"
                        class="form-control"
                      >
                    </div>
                  </div>
                </div>

                <!-- Дополнительная информация -->
                <div class="form-section">
                  <h3>Дополнительная информация</h3>
                  
                  <div class="form-group">
                    <label for="comments">Комментарий к бронированию</label>
                    <textarea 
                      id="comments" 
                      v-model="bookingForm.comments"
                      rows="3"
                      placeholder="Особые пожелания, диета, аллергии, дополнительные услуги..."
                      class="form-control"
                    ></textarea>
                  </div>
                </div>

                <!-- Участники тура -->
                <div class="form-section" v-if="persons >= 1">
                  <h3>Участники тура</h3>
                  <p class="section-note">Укажите данные всех участников</p>
                  
                  <div class="participants-list">
                    <div 
                      v-for="(participant, index) in bookingForm.participants" 
                      :key="index"
                      class="participant-item"
                    >
                      <div class="participant-header">
                        <span>Участник {{ index + 1 }}</span>
                        <button 
                          v-if="bookingForm.participants.length > 1 && index > 0"
                          type="button"
                          class="remove-participant"
                          @click="removeParticipant(index)"
                        >
                          Удалить
                        </button>
                      </div>
                      
                      <div class="participant-form">
                        <div class="form-group">
                          <label :for="'participant-name-' + index">ФИО *</label>
                          <input 
                            :id="'participant-name-' + index"
                            v-model="participant.full_name"
                            :required="index === 0"
                            type="text"
                            placeholder="Иванов Иван Иванович"
                            class="form-control"
                          >
                        </div>
                        
                        <div class="form-group">
                          <label :for="'participant-birth-' + index">Дата рождения</label>
                          <input 
                            :id="'participant-birth-' + index"
                            v-model="participant.birth_date"
                            type="date"
                            class="form-control"
                          >
                        </div>
                        
                        <div class="form-group">
                          <label :for="'participant-doc-' + index">Документ (паспорт)</label>
                          <input 
                            :id="'participant-doc-' + index"
                            v-model="participant.document_number"
                            type="text"
                            placeholder="Серия и номер"
                            class="form-control"
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    v-if="bookingForm.participants.length < persons"
                    type="button"
                    class="add-participant-btn"
                    @click="addParticipant"
                  >
                    + Добавить участника
                  </button>
                </div>

                <!-- Согласие с условиями -->
                <div class="form-section">
                  <div class="form-agreement">
                    <label class="agreement-checkbox">
                      <input 
                        type="checkbox" 
                        v-model="bookingForm.agreement"
                        required
                      >
                      <span class="checkmark"></span>
                      <span>
                        Я согласен на обработку персональных данных и принимаю 
                        <router-link to="/terms" target="_blank">условия бронирования</router-link> *
                      </span>
                    </label>
                  </div>
                  
                  <div class="form-agreement">
                    <label class="agreement-checkbox">
                      <input 
                        type="checkbox" 
                        v-model="bookingForm.newsletter"
                      >
                      <span class="checkmark"></span>
                      <span>Хочу получать новости и специальные предложения</span>
                    </label>
                  </div>
                </div>

                <!-- Кнопки формы -->
                <div class="form-actions">
                  <button 
                    type="button" 
                    class="btn-secondary"
                    @click="closeModal"
                  >
                    Отмена
                  </button>
                  <button 
                    type="submit" 
                    class="btn-primary"
                    :disabled="!isFormValid || isSubmitting"
                  >
                    <span v-if="!isSubmitting">Подтвердить бронирование</span>
                    <span v-else class="btn-loading">
                      <span class="spinner-small"></span>
                      Обработка...
                    </span>
                  </button>
                </div>
              </form>

              <!-- Уведомление об успешном бронировании -->
              <div v-if="bookingSuccess" class="booking-success">
                <div class="success-icon">✅</div>
                <h3>Бронирование отправлено!</h3>
                <p>Номер бронирования: <strong>{{ bookingNumber }}</strong></p>
                <p>Мы отправили подтверждение на ваш email и свяжемся с вами в ближайшее время.</p>
                <button class="btn-primary" @click="closeModal">Закрыть</button>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
    <!-- Уведомление об успешном бронировании -->
    <Teleport to="body">
      <div 
        class="notification-toast" 
        v-if="showSuccessNotification"
        @click="showSuccessNotification = false"
      >
        <div class="notification-icon">✅</div>
        <div class="notification-content">
          <h4>Бронирование подтверждено!</h4>
          <p>Номер бронирования: <strong>{{ bookingNumber }}</strong></p>
          <p class="notification-small">Мы отправили детали на ваш email</p>
        </div>
        <button class="notification-close" @click.stop="showSuccessNotification = false">✕</button>
      </div>
    </Teleport>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const API_BASE_URL = ''; // Оставляем пустым для работы через прокси

export default {
  name: 'TourPage',
  
  setup() {
    // Уведомления
    const showSuccessNotification = ref(false)

    const route = useRoute()
    const router = useRouter()
    const tourId = route.params.id

    
    
    // Состояние загрузки и ошибки
    const loading = ref(true)
    const error = ref(null)
    
    // Данные тура
    const tour = ref({
      id: null,
      title: '',
      location: '',
      short_description: '',
      full_description: '',
      main_image_url: '',
      gallery_images: [],
      price: 0,
      old_price: null,
      discount_percent: null,
      duration_days: 0,
      season: '',
      transport: '',
      accommodation: '',
      meals: '',
      group_size: 0,
      min_group_size: 0,
      hotel_category: '',
      is_new: false,
      is_hot: false,
      rating: 0,
      review_count: 0,
      direction_name: '',
      direction_slug: '',
      direction_description: '',
      organizer_name: '',
      organizer_description: '',
      organizer_phone: '',
      organizer_email: '',
      organizer_rating: 0,
      available_dates: [],
      inclusions: [],
      program: [],
      faq: [],
      reviews: []
    })
    
    // Похожие туры
    const similarTours = ref([])
    
    // Все изображения тура
    const allImages = computed(() => {
      const images = [tour.value.main_image_url]
      if (tour.value.gallery_images && Array.isArray(tour.value.gallery_images)) {
        return images.concat(tour.value.gallery_images)
      }
      return images
    })
    
    // Слайдер
    const currentImageIndex = ref(0)
    const currentImage = computed(() => allImages.value[currentImageIndex.value] || '/img/tour-default.jpg')
    
    // Бронирование
    const selectedDateId = ref('')
    const persons = ref(2)
    const maxPersons = computed(() => {
      if (!selectedDate.value) return 10
      return Math.min(10, selectedDate.value.available_slots - selectedDate.value.booked_slots)
    })
    
    const selectedDate = computed(() => {
      if (!tour.value.available_dates) return null
      return tour.value.available_dates.find(date => date.id == selectedDateId.value)
    })
    
    const isBookingDisabled = computed(() => {
      if (!selectedDate.value) return true
      return (selectedDate.value.available_slots - selectedDate.value.booked_slots) <= 0
    })
    
    const bookingButtonText = computed(() => {
      if (isBookingDisabled.value) return 'Мест нет'
      if (!selectedDateId.value) return 'Выберите дату'
      return 'Забронировать тур'
    })
    
    const selectedDatePrice = computed(() => {
      return selectedDate.value ? selectedDate.value.price : tour.value.price
    })
    
    const totalPrice = computed(() => {
      return selectedDatePrice.value * persons.value
    })
    
    // FAQ
    const activeFaq = ref(null)
    
    // Модальное окно
    const showBookingModal = ref(false)
    
    // Методы
    const fetchTourData = async () => {
  loading.value = true
  error.value = null
  console.log('Загрузка данных для тура:', tourId)
  
  try {
    // Используйте полный URL к вашему API
    const response = await fetch(`http://localhost:3000/api/tours/${tourId}`)
    
    console.log('Ответ API:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    })
    
    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log('Получены данные тура:', data)
        
        // Обрабатываем JSON поля
        if (data.gallery_images && typeof data.gallery_images === 'string') {
          try {
            data.gallery_images = JSON.parse(data.gallery_images)
          } catch (e) {
            console.error('Ошибка парсинга gallery_images:', e)
            data.gallery_images = []
          }
        }
        
        // Обрабатываем activities если они в JSON
        if (data.program && Array.isArray(data.program)) {
          data.program = data.program.map(day => {
            if (day.activities && typeof day.activities === 'string') {
              try {
                day.activities = JSON.parse(day.activities)
              } catch (e) {
                console.error('Ошибка парсинга activities:', e)
                day.activities = []
              }
            }
            return day
          })
        }
        
        // Обновляем данные тура
        Object.keys(data).forEach(key => {
          if (data[key] !== undefined) {
            tour.value[key] = data[key]
          }
        })
        
        // Устанавливаем первую доступную дату по умолчанию
        if (data.available_dates && data.available_dates.length > 0) {
          const availableDate = data.available_dates.find(date => 
            date.is_available && (date.available_slots - date.booked_slots) > 0
          )
          if (availableDate) {
            selectedDateId.value = availableDate.id
          }
        }
        
        // Если есть похожие туры в ответе
        if (data.similarTours) {
          similarTours.value = data.similarTours
        } else if (data.direction_slug) {
          // Загружаем похожие туры отдельно
          fetchSimilarTours(data.direction_slug)
        }
        
      } catch (err) {
        console.error('Ошибка загрузки тура:', err)
        error.value = err.message || 'Не удалось загрузить данные о туре'
        
        // Показываем тестовые данные для отладки
        if (process.env.NODE_ENV === 'development') {
          console.log('Используем тестовые данные для разработки')
          tour.value = {
            ...tour.value,
            id: tourId,
            title: `Тур #${tourId}`,
            location: 'Тестовое местоположение',
            short_description: 'Тестовое описание тура',
            price: 15000,
            duration_days: 5,
            rating: 4.5,
            review_count: 10,
            direction_name: 'Тестовое направление'
          }
          error.value = null
        }
      } finally {
        loading.value = false
      }
    }
    
    const fetchSimilarTours = async (directionId) => {
      try {
        const response = await fetch(`/api/tours/direction/${tour.value.direction_slug}?limit=3`)
        if (response.ok) {
          const data = await response.json()
          similarTours.value = data.filter(t => t.id !== tour.value.id).slice(0, 3)
        }
      } catch (err) {
        console.error('Ошибка загрузки похожих туров:', err)
      }
    }
    
    const formatPrice = (price) => {
      return new Intl.NumberFormat('ru-RU').format(price)
    }
    
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    }
    
    const formatDateRange = (startDate, endDate) => {
      const start = new Date(startDate)
      const end = new Date(endDate)
      
      if (start.getMonth() === end.getMonth()) {
        return `${start.getDate()} - ${end.getDate()} ${start.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}`
      }
      
      return `${start.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })} - ${end.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}`
    }
    
    const getDayText = (days) => {
      const lastDigit = days % 10
      const lastTwoDigits = days % 100
      
      if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return 'дней'
      }
      
      if (lastDigit === 1) {
        return 'день'
      }
      
      if (lastDigit >= 2 && lastDigit <= 4) {
        return 'дня'
      }
      
      return 'дней'
    }
    
    const renderStars = (rating) => {
      const fullStars = Math.floor(rating)
      const halfStar = rating % 1 >= 0.5
      const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
      
      return '★'.repeat(fullStars) + (halfStar ? '☆' : '') + '☆'.repeat(emptyStars)
    }
    
    const getInitials = (name) => {
      if (!name) return '?'
      return name.split(' ').map(n => n[0]).join('').toUpperCase()
    }
    
    const formatDescription = (text) => {
      return text.replace(/\n/g, '<br>').replace(/\*(.*?)\*/g, '<strong>$1</strong>')
    }
    
    const increasePersons = () => {
      if (persons.value < maxPersons.value) {
        persons.value++
      }
    }
    
    const decreasePersons = () => {
      if (persons.value > 1) {
        persons.value--
      }
    }
    
    const updateSelectedDate = () => {
      persons.value = Math.min(persons.value, maxPersons.value)
    }
    
    const selectMainImage = (img, index) => {
      currentImageIndex.value = index
    }
    
    const nextImage = () => {
      currentImageIndex.value = (currentImageIndex.value + 1) % allImages.value.length
    }
    
    const prevImage = () => {
      currentImageIndex.value = (currentImageIndex.value - 1 + allImages.value.length) % allImages.value.length
    }
    
    const toggleFaq = (index) => {
      activeFaq.value = activeFaq.value === index ? null : index
    }
    
    // Данные формы бронирования
    const bookingForm = ref({
      name: '',
      phone: '',
      email: '',
      comments: '',
      participants: [],
      agreement: false,
      newsletter: false
    })

    // Состояние отправки формы
    const isSubmitting = ref(false)
    const bookingSuccess = ref(false)
    const bookingNumber = ref('')

    // Инициализация участников
    const initializeParticipants = () => {
      console.log('Инициализация участников, количество:', persons.value)
      
      const participants = []
      
      // Создаем участников в зависимости от количества человек
      for (let i = 0; i < persons.value; i++) {
        // Если это первый участник, используем ФИО из формы, если оно уже есть
        if (i === 0) {
          participants.push({
            full_name: bookingForm.value.name || '',
            birth_date: '',
            document_number: ''
          })
        } else {
          participants.push({
            full_name: '',
            birth_date: '',
            document_number: ''
          })
        }
      }
      
      bookingForm.value.participants = participants
    }

    // Следим за изменением количества человек в реальном времени
    watch(persons, (newVal, oldVal) => {
      if (showBookingModal.value) {
        console.log(`Количество человек изменилось: ${oldVal} -> ${newVal}`)
        
        const currentParticipants = [...bookingForm.value.participants]
        
        if (newVal > currentParticipants.length) {
          // Добавляем новых участников
          for (let i = currentParticipants.length; i < newVal; i++) {
            currentParticipants.push({
              full_name: '',
              birth_date: '',
              document_number: ''
            })
          }
        } else if (newVal < currentParticipants.length) {
          // Удаляем лишних участников (сохраняем только первых newVal)
          currentParticipants.splice(newVal)
        }
        
        bookingForm.value.participants = currentParticipants
      }
    })
    // Валидация формы
    const isFormValid = computed(() => {
      return bookingForm.value.name && 
            bookingForm.value.phone && 
            bookingForm.value.agreement &&
            bookingForm.value.participants.every(p => p.full_name)
    })

    // Форматирование телефона
    const formatPhone = (e) => {
      let value = e.target.value.replace(/\D/g, '')
      if (value.length > 0) {
        if (value.length === 1) {
          value = `+7 (${value}`
        } else if (value.length <= 4) {
          value = `+7 (${value.slice(1)}`
        } else if (value.length <= 7) {
          value = `+7 (${value.slice(1, 4)}) ${value.slice(4)}`
        } else if (value.length <= 9) {
          value = `+7 (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7)}`
        } else {
          value = `+7 (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7, 9)}-${value.slice(9, 11)}`
        }
        bookingForm.value.phone = value
      }
    }

    // Добавление участника
    const addParticipant = () => {
      if (bookingForm.value.participants.length < persons.value) {
        bookingForm.value.participants.push({
          full_name: '',
          birth_date: '',
          document_number: ''
        })
      }
    }

    // Удаление участника
    const removeParticipant = (index) => {
      bookingForm.value.participants.splice(index, 1)
    }

    // Склонение слова "человек"
    const getPersonText = (count) => {
      const lastDigit = count % 10
      const lastTwoDigits = count % 100
      
      if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return 'человек'
      }
      if (lastDigit === 1) {
        return 'человек'
      }
      if (lastDigit >= 2 && lastDigit <= 4) {
        return 'человека'
      }
      return 'человек'
    }

    // Обработка ошибки загрузки изображения
    const handleImageError = (e) => {
      e.target.src = '/img/tour-default.jpg'
    }

    // Отправка бронирования
    const submitBooking = async () => {
    if (!isFormValid.value) return
    
    isSubmitting.value = true
    
    try {
      // Формируем данные для отправки
      const bookingData = {
        tour_id: tour.value.id,
        tour_date_id: selectedDateId.value,
        customer_name: bookingForm.value.name,
        customer_phone: bookingForm.value.phone,
        customer_email: bookingForm.value.email || null,
        persons_count: persons.value,
        total_price: totalPrice.value,
        tour_date: selectedDate.value.start_date,
        comments: bookingForm.value.comments || null,
        participants: bookingForm.value.participants
      }
      
      console.log('Отправка бронирования:', bookingData)
      
      // Отправляем запрос на сервер
      const response = await fetch('http://localhost:3000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Ошибка при бронировании')
      }
      
      const result = await response.json()
      
      // Сохраняем номер бронирования
      bookingNumber.value = result.booking_number || result.uuid || `BK-${Date.now()}`
      
      // Показываем уведомление
      showSuccessNotification.value = true
      
      // Автоматически скрываем уведомление через 5 секунд
      setTimeout(() => {
        showSuccessNotification.value = false
      }, 5000)
      
      // Закрываем модальное окно
      closeModal()
      
      console.log('Бронирование успешно создано:', result)
      
    } catch (error) {
      console.error('Ошибка при бронировании:', error)
      alert(`Ошибка при бронировании: ${error.message}`)
    } finally {
      isSubmitting.value = false
    }
  }

    const openBookingModal = () => {
      if (isBookingDisabled.value || !selectedDateId.value) return
      
      // Сброс формы
      bookingForm.value = {
        name: '',
        phone: '',
        email: '',
        comments: '',
        participants: [],
        agreement: false,
        newsletter: false
      }
      bookingSuccess.value = false
      isSubmitting.value = false
      
      // Инициализация участников
      initializeParticipants()
      
      showBookingModal.value = true
    }

    const closeModal = () => {
      showBookingModal.value = false
      bookingSuccess.value = false // Это можно удалить, если переменная больше не нужна
    }
    
    const goToTour = (id) => {
      router.push(`/tour/${id}`)
    }
    
    // Lifecycle hooks
    onMounted(() => {
      fetchTourData()
      
      // Слушаем изменения параметра маршрута
      watch(() => route.params.id, (newId) => {
        if (newId) {
          fetchTourData()
        }
      })
    })
    
    return {
      showSuccessNotification,
      // Данные
      loading,
      error,
      tour,
      similarTours,
      
      // Слайдер
      currentImage,
      currentImageIndex,
      allImages,
      
      // Бронирование
      selectedDateId,
      persons,
      maxPersons,
      selectedDate,
      isBookingDisabled,
      bookingButtonText,
      totalPrice,
      
      // FAQ
      activeFaq,
      
      // Модальное окно
      showBookingModal,
      // Новые переменные
      bookingForm,
      isSubmitting,
      bookingSuccess,
      bookingNumber,
      isFormValid,
      
      // Новые методы
      formatPhone,
      addParticipant,
      removeParticipant,
      getPersonText,
      handleImageError,
      submitBooking,
      initializeParticipants,
      // Методы
      fetchTourData,
      formatPrice,
      formatDate,
      formatDateRange,
      getDayText,
      renderStars,
      getInitials,
      formatDescription,
      increasePersons,
      decreasePersons,
      updateSelectedDate,
      selectMainImage,
      nextImage,
      prevImage,
      toggleFaq,
      openBookingModal,
      closeModal,
      goToTour,

      
    }
  }
}
</script>

<style scoped>

/* Уведомление об успешном бронировании */
.notification-toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(18, 118, 152, 0.2);
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  max-width: 400px;
  width: 100%;
  animation: slideInRight 0.3s ease;
  z-index: 9999;
  border-left: 6px solid #55c496;
  cursor: pointer;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.notification-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.notification-content {
  flex: 1;
}

.notification-content h4 {
  color: #2c3e50;
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.notification-content p {
  color: #5a6c7d;
  margin: 0 0 5px 0;
  font-size: 0.95rem;
}

.notification-content strong {
  color: #127698;
  font-weight: 700;
}

.notification-small {
  font-size: 0.8rem !important;
  color: #7f8c8d !important;
  margin-top: 5px !important;
}

.notification-close {
  background: none;
  border: none;
  color: #95a5a6;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: color 0.2s ease;
}

.notification-close:hover {
  color: #e74c3c;
}

/* Адаптивность для уведомления */
@media (max-width: 768px) {
  .notification-toast {
    bottom: 20px;
    right: 20px;
    left: 20px;
    max-width: none;
    width: auto;
  }
}

@media (max-width: 480px) {
  .notification-toast {
    padding: 15px;
    bottom: 15px;
    right: 15px;
    left: 15px;
  }
  
  .notification-icon {
    font-size: 24px;
  }
  
  .notification-content h4 {
    font-size: 1rem;
  }
}
/* Модальное окно бронирования */
.booking-modal {
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: linear-gradient(135deg, #127698, #0d5a7a);
  color: white;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.modal-close {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.modal-body {
  padding: 30px;
  max-height: calc(90vh - 80px);
  overflow-y: auto;
  background: white;
}

/* Сводка бронирования */
.booking-summary {
  background: #f8fafc;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid #eefbff;
}

.summary-header {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.summary-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.summary-info {
  flex: 1;
}

.summary-info h3 {
  color: #2c3e50;
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  line-height: 1.4;
}

.summary-details {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #5a6c7d;
  font-size: 0.9rem;
}

.summary-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 2px dashed #dee2e6;
  font-size: 1.2rem;
}

.price-label {
  color: #2c3e50;
  font-weight: 600;
}

.price-value {
  color: #127698;
  font-size: 1.8rem;
  font-weight: 700;
}

/* Форма */
.booking-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e9ecef;
}

.form-section h3 {
  color: #2c3e50;
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-section h3:after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, #127698, transparent);
  margin-left: 10px;
}

.section-note {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin: -10px 0 15px 0;
  font-style: italic;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.field-hint {
  font-weight: normal;
  color: #7f8c8d;
  font-size: 0.8rem;
}

.form-control {
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: white;
}

.form-control:hover {
  border-color: #b2d9e8;
}

.form-control:focus {
  outline: none;
  border-color: #127698;
  box-shadow: 0 0 0 4px rgba(18, 118, 152, 0.1);
}

textarea.form-control {
  resize: vertical;
  min-height: 80px;
}

/* Участники */
.participants-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.participant-item {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #eefbff;
}

.participant-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dee2e6;
}

.participant-header span {
  font-weight: 600;
  color: #127698;
}

.remove-participant {
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.remove-participant:hover {
  background: #fee9e7;
}

.participant-form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.add-participant-btn {
  background: transparent;
  border: 2px dashed #127698;
  color: #127698;
  padding: 12px 20px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  font-size: 0.95rem;
}

.add-participant-btn:hover {
  background: #127698;
  color: white;
  border-style: solid;
}

/* Чекбоксы */
.form-agreement {
  margin-bottom: 15px;
}

.agreement-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  color: #2c3e50;
  font-size: 0.95rem;
  line-height: 1.5;
}

.agreement-checkbox input {
  display: none;
}

.checkmark {
  width: 22px;
  height: 22px;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  display: inline-block;
  position: relative;
  flex-shrink: 0;
  transition: all 0.2s ease;
  background: white;
}

.agreement-checkbox input:checked + .checkmark {
  background: #127698;
  border-color: #127698;
}

.agreement-checkbox input:checked + .checkmark::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
}

.agreement-checkbox a {
  color: #127698;
  text-decoration: none;
}

.agreement-checkbox a:hover {
  text-decoration: underline;
}

/* Кнопки формы */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding-top: 20px;
  border-top: 2px solid #e9ecef;
  margin-top: 10px;
}

.btn-secondary,
.btn-primary {
  padding: 14px 30px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-secondary {
  background: white;
  border: 2px solid #dee2e6;
  color: #495057;
}

.btn-secondary:hover {
  background: #f8f9fa;
  border-color: #adb5bd;
}

.btn-primary {
  background: linear-gradient(135deg, #127698, #0d5a7a);
  color: white;
  box-shadow: 0 4px 12px rgba(18, 118, 152, 0.2);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(18, 118, 152, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-loading {
  display: flex;
  align-items: center;
  gap: 10px;
}

.spinner-small {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Успешное бронирование */
.booking-success {
  text-align: center;
  padding: 40px 20px;
  animation: fadeInUp 0.5s ease;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  animation: scaleIn 0.5s ease;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.booking-success h3 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 15px;
}

.booking-success p {
  color: #5a6c7d;
  font-size: 1.1rem;
  margin-bottom: 10px;
  line-height: 1.6;
}

.booking-success strong {
  color: #127698;
  font-size: 1.3rem;
}

.booking-success .btn-primary {
  margin-top: 30px;
  padding: 14px 40px;
}

/* Адаптивность */
@media (max-width: 768px) {
  .modal-content {
    margin: 0;
    border-radius: 0;
    max-height: 100vh;
  }
  
  .modal-body {
    padding: 20px;
  }
  
  .summary-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .summary-image {
    width: 120px;
    height: 120px;
  }
  
  .form-grid,
  .participant-form {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column-reverse;
  }
  
  .btn-secondary,
  .btn-primary {
    width: 100%;
  }
  
  .booking-success h3 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .modal-header {
    padding: 15px 20px;
  }
  
  .modal-header h2 {
    font-size: 1.2rem;
  }
  
  .modal-body {
    padding: 15px;
  }
  
  .booking-summary {
    padding: 15px;
  }
  
  .summary-image {
    width: 100px;
    height: 100px;
  }
  
  .price-value {
    font-size: 1.5rem;
  }
  
  .form-section {
    padding: 15px;
  }
}
/* Стили для состояний загрузки и ошибки */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #127698;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 10px;
  margin: 2rem auto;
  max-width: 600px;
}

.error-container h2 {
  color: #e74c3c;
  margin-bottom: 1rem;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.8rem 2rem;
  background: #127698;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

.retry-btn:hover {
  background: #0d5a7a;
}

/* Остальные стили остаются такими же, но добавлены: */

.discount-badge {
  display: inline-block;
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 0.5rem;
}

.organizer-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  margin-top: 1rem;
}

.organizer-contacts {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
}

.direction-info {
  margin-top: 2rem;
}

.direction-card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #e9ecef;
  margin-top: 1rem;
}

.direction-link {
  display: inline-block;
  margin-top: 1rem;
  color: #127698;
  text-decoration: none;
  font-weight: 600;
}

.direction-link:hover {
  text-decoration: underline;
}

.review-verified {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  color: #55c496;
  font-size: 0.85rem;
}

.related-location {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.full-description {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

.full-description h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.full-description :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.full-description :deep(strong) {
  color: #2c3e50;
}

.full-description :deep(br) {
  margin-bottom: 0.5rem;
}

/* Адаптивность */
@media (max-width: 768px) {
  .organizer-contacts {
    flex-direction: column;
  }
  
  .contact-item {
    font-size: 0.9rem;
  }
}
.tour-page {
  min-height: 100vh;
  background: #f8f9fa;
  margin-top: 5%;
}

/* Хлебные крошки */
.breadcrumbs {
  background: white;
  padding: 3rem 0;
  border-bottom: 1px solid #e9ecef;
}

.breadcrumbs .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.breadcrumbs ol {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.breadcrumbs li {
  display: flex;
  align-items: center;
  color: #666;
}

.breadcrumbs a {
  color: #127698;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumbs a:hover {

  color: #0d5a7a;
  text-decoration: underline;
}

.breadcrumbs li:not(:last-child)::after {
  content: "/";
  margin-left: 0.5rem;
  color: #ccc;
}

/* Контейнер */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  margin-top: 5%;
}

/* Заголовок тура */
.tour-header {
  position: relative;
  margin: 2rem 0 3rem;
}

.tour-badge {
  position: absolute;
  top: -55px;
  left: 0px;
  background: #127698;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  z-index: 1;
}

.tour-title {
  color: #2c3e50;
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.tour-subtitle {
  display: flex;
  align-items: center;
  gap: 2rem;
  color: #666;
}

.tour-location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tour-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rating-stars {
  color: #f1c40f;
}

.rating-count {
  color: #7f8c8d;
  font-size: 0.9rem;
}

/* Галерея */
.tour-gallery {
  margin-bottom: 3rem;
}

.gallery-main {
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.main-image:hover {
  transform: scale(1.02);
}

.main-image.fade-in {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;
  z-index: 10;
}

.slider-arrow:hover {
  background: rgba(0, 0, 0, 0.7);
}

.slider-arrow-prev {
  left: 20px;
}

.slider-arrow-next {
  right: 20px;
}

.image-counter {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  z-index: 10;
}

.gallery-thumbnails {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.5rem 0;
}

.thumbnail {
  width: 100px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.thumbnail:hover {
  border-color: #127698;
  transform: translateY(-2px);
}

.thumbnail.active {
  border-color: #127698;
  box-shadow: 0 0 10px rgba(18, 118, 152, 0.5);
}

.thumbnail-next, .thumbnail-prev {
  opacity: 0.8;
}

/* Основной контент */
.tour-content-wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

/* Стили секций */
.section-title {
  color: #2c3e50;
  font-size: 1.5rem;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #127698;
}

/* Краткое описание */
.tour-summary {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.summary-text {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.tour-highlights {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #2c3e50;
}

/* Детали тура */
.tour-details {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.detail-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #127698;
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-content h3 {
  color: #2c3e50;
  margin: 0 0 0.3rem 0;
  font-size: 1rem;
}

.detail-content p {
  color: #127698;
  font-weight: 600;
  margin: 0 0 0.3rem 0;
}

.detail-content small {
  color: #7f8c8d;
  font-size: 0.85rem;
}

/* Программа тура */
.tour-program {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.program-timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.program-day {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #55c496;
}

.day-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.day-number {
  background: #127698;
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.day-title {
  color: #2c3e50;
  font-weight: 600;
}

.day-content p {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.day-activities {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #7f8c8d;
  font-size: 0.9rem;
}

/* В стоимость включено */
.tour-included {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.included-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.included-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #2c3e50;
}

.included-icon {
  color: #55c496;
}

/* Отзывы */
.tour-reviews {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.reviews-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.review-card {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 10px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.review-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 40px;
  height: 40px;
  background: #127698;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-info strong {
  color: #2c3e50;
}

.author-info span {
  color: #7f8c8d;
  font-size: 0.85rem;
}

.review-rating .stars {
  color: #f1c40f;
  font-size: 1rem;
}

.review-content p {
  color: #666;
  line-height: 1.6;
}

.show-all-reviews {
  width: 100%;
  padding: 1rem;
  background: transparent;
  border: 2px solid #127698;
  color: #127698;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.show-all-reviews:hover {
  background: #127698;
  color: white;
}

/* Карточка бронирования */
.booking-column {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.booking-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 2px solid #eefbff;
}

.booking-header {
  margin-bottom: 2rem;
}

.price-section {
  margin-bottom: 1rem;
}

.price-main {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.price-current {
  color: #127698;
  font-size: 2.5rem;
  font-weight: 700;
}

.price-old {
  color: #95a5a6;
  text-decoration: line-through;
  font-size: 1.5rem;
}

.price-per {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.booking-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
}

.booking-badge small {
  background: white;
  color: #ee5a52;
  padding: 0.1rem 0.5rem;
  border-radius: 10px;
  font-size: 0.8rem;
}

/* Даты бронирования */
.booking-dates {
  margin-bottom: 1.5rem;
}

.date-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 0.8rem;
}

.dates-selector {
  position: relative;
}

.date-select {
  width: 100%;
  padding: 1rem;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
  color: #495057;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s;
}

.date-select:focus {
  outline: none;
  border-color: #127698;
  box-shadow: 0 0 0 3px rgba(18, 118, 152, 0.1);
}

/* Количество человек */
.booking-persons {
  margin-bottom: 1.5rem;
}

.persons-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 0.8rem;
}

.persons-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.persons-btn {
  width: 40px;
  height: 40px;
  background: #eefbff;
  border: 2px solid #127698;
  color: #127698;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s;
}

.persons-btn:hover:not(:disabled) {
  background: #127698;
  color: white;
}

.persons-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.persons-count {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  min-width: 50px;
  text-align: center;
}

/* Итоговая цена */
.booking-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  margin: 1.5rem 0;
  border-top: 2px solid #e9ecef;
  border-bottom: 2px solid #e9ecef;
}

.total-label {
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
}

.total-price {
  color: #127698;
  font-size: 2rem;
  font-weight: 700;
}

/* Кнопка бронирования */
.book-btn-primary {
  width: 100%;
  padding: 1.2rem;
  background: linear-gradient(135deg, #127698, #0d5a7a);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}

.book-btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(18, 118, 152, 0.3);
}

.book-btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Быстрое бронирование */
.quick-booking {
  text-align: center;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 10px;
  margin-bottom: 1.5rem;
}

.quick-text {
  color: #666;
  margin-bottom: 0.8rem;
}

.quick-phone {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #127698;
  font-size: 1.3rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}

.quick-phone:hover {
  color: #0d5a7a;
}

/* Гарантии */
.booking-guarantees {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.guarantee-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #2c3e50;
  font-size: 0.9rem;
}

/* FAQ */
.tour-faq {
  background: white;
  padding: 3rem;
  border-radius: 15px;
  margin-bottom: 4rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.faq-accordion {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  margin-bottom: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  overflow: hidden;
}

.faq-item.active .faq-question svg {
  transform: rotate(180deg);
}

.faq-item.active .faq-answer {
  max-height: 500px;
  padding: 1rem 1.5rem;
}

.faq-question {
  padding: 1.5rem;
  background: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  color: #2c3e50;
}

.faq-question svg {
  transition: transform 0.3s ease;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  color: #666;
  line-height: 1.6;
}

/* Похожие туры */
.related-tours {
  margin-bottom: 4rem;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.related-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.related-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.related-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.related-content {
  padding: 1.5rem;
}

.related-content h3 {
  color: #2c3e50;
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
}

.related-price {
  color: #127698;
  font-size: 1.3rem;
  font-weight: 700;
}

/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 15px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e9ecef;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  border-radius: 15px 15px 0 0;
}

.modal-header h2 {
  color: #2c3e50;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body {
  padding: 2rem;
}

/* Сводка бронирования */
.booking-summary {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.summary-header {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.summary-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.summary-info h3 {
  color: #2c3e50;
  margin: 0 0 0.8rem 0;
}

.summary-details {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  color: #666;
  font-size: 0.9rem;
}

.summary-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #dee2e6;
}

.price-label {
  color: #2c3e50;
  font-weight: 600;
}

.price-value {
  color: #127698;
  font-size: 1.5rem;
  font-weight: 700;
}

/* Форма бронирования */
.booking-form .form-section {
  margin-bottom: 2rem;
}

.booking-form .form-section h3 {
  color: #2c3e50;
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.form-group input,
.form-group select,
.booking-form textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
  color: #495057;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.booking-form textarea:focus {
  outline: none;
  border-color: #127698;
  box-shadow: 0 0 0 3px rgba(18, 118, 152, 0.1);
}

/* Участники */
.participants-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.participant-item {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 10px;
}

.participant-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.participant-header span {
  color: #2c3e50;
  font-weight: 600;
}

.remove-participant {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.2rem 0.5rem;
}

.remove-participant:hover {
  text-decoration: underline;
}

.participant-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.add-participant {
  padding: 1rem;
  background: transparent;
  border: 2px dashed #127698;
  color: #127698;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.add-participant:hover {
  background: #127698;
  color: white;
  border-style: solid;
}

/* Соглашение */
.form-agreement {
  margin: 2rem 0;
}

.agreement-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  cursor: pointer;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
}

.agreement-checkbox input {
  display: none;
}

.agreement-checkbox .checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #dee2e6;
  border-radius: 4px;
  flex-shrink: 0;
  position: relative;
  margin-top: 0.2rem;
}

.agreement-checkbox input:checked + .checkmark::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #127698;
  font-weight: bold;
}

.agreement-checkbox a {
  color: #127698;
  text-decoration: none;
}

.agreement-checkbox a:hover {
  text-decoration: underline;
}

/* Кнопки формы */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
}

.btn-secondary,
.btn-primary {
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary {
  background: white;
  border: 2px solid #dee2e6;
  color: #495057;
}

.btn-secondary:hover {
  background: #f8f9fa;
}

.btn-primary {
  background: linear-gradient(135deg, #127698, #0d5a7a);
  border: none;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(18, 118, 152, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Lightbox стили */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.lightbox-container {
  position: relative;
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
}

.lightbox-close {
  position: absolute;
  top: -50px;
  right: 0;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 10;
}

.lightbox-image-container {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.lightbox-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.lightbox-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;
  z-index: 10;
}

.lightbox-arrow:hover {
  background: rgba(255, 255, 255, 0.4);
}

.lightbox-arrow-prev {
  left: 20px;
}

.lightbox-arrow-next {
  right: 20px;
}

.lightbox-counter {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 1rem;
  z-index: 10;
}

.lightbox-info {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
}

.lightbox-title {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.lightbox-description {
  font-size: 0.9rem;
  opacity: 0.8;
}

.lightbox-controls {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 20px;
}

.lightbox-control-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;
}

.lightbox-control-btn:hover {
  background: rgba(255, 255, 255, 0.4);
}

.lightbox-thumbnails {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  overflow-x: auto;
  background: rgba(0, 0, 0, 0.5);
}

.lightbox-thumbnail {
  width: 60px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.lightbox-thumbnail:hover {
  border-color: #127698;
}

.lightbox-thumbnail.active {
  border-color: #127698;
  box-shadow: 0 0 10px rgba(18, 118, 152, 0.7);
}

/* Адаптивность */
@media (max-width: 992px) {
  .tour-content-wrapper {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .booking-column {
    position: static;
  }
  
  .details-grid,
  .included-grid,
  .related-grid {
    grid-template-columns: 1fr;
  }
  
  .form-grid,
  .participant-form {
    grid-template-columns: 1fr;
  }
  
  .lightbox-container {
    width: 95%;
    height: 95%;
  }
}

@media (max-width: 768px) {
  .tour-title {
    font-size: 2rem;
  }
  
  .tour-subtitle {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .gallery-main {
    height: 300px;
  }
  
  .price-current {
    font-size: 2rem;
  }
  
  .modal-content {
    margin: 0;
    max-height: 100vh;
    border-radius: 0;
  }
  
  .slider-arrow {
    width: 40px;
    height: 40px;
  }
  
  .lightbox-arrow {
    width: 40px;
    height: 40px;
  }
  
  .lightbox-controls {
    bottom: 60px;
  }
}

@media (max-width: 480px) {
  .tour-title {
    font-size: 1.5rem;
  }
  
  .section-title {
    font-size: 1.3rem;
  }
  
  .tour-faq {
    padding: 1.5rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn-secondary,
  .btn-primary {
    width: 100%;
  }
  
  .gallery-main {
    height: 250px;
  }
  
  .thumbnail {
    width: 80px;
    height: 56px;
  }
  
  .lightbox-thumbnail {
    width: 50px;
    height: 33px;
  }
}

/* Иконки */
.icon {
  flex-shrink: 0;
}
</style>