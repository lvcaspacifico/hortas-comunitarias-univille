<template>
  <div class="create-notificacao">
    <h2>Nova Notificação</h2>
    
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label for="tipo">Tipo de Notificação <span class="required">*</span></label>
        <select
          id="tipo"
          v-model="form.tipo"
          @change="handleTipoChange"
          class="form-control"
          :class="{ 'is-invalid': errors.tipo }"
        >
          <option value="">Selecione o tipo</option>
          <option value="aviso_geral">Aviso Geral</option>
          <option value="aviso_canteirista">Aviso para Carteirista Específico</option>
          <option value="evento_horta">Evento da Horta</option>
        </select>
        <span v-if="errors.tipo" class="error-message">{{ errors.tipo }}</span>
      </div>

      <div class="form-group">
        <label for="titulo">Título <span class="required">*</span></label>
        <input
          type="text"
          id="titulo"
          v-model="form.titulo"
          placeholder="Ex: Manutenção Programada"
          class="form-control"
          :class="{ 'is-invalid': errors.titulo }"
          maxlength="255"
        />
        <span v-if="errors.titulo" class="error-message">{{ errors.titulo }}</span>
      </div>

      <div class="form-group">
        <label for="mensagem">Mensagem <span class="required">*</span></label>
        <textarea
          id="mensagem"
          v-model="form.mensagem"
          rows="4"
          placeholder="Digite a mensagem da notificação..."
          class="form-control"
          :class="{ 'is-invalid': errors.mensagem }"
        ></textarea>
        <span v-if="errors.mensagem" class="error-message">{{ errors.mensagem }}</span>
      </div>

      <!-- Campo Carteirista (apenas para aviso_canteirista) -->
      <div v-if="form.tipo === 'aviso_canteirista'" class="form-group">
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

      <!-- Campo Horta (apenas para evento_horta) -->
      <div v-if="form.tipo === 'evento_horta'" class="form-group">
        <label for="horta">Horta <span class="required">*</span></label>
        <select
          id="horta"
          v-model="form.horta_uuid"
          class="form-control"
          :class="{ 'is-invalid': errors.horta_uuid }"
        >
          <option value="">Selecione uma horta</option>
          <option 
            v-for="horta in hortas" 
            :key="horta.id" 
            :value="horta.id"
          >
            {{ horta.nome }}
          </option>
        </select>
        <span v-if="errors.horta_uuid" class="error-message">{{ errors.horta_uuid }}</span>
      </div>

      <!-- Data do Evento (apenas para evento_horta) -->
      <div v-if="form.tipo === 'evento_horta'" class="form-group">
        <label for="data_evento">Data do Evento</label>
        <input
          type="datetime-local"
          id="data_evento"
          v-model="form.data_evento"
          class="form-control"
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="prioridade">Prioridade <span class="required">*</span></label>
          <select
            id="prioridade"
            v-model="form.prioridade"
            class="form-control"
            :class="{ 'is-invalid': errors.prioridade }"
          >
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
          <span v-if="errors.prioridade" class="error-message">{{ errors.prioridade }}</span>
        </div>

        <div class="form-group">
          <label for="ativa">Status</label>
          <select
            id="ativa"
            v-model="form.ativa"
            class="form-control"
          >
            <option :value="true">Ativa</option>
            <option :value="false">Inativa</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="data_inicio">Data de Início <span class="required">*</span></label>
          <input
            type="datetime-local"
            id="data_inicio"
            v-model="form.data_inicio"
            class="form-control"
            :class="{ 'is-invalid': errors.data_inicio }"
          />
          <span v-if="errors.data_inicio" class="error-message">{{ errors.data_inicio }}</span>
        </div>

        <div class="form-group">
          <label for="data_fim">Data de Término (opcional)</label>
          <input
            type="datetime-local"
            id="data_fim"
            v-model="form.data_fim"
            class="form-control"
          />
          <small class="form-text text-muted">Deixe em branco para notificação sem prazo</small>
        </div>
      </div>

      <div class="form-actions">
        <button type="button" @click="handleCancel" class="btn btn-secondary">
          Cancelar
        </button>
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Salvando...' : 'Salvar' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'CreateNotificacao',
  setup() {
    const store = useStore();
    const router = useRouter();

    const form = reactive({
      tipo: '',
      titulo: '',
      mensagem: '',
      carteirista_uuid: '',
      horta_uuid: '',
      data_evento: '',
      prioridade: 'media',
      ativa: true,
      data_inicio: new Date().toISOString().slice(0, 16),
      data_fim: ''
    });

    const errors = reactive({
      tipo: '',
      titulo: '',
      mensagem: '',
      carteirista_uuid: '',
      horta_uuid: '',
      prioridade: '',
      data_inicio: ''
    });

    const loading = ref(false);

    const carteiristas = computed(() => store.getters['carteiristas/allCarteiristas']);
    const hortas = computed(() => store.getters['hortas/allHortas']);

    onMounted(async () => {
      await store.dispatch('carteiristas/fetchCarteiristas');
      await store.dispatch('hortas/fetchHortas');
    });

    const handleTipoChange = () => {
      // Limpar campos específicos ao mudar o tipo
      if (form.tipo !== 'aviso_canteirista') {
        form.carteirista_uuid = '';
      }
      if (form.tipo !== 'evento_horta') {
        form.horta_uuid = '';
        form.data_evento = '';
      }
    };

    const validateForm = () => {
      let isValid = true;
      
      // Reset errors
      Object.keys(errors).forEach(key => errors[key] = '');

      if (!form.tipo) {
        errors.tipo = 'Selecione o tipo de notificação';
        isValid = false;
      }

      if (!form.titulo) {
        errors.titulo = 'Título é obrigatório';
        isValid = false;
      }

      if (!form.mensagem) {
        errors.mensagem = 'Mensagem é obrigatória';
        isValid = false;
      }

      if (form.tipo === 'aviso_canteirista' && !form.carteirista_uuid) {
        errors.carteirista_uuid = 'Selecione um carteirista';
        isValid = false;
      }

      if (form.tipo === 'evento_horta' && !form.horta_uuid) {
        errors.horta_uuid = 'Selecione uma horta';
        isValid = false;
      }

      if (!form.data_inicio) {
        errors.data_inicio = 'Data de início é obrigatória';
        isValid = false;
      }

      return isValid;
    };

    const handleSubmit = async () => {
      console.log('handleSubmit chamado');
      console.log('Form data:', form);
      
      if (!validateForm()) {
        console.log('Validação falhou:', errors);
        return;
      }

      loading.value = true;
      console.log('Loading set to true');
      
      try {
        const payload = {
          tipo: form.tipo,
          titulo: form.titulo,
          mensagem: form.mensagem,
          prioridade: form.prioridade,
          ativa: form.ativa ? 1 : 0,
          data_inicio: form.data_inicio ? new Date(form.data_inicio).toISOString().slice(0, 19).replace('T', ' ') : null,
          data_fim: form.data_fim ? new Date(form.data_fim).toISOString().slice(0, 19).replace('T', ' ') : null,
        };

        if (form.tipo === 'aviso_canteirista') {
          payload.carteirista_uuid = form.carteirista_uuid;
        }

        if (form.tipo === 'evento_horta') {
          payload.horta_uuid = form.horta_uuid;
          if (form.data_evento) {
            payload.data_evento = new Date(form.data_evento).toISOString().slice(0, 19).replace('T', ' ');
          }
        }

        console.log('Payload a ser enviado:', payload);
        
        await store.dispatch('notificacoes/createNotificacao', payload);

        alert('Notificação criada com sucesso!');
        router.push('/notificacoes');
      } catch (error) {
        console.error('Erro ao criar notificação:', error);
        alert('Erro ao criar notificação: ' + (error.message || 'Erro desconhecido'));
      } finally {
        loading.value = false;
        console.log('Loading set to false');
      }
    };

    const handleCancel = () => {
      router.push('/notificacoes');
    };

    return {
      form,
      errors,
      loading,
      carteiristas,
      hortas,
      handleTipoChange,
      handleSubmit,
      handleCancel
    };
  }
};
</script>

<style scoped>
.create-notificacao {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  margin-bottom: 24px;
  color: #333;
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

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
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

.form-text {
  display: block;
  margin-top: 6px;
  font-size: 12px;
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
