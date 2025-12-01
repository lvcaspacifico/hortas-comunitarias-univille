import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../constants/colors';

import HortasListScreen from '../screens/Hortas/HortasListScreen';
import HortaDetailScreen from '../screens/Hortas/HortaDetailScreen';
import HortaFormScreen from '../screens/Hortas/HortaFormScreen';

const Stack = createStackNavigator();

const HortasStackNavigator = () => {
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
        name="HortasList" 
        component={HortasListScreen}
        options={{ title: 'Hortas' }}
      />
      <Stack.Screen 
        name="HortaDetail" 
        component={HortaDetailScreen}
        options={{ title: 'Detalhes da Horta' }}
      />
      <Stack.Screen 
        name="HortaForm" 
        component={HortaFormScreen}
        options={({ route }) => ({ 
          title: route.params?.horta ? 'Editar Horta' : 'Nova Horta' 
        })}
      />
    </Stack.Navigator>
  );
};

export default HortasStackNavigator;
