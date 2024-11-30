import { create } from "zustand";
import { persist } from "zustand/middleware";

export const tabsStore = create(
  persist(
    (set) => ({
      tab: "Home",
      setTab: (data) => set(() => ({ tab: data })),
    }),
    {
      name: "tabs-storage",
      getStorage: () => localStorage,
    }
  )
);
