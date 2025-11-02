import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { Card, Button } from '../../components/common';
import { COLORS } from '../../constants/colors';
import { formatCPForCNPJ } from '../../utils/formatters';

const ProfileScreen = ({ navigation }) => {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            const result = await signOut();
            if (!result.success) {
              Alert.alert('Erro', result.message);
            }
          },
        },
      ]
    );
  };

  const InfoItem = ({ icon, label, value }) => (
    <View style={styles.infoItem}>
      <Ionicons name={icon} size={20} color={COLORS.primary} />
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value || 'Não informado'}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={64} color="#fff" />
        </View>
        <Text style={styles.userName}>{user?.nome_completo || 'Usuário'}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfile')}
            style={styles.editButton}
          >
            <Ionicons name="pencil" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <InfoItem
          icon="person-outline"
          label="Nome"
          value={user?.nome_completo}
        />

        <InfoItem
          icon="card-outline"
          label="CPF/CNPJ"
          value={user?.cpf ? formatCPForCNPJ(user.cpf) : null}
        />

        <InfoItem
          icon="mail-outline"
          label="E-mail"
          value={user?.email}
        />

        <InfoItem
          icon="shield-checkmark-outline"
          label="Cargo"
          value={user?.cargo?.nome}
        />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Sobre o App</Text>
        <Text style={styles.aboutText}>
          Sistema de gestão de hortas comunitárias {'\n'}
          Desenvolvido pela Univille {'\n\n'}
          Versão: 1.0.0 MVP
        </Text>
      </Card>

      <Button
        title="Sair"
        onPress={handleLogout}
        variant="danger"
        style={styles.logoutButton}
      />
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
    alignItems: 'center',
    padding: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  card: {
    margin: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  editButton: {
    padding: 4,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.text,
  },
  aboutText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  logoutButton: {
    margin: 16,
  },
});

export default ProfileScreen;
