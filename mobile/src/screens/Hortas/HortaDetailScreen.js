import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Card } from '../../components/common';
import { COLORS } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const HortaDetailScreen = ({ route }) => {
  const { horta } = route.params;

  const InfoRow = ({ icon, label, value }) => (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={20} color={COLORS.primary} />
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value || 'Não informado'}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{horta.nome_da_horta}</Text>
        {horta.percentual_taxa_associado && (
          <Text style={styles.description}>
            Taxa de Associado: {horta.percentual_taxa_associado}%
          </Text>
        )}
      </View>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Informações</Text>
        
        <InfoRow
          icon="location-outline"
          label="Cidade"
          value={horta.endereco?.cidade}
        />
        
        <InfoRow
          icon="map-outline"
          label="Endereço"
          value={horta.endereco ? 
            `${horta.endereco.tipo_logradouro || ''} ${horta.endereco.logradouro || ''}, ${horta.endereco.numero || ''}`.trim() 
            : null}
        />

        <InfoRow
          icon="business-outline"
          label="Bairro"
          value={horta.endereco?.bairro}
        />

        <InfoRow
          icon="key-outline"
          label="Tipo de Liberação"
          value={horta.tipo_de_liberacao}
        />
        
        <InfoRow
          icon="calendar-outline"
          label="Data de Criação"
          value={horta.data_de_criacao ? new Date(horta.data_de_criacao).toLocaleDateString('pt-BR') : null}
        />
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
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  card: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoTextContainer: {
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
  observacoes: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
});

export default HortaDetailScreen;
