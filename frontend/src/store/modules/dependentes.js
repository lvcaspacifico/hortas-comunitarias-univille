import dependentesService from '@/services/dependentes.service'

const state = {
  dependentes: [],
  currentDependente: null,
  loading: false,
  error: null
}

const getters = {
  allDependentes: state => state.dependentes,
  isLoading: state => state.loading
}

const mutations = {
  SET_DEPENDENTES(state, list) {
    state.dependentes = list
  },
  SET_CURRENT_DEPENDENTE(state, item) {
    state.currentDependente = item
  },
  ADD_DEPENDENTE(state, item) {
    state.dependentes.push(item)
  },
  UPDATE_DEPENDENTE(state, updated) {
    const i = state.dependentes.findIndex(d => d.id === updated.id)
    if (i !== -1) state.dependentes.splice(i, 1, updated)
  },
  DELETE_DEPENDENTE(state, id) {
    state.dependentes = state.dependentes.filter(d => d.id !== id)
  },
  SET_LOADING(state, val) {
    state.loading = val
  },
  SET_ERROR(state, err) {
    state.error = err
  }
}

const actions = {
  async fetchDependentes({ commit }, params = {}) {
    commit('SET_LOADING', true)
    try {
      const res = await dependentesService.getAll(params)
      let list = []
      if (Array.isArray(res.data)) list = res.data
      else if (res.data && Array.isArray(res.data.data)) list = res.data.data
      else if (res.data && Array.isArray(res.data.results))
        list = res.data.results
      else list = Array.isArray(res.data?.items) ? res.data.items : []

      commit('SET_DEPENDENTES', list)
      commit('SET_ERROR', null)
      return list
    } catch (err) {
      commit('SET_ERROR', err.message)
      return []
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchDependente({ commit }, id) {
    commit('SET_LOADING', true)
    try {
      const res = await dependentesService.getById(id)
      commit('SET_CURRENT_DEPENDENTE', res.data)
      commit('SET_ERROR', null)
      return res.data
    } catch (err) {
      commit('SET_ERROR', err.message)
      return null
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createDependente({ commit }, data) {
    try {
      const res = await dependentesService.create(data)
      commit('ADD_DEPENDENTE', res.data)
      return { success: true, data: res.data }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.detail || 'Erro ao criar dependente'
      }
    }
  },

  async updateDependente({ commit }, { id, data }) {
    try {
      const res = await dependentesService.update(id, data)
      commit('UPDATE_DEPENDENTE', res.data)
      return { success: true, data: res.data }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.detail || 'Erro ao atualizar dependente'
      }
    }
  },

  async deleteDependente({ commit }, id) {
    try {
      await dependentesService.delete(id)
      commit('DELETE_DEPENDENTE', id)
      return { success: true }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.detail || 'Erro ao deletar dependente'
      }
    }
  }
}

export default { namespaced: true, state, getters, mutations, actions }
