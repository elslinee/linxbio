import mongoose from "mongoose";

const linkBioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    profile: {
      verifiedBadge: { type: Boolean, default: false },
      keyEntered: { type: Boolean, default: false },
      displayName: String,
      showName: { type: Boolean, default: true },
      username: { type: String, unique: true },
      language: { type: String, default: "en" },
      avatar: String,
      backgroundColor: String,
      cover: String,
      bio: String,
      showBio: { type: Boolean, default: true },
    },
    blocks: [
      {
        type: {
          type: String,
          enum: ["button", "Gallery", "Email"],
          required: true,
        },
        title: String,
        subtitle: String,
        data: {
          type: Object,
          default: {},
        },
      },
    ],

    socials: {
      instagram: String,
      tiktok: String,
      x: String,
      threads: String,
      twitch: String,
      facebook: String,
      github: String,
      linkedin: String,
      pinterest: String,
      behance: String,
      youtube: String,
      discord: String,
      telegram: String,
      whatsapp: String,
      email: String,
      website: String,
    },
    socialsOrder: {
      type: [String],
      default: [
        "instagram",
        "tiktok",
        "x",
        "threads",
        "twitch",
        "facebook",
        "github",
        "linkedin",
        "pinterest",
        "behance",
        "youtube",
        "discord",
        "telegram",
        "whatsapp",
        "email",
        "website",
      ],
    },

    template: {
      colors: {
        bg: String,
        text: String,
        accent: String,
      },
      font: String,
      buttons: String,
      header: String,
    },
  },
  { timestamps: true },
);

export const LinkBio =
  mongoose.models.LinkBio || mongoose.model("LinkBio", linkBioSchema);
