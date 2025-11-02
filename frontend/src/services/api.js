import axios from 'axios'

// URL base da API - ajuste conforme necessário
// Desenvolvimento local: http://localhost:8181/api/v1
// Docker: http://localhost:8181/api/v1
const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:8181/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
