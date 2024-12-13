<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Layout } from 'ant-design-vue'
import { DashboardOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons-vue'

const openKeys = ref(['dashboard'])
const selectedKeys = ref(['/dashboard/overview'])
const router = useRouter()

onMounted(() => {
  selectedKeys.value = [router.currentRoute.value.path]
  openKeys.value = [router.currentRoute.value.path.split('/')[1]]
})

router.afterEach((to) => {
  selectedKeys.value = [to.path]
})

const handleClick = (e) => {
  selectedKeys.value = [e.key]
  openKeys.value = [e.keyPath[0]]
  router.push(e.key)
}

const collapsed = ref(false)
</script>
<template>
  <Layout.Sider key="sider" theme="light" class="sider">
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      @click="handleClick"
    >
      <a-sub-menu key="dashboard">
        <template #icon>
          <DashboardOutlined />
        </template>
        <template #title>{{ $t('dashboard') }}</template>
        <a-menu-item key="/dashboard/overview">
          <RouterLink to="/dashboard/overview">{{ $t('overview') }}</RouterLink>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="personal">
        <template #icon>
          <UserOutlined />
        </template>
        <template #title>{{ $t('personal') }}</template>
        <a-menu-item key="/personal/profile">
          <RouterLink to="/personal/profile">{{ $t('profile') }}</RouterLink>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
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
}
</style>
