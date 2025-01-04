<script setup >
import { reactive, ref } from 'vue'
import { QueryTable } from '@/components/queryTable/QueryTable'
import { ModalActionComponent } from '@/components/queryTable/ModalAction'
import { DeleteActionComponent } from '@/components/queryTable/DeleteAction'
import { userColumns } from '@/components/queryTable/data'


const getPromise = function(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve()
    },3000)
  })
}
</script>
<template>
    <QueryTable :table-props="{columns:userColumns}" :actions="[
      {Component:ModalActionComponent,
        props: {
           modalProps: {
            title:'编辑用户',
            width:600,
            onOk:  ()=>{
             return  getPromise()
            }
           }
          }
        },
      DeleteActionComponent]"/>
</template>
