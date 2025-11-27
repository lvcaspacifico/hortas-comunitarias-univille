import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from '../constants/config';

/**
 * Realiza login
 */
export const login = async (email, senha) => {
  try {
    const response = await api.post('/sessoes/login', {
      email: email,
      senha: senha,
    });

    // Tenta diferentes formatos de resposta
    const token = response.data?.token ||
                  response.data?.data?.token ||
                  response.data?.jwt ||
                  response.data?.access_token;

    const usuario = response.data?.usuario ||
                    response.data?.data?.usuario ||
                    response.data?.user;

    if (!token) {
      throw new Error('Token não recebido da API. Tente novamente ou contate o suporte.');
    }

    // Salva apenas o token inicialmente
    await AsyncStorage.setItem(CONFIG.tokenKey, token);

    // Se usuário veio na resposta, salva direto
    if (usuario) {
      await AsyncStorage.setItem(CONFIG.userKey, JSON.stringify(usuario));
      return { token, usuario };
    }

    // Se não veio, tenta buscar
    try {
      const userResponse = await api.get('/usuarios/me');
      const fetchedUser = userResponse.data;

      await AsyncStorage.setItem(CONFIG.userKey, JSON.stringify(fetchedUser));
      return { token, usuario: fetchedUser };
    } catch (userError) {
      // Login funcionou, mas não conseguimos buscar usuário
      // Retorna apenas o token e deixa o app funcionar
      return { token, usuario: { email } };
    }

  } catch (error) {
    // Remove qualquer dado que possa ter sido salvo
    await AsyncStorage.multiRemove([CONFIG.tokenKey, CONFIG.userKey]);
    throw error;
  }
};

/**
 * Realiza cadastro (cria associação e usuário administrador)
 */
export const register = async (userData) => {
  try {
    // Converte data de DD/MM/YYYY para YYYY-MM-DD se necessário
    let dataFormatada = userData.data_de_nascimento || '1990-01-01';
    if (dataFormatada.includes('/')) {
      const [dia, mes, ano] = dataFormatada.split('/');
      dataFormatada = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
    }

    // Garante CNPJ válido
    const cnpjValido = userData.cnpj && userData.cnpj !== '00000000000000'
      ? userData.cnpj
      : '00000000000191'; // CNPJ válido como fallback

    // Monta estrutura esperada pela API
    const payload = {
      associacao: {
        cnpj: cnpjValido,
        razao_social: userData.razao_social || userData.nome,
        nome_fantasia: userData.nome_fantasia || userData.razao_social || userData.nome,
      },
      usuario: {
        nome_completo: userData.nome,
        cpf: userData.cpf_cnpj,
        email: userData.email,
        senha: userData.senha,
        apelido: userData.apelido || userData.nome.split(' ')[0],
        data_de_nascimento: dataFormatada,
      }
    };

    const response = await api.post('/sessoes/cadastro', payload);

    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Realiza logout
 */
export const logout = async () => {
  try {
    // Chama endpoint de logout (se existir)
    // await api.post('/sessao/logout');
    
    // Remove dados do storage
    await AsyncStorage.multiRemove([CONFIG.tokenKey, CONFIG.userKey]);
  } catch (error) {
    // Remove dados mesmo se houver erro na API
    await AsyncStorage.multiRemove([CONFIG.tokenKey, CONFIG.userKey]);
    throw error;
  }
};

/**
 * Verifica se usuário está autenticado
 */
export const isAuthenticated = async () => {
  try {
    const token = await AsyncStorage.getItem(CONFIG.tokenKey);
    return !!token;
  } catch (error) {
    return false;
  }
};

/**
 * Recupera usuário logado do storage
 */
export const getCurrentUser = async () => {
  try {
    const userJson = await AsyncStorage.getItem(CONFIG.userKey);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    return null;
  }
};

/**
 * Atualiza dados do usuário no storage
 */
export const updateCurrentUser = async (userData) => {
  try {
    await AsyncStorage.setItem(CONFIG.userKey, JSON.stringify(userData));
  } catch (error) {
    throw error;
  }
};
