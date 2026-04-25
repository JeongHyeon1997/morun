import axios, { AxiosError } from 'axios';
import { useAuthStore } from '@/lib/auth/store';

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export const api = axios.create({
  baseURL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearSession();
    }
    return Promise.reject(error);
  },
);
