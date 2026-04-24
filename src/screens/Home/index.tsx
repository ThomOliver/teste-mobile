import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
  Button
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import EmptyState from '../../components/EmptyState';
import ErrorState from '../../components/ErrorState';
import ProductCard from '../../components/ProductCard';
import CategoryList from '../../components/CategoryList';
import SearchInput from '../../components/SearchInput';
import ProductLoadingState from '../../components/ProductLoadingState';

import { useAuth } from '../../providers/AuthContext';
import { useDebounce } from '../../hooks/useDebounce';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';

import { RootStackParamList } from '../../types/navigation';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const { signOut } = useAuth();
  const { data: categories } = useCategories();
  const debouncedSearch = useDebounce(search);

  const {
    data,
    isLoading,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts({
    search: debouncedSearch,
    category,
    maxPrice: maxPrice ? Number(maxPrice.replace(',', '.')) : undefined,
  });

  const products = useMemo(() => {
    return data?.pages.flatMap((page) => page.products) || [];
  }, [data]);

  if (error) {
    return <ErrorState message="Erro ao carregar produtos" onRetry={refetch} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Button title="Sair" onPress={signOut} />

      <SearchInput
        placeholder="Buscar produto..."
        value={search}
        onChangeText={setSearch}
        style={{ marginTop: spacing.md, marginBottom: spacing.sm }}
      />

      <CategoryList
        categories={categories}
        selectedCategory={category}
        onSelect={setCategory}
      />

      <SearchInput
        placeholder="Preço máximo"
        keyboardType="numeric"
        value={maxPrice}
        onChangeText={setMaxPrice}
        style={{ marginBottom: spacing.md, padding: spacing.md, borderRadius: spacing.md }}
      />

      {isLoading ? (
        <ProductLoadingState />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={products.length === 0 ? { flexGrow: 1 } : {}}
          ListEmptyComponent={<EmptyState message="Nenhum produto encontrado" />}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate('ProductDetails', { productId: item.id })
              }
            />
          )}
        />
      )}
    </View>
  );
}