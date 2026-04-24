import {
  createStackNavigator,
} from '@react-navigation/stack';

import React from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native';
import { RootStackParamList } from '../types/navigation';

import { useAuth } from '../providers/AuthContext';

import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import ProductDetailsScreen from '../screens/ProductDetails';

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
<Stack.Navigator>
  {token ? (
    <>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen 
        name="ProductDetails" 
        component={ProductDetailsScreen} 
        options={{ title: 'Detalhes do Produto' }} 
      />
    </>
  ) : (
    <Stack.Screen name="Login" component={LoginScreen} />
  )}
</Stack.Navigator>
  );
}