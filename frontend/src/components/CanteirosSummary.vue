<template>
  <div>
    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <div class="card p-3 h-100">
          <small class="text-muted">Total de Canteiros</small>
          <div class="h4 text-success mt-2">{{ total }}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card p-3 h-100">
          <small class="text-muted">Área Total</small>
          <div class="h4 text-primary mt-2">{{ area }}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card p-3 h-100">
          <small class="text-muted">Canteiros Ativos</small>
          <div class="h4 text-warning mt-2">{{ ativos }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CanteirosSummary',
  props: {
    total: { type: Number, default: 0 },
    area: { type: String, default: '0m²' },
    ativos: { type: Number, default: 0 }
  }
}
</script>
