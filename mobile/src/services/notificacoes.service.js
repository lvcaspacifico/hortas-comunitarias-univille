// import api from './api';

/**
 * NOTA: Endpoint /notificacoes não existe no backend
 * Retornando dados vazios para evitar erro 404
 */

/**
 * Lista todas as notificações
 */
export const getNotificacoes = async (params = {}) => {
  // Endpoint não existe no backend - retornando array vazio
  console.warn('⚠️ Endpoint /notificacoes não implementado no backend');
  return [];
};

/**
 * Marca notificação como lida
 */
export const markNotificacaoRead = async (uuid) => {
  // Endpoint não existe no backend - retornando sucesso mock
  console.warn('⚠️ Endpoint /notificacoes não implementado no backend');
  return { success: true, message: 'Funcionalidade não disponível' };
};

/**
 * Marca todas as notificações como lidas
 */
export const markAllNotificacoesRead = async () => {
  // Endpoint não existe no backend - retornando sucesso mock
  console.warn('⚠️ Endpoint /notificacoes não implementado no backend');
  return { success: true, message: 'Funcionalidade não disponível' };
};
