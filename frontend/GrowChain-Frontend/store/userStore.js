import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (data) => set(() => ({ user: data })),
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);
