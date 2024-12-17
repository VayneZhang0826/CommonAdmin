<script setup>
import { defineProps, ref, onMounted } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  style: {
    type: Object,
    default: {},
  },
  value: {
    // 如果传入对象，则表示动态值，否则表示静态值，字段：start、end、duration
    type: [String, Number, Object],
    default: 0,
  },
  precision: {
    type: Number,
    default: 2,
  },
  prefix: {
    type: String,
    default: '',
  },
  suffix: {
    type: String,
    default: '',
  },
  formatter: {
    type: Function,
    default: ({ value }) => value,
  },
  valueStyle: {
    type: Object,
    default: {},
  },
  decimalSeparator: {
    type: String,
    default: '.',
  },
  groupSeparator: {
    type: String,
    default: ',',
  },
})

const _value = ref(props.start)

onMounted(() => {
  if (typeof props.value === 'object') {
    animate(props.value.start, props.value.end, props.value.duration)
  } else {
    _value.value = props.value
  }
})

function animate(start, end, duration) {
  const startTime = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const value = start + (end - start) * progress
    _value.value = parseFloat(value).toFixed(2)
    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}
</script>
<template>
  <AStatistic v-bind="{ ...props, value: _value }" />
</template>

<style scoped>
</style>