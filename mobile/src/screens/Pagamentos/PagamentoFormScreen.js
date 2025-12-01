import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Input, Button, Loading } from '../../components/common';
import * as pagamentosService from '../../services/pagamentos.service';
import * as carteiristasService from '../../services/carteiristas.service';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { SPACING, BORDER_RADIUS } from '../../constants/spacing';

const PagamentoFormScreen = ({ navigation, route }) => {
  const pagamentoToEdit = route.params?.pagamento;
  const isEditing = !!pagamentoToEdit;

  const [formData, setFormData] = useState({
    carteirista_id: '',
    valor: '',
    forma_pagamento: 'dinheiro',
    data_pagamento: new Date().toISOString().split('T')[0],
    observacao: '',
  });

  const [carteiristas, setCarteiristas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCarteiristas, setLoadingCarteiristas] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadCarteiristas();

    if (isEditing) {
      setFormData({
        carteirista_id: pagamentoToEdit.carteirista_id?.toString() || '',
        valor: pagamentoToEdit.valor?.toString() || '',
        forma_pagamento: pagamentoToEdit.forma_pagamento || 'dinheiro',
        data_pagamento: pagamentoToEdit.data_pagamento || new Date().toISOString().split('T')[0],
        observacao: pagamentoToEdit.observacao || '',
      });
    }
  }, []);

  const loadCarteiristas = async () => {
    try {
      setLoadingCarteiristas(true);
      const data = await carteiristasService.getAll();
      setCarteiristas(Array.isArray(data) ? data : []);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os carteiristas');
    } finally {
      setLoadingCarteiristas(false);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.carteirista_id) {
      newErrors.carteirista_id = 'Selecione um carteirista';
    }

    if (!formData.valor || parseFloat(formData.valor) <= 0) {
      newErrors.valor = 'Informe um valor válido maior que zero';
    }

    if (!formData.forma_pagamento) {
      newErrors.forma_pagamento = 'Selecione a forma de pagamento';
    }

    if (!formData.data_pagamento) {
      newErrors.data_pagamento = 'Informe a data do pagamento';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      Alert.alert('Erro', 'Por favor, corrija os erros no formulário');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,
        carteirista_id: parseInt(formData.carteirista_id),
        valor: parseFloat(formData.valor),
      };

      if (isEditing) {
        await pagamentosService.update(pagamentoToEdit.id, payload);
        Alert.alert('Sucesso', 'Pagamento atualizado com sucesso');
      } else {
        await pagamentosService.create(payload);
        Alert.alert('Sucesso', 'Pagamento cadastrado com sucesso');
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Erro',
        error.message || 'Não foi possível salvar o pagamento'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loadingCarteiristas) {
    return <Loading />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {isEditing ? 'Editar Pagamento' : 'Novo Pagamento'}
        </Text>

        {/* Carteirista */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Carteirista <Text style={styles.required}>*</Text>
          </Text>
          <View style={[styles.pickerContainer, errors.carteirista_id && styles.inputError]}>
            <Picker
              selectedValue={formData.carteirista_id}
              onValueChange={(value) => setFormData({ ...formData, carteirista_id: value })}
              style={styles.picker}
            >
              <Picker.Item label="Selecione um carteirista" value="" />
              {carteiristas.map((carteirista) => (
                <Picker.Item
                  key={carteirista.id}
                  label={carteirista.nome}
                  value={carteirista.id.toString()}
                />
              ))}
            </Picker>
          </View>
          {errors.carteirista_id && (
            <Text style={styles.errorText}>{errors.carteirista_id}</Text>
          )}
        </View>

        {/* Valor */}
        <Input
          label="Valor"
          value={formData.valor}
          onChangeText={(text) => setFormData({ ...formData, valor: text })}
          placeholder="0.00"
          keyboardType="decimal-pad"
          required
          error={errors.valor}
        />

        {/* Forma de Pagamento */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Forma de Pagamento <Text style={styles.required}>*</Text>
          </Text>
          <View style={[styles.pickerContainer, errors.forma_pagamento && styles.inputError]}>
            <Picker
              selectedValue={formData.forma_pagamento}
              onValueChange={(value) => setFormData({ ...formData, forma_pagamento: value })}
              style={styles.picker}
            >
              <Picker.Item label="Dinheiro" value="dinheiro" />
              <Picker.Item label="PIX" value="pix" />
            </Picker>
          </View>
          {errors.forma_pagamento && (
            <Text style={styles.errorText}>{errors.forma_pagamento}</Text>
          )}
        </View>

        {/* Data do Pagamento */}
        <Input
          label="Data do Pagamento"
          value={formData.data_pagamento}
          onChangeText={(text) => setFormData({ ...formData, data_pagamento: text })}
          placeholder="YYYY-MM-DD"
          required
          error={errors.data_pagamento}
        />

        {/* Observação */}
        <Input
          label="Observação"
          value={formData.observacao}
          onChangeText={(text) => setFormData({ ...formData, observacao: text })}
          placeholder="Observações adicionais (opcional)"
          multiline
          numberOfLines={3}
        />

        {/* Botões */}
        <View style={styles.buttonContainer}>
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
            style={styles.button}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  formGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.small,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  required: {
    color: COLORS.error,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.surface,
  },
  picker: {
    height: 50,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.error,
    marginTop: SPACING.xs / 2,
  },
  buttonContainer: {
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  button: {
    width: '100%',
  },
});

export default PagamentoFormScreen;
