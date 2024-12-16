<script setup>
import { onBeforeMount, onMounted, onErrorCaptured, Suspense, ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import ErrorPage from '@/views/ErrorPage.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const { locale } = useI18n()
const errorState = ref(false)
const errorObj = ref({})
const errorInstance = ref({})
const errorInfo = ref('')

onBeforeMount(() => {
  // 设置进度条颜色
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
})

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
  <a-config-provider :getPopupContainer="getPopupContainer">
    <Suspense>
      <RouterView v-if="!errorState" />
      <ErrorPage v-else :error="errorObj" :instance="errorInstance" :info="errorInfo" />
    </Suspense>
  </a-config-provider>
</template>

<style lang="less">
// 设置进度条颜色
#nprogress .bar {
  background: #1890ff !important;
}
</style>
