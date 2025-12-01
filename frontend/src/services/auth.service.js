import api from './api'

/**
 * Serviço de Autenticação
 * Gerencia login, cadastro e logout
 */
export default {
  /**
   * Realiza o login do usuário
   * @param {string} email - Email do usuário
   * @param {string} senha - Senha do usuário
   * @returns {Promise} Resposta da API com token
   */
  async login(email, senha) {
    try {
      const response = await api.post('/sessoes/login', {
        email,
        senha
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  },

  /**
   * Realiza o cadastro de nova associação e usuário administrador
   * @param {Object} data - Dados de cadastro
   * @param {Object} data.associacao - Dados da associação
   * @param {Object} data.usuario - Dados do usuário
   * @returns {Promise} Resposta da API
   */
  async cadastro(data) {
    try {
      const response = await api.post('/sessoes/cadastro', data)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  },

  /**
   * Realiza o logout do usuário (limpa dados locais)
   */
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete api.defaults.headers.common['Authorization']
  },

  /**
   * Trata erros da API
   * @param {Error} error - Erro capturado
   * @returns {Object} Objeto de erro formatado
   */
  handleError(error) {
    if (error.response) {
      // Erro de resposta da API
      const message =
        error.response.data?.detail ||
        error.response.data?.message ||
        'Erro ao processar requisição'

      return {
        status: error.response.status,
        message: message,
        data: error.response.data
      }
    } else if (error.request) {
      // Requisição foi feita mas não houve resposta
      return {
        status: 0,
        message: 'Erro de conexão. Verifique se o backend está rodando.',
        data: null
      }
    } else {
      // Erro ao configurar a requisição
      return {
        status: 0,
        message: error.message || 'Erro desconhecido',
        data: null
      }
    }
  }
}
