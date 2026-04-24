import React from 'react';

import {
  Button,
  Text,
  View,
} from 'react-native';

interface Props {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({
  message,
  onRetry,
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
          marginBottom: 16,
          textAlign: 'center',
        }}
      >
        {message}
      </Text>

      <Button
        title="Tentar novamente"
        onPress={onRetry}
      />
    </View>
  );
}