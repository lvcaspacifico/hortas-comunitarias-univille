import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Loading, EmptyState } from '../../components/common';
import { getCanteiros, deleteCanteiro } from '../../services/canteiros.service';
import { COLORS } from '../../constants/colors';

const CanteirosListScreen = ({ navigation }) => {
  const [canteiros, setCanteiros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadCanteiros = useCallback(async () => {
    try {
      const data = await getCanteiros();
      setCanteiros(Array.isArray(data) ? data : []);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os canteiros');
      setCanteiros([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadCanteiros();
  }, [loadCanteiros]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadCanteiros();
    });
    return unsubscribe;
  }, [navigation, loadCanteiros]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadCanteiros();
  };

  const handleDelete = (canteiro) => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir o canteiro "${canteiro.descricao || canteiro.numero}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteCanteiro(canteiro.uuid);
              Alert.alert('Sucesso', 'Canteiro excluído com sucesso');
              loadCanteiros();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o canteiro');
            }
          },
        },
      ]
    );
  };

  const renderCanteiro = ({ item }) => (
    <Card
      onPress={() => navigation.navigate('CanteiroDetail', { canteiro: item })}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <Text style={styles.canteiroNumber}>Canteiro #{item.numero || 'S/N'}</Text>
          {item.descricao && (
            <Text style={styles.canteiroDescription}>{item.descricao}</Text>
          )}
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CanteiroForm', { canteiro: item })}
            style={styles.actionButton}
          >
            <Ionicons name="pencil" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(item)}
            style={styles.actionButton}
          >
            <Ionicons name="trash" size={20} color={COLORS.error} />
          </TouchableOpacity>
        </View>
      </View>
      {item.tamanho && (
        <Text style={styles.info}>
          <Ionicons name="resize-outline" size={14} /> Tamanho: {item.tamanho}m²
        </Text>
      )}
    </Card>
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={canteiros}
        renderItem={renderCanteiro}
        keyExtractor={(item) => item.uuid || item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            icon="grid-outline"
            title="Nenhum canteiro encontrado"
            message="Comece criando seu primeiro canteiro"
            actionLabel="Criar Canteiro"
            onAction={() => navigation.navigate('CanteiroForm')}
          />
        }
      />
      
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CanteiroForm')}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    padding: 16,
    flexGrow: 1,
  },
  card: {
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
  },
  canteiroNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  canteiroDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  info: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default CanteirosListScreen;