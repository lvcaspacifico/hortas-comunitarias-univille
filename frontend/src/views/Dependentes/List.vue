<template>
  <div>
    <div class="d-flex justify-content-between align-items-start mb-3">
      <div>
        <h2 class="mb-1">Dependentes</h2>
        <div class="text-muted">Gerencie os dependentes vinculados à sua conta</div>
      </div>

      <div>
        <router-link to="/dependentes/criar" class="btn btn-success">
          <i class="fa fa-user-plus"></i>&nbsp;Adicionar Dependente
        </router-link>
      </div>
    </div>

    <DependentesSummary :total="total" :ativos="ativos" :menores="menores" />

    <div class="card my-3 rounded-3 p-3">
      <div class="d-flex gap-2">
        <input v-model="q" @input="onSearch" class="form-control form-control-lg" placeholder="Buscar dependentes..." />
        <button class="btn btn-outline-secondary">Filtros</button>
      </div>
    </div>

    <div v-if="isLoading" class="text-center my-4">
      <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>
    </div>

    <div v-else>
      <div v-if="dependentes && dependentes.length">
        <div class="list-group">
          <DependenteItem
            v-for="d in dependentes"
            :key="d.id"
            :dependente="d"
            @edit="onEdit"
            @delete="onDelete"
          />
        </div>
      </div>
      <div v-else class="text-muted">Nenhum dependente encontrado.</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DependentesSummary from '@/components/DependentesSummary.vue'
import DependenteItem from '@/components/DependenteItem.vue'

export default {
  name: 'DependentesList',
  components: { DependentesSummary, DependenteItem },
  data() {
    return { q: '' }
  },
  computed: {
    ...mapGetters('dependentes', ['allDependentes', 'isLoading']),
    dependentes() { return this.allDependentes },
    total() { return this.dependentes ? this.dependentes.length : 0 },
    ativos() { return this.dependentes ? this.dependentes.filter(d => d.ativo).length : 0 },
    menores() { return this.dependentes ? this.dependentes.filter(d => d.idade && d.idade < 18).length : 0 }
  },
  methods: {
    fetch(params = {}) {
      // include optional canteiristaId from route query or params
      const canteiristaId = this.$route.query.canteiristaId || this.$route.params.canteiristaId
      const p = { ...params }
      if (canteiristaId) p.canteiristaId = canteiristaId
      if (this.q) p.q = this.q
      this.$store.dispatch('dependentes/fetchDependentes', p)
    },
    onSearch() {
      this.fetch()
    },
    onEdit(dependente) {
      this.$router.push({ name: 'DependentesEdit', params: { id: dependente.id } })
    },
    async onDelete(dependente) {
      if (!confirm(`Remover dependente ${dependente.nome}?`)) return
      await this.$store.dispatch('dependentes/deleteDependente', dependente.id)
      this.fetch()
    }
  },
  mounted() {
    // Only fetch if store is empty and not already loading
    if ((!this.dependentes || !this.dependentes.length) && !this.isLoading) {
      this.fetch()
    }
  }
}
</script>

