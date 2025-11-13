import api from './api';

/**
 * Lista todas as hortas
 */
export const getHortas = async (params = {}) => {
  try {
    console.log('🌱 Buscando hortas...');
    const response = await api.get('/hortas', { params });
    console.log('✅ Hortas recebidas:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar hortas:', error.message);
    console.error('❌ Detalhes:', error.response?.data);
    console.error('❌ Status:', error.response?.status);
    throw error;
  }
};

/**
 * Busca horta por UUID
 */
export const getHorta = async (uuid) => {
  try {
    console.log('🌱 Buscando horta:', uuid);
    const response = await api.get(`/hortas/${uuid}`);
    console.log('✅ Horta recebida:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar horta:', error.message);
    console.error('❌ Detalhes:', error.response?.data);
    throw error;
  }
};

/**
 * Cria nova horta
 */
export const createHorta = async (data) => {
  try {
    console.log('🌱 Criando horta:', data);
    const response = await api.post('/hortas', data);
    console.log('✅ Horta criada:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao criar horta:', error.message);
    console.error('❌ Detalhes:', error.response?.data);
    console.error('❌ Status:', error.response?.status);
    throw error;
  }
};

/**
 * Atualiza horta
 */
export const updateHorta = async (uuid, data) => {
  try {
    const response = await api.put(`/hortas/${uuid}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Deleta horta
 */
export const deleteHorta = async (uuid) => {
  try {
    const response = await api.delete(`/hortas/${uuid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
