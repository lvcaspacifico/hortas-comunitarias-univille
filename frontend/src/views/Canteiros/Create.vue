<template>
  <div class="container mt-4">
    <div class="row"><div class="col-md-8 mx-auto"><div class="card shadow"><div class="card-body">
      <h2 class="mb-4">Novo Canteiro</h2>
      <form @submit.prevent="handleSubmit">
        <FormInput id="nome" v-model="form.nome" label="Nome" :required="true" />
        <FormInput id="horta_id" v-model="form.horta_id" label="Horta (ID)" />
        <div class="d-flex gap-2"><button type="submit" class="btn btn-success" :disabled="loading">{{ loading ? 'Salvando...' : 'Salvar' }}</button>
          <router-link to="/canteiros" class="btn btn-secondary">Cancelar</router-link></div>
      </form>
    </div></div></div></div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import FormInput from '@/components/FormInput.vue'

export default {
  name: 'CanteirosCreate', components: { FormInput },
  setup() {
    const store = useStore(); const router = useRouter()
    const form = reactive({ nome: '', horta_id: '' })
    const loading = ref(false)
    const handleSubmit = async () => { loading.value = true; const res = await store.dispatch('canteiros/createCanteiro', form); loading.value = false; if (res.success) router.push('/canteiros') }
    return { form, loading, handleSubmit }
  }
}
</script>
