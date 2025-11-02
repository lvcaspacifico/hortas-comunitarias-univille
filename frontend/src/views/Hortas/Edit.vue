<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-8 mx-auto">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="mb-4">Editar Horta</h2>
            
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>
            
            <div v-if="isLoading" class="text-center py-5">
              <div class="spinner-border text-success"></div>
            </div>
            
            <form v-else @submit.prevent="handleSubmit">
              <FormInput
                id="nome"
                v-model="form.nome"
                label="Nome"
                :required="true"
                :error="errors.nome"
              />
              
              <div class="mb-3">
                <label for="localizacao" class="form-label">Localização <span class="text-danger">*</span></label>
                <textarea
                  id="localizacao"
                  v-model="form.localizacao"
                  class="form-control"
                  :class="{ 'is-invalid': errors.localizacao }"
                  rows="2"
                  required
                ></textarea>
                <div v-if="errors.localizacao" class="invalid-feedback">
                  {{ errors.localizacao }}
                </div>
              </div>
              
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
                    id="responsavel"
                    v-model="form.responsavel"
                    label="Responsável"
                    :required="true"
                    :error="errors.responsavel"
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
    const errors = reactive({ 
      nome: '',
      localizacao: '',
      telefone: '',
      responsavel: ''
    })
    const loading = ref(false)
    const errorMessage = ref('')
    const isLoading = computed(() => store.getters['hortas/isLoading'])

    onMounted(async () => {
      const id = route.params.id
      console.log('Carregando horta ID:', id)
      
      await store.dispatch('hortas/fetchHorta', id)

      const horta = store.state.hortas.currentHorta
      console.log('Horta carregada:', horta)
      
      if (horta) {
        // Copiar apenas os campos do formulário
        form.nome = horta.nome || ''
        form.localizacao = horta.localizacao || ''
        form.telefone = horta.telefone || ''
        form.responsavel = horta.responsavel || ''
        
        console.log('Formulário preenchido:', form)
      }
    })
    
    const validateForm = () => {
      let isValid = true
      errorMessage.value = ''
      
      // Limpar erros anteriores
      errors.nome = ''
      errors.localizacao = ''
      errors.telefone = ''
      errors.responsavel = ''
      
      // Validar nome (obrigatório)
      if (!form.nome || form.nome.trim() === '') {
        errors.nome = 'Nome é obrigatório'
        isValid = false
      } else if (form.nome.length < 3) {
        errors.nome = 'Nome deve ter no mínimo 3 caracteres'
        isValid = false
      } else if (form.nome.length > 100) {
        errors.nome = 'Nome deve ter no máximo 100 caracteres'
        isValid = false
      }
      
      // Validar localização (obrigatório)
      if (!form.localizacao || form.localizacao.trim() === '') {
        errors.localizacao = 'Localização é obrigatória'
        isValid = false
      } else if (form.localizacao.length < 3) {
        errors.localizacao = 'Localização deve ter no mínimo 3 caracteres'
        isValid = false
      }
      
      // Validar telefone (obrigatório - DDD + 9 dígitos)
      if (!form.telefone || form.telefone.trim() === '') {
        errors.telefone = 'Telefone é obrigatório'
        isValid = false
      } else {
        // Remove caracteres não numéricos para validação
        const phoneNumbers = form.telefone.replace(/\D/g, '')
        
        // Valida: deve ter exatamente 11 dígitos (2 DDD + 9 número)
        if (phoneNumbers.length !== 11) {
          errors.telefone = 'Telefone deve ter DDD (2 dígitos) + 9 dígitos. Ex: (47) 99999-9999'
          isValid = false
        } else if (phoneNumbers[0] === '0' || phoneNumbers[2] !== '9') {
          // DDD não pode começar com 0 e celular deve começar com 9
          errors.telefone = 'DDD inválido ou número não é celular (deve começar com 9)'
          isValid = false
        }
      }
      
      // Validar responsável (obrigatório)
      if (!form.responsavel || form.responsavel.trim() === '') {
        errors.responsavel = 'Nome do responsável é obrigatório'
        isValid = false
      } else if (form.responsavel.length < 3) {
        errors.responsavel = 'Nome do responsável deve ter no mínimo 3 caracteres'
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
      errorMessage.value = ''
      
      console.log('Enviando dados para atualização:', {
        id: route.params.id,
        data: form
      })
      
      const result = await store.dispatch('hortas/updateHorta', {
        id: route.params.id,
        data: form
      })
      loading.value = false

      console.log('Resultado do update:', result)

      if (result.success) {
        // Recarregar a lista de hortas antes de redirecionar
        await store.dispatch('hortas/fetchHortas')
        router.push('/hortas')
      } else {
        errorMessage.value = result.message || 'Erro ao atualizar horta'
      }
    }
    
    const formatTelefone = (event) => {
      let value = event.target.value
      
      // Remove tudo que não é número
      value = value.replace(/\D/g, '')
      
      // Limita a 11 dígitos
      value = value.substring(0, 11)
      
      // Aplica a máscara (00) 00000-0000
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

    return { form, errors, loading, errorMessage, isLoading, handleSubmit, formatTelefone }
  }
}
</script>
