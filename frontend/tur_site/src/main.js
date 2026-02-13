import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import App from './App.vue'
import router from './router'

import './assets/styles/main.css'

// Создаем приложение
const app = createApp(App)
const head = createHead()

// Используем head
app.use(head)
app.use(router)

// Монтируем
app.mount('#app')