<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-8 mx-auto">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="mb-4">Novo Canteiro</h2>
            
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>
            
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="numero_identificador" class="form-label">Número Identificador <span class="text-danger">*</span></label>
                <input
                  id="numero_identificador"
                  v-model="form.numero_identificador"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors.numero_identificador }"
                  placeholder="Ex: C-001, Canteiro 1, etc."
                  required
                />
                <div v-if="errors.numero_identificador" class="invalid-feedback">
                  {{ errors.numero_identificador }}
                </div>
              </div>
              
              <div class="mb-3">
                <label for="tamanho_m2" class="form-label">Tamanho (m²) <span class="text-danger">*</span></label>
                <input
                  id="tamanho_m2"
                  v-model="form.tamanho_m2"
                  type="number"
                  step="0.01"
                  min="0"
                  class="form-control"
                  :class="{ 'is-invalid': errors.tamanho_m2 }"
                  placeholder="Ex: 10.5"
                  required
                />
                <div v-if="errors.tamanho_m2" class="invalid-feedback">
                  {{ errors.tamanho_m2 }}
                </div>
              </div>
              
              <div class="mb-3">
                <label for="horta_uuid" class="form-label">Horta <span class="text-danger">*</span></label>
                <select
                  id="horta_uuid"
                  v-model="form.horta_uuid"
                  class="form-select"
                  :class="{ 'is-invalid': errors.horta_uuid }"
                  required
                >
                  <option value="">Selecione uma horta</option>
                  <option v-for="horta in hortas" :key="horta.id" :value="horta.id">
                    {{ horta.nome }}
                  </option>
                </select>
                <div v-if="errors.horta_uuid" class="invalid-feedback">
                  {{ errors.horta_uuid }}
                </div>
              </div>
              
              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-success" :disabled="loading">
                  <span v-if="loading">Salvando...</span>
                  <span v-else>Salvar</span>
                </button>
                <router-link to="/canteiros" class="btn btn-secondary">
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
import { reactive, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'CanteirosCreate',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const form = reactive({
      numero_identificador: '',
      tamanho_m2: '',
      horta_uuid: ''
    })
    
    const errors = reactive({
      numero_identificador: '',
      tamanho_m2: '',
      horta_uuid: ''
    })
    
    const loading = ref(false)
    const errorMessage = ref('')
    const hortas = computed(() => store.getters['hortas/allHortas'])
    
    onMounted(() => {
      store.dispatch('hortas/fetchHortas')
    })
    
    const validateForm = () => {
      let isValid = true
      errors.numero_identificador = ''
      errors.tamanho_m2 = ''
      errors.horta_uuid = ''
      
      if (!form.numero_identificador || form.numero_identificador.trim() === '') {
        errors.numero_identificador = 'Número identificador é obrigatório'
        isValid = false
      } else if (form.numero_identificador.length < 2) {
        errors.numero_identificador = 'Número identificador deve ter no mínimo 2 caracteres'
        isValid = false
      }
      
      if (!form.tamanho_m2 || form.tamanho_m2 === '') {
        errors.tamanho_m2 = 'Tamanho é obrigatório'
        isValid = false
      } else if (Number(form.tamanho_m2) <= 0) {
        errors.tamanho_m2 = 'Tamanho deve ser maior que zero'
        isValid = false
      }
      
      if (!form.horta_uuid || form.horta_uuid === '') {
        errors.horta_uuid = 'Selecione uma horta'
        isValid = false
      }
      
      return isValid
    }
    
    const handleSubmit = async () => {
      if (!validateForm()) {
        errorMessage.value = 'Por favor, corrija os erros no formulário'
        return
      }
      
      loading.value = true
      const res = await store.dispatch('canteiros/createCanteiro', form)
      loading.value = false
      
      if (res.success) {
        router.push('/canteiros')
      } else {
        errorMessage.value = res.message || 'Erro ao criar canteiro'
      }
    }
    
    return {
      form,
      errors,
      loading,
      errorMessage,
      hortas,
      handleSubmit
    }
  }
}
</script>
