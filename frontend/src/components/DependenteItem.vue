<template>
  <div class="card mb-3 rounded-3 shadow-sm">
    <div class="card-body d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center gap-3">
        <div class="rounded-circle bg-success text-white d-flex align-items-center justify-content-center" style="width:48px;height:48px;font-weight:700;">
          {{ initials }}
        </div>

        <div>
          <div class="d-flex align-items-center gap-2">
            <div class="fw-bold">{{ dependente.nome }}</div>
            <span v-if="dependente.parentesco" class="badge bg-info text-dark small">{{ dependente.parentesco }}</span>
          </div>

          <div class="text-muted small mt-2">
            <span class="me-3">ID: #{{ dependente.id }}</span>
            <span class="me-3">CPF: {{ dependente.cpf || '—' }}</span>
            <span>Idade: {{ dependente.idade ? dependente.idade + ' anos' : '—' }}</span>
          </div>
        </div>
      </div>

      <div class="d-flex align-items-center gap-2">
        <span v-if="dependente.ativo" class="badge rounded-pill bg-dark text-white">Ativo</span>
        <span v-else class="badge rounded-pill bg-light text-dark">Inativo</span>

        <button class="btn btn-sm btn-outline-secondary" @click="$emit('edit', dependente)">Editar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DependenteItem',
  props: { dependente: { type: Object, required: true } },
  computed: {
    initials() {
      const name = (this.dependente.nome || '').trim()
      if (!name) return ''
      return name.split(' ').slice(0,2).map(n => n[0]).join('').toUpperCase()
    }
  }
}
</script>

