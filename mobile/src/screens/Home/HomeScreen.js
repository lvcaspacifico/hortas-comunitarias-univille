import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/common';
import { COLORS } from '../../constants/colors';

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();

  // Verifica se o usuário tem permissão para acessar associações
  const hasAssociacaoPermission = user?.associacao_uuid;

  const menuItems = [
    // Mostra Associações apenas se o usuário tiver associacao_uuid
    ...(hasAssociacaoPermission ? [{
      title: 'Associações',
      icon: 'business',
      description: 'Gerenciar associações',
      color: COLORS.primary,
      onPress: () => navigation.navigate('AssociacoesTab'),
    }] : []),
    {
      title: 'Hortas',
      icon: 'leaf',
      description: 'Gerenciar hortas comunitárias',
      color: COLORS.primary,
      onPress: () => navigation.navigate('HortasTab'),
    },
    {
      title: 'Canteiros',
      icon: 'grid',
      description: 'Gerenciar canteiros',
      color: COLORS.secondary,
      onPress: () => navigation.navigate('CanteirosTab'),
    },
    {
      title: 'Meu Perfil',
      icon: 'person-circle',
      description: 'Ver e editar perfil',
      color: COLORS.info,
      onPress: () => navigation.navigate('ProfileTab'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, {user?.nome_completo?.split(' ')[0] || 'Usuário'}!</Text>
        <Text style={styles.subtitle}>Bem-vindo ao sistema de hortas comunitárias</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Menu Principal</Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon} size={32} color="#fff" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <Card style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <Ionicons name="information-circle" size={24} color={COLORS.info} />
          <Text style={styles.infoTitle}>Sobre o Sistema</Text>
        </View>
        <Text style={styles.infoText}>
          Sistema de gestão de hortas comunitárias desenvolvido pela Univille.
          {'\n\n'}
          Versão: 1.0.0 MVP
        </Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    padding: 16,
    marginTop: -20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  infoCard: {
    margin: 16,
    marginTop: 8,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 8,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});

export default HomeScreen;
