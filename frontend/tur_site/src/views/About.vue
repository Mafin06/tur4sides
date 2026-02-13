<template>
  <section class="about-page">
    <!-- Герой-секция -->
    <div class="about-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">О нас</h1>
          <p class="hero-subtitle">
            Более 10 лет создаём незабываемые путешествия
          </p>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- О компании -->
      <div class="company-section">
        <div class="section-header">
          <h2 class="section-title">Наша история</h2>
          <p class="section-subtitle">Как всё начиналось</p>
        </div>

        <div class="company-content">
          <div class="company-text">
            <p>
              Туристическое агентство <strong>TUR-4-SIDES</strong> было основано
              в 2010 году группой энтузиастов, которые верили, что путешествия
              должны быть доступны каждому.
            </p>

            <p>
              Начиная с небольшого офиса в центре Уфы, мы выросли в одну из
              ведущих туристических компаний России, предлагающую туры по всем
              четырём сторонам света.
            </p>

            <p>
              Сегодня наша команда состоит из 50+ профессионалов, которые
              ежегодно помогают более чем 10 000 клиентов осуществить их
              туристические мечты.
            </p>
          </div>

          <div class="company-stats">
            <div class="stat-item">
              <div class="stat-number">10+</div>
              <div class="stat-label">лет на рынке</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">50+</div>
              <div class="stat-label">профессионалов</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">10000+</div>
              <div class="stat-label">довольных клиентов</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">500+</div>
              <div class="stat-label">уникальных туров</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Наши ценности -->
      <div class="values-section">
        <div class="section-header">
          <h2 class="section-title">Наши ценности</h2>
          <p class="section-subtitle">Принципы, которые нас объединяют</p>
        </div>

        <div class="values-grid">
          <div class="value-card" v-for="value in values" :key="value.id">
            <div class="value-icon">{{ value.icon }}</div>
            <h3 class="value-title">{{ value.title }}</h3>
            <p class="value-description">{{ value.description }}</p>
          </div>
        </div>
      </div>

      <!-- Наша команда -->
      <div class="team-section">
        <div class="section-header">
          <h2 class="section-title">Наша команда</h2>
          <p class="section-subtitle">
            Профессионалы, которые делают ваши путешествия идеальными
          </p>
        </div>

        <div class="team-grid">
          <div class="team-card" v-for="member in team" :key="member.id">
            <div class="member-avatar">{{ member.avatar }}</div>
            <div class="member-info">
              <h3 class="member-name">{{ member.name }}</h3>
              <p class="member-position">{{ member.position }}</p>
              <p class="member-experience">{{ member.experience }}</p>
            </div>
            <div class="member-contacts">
              <div class="contact-item" v-if="member.email">
                <span class="contact-icon">✉️</span>
                <span class="contact-text">{{ member.email }}</span>
              </div>
              <div class="contact-item" v-if="member.phone">
                <span class="contact-icon">📞</span>
                <span class="contact-text">{{ member.phone }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Преимущества -->
      <div class="advantages-section">
        <div class="section-header">
          <h2 class="section-title">Почему выбирают нас</h2>
          <p class="section-subtitle">Что делает нас особенными</p>
        </div>

        <div class="advantages-list">
          <div
            class="advantage-item"
            v-for="(advantage, index) in advantages"
            :key="index"
          >
            <div class="advantage-number">{{ index + 1 }}</div>
            <div class="advantage-content">
              <h3>{{ advantage.title }}</h3>
              <p>{{ advantage.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Награды и сертификаты -->
      <div class="awards-section">
        <div class="section-header">
          <h2 class="section-title">Наши достижения</h2>
          <p class="section-subtitle">Признание на рынке туризма</p>
        </div>

        <div class="awards-grid">
          <div class="award-card" v-for="award in awards" :key="award.id">
            <div class="award-icon">{{ award.icon }}</div>
            <div class="award-content">
              <h3>{{ award.title }}</h3>
              <p>{{ award.description }}</p>
              <span class="award-year">{{ award.year }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="reviews-page">
        <div class="container">
          <div class="page-header">
            <h1 class="page-title">Отзывы наших клиентов</h1>
            <p class="page-subtitle">Более 5000 довольных путешественников</p>
          </div>

          <!-- Статистика -->
          <div class="stats-section">
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-number">4.9</div>
                <div class="stat-label">Средняя оценка</div>
                <div class="stars">
                  <span v-for="n in 5" :key="n">⭐</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-number">5000+</div>
                <div class="stat-label">Отзывов</div>
                <div class="stat-desc">на всех платформах</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">98%</div>
                <div class="stat-label">Рекомендуют</div>
                <div class="stat-desc">наших друзьям</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">95%</div>
                <div class="stat-label">Повторных</div>
                <div class="stat-desc">клиентов</div>
              </div>
            </div>
          </div>

          <!-- Фильтры отзывов -->
          <div class="reviews-filters">
            
            <div class="sort-options">
              <label for="sort">Сортировать:</label>
              <select id="sort" v-model="sortBy" @change="sortReviews">
                <option value="newest">Сначала новые</option>
                <option value="oldest">Сначала старые</option>
                <option value="highest">Высокий рейтинг</option>
                <option value="lowest">Низкий рейтинг</option>
              </select>
            </div>
            <div class="filter-tabs">
              <button 
                v-for="filter in filters" 
                :key="filter.id"
                class="filter-tab"
                :class="{ active: activeFilter === filter.id }"
                @click="activeFilter = filter.id"
              >
                {{ filter.label }}
              </button>
            </div>
          </div>

          <!-- Отзывы -->
          <div class="reviews-grid">
            <div 
              class="review-card" 
              v-for="review in filteredReviews" 
              :key="review.id"
              :class="{ 'featured': review.featured }"
            >
              <div class="review-header">
                <div class="reviewer-info">
                  <div class="reviewer-avatar">
                    {{ review.avatar }}
                  </div>
                  <div class="reviewer-details">
                    <h3 class="reviewer-name">{{ review.name }}</h3>
                    <div class="review-date">{{ review.date }}</div>
                  </div>
                </div>
                <div class="review-rating">
                  <span class="rating-stars">
                    <span v-for="n in 5" :key="n" :class="{ 'filled': n <= review.rating }">
                      ★
                    </span>
                  </span>
                  <span class="rating-value">{{ review.rating }}/5</span>
                </div>
              </div>
              
              <div class="review-tour">
                <span class="tour-icon">📍</span>
                {{ review.tour }}
              </div>
              
              <div class="review-content">
                <p>{{ review.content }}</p>
              </div>
              
              <div class="review-photos" v-if="review.photos && review.photos.length">
                <div class="photos-grid">
                  <div 
                    class="photo-item" 
                    v-for="(photo, index) in review.photos" 
                    :key="index"
                    @click="openGallery(review.photos, index)"
                  >
                    <div class="photo-placeholder">{{ photo }}</div>
                  </div>
                </div>
              </div>
              
              <div class="review-footer">
                <div class="helpful-section">
                  <button 
                    class="helpful-btn"
                    :class="{ 'active': review.userHelpful }"
                    @click="toggleHelpful(review)"
                  >
                    👍 Полезно ({{ review.helpful }})
                  </button>
                </div>
                <div class="review-actions">
                  <button class="action-btn" @click="replyToReview(review)">
                    💬 Ответить
                  </button>
                  <button class="action-btn" @click="shareReview(review)">
                    🔗 Поделиться
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Пагинация -->
          <div class="pagination" v-if="totalPages > 1">
            <button 
              class="page-btn" 
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              ←
            </button>
            
            <button 
              v-for="page in pages" 
              :key="page"
              class="page-btn"
              :class="{ active: page === currentPage }"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
            
            <button 
              class="page-btn" 
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              →
            </button>
          </div>

          <!-- Форма добавления отзыва -->
          <div class="add-review-section">
            <h2 class="section-title">Оставьте свой отзыв</h2>
            <form @submit.prevent="submitReview" class="review-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="reviewName">Ваше имя *</label>
                  <input type="text" id="reviewName" v-model="newReview.name" required>
                </div>
                <div class="form-group">
                  <label for="reviewEmail">Email *</label>
                  <input type="email" id="reviewEmail" v-model="newReview.email" required>
                </div>
              </div>
              
              <div class="form-group">
                <label for="reviewTour">Какой тур вы посетили? *</label>
                <select id="reviewTour" v-model="newReview.tourId" required>
                  <option value="">Выберите тур</option>
                  <option v-for="tour in availableTours" :key="tour.id" :value="tour.id">
                    {{ tour.name }}
                  </option>
                </select>
              </div>
              
              <div class="form-group">
                <label>Ваша оценка *</label>
                <div class="rating-input">
                  <span 
                    v-for="n in 5" 
                    :key="n"
                    class="rating-star"
                    :class="{ 'selected': n <= newReview.rating }"
                    @click="newReview.rating = n"
                  >
                    ★
                  </span>
                </div>
              </div>
              
              <div class="form-group">
                <label for="reviewTitle">Заголовок отзыва</label>
                <input type="text" id="reviewTitle" v-model="newReview.title" placeholder="Кратко опишите впечатления">
              </div>
              
              <div class="form-group">
                <label for="reviewContent">Текст отзыва *</label>
                <textarea 
                  id="reviewContent" 
                  v-model="newReview.content" 
                  rows="6"
                  placeholder="Поделитесь вашими впечатлениями..."
                  required
                ></textarea>
              </div>
              
              <div class="form-group">
                <label>Добавить фото (до 3-х)</label>
                <div class="photo-upload">
                  <div 
                    class="upload-area"
                    @click="triggerFileInput"
                  >
                    <span class="upload-icon">📷</span>
                    <span class="upload-text">Нажмите для загрузки фото</span>
                    <input 
                      type="file" 
                      ref="fileInput"
                      multiple
                      accept="image/*"
                      @change="handleFileUpload"
                      hidden
                    >
                  </div>
                  <div class="uploaded-photos" v-if="newReview.photos.length">
                    <div 
                      class="uploaded-photo" 
                      v-for="(photo, index) in newReview.photos" 
                      :key="index"
                    >
                      <span>{{ photo }}</span>
                      <button type="button" class="remove-photo" @click="removePhoto(index)">
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="form-group checkbox-group">
                <input type="checkbox" id="reviewAgreement" v-model="newReview.agreement" required>
                <label for="reviewAgreement">
                  Я подтверждаю, что этот отзыв основан на моём личном опыте
                </label>
              </div>
              
              <button type="submit" class="submit-review-btn">Опубликовать отзыв</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Контактная информация -->
      <div class="contact-section">
        <div class="contact-card">
          <div class="contact-content">
            <h2>Готовы к путешествию?</h2>
            <p>
              Свяжитесь с нами, и мы поможем организовать вашу идеальную поездку
            </p>
            <div class="contact-details">
              <div class="detail-item">
                <span class="detail-icon">📍</span>
                <span>г. Уфа, ул. Примерная, д. 10</span>
              </div>
              <div class="detail-item">
                <span class="detail-icon">📞</span>
                <span>+7 (495) 123-45-67</span>
              </div>
              <div class="detail-item">
                <span class="detail-icon">✉️</span>
                <span>tour4sides@yandex.ru</span>
              </div>
            </div>
          </div>
          <button class="contact-btn" @click="goToContact">
            Связаться с нами
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useHead } from '@vueuse/head';
export default {
  name: "AboutView",
  data() {
    useHead({
      title: 'О компании TUR-4-SIDES — история, команда, достижения туроператора',
      meta: [
        { 
          name: 'description', 
          content: '✅ Туроператор TUR-4-SIDES: 10+ лет на рынке, 50+ профессионалов, 10000+ довольных клиентов. ✅ История компании, команда экспертов, награды и сертификаты. Индивидуальный подход, прямые контракты, круглосуточная поддержка.' 
        },
        { 
          name: 'keywords', 
          content: 'о компании туроператор, туристическое агентство уфа, туроператор по россии, история компании, команда туроператора, награды турагентства, сертификаты туристической компании, тур4сайдс о нас, отзывы о туроператоре, надежный туроператор россия' 
        }
      ]

    });
    return {
      filters: [
        { id: 'all', label: 'Все отзывы' },
        { id: 'featured', label: 'Лучшие отзывы' },
        { id: 'with-photos', label: 'С фото' },
        { id: 'recent', label: 'За последний месяц' }
      ],
      activeFilter: 'all',
      sortBy: 'newest',
      currentPage: 1,
      itemsPerPage: 6,
      availableTours: [
        { id: 1, name: 'Термы в Стерлитамаке' },
        { id: 2, name: 'Отдых в Сочи' },
        { id: 3, name: 'Экскурсия по Кавказу' },
        { id: 4, name: 'Круиз по Волге' },
        { id: 5, name: 'Волонтёрство на Байкале' },
        { id: 6, name: 'Тур по Золотому кольцу' }
      ],
      reviews: [
        {
          id: 1,
          name: 'Анна Смирнова',
          avatar: '👩',
          date: '15 октября 2024',
          rating: 5,
          tour: 'Термы в Стерлитамаке',
          content: 'Отличный тур! Организация на высшем уровне. Термы просто волшебные, персонал очень внимательный. Отдельное спасибо гиду Марии за интересные экскурсии. Обязательно поедем ещё!',
          photos: ['🏞️', '♨️'],
          helpful: 24,
          userHelpful: false,
          featured: true
        },
        {
          id: 2,
          name: 'Дмитрий Петров',
          avatar: '👨',
          date: '10 октября 2024',
          rating: 4,
          tour: 'Отдых в Сочи',
          content: 'Хороший тур за свои деньги. Отель был комфортный, питание разнообразное. Единственное - погода подвела, но это не вина туроператора. Гид был очень компетентный.',
          photos: ['🏖️'],
          helpful: 18,
          userHelpful: false,
          featured: false
        },
        {
          id: 3,
          name: 'Ольга Иванова',
          avatar: '👵',
          date: '5 октября 2024',
          rating: 5,
          tour: 'Круиз по Волге',
          content: 'Путешествие мечты! Корабль новый и чистый, каюты комфортные. Программа экскурсий очень насыщенная, узнали много интересного о истории Поволжья. Обслуживание на высоте!',
          photos: ['🚢', '🌅', '🏙️'],
          helpful: 32,
          userHelpful: false,
          featured: true
        },
        {
          id: 4,
          name: 'Сергей Козлов',
          avatar: '🧔',
          date: '1 октября 2024',
          rating: 5,
          tour: 'Экскурсия по Кавказу',
          content: 'Восхитительные горные пейзажи, чистый воздух и гостеприимные люди. Тур организован безупречно. Особенно понравились походы к водопадам и дегустация местной кухни. Рекомендую всем!',
          photos: ['🏔️'],
          helpful: 45,
          userHelpful: true,
          featured: true
        },
        {
          id: 5,
          name: 'Марина Сидорова',
          avatar: '👩‍🦰',
          date: '28 сентября 2024',
          rating: 4,
          tour: 'Волонтёрство на Байкале',
          content: 'Необычный опыт сочетания отдыха и полезной деятельности. Работали по 4-5 часов в день, остальное время - экскурсии и отдых. Организаторы молодцы, все продумали до мелочей.',
          photos: ['🌲', '🐾'],
          helpful: 29,
          userHelpful: false,
          featured: false
        },
        {
          id: 6,
          name: 'Алексей Николаев',
          avatar: '👨‍💼',
          date: '25 сентября 2024',
          rating: 5,
          tour: 'Тур по Золотому кольцу',
          content: 'Потрясающее погружение в историю России! Посетили 8 древних городов, каждый со своей уникальной атмосферой. Гид - ходячая энциклопедия. Очень доволен организацией тура.',
          photos: ['⛪', '🕌'],
          helpful: 51,
          userHelpful: false,
          featured: true
        },
        {
          id: 7,
          name: 'Елена Васнецова',
          avatar: '👩‍🎨',
          date: '20 сентября 2024',
          rating: 3,
          tour: 'Отдых в Сочи',
          content: 'Отель хороший, но было много нареканий к организации трансфера. Задержали на 3 часа. Питание в отеле могло бы быть разнообразнее. В целом неплохо, но есть куда расти.',
          photos: [],
          helpful: 8,
          userHelpful: false,
          featured: false
        },
        {
          id: 8,
          name: 'Игорь Семенов',
          avatar: '👴',
          date: '18 сентября 2024',
          rating: 5,
          tour: 'Термы в Стерлитамаке',
          content: 'Отличный вариант для семейного отдыха! Детям очень понравились водные горки, взрослые оценили спа-процедуры. Цена соответствует качеству. Будем рекомендовать друзьям.',
          photos: ['👨‍👩‍👧‍👦', '🎢'],
          helpful: 36,
          userHelpful: false,
          featured: false
        }
      ],
      newReview: {
        name: '',
        email: '',
        tourId: '',
        rating: 5,
        title: '',
        content: '',
        photos: [],
        agreement: false
      },
      values: [
        {
          id: 1,
          icon: "🤝",
          title: "Доверие",
          description:
            "Мы строим долгосрочные отношения с клиентами, основанные на честности и прозрачности",
        },
        {
          id: 2,
          icon: "🎯",
          title: "Качество",
          description:
            "Тщательно отбираем отели, гидов и партнёров, чтобы гарантировать высокий уровень сервиса",
        },
        {
          id: 3,
          icon: "❤️",
          title: "Забота",
          description:
            "Каждый клиент для нас - важный гость. Мы внимательны к деталям и индивидуальным потребностям",
        },
        {
          id: 4,
          icon: "🚀",
          title: "Инновации",
          description:
            "Постоянно развиваемся, внедряем новые технологии и улучшаем сервис",
        },
      ],
      team: [
        {
          id: 1,
          name: "Анна Смирнова",
          position: "Основатель и генеральный директор",
          experience: "15 лет в туризме",
          email: "anna@touragency.ru",
          phone: "+7 (495) 111-22-33",
          avatar: "👩‍💼",
        },
        {
          id: 2,
          name: "Максим Петров",
          position: "Директор по развитию",
          experience: "12 лет в туризме",
          email: "maxim@touragency.ru",
          phone: "+7 (495) 222-33-44",
          avatar: "👨‍💼",
        },
        {
          id: 3,
          name: "Ольга Иванова",
          position: "Руководитель отдела продаж",
          experience: "10 лет в туризме",
          email: "olga@touragency.ru",
          phone: "+7 (495) 333-44-55",
          avatar: "👩‍💻",
        },
        {
          id: 4,
          name: "Дмитрий Сидоров",
          position: "Главный туроператор",
          experience: "8 лет в туризме",
          email: "dmitry@touragency.ru",
          avatar: "👨‍✈️",
        },
      ],
      advantages: [
        {
          title: "Индивидуальный подход",
          description:
            "Мы создаём туры под конкретные запросы и бюджет каждого клиента",
        },
        {
          title: "Прямые контракты",
          description:
            "Работаем напрямую с отелями и авиакомпаниями, что позволяет предлагать лучшие цены",
        },
        {
          title: "Круглосуточная поддержка",
          description:
            "Наши менеджеры доступны 24/7 во время вашего путешествия",
        },
        {
          title: "Опытные гиды",
          description:
            "Сотрудничаем только с проверенными гидами, которые знают свои направления",
        },
        {
          title: "Финансовая гарантия",
          description:
            "Все средства клиентов застрахованы, мы несём полную финансовую ответственность",
        },
        {
          title: "Экологический подход",
          description:
            "Поддерживаем устойчивый туризм и заботимся о сохранении природы",
        },
      ],
      awards: [
        {
          id: 1,
          icon: "🏆",
          title: "Лучшее турагентство года",
          description: 'Премия "Туристический Олимп" 2023',
          year: "2023",
        },
        {
          id: 2,
          icon: "⭐",
          title: "Выбор путешественников",
          description: "По версии TripAdvisor",
          year: "2022",
        },
        {
          id: 3,
          icon: "🎖️",
          title: "Золотой стандарт качества",
          description: "Сертификат ISO 9001",
          year: "2021",
        },
        {
          id: 4,
          icon: "💎",
          title: "За лучший клиентский сервис",
          description: "Национальная туристическая премия",
          year: "2020",
        },
      ],
      testimonials: [
        {
          id: 1,
          name: "Елена Ковалёва",
          avatar: "👩",
          tour: "Отдых в Сочи, октябрь 2024",
          rating: 5,
          text: "Прекрасно организованный тур! От момента бронирования до возвращения домой всё было на высшем уровне. Особенно хочу отметить работу гида Марии - её знания и энтузиазм сделали поездку незабываемой.",
        },
        {
          id: 2,
          name: "Алексей Морозов",
          avatar: "👨",
          tour: "Круиз по Волге, сентябрь 2024",
          rating: 5,
          text: "Путешествие мечты! Корабль был в отличном состоянии, программа экскурсий очень насыщенная. Организация на высоте - всё вовремя, без задержек. Обязательно обратимся снова при планировании следующей поездки.",
        },
        {
          id: 3,
          name: "Ирина Белова",
          avatar: "👩‍🦰",
          tour: "Термы в Стерлитамаке, август 2024",
          rating: 4,
          text: "Отличный семейный отдых! Детям очень понравились аквапарки, взрослые оценили спа-процедуры. Единственное - питание в отеле могло бы быть разнообразнее. В целом - очень довольны.",
        },
      ],
    };
  },
  methods: {
    sortReviews() {
      this.currentPage = 1
    },
    toggleHelpful(review) {
      review.userHelpful = !review.userHelpful
      review.helpful += review.userHelpful ? 1 : -1
    },
    replyToReview(review) {
      alert(`Ответ на отзыв ${review.name} будет добавлен после разработки функционала комментариев`)
    },
    shareReview(review) {
      const shareText = `Отзыв о туре "${review.tour}" от ${review.name}`
      alert(`Поделиться: ${shareText}`)
      // В реальном приложении здесь будет нативный share API
    },
    openGallery(photos, index) {
      alert(`Галерея фото (${index + 1} из ${photos.length})`)
    },
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    handleFileUpload(event) {
      if (this.newReview.photos.length >= 3) {
        alert('Можно загрузить не более 3 фотографий')
        return
      }
      
      const files = Array.from(event.target.files)
      const remainingSlots = 3 - this.newReview.photos.length
      const filesToAdd = files.slice(0, remainingSlots)
      
      filesToAdd.forEach(file => {
        // В реальном приложении здесь будет загрузка на сервер
        const emoji = this.getEmojiForFile(file)
        this.newReview.photos.push(emoji)
      })
      
      event.target.value = ''
    },
    getEmojiForFile(file) {
      // Заглушка для эмодзи
      const emojis = ['📷', '🏞️', '🌅', '🏖️', '🏔️', '🌊', '🌄', '🎑']
      return emojis[Math.floor(Math.random() * emojis.length)]
    },
    removePhoto(index) {
      this.newReview.photos.splice(index, 1)
    },
    submitReview() {
      const review = {
        id: this.reviews.length + 1,
        name: this.newReview.name,
        avatar: this.getAvatarEmoji(this.newReview.name),
        date: new Date().toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        rating: this.newReview.rating,
        tour: this.availableTours.find(t => t.id === Number(this.newReview.tourId))?.name || 'Неизвестный тур',
        content: this.newReview.content,
        photos: this.newReview.photos,
        helpful: 0,
        userHelpful: false,
        featured: false
      }
      
      this.reviews.unshift(review)
      alert('Спасибо за ваш отзыв! Он появится после модерации.')
      this.resetForm()
    },
    getAvatarEmoji(name) {
      const emojis = ['👨', '👩', '🧔', '👩‍🦰', '👴', '👵', '👨‍💼', '👩‍🎨']
      const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
      return emojis[hash % emojis.length]
    },
    resetForm() {
      this.newReview = {
        name: '',
        email: '',
        tourId: '',
        rating: 5,
        title: '',
        content: '',
        photos: [],
        agreement: false
      }
    },
    goToContact() {
      this.$router.push("/help");
    },
  },
  computed: {
    filteredReviews() {
      let filtered = [...this.reviews]
      
      // Применяем фильтры
      switch(this.activeFilter) {
        case 'featured':
          filtered = filtered.filter(r => r.featured)
          break
        case 'with-photos':
          filtered = filtered.filter(r => r.photos && r.photos.length > 0)
          break
        case 'recent':
          filtered = filtered.filter(r => {
            const reviewDate = new Date(r.date)
            const monthAgo = new Date()
            monthAgo.setMonth(monthAgo.getMonth() - 1)
            return reviewDate >= monthAgo
          })
          break
      }
      
      // Применяем сортировку
      switch(this.sortBy) {
        case 'newest':
          filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
          break
        case 'oldest':
          filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
          break
        case 'highest':
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case 'lowest':
          filtered.sort((a, b) => a.rating - b.rating)
          break
      }
      
      // Пагинация
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return filtered.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.reviews.length / this.itemsPerPage)
    },
    pages() {
      const pages = []
      const maxVisible = 5
      let start = Math.max(1, this.currentPage - 2)
      let end = Math.min(this.totalPages, start + maxVisible - 1)
      
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      return pages
    }
  },
};
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

/* Герой-секция */
.about-hero {
  background:
    linear-gradient(rgba(0, 0, 0, 0.7), rgba(8, 59, 74, 0.237)),
    url("../assets/img/about-hero.jpg") center/cover no-repeat;
  color: white;
  padding: 120px 0 60px;
  text-align: center;
  height: 80vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 8%;
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 20px;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.hero-subtitle {
  font-size: 1.5rem;
  opacity: 0.9;
  margin-bottom: 0;
}

/* Общие стили для секций */
.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-title {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.section-subtitle {
  color: #7f8c8d;
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
}

/* О компании */
.company-section {
  padding: 80px 0;
}

.company-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.company-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #34495e;
}

.company-text p {
  margin-bottom: 20px;
}

.company-text strong {
  color: #127698;
}

.company-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.stat-item {
  background: white;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(52, 152, 219, 0.15);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #127698;
  margin-bottom: 10px;
}

.stat-label {
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 500;
}

/* Ценности */
.values-section {
  padding: 80px 0;
  background: white;
  margin: 0 -20px;
  padding-left: 20px;
  padding-right: 20px;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.value-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.value-card:hover {
  border-color: #127698;
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(52, 152, 219, 0.15);
}

.value-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.value-title {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.value-description {
  color: #7f8c8d;
  line-height: 1.6;
}

/* Команда */
.team-section {
  padding: 80px 0;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.team-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(52, 152, 219, 0.15);
}

.member-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #127698, #beefff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin: 0 auto;
}

.member-info {
  text-align: center;
}

.member-name {
  color: #2c3e50;
  margin-bottom: 5px;
  font-size: 1.2rem;
}

.member-position {
  color: #3498db;
  font-weight: 500;
  margin-bottom: 5px;
}

.member-experience {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.member-contacts {
  border-top: 1px solid #f0f0f0;
  padding-top: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  color: #34495e;
  font-size: 0.9rem;
}

.contact-icon {
  font-size: 1.1rem;
}

.contact-text {
  flex: 1;
}

/* Преимущества */
.advantages-section {
  padding: 80px 0;
  background: #f8f9fa;
  margin: 0 -20px;
  padding-left: 20px;
  padding-right: 20px;
}

.advantages-list {
  max-width: 800px;
  margin: 0 auto;
}

.advantage-item {
  display: flex;
  align-items: flex-start;
  gap: 25px;
  margin-bottom: 30px;
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.advantage-item:hover {
  transform: translateX(10px);
}

.advantage-number {
  background: #127698;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
  font-size: 1.2rem;
}

.advantage-content h3 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.advantage-content p {
  color: #7f8c8d;
  line-height: 1.6;
}

/* Награды */
.awards-section {
  padding: 80px 0;
}

.awards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.award-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.award-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(52, 152, 219, 0.15);
}

.award-icon {
  font-size: 3rem;
}

.award-content {
  flex: 1;
}

.award-content h3 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.award-content p {
  color: #7f8c8d;
  margin-bottom: 10px;
  line-height: 1.5;
}

.award-year {
  display: inline-block;
  background: #f1c40f;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
}

/* Отзывы */
.testimonials-section {
  padding: 80px 0;
  background: white;
  margin: 0 -20px;
  padding-left: 20px;
  padding-right: 20px;
}

.testimonials-slider {
  overflow: hidden;
}

.testimonials-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.testimonial-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: transform 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(52, 152, 219, 0.15);
}

.testimonial-content {
  flex: 1;
}

.testimonial-text {
  color: #34495e;
  line-height: 1.7;
  font-style: italic;
  margin-bottom: 25px;
  position: relative;
  padding-left: 20px;
}

.testimonial-text::before {
  content: '"';
  font-size: 3rem;
  color: #127698;
  position: absolute;
  left: -10px;
  top: -15px;
  opacity: 0.3;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 15px;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #127698, #b7edff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.author-info h4 {
  color: #2c3e50;
  margin-bottom: 5px;
  font-size: 1.1rem;
}

.author-info p {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.testimonial-rating {
  display: flex;
  justify-content: center;
  gap: 5px;
}

.testimonial-rating .star {
  color: #f1c40f;
  font-size: 1.2rem;
}

/* Контактная секция */
.contact-section {
  padding: 80px 0;
}

.contact-card {
  background: linear-gradient(135deg, #127698, #0d5269);
  color: white;
  border-radius: 20px;
  padding: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  box-shadow: 0 15px 40px rgba(52, 152, 219, 0.3);
}

.contact-content h2 {
  font-size: 2rem;
  margin-bottom: 15px;
}

.contact-content p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 25px;
  line-height: 1.6;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.1rem;
}

.detail-icon {
  font-size: 1.3rem;
}

.contact-btn {
  background: white;
  color: #127698;
  border: none;
  padding: 15px 40px;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.contact-btn:hover {
  background: #f8f9fa;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 255, 255, 0.2);
}

/* Адаптивность */
@media (max-width: 992px) {
  .company-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .contact-card {
    flex-direction: column;
    text-align: center;
    gap: 30px;
  }

  .detail-item {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1.1rem;
  }

  .company-stats {
    grid-template-columns: 1fr;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }

  .awards-grid {
    grid-template-columns: 1fr;
  }

  .testimonials-container {
    grid-template-columns: 1fr;
  }

  .contact-card {
    padding: 30px;
  }

  .contact-content h2 {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .advantage-item {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .testimonial-author {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
}

.reviews-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 80px 0 40px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.page-subtitle {
  color: #7f8c8d;
  font-size: 1.2rem;
}

/* Статистика */
.stats-section {
  margin-bottom: 50px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 25px;
}

.stat-card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #127698;
  margin-bottom: 10px;
}

.stat-label {
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px;
}

.stat-desc {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.stars {
  margin-top: 10px;
}

.stars span {
  font-size: 1.2rem;
  margin: 0 2px;
}

/* Фильтры */
.reviews-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
}

.filter-tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 8px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  background: white;
  color: #7f8c8d;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-tab:hover {
  border-color: #127698;
  color: #127698;
}

.filter-tab.active {
  background: #127698;
  color: white;
  border-color: #127698;
}

.sort-options {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sort-options label {
  color: #2c3e50;
  font-weight: 500;
}

.sort-options select {
  padding: 8px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  color: #2c3e50;
  cursor: pointer;
}

/* Карточки отзывов */
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.review-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  transition: transform 0.3s ease;
}

.review-card.featured {
  border: 2px solid #f1c40f;
  position: relative;
  overflow: hidden;
}

.review-card.featured::before {
  content: '⭐ Лучший отзыв';
  position: absolute;
  top: 10px;
  right: -30px;
  background: #f1c40f;
  color: white;
  padding: 5px 30px;
  transform: rotate(45deg);
  font-size: 0.8rem;
  font-weight: bold;
}

.review-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(52, 152, 219, 0.15);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.reviewer-info {
  display: flex;
  gap: 15px;
  align-items: center;
}

.reviewer-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #f0f8ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.reviewer-details {
  flex: 1;
}

.reviewer-name {
  color: #2c3e50;
  margin-bottom: 5px;
  font-size: 1.1rem;
}

.review-date {
  color: #95a5a6;
  font-size: 0.9rem;
}

.review-rating {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
}

.rating-stars {
  color: #f1c40f;
  font-size: 1.2rem;
}

.rating-stars .filled {
  color: #f1c40f;
}

.rating-value {
  color: #2c3e50;
  font-weight: bold;
}

.review-tour {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  color: #127698;
  font-weight: 500;
}

.tour-icon {
  font-size: 1.2rem;
}

.review-content {
  margin-bottom: 20px;
}

.review-content p {
  color: #34495e;
  line-height: 1.6;
}

.review-photos {
  margin-bottom: 20px;
}

.photos-grid {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.photo-item {
  cursor: pointer;
}

.photo-placeholder {
  width: 80px;
  height: 80px;
  background: #f8f9fa;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  transition: transform 0.3s ease;
}

.photo-placeholder:hover {
  transform: scale(1.05);
}

.review-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.helpful-btn {
  padding: 8px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 20px;
  background: white;
  color: #7f8c8d;
  cursor: pointer;
  transition: all 0.3s ease;
}

.helpful-btn:hover {
  border-color: #127698;
  color: #127698;
}

.helpful-btn.active {
  background: #127698;
  color: white;
  border-color: #127698;
}

.review-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  padding: 8px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 20px;
  background: white;
  color: #7f8c8d;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  border-color: #127698;
  color: #127698;
}

/* Пагинация */
.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 50px;
}

.page-btn {
  width: 40px;
  height: 40px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  border-color: #127698;
  color: #127698;
}

.page-btn.active {
  background: #127698;
  color: white;
  border-color: #127698;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Форма добавления отзыва */
.add-review-section {
  background: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.section-title {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
}

.review-form {
  max-width: 800px;
  margin: 0 auto;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #127698;
}

.rating-input {
  display: flex;
  gap: 10px;
  font-size: 2rem;
}

.rating-star {
  cursor: pointer;
  color: #ddd;
  transition: color 0.3s ease;
}

.rating-star:hover,
.rating-star.selected {
  color: #f1c40f;
}

.photo-upload {
  margin-top: 10px;
}

.upload-area {
  border: 2px dashed #e0e0e0;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.upload-area:hover {
  border-color: #127698;
  background: #f8f9fa;
}

.upload-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 10px;
}

.upload-text {
  color: #7f8c8d;
}

.uploaded-photos {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.uploaded-photo {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8f9fa;
  padding: 10px 15px;
  border-radius: 8px;
}

.remove-photo {
  width: 24px;
  height: 24px;
  border: none;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-group {
  display: flex;
  align-items: flex-start;
}

.checkbox-group input {
  width: auto;
  margin-right: 10px;
  margin-top: 5px;
}

.checkbox-group label {
  margin-bottom: 0;
  font-weight: normal;
  line-height: 1.5;
}

.submit-review-btn {
  background: #127698;
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 30px auto 0;
}

.submit-review-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

@media (max-width: 768px) {
  .reviews-filters {
    flex-direction: column;
    gap: 20px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .reviews-grid {
    grid-template-columns: 1fr;
  }
  
  .review-header {
    flex-direction: column;
    gap: 15px;
  }
  
  .review-rating {
    align-items: flex-start;
  }
  
  .review-footer {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .add-review-section {
    padding: 25px;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
}
</style>