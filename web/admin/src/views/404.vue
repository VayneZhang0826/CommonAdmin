<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleBackHome = () => {
  router.push('/overview')
}
</script>
<template>
  <AResult status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <AButton type="primary" @click="handleBackHome">{{ $t('back-home') }}</AButton>
    </template>
  </AResult>
</template>
<style>
</style>