import associacoesService from '@/services/associacoes.service'

const state = {
  associacoes: [],
  currentAssociacao: null,
  loading: false,
  error: null
}

const getters = {
  allAssociacoes: (state) => state.associacoes,
  isLoading: (state) => state.loading
}

const mutations = {
  SET_ASSOCIACOES(state, associacoes) {
    state.associacoes = associacoes
  },
  
  SET_CURRENT_ASSOCIACAO(state, associacao) {
    state.currentAssociacao = associacao
  },
  
  ADD_ASSOCIACAO(state, associacao) {
    state.associacoes.push(associacao)
  },
  
  UPDATE_ASSOCIACAO(state, updatedAssociacao) {
    const index = state.associacoes.findIndex(a => a.id === updatedAssociacao.id)
    if (index !== -1) {
      state.associacoes.splice(index, 1, updatedAssociacao)
    }
  },
  
  DELETE_ASSOCIACAO(state, id) {
    state.associacoes = state.associacoes.filter(a => a.id !== id)
  },
  
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  async fetchAssociacoes({ commit }) {
    commit('SET_LOADING', true)
    try {
      const response = await associacoesService.getAll()
      commit('SET_ASSOCIACOES', response.data)
      commit('SET_ERROR', null)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  async fetchAssociacao({ commit }, id) {
    commit('SET_LOADING', true)
    try {
      const response = await associacoesService.getById(id)
      commit('SET_CURRENT_ASSOCIACAO', response.data)
      commit('SET_ERROR', null)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  async createAssociacao({ commit }, data) {
    try {
      const response = await associacoesService.create(data)
      commit('ADD_ASSOCIACAO', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.detail || 'Erro ao criar associação' 
      }
    }
  },
  
  async updateAssociacao({ commit }, { id, data }) {
    try {
      const response = await associacoesService.update(id, data)
      commit('UPDATE_ASSOCIACAO', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.detail || 'Erro ao atualizar associação' 
      }
    }
  },
  
  async deleteAssociacao({ commit }, id) {
    try {
      await associacoesService.delete(id)
      commit('DELETE_ASSOCIACAO', id)
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.detail || 'Erro ao deletar associação' 
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