import Constants from 'expo-constants';

// ⚠️ IMPORTANTE: URL CORRETA DA API COM /v1
// Usa variável de ambiente em produção ou localhost em desenvolvimento
const isDevelopment = __DEV__;
export const API_URL = Constants.expoConfig?.extra?.apiUrl ||
                      (isDevelopment ? 'http://localhost:8181/api/v1' : 'https://hortas-comunitarias-univille-production.up.railway.app/api/v1');

// Log apenas em desenvolvimento
if (isDevelopment) {
  console.log('🌐 API URL configurada:', API_URL);
}

export const CONFIG = {
  apiTimeout: 60000, // 60 segundos (aumentado para conexões lentas)
  tokenKey: '@hortas:token',
  userKey: '@hortas:user',
};

export const PAGINATION = {
  defaultLimit: 20,
  maxLimit: 100,
};
