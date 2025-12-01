import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Input } from '../../components/common';
import { COLORS } from '../../constants/colors';
import { 
  validateCPForCNPJ, 
  validateEmail, 
  validatePassword 
} from '../../utils/validators';
import { formatCPForCNPJ } from '../../utils/formatters';

const RegisterScreen = ({ navigation }) => {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    nome: '',
    cpf_cnpj: '',
    email: '',
    senha: '',
    confirmSenha: '',
    data_de_nascimento: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.cpf_cnpj.trim()) {
      newErrors.cpf_cnpj = 'CPF é obrigatório';
    } else if (!validateCPForCNPJ(formData.cpf_cnpj)) {
      newErrors.cpf_cnpj = 'CPF inválido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (!validatePassword(formData.senha)) {
      newErrors.senha = 'Senha deve ter no mínimo 6 caracteres';
    }

    if (!formData.confirmSenha) {
      newErrors.confirmSenha = 'Confirmação de senha é obrigatória';
    } else if (formData.senha !== formData.confirmSenha) {
      newErrors.confirmSenha = 'Senhas não conferem';
    }

    if (!formData.data_de_nascimento.trim()) {
      newErrors.data_de_nascimento = 'Data de nascimento é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await signUp({
        nome: formData.nome,
        cpf_cnpj: formData.cpf_cnpj.replace(/[^\d]/g, ''),
        email: formData.email.trim().toLowerCase(),
        senha: formData.senha,
        data_de_nascimento: formData.data_de_nascimento,
        apelido: formData.nome.split(' ')[0], // Primeiro nome
      });

      if (result.success) {
        Alert.alert(
          'Sucesso',
          'Cadastro realizado com sucesso! Faça login para continuar.',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
        );
      } else {
        Alert.alert('Erro', result.message);
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao realizar cadastro');
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
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.logo}>🌱</Text>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>Preencha os dados para se cadastrar</Text>
        </View>

        <View style={styles.formContainer}>
          <Input
            label="Nome Completo"
            value={formData.nome}
            onChangeText={(text) => updateField('nome', text)}
            placeholder="Digite seu nome completo"
            error={errors.nome}
            leftIcon="person-outline"
          />

          <Input
            label="CPF"
            value={formatCPForCNPJ(formData.cpf_cnpj)}
            onChangeText={(text) => updateField('cpf_cnpj', text)}
            placeholder="000.000.000-00"
            keyboardType="numeric"
            error={errors.cpf_cnpj}
            leftIcon="card-outline"
            maxLength={14}
          />

          <Input
            label="E-mail"
            value={formData.email}
            onChangeText={(text) => updateField('email', text)}
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            leftIcon="mail-outline"
          />

          <Input
            label="Data de Nascimento"
            value={formData.data_de_nascimento}
            onChangeText={(text) => updateField('data_de_nascimento', text)}
            placeholder="YYYY-MM-DD"
            error={errors.data_de_nascimento}
            leftIcon="calendar-outline"
            maxLength={10}
          />

          <Input
            label="Senha"
            value={formData.senha}
            onChangeText={(text) => updateField('senha', text)}
            placeholder="Mínimo 6 caracteres"
            secureTextEntry
            error={errors.senha}
            leftIcon="lock-closed-outline"
          />

          <Input
            label="Confirmar Senha"
            value={formData.confirmSenha}
            onChangeText={(text) => updateField('confirmSenha', text)}
            placeholder="Digite a senha novamente"
            secureTextEntry
            error={errors.confirmSenha}
            leftIcon="lock-closed-outline"
          />

          <Button
            title="Cadastrar"
            onPress={handleRegister}
            loading={loading}
            style={styles.registerButton}
          />

          <Button
            title="Já tenho conta"
            onPress={() => navigation.navigate('Login')}
            variant="outline"
            style={styles.loginButton}
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
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 48,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    fontSize: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  registerButton: {
    marginTop: 8,
  },
  loginButton: {
    marginTop: 16,
  },
});

export default RegisterScreen;
