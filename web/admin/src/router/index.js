import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


/**
 * @description 路由配置
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/overview',
      name: 'overview',
      component: () => import('../views/Layout.vue'),
      children: [
        {
          path: 'index',
          name: 'overview-index',
          component: () => import('../views/AboutView.vue'),
          meta: {
            title: 'Overview',
          }
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login',
    }
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
