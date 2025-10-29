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
import { getHortas, deleteHorta } from '../../services/hortas.service';
import { COLORS } from '../../constants/colors';

const HortasListScreen = ({ navigation }) => {
  const [hortas, setHortas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadHortas = useCallback(async () => {
    try {
      const data = await getHortas();
      setHortas(Array.isArray(data) ? data : []);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as hortas');
      setHortas([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadHortas();
  }, [loadHortas]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadHortas();
    });
    return unsubscribe;
  }, [navigation, loadHortas]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadHortas();
  };

  const handleDelete = (horta) => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir a horta "${horta.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteHorta(horta.uuid);
              Alert.alert('Sucesso', 'Horta excluída com sucesso');
              loadHortas();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir a horta');
            }
          },
        },
      ]
    );
  };

  const renderHorta = ({ item }) => (
    <Card
      onPress={() => navigation.navigate('HortaDetail', { horta: item })}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <Text style={styles.hortaName}>{item.nome}</Text>
          {item.cidade && (
            <Text style={styles.hortaLocation}>
              <Ionicons name="location-outline" size={14} /> {item.cidade}
            </Text>
          )}
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => navigation.navigate('HortaForm', { horta: item })}
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
      {item.descricao && (
        <Text style={styles.description} numberOfLines={2}>
          {item.descricao}
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
        data={hortas}
        renderItem={renderHorta}
        keyExtractor={(item) => item.uuid || item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            icon="leaf-outline"
            title="Nenhuma horta encontrada"
            message="Comece criando sua primeira horta"
            actionLabel="Criar Horta"
            onAction={() => navigation.navigate('HortaForm')}
          />
        }
      />
      
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('HortaForm')}
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
  hortaName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  hortaLocation: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  description: {
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

export default HortasListScreen;
