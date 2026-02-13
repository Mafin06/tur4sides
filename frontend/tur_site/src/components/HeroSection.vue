<template>
  <section class="hero">
    <div class="container hero-container">
      <div class="hero-content">
        <h2 class="hero-title">ТУРЫ ПО</h2>
        <h2 class="hero-title">БАШКОРТОСТАНУ</h2>
        <p class="hero-subtitle">И ВО ВСЕ ЧЕТЫРЕ СТОРОНЫ РОССИИ</p>
      </div>
      
      <div class="search-container">
        <div class="search-form">
          <div class="search-fields">
            <!-- Направление -->
            <div class="search-field">
              <label>Направление</label>
              <select v-model="searchForm.direction_slug" @change="updateDirection">
                <option value="">Все направления</option>
                <option v-for="dir in directions" :key="dir.id" :value="dir.slug">
                  {{ dir.name }}
                </option>
              </select>
            </div>
            
            <!-- Тип тура (используем поля из БД) -->
            <div class="search-field">
              <label>Тип тура</label>
              <select v-model="searchForm.tour_type">
                <option value="">Все типы</option>
                <option value="new">Новинки</option>
                <option value="hot">Горящие</option>
                <option value="family">Семейные</option>
                <option value="gastro">Гастрономические</option>
              </select>
            </div>
            
            <!-- Сезон (вместо месяца) -->
            <div class="search-field">
              <label>Сезон</label>
              <select v-model="searchForm.season">
                <option value="">Любой сезон</option>
                <option value="Весна">Весна</option>
                <option value="Лето">Лето</option>
                <option value="Осень">Осень</option>
                <option value="Зима">Зима</option>
                <option value="Круглый год">Круглый год</option>
              </select>
            </div>
            
            <!-- Бюджет -->
            <div class="search-field">
              <label>Бюджет на человека</label>
              <select v-model="searchForm.budget">
                <option value="">Любой бюджет</option>
                <option value="budget">до 20 000 ₽</option>
                <option value="medium">20 000 - 40 000 ₽</option>
                <option value="premium">от 40 000 ₽</option>
              </select>
            </div>

            <button class="search-btn" @click="handleSearch" :disabled="isLoading">
              <span class="search-icon">🔍</span>
              {{ isLoading ? 'Поиск...' : 'Найти туры' }}
            </button>
          </div>
          
          <div class="quick-filters">
            <span class="quick-label">Быстрый поиск:</span>
            <button 
              class="quick-filter-btn" 
              :class="{ active: quickFilterActive === 'family' }"
              @click="setQuickFilter('family')" 
              :disabled="isLoading"
            >
              👨‍👩‍👧‍👦 Семейные
            </button>
            <button 
              class="quick-filter-btn" 
              :class="{ active: quickFilterActive === 'hot' }"
              @click="setQuickFilter('hot')" 
              :disabled="isLoading"
            >
              🔥 Горящие
            </button>
            <button 
              class="quick-filter-btn" 
              :class="{ active: quickFilterActive === 'bashkiria' }"
              @click="setQuickFilter('bashkiria')" 
              :disabled="isLoading"
            >
              🏔️ По Башкирии
            </button>
            <button 
              class="quick-filter-btn" 
              :class="{ active: quickFilterActive === 'gastro' }"
              @click="setQuickFilter('gastro')" 
              :disabled="isLoading"
            >
              🍽️ Гастротуры
            </button>
          </div>
        </div>
        
        <!-- Результаты поиска -->
        <div v-if="searchResults.length > 0" class="search-results">
          <h3>Найдено туров: {{ searchResults.length }}</h3>
          <div class="results-grid">
            <div v-for="tour in searchResults.slice(0, 3)" :key="tour.id" class="result-card">
              <div class="result-image">
                <img :src="tour.main_image_url || '/img/tour-default.jpg'" :alt="tour.title">
                <span class="result-price">{{ formatPrice(tour.actual_price || tour.price) }} ₽</span>
                <div class="result-badges">
                  <span v-if="tour.is_new" class="badge new">Новинка</span>
                  <span v-if="tour.is_hot" class="badge hot">Горящий</span>
                  <span v-if="tour.is_family" class="badge family">👪</span>
                  <span v-if="tour.is_gastro" class="badge gastro">🍽️</span>
                </div>
              </div>
              <div class="result-info">
                <h4>{{ tour.title }}</h4>
                <p class="result-location">{{ tour.location }}</p>
                <p class="result-dates">
                  {{ formatDuration(tour.duration_days) }} • {{ tour.season || 'Круглый год' }}
                </p>
                <div class="result-rating" v-if="tour.rating">
                  <span class="stars">{{ renderStars(tour.rating) }}</span>
                  <span>({{ tour.review_count || 0 }})</span>
                </div>
                <button class="result-btn" @click="viewTour(tour.id)">
                  Подробнее →
                </button>
              </div>
            </div>
          </div>
          <div v-if="searchResults.length > 3" class="results-more">
            <button class="show-all-btn" @click="showAllResults">
              Показать все {{ searchResults.length }} туров →
            </button>
          </div>
        </div>
        
        <!-- Состояние загрузки -->
        <div v-if="isLoading" class="loading-state">
          <div class="spinner"></div>
          <p>Ищем лучшие туры для вас...</p>
        </div>
        
        <!-- Нет результатов -->
        <div v-if="!isLoading && searchPerformed && searchResults.length === 0" class="no-results">
          <p>По вашему запросу туры не найдены. Попробуйте изменить параметры поиска.</p>
          <button class="reset-btn" @click="resetSearch">Сбросить фильтры</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HeroSection',
  data() {
    return {
      searchForm: {
        direction_slug: '',
        tour_type: '',
        season: '',
        budget: ''
      },
      searchResults: [],
      isLoading: false,
      searchPerformed: false,
      directions: [],
      quickFilterActive: null
    };
  },
  mounted() {
    this.fetchDirections();
    this.loadFromUrlParams();
  },
  methods: {
    // Загрузка направлений из БД
    async fetchDirections() {
      try {
        const response = await axios.get('http://localhost:3000/api/directions');
        this.directions = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке направлений:', error);
      }
    },
    
    loadFromUrlParams() {
      const params = new URLSearchParams(window.location.search);
      if (params.get('direction')) {
        this.searchForm.direction_slug = params.get('direction');
      }
      if (params.get('type')) {
        this.searchForm.tour_type = params.get('type');
        this.quickFilterActive = params.get('type');
      }
      if (params.get('season')) {
        this.searchForm.season = params.get('season');
      }
      
      // Если есть параметры - сразу поиск
      if (Object.keys(this.searchForm).some(key => this.searchForm[key])) {
        setTimeout(() => this.handleSearch(), 500);
      }
    },
    
    updateDirection() {
      // Дополнительная логика при выборе направления
    },
    
    // Основной метод поиска
    async handleSearch() {
      this.isLoading = true;
      this.searchPerformed = true;
      this.searchResults = [];
      
      try {
        const params = {};
        
        // Фильтр по направлению (используем slug)
        if (this.searchForm.direction_slug) {
          params.direction = this.searchForm.direction_slug;
        }
        
        // Фильтр по сезону
        if (this.searchForm.season) {
          params.season = this.searchForm.season;
        }
        
        // Фильтр по типу тура (используем поля из БД)
        if (this.searchForm.tour_type) {
          switch(this.searchForm.tour_type) {
            case 'new':
              params.is_new = true;
              break;
            case 'hot':
              params.is_hot = true;
              break;
            case 'family':
              params.is_family = true;
              break;
            case 'gastro':
              params.is_gastro = true;
              break;
          }
        }
        
        // Фильтр по бюджету
        if (this.searchForm.budget) {
          switch(this.searchForm.budget) {
            case 'budget':
              params.max_price = 20000;
              break;
            case 'medium':
              params.min_price = 20000;
              params.max_price = 40000;
              break;
            case 'premium':
              params.min_price = 40000;
              break;
          }
        }
        
        // Добавляем сортировку по умолчанию
        params.sort = 'newest';
        params.limit = 50; // Получаем достаточно туров
        
        console.log('Параметры запроса:', params);
        
        const response = await axios.get('http://localhost:3000/api/tours', { params });
        let tours = response.data.tours || [];
        
        // Дополнительная фильтрация для гарантии (на случай, если бэкенд не поддерживает все фильтры)
        if (this.searchForm.tour_type) {
          tours = tours.filter(tour => {
            switch(this.searchForm.tour_type) {
              case 'family':
                return tour.is_family === true;
              case 'gastro':
                return tour.is_gastro === true;
              case 'new':
                return tour.is_new === true;
              case 'hot':
                return tour.is_hot === true;
              default:
                return true;
            }
          });
        }
        
        // Фильтр по сезону (на случай, если бэкенд не фильтрует)
        if (this.searchForm.season) {
          tours = tours.filter(tour => 
            tour.season && tour.season.toLowerCase().includes(this.searchForm.season.toLowerCase())
          );
        }
        
        this.searchResults = tours;
        
        // Прокрутка к результатам
        if (tours.length > 0) {
          setTimeout(() => {
            document.querySelector('.search-results')?.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'nearest' 
            });
          }, 100);
        }
        
        // Эмит события для родительского компонента
        this.$emit('search', {
          filters: this.searchForm,
          resultsCount: tours.length,
          results: tours.slice(0, 3)
        });
        
      } catch (error) {
        console.error('Ошибка при поиске туров:', error);
        this.searchResults = [];
      } finally {
        this.isLoading = false;
      }
    },
    
    // Быстрые фильтры
    async setQuickFilter(filterType) {
      // Сбрасываем форму, но сохраняем активный фильтр
      this.searchForm = {
        direction_slug: '',
        tour_type: '',
        season: '',
        budget: ''
      };
      
      this.quickFilterActive = filterType;
      
      if (filterType === 'family') {
        this.searchForm.tour_type = 'family';
      } else if (filterType === 'hot') {
        this.searchForm.tour_type = 'hot';
      } else if (filterType === 'gastro') {
        this.searchForm.tour_type = 'gastro';
      } else if (filterType === 'bashkiria') {
        // Находим slug направления "Башкирия"
        const bashkiria = this.directions.find(d => 
          d.slug === 'bashkiria' || d.name.toLowerCase().includes('башкир')
        );
        if (bashkiria) {
          this.searchForm.direction_slug = bashkiria.slug;
        }
      }
      
      await this.handleSearch();
    },
    
    viewTour(tourId) {
      this.$router.push(`/tour/${tourId}`);
    },
    
    showAllResults() {
      const query = {};
      
      if (this.searchForm.direction_slug) {
        query.direction = this.searchForm.direction_slug;
      }
      if (this.searchForm.tour_type) {
        query.type = this.searchForm.tour_type;
      }
      if (this.searchForm.season) {
        query.season = this.searchForm.season;
      }
      if (this.searchForm.budget) {
        query.budget = this.searchForm.budget;
      }
      
      this.$router.push({
        path: '/tours-russia',
        query
      });
    },
    
    resetSearch() {
      this.searchForm = {
        direction_slug: '',
        tour_type: '',
        season: '',
        budget: ''
      };
      this.searchResults = [];
      this.searchPerformed = false;
      this.quickFilterActive = null;
    },
    
    formatPrice(price) {
      if (!price) return '0';
      return new Intl.NumberFormat('ru-RU').format(price);
    },
    
    formatDuration(days) {
      if (!days) return '';
      const lastDigit = days % 10;
      const lastTwoDigits = days % 100;
      
      if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return `${days} дней`;
      }
      if (lastDigit === 1) return `${days} день`;
      if (lastDigit >= 2 && lastDigit <= 4) return `${days} дня`;
      return `${days} дней`;
    },
    
    renderStars(rating) {
      if (!rating) return '☆☆☆☆☆';
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 >= 0.5;
      const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
      return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
    }
  }
}
</script>

<style scoped>
/* Стили для бейджей */
.result-badges {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.badge {
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  background: rgba(0,0,0,0.7);
}

.badge.new { background: #127698; }
.badge.hot { background: #ff6b6b; }
.badge.family { background: #55c496; }
.badge.gastro { background: #f39c12; }

.quick-filter-btn.active {
  background: #127698;
  color: white;
  border-color: #127698;
}

.reset-btn {
  margin-top: 15px;
  padding: 8px 20px;
  background: transparent;
  border: 2px solid #127698;
  color: #127698;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  background: #127698;
  color: white;
}
.no-results{
  color: #ff4545;
}
.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.377), rgba(0, 0, 0, 0)),
              url('@/assets/img/glavnaya.png') center/cover no-repeat;
  color: white;
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
}

.container.hero-container {
  position: relative;
  z-index: 1;
  width: 100%;
}

.hero-content {
  text-align: center;
  padding: 2rem 0;
  max-width: 800px;
  margin: 0 auto 3rem;
}

.hero-title {
  font-size: 4.5rem;
  margin: 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-top: 1rem;
  opacity: 0.9;
}

/* Контейнер поиска */
.search-container {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  max-width: 1200px;
  margin: 0 auto;
}

/* Форма поиска */
.search-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.search-fields {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
}

.search-field {
  display: flex;
  flex-direction: column;
}

.search-field label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
}

.search-field select {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-field select:focus {
  outline: none;
  border-color: #127698;
  box-shadow: 0 0 0 3px rgba(18, 118, 152, 0.1);
}

.search-field select:hover {
  border-color: #127698;
}

/* Кнопка поиска */
.search-btn {
  background: linear-gradient(135deg, #127698, #0d5a7a);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-btn:hover {
  background: linear-gradient(135deg, #0d5a7a, #083e52);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(18, 118, 152, 0.3);
}

.search-icon {
  font-size: 1.2rem;
}

/* Быстрые фильтры */
.quick-filters {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.quick-label {
  color: #666;
  font-weight: 500;
  font-size: 0.9rem;
}

.quick-filter-btn {
  background: #f0f8ff;
  color: #127698;
  border: 1px solid #b6e7ff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.quick-filter-btn:hover {
  background: #127698;
  color: white;
  border-color: #127698;
}

/* Результаты поиска */
.search-results {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #eee;
  animation: fadeIn 0.5s ease;
}

.search-results h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.result-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  border: 1px solid #e9ecef;
}

.result-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
}

.result-image {
  position: relative;
  height: 140px;
  overflow: hidden;
}

.result-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.result-price {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: #127698;
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-weight: bold;
  font-size: 0.9rem;
}

.result-info {
  padding: 1rem;
}

.result-info h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  line-height: 1.3;
}

.result-info p {
  color: #666;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.result-dates {
  color: #127698;
  font-weight: 500;
  font-size: 0.8rem;
}

.result-btn {
  background: none;
  color: #127698;
  border: none;
  padding: 0.5rem 0;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.3s ease;
}

.result-btn:hover {
  color: #0d5a7a;
  gap: 0.5rem;
}

.results-more {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.show-all-btn {
  background: none;
  color: #127698;
  border: 2px solid #127698;
  padding: 0.75rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.show-all-btn:hover {
  background: #127698;
  color: white;
}

/* Состояние загрузки */
.loading-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #127698;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Адаптивность */
@media (max-width: 1024px) {
  .search-fields {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .results-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .hero-title {
    font-size: 3.5rem;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 2rem 0;
  }
  
  .search-container {
    padding: 1.5rem;
  }
  
  .search-fields {
    grid-template-columns: 1fr;
  }
  
  .results-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .search-btn {
    width: 100%;
    justify-content: center;
  }
  
  .quick-filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .quick-filter-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .search-container {
    padding: 1rem;
  }
}
</style>