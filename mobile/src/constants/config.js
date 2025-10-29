import Constants from 'expo-constants';

// ⚠️ IMPORTANTE: URL CORRETA DA API COM /v1
export const API_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:8181/api/v1';

// Log da URL da API para debug
console.log('🌐 API URL configurada:', API_URL);

export const CONFIG = {
  apiTimeout: 30000, // 30 segundos
  tokenKey: '@hortas:token',
  userKey: '@hortas:user',
};

export const PAGINATION = {
  defaultLimit: 20,
  maxLimit: 100,
};
