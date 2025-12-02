import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faXTwitter,
  faThreads,
  faTwitch,
  faFacebook,
  faGithub,
  faLinkedin,
  faPinterest,
  faBehance,
  faYoutube,
  faDiscord,
  faTelegram,
  faWhatsapp,
  faSnapchat,
} from "@fortawesome/free-brands-svg-icons";

import {
  faEnvelope,
  faEarthAmericas,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useAlertDialog } from "@/components/AlertDialogProvider";
import Button from "@/components/Button";
import { ChevronRight, X } from "lucide-react";
import useUserInfoStore from "@/stores/useUserInfoStore";

const socialOptions = [
  {
    id: "instagram",
    name: "Instagram",
    icon: faInstagram,
    placeholder: "@username",
  },
  { id: "tiktok", name: "TikTok", icon: faTiktok, placeholder: "@username" },
  { id: "x", name: "X (Twitter)", icon: faXTwitter, placeholder: "@username" },
  { id: "threads", name: "Threads", icon: faThreads, placeholder: "@username" },
  { id: "twitch", name: "Twitch", icon: faTwitch, placeholder: "@username" },
  {
    id: "facebook",
    name: "Facebook",
    icon: faFacebook,
    placeholder: "Profile URL",
  },
  {
    id: "github",
    name: "GitHub",
    icon: faGithub,
    placeholder: "github.com/username",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: faLinkedin,
    placeholder: "linkedin.com/in/username",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    icon: faPinterest,
    placeholder: "@username",
  },
  {
    id: "behance",
    name: "Behance",
    icon: faBehance,
    placeholder: "behance.net/username",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: faYoutube,
    placeholder: "YouTube channel URL",
  },
  {
    id: "discord",
    name: "Discord",
    icon: faDiscord,
    placeholder: "discord.gg/xxxx",
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: faTelegram,
    placeholder: "@username",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: faWhatsapp,
    placeholder: "+20123xxxxxxx",
  },
  {
    id: "snapchat",
    name: "Snapchat",
    icon: faSnapchat,
    placeholder: "username",
  },
  {
    id: "email",
    name: "Email",
    icon: faEnvelope,
    placeholder: "your@email.com",
  },
  {
    id: "website",
    name: "Website",
    icon: faEarthAmericas,
    placeholder: "https://your-website.com",
  },
];

function AddSocialDialogContent({ social }) {
  const { closeDialog } = useAlertDialog();
  const { setSocials, socials } = useUserInfoStore();
  const [value, setValue] = useState(socials[social.id] || "");

  const handleSave = () => {
    setSocials({ [social.id]: value });
    closeDialog();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Add Social link</h2>
        <button
          onClick={closeDialog}
          className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          {social.name} {social.id === "email" ? "Address" : "Username"}
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={social.placeholder}
          className="focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-1"
          autoFocus
        />
      </div>

      <div className="mt-4 flex justify-end gap-3">
        <button
          onClick={closeDialog}
          className="rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-primary hover:bg-primary/80 rounded-full px-6 py-2 text-sm font-medium text-white"
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default function AddSocialLinkButton() {
  const { socials } = useUserInfoStore();
  const [isOpen, setIsOpen] = useState(false);
  const { showDialog } = useAlertDialog();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (social) => {
    setIsOpen(false);
    showDialog({
      content: <AddSocialDialogContent social={social} />,
      hideActions: true,
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="flex min-w-[140px] items-center justify-center gap-2 rounded-full px-4! py-2! text-sm font-medium "
      >
        Add Social Link
      </Button>

      {isOpen && (
        <div className="ring-opacity-5 custom-scroll absolute top-full right-0 z-50 mt-2 max-h-[300px] w-64 origin-top-right overflow-y-auto rounded-md bg-white py-2 shadow-xl ring-1 ring-gray-300 focus:outline-none">
          {socialOptions
            .filter((s) => !socials[s.id])
            .map((social) => (
              <button
                key={social.id}
                onClick={() => handleSelect(social)}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center text-lg">
                    <FontAwesomeIcon icon={social.icon || faPlus} />
                  </div>
                  <span className="font-medium">{social.name}</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
