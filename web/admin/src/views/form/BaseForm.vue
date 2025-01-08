<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { FormComponent } from '@/components/Form/Form'
const state = reactive({})

const form = ref(null)
onMounted(() => {})
const getValue = (v) => {
  form.value = v
}
const onClick = (action) => {
  switch (action) {
    case 'submit':
      form.value.getFieldsValue()
      break
    case 'reset':
      form.value.resetFields()
      break
    default:
      break
  }
}
</script>
<template>
  <div>
    <FormComponent ref="form" :getFormRef="getValue" />
    <AButton type="primary" @click="() => onClick('submit')"> Submit</AButton>
    <AButton type="primary" @click="() => onClick('reset')"> Reset</AButton>
  </div>
</template>