import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input, Loading } from '../../components/common';
import { createCanteiro, updateCanteiro } from '../../services/canteiros.service';
import { getHortas } from '../../services/hortas.service';
import { COLORS } from '../../constants/colors';

const CanteiroFormScreen = ({ route, navigation }) => {
  const { canteiro } = route.params || {};
  const isEdit = !!canteiro;

  const [hortas, setHortas] = useState([]);
  const [loadingHortas, setLoadingHortas] = useState(true);
  const [formData, setFormData] = useState({
    numero_identificador: '',
    tamanho_m2: '',
    horta_uuid: '',
    horta_nome: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadHortas();
  }, []);

  useEffect(() => {
    if (canteiro) {
      setFormData({
        numero_identificador: canteiro.numero_identificador || '',
        tamanho_m2: canteiro.tamanho_m2 || '',
        horta_uuid: canteiro.horta_uuid || '',
        horta_nome: canteiro.horta?.nome_da_horta || '',
      });
    }
  }, [canteiro]);

  const loadHortas = async () => {
    try {
      const data = await getHortas();
      setHortas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao carregar hortas:', error);
      Alert.alert('Erro', 'Não foi possível carregar as hortas');
      setHortas([]);
    } finally {
      setLoadingHortas(false);
    }
  };

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const selectHorta = (horta) => {
    setFormData({
      ...formData,
      horta_uuid: horta.uuid,
      horta_nome: horta.nome_da_horta,
    });
    setErrors({ ...errors, horta_uuid: '' });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.numero_identificador.trim()) {
      newErrors.numero_identificador = 'Número identificador é obrigatório';
    }

    if (!formData.tamanho_m2.trim()) {
      newErrors.tamanho_m2 = 'Tamanho é obrigatório';
    }

    if (!formData.horta_uuid) {
      newErrors.horta_uuid = 'Selecione uma horta';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        numero_identificador: formData.numero_identificador,
        tamanho_m2: formData.tamanho_m2,
        horta_uuid: formData.horta_uuid,
      };

      if (isEdit) {
        await updateCanteiro(canteiro.uuid, payload);
        Alert.alert('Sucesso', 'Canteiro atualizado com sucesso');
      } else {
        await createCanteiro(payload);
        Alert.alert('Sucesso', 'Canteiro criado com sucesso');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar canteiro:', error);
      Alert.alert('Erro', error.message || 'Ocorreu um erro ao salvar o canteiro');
    } finally {
      setLoading(false);
    }
  };

  if (loadingHortas) {
    return <Loading />;
  }

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
          label="Número Identificador *"
          value={formData.numero_identificador}
          onChangeText={(text) => updateField('numero_identificador', text)}
          placeholder="Ex: C-001"
          error={errors.numero_identificador}
          leftIcon="grid-outline"
        />

        <Input
          label="Tamanho (m²) *"
          value={formData.tamanho_m2}
          onChangeText={(text) => updateField('tamanho_m2', text)}
          placeholder="Ex: 10"
          keyboardType="decimal-pad"
          error={errors.tamanho_m2}
          leftIcon="resize-outline"
        />

        {/* Horta Selection */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Horta *</Text>
          {formData.horta_nome ? (
            <TouchableOpacity
              style={styles.selectedHorta}
              onPress={() => setFormData({ ...formData, horta_uuid: '', horta_nome: '' })}
            >
              <Text style={styles.selectedHortaText}>{formData.horta_nome}</Text>
              <Ionicons name="close-circle" size={20} color={COLORS.error} />
            </TouchableOpacity>
          ) : (
            <View style={styles.hortasList}>
              {hortas.length === 0 ? (
                <Text style={styles.emptyText}>Nenhuma horta disponível. Crie uma horta primeiro.</Text>
              ) : (
                hortas.map((horta) => (
                  <TouchableOpacity
                    key={horta.uuid}
                    style={styles.hortaItem}
                    onPress={() => selectHorta(horta)}
                  >
                    <Ionicons name="leaf" size={20} color={COLORS.primary} />
                    <Text style={styles.hortaItemText}>{horta.nome_da_horta}</Text>
                    <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}
          {errors.horta_uuid && <Text style={styles.errorText}>{errors.horta_uuid}</Text>}
        </View>

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
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  selectedHorta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary + '20',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  selectedHortaText: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
  },
  hortasList: {
    gap: 8,
  },
  hortaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  hortaItemText: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
    marginLeft: 12,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.error,
    marginTop: 4,
  },
});

export default CanteiroFormScreen;
