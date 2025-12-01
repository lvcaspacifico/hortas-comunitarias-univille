<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-8 mx-auto">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="mb-4">Editar Associação</h2>
            
            <div v-if="isLoading" class="text-center py-5">
              <div class="spinner-border text-success"></div>
            </div>
            
            <form v-else @submit.prevent="handleSubmit">
              <FormInput
                id="nome"
                v-model="form.nome"
                label="Nome"
                :required="true"
              />
              
              <div class="mb-3">
                <label for="descricao" class="form-label">Descrição</label>
                <textarea
                  id="descricao"
                  v-model="form.descricao"
                  class="form-control"
                  rows="3"
                ></textarea>
              </div>
              
              <FormInput
                id="endereco"
                v-model="form.endereco"
                label="Endereço"
              />
              
              <div class="row">
                <div class="col-md-6">
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
                </div>
                <div class="col-md-6">
                  <FormInput
                    id="email"
                    v-model="form.email"
                    label="Email"
                    type="email"
                    :required="true"
                    :error="errors.email"
                  />
                </div>
              </div>
              
              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-success" :disabled="loading">
                  <span v-if="loading">Salvando...</span>
                  <span v-else">Salvar</span>
                </button>
                <router-link to="/associacoes" class="btn btn-secondary">
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
import { ref, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import FormInput from '@/components/FormInput.vue'

export default {
  name: 'AssociacoesEdit',
  components: {
    FormInput
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    
    const form = reactive({
      nome: '',
      descricao: '',
      endereco: '',
      telefone: '',
      email: ''
    })
    
    const errors = reactive({
      nome: '',
      telefone: '',
      email: ''
    })
    
    const loading = ref(false)
    const errorMessage = ref('')
    const isLoading = computed(() => store.getters['associacoes/isLoading'])
    
    onMounted(async () => {
      const id = route.params.id
      await store.dispatch('associacoes/fetchAssociacao', id)
      
      const associacao = store.state.associacoes.currentAssociacao
      if (associacao) {
        form.nome = associacao.nome || ''
        form.descricao = associacao.descricao || ''
        form.endereco = associacao.endereco || ''
        form.telefone = associacao.telefone || ''
        form.email = associacao.email || ''
      }
    })
    
    const validateForm = () => {
      let isValid = true
      errors.nome = ''
      errors.telefone = ''
      errors.email = ''
      
      if (!form.nome || form.nome.trim() === '') {
        errors.nome = 'Nome é obrigatório'
        isValid = false
      }
      
      if (!form.telefone || form.telefone.trim() === '') {
        errors.telefone = 'Telefone é obrigatório'
        isValid = false
      } else {
        const phoneNumbers = form.telefone.replace(/\D/g, '')
        if (phoneNumbers.length !== 11) {
          errors.telefone = 'Telefone deve ter DDD + 9 dígitos'
          isValid = false
        }
      }
      
      if (!form.email || form.email.trim() === '') {
        errors.email = 'Email é obrigatório'
        isValid = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'Email inválido'
        isValid = false
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
    
    const handleSubmit = async () => {
      if (!validateForm()) {
        errorMessage.value = 'Por favor, corrija os erros no formulário'
        return
      }
      
      loading.value = true
      const result = await store.dispatch('associacoes/updateAssociacao', {
        id: route.params.id,
        data: form
      })
      loading.value = false
      
      if (result.success) {
        router.push('/associacoes')
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