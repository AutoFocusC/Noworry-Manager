import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";
import "./assets/font/font.css";
import axios from "axios";
import { getCookie } from "./method/cookie";

//axios设置
axios.defaults.baseURL = "https://4997xs4632.goho.co/";
axios.interceptors.request.use(config => {
    console.log(config)
    config.headers!['token'] = getCookie('token')
    return config;
})
// axios.defaults.baseURL = "http://127.0.0.1:39443"
createApp(App).use(router).mount("#app");
