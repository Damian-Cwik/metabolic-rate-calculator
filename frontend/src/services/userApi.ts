import type { Profile, User } from "@/types/api";
import { apiClient } from "./apiClient";

export async function updateProfile(profile: Profile): Promise<User> {
  const { data } = await apiClient.put<User>("/users/me", profile);
  return data;
}
