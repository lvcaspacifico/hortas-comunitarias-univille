<template>
  <div class="container mt-4"><div class="row"><div class="col-md-8 mx-auto"><div class="card shadow"><div class="card-body">
    <h2 class="mb-4">Novo Carteirista</h2>
    <form @submit.prevent="handleSubmit">
      <FormInput id="nome" v-model="form.nome" label="Nome" :required="true" />
      <FormInput id="telefone" v-model="form.telefone" label="Telefone" />
      <div class="d-flex gap-2"><button type="submit" class="btn btn-success" :disabled="loading">{{ loading ? 'Salvando...' : 'Salvar' }}</button>
        <router-link to="/carteiristas" class="btn btn-secondary">Cancelar</router-link></div>
    </form>
  </div></div></div></div></div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import FormInput from '@/components/FormInput.vue'

export default { name: 'CarteiristasCreate', components: { FormInput }, setup() { const store = useStore(); const router = useRouter(); const form = reactive({ nome: '', telefone: '' }); const loading = ref(false); const handleSubmit = async () => { loading.value = true; const res = await store.dispatch('carteiristas/createCarteirista', form); loading.value = false; if (res.success) router.push('/carteiristas') }; return { form, loading, handleSubmit } } }
</script>
