import mongoose from "mongoose";

const linkBioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    profile: {
      displayName: String,
      username: { type: String, unique: true },
      avatar: String,
    },

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
