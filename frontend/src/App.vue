<template>
  <div id="app">
    <Navbar v-if="isAuthenticated" />
    
    <main>
      <router-view />
    </main>
    
    <footer v-if="isAuthenticated" class="mt-5 py-3 bg-light text-center">
      <div class="container">
        <p class="text-muted mb-0">
          © 2025 Sistema de Gestão de Hortas Comunitárias
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  setup() {
    const store = useStore()
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
    
    return {
      isAuthenticated
    }
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>