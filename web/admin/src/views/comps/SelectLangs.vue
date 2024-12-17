<script setup>
import { ref } from 'vue'
import IconFont from '@/components/icons/IconFont'
import { useI18n } from 'vue-i18n'
import useLangStore from '@/stores/lang'

const { t, locale } = useI18n()
const langStore = useLangStore()

const changeLocale = (lang) => {
  langStore.setLang(lang)
}
</script>

<template>
  <div style="width: 100%; display: flex; justify-content: flex-end; padding-right: 20px">
    <ADropdown>
      <a class="ant-dropdown-link" style="margin-left: auto" @click.prevent>
        <IconFont type="translate" />
      </a>
      <template #overlay>
        <AMenu>
          <AMenuItem>
            <a @click="() => changeLocale('zh-CN')">🇨🇳 简体中文</a>
          </AMenuItem>
          <AMenuItem>
            <a @click="() => changeLocale('en-US')">🇺🇸 English</a>
          </AMenuItem>
        </AMenu>
      </template>
    </ADropdown>
  </div>
</template>
<style lang="less" scoped>
</style>
