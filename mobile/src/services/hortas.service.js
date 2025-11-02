import api from './api';

/**
 * Lista todas as hortas
 */
export const getHortas = async (params = {}) => {
  try {
    const response = await api.get('/hortas', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Busca horta por UUID
 */
export const getHorta = async (uuid) => {
  try {
    const response = await api.get(`/hortas/${uuid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Cria nova horta
 */
export const createHorta = async (data) => {
  try {
    const response = await api.post('/hortas', data);
    return response.data;
  } catch (error) {
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
