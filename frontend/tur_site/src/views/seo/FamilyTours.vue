<template>
  <section class="family-tours-page">
    <!-- Герой-секция -->
    <div class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Туры для всей семьи 2026</h1>
          <p class="hero-subtitle">
            Семейный отдых в России: безопасно, комфортно, интересно для детей и
            родителей
          </p>
          <div class="age-groups">
            <span class="age-badge">👶 0-3 года</span>
            <span class="age-badge">🧒 4-7 лет</span>
            <span class="age-badge">👦 8-12 лет</span>
            <span class="age-badge">👨‍🦱 13+ лет</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumbs">
        <ol itemscope itemtype="https://schema.org/BreadcrumbList">
          <li
            itemprop="itemListElement"
            itemscope
            itemtype="https://schema.org/ListItem"
          >
            <a href="/" itemprop="item">
              <span itemprop="name">Главная</span>
            </a>
            <meta itemprop="position" content="1" />
          </li>
          <li
            itemprop="itemListElement"
            itemscope
            itemtype="https://schema.org/ListItem"
          >
            <span itemprop="name">Семейные туры</span>
            <meta itemprop="position" content="2" />
          </li>
        </ol>
      </nav>

      <!-- SEO текст -->
      <article class="seo-content">
        <h2>Семейные туры по России — идеальный отдых с детьми</h2>
        <p>
          <strong>TUR-4-SIDES</strong> предлагает лучшие
          <strong>семейные туры по России</strong> с программами для детей
          разного возраста. Мы знаем, как сделать отдых комфортным и
          увлекательным для всей семьи.
        </p>
      </article>

      <!-- Особенности семейных туров -->
      <section class="family-features">
        <h2>Почему выбирают наши семейные туры?</h2>

        <div class="features-grid">
          <div class="feature">
            <div class="feature-icon">👨‍👩‍👧‍👦</div>
            <h3>Специальные программы</h3>
            <p>Маршруты адаптированы под интересы детей разного возраста</p>
          </div>

          <div class="feature">
            <div class="feature-icon">🛏️</div>
            <h3>Семейные номера</h3>
            <p>
              Комфортабельные отели с семейными номерами и детскими кроватками
            </p>
          </div>

          <div class="feature">
            <div class="feature-icon">🍽️</div>
            <h3>Детское меню</h3>
            <p>Специальное питание для детей в ресторанах отелей</p>
          </div>

          <div class="feature">
            <div class="feature-icon">🎪</div>
            <h3>Анимация</h3>
            <p>Детские клубы, анимационные программы, мастер-классы</p>
          </div>
        </div>
      </section>

      <!-- Семейные туры из базы данных -->
      <section class="family-tours-section">
        <h2>Семейные туры 2026</h2>
        
        <!-- Состояние загрузки -->
        <div v-if="loading" class="loading-container">
          <div class="spinner"></div>
          <p>Загружаем семейные туры...</p>
        </div>
        
        <!-- Сетка туров -->
        <div v-else-if="familyTours.length > 0" class="tours-grid">
          <div 
            class="tour-card" 
            v-for="tour in familyTours" 
            :key="tour.id"
            @click="goToTour(tour.id)"
          >
            <div class="tour-image">
              <img
                :src="tour.main_image_url || '/img/tour-default.jpg'"
                :alt="tour.title + ' - семейный тур'"
                loading="lazy"
              />
              <div class="tour-badges">
                <span v-if="tour.is_new" class="badge new">Новинка</span>
                <span v-if="tour.is_hot" class="badge hot">🔥 Горящий</span>
                <span v-if="tour.discount_percent" class="badge discount">-{{ tour.discount_percent }}%</span>
                <span v-if="tour.is_family" class="badge family">👨‍👩‍👧‍👦 Семейный</span>
              </div>
            </div>
            <div class="tour-content">
              <h3>{{ tour.title }}</h3>
              <div class="tour-meta">
                <span class="location">📍 {{ tour.location }}</span>
                <span class="duration">⏱️ {{ tour.duration_days }} {{ getDayText(tour.duration_days) }}</span>
              </div>
              <p class="tour-description">{{ tour.short_description }}</p>
              <div class="tour-rating" v-if="tour.rating">
                <span class="stars">{{ renderStars(tour.rating) }}</span>
                <span class="rating-count">({{ tour.review_count || 0 }} отзывов)</span>
              </div>
              <div class="tour-footer">
                <div class="price-section">
                  <div class="price-main">
                    <strong class="price-value">{{ formatPrice(tour.actual_price || tour.price) }} ₽</strong>
                    <span class="price-label">/чел</span>
                  </div>
                  <div v-if="tour.old_price" class="price-old">
                    {{ formatPrice(tour.old_price) }} ₽
                  </div>
                </div>
                <router-link :to="`/tour/${tour.id}`" class="book-btn">
                  Подробнее
                </router-link>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Нет туров -->
        <div v-else class="no-tours">
          <p>Семейные туры временно отсутствуют. Пожалуйста, зайдите позже.</p>
        </div>
        
        <!-- Пагинация -->
        <div class="pagination-wrapper" v-if="totalPages > 1">
          <div class="pagination">
            <button
              class="pagination-btn prev-btn"
              @click="prevPage"
              :disabled="currentPage === 1"
            >
              ←
            </button>
            
            <div class="pagination-pages">
              <button
                v-for="page in getVisiblePages"
                :key="'page-' + page"
                :class="{ active: currentPage === page }"
                class="page-btn"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>
            </div>
            
            <button
              class="pagination-btn next-btn"
              @click="nextPage"
              :disabled="currentPage === totalPages"
            >
              →
            </button>
          </div>
        </div>
      </section>

      <!-- Спецпредложения -->
      <section class="special-offers">
        <h2>Специальные предложения для семей</h2>

        <div class="offers-grid">
          <div v-for="offer in specialOffers" :key="offer.id" class="offer-card">
            <div class="offer-badge" :class="{ hot: offer.is_hot, family: offer.is_family }">
              {{ offer.badge_text || (offer.is_hot ? '🔥 Горящее' : '👨‍👩‍👧‍👦 Семейная скидка') }}
            </div>
            <h3>{{ offer.title }}</h3>
            <p>{{ offer.description }}</p>
            <div class="offer-price">
              <div v-if="offer.old_price" class="price-old">{{ formatPrice(offer.old_price) }} ₽</div>
              <div class="price-new">{{ formatPrice(offer.price) }} ₽</div>
              <small>{{ offer.price_note || 'за семью из 3 человек' }}</small>
            </div>
            <router-link :to="`/tour/${offer.id}`" class="book-btn">
              Забронировать
            </router-link>
          </div>
          
          <div v-if="specialOffers.length === 0" class="offer-card placeholder">
            <div class="offer-badge family">👨‍👩‍👧‍👦 Семейная скидка</div>
            <h3>Термы в Стерлитамаке</h3>
            <p>Второй ребенок бесплатно! Термальный комплекс, бассейны, анимация</p>
            <div class="offer-price">
              <div class="price-old">30 000 ₽</div>
              <div class="price-new">25 000 ₽</div>
              <small>2 взрослых + 1 ребенок</small>
            </div>
            <router-link to="/tour/2" class="book-btn">
              Забронировать
            </router-link>
          </div>
        </div>
      </section>

      <!-- Что взять с собой -->
      <section class="packing-list">
        <h2>Что взять с собой в семейный тур?</h2>

        <div class="packing-grid">
          <div class="packing-category">
            <h3>👶 Для малышей (0-3 года)</h3>
            <ul>
              <li>Подгузники и влажные салфетки</li>
              <li>Детское питание и вода</li>
              <li>Сменная одежда</li>
              <li>Любимые игрушки</li>
              <li>Аптечка для детей</li>
            </ul>
          </div>

          <div class="packing-category">
            <h3>🧒 Для детей (4-12 лет)</h3>
            <ul>
              <li>Удобная обувь для экскурсий</li>
              <li>Головной убор от солнца</li>
              <li>Крем от загара</li>
              <li>Набор для пляжа</li>
              <li>Планшет с мультиками</li>
            </ul>
          </div>

          <div class="packing-category">
            <h3>👨‍👩‍👧‍👦 Для всей семьи</h3>
            <ul>
              <li>Документы: паспорта, свидетельства о рождении</li>
              <li>Аптечка с необходимыми лекарствами</li>
              <li>Зарядные устройства для гаджетов</li>
              <li>Небольшая сумма наличными</li>
              <li>Фотоаппарат или смартфон для фото</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Консультация -->
      <section class="consultation">
        <div class="consultation-card">
          <h2>Нужна помощь в выборе семейного тура?</h2>
          <p>
            Наши специалисты помогут подобрать идеальный вариант для вашей семьи
          </p>

          <form @submit.prevent="requestConsultation" class="consult-form">
            <div class="form-group">
              <label>Количество взрослых:</label>
              <input
                type="number"
                v-model="consultation.adults"
                min="1"
                max="4"
                required
              />
            </div>

            <div class="form-group">
              <label>Количество детей:</label>
              <input
                type="number"
                v-model="consultation.children"
                min="0"
                max="4"
              />
            </div>

            <div class="form-group">
              <label>Возраст детей:</label>
              <input
                type="text"
                v-model="consultation.childrenAges"
                placeholder="например: 3, 7"
              />
            </div>

            <div class="form-group">
              <label>Бюджет на семью:</label>
              <select v-model="consultation.budget" required>
                <option value="">Выберите бюджет</option>
                <option value="20-30">20-30 тыс. руб.</option>
                <option value="30-50">30-50 тыс. руб.</option>
                <option value="50-100">50-100 тыс. руб.</option>
                <option value="100+">100+ тыс. руб.</option>
              </select>
            </div>

            <div class="form-group">
              <label>Даты поездки:</label>
              <input
                type="text"
                v-model="consultation.dates"
                placeholder="пример: 10-17 июля"
              />
            </div>

            <div class="form-group">
              <label>Ваш телефон:</label>
              <input type="tel" v-model="consultation.phone" required />
            </div>

            <button type="submit" class="submit-btn">
              Получить консультацию
            </button>
          </form>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { useHead } from '@vueuse/head';

export default {
  name: "FamilyToursPage",
  setup() {
    useHead({
      title: 'Семейные туры 2026 - отдых с детьми в России | TUR-4-SIDES',
      meta: [
        { 
          name: 'description', 
          content: '✅ Семейные туры по России 2026: отдых с детьми в Сочи, Крыму, Башкирии. ✅ Специальные программы для детей, семейные номера, детское меню. Новогодние туры с детьми, каникулярные программы.' 
        },
        { 
          name: 'keywords', 
          content: 'семейные туры, семейный тур 2026, туры с детьми, новогодний тур с детьми 2026, туры 2026 с детьми, тур на каникулы с детьми, семейные туры по башкирии, семейный отдых в России' 
        }
      ]
    });
  },
  data() {
    return {
      // Данные туров
      familyTours: [],
      loading: true,
      
      // Пагинация
      currentPage: 1,
      totalPages: 1,
      limit: 6,
      
      // Спецпредложения
      specialOffers: [],
      
      // Форма консультации
      consultation: {
        adults: 2,
        children: 1,
        childrenAges: "",
        budget: "",
        dates: "",
        phone: "",
      },
    };
  },
  computed: {
    
    // Пагинированные туры
  paginatedFamilyTours() {
    const start = (this.currentPage - 1) * this.limit;
    const end = start + this.limit;
    return this.familyTours.slice(start, end);
  },
  
  // Отображаемые страницы для пагинации
  getVisiblePages() {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    
    for (let i = 1; i <= this.totalPages; i++) {
      if (
        i === 1 ||
        i === this.totalPages ||
        (i >= this.currentPage - delta && i <= this.currentPage + delta)
      ) {
        range.push(i);
      }
    }
    
    range.forEach((i, idx) => {
      if (idx > 0 && i - range[idx - 1] > 1) {
        rangeWithDots.push("...");
      }
      rangeWithDots.push(i);
    });
    
    return rangeWithDots;
  }
  },
  mounted() {
    this.fetchFamilyTours();
    this.fetchSpecialOffers();
  },
  methods: {
    // Загрузка семейных туров из базы данных
    // Загрузка семейных туров из базы данных
async fetchFamilyTours() {
  this.loading = true;
  try {
    // Запрашиваем туры с флагом is_family = true
    const response = await axios.get('http://localhost:3000/api/tours', {
      params: {
        isFamily: true, // Фильтруем только семейные туры
        limit: 50,
        page: 1
      }
    });
    
    const tours = response.data.tours || [];
    
    // Дополнительная фильтрация на клиенте (на случай, если API не поддерживает фильтр)
    const familyTours = tours.filter(tour => 
      tour.is_family === true || 
      tour.is_family === 'true' || 
      tour.is_family === 1
    );
    
    console.log(`Загружено семейных туров: ${familyTours.length}`);
    this.familyTours = familyTours;
    this.totalPages = Math.ceil(this.familyTours.length / this.limit);
    
  } catch (error) {
    console.error('Ошибка при загрузке семейных туров:', error);
    
    // Если API не поддерживает фильтрацию, получаем все туры и фильтруем на клиенте
    try {
      console.log('Пробуем загрузить все туры и отфильтровать на клиенте...');
      const allToursResponse = await axios.get('http://localhost:3000/api/tours', {
        params: {
          limit: 100,
          page: 1
        }
      });
      
      const allTours = allToursResponse.data.tours || [];
      
      // Фильтруем только те туры, у которых is_family = true
      const familyTours = allTours.filter(tour => 
        tour.is_family === true || 
        tour.is_family === 'true' || 
        tour.is_family === 1 ||
        // Также проверяем по ключевым словам в названии/описании (запасной вариант)
        tour.title?.toLowerCase().includes('семейн') ||
        tour.short_description?.toLowerCase().includes('семейн') ||
        tour.full_description?.toLowerCase().includes('семейн')
      );
      
      console.log(`Найдено семейных туров после фильтрации: ${familyTours.length}`);
      this.familyTours = familyTours;
      this.totalPages = Math.ceil(this.familyTours.length / this.limit);
      
    } catch (secondError) {
      console.error('Ошибка при загрузке всех туров:', secondError);
      
      // Если ничего не работает, используем тестовые данные
      if (process.env.NODE_ENV === 'development') {
        console.log('Используем тестовые данные семейных туров');
        this.familyTours = this.getMockFamilyTours();
        this.totalPages = Math.ceil(this.familyTours.length / this.limit);
      }
    }
  } finally {
    this.loading = false;
  }
},
    
    // Тестовые данные для разработки
    getMockFamilyTours() {
      return [
        {
          id: 2,
          title: "Термы в Стерлитамаке: отдых и оздоровление",
          location: "Стерлитамак, Башкортостан",
          duration_days: 2,
          short_description: "2-дневный тур в современный термальный комплекс с бассейнами и спа-процедурами. Идеально для семейного отдыха.",
          price: 15000,
          old_price: 18000,
          discount_percent: 17,
          actual_price: 15000,
          rating: 4.8,
          review_count: 42,
          is_new: true,
          is_hot: true,
          is_family: true,
          main_image_url: "/img/tours/bashkiria/termy-main.jpg",
          direction_name: "Башкирия"
        },
        {
          id: 5,
          title: "Гастрономический тур по Башкирии: мед и кумыс",
          location: "Уфа и окрестности, Башкортостан",
          duration_days: 3,
          short_description: "3-дневный гастрономический тур с дегустацией башкирского меда, кумыса и национальных блюд. Подходит для семей с детьми.",
          price: 18500,
          old_price: null,
          discount_percent: null,
          actual_price: 18500,
          rating: 4.9,
          review_count: 15,
          is_new: true,
          is_hot: false,
          is_family: true,
          main_image_url: "/img/tours/bashkiria/gastro-main.jpg",
          direction_name: "Башкирия"
        },
        {
          id: 3,
          title: "Отдых в Сочи и Красной Поляне",
          location: "Сочи, Краснодарский край",
          duration_days: 5,
          short_description: "5-дневный тур в Сочи с посещением Красной Поляны, олимпийских объектов и черноморского побережья. Семейный отдых.",
          price: 35000,
          old_price: null,
          discount_percent: null,
          actual_price: 35000,
          rating: 4.7,
          review_count: 31,
          is_new: false,
          is_hot: false,
          is_family: true,
          main_image_url: "/img/tours/sochi/main.jpg",
          direction_name: "Южное направление России"
        }
      ];
    },
    
    // Загрузка спецпредложений
// Загрузка спецпредложений для семей
async fetchSpecialOffers() {
  try {
    // Пробуем загрузить семейные туры со скидками
    const response = await axios.get('http://localhost:3000/api/tours', {
      params: {
        isFamily: true, // Только семейные туры
        limit: 10,
        page: 1
      }
    });
    
    const tours = response.data.tours || [];
    
    // Берем туры со скидками или горящие
    this.specialOffers = tours
      .filter(tour => 
        (tour.discount_percent || tour.is_hot) && 
        tour.is_family === true
      )
      .slice(0, 2)
      .map(tour => ({
        ...tour,
        badge_text: tour.discount_percent ? `-${tour.discount_percent}%` : '🔥 Горящее',
        price_note: 'за семью из 3 человек'
      }));
    
    // Если нет семейных туров со скидками, показываем плейсхолдер
    if (this.specialOffers.length === 0) {
      // Не показываем плейсхолдер, просто оставляем пустой массив
      this.specialOffers = [];
    }
    
  } catch (error) {
    console.error('Ошибка при загрузке спецпредложений:', error);
    this.specialOffers = [];
  }
},
    
    // Переход на страницу тура
    goToTour(id) {
      this.$router.push(`/tour/${id}`);
    },
    
    // Фильтрация по направлению
    filterByDestination(destination) {
      // Здесь можно добавить логику фильтрации
      // Например, перенаправить на страницу с фильтром
      if (destination === 'bashkiria') {
        this.$router.push('/tours-bashkiria');
      } else if (destination === 'south' || destination === 'crimea') {
        this.$router.push('/tours-russia#south');
      } else if (destination === 'altai') {
        this.$router.push('/tours-russia#altai');
      }
    },
    
    // Форматирование цены
    formatPrice(price) {
      if (!price) return '0';
      return new Intl.NumberFormat('ru-RU').format(price);
    },
    
    // Склонение слова "день"
    getDayText(days) {
      if (!days) return 'дней';
      const lastDigit = days % 10;
      const lastTwoDigits = days % 100;
      
      if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return 'дней';
      }
      
      if (lastDigit === 1) {
        return 'день';
      }
      
      if (lastDigit >= 2 && lastDigit <= 4) {
        return 'дня';
      }
      
      return 'дней';
    },
    
    // Отображение звезд рейтинга
    renderStars(rating) {
      if (!rating) return '☆☆☆☆☆';
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 >= 0.5;
      const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
      
      return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
    },
    
    // Пагинация
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    
    // Отправка заявки на консультацию
    requestConsultation() {
      console.log("Запрос консультации:", this.consultation);
      alert('Спасибо! Наш специалист свяжется с вами в ближайшее время.');
      this.consultation = {
        adults: 2,
        children: 1,
        childrenAges: "",
        budget: "",
        dates: "",
        phone: ""
      };
    }
  }
};
</script>

<style scoped>
/* Герой секция */
.hero-content {
  padding: 8%;
}

.family-tours-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #e8f4f8 0%, #fff 100%);
}

.hero-section {
  background:
    linear-gradient(rgba(0, 0, 0, 0.7), rgba(8, 59, 74, 0.237)),
    url("../../assets/img/family-hero.jpg") center/cover;
  color: white;
  padding: 100px 0 60px;
  text-align: center;
  height: 80vh;
}

.hero-title {
  font-size: 2.8rem;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 1.3rem;
  opacity: 0.9;
  max-width: 700px;
  margin: 0 auto 30px;
}

.age-groups {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 30px;
}

.age-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Хлебные крошки */
.breadcrumbs {
  margin: 30px 0;
  font-size: 0.9rem;
}

.breadcrumbs ol {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumbs li {
  margin-right: 10px;
}

.breadcrumbs a {
  color: #127698;
  text-decoration: none;
}

.breadcrumbs li:not(:last-child)::after {
  content: "›";
  margin-left: 10px;
  color: #666;
}

/* SEO текст */
.seo-content {
  background: white;
  padding: 40px;
  border-radius: 15px;
  margin-bottom: 40px;
  line-height: 1.8;
}

.seo-content h2 {
  color: #2c3e50;
  margin-bottom: 25px;
  font-size: 1.8rem;
}

/* Особенности */
.family-features {
  margin: 60px 0;
  text-align: center;
}

.family-features h2 {
  color: #2c3e50;
  margin-bottom: 40px;
  font-size: 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.1);
  transition: transform 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.feature h3 {
  color: #3498db;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

/* Семейные туры */
.family-tours-section {
  margin: 60px 0;
}

.family-tours-section h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 40px;
  font-size: 2rem;
}

/* Загрузка */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #127698;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-tours {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 10px;
  color: #7f8c8d;
}

/* Сетка туров */
.tours-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.tour-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.tour-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(18, 118, 152, 0.15);
}

.tour-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.tour-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.tour-card:hover .tour-image img {
  transform: scale(1.05);
}

.tour-badges {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: white;
}

.badge.new {
  background: #127698;
}

.badge.hot {
  background: linear-gradient(135deg, #ff6b6b, #ff8e53);
}

.badge.discount {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
}

.badge.family {
  background: #55c496;
}

.tour-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.tour-content h3 {
  color: #2c3e50;
  font-size: 1.2rem;
  margin: 0 0 0.8rem 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tour-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.8rem;
  color: #7f8c8d;
  font-size: 0.85rem;
}

.tour-description {
  color: #5a6c7d;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

.tour-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.stars {
  color: #f1c40f;
  font-size: 0.9rem;
}

.rating-count {
  color: #95a5a6;
  font-size: 0.8rem;
}

.tour-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #eef2f6;
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
}

.price-label {
  color: #94a3b8;
  font-size: 0.75rem;
}

.price-old {
  color: #94a3b8;
  font-size: 0.8rem;
  text-decoration: line-through;
}

.book-btn {
  background: linear-gradient(135deg, #127698, #0d5a7a);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.book-btn:hover {
  background: linear-gradient(135deg, #0d5a7a, #083e52);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(18, 118, 152, 0.2);
}

/* Пагинация */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin: 3rem 0 2rem;
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
  font-size: 1.2rem;
  color: #127698;
}

.pagination-btn:hover:not(:disabled) {
  background: #127698;
  color: white;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-pages {
  display: flex;
  gap: 0.5rem;
}

.page-btn {
  width: 40px;
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
}

.page-btn:hover {
  background: #127698;
  color: white;
}

.page-btn.active {
  background: #55c496;
  color: white;
  border-color: #55c496;
}

.dest-features {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 15px 0;
}

.dest-features span {
  background: #e8f4f8;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.9rem;
  color: #3498db;
}

.view-tours {
  display: inline-block;
  margin-top: 20px;
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.view-tours:hover {
  text-decoration: underline;
}

/* Спецпредложения */
.special-offers {
  margin: 60px 0;
  background: #fff9e6;
  padding: 50px;
  border-radius: 20px;
}

.special-offers h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 40px;
  font-size: 2rem;
}

.offers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 800px;
  margin: 0 auto;
}

.offer-card {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  position: relative;
}

.offer-badge {
  position: absolute;
  top: -10px;
  right: 20px;
  background: #e74c3c;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.offer-badge.family {
  background: #55c496;
}

.offer-card h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.offer-price {
  margin: 20px 0;
}

.price-old {
  text-decoration: line-through;
  color: #95a5a6;
  font-size: 1.1rem;
}

.price-new {
  color: #e74c3c;
  font-size: 1.8rem;
  font-weight: bold;
  margin: 5px 0;
}

/* Чек-лист */
.packing-list {
  margin: 60px 0;
}

.packing-list h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 40px;
  font-size: 2rem;
}

.packing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.packing-category {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.packing-category h3 {
  color: #3498db;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.packing-category ul {
  list-style: none;
  padding: 0;
}

.packing-category li {
  padding: 8px 0;
  border-bottom: 1px dashed #e0e0e0;
  color: #666;
}

/* Консультация */
.consultation {
  margin: 60px 0;
}

.consultation-card {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 50px;
  border-radius: 20px;
  text-align: center;
}

.consultation-card h2 {
  font-size: 2rem;
  margin-bottom: 15px;
}

.consult-form {
  max-width: 600px;
  margin: 30px auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  text-align: left;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group input,
.form-group select {
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
}

.submit-btn {
  grid-column: 1 / -1;
  background: white;
  color: #3498db;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background: #f8f9fa;
}

/* Адаптивность */
@media (max-width: 992px) {
  .tours-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 20px;
  }
  
  .tours-grid {
    grid-template-columns: 1fr;
  }
  
  .destinations-grid {
    grid-template-columns: 1fr;
  }
  
  .special-offers {
    padding: 30px 20px;
  }
  
  .consultation-card {
    padding: 30px 20px;
  }
  
  .pagination {
    padding: 0.6rem 1rem;
    gap: 0.5rem;
  }
  
  .pagination-btn,
  .page-btn {
    width: 35px;
    height: 35px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.6rem;
  }
  
  .tour-meta {
    flex-direction: column;
    gap: 0.3rem;
  }
  
  .pagination {
    flex-wrap: wrap;
    border-radius: 20px;
    padding: 1rem;
  }
  
  .pagination-pages {
    order: 1;
    width: 100%;
    justify-content: center;
    margin-top: 0.5rem;
  }
}
</style>