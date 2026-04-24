import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';

import { CategoryListProps } from '../types/category';

export default function CategoryList({ categories, selectedCategory, onSelect }: CategoryListProps) {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: spacing.md }}
        style={{ marginBottom: spacing.sm }}
      >
        <TouchableOpacity
          onPress={() => onSelect('')}
          style={{
            marginRight: spacing.sm,
            padding: spacing.sm,
            backgroundColor: selectedCategory === '' ? colors.primary : colors.surface,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: selectedCategory === '' ? colors.surface : colors.text }}>
            Todas
          </Text>
        </TouchableOpacity>

        {categories?.map((item: any) => (
          <TouchableOpacity
            key={item.slug}
            onPress={() => onSelect(item.slug)}
            style={{
              marginRight: spacing.sm,
              padding: spacing.sm,
              backgroundColor: selectedCategory === item.slug ? colors.primary : colors.surface,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: selectedCategory === item.slug ? colors.surface : colors.text,
                textTransform: 'capitalize',
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}