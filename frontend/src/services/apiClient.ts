import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api",
});

apiClient.interceptors.request.use((config) => {
  const { token } = useAuth.getState();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(undefined, (error: unknown) => {
  const isUnauthorized =
    axios.isAxiosError(error) && error.response?.status === 401;
  const isLoginAttempt =
    axios.isAxiosError(error) && error.config?.url?.startsWith("/auth");

  if (isUnauthorized && !isLoginAttempt && useAuth.getState().token) {
    useAuth.getState().signOut();
    window.location.assign("/login");
  }
  return Promise.reject(error);
});
