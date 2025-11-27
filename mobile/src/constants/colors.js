// Cores sincronizadas com o frontend Vue.js (Bootstrap 5)
export const COLORS = {
  // Principais (match com frontend)
  primary: '#28a745',        // Verde principal (Bootstrap success)
  primaryDark: '#218838',    // Hover verde
  primaryLight: '#5cb85c',   // Verde claro

  // Secundárias
  secondary: '#95a5a6',      // Cinza (Bootstrap secondary)
  secondaryDark: '#7f8c8d',  // Hover cinza
  secondaryLight: '#ecf0f1', // Cinza claro

  // Azul (usado em botões e ações)
  blue: '#2563eb',           // Azul primário (Bootstrap primary)
  blueDark: '#1f54d1',       // Hover azul
  blueLight: '#3b82f6',      // Azul claro

  // Estado
  success: '#28a745',        // Verde (mesmo que primary)
  error: '#e74c3c',          // Vermelho (Bootstrap danger)
  warning: '#ff922b',        // Laranja/Amarelo (Bootstrap warning)
  info: '#4c6ef5',           // Azul info

  // Neutras
  background: '#f8f9fa',     // Cinza muito claro (Bootstrap body bg)
  surface: '#FFFFFF',        // Branco puro
  text: '#212121',           // Texto escuro
  textSecondary: '#6c757d',  // Texto secundário (Bootstrap text-muted)
  border: '#dee2e6',         // Borda (Bootstrap border-color)
  disabled: '#BDBDBD',       // Desabilitado

  // Badges customizados (Pagamentos)
  badgePix: {
    bg: '#e3f2fd',           // Azul claro
    text: '#1976d2',         // Azul escuro
  },
  badgeDinheiro: {
    bg: '#f1f8e9',           // Verde claro
    text: '#558b2f',         // Verde escuro
  },

  // Notificações/Prioridades
  prioridadeBaixa: {
    bg: '#ecf0f1',           // Cinza claro
    text: '#7f8c8d',         // Cinza
  },
  prioridadeMedia: {
    bg: '#fff3cd',           // Amarelo claro
    text: '#856404',         // Marrom/Amarelo escuro
  },
  prioridadeAlta: {
    bg: '#f8d7da',           // Vermelho claro
    text: '#721c24',         // Vermelho escuro
  },

  // Status
  statusAtivo: {
    bg: '#d4edda',           // Verde claro
    text: '#155724',         // Verde escuro
  },
  statusInativo: {
    bg: '#f8d7da',           // Vermelho claro
    text: '#721c24',         // Vermelho escuro
  },

  // Transparências
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadowLight: 'rgba(0, 0, 0, 0.075)',
  shadowMedium: 'rgba(0, 0, 0, 0.15)',
};
