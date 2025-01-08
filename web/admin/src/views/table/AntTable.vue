<script setup >
import { reactive, ref } from 'vue'
import { Modal } from 'ant-design-vue'
import { QueryTable } from '@/components/queryTable/QueryTable'
import { ModalActionComponent } from '@/components/queryTable/ModalAction'
import { ButtonActionComponent } from '@/components/queryTable/ButtonAction'
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
    <QueryTable
      :table-props="{ columns: userColumns }"
      :actions="[
        {
          Component: ModalActionComponent,
          props: {
            modalProps: {
              title: '编辑用户',
              width: 600,
              onOk: () => {
                return getPromise()
              },
            },
          },
        },
        {
          Component: ButtonActionComponent,
          props: {
            buttonProps: {
              type: 'dashed',
              danger: true,
              onClick: () => {
                return asyncModalConfirm({
                  title: '删除用户',
                  content: '确定删除该用户吗？',
                  onOk: () => {
                    return getPromise()
                  },
                })
              },
            },
          },
        },
      ]"
    >
      <template #dog>
        <ModalActionComponent />
      </template>
    </QueryTable>
  </div>
</template>
