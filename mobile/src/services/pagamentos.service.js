import api from './api';

/**
 * Service para gerenciar pagamentos
 */

export const getAll = async () => {
  try {
    const response = await api.get('/pagamentos');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const response = await api.get(`/pagamentos/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const create = async (pagamentoData) => {
  try {
    const response = await api.post('/pagamentos', pagamentoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const update = async (id, pagamentoData) => {
  try {
    const response = await api.put(`/pagamentos/${id}`, pagamentoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  try {
    const response = await api.delete(`/pagamentos/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
