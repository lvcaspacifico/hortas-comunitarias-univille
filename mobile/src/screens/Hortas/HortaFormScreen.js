import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Button, Input } from '../../components/common';
import { createHorta, updateHorta } from '../../services/hortas.service';
import { COLORS } from '../../constants/colors';

const HortaFormScreen = ({ route, navigation }) => {
  const { horta } = route.params || {};
  const isEdit = !!horta;

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    cidade: '',
    endereco: '',
    observacoes: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (horta) {
      setFormData({
        nome: horta.nome || '',
        descricao: horta.descricao || '',
        cidade: horta.cidade || '',
        endereco: horta.endereco || '',
        observacoes: horta.observacoes || '',
      });
    }
  }, [horta]);

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      if (isEdit) {
        await updateHorta(horta.uuid, formData);
        Alert.alert('Sucesso', 'Horta atualizada com sucesso');
      } else {
        await createHorta(formData);
        Alert.alert('Sucesso', 'Horta criada com sucesso');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', error.message || 'Ocorreu um erro ao salvar a horta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Input
          label="Nome da Horta *"
          value={formData.nome}
          onChangeText={(text) => updateField('nome', text)}
          placeholder="Ex: Horta Comunitária Central"
          error={errors.nome}
          leftIcon="leaf-outline"
        />

        <Input
          label="Descrição"
          value={formData.descricao}
          onChangeText={(text) => updateField('descricao', text)}
          placeholder="Descrição da horta"
          multiline
          numberOfLines={3}
          leftIcon="document-text-outline"
        />

        <Input
          label="Cidade"
          value={formData.cidade}
          onChangeText={(text) => updateField('cidade', text)}
          placeholder="Ex: Joinville"
          leftIcon="location-outline"
        />

        <Input
          label="Endereço"
          value={formData.endereco}
          onChangeText={(text) => updateField('endereco', text)}
          placeholder="Rua, número, bairro"
          leftIcon="map-outline"
        />

        <Input
          label="Observações"
          value={formData.observacoes}
          onChangeText={(text) => updateField('observacoes', text)}
          placeholder="Informações adicionais"
          multiline
          numberOfLines={4}
          leftIcon="information-circle-outline"
        />

        <Button
          title={isEdit ? 'Atualizar Horta' : 'Criar Horta'}
          onPress={handleSubmit}
          loading={loading}
          style={styles.submitButton}
        />

        <Button
          title="Cancelar"
          onPress={() => navigation.goBack()}
          variant="outline"
          disabled={loading}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  submitButton: {
    marginTop: 8,
    marginBottom: 12,
  },
});

export default HortaFormScreen;
