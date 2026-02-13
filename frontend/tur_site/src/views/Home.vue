<template>
  <div class="home">
    <HeroSection />

    <AllTours @book-tour="handleBookTour" />

    <!-- УЛУЧШЕННЫЙ SEO-БЛОК - КЛЮЧЕВЫЕ НАПРАВЛЕНИЯ -->
    <section class="seo-links-section">
      <div class="container">
        <div class="seo-intro">
          <h2 class="seo-main-title">Туры по России 2026 — отдых по всей стране от туроператора TUR-4-SIDES</h2>
          <p class="seo-main-description">
            Компания TUR-4-SIDES — ваш надежный проводник в мир путешествий по России. 
            Мы предлагаем более 200 авторских туров по 25 направлениям: от термальных источников Башкирии 
            до вулканов Камчатки, от Золотого кольца до горных хребтов Алтая. 
            Каждый тур разработан профессиональными гидами с учетом сезонности, 
            транспортной доступности и комфорта путешественников. 
            Выбирайте готовые программы или закажите индивидуальный тур вашей мечты!
          </p>
        </div>

        <div class="seo-links-grid">
          <!-- Основные категории туров (расширенные) -->
          <div class="seo-links-category">
            <h3>🏔️ Туры по России 2026 — все направления</h3>
            <ul>
              <li><router-link to="/tours-russia">Все туры по России 2026 — каталог из 200+ предложений</router-link></li>
              <li><router-link to="/tours-russia#south">Южное направление России: Сочи, Крым, Анапа, Геленджик, Кавказ</router-link></li>
              <li><router-link to="/tours-russia#north">Северное направление: Санкт-Петербург, Карелия, Мурманск, Архангельск</router-link></li>
              <li><router-link to="/tours-russia#east">Восточное направление: Байкал, Камчатка, Сахалин, Владивосток</router-link></li>
              <li><router-link to="/tours-russia#center">Центр России: Москва, Золотое кольцо, Смоленск, Тула, Ярославль</router-link></li>
              <li><router-link to="/tours-russia#ural">Урал: Екатеринбург, Пермь, Кунгурские пещеры, Иремель</router-link></li>
              <li><router-link to="/tours-russia#volga">Поволжье: Казань, Нижний Новгород, Самара, Волгоград</router-link></li>
            </ul>
          </div>

          <!-- Популярные региональные направления (расширенные) -->
          <div class="seo-links-category">
            <h3>⭐ Популярные региональные туры 2026</h3>
            <ul>
              <li><router-link to="/tours-bashkiria">Туры по Башкирии из Уфы — термы, горы, национальная кухня</router-link></li>
              <li><router-link to="/tours-russia#altai">Туры на Алтай из Уфы, Москвы, Новосибирска — отдых на Телецком озере</router-link></li>
              <li><router-link to="/tours-russia#crimea">Отдых в Крыму 2026: Ялта, Алушта, Судак, Севастополь, Коктебель</router-link></li>
              <li><router-link to="/tours-russia#sochi">Сочи и Красная Поляна: круглогодичные туры, Роза Хутор, Красное озеро</router-link></li>
              <li><router-link to="/tours-russia#baikal">Туры на Байкал: зимний и летний отдых, остров Ольхон, КБЖД</router-link></li>
              <li><router-link to="/tours-russia#karelia">Туры в Карелию: Рускеала, Кижи, Валаам, Медвежьегорск</router-link></li>
              <li><router-link to="/tours-russia#kavkaz">Туры на Кавказ: Домбай, Архыз, Эльбрус, Чегемские водопады</router-link></li>
              <li><router-link to="/tours-russia#kamchatka">Туры на Камчатку: вулканы, Долина гейзеров, Курильское озеро</router-link></li>
            </ul>
          </div>

          <!-- Специальные и тематические туры (расширенные) -->
          <div class="seo-links-category">
            <h3>🎯 Тематические и специальные туры 2026</h3>
            <ul>
              <li><router-link to="/gastronomic-tours">Гастрономические туры по России — дегустационные программы</router-link></li>
              <li><router-link to="/family-tours">Туры для всей семьи с детьми — анимация, детские комнаты, клубы</router-link></li>
              <li><router-link to="/tours-russia#new">Новогодние туры 2026 — праздничные программы, елки, резиденции</router-link></li>
              <li><router-link to="/tours-russia#hot">Горящие туры по России — скидки до 50%, последние места</router-link></li>
              <li><router-link to="/tours-russia#budget">Дешевые туры по России — бюджетный отдых от 1500₽/день</router-link></li>
              <li><router-link to="/tours-russia#active">Активные туры: сплавы, треккинг, восхождения, велотуры</router-link></li>
              <li><router-link to="/tours-russia#exclusive">VIP и эксклюзивные туры: бизнес-джет, люкс-отели, персональный гид</router-link></li>
              <li><router-link to="/tours-russia#phototours">Фототуры по России: лучшие локации для съемок</router-link></li>
            </ul>
          </div>

          <!-- Информация для туристов и услуги (расширенные) -->
          <div class="seo-links-category">
            <h3>📋 Полезная информация для туристов</h3>
            <ul>
              <li><router-link to="/tour-documents">Документы для тура: договор, ваучер, страховка, билеты</router-link></li>
              <li><router-link to="/faq#documents">Какие документы нужны для поездки по России</router-link></li>
              <li><router-link to="/faq#packing">Что взять с собой в поездку: универсальный чек-лист</router-link></li>
              <li><router-link to="/faq#booking">Как забронировать тур онлайн: пошаговая инструкция</router-link></li>
              <li><router-link to="/help#payment">Способы оплаты: карты, наличные, переводы, рассрочка</router-link></li>
              <li><router-link to="/help#insurance">Медицинская страховка для туров: что покрывает, как оформить</router-link></li>
              <li><router-link to="/help#transport">Трансферы и транспорт в турах: автобус, поезд, самолет, джипы</router-link></li>
              <li><router-link to="/help#emergency">Экстренная помощь в поездке: контакты, алгоритм действий</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- РАСШИРЕННЫЙ БЛОК БЫСТРОГО ПОИСКА -->
    <section class="quick-search">
      <div class="container">
        <h2 class="section-title-big">🏆 Топ-10 популярных туров 2026</h2>
        <div class="quick-search-buttons">
          <router-link to="/tours-bashkiria" class="quick-btn">
            <span class="btn-icon">🏔️</span>
            <span class="btn-text">Туры по Башкирии</span>
            <span class="btn-subtext">от 3 500 ₽ | термы, Иремель</span>
          </router-link>

          <router-link to="/gastronomic-tours" class="quick-btn">
            <span class="btn-icon">🍽️</span>
            <span class="btn-text">Гастрономические туры</span>
            <span class="btn-subtext">от 18 500 ₽ | мед, кумыс</span>
          </router-link>

          <router-link to="/family-tours" class="quick-btn">
            <span class="btn-icon">👨‍👩‍👧‍👦</span>
            <span class="btn-text">Семейные туры</span>
            <span class="btn-subtext">от 25 000 ₽ | дети до 6 лет бесплатно</span>
          </router-link>

          <router-link to="/tours-russia#hot" class="quick-btn">
            <span class="btn-icon">🔥</span>
            <span class="btn-text">Горящие туры</span>
            <span class="btn-subtext">скидки до -50%</span>
          </router-link>

          <router-link to="/tours-russia#baikal" class="quick-btn">
            <span class="btn-icon">💧</span>
            <span class="btn-text">Туры на Байкал</span>
            <span class="btn-subtext">от 48 000 ₽ | лед, ольхон</span>
          </router-link>

          <router-link to="/tours-russia#altai" class="quick-btn">
            <span class="btn-icon">⛰️</span>
            <span class="btn-text">Туры на Алтай</span>
            <span class="btn-subtext">от 45 000 ₽ | Телецкое озеро</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- НОВЫЙ БЛОК: ПРЕИМУЩЕСТВА С РАЗВЕРНУТЫМИ ОПИСАНИЯМИ -->
    <section class="advantages-section">
      <div class="container">
        <h2 class="section-title-big">✅ 10 причин выбрать TUR-4-SIDES</h2>
        <div class="advantages-grid">
          <div class="advantage-card">
            <div class="advantage-icon">🏆</div>
            <h3>Опыт работы с 2012 года</h3>
            <p>Более 12 лет на рынке туристических услуг. За это время мы организовали более 5000 путешествий для 25000+ счастливых туристов.</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-icon">🤝</div>
            <h3>Прямые договоры с отелями</h3>
            <p>Работаем без посредников — напрямую с 300+ отелями, турбазами и гостeвыми домами по всей России. Это дает скидки до 30%.</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-icon">🛡️</div>
            <h3>Финансовые гарантии</h3>
            <p>Мы являемся официальным туроператором и включены в Единый федеральный реестр. Ваши деньги защищены договором и страховкой ответственности.</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-icon">🎯</div>
            <h3>Авторские маршруты</h3>
            <p>Каждый тур разработан нашими гидами-экспертами, которые лично исследовали каждую локацию. Вы увидите не "туристический ширпотреб", а настоящие жемчужины.</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-icon">🔄</div>
            <h3>Гибкая отмена и перенос</h3>
            <p>Бесплатная отмена за 30 дней до тура, возможность переноса дат без штрафов, возврат денег на карту в течение 3 рабочих дней.</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-icon">🎓</div>
            <h3>Профессиональные гиды</h3>
            <p>Все наши гиды имеют лицензии, сертификаты и многолетний опыт работы. Многие владеют иностранными языками и имеют ученые степени.</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-icon">🚌</div>
            <h3>Современный транспорт</h3>
            <p>Автобусы не старше 3 лет, кондиционеры, Wi-Fi, розетки, удобные кресла. В микроавтобусах — кожаный салон, климат-контроль.</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-icon">🌿</div>
            <h3>Экологический подход</h3>
            <p>Мы компенсируем углеродный след от наших туров, поддерживаем заповедники и учим туристов правилам Leave No Trace.</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-icon">📱</div>
            <h3>Круглосуточная поддержка</h3>
            <p>24/7 на связи по телефону, WhatsApp, Telegram. Решаем любые вопросы моментально — от замены отеля до вызова врача.</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-icon">⭐</div>
            <h3>4.9 средний рейтинг</h3>
            <p>На основе 1500+ реальных отзывов на независимых площадках. 97% туристов готовы рекомендовать нас друзьям и возвращаются снова.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- НОВЫЙ БЛОК: ПОПУЛЯРНЫЕ ВОПРОСЫ (ДЛЯ SEO) -->
    <section class="faq-preview-section">
      <div class="container">
        <h2 class="section-title-big">❓ Часто задаваемые вопросы о турах по России</h2>
        <div class="faq-preview-grid">
          <div class="faq-preview-item">
            <h3><router-link to="/faq#booking">Как забронировать тур онлайн?</router-link></h3>
            <p>Для бронирования выберите тур, дату и количество человек, заполните форму — на указанную почту придет счет на оплату. После подтверждения оплаты вы получите ваучер и памятку туриста.</p>
          </div>
          <div class="faq-preview-item">
            <h3><router-link to="/faq#payment">Какие способы оплаты?</router-link></h3>
            <p>Мы принимаем банковские карты (Visa, Mastercard, Мир), наличные в офисе, безналичный расчет для организаций, а также предлагаем беспроцентную рассрочку на 3-6 месяцев.</p>
          </div>
          <div class="faq-preview-item">
            <h3><router-link to="/faq#children">Есть ли скидки для детей?</router-link></h3>
            <p>Да, дети до 6 лет путешествуют бесплатно (без предоставления места), до 12 лет — скидка 50%, подросткам — специальные тарифы на доп. услуги.</p>
          </div>
          <div class="faq-preview-item">
            <h3><router-link to="/faq#refund">Как вернуть деньги за тур?</router-link></h3>
            <p>При отмене за 30+ дней — полный возврат, за 15-29 дней — возврат 50%, менее 14 дней — можно перенести даты. Все условия прозрачно указаны в договоре.</p>
          </div>
          <div class="faq-preview-item">
            <h3><router-link to="/faq#documents">Какие документы нужны для тура?</router-link></h3>
            <p>Для поездок по России достаточно паспорта, для детей — свидетельства о рождении. Дополнительно: полис ОМС/ДМС, путевка/ваучер, билеты.</p>
          </div>
          <div class="faq-preview-item">
            <h3><router-link to="/faq#group">Какие размеры групп?</router-link></h3>
            <p>Минимальная группа — от 6 человек, средняя — 12-15, максимальная — до 30. Для индивидуальных и корпоративных туров формируем группы любого размера.</p>
          </div>
        </div>
        <div class="faq-preview-more">
          <router-link to="/faq" class="more-link">Все вопросы и ответы →</router-link>
        </div>
      </div>
    </section>

    <!-- РАСШИРЕННЫЙ SEO ТЕКСТ С ВНУТРЕННЕЙ ПЕРЕЛИНКОВКОЙ -->
    <section class="seo-text">
      <div class="container">
        <article>
          <h2>Лучшие туры по России 2026 — выбирайте отдых с TUR-4-SIDES</h2>
          
          <p class="lead">
            <strong>Туроператор TUR-4-SIDES</strong> предлагает самые интересные, безопасные и доступные 
            <router-link to="/tours-russia">туры по России 2026</router-link>. 
            Мы специализируемся на внутреннем туризме и работаем напрямую с поставщиками услуг в 25 регионах страны. 
            В нашем каталоге — более 200 готовых туров и бесконечное множество индивидуальных вариантов.
          </p>

          <h3>🏕️ Отдых на любой вкус и бюджет</h3>
          <p>
            В 2026 году мы подготовили обновленную линейку туров, учитывающую все тренды туристической отрасли. 
            Вы можете выбрать <router-link to="/tours-bashkiria">туры по Башкирии</router-link> с посещением 
            термальных источников Стерлитамака, восхождением на гору Иремель и дегустацией национального меда. 
            Любителей активного отдыха ждут <router-link to="/tours-russia#altai">туры на Алтай</router-link> — 
            сплавы по Катуни, треккинг к подножию Белухи, экскурсии по Телецкому озеру. 
            Для ценителей культуры и истории мы разработали экскурсионные программы в 
            <router-link to="/tours-russia#center">Золотое кольцо</router-link>, 
            <router-link to="/tours-russia#spb">Санкт-Петербург</router-link> и 
            <router-link to="/tours-russia#kazan">Казань</router-link>.
          </p>

          <h3>🌊 Пляжный отдых на российских курортах</h3>
          <p>
            Планируете отпуск у моря? У нас есть <router-link to="/tours-russia#south">туры на юг России</router-link> 
            с размещением в лучших отелях Сочи, Адлера, Анапы, Геленджика и Ялты. 
            Мы предлагаем как бюджетные варианты эконом-класса (гостевые дома, хостелы), так и 
            премиум-отдых в пятизвездочных отелях с системой «все включено». 
            Для семей с детьми — специальные тарифы, анимация, няни, детские клубы и бассейны.
          </p>

          <h3>❄️ Зимние туры и активный отдых</h3>
          <p>
            Зимой 2026 года приглашаем на горнолыжные курорты — <router-link to="/tours-russia#sochi">Красную Поляну</router-link>, 
            <router-link to="/tours-russia#dombay">Домбай</router-link>, <router-link to="/tours-russia#arkhyz">Архыз</router-link>. 
            Для любителей экзотики — зимний <router-link to="/tours-russia#baikal">Байкал</router-link> с прозрачным льдом, 
            катанием на хивусах и посещением острова Ольхон. А также — 
            <router-link to="/tours-russia#new">новогодние туры 2026</router-link> с праздничной программой, 
            Дедом Морозом из Великого Устюга и фейерверками.
          </p>

          <h3>🍷 Гастрономические путешествия</h3>
          <p>
            Для гурманов мы создали <router-link to="/gastronomic-tours">гастрономические туры по России</router-link>. 
            В Башкирии вы продегустируете настоящий бортевой мед и кумыс, на Кавказе — 
            шашлык из ягненка и осетинские пироги, на Дону — черную икру и донские вина, 
            в Карелии — уху из сиголов и калитки. Все дегустации включены в программу, 
            а в некоторых турах предусмотрены мастер-классы от шеф-поваров.
          </p>

          <h3>👪 Семейные туры с детьми</h3>
          <p>
            Отдых с детьми требует особого подхода. В наших <router-link to="/family-tours">семейных турах</router-link> 
            мы продумали все до мелочей: детское меню в ресторанах, комфортные номера с дополнительными местами, 
            развлекательные программы, адаптированные экскурсии. Популярностью пользуются туры в 
            Сочи-Парк, Крымские дельфинарии, этнографические деревни Алтая и контактные зоопарки.
          </p>

          <h3>📄 Все документы для тура — у нас</h3>
          <p>
            При бронировании вы получаете полный пакет <router-link to="/tour-documents">документов для тура</router-link>: 
            договор о реализации турпродукта, туристический ваучер, маршрутную квитанцию электронных билетов, 
            полис медицинского страхования, памятку туриста. Все документы приходят на вашу электронную почту 
            в течение часа после оплаты. При необходимости мы предоставим закрывающие документы для бухгалтерии.
          </p>

          <h3>📊 Сравнение цен и сезонов</h3>
          <div class="price-table-wrapper">
            <table class="price-table">
              <thead>
                <tr>
                  <th>Направление</th>
                  <th>Лето 2026</th>
                  <th>Зима 2026</th>
                  <th>Горящие туры</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Башкирия (термы)</td>
                  <td>от 15 000 ₽</td>
                  <td>от 18 000 ₽</td>
                  <td><span class="discount-badge">-20%</span></td>
                </tr>
                <tr>
                  <td>Алтай (Телецкое озеро)</td>
                  <td>от 45 000 ₽</td>
                  <td>от 38 000 ₽</td>
                  <td><span class="discount-badge">-15%</span></td>
                </tr>
                <tr>
                  <td>Байкал</td>
                  <td>от 48 000 ₽</td>
                  <td>от 52 000 ₽</td>
                  <td><span class="discount-badge">-10%</span></td>
                </tr>
                <tr>
                  <td>Сочи</td>
                  <td>от 35 000 ₽</td>
                  <td>от 42 000 ₽</td>
                  <td><span class="discount-badge">-25%</span></td>
                </tr>
                <tr>
                  <td>Карелия</td>
                  <td>от 28 000 ₽</td>
                  <td>от 32 000 ₽</td>
                  <td><span class="discount-badge">-15%</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>🎯 Как выбрать идеальный тур?</h3>
          <ol class="seo-list">
            <li><strong>Определите бюджет</strong> — у нас есть туры от 3500₽ до 150000₽ на человека</li>
            <li><strong>Выберите направление</strong> — юг, север, центр, восток или региональные туры</li>
            <li><strong>Подберите даты</strong> — используйте календарь доступности на странице тура</li>
            <li><strong>Изучите программу</strong> — все наши маршруты детально расписаны по дням</li>
            <li><strong>Прочитайте отзывы</strong> — реальные мнения туристов с фотографиями</li>
            <li><strong>Забронируйте онлайн</strong> — это займет всего 5 минут</li>
          </ol>

          <div class="cta-block-large">
            <h4>🔥 Горящие туры по России — успейте забронировать!</h4>
            <p>
              Каждую неделю мы выставляем на распродажу туры с глубокими скидками до 50%. 
              Это туры с ближайшими датами или освободившиеся места в сформированных группах. 
              Подпишитесь на нашу рассылку и получайте уведомления о лучших предложениях первыми!
            </p>
            <div class="cta-buttons">
              <router-link to="/tours-russia#hot" class="cta-btn primary">Все горящие туры</router-link>
              <router-link to="/tours-bashkiria" class="cta-btn secondary">Туры по Башкирии →</router-link>
              <router-link to="/tours-russia#altai" class="cta-btn secondary">Туры на Алтай →</router-link>
            </div>
          </div>

          <h3>🗺️ Карта туристических направлений</h3>
          <p>
            Мы охватываем всю Россию: от Калининграда до Камчатки, от Мурманска до Дагестана. 
            В каждом регионе у нас есть проверенные партнеры — отели, транспортные компании, 
            гиды, экскурсионные бюро. Это позволяет нам гарантировать высокое качество услуг 
            и решать любые вопросы моментально. С нами вы путешествуете с комфортом и безопасно.
          </p>

          <h3>💎 Индивидуальные и корпоративные туры</h3>
          <p>
            Не нашли подходящий тур в каталоге? Мы разработаем индивидуальный маршрут 
            специально для вас — с учетом ваших пожеланий по датам, бюджету, уровню комфорта 
            и интересам. Также мы профессионально организуем корпоративные выезды, 
            тимбилдинги, юбилеи и свадебные путешествия. Оставьте заявку на сайте 
            или позвоните нам — мы предложим лучшие варианты уже через час.
          </p>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import AllTours from "@/components/AllTours.vue";

export default {
  name: "Home",
  components: {
    HeroSection,
    AllTours,
  },
  methods: {
    handleBookTour(tour) {
      this.$router.push(`/tour/${tour.id}`);
      console.log("Переход к туру:", tour.title, "ID:", tour.id);
    },
  },
  head() {
    return {
      title: "Туры по России 2026 — более 200 направлений, цены от 3500₽ | TUR-4-SIDES",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "✓ Туры по России 2026 от туроператора TUR-4-SIDES. Более 200 готовых программ: Башкирия, Алтай, Байкал, Карелия, Крым, Сочи. ☎ +7 (495) 123-45-67. Онлайн-бронирование, скидки до 50%.",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "туры по России 2026, туры по башкирии из уфы, туры на алтай, туры на байкал, отдых в крыму, отдых в сочи, семейные туры, гастрономические туры, горящие туры, дешевые туры по россии, туроператор по россии",
        },
        {
          hid: "robots",
          name: "robots",
          content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        },
        {
          hid: "googlebot",
          name: "googlebot",
          content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        },
        {
          hid: "yandex-verification",
          name: "yandex-verification",
          content: "ваш_код_верификации" // замените на реальный код
        },
        {
          hid: "google-site-verification",
          name: "google-site-verification",
          content: "ваш_код_верификации" // замените на реальный код
        }
      ],
      script: [
        {
          type: "application/ld+json",
          json: {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "TUR-4-SIDES - туры по России",
            url: "https://tur4sides.ru/",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://tur4sides.ru/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            description: "Туроператор по России. Более 200 туров, 25 направлений, 12 лет опыта."
          }
        },
        {
          type: "application/ld+json",
          json: {
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: "TUR-4-SIDES",
            url: "https://tur4sides.ru/",
            logo: "https://tur4sides.ru/logo.png",
            image: "https://tur4sides.ru/og-image.jpg",
            description: "Туры по России от прямого организатора. Бронируйте онлайн!",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Москва",
              streetAddress: "ул. Примерная, д. 10",
              postalCode: "123456",
              addressCountry: "RU"
            },
            telephone: ["+7-495-123-45-67", "+7-800-123-45-67"],
            email: "info@tur4sides.ru",
            openingHours: ["Mo-Fr 09:00-20:00", "Sa-Su 10:00-18:00"],
            priceRange: "₽₽",
            sameAs: [
              "https://vk.com/tur4sides",
              "https://instagram.com/tur4sides",
              "https://t.me/tur4sides"
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "1578",
              bestRating: "5",
              worstRating: "1"
            }
          }
        },
        {
          type: "application/ld+json",
          json: {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Популярные туры по России 2026",
            description: "Список самых популярных туров от туроператора TUR-4-SIDES",
            numberOfItems: "6",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Тур на Алтай из Уфы",
                url: "https://tur4sides.ru/tour/1"
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Термы в Стерлитамаке",
                url: "https://tur4sides.ru/tour/2"
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Отдых в Сочи",
                url: "https://tur4sides.ru/tour/3"
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Тур в Санкт-Петербург",
                url: "https://tur4sides.ru/tour/4"
              },
              {
                "@type": "ListItem",
                position: 5,
                name: "Гастротур по Башкирии",
                url: "https://tur4sides.ru/tour/5"
              },
              {
                "@type": "ListItem",
                position: 6,
                name: "Тур на Байкал",
                url: "https://tur4sides.ru/tour/6"
              }
            ]
          }
        }
      ],
      link: [
        {
          rel: "canonical",
          href: "https://tur4sides.ru/"
        },
        {
          rel: "alternate",
          hreflang: "ru",
          href: "https://tur4sides.ru/"
        }
      ]
    };
  }
};
</script>

<style scoped>
/* УЛУЧШЕННЫЕ СТИЛИ ДЛЯ SEO-БЛОКОВ */

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title-big {
  font-size: 2.2rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;
  padding-bottom: 1rem;
}

.section-title-big:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, #127698, #55c496);
  border-radius: 3px;
}

/* SEO Intro */
.seo-intro {
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #f0f8ff 0%, #e6f3fa 100%);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(18, 118, 152, 0.1);
}

.seo-main-title {
  color: #127698;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.seo-main-description {
  color: #2c3e50;
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 900px;
  margin: 0 auto;
}

/* SEO Links Section */
.seo-links-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 60px 0;
  margin-top: 40px;
}

.seo-links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.seo-links-category {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.seo-links-category:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(18,118,152,0.1);
}

.seo-links-category h3 {
  color: #127698;
  margin-bottom: 20px;
  font-size: 1.2rem;
  padding-bottom: 10px;
  border-bottom: 2px solid #127698;
}

.seo-links-category ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.seo-links-category li {
  margin-bottom: 12px;
  line-height: 1.4;
}

.seo-links-category a {
  color: #2c3e50;
  text-decoration: none;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
}

.seo-links-category a:hover {
  color: #127698;
  text-decoration: underline;
}

.seo-links-category a::before {
  content: "→";
  color: #127698;
  font-weight: bold;
  font-size: 1.1rem;
}

/* Quick Search */
.quick-search {
  background: white;
  padding: 60px 0;
  text-align: center;
}

.quick-search-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.quick-btn {
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 15px;
  padding: 25px 15px;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.quick-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(18,118,152,0.15);
  border-color: #127698;
}

.btn-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.btn-text {
  color: #2c3e50;
  font-weight: 600;
  font-size: 1rem;
}

.btn-subtext {
  color: #127698;
  font-size: 0.85rem;
  font-weight: 500;
}

/* Advantages Section */
.advantages-section {
  padding: 60px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.advantage-card {
  background: white;
  padding: 1.8rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
  border-left: 4px solid #127698;
}

.advantage-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(18,118,152,0.1);
}

.advantage-icon {
  font-size: 2.2rem;
  margin-bottom: 1rem;
}

.advantage-card h3 {
  color: #2c3e50;
  margin-bottom: 0.8rem;
  font-size: 1.2rem;
}

.advantage-card p {
  color: #666;
  line-height: 1.5;
  font-size: 0.95rem;
}

/* FAQ Preview */
.faq-preview-section {
  padding: 60px 0;
  background: white;
}

.faq-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 2rem;
}

.faq-preview-item {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 10px;
  border-bottom: 3px solid #127698;
}

.faq-preview-item h3 {
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
}

.faq-preview-item a {
  color: #2c3e50;
  text-decoration: none;
  transition: color 0.3s ease;
}

.faq-preview-item a:hover {
  color: #127698;
}

.faq-preview-item p {
  color: #666;
  line-height: 1.5;
  font-size: 0.95rem;
  margin: 0;
}

.faq-preview-more {
  text-align: center;
  margin-top: 1.5rem;
}

.more-link {
  display: inline-block;
  color: #127698;
  font-weight: 600;
  text-decoration: none;
  padding: 0.8rem 2rem;
  border: 2px solid #127698;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.more-link:hover {
  background: #127698;
  color: white;
}

/* SEO Text */
.seo-text {
  background: white;
  padding: 60px 0;
  border-top: 1px solid #e9ecef;
}

.seo-text article {
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.8;
}

.seo-text .lead {
  font-size: 1.2rem;
  color: #2c3e50;
  font-weight: 500;
}

.seo-text h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  text-align: center;
}

.seo-text h3 {
  color: #127698;
  margin: 2rem 0 1rem;
  font-size: 1.4rem;
  padding-left: 1rem;
  border-left: 4px solid #127698;
}

.seo-text p {
  color: #444;
  margin-bottom: 1.2rem;
}

.seo-text ul, .seo-text ol {
  margin: 1.5rem 0;
  padding-left: 2rem;
}

.seo-text li {
  margin-bottom: 0.8rem;
  color: #444;
}

.seo-text a {
  color: #127698;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px dashed #127698;
}

.seo-text a:hover {
  border-bottom: 1px solid #127698;
}

/* Price Table */
.price-table-wrapper {
  overflow-x: auto;
  margin: 2rem 0;
}

.price-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.price-table thead {
  background: #127698;
  color: white;
}

.price-table th {
  padding: 1rem;
  font-weight: 600;
  text-align: center;
}

.price-table td {
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid #e9ecef;
}

.price-table tr:last-child td {
  border-bottom: none;
}

.price-table tbody tr:hover {
  background: #f0f8ff;
}

.discount-badge {
  display: inline-block;
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
  padding: 0.2rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 600;
}

/* SEO List */
.seo-list {
  list-style-type: decimal;
  padding-left: 2rem;
}

.seo-list li {
  margin-bottom: 0.8rem;
  color: #444;
}

.seo-list strong {
  color: #2c3e50;
}

/* CTA Block */
.cta-block-large {
  background: linear-gradient(135deg, #127698, #0d5a7a);
  padding: 3rem;
  border-radius: 20px;
  margin: 3rem 0;
  color: white;
  text-align: center;
}

.cta-block-large h4 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.cta-block-large p {
  color: rgba(255,255,255,0.9);
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.cta-block-large .cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-block-large .cta-btn {
  padding: 1rem 2rem;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cta-block-large .cta-btn.primary {
  background: white;
  color: #127698;
}

.cta-block-large .cta-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.cta-block-large .cta-btn.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.cta-block-large .cta-btn.secondary:hover {
  background: white;
  color: #127698;
}

/* Responsive */
@media (max-width: 768px) {
  .section-title-big {
    font-size: 1.8rem;
  }
  
  .seo-main-title {
    font-size: 1.5rem;
  }
  
  .seo-main-description {
    font-size: 1rem;
  }
  
  .seo-links-grid {
    grid-template-columns: 1fr;
  }
  
  .quick-search-buttons {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .advantages-grid,
  .faq-preview-grid {
    grid-template-columns: 1fr;
  }
  
  .seo-text h2 {
    font-size: 1.6rem;
  }
  
  .seo-text h3 {
    font-size: 1.2rem;
  }
  
  .cta-block-large {
    padding: 2rem;
  }
  
  .cta-block-large h4 {
    font-size: 1.4rem;
  }
  
  .cta-block-large .cta-buttons {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .quick-search-buttons {
    grid-template-columns: 1fr;
  }
  
  .price-table th,
  .price-table td {
    padding: 0.5rem;
    font-size: 0.85rem;
  }
}
</style>