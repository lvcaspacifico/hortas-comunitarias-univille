import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { BORDER_RADIUS, SPACING } from '../../constants/spacing';

/**
 * Badge component - Similar ao Badge do Bootstrap
 *
 * @param {string} variant - success | error | warning | info | secondary | pix | dinheiro | ativo | inativo | prioridadeBaixa | prioridadeMedia | prioridadeAlta
 * @param {ReactNode} children - Texto do badge
 * @param {string} size - sm | md | lg
 * @param {boolean} pill - Badge arredondado (rounded-pill)
 * @param {object} style - Estilos adicionais
 */
const Badge = ({
  variant = 'secondary',
  children,
  size = 'md',
  pill = false,
  style,
}) => {
  const badgeStyles = [
    styles.badge,
    getVariantStyle(variant),
    getSizeStyle(size),
    pill && styles.pill,
    style,
  ];

  return (
    <View style={badgeStyles}>
      <Text style={[styles.text, getTextColorStyle(variant), getSizeTextStyle(size)]}>
        {children}
      </Text>
    </View>
  );
};

// Estilos por variante
const getVariantStyle = (variant) => {
  switch (variant) {
    case 'success':
    case 'ativo':
      return {
        backgroundColor: COLORS.statusAtivo.bg,
      };
    case 'error':
    case 'inativo':
      return {
        backgroundColor: COLORS.statusInativo.bg,
      };
    case 'warning':
      return {
        backgroundColor: COLORS.warning + '20', // 20% opacidade
      };
    case 'info':
      return {
        backgroundColor: COLORS.info + '20',
      };
    case 'pix':
      return {
        backgroundColor: COLORS.badgePix.bg,
      };
    case 'dinheiro':
      return {
        backgroundColor: COLORS.badgeDinheiro.bg,
      };
    case 'prioridadeBaixa':
      return {
        backgroundColor: COLORS.prioridadeBaixa.bg,
      };
    case 'prioridadeMedia':
      return {
        backgroundColor: COLORS.prioridadeMedia.bg,
      };
    case 'prioridadeAlta':
      return {
        backgroundColor: COLORS.prioridadeAlta.bg,
      };
    case 'secondary':
    default:
      return {
        backgroundColor: COLORS.secondaryLight,
      };
  }
};

// Cor do texto por variante
const getTextColorStyle = (variant) => {
  switch (variant) {
    case 'success':
    case 'ativo':
      return { color: COLORS.statusAtivo.text };
    case 'error':
    case 'inativo':
      return { color: COLORS.statusInativo.text };
    case 'warning':
      return { color: COLORS.warning };
    case 'info':
      return { color: COLORS.info };
    case 'pix':
      return { color: COLORS.badgePix.text };
    case 'dinheiro':
      return { color: COLORS.badgeDinheiro.text };
    case 'prioridadeBaixa':
      return { color: COLORS.prioridadeBaixa.text };
    case 'prioridadeMedia':
      return { color: COLORS.prioridadeMedia.text };
    case 'prioridadeAlta':
      return { color: COLORS.prioridadeAlta.text };
    case 'secondary':
    default:
      return { color: COLORS.text };
  }
};

// Tamanhos
const getSizeStyle = (size) => {
  switch (size) {
    case 'sm':
      return {
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs / 2,
      };
    case 'lg':
      return {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
      };
    case 'md':
    default:
      return {
        paddingHorizontal: SPACING.sm + 2,
        paddingVertical: SPACING.xs,
      };
  }
};

const getSizeTextStyle = (size) => {
  switch (size) {
    case 'sm':
      return { fontSize: TYPOGRAPHY.sizes.caption };
    case 'lg':
      return { fontSize: TYPOGRAPHY.sizes.small };
    case 'md':
    default:
      return { fontSize: TYPOGRAPHY.sizes.badge };
  }
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: BORDER_RADIUS.md,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pill: {
    borderRadius: BORDER_RADIUS.pill,
  },
  text: {
    fontWeight: TYPOGRAPHY.weights.medium,
    textAlign: 'center',
  },
});

export default Badge;
