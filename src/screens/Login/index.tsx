import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Controller, useForm } from 'react-hook-form';

import { useAuth } from '../../providers/AuthContext';

import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';

import {
  LoginFormData,
  loginSchema,
} from '../../schemas/loginSchema';

export default function LoginScreen() {
  const { signIn } = useAuth();

  const [apiError, setApiError] =
  useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setApiError('');
    try {
      await signIn(data.username, data.password);
    } catch (error) {
      setApiError('Usuário ou senha inválidos');
      console.log(error);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: spacing.lg,
      }}
    >
      <Text>Usuário</Text>

      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Digite seu usuário"
            placeholderTextColor={colors.text}
            style={{
              borderWidth: 1,
              padding: spacing.lg,
              marginTop: spacing.sm,
              marginBottom: spacing.xs,
            }}
          />
        )}
      />

      {errors.username && (
        <Text style={{ color: colors.error }}>{errors.username.message}</Text>
      )}

      <Text style={{ marginTop: spacing.md }}>Senha</Text>

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholderTextColor={colors.text}
            value={value}
            onChangeText={onChange}
            placeholder="Digite sua senha"
            secureTextEntry
            style={{
              borderWidth: 1,
              padding: spacing.lg,
              marginTop: spacing.sm,
              marginBottom: spacing.xs,
            }}
          />
        )}
      />

      {errors.password && (
        <Text style={{ color: colors.error }}>{errors.password.message}</Text>
      )}

      {apiError ? (
        <Text 
          style={{ 
            color: colors.surface, 
            backgroundColor: colors.error,
            padding: spacing.md, 
            borderRadius: spacing.sm, 
            marginTop: spacing.md, 
            textAlign: 'center' 
          }}
        >
          {apiError}
        </Text>
      ) : null}

      <View style={{ marginTop: spacing.lg }}>
        {isSubmitting ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleSubmit(onSubmit)}
            style={{ 
              backgroundColor: colors.primary,
              padding: spacing.lg,
              borderRadius: spacing.sm,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
              Entrar
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}