import { create } from "zustand";

const useBlocksStore = create((set) => ({
  blocks: [],
  setBlocks: (blocks) => set({ blocks }),
  resetBlocks: () => set({ blocks: [] }),
}));

export default useBlocksStore;
