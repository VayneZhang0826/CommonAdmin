<script setup>
import { onMounted } from 'vue'

onMounted(() => {})

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
