import type { AuthResponse, Credentials } from "@/types/api";
import { apiClient } from "./apiClient";

export async function login(credentials: Credentials): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(
    "/auth/login",
    credentials,
  );
  return data;
}

export async function register(
  credentials: Credentials,
): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(
    "/auth/register",
    credentials,
  );
  return data;
}
