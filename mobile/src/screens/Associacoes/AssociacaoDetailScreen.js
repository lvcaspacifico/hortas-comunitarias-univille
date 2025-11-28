import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { Card, Button } from '../../components/common';
import { COLORS, SPACING } from '../../constants';

const AssociacaoDetailScreen = ({ navigation, route }) => {
  const { associacao } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>{associacao.razao_social}</Text>
        
        {associacao.nome_fantasia && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Nome Fantasia:</Text>
            <Text style={styles.value}>{associacao.nome_fantasia}</Text>
          </View>
        )}

        {associacao.cnpj && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>CNPJ:</Text>
            <Text style={styles.value}>{associacao.cnpj}</Text>
          </View>
        )}

        {associacao.uuid && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>UUID:</Text>
            <Text style={styles.valueSmall}>{associacao.uuid}</Text>
          </View>
        )}
      </Card>

      <View style={styles.actions}>
        <Button
          title="Editar"
          onPress={() => navigation.navigate('AssociacaoForm', { associacao })}
          style={styles.button}
        />
        
        <Button
          title="Voltar"
          onPress={() => navigation.goBack()}
          variant="secondary"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    margin: SPACING.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  infoRow: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  value: {
    fontSize: 16,
    color: COLORS.text,
  },
  valueSmall: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'monospace',
  },
  actions: {
    padding: SPACING.lg,
  },
  button: {
    marginBottom: SPACING.md,
  },
});

export default AssociacaoDetailScreen;
