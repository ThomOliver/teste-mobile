import React from 'react';

import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';

import { useQuery } from '@tanstack/react-query';

import { getProductById } from '../../services/products';

import { RootStackParamList } from '../../types/navigation';

import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { typography } from '../../styles/typography';

type Props = StackScreenProps<
  RootStackParamList,
  'ProductDetails'
>;

export default function ProductDetailsScreen({
  route
}: Props) {
  const { productId } = route.params;

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
  });

  if (isLoading) {
    return (
        <View
           style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
            <ActivityIndicator size="large" />
        </View>
    );
  }

  if (error || !data) {
    return (
      <View>
        <Text>Produto não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{
        paddingBottom: spacing.lg,
        }} style={{ flex: 1, padding: spacing.lg }}>
      <Image
        source={{ uri: data.thumbnail }}
        style={{
          width: '100%',
          height: 300,
          borderRadius: spacing.md,
        }}
      />

      <Text
        style={{
          fontSize: typography.title.fontSize,
          fontWeight: typography.title.fontWeight,
          marginTop: spacing.md,
        }}
      >
        {data.title}
      </Text>

    <Text
        style={{
          marginTop: spacing.md,
          fontSize: typography.body.fontSize,
          lineHeight: typography.body.fontSize * 1.5,
          color: colors.text,
        }}
        >
        {data.description}
    </Text>

      <Text
        style={{
          marginTop: spacing.md,
          fontSize: typography.title.fontSize,
          fontWeight: typography.title.fontWeight,
        }}
      >
        R$ {data.price}
      </Text>

      <Text style={{ marginTop: spacing.md }}>
        Categoria: {data.category}
      </Text>
    </ScrollView>
  );
}