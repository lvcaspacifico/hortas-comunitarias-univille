<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Hortas</h2>
      <router-link to="/hortas/criar" class="btn btn-success">
        + Nova Horta
      </router-link>
    </div>
    
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>
    
    <div v-else-if="hortas.length === 0" class="alert alert-info">
      Nenhuma horta cadastrada. Clique em "Nova Horta" para começar.
    </div>
    
    <div v-else class="table-responsive">
      <table class="table table-striped table-hover">
        <thead class="table-success">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Localização</th>
            <th>Telefone</th>
            <th>Responsável</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="h in hortas" :key="h.id">
            <td>
              <span class="font-monospace text-muted" :title="h.id">
                {{ h.id.substring(0, 8) }}...
              </span>
            </td>
            <td>{{ h.nome }}</td>
            <td>{{ h.localizacao || '-' }}</td>
            <td>{{ h.telefone || '-' }}</td>
            <td>{{ h.responsavel || '-' }}</td>
            <td>
              <router-link 
                :to="`/hortas/${h.id}/editar`"
                class="btn btn-sm btn-primary me-2"
              >
                Editar
              </router-link>
              <button 
                @click="confirmDelete(h)"
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
  name: 'HortasList',
  setup() {
    const store = useStore()
    
    const hortas = computed(() => store.getters['hortas/allHortas'])
    const isLoading = computed(() => store.getters['hortas/isLoading'])
    
    onMounted(() => {
      store.dispatch('hortas/fetchHortas')
    })
    
    const confirmDelete = async (item) => {
      if (confirm(`Tem certeza que deseja excluir "${item.nome}"?`)) {
        const result = await store.dispatch('hortas/deleteHorta', item.id)
        if (!result.success) {
          alert(result.message)
        }
      }
    }
    
    return {
      hortas,
      isLoading,
      confirmDelete
    }
  }
}
</script>
