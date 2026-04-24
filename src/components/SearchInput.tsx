import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import { typography } from '../styles/typography';

export default function SearchInput(props: TextInputProps) {
  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.text}
      style={[
        {
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          marginHorizontal: spacing.md,
          padding: spacing.sm,
          borderRadius: spacing.sm,
          fontSize: typography.body.fontSize,
        },
        props.style,
      ]}
    />
  );
}