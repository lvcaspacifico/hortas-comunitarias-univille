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
import { getAssociacoes, deleteAssociacao } from '../../services/associacoes.service';
import { COLORS } from '../../constants/colors';

const AssociacoesListScreen = ({ navigation }) => {
  const [associacoes, setAssociacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [permissionError, setPermissionError] = useState(false);

  const loadAssociacoes = useCallback(async () => {
    try {
      setPermissionError(false);
      const data = await getAssociacoes();
      setAssociacoes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao carregar associações:', error);
      
      // Verifica se é erro de permissão
      if (error.response?.status === 403 || error.message?.includes('Acesso negado')) {
        setPermissionError(true);
        setAssociacoes([]);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar as associações');
        setAssociacoes([]);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadAssociacoes();
  }, [loadAssociacoes]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadAssociacoes();
    });
    return unsubscribe;
  }, [navigation, loadAssociacoes]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadAssociacoes();
  };

  const handleDelete = (associacao) => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir a associação "${associacao.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAssociacao(associacao.uuid);
              Alert.alert('Sucesso', 'Associação excluída com sucesso');
              loadAssociacoes();
            } catch (error) {
              console.error('Erro ao excluir associação:', error);
              
              // Verifica se é erro de permissão
              if (error.response?.status === 403) {
                const missingPermission = error.response?.data?.missing_permission;
                const permissionMessage = missingPermission 
                  ? `Você não tem a permissão necessária: ${missingPermission}`
                  : 'Você não tem permissão para excluir associações';
                
                Alert.alert('Sem Permissão', `${permissionMessage}\n\nEntre em contato com o administrador.`);
              } else {
                Alert.alert('Erro', 'Não foi possível excluir a associação');
              }
            }
          },
        },
      ]
    );
  };

  const renderAssociacao = ({ item }) => (
    <Card
      onPress={() => navigation.navigate('AssociacaoDetail', { associacao: item })}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <Text style={styles.associacaoName}>{item.nome}</Text>
          {item.email && (
            <Text style={styles.info}>
              <Ionicons name="mail-outline" size={14} /> {item.email}
            </Text>
          )}
          {item.telefone && (
            <Text style={styles.info}>
              <Ionicons name="call-outline" size={14} /> {item.telefone}
            </Text>
          )}
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AssociacaoForm', { associacao: item })}
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
        data={associacoes}
        renderItem={renderAssociacao}
        keyExtractor={(item) => item.uuid || item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          permissionError ? (
            <EmptyState
              icon="lock-closed-outline"
              title="Sem permissão"
              message="Você não tem permissão para visualizar associações. Entre em contato com o administrador."
            />
          ) : (
            <EmptyState
              icon="business-outline"
              title="Nenhuma associação encontrada"
              message="Comece criando sua primeira associação"
              actionLabel="Criar Associação"
              onAction={() => navigation.navigate('AssociacaoForm')}
            />
          )
        }
      />
      
      {!permissionError && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AssociacaoForm')}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      )}
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
  associacaoName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
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
    shadowRadius: 4,
    elevation: 8,
  },
});

export default AssociacoesListScreen;
