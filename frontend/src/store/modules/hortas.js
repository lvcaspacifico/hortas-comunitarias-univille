import hortasService from '@/services/hortas.service'

const state = {
  hortas: [],
  currentHorta: null,
  loading: false,
  error: null
}

const getters = {
  allHortas: state => state.hortas,
  isLoading: state => state.loading
}

const mutations = {
  SET_HORTAS(state, hortas) {
    state.hortas = hortas
  },
  SET_CURRENT_HORTA(state, horta) {
    state.currentHorta = horta
  },
  ADD_HORTA(state, horta) {
    state.hortas.push(horta)
  },
  UPDATE_HORTA(state, updatedHorta) {
    const index = state.hortas.findIndex(h => h.id === updatedHorta.id)
    if (index !== -1) {
      state.hortas.splice(index, 1, updatedHorta)
    }
  },
  DELETE_HORTA(state, id) {
    state.hortas = state.hortas.filter(h => h.id !== id)
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  async fetchHortas({ commit }) {
    commit('SET_LOADING', true)
    try {
      const response = await hortasService.getAll()
      commit('SET_HORTAS', response.data)
      commit('SET_ERROR', null)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchHorta({ commit }, id) {
    commit('SET_LOADING', true)
    try {
      const response = await hortasService.getById(id)
      commit('SET_CURRENT_HORTA', response.data)
      commit('SET_ERROR', null)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createHorta({ commit }, data) {
    try {
      const response = await hortasService.create(data)
      commit('ADD_HORTA', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.detail || 'Erro ao criar horta'
      }
    }
  },

  async updateHorta({ commit }, { id, data }) {
    try {
      const response = await hortasService.update(id, data)
      commit('UPDATE_HORTA', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.detail || 'Erro ao atualizar horta'
      }
    }
  },

  async deleteHorta({ commit }, id) {
    try {
      await hortasService.delete(id)
      commit('DELETE_HORTA', id)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.detail || 'Erro ao deletar horta'
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
