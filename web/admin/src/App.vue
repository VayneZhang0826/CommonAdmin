<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

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
