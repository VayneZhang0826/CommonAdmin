<script setup >
import { reactive, ref, createVNode } from 'vue'
import { Modal } from 'ant-design-vue'
import { QueryTable } from '@/components/queryTable/QueryTable'
import { userColumns } from '@/components/queryTable/data'
import Test from '@/components/queryTable/Test'
import asyncModalConfirm from '@/components/queryTable/asyncModalConfirm'

const getPromise = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 3000)
  })
}

const promise = ref()
const _resolve = ref()
const _reject = ref()

const p = () => {
  promise.value = new Promise((resolve, reject) => {
    _resolve.value = resolve
    _reject.value = reject
  })
}
const timeout = function (fn) {
  setTimeout(fn, 1000)
}
</script>
<template>
  <div>
    <!-- <Test> <div>123</div> </Test> -->
    <QueryTable :columns="userColumns"> </QueryTable>
  </div>
</template>
