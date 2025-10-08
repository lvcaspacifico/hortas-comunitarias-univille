<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Canteiros</h2>
      <router-link to="/canteiros/criar" class="btn btn-success">+ Novo Canteiro</router-link>
    </div>
    <div v-if="isLoading" class="text-center py-5"><div class="spinner-border text-success" role="status"><span class="visually-hidden">Carregando...</span></div></div>
    <div v-else-if="canteiros.length === 0" class="alert alert-info">Nenhum canteiro cadastrado.</div>
    <div v-else class="table-responsive">
      <table class="table table-striped table-hover"><thead class="table-success"><tr><th>ID</th><th>Nome</th><th>Horta</th><th>Ações</th></tr></thead>
        <tbody>
          <tr v-for="c in canteiros" :key="c.id"><td>{{ c.id }}</td><td>{{ c.nome }}</td><td>{{ c.horta_nome || '-' }}</td>
            <td>
              <router-link :to="`/canteiros/${c.id}/editar`" class="btn btn-sm btn-primary me-2">Editar</router-link>
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
  name: 'CanteirosList',
  setup() {
    const store = useStore()
    const canteiros = computed(() => store.getters['canteiros/allCanteiros'])
    const isLoading = computed(() => store.getters['canteiros/isLoading'])
    onMounted(() => store.dispatch('canteiros/fetchCanteiros'))
    const confirmDelete = async (item) => { if (confirm(`Excluir ${item.nome}?`)) { const res = await store.dispatch('canteiros/deleteCanteiro', item.id); if (!res.success) alert(res.message) } }
    return { canteiros, isLoading, confirmDelete }
  }
}
</script>
