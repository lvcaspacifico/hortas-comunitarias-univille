<template>
  <div class="card mb-3 rounded-3 shadow-sm" :class="{'border-start': true}" :style="borderColor">
    <div class="card-body d-flex justify-content-between">
      <div class="d-flex gap-3">
        <div class="rounded-circle bg-light d-flex align-items-center justify-content-center" style="width:44px;height:44px;">
          <i :class="iconClass"></i>
        </div>
        <div>
          <div class="fw-bold">{{ notificacao.title }} <span v-if="!notificacao.lida" class="text-primary">•</span></div>
          <div class="text-muted small mt-1">{{ notificacao.body }}</div>
          <div class="mt-2">
            <span class="badge bg-light text-dark small me-2">{{ notificacao.tag || 'Info' }}</span>
          </div>
        </div>
      </div>
      <div class="text-end small text-muted">
        <div>{{ timeAgo }}</div>
        <div class="mt-2"><a href="#" @click.prevent="markAsRead">Marcar como lida</a></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificacaoItem',
  props: { notificacao: { type: Object, required: true } },
  computed: {
    iconClass() {
      const t = (this.notificacao.type || '').toLowerCase()
      if (t === 'manutencao') return 'fa fa-tools text-primary'
      if (t === 'regra') return 'fa fa-exclamation-circle text-warning'
      if (t === 'evento') return 'fa fa-calendar text-success'
      return 'fa fa-info-circle text-info'
    },
    borderColor() {
      const t = (this.notificacao.type || '').toLowerCase()
      if (t === 'manutencao') return { borderLeft: '4px solid #ff6b6b' }
      if (t === 'regra') return { borderLeft: '4px solid #ff922b' }
      if (t === 'evento') return { borderLeft: '4px solid #2dbb7a' }
      return { borderLeft: '4px solid #4c6ef5' }
    },
    timeAgo() {
      // simple fallback, backend should provide readable string
      return this.notificacao.time_ago || this.notificacao.created_at || ''
    }
  },
  methods: {
    markAsRead() {
      this.$emit('mark-read', this.notificacao)
    }
  }
}
</script>
