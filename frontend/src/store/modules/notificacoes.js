import notificacoesService from '@/services/notificacoes.service'

const state = {
  notificacoes: [],
  loading: false,
  error: null
}

const getters = {
  allNotificacoes: s => s.notificacoes,
  unreadCount: s => s.notificacoes.filter(n => !n.lida).length,
  thisWeekCount: s =>
    s.notificacoes.filter(() => /* naive: created_at within 7 days */ true)
      .length,
  alertsCount: s => s.notificacoes.filter(n => n.type === 'alerta').length,
  isLoading: s => s.loading
}

const mutations = {
  SET_NOTIFICACOES(state, list) {
    state.notificacoes = list
  },
  SET_LOADING(state, val) {
    state.loading = val
  },
  SET_ERROR(state, err) {
    state.error = err
  },
  MARK_READ(state, id) {
    const i = state.notificacoes.findIndex(n => n.id === id)
    if (i !== -1) state.notificacoes[i].lida = true
  },
  MARK_ALL_READ(state) {
    state.notificacoes = state.notificacoes.map(n => ({ ...n, lida: true }))
  },
  REMOVE_NOTIFICACAO(state, id) {
    state.notificacoes = state.notificacoes.filter(n => n.id !== id)
  }
}

const actions = {
  async fetchNotificacoes({ commit }, params = {}) {
    commit('SET_LOADING', true)
    try {
      const res = await notificacoesService.getAll(params)
      const list = Array.isArray(res.data) ? res.data : res.data?.data || []
      commit('SET_NOTIFICACOES', list)
      commit('SET_ERROR', null)
      return list
    } catch (err) {
      commit('SET_ERROR', err.message)
      return []
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async markRead({ commit }, id) {
    try {
      await notificacoesService.markRead(id)
      commit('MARK_READ', id)
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  },

  async markAllRead({ commit }) {
    try {
      await notificacoesService.markAllRead()
      commit('MARK_ALL_READ')
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  },

  async fetchNotificacaoById({ commit }, id) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      console.log('🔍 Store: Buscando notificação ID:', id)
      const response = await notificacoesService.getNotificacao(id)
      console.log('📦 Store: Response do service:', response)
      console.log('📊 Store: Response.data:', response.data)
      return response.data
    } catch (err) {
      console.error('❌ Store: Erro ao buscar:', err)
      commit('SET_ERROR', err.message)
      throw err
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createNotificacao({ dispatch }, data) {
    try {
      const response = await notificacoesService.createNotificacao(data)
      console.log('Notificação criada:', response)
      // Recarrega a lista após criar
      await dispatch('fetchNotificacoes')
      return { success: true, data: response }
    } catch (err) {
      console.error('Erro ao criar notificação:', err)
      return { success: false, message: err.message }
    }
  },

  async updateNotificacao({ dispatch }, { id, data }) {
    try {
      const response = await notificacoesService.updateNotificacao(id, data)
      console.log('Notificação atualizada:', response)
      // Recarrega a lista após atualizar
      await dispatch('fetchNotificacoes')
      return { success: true, data: response }
    } catch (err) {
      console.error('Erro ao atualizar notificação:', err)
      return { success: false, message: err.message }
    }
  },

  async deleteNotificacao({ commit }, id) {
    try {
      await notificacoesService.deleteNotificacao(id)
      commit('REMOVE_NOTIFICACAO', id)
      return { success: true }
    } catch (err) {
      console.error('Erro ao excluir notificação:', err)
      return { success: false, message: err.message }
    }
  }
}

export default { namespaced: true, state, getters, mutations, actions }
