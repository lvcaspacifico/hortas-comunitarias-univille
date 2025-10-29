import api from './api';

/**
 * Lista todas as associações
 */
export const getAssociacoes = async (params = {}) => {
  try {
    const response = await api.get('/associacoes', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Busca associação por UUID
 */
export const getAssociacao = async (uuid) => {
  try {
    const response = await api.get(`/associacoes/${uuid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Cria nova associação
 */
export const createAssociacao = async (data) => {
  try {
    const response = await api.post('/associacoes', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Atualiza associação
 */
export const updateAssociacao = async (uuid, data) => {
  try {
    const response = await api.put(`/associacoes/${uuid}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Deleta associação
 */
export const deleteAssociacao = async (uuid) => {
  try {
    const response = await api.delete(`/associacoes/${uuid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
