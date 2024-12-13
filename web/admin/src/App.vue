<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
onMounted(() => {
  locale.value = localStorage.getItem('lang') || 'zh-CN'
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
    <RouterView />
  </a-config-provider>
</template>

<style scoped>
</style>
