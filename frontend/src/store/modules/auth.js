import api from '@/services/api'

const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token')
}

const getters = {
  isAuthenticated: (state) => state.isAuthenticated,
  currentUser: (state) => state.user
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
    state.isAuthenticated = true
    localStorage.setItem('user', JSON.stringify(user))
  },
  
  SET_TOKEN(state, token) {
    state.token = token
    localStorage.setItem('token', token)
  },
  
  LOGOUT(state) {
    state.user = null
    state.token = null
    state.isAuthenticated = false
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
}

const actions = {
  async login({ commit }, credentials) {
    try {
      const response = await api.post('/auth/login', credentials)
      const { token, user } = response.data
      
      commit('SET_TOKEN', token)
      commit('SET_USER', user)
      
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.detail || 'Erro ao fazer login' 
      }
    }
  },
  
  logout({ commit }) {
    commit('LOGOUT')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}