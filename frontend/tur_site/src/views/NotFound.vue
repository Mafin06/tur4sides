<template>
  <div class="not-found">
    <div class="not-found-container">
      <div class="error-content">
        <div class="error-number">404</div>
        <h1 class="error-title">Страница не найдена</h1>
        <p class="error-message">
          К сожалению, запрашиваемая страница не существует или была перемещена.
        </p>
        
        <div class="error-actions">
          <router-link to="/" class="home-btn">
            <span class="btn-icon">🏠</span>
            <span>Вернуться на главную</span>
          </router-link>
          
          <router-link to="/tours-russia" class="tours-btn">
            <span class="btn-icon">🏔️</span>
            <span>Все туры по России</span>
          </router-link>
        </div>

        <div class="seo-links">
          <h3>Возможно, вы искали:</h3>
          <div class="links-grid">
            <router-link to="/tours-russia" class="seo-link">
              <span>Туры по России 2026</span>
            </router-link>
            <router-link to="/tours-bashkiria" class="seo-link">
              <span>Туры по Башкирии</span>
            </router-link>
            <router-link to="/family-tours" class="seo-link">
              <span>Семейные туры</span>
            </router-link>
            <router-link to="/gastronomic-tours" class="seo-link">
              <span>Гастрономические туры</span>
            </router-link>
            <router-link to="/tour-documents" class="seo-link">
              <span>Документы для тура</span>
            </router-link>
            <router-link to="/help" class="seo-link">
              <span>Помощь туристам</span>
            </router-link>
          </div>
        </div>

        <!-- <div class="search-container">
          <div class="search-form">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Поиск туров по России..." 
              class="search-input"
              @keyup.enter="performSearch"
            >
            <button class="search-button" @click="performSearch">
              <span class="search-icon">🔍</span>
              <span>Найти</span>
            </button>
          </div>
        </div> -->

        <div class="contact-info">
          <p>Нужна помощь? Звоните круглосуточно:</p>
          <a href="tel:+74951234567" class="phone-link">+7 (495) 123-45-67</a>
          <p class="contact-hours">Пн-Вс: 24/7</p>
        </div>
      </div>

      <div class="error-image">
        <div class="compass">
          <div class="compass-inner">
            <span class="compass-north">N</span>
            <span class="compass-east">E</span>
            <span class="compass-south">S</span>
            <span class="compass-west">W</span>
            <div class="compass-arrow"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Карта сайта для SEO -->
    <section class="sitemap-section">
      <div class="container">
        <h3>Карта сайта</h3>
        <div class="sitemap-links">
          <div class="sitemap-column">
            <h4>Основные разделы</h4>
            <ul>
              <li><router-link to="/">Главная</router-link></li>
              <li><router-link to="/tours-russia">Туры по России</router-link></li>
              <li><router-link to="/tours-bashkiria">Туры по Башкирии</router-link></li>
              <li><router-link to="/family-tours">Семейные туры</router-link></li>
              <li><router-link to="/gastronomic-tours">Гастрономические туры</router-link></li>
            </ul>
          </div>
          <div class="sitemap-column">
            <h4>Информация</h4>
            <ul>
              <li><router-link to="/about">О компании</router-link></li>
              <li><router-link to="/reviews">Отзывы</router-link></li>
              <li><router-link to="/faq">Частые вопросы</router-link></li>
              <li><router-link to="/help">Помощь</router-link></li>
              <li><router-link to="/tour-documents">Документы</router-link></li>
            </ul>
          </div>
          <div class="sitemap-column">
            <h4>Специальные туры</h4>
            <ul>
              <li><router-link to="/tours-russia#new">Новинки</router-link></li>
              <li><router-link to="/tours-russia#hot">Горящие туры</router-link></li>
              <li><router-link to="/tours-russia#budget">Бюджетные туры</router-link></li>
              <li><router-link to="/family-tours">Для всей семьи</router-link></li>
              <li><router-link to="/gastronomic-tours">Кулинарные туры</router-link></li>
            </ul>
          </div>
          <div class="sitemap-column">
            <h4>Направления</h4>
            <ul>
              <li><router-link to="/tours-russia#south">Южное направление</router-link></li>
              <li><router-link to="/tours-russia#north">Северное направление</router-link></li>
              <li><router-link to="/tours-russia#east">Восточное направление</router-link></li>
              <li><router-link to="/tours-russia#center">Центр России</router-link></li>
              <li><router-link to="/tours-russia#altai">Алтай</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data() {
    return {
      searchQuery: ''
    }
  },
  mounted() {
    // Добавляем structured data для 404 страницы
    this.add404StructuredData();
  },
  methods: {
    performSearch() {
      if (this.searchQuery.trim()) {
        // Редирект на страницу поиска или главную
        this.$router.push({
          path: '/tours-russia',
          query: { search: this.searchQuery }
        });
      }
    },
    add404StructuredData() {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Страница 404 - Туроператор TUR-4-SIDES",
        "description": "Страница не найдена. Туры по России, Башкирии, семейные и гастрономические туры.",
        "url": window.location.href
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  },
  head() {
    return {
      title: "Страница не найдена (404) - туроператор TUR-4-SIDES",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Страница не найдена. Перейдите на главную страницу или выберите тур из нашего каталога.'
        },
        {
          hid: 'robots',
          name: 'robots',
          content: 'noindex, follow'
        }
      ]
    }
  }
}
</script>

<style scoped>
.not-found {
  margin-top: 3%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 40px 20px;
}

.not-found-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  flex: 1;
}

.error-content {
  flex: 1;
}

.error-number {
  font-size: 120px;
  font-weight: 900;
  color: #127698;
  line-height: 1;
  margin-bottom: 20px;
  text-shadow: 3px 3px 0 rgba(18, 118, 152, 0.1);
}

.error-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

.error-message {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 40px;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 20px;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.home-btn, .tours-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.home-btn {
  background: #127698;
  color: white;
}

.tours-btn {
  background: white;
  color: #127698;
  border: 2px solid #127698;
}

.home-btn:hover {
  background: #0d5a7a;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(18, 118, 152, 0.2);
}

.tours-btn:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.btn-icon {
  font-size: 1.2rem;
}

.seo-links {
  margin: 50px 0;
  padding: 30px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.seo-links h3 {
  color: #2c3e50;
  margin-bottom: 25px;
  font-size: 1.5rem;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.seo-link {
  display: block;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
  color: #127698;
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.seo-link:hover {
  background: #e9ecef;
  border-left-color: #127698;
  transform: translateX(5px);
}

.search-container {
  margin: 40px 0;
}

.search-form {
  display: flex;
  gap: 10px;
  max-width: 600px;
}

.search-input {
  flex: 1;
  padding: 15px 20px;
  border: 2px solid #ddd;
  border-radius: 50px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  border-color: #127698;
}

.search-button {
  padding: 15px 30px;
  background: #127698;
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.search-button:hover {
  background: #0d5a7a;
  transform: translateY(-2px);
}

.contact-info {
  margin-top: 40px;
  padding: 25px;
  background: white;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.phone-link {
  display: block;
  font-size: 1.8rem;
  color: #127698;
  text-decoration: none;
  font-weight: 700;
  margin: 10px 0;
}

.contact-hours {
  color: #7f8c8d;
  margin-top: 10px;
}

.error-image {
  flex-shrink: 0;
}

.compass {
  width: 300px;
  height: 300px;
  position: relative;
  animation: rotate 20s linear infinite;
}

.compass-inner {
  width: 100%;
  height: 100%;
  border: 10px solid #127698;
  border-radius: 50%;
  position: relative;
  background: #f8f9fa;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.compass-north, .compass-east, .compass-south, .compass-west {
  position: absolute;
  font-size: 1.5rem;
  font-weight: bold;
  color: #127698;
}

.compass-north { top: 20px; left: 50%; transform: translateX(-50%); }
.compass-east { right: 20px; top: 50%; transform: translateY(-50%); }
.compass-south { bottom: 20px; left: 50%; transform: translateX(-50%); }
.compass-west { left: 20px; top: 50%; transform: translateY(-50%); }

.compass-arrow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 80px;
  background: #e74c3c;
  transform-origin: bottom center;
  transform: translateX(-50%) translateY(-100%);
}

.compass-arrow::after {
  content: '';
  position: absolute;
  top: -5%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid #e74c3c;
}

/* Карта сайта */
.sitemap-section {
  margin-top: 60px;
  padding: 40px 0;
  background: white;
  border-radius: 15px 15px 0 0;
}

.sitemap-section .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.sitemap-section h3 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 1.8rem;
}

.sitemap-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.sitemap-column h4 {
  color: #127698;
  margin-bottom: 20px;
  font-size: 1.2rem;
  padding-bottom: 10px;
  border-bottom: 2px solid #e9ecef;
}

.sitemap-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sitemap-column li {
  margin-bottom: 12px;
}

.sitemap-column a {
  color: #2c3e50;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sitemap-column a:hover {
  color: #127698;
}

.sitemap-column a::before {
  content: "→";
  color: #127698;
  font-weight: bold;
}

@media (max-width: 992px) {
  .not-found-container {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }

  .compass {
    width: 200px;
    height: 200px;
  }

  .error-number {
    font-size: 80px;
  }

  .error-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .error-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .links-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .sitemap-links {
    grid-template-columns: repeat(2, 1fr);
  }

  .search-form {
    flex-direction: column;
  }

  .search-button {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .links-grid,
  .sitemap-links {
    grid-template-columns: 1fr;
  }

  .error-number {
    font-size: 60px;
  }

  .error-title {
    font-size: 1.8rem;
  }
}
</style>