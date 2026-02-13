<template>
  <section class="tours-bashkiria-page">
    <!-- Герой-секция для Башкирии -->
    <div class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Туры по Башкирии 2026 из Уфы</h1>
          <p class="hero-subtitle">
            Термальные источники, горные походы на Иремель, гастрономические экскурсии 
            и активный отдых в Республике Башкортостан
          </p>
          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-number">50+</div>
              <div class="stat-label">туров по Башкирии</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">4.9</div>
              <div class="stat-label">средний рейтинг</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">1000+</div>
              <div class="stat-label">довольных туристов</div>
            </div>
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
            <span itemprop="name">Туры по Башкирии</span>
            <meta itemprop="position" content="3" />
          </li>
        </ol>
      </nav>

      <!-- SEO Текст для Башкирии -->
      <article class="seo-content">
        <h2>Туры по Башкирии из Уфы — отдых в сердце Южного Урала</h2>
        <p>
          Компания <strong>TUR-4-SIDES</strong> предлагает самые интересные и
          разнообразные <strong>туры по Башкирии из Уфы</strong> по доступным ценам. 
          Республика Башкортостан — это уникальный край с богатой природой, 
          целебными источниками и самобытной культурой.
        </p>

        <div class="bashkiria-features">
          <div class="feature-card">
            <div class="feature-icon">🏔️</div>
            <h4>Горные туры</h4>
            <p>Восхождение на Иремель, Ямантау, хребты Южного Урала</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💧</div>
            <h4>Термальные источники</h4>
            <p>Отдых и оздоровление в термальных комплексах Стерлитамака</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🍯</div>
            <h4>Гастрономические туры</h4>
            <p>Дегустация башкирского меда, кумыса, национальной кухни</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🏕️</div>
            <h4>Активный отдых</h4>
            <p>Сплавы по рекам, конные прогулки, пешие походы</p>
          </div>
        </div>

        <h3>Почему стоит выбрать тур по Башкирии?</h3>
        <p>
          Башкортостан — это удивительный край, где европейская часть России встречается 
          с азиатской. Здесь вы найдете уникальные природные достопримечательности: 
          горы Иремель и Ямантау, пещеры, водопады, реки Агидель, Инзер, Белая. 
          А знаменитый башкирский мед и кумыс известны далеко за пределами республики.
        </p>

        <div class="advantages-list">
          <h4>Преимущества туров по Башкирии с TUR-4-SIDES:</h4>
          <ul>
            <li><strong>Трансфер из Уфы</strong> включен в стоимость</li>
            <li><strong>Опытные гиды</strong>, знающие самые красивые места</li>
            <li><strong>Проживание</strong> в комфортабельных гостевых домах и отелях</li>
            <li><strong>Насыщенная программа</strong> без длительных переездов</li>
            <li><strong>Доступные цены</strong> от прямых организаторов</li>
          </ul>
        </div>
      </article>

      <!-- Туры по Башкирии - ЗАГРУЖАЕМ ИЗ БД -->
      <section class="bashkiria-tours">
        <div class="title-wrapper">
          <div class="pattern pattern-left">
            <img :src="patternImage" alt="Узор" class="pattern-img" />
          </div>
          <div class="title-content">
            <h2>Туры по Башкирии из Уфы</h2>
            <p class="subtitle">Лучшие туры по Республике Башкортостан</p>
          </div>
          <div class="pattern pattern-right">
            <img :src="patternImage" alt="Узор" class="pattern-img" />
          </div>
        </div>
        
        <!-- Состояние загрузки -->
        <div v-if="loading" class="loading-container">
          <div class="spinner"></div>
          <p>Загружаем туры по Башкирии...</p>
        </div>
        
        <!-- Сетка туров -->
        <div v-else-if="bashkiriaTours.length > 0" class="tours-grid">
          <div 
            class="tour-card" 
            v-for="tour in paginatedTours" 
            :key="tour.id"
            @click="goToTour(tour.id)"
          >
            <div class="tour-image">
              <img
                :src="tour.main_image_url || '/img/tour-default.jpg'"
                :alt="tour.title + ' - тур по Башкирии'"
                loading="lazy"
              />
              <div class="tour-badges">
                <span v-if="tour.is_new" class="badge new">Новинка</span>
                <span v-if="tour.is_hot" class="badge hot">🔥 Горящий</span>
                <span v-if="tour.discount_percent" class="badge discount">-{{ tour.discount_percent }}%</span>
              </div>
            </div>
            <div class="tour-content">
              <h3>{{ tour.title }}</h3>
              <div class="tour-meta">
                <span class="location">📍 {{ tour.location }}</span>
                <span class="duration">⏱️ {{ tour.duration_days }} {{ getDayText(tour.duration_days) }}</span>
              </div>
              <p class="tour-description">{{ tour.short_description }}</p>
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
          <p>Туры по Башкирии временно отсутствуют. Пожалуйста, зайдите позже.</p>
        </div>

        <!-- Пагинация -->
        <div class="pagination-wrapper" v-if="totalPages > 1">
          <div class="pagination">
            <button
              class="pagination-btn prev-btn"
              @click="prevPage"
              :disabled="currentPage === 1"
            >
              <img
                :src="arrowImage"
                alt="Предыдущая"
                class="arrow-img arrow-left"
              />
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
              <img
                :src="arrowImage"
                alt="Следующая"
                class="arrow-img arrow-right"
              />
            </button>
          </div>
        </div>
      </section>

      <!-- FAQ для Башкирии -->
      <section class="faq-section">
        <h2>Частые вопросы о турах по Башкирии</h2>
        <div class="faq-list">
          <div class="faq-item">
            <h3>Как добраться до места начала тура?</h3>
            <p>
              Большинство туров по Башкирии стартуют из Уфы. Мы организуем трансфер 
              на комфортабельных автобусах или микроавтобусах от центра города. 
              Трансфер обычно включен в стоимость тура.
            </p>
          </div>
          <div class="faq-item">
            <h3>Какая физическая подготовка нужна для горных туров?</h3>
            <p>
              Для восхождения на Иремель и другие вершины Южного Урала требуется 
              средняя физическая подготовка. Маршруты адаптированы для начинающих 
              туристов. Если у вас есть проблемы со здоровьем, рекомендуем 
              проконсультироваться с врачом.
            </p>
          </div>
          <div class="faq-item">
            <h3>Что взять с собой в тур по Башкирии?</h3>
            <p>
              Для летних туров: удобная трекинговая обувь, непромокаемая куртка, 
              головной убор, солнцезащитные средства, купальник (для термальных 
              источников). Для весенне-осенних туров: теплые вещи, дождевик. 
              Полный список вы получите после бронирования.
            </p>
          </div>
          <div class="faq-item">
            <h3>Есть ли туры с детьми по Башкирии?</h3>
            <p>
              Да, мы предлагаем семейные туры, подходящие для отдыха с детьми. 
              Термальные комплексы в Стерлитамаке имеют детские зоны и бассейны. 
              Возрастные ограничения зависят от конкретного тура.
            </p>
          </div>
          <div class="faq-item">
            <h3>Когда лучше ехать в Башкирию?</h3>
            <p>
              Башкортостан прекрасен в любое время года. Лето — идеально для 
              горных походов и сплавов. Осень — время гастрономических туров и 
              сбора меда. Зима — для отдыха на термальных источниках. Весна — 
              для экскурсионных программ.
            </p>
          </div>
        </div>
      </section>

      <!-- CTA форма -->
      <section class="cta-section">
        <div class="cta-card">
          <h2>Найдем ваш идеальный тур по Башкирии!</h2>
          <p>Оставьте заявку и получите подборку туров с лучшими ценами</p>
          <form @submit.prevent="submitTourRequest" class="cta-form">
            <input
              type="text"
              v-model="tourRequest.name"
              placeholder="Ваше имя"
              required
            />
            <input
              type="tel"
              v-model="tourRequest.phone"
              placeholder="Телефон"
              required
            />
            <input
              type="email"
              v-model="tourRequest.email"
              placeholder="Email"
            />
            <button type="submit" class="submit-btn">
              Получить подборку туров
            </button>
          </form>
          <p class="privacy-note">
            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
          </p>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import patternImage from "@/assets/img/image 3.png";
import arrowImage from "@/assets/img/arrow.png";
import { useHead } from '@vueuse/head';
export default {
  name: "ToursBashkiriaPage",
  setup() {
    useHead({
      title: 'Туры по Башкирии 2026 из Уфы - цены от прямого организатора | TUR-4-SIDES',
      meta: [
        { 
          name: 'description', 
          content: '✅ Туры по Башкирии из Уфы 2026. Термальные источники Стерлитамака, восхождение на Иремель, гастрономические экскурсии с дегустацией башкирского меда и кумыса. ✅ Активный отдых, семейные туры, сплавы по рекам. Лучшие цены на отдых в Башкортостане от туроператора.' 
        },
        { 
          name: 'keywords', 
          content: 'туры по башкирии, тур в башкирию из уфы, отдых в башкортостане, термальные источники стерлитамак, иремель восхождение, башкирский мед тур, кумыс дегустация, сплав по реке белая, активный отдых башкирия, семейные туры башкирия, выходного дня из уфы, экскурсии по башкирии' 
        },
        { property: 'og:title', content: 'Туры по Башкирии 2026 - отдых в Башкортостане из Уфы' },
        { property: 'og:description', content: 'Забронируйте тур по Башкирии из Уфы. Термальные источники, горы Иремель, гастрономические экскурсии, сплавы. Доступные цены от прямого организатора.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://tur4sides.ru/tours-bashkiria' },
        { property: 'og:image', content: 'https://tur4sides.ru/img/og/bashkiria-tours.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Туры по Башкирии 2026 | TUR-4-SIDES' },
        { name: 'twitter:description', content: 'Туры по Башкирии из Уфы - термальные источники, Иремель, гастро-туры. Лучшие цены 2026.' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'TUR-4-SIDES - туры по России' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:site_name', content: 'TUR-4-SIDES' },
      ],
      link: [
        { rel: 'canonical', href: 'https://tur4sides.ru/tours-bashkiria' }
      ]
    })
  },
  data() {
    return {
      patternImage: patternImage,
      arrowImage: arrowImage,
      bashkiriaTours: [],
      loading: true,
      currentPage: 1,
      toursPerPage: 6,
      tourRequest: {
        name: "",
        phone: "",
        email: "",
      },
    };
  },
  computed: {
    // Общее количество страниц
    totalPages() {
      return Math.ceil(this.bashkiriaTours.length / this.toursPerPage);
    },
    
    // Туры для текущей страницы
    paginatedTours() {
      const start = (this.currentPage - 1) * this.toursPerPage;
      const end = start + this.toursPerPage;
      return this.bashkiriaTours.slice(start, end);
    },
    
    // Отображаемые страницы в пагинации
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
    this.fetchBashkiriaTours();
  },
  methods: {
    // Загрузка туров по Башкирии из базы данных
    async fetchBashkiriaTours() {
      this.loading = true;
      try {
        // Запрашиваем туры с направлением Башкирия
        const response = await axios.get('http://localhost:3000/api/tours', {
          params: {
            direction: 'bashkiria',
            limit: 50,
            page: 1
          }
        });
        
        const tours = response.data.tours || [];
        
        // Если получили туры из API
        if (tours.length > 0) {
          this.bashkiriaTours = tours;
        } else {
          // Если API не вернул туры, пробуем получить через отдельный endpoint
          try {
            const directionResponse = await axios.get('http://localhost:3000/api/tours/direction/bashkiria', {
              params: {
                limit: 50
              }
            });
            this.bashkiriaTours = directionResponse.data || [];
          } catch (dirError) {
            console.error('Ошибка при загрузке туров по направлению:', dirError);
            this.bashkiriaTours = [];
          }
        }
        
        console.log('Загружено туров по Башкирии:', this.bashkiriaTours.length);
        
      } catch (error) {
        console.error('Ошибка при загрузке туров по Башкирии:', error);
        this.bashkiriaTours = [];
      } finally {
        this.loading = false;
      }
    },
    
    // Переход на страницу тура
    goToTour(id) {
      this.$router.push(`/tour/${id}`);
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
    
    // Методы пагинации
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    
    // Отправка заявки на подбор тура
    submitTourRequest() {
      console.log("Заявка на подбор тура по Башкирии:", this.tourRequest);
      alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время для подбора тура по Башкирии.');
      this.tourRequest = {
        name: "",
        phone: "",
        email: ""
      };
    }
  }
};
</script>

<style scoped>
.tours-bashkiria-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.hero-section {
  background:
    linear-gradient(rgba(0, 0, 0, 0.8), rgba(18, 118, 152, 0.301)),
    url("../../assets/img/bash-hero.jpeg") center/cover;
  color: white;
  padding: 100px 0 60px;
  text-align: center;
  height: 80vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-content {
  padding: 8%;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.3rem;
  opacity: 0.95;
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.stat-label {
  font-size: 1rem;
  opacity: 0.9;
}

.breadcrumbs {
  margin: 30px 0;
  font-size: 0.9rem;
}

.breadcrumbs ol {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
}

.breadcrumbs li {
  margin-right: 10px;
  color: #666;
}

.breadcrumbs a {
  color: #127698;
  text-decoration: none;
}

.breadcrumbs a:hover {
  text-decoration: underline;
}

.breadcrumbs li:not(:last-child)::after {
  content: "›";
  margin-left: 10px;
  color: #666;
}

.seo-content {
  background: white;
  padding: 40px;
  border-radius: 15px;
  margin-bottom: 40px;
  line-height: 1.8;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.seo-content h2 {
  color: #2c3e50;
  margin-bottom: 25px;
  font-size: 1.8rem;
}

.seo-content h3 {
  color: #127698;
  margin: 30px 0 20px;
  font-size: 1.4rem;
}

.seo-content h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.seo-content ul {
  margin: 20px 0;
  padding-left: 20px;
}

.seo-content li {
  margin-bottom: 10px;
}

.bashkiria-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.feature-card {
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
  padding: 25px;
  border-radius: 10px;
  border-left: 4px solid #127698;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(18, 118, 152, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.feature-card h4 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.feature-card p {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
}

.advantages-list {
  background: #eefbff;
  padding: 25px;
  border-radius: 10px;
  margin-top: 20px;
}

.advantages-list h4 {
  color: #127698;
  margin-bottom: 15px;
}

.advantages-list ul {
  margin: 0;
  padding-left: 20px;
}

.advantages-list li {
  margin-bottom: 8px;
}

.bashkiria-tours {
  margin: 60px 0;
}

.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 2rem;
}

.title-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-content h2 {
  color: #127698;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
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

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin: 3rem 0;
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
  border-color: #127698;
  transform: translateY(-2px);
}

.page-btn.active {
  background: #55c496;
  color: white;
  transform: scale(1.1);
}

.faq-section {
  margin: 60px 0;
}

.faq-section h2 {
  text-align: center;
  margin-bottom: 40px;
  color: #2c3e50;
  font-size: 2rem;
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: white;
  padding: 25px;
  margin-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #127698;
  transition: transform 0.3s ease;
}

.faq-item:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 15px rgba(18, 118, 152, 0.1);
}

.faq-item h3 {
  color: #127698;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.faq-item p {
  color: #666;
  line-height: 1.6;
}

.cta-section {
  margin: 60px 0 80px;
}

.cta-card {
  background: linear-gradient(135deg, #127698, #0d5a7a);
  color: white;
  padding: 50px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(18, 118, 152, 0.3);
}

.cta-card h2 {
  font-size: 2rem;
  margin-bottom: 15px;
}

.cta-card p {
  opacity: 0.9;
  margin-bottom: 30px;
  font-size: 1.1rem;
}

.cta-form {
  max-width: 600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.cta-form input {
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.cta-form input:focus {
  outline: 2px solid #55c496;
  transform: scale(1.02);
}

.cta-form .submit-btn {
  grid-column: 1 / -1;
  background: white;
  color: #127698;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-form .submit-btn:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.3);
}

.privacy-note {
  margin-top: 20px;
  font-size: 0.9rem;
  opacity: 0.7;
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

  .title-wrapper {
    flex-direction: column;
    gap: 10px;
  }

  .pattern {
    display: none;
  }

  .title-content h2 {
    font-size: 1.5rem;
    white-space: normal;
    text-align: center;
  }

  .tours-grid {
    grid-template-columns: 1fr;
  }

  .bashkiria-features {
    grid-template-columns: 1fr;
  }

  .faq-item h3 {
    font-size: 1.1rem;
  }

  .cta-card {
    padding: 30px 20px;
  }

  .cta-card h2 {
    font-size: 1.5rem;
  }

  .cta-form {
    grid-template-columns: 1fr;
  }

  .pagination {
    padding: 0.6rem 1rem;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .pagination-pages {
    order: 1;
    width: 100%;
    justify-content: center;
    margin-top: 0.5rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 60px 0 40px;
    height: auto;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .seo-content {
    padding: 25px;
  }

  .seo-content h2 {
    font-size: 1.5rem;
  }

  .tour-card {
    margin: 0 0 20px;
  }

  .tour-image {
    height: 180px;
  }

  .tour-content {
    padding: 1.2rem;
  }

  .tour-content h3 {
    font-size: 1.1rem;
  }

  .faq-item {
    padding: 20px;
  }

  .pagination {
    border-radius: 20px;
    padding: 1rem;
  }

  .pagination-btn,
  .page-btn {
    width: 35px;
    height: 35px;
  }

  .arrow-img {
    width: 16px;
    height: 16px;
  }
}
</style>