<template>
  <div class="login-root d-flex vh-100 vw-100 m-0">
    <div class="left-panel d-none d-md-flex align-items-center justify-content-center">
      <div class="text-center text-white px-4">
        <div class="logo-circle mb-4">
          <i class="fa fa-leaf fa-2x"></i>
        </div>
        <h2 class="mb-3">GreenGarden</h2>
        <p class="lead">Gerencie seus canteiros comunitários, acompanhe o crescimento das plantas e conecte-se com outros jardineiros</p>
      </div>
    </div>

    <div class="right-panel d-flex align-items-center justify-content-center w-100">
      <div class="card login-card shadow rounded-4" style="min-width:380px; max-width:520px;">
        <div class="card-body p-4">
          <h3 class="text-center mb-3">Bem-vindo de volta</h3>
          <p class="text-center text-muted mb-4">Entre na sua conta para continuar</p>

          <div class="role-toggle d-flex justify-content-center mb-3">
            <button :class="['btn', selectedRole==='canteirista' ? 'btn-light active' : 'btn-outline-secondary']" @click="selectedRole='canteirista'">Canteirista</button>
            <button :class="['btn', selectedRole==='admin' ? 'btn-light active' : 'btn-outline-secondary']" @click="selectedRole='admin'">Administrador</button>
          </div>

          <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>

          <form @submit.prevent="handleLogin">
            <FormInput id="email" v-model="form.email" label="Email" type="email" placeholder="seu@email.com" :required="true" :error="errors.email" />

            <FormInput id="password" v-model="form.password" label="Senha" type="password" placeholder="Sua senha" :required="true" :error="errors.password" />

            <button
              type="submit"
              :class="['w-100 mt-3 login-cta', selectedRole === 'admin' ? 'cta-admin' : 'cta-canteirista']"
              :disabled="loading"
            >
              <span v-if="loading">Entrando...</span>
              <span v-else>{{ selectedRole === 'admin' ? 'Entrar como Administrador' : 'Entrar como Canteirista' }}</span>
            </button>
          </form>

          <div class="mt-3 text-center">
            <a href="#" class="text-success small">Esqueceu sua senha?</a>
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
  const selectedRole = ref('canteirista')
    
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
      
      try {
        // Chamar a action de login do Vuex
        const result = await store.dispatch('auth/login', {
          email: form.email,
          senha: form.password
        })
        
        if (result.success) {
          // Login bem-sucedido, redirecionar para home
          router.push('/')
        } else {
          // Login falhou, mostrar mensagem de erro
          errorMessage.value = result.message || 'Erro ao fazer login'
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error)
        errorMessage.value = 'Erro ao conectar com o servidor. Verifique se o backend está rodando.'
      } finally {
        loading.value = false
      }
    }
    
    return {
      form,
      errors,
      loading,
      errorMessage,
      selectedRole,
      handleLogin
    }
  }
}

</script>

<style scoped>
.left-panel { flex: 0 0 50%; background: linear-gradient(135deg,#00c853 0%,#00a152 100%); }
.logo-circle { width:96px; height:96px; border-radius:50%; background: rgba(255,255,255,0.08); display:flex; align-items:center; justify-content:center; margin:0 auto; }
.logo-circle .fa { color: rgba(255,255,255,0.95); font-size:28px; }
.right-panel { flex: 1; padding: 20px; }
.login-card { border-radius: 16px; }
.login-card .card-body { padding: 32px; }
.login-card .form-control { height: 56px; padding: 10px 16px; font-size: 16px; border-radius: 10px; }
.login-card .form-label { font-weight: 600; }
.role-toggle { background:#f1f3f5; padding:4px; border-radius:999px; display:inline-flex; gap:4px; }
.role-toggle .btn { border-radius: 999px; min-width:160px; border: none; }
.role-toggle .btn.btn-outline-secondary { background: transparent; }
.role-toggle .btn.active { background: #ffffff; box-shadow: 0 2px 6px rgba(16,24,40,0.04); }
.role-toggle .btn:focus { box-shadow: none; }

/* slightly larger heading */
.login-card h3 { font-size: 20px; font-weight: 700; }

/* admin button color tweak to match the design (blue) */
.btn-primary { background-color: #2563eb !important; border-color: #2563eb !important; }

/* Big rounded CTA matching design */
.login-cta {
  height: 56px;
  border-radius: 12px;
  font-weight: 700;
  color: #ffffff !important;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(16,24,40,0.08);
  border: none !important;
}

.cta-canteirista { background-color: #0f9d58; }
.cta-canteirista:hover { background-color: #0e8f4e; }
.cta-canteirista:active { background-color: #0c7e42; }

.cta-admin { background-color: #2563eb; }
.cta-admin:hover { background-color: #1f54d1; }
.cta-admin:active { background-color: #1a44b8; }

.login-cta:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}

</style>