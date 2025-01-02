<script setup>
import {
  onBeforeMount,
  onMounted,
  onErrorCaptured,
  Suspense,
  ref,
  reactive,
  watch,
  watchEffect,
} from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { ConfigProvider } from 'ant-design-vue'
import { theme } from 'ant-design-vue'
import { useTheme } from '@/stores/theme'
import ErrorPage from '@/views/ErrorPage.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

const { locale } = useI18n()
const errorState = ref(false)
const errorObj = ref({})
const errorInstance = ref({})
const errorInfo = ref('')
const antLocale = ref(zhCN)
const themeStore = useTheme()
const { theme: _theme } = storeToRefs(themeStore)

onBeforeMount(() => {
  // 设置进度条
  NProgress.configure({
    parent: '#app',
  })
  NProgress.start()
})

onMounted(() => {
  NProgress.done()
  locale.value = localStorage.getItem('lang') || 'zh-CN'
  const resizeObserver = new ResizeObserver((entries) => {
    // 监听窗口大小变化
  })
  resizeObserver.observe(document.body)
  console.log(themeStore.theme)
})

watch(_theme, (val) => {})

onErrorCaptured((error, instance, info) => {
  errorState.value = true
  errorObj.value = error
  errorInstance.value = instance
  errorInfo.value = info
  return false
})

const getPopupContainer = (el, dialogContext) => {
  if (dialogContext) {
    return dialogContext.getDialogWrap()
  } else {
    return document.body
  }
}
</script>

<template>
  <AConfigProvider
    :getPopupContainer="getPopupContainer"
    :locale="antLocale"
    :theme="{
      algorithm: _theme === 'dark' ? theme.darkAlgorithm : theme.lightAlgorithm,
      token: {
        colorPrimary: '#00b96b',
        colorLink: '#00b96b',
      },
    }"
  >
    <Suspense>
      <RouterView v-if="!errorState" />
      <ErrorPage v-else :error="errorObj" :instance="errorInstance" :info="errorInfo" />
    </Suspense>
  </AConfigProvider>
</template>

<style lang="less">
// 设置进度条颜色
#nprogress .bar {
  background: #1890ff !important;
}
</style>
