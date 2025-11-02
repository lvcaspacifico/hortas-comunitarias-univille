// import api from './api';

/**
 * NOTA: Endpoint /dependentes não existe no backend
 * Retornando dados vazios para evitar erro 404
 */

/**
 * Lista todos os dependentes
 */
export const getDependentes = async (params = {}) => {
  // Endpoint não existe no backend - retornando array vazio
  console.warn('⚠️ Endpoint /dependentes não implementado no backend');
  return [];
};

/**
 * Busca dependente por UUID
 */
export const getDependente = async (uuid) => {
  // Endpoint não existe no backend - retornando null
  console.warn('⚠️ Endpoint /dependentes não implementado no backend');
  return null;
};

/**
 * Cria novo dependente
 */
export const createDependente = async (data) => {
  // Endpoint não existe no backend - retornando sucesso mock
  console.warn('⚠️ Endpoint /dependentes não implementado no backend');
  return { success: true, message: 'Funcionalidade não disponível', data };
};

/**
 * Atualiza dependente
 */
export const updateDependente = async (uuid, data) => {
  // Endpoint não existe no backend - retornando sucesso mock
  console.warn('⚠️ Endpoint /dependentes não implementado no backend');
  return { success: true, message: 'Funcionalidade não disponível', data };
};

/**
 * Deleta dependente
 */
export const deleteDependente = async (uuid) => {
  // Endpoint não existe no backend - retornando sucesso mock
  console.warn('⚠️ Endpoint /dependentes não implementado no backend');
  return { success: true, message: 'Funcionalidade não disponível' };
};
