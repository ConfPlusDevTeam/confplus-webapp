import { create } from "zustand";

export const useNavLinksStore = create((set) => ({
  links: [
    {
      name: "Information",
      link: "/",
    },

    {
      name: "Sign In",

      link: "/signin",
    },
  ],
  setLinks: (links) => set({ links }),
}));
