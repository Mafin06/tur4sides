import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Volunteer from "@/views/Volunteer.vue";
import FAQ from "@/views/FAQ.vue";
import About from "@/views/About.vue";
// import Tourpage from "@/views/Tourpage.vue";
// SEO-страницы
import ToursRussia from "../views/seo/ToursRussia.vue";
import ToursBashkiria from "../views/seo/ToursBashkiria.vue";
import GastronomicTours from "../views/seo/GastronomicTours.vue";
import FamilyTours from "../views/seo/FamilyTours.vue";
import TourDocuments from "../views/seo/TourDocuments.vue";

// Страница 404
import NotFound from "@/views/NotFound.vue";

// router/index.js - добавить новые маршруты - помощь
import HelpTourOperator from "../views/seo/HelpTourOperator.vue";
import HelpHotels from "../views/seo/HelpHotels.vue";
import HelpLuggage from "../views/seo/HelpLuggage.vue";
import HelpPacking from "../views/seo/HelpPacking.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Туры по России 2026 - туроператор TUR-4-SIDES",
      description:
        "Каталог всех туров по России: южное, северное, восточное направление, центр России. Фильтры по цене, дате, типу тура.",
    },
  },
  // {
  //   path: "/tour",
  //   name: "Tourpage",
  //   component: () => import("@/views/Tourpage.vue"),
  //   // props: true // это позволит передавать параметры как propsы
  //   meta: {
  //     title: "Тур - TUR-4-SIDES",
  //     description: "Подробная информация о туре. Бронирование онлайн.",
  //   },
  // },
  {
    path: '/tour/:id',
    name: 'Tourpage',
    component: () => import('@/views/Tourpage.vue'),  // Используйте динамический импорт
    props: true,
    meta: {
      title: 'Тур | TUR-4-SIDES',
      description: 'Подробная информация о туре'
    }
  },
  {
    path: "/tours-:direction",
    name: "DirectionPage",
    component: () => import("@/views/seo/ToursBashkiria.vue"),
    //в будущем другие направления будут а пока только башкирия (даже при алтае и т д)
    props: true,
    meta: {
      title: "Туры по направлению | TUR-4-SIDES",
      description: "Туры по выбранному направлению"
    }
  },
  {
    path: "/volunteer",
    name: "Volunteer",
    component: Volunteer,
  },
  {
    path: "/faq",
    name: "FAQ",
    component: FAQ,
    meta: {
      title: "Часто задаваемые вопросы о турах",
      description:
        "Ответы на популярные вопросы о бронировании, оплате, документах и организации туров.",
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      title: "О нас - турагентство TUR-4-SIDES",
      description:
        "Более 10 лет создаем незабываемые путешествия. Наша история, команда, ценности и достижения.",
    },
  },
  // SEO-страницы
  {
    path: "/tours-russia",
    name: "ToursRussia",
    component: ToursRussia,
    meta: {
      title:
        "Туры по России 2026 - лучшие цены от туроператора TUR-4-SIDES",
      description:
        "Забронируйте туры по России 2026 по лучшим ценам. Авторские, экскурсионные, гастрономические туры по всем регионам России.",
    },
  },
  {
    path: "/tours-bashkiria",
    name: "ToursBashkiria",
    component: ToursBashkiria,
    meta: {
      title: "Туры по Башкирии 2026 из Уфы - цены от 3500 руб.",
      description:
        "Туры по Башкирии из Уфы: термальные источники Стерлитамака, восхождения на Иремель, гастрономические экскурсии. Лучшие цены на отдых в Башкортостане.",
    },
  },
  {
    path: "/gastronomic-tours",
    name: "GastronomicTours",
    component: GastronomicTours,
    meta: {
      title:
        "Гастрономические туры по России 2026 - кулинарные путешествия",
      description:
        "Гастрономические туры по России: дегустации, мастер-классы, экскурсии на производства. Башкирский мед, кавказский шашлык, камчатские морепродукты.",
    },
  },
  {
    path: "/family-tours",
    name: "FamilyTours",
    component: FamilyTours,
    meta: {
      title: "Туры для всей семьи 2026 - семейный отдых в России",
      description:
        "Семейные туры по России: отдых с детьми в Сочи, Крыму, Башкирии. Специальные программы для детей, семейные номера, детское меню.",
    },
  },
  {
    path: "/tour-documents",
    name: "TourDocuments",
    component: TourDocuments,
    meta: {
      title: "Документы для тура - что нужно для оформления и получения",
      description:
        "Полный список документов для оформления тура: какие документы нужны для бронирования, что выдает туроператор, чек-лист перед поездкой.",
    },
  },
  // Новые страницы помощи
  {
    path: "/help-tour-operator",
    name: "HelpTourOperator",
    component: HelpTourOperator,
    meta: {
      title: "Как выбрать туроператора - советы от TUR-4-SIDES",
      description:
        "Руководство по выбору надежного туроператора: на что обращать внимание, критерии оценки, проверка лицензий и отзывов.",
    },
  },
  {
    path: "/help-hotels",
    name: "HelpHotels",
    component: HelpHotels,
    meta: {
      title: "Как выбрать отель или гостиницу - советы туристам",
      description:
        "Полное руководство по выбору отеля: категории отелей, расположение, питание, удобства, отзывы и сравнение цен.",
    },
  },
  {
    path: "/help-luggage",
    name: "HelpLuggage",
    component: HelpLuggage,
    meta: {
      title: "Как правильно собрать багаж в путешествие - чек-лист",
      description:
        "Пошаговая инструкция по сбору багажа: что взять в ручную кладь, как упаковать вещи, ограничения по весу и габаритам.",
    },
  },
  {
    path: "/help-packing",
    name: "HelpPacking",
    component: HelpPacking,
    meta: {
      title: "Что взять с собой в поездку - полный список вещей",
      description:
        "Исчерпывающий список вещей для путешествия: одежда, документы, лекарства, электроника, личные вещи для разных типов поездок.",
    },
  },
  // Страница 404 - должна быть последней
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "Страница не найдена (404) - туроператор TUR-4-SIDES",
      description: "Страница не найдена. Перейдите на главную страницу или выберите тур из нашего каталога.",
      robots: "noindex, follow"
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Если есть сохраненная позиция (при нажатии "назад")
    if (savedPosition) {
      return savedPosition
    }
    
    // Для якорей (если в URL есть #)
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    
    // По умолчанию скроллим наверх
    return { top: 0, behavior: 'smooth' }
  }
});

router.beforeEach((to, from, next) => {
  // Устанавливаем title страницы
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  // Обновляем meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && to.meta.description) {
    metaDescription.setAttribute("content", to.meta.description);
  }

  // Обновляем meta robots для 404
  const metaRobots = document.querySelector('meta[name="robots"]');
  if (metaRobots && to.meta.robots) {
    metaRobots.setAttribute("content", to.meta.robots);
  }

  // Добавляем structured data для поисковых систем
  addStructuredData(to);

  next();
});

function addStructuredData(route) {
  // Удаляем старые structured data
  const oldScript = document.querySelector(
    'script[type="application/ld+json"]',
  );
  if (oldScript) {
    oldScript.remove();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "TUR-4-SIDES",
    url: window.location.origin,
    logo: `${window.location.origin}/logo.png`,
    description: "Туры по России от прямого организатора",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Москва",
      streetAddress: "ул. Примерная, д. 10",
      postalCode: "123456",
    },
    telephone: "+7-495-123-45-67",
    openingHours: "Mo-Fr 09:00-20:00, Sa 10:00-18:00",
    priceRange: "₽₽",
    sameAs: ["https://vk.com/tur4sides", "https://instagram.com/tur4sides"],
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.text = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

export default router;
