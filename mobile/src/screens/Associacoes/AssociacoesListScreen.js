import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAssociacoes, deleteAssociacao } from '../../services/associacoes.service';
import { Card, Button, Loading, EmptyState } from '../../components/common';
import { COLORS, SPACING } from '../../constants';

const AssociacoesListScreen = ({ navigation }) => {
  const [associacoes, setAssociacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadAssociacoes = async () => {
    try {
      setLoading(true);
      const data = await getAssociacoes();
      setAssociacoes(data);
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao carregar associações');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadAssociacoes();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAssociacoes();
    setRefreshing(false);
  };

  const handleDelete = (uuid) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Deseja realmente excluir esta associação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAssociacao(uuid);
              Alert.alert('Sucesso', 'Associação excluída com sucesso');
              loadAssociacoes();
            } catch (error) {
              Alert.alert('Erro', error.message || 'Erro ao excluir associação');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('AssociacaoDetail', { associacao: item })}
    >
      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{item.razao_social || item.nome_fantasia}</Text>
        </View>
        
        {item.cnpj && (
          <Text style={styles.info}>CNPJ: {item.cnpj}</Text>
        )}
        
        {item.nome_fantasia && item.nome_fantasia !== item.razao_social && (
          <Text style={styles.info}>Nome Fantasia: {item.nome_fantasia}</Text>
        )}

        <View style={styles.actions}>
          <Button
            title="Editar"
            onPress={() => navigation.navigate('AssociacaoForm', { associacao: item })}
            variant="secondary"
            size="small"
            style={styles.actionButton}
          />
          <Button
            title="Excluir"
            onPress={() => handleDelete(item.uuid)}
            variant="danger"
            size="small"
            style={styles.actionButton}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={associacoes}
        keyExtractor={(item) => item.uuid}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            message="Nenhuma associação encontrada"
            actionLabel="Cadastrar Associação"
            onAction={() => navigation.navigate('AssociacaoForm')}
          />
        }
      />
      
      <Button
        title="Nova Associação"
        onPress={() => navigation.navigate('AssociacaoForm')}
        style={styles.fab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    margin: SPACING.md,
  },
  cardHeader: {
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  info: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  actions: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  actionButton: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: SPACING.lg,
    right: SPACING.lg,
    left: SPACING.lg,
  },
});

export default AssociacoesListScreen;
