// Sistema de tipografia sincronizado com o frontend Vue.js
export const TYPOGRAPHY = {
  // Tamanhos de fonte
  sizes: {
    display: 56,      // H1 grande (display-4 do Bootstrap)
    h1: 32,           // H1
    h2: 28,           // H2
    h3: 24,           // H3
    h4: 20,           // H4
    h5: 18,           // H5
    body: 16,         // Texto padrão
    small: 14,        // Texto pequeno
    caption: 12,      // Legendas, hints
    badge: 11,        // Badges
  },

  // Pesos de fonte
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Estilos de texto pré-definidos
  styles: {
    displayLarge: {
      fontSize: 56,
      fontWeight: '700',
      lineHeight: 64,
    },
    h1: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 40,
    },
    h2: {
      fontSize: 28,
      fontWeight: '600',
      lineHeight: 36,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
    },
    h4: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
    },
    h5: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 24,
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    bodyMedium: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
    },
    small: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
    },
    badge: {
      fontSize: 11,
      fontWeight: '500',
      lineHeight: 16,
    },
  },
};
