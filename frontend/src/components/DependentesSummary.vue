<template>
  <div>
    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <div class="card p-3 h-100 shadow-sm rounded-3">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <small class="text-muted">Total de Dependentes</small>
              <div class="h4 text-primary mt-2">{{ total }}</div>
            </div>
            <div class="bg-light rounded-circle d-flex align-items-center justify-content-center" style="width:44px;height:44px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM8 11c1.657 0 3-1.343 3-3S9.657 5 8 5 5 6.343 5 8s1.343 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05C16.45 13.6 18 14.7 18 15.5V19h4v-2.5C22 14.17 17.33 13 16 13z" fill="#4C6EF5"/></svg>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card p-3 h-100 shadow-sm rounded-3">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <small class="text-muted">Dependentes Ativos</small>
              <div class="h4 text-success mt-2">{{ ativos }}</div>
            </div>
            <div class="bg-light rounded-circle d-flex align-items-center justify-content-center" style="width:44px;height:44px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 21s-6-4.35-6-9a6 6 0 0112 0c0 4.65-6 9-6 9z" fill="#20C997"/></svg>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card p-3 h-100 shadow-sm rounded-3">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <small class="text-muted">Menores de Idade</small>
              <div class="h4 text-purple mt-2">{{ menores }}</div>
            </div>
            <div class="bg-light rounded-circle d-flex align-items-center justify-content-center" style="width:44px;height:44px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-9 9c0-3 4-5 9-5s9 2 9 5v1H3v-1z" fill="#7C3AED"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DependentesSummary',
  props: {
    total: { type: Number, default: 0 },
    ativos: { type: Number, default: 0 },
    menores: { type: Number, default: 0 }
  }
}
</script>

