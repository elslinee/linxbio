import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  setUser: (userData) => set({ user: userData, loading: false }),

  clearUser: () => set({ user: null, loading: false }),

  stopLoading: () => set({ loading: false }),
}));
