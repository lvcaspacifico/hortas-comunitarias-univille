import api from './api'

export default {
  getAll(params = {}) {
    return api.get('/hortas', { params })
  },

  getById(id) {
    return api.get(`/hortas/${id}`)
  },

  create(data) {
    return api.post('/hortas', data)
  },

  update(id, data) {
    return api.put(`/hortas/${id}`, data)
  },

  delete(id) {
    return api.delete(`/hortas/${id}`)
  }
}
