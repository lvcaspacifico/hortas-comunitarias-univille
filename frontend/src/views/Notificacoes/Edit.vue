<template>
  <div class="edit-notificacao">
    <div class="page-header">
      <h1>Editar Notificação</h1>
      <router-link to="/notificacoes" class="btn-secondary">
        ← Voltar
      </router-link>
    </div>

    <div v-if="loading" class="loading">Carregando...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <form v-else @submit.prevent="handleSubmit" class="notificacao-form">
      <!-- Tipo de Notificação -->
      <div class="form-group">
        <label for="tipo">Tipo de Notificação *</label>
        <select 
          id="tipo" 
          v-model="form.tipo" 
          @change="handleTipoChange"
          required
        >
          <option value="">Selecione o tipo</option>
          <option value="aviso_geral">Aviso Geral</option>
          <option value="aviso_canteirista">Aviso para Canteirista Específico</option>
          <option value="evento_horta">Evento da Horta</option>
        </select>
      </div>

      <!-- Título -->
      <div class="form-group">
        <label for="titulo">Título *</label>
        <input 
          id="titulo"
          v-model="form.titulo" 
          type="text" 
          maxlength="255"
          placeholder="Digite o título da notificação"
          required
        />
      </div>

      <!-- Mensagem -->
      <div class="form-group">
        <label for="mensagem">Mensagem *</label>
        <textarea 
          id="mensagem"
          v-model="form.mensagem" 
          rows="4"
          placeholder="Digite a mensagem da notificação"
          required
        ></textarea>
      </div>

      <!-- Canteirista (apenas para aviso_canteirista) -->
      <div v-if="form.tipo === 'aviso_canteirista'" class="form-group">
        <label for="carteirista_uuid">Canteirista *</label>
        <select 
          id="carteirista_uuid" 
          v-model="form.carteirista_uuid"
          required
        >
          <option value="">Selecione um canteirista</option>
          <option 
            v-for="carteirista in carteiristas" 
            :key="carteirista.id" 
            :value="carteirista.id"
          >
            {{ carteirista.nome }}
          </option>
        </select>
      </div>

      <!-- Horta e Data do Evento (apenas para evento_horta) -->
      <template v-if="form.tipo === 'evento_horta'">
        <div class="form-group">
          <label for="horta_uuid">Horta *</label>
          <select 
            id="horta_uuid" 
            v-model="form.horta_uuid"
            required
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
        </div>

        <div class="form-group">
          <label for="data_evento">Data e Hora do Evento *</label>
          <input 
            id="data_evento"
            v-model="form.data_evento" 
            type="datetime-local"
            required
          />
        </div>
      </template>

      <!-- Prioridade -->
      <div class="form-group">
        <label for="prioridade">Prioridade</label>
        <select id="prioridade" v-model="form.prioridade">
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>
      </div>

      <!-- Status Ativa -->
      <div class="form-group">
        <label>
          <input 
            type="checkbox" 
            v-model="form.ativa"
          />
          Notificação Ativa
        </label>
      </div>

      <!-- Data de Início -->
      <div class="form-group">
        <label for="data_inicio">Data de Início *</label>
        <input 
          id="data_inicio"
          v-model="form.data_inicio" 
          type="datetime-local"
          required
        />
        <small>Quando a notificação começa a ser exibida</small>
      </div>

      <!-- Data de Fim -->
      <div class="form-group">
        <label for="data_fim">Data de Fim</label>
        <input 
          id="data_fim"
          v-model="form.data_fim" 
          type="datetime-local"
        />
        <small>Deixe em branco para notificação sem prazo de término</small>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-primary" :disabled="submitting">
          {{ submitting ? 'Salvando...' : 'Salvar' }}
        </button>
        <router-link to="/notificacoes" class="btn-secondary">
          Cancelar
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'EditNotificacao',
  data() {
    return {
      form: {
        tipo: '',
        titulo: '',
        mensagem: '',
        carteirista_uuid: '',
        horta_uuid: '',
        data_evento: '',
        prioridade: 'media',
        ativa: true,
        data_inicio: '',
        data_fim: ''
      },
      submitting: false,
      error: null,
      loading: true
    }
  },
  computed: {
    ...mapState('carteiristas', ['carteiristas']),
    ...mapState('hortas', ['hortas'])
  },
  async mounted() {
    const id = this.$route.params.id
    if (!id) {
      this.error = 'ID da notificação não fornecido'
      this.loading = false
      return
    }
    
    await this.loadNotificacao()
    await this.fetchCarteiristas()
    await this.fetchHortas()
  },
  methods: {
    ...mapActions('notificacoes', ['fetchNotificacaoById', 'updateNotificacao']),
    ...mapActions('carteiristas', ['fetchCarteiristas']),
    ...mapActions('hortas', ['fetchHortas']),

    async loadNotificacao() {
      try {
        this.loading = true
        const id = this.$route.params.id
        console.log('🔍 Carregando notificação ID:', id)
        
        const response = await this.fetchNotificacaoById(id)
        console.log('📦 Response completo:', response)
        
        // A store já retorna response.data, que contém { success, data }
        let notificacao = null
        if (response && response.data) {
          notificacao = response.data
        } else if (response) {
          notificacao = response
        }
        
        console.log('✅ Notificação extraída:', notificacao)
        
        if (notificacao) {
          // Preenche o formulário
          this.form.tipo = notificacao.tipo || ''
          this.form.titulo = notificacao.titulo || ''
          this.form.mensagem = notificacao.mensagem || ''
          this.form.carteirista_uuid = notificacao.carteirista_uuid || ''
          this.form.horta_uuid = notificacao.horta_uuid || ''
          this.form.prioridade = notificacao.prioridade || 'media'
          this.form.ativa = notificacao.ativa === 1 || notificacao.ativa === true
          
          console.log('📝 Formulário preenchido:', this.form)
          
          // Converte datas do formato MySQL para datetime-local
          if (notificacao.data_evento) {
            this.form.data_evento = this.mysqlToDatetimeLocal(notificacao.data_evento)
          }
          if (notificacao.data_inicio) {
            this.form.data_inicio = this.mysqlToDatetimeLocal(notificacao.data_inicio)
          }
          if (notificacao.data_fim) {
            this.form.data_fim = this.mysqlToDatetimeLocal(notificacao.data_fim)
          }
          
          console.log('📅 Datas convertidas:', {
            data_evento: this.form.data_evento,
            data_inicio: this.form.data_inicio,
            data_fim: this.form.data_fim
          })
        } else {
          this.error = 'Notificação não encontrada'
        }
      } catch (err) {
        console.error('❌ Erro ao carregar notificação:', err)
        this.error = 'Erro ao carregar notificação: ' + err.message
      } finally {
        this.loading = false
      }
    },

    handleTipoChange() {
      // Limpa campos específicos quando muda o tipo
      if (this.form.tipo !== 'aviso_canteirista') {
        this.form.carteirista_uuid = ''
      }
      if (this.form.tipo !== 'evento_horta') {
        this.form.horta_uuid = ''
        this.form.data_evento = ''
      }
    },

    mysqlToDatetimeLocal(mysqlDatetime) {
      // Converte "2024-01-15 10:30:00" para "2024-01-15T10:30"
      if (!mysqlDatetime) return ''
      return mysqlDatetime.substring(0, 16).replace(' ', 'T')
    },

    datetimeLocalToMysql(datetimeLocal) {
      // Converte "2024-01-15T10:30" para "2024-01-15 10:30:00"
      if (!datetimeLocal) return null
      return datetimeLocal.replace('T', ' ') + ':00'
    },

    async handleSubmit() {
      try {
        this.submitting = true

        // Validações
        if (!this.form.tipo || !this.form.titulo || !this.form.mensagem) {
          alert('Preencha os campos obrigatórios')
          return
        }

        if (this.form.tipo === 'aviso_canteirista' && !this.form.carteirista_uuid) {
          alert('Selecione um canteirista')
          return
        }

        if (this.form.tipo === 'evento_horta') {
          if (!this.form.horta_uuid || !this.form.data_evento) {
            alert('Selecione a horta e a data do evento')
            return
          }
        }

        if (!this.form.data_inicio) {
          alert('Informe a data de início')
          return
        }

        // Prepara os dados
        const data = {
          tipo: this.form.tipo,
          titulo: this.form.titulo,
          mensagem: this.form.mensagem,
          prioridade: this.form.prioridade,
          ativa: this.form.ativa ? 1 : 0,
          data_inicio: this.datetimeLocalToMysql(this.form.data_inicio),
          data_fim: this.datetimeLocalToMysql(this.form.data_fim) || null
        }

        // Adiciona campos específicos
        if (this.form.tipo === 'aviso_canteirista') {
          data.carteirista_uuid = this.form.carteirista_uuid
        }

        if (this.form.tipo === 'evento_horta') {
          data.horta_uuid = this.form.horta_uuid
          data.data_evento = this.datetimeLocalToMysql(this.form.data_evento)
        }

        console.log('Atualizando notificação:', data)

        const id = this.$route.params.id
        const result = await this.updateNotificacao({ id, data })

        if (result.success) {
          alert('Notificação atualizada com sucesso!')
          this.$router.push('/notificacoes')
        } else {
          alert('Erro ao atualizar: ' + result.message)
        }
      } catch (err) {
        console.error('Erro ao atualizar notificação:', err)
        alert('Erro ao atualizar notificação')
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

<style scoped>
.edit-notificacao {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.page-header h1 {
  font-size: 24px;
  color: #2c3e50;
  margin: 0;
}

.loading,
.error {
  text-align: center;
  padding: 20px;
  font-size: 16px;
}

.error {
  color: #e74c3c;
}

.notificacao-form {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #34495e;
}

.form-group input[type="text"],
.form-group input[type="datetime-local"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group textarea {
  resize: vertical;
  font-family: inherit;
}

.form-group small {
  display: block;
  margin-top: 5px;
  color: #7f8c8d;
  font-size: 12px;
}

.form-group label input[type="checkbox"] {
  width: auto;
  margin-right: 8px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

.btn-primary,
.btn-secondary {
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: all 0.3s;
}

.btn-primary {
  background: #27ae60;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #229954;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background: #7f8c8d;
}
</style>
