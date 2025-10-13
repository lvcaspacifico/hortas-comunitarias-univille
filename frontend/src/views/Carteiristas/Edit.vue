<template>
  <div class="container mt-4"><div class="row"><div class="col-md-8 mx-auto"><div class="card shadow"><div class="card-body">
    <h2 class="mb-4">Editar Carteirista</h2>
    <div v-if="isLoading" class="text-center py-5"><div class="spinner-border text-success"></div></div>
    <form v-else @submit.prevent="handleSubmit">
      <FormInput id="nome" v-model="form.nome" label="Nome" :required="true" />
      <FormInput id="telefone" v-model="form.telefone" label="Telefone" />
      <div class="d-flex gap-2"><button type="submit" class="btn btn-success" :disabled="loading">{{ loading ? 'Salvando...' : 'Salvar' }}</button>
        <router-link to="/carteiristas" class="btn btn-secondary">Cancelar</router-link></div>
    </form>
  </div></div></div></div></div>
</template>

<script>
import { reactive, ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import FormInput from '@/components/FormInput.vue'

export default {
  name: 'CarteiristasEdit', components: { FormInput },
  setup() {
    const store = useStore(); const router = useRouter(); const route = useRoute()
    const form = reactive({ nome: '', telefone: '' })
    const loading = ref(false)
    const isLoading = computed(() => store.getters['carteiristas/isLoading'])
    onMounted(async () => { const id = route.params.id; await store.dispatch('carteiristas/fetchCarteirista', id); const c = store.state.carteiristas.currentCarteirista; if (c) Object.assign(form, c) })
    const handleSubmit = async () => { loading.value = true; const res = await store.dispatch('carteiristas/updateCarteirista', { id: route.params.id, data: form }); loading.value = false; if (res.success) router.push('/carteiristas') }
    return { form, loading, isLoading, handleSubmit }
  }
}
</script>
