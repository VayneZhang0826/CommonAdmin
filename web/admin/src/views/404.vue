<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleBackHome = () => {
  router.push('/overview')
}
</script>
<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button type="primary" @click="handleBackHome">{{ $t('back-home') }}</a-button>
    </template>
  </a-result>
</template>
<style>
</style>