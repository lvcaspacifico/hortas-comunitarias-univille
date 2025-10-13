<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Carteiristas</h2>
      <router-link to="/carteiristas/criar" class="btn btn-success">+ Novo Carteirista</router-link>
    </div>
    <div v-if="isLoading" class="text-center py-5"><div class="spinner-border text-success" role="status"><span class="visually-hidden">Carregando...</span></div></div>
    <div v-else-if="carteiristas.length === 0" class="alert alert-info">Nenhum carteirista cadastrado.</div>
    <div v-else class="table-responsive">
      <table class="table table-striped table-hover"><thead class="table-success"><tr><th>ID</th><th>Nome</th><th>Telefone</th><th>Ações</th></tr></thead>
        <tbody>
          <tr v-for="c in carteiristas" :key="c.id"><td>{{ c.id }}</td><td>{{ c.nome }}</td><td>{{ c.telefone || '-' }}</td>
            <td>
              <router-link :to="`/carteiristas/${c.id}/editar`" class="btn btn-sm btn-primary me-2">Editar</router-link>
              <button @click="confirmDelete(c)" class="btn btn-sm btn-danger">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'CarteiristasList',
  setup() {
    const store = useStore()
    const carteiristas = computed(() => store.getters['carteiristas/allCarteiristas'])
    const isLoading = computed(() => store.getters['carteiristas/isLoading'])
    onMounted(() => store.dispatch('carteiristas/fetchCarteiristas'))
    const confirmDelete = async (item) => { if (confirm(`Excluir ${item.nome}?`)) { const res = await store.dispatch('carteiristas/deleteCarteirista', item.id); if (!res.success) alert(res.message) } }
    return { carteiristas, isLoading, confirmDelete }
  }
}
</script>
