<template>
  <div class="card mb-3 p-3">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-start">
        <div class="me-3 bg-light rounded p-3">
          <i class="bi bi-credit-card"></i>
        </div>
        <div>
          <div class="fw-bold">{{ pagamento.titulo }}</div>
          <div class="text-muted small">ID: #{{ pagamento.id }}</div>
          <div class="small mt-2">
            <span class="me-4">Vencimento: {{ pagamento.vencimento || '—' }}</span>
            <span>Pagamento: {{ pagamento.data_pagamento || 'Não realizado' }}</span>
          </div>
        </div>
      </div>

      <div class="text-end">
        <div class="h5">{{ formatCurrency(pagamento.valor) }}</div>
        <div class="mt-2">
          <span v-if="pagamento.status === 'pago'" class="badge bg-success">Pago</span>
          <span v-else class="badge bg-danger">Pendente</span>
        </div>
        <div class="mt-2">
          <button v-if="pagamento.status !== 'pago'" @click="$emit('pay', pagamento)" class="btn btn-success btn-sm">Pagar Agora</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentItem',
  props: { pagamento: { type: Object, required: true } },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
    }
  }
}
</script>
