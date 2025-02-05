<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { FormComponent } from '@/components/Form/Form'
const state = reactive({})
const initValues = reactive({
  name: '123',
  age: 12,
  role: 'admin',
})

const form = ref(null)
const items = [
  {
    type: 'input',
    label: 'Name',
    name: 'name',
    rules: [{ required: true, message: 'Please input your name' }],
  },
  {
    type: 'input',
    label: 'Age',
    name: 'age',
    rules: [{ required: true, message: 'Please input your name' }],
  },
  {
    type: 'select',
    label: 'Role',
    name: 'role',
    itemProps: {
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
    },
  },
]
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
    <FormComponent ref="form" :items="items" :getFormRef="getValue" :initValues="initValues" />
    <AButton type="primary" @click="() => onClick('submit')"> Submit</AButton>
    <AButton type="primary" @click="() => onClick('reset')"> Reset</AButton>
  </div>
</template>