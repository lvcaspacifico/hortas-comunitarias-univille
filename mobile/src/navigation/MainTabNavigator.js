import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

// Stack Navigators
import HomeStackNavigator from './HomeStackNavigator';
import HortasStackNavigator from './HortasStackNavigator';
import CanteirosStackNavigator from './CanteirosStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
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
            case 'HortasTab':
              iconName = focused ? 'leaf' : 'leaf-outline';
              break;
            case 'CanteirosTab':
              iconName = focused ? 'grid' : 'grid-outline';
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
        name="ProfileTab" 
        component={ProfileStackNavigator}
        options={{ tabBarLabel: 'Perfil' }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
