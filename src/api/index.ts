import axios from 'axios';

import {
  getToken,
  removeToken,
} from '../storage/authStorage';

export const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response?.status === 401) {
      await removeToken();
    }

    return Promise.reject(error);
  }
);