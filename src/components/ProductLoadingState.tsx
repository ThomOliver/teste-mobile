import React from 'react';
import { FlatList } from 'react-native';
import ProductSkeleton from './ProductSkeleton';
import { spacing } from '../styles/spacing';

export default function ProductLoadingState() {
  return (
    <FlatList
      data={[1, 2, 3, 4]}
      keyExtractor={(item) => String(item)}
      renderItem={() => <ProductSkeleton />}
      contentContainerStyle={{ paddingHorizontal: spacing.md }}
    />
  );
}