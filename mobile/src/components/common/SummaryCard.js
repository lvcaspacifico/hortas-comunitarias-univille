import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { SPACING, BORDER_RADIUS, ELEVATION } from '../../constants/spacing';

/**
 * Summary Card - Card de resumo/estatística
 * Similar aos cards de resumo do frontend (CanteirosSummary, PaymentsSummary, etc)
 *
 * @param {string} label - Label superior (texto pequeno)
 * @param {string|number} value - Valor principal (grande)
 * @param {string} iconName - Nome do ícone Ionicons
 * @param {string} color - Cor do ícone e valor (success, info, warning, error, blue)
 * @param {string} subtitle - Texto adicional abaixo do valor (opcional)
 * @param {object} style - Estilos adicionais
 */
const SummaryCard = ({
  label,
  value,
  iconName,
  color = 'success',
  subtitle,
  style,
}) => {
  const iconColor = getColor(color);

  return (
    <View style={[styles.card, style]}>
      {iconName && (
        <View style={[styles.iconContainer, { backgroundColor: iconColor + '15' }]}>
          <Ionicons name={iconName} size={24} color={iconColor} />
        </View>
      )}

      <Text style={styles.label}>{label}</Text>

      <Text style={[styles.value, { color: iconColor }]}>
        {value}
      </Text>

      {subtitle && (
        <Text style={styles.subtitle}>{subtitle}</Text>
      )}
    </View>
  );
};

// Mapeia cor para valor hex
const getColor = (color) => {
  switch (color) {
    case 'success':
      return COLORS.success;
    case 'error':
      return COLORS.error;
    case 'warning':
      return COLORS.warning;
    case 'info':
      return COLORS.info;
    case 'blue':
      return COLORS.blue;
    case 'purple':
      return '#7C3AED';
    case 'teal':
      return '#20C997';
    default:
      return COLORS.primary;
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...ELEVATION.sm,
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.circle,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    fontWeight: TYPOGRAPHY.weights.normal,
  },
  value: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs / 2,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.weights.normal,
  },
});

export default SummaryCard;
