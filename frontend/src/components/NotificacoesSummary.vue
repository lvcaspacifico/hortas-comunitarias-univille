<template>
  <div class="row g-3 mb-4">
    <div class="col-md-4">
      <div class="card p-3 h-100 rounded-3 shadow-sm">
        <small class="text-muted">Não Lidas</small>
        <div class="h4 text-orange mt-2">{{ unread }}</div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card p-3 h-100 rounded-3 shadow-sm">
        <small class="text-muted">Esta Semana</small>
        <div class="h4 text-primary mt-2">{{ thisWeek }}</div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card p-3 h-100 rounded-3 shadow-sm">
        <small class="text-muted">Alertas Ativos</small>
        <div class="h4 text-danger mt-2">{{ alerts }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificacoesSummary',
  props: { unread: { type: Number, default: 0 }, thisWeek: { type: Number, default: 0 }, alerts: { type: Number, default: 0 } }
}
</script>
