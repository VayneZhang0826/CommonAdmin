<script setup >
import { reactive, ref } from 'vue'
import { QueryTable } from '@/components/queryTable/QueryTable'
import { userColumns } from '@/components/queryTable/data'


</script>
<template>
    <QueryTable :table-props="{columns:userColumns}" />
</template>
