import pagamentosService from '@/services/pagamentos.service'

const state = {
  pagamentos: [],
  currentPagamento: null,
  loading: false,
  error: null
}

const getters = {
  allPagamentos: state => state.pagamentos,
  isLoading: state => state.loading
}

const mutations = {
  SET_PAGAMENTOS(state, list) {
    state.pagamentos = list
  },
  SET_CURRENT_PAGAMENTO(state, p) {
    state.currentPagamento = p
  },
  ADD_PAGAMENTO(state, p) {
    state.pagamentos.push(p)
  },
  UPDATE_PAGAMENTO(state, updated) {
    const i = state.pagamentos.findIndex(x => x.id === updated.id)
    if (i !== -1) state.pagamentos.splice(i, 1, updated)
  },
  DELETE_PAGAMENTO(state, id) {
    state.pagamentos = state.pagamentos.filter(x => x.id !== id)
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  async fetchPagamentos({ commit }, params = {}) {
    commit('SET_LOADING', true)
    try {
      const res = await pagamentosService.getAll(params)
      const data = res.data?.data || res.data || []
      commit('SET_PAGAMENTOS', data)
      commit('SET_ERROR', null)
    } catch (err) {
      commit('SET_ERROR', err.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async fetchPagamentoById({ commit }, id) {
    commit('SET_LOADING', true)
    try {
      const res = await pagamentosService.getById(id)
      const data = res.data?.data || res.data
      commit('SET_CURRENT_PAGAMENTO', data)
      commit('SET_ERROR', null)
      return data
    } catch (err) {
      commit('SET_ERROR', err.message)
      throw err
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async createPagamento({ dispatch }, data) {
    try {
      const res = await pagamentosService.create(data)
      await dispatch('fetchPagamentos')
      return { success: true, data: res.data }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Erro ao criar pagamento')
    }
  },
  async updatePagamento({ dispatch }, payload) {
    try {
      const { id, ...data } = payload
      const res = await pagamentosService.update(id, data)
      await dispatch('fetchPagamentos')
      return { success: true, data: res.data }
    } catch (err) {
      throw new Error(
        err.response?.data?.message || 'Erro ao atualizar pagamento'
      )
    }
  },
  async deletePagamento({ commit }, id) {
    try {
      await pagamentosService.delete(id)
      commit('DELETE_PAGAMENTO', id)
      return { success: true }
    } catch (err) {
      throw new Error(
        err.response?.data?.message || 'Erro ao deletar pagamento'
      )
    }
  }
}

export default { namespaced: true, state, getters, mutations, actions }
