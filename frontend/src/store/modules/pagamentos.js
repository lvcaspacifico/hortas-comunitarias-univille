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
      commit('SET_PAGAMENTOS', res.data)
      commit('SET_ERROR', null)
    } catch (err) {
      commit('SET_ERROR', err.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async fetchPagamento({ commit }, id) {
    commit('SET_LOADING', true)
    try {
      const res = await pagamentosService.getById(id)
      commit('SET_CURRENT_PAGAMENTO', res.data)
      commit('SET_ERROR', null)
    } catch (err) {
      commit('SET_ERROR', err.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async createPagamento({ commit }, data) {
    try {
      const res = await pagamentosService.create(data)
      commit('ADD_PAGAMENTO', res.data)
      return { success: true, data: res.data }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.detail || 'Erro ao criar pagamento'
      }
    }
  },
  async updatePagamento({ commit }, { id, data }) {
    try {
      const res = await pagamentosService.update(id, data)
      commit('UPDATE_PAGAMENTO', res.data)
      return { success: true, data: res.data }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.detail || 'Erro ao atualizar pagamento'
      }
    }
  },
  async deletePagamento({ commit }, id) {
    try {
      await pagamentosService.delete(id)
      commit('DELETE_PAGAMENTO', id)
      return { success: true }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.detail || 'Erro ao deletar pagamento'
      }
    }
  }
}

export default { namespaced: true, state, getters, mutations, actions }
