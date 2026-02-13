<template>
  <section class="faq-page">
<!-- Скрытые SEO-элементы -->
<div style="display: none;">
      <h1>Часто задаваемые вопросы о турах - официальный FAQ туроператора TUR-4-SIDES</h1>
      <p>
        Полный список вопросов и ответов о бронировании туров, оплате, 
        документах, отмене и переносе дат. Инструкции для туристов, 
        полезные советы и рекомендации перед путешествием.
      </p>
      
      <!-- Список всех вопросов для поисковых роботов -->
      <ul>
        <li v-for="question in questions" :key="question.id">
          <strong>{{ question.question }}</strong>
          <p>{{ question.answer }}</p>
        </li>
      </ul>
    </div>
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Часто задаваемые вопросы</h1>
        <p class="page-subtitle">Найдите ответы на популярные вопросы</p>
      </div>

      <!-- Поиск по FAQ -->
      <div class="search-section">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Введите ваш вопрос..."
            @input="searchFaq"
            class="search-input"
          >
          <button class="search-btn" @click="searchFaq">
            🔍
          </button>
        </div>
      </div>

      <!-- Основные категории -->
      <div class="categories-section">
        <h2 class="section-title">Категории вопросов</h2>
        <div class="categories-grid">
          <div 
            class="category-card" 
            v-for="category in categories" 
            :key="category.id"
            :class="{ active: activeCategory === category.id }"
            @click="selectCategory(category.id)"
          >
            <div class="category-icon">{{ category.icon }}</div>
            <h3 class="category-title">{{ category.title }}</h3>
            <p class="category-count">{{ category.count }} вопросов</p>
          </div>
        </div>
      </div>

      <!-- FAQ аккордеон -->
      <div class="faq-section">
        <div class="faq-header">
          <h2 class="section-title">{{ activeCategoryTitle }}</h2>
          <div class="faq-stats">
            <span class="stats-item">Показано: {{ visibleQuestions.length }} из {{ filteredQuestions.length }}</span>
          </div>
        </div>
        
        <div class="faq-accordion">
          <div 
            class="faq-item" 
            v-for="question in visibleQuestions" 
            :key="question.id"
            :class="{ active: question.isOpen }"
          >
            <div class="faq-question" @click="toggleQuestion(question)">
              <div class="question-content">
                <span class="question-number">Вопрос {{ question.id }}</span>
                <h3 class="question-text">{{ question.question }}</h3>
              </div>
              <div class="question-arrow">
                <span v-if="question.isOpen">▲</span>
                <span v-else>▼</span>
              </div>
            </div>
            
            <div class="faq-answer" v-if="question.isOpen">
              <div class="answer-content">
                <p>{{ question.answer }}</p>
                
                <!-- Дополнительная информация -->
                <div class="answer-details" v-if="question.details">
                  <div class="details-item" v-for="(detail, index) in question.details" :key="index">
                    <strong>{{ detail.title }}:</strong> {{ detail.content }}
                  </div>
                </div>
                
                <!-- Ссылки на материалы -->
                <div class="answer-links" v-if="question.links && question.links.length">
                  <h4>Полезные материалы:</h4>
                  <ul class="links-list">
                    <li v-for="link in question.links" :key="link.text">
                      <a :href="link.url" class="link-item">{{ link.text }}</a>
                    </li>
                  </ul>
                </div>
                
                <!-- Статистика полезности -->
                <div class="answer-footer">
                  <div class="helpful-section">
                    <span class="helpful-text">Был ли ответ полезен?</span>
                    <button 
                      class="helpful-btn"
                      :class="{ active: question.userHelpful === true }"
                      @click="rateQuestion(question, true)"
                    >
                      👍 Да ({{ question.helpful }})
                    </button>
                    <button 
                      class="helpful-btn"
                      :class="{ active: question.userHelpful === false }"
                      @click="rateQuestion(question, false)"
                    >
                      👎 Нет ({{ question.notHelpful }})
                    </button>
                  </div>
                  <div class="question-meta">
                    <span class="meta-item">📊 {{ question.views }} просмотров</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Кнопка "Показать еще" -->
        <div class="load-more" v-if="visibleQuestions.length < filteredQuestions.length">
          <button class="load-more-btn" @click="loadMore">
            Показать еще вопросы
          </button>
        </div>
      </div>

      <!-- Не нашли ответ? -->
      <div class="contact-section">
        <div class="contact-card">
          <div class="contact-icon">❓</div>
          <div class="contact-content">
            <h3>Не нашли ответ на свой вопрос?</h3>
            <p>Задайте его нашему специалисту, и мы ответим вам в течение 24 часов</p>
          </div>
          <button class="contact-btn" @click="openContactForm">
            Задать вопрос
          </button>
        </div>
      </div>

      <!-- Модальное окно для вопроса -->
      <div class="modal-overlay" :class="{ active: showContactModal }" @click="closeContactModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>Задать вопрос</h3>
            <button class="modal-close" @click="closeContactModal">×</button>
          </div>
          <form @submit.prevent="submitQuestion" class="modal-form">
            <div class="form-group">
              <label for="questionCategory">Категория вопроса *</label>
              <select id="questionCategory" v-model="newQuestion.category" required>
                <option value="">Выберите категорию</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.title }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="questionText">Ваш вопрос *</label>
              <textarea 
                id="questionText" 
                v-model="newQuestion.text" 
                rows="4"
                placeholder="Опишите ваш вопрос подробно..."
                required
              ></textarea>
            </div>
            <div class="form-group">
              <label for="questionEmail">Email для ответа *</label>
              <input type="email" id="questionEmail" v-model="newQuestion.email" required>
            </div>
            <div class="form-group checkbox-group">
              <input type="checkbox" id="questionAgreement" v-model="newQuestion.agreement" required>
              <label for="questionAgreement">
                Я согласен на обработку персональных данных
              </label>
            </div>
            <button type="submit" class="modal-submit-btn">Отправить вопрос</button>
          </form>
        </div>
      </div>

      <!-- Популярные вопросы -->
      <div class="popular-section">
        <h2 class="section-title">Популярные вопросы</h2>
        <div class="popular-grid">
          <div class="popular-card" v-for="popular in popularQuestions" :key="popular.id">
            <div class="popular-header">
              <span class="popular-badge">🔥 Популярный</span>
              <span class="popular-views">{{ popular.views }} просмотров</span>
            </div>
            <h3 class="popular-question">{{ popular.question }}</h3>
            <button class="popular-btn" @click="scrollToQuestion(popular.id)">
              Читать ответ
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useHead } from '@vueuse/head';
export default {
  name: 'FAQView',
  setup() {
    useHead({
      title: 'Часто задаваемые вопросы о турах - ответы на все вопросы | TUR-4-SIDES',
      meta: [
        { 
          name: 'description', 
          content: '✅ Ответы на частые вопросы о бронировании туров, оплате, документах, отмене и переносе дат. ✅ Подробные инструкции, полезные материалы и советы для путешественников. Задайте вопрос онлайн.' 
        },
        { 
          name: 'keywords', 
          content: 'faq турагентство, вопросы и ответы о турах, как забронировать тур, оплата тура, документы для поездки, отмена бронирования тура, перенос дат тура, страхование путешествий, виза в турцию, covid требования для туристов, горячая линия турагентства' 
        }
      ]
    });
  },
  data() {
    return {
      searchQuery: '',
      activeCategory: 'all',
      showContactModal: false,
      questionsPerLoad: 5,
      categories: [
        { id: 'all', icon: '📋', title: 'Все вопросы', count: 30 },
        { id: 'booking', icon: '📅', title: 'Бронирование', count: 8 },
        { id: 'payment', icon: '💳', title: 'Оплата', count: 6 },
        { id: 'documents', icon: '📄', title: 'Документы', count: 7 },
        { id: 'tours', icon: '🏞️', title: 'Туры', count: 5 },
        { id: 'covid', icon: '🦠', title: 'COVID-19', count: 4 }
      ],
      questions: [
        {
          id: 1,
          category: 'booking',
          question: 'Как забронировать тур онлайн?',
          answer: 'Для бронирования тура онлайн выберите понравившийся тур на нашем сайте, нажмите кнопку "Забронировать", заполните необходимые данные в форме и следуйте инструкциям по оплате. После подтверждения оплаты вы получите ваучер на email.',
          details: [
            { title: 'Срок бронирования', content: 'За 14 дней до начала тура' },
            { title: 'Предоплата', content: '30% от стоимости тура' }
          ],
          links: [
            { text: 'Инструкция по бронированию', url: '#' },
            { text: 'Образец договора', url: '#' }
          ],
          views: 1245,
          helpful: 89,
          notHelpful: 12,
          userHelpful: null,
          isOpen: false
        },
        {
          id: 2,
          category: 'payment',
          question: 'Какие способы оплаты доступны?',
          answer: 'Мы принимаем оплату банковскими картами Visa, MasterCard, МИР, через системы электронных платежей (ЮMoney, WebMoney), банковские переводы, а также наличные в нашем офисе. Для юридических лиц доступен безналичный расчет.',
          details: [
            { title: 'Комиссия', content: '0% при оплате картой' },
            { title: 'Срок зачисления', content: '1-2 рабочих дня' }
          ],
          links: [
            { text: 'Реквизиты для перевода', url: '#' }
          ],
          views: 987,
          helpful: 76,
          notHelpful: 5,
          userHelpful: null,
          isOpen: false
        },
        {
          id: 3,
          category: 'documents',
          question: 'Какие документы нужны для поездки за границу?',
          answer: 'Для поездки за границу необходим загранпаспорт, срок действия которого должен превышать срок поездки минимум на 3 месяца. Также может потребоваться виза, медицинская страховка, подтверждение бронирования отеля и обратные билеты.',
          details: [
            { title: 'Загранпаспорт', content: 'Действительный минимум 3 месяца после поездки' },
            { title: 'Страховка', content: 'Минимальное покрытие 30 000 €' }
          ],
          links: [
            { text: 'Требования к документам', url: '#' },
            { text: 'Страхование путешествий', url: '#' }
          ],
          views: 1543,
          helpful: 112,
          notHelpful: 8,
          userHelpful: null,
          isOpen: false
        },
        {
          id: 4,
          category: 'tours',
          question: 'Можно ли изменить даты тура после оплаты?',
          answer: 'Да, даты тура можно изменить, если это позволяет условия договора и есть свободные места на другие даты. Для изменения дат необходимо связаться с вашим менеджером как минимум за 14 дней до начала тура. Может взиматься административный сбор.',
          details: [
            { title: 'Срок уведомления', content: 'За 14 дней до тура' },
            { title: 'Сбор за изменение', content: '10% от стоимости тура' }
          ],
          links: [
            { text: 'Условия договора', url: '#' }
          ],
          views: 876,
          helpful: 67,
          notHelpful: 15,
          userHelpful: null,
          isOpen: false
        },
        {
          id: 5,
          category: 'covid',
          question: 'Какие меры безопасности действуют в турах?',
          answer: 'Все наши партнеры (отели, транспортировщики, экскурсоводы) соблюдают санитарные нормы. В автобусах проводится регулярная дезинфекция, обязательное ношение масок в закрытых помещениях, наличие антисептиков. Рекомендуем иметь при себе отрицательный ПЦР-тест.',
          details: [
            { title: 'Требования', content: 'Маски в транспорте, антисептики' },
            { title: 'Рекомендации', content: 'ПЦР-тест за 72 часа' }
          ],
          links: [
            { text: 'Актуальные ограничения', url: '#' }
          ],
          views: 2100,
          helpful: 145,
          notHelpful: 20,
          userHelpful: null,
          isOpen: false
        },
        {
          id: 6,
          category: 'booking',
          question: 'Можно ли отменить бронирование?',
          answer: 'Да, бронирование можно отменить согласно условиям договора. При отмене за 30 дней до тура возвращается 100% суммы, за 14-29 дней — 50%, менее чем за 14 дней — возврат не предусмотрен, кроме случаев форс-мажора.',
          views: 1100,
          helpful: 92,
          notHelpful: 18,
          userHelpful: null,
          isOpen: false
        },
        {
          id: 7,
          category: 'payment',
          question: 'Как получить чек об оплате?',
          answer: 'Электронный чек отправляется автоматически на ваш email после успешной оплаты. Если вы не получили чек, проверьте папку "Спам" или свяжитесь с нашей службой поддержки.',
          views: 654,
          helpful: 54,
          notHelpful: 3,
          userHelpful: null,
          isOpen: false
        },
        {
          id: 8,
          category: 'documents',
          question: 'Нужна ли виза для поездки в Турцию?',
          answer: 'Для граждан РФ виза в Турцию не требуется для поездок сроком до 60 дней. При въезде необходимо иметь загранпаспорт, срок действия которого не менее 4 месяцев с момента въезда.',
          views: 1890,
          helpful: 123,
          notHelpful: 7,
          userHelpful: null,
          isOpen: false
        }
      ],
      newQuestion: {
        category: '',
        text: '',
        email: '',
        agreement: false
      }
    }
  },
  computed: {
    filteredQuestions() {
      let filtered = [...this.questions]
      
      // Фильтрация по категории
      if (this.activeCategory !== 'all') {
        filtered = filtered.filter(q => q.category === this.activeCategory)
      }
      
      // Поиск по тексту
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(q => 
          q.question.toLowerCase().includes(query) || 
          q.answer.toLowerCase().includes(query)
        )
      }
      
      return filtered
    },
    visibleQuestions() {
      return this.filteredQuestions.slice(0, this.questionsPerLoad)
    },
    activeCategoryTitle() {
      const category = this.categories.find(c => c.id === this.activeCategory)
      return category ? category.title : 'Все вопросы'
    },
    popularQuestions() {
      return [...this.questions]
        .sort((a, b) => b.views - a.views)
        .slice(0, 4)
    }
  },
  methods: {
    searchFaq() {
      this.questionsPerLoad = 5
    },
    selectCategory(categoryId) {
      this.activeCategory = categoryId
      this.questionsPerLoad = 5
      this.searchQuery = ''
      this.closeAllQuestions()
    },
    toggleQuestion(question) {
      question.isOpen = !question.isOpen
    },
    closeAllQuestions() {
      this.questions.forEach(q => q.isOpen = false)
    },
    rateQuestion(question, isHelpful) {
      if (question.userHelpful === isHelpful) {
        // Отмена оценки
        if (isHelpful) {
          question.helpful--
        } else {
          question.notHelpful--
        }
        question.userHelpful = null
      } else {
        // Новая оценка или изменение
        if (question.userHelpful === true) question.helpful--
        if (question.userHelpful === false) question.notHelpful--
        
        if (isHelpful) {
          question.helpful++
        } else {
          question.notHelpful++
        }
        question.userHelpful = isHelpful
      }
    },
    loadMore() {
      this.questionsPerLoad += 5
    },
    openContactForm() {
      this.showContactModal = true
      document.body.style.overflow = 'hidden'
    },
    closeContactModal() {
      this.showContactModal = false
      document.body.style.overflow = ''
      this.resetForm()
    },
    submitQuestion() {
      console.log('Новый вопрос:', this.newQuestion)
      alert('Спасибо за ваш вопрос! Мы ответим вам в течение 24 часов.')
      this.closeContactModal()
    },
    resetForm() {
      this.newQuestion = {
        category: '',
        text: '',
        email: '',
        agreement: false
      }
    },
    scrollToQuestion(questionId) {
      const question = this.questions.find(q => q.id === questionId)
      if (question) {
        this.activeCategory = question.category
        this.closeAllQuestions()
        question.isOpen = true
        
        // Скролл к вопросу после обновления DOM
        this.$nextTick(() => {
          const element = document.querySelector(`.faq-item.active`)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        })
      }
    }
  },
  mounted() {
    // Открываем первый вопрос при загрузке
    if (this.questions.length > 0) {
      this.questions[0].isOpen = true
    }
  }
}
</script>

<style scoped>

/* Скрываем SEO-элементы от пользователей, но оставляем для поисковых роботов */
.faq-page > div:first-child {
  display: none;
}

/* Убеждаемся, что скрытые элементы не занимают место */
.faq-page [style*="display: none"] {
  display: none !important;
}
.faq-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 80px 0 40px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 50px;
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

/* Поиск */
.search-section {
  margin-bottom: 50px;
}

.search-box {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

.search-input {
  width: 100%;
  padding: 18px 60px 18px 25px;
  border: 2px solid #e0e0e0;
  border-radius: 50px;
  font-size: 1.1rem;
  background: white;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #127698;
  box-shadow: 0 5px 20px rgba(52, 152, 219, 0.2);
}

.search-btn {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #127698;
}

/* Категории */
.categories-section {
  margin-bottom: 50px;
}

.section-title {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 25px;
}

.category-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  box-shadow: 0 3px 15px rgba(0,0,0,0.08);
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(52, 152, 219, 0.15);
  border-color: #127698;
}

.category-card.active {
  background: #127698;
  border-color: #127698;
  color: white;
}

.category-card.active .category-title,
.category-card.active .category-count {
  color: white;
}

.category-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.category-title {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.2rem;
  font-weight: 600;
}

.category-count {
  color: #7f8c8d;
  font-size: 0.9rem;
}

/* FAQ аккордеон */
.faq-section {
  margin-bottom: 50px;
}

.faq-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.faq-stats {
  color: #7f8c8d;
}

.stats-item {
  font-size: 0.9rem;
}

.faq-accordion {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.faq-item {
  border-bottom: 1px solid #f0f0f0;
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  padding: 25px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
}

.faq-question:hover {
  background-color: #f8f9fa;
}

.faq-item.active .faq-question {
  background-color: #f0f8ff;
}

.question-content {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 20px;
}

.question-number {
  color: #127698;
  font-weight: bold;
  font-size: 0.9rem;
  min-width: 80px;
}

.question-text {
  color: #2c3e50;
  font-size: 1.1rem;
  margin: 0;
  line-height: 1.4;
}

.question-arrow {
  color: #127698;
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.faq-item.active .question-arrow {
  transform: rotate(180deg);
}

.faq-answer {
  background: #f8f9fa;
}

.answer-content {
  padding: 0 25px 25px;
}

.answer-content p {
  color: #34495e;
  line-height: 1.6;
  margin-bottom: 20px;
}

.answer-details {
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

.details-item {
  margin-bottom: 10px;
  color: #2c3e50;
}

.details-item strong {
  color: #127698;
}

.answer-links {
  margin-bottom: 25px;
}

.answer-links h4 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.links-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.links-list li {
  margin-bottom: 8px;
}

.link-item {
  color: #127698;
  text-decoration: none;
  transition: color 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.link-item:hover {
  color: #2980b9;
  text-decoration: underline;
}

.answer-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.helpful-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.helpful-text {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.helpful-btn {
  padding: 8px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 20px;
  background: white;
  color: #7f8c8d;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
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

.question-meta {
  color: #7f8c8d;
  font-size: 0.9rem;
}

/* Кнопка "Показать еще" */
.load-more {
  text-align: center;
  margin-top: 30px;
}

.load-more-btn {
  background: #127698;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.load-more-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

/* Контактная секция */
.contact-section {
  margin-bottom: 50px;
}

.contact-card {
  background: linear-gradient(135deg, #127698, #c3f0ff);
  color: white;
  border-radius: 15px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  box-shadow: 0 10px 30px rgba(52, 152, 219, 0.3);
}

.contact-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.contact-content {
  flex: 1;
}

.contact-content h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.contact-content p {
  opacity: 0.9;
  line-height: 1.5;
}

.contact-btn {
  background: white;
  color: #127698;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.contact-btn:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
}

/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  background: white;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.modal-overlay.active .modal-content {
  transform: translateY(0);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h3 {
  color: #2c3e50;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  color: #7f8c8d;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: #e74c3c;
}

.modal-form {
  padding: 25px;
}

.modal-form .form-group {
  margin-bottom: 20px;
}

.modal-form label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 500;
}

.modal-form input,
.modal-form select,
.modal-form textarea {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.modal-form input:focus,
.modal-form select:focus,
.modal-form textarea:focus {
  outline: none;
  border-color: #127698;
}

.modal-form .checkbox-group {
  display: flex;
  align-items: flex-start;
}

.modal-form .checkbox-group input {
  width: auto;
  margin-right: 10px;
  margin-top: 5px;
}

.modal-form .checkbox-group label {
  font-weight: normal;
  line-height: 1.5;
}

.modal-submit-btn {
  background: linear-gradient(to right, #127698, #c9f2ff);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.modal-submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

/* Популярные вопросы */
.popular-section {
  margin-bottom: 30px;
}

.popular-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.popular-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  transition: transform 0.3s ease;
}

.popular-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(52, 152, 219, 0.15);
}

.popular-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.popular-badge {
  background: #e74c3c;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}

.popular-views {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.popular-question {
  color: #2c3e50;
  font-size: 1.1rem;
  margin-bottom: 20px;
  line-height: 1.4;
}

.popular-btn {
  background: #127698;
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;
}

.popular-btn:hover {
  background: #2980b9;
}

@media (max-width: 768px) {
  .contact-card {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  
  .answer-footer {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .helpful-section {
    flex-wrap: wrap;
  }
  
  .question-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .question-number {
    min-width: auto;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .faq-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
}
</style>