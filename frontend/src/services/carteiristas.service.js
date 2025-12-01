import api from './api'

export default {
  getAll(params = {}) {
    return api.get('/carteiristas', { params })
  },

  getById(id) {
    return api.get(`/carteiristas/${id}`)
  },

  create(data) {
    return api.post('/carteiristas', data)
  },

  update(id, data) {
    return api.put(`/carteiristas/${id}`, data)
  },

  delete(id) {
    return api.delete(`/carteiristas/${id}`)
  }
}
