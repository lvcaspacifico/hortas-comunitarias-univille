<template>
  <div class="card mb-3 p-3">
    <div class="d-flex justify-content-between align-items-start">
      <div class="d-flex align-items-start">
        <div class="me-3 bg-light rounded p-3 text-success fw-bold">#{{ canteiro.id }}</div>
        <div>
          <div class="fw-bold h5">{{ canteiro.nome }}</div>
          <div class="text-muted small">📍 {{ canteiro.horta_nome || '—' }}</div>
          <div class="small mt-2 text-muted">Área: {{ canteiro.area || '—' }}</div>
        </div>
      </div>

      <div class="text-end">
        <div class="badge bg-dark text-white">{{ canteiro.ativo ? 'Ativo' : 'Inativo' }}</div>
        <div class="mt-3">
          <router-link :to="`/canteiros/${canteiro.id}/editar`" class="btn btn-sm btn-primary me-2">Editar</router-link>
          <button @click="$emit('delete', canteiro)" class="btn btn-sm btn-danger">Excluir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CanteiroItem',
  props: { canteiro: { type: Object, required: true } }
}
</script>
