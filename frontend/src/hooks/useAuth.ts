import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthResponse, User } from "@/types/api";

interface AuthState {
  token: string | null;
  user: User | null;
  signIn: (response: AuthResponse) => void;
  updateUser: (user: User) => void;
  signOut: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      signIn: ({ token, user }) => set({ token, user }),
      updateUser: (user) => set({ user }),
      signOut: () => set({ token: null, user: null }),
    }),
    { name: "auth" },
  ),
);

export function isSignedIn(): boolean {
  return useAuth.getState().token !== null;
}
