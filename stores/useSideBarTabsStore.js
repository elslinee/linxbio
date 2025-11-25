import { create } from "zustand";

export const useSideBarTabsStore = create((set) => ({
  tab: "",

  setTab: (tab) => set((state) => (state.tab === tab ? state : { tab })),
}));
