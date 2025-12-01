import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../constants/colors';

import AssociacoesListScreen from '../screens/Associacoes/AssociacoesListScreen';
import AssociacaoFormScreen from '../screens/Associacoes/AssociacaoFormScreen';
import AssociacaoDetailScreen from '../screens/Associacoes/AssociacaoDetailScreen';

const Stack = createStackNavigator();

const AssociacoesStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="AssociacoesList" 
        component={AssociacoesListScreen}
        options={{ title: 'Associações' }}
      />
      <Stack.Screen 
        name="AssociacaoForm" 
        component={AssociacaoFormScreen}
        options={({ route }) => ({
          title: route.params?.associacao ? 'Editar Associação' : 'Nova Associação'
        })}
      />
      <Stack.Screen 
        name="AssociacaoDetail" 
        component={AssociacaoDetailScreen}
        options={{ title: 'Detalhes da Associação' }}
      />
    </Stack.Navigator>
  );
};

export default AssociacoesStackNavigator;
