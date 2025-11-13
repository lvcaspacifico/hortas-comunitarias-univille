import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Input } from '../../components/common';
import { createHorta, updateHorta } from '../../services/hortas.service';
import api from '../../services/api';
import { COLORS } from '../../constants/colors';

const HortaFormScreen = ({ route, navigation }) => {
  const { horta } = route.params || {};
  const { user } = useAuth();
  const isEdit = !!horta;

  const [formData, setFormData] = useState({
    nome: '',
    percentual_taxa: '0',
    tipo_liberacao: '1',
    // Campos de endereço
    tipo_logradouro: 'Rua',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (horta) {
      setFormData({
        nome: horta.nome_da_horta || '',
        percentual_taxa: String(horta.percentual_taxa_associado || '0'),
        tipo_liberacao: String(horta.tipo_de_liberacao || '1'),
        tipo_logradouro: horta.endereco?.tipo_logradouro || 'Rua',
        logradouro: horta.endereco?.logradouro || '',
        numero: horta.endereco?.numero || '',
        complemento: horta.endereco?.complemento || '',
        bairro: horta.endereco?.bairro || '',
        cidade: horta.endereco?.cidade || '',
        estado: horta.endereco?.estado || '',
        cep: horta.endereco?.cep || '',
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

    const taxa = parseFloat(formData.percentual_taxa);
    if (isNaN(taxa) || taxa < 0 || taxa > 100) {
      newErrors.percentual_taxa = 'Taxa deve ser entre 0 e 100';
    }

    const tipo = parseInt(formData.tipo_liberacao);
    if (isNaN(tipo) || tipo < 1 || tipo > 3) {
      newErrors.tipo_liberacao = 'Tipo de liberação inválido';
    }

    // Validação de endereço (campos obrigatórios)
    if (!formData.logradouro.trim()) {
      newErrors.logradouro = 'Logradouro é obrigatório';
    }
    if (!formData.numero.trim()) {
      newErrors.numero = 'Número é obrigatório';
    }
    if (!formData.cidade.trim()) {
      newErrors.cidade = 'Cidade é obrigatória';
    }
    if (!formData.estado.trim()) {
      newErrors.estado = 'Estado é obrigatório';
    }
    if (!formData.cep.trim()) {
      newErrors.cep = 'CEP é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createEndereco = async () => {
    try {
      const enderecoPayload = {
        tipo_logradouro: String(formData.tipo_logradouro || 'Rua'),
        logradouro: String(formData.logradouro || ''),
        numero: String(formData.numero || ''),
        bairro: String(formData.bairro || ''),
        cidade: String(formData.cidade || ''),
        estado: String(formData.estado || ''),
        cep: String(formData.cep || '').replace(/[^\d]/g, ''),
        complemento: String(formData.complemento || ''),
        latitude: null,
        longitude: null,
      };

      console.log('🏠 Criando endereço:', enderecoPayload);
      const response = await api.post('/enderecos', enderecoPayload);
      console.log('✅ Endereço criado:', response.data);
      return response.data.uuid;
    } catch (error) {
      console.error('❌ Erro ao criar endereço:', error);
      console.error('❌ Detalhes:', error.response?.data);
      throw new Error('Não foi possível criar o endereço');
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    if (!user?.associacao_uuid) {
      Alert.alert('Erro', 'Usuário não possui associação vinculada');
      return;
    }

    setLoading(true);
    try {
      // Cria o endereço primeiro
      const endereco_uuid = await createEndereco();

      const payload = {
        nome_da_horta: formData.nome,
        percentual_taxa_associado: parseFloat(formData.percentual_taxa),
        tipo_de_liberacao: parseInt(formData.tipo_liberacao),
        associacao_vinculada_uuid: user.associacao_uuid,
        endereco_uuid: endereco_uuid,
      };

      console.log('🌱 Criando horta com payload:', payload);

      if (isEdit) {
        await updateHorta(horta.uuid, payload);
        Alert.alert('Sucesso', 'Horta atualizada com sucesso');
      } else {
        await createHorta(payload);
        Alert.alert('Sucesso', 'Horta criada com sucesso');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar horta:', error);
      
      // Detecta erros específicos do backend
      const errorMessage = error.response?.data?.exception?.[0]?.message || error.message;
      const errorType = error.response?.data?.exception?.[0]?.type;
      
      if (errorMessage && errorMessage.includes('Permissão de cargo')) {
        Alert.alert(
          'Erro de Permissão',
          'Há um bug no backend que impede a criação de hortas. Consulte BACKEND_BUGS_HORTA.md para detalhes técnicos.',
          [{ text: 'OK' }]
        );
      } else if (errorType === 'ArgumentCountError' || errorMessage.includes('Too few arguments')) {
        Alert.alert(
          'Erro no Backend',
          'Há um bug crítico no backend (ArgumentCountError) que impede a criação de hortas. Consulte BACKEND_BUGS_HORTA.md para detalhes sobre as 3 correções necessárias.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert('Erro', errorMessage || 'Ocorreu um erro ao salvar a horta');
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
          label="Nome da Horta *"
          value={formData.nome}
          onChangeText={(text) => updateField('nome', text)}
          placeholder="Ex: Horta Comunitária Central"
          error={errors.nome}
          leftIcon="leaf-outline"
        />

        <Input
          label="Percentual de Taxa (%) *"
          value={formData.percentual_taxa}
          onChangeText={(text) => updateField('percentual_taxa', text)}
          placeholder="0 a 100"
          keyboardType="decimal-pad"
          error={errors.percentual_taxa}
          leftIcon="cash-outline"
        />

        <Input
          label="Tipo de Liberação (1-3) *"
          value={formData.tipo_liberacao}
          onChangeText={(text) => updateField('tipo_liberacao', text)}
          placeholder="1, 2 ou 3"
          keyboardType="number-pad"
          error={errors.tipo_liberacao}
          leftIcon="key-outline"
          maxLength={1}
        />

        {/* Endereço */}
        <Input
          label="Logradouro *"
          value={formData.logradouro}
          onChangeText={(text) => updateField('logradouro', text)}
          placeholder="Ex: Rua das Flores"
          error={errors.logradouro}
          leftIcon="location-outline"
        />

        <Input
          label="Número *"
          value={formData.numero}
          onChangeText={(text) => updateField('numero', text)}
          placeholder="Ex: 123"
          error={errors.numero}
          leftIcon="home-outline"
        />

        <Input
          label="Complemento"
          value={formData.complemento}
          onChangeText={(text) => updateField('complemento', text)}
          placeholder="Ex: Apto 101, Bloco A"
          leftIcon="document-outline"
        />

        <Input
          label="Bairro"
          value={formData.bairro}
          onChangeText={(text) => updateField('bairro', text)}
          placeholder="Ex: Centro"
          leftIcon="business-outline"
        />

        <Input
          label="Cidade *"
          value={formData.cidade}
          onChangeText={(text) => updateField('cidade', text)}
          placeholder="Ex: Joinville"
          error={errors.cidade}
          leftIcon="location-outline"
        />

        <Input
          label="Estado *"
          value={formData.estado}
          onChangeText={(text) => updateField('estado', text)}
          placeholder="Ex: SC"
          error={errors.estado}
          leftIcon="map-outline"
          maxLength={2}
        />

        <Input
          label="CEP *"
          value={formData.cep}
          onChangeText={(text) => updateField('cep', text)}
          placeholder="00000-000"
          keyboardType="numeric"
          error={errors.cep}
          leftIcon="pin-outline"
          maxLength={9}
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
