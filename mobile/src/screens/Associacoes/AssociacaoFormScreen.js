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
import { createAssociacao, updateAssociacao } from '../../services/associacoes.service';
import { COLORS } from '../../constants/colors';

const AssociacaoFormScreen = ({ route, navigation }) => {
  const { associacao } = route.params || {};
  const isEdit = !!associacao;

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    endereco: '',
    telefone: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (associacao) {
      setFormData({
        nome: associacao.nome || '',
        descricao: associacao.descricao || '',
        endereco: associacao.endereco || '',
        telefone: associacao.telefone || '',
        email: associacao.email || '',
      });
    }
  }, [associacao]);

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        nome: formData.nome,
        descricao: formData.descricao || '',
        endereco: formData.endereco || '',
        telefone: formData.telefone || '',
        email: formData.email || '',
      };

      if (isEdit) {
        await updateAssociacao(associacao.uuid, payload);
        Alert.alert('Sucesso', 'Associação atualizada com sucesso');
      } else {
        await createAssociacao(payload);
        Alert.alert('Sucesso', 'Associação criada com sucesso');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar associação:', error);
      
      // Verifica se é erro de permissão
      if (error.response?.status === 403) {
        const missingPermission = error.response?.data?.missing_permission;
        const permissionMessage = missingPermission 
          ? `Você não tem a permissão necessária: ${missingPermission}`
          : 'Você não tem permissão para realizar esta ação';
        
        Alert.alert(
          'Sem Permissão', 
          `${permissionMessage}\n\nEntre em contato com o administrador do sistema.`,
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        const errorMessage = error.response?.data?.message || error.message;
        Alert.alert('Erro', errorMessage || 'Ocorreu um erro ao salvar a associação');
      }
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
          label="Nome *"
          value={formData.nome}
          onChangeText={(text) => updateField('nome', text)}
          placeholder="Nome da associação"
          error={errors.nome}
          leftIcon="business-outline"
        />

        <Input
          label="Descrição"
          value={formData.descricao}
          onChangeText={(text) => updateField('descricao', text)}
          placeholder="Descrição da associação"
          multiline
          numberOfLines={4}
          leftIcon="document-text-outline"
        />

        <Input
          label="Endereço"
          value={formData.endereco}
          onChangeText={(text) => updateField('endereco', text)}
          placeholder="Rua, número, bairro"
          leftIcon="location-outline"
        />

        <Input
          label="Telefone"
          value={formData.telefone}
          onChangeText={(text) => updateField('telefone', text)}
          placeholder="(00) 00000-0000"
          keyboardType="phone-pad"
          leftIcon="call-outline"
        />

        <Input
          label="Email"
          value={formData.email}
          onChangeText={(text) => updateField('email', text)}
          placeholder="contato@associacao.org"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
          leftIcon="mail-outline"
        />

        <View style={styles.buttonContainer}>
          <Button
            title={isEdit ? 'Atualizar' : 'Criar'}
            onPress={handleSubmit}
            loading={loading}
          />
          <Button
            title="Cancelar"
            variant="outline"
            onPress={() => navigation.goBack()}
          />
        </View>
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
  buttonContainer: {
    gap: 12,
    marginTop: 8,
  },
});

export default AssociacaoFormScreen;
