import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserInfoStore = create(
  persist(
    (set) => ({
      profile: {
        displayName: "",
        username: "",
        avatar: "",
      },
      socials: {
        instagram: "",
        tiktok: "",
        x: "",
        threads: "",
        twitch: "",
        facebook: "",
        email: "",
        whatsapp: "",
        website: "",
        github: "",
        linkedin: "",
        pinterest: "",
        behance: "",
        youtube: "",
        discord: "",
        telegram: "",
      },

      setProfile: (data) =>
        set((state) => ({
          profile: { ...state.profile, ...data },
        })),

      setSocials: (data) =>
        set((state) => ({
          socials: { ...state.socials, ...data },
        })),
    }),
    {
      name: "user-info-store",
      storage: createJSONStorage(() => localStorage),

      // 🟦 هنا السحر: خزّن بس profile
      partialize: (state) => ({
        profile: state.profile,
      }),
    },
  ),
);

export default useUserInfoStore;
