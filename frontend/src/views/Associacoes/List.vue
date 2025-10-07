<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Associações</h2>
      <router-link to="/associacoes/criar" class="btn btn-success">
        + Nova Associação
      </router-link>
    </div>
    
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>
    
    <div v-else-if="associacoes.length === 0" class="alert alert-info">
      Nenhuma associação cadastrada. Clique em "Nova Associação" para começar.
    </div>
    
    <div v-else class="table-responsive">
      <table class="table table-striped table-hover">
        <thead class="table-success">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="assoc in associacoes" :key="assoc.id">
            <td>{{ assoc.id }}</td>
            <td>{{ assoc.nome }}</td>
            <td>{{ assoc.email || '-' }}</td>
            <td>{{ assoc.telefone || '-' }}</td>
            <td>
              <router-link 
                :to="`/associacoes/${assoc.id}/editar`"
                class="btn btn-sm btn-primary me-2"
              >
                Editar
              </router-link>
              <button 
                @click="confirmDelete(assoc)"
                class="btn btn-sm btn-danger"
              >
                Excluir
              </button>
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
  name: 'AssociacoesList',
  setup() {
    const store = useStore()
    
    const associacoes = computed(() => store.getters['associacoes/allAssociacoes'])
    const isLoading = computed(() => store.getters['associacoes/isLoading'])
    
    onMounted(() => {
      store.dispatch('associacoes/fetchAssociacoes')
    })
    
    const confirmDelete = async (item) => {
      if (confirm(`Tem certeza que deseja excluir "${item.nome}"?`)) {
        const result = await store.dispatch('associacoes/deleteAssociacao', item.id)
        if (!result.success) {
          alert(result.message)
        }
      }
    }
    
    return {
      associacoes,
      isLoading,
      confirmDelete
    }
  }
}
</script>