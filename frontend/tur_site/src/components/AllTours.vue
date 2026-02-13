<template>
  <section>
    <div class="all_tours">
      <!-- Фильтры -->
      <div class="filters" v-if="directions.length > 0">
        <div class="filter-group">
          <label for="sort">Сортировка:</label>
          <select id="sort" v-model="sortBy" @change="fetchTours">
            <option value="newest">Сначала новые</option>
            <option value="price-asc">По цене (сначала дешевые)</option>
            <option value="price-desc">По цене (сначала дорогие)</option>
            <option value="rating">По рейтингу</option>
          </select>
        </div>
        <div class="filter-group">
          <button
            v-for="filter in filters"
            :key="filter.id"
            :class="{ active: activeFilter === filter.id }"
            @click="applyFilter(filter.id)"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <!-- Популярные туры -->
      <div v-if="popularTours.length > 0">
        <div class="napravlenie">
          <div class="title-wrapper">
            <div class="pattern pattern-left">
              <img :src="patternImage" alt="Узор" class="pattern-img" />
            </div>
            <div class="title-content">
              <h1 id="direction-popular">Популярные туры с лучшими отзывами</h1>
              <p class="subtitle">Лучшие туры по самым выгодным ценам</p>
            </div>
            <div class="pattern pattern-right">
              <img :src="patternImage" alt="Узор" class="pattern-img" />
            </div>
          </div>
        </div>
        
        <!-- Карточки популярных туров для текущей страницы -->
        <div class="tour_cards">
          <TourCard
            v-for="tour in getPaginatedPopularTours()"
            :key="'popular-' + tour.id"
            :tour="tour"
          />
        </div>

        <!-- Пагинация для популярных туров -->
        <div 
          v-if="popularTours.length > 0 && getTotalPagesPopular() > 1"
          class="pagination-wrapper"
        >
          <div class="pagination">
            <!-- Кнопка "Предыдущая" -->
            <button
              class="pagination-btn prev-btn"
              @click="prevPagePopular()"
              :disabled="popularCurrentPage === 1"
            >
              <img
                :src="arrowImage"
                alt="Предыдущая"
                class="arrow-img arrow-left"
              />
            </button>
            
            <!-- Номера страниц -->
            <div class="pagination-pages">
              <!-- Первая страница -->
              <button
                v-if="popularCurrentPage > 3"
                class="page-btn"
                @click="goToPagePopular(1)"
              >
                1
              </button>
              
              <!-- Многоточие слева -->
              <span 
                v-if="popularCurrentPage > 4"
                class="page-dots"
              >
                ...
              </span>
              
              <!-- Страницы вокруг текущей -->
              <button
                v-for="page in getPagesAroundPopular()"
                :key="'popular-page-' + page"
                class="page-btn"
                :class="{ active: popularCurrentPage === page }"
                @click="goToPagePopular(page)"
              >
                {{ page }}
              </button>
              
              <!-- Многоточие справа -->
              <span 
                v-if="popularCurrentPage < getTotalPagesPopular() - 3"
                class="page-dots"
              >
                ...
              </span>
              
              <!-- Последняя страница -->
              <button
                v-if="popularCurrentPage < getTotalPagesPopular() - 2"
                class="page-btn"
                @click="goToPagePopular(getTotalPagesPopular())"
              >
                {{ getTotalPagesPopular() }}
              </button>
            </div>
            
            <!-- Кнопка "Следующая" -->
            <button
              class="pagination-btn next-btn"
              @click="nextPagePopular()"
              :disabled="popularCurrentPage === getTotalPagesPopular()"
            >
              <img
                :src="arrowImage"
                alt="Следующая"
                class="arrow-img arrow-right"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Направления с турами -->
      <div v-for="direction in directionsWithTours" :key="direction.slug">
        <!-- Заголовок направления -->
        <div class="napravlenie">
          <div class="title-wrapper">
            <div class="pattern pattern-left">
              <img :src="patternImage" alt="Узор" class="pattern-img" />
            </div>
            <div class="title-content">
              <h1 :id="'direction-' + direction.slug">{{ direction.name.toUpperCase() }}</h1>
              <p class="subtitle">Лучшие туры по самым выгодным ценам</p>
            </div>
            <div class="pattern pattern-right">
              <img :src="patternImage" alt="Узор" class="pattern-img" />
            </div>
          </div>
        </div>
        
        <!-- Карточки туров для текущей страницы -->
        <div class="tour_cards">
          <TourCard
            v-for="tour in getPaginatedTours(direction.slug)"
            :key="direction.slug + '-' + tour.id"
            :tour="tour"
          />
        </div>

        <!-- Пагинация для направления -->
        <div 
          v-if="getToursByDirection(direction.slug).length > 0 && getTotalPages(direction.slug) > 1"
          class="pagination-wrapper"
        >
          <div class="pagination">
            <!-- Кнопка "Предыдущая" -->
            <button
              class="pagination-btn prev-btn"
              @click="prevPage(direction.slug)"
              :disabled="getCurrentPage(direction.slug) === 1"
            >
              <img
                :src="arrowImage"
                alt="Предыдущая"
                class="arrow-img arrow-left"
              />
            </button>
            
            <!-- Номера страниц -->
            <div class="pagination-pages">
              <!-- Первая страница -->
              <button
                v-if="getCurrentPage(direction.slug) > 3"
                class="page-btn"
                @click="goToPage(direction.slug, 1)"
              >
                1
              </button>
              
              <!-- Многоточие слева -->
              <span 
                v-if="getCurrentPage(direction.slug) > 4"
                class="page-dots"
              >
                ...
              </span>
              
              <!-- Страницы вокруг текущей -->
              <button
                v-for="page in getPagesAround(direction.slug)"
                :key="direction.slug + '-page-' + page"
                class="page-btn"
                :class="{ active: getCurrentPage(direction.slug) === page }"
                @click="goToPage(direction.slug, page)"
              >
                {{ page }}
              </button>
              
              <!-- Многоточие справа -->
              <span 
                v-if="getCurrentPage(direction.slug) < getTotalPages(direction.slug) - 3"
                class="page-dots"
              >
                ...
              </span>
              
              <!-- Последняя страница -->
              <button
                v-if="getCurrentPage(direction.slug) < getTotalPages(direction.slug) - 2"
                class="page-btn"
                @click="goToPage(direction.slug, getTotalPages(direction.slug))"
              >
                {{ getTotalPages(direction.slug) }}
              </button>
            </div>
            
            <!-- Кнопка "Следующая" -->
            <button
              class="pagination-btn next-btn"
              @click="nextPage(direction.slug)"
              :disabled="getCurrentPage(direction.slug) === getTotalPages(direction.slug)"
            >
              <img
                :src="arrowImage"
                alt="Следующая"
                class="arrow-img arrow-right"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Состояние загрузки -->
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Загружаем туры...</p>
      </div>

      <!-- Нет результатов -->
      <div v-if="!loading && allTours.length === 0" class="no-results">
        <p>По вашему запросу туры не найдены. Попробуйте изменить фильтры.</p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import patternImage from "@/assets/img/image 3.png";
import arrowImage from "@/assets/img/arrow.png";
import TourCard from "./TourCard.vue";

const API_URL = 'http://localhost:3000/api';

export default {
  name: "AllTours",
  components: {
    TourCard,
  },
  data() {
    return {
      patternImage: patternImage,
      arrowImage: arrowImage,
      sortBy: "newest",
      activeFilter: "all",
      toursPerPage: 4,
      popularToursPerPage: 4,
      currentPage: {},
      popularCurrentPage: 1,
      loading: false,
      filters: [
        { id: "all", label: "Все туры" },
        { id: "new", label: "Новинки" },
        { id: "hot", label: "Горящие туры" },
        { id: "budget", label: "Бюджетные" },
      ],
      allTours: [],
      directions: [],
      popularTours: []
    };
  },
  computed: {
    // Только направления, в которых есть туры
    directionsWithTours() {
      return this.directions.filter(dir => 
        this.getToursByDirection(dir.slug).length > 0
      );
    },
    
    // Группировка туров по направлениям
    toursByDirection() {
      const grouped = {};
      this.directions.forEach(dir => {
        grouped[dir.slug] = this.allTours.filter(tour => 
          tour.direction_slug === dir.slug
        );
      });
      return grouped;
    }
  },
  mounted() {
    this.fetchDirections();
    this.fetchTours();
    this.fetchPopularTours();
  },
  methods: {
    // Загрузка направлений
    async fetchDirections() {
      try {
        const response = await axios.get(`${API_URL}/directions`);
        this.directions = response.data;
        this.initializePages();
      } catch (error) {
        console.error('Ошибка при загрузке направлений:', error);
      }
    },

    // Инициализация пагинации
    initializePages() {
      const newPages = {};
      this.directions.forEach(dir => {
        newPages[dir.slug] = 1;
      });
      this.currentPage = newPages;
    },

    // Загрузка всех туров
    async fetchTours() {
      this.loading = true;
      try {
        const params = {};
        
        if (this.activeFilter === 'new') {
          params.isNew = true;
        } else if (this.activeFilter === 'hot') {
          params.isHot = true;
        } else if (this.activeFilter === 'budget') {
          params.maxPrice = 20000;
        }

        if (this.sortBy === 'newest') {
          params.sort = 'newest';
        } else if (this.sortBy === 'price-asc') {
          params.sort = 'price_asc';
        } else if (this.sortBy === 'price-desc') {
          params.sort = 'price_desc';
        } else if (this.sortBy === 'rating') {
          params.sort = 'rating';
        }

        const response = await axios.get(`${API_URL}/tours`, { params });
        this.allTours = response.data.tours || [];
        this.resetPages();
        
      } catch (error) {
        console.error('Ошибка при загрузке туров:', error);
        this.allTours = [];
      } finally {
        this.loading = false;
      }
    },

    // Загрузка популярных туров
    async fetchPopularTours() {
      try {
        const response = await axios.get(`${API_URL}/tours/popular/20`); // Загружаем больше, чтобы хватило на пагинацию
        this.popularTours = response.data.filter(tour => 
          tour.rating >= 4.8 || tour.review_count > 10
        );
        this.popularCurrentPage = 1; // Сбрасываем на первую страницу при загрузке
      } catch (error) {
        console.error('Ошибка при загрузке популярных туров:', error);
        this.popularTours = [];
      }
    },

    // --- Методы для пагинации популярных туров ---
    
    // Получение туров для текущей страницы популярных
    getPaginatedPopularTours() {
      const start = (this.popularCurrentPage - 1) * this.popularToursPerPage;
      const end = start + this.popularToursPerPage;
      return this.popularTours.slice(start, end);
    },

    // Получение общего количества страниц для популярных туров
    getTotalPagesPopular() {
      return Math.max(1, Math.ceil(this.popularTours.length / this.popularToursPerPage));
    },

    // Получение страниц вокруг текущей для популярных туров
    getPagesAroundPopular() {
      const currentPage = this.popularCurrentPage;
      const totalPages = this.getTotalPagesPopular();
      const pages = [];
      
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);
      
      // Корректируем, чтобы всегда показывать 5 страниц (если возможно)
      if (end - start < 4) {
        if (start === 1) {
          end = Math.min(totalPages, start + 4);
        } else if (end === totalPages) {
          start = Math.max(1, end - 4);
        }
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      return pages;
    },

    // Предыдущая страница для популярных туров
    prevPagePopular() {
      if (this.popularCurrentPage > 1) {
        this.popularCurrentPage--;
        this.scrollToPopular();
      }
    },

    // Следующая страница для популярных туров
    nextPagePopular() {
      const totalPages = this.getTotalPagesPopular();
      if (this.popularCurrentPage < totalPages) {
        this.popularCurrentPage++;
        this.scrollToPopular();
      }
    },

    // Переход на конкретную страницу для популярных туров
    goToPagePopular(page) {
      const totalPages = this.getTotalPagesPopular();
      if (page >= 1 && page <= totalPages) {
        this.popularCurrentPage = page;
        this.scrollToPopular();
      }
    },

    // Прокрутка к разделу популярных туров
    scrollToPopular() {
      setTimeout(() => {
        const element = document.getElementById('direction-popular');
        if (element) {
          element.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
          });
        }
      }, 100);
    },

    // --- Методы для пагинации направлений (остаются без изменений) ---
    
    // Получение текущей страницы для направления
    getCurrentPage(directionSlug) {
      return this.currentPage[directionSlug] || 1;
    },

    // Применение фильтра
    applyFilter(filterId) {
      this.activeFilter = filterId;
      this.fetchTours();
    },

    // Получение туров по направлению
    getToursByDirection(directionSlug) {
      return this.toursByDirection[directionSlug] || [];
    },

    // Получение туров для текущей страницы направления
    getPaginatedTours(directionSlug) {
      const tours = this.getToursByDirection(directionSlug);
      const currentPage = this.getCurrentPage(directionSlug);
      const start = (currentPage - 1) * this.toursPerPage;
      const end = start + this.toursPerPage;
      return tours.slice(start, end);
    },

    // Получение общего количества страниц для направления
    getTotalPages(directionSlug) {
      const tours = this.getToursByDirection(directionSlug);
      return Math.max(1, Math.ceil(tours.length / this.toursPerPage));
    },

    // Получение страниц вокруг текущей для направления
    getPagesAround(directionSlug) {
      const currentPage = this.getCurrentPage(directionSlug);
      const totalPages = this.getTotalPages(directionSlug);
      const pages = [];
      
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);
      
      if (end - start < 4) {
        if (start === 1) {
          end = Math.min(totalPages, start + 4);
        } else if (end === totalPages) {
          start = Math.max(1, end - 4);
        }
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      return pages;
    },

    // Предыдущая страница для направления
    prevPage(directionSlug) {
      const currentPage = this.getCurrentPage(directionSlug);
      if (currentPage > 1) {
        this.currentPage = {
          ...this.currentPage,
          [directionSlug]: currentPage - 1
        };
        this.scrollToDirection(directionSlug);
      }
    },

    // Следующая страница для направления
    nextPage(directionSlug) {
      const currentPage = this.getCurrentPage(directionSlug);
      const totalPages = this.getTotalPages(directionSlug);
      if (currentPage < totalPages) {
        this.currentPage = {
          ...this.currentPage,
          [directionSlug]: currentPage + 1
        };
        this.scrollToDirection(directionSlug);
      }
    },

    // Переход на конкретную страницу для направления
    goToPage(directionSlug, page) {
      const totalPages = this.getTotalPages(directionSlug);
      if (page >= 1 && page <= totalPages) {
        this.currentPage = {
          ...this.currentPage,
          [directionSlug]: page
        };
        this.scrollToDirection(directionSlug);
      }
    },

    // Сброс всех страниц на 1
    resetPages() {
      const newPages = {};
      this.directions.forEach(dir => {
        newPages[dir.slug] = 1;
      });
      this.currentPage = newPages;
    },

    // Прокрутка к направлению
    scrollToDirection(directionSlug) {
      setTimeout(() => {
        const element = document.getElementById(`direction-${directionSlug}`);
        if (element) {
          element.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
          });
        }
      }, 100);
    }
  },
  watch: {
    // Инициализация пагинации при загрузке направлений
    directions: {
      handler(newDirections) {
        if (newDirections.length > 0) {
          this.initializePages();
        }
      },
      deep: true,
      immediate: true
    },
    
    // Обновление при изменении сортировки
    sortBy() {
      this.fetchTours();
    },

    // Сбрасываем страницу популярных туров при изменении данных
    popularTours: {
      handler() {
        this.popularCurrentPage = 1;
      },
      deep: true
    }
  }
};
</script>

<style scoped>
/* Все стили остаются без изменений */
.loading {
  text-align: center;
  padding: 3rem;
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

.napravlenie {
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 3rem;
}

.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 0.5rem;
}

.title-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.napravlenie h1 {
  color: #127698;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  white-space: nowrap;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.pattern {
  display: flex;
  align-items: center;
  height: 40px;
  flex: 1;
  width: 150px;
  margin-bottom: 2.5%;
}

.pattern-img {
  width: 100%;
  height: 40px;
  object-fit: contain;
  opacity: 0.7;
}

.pattern-left {
  justify-content: flex-end;
}

.pattern-right {
  justify-content: flex-start;
}

section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 100vh;
}

.all_tours {
  max-width: 1400px;
  width: 100%;
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-group label {
  font-weight: bold;
  color: #2c3e50;
}

.filter-group select {
  padding: 0.5rem 1rem;
  border: 2px solid #127698;
  border-radius: 5px;
  background: white;
  color: #2c3e50;
  font-size: 0.95rem;
}

.filter-group button {
  padding: 0.5rem 1.5rem;
  border: 2px solid #127698;
  border-radius: 25px;
  background: white;
  color: #127698;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-group button:hover {
  background: #f0f8ff;
  transform: translateY(-2px);
}

.filter-group button.active {
  background: #127698;
  color: white;
}

.tour_cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  min-height: 400px;
}

.no-results {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 10px;
  color: #7f8c8d;
}

.no-results p {
  font-size: 1.2rem;
}

/* Стили для пагинации */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin: 2rem 0 3rem;
  padding: 1rem 0;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.pagination-btn {
  background: #eefbff;
  border: 2px solid #eefbff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.pagination-btn:hover:not(:disabled) {
  background: #127698;
  transform: scale(1.1);
  border-color: #127698;
}

.pagination-btn:disabled {
  background: #f5f5f5;
  border-color: #ddd;
  cursor: not-allowed;
  opacity: 0.5;
  transform: none;
}

.arrow-img {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.arrow-right {
  transform: rotate(180deg);
}

.pagination-btn:hover:not(:disabled) .arrow-img {
  filter: brightness(0) invert(1);
}

.pagination-pages {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.page-btn {
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #eefbff;
  background: #eefbff;
  color: #127698;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
}

.page-btn:hover {
  background: #127698;
  color: white;
  border-color: #127698;
  transform: translateY(-2px);
}

.page-btn.active {
  background: #55c496;
  color: white;
  border-color: #55c496;
  transform: scale(1.1);
}

.page-dots {
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-weight: 600;
}

/* Адаптивность */
@media (max-width: 768px) {
  .title-wrapper {
    flex-direction: column;
    gap: 10px;
  }

  .pattern {
    display: none;
  }

  .napravlenie h1 {
    font-size: 1.5rem;
    white-space: normal;
    word-wrap: break-word;
  }

  .pagination {
    padding: 0.6rem 1rem;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .pagination-btn,
  .page-btn {
    width: 35px;
    height: 35px;
    min-width: 35px;
  }

  .arrow-img {
    width: 16px;
    height: 16px;
  }

  .page-dots {
    min-width: 35px;
    height: 35px;
  }

  .tour_cards {
    min-height: 350px;
  }
}

@media (max-width: 480px) {
  .napravlenie h1 {
    font-size: 1.3rem;
  }

  .pagination {
    border-radius: 20px;
    padding: 0.8rem;
  }

  .pagination-pages {
    order: 1;
    width: 100%;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .filters {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .filter-group {
    width: 100%;
    justify-content: space-between;
  }

  .filter-group select {
    width: 100%;
  }

  .filter-group button {
    flex: 1;
    padding: 0.5rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>