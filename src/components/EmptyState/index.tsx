import React from 'react';

import {
  Text,
  View,
} from 'react-native';

interface Props {
  message: string;
}

export default function EmptyState({
  message,
}: Props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          color: '#666',
          textAlign: 'center',
        }}
      >
        {message}
      </Text>
    </View>
  );
}