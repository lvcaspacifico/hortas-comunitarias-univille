import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { guest: true }
  },
  {
    path: '/associacoes',
    name: 'AssociacoesList',
    component: () => import('@/views/Associacoes/List.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/associacoes/criar',
    name: 'AssociacoesCreate',
    component: () => import('@/views/Associacoes/Create.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/associacoes/:id/editar',
    name: 'AssociacoesEdit',
    component: () => import('@/views/Associacoes/Edit.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  }
  else if (to.meta.guest && isAuthenticated) {
    next('/')
  }
  else {
    next()
  }
})

export default router