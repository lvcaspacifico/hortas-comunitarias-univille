import api from './api';

/**
 * Lista todos os usuários
 */
export const getUsuarios = async (params = {}) => {
  try {
    const response = await api.get('/usuarios', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Busca usuário por UUID
 */
export const getUsuario = async (uuid) => {
  try {
    const response = await api.get(`/usuarios/${uuid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Cria novo usuário
 */
export const createUsuario = async (data) => {
  try {
    const response = await api.post('/usuarios', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Atualiza usuário
 */
export const updateUsuario = async (uuid, data) => {
  try {
    const response = await api.put(`/usuarios/${uuid}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Deleta usuário
 */
export const deleteUsuario = async (uuid) => {
  try {
    const response = await api.delete(`/usuarios/${uuid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
