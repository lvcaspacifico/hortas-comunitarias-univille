<template>
  <div>
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
</template>

<script>
import { mapGetters } from 'vuex'
import NotificacoesSummary from '@/components/NotificacoesSummary.vue'
import NotificacaoItem from '@/components/NotificacaoItem.vue'

export default {
  name: 'NotificacoesList',
  components: { NotificacoesSummary, NotificacaoItem },
  data() { return { q: '' } },
  computed: {
    ...mapGetters('notificacoes', ['allNotificacoes', 'unreadCount', 'thisWeekCount', 'alertsCount', 'isLoading']),
    notificacoes() { return this.allNotificacoes },
    unread() { return this.unreadCount },
    thisWeek() { return this.thisWeekCount },
    alerts() { return this.alertsCount }
  },
  methods: {
    onSearch() { this.$store.dispatch('notificacoes/fetchNotificacoes', { q: this.q }) },
    onMarkRead(n) { this.$store.dispatch('notificacoes/markRead', n.id) }
  },
  mounted() { if (!this.notificacoes || !this.notificacoes.length) this.$store.dispatch('notificacoes/fetchNotificacoes') }
}
</script>
