import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


/**
 * @description 路由配置
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

/**
 * @description 全局前置守卫
 */
router.beforeEach((to, from, next) => {
  console.log('to', to)
  console.log('from', from)
  next()
})

export default router
