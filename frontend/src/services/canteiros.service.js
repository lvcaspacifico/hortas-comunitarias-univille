import api from './api'

export default {
  getAll(params = {}) {
    return api.get('/canteiros', { params })
  },

  getById(id) {
    return api.get(`/canteiros/${id}`)
  },

  create(data) {
    return api.post('/canteiros', data)
  },

  update(id, data) {
    return api.put(`/canteiros/${id}`, data)
  },

  delete(id) {
    return api.delete(`/canteiros/${id}`)
  }
}
