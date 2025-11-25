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

      errors: {},

      setProfile: (data) =>
        set((state) => ({
          profile: { ...state.profile, ...data },
        })),

      setSocials: (data) =>
        set((state) => ({
          socials: { ...state.socials, ...data },
        })),
      setError: (name, value) =>
        set((state) => ({
          errors: { ...state.errors, [name]: value },
        })),

      resetErrors: () =>
        set({
          errors: {},
        }),

      resetUserInfo: () =>
        set({
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
          errors: {}, // مهم جداً
        }),
    }),
    {
      name: "user-info-store",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        profile: state.profile,
        socials: state.socials,
        errors: state.errors, // ← حفظ الأخطاء
      }),
    },
  ),
);

export default useUserInfoStore;
