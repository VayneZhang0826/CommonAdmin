<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useI18n } from 'vue-i18n'
import { DownOutlined } from '@ant-design/icons-vue'
import IconFont from './components/icons/IconFont'

const { t, locale } = useI18n()

const changeLocale = (lang) => {
  console.log(lang)

  locale.value = lang
}

const getPopupContainer = (el, dialogContext) => {
  if (dialogContext) {
    return dialogContext.getDialogWrap()
  } else {
    return document.body
  }
}
</script>

<template>
  <a-config-provider :getPopupContainer="getPopupContainer">
    <div style="display: flex">
      <a-dropdown>
        <a class="ant-dropdown-link" style="margin-left: auto" @click.prevent>
          <IconFont style="font-size: 24px; color: blue" type="translate" />
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
    <RouterView />
  </a-config-provider>
</template>

<style scoped>
</style>
