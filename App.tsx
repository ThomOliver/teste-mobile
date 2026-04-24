import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigation from './src/navigation';
import { AuthProvider } from './src/providers/AuthContext';
import { QueryProvider } from './src/providers/QueryProvider';

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <AuthProvider>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </AuthProvider>
      </QueryProvider>
    </SafeAreaProvider>
  );
}