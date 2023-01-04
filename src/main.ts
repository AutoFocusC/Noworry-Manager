import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./style.css"
import "./assets/font/font.css"
import axios from 'axios'

axios.defaults.baseURL = "https://4997xs4632.goho.co/"
// axios.defaults.baseURL = "http://127.0.0.1:3000"
createApp(App).use(router).mount('#app')