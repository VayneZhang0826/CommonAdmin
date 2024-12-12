<script setup>
import { Layout } from 'ant-design-vue'
import useUserInfoStore from '@/stores/userinfo'
import { onMounted } from 'vue'
import { useRouter, RouterView } from 'vue-router'

const router = useRouter()
const userInfoStore = useUserInfoStore()
const { username, mobile } = userInfoStore.getUserInfo()

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

onMounted(() => {
  console.log('onMounted')
})
</script>

<template>
  <Layout>
    <Layout.Header>
      <div class="title" @click="goHome">
        {{ $route.meta.title }}
      </div>
      <div class="user-info">{{ username || mobile }}</div>
      &nbsp;
      <a-button type="link" @click="signOut">{{ $t('sign-out') }}</a-button>
    </Layout.Header>
    <Layout.Content class="content-wrapper">
      <Layout.Sider key="sider" theme="light" class="sider">
        <a-menu>
          <a-menu-item>
            <router-link to="/">Home</router-link>
          </a-menu-item>
        </a-menu>
      </Layout.Sider>
      <Layout.Content class="content">
        <RouterView />
      </Layout.Content>
    </Layout.Content>
  </Layout>
</template>

<style scoped>
.title {
  cursor: pointer;
}

.content-wrapper {
  display: flex;
}

.sider {
  height: calc(100vh - 56px);
}

.content {
  width: 100%;
  height: calc(100vh - 56px);
  padding: 0 24px;
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
</style>
