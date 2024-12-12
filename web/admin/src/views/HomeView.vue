<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
const router = useRouter()
const form = reactive({
  username: '',
  password: '',
})
const login = () => {
  if (form.username == 'admin' && form.password == 'Root123.') {
    message.success('登录成功')
    router.push('/about')
  } else {
    message.error('登录失败')
  }
}
</script>

<template>
  <main>
    <div class="ant-vue-form-login-container">
      <div class="ant-vue-form-login-title">
        <div class="ant-vue-form-login-title-text">{{ $t('common-admin') }}</div>
        <div class="ant-vue-form-login-desc">
          {{ $t('common-admin-desc') }}
        </div>
      </div>
      <div>
        <a-form :model="form" layout="vertical">
          <a-form-item :label="$t('username')">
            <a-input v-model:value="form.username" />
          </a-form-item>
          <a-form-item :label="$t('password')">
            <a-input-password v-model:value="form.password" />
          </a-form-item>
          <a-form-item>
            <a-button block type="primary" @click="login">{{ $t('login') }}</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div class="ant-vue-form-login-footer">
      <div class="ant-vue-form-login-footer-text">
        <a href="https://github.com/ant-design/ant-design-vue-3">Ant Design Vue 3</a>
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
  height: 100vh;
}
.ant-vue-form-login-container {
  display: flex;
  flex-direction: column;
  width: 500px;
  flex: 1 1 0%;
}
.ant-vue-form-login-title {
  margin-top: 60px;
  text-align: center;
}

.ant-vue-form-login-title-text {
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 20px;
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
