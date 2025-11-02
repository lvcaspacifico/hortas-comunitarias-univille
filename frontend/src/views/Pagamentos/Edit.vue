<template>
  <div class="edit-pagamento">
    <h2>Editar Pagamento</h2>
    
    <div v-if="loading" class="loading">Carregando...</div>
    
    <form v-else @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label for="carteirista">Carteirista <span class="required">*</span></label>
        <select
          id="carteirista"
          v-model="form.carteirista_uuid"
          class="form-control"
          :class="{ 'is-invalid': errors.carteirista_uuid }"
        >
          <option value="">Selecione um carteirista</option>
          <option 
            v-for="carteirista in carteiristas" 
            :key="carteirista.id" 
            :value="carteirista.id"
          >
            {{ carteirista.nome }}{{ carteirista.telefone ? ` - ${carteirista.telefone}` : '' }}
          </option>
        </select>
        <span v-if="errors.carteirista_uuid" class="error-message">{{ errors.carteirista_uuid }}</span>
      </div>

      <div class="form-group">
        <label for="valor">Valor <span class="required">*</span></label>
        <input
          type="number"
          id="valor"
          v-model="form.valor"
          step="0.01"
          min="0"
          placeholder="0.00"
          class="form-control"
          :class="{ 'is-invalid': errors.valor }"
        />
        <span v-if="errors.valor" class="error-message">{{ errors.valor }}</span>
      </div>

      <div class="form-group">
        <label for="forma_pagamento">Forma de Pagamento <span class="required">*</span></label>
        <select
          id="forma_pagamento"
          v-model="form.forma_pagamento"
          class="form-control"
          :class="{ 'is-invalid': errors.forma_pagamento }"
        >
          <option value="">Selecione a forma</option>
          <option value="dinheiro">Dinheiro</option>
          <option value="pix">PIX</option>
        </select>
        <span v-if="errors.forma_pagamento" class="error-message">{{ errors.forma_pagamento }}</span>
      </div>

      <div class="form-group">
        <label for="data_pagamento">Data do Pagamento <span class="required">*</span></label>
        <input
          type="date"
          id="data_pagamento"
          v-model="form.data_pagamento"
          class="form-control"
          :class="{ 'is-invalid': errors.data_pagamento }"
        />
        <span v-if="errors.data_pagamento" class="error-message">{{ errors.data_pagamento }}</span>
      </div>

      <div class="form-group">
        <label for="observacao">Observação</label>
        <textarea
          id="observacao"
          v-model="form.observacao"
          rows="3"
          placeholder="Observações sobre o pagamento (opcional)"
          class="form-control"
        ></textarea>
      </div>

      <div class="form-actions">
        <button type="button" @click="handleCancel" class="btn btn-secondary">
          Cancelar
        </button>
        <button type="submit" class="btn btn-primary" :disabled="saving">
          {{ saving ? 'Salvando...' : 'Salvar' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'EditPagamento',
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const form = reactive({
      carteirista_uuid: '',
      valor: '',
      forma_pagamento: '',
      data_pagamento: '',
      observacao: ''
    });

    const errors = reactive({
      carteirista_uuid: '',
      valor: '',
      forma_pagamento: '',
      data_pagamento: ''
    });

    const loading = ref(true);
    const saving = ref(false);

    const carteiristas = computed(() => store.getters['carteiristas/allCarteiristas']);

    onMounted(async () => {
      try {
        await store.dispatch('carteiristas/fetchCarteiristas');
        
        const pagamentoId = route.params.id;
        const resp = await store.dispatch('pagamentos/fetchPagamentoById', pagamentoId);
        
        form.carteirista_uuid = resp.carteirista_uuid || '';
        form.valor = resp.valor || '';
        form.forma_pagamento = resp.forma_pagamento || '';
        form.data_pagamento = resp.data_pagamento || '';
        form.observacao = resp.observacao || '';
        
      } catch (error) {
        alert('Erro ao carregar pagamento: ' + (error.message || 'Erro desconhecido'));
        router.push('/pagamentos');
      } finally {
        loading.value = false;
      }
    });

    const validateForm = () => {
      let isValid = true;
      
      // Reset errors
      Object.keys(errors).forEach(key => errors[key] = '');

      if (!form.carteirista_uuid) {
        errors.carteirista_uuid = 'Selecione um carteirista';
        isValid = false;
      }

      if (!form.valor || parseFloat(form.valor) <= 0) {
        errors.valor = 'Informe um valor válido';
        isValid = false;
      }

      if (!form.forma_pagamento) {
        errors.forma_pagamento = 'Selecione a forma de pagamento';
        isValid = false;
      }

      if (!form.data_pagamento) {
        errors.data_pagamento = 'Informe a data do pagamento';
        isValid = false;
      }

      return isValid;
    };

    const handleSubmit = async () => {
      console.log('handleSubmit (edit) chamado');
      console.log('Form data:', form);
      
      if (!validateForm()) {
        console.log('Validação falhou:', errors);
        return;
      }

      saving.value = true;
      console.log('Saving set to true');
      
      try {
        const pagamentoId = route.params.id;
        const payload = {
          id: pagamentoId,
          carteirista_uuid: form.carteirista_uuid,
          valor: parseFloat(form.valor),
          forma_pagamento: form.forma_pagamento,
          data_pagamento: form.data_pagamento,
          observacao: form.observacao || null
        };
        console.log('Payload a ser enviado:', payload);
        
        await store.dispatch('pagamentos/updatePagamento', payload);

        alert('Pagamento atualizado com sucesso!');
        router.push('/pagamentos');
      } catch (error) {
        console.error('Erro ao atualizar pagamento:', error);
        alert('Erro ao atualizar pagamento: ' + (error.message || 'Erro desconhecido'));
      } finally {
        saving.value = false;
        console.log('Saving set to false');
      }
    };

    const handleCancel = () => {
      router.push('/pagamentos');
    };

    return {
      form,
      errors,
      loading,
      saving,
      carteiristas,
      handleSubmit,
      handleCancel
    };
  }
};
</script>

<style scoped>
.edit-pagamento {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  margin-bottom: 24px;
  color: #333;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.form {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
}

.required {
  color: #e74c3c;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #4CAF50;
}

.form-control.is-invalid {
  border-color: #e74c3c;
}

.error-message {
  display: block;
  margin-top: 6px;
  color: #e74c3c;
  font-size: 13px;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #45a049;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}

textarea.form-control {
  resize: vertical;
  font-family: inherit;
}
</style>
