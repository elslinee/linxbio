import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserInfoStore = create(
  persist(
    (set) => ({
      profile: {
        displayName: "",
        showName: true,
        username: "",
        avatar: "",
        verifiedBadge: false,
        keyEntered: false,
        language: "en",
        cover: "",
        backgroundColor: "",
        bio: "",
        showBio: true,
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
      socialsOrder: [
        "instagram",
        "tiktok",
        "x",
        "threads",
        "twitch",
        "facebook",
        "email",
        "whatsapp",
        "website",
        "github",
        "linkedin",
        "pinterest",
        "behance",
        "youtube",
        "discord",
        "telegram",
      ],

      errors: {},
      startUploadImage: "",

      setProfile: (data) =>
        set((state) => ({
          profile: { ...state.profile, ...data },
        })),
      setSocials: (data) =>
        set((state) => ({
          socials: { ...state.socials, ...data },
        })),

      setSocialsOrder: (newOrder) =>
        set(() => ({
          socialsOrder: newOrder,
        })),
      setError: (name, value) =>
        set((state) => ({
          errors: { ...state.errors, [name]: value },
        })),
      setStartUploadImage: (value) =>
        set((state) => ({
          startUploadImage: value,
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
          errors: {},
        }),
    }),
    {
      name: "user-info-store",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        profile: {
          ...state.profile,
          avatar: undefined,
          cover: undefined,
        },
        socials: state.socials,
        socialsOrder: state.socialsOrder,
        errors: state.errors,
      }),
    },
  ),
);

export default useUserInfoStore;
