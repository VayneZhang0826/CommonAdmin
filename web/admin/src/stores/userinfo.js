import { defineStore } from 'pinia'
import { ref } from 'vue'

const useUserInfoStore = defineStore('userInfo', () => {
    const userInfo = ref({
        username: localStorage.getItem('username') || '',
        mobile: localStorage.getItem('mobile') || '',
    })

    const getUserInfo = () => {
        return userInfo.value
    }

    const setUserInfo = (info) => {
        userInfo.value = info
        localStorage.setItem('username', info.username)
        localStorage.setItem('mobile', info.mobile)
    }

    return { userInfo, getUserInfo, setUserInfo }
})

export default useUserInfoStore