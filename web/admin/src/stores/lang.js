import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineStore('lang', () => {
    const { t, locale } = useI18n()
    const lang = ref('zh-CN' || localStorage.getItem('lang'))

    const getLang = () => {
        return lang.value || localStorage.getItem('lang') || 'zh-CN'
    }

    const setLang = (lang) => {
        localStorage.setItem('lang', lang)
        lang = locale.value = lang
        document.title = t('common-admin')
    }

    return { lang, getLang, setLang }
})
