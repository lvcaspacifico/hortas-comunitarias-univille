import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from '../constants/config';

/**
 * Realiza login
 */
export const login = async (email, senha) => {
  try {
    console.log('🔐 Tentando login com:', email);
    
    const response = await api.post('/sessoes/login', { // ← /sessoes com S
      email: email,
      senha: senha,
    });
    
    console.log('📦 Resposta da API:', JSON.stringify(response.data, null, 2));
    
    // Tenta diferentes formatos de resposta
    const token = response.data?.token || 
                  response.data?.data?.token || 
                  response.data?.jwt ||
                  response.data?.access_token;
    
    const usuario = response.data?.usuario || 
                    response.data?.data?.usuario ||
                    response.data?.user;
    
    console.log('🎫 Token encontrado?', !!token);
    console.log('👤 Usuário encontrado?', !!usuario);
    
    if (!token) {
      console.error('❌ Token não encontrado na resposta:', response.data);
      throw new Error('Token não recebido da API. Verifique se o backend está configurado corretamente.');
    }
    
    // Salva apenas o token inicialmente
    await AsyncStorage.setItem(CONFIG.tokenKey, token);
    console.log('✅ Token salvo no AsyncStorage');
    
    // Se usuário veio na resposta, salva direto
    if (usuario) {
      await AsyncStorage.setItem(CONFIG.userKey, JSON.stringify(usuario));
      console.log('✅ Usuário salvo no AsyncStorage');
      return { token, usuario };
    }
    
    // Se não veio, tenta buscar
    console.log('⏳ Buscando dados do usuário...');
    try {
      const userResponse = await api.get('/usuarios/me');
      const fetchedUser = userResponse.data;
      
      await AsyncStorage.setItem(CONFIG.userKey, JSON.stringify(fetchedUser));
      console.log('✅ Usuário buscado e salvo');
      return { token, usuario: fetchedUser };
    } catch (userError) {
      console.warn('⚠️ Não foi possível buscar usuário, mas login OK:', userError.message);
      // Login funcionou, mas não conseguimos buscar usuário
      // Retorna apenas o token e deixa o app funcionar
      return { token, usuario: { email } };
    }
    
  } catch (error) {
    console.error('❌ Erro no login:', error.message);
    console.error('❌ Detalhes:', error.response?.data);
    
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
    console.log('📝 Tentando cadastro para:', userData.email);
    
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
        data_de_nascimento: dataFormatada, // ← Data formatada
      }
    };
    
    console.log('📦 Payload do cadastro:', JSON.stringify(payload, null, 2));
    
    const response = await api.post('/sessoes/cadastro', payload); // ← /sessoes com S
    
    console.log('✅ Cadastro realizado:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('❌ Erro no cadastro:', error.message);
    console.error('❌ Detalhes:', error.response?.data);
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
