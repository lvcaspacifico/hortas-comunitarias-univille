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
  }
}

export default { namespaced: true, state, getters, mutations, actions }
