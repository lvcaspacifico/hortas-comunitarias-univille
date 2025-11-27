import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, CONFIG } from '../constants/config';

// Cria instância do axios
const api = axios.create({
  baseURL: API_URL,
  timeout: CONFIG.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem(CONFIG.tokenKey);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      // Apenas loga em desenvolvimento
      if (__DEV__) {
        console.error('Erro ao recuperar token:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token inválido ou expirado - fazer logout
      await AsyncStorage.multiRemove([CONFIG.tokenKey, CONFIG.userKey]);
      // Você pode adicionar navegação para tela de login aqui
    }
    
    // Formata mensagem de erro de forma mais robusta
    let message = 'Erro ao conectar com o servidor';
    
    if (error.response?.data) {
      const data = error.response.data;
      // Tenta diferentes formatos de mensagem de erro
      message = data.message || 
                data.error || 
                data.mensagem ||
                (typeof data === 'string' ? data : message);
    } else if (error.request) {
      message = 'Sem resposta do servidor. Verifique sua conexão.';
    } else if (error.message) {
      message = error.message;
    }
    
    return Promise.reject({
      ...error,
      message,
    });
  }
);

export default api;
