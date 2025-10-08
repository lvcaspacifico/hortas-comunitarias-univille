import canteirosService from '@/services/canteiros.service'

const state = {
  canteiros: [],
  currentCanteiro: null,
  loading: false,
  error: null
}

const getters = {
  allCanteiros: state => state.canteiros,
  isLoading: state => state.loading
}

const mutations = {
  SET_CANTEIROS(state, canteiros) {
    state.canteiros = canteiros
  },
  SET_CURRENT_CANTEIRO(state, canteiro) {
    state.currentCanteiro = canteiro
  },
  ADD_CANTEIRO(state, canteiro) {
    state.canteiros.push(canteiro)
  },
  UPDATE_CANTEIRO(state, updated) {
    const i = state.canteiros.findIndex(c => c.id === updated.id)
    if (i !== -1) state.canteiros.splice(i, 1, updated)
  },
  DELETE_CANTEIRO(state, id) {
    state.canteiros = state.canteiros.filter(c => c.id !== id)
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  async fetchCanteiros({ commit }) {
    commit('SET_LOADING', true)
    try {
      const res = await canteirosService.getAll()
      commit('SET_CANTEIROS', res.data)
      commit('SET_ERROR', null)
    } catch (err) {
      commit('SET_ERROR', err.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async fetchCanteiro({ commit }, id) {
    commit('SET_LOADING', true)
    try {
      const res = await canteirosService.getById(id)
      commit('SET_CURRENT_CANTEIRO', res.data)
      commit('SET_ERROR', null)
    } catch (err) {
      commit('SET_ERROR', err.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async createCanteiro({ commit }, data) {
    try {
      const res = await canteirosService.create(data)
      commit('ADD_CANTEIRO', res.data)
      return { success: true, data: res.data }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.detail || 'Erro ao criar canteiro'
      }
    }
  },
  async updateCanteiro({ commit }, { id, data }) {
    try {
      const res = await canteirosService.update(id, data)
      commit('UPDATE_CANTEIRO', res.data)
      return { success: true, data: res.data }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.detail || 'Erro ao atualizar canteiro'
      }
    }
  },
  async deleteCanteiro({ commit }, id) {
    try {
      await canteirosService.delete(id)
      commit('DELETE_CANTEIRO', id)
      return { success: true }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.detail || 'Erro ao deletar canteiro'
      }
    }
  }
}

export default { namespaced: true, state, getters, mutations, actions }
