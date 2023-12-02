/*
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/login',
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
  history: createWebHashHistory(),
  routes,
})

export default router
*/
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;