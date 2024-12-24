<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'

const getElementByContent = (selector, content) => {
  const xpath = `//${selector}[contains(text(), "${content}")]`
  const result = document.evaluate(
    xpath,
    document.querySelector('.surely-table-wrapper'),
    null,
    XPathResult.ANY_TYPE,
    null
  )
  let element = null

  while ((element = result.iterateNext())) {
    return element
  }

  return null
}
onBeforeMount(() => {
  console.error = function () {}
})

onMounted(() => {
  const element = getElementByContent('div', 'Unlicensed Product')
  const el = getElementByContent('div', 'Powered by Surely Vue')
  el.innerHTML = '未授权产品'
  element?.parentNode?.removeChild(element)
})

const columns = ref([
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address 1',
    ellipsis: true,
  },
  {
    title: 'Long Column Long Column Long Column',
    dataIndex: 'address',
    key: 'address 2',
    ellipsis: true,
  },
  {
    title: 'Long Column Long Column',
    dataIndex: 'address',
    key: 'address 3',
    ellipsis: true,
  },
  {
    title: 'Long Column',
    dataIndex: 'address',
    key: 'address 4',
    ellipsis: true,
  },
])

const data = ref([
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
])
</script>
<template>
  <STable :columns="columns" :data-source="data" />
</template>
