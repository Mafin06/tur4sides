<template>
  <section class="gastronomic-tours-page">
    <!-- Герой-секция -->
    <div class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Гастрономические туры по России 2026</h1>
          <p class="hero-subtitle">
            Вкусные путешествия по регионам России: от башкирского меда до
            камчатских морепродуктов
          </p>
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
            <span itemprop="name">Гастрономические туры</span>
            <meta itemprop="position" content="2" />
          </li>
        </ol>
      </nav>

      <!-- SEO Контент -->
      <article class="seo-content">
        <h2>
          Кулинарные путешествия по России: гастрономические туры 2026
        </h2>

        <p>
          <strong>Гастрономические туры по России</strong> — это уникальная
          возможность познакомиться с разнообразием региональных кухонь,
          традициями и продуктами нашей страны. Мы предлагаем
          <strong>гастротуры</strong> по самым интересным направлениям:
        </p>

        <div class="gastro-regions">
          <div class="region">
            <h3>🍯 Башкирия — мед и кумыс</h3>
            <p>
              Дегустация башкирского меда, посещение пасек, мастер-классы по
              приготовлению национальных блюд.
            </p>
          </div>
          <div class="region">
            <h3>🥟 Кавказ — хинкали и шашлык</h3>
            <p>
              Гастрономические туры по Дагестану, Чечне, Осетии с дегустацией
              национальных блюд.
            </p>
          </div>
          <div class="region">
            <h3>🐟 Камчатка — морепродукты</h3>
            <p>
              Свежие крабы, креветки, икра и рыба прямо с Тихого океана.
            </p>
          </div>
          <div class="region">
            <h3>🧀 Алтай — сыры и мед</h3>
            <p>
              Экотуры на алтайские фермы с дегустацией натуральных продуктов.
            </p>
          </div>
        </div>

        <h3>Что включает гастрономический тур по России?</h3>
        <ul>
          <li>🍽️ Дегустации в лучших ресторанах и на фермах</li>
          <li>👨‍🍳 Мастер-классы от шеф-поваров</li>
          <li>🏭 Экскурсии на производства (сыроварни, пасеки, винодельни)</li>
          <li>🛒 Посещение местных рынков и ярмарок</li>
          <li>📚 Лекции о региональной кухне и традициях</li>
        </ul>
      </article>

      <!-- Гастрономические туры из БД -->
      <section class="popular-tours">
        <h2>Наши гастрономические туры</h2>
        
        <!-- Состояние загрузки -->
        <div v-if="loading" class="loading-container">
          <div class="spinner"></div>
          <p>Загружаем гастрономические туры...</p>
        </div>
        
        <!-- Сетка туров -->
        <div v-else-if="gastroTours.length > 0" class="tours-grid">
          <div 
            class="tour-card" 
            v-for="tour in paginatedTours" 
            :key="tour.id"
            @click="goToTour(tour.id)"
          >
            <div class="tour-image">
              <img
                :src="tour.main_image_url || '/img/tour-default.jpg'"
                :alt="tour.title + ' - гастрономический тур по России'"
                loading="lazy"
              />
              <div class="tour-badges">
                <span v-if="tour.is_new" class="badge new">Новинка</span>
                <span v-if="tour.is_hot" class="badge hot">🔥 Горящий</span>
                <span v-if="tour.discount_percent" class="badge discount">-{{ tour.discount_percent }}%</span>
                <span class="badge gastro">🍽️ Гастротур</span>
              </div>
              <div class="tour-duration" v-if="tour.duration_days">
                {{ tour.duration_days }} {{ getDayText(tour.duration_days) }}
              </div>
            </div>
            <div class="tour-content">
              <h3>{{ tour.title }}</h3>
              <div class="tour-meta">
                <span class="location">📍 {{ tour.location }}</span>
                <span class="organizer">👥 {{ tour.organizer_name || 'Организатор' }}</span>
              </div>
              <p class="tour-description">{{ tour.short_description || 'Гастрономическое путешествие с дегустациями и мастер-классами' }}</p>
              
              <!-- Программа тура (первые 3 пункта) -->
              <div class="tour-highlights" v-if="tour.program && tour.program.length > 0">
                <h4>В программе:</h4>
                <ul>
                  <li v-for="(item, index) in getProgramHighlights(tour.program)" :key="index">
                    {{ item }}
                  </li>
                </ul>
              </div>
              
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
                <button class="book-btn" @click.stop="goToTour(tour.id)">
                  Подробнее
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Нет туров -->
        <div v-else class="no-tours">
          <p>Гастрономические туры временно отсутствуют. Пожалуйста, зайдите позже.</p>
          <p class="no-tours-sub">Мы постоянно добавляем новые кулинарные путешествия по России.</p>
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

      <!-- Отзывы о гастрономических турах -->
      <section class="gastro-testimonials">
        <h2>Отзывы о гастрономических турах</h2>

        <div class="testimonials-grid" v-if="testimonials.length > 0">
          <div class="testimonial" v-for="testimonial in testimonials" :key="testimonial.id">
            <div class="rating">{{ renderStars(testimonial.rating) }}</div>
            <p>"{{ testimonial.comment }}"</p>
            <div class="author">
              <strong>{{ testimonial.author_name }}</strong>
              <span>{{ testimonial.tour_title || 'Гастрономический тур' }}</span>
            </div>
          </div>
        </div>
        <div v-else class="no-testimonials">
          <p>Пока нет отзывов. Будьте первым!</p>
        </div>
      </section>

      <!-- FAQ -->
      <section class="gastro-faq">
        <h2>Частые вопросы о гастрономических турах</h2>

        <div class="faq-list">
          <div class="faq-item">
            <h3>Подходят ли гастрономические туры вегетарианцам?</h3>
            <p>
              Да, мы можем адаптировать программу под диетические предпочтения.
              Сообщите о них при бронировании.
            </p>
          </div>

          <div class="faq-item">
            <h3>Можно ли купить гастротур в подарок?</h3>
            <p>
              Конечно! Мы оформляем подарочные сертификаты на любую сумму или
              конкретный тур.
            </p>
          </div>

          <div class="faq-item">
            <h3>Есть ли гастротуры для детей?</h3>
            <p>
              Да, мы разрабатываем семейные гастрономические программы с
              мастер-классами для детей.
            </p>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-section">
        <div class="cta-card">
          <h2>Хотите попробовать настоящую русскую кухню?</h2>
          <p>Оставьте заявку и получите подборку гастрономических туров с лучшими ценами</p>
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
import arrowImage from "@/assets/img/arrow.png";
import { useHead } from '@vueuse/head';

export default {
  name: "GastronomicToursPage",
  data() {
    return {
      gastroTours: [], // Все гастрономические туры из БД
      paginatedTours: [], // Туры для текущей страницы
      testimonials: [],
      loading: true,
      currentPage: 1,
      toursPerPage: 6,
      arrowImage: arrowImage,
      tourRequest: {
        name: "",
        phone: "",
        email: "",
      }
    };
  },
  computed: {
    totalTours() {
      return this.gastroTours.length;
    },
    totalPages() {
      return Math.ceil(this.totalTours / this.toursPerPage);
    },
    getVisiblePages() {
      const totalPages = this.totalPages;
      const current = this.currentPage;
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (let i = 1; i <= totalPages; i++) {
        if (
          i === 1 ||
          i === totalPages ||
          (i >= current - delta && i <= current + delta)
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
    this.fetchGastroTours();
    this.fetchGastroTestimonials();
  },
  methods: {
    // Загрузка гастрономических туров из базы данных по флагу is_gastro
    async fetchGastroTours() {
      this.loading = true;
      try {
        // Используем специальный endpoint для получения гастрономических туров
        // или фильтруем на сервере
        const response = await axios.get('http://localhost:3000/api/tours', {
          params: {
            limit: 100,
            is_gastro: true // Добавляем параметр для фильтрации на сервере
          }
        });
        
        // Получаем туры из ответа
        let tours = response.data.tours || [];
        
        // Фильтруем только туры с is_gastro = true (на случай если сервер не отфильтровал)
        this.gastroTours = tours.filter(tour => tour.is_gastro === true);
        
        // Если после фильтрации нет туров, проверяем есть ли туры с is_gastro в БД
        if (this.gastroTours.length === 0) {
          console.log('Гастрономические туры не найдены через параметр, пробуем альтернативный запрос');
          
          // Альтернативный запрос - получаем все туры и фильтруем
          const allToursResponse = await axios.get('http://localhost:3000/api/tours', {
            params: { limit: 100 }
          });
          
          const allTours = allToursResponse.data.tours || [];
          this.gastroTours = allTours.filter(tour => tour.is_gastro === true);
        }
        
        console.log(`Загружено ${this.gastroTours.length} гастрономических туров`);
        
        // Добавляем программу для каждого тура
        await this.enrichToursWithPrograms();
        
        // Применяем пагинацию
        this.paginateTours();
        
      } catch (error) {
        console.error('Ошибка при загрузке гастрономических туров:', error);
        
        // Для отладки - используем тестовые данные с флагом is_gastro
        if (process.env.NODE_ENV === 'development') {
          this.gastroTours = this.getMockGastroTours();
          this.paginateTours();
        }
      } finally {
        this.loading = false;
      }
    },

    // Загрузка программы для каждого тура
    async enrichToursWithPrograms() {
      for (const tour of this.gastroTours) {
        try {
          const response = await axios.get(`http://localhost:3000/api/tours/${tour.id}`);
          if (response.data.program) {
            tour.program = response.data.program;
          }
        } catch (error) {
          console.error(`Ошибка загрузки программы для тура ${tour.id}:`, error);
          // Добавляем тестовую программу
          tour.program = [
            "Дегустация местных деликатесов",
            "Мастер-класс от шеф-повара",
            "Экскурсия на производство",
            "Посещение фермерского рынка"
          ];
        }
      }
    },

    // Загрузка отзывов о гастрономических турах
    async fetchGastroTestimonials() {
      try {
        if (this.gastroTours.length > 0) {
          const tourIds = this.gastroTours.map(t => t.id).join(',');
          const response = await axios.get(`http://localhost:3000/api/reviews`, {
            params: {
              tourIds: tourIds,
              limit: 4
            }
          });
          this.testimonials = response.data.reviews || [];
        }
      } catch (error) {
        console.error('Ошибка при загрузке отзывов:', error);
        // Тестовые отзывы
        this.testimonials = [
          {
            id: 1,
            author_name: "Анна С.",
            rating: 5,
            comment: "Невероятный гастротур по Башкирии! Пробовали настоящий башкирский мед, кумыс, баурсак. Организация на высшем уровне!",
            tour_title: "Гастрономический тур по Башкирии"
          },
          {
            id: 2,
            author_name: "Михаил П.",
            rating: 5,
            comment: "Кавказский гастротур превзошел все ожидания. Хинкали, которые мы готовили сами, — просто объедение!",
            tour_title: "Кавказский гастротур"
          }
        ];
      }
    },

    // Пагинация
    paginateTours() {
      const start = (this.currentPage - 1) * this.toursPerPage;
      const end = start + this.toursPerPage;
      this.paginatedTours = this.gastroTours.slice(start, end);
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.paginateTours();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.paginateTours();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.paginateTours();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },

    // Получение первых 3 пунктов программы
    getProgramHighlights(program) {
      if (!program || !Array.isArray(program)) return [];
      
      // Если program это массив объектов с day_number и activities
      if (program.length > 0 && program[0].activities) {
        const allActivities = [];
        program.forEach(day => {
          if (day.activities && Array.isArray(day.activities)) {
            day.activities.forEach(activity => {
              if (typeof activity === 'string' && 
                  (activity.toLowerCase().includes('дегустац') ||
                   activity.toLowerCase().includes('мастер-класс') ||
                   activity.toLowerCase().includes('экскурс') ||
                   activity.toLowerCase().includes('ферм') ||
                   activity.toLowerCase().includes('ресторан') ||
                   activity.toLowerCase().includes('приготовл'))) {
                allActivities.push(activity);
              }
            });
          }
        });
        return allActivities.slice(0, 3);
      }
      
      // Если program это массив строк
      return program.slice(0, 3);
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
      console.log("Заявка на подбор гастрономического тура:", this.tourRequest);
      
      axios.post('http://localhost:3000/api/bookings/request', {
        type: 'gastronomic',
        ...this.tourRequest
      }).catch(error => {
        console.error('Ошибка отправки заявки:', error);
      });
      
      alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время и подберем лучший гастрономический тур!');
      this.tourRequest = {
        name: "",
        phone: "",
        email: ""
      };
    },

    // Тестовые данные с флагом is_gastro для разработки
    getMockGastroTours() {
      return [
        {
          id: 5,
          title: "Гастрономический тур по Башкирии: мед и кумыс",
          slug: "gastrotour-bashkiria-honey-kumys",
          location: "Уфа и окрестности, Башкортостан",
          duration_days: 3,
          short_description: "3-дневный гастрономический тур с дегустацией башкирского меда, кумыса и национальных блюд",
          full_description: "Уникальный гастрономический тур по Башкирии...",
          price: 18500,
          old_price: null,
          discount_percent: null,
          actual_price: 18500,
          rating: 4.9,
          review_count: 15,
          is_new: true,
          is_hot: false,
          is_gastro: true, // Важно!
          main_image_url: "/img/tours/bashkiria/gastro-main.jpg",
          direction_name: "Башкирия",
          organizer_name: "100ТРОП",
          program: [
            "Посещение башкирской пасеки",
            "Дегустация разных сортов меда",
            "Экскурсия на ферму по производству кумыса",
            "Мастер-класс по приготовлению башкирских блюд"
          ]
        },
        {
          id: 8,
          title: "Камчатка: гастрономическое путешествие",
          slug: "kamchatka-gastro-2025",
          location: "Камчатка, Петропавловск-Камчатский",
          duration_days: 7,
          short_description: "7-дневный тур на Камчатку с дегустацией свежайших морепродуктов",
          price: 65000,
          old_price: 72000,
          discount_percent: 10,
          actual_price: 65000,
          rating: 4.9,
          review_count: 18,
          is_new: true,
          is_hot: false,
          is_gastro: true, // Важно!
          main_image_url: "/img/tours/kamchatka/main.jpg",
          direction_name: "Восточное направление России",
          organizer_name: "Байкал тур",
          program: [
            "Экскурсия на рыбный рынок",
            "Дегустация камчатского краба",
            "Приготовление ухи на костре",
            "Посещение икорного производства"
          ]
        }
      ];
    }
  },
  setup() {
    useHead({
      title: 'Гастрономические туры по России 2026 - кулинарные путешествия | TUR-4-SIDES',
      meta: [
        { 
          name: 'description', 
          content: '✅ Гастрономические туры по России 2026: дегустации, мастер-классы, экскурсии на производства. Башкирский мед, кавказский шашлык, камчатские морепродукты. Кулинарные путешествия по России.' 
        },
        { 
          name: 'keywords', 
          content: 'гастрономические туры по России, гастротуры, кулинарные туры по России, гастрономический тур по Башкирии, гастротур по Кавказу, гастрономические экскурсии, дегустационные туры, мед башкирский, кумыс, морепродукты камчатка' 
        },
        { property: 'og:title', content: 'Гастрономические туры по России 2026' },
        { property: 'og:description', content: 'Вкусные путешествия по России: от башкирского меда до камчатских морепродуктов' },
        { property: 'og:image', content: '/img/og-gastro.jpg' }
      ]
    });
    return {};
  }
};
</script>

<style scoped>
/* Состояния загрузки */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  text-align: center;
  background: white;
  border-radius: 15px;
  margin: 2rem 0;
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
  border-radius: 15px;
  color: #7f8c8d;
  margin: 2rem 0;
}

.no-tours-sub {
  margin-top: 1rem;
  color: #95a5a6;
  font-size: 0.95rem;
}

.no-testimonials {
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
  font-style: italic;
}

/* Сетка туров */
.tours-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 2rem;
  margin: 2rem 0 3rem;
}

.tour-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #f1fcff;
}

.tour-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(18, 118, 152, 0.15);
}

.tour-image {
  position: relative;
  height: 220px;
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
  top: 15px;
  left: 15px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  z-index: 2;
}

.badge {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: white;
  letter-spacing: 0.5px;
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

.badge.gastro {
  background: #55c496;
}

.tour-duration {
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  backdrop-filter: blur(5px);
  z-index: 2;
}

.tour-content {
  padding: 1.8rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.tour-content h3 {
  color: #2c3e50;
  font-size: 1.25rem;
  margin: 0 0 0.8rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 600;
}

.tour-meta {
  display: flex;
  gap: 1.2rem;
  margin-bottom: 1rem;
  color: #7f8c8d;
  font-size: 0.9rem;
  flex-wrap: wrap;
}

.tour-description {
  color: #5a6c7d;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tour-highlights {
  background: #f1fcff;
  padding: 1.2rem;
  border-radius: 10px;
  margin-bottom: 1.2rem;
}

.tour-highlights h4 {
  color: #127698;
  margin-bottom: 0.8rem;
  font-size: 0.95rem;
  font-weight: 600;
}

.tour-highlights ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tour-highlights li {
  padding: 0.4rem 0;
  border-bottom: 1px dashed #cdf4ff;
  color: #666;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tour-highlights li:last-child {
  border-bottom: none;
}

.tour-highlights li::before {
  content: "🍽️";
  margin-right: 0.5rem;
}

.tour-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
}

.stars {
  color: #f1c40f;
  font-size: 0.95rem;
}

.rating-count {
  color: #95a5a6;
  font-size: 0.85rem;
}

.tour-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1.2rem;
  border-top: 2px solid #f1fcff;
}

.price-section {
  display: flex;
  flex-direction: column;
}

.price-main {
  display: flex;
  align-items: baseline;
  gap: 5px;
}

.price-value {
  color: #127698;
  font-size: 1.5rem;
  font-weight: 700;
}

.price-label {
  color: #94a3b8;
  font-size: 0.8rem;
}

.price-old {
  color: #94a3b8;
  font-size: 0.85rem;
  text-decoration: line-through;
  margin-top: 2px;
}

.book-btn {
  background: linear-gradient(135deg, #127698, #0d5a7a);
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.book-btn:hover {
  background: linear-gradient(135deg, #0d5a7a, #083e52);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(18, 118, 152, 0.25);
}

/* Пагинация */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin: 3rem 0;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
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
  border-color: #55c496;
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

/* Остальные стили из оригинального файла */
.gastronomic-tours-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.hero-section {
  background:
    linear-gradient(rgba(0, 0, 0, 0.7), rgba(8, 59, 74, 0.237)),
    url("../../assets/img/gastr-hero.jpg") center/cover;
  color: white;
  padding: 100px 0 60px;
  text-align: center;
}

.hero-content {
  padding: 8%;
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

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.seo-content {
  background: white;
  padding: 40px;
  border-radius: 15px;
  margin: 40px 0;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.seo-content h2 {
  color: #127698;
  margin-bottom: 25px;
  font-size: 1.8rem;
  border-bottom: 3px solid #127698;
  padding-bottom: 10px;
}

.seo-content h3 {
  color: #127698;
  margin: 30px 0 20px;
  font-size: 1.4rem;
}

.gastro-regions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin: 30px 0;
}

.region {
  background: #f1fcff;
  padding: 25px;
  border-radius: 10px;
  border: 2px solid #f1fcff;
}

.region h3 {
  color: #127698;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.popular-tours {
  margin: 60px 0;
}

.popular-tours h2 {
  text-align: center;
  color: #127698;
  margin-bottom: 40px;
  font-size: 2rem;
}

.gastro-testimonials {
  margin: 60px 0;
  background: #f1fcff;
  padding: 50px;
  border-radius: 15px;
}

.gastro-testimonials h2 {
  text-align: center;
  color: #127698;
  margin-bottom: 40px;
  font-size: 2rem;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 800px;
  margin: 0 auto;
}

.testimonial {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.rating {
  color: #f1c40f;
  font-size: 1.3rem;
  margin-bottom: 15px;
}

.author {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #f1fcff;
}

.author strong {
  display: block;
  color: #2c3e50;
}

.author span {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.gastro-faq {
  margin: 60px 0;
}

.gastro-faq h2 {
  text-align: center;
  color: #127698;
  margin-bottom: 40px;
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
  box-shadow: 0 5px 15px rgba(231, 76, 60, 0.05);
  border-left: 4px solid #127698;
}

.faq-item h3 {
  color: #127698;
  margin-bottom: 15px;
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

/* Адаптивность */
@media (max-width: 992px) {
  .tours-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .tours-grid {
    grid-template-columns: 1fr;
  }

  .tour-image {
    height: 200px;
  }

  .gastro-regions {
    grid-template-columns: 1fr;
  }

  .gastro-testimonials {
    padding: 30px 20px;
  }

  .cta-card {
    padding: 30px 20px;
  }

  .cta-card h2 {
    font-size: 1.5rem;
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

  .arrow-img {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8rem;
  }

  .tour-content {
    padding: 1.2rem;
  }

  .price-value {
    font-size: 1.3rem;
  }

  .pagination-pages {
    gap: 0.3rem;
  }

  .page-btn {
    width: 32px;
    height: 32px;
    font-size: 0.85rem;
  }
}
</style>