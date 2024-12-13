import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import useUserInfoStore from '../stores/userinfo'


/**
 * @description 路由配置
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/overview',
      name: 'overview',
      component: () => import('../views/Layout.vue'),
      redirect: '/overview/index',
      children: [
        {
          path: 'index',
          name: 'overview-index',
          component: () => import('../views/Overview.vue'),
          meta: {
            title: 'Overview',
          }
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'match-all',
      component: () => import('../views/Layout.vue'),
      children: [
        {
          path: '/:pathMatch(.*)*',
          name: '404',
          component: () => import('../views/404.vue'),
        },
      ],
    },
  ],
})

/**
 * @description 全局前置守卫
 */
router.beforeEach((to, from, next) => {
  const userInfoStore = useUserInfoStore()
  const { username, mobile } = userInfoStore.getUserInfo()
  // 如果用户信息存在，则跳转到首页
  if (!(!username && !mobile)) {
    if (to.path === '/') {
      if (username || mobile) {
        next('/overview/index')
      } else {
        next('/login')
      }
    } else {
      if (username || mobile) {
        next()
      } else {
        next('/login')
      }
    }
  } else {
    next()
  }
})

export default router
