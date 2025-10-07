<template>
  <div class="d-flex vh-100 vw-100 m-0">
        <div class="col-6 bg-success text-white d-flex align-items-center justify-content-center">
          <div class="card-body p-4 text-white">
            <h2 class="text-center mb-4">GreenGarden</h2>
            <p class="">
              Gerencie seus canteiros comunitários, acompanhe o crescimento das plantas e conecte-se com outros jardineiros
            </p>
          </div>
        </div>
        <div class="col-6 bg-white text-white d-flex align-items-center justify-content-center">
        <div class="card shadow">
          <div class="card-body p-4">
            <h2 class="text-center mb-4">Login</h2>
            
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>
            <form @submit.prevent="handleLogin">
              <FormInput
                id="email"
                v-model="form.email"
                label="Email"
                type="email"
                placeholder="seu@email.com"
                :required="true"
                :error="errors.email"
              />
              
              <FormInput
                id="password"
                v-model="form.password"
                label="Senha"
                type="password"
                placeholder="Sua senha"
                :required="true"
                :error="errors.password"
              />
              
              <button 
                type="submit" 
                class="btn btn-success w-100"
                :disabled="loading"
              >
                <span v-if="loading">Entrando...</span>
                <span v-else>Entrar</span>
              </button>
            </form>
            <div class="mt-3 text-center">
              <small class="text-muted">
                Para teste, use qualquer email/senha
              </small>
            </div>
          </div>
        </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import FormInput from '@/components/FormInput.vue'

export default {
  name: 'Login',
  components: {
    FormInput
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const form = reactive({
      email: '',
      password: ''
    })
    
    const errors = reactive({
      email: '',
      password: ''
    })
    
    const loading = ref(false)
    const errorMessage = ref('')
    
    const validateForm = () => {
      let isValid = true
      errors.email = ''
      errors.password = ''
      
      if (!form.email) {
        errors.email = 'Email é obrigatório'
        isValid = false
      }
      
      if (!form.password) {
        errors.password = 'Senha é obrigatória'
        isValid = false
      }
      
      return isValid
    }
    
    const handleLogin = async () => {
      errorMessage.value = ''
      
      if (!validateForm()) return
      
      loading.value = true
      
      // Simulação de login (remover quando tiver backend real)
      setTimeout(() => {
        localStorage.setItem('token', 'fake-token')
        localStorage.setItem('user', JSON.stringify({ nome: 'Usuário Teste' }))
        store.commit('auth/SET_TOKEN', 'fake-token')
        store.commit('auth/SET_USER', { nome: 'Usuário Teste' })
        loading.value = false
        router.push('/')
      }, 1000)
    }
    
    return {
      form,
      errors,
      loading,
      errorMessage,
      handleLogin
    }
  }
}
</script>