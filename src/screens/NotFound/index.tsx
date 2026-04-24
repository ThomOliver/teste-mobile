import React from 'react';

import {
  Button,
  Text,
  View,
} from 'react-native';

import { spacing } from '../../styles/spacing';
import { typography } from '../../styles/typography';

export default function NotFoundScreen({
  navigation,
}: any) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.lg,
      }}
    >
      <Text
        style={{
          fontSize: typography.title.fontSize,
          fontWeight: typography.title.fontWeight,
        }}
      >
        Página não encontrada
      </Text>

      <Button
        title="Voltar"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}