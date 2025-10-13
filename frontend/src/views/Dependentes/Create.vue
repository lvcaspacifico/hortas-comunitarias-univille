<template>
  <div>
    <h3>Cadastrar Dependente</h3>

    <form @submit.prevent="onSubmit">
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
  </div>
</template>

<script>
export default {
  name: 'DependentesCreate',
  data() {
    return {
      form: { nome: '', cpf: '', idade: null, ativo: true }
    }
  },
  methods: {
    async onSubmit() {
      // include canteiristaId if present in query
      const canteiristaId = this.$route.query.canteiristaId || this.$route.params.canteiristaId
      const payload = { ...this.form }
      if (canteiristaId) payload.canteirista_id = canteiristaId
      await this.$store.dispatch('dependentes/createDependente', payload)
      this.$router.push({ name: 'DependentesList' })
    }
  }
}
</script>

