<template>
  <div>
    <h3>Editar Dependente</h3>

    <form v-if="loaded" @submit.prevent="onSubmit">
      <div class="mb-3">
        <label class="form-label">Nome</label>
        <input v-model="form.nome" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">CPF</label>
        <input v-model="form.cpf" class="form-control" />
      </div>

      <div class="mb-3">
        <label class="form-label">Idade</label>
        <input v-model.number="form.idade" type="number" class="form-control" />
      </div>

      <div class="mb-3 form-check">
        <input v-model="form.ativo" class="form-check-input" type="checkbox" id="ativo" />
        <label class="form-check-label" for="ativo">Ativo</label>
      </div>

      <button class="btn btn-primary">Salvar</button>
      <router-link to="/dependentes" class="btn btn-link">Cancelar</router-link>
    </form>

    <div v-else class="text-center my-4">
      <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DependentesEdit',
  data() {
    return { form: {}, loaded: false }
  },
  async created() {
    const id = this.$route.params.id
    const resp = await this.$store.dispatch('dependentes/fetchDependente', id)
    this.form = { ...resp }
    this.loaded = true
  },
  methods: {
    async onSubmit() {
      const id = this.$route.params.id
      await this.$store.dispatch('dependentes/updateDependente', { id, data: this.form })
      this.$router.push({ name: 'DependentesList' })
    }
  }
}
</script>

