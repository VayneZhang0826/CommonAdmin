import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import AntDesignVue from 'ant-design-vue'
import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-cn'
import enUS from './locales/en-us'
import 'ant-design-vue/es/message/style/css'

import App from './App.vue'
import router from './router'

// 国际化
const i18n = createI18n({
    locale: 'zh-CN',
    messages: {
        'zh-CN': zhCN,
        'en-US': enUS,
    }
})

// 创建 app
const app = createApp(App)


// 使用 pinia
const pinia = createPinia()
pinia.use(() => ({
    debug: false,
}))
app.use(pinia)

// 使用 router
app.use(router)

// 使用 Ant Design Vue
app.use(AntDesignVue)

// 使用 i18n
app.use(i18n)

// 将 i18n 全局挂载到 app 上
app.mount('#app').$nextTick(() => {
    app.config.globalProperties.$t = i18n.global.t;
})
