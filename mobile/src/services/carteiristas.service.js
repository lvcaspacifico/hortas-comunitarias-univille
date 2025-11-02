// import api from './api';

/**
 * NOTA: Endpoint /carteiristas não existe no backend
 * Retornando dados vazios para evitar erro 404
 */

/**
 * Lista todos os carteiristas
 */
export const getCarteiristas = async (params = {}) => {
  // Endpoint não existe no backend - retornando array vazio
  console.warn('⚠️ Endpoint /carteiristas não implementado no backend');
  return [];
};

/**
 * Busca carteirista por UUID
 */
export const getCarteirista = async (uuid) => {
  // Endpoint não existe no backend - retornando null
  console.warn('⚠️ Endpoint /carteiristas não implementado no backend');
  return null;
};

/**
 * Cria novo carteirista
 */
export const createCarteirista = async (data) => {
  // Endpoint não existe no backend - retornando sucesso mock
  console.warn('⚠️ Endpoint /carteiristas não implementado no backend');
  return { success: true, message: 'Funcionalidade não disponível', data };
};

/**
 * Atualiza carteirista
 */
export const updateCarteirista = async (uuid, data) => {
  // Endpoint não existe no backend - retornando sucesso mock
  console.warn('⚠️ Endpoint /carteiristas não implementado no backend');
  return { success: true, message: 'Funcionalidade não disponível', data };
};

/**
 * Deleta carteirista
 */
export const deleteCarteirista = async (uuid) => {
  // Endpoint não existe no backend - retornando sucesso mock
  console.warn('⚠️ Endpoint /carteiristas não implementado no backend');
  return { success: true, message: 'Funcionalidade não disponível' };
};
