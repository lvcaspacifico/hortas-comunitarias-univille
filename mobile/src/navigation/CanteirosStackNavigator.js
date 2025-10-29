import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../constants/colors';

import CanteirosListScreen from '../screens/Canteiros/CanteirosListScreen';
import CanteiroDetailScreen from '../screens/Canteiros/CanteiroDetailScreen';
import CanteiroFormScreen from '../screens/Canteiros/CanteiroFormScreen';

const Stack = createStackNavigator();

const CanteirosStackNavigator = () => {
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
        name="CanteirosList" 
        component={CanteirosListScreen}
        options={{ title: 'Canteiros' }}
      />
      <Stack.Screen 
        name="CanteiroDetail" 
        component={CanteiroDetailScreen}
        options={{ title: 'Detalhes do Canteiro' }}
      />
      <Stack.Screen 
        name="CanteiroForm" 
        component={CanteiroFormScreen}
        options={({ route }) => ({ 
          title: route.params?.canteiro ? 'Editar Canteiro' : 'Novo Canteiro' 
        })}
      />
    </Stack.Navigator>
  );
};

export default CanteirosStackNavigator;
