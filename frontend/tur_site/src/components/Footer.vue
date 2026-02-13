<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <h2 class="footer-title">НЕ МОЖЕТЕ ОПРЕДЕЛИТЬСЯ С ТУРОМ?</h2>

        <form @submit.prevent="submitForm" class="footer-form">
          <div class="input-group">
            <input
              type="text"
              v-model="form.name"
              placeholder="Введите ваше имя"
              class="form-input"
              required
            />
          </div>

          <div class="input-group">
            <input
              type="tel"
              v-model="form.phone"
              placeholder="Введите ваш номер телефона"
              class="form-input"
              required
            />
          </div>

          <div class="checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                v-model="form.agreed"
                class="checkbox-input"
                required
              />
              <span class="checkbox-custom"></span>
              <span class="checkbox-text">
                Я соглашаюсь с условиями предоставления услуг, политики
                конфиденциальности и обработку персональных данных.
              </span>
            </label>
          </div>

          <button type="submit" class="submit-btn" :disabled="!form.agreed">
            Отправить
          </button>
        </form>

        <p class="footer-note">
          Наш менеджер свяжется с Вами в ближайшее время и ответит на все
          вопросы
        </p>
      </div>
      <!-- НОВЫЙ БЛОК: КОНТАКТЫ И ИНФОРМАЦИЯ -->
      <div class="footer-info">
        <div class="footer-info-grid">
          <div class="info-section">
            <h3 class="info-title">Контакты</h3>
            <div class="info-content">
              <p class="contact-item">
                <i class="contact-icon">📍</i>
                г. Уфа, ул. Белякова, д. 25
              </p>
              <p class="contact-item">
                <i class="contact-icon">📞</i>
                +7 (495) 123-45-67
              </p>
              <p class="contact-item">
                <i class="contact-icon">✉️</i>
                tour4sides@yandex.ru
              </p>
              <p class="contact-item">
                <i class="contact-icon">🕒</i>
                Пн-Пт: 9:00-20:00, Сб-Вс: 10:00-18:00
              </p>
            </div>
          </div>

          <div class="info-section">
            <h3 class="info-title">О компании</h3>
            <div class="info-content">
              <p class="about-text">
                Туристическое агентство "TOUR-4-SIDES" работает на рынке с 2025
                года. Мы предлагаем лучшие туры по всему миру с гарантией
                качества и лучшими ценами.
              </p>
              <div class="social-links">
                <a href="#" class="social-link">VK</a>
                <a href="#" class="social-link">Telegram</a>
                <a href="#" class="social-link">WhatsApp</a>
              </div>
            </div>
          </div>

          <div class="info-section">
            <h3 class="info-title">Разработка сайта</h3>
            <div class="info-content">
              <p class="dev-text">
                Сайт разработан студией <strong>WebDS Solutions</strong>
              </p>
              <p class="dev-contacts">
                <i class="dev-icon">📧</i>
                dS@gmail.com
              </p>
              <p class="copyright">
                Дизайн и разработка:
                <span class="team-names"
                  >Султанова Алия, Давлетьярова Элина</span
                >
              </p>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="legal-links">
            <a href="/privacy" class="legal-link"
              >Политика конфиденциальности</a
            >
            <a href="/terms" class="legal-link">Пользовательское соглашение</a>
            <a href="/offer" class="legal-link">Договор оферты</a>
          </div>
          <p class="copyright-notice">
            © 2025 Туристическое агентство "TOUR-4-SIDES". Все права защищены.
          </p>
        </div>
      </div>
      <!-- КОНЕЦ НОВОГО БЛОКА -->
    </div>
  </footer>
</template>

<script>
export default {
  name: "SiteFooter",
  data() {
    return {
      form: {
        name: "",
        phone: "",
        agreed: false,
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch("/api/lead", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.form),
        });

        if (response.ok) {
          alert("Спасибо! Мы скоро свяжемся с вами.");
          this.form = { name: "", phone: "", agreed: false };
        } else {
          alert("Произошла ошибка. Пожалуйста, попробуйте позже.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Произошла ошибка. Пожалуйста, попробуйте позже.");
      }
    },
  },
};
</script>

<style scoped>
.footer {
  background:
    linear-gradient(rgba(0, 0, 0, 0.089), rgba(0, 0, 0, 0.822)),
    url("@/assets/img/footer.png") center/cover no-repeat;
  color: white;
  padding: 60px 20px;
  font-family: "Arial", sans-serif;
  border-top: #fff 1px solid;
}

.footer-container {
  max-width: 100%;
  margin: 0;
  padding: 0;
}

.footer-content {
  backdrop-filter: blur(5px);
  width: 1000px;
  margin: 10% auto;
  text-align: center;
  background: #12769815;
  border: #fff 0.5px solid;
  padding: 2rem;
  border-radius: 25px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.footer-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 40px;
  color: #127698;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.footer-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.input-group {
  width: 100%;
}

.form-input {
  width: 100%;
  padding: 15px 20px;
  font-size: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  outline: none;
  transition: border-color 0.3s ease;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.form-input:focus {
  border-color: #127698;
  background: rgba(255, 255, 255, 0.15);
}

.checkbox-group {
  text-align: left;
  margin: 10px 0;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  min-width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  margin-right: 10px;
  margin-top: 2px;
  position: relative;
  transition: all 0.3s ease;
}

.checkbox-input:checked + .checkbox-custom {
  background-color: #127698;
  border-color: #127698;
}

.checkbox-input:checked + .checkbox-custom::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 14px;
  font-weight: bold;
}

.checkbox-text {
  flex: 1;
}

.submit-btn {
  padding: 16px 40px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background: linear-gradient(to right, #127698, #0e5e79);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 176, 245, 0.3);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.footer-note {
  font-size: 16px;
  color: #ffffff;
  line-height: 1.6;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

/* НОВЫЕ СТИЛИ ДЛЯ ИНФО-БЛОКА */
.footer-info {
  margin: 40px 0;
  padding: 30px 0 30px 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  /* background: rgba(0, 0, 0, 0); */
}

.footer-info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  text-align: left;
  margin-bottom: 0px;
}

.info-section {
  margin-bottom: 20px;
}

.info-title {
  font-size: 18px;
  font-weight: 600;
  color: #1692bb;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-content {
  font-size: 14px;
  line-height: 1.6;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.9);
}

.contact-icon,
.dev-icon {
  margin-right: 10px;
  font-size: 16px;
  min-width: 24px;
}

.about-text {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 15px;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
}

.social-link {
  display: inline-block;
  padding: 5px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: white;
  text-decoration: none;
  font-size: 13px;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #127698;
  transform: translateY(-2px);
}

.dev-text {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 10px;
}

.dev-contacts {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
}

.copyright {
  margin-top: 15px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.team-names {
  font-style: italic;
  color: rgba(255, 255, 255, 0.9);
}

.footer-bottom {
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.legal-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.legal-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 13px;
  transition: color 0.3s ease;
}

.legal-link:hover {
  color: #127698;
}

.copyright-notice {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 10px;
}

/* Адаптивность */
@media (max-width: 1100px) {
  .footer-content {
    width: 95%;
    margin: 5% auto;
  }
}

@media (max-width: 900px) {
  .footer-info-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 15px;
  }

  .footer-title {
    font-size: 22px;
    margin-bottom: 30px;
  }

  .form-input {
    padding: 12px 15px;
    font-size: 14px;
  }

  .checkbox-text {
    font-size: 13px;
  }

  .submit-btn {
    padding: 14px 30px;
    font-size: 16px;
  }

  .footer-note {
    font-size: 14px;
  }

  .footer-info-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .info-title {
    font-size: 16px;
  }

  .legal-links {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .footer-title {
    font-size: 20px;
  }

  .checkbox-label {
    align-items: flex-start;
  }

  .footer-content {
    padding: 1.5rem;
  }
}
</style>
