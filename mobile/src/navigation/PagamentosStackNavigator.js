import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../constants/colors';

// Screens
import PagamentosListScreen from '../screens/Pagamentos/PagamentosListScreen';
import PagamentoFormScreen from '../screens/Pagamentos/PagamentoFormScreen';

const Stack = createStackNavigator();

const PagamentosStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.surface,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen
        name="PagamentosList"
        component={PagamentosListScreen}
        options={{ title: 'Pagamentos' }}
      />
      <Stack.Screen
        name="PagamentoForm"
        component={PagamentoFormScreen}
        options={({ route }) => ({
          title: route.params?.pagamento ? 'Editar Pagamento' : 'Novo Pagamento',
        })}
      />
    </Stack.Navigator>
  );
};

export default PagamentosStackNavigator;
