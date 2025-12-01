<template>
  <div>
    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <div class="card p-3 h-100">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <small class="text-muted">Total Pago este Mês</small>
              <div class="h4 text-success mt-1">{{ formatCurrency(totalPaid) }}</div>
            </div>
            <div class="ms-3 bg-light rounded-circle p-2">
              <i class="bi bi-currency-dollar text-success"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card p-3 h-100">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <small class="text-muted">Pagamentos Pendentes</small>
              <div class="h4 text-warning mt-1">{{ pendingCount }}</div>
            </div>
            <div class="ms-3 bg-light rounded-circle p-2">
              <i class="bi bi-calendar-event text-warning"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card p-3 h-100">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <small class="text-muted">Economia Mensal</small>
              <div class="h4 text-primary mt-1">{{ formatCurrency(economia) }}</div>
            </div>
            <div class="ms-3 bg-light rounded-circle p-2">
              <i class="bi bi-graph-up text-primary"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentsSummary',
  props: {
    totalPaid: { type: Number, default: 0 },
    pendingCount: { type: Number, default: 0 },
    economia: { type: Number, default: 0 }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
    }
  }
}
</script>
