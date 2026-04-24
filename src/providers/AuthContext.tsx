import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { api } from '../api';
import {
  getToken,
  removeToken,
  saveToken,
} from '../storage/authStorage';

import { AuthContextData } from '../types/auth';

const AuthContext = createContext({} as AuthContextData);

interface Props {
  children: React.ReactNode;
}
export function AuthProvider({ children }: Props) {

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadStorage() {
    const storedToken = await getToken();

    if (storedToken) {
      setToken(storedToken);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadStorage();
  }, []);

  async function signIn(
    username: string,
    password: string
  ) {
    const response = await api.post('/auth/login', {
      username,
      password,
    });

   const {
    accessToken
    } = response.data;

    await saveToken(accessToken);
    setToken(accessToken);
    setUser(username);
  }

  async function signOut() {
    await removeToken();

    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}