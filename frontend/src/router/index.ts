// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
      {
        path: '/transactions',
        name: 'Transactions',
        component: () => import('@/views/Transactions.vue'),
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/UserProfile.vue'),
      },
      {
        path: '/addtransaction',
        name: 'AddTransaction',
        component: () => import('@/views/AddTransaction.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
