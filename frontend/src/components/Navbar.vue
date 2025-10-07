<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-success">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        🌱 Hortas Comunitárias
      </router-link>
      
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/associacoes" class="nav-link">Associações</router-link>
          </li>
        </ul>
        
        <div v-if="isAuthenticated" class="d-flex align-items-center">
          <span class="text-white me-3">
            Olá, {{ currentUser?.nome || 'Usuário' }}
          </span>
          <button @click="handleLogout" class="btn btn-outline-light btn-sm">
            Sair
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Navbar',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
    const currentUser = computed(() => store.getters['auth/currentUser'])
    
    const handleLogout = () => {
      store.dispatch('auth/logout')
      router.push('/login')
    }
    
    return {
      isAuthenticated,
      currentUser,
      handleLogout
    }
  }
}
</script>