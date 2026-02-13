<template>
  <section class="tours-russia-page">
    <!-- Герой-секция -->
    <div class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Туры по России 2026</h1>
          <p class="hero-subtitle">
            Лучшие авторские и экскурсионные туры по всем регионам России от
            проверенных организаторов
          </p>
          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-number">2000+</div>
              <div class="stat-label">тура по России</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">98%</div>
              <div class="stat-label">довольных клиентов</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">14 лет</div>
              <div class="stat-label">на рынке туризма</div>
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
            <span itemprop="name">Туры по России</span>
            <meta itemprop="position" content="2" />
          </li>
        </ol>
      </nav>

      <!-- SEO Текст -->
      <article class="seo-content">
        <h2>Туры по России — лучший выбор для отдыха в 2026 году</h2>
        <p>
          Компания <strong>TUR-4-SIDES</strong> предлагает самые интересные и
          разнообразные <strong>туры по России</strong> по доступным ценам. У
          нас вы найдете:
        </p>

        <ul>
          <li><strong>Авторские туры</strong> по уникальным маршрутам</li>
          <li>
            <strong>Экскурсионные программы</strong> по Золотому кольцу и другим
            историческим местам
          </li>
          <li><strong>Активный отдых</strong> на Алтае, Байкале, Кавказе</li>
          <li><strong>Гастрономические туры</strong> по регионам России</li>
          <li><strong>Семейные путешествия</strong> с детьми</li>
          <li><strong>Туры для пенсионеров</strong> в бархатный сезон</li>
        </ul>

        <h3>Почему выбирают туры по России с TUR-4-SIDES?</h3>
        <p>
          Мы работаем напрямую с организаторами, что позволяет предлагать
          <strong>лучшие цены на туры по России</strong>. Все маршруты проверены
          нашими специалистами, гиды имеют необходимую аккредитацию, а отели
          соответствуют заявленным категориям.
        </p>

        <div class="regions-grid">
          <div class="region-card">
            <h4>Южное направление России</h4>
            <p>
              Сочи, Крым, Кавказ, Краснодарский край. Пляжный отдых, горные
              курорты, термальные источники.
            </p>
          </div>
          <div class="region-card">
            <h4>Северное направление России</h4>
            <p>
              Карелия, Кольский полуостров, Архангельск. Северное сияние,
              рыбалка, этнографические туры.
            </p>
          </div>
          <div class="region-card">
            <h4>Восточное направление России</h4>
            <p>
              Байкал, Камчатка, Алтай, Дальний Восток. Приключенческие туры,
              восхождения, сплавы.
            </p>
          </div>
          <div class="region-card">
            <h4>Центр России</h4>
            <p>
              Москва, Санкт-Петербург, Золотое кольцо. Экскурсионные программы,
              культурный туризм.
            </p>
          </div>
        </div>

        <h3>Как купить тур по России?</h3>
        <p>
          Забронировать <strong>тур по России</strong> можно онлайн на нашем
          сайте или по телефону. Мы поможем:
        </p>
        <ol>
          <li>Подобрать тур по вашим критериям (бюджет, даты, интересы)</li>
          <li>Оформить все необходимые документы</li>
          <li>Организовать трансфер и проживание</li>
          <li>Предоставить круглосуточную поддержку во время путешествия</li>
        </ol>
      </article>

      <!-- Популярные туры по России - ЗАГРУЖАЕМ ИЗ БД -->
      <section class="popular-tours">
        <h2>Популярные туры по России</h2>
        
        <!-- Состояние загрузки -->
        <div v-if="loading" class="loading-container">
          <div class="spinner"></div>
          <p>Загружаем туры...</p>
        </div>
        
        <!-- Сетка туров -->
        <div v-else-if="popularTours.length > 0" class="tours-grid">
          <div 
            class="tour-card" 
            v-for="tour in popularTours" 
            :key="tour.id"
            @click="goToTour(tour.id)"
          >
            <div class="tour-image">
              <img
                :src="tour.main_image_url || '/img/tour-default.jpg'"
                :alt="tour.title + ' - тур по России'"
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
          <p>Популярные туры временно отсутствуют. Пожалуйста, зайдите позже.</p>
        </div>
      </section>

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

      <!-- FAQ -->
      <section class="faq-section">
        <h2>Частые вопросы о турах по России</h2>
        <div class="faq-list">
          <div class="faq-item">
            <h3>Какие документы нужны для поездки по России?</h3>
            <p>
              Для граждан РФ достаточно паспорта. Для отдельных регионов
              (пограничная зона) может потребоваться специальное разрешение.
            </p>
          </div>
          <div class="faq-item">
            <h3>Можно ли изменить даты тура после бронирования?</h3>
            <p>
              Да, по согласованию с организатором. Условия изменения указаны в
              договоре.
            </p>
          </div>
          <div class="faq-item">
            <h3>Какая страховка нужна для путешествия по России?</h3>
            <p>
              Рекомендуем оформить медицинскую страховку для путешествий по
              России, особенно для активных туров.
            </p>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-section">
        <div class="cta-card">
          <h2>Найдем ваш идеальный тур по России!</h2>
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
import { useHead } from '@vueuse/head';
export default {
  name: "ToursRussiaPage",
  setup() {
    useHead({
      title: 'Туры по России 2026 - авторские и экскурсионные туры от TUR-4-SIDES',
      meta: [
        {
          name: 'description',
          content: '✅ Туры по России 2026: более 2000 авторских и экскурсионных туров. ✅ Активный отдых на Алтае и Байкале, пляжный отдых в Сочи и Крыму, гастрономические туры, семейные путешествия. ✅ Лучшие цены от проверенных организаторов. Бронируйте онлайн!'
        },
        {
          name: 'keywords',
          content: 'туры по россии, авторские туры по россии, экскурсионные туры по россии, активный отдых в россии, туры на алтай, туры на байкал, туры в сочи, туры в крым, отдых в россии 2026, туры по золотому кольцу, семейные туры по россии, гастрономические туры россия, туроператор по россии'
        },
        // Open Graph для соцсетей
        {
          property: 'og:title',
          content: 'Туры по России 2026 - авторские туры от TUR-4-SIDES'
        },
        {
          property: 'og:description',
          content: 'Более 2000 туров по России: Алтай, Байкал, Сочи, Крым, Карелия, Золотое кольцо. Лучшие цены, проверенные организаторы, круглосуточная поддержка.'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:url',
          content: 'https://tur4sides.ru/tours-russia'
        },
        {
          property: 'og:image',
          content: 'https://tur4sides.ru/img/og-tours-russia.jpg'
        },
        {
          property: 'og:locale',
          content: 'ru_RU'
        },
        {
          property: 'og:site_name',
          content: 'TUR-4-SIDES - туры по России'
        },
        // Twitter Card
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:title',
          content: 'Туры по России 2026 - авторские туры от TUR-4-SIDES'
        },
        {
          name: 'twitter:description',
          content: 'Более 2000 туров по России: Алтай, Байкал, Сочи, Крым, Карелия, Золотое кольцо. Лучшие цены на 2026 год.'
        },
        {
          name: 'twitter:image',
          content: 'https://tur4sides.ru/img/og-tours-russia.jpg'
        },
        // Дополнительные мета-теги
        {
          name: 'robots',
          content: 'index, follow'
        },
        {
          name: 'googlebot',
          content: 'index, follow'
        },
        {
          name: 'yandex-verification',
          content: 'ваш_код_верификации'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0'
        },
        {
          charset: 'UTF-8'
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://tur4sides.ru/tours-russia'
        }
      ]
    })
  },
  // остальные data, methods и т.д.
  data() {
    return {
      popularTours: [],
      loading: true,
      tourRequest: {
        name: "",
        phone: "",
        email: "",
      },
    };
  },
  mounted() {
    this.fetchPopularTours();
  },
  methods: {
    // Загрузка популярных туров из базы данных
    async fetchPopularTours() {
      this.loading = true;
      try {
        // Получаем туры с высоким рейтингом и/или большим количеством отзывов
        const response = await axios.get('http://localhost:3000/api/tours', {
          params: {
            limit: 12,
            page: 1
          }
        });
        
        const tours = response.data.tours || [];
        
        // Фильтруем только популярные туры (рейтинг >= 4.7 или много отзывов)
        // ИЛИ просто берем первые 6 туров с хорошим рейтингом
        this.popularTours = tours
          .filter(tour => 
            tour.rating >= 4.7 || 
            tour.review_count > 10 || 
            tour.is_hot === true
          )
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6);
        
        // Если после фильтрации нет туров, показываем первые 6
        if (this.popularTours.length === 0 && tours.length > 0) {
          this.popularTours = tours.slice(0, 6);
        }
        
      } catch (error) {
        console.error('Ошибка при загрузке популярных туров:', error);
        
        // Для отладки - показываем тестовые данные, если API не работает
        if (process.env.NODE_ENV === 'development') {
          this.popularTours = [
            {
              id: 1,
              title: "Тур на Алтай из Уфы: горы, озера и приключения",
              location: "Горный Алтай, Республика Алтай",
              duration_days: 7,
              short_description: "7-дневное путешествие по Горному Алтаю с посещением Телецкого озера и Чуйского тракта",
              price: 45000,
              old_price: 52000,
              discount_percent: 13,
              actual_price: 45000,
              rating: 4.9,
              review_count: 23,
              is_new: true,
              is_hot: true,
              main_image_url: "/img/tours/altai/main.jpg",
              direction_name: "Алтай"
            },
            {
              id: 2,
              title: "Термы в Стерлитамаке: отдых и оздоровление",
              location: "Стерлитамак, Башкортостан",
              duration_days: 2,
              short_description: "2-дневный тур в современный термальный комплекс с бассейнами и спа-процедурами",
              price: 15000,
              old_price: 18000,
              discount_percent: 17,
              actual_price: 15000,
              rating: 4.8,
              review_count: 42,
              is_new: true,
              is_hot: true,
              main_image_url: "/img/tours/bashkiria/termy-main.jpg",
              direction_name: "Башкирия"
            },
            {
              id: 3,
              title: "Тур на Байкал: озеро-легенда",
              location: "Иркутск, озеро Байкал",
              duration_days: 6,
              short_description: "6-дневное путешествие к берегам самого глубокого озера в мире",
              price: 48000,
              old_price: 55000,
              discount_percent: 13,
              actual_price: 48000,
              rating: 4.8,
              review_count: 37,
              is_hot: true,
              main_image_url: "/img/tours/baikal/main.jpg",
              direction_name: "Восточное направление России"
            }
          ];
        }
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
    
    // Отображение звезд рейтинга
    renderStars(rating) {
      if (!rating) return '☆☆☆☆☆';
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 >= 0.5;
      const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
      
      return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
    },
    
    // Отправка заявки на подбор тура
    submitTourRequest() {
      console.log("Заявка на подбор тура:", this.tourRequest);
      // Здесь можно добавить отправку на сервер
      alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
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
/* Дополнительные стили для состояний загрузки и карточек */
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

/* Адаптивность */
@media (max-width: 768px) {
  .tours-grid {
    grid-template-columns: 1fr;
  }
  
  .tour-image {
    height: 180px;
  }
}
.hero-content {
  padding: 8%;
}
.tours-russia-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.hero-section {
  background:
    linear-gradient(rgba(0, 0, 0, 0.82), rgba(8, 59, 74, 0.237)),
    url("../../assets/img/russia-hero.jpg") center/cover;
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

.hero-title {
  font-size: 3rem;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 1.3rem;
  opacity: 0.9;
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
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

.seo-content h3 {
  color: #127698;
  margin: 30px 0 20px;
  font-size: 1.4rem;
}

.seo-content ul,
.seo-content ol {
  margin: 20px 0;
  padding-left: 20px;
}

.seo-content li {
  margin-bottom: 10px;
}

.regions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.region-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  border-left: 4px solid #127698;
}

.region-card h4 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.popular-tours {
  margin: 60px 0;
}

.popular-tours h2 {
  text-align: center;
  margin-bottom: 40px;
  color: #2c3e50;
  font-size: 2rem;
}

.tours-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.tour-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.tour-card:hover {
  transform: translateY(-10px);
}

.tour-image {
  height: 200px;
  overflow: hidden;
}

.tour-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.tour-card:hover .tour-image img {
  transform: scale(1.05);
}

.tour-content {
  padding: 25px;
}

.tour-content h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.tour-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.tour-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.tour-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price strong {
  color: #127698;
  font-size: 1.5rem;
}

.price span {
  display: block;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.book-btn {
  background: #127698;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  transition: background 0.3s ease;
}

.book-btn:hover {
  background: #0d5a7a;
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
}

.faq-item h3 {
  color: #127698;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.cta-section {
  margin: 60px 0;
}

.cta-card {
  background: linear-gradient(135deg, #127698, #0d5a7a);
  color: white;
  padding: 50px;
  border-radius: 20px;
  text-align: center;
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
  transition: background 0.3s ease;
}

.cta-form .submit-btn:hover {
  background: #f8f9fa;
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

  .tours-grid {
    grid-template-columns: 1fr;
  }

  .cta-card {
    padding: 30px 20px;
  }

  .cta-card h2 {
    font-size: 1.5rem;
  }
}
</style>
