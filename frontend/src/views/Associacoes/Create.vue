<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-8 mx-auto">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="mb-4">Nova Associação</h2>
            
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>
            
            <form @submit.prevent="handleSubmit">
              <FormInput
                id="nome"
                v-model="form.nome"
                label="Nome"
                placeholder="Nome da associação"
                :required="true"
                :error="errors.nome"
              />
              
              <div class="mb-3">
                <label for="descricao" class="form-label">Descrição</label>
                <textarea
                  id="descricao"
                  v-model="form.descricao"
                  class="form-control"
                  rows="3"
                  placeholder="Descrição da associação"
                ></textarea>
              </div>
              
              <FormInput
                id="endereco"
                v-model="form.endereco"
                label="Endereço"
                placeholder="Rua, número, bairro"
              />
              
              <div class="row">
                <div class="col-md-6">
                  <FormInput
                    id="telefone"
                    v-model="form.telefone"
                    label="Telefone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div class="col-md-6">
                  <FormInput
                    id="email"
                    v-model="form.email"
                    label="Email"
                    type="email"
                    placeholder="contato@associacao.org"
                  />
                </div>
              </div>
              
              <div class="d-flex gap-2">
                <button 
                  type="submit" 
                  class="btn btn-success"
                  :disabled="loading"
                >
                  <span v-if="loading">Salvando...</span>
                  <span v-else>Salvar</span>
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
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import FormInput from '@/components/FormInput.vue'

export default {
  name: 'AssociacoesCreate',
  components: {
    FormInput
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const form = reactive({
      nome: '',
      descricao: '',
      endereco: '',
      telefone: '',
      email: ''
    })
    
    const errors = reactive({
      nome: ''
    })
    
    const loading = ref(false)
    const errorMessage = ref('')
    
    const handleSubmit = async () => {
      if (!form.nome) {
        errors.nome = 'Nome é obrigatório'
        return
      }
      
      loading.value = true
      const result = await store.dispatch('associacoes/createAssociacao', form)
      loading.value = false
      
      if (result.success) {
        router.push('/associacoes')
      } else {
        errorMessage.value = result.message
      }
    }
    
    return {
      form,
      errors,
      loading,
      errorMessage,
      handleSubmit
    }
  }
}
</script>