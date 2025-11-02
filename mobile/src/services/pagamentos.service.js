// import api from './api';

/**
 * NOTA: Endpoint /pagamentos não existe no backend
 * Retornando dados vazios para evitar erro 404
 */

/**
 * Lista todos os pagamentos
 */
export const getPagamentos = async (params = {}) => {
  // Endpoint não existe no backend - retornando array vazio
  console.warn('⚠️ Endpoint /pagamentos não implementado no backend');
  return [];
};

/**
 * Busca pagamento por UUID
 */
export const getPagamento = async (uuid) => {
  // Endpoint não existe no backend - retornando null
  console.warn('⚠️ Endpoint /pagamentos não implementado no backend');
  return null;
};

/**
 * Cria novo pagamento
 */
export const createPagamento = async (data) => {
  // Endpoint não existe no backend - retornando sucesso mock
  console.warn('⚠️ Endpoint /pagamentos não implementado no backend');
  return { success: true, message: 'Funcionalidade não disponível', data };
};

/**
 * Atualiza pagamento
 */
export const updatePagamento = async (uuid, data) => {
  // Endpoint não existe no backend - retornando sucesso mock
  console.warn('⚠️ Endpoint /pagamentos não implementado no backend');
  return { success: true, message: 'Funcionalidade não disponível', data };
};

/**
 * Deleta pagamento
 */
export const deletePagamento = async (uuid) => {
  // Endpoint não existe no backend - retornando sucesso mock
  console.warn('⚠️ Endpoint /pagamentos não implementado no backend');
  return { success: true, message: 'Funcionalidade não disponível' };
};
