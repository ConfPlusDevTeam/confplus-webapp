import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useNavLinksStore = create(
  immer((set) => ({
    links:
      localStorage.getItem("user") == null
        ? [
            {
              name: "Information",
              link: "/",
            },

            {
              name: "Sign In",

              link: "/signin",
            },
          ]
        : [
            {
              name: "Dashboard",

              link: `/${JSON.parse(localStorage.getItem("user")).role}`,
            },

            {
              name: "Schedule",

              link: "/schedule",
            },

            {
              name: "Log Out",

              link: `/signin`,
            },
          ],

    setLinks: (links) =>
      set((state) => {
        state.links = links;
      }),
  }))
);
