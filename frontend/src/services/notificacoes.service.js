import api from './api'

export default {
  getAll(params = {}) {
    return api.get('/notificacoes', { params })
  },
  getNotificacao(id) {
    return api.get(`/notificacoes/${id}`)
  },
  createNotificacao(data) {
    return api.post('/notificacoes', data)
  },
  updateNotificacao(id, data) {
    return api.put(`/notificacoes/${id}`, data)
  },
  deleteNotificacao(id) {
    return api.delete(`/notificacoes/${id}`)
  },
  markRead(id) {
    return api.post(`/notificacoes/${id}/marcar-lida`)
  },
  markAllRead() {
    return api.post(`/notificacoes/marcar-todas-lidas`)
  }
}
