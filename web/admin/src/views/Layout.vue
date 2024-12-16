<script setup>
import { Suspense, onErrorCaptured } from 'vue'
import { Layout } from 'ant-design-vue'
import useUserInfoStore from '@/stores/userinfo'
import { useRouter, RouterView, RouterLink } from 'vue-router'
import { ref } from 'vue'
import SelectLangs from '@/views/comps/SelectLangs.vue'
import { SettingOutlined, DashboardOutlined } from '@ant-design/icons-vue'
import SiderBar from '@/views/comps/SiderBar'
import ErrorPage from '@/views/ErrorPage'

const router = useRouter()
const userInfoStore = useUserInfoStore()
const { username, mobile } = userInfoStore.getUserInfo()
const errorState = ref(false)
const errorObj = ref({})
const errorInstance = ref({})
const errorInfo = ref('')

onErrorCaptured((error, instance, info) => {
  errorState.value = true
  errorObj.value = error
  errorInstance.value = instance
  errorInfo.value = info
  return false
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
</script>
<template>
  <Layout>
    <Layout.Header>
      <div class="title" @click="goHome">
        <div class="logo" />
        <div>Common Admin</div>
      </div>
      <div class="user-info">
        <SelectLangs />
        {{ username || mobile }}
      </div>
      &nbsp;
      <a-button type="link" @click="signOut">{{ $t('sign-out') }}</a-button>
    </Layout.Header>
    <Layout.Content class="content-wrapper">
      <SiderBar />
      <Layout.Content class="content">
        <Suspense>
          <RouterView v-if="!errorState" />
          <ErrorPage v-else :error="errorObj" :instance="errorInstance" :info="errorInfo" />
        </Suspense>
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
  height: calc(100vh - 64px);
}

// .sider {
//   height: calc(100vh - 64px);
//   flex: 0 0 210px !important;
//   max-width: 210px !important;
//   min-width: 210px !important;
//   width: 210px !important;
// }

.content {
  height: calc(100vh - 64px);
  overflow-y: scroll;
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
  padding-inline: 24px !important;
}
.user-info {
  margin-left: auto;
  display: flex;
  align-items: center;
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
