import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

const messages = {
    en,
    zh,
}
const language = ('zh' || navigator.language).toLocaleLowerCase() // 获取浏览器语言缓存
export const i18n = createI18n({
    locale: localStorage.getItem('lang') || language.split('-')[0] || 'en', // 默认语言语言，
    fallbackLocale: 'zh', // 备用语言
    messages,
})