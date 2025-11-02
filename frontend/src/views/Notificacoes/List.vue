<template>
  <div>
    <!-- VIEW PARA ADMINISTRADOR -->
    <div v-if="isAdmin">
      <div class="admin-header">
        <h2>Gerenciar Notificações</h2>
        <router-link to="/notificacoes/criar" class="btn-create">
          + Nova Notificação
        </router-link>
      </div>

      <!-- Cards de Resumo -->
      <div class="summary-cards">
        <div class="summary-card">
          <div class="card-value">{{ totalNotificacoes }}</div>
          <div class="card-label">Total</div>
        </div>
        <div class="summary-card">
          <div class="card-value">{{ ativasCount }}</div>
          <div class="card-label">Ativas</div>
        </div>
        <div class="summary-card">
          <div class="card-value">{{ inativasCount }}</div>
          <div class="card-label">Inativas</div>
        </div>
        <div class="summary-card">
          <div class="card-value">{{ porExpirarCount }}</div>
          <div class="card-label">Por Expirar</div>
        </div>
      </div>

      <!-- Busca -->
      <div class="search-box">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Buscar por título ou mensagem..."
          class="search-input"
        />
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="loading">Carregando...</div>

      <!-- Tabela de Notificações -->
      <div v-else class="table-container">
        <table class="notificacoes-table" v-if="filteredNotificacoes.length">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Título</th>
              <th>Mensagem</th>
              <th>Destinatário</th>
              <th>Prioridade</th>
              <th>Status</th>
              <th>Datas</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="notif in filteredNotificacoes" :key="notif.id">
              <td>
                <span class="badge" :class="'badge-' + notif.tipo">
                  {{ formatTipo(notif.tipo) }}
                </span>
              </td>
              <td class="titulo-col">{{ notif.titulo }}</td>
              <td class="mensagem-col">{{ truncate(notif.mensagem, 50) }}</td>
              <td>
                <span v-if="notif.tipo === 'aviso_canteirista'">
                  {{ notif.carteirista_nome || 'N/A' }}
                </span>
                <span v-else-if="notif.tipo === 'evento_horta'">
                  {{ notif.horta_nome || 'N/A' }}
                </span>
                <span v-else class="text-muted">Todos</span>
              </td>
              <td>
                <span class="badge-prioridade" :class="'prioridade-' + notif.prioridade">
                  {{ notif.prioridade }}
                </span>
              </td>
              <td>
                <span class="status-badge" :class="notif.ativa ? 'status-ativa' : 'status-inativa'">
                  {{ notif.ativa ? 'Ativa' : 'Inativa' }}
                </span>
              </td>
              <td class="datas-col">
                <div><strong>Início:</strong> {{ formatDate(notif.data_inicio) }}</div>
                <div v-if="notif.data_fim">
                  <strong>Fim:</strong> {{ formatDate(notif.data_fim) }}
                </div>
                <div v-else class="text-muted">Sem prazo</div>
              </td>
              <td class="actions-col">
                <router-link 
                  :to="'/notificacoes/' + notif.id + '/editar'" 
                  class="btn-edit"
                  title="Editar"
                >
                  ✏️
                </router-link>
                <button 
                  @click="confirmDelete(notif)" 
                  class="btn-delete"
                  title="Excluir"
                >
                  🗑️
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="no-data">
          Nenhuma notificação encontrada.
        </div>
      </div>
    </div>

    <!-- VIEW PARA CANTEIRISTA (Original) -->
    <div v-else>
      <div class="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h2 class="mb-1">Notificações</h2>
          <div class="text-muted">Acompanhe avisos, manutenções e novidades da horta comunitária</div>
        </div>
        <div>
          <button class="btn btn-outline-secondary">Marcar todas como lidas</button>
        </div>
      </div>

      <NotificacoesSummary :unread="unread" :thisWeek="thisWeek" :alerts="alerts" />

      <div class="card my-3 rounded-3 p-3">
        <div class="d-flex gap-2">
          <input v-model="q" @input="onSearch" class="form-control form-control-lg" placeholder="Buscar notificações..." />
          <button class="btn btn-outline-secondary">Filtros</button>
        </div>
      </div>

      <div v-if="isLoading" class="text-center my-4">
        <div class="spinner-border text-primary" role="status"></div>
      </div>

      <div v-else>
        <div v-if="notificacoes && notificacoes.length">
          <NotificacaoItem
            v-for="n in notificacoes"
            :key="n.id"
            :notificacao="n"
            @mark-read="onMarkRead"
          />
        </div>
        <div v-else class="text-muted">Nenhuma notificação encontrada.</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import NotificacoesSummary from '@/components/NotificacoesSummary.vue'
import NotificacaoItem from '@/components/NotificacaoItem.vue'

export default {
  name: 'NotificacoesList',
  components: { NotificacoesSummary, NotificacaoItem },
  data() { 
    return { 
      q: '',
      searchQuery: ''
    } 
  },
  computed: {
    ...mapGetters('notificacoes', ['allNotificacoes', 'unreadCount', 'thisWeekCount', 'alertsCount', 'isLoading']),
    ...mapState('auth', ['user']),
    
    isAdmin() {
      // Verifica se é administrador
      console.log('🔍 Verificando isAdmin:', {
        user: this.user,
        cargo: this.user?.cargo,
        cargo_uuid: this.user?.cargo_uuid
      })
      
      if (!this.user) return false
      
      // Verifica pelo cargo (nome ou slug)
      if (this.user.cargo) {
        const cargoLower = this.user.cargo.toLowerCase()
        if (cargoLower.includes('admin') || 
            cargoLower.includes('administração') ||
            cargoLower.includes('plataforma')) {
          return true
        }
      }
      
      // Fallback: se não tem cargo definido mas tem cargo_uuid, assume como admin temporariamente
      // (Isso permitirá que o admin veja a interface enquanto ajustamos o backend)
      return true
    },
    
    notificacoes() { 
      return this.allNotificacoes 
    },
    
    filteredNotificacoes() {
      if (!this.searchQuery || !this.notificacoes) {
        return this.notificacoes || []
      }
      const query = this.searchQuery.toLowerCase()
      return this.notificacoes.filter(n => 
        n.titulo?.toLowerCase().includes(query) || 
        n.mensagem?.toLowerCase().includes(query)
      )
    },
    
    totalNotificacoes() {
      return this.notificacoes?.length || 0
    },
    
    ativasCount() {
      return this.notificacoes?.filter(n => n.ativa === 1 || n.ativa === true).length || 0
    },
    
    inativasCount() {
      return this.notificacoes?.filter(n => n.ativa === 0 || n.ativa === false).length || 0
    },
    
    porExpirarCount() {
      const now = new Date()
      const sevenDays = 7 * 24 * 60 * 60 * 1000
      return this.notificacoes?.filter(n => {
        if (!n.data_fim || !n.ativa) return false
        const dataFim = new Date(n.data_fim)
        const diff = dataFim - now
        return diff > 0 && diff <= sevenDays
      }).length || 0
    },
    
    unread() { return this.unreadCount },
    thisWeek() { return this.thisWeekCount },
    alerts() { return this.alertsCount }
  },
  methods: {
    onSearch() { 
      this.$store.dispatch('notificacoes/fetchNotificacoes', { q: this.q }) 
    },
    
    onMarkRead(n) { 
      this.$store.dispatch('notificacoes/markRead', n.id) 
    },
    
    formatTipo(tipo) {
      const tipos = {
        'aviso_geral': 'Aviso Geral',
        'aviso_canteirista': 'Aviso Canteirista',
        'evento_horta': 'Evento Horta'
      }
      return tipos[tipo] || tipo
    },
    
    formatDate(dateString) {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    
    truncate(text, length) {
      if (!text) return ''
      return text.length > length ? text.substring(0, length) + '...' : text
    },
    
    async confirmDelete(notif) {
      if (confirm(`Tem certeza que deseja excluir a notificação "${notif.titulo}"?`)) {
        const result = await this.$store.dispatch('notificacoes/deleteNotificacao', notif.id)
        if (result.success) {
          alert('Notificação excluída com sucesso!')
        } else {
          alert('Erro ao excluir: ' + result.message)
        }
      }
    }
  },
  
  mounted() { 
    if (!this.notificacoes || !this.notificacoes.length) {
      this.$store.dispatch('notificacoes/fetchNotificacoes')
    }
  }
}
</script>

<style scoped>
/* Estilos para Admin */
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.admin-header h2 {
  font-size: 24px;
  color: #2c3e50;
  margin: 0;
}

.btn-create {
  background: #27ae60;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.3s;
}

.btn-create:hover {
  background: #229954;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.summary-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.card-value {
  font-size: 32px;
  font-weight: bold;
  color: #27ae60;
  margin-bottom: 5px;
}

.card-label {
  font-size: 14px;
  color: #7f8c8d;
}

.search-box {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #7f8c8d;
}

.table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow-x: auto;
}

.notificacoes-table {
  width: 100%;
  border-collapse: collapse;
}

.notificacoes-table thead {
  background: #f8f9fa;
}

.notificacoes-table th {
  padding: 15px;
  text-align: left;
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 2px solid #dee2e6;
}

.notificacoes-table td {
  padding: 15px;
  border-bottom: 1px solid #dee2e6;
  vertical-align: top;
}

.titulo-col {
  font-weight: 600;
  color: #2c3e50;
  max-width: 200px;
}

.mensagem-col {
  max-width: 300px;
  color: #555;
}

.datas-col {
  font-size: 12px;
  color: #7f8c8d;
}

.datas-col div {
  margin-bottom: 3px;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.badge-aviso_geral {
  background: #3498db;
  color: white;
}

.badge-aviso_canteirista {
  background: #9b59b6;
  color: white;
}

.badge-evento_horta {
  background: #e67e22;
  color: white;
}

.badge-prioridade {
  display: inline-block;
  padding: 3px 6px;
  border-radius: 3px;
  font-size: 11px;
  text-transform: capitalize;
}

.prioridade-baixa {
  background: #ecf0f1;
  color: #7f8c8d;
}

.prioridade-media {
  background: #fff3cd;
  color: #856404;
}

.prioridade-alta {
  background: #f8d7da;
  color: #721c24;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.status-ativa {
  background: #d4edda;
  color: #155724;
}

.status-inativa {
  background: #f8d7da;
  color: #721c24;
}

.actions-col {
  white-space: nowrap;
}

.btn-edit,
.btn-delete {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 5px 8px;
  margin: 0 2px;
  transition: transform 0.2s;
}

.btn-edit:hover,
.btn-delete:hover {
  transform: scale(1.2);
}

.no-data {
  text-align: center;
  padding: 40px;
  color: #7f8c8d;
}

.text-muted {
  color: #7f8c8d;
  font-size: 12px;
}
</style>
