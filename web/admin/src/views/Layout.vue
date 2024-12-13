<script setup>
import { Layout } from 'ant-design-vue'
import { SettingOutlined, DashboardOutlined } from '@ant-design/icons-vue'
import useUserInfoStore from '@/stores/userinfo'
import { useRouter, RouterView, RouterLink } from 'vue-router'
import { ref } from 'vue'

const openKeys = ref(['dashboard'])
const selectedKeys = ref(['/overview/index'])
const router = useRouter()
const userInfoStore = useUserInfoStore()
const { username, mobile } = userInfoStore.getUserInfo()

router.afterEach((to) => {
  selectedKeys.value = [to.path]
})

const signOut = () => {
  userInfoStore.setUserInfo({
    username: '',
    mobile: '',
  })
  router.push('/login')
}

const goHome = () => {
  router.push('/')
}

const handleClick = (e) => {
  console.log('e', e)
  selectedKeys.value = [e.key]
  openKeys.value = [e.keyPath[0]]
  router.push(e.key)
}
</script>
<template>
  <Layout>
    <Layout.Header>
      <div class="title" @click="goHome">
        <div class="logo" />
        <div>Common Admin</div>
      </div>
      <div class="user-info">{{ username || mobile }}</div>
      &nbsp;
      <a-button type="link" @click="signOut">{{ $t('sign-out') }}</a-button>
    </Layout.Header>
    <Layout.Content class="content-wrapper">
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
            <template #title>Dashboard</template>
            <a-menu-item key="/overview/index">
              <RouterLink to="/overview/index">Overview</RouterLink>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <template #icon>
              <SettingOutlined />
            </template>
            <template #title>Navigation Three</template>
            <a-menu-item key="9">Option 9</a-menu-item>
            <a-menu-item key="10">Option 10</a-menu-item>
            <a-menu-item key="11">Option 11</a-menu-item>
            <a-menu-item key="12">Option 12</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </Layout.Sider>
      <Layout.Content class="content">
        <RouterView />
      </Layout.Content>
    </Layout.Content>
  </Layout>
</template>

<style lang="less">
.title {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  .logo {
    width: 32px;
    height: 32px;
    margin-right: 8px;
    background-image: url('https://preview.pro.ant.design/logo.svg');
    background-position: center;
    background-size: contain;
  }
}

.content-wrapper {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 56px);
}

.sider {
  height: calc(100vh - 56px);
}

.content {
  padding: 24px;
}

.ant-layout-header {
  color: #000;
  background: transparent;
  display: flex;
  align-items: center;
  margin-block: 0;
  height: 56px;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
}
.user-info {
  margin-left: auto;
}
:where(.css-dev-only-do-not-override-1p3hq3p).ant-layout.ant-layout-has-sider {
  flex-direction: column;
}
:where(.css-dev-only-do-not-override-1p3hq3p).ant-layout.ant-layout-has-sider > .ant-layout,
:where(.css-dev-only-do-not-override-1p3hq3p).ant-layout.ant-layout-has-sider
  > .ant-layout-content {
  width: 100%;
}
:where(.css-dev-only-do-not-override-1p3hq3p).ant-layout .ant-layout-sider-children {
  height: 100%;
}
.ant-layout-header {
  background-color: #fff !important;
}
</style>
