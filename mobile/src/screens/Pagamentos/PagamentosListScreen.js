import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Loading, EmptyState, SummaryCard, Badge } from '../../components/common';
import * as pagamentosService from '../../services/pagamentos.service';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { SPACING, BORDER_RADIUS, ELEVATION } from '../../constants/spacing';
import { formatCurrency, formatDate } from '../../utils/formatters';

const PagamentosListScreen = ({ navigation }) => {
  const [pagamentos, setPagamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadPagamentos();
  }, []);

  const loadPagamentos = async () => {
    try {
      setLoading(true);
      const data = await pagamentosService.getAll();
      setPagamentos(Array.isArray(data) ? data : []);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os pagamentos');
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadPagamentos();
  };

  const handleDelete = (pagamento) => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir o pagamento de ${pagamento.carteirista?.nome || 'N/A'}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await pagamentosService.remove(pagamento.id);
              Alert.alert('Sucesso', 'Pagamento excluído com sucesso');
              loadPagamentos();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o pagamento');
            }
          },
        },
      ]
    );
  };

  // Cálculos para os cards de resumo
  const totalPago = pagamentos.reduce((sum, p) => sum + (parseFloat(p.valor) || 0), 0);
  const totalPagamentos = pagamentos.length;

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {/* Cards de Resumo */}
      <View style={styles.summaryContainer}>
        <SummaryCard
          label="Total Pago"
          value={formatCurrency(totalPago)}
          iconName="cash-outline"
          color="success"
          style={styles.summaryCard}
        />
        <SummaryCard
          label="Pagamentos"
          value={totalPagamentos}
          iconName="receipt-outline"
          color="blue"
          style={styles.summaryCard}
        />
      </View>

      {/* Lista de Pagamentos */}
      <FlatList
        data={pagamentos}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => <PagamentoItem item={item} onDelete={handleDelete} navigation={navigation} />}
        ListEmptyComponent={<EmptyState message="Nenhum pagamento cadastrado" />}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />}
      />

      {/* Botão Flutuante */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('PagamentoForm')}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color={COLORS.surface} />
      </TouchableOpacity>
    </View>
  );
};

const PagamentoItem = ({ item, onDelete, navigation }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <Text style={styles.carteirista}>{item.carteirista?.nome || 'Carteirista não informado'}</Text>
          <Text style={styles.telefone}>{item.carteirista?.telefone || '-'}</Text>
        </View>
        <Text style={styles.valor}>{formatCurrency(item.valor)}</Text>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.infoText}>{formatDate(item.data_pagamento)}</Text>
        </View>

        <Badge variant={item.forma_pagamento === 'pix' ? 'pix' : 'dinheiro'} size="sm">
          {item.forma_pagamento === 'pix' ? 'PIX' : 'Dinheiro'}
        </Badge>
      </View>

      {item.observacao && (
        <Text style={styles.observacao} numberOfLines={2}>
          {item.observacao}
        </Text>
      )}

      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('PagamentoForm', { pagamento: item })}
        >
          <Ionicons name="pencil" size={20} color={COLORS.blue} />
          <Text style={[styles.actionText, { color: COLORS.blue }]}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(item)}>
          <Ionicons name="trash-outline" size={20} color={COLORS.error} />
          <Text style={[styles.actionText, { color: COLORS.error }]}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  summaryContainer: {
    flexDirection: 'row',
    padding: SPACING.md,
    gap: SPACING.md,
  },
  summaryCard: {
    flex: 1,
  },
  listContent: {
    padding: SPACING.md,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...ELEVATION.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  headerLeft: {
    flex: 1,
  },
  carteirista: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text,
    marginBottom: 2,
  },
  telefone: {
    fontSize: TYPOGRAPHY.sizes.small,
    color: COLORS.textSecondary,
  },
  valor: {
    fontSize: TYPOGRAPHY.sizes.h4,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.success,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: TYPOGRAPHY.sizes.small,
    color: COLORS.textSecondary,
  },
  observacao: {
    fontSize: TYPOGRAPHY.sizes.small,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    marginBottom: SPACING.sm,
  },
  cardFooter: {
    flexDirection: 'row',
    gap: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: TYPOGRAPHY.sizes.small,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  fab: {
    position: 'absolute',
    right: SPACING.md,
    bottom: SPACING.md,
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...ELEVATION.lg,
  },
});

export default PagamentosListScreen;
