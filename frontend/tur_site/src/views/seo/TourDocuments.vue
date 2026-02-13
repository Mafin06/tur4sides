<template>
  <section class="tour-documents-page">
    <div class="container">
      <nav class="breadcrumbs" aria-label="Навигация">
        <ol itemscope itemtype="https://schema.org/BreadcrumbList">
          <li
            itemprop="itemListElement"
            itemscope
            itemtype="https://schema.org/ListItem"
          >
            <router-link to="/" itemprop="item">
              <span itemprop="name">Главная</span>
            </router-link>
            <meta itemprop="position" content="1" />
          </li>
          <li
            itemprop="itemListElement"
            itemscope
            itemtype="https://schema.org/ListItem"
          >
            <router-link to="/faq" itemprop="item">
              <span itemprop="name">Информация для туристов</span>
            </router-link>
            <meta itemprop="position" content="2" />
          </li>
          <li
            itemprop="itemListElement"
            itemscope
            itemtype="https://schema.org/ListItem"
          >
            <span itemprop="name">Документы для тура по России</span>
            <meta itemprop="position" content="3" />
          </li>
        </ol>
      </nav>

      <h1 class="page-title">Документы для тура по России: полное руководство 2026</h1>
      <p class="page-subtitle">
        Все, что нужно знать о документах для путешествий по России: от бронирования до возвращения домой
      </p>

      <!-- Вводный SEO текст -->
      <div class="seo-intro">
        <p>
          Планируете путешествие по России и хотите заранее подготовить все необходимые документы? 
          В этой статье мы подробно расскажем, какие документы нужны для оформления тура по России, 
          что выдает туроператор, как подготовиться к поездке с детьми и что делать в экстренных ситуациях. 
          Наше агентство TUR-4-SIDES специализируется исключительно на турах по России, поэтому мы знаем 
          все нюансы оформления документов для внутреннего туризма.
        </p>
      </div>

      <!-- Основная информация -->
      <article class="documents-content">
        <!-- Навигация по разделам (для SEO и удобства) -->
        <nav class="content-navigation" aria-label="Содержание">
          <h2>Содержание:</h2>
          <ul>
            <li><a href="#documents-for-booking">Документы для бронирования тура</a></li>
            <li><a href="#documents-for-trip">Документы для поездки по России</a></li>
            <li><a href="#operator-documents">Что выдает туроператор</a></li>
            <li><a href="#children-documents">Документы для детей</a></li>
            <li><a href="#regions-documents">Особенности документов по регионам</a></li>
            <li><a href="#emergency-situations">Что делать в экстренных случаях</a></li>
            <li><a href="#checklist">Чек-лист перед поездкой</a></li>
          </ul>
        </nav>

        <div class="documents-grid">
          <!-- Документы для оформления -->
          <section id="documents-for-booking" class="documents-section">
            <h2>📋 Какие документы нужны для бронирования тура по России?</h2>
            
            <div class="important-note">
              <p>💡 <strong>Важно:</strong> Для путешествий по России заграничный паспорт и виза НЕ ТРЕБУЮТСЯ. Все, что нужно — стандартные документы гражданина РФ.</p>
            </div>

            <div class="document-card">
              <h3>Для бронирования тура (на этапе оформления):</h3>
              <ul>
                <li>
                  <strong>Общегражданский паспорт РФ</strong> — для заключения договора 
                  (достаточно паспортных данных, оригинал предоставляется при заселении)
                </li>
                <li>
                  <strong>Контактные данные</strong> — актуальный номер телефона и email для 
                  отправки документов и связи с менеджером
                </li>
                <li>
                  <strong>Данные всех участников поездки</strong> — полные ФИО, даты рождения, 
                  паспортные данные (серия и номер паспорта)
                </li>
                <li>
                  <strong>Адрес регистрации</strong> — иногда требуется для оформления некоторых 
                  видов туров (например, при заказе трансфера или экскурсий)
                </li>
              </ul>
              <p class="document-note">
                Все данные можно отправить менеджеру через WhatsApp, Telegram или по email. 
                Подписывать документы можно как в офисе, так и онлайн через электронный документооборот.
              </p>
            </div>

            <div class="document-card">
              <h3>Способы оплаты и подтверждения:</h3>
              <ul>
                <li><strong>Предоплата 30%</strong> — стандартное условие для бронирования тура</li>
                <li><strong>Полная оплата</strong> — за 14 дней до начала тура</li>
                <li><strong>Способы оплаты:</strong> банковской картой онлайн, переводом по реквизитам, наличными в офисе</li>
                <li><strong>Подтверждение:</strong> после оплаты вы получаете кассовый чек и договор с отметкой об оплате</li>
              </ul>
            </div>
          </section>

          <!-- Документы для поездки -->
          <section id="documents-for-trip" class="documents-section">
            <h2>🚂 Какие документы нужны для поездки по России?</h2>

            <div class="document-card">
              <h3>Основные документы, которые всегда должны быть с собой:</h3>
              <ul>
                <li>
                  <strong>Паспорт гражданина РФ</strong> — главный документ, удостоверяющий личность. 
                  Проверьте, что паспорт не просрочен и в хорошем состоянии.
                </li>
                <li>
                  <strong>Страховой полис ОМС</strong> — действует на всей территории России, 
                  но рекомендуем дополнительно оформить туристическую страховку (покрывает больше случаев)
                </li>
                <li>
                  <strong>Договор с туроператором</strong> — подтверждение ваших прав на услуги
                </li>
                <li>
                  <strong>Ваучер на проживание</strong> — документ для заселения в отель
                </li>
                <li>
                  <strong>Билеты на транспорт</strong> — электронные или бумажные билеты на поезд, 
                  самолет, автобус (достаточно показать на экране телефона)
                </li>
                <li>
                  <strong>Медицинская страховка</strong> — особенно важна для активных туров 
                  (горные походы, сплавы, экскурсии)
                </li>
              </ul>
            </div>

            <div class="document-card">
              <h3>Дополнительные документы для разных ситуаций:</h3>
              <ul>
                <li>
                  <strong>Водительские права</strong> — если планируете арендовать автомобиль, 
                  квадроцикл или снегоход
                </li>
                <li>
                  <strong>Студенческий билет</strong> — для получения скидок в музеях и на экскурсиях
                </li>
                <li>
                  <strong>Пенсионное удостоверение</strong> — также дает право на льготы
                </li>
                <li>
                  <strong>Справки о хронических заболеваниях</strong> — если есть особенности здоровья, 
                  переведите основные данные на русский язык
                </li>
                <li>
                  <strong>Рецепты на лекарства</strong> — для препаратов, которые могут вызвать вопросы 
                  при досмотре (сильнодействующие средства)
                </li>
              </ul>
            </div>
          </section>
        </div>

        <!-- Документы от туроператора -->
        <section id="operator-documents" class="operator-documents">
          <h2>📄 Какие документы выдает туроператор TUR-4-SIDES?</h2>
          
          <div class="documents-timeline">
            <div class="timeline-item">
              <div class="timeline-marker">Сразу после бронирования</div>
              <div class="timeline-content">
                <h4>Договор на оказание туристических услуг</h4>
                <p>Юридический документ, где прописаны все условия тура, права и обязанности сторон, порядок оплаты и отмены. Договор может быть электронным (подписывается через СМС-код) или бумажным (при визите в офис).</p>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-marker">После оплаты</div>
              <div class="timeline-content">
                <h4>Кассовый чек и квитанция об оплате</h4>
                <p>Подтверждение оплаты, которое может понадобиться при возврате средств или спорных ситуациях.</p>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-marker">За 7-10 дней до тура</div>
              <div class="timeline-content">
                <h4>Ваучер на проживание</h4>
                <p>Документ для отеля, подтверждающий оплату и содержащий информацию о датах, категории номера и условиях проживания.</p>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-marker">За 3-5 дней до тура</div>
              <div class="timeline-content">
                <h4>Маршрутные квитанции (билеты)</h4>
                <p>Электронные билеты на поезд, самолет или автобус. Приходят на email в формате PDF. Для поездов РЖД также приходит СМС с номером заказа.</p>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-marker">За 1-2 дня до тура</div>
              <div class="timeline-content">
                <h4>Программа тура и памятка туриста</h4>
                <p>Подробное расписание по дням, контакты гида, рекомендации по одежде, список вещей, информация о местах питания и дополнительных услугах.</p>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-marker">В день начала тура</div>
              <div class="timeline-content">
                <h4>Страховой полис</h4>
                <p>Медицинская страховка на время путешествия с указанием страховой компании, номера полиса и телефонов экстренной связи.</p>
              </div>
            </div>
          </div>

          <div class="info-box">
            <h4>Где получить документы?</h4>
            <p>📧 Все документы мы отправляем на вашу электронную почту. Вы можете:</p>
            <ul>
              <li>Распечатать документы и взять с собой бумажные копии</li>
              <li>Сохранить PDF-файлы в телефоне (показывать на экране при заселении)</li>
              <li>Получить бумажные документы в нашем офисе по адресу: г. Уфа, ул. Примерная, д. 10</li>
            </ul>
          </div>
        </section>

        <!-- Документы для детей -->
        <section id="children-documents" class="children-section">
          <h2>👶 Документы для детей в путешествии по России</h2>
          
          <div class="children-grid">
            <div class="children-card">
              <h3>Для детей до 14 лет</h3>
              <ul>
                <li><strong>Свидетельство о рождении</strong> — обязательно с собой, даже если ребенок записан в паспорт родителя</li>
                <li><strong>Вкладыш о гражданстве</strong> — отметка на обратной стороне свидетельства или отдельный вкладыш (проверьте, что он есть)</li>
                <li><strong>Медицинский полис ОМС</strong> — при наличии</li>
              </ul>
            </div>
            
            <div class="children-card">
              <h3>Для детей с 14 лет</h3>
              <ul>
                <li><strong>Паспорт гражданина РФ</strong> — обязателен</li>
                <li><strong>Свидетельство о рождении</strong> — тоже можно взять как дополнительный документ</li>
              </ul>
            </div>
            
            <div class="children-card highlight">
              <h3>❗️ Если ребенок путешествует без родителей</h3>
              <p>Обязательно нужно:</p>
              <ul>
                <li><strong>Нотариально заверенное согласие</strong> от обоих родителей (или одного, если второй умер/лишен прав)</li>
                <li>В согласии должны быть указаны: ФИО ребенка, даты поездки, страны/регионы посещения, ФИО сопровождающего</li>
                <li>Срок действия согласия — обычно до 3 лет, но лучше сделать на конкретную поездку</li>
                <li>Копии паспортов родителей (страницы с фото и пропиской)</li>
              </ul>
            </div>
            
            <div class="children-card">
              <h3>Если ребенок с одним родителем</h3>
              <ul>
                <li>Согласие второго родителя <strong>не требуется</strong>, если второй родитель не заявлял о своем несогласии</li>
                <li>Но лучше иметь при себе свидетельство о разводе/смерти/справку от приставов (на случай вопросов)</li>
                <li>Рекомендуем сделать нотариальное согласие, чтобы избежать проблем на вокзалах и в отелях</li>
              </ul>
            </div>
          </div>
          
          <div class="warning-box">
            <h4>⚠️ Важно знать!</h4>
            <p>При посадке на поезд или самолет могут проверить не только билеты, но и документы на детей. Особенно внимательно это делают при поездках в другие регионы. Всегда имейте оригиналы документов!</p>
          </div>
        </section>

        <!-- Особенности по регионам -->
        <section id="regions-documents" class="regions-section">
          <h2>🗺️ Особенности документов в разных регионах России</h2>
          
          <div class="regions-grid">
            <div class="region-card">
              <h3>Крым и Севастополь</h3>
              <p>Для посещения Крыма достаточно российского паспорта. Но учитывайте:</p>
              <ul>
                <li>При перелете через материковую часть — обычный контроль</li>
                <li>При поездке на машине через Керченский мост — могут проверить документы</li>
                <li>Детям до 14 лет — свидетельство о рождении обязательно</li>
              </ul>
            </div>
            
            <div class="region-card">
              <h3>Калининградская область</h3>
              <p>При поездке в Калининград через Литву (поездом) нужен только российский паспорт. Проезд осуществляется по специальным транзитным документам, которые оформляет РЖД.</p>
            </div>
            
            <div class="region-card">
              <h3>Приграничные зоны</h3>
              <p>Некоторые районы (например, часть Карелии, Алтая, Приморья) требуют пропуска в погранзону. Оформляется заранее через туроператора или самостоятельно на Госуслугах.</p>
            </div>
            
            <div class="region-card">
              <h3>Национальные парки и заповедники</h3>
              <p>Для посещения многих ООПТ нужно оформить разрешение. Обычно это делает туроператор, но проверьте заранее. Например:</p>
              <ul>
                <li>Приэльбрусье — нужен пропуск в погранзону</li>
                <li>Красноярские Столбы — вход по билетам</li>
                <li>Байкал — в некоторые места нужны разрешения</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Экстренные ситуации -->
        <section id="emergency-situations" class="emergency-section">
          <h2>🆘 Что делать в экстренных ситуациях с документами?</h2>
          
          <div class="emergency-grid">
            <div class="emergency-card">
              <h3>Потеряли паспорт</h3>
              <ol>
                <li>Немедленно обратитесь в местное отделение полиции — напишите заявление о потере</li>
                <li>Получите справку о регистрации заявления</li>
                <li>Обратитесь в консульство или паспортный стол по месту пребывания</li>
                <li>Свяжитесь с нами — мы поможем связаться с принимающей стороной и отелем</li>
                <li>Временное удостоверение личности оформляется в день обращения</li>
              </ol>
            </div>
            
            <div class="emergency-card">
              <h3>Забыли документы дома</h3>
              <p>Варианты действий:</p>
              <ul>
                <li>Попросите родственников отправить фото документов (для заселения в отель часто достаточно)</li>
                <li>На поезд можно сесть по электронному билету, паспорт проверят при посадке — если не будет, не пустят</li>
                <li>Закажите курьерскую доставку документов (если есть время)</li>
                <li>В некоторых случаях можно заселиться по водительским правам (не везде)</li>
              </ul>
            </div>
            
            <div class="emergency-card">
              <h3>Испортили документы</h3>
              <p>Если документы намокли, порвались или выцвели:</p>
              <ul>
                <li>Сразу обратитесь в полицию для фиксации факта</li>
                <li>Свяжитесь с туроператором — мы поможем договориться с отелем</li>
                <li>Вернуться домой можно по справке из полиции (подтверждает личность)</li>
                <li>После возвращения обратитесь в паспортный стол для замены</li>
              </ul>
            </div>
            
            <div class="emergency-card">
              <h3>Ребенок потерялся или заболел</h3>
              <ul>
                <li>При утере ребенка — немедленно в полицию</li>
                <li>При болезни — в медицинское учреждение (по полису ОМС или страховке)</li>
                <li>Свяжитесь с гидом или туроператором для помощи</li>
              </ul>
            </div>
          </div>
          
          <div class="contacts-urgent">
            <h3>Круглосуточная поддержка туристов TUR-4-SIDES</h3>
            <p>📞 +7 (495) 123-45-67 (круглосуточно)</p>
            <p>📧 emergency@tur4sides.ru</p>
          </div>
        </section>

        <!-- Расширенный FAQ -->
        <section class="documents-faq">
          <h2>❓ Часто задаваемые вопросы о документах для туров по России</h2>
          
          <div class="faq-list">
            <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
              <h3 itemprop="name">Можно ли путешествовать по России с внутренним паспортом?</h3>
              <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                <div itemprop="text">
                  <p>Да, для путешествий по России достаточно общегражданского паспорта РФ. Заграничный паспорт нужен только для выезда за границу. Для поездок внутри страны он не требуется.</p>
                </div>
              </div>
            </div>

            <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
              <h3 itemprop="name">Нужен ли загранпаспорт для поездки в Крым?</h3>
              <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                <div itemprop="text">
                  <p>Нет, для посещения Крыма и Севастополя достаточно российского паспорта. Крым — территория России, поэтому въезд осуществляется по внутренним документам.</p>
                </div>
              </div>
            </div>

            <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
              <h3 itemprop="name">Какие документы нужны для поездки в Калининград?</h3>
              <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                <div itemprop="text">
                  <p>Для поездки в Калининград нужен только российский паспорт. Если вы едете поездом через Литву, все транзитные документы оформляет РЖД автоматически при покупке билета. Дополнительных виз не требуется.</p>
                </div>
              </div>
            </div>

            <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
              <h3 itemprop="name">Можно ли заселиться в отель без паспорта?</h3>
              <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                <div itemprop="text">
                  <p>По закону, заселение в отели России возможно только при предъявлении паспорта. Без паспорта вас не заселят. Исключение — если вы предоставите временное удостоверение личности или справку из полиции об утере паспорта.</p>
                </div>
              </div>
            </div>

            <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
              <h3 itemprop="name">Что делать, если паспорт просрочен, а тур уже оплачен?</h3>
              <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                <div itemprop="text">
                  <p>С просроченным паспортом вас не посадят в поезд/самолет и не заселят в отель. Вам нужно срочно обратиться в паспортный стол для замены паспорта. Если времени нет — свяжитесь с нами, мы поможем перенести тур на другие даты (условия переноса зависят от конкретного тура).</p>
                </div>
              </div>
            </div>

            <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
              <h3 itemprop="name">Нужна ли доверенность на ребенка, если едем вдвоем с мамой?</h3>
              <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                <div itemprop="text">
                  <p>По закону, согласие второго родителя не требуется, если ребенок едет с одним из родителей. Однако на практике могут возникнуть вопросы у сотрудников транспортных компаний или отелей. Чтобы избежать проблем, рекомендуем оформить нотариальное согласие — это займет 30 минут и избавит от возможных сложностей.</p>
                </div>
              </div>
            </div>

            <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
              <h3 itemprop="name">Какие документы нужны для горного похода на Алтай?</h3>
              <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                <div itemprop="text">
                  <p>Для горных походов на Алтай (особенно в приграничные районы) может потребоваться пропуск в пограничную зону. Также рекомендуем оформить расширенную медицинскую страховку, покрывающую горные восхождения и активный отдых. Остальные документы — стандартные: паспорт, договор, ваучер.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Чек-лист -->
        <section id="checklist" class="checklist-section">
          <h2>✅ Чек-лист документов перед поездкой по России</h2>
          
          <div class="checklist-intro">
            <p>Распечатайте этот список и отметьте все пункты перед выходом из дома. Это гарантирует, что вы ничего не забудете.</p>
          </div>

          <div class="checklist">
            <div class="checklist-category">
              <h3>Основные документы:</h3>
              <div class="checklist-item" v-for="item in mainDocuments" :key="item.id">
                <label class="checkbox">
                  <input type="checkbox" v-model="item.checked" />
                  <span class="checkmark"></span>
                  <span class="checklist-text">{{ item.text }}</span>
                </label>
              </div>
            </div>

            <div class="checklist-category">
              <h3>Документы от туроператора:</h3>
              <div class="checklist-item" v-for="item in operatorDocuments" :key="item.id">
                <label class="checkbox">
                  <input type="checkbox" v-model="item.checked" />
                  <span class="checkmark"></span>
                  <span class="checklist-text">{{ item.text }}</span>
                </label>
              </div>
            </div>

            <div class="checklist-category">
              <h3>Документы для детей:</h3>
              <div class="checklist-item" v-for="item in childrenDocuments" :key="item.id">
                <label class="checkbox">
                  <input type="checkbox" v-model="item.checked" />
                  <span class="checkmark"></span>
                  <span class="checklist-text">{{ item.text }}</span>
                </label>
              </div>
            </div>

            <div class="checklist-category">
              <h3>Копии и дополнительные документы:</h3>
              <div class="checklist-item" v-for="item in additionalDocuments" :key="item.id">
                <label class="checkbox">
                  <input type="checkbox" v-model="item.checked" />
                  <span class="checkmark"></span>
                  <span class="checklist-text">{{ item.text }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="checklist-actions">
            <button class="print-btn" @click="printChecklist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M19 8H5v11h14V8z" stroke="white" stroke-width="2"/>
                <rect x="7" y="12" width="10" height="2" fill="white"/>
                <rect x="7" y="15" width="8" height="2" fill="white"/>
                <rect x="7" y="4" width="10" height="4" fill="white" stroke="white" stroke-width="2"/>
              </svg>
              Распечатать чек-лист
            </button>
            <button class="reset-btn" @click="resetChecklist">
              Сбросить отметки
            </button>
          </div>
        </section>

        <!-- Контакты для вопросов -->
        <section class="contacts-section">
          <div class="contacts-card">
            <h2>Остались вопросы по документам?</h2>
            <p>Наши специалисты помогут разобраться во всех нюансах и подскажут, какие документы нужны именно для вашего тура</p>

            <div class="contact-methods">
              <div class="contact-method">
                <div class="contact-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div class="contact-info">
                  <strong>Телефон:</strong>
                  <a href="tel:+74951234567">+7 (495) 123-45-67</a>
                  <span>с 9:00 до 21:00 без выходных</span>
                </div>
              </div>

              <div class="contact-method">
                <div class="contact-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                  </svg>
                </div>
                <div class="contact-info">
                  <strong>Email:</strong>
                  <a href="mailto:info@tur4sides.ru">info@tur4sides.ru</a>
                  <span>отвечаем в течение часа</span>
                </div>
              </div>

              <div class="contact-method">
                <div class="contact-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div class="contact-info">
                  <strong>Офис в Уфе:</strong>
                  <span>ул. Примерная, д. 10, офис 205</span>
                  <span>пн-пт: 10:00-19:00, сб: 11:00-16:00</span>
                </div>
              </div>
            </div>

            <div class="social-links">
              <p>Быстро связаться в мессенджерах:</p>
              <div class="social-icons">
                <a href="#" class="social-icon">WhatsApp</a>
                <a href="#" class="social-icon">Telegram</a>
                <a href="#" class="social-icon">VK</a>
              </div>
            </div>
          </div>
        </section>

        <!-- Заключительный SEO текст -->
        <div class="seo-outro">
          <h3>Путешествуйте по России с комфортом</h3>
          <p>
            Правильно оформленные документы — залог спокойного и приятного путешествия. 
            Наше агентство TUR-4-SIDES специализируется на турах по России и помогает 
            туристам с оформлением всех необходимых документов. Мы гарантируем, что ваш 
            отдых начнется с правильной подготовки. Выбирайте тур на нашем сайте, 
            бронируйте онлайн, а мы позаботимся обо всех документах.
          </p>
          <div class="seo-links">
            <router-link to="/tours-russia">Все туры по России</router-link>
            <router-link to="/tours-bashkiria">Туры по Башкирии</router-link>
            <router-link to="/faq">Часто задаваемые вопросы</router-link>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import { useHead } from '@vueuse/head'
import { ref } from 'vue'

export default {
  name: "TourDocumentsPage",
  setup() {
    useHead({
      title: 'Документы для тура по России 2026: полный список и оформление | TUR-4-SIDES',
      meta: [
        { 
          name: 'description', 
          content: '✅ Какие документы нужны для тура по России. ✅ Полный список документов для оформления, что выдает туроператор, документы для детей, чек-лист перед поездкой. ✅ Особенности для разных регионов: Крым, Калининград, Алтай. Советы туристам от агентства TUR-4-SIDES.' 
        },
        { 
          name: 'keywords', 
          content: 'документы для тура по России, какие документы нужны для путешествия по России, документы для поездки по России, оформление тура по России, договор на тур по России, ваучер на проживание Россия, документы для ребенка в тур по России, согласие на выезд ребенка Россия, чек-лист документов перед поездкой Россия, что нужно для тура по России, паспорт для поездки по России, документы в Крым, документы в Калининград, документы на Алтай, туристическая страховка Россия'
        },
        { property: 'og:title', content: 'Документы для тура по России 2026 - что нужно знать' },
        { property: 'og:description', content: 'Полный список документов для оформления тура по России. Чек-лист, сроки получения, документы для детей, особенности регионов.' },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: 'https://tur4sides.ru/tour-documents' },
        { property: 'og:site_name', content: 'TUR-4-SIDES' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Документы для тура по России | TUR-4-SIDES' },
        { name: 'twitter:description', content: 'Какие документы нужны для тура по России. Чек-лист документов перед поездкой.' },
        { name: 'robots', content: 'index, follow' }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://tur4sides.ru/tour-documents'
        }
      ],
      script: [
        {
          type: 'application/ld+json',
          json: {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Документы для тура по России: полное руководство 2026",
            "description": "Все, что нужно знать о документах для путешествий по России: от бронирования до возвращения домой",
            "author": {
              "@type": "Organization",
              "name": "TUR-4-SIDES"
            },
            "publisher": {
              "@type": "Organization",
              "name": "TUR-4-SIDES",
              "logo": {
                "@type": "ImageObject",
                "url": "https://tur4sides.ru/logo.png"
              }
            },
            "datePublished": "2026-01-01",
            "dateModified": "2026-03-01",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://tur4sides.ru/tour-documents"
            }
          }
        },
        {
          type: 'application/ld+json',
          json: {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Можно ли путешествовать по России с внутренним паспортом?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, для путешествий по России достаточно общегражданского паспорта РФ. Заграничный паспорт нужен только для выезда за границу."
                }
              },
              {
                "@type": "Question",
                "name": "Нужен ли загранпаспорт для поездки в Крым?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Нет, для посещения Крыма и Севастополя достаточно российского паспорта. Крым — территория России, поэтому въезд осуществляется по внутренним документам."
                }
              },
              {
                "@type": "Question",
                "name": "Какие документы нужны для поездки в Калининград?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Для поездки в Калининград нужен только российский паспорт. Если вы едете поездом через Литву, все транзитные документы оформляет РЖД автоматически."
                }
              },
              {
                "@type": "Question",
                "name": "Нужна ли доверенность на ребенка, если едем вдвоем с мамой?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "По закону, согласие второго родителя не требуется, если ребенок едет с одним из родителей. Однако на практике могут возникнуть вопросы, поэтому рекомендуем оформить нотариальное согласие."
                }
              }
            ]
          }
        }
      ]
    })

    const mainDocuments = ref([
      { id: 1, text: "Паспорт гражданина РФ (проверить срок действия)", checked: false },
      { id: 2, text: "Медицинский полис ОМС", checked: false },
      { id: 3, text: "Туристическая страховка (для активных туров)", checked: false },
      { id: 4, text: "Водительские права (если планируется аренда авто)", checked: false }
    ])

    const operatorDocuments = ref([
      { id: 5, text: "Договор на оказание туристических услуг", checked: false },
      { id: 6, text: "Ваучер на проживание", checked: false },
      { id: 7, text: "Билеты на транспорт (электронные или бумажные)", checked: false },
      { id: 8, text: "Программа тура и контакты гида", checked: false }
    ])

    const childrenDocuments = ref([
      { id: 9, text: "Свидетельство о рождении (для детей до 14 лет)", checked: false },
      { id: 10, text: "Паспорт ребенка (с 14 лет)", checked: false },
      { id: 11, text: "Нотариальное согласие от родителей (если ребенок без родителей)", checked: false },
      { id: 12, text: "Медицинский полис ребенка", checked: false }
    ])

    const additionalDocuments = ref([
      { id: 13, text: "Копии всех документов (хранить отдельно от оригиналов)", checked: false },
      { id: 14, text: "Электронные копии в телефоне/облаке", checked: false },
      { id: 15, text: "Контакты туроператора и экстренной поддержки", checked: false },
      { id: 16, text: "Пропуск в погранзону (если требуется для региона)", checked: false }
    ])

    const resetChecklist = () => {
      mainDocuments.value.forEach(item => item.checked = false)
      operatorDocuments.value.forEach(item => item.checked = false)
      childrenDocuments.value.forEach(item => item.checked = false)
      additionalDocuments.value.forEach(item => item.checked = false)
    }

    const printChecklist = () => {
      window.print()
    }

    return {
      mainDocuments,
      operatorDocuments,
      childrenDocuments,
      additionalDocuments,
      resetChecklist,
      printChecklist
    }
  }
}
</script>

<style scoped>
.tour-documents-page {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 40px 0 80px;
  margin-top: 5%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.breadcrumbs {
  margin-bottom: 30px;
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

.breadcrumbs a:hover {
  text-decoration: underline;
}

.breadcrumbs li:not(:last-child)::after {
  content: "›";
  margin-left: 10px;
  color: #666;
}

.page-title {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 10px;
  line-height: 1.2;
}

.page-subtitle {
  color: #7f8c8d;
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.seo-intro {
  background: white;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #127698;
}

.seo-intro p {
  color: #555;
  line-height: 1.8;
  font-size: 1.1rem;
}

.content-navigation {
  background: #f0f8ff;
  padding: 20px 30px;
  border-radius: 10px;
  margin-bottom: 30px;

}

.content-navigation h2 {
  color: #2c3e50;
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.content-navigation ul {
  display: block;
  flex-wrap: wrap;
  gap: 15px 30px;
  padding: 0;
  margin: 0;
}

.content-navigation a {
  color: #127698;
  text-decoration: none;
  font-weight: 500;
}

.content-navigation a:hover {
  text-decoration: underline;
}

.documents-content {
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.documents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 40px;
  margin-bottom: 50px;
}

.documents-section h2 {
  color: #2c3e50;
  margin-bottom: 25px;
  font-size: 1.5rem;
  padding-bottom: 10px;
  border-bottom: 2px solid #127698;
}

.important-note {
  background: #e3f2fd;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 25px;
}

.important-note p {
  color: #0d47a1;
  font-size: 1.1rem;
  margin: 0;
}

.document-card {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 20px;
  border-left: 4px solid #127698;
}

.document-card h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.document-card ul {
  list-style: none;
  padding: 0;
  margin: 0 0 15px 0;
}

.document-card li {
  padding: 8px 0;
  border-bottom: 1px solid #e9ecef;
  color: #555;
  position: relative;
  padding-left: 20px;
}

.document-card li:before {
  content: "•";
  color: #127698;
  font-weight: bold;
  position: absolute;
  left: 0;
}

.document-card li:last-child {
  border-bottom: none;
}

.document-card li strong {
  color: #2c3e50;
}

.document-note {
  color: #666;
  font-style: italic;
  margin: 15px 0 0 0;
  padding-top: 15px;
  border-top: 1px dashed #dee2e6;
}

.operator-documents {
  margin: 50px 0;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 15px;
}

.operator-documents h2 {
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 1.5rem;
}

.documents-timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.timeline-item {
  display: flex;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.timeline-marker {
  min-width: 200px;
  background: linear-gradient(135deg, #127698, #0d5a7a);
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.timeline-content {
  flex: 1;
}

.timeline-content h4 {
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 1.1rem;
}

.timeline-content p {
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.info-box {
  background: #e8f4fd;
  padding: 25px;
  border-radius: 10px;
  margin-top: 30px;
}

.info-box h4 {
  color: #127698;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.info-box ul {
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
}

.info-box li {
  padding: 5px 0;
  color: #555;
  padding-left: 20px;
  position: relative;
}

.info-box li:before {
  content: "✓";
  color: #127698;
  position: absolute;
  left: 0;
  font-weight: bold;
}

.children-section {
  margin: 50px 0;
}

.children-section h2 {
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 1.5rem;
}

.children-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.children-card {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 10px;
  border: 2px solid #e9ecef;
}

.children-card.highlight {
  background: #fff3e0;
  border-color: #ff9800;
}

.children-card h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.children-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.children-card li {
  padding: 6px 0;
  color: #555;
  padding-left: 20px;
  position: relative;
}

.children-card li:before {
  content: "👶";
  position: absolute;
  left: 0;
  font-size: 0.9rem;
}

.warning-box {
  background: #ffebee;
  border-left: 4px solid #f44336;
  padding: 20px;
  border-radius: 5px;
}

.warning-box h4 {
  color: #d32f2f;
  margin-bottom: 10px;
}

.warning-box p {
  color: #666;
  margin: 0;
}

.regions-section {
  margin: 50px 0;
}

.regions-section h2 {
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 1.5rem;
}

.regions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.region-card {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
}

.region-card h3 {
  color: #127698;
  margin-bottom: 15px;
  font-size: 1.2rem;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 8px;
}

.region-card p {
  color: #555;
  margin-bottom: 10px;
  line-height: 1.5;
}

.region-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.region-card li {
  padding: 5px 0;
  color: #666;
  padding-left: 20px;
  position: relative;
}

.region-card li:before {
  content: "✓";
  color: #127698;
  position: absolute;
  left: 0;
}

.emergency-section {
  margin: 50px 0;
}

.emergency-section h2 {
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 1.5rem;
}

.emergency-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.emergency-card {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 10px;
  border-left: 4px solid #e74c3c;
}

.emergency-card h3 {
  color: #c0392b;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.emergency-card ol,
.emergency-card ul {
  padding-left: 20px;
  margin: 0;
}

.emergency-card li {
  padding: 5px 0;
  color: #555;
}

.contacts-urgent {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
}

.contacts-urgent h3 {
  font-size: 1.3rem;
  margin-bottom: 15px;
}

.contacts-urgent p {
  font-size: 1.2rem;
  margin: 5px 0;
}

.documents-faq {
  margin: 50px 0;
}

.documents-faq h2 {
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 1.5rem;
  padding-bottom: 10px;
  border-bottom: 2px solid #127698;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.faq-item {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.faq-item:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.faq-item h3 {
  color: #127698;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.faq-item p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.checklist-section {
  margin: 50px 0;
  padding: 30px;
  background: #e8f6f3;
  border-radius: 15px;
}

.checklist-section h2 {
  color: #16a085;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.checklist-intro {
  background: white;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  color: #555;
}

.checklist {
  background: white;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 25px;
}

.checklist-category {
  margin-bottom: 30px;
}

.checklist-category h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.1rem;
  padding-bottom: 8px;
  border-bottom: 2px solid #e9ecef;
}

.checklist-item {
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;
}

.checklist-item:last-child {
  border-bottom: none;
}

.checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.checkbox input {
  display: none;
}

.checkmark {
  width: 24px;
  height: 24px;
  border: 2px solid #127698;
  border-radius: 4px;
  margin-right: 15px;
  position: relative;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.checkbox:hover .checkmark {
  border-color: #0d5a7a;
  background: #eefbff;
}

.checkbox input:checked + .checkmark {
  background: #127698;
  border-color: #127698;
}

.checkbox input:checked + .checkmark::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
}

.checklist-text {
  color: #2c3e50;
  font-size: 1rem;
  flex: 1;
}

.checklist-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.print-btn,
.reset-btn {
  padding: 12px 30px;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.print-btn {
  background: linear-gradient(135deg, #127698, #0d5a7a);
  color: white;
}

.print-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(18, 118, 152, 0.3);
}

.reset-btn {
  background: white;
  color: #127698;
  border: 2px solid #127698;
}

.reset-btn:hover {
  background: #f8f9fa;
}

.contacts-section {
  margin: 50px 0 30px;
}

.contacts-card {
  background: linear-gradient(135deg, #127698, #0d5a7a);
  color: white;
  padding: 50px;
  border-radius: 15px;
  text-align: center;
}

.contacts-card h2 {
  font-size: 1.8rem;
  margin-bottom: 15px;
}

.contacts-card p {
  opacity: 0.95;
  margin-bottom: 30px;
  font-size: 1.1rem;
}

.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto 30px;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 20px;
  text-align: left;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.contact-method:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.2);
}

.contact-icon {
  font-size: 2rem;
  flex-shrink: 0;
  min-width: 50px;
  display: flex;
  justify-content: center;
}

.contact-info {
  flex: 1;
}

.contact-info strong {
  display: block;
  margin-bottom: 5px;
  font-size: 1.1rem;
}

.contact-info a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
  transition: opacity 0.3s ease;
  display: block;
  margin-bottom: 5px;
}

.contact-info a:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.contact-info span {
  opacity: 0.8;
  font-size: 0.9rem;
}

.social-links {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.social-links p {
  margin-bottom: 15px;
}

.social-icons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.social-icon {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  padding: 8px 20px;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: white;
  color: #127698;
  transform: translateY(-2px);
}

.seo-outro {
  margin-top: 50px;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 10px;
  border-top: 4px solid #127698;
}

.seo-outro h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.seo-outro p {
  color: #555;
  line-height: 1.8;
  margin-bottom: 20px;
}

.seo-links {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.seo-links a {
  color: #127698;
  text-decoration: none;
  font-weight: 600;
  padding: 5px 10px;
}

.seo-links a:hover {
  text-decoration: underline;
}

@media (max-width: 992px) {
  .documents-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .timeline-item {
    flex-direction: column;
  }
  
  .timeline-marker {
    min-width: auto;
  }
  
  .contact-methods {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .documents-content {
    padding: 20px;
  }

  .info-grid,
  .children-grid,
  .regions-grid,
  .emergency-grid {
    grid-template-columns: 1fr;
  }

  .contacts-card {
    padding: 30px 20px;
  }

  .contact-method {
    flex-direction: column;
    text-align: center;
  }

  .content-navigation ul {
    flex-direction: column;
    gap: 10px;
  }

  .seo-links {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .checklist-actions {
    flex-direction: column;
  }
  
  .print-btn,
  .reset-btn {
    width: 100%;
    justify-content: center;
  }
  
  .social-icons {
    flex-direction: column;
  }
}

@media print {
  .tour-documents-page {
    background: white;
    padding: 0;
  }

  .breadcrumbs,
  .print-btn,
  .reset-btn,
  .contacts-section,
  .social-links,
  .seo-links {
    display: none;
  }

  .documents-content {
    box-shadow: none;
    padding: 0;
  }

  .checklist-item {
    page-break-inside: avoid;
  }
  
  a {
    text-decoration: none;
    color: black;
  }
}
</style>