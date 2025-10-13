import api from './api'

export default {
  getAll(params = {}) {
    return api.get('/notificacoes', { params })
  },
  markRead(id) {
    return api.post(`/notificacoes/${id}/marcar-lida`)
  },
  markAllRead() {
    return api.post(`/notificacoes/marcar-todas-lidas`)
  }
}
