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
import { createCanteiro, updateCanteiro } from '../../services/canteiros.service';
import { COLORS } from '../../constants/colors';

const CanteiroFormScreen = ({ route, navigation }) => {
  const { canteiro } = route.params || {};
  const isEdit = !!canteiro;

  const [formData, setFormData] = useState({
    numero: '',
    descricao: '',
    tamanho: '',
    observacoes: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (canteiro) {
      setFormData({
        numero: canteiro.numero?.toString() || '',
        descricao: canteiro.descricao || '',
        tamanho: canteiro.tamanho?.toString() || '',
        observacoes: canteiro.observacoes || '',
      });
    }
  }, [canteiro]);

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.numero.trim()) {
      newErrors.numero = 'Número do canteiro é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const data = {
        ...formData,
        numero: parseInt(formData.numero),
        tamanho: formData.tamanho ? parseFloat(formData.tamanho) : null,
      };

      if (isEdit) {
        await updateCanteiro(canteiro.uuid, data);
        Alert.alert('Sucesso', 'Canteiro atualizado com sucesso');
      } else {
        await createCanteiro(data);
        Alert.alert('Sucesso', 'Canteiro criado com sucesso');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', error.message || 'Ocorreu um erro ao salvar o canteiro');
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
          label="Número do Canteiro *"
          value={formData.numero}
          onChangeText={(text) => updateField('numero', text)}
          placeholder="Ex: 1"
          keyboardType="numeric"
          error={errors.numero}
          leftIcon="grid-outline"
        />

        <Input
          label="Descrição"
          value={formData.descricao}
          onChangeText={(text) => updateField('descricao', text)}
          placeholder="Descrição do canteiro"
          multiline
          numberOfLines={3}
          leftIcon="document-text-outline"
        />

        <Input
          label="Tamanho (m²)"
          value={formData.tamanho}
          onChangeText={(text) => updateField('tamanho', text)}
          placeholder="Ex: 10"
          keyboardType="numeric"
          leftIcon="resize-outline"
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
          title={isEdit ? 'Atualizar Canteiro' : 'Criar Canteiro'}
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

export default CanteiroFormScreen;