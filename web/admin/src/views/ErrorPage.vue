<script setup>
const props = defineProps({
  error: {
    type: Object,
    default: {},
  },
  instance: {
    type: Object,
    default: {},
  },
  info: {
    type: String,
    default: '',
  },
})

if (import.meta.env.DEV) {
  console.error('error', props.error)
}
</script>
<template>
  <div>
    <h1>error</h1>
    <AAlert message="Error" type="error" show-icon>
      <template #icon><IconFont type="smile-outlined" /></template>
      <template #description>
        <pre>{{ error.stack }}</pre>
      </template>
    </AAlert>
  </div>
</template>

<style scoped>
div {
  color: red;
}
</style>
