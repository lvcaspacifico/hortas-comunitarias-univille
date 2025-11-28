import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Input, Button } from '../../components/common';
import { createAssociacao, updateAssociacao } from '../../services/associacoes.service';
import { COLORS, SPACING } from '../../constants';

const AssociacaoFormScreen = ({ navigation, route }) => {
  const associacao = route.params?.associacao;
  const isEditing = !!associacao;

  const [formData, setFormData] = useState({
    cnpj: associacao?.cnpj || '',
    razao_social: associacao?.razao_social || '',
    nome_fantasia: associacao?.nome_fantasia || '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validação básica
    if (!formData.cnpj || !formData.razao_social) {
      Alert.alert('Erro', 'CNPJ e Razão Social são obrigatórios');
      return;
    }

    try {
      setLoading(true);
      
      if (isEditing) {
        await updateAssociacao(associacao.uuid, formData);
        Alert.alert('Sucesso', 'Associação atualizada com sucesso');
      } else {
        await createAssociacao(formData);
        Alert.alert('Sucesso', 'Associação cadastrada com sucesso');
      }
      
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao salvar associação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Input
          label="CNPJ *"
          value={formData.cnpj}
          onChangeText={(text) => setFormData({ ...formData, cnpj: text })}
          placeholder="00.000.000/0000-00"
          keyboardType="numeric"
        />

        <Input
          label="Razão Social *"
          value={formData.razao_social}
          onChangeText={(text) => setFormData({ ...formData, razao_social: text })}
          placeholder="Digite a razão social"
        />

        <Input
          label="Nome Fantasia"
          value={formData.nome_fantasia}
          onChangeText={(text) => setFormData({ ...formData, nome_fantasia: text })}
          placeholder="Digite o nome fantasia"
        />

        <Button
          title={isEditing ? 'Atualizar' : 'Cadastrar'}
          onPress={handleSubmit}
          loading={loading}
          style={styles.button}
        />

        <Button
          title="Cancelar"
          onPress={() => navigation.goBack()}
          variant="secondary"
          disabled={loading}
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
  form: {
    padding: SPACING.lg,
  },
  button: {
    marginBottom: SPACING.md,
  },
});

export default AssociacaoFormScreen;
