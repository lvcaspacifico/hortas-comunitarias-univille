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
    path: '/hortas',
    name: 'HortasList',
    component: () => import('@/views/Hortas/List.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/canteiros',
    name: 'CanteirosList',
    component: () => import('@/views/Canteiros/List.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/associacoes/criar',
    name: 'AssociacoesCreate',
    component: () => import('@/views/Associacoes/Create.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/hortas/criar',
    name: 'HortasCreate',
    component: () => import('@/views/Hortas/Create.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/canteiros/criar',
    name: 'CanteirosCreate',
    component: () => import('@/views/Canteiros/Create.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/associacoes/:id/editar',
    name: 'AssociacoesEdit',
    component: () => import('@/views/Associacoes/Edit.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/hortas/:id/editar',
    name: 'HortasEdit',
    component: () => import('@/views/Hortas/Edit.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/carteiristas',
    name: 'CarteiristasList',
    component: () => import('@/views/Carteiristas/List.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/carteiristas/criar',
    name: 'CarteiristasCreate',
    component: () => import('@/views/Carteiristas/Create.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/carteiristas/:id/editar',
    name: 'CarteiristasEdit',
    component: () => import('@/views/Carteiristas/Edit.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/pagamentos',
    name: 'PagamentosList',
    component: () => import('@/views/Pagamentos/List.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/dependentes',
    name: 'DependentesList',
    component: () => import('@/views/Dependentes/List.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/dependentes/criar',
    name: 'DependentesCreate',
    component: () => import('@/views/Dependentes/Create.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/dependentes/:id/editar',
    name: 'DependentesEdit',
    component: () => import('@/views/Dependentes/Edit.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/notificacoes',
    name: 'NotificacoesList',
    component: () => import('@/views/Notificacoes/List.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/canteiros/:id/editar',
    name: 'CanteirosEdit',
    component: () => import('@/views/Canteiros/Edit.vue'),
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
  } else if (to.meta.guest && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
