<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
    
    <!-- Кнопка "Наверх" -->
    <button 
      id="backToTopBtn" 
      class="back-to-top"
      :class="{ 'visible': isButtonVisible }"
      @click="scrollToTop"
      aria-label="Вернуться наверх"
    >
      <svg class="arrow-up" viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
      </svg>
    </button>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useHead } from '@vueuse/head'
export default {
  name: 'App',
  setup() {
    // Базовые мета-теги для всего приложения
    useHead({
      title: 'TUR-4-SIDES - туры по России 2026',
      meta: [
        { 
          name: 'description', 
          content: 'Туры по России 2026. Туроператор TUR-4-SIDES предлагает лучшие туры по России, Башкирии, автобусные туры, семейные и гастрономические туры. Бронирование онлайн.' 
        },
        { 
          name: 'keywords', 
          content: 'туры по россии, тур по кольцу россии, туры по золотому кольцу, найти тур по россии, туры по россии 2026, путешествия по россии туры, новогодние туры по россии, туры по городам россии, горящие туры по россии, купить тур по россии, дешевые туры по россии, автобусные туры по россии' 
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    })
  },
  components: {
    Header, 
    Footer
  },
  data() {
    return {
      isButtonVisible: false,
      scrollInterval: null
    }
  },
  mounted() {
    // Добавляем обработчик прокрутки
    window.addEventListener('scroll', this.handleScroll)
    // Инициализируем видимость при загрузке
    this.handleScroll()
  },
  beforeUnmount() {
    // Удаляем обработчик при уничтожении компонента
    window.removeEventListener('scroll', this.handleScroll)
    // Очищаем интервал, если он существует
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval)
    }
  },
  methods: {
    handleScroll() {
      // Показываем кнопку, когда прокрутили больше 300px
      this.isButtonVisible = window.scrollY > 300
    },
    
    scrollToTop() {
      // Плавная прокрутка наверх
      const startPosition = window.scrollY
      const startTime = performance.now()
      const duration = 600 // 600ms анимация
      
      const easeOutCubic = (t) => {
        return 1 - Math.pow(1 - t, 3)
      }
      
      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeProgress = easeOutCubic(progress)
        
        window.scrollTo(0, startPosition * (1 - easeProgress))
        
        if (progress < 1) {
          window.requestAnimationFrame(animateScroll)
        }
      }
      
      window.requestAnimationFrame(animateScroll)
    }
    
    // Альтернативный метод с setInterval (проще)
    // scrollToTopSimple() {
    //   if (this.scrollInterval) {
    //     clearInterval(this.scrollInterval)
    //   }
      
    //   this.scrollInterval = setInterval(() => {
    //     const scrollStep = window.scrollY / 20
    //     if (window.scrollY !== 0) {
    //       window.scrollBy(0, -scrollStep)
    //     } else {
    //       clearInterval(this.scrollInterval)
    //     }
    //   }, 15)
    // }
  }
}
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: #127698;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(18, 118, 152, 0.3);
  z-index: 9999; /* Высокий z-index, чтобы была поверх всех элементов */
  padding: 0;
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-to-top:not(.visible) {
  transform: translateY(10px);
}

.back-to-top:hover {
  background: #0d5a7a;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(18, 118, 152, 0.4);
}

.back-to-top:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(18, 118, 152, 0.3);
}

.arrow-up {
  transition: transform 0.3s ease;
}

.back-to-top:hover .arrow-up {
  transform: translateY(-2px);
}

/* Адаптивность */
@media (max-width: 768px) {
  .back-to-top {
    width: 45px;
    height: 45px;
    bottom: 20px;
    right: 20px;
  }
  
  .arrow-up {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 480px) {
  .back-to-top {
    width: 40px;
    height: 40px;
    bottom: 15px;
    right: 15px;
  }
  
  .arrow-up {
    width: 18px;
    height: 18px;
  }
}

/* Анимация появления */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.back-to-top.visible {
  animation: fadeInUp 0.3s ease forwards;
}

/* Стили для светлой темы (по умолчанию) */
.back-to-top {
  background: #127698;
  color: white;
}

.back-to-top:hover {
  background: #0d5a7a;
}

/* Опционально: стили для темной темы */
@media (prefers-color-scheme: dark) {
  .back-to-top {
    background: #55c496;
    box-shadow: 0 4px 15px rgba(85, 196, 150, 0.3);
  }
  
  .back-to-top:hover {
    background: #46a47e;
  }
}
</style>