import api from './api'

export default {
  getAll(params = {}) {
    return api.get('/associacoes', { params })
  },

  getById(id) {
    return api.get(`/associacoes/${id}`)
  },

  create(data) {
    return api.post('/associacoes', data)
  },

  update(id, data) {
    return api.put(`/associacoes/${id}`, data)
  },

  delete(id) {
    return api.delete(`/associacoes/${id}`)
  }
}