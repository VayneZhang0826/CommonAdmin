<script setup >
import { reactive, ref } from 'vue'
import { SerachComponent } from '@/components/serachBar/Base'

const columns = ref([
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
])

const data = reactive([
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
])
</script>
<template>
  <ACard>
    <SerachComponent :options="{ x: '1' }" />
    <ADivider />
    <ATable :columns="columns" :data-source="data" />
  </ACard>
</template>
