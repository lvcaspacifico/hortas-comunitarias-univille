<template>
  <div class="container mt-4">
    <h3>Pagamentos</h3>
    <p class="text-muted">Acompanhe seus pagamentos e mensalidades dos canteiros</p>

    <PaymentsSummary :totalPaid="totalPaid" :pendingCount="pendingCount" :economia="economia" />

    <div class="card mb-4 p-3">
      <div class="d-flex">
        <input v-model="q" class="form-control me-2" placeholder="Buscar pagamentos..." />
        <button class="btn btn-outline-secondary">Filtros</button>
      </div>
    </div>

    <div>
      <PaymentItem v-for="p in pagamentos" :key="p.id" :pagamento="p" @pay="handlePay" />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import PaymentsSummary from '@/components/PaymentsSummary.vue'
import PaymentItem from '@/components/PaymentItem.vue'

export default {
  name: 'PagamentosList',
  components: { PaymentsSummary, PaymentItem },
  setup() {
    const store = useStore()
    const q = ref('')

    const pagamentos = computed(() => store.getters['pagamentos/allPagamentos'])
    const isLoading = computed(() => store.getters['pagamentos/isLoading'])

    const totalPaid = computed(() => pagamentos.value.filter(p => p.status === 'pago').reduce((s, p) => s + (p.valor || 0), 0))
    const pendingCount = computed(() => pagamentos.value.filter(p => p.status !== 'pago').length)
    const economia = computed(() => 0) // placeholder

    onMounted(() => {
      store.dispatch('pagamentos/fetchPagamentos')
    })

    const handlePay = async (pagamento) => {
      // placeholder: mark as paid locally and send update to backend
      const updated = { ...pagamento, status: 'pago', data_pagamento: new Date().toLocaleDateString('pt-BR') }
      await store.dispatch('pagamentos/updatePagamento', { id: pagamento.id, data: updated })
    }

    return { q, pagamentos, isLoading, totalPaid, pendingCount, economia, handlePay }
  }
}
</script>
