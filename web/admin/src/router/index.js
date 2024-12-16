import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import useUserInfoStore from '../stores/userinfo'
import { DashboardOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons-vue'

const baseRoutes = [
  {
    path: '/',
    name: 'home',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
]

// 路由配置
const menuRoutes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Layout.vue'),
    redirect: '/dashboard/overview',
    meta: {
      title: 'dashboard',
      icon: DashboardOutlined,
    },
    children: [
      {
        path: '/dashboard/overview',
        name: 'dashboard-overview',
        component: () => import('../views/Overview.vue'),
        meta: {
          title: 'overview',
        }
      },
    ],
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('../views/Layout.vue'),
    redirect: '/personal/profile',
    meta: {
      title: 'personal',
      icon: UserOutlined,
    },
    children: [
      {
        path: '/personal/profile',
        name: 'personal-profile',
        component: () => import('../views/Profile.vue'),
        meta: {
          title: 'profile',
        }
      },
    ],
  },
]


/**
 * @description 路由配置
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...baseRoutes,
    ...menuRoutes,
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
  console.log('to', to)
  console.log('from', from)
  const userInfoStore = useUserInfoStore()
  const { username, mobile } = userInfoStore.getUserInfo()
  // 如果用户信息不存在，则跳转到登录页
  if (to.path === '/' || to.path === '/login') {
    if (!username && !mobile && to.path !== '/login') {
      next('/login')
    } else {
      if (username || mobile) {
        next('/dashboard/overview')
      } else if (to.path === '/login') {
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
export { menuRoutes }
