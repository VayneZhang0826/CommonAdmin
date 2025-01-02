import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTheme = defineStore('theme', () => {
    const theme = ref('light')

    /**
     * 
     * @param {'light' | 'dark'} t 
     */
    const setTheme = (t) => {
        theme.value = t
        document.querySelector('html').setAttribute('data-theme', t)
        document.querySelector('html').setAttribute('data-surely-table-theme', t)
    }
    return { theme, setTheme }
})