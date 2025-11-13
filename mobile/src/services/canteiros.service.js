import api from './api';

/**
 * Lista todos os canteiros
 */
export const getCanteiros = async (params = {}) => {
  try {
    console.log('🌿 Buscando canteiros...');
    const response = await api.get('/canteiros', { params });
    console.log('✅ Canteiros recebidos (raw):', JSON.stringify(response.data));
    console.log('✅ Canteiros é array?', Array.isArray(response.data));
    console.log('✅ Quantidade de canteiros:', response.data?.length || 0);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar canteiros:', error.message);
    console.error('❌ Detalhes:', error.response?.data);
    console.error('❌ Status:', error.response?.status);
    throw error;
  }
};

/**
 * Busca canteiro por UUID
 */
export const getCanteiro = async (uuid) => {
  try {
    console.log('🌿 Buscando canteiro:', uuid);
    const response = await api.get(`/canteiros/${uuid}`);
    console.log('✅ Canteiro recebido:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar canteiro:', error.message);
    console.error('❌ Detalhes:', error.response?.data);
    throw error;
  }
};

/**
 * Cria novo canteiro
 */
export const createCanteiro = async (data) => {
  try {
    console.log('🌿 Criando canteiro:', data);
    const response = await api.post('/canteiros', data);
    console.log('✅ Canteiro criado:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao criar canteiro:', error.message);
    console.error('❌ Detalhes:', error.response?.data);
    console.error('❌ Status:', error.response?.status);
    throw error;
  }
};

/**
 * Atualiza canteiro
 */
export const updateCanteiro = async (uuid, data) => {
  try {
    const response = await api.put(`/canteiros/${uuid}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Deleta canteiro
 */
export const deleteCanteiro = async (uuid) => {
  try {
    const response = await api.delete(`/canteiros/${uuid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
