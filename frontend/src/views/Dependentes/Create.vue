<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-8 mx-auto">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="mb-4">Cadastrar Dependente</h2>
            
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>

            <form @submit.prevent="onSubmit">
              <div class="mb-3">
                <label for="nome" class="form-label">Nome <span class="text-danger">*</span></label>
                <input
                  id="nome"
                  v-model="form.nome"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors.nome }"
                  placeholder="Nome completo"
                  required
                />
                <div v-if="errors.nome" class="invalid-feedback">
                  {{ errors.nome }}
                </div>
              </div>

              <div class="mb-3">
                <label for="cpf" class="form-label">CPF <span class="text-danger">*</span></label>
                <input
                  id="cpf"
                  v-model="form.cpf"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors.cpf }"
                  placeholder="000.000.000-00"
                  @input="formatCPF"
                  maxlength="14"
                  required
                />
                <div v-if="errors.cpf" class="invalid-feedback">
                  {{ errors.cpf }}
                </div>
              </div>

              <div class="mb-3">
                <label for="idade" class="form-label">Idade <span class="text-danger">*</span></label>
                <input
                  id="idade"
                  v-model.number="form.idade"
                  type="number"
                  min="0"
                  max="150"
                  class="form-control"
                  :class="{ 'is-invalid': errors.idade }"
                  placeholder="Idade em anos"
                  required
                />
                <div v-if="errors.idade" class="invalid-feedback">
                  {{ errors.idade }}
                </div>
              </div>

              <div class="mb-3">
                <label for="carteirista_uuid" class="form-label">Carteirista (Responsável) <span class="text-danger">*</span></label>
                <select
                  id="carteirista_uuid"
                  v-model="form.carteirista_uuid"
                  class="form-select"
                  :class="{ 'is-invalid': errors.carteirista_uuid }"
                  required
                >
                  <option value="">Selecione um carteirista</option>
                  <option v-for="carteirista in carteiristas" :key="carteirista.id" :value="carteirista.id">
                    {{ carteirista.nome }} {{ carteirista.telefone ? `- ${carteirista.telefone}` : '' }}
                  </option>
                </select>
                <div v-if="errors.carteirista_uuid" class="invalid-feedback">
                  {{ errors.carteirista_uuid }}
                </div>
              </div>

              <div class="mb-3 form-check">
                <input
                  id="ativo"
                  v-model="form.ativo"
                  type="checkbox"
                  class="form-check-input"
                />
                <label class="form-check-label" for="ativo">Ativo</label>
              </div>

              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-success" :disabled="loading">
                  <span v-if="loading">Salvando...</span>
                  <span v-else>Salvar</span>
                </button>
                <router-link to="/dependentes" class="btn btn-secondary">
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
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'DependentesCreate',
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    
    const form = reactive({
      nome: '',
      cpf: '',
      idade: null,
      carteirista_uuid: '',
      ativo: true
    })
    
    const errors = reactive({
      nome: '',
      cpf: '',
      idade: '',
      carteirista_uuid: ''
    })
    
    const carteiristas = computed(() => store.getters['carteiristas/allCarteiristas'])
    
    onMounted(() => {
      store.dispatch('carteiristas/fetchCarteiristas')
    })
    
    const loading = ref(false)
    const errorMessage = ref('')
    
    const validateForm = () => {
      let isValid = true
      errors.nome = ''
      errors.cpf = ''
      errors.idade = ''
      errors.carteirista_uuid = ''
      
      if (!form.nome || form.nome.trim() === '') {
        errors.nome = 'Nome é obrigatório'
        isValid = false
      } else if (form.nome.length < 3) {
        errors.nome = 'Nome deve ter no mínimo 3 caracteres'
        isValid = false
      }
      
      if (!form.cpf || form.cpf.trim() === '') {
        errors.cpf = 'CPF é obrigatório'
        isValid = false
      } else {
        const cpfNumbers = form.cpf.replace(/\D/g, '')
        if (cpfNumbers.length !== 11) {
          errors.cpf = 'CPF deve ter 11 dígitos'
          isValid = false
        }
      }
      
      if (!form.idade || form.idade === null) {
        errors.idade = 'Idade é obrigatória'
        isValid = false
      } else if (form.idade < 0 || form.idade > 150) {
        errors.idade = 'Idade deve estar entre 0 e 150 anos'
        isValid = false
      }
      
      if (!form.carteirista_uuid || form.carteirista_uuid === '') {
        errors.carteirista_uuid = 'Selecione um carteirista'
        isValid = false
      }
      
      return isValid
    }
    
    const formatCPF = (event) => {
      let value = event.target.value.replace(/\D/g, '').substring(0, 11)
      if (value.length > 0) {
        if (value.length <= 3) {
          // Já está no formato correto
        } else if (value.length <= 6) {
          value = `${value.substring(0, 3)}.${value.substring(3)}`
        } else if (value.length <= 9) {
          value = `${value.substring(0, 3)}.${value.substring(3, 6)}.${value.substring(6)}`
        } else {
          value = `${value.substring(0, 3)}.${value.substring(3, 6)}.${value.substring(6, 9)}-${value.substring(9)}`
        }
      }
      form.cpf = value
    }
    
    const onSubmit = async () => {
      if (!validateForm()) {
        errorMessage.value = 'Por favor, corrija os erros no formulário'
        return
      }
      
      loading.value = true
      
      // Include canteiristaId if present in query
      const canteiristaId = route.query.canteiristaId || route.params.canteiristaId
      const payload = { ...form }
      if (canteiristaId) payload.canteirista_id = canteiristaId
      
      const res = await store.dispatch('dependentes/createDependente', payload)
      loading.value = false
      
      if (res && res.success === false) {
        errorMessage.value = res.message || 'Erro ao criar dependente'
      } else {
        router.push({ name: 'DependentesList' })
      }
    }
    
    return {
      form,
      errors,
      loading,
      errorMessage,
      carteiristas,
      onSubmit,
      formatCPF
    }
  }
}
</script>

