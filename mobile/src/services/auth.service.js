import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from '../constants/config';

/**
 * Decodifica JWT para extrair payload (sem validação)
 */
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('❌ Erro ao decodificar JWT:', error);
    return null;
  }
};

/**
 * Realiza login
 */
export const login = async (email, senha) => {
  try {
    console.log('🔐 Tentando login com:', email);
    
    const response = await api.post('/sessoes/login', {
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
    
    // Se não veio, tenta buscar usando o UUID do token
    console.log('⏳ Buscando dados do usuário...');
    
    // Decodifica JWT para pegar o usuario_uuid
    const payload = decodeJWT(token);
    console.log('🔓 Payload completo do token:', JSON.stringify(payload, null, 2));
    console.log('🆔 usuario_uuid:', payload?.usuario_uuid);
    console.log('👔 cargo_uuid:', payload?.cargo_uuid);
    console.log('🏢 associacao_uuid:', payload?.associacao_uuid);
    
    if (!payload?.usuario_uuid) {
      console.warn('⚠️ UUID não encontrado no token');
      const minimalUser = { email };
      await AsyncStorage.setItem(CONFIG.userKey, JSON.stringify(minimalUser));
      return { token, usuario: minimalUser };
    }
    
    try {
      console.log('🔍 Tentando buscar usuário pelo UUID:', payload.usuario_uuid);
      const userResponse = await api.get(`/usuarios/${payload.usuario_uuid}`);
      const fetchedUser = userResponse.data;
      
      await AsyncStorage.setItem(CONFIG.userKey, JSON.stringify(fetchedUser));
      console.log('✅ Usuário buscado e salvo completo');
      return { token, usuario: fetchedUser };
    } catch (userError) {
      console.warn('⚠️ Não foi possível buscar usuário da API:', userError.message);
      console.log('💡 Criando usuário básico a partir do token JWT');
      
      // Fallback: cria usuário básico com dados do token
      // Isso permite que o app funcione mesmo sem conseguir buscar o usuário completo
      const basicUser = {
        uuid: payload.usuario_uuid,
        email: email,
        cargo_uuid: payload.cargo_uuid,
        associacao_uuid: payload.associacao_uuid,
        horta_uuid: payload.horta_uuid,
        // Nome será atualizado quando possível
        nome_completo: email.split('@')[0], // Usa parte do email como fallback
      };
      
      await AsyncStorage.setItem(CONFIG.userKey, JSON.stringify(basicUser));
      console.log('✅ Usuário básico salvo:', basicUser);
      return { token, usuario: basicUser };
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
 * Gera um CNPJ único baseado no CPF do usuário
 * Formato: Usa os 8 primeiros dígitos do CPF + 0001 + dígitos verificadores gerados
 */
const gerarCNPJdoCPF = (cpf) => {
  // Remove formatação do CPF
  const cpfLimpo = cpf.replace(/[^\d]/g, '');
  
  // Usa os primeiros 8 dígitos do CPF como base
  const base = cpfLimpo.substring(0, 8);
  
  // Adiciona 0001 (filial)
  const cnpjSemDV = base + '0001';
  
  // Calcula primeiro dígito verificador
  let soma = 0;
  let peso = 5;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpjSemDV[i]) * peso;
    peso = peso === 2 ? 9 : peso - 1;
  }
  const dv1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  
  // Calcula segundo dígito verificador
  const cnpjComDV1 = cnpjSemDV + dv1;
  soma = 0;
  peso = 6;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpjComDV1[i]) * peso;
    peso = peso === 2 ? 9 : peso - 1;
  }
  const dv2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  
  return cnpjSemDV + dv1 + dv2;
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
    
    // Gera CNPJ único baseado no CPF do usuário
    const cnpjGerado = gerarCNPJdoCPF(userData.cpf_cnpj);
    console.log('🔢 CNPJ gerado a partir do CPF:', cnpjGerado);
    
    // Gera nome de associação baseado no nome do usuário
    const primeiroNome = userData.nome.split(' ')[0];
    const ultimoNome = userData.nome.split(' ').slice(-1)[0];
    const nomeAssociacao = `Associação ${primeiroNome} ${ultimoNome}`;
    
    // Monta estrutura esperada pela API
    const payload = {
      associacao: {
        cnpj: cnpjGerado,
        razao_social: nomeAssociacao,
        nome_fantasia: nomeAssociacao,
      },
      usuario: {
        nome_completo: userData.nome,
        cpf: userData.cpf_cnpj,
        email: userData.email,
        senha: userData.senha,
        apelido: userData.apelido || primeiroNome,
        data_de_nascimento: dataFormatada,
      }
    };
    
    console.log('📦 Payload do cadastro:', JSON.stringify(payload, null, 2));
    
    const response = await api.post('/sessoes/cadastro', payload);
    
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
