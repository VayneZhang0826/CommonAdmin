<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Layout } from 'ant-design-vue'
import { menuRoutes } from '@/router'
import { generateMenuConfig } from '@/views/comps/SiderBar/config'

const menuConfig = generateMenuConfig(menuRoutes)
const openKeys = ref([menuConfig[0].key])
const selectedKeys = ref([menuConfig[0].children[0].key])
const router = useRouter()

onMounted(() => {
  selectedKeys.value = [router.currentRoute.value.path]
  openKeys.value = [router.currentRoute.value.path.split('/')[1]]
})

router.afterEach((to) => {
  selectedKeys.value = [to.path]
  openKeys.value = [to.path.split('/')[1]]
})

const handleClick = (e) => {
  selectedKeys.value = [e.key]
  openKeys.value = [e.keyPath[0]]
  router.push(e.key)
}
</script>
<template>
  <Layout.Sider key="sider" theme="light" class="sider">
    <AMenu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      @click="handleClick"
    >
      <ASubMenu v-for="item in menuConfig" :key="item.key.substring(1)">
        <template #icon>
          <component :is="item.icon" />
        </template>
        <template #title>{{ $t(item.title) }}</template>
        <AMenuItem v-for="child in item.children" :key="child.key">
          <ASubMenu v-if="child.children" :key="child.key">
            <template #icon>
              <component :is="child.icon" />
            </template>
            <template #title>{{ $t(child.title) }}</template>
          </ASubMenu>
          <RouterLink :to="child.key">{{ $t(child.title) }}</RouterLink>
        </AMenuItem>
      </ASubMenu>
    </AMenu>
  </Layout.Sider>
</template>
<style lang="less">
.sider {
  height: calc(100vh - 64px);
  flex: 0 0 210px !important;
  max-width: 210px !important;
  min-width: 210px !important;
  width: 210px !important;
  background: #fff;
  border-right: 1px solid #eee;
}
</style>
