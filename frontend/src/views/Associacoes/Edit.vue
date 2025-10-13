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
                  <FormInput
                    id="telefone"
                    v-model="form.telefone"
                    label="Telefone"
                  />
                </div>
                <div class="col-md-6">
                  <FormInput
                    id="email"
                    v-model="form.email"
                    label="Email"
                    type="email"
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
    
    const loading = ref(false)
    const isLoading = computed(() => store.getters['associacoes/isLoading'])
    
    onMounted(async () => {
      const id = route.params.id
      await store.dispatch('associacoes/fetchAssociacao', id)
      
      const associacao = store.state.associacoes.currentAssociacao
      if (associacao) {
        Object.assign(form, associacao)
      }
    })
    
    const handleSubmit = async () => {
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
      loading,
      isLoading,
      handleSubmit
    }
  }
}
</script>