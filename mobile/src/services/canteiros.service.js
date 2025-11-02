import api from './api';

/**
 * Lista todos os canteiros
 */
export const getCanteiros = async (params = {}) => {
  try {
    const response = await api.get('/canteiros', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Busca canteiro por UUID
 */
export const getCanteiro = async (uuid) => {
  try {
    const response = await api.get(`/canteiros/${uuid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Cria novo canteiro
 */
export const createCanteiro = async (data) => {
  try {
    const response = await api.post('/canteiros', data);
    return response.data;
  } catch (error) {
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
