import api from './api';

/**
 * Service para gerenciar dependentes
 */

export const getAll = async () => {
  try {
    const response = await api.get('/dependentes');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const response = await api.get(`/dependentes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const create = async (dependenteData) => {
  try {
    const response = await api.post('/dependentes', dependenteData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const update = async (id, dependenteData) => {
  try {
    const response = await api.put(`/dependentes/${id}`, dependenteData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  try {
    const response = await api.delete(`/dependentes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
