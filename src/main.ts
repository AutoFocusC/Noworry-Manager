import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from './local'
import "./style.css"
import "./assets/font/font.css"

createApp(App).use(router).use(i18n).mount('#app')