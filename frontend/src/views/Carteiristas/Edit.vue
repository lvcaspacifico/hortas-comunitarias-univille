<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-8 mx-auto">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="mb-4">Editar Carteirista</h2>
            
            <div v-if="isLoading" class="text-center py-5">
              <div class="spinner-border text-success"></div>
            </div>
            
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>
            
            <form v-else @submit.prevent="handleSubmit">
              <FormInput
                id="nome"
                v-model="form.nome"
                label="Nome"
                placeholder="Nome completo"
                :required="true"
                :error="errors.nome"
              />
              
              <div class="mb-3">
                <label for="telefone" class="form-label">Telefone <span class="text-danger">*</span></label>
                <input
                  id="telefone"
                  v-model="form.telefone"
                  type="tel"
                  class="form-control"
                  :class="{ 'is-invalid': errors.telefone }"
                  placeholder="(00) 00000-0000"
                  @input="formatTelefone"
                  maxlength="15"
                  required
                />
                <div v-if="errors.telefone" class="invalid-feedback">
                  {{ errors.telefone }}
                </div>
              </div>
              
              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-success" :disabled="loading">
                  <span v-if="loading">Salvando...</span>
                  <span v-else>Salvar</span>
                </button>
                <router-link to="/carteiristas" class="btn btn-secondary">
                  Cancelar
                </router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import FormInput from '@/components/FormInput.vue'

export default {
  name: 'CarteiristasEdit',
  components: { FormInput },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    
    const form = reactive({
      nome: '',
      telefone: ''
    })
    
    const errors = reactive({
      nome: '',
      telefone: ''
    })
    
    const loading = ref(false)
    const errorMessage = ref('')
    const isLoading = computed(() => store.getters['carteiristas/isLoading'])
    
    const validateForm = () => {
      let isValid = true
      errors.nome = ''
      errors.telefone = ''
      
      if (!form.nome || form.nome.trim() === '') {
        errors.nome = 'Nome é obrigatório'
        isValid = false
      } else if (form.nome.length < 3) {
        errors.nome = 'Nome deve ter no mínimo 3 caracteres'
        isValid = false
      }
      
      if (!form.telefone || form.telefone.trim() === '') {
        errors.telefone = 'Telefone é obrigatório'
        isValid = false
      } else {
        const phoneNumbers = form.telefone.replace(/\D/g, '')
        if (phoneNumbers.length !== 11) {
          errors.telefone = 'Telefone deve ter DDD (2 dígitos) + 9 dígitos'
          isValid = false
        } else if (phoneNumbers[0] === '0' || phoneNumbers[2] !== '9') {
          errors.telefone = 'DDD inválido ou número não é celular'
          isValid = false
        }
      }
      
      return isValid
    }
    
    const formatTelefone = (event) => {
      let value = event.target.value.replace(/\D/g, '').substring(0, 11)
      if (value.length > 0) {
        if (value.length <= 2) {
          value = `(${value}`
        } else if (value.length <= 7) {
          value = `(${value.substring(0, 2)}) ${value.substring(2)}`
        } else {
          value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`
        }
      }
      form.telefone = value
    }
    
    onMounted(async () => {
      const id = route.params.id
      await store.dispatch('carteiristas/fetchCarteirista', id)
      const c = store.state.carteiristas.currentCarteirista
      
      if (c) {
        form.nome = c.nome || ''
        form.telefone = c.telefone || ''
        
        // Format phone if it exists
        if (form.telefone) {
          const phoneNumbers = form.telefone.replace(/\D/g, '').substring(0, 11)
          if (phoneNumbers.length > 0) {
            if (phoneNumbers.length <= 2) {
              form.telefone = `(${phoneNumbers}`
            } else if (phoneNumbers.length <= 7) {
              form.telefone = `(${phoneNumbers.substring(0, 2)}) ${phoneNumbers.substring(2)}`
            } else {
              form.telefone = `(${phoneNumbers.substring(0, 2)}) ${phoneNumbers.substring(2, 7)}-${phoneNumbers.substring(7)}`
            }
          }
        }
      }
    })
    
    const handleSubmit = async () => {
      if (!validateForm()) {
        errorMessage.value = 'Por favor, corrija os erros no formulário'
        return
      }
      
      loading.value = true
      const res = await store.dispatch('carteiristas/updateCarteirista', {
        id: route.params.id,
        data: form
      })
      loading.value = false
      
      if (res.success) {
        router.push('/carteiristas')
      } else {
        errorMessage.value = res.message || 'Erro ao atualizar carteirista'
      }
    }
    
    return {
      form,
      errors,
      loading,
      errorMessage,
      isLoading,
      handleSubmit,
      formatTelefone
    }
  }
}
</script>
