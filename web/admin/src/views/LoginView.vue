<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import useUserInfoStore from '@/stores/userinfo'
import SelectLangs from '@/views/comps/SelectLangs.vue'

const userInfoStore = useUserInfoStore()
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
    userInfoStore.setUserInfo({
      username: 'admin',
      mobile: '',
    })
    router.push('/dashboard/overview')
  } else if (
    activeKey.value == 'mobile' &&
    form.mobile == '18312345678' &&
    form.password == 'Root123.'
  ) {
    userInfoStore.setUserInfo({
      mobile: '18312345678',
      username: '',
    })
    message.success('登录成功')
    router.push('/dashboard/overview')
  } else {
    message.error('登录失败')
  }
}
</script>

<template>
  <main>
    <SelectLangs />
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
        <ATabs v-model:activeKey="activeKey" :tabBarStyle="{ margin: '0 auto' }">
          <ATabPane key="account" :tab="$t('account-password-login')">
            <AForm :model="form" layout="vertical">
              <AFormItem :label="$t('username')">
                <AInput v-model:value="form.username" />
              </AFormItem>
              <AFormItem v-if="activeKey == 'mobile'" :label="$t('mobile')">
                <AInput v-model:value="form.mobile" />
              </AFormItem>
              <AFormItem :label="$t('password')">
                <AInputPassword v-model:value="form.password" />
              </AFormItem>
              <AFormItem>
                <AButton block type="primary" @click="login">{{ $t('login') }}</AButton>
              </AFormItem>
            </AForm>
          </ATabPane>
          <ATabPane key="mobile" :tab="$t('mobile-password-login')">
            <AForm :model="form" layout="vertical">
              <AFormItem :label="$t('mobile')">
                <AInput v-model:value="form.mobile" />
              </AFormItem>
              <AFormItem :label="$t('password')">
                <a-input-password v-model:value="form.password" />
              </AFormItem>
              <AFormItem>
                <AButton block type="primary" @click="login">{{ $t('login') }}</AButton>
              </AFormItem>
            </AForm>
          </ATabPane>
        </ATabs>
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
  </main>
</template>

<style scoped>
main {
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
