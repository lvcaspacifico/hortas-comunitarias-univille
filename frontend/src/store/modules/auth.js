import authService from '@/services/auth.service'
import api from '@/services/api'
import { jwtDecode } from 'jwt-decode'

const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token')
}

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  currentUser: state => state.user
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
    // Configurar o token no header das requisições
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  },

  LOGOUT(state) {
    state.user = null
    state.token = null
    state.isAuthenticated = false
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
  }
}

const actions = {
  /**
   * Ação de login
   * @param {Object} credentials - { email, senha }
   */
  async login({ commit }, credentials) {
    try {
      const response = await authService.login(
        credentials.email,
        credentials.senha
      )

      // A API retorna apenas o token
      const token = response.token

      // Salvar o token
      commit('SET_TOKEN', token)

      // Decodificar o token para obter usuario_uuid
      const decoded = jwtDecode(token)
      console.log('🔑 Token decodificado:', decoded)

      // Buscar dados completos do usuário
      try {
        const userResponse = await api.get(`/usuarios/${decoded.usuario_uuid}`)
        console.log('👤 Dados do usuário:', userResponse.data)

        const userData = userResponse.data
        const user = {
          id: userData.uuid,
          nome: userData.nome_completo || userData.apelido || userData.email,
          email: userData.email,
          cargo: userData.cargo?.nome || userData.cargo?.slug || 'Usuário',
          cargo_uuid: decoded.cargo_uuid,
          associacao_uuid: decoded.associacao_uuid,
          horta_uuid: decoded.horta_uuid
        }

        commit('SET_USER', user)
      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err)
        // Se falhar, salva dados básicos
        const user = {
          nome: credentials.email.split('@')[0],
          email: credentials.email,
          cargo_uuid: decoded.cargo_uuid
        }
        commit('SET_USER', user)
      }

      return {
        success: true,
        token: token
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao fazer login',
        status: error.status
      }
    }
  },

  /**
   * Ação de cadastro
   * @param {Object} data - { associacao, usuario }
   */
  async cadastro(context, data) {
    try {
      const response = await authService.cadastro(data)

      // Após cadastro, a API retorna os dados criados
      // Podemos fazer login automático se necessário
      return {
        success: true,
        data: response
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao realizar cadastro',
        status: error.status
      }
    }
  },

  /**
   * Ação de logout
   */
  logout({ commit }) {
    authService.logout()
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
