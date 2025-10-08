<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-8 mx-auto">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="mb-4">Nova Horta</h2>
            
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>
            
            <form @submit.prevent="handleSubmit">
              <FormInput
                id="nome"
                v-model="form.nome"
                label="Nome"
                placeholder="Nome da horta"
                :required="true"
                :error="errors.nome"
              />
              
              <div class="mb-3">
                <label for="localizacao" class="form-label">Localização</label>
                <textarea
                  id="localizacao"
                  v-model="form.localizacao"
                  class="form-control"
                  rows="2"
                  placeholder="Rua, número, bairro"
                ></textarea>
              </div>
              
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
                    id="responsavel"
                    v-model="form.responsavel"
                    label="Responsável"
                    placeholder="Nome do responsável"
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
                
                <router-link to="/hortas" class="btn btn-secondary">
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
  name: 'HortasCreate',
  components: {
    FormInput
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const form = reactive({
      nome: '',
      localizacao: '',
      telefone: '',
      responsavel: ''
    })
    
    const errors = reactive({ nome: '' })
    const loading = ref(false)
    const errorMessage = ref('')
    
    const handleSubmit = async () => {
      if (!form.nome) {
        errors.nome = 'Nome é obrigatório'
        return
      }
      
      loading.value = true
      const result = await store.dispatch('hortas/createHorta', form)
      loading.value = false
      
      if (result.success) {
        router.push('/hortas')
      } else {
        errorMessage.value = result.message
      }
    }
    
    return { form, errors, loading, errorMessage, handleSubmit }
  }
}
</script>
