<template>
  <div class="tour-card">
    <div class="card-header">
      <div class="card-image">
        <img :src="tour.main_image_url" :alt="tour.title" class="tour-image" />
        <div class="card-overlay">
          <div v-if="tour.is_new" class="badge new">НОВИНКА</div>
          <div v-if="tour.discount_percent" class="badge discount">
            -{{ tour.discount_percent }}%
          </div>
          <div class="direction-badge">{{ tour.direction_name }}</div>
        </div>
      </div>
    </div>

    <div class="card-body">
      <div class="tour-main-info">
        <router-link :to="`/tour/${tour.id}`" class="tour-title-link">
          <h3 class="tour-title">{{ tour.title }}</h3>
        </router-link>
        <div class="location">
          <svg class="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="3"/>
          </svg>
          <span>{{ tour.location }}</span>
        </div>
      </div>

      <div class="tour-details">
        <div class="detail-item">
          <div class="detail-label">Длительность:</div>
          <div class="detail-value">{{ tour.duration_days }} дней</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Организатор:</div>
          <div class="detail-value">{{ tour.organizer_name }}</div>
        </div>
      </div>

      <div class="tour-features">
        <div v-if="tour.transport" class="feature">
          <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M16 3H8C5.23858 3 3 5.23858 3 8V16C3 18.7614 5.23858 21 8 21H16C18.7614 21 21 18.7614 21 16V8C21 5.23858 18.7614 3 16 3Z"/>
            <path d="M9 10H15M9 14H15" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>{{ tour.transport }}</span>
        </div>
        <div v-if="tour.accommodation" class="feature">
          <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"/>
            <path d="M9 22V12H15V22" stroke-width="2"/>
          </svg>
          <span>{{ tour.accommodation }}</span>
        </div>
      </div>
    </div>

    <div class="card-footer">
      <div class="price-section">
        <div class="price-main">
          <span class="price-value">{{ formatPrice(tour.actual_price || tour.price) }}</span>
          <span class="price-label">/чел</span>
        </div>
        <div v-if="tour.old_price" class="price-old">
          {{ formatPrice(tour.old_price) }}
        </div>
      </div>
      
      <router-link :to="`/tour/${tour.id}`" class="book-btn">
        <span class="btn-text">Забронировать</span>
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 5L16 12L9 19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TourCard',
  props: {
    tour: {
      type: Object,
      required: true,
      default: () => ({
        id: null,
        title: '',
        slug: '',
        location: '',
        duration_days: 0,
        organizer_name: '',
        price: 0,
        actual_price: 0,
        old_price: null,
        main_image_url: '',
        is_new: false,
        discount_percent: null,
        direction_name: '',
        transport: '',
        accommodation: ''
      })
    }
  },
  methods: {
    formatPrice(price) {
      if (!price) return '';
      return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
    }
  }
}
</script>

<style scoped>
.tour-card {
  width: 320px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(18, 118, 152, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #eefbff;
}

.tour-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(18, 118, 152, 0.2);
}

/* Header with image */
.card-header {
  position: relative;
  height: 160px;
}

.card-image {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.tour-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.tour-card:hover .tour-image {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%);
}

.badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: white;
  text-transform: uppercase;
}

.badge.new {
  background: #127698;
}

.badge.discount {
  background: linear-gradient(135deg, #ff6b6b, #ff8e53);
}

.direction-badge {
  padding: 4px 10px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  color: #127698;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

/* Body content */
.card-body {
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.tour-main-info {
  margin-bottom: 14px;
}

.tour-title {
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.6rem;
}

.location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #5a6c7d;
  font-size: 0.85rem;
}

.location-icon {
  width: 14px;
  height: 14px;
  color: #127698;
  flex-shrink: 0;
}

/* Details */
.tour-details {
  background: #f8fafc;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 14px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-label {
  color: #7f8c8d;
  font-size: 0.8rem;
  font-weight: 500;
}

.detail-value {
  color: #2c3e50;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: right;
}

/* Features */
.tour-features {
  display: flex;
  gap: 12px;
  margin-top: auto;
}

.feature {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #eefbff;
  border-radius: 8px;
  font-size: 0.8rem;
  color: #127698;
  font-weight: 500;
}

.feature-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

/* Footer */
.card-footer {
  padding: 16px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.price-section {
  display: flex;
  flex-direction: column;
}

.price-main {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.price-value {
  color: #127698;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1;
}

.price-label {
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 500;
}

.price-old {
  color: #94a3b8;
  font-size: 0.8rem;
  text-decoration: line-through;
  margin-top: 2px;
}

/* Book button */
.book-btn {
  background: linear-gradient(135deg, #127698, #0d5a7a);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 16px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  white-space: nowrap;
  text-decoration: none;
}

.book-btn:hover {
  background: linear-gradient(135deg, #0d5a7a, #083e52);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(18, 118, 152, 0.3);
}

.btn-text {
  font-size: 0.8rem;
  letter-spacing: 0.3px;
}

.btn-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.book-btn:hover .btn-icon {
  transform: translateX(3px);
}

/* Responsive */
@media (max-width: 768px) {
  .tour-card {
    width: 100%;
    max-width: 320px;
  }
  
  .card-header {
    height: 140px;
  }
  
  .tour-title {
    font-size: 1rem;
  }
  
  .card-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .book-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .tour-card {
    max-width: none;
  }
  
  .card-body {
    padding: 12px;
  }
  
  .card-footer {
    padding: 12px;
  }
}
</style>