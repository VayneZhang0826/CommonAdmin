<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import IconFont from '@/components/icons/IconFont'
import useUserInfoStore from '@/stores/userinfo'

const { t, locale } = useI18n()
const { setUserInfo } = useUserInfoStore()

const changeLocale = (lang) => {
  locale.value = lang
  document.title = t('common-admin')
}
const router = useRouter()
const form = reactive({
  username: '',
  mobile: '',
  password: '',
})
const activeKey = ref('account')
const login = () => {
  if (activeKey.value == 'account' && form.username == 'admin' && form.password == 'Root123.') {
    message.success('登录成功')
    setUserInfo({
      username: 'admin',
    })
    router.push('/overview/index')
  } else if (
    activeKey.value == 'mobile' &&
    form.mobile == '18312345678' &&
    form.password == 'Root123.'
  ) {
    setUserInfo({
      mobile: '18312345678',
    })
    message.success('登录成功')
    router.push('/overview/index')
  } else {
    message.error('登录失败')
  }
}
</script>

<template>
  <div class="home">
    <div style="width: 100%; display: flex; justify-content: flex-end; padding-right: 100px">
      <a-dropdown>
        <a class="ant-dropdown-link" style="margin-left: auto" @click.prevent>
          <IconFont type="translate" />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a @click="() => changeLocale('zh-CN')">简体中文</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="() => changeLocale('en-US')">English</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <div class="ant-vue-form-login-container">
      <div class="ant-vue-form-login-title">
        <div class="ant-vue-form-login-title-logo-text">
          <div class="ant-vue-form-login-title-logo" />
          <div class="ant-vue-form-login-title-text">{{ $t('common-admin') }}</div>
        </div>
        <div class="ant-vue-form-login-desc">
          {{ $t('common-admin-desc') }}
        </div>
      </div>
      <div class="ant-vue-form-login-content">
        <a-tabs v-model:activeKey="activeKey" :tabBarStyle="{ margin: '0 auto' }">
          <a-tab-pane key="account" :tab="$t('account-password-login')">
            <a-form :model="form" layout="vertical">
              <a-form-item :label="$t('username')">
                <a-input v-model:value="form.username" />
              </a-form-item>
              <a-form-item v-if="activeKey == 'mobile'" :label="$t('mobile')">
                <a-input v-model:value="form.mobile" />
              </a-form-item>
              <a-form-item :label="$t('password')">
                <a-input-password v-model:value="form.password" />
              </a-form-item>
              <a-form-item>
                <a-button block type="primary" @click="login">{{ $t('login') }}</a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="mobile" :tab="$t('mobile-password-login')">
            <a-form :model="form" layout="vertical">
              <a-form-item :label="$t('mobile')">
                <a-input v-model:value="form.mobile" />
              </a-form-item>
              <a-form-item :label="$t('password')">
                <a-input-password v-model:value="form.password" />
              </a-form-item>
              <a-form-item>
                <a-button block type="primary" @click="login">{{ $t('login') }}</a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div class="ant-vue-form-login-footer">
      <div class="ant-vue-form-login-footer-text">
        <a target="_blank" href="https://github.com/ant-design/ant-design-vue-3"
          >Ant Design Vue 3</a
        >
        <div>{{ $t('copyright') }}</div>
      </div>
    </div>
  </div>
</template>

<style >
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  height: calc(100vh - 33px);
}
.ant-vue-form-login-title-logo-text {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ant-vue-form-login-title-logo {
  background-image: url('https://preview.pro.ant.design/logo.svg');
  background-size: 100% 100%;
  width: 60px;
  height: 60px;
  margin-right: 10px;
}
.ant-vue-form-login-container {
  display: flex;
  flex-direction: column;
  width: 500px;
  flex: 1 1 0%;
}
.ant-vue-form-login-content {
  margin-top: 20px;
}
.ant-vue-form-login-title {
  margin-top: 60px;
  text-align: center;
}

.ant-vue-form-login-title-text {
  font-size: 48px;
  font-weight: 600;
}

.ant-vue-form-login-desc {
  margin-block-start: 12px;
  margin-block-end: 40px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
}
.ant-vue-form-login-footer {
  text-align: center;
  margin-bottom: 24px;
}
</style>
