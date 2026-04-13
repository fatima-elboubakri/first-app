import { create } from "zustand";

interface AuthState {
  isConnected: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isConnected: false,
  login: () => set({ isConnected: true }),
  logout: () => set({ isConnected: false }),
}));