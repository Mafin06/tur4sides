<template>
  <section class="volunteer-page">
    <div class="container">
      <!-- Хлебные крошки для SEO -->
      <nav class="breadcrumbs" aria-label="Навигация">
        <ol itemscope itemtype="https://schema.org/BreadcrumbList">
          <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <router-link to="/" itemprop="item"><span itemprop="name">Главная</span></router-link>
            <meta itemprop="position" content="1" />
          </li>
          <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <span itemprop="name">Волонтёрство</span>
            <meta itemprop="position" content="2" />
          </li>
        </ol>
      </nav>

      <div class="page-header">
        <h1 class="page-title">Волонтёрство в путешествиях 2026</h1>
        <p class="page-subtitle">Путешествуйте с пользой: эко-туры, помощь заповедникам и социальные проекты по всей России</p>
      </div>

      <!-- SEO-блок с ключевыми словами -->
      <div class="seo-intro">
        <p><strong>Волонтёрство в путешествиях</strong> — это уникальный формат отдыха, который позволяет не только увидеть новые места, но и внести реальный вклад в сохранение природы, помощь местным сообществам и развитие экологического туризма. <strong>Туры для волонтёров</strong> становятся всё популярнее среди путешественников, которые хотят совместить активный отдых с полезными делами.</p>
      </div>

      <!-- Подробное описание с ключевыми словами -->
      <div class="seo-content">
        <h2>Что такое волонтёрский туризм и почему это важно?</h2>
        <p><strong>Волонтёрский туризм (voluntourism)</strong> — это направление путешествий, где участники добровольно участвуют в социальных, экологических или культурных проектах. В России такие программы особенно популярны в заповедниках, национальных парках и на особо охраняемых природных территориях.</p>
        
        <h3>Преимущества волонтёрских программ:</h3>
        <ul>
          <li><strong>Экономия на проживании</strong> — многие проекты предоставляют бесплатное жильё и питание</li>
          <li><strong>Уникальный опыт</strong> — возможность попасть в закрытые для туристов места</li>
          <li><strong>Новые знакомства</strong> — общение с единомышленниками со всего мира</li>
          <li><strong>Развитие навыков</strong> — от работы с инструментами до изучения иностранных языков</li>
          <li><strong>Вклад в экологию</strong> — реальная помощь природе и местным сообществам</li>
        </ul>

        <h3>Популярные направления волонтёрства в России:</h3>
        <ul>
          <li><strong>Волонтёрство на Байкале</strong> — уборка побережья, помощь в визит-центрах, экологические тропы</li>
          <li><strong>Волонтёрство на Алтае</strong> — восстановление лесов, работа в природных парках, помощь животным</li>
          <li><strong>Волонтёрство в Карелии</strong> — сохранение культурного наследия, экологические маршруты</li>
          <li><strong>Волонтёрство на Камчатке</strong> — изучение вулканов, помощь в научных экспедициях</li>
          <li><strong>Волонтёрство в Крыму</strong> — уборка пляжей, помощь в археологических раскопках</li>
        </ul>
      </div>

      <!-- Детальное описание программ -->
      <div class="programs-section">
        <h2 class="section-title">Волонтёрские программы 2026 года</h2>
        
        <!-- Байкал подробно -->
        <div class="program-detailed">
          <h3>🌊 Экологические проекты на Байкале</h3>
          <p>Озеро Байкал — объект Всемирного наследия ЮНЕСКО, нуждающийся в защите. Волонтёры помогают:</p>
          <ul>
            <li>Очищать побережье от мусора (ежегодно собирают более 100 тонн отходов)</li>
            <li>Обустраивать экологические тропы для туристов</li>
            <li>Проводить мониторинг состояния воды и биоразнообразия</li>
            <li>Работать в визит-центрах Байкальского заповедника</li>
          </ul>
          <p><strong>Сезон:</strong> июнь-сентябрь | <strong>Проживание:</strong> палаточные лагеря или гостевые дома | <strong>Требования:</strong> физическая выносливость</p>
        </div>

        <!-- Алтай подробно -->
        <div class="program-detailed">
          <h3>⛰️ Горные программы на Алтае</h3>
          <p>Горный Алтай привлекает волонтёров со всей России. Основные задачи:</p>
          <ul>
            <li>Восстановление лесов после пожаров (посадка кедра, пихты)</li>
            <li>Помощь в создании новых туристических маршрутов</li>
            <li>Работа в приютах для диких животных</li>
            <li>Эко-просвещение местных жителей и туристов</li>
          </ul>
          <p><strong>Сезон:</strong> май-октябрь | <strong>Проживание:</strong> турбазы, гостевые дома | <strong>Требования:</strong> любовь к горам и природе</p>
        </div>

        <!-- Социальные проекты -->
        <div class="program-detailed">
          <h3>🤝 Социальное волонтёрство</h3>
          <p>Помощь людям — важная часть волонтёрского движения. Направления:</p>
          <ul>
            <li>Помощь в детских домах и интернатах (проведение мастер-классов, игр)</li>
            <li>Работа в домах престарелых (общение, помощь в быту)</li>
            <li>Организация праздников для детей с ограниченными возможностями</li>
            <li>Сбор и распределение гуманитарной помощи</li>
          </ul>
          <p><strong>Сезон:</strong> круглогодично | <strong>Проживание:</strong> волонтёрские центры | <strong>Требования:</strong> доброта и терпение</p>
        </div>
      </div>

      <!-- Таблица сравнения программ -->
      <div class="comparison-section">
        <h2 class="section-title">Сравнение волонтёрских программ</h2>
        <div class="table-responsive">
          <table class="programs-table">
            <thead>
              <tr>
                <th>Программа</th>
                <th>Место</th>
                <th>Длительность</th>
                <th>Сезон</th>
                <th>Проживание</th>
                <th>Сложность</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Экологический патруль</td>
                <td>Байкал</td>
                <td>2-4 недели</td>
                <td>Июнь-сентябрь</td>
                <td>Палатки</td>
                <td>Средняя</td>
              </tr>
              <tr>
                <td>Горное восстановление</td>
                <td>Алтай</td>
                <td>3-6 недель</td>
                <td>Май-октябрь</td>
                <td>Турбазы</td>
                <td>Высокая</td>
              </tr>
              <tr>
                <td>Социальная помощь</td>
                <td>По России</td>
                <td>1-2 недели</td>
                <td>Круглый год</td>
                <td>Волонтёрские центры</td>
                <td>Низкая</td>
              </tr>
              <tr>
                <td>Культурное наследие</td>
                <td>Золотое кольцо</td>
                <td>2-3 недели</td>
                <td>Май-сентябрь</td>
                <td>Гостевые дома</td>
                <td>Низкая</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- FAQ для SEO -->
      <div class="faq-section">
        <h2 class="section-title">Часто задаваемые вопросы о волонтёрстве</h2>
        
        <div class="faq-item">
          <h3>❓ Нужен ли опыт для участия в волонтёрских программах?</h3>
          <p>Большинство программ не требуют специального опыта — всему научат на месте. Главное — желание помогать и ответственность.</p>
        </div>
        
        <div class="faq-item">
          <h3>❓ Сколько стоит волонтёрство?</h3>
          <p>Многие программы бесплатны и даже предоставляют жильё и питание. Некоторые проекты могут взимать организационный взнос (от 5 000 до 25 000 ₽) на покрытие расходов.</p>
        </div>
        
        <div class="faq-item">
          <h3>❓ Какие документы нужны для волонтёрства?</h3>
          <p>Обычно требуется паспорт, медицинская страховка и справка о состоянии здоровья. Для работы с детьми — справка об отсутствии судимости.</p>
        </div>
        
        <div class="faq-item">
          <h3>❓ Можно ли волонтёрить с детьми?</h3>
          <p>Некоторые программы принимают волонтёров с детьми от 12 лет. Есть специальные семейные смены в экологических лагерях.</p>
        </div>
        
        <div class="faq-item">
          <h3>❓ Что взять с собой на волонтёрский проект?</h3>
          <p>Удобную рабочую одежду, трекинговую обувь, спальник, средства личной гигиены, аптечку, хорошее настроение. Полный список выдаётся после записи.</p>
        </div>
      </div>

      <!-- Истории успеха для SEO -->
      <div class="stories-section">
        <h2 class="section-title">Истории волонтёров</h2>
        
        <div class="story-card">
          <p class="story-text">"Волонтёрство на Байкале изменило мою жизнь! Две недели мы убирали пляжи в Бурятии, жили в палатках и дышали чистейшим воздухом. Познакомилась с ребятами из разных городов, до сих пор общаемся. Обязательно поеду снова!"</p>
          <p class="story-author">— Анна, 28 лет, Москва</p>
        </div>
        
        <div class="story-card">
          <p class="story-text">"Работал на Алтае в приюте для животных. Кормили медвежат, ухаживали за лосятами. Тяжело физически, но эмоции невероятные! Теперь понимаю, как важно помогать братьям нашим меньшим."</p>
          <p class="story-author">— Дмитрий, 35 лет, Новосибирск</p>
        </div>
        
        <div class="story-card">
          <p class="story-text">"Ездила волонтёром в Карелию восстанавливать деревянную церковь. Работали вместе с местными жителями, учились старинным техникам плотницкого дела. Это было настоящее погружение в культуру!"</p>
          <p class="story-author">— Елена, 42 года, Санкт-Петербург</p>
        </div>
      </div>

      <!-- Контакты для связи (вместо формы) -->
      <div class="contact-section">
        <h2 class="section-title">Как стать волонтёром?</h2>
        <div class="contact-info">
          <p>Если вы хотите присоединиться к нашим волонтёрским программам или узнать подробности, свяжитесь с нами:</p>
          
          <div class="contact-methods">
            <div class="contact-method">
              <div class="contact-icon">📞</div>
              <div>
                <h3>Телефон</h3>
                <a href="tel:+74951234567" class="contact-link">+7 (495) 123-45-67</a>
                <p class="contact-note">Ежедневно с 9:00 до 21:00</p>
              </div>
            </div>
            
            <div class="contact-method">
              <div class="contact-icon">✉️</div>
              <div>
                <h3>Email</h3>
                <a href="mailto:volunteer@tur4sides.ru" class="contact-link">volunteer@tur4sides.ru</a>
                <p class="contact-note">Ответим в течение 24 часов</p>
              </div>
            </div>
            
            <div class="contact-method">
              <div class="contact-icon">💬</div>
              <div>
                <h3>Мессенджеры</h3>
                <a href="#" class="contact-link">Telegram</a> | 
                <a href="#" class="contact-link">WhatsApp</a>
                <p class="contact-note">Быстрая связь</p>
              </div>
            </div>
          </div>
          
          <p class="contact-cta">Позвоните или напишите нам — мы подробно расскажем о всех программах, поможем выбрать подходящий проект и ответим на все вопросы!</p>
        </div>
      </div>

      <!-- SEO-текст в конце страницы -->
      <div class="seo-footer">
        <h2>Волонтёрские туры по России 2026</h2>
        <p>Компания TUR-4-SIDES организует волонтёрские программы более 5 лет. Мы сотрудничаем с заповедниками, национальными парками и благотворительными фондами по всей стране. Наши волонтёры — это люди разного возраста и профессий, которых объединяет желание делать мир лучше.</p>
        <p><strong>Почему выбирают нас?</strong> Мы тщательно отбираем проекты, проверяем условия проживания, обеспечиваем страховку и поддержку 24/7. С нами вы можете быть уверены в безопасности и качестве организации.</p>
        <p><strong>Популярные запросы:</strong> волонтёрство на байкале 2026, волонтёрские программы на алтае, помощь заповедникам, эко-туризм в россии, социальное волонтёрство, волонтёрские лагеря для взрослых, волонтёрство с проживанием, волонтёрские смены лето 2026.</p>
      </div>
    </div>
  </section>
</template>

<script>
import { useHead } from '@vueuse/head';

export default {
  name: 'VolunteerView',
  setup() {
    useHead({
      title: 'Волонтёрство в путешествиях 2026 - программы, цены, отзывы | TUR-4-SIDES',
      meta: [
        { 
          name: 'description', 
          content: '✅ Волонтёрские программы в путешествиях 2026: помощь заповедникам Байкала и Алтая, эко-туризм, социальные проекты. ✅ Бесплатное проживание, уникальный опыт, реальные отзывы волонтёров. Волонтёр-туры по России от TUR-4-SIDES.' 
        },
        { 
          name: 'keywords', 
          content: 'волонтёрство в путешествиях, волонтерские программы 2026, волонтёрство на байкале, помощь заповедникам, эко-туризм, волонтёрство на алтае, социальное волонтёрство, волонтёрские лагеря, путешествия с пользой, волонтёрские смены, отдых волонтёром, экологические проекты, помощь природе' 
        },
        { property: 'og:title', content: 'Волонтёрство в путешествиях 2026 - программы по России' },
        { property: 'og:description', content: 'Путешествуйте с пользой: волонтёрские программы в заповедниках, национальных парках и социальных проектах России' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://tur4sides.ru/volunteer' },
        { property: 'og:image', content: 'https://tur4sides.ru/img/volunteer-og.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Волонтёрство в путешествиях 2026' },
        { name: 'twitter:description', content: 'Волонтёрские программы по всей России: помогайте природе и путешествуйте' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'TUR-4-SIDES' }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://tur4sides.ru/volunteer'
        }
      ]
    });
    
    return {};
  }
};
</script>

<style scoped>
.volunteer-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  padding: 80px 0 40px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Хлебные крошки */
.breadcrumbs {
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.breadcrumbs ol {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumbs li {
  display: flex;
  align-items: center;
}

.breadcrumbs li:not(:last-child)::after {
  content: "/";
  margin: 0 8px;
  color: #7f8c8d;
}

.breadcrumbs a {
  color: #127698;
  text-decoration: none;
}
.breadcrumbs a:hover {
  text-decoration: underline;
}


.breadcrumbs span {
  color: #127698;
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
  color: #127698;
  font-size: 1.2rem;
}

/* SEO текстовые блоки */
.seo-intro {
  background: white;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  font-size: 1.1rem;
  line-height: 1.6;
}

.seo-content {
  background: white;
  padding: 40px;
  border-radius: 15px;
  margin-bottom: 40px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.08);
}

.seo-content h2 {
  color: #127698;
  margin-bottom: 20px;
  font-size: 1.8rem;
}

.seo-content h3 {
  color: #2c3e50;
  margin: 25px 0 15px;
  font-size: 1.4rem;
}

.seo-content ul {
  margin-bottom: 20px;
  padding-left: 20px;
}

.seo-content li {
  margin-bottom: 10px;
  line-height: 1.6;
}

/* Детальные программы */
.programs-section {
  margin-bottom: 50px;
}

.section-title {
  text-align: center;
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 40px;
  position: relative;
  padding-bottom: 15px;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(to right, #127698, #55c496);
}

.program-detailed {
  background: white;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
}

.program-detailed:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(18, 118, 152, 0.15);
}

.program-detailed h3 {
  color: #127698;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.program-detailed ul {
  margin: 15px 0;
  padding-left: 20px;
}

.program-detailed li {
  margin-bottom: 8px;
  line-height: 1.6;
}

/* Таблица */
.comparison-section {
  margin-bottom: 50px;
}

.table-responsive {
  overflow-x: auto;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.08);
}

.programs-table {
  width: 100%;
  border-collapse: collapse;
}

.programs-table th {
  background: linear-gradient(to right, #127698, #0d5a7a);
  color: white;
  padding: 15px;
  text-align: left;
  font-weight: 600;
}

.programs-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #e9ecef;
}

.programs-table tr:last-child td {
  border-bottom: none;
}

.programs-table tr:hover {
  background: #f8f9fa;
}

/* FAQ */
.faq-section {
  margin-bottom: 50px;
}

.faq-item {
  background: white;
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
}

.faq-item h3 {
  color: #127698;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.faq-item p {
  color: #2c3e50;
  line-height: 1.6;
}

/* Истории */
.stories-section {
  margin-bottom: 50px;
}

.story-card {
  background: white;
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 20px;
  border-left: 4px solid #127698;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
}

.story-text {
  font-style: italic;
  color: #2c3e50;
  line-height: 1.6;
  margin-bottom: 10px;
}

.story-author {
  color: #127698;
  font-weight: 600;
  text-align: right;
}

/* Контакты */
.contact-section {
  margin-bottom: 50px;
}

.contact-info {
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.08);
  text-align: center;
}

.contact-info p {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 30px;
}

.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin: 40px 0;
}

.contact-method {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  text-align: left;
}

.contact-icon {
  font-size: 2rem;
  background: #f0f8ff;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-method h3 {
  color: #2c3e50;
  margin-bottom: 5px;
  font-size: 1.1rem;
}

.contact-link {
  color: #127698;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
}

.contact-link:hover {
  text-decoration: underline;
}

.contact-note {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-top: 5px;
}

.contact-cta {
  background: #f0f8ff;
  padding: 20px;
  border-radius: 10px;
  font-weight: 500;
}

/* SEO футер */
.seo-footer {
  background: #127698;
  color: white;
  padding: 40px;
  border-radius: 15px;
  margin-top: 40px;
}

.seo-footer h2 {
  color: white;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.seo-footer p {
  margin-bottom: 15px;
  line-height: 1.6;
  opacity: 0.9;
}

.seo-footer strong {
  color: #55c496;
}

/* Адаптивность */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .seo-content {
    padding: 25px;
  }
  
  .contact-methods {
    grid-template-columns: 1fr;
  }
  
  .contact-method {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.6rem;
  }
  
  .seo-content h2 {
    font-size: 1.5rem;
  }
  
  .program-detailed h3 {
    font-size: 1.3rem;
  }
}
</style>