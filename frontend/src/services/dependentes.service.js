import api from './api'

export default {
  getAll(params = {}) {
    // Optionally accept { canteiristaId } in params
    return api.get('/dependentes', { params })
  },

  getById(id) {
    return api.get(`/dependentes/${id}`)
  },

  create(data) {
    return api.post('/dependentes', data)
  },

  update(id, data) {
    return api.put(`/dependentes/${id}`, data)
  },

  delete(id) {
    return api.delete(`/dependentes/${id}`)
  }
}
