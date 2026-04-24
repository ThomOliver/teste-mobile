import React from 'react';

import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Product } from '../../types/product';

import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { typography } from '../../styles/typography';

interface Props {
  product: Product;
  onPress: () => void;
}

export default function ProductCard({
  product,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        backgroundColor: colors.surface,
        marginHorizontal: spacing.md,
        marginBottom: spacing.md,
        borderRadius: 12,
        overflow: 'hidden',

        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,

        elevation: 3,
      }}
    >
      <Image
        source={{ uri: product.thumbnail }}
        style={{
          width: '100%',
          height: 200,
        }}
        resizeMode="cover"
      />

      <View style={{ padding: spacing.md }}>
        <Text
          numberOfLines={1}
          style={[typography.subtitle, { color: colors.text }]}
        >
          {product.title}
        </Text>

        <Text
          style={[typography.subtitle, { color: colors.textSecondary }]}
        >
          {product.category}
        </Text>

        <Text
          style={[typography.body, { color: colors.primary }]}
        >
          R$ {product.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}