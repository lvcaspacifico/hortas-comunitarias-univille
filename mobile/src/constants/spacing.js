// Sistema de espaçamento sincronizado com Bootstrap 5
// Valores equivalentes ao sistema do Bootstrap (1rem = 16px)

export const SPACING = {
  // Espaçamentos padrão (em pixels)
  xs: 4,    // 0.25rem - Bootstrap spacing 1
  sm: 8,    // 0.5rem  - Bootstrap spacing 2
  md: 16,   // 1rem    - Bootstrap spacing 3
  lg: 24,   // 1.5rem  - Bootstrap spacing 4
  xl: 48,   // 3rem    - Bootstrap spacing 5

  // Aliases para uso específico
  tiny: 2,
  none: 0,
};

// Border radius (match com Bootstrap)
export const BORDER_RADIUS = {
  none: 0,
  sm: 4,          // .rounded
  md: 8,          // .rounded-3
  lg: 12,         // Customizado para mobile
  xl: 16,         // .rounded-4
  pill: 999,      // .rounded-pill
  circle: 9999,   // .rounded-circle
};

// Elevação (sombras)
export const ELEVATION = {
  none: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.075,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};
