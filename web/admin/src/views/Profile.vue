<script setup>
import useUserInfoStore from '@/stores/userinfo'
const userInfoStore = useUserInfoStore()
const { username, mobile } = userInfoStore.getUserInfo()
</script>
<template>
  <div>
    <div>
      <span>{{ $t('username') }}:</span>
      <span>{{ username }}</span>
    </div>
    <div>
      <span>{{ $t('mobile') }}:</span>
      <span>{{ mobile || '-' }}</span>
    </div>
  </div>
</template>
<style lang="less"></style>
