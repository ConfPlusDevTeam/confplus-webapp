import { create } from "zustand";

export const useNavLinksStore = create((set) => ({
  links: [],
  setLinks: (links) => set(links),
}));
