import React from 'react';

import { View } from 'react-native';

export default function ProductSkeleton() {
  return (
    <View
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#e5e5e5',
      }}
    >
      <View
        style={{
          width: '100%',
          height: 180,
          backgroundColor: '#e5e5e5',
          borderRadius: 8,
        }}
      />

      <View
        style={{
          width: '70%',
          height: 20,
          backgroundColor: '#e5e5e5',
          marginTop: 12,
          borderRadius: 4,
        }}
      />

      <View
        style={{
          width: '40%',
          height: 16,
          backgroundColor: '#e5e5e5',
          marginTop: 8,
          borderRadius: 4,
        }}
      />

      <View
        style={{
          width: '30%',
          height: 18,
          backgroundColor: '#e5e5e5',
          marginTop: 12,
          borderRadius: 4,
        }}
      />
    </View>
  );
}