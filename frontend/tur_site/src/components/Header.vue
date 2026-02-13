<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <img src="/logo-icon.png" alt="logo-icon">
          <router-link to="/" class="nav-link"
            ><h1>TOUR-4-SIDES</h1></router-link
          >
        </div>

        <!-- Десктопное меню -->
        <nav class="nav desktop-nav">
          <div
            class="nav-dropdown"
            @mouseenter="openDropdown"
            @mouseleave="closeDropdown"
          >
            <span class="nav-link dropdown-trigger">Туры ▼</span>
            <div
              class="dropdown-content"
              :class="{ 'dropdown-open': isDropdownOpen }"
              @mouseenter="keepDropdownOpen"
              @mouseleave="closeDropdown"
            >
              <router-link
                to="/tours-russia"
                class="dropdown-link"
                @click="closeDropdown"
              >
                Туры по России
              </router-link>
              <router-link
                to="/tours-bashkiria"
                class="dropdown-link"
                @click="closeDropdown"
              >
                Туры по Башкирии
              </router-link>
              <router-link
                to="/gastronomic-tours"
                class="dropdown-link"
                @click="closeDropdown"
              >
                Гастрономические туры
              </router-link>
              <router-link
                to="/family-tours"
                class="dropdown-link"
                @click="closeDropdown"
              >
                Семейные туры
              </router-link>
            </div>
          </div>

          <!-- Выпадающее меню для Помощи -->
          <div
            class="nav-dropdown"
            @mouseenter="openHelpDropdown"
            @mouseleave="closeHelpDropdown"
          >
            <span class="nav-link dropdown-trigger"> Помощь ▼ </span
            >
            <div
              class="dropdown-content"
              :class="{ 'dropdown-open': isHelpDropdownOpen }"
              @mouseenter="keepHelpDropdownOpen"
              @mouseleave="closeHelpDropdown"
            >
              <router-link
                to="/help-tour-operator"
                class="dropdown-link"
                @click="closeHelpDropdown"
              >
                Выбор туроператора
              </router-link>
              <router-link
                to="/help-hotels"
                class="dropdown-link"
                @click="closeHelpDropdown"
              >
                Отели и гостиницы
              </router-link>
              <router-link
                to="/help-luggage"
                class="dropdown-link"
                @click="closeHelpDropdown"
              >
                Как собрать багаж
              </router-link>
              <router-link
                to="/help-packing"
                class="dropdown-link"
                @click="closeHelpDropdown"
              >
                Что взять с собой
              </router-link>
              <router-link
                to="/faq"
                class="dropdown-link"
                @click="closeHelpDropdown"
              >
               FAQ
              </router-link>
            </div>
          </div>

          <router-link to="/volunteer" class="nav-link">
            Волонтёрство в путешествиях
          </router-link>
          <router-link to="/tour-documents" class="nav-link">
            Документы
          </router-link>
          <router-link to="/about" class="nav-link">О нас</router-link>
        </nav>

        <!-- Бургер-меню для мобильных -->
        <div class="burger-menu" @click="toggleMenu">
          <div
            class="burger-line"
            :class="{ 'line1-active': isMenuOpen }"
          ></div>
          <div
            class="burger-line"
            :class="{ 'line2-active': isMenuOpen }"
          ></div>
          <div
            class="burger-line"
            :class="{ 'line3-active': isMenuOpen }"
          ></div>
        </div>
      </div>

      <!-- Мобильное меню -->
      <div class="mobile-menu" :class="{ 'mobile-menu-open': isMenuOpen }">
        <div class="mobile-menu-content">
          <nav class="mobile-nav">
            <!-- Выпадающее меню для "Туры по России" в мобильной версии -->
            <div class="mobile-dropdown">
              <div
                class="mobile-dropdown-header"
                @click="toggleMobileDropdown('tours')"
              >
                <span>Туры по России</span>
                <span class="dropdown-arrow">{{
                  mobileDropdowns.tours ? "▲" : "▼"
                }}</span>
              </div>
              <div
                class="mobile-dropdown-content"
                :class="{ 'mobile-dropdown-open': mobileDropdowns.tours }"
              >
                <router-link
                  to="/tours-russia"
                  class="mobile-dropdown-link"
                  @click="closeMenu"
                >
                  Все туры по России
                </router-link>
                <router-link
                  to="/tours-bashkiria"
                  class="mobile-dropdown-link"
                  @click="closeMenu"
                >
                  Туры по Башкирии
                </router-link>
                <router-link
                  to="/gastronomic-tours"
                  class="mobile-dropdown-link"
                  @click="closeMenu"
                >
                  Гастрономические туры
                </router-link>
                <router-link
                  to="/family-tours"
                  class="mobile-dropdown-link"
                  @click="closeMenu"
                >
                  Семейные туры
                </router-link>
              </div>
            </div>

            <!-- Выпадающее меню для "Помощь" в мобильной версии -->
            <div class="mobile-dropdown">
              <div
                class="mobile-dropdown-header"
                @click="toggleMobileDropdown('help')"
              >
                <span class="mobile-dropdown-link">Помощь</span>
                <span class="dropdown-arrow">{{
                  mobileDropdowns.help ? "▲" : "▼"
                }}</span>
              </div>
              <div
                class="mobile-dropdown-content"
                :class="{ 'mobile-dropdown-open': mobileDropdowns.help }"
              >
                <router-link
                  to="/help-tour-operator"
                  class="mobile-dropdown-link"
                  @click="closeMenu"
                >
                  Выбор туроператора
                </router-link>
                <router-link
                  to="/help-hotels"
                  class="mobile-dropdown-link"
                  @click="closeMenu"
                >
                  Отели и гостиницы
                </router-link>
                <router-link
                  to="/help-luggage"
                  class="mobile-dropdown-link"
                  @click="closeMenu"
                >
                  Как собрать багаж
                </router-link>
                <router-link
                  to="/help-packing"
                  class="mobile-dropdown-link"
                  @click="closeMenu"
                >
                  Что взить с собой
                </router-link>
                <router-link
                  to="/faq"
                  class="mobile-dropdown-link"
                  @click="closeMenu"
                >
                  FAQ
                </router-link>
              </div>
            </div>

            <!-- Остальные ссылки без выпадающих меню -->
            <router-link
              to="/volunteer"
              class="mobile-nav-link"
              @click="closeMenu"
            >
              Волонтёрство в путешествиях
            </router-link>
            <router-link
              to="/tour-documents"
              class="mobile-nav-link"
              @click="closeMenu"
            >
              Документы
            </router-link>
            <router-link to="/about" class="mobile-nav-link" @click="closeMenu">
              О нас
            </router-link>
          </nav>
        </div>
      </div>
    </div>

    <!-- Затемнение фона при открытом меню -->
    <div
      class="menu-overlay"
      :class="{ 'overlay-active': isMenuOpen }"
      @click="closeMenu"
    ></div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isMenuOpen: false,
      isDropdownOpen: false,
      isHelpDropdownOpen: false,
      mobileDropdowns: {
        tours: false,
        help: false
      },
      windowWidth: window.innerWidth,
      dropdownTimeout: null,
      helpDropdownTimeout: null,
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    if (this.dropdownTimeout) {
      clearTimeout(this.dropdownTimeout);
    }
    if (this.helpDropdownTimeout) {
      clearTimeout(this.helpDropdownTimeout);
    }
  },
  methods: {
    // Методы для десктопного меню "Туры по России"
    openDropdown() {
      if (this.dropdownTimeout) {
        clearTimeout(this.dropdownTimeout);
      }
      this.isDropdownOpen = true;
    },

    closeDropdown() {
      this.dropdownTimeout = setTimeout(() => {
        this.isDropdownOpen = false;
      }, 150);
    },

    keepDropdownOpen() {
      if (this.dropdownTimeout) {
        clearTimeout(this.dropdownTimeout);
      }
    },

    // Методы для десктопного меню "Помощь"
    openHelpDropdown() {
      if (this.helpDropdownTimeout) {
        clearTimeout(this.helpDropdownTimeout);
      }
      this.isHelpDropdownOpen = true;
    },

    closeHelpDropdown() {
      this.helpDropdownTimeout = setTimeout(() => {
        this.isHelpDropdownOpen = false;
      }, 150);
    },

    keepHelpDropdownOpen() {
      if (this.helpDropdownTimeout) {
        clearTimeout(this.helpDropdownTimeout);
      }
    },

    // Методы для мобильных выпадающих меню
    toggleMobileDropdown(type) {
      this.mobileDropdowns[type] = !this.mobileDropdowns[type];
    },

    // Методы для бургер-меню
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) {
        document.body.style.overflow = "hidden";
        // Закрываем все мобильные выпадающие меню при открытии основного меню
        this.mobileDropdowns.tours = false;
        this.mobileDropdowns.help = false;
      } else {
        document.body.style.overflow = "";
      }
    },

    closeMenu() {
      this.isMenuOpen = false;
      this.mobileDropdowns.tours = false;
      this.mobileDropdowns.help = false;
      document.body.style.overflow = "";
    },

    handleResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth > 768 && this.isMenuOpen) {
        this.closeMenu();
      }
    },
  },
};
</script>

<style scoped>
/* Основные стили хедера */
.header {
  background-color: #0936466e;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo{
  display: flex;
}
.logo h1 {
  color: #ffffff;
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
  padding: 0 15px;
}

/* Десктопное меню */
.desktop-nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #ffffff;
  font-weight: 500;
  transition: color 0.3s;
  font-size: 0.95rem;
  white-space: nowrap;
  cursor: pointer;
  position: relative;
}

.nav-link:hover {
  color: #1fc7ff;
}

/* Выпадающее меню (десктоп) */
.nav-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 4px;
}

.dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  min-width: 220px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  z-index: 1001;
  padding: 12px 0;
  margin-top: 15px;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* Добавляем "треугольник" сверху */
.dropdown-content::before {
  content: "";
  position: absolute;
  top: -8px;
  left: 20px;
  width: 16px;
  height: 16px;
  background: white;
  transform: rotate(45deg);
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  border-left: 1px solid rgba(0, 0, 0, 0.08);
}

.dropdown-open {
  display: block !important;
  opacity: 1 !important;
  transform: translateY(0) !important;
  animation: fadeInDown 0.3s ease forwards;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-link {
  color: #333;
  padding: 12px 24px;
  text-decoration: none;
  display: block;
  font-size: 0.95rem;
  transition: all 0.3s;
  position: relative;
  border-left: 3px solid transparent;
}

.dropdown-link:hover {
  background: linear-gradient(to right, rgba(18, 118, 152, 0.1), transparent);
  color: #127698;
  border-left: 3px solid #127698;
  padding-left: 28px;
}

.dropdown-link.router-link-active {
  background: linear-gradient(to right, rgba(18, 118, 152, 0.15), transparent);
  color: #127698;
  border-left: 3px solid #127698;
  font-weight: 600;
}

/* Бургер-меню */
.burger-menu {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
  z-index: 1001;
  transition: transform 0.3s ease;
}

.burger-line {
  height: 3px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.line1-active {
  transform: rotate(45deg) translate(6px, 6px);
}

.line2-active {
  opacity: 0;
}

.line3-active {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Мобильное меню */
.mobile-menu {
  position: fixed;
  top: 70px;
  right: -100%;
  width: 320px;
  height: calc(100vh - 70px);
  background: linear-gradient(
    135deg,
    rgba(9, 54, 70, 0.98),
    rgba(6, 35, 45, 0.98)
  );
  backdrop-filter: blur(10px);
  transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;
  overflow-y: auto;
  border-left: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.3);
}

.mobile-menu-open {
  right: 0;
}

.mobile-menu-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Выпадающее меню в мобильной версии */
.mobile-dropdown {
  margin-bottom: 0.5rem;
  border-radius: 10px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
}

.mobile-dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.2rem;
  color: #ffffff;
  font-weight: 500;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s;
  border-bottom: 1px solid transparent;
}

.mobile-dropdown-header:hover {
  background: rgba(255, 255, 255, 0.1);
}

.mobile-dropdown-open + .mobile-dropdown-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.dropdown-arrow {
  font-size: 0.9rem;
  transition: transform 0.3s;
}

.mobile-dropdown-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(0, 0, 0, 0.2);
}

.mobile-dropdown-open {
  max-height: 500px !important;
}

.mobile-dropdown-link {
  display: block;
  padding: 0.9rem 2rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s;
  border-left: 3px solid transparent;
}

.mobile-dropdown-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #1fc7ff;
  border-left: 3px solid #1fc7ff;
  padding-left: 2.5rem;
}

.mobile-dropdown-link.router-link-active {
  background: rgba(18, 118, 152, 0.2);
  color: #1fc7ff;
  border-left: 3px solid #1fc7ff;
  font-weight: 500;
}

.mobile-nav-link {
  text-decoration: none;
  color: #ffffff;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 1rem 1.2rem;
  border-radius: 10px;
  transition: all 0.3s;
  margin-bottom: 0.3rem;
  background: rgba(255, 255, 255, 0.05);
}

.mobile-nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #1fc7ff;
  transform: translateX(5px);
}

.mobile-nav-link.router-link-active {
  background: rgba(18, 118, 152, 0.2);
  color: #1fc7ff;
  font-weight: 600;
  border-left: 3px solid #1fc7ff;
}

/* Затемнение фона */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
  z-index: 998;
}

.overlay-active {
  opacity: 1;
  visibility: visible;
}

/* Анимация появления ссылок */
.mobile-nav-link {
  animation: slideInRight 0.4s ease forwards;
  opacity: 0;
  transform: translateX(20px);
}

.mobile-nav-link:nth-child(1) {
  animation-delay: 0.05s;
}
.mobile-nav-link:nth-child(2) {
  animation-delay: 0.1s;
}
.mobile-nav-link:nth-child(3) {
  animation-delay: 0.15s;
}
.mobile-nav-link:nth-child(4) {
  animation-delay: 0.2s;
}
.mobile-nav-link:nth-child(5) {
  animation-delay: 0.25s;
}

.mobile-dropdown {
  animation: slideInRight 0.4s ease forwards;
  opacity: 0;
  transform: translateX(20px);
  animation-delay: 0s;
}

@keyframes slideInRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Медиа-запросы для адаптивности */
@media (max-width: 1024px) {
  .desktop-nav {
    gap: 1.5rem;
  }

  .nav-link {
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .burger-menu {
    display: flex;
  }

  .logo h1 {
    font-size: 1.3rem;
  }

  .mobile-menu {
    width: 100%;
    max-width: 320px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.8rem;
  }

  .logo h1 {
    font-size: 1.2rem;
  }

  .mobile-menu {
    top: 65px;
    height: calc(100vh - 65px);
    width: 85%;
  }

  .mobile-menu-content {
    padding: 1.2rem;
  }

  .mobile-nav-link,
  .mobile-dropdown-header {
    font-size: 1rem;
    padding: 0.9rem 1rem;
  }

  .mobile-dropdown-link {
    padding: 0.8rem 1.5rem;
  }
}

/* Стили для активного роутера в десктопном меню */
.nav-link.router-link-active {
  color: #1fc7ff;
  font-weight: 600;
  position: relative;
}

.nav-link.router-link-active::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #1fc7ff;
  border-radius: 1px;
}
</style>