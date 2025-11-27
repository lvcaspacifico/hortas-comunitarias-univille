import api from './api';

/**
 * Service para gerenciar carteiristas
 * (usado principalmente para selects em Pagamentos e Dependentes)
 */

export const getAll = async () => {
  try {
    const response = await api.get('/carteiristas');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const response = await api.get(`/carteiristas/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const create = async (carteiristaData) => {
  try {
    const response = await api.post('/carteiristas', carteiristaData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const update = async (id, carteiristaData) => {
  try {
    const response = await api.put(`/carteiristas/${id}`, carteiristaData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  try {
    const response = await api.delete(`/carteiristas/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
