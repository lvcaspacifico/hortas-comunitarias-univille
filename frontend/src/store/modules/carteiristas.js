import carteiristasService from '@/services/carteiristas.service'

const state = {
  carteiristas: [],
  currentCarteirista: null,
  loading: false,
  error: null
}

const getters = {
  allCarteiristas: state => state.carteiristas,
  isLoading: state => state.loading
}

const mutations = {
  SET_CARTEIRISTAS(state, list) {
    state.carteiristas = list
  },
  SET_CURRENT_CARTEIRISTA(state, item) {
    state.currentCarteirista = item
  },
  ADD_CARTEIRISTA(state, item) {
    state.carteiristas.push(item)
  },
  UPDATE_CARTEIRISTA(state, updated) {
    const i = state.carteiristas.findIndex(c => c.id === updated.id)
    if (i !== -1) state.carteiristas.splice(i, 1, updated)
  },
  DELETE_CARTEIRISTA(state, id) {
    state.carteiristas = state.carteiristas.filter(c => c.id !== id)
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  async fetchCarteiristas({ commit }) {
    commit('SET_LOADING', true)
    try {
      const res = await carteiristasService.getAll()
      commit('SET_CARTEIRISTAS', res.data)
      commit('SET_ERROR', null)
    } catch (err) {
      commit('SET_ERROR', err.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async fetchCarteirista({ commit }, id) {
    commit('SET_LOADING', true)
    try {
      const res = await carteiristasService.getById(id)
      commit('SET_CURRENT_CARTEIRISTA', res.data)
      commit('SET_ERROR', null)
    } catch (err) {
      commit('SET_ERROR', err.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async createCarteirista({ commit }, data) {
    try {
      const res = await carteiristasService.create(data)
      commit('ADD_CARTEIRISTA', res.data)
      return { success: true, data: res.data }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.detail || 'Erro ao criar carteirista'
      }
    }
  },
  async updateCarteirista({ commit }, { id, data }) {
    try {
      const res = await carteiristasService.update(id, data)
      commit('UPDATE_CARTEIRISTA', res.data)
      return { success: true, data: res.data }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.detail || 'Erro ao atualizar carteirista'
      }
    }
  },
  async deleteCarteirista({ commit }, id) {
    try {
      await carteiristasService.delete(id)
      commit('DELETE_CARTEIRISTA', id)
      return { success: true }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.detail || 'Erro ao deletar carteirista'
      }
    }
  }
}

export default { namespaced: true, state, getters, mutations, actions }
