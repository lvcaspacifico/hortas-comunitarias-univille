import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { useAuth } from '../contexts/AuthContext';

// Stack Navigators
import HomeStackNavigator from './HomeStackNavigator';
import AssociacoesStackNavigator from './AssociacoesStackNavigator';
import HortasStackNavigator from './HortasStackNavigator';
import CanteirosStackNavigator from './CanteirosStackNavigator';
import PagamentosStackNavigator from './PagamentosStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const { user } = useAuth();
  
  // Verifica se o usuário tem permissão para acessar associações
  const hasAssociacaoPermission = user?.associacao_uuid;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'HomeTab':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'AssociacoesTab':
              iconName = focused ? 'business' : 'business-outline';
              break;
            case 'HortasTab':
              iconName = focused ? 'leaf' : 'leaf-outline';
              break;
            case 'CanteirosTab':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            case 'PagamentosTab':
              iconName = focused ? 'cash' : 'cash-outline';
              break;
            case 'ProfileTab':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStackNavigator}
        options={{ tabBarLabel: 'Início' }}
      />
      <Tab.Screen 
        name="AssociacoesTab" 
        component={AssociacoesStackNavigator}
        options={{ 
          tabBarLabel: 'Associações',
          tabBarButton: hasAssociacaoPermission ? undefined : () => null,
        }}
      />
      <Tab.Screen 
        name="HortasTab" 
        component={HortasStackNavigator}
        options={{ tabBarLabel: 'Hortas' }}
      />
      <Tab.Screen
        name="CanteirosTab"
        component={CanteirosStackNavigator}
        options={{ tabBarLabel: 'Canteiros' }}
      />
      <Tab.Screen
        name="PagamentosTab"
        component={PagamentosStackNavigator}
        options={{ tabBarLabel: 'Pagamentos' }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{ tabBarLabel: 'Perfil' }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
