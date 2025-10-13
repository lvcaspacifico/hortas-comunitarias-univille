<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-8 mx-auto">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="mb-4">Editar Horta</h2>
            
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
                <label for="localizacao" class="form-label">Localização</label>
                <textarea
                  id="localizacao"
                  v-model="form.localizacao"
                  class="form-control"
                  rows="2"
                ></textarea>
              </div>
              
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
                    id="responsavel"
                    v-model="form.responsavel"
                    label="Responsável"
                  />
                </div>
              </div>
              
              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-success" :disabled="loading">
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
import { ref, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import FormInput from '@/components/FormInput.vue'

export default {
  name: 'HortasEdit',
  components: { FormInput },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const form = reactive({ nome: '', localizacao: '', telefone: '', responsavel: '' })
    const loading = ref(false)
    const isLoading = computed(() => store.getters['hortas/isLoading'])

    onMounted(async () => {
      const id = route.params.id
      await store.dispatch('hortas/fetchHorta', id)

      const horta = store.state.hortas.currentHorta
      if (horta) Object.assign(form, horta)
    })

    const handleSubmit = async () => {
      loading.value = true
      const result = await store.dispatch('hortas/updateHorta', {
        id: route.params.id,
        data: form
      })
      loading.value = false

      if (result.success) router.push('/hortas')
    }

    return { form, loading, isLoading, handleSubmit }
  }
}
</script>
