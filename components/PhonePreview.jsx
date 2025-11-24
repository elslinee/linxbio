import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTiktok,
  faInstagram,
  faTwitch,
  faWhatsapp,
  faXTwitter,
  faThreads,
  faGithub,
  faLinkedin,
  faPinterest,
  faBehance,
  faYoutube,
  faDiscord,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faEarthAmericas } from "@fortawesome/free-solid-svg-icons";

const PhonePreview = ({
  profile,
  socials,
  type = 1,
  colors = {
    accent: "#000000",
    bg: "#ffffff",
    text: "#000000",
  },
  font = "font-poppins",
  buttons = "btns_style_1",
}) => {
  const socialIcons = [
    { key: "instagram", icon: faInstagram },
    { key: "tiktok", icon: faTiktok },
    { key: "x", icon: faXTwitter },
    { key: "threads", icon: faThreads },
    { key: "twitch", icon: faTwitch },
    { key: "facebook", icon: faFacebook },
    { key: "github", icon: faGithub },
    { key: "linkedin", icon: faLinkedin },
    { key: "pinterest", icon: faPinterest },
    { key: "behance", icon: faBehance },
    { key: "youtube", icon: faYoutube },
    { key: "discord", icon: faDiscord },
    { key: "telegram", icon: faTelegram },
    { key: "whatsapp", icon: faWhatsapp },
    { key: "email", icon: faEnvelope },
    { key: "website", icon: faEarthAmericas },
  ];
  const Button = () => {
    switch (buttons) {
      case "btns_style_1":
        return (
          <div className="mt-6 w-full space-y-3">
            {["BLOG", "CONTACT ME", "SUBSCRIBE"].map((label) => (
              <button
                key={label}
                style={{
                  color: colors.accent,
                  backgroundColor: colors.bg,
                  borderColor: colors.accent,
                  boxShadow: `4px 4px 0px 0px ${colors.accent}`,
                }}
                className="w-full rounded-full border-2 py-3 text-xs font-bold transition-transform hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                {label}
              </button>
            ))}
          </div>
        );
      case "btns_style_2":
        return (
          <div className="mt-6 w-full space-y-3">
            {["BLOG", "CONTACT ME", "SUBSCRIBE"].map((label) => (
              <button
                key={label}
                style={{
                  color: colors.accent,
                  backgroundColor: colors.bg,
                  borderColor: colors.accent,
                }}
                className="w-full rounded-full border-2 py-3 text-xs font-bold transition-transform hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                {label}
              </button>
            ))}
          </div>
        );
      case "btns_style_3":
        return (
          <div className="mt-6 w-full space-y-3">
            {["BLOG", "CONTACT ME", "SUBSCRIBE"].map((label) => (
              <button
                key={label}
                style={{
                  color: colors.bg,
                  backgroundColor: colors.accent,
                  borderColor: colors.accent,
                }}
                className="w-full rounded-full border-2 py-3 text-xs font-bold transition-transform hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                {label}
              </button>
            ))}
          </div>
        );
      case "btns_style_4":
        return (
          <div className="mt-6 w-full space-y-3">
            {["BLOG", "CONTACT ME", "SUBSCRIBE"].map((label) => (
              <button
                key={label}
                style={{
                  color: colors.bg,
                  background: `linear-gradient(90deg, ${colors.accent}, ${colors.bg})`,
                  borderColor: colors.bg,
                }}
                className="w-full rounded-full border-2 py-3 text-xs font-bold transition-transform hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                {label}
              </button>
            ))}
          </div>
        );
      case "btns_style_5":
        return (
          <div className="mt-6 w-full space-y-3">
            {["BLOG", "CONTACT ME", "SUBSCRIBE"].map((label) => (
              <button
                key={label}
                style={{
                  color: colors.accent,
                  background: `linear-gradient(90deg, ${colors.bg}, ${colors.accent})`,
                  borderColor: colors.bg,
                }}
                className="w-full rounded-full border-2 py-3 text-xs font-bold transition-transform hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                {label}
              </button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };
  const Type_1 = () => (
    <div
      style={{ backgroundColor: colors.bg }}
      className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.5rem]"
    >
      <div className="h-30 w-full bg-linear-to-b from-[#f4a8d4] to-[#E3E595]"></div>

      <div className="relative -mt-12 flex flex-col items-center px-6">
        <div
          style={{
            borderColor: colors.accent,
            backgroundColor: colors.bg,
          }}
          className="relative h-32 w-32 overflow-hidden rounded-full shadow-md"
        >
          <Image
            src={profile.avatar || "/hero/hero-avatar.png"}
            alt="Profile"
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        </div>

        <h2
          style={{
            color: colors.text,
          }}
          className="mt-3 text-lg font-bold tracking-wide text-black uppercase"
        >
          {profile.displayName || "Your Name"}
        </h2>
        <p
          style={{
            color: `${colors.text}80`,
          }}
          className="text-[10px] font-medium"
        >
          Content Creator
        </p>

        <div
          style={{
            color: colors.text,
          }}
          className="mt-4 flex flex-wrap justify-center gap-3"
        >
          {socialIcons.map((social) => {
            if (socials[social.key]) {
              return (
                <FontAwesomeIcon
                  key={social.key}
                  icon={social.icon}
                  size={
                    social.icon === faInstagram || social.icon === faWhatsapp
                      ? "lg"
                      : ""
                  }
                  className="h-5 w-5 cursor-pointer text-[18px] hover:opacity-70"
                />
              );
            }
            return null;
          })}
        </div>

        <Button />
      </div>
    </div>
  );
  const Type_2 = () => (
    <div
      style={{ backgroundColor: colors.bg }}
      className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.5rem]"
    >
      <div className="h-30 w-full bg-linear-to-b from-[#f4a8d4] to-[#E3E595]"></div>

      <div className="relative -mt-10 flex flex-col items-center px-6">
        <div
          style={{ backgroundColor: colors.bg }}
          className="relative h-18 w-18 overflow-hidden rounded-full shadow-md"
        >
          <Image
            src={profile.avatar || "/hero/hero-avatar.png"}
            alt="Profile"
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        </div>

        <h2
          style={{ color: colors.text }}
          className="mt-1 text-lg font-medium tracking-wide uppercase"
        >
          {profile.displayName || "Your Name"}
        </h2>
        <p
          style={{ color: `${colors.text}80` }}
          className="text-[10px] font-medium"
        >
          Content Creator
        </p>

        <div
          style={{ color: colors.text }}
          className="mt-4 flex flex-wrap justify-center gap-3"
        >
          {socialIcons.map((social) => {
            if (socials[social.key]) {
              return (
                <FontAwesomeIcon
                  key={social.key}
                  icon={social.icon}
                  size={
                    social.icon === faInstagram || social.icon === faWhatsapp
                      ? "lg"
                      : ""
                  }
                  className="h-5 w-5 cursor-pointer text-[18px] hover:opacity-70"
                />
              );
            }
            return null;
          })}
        </div>

        <Button />
      </div>
    </div>
  );
  const Type_3 = () => (
    <div
      style={{ backgroundColor: colors.bg }}
      className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.5rem]"
    >
      <div className="relative mt-8 flex flex-col items-center px-6">
        <div
          style={{ backgroundColor: colors.bg }}
          className="relative h-18 w-18 overflow-hidden rounded-full shadow-md"
        >
          <Image
            src={profile.avatar || "/hero/hero-avatar.png"}
            alt="Profile"
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        </div>

        <h2
          style={{ color: colors.text }}
          className="mt-3 text-lg font-medium tracking-wide uppercase"
        >
          {profile.displayName || "Your Name"}
        </h2>
        <p
          style={{ color: `${colors.text}80` }}
          className="text-[10px] font-medium"
        >
          Content Creator
        </p>

        <div
          style={{ color: colors.text }}
          className="mt-4 flex flex-wrap justify-center gap-3"
        >
          {socialIcons.map((social) => {
            if (socials[social.key]) {
              return (
                <FontAwesomeIcon
                  key={social.key}
                  icon={social.icon}
                  size={
                    social.icon === faInstagram || social.icon === faWhatsapp
                      ? "lg"
                      : ""
                  }
                  className="h-5 w-5 cursor-pointer text-[18px] hover:opacity-70"
                />
              );
            }
            return null;
          })}
        </div>

        <Button />
      </div>
    </div>
  );
  const Type_4 = () => (
    <div
      style={{ backgroundColor: colors.bg }}
      className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.5rem]"
    >
      <div className="relative h-50 w-full bg-linear-to-b from-[#f4a8d4] to-[#ffffff]">
        <Image
          src={profile.avatar || "/hero/hero-avatar.png"}
          alt="Profile"
          fill
          className="object-cover"
        />
        <div
          style={{
            background: `linear-gradient(to bottom, transparent, ${colors.bg})`,
          }}
          className="absolute bottom-0 h-25 w-full"
        ></div>
      </div>

      <div className="relative -mt-26 flex flex-col items-center px-6">
        <div
          style={{ backgroundColor: colors.bg }}
          className="relative h-18 w-18 overflow-hidden rounded-full shadow-md"
        >
          <Image
            src={profile.avatar || "/hero/hero-avatar.png"}
            alt="Profile"
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        </div>

        <h2
          style={{ color: colors.text }}
          className="mt-1 text-lg font-bold tracking-wide uppercase"
        >
          {profile.displayName || "Your Name"}
        </h2>
        <p
          style={{ color: `${colors.text}80` }}
          className="text-[10px] font-medium"
        >
          Content Creator
        </p>

        <div
          style={{ color: colors.text }}
          className="mt-4 flex flex-wrap justify-center gap-3"
        >
          {socialIcons.map((social) => {
            if (socials[social.key]) {
              return (
                <FontAwesomeIcon
                  key={social.key}
                  icon={social.icon}
                  size={
                    social.icon === faInstagram || social.icon === faWhatsapp
                      ? "lg"
                      : ""
                  }
                  className="h-5 w-5 cursor-pointer text-[18px] hover:opacity-70"
                />
              );
            }
            return null;
          })}
        </div>

        <Button />
      </div>
    </div>
  );
  const Type_5 = () => (
    <div
      style={{ backgroundColor: colors.bg }}
      className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.5rem]"
    >
      <div className="relative h-50 w-full bg-linear-to-b from-[#f4a8d4] to-[#ffffff]">
        <Image
          src={profile.avatar || "/hero/hero-avatar.png"}
          alt="Profile"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative -mt-10 flex flex-col items-center px-6">
        <div
          style={{ backgroundColor: colors.bg }}
          className="relative h-18 w-18 overflow-hidden rounded-full shadow-md"
        >
          <Image
            src={profile.avatar || "/hero/hero-avatar.png"}
            alt="Profile"
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        </div>

        <h2
          style={{ color: colors.text }}
          className="mt-1 text-lg font-bold tracking-wide uppercase"
        >
          {profile.displayName || "Your Name"}
        </h2>
        <p
          style={{ color: `${colors.text}80` }}
          className="text-[10px] font-medium"
        >
          Content Creator
        </p>

        <div
          style={{ color: colors.text }}
          className="mt-4 flex flex-wrap justify-center gap-3"
        >
          {socialIcons.map((social) => {
            if (socials[social.key]) {
              return (
                <FontAwesomeIcon
                  key={social.key}
                  icon={social.icon}
                  size={
                    social.icon === faInstagram || social.icon === faWhatsapp
                      ? "lg"
                      : ""
                  }
                  className="h-5 w-5 cursor-pointer text-[18px] hover:opacity-70"
                />
              );
            }
            return null;
          })}
        </div>

        <Button />
      </div>
    </div>
  );
  const Type_6 = () => (
    <div
      style={{ backgroundColor: colors.bg }}
      className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.5rem]"
    >
      <div className="relative h-10 w-full bg-linear-to-b"></div>

      <div className="relative flex flex-col items-center px-6">
        <div
          style={{ backgroundColor: colors.bg }}
          className="relative h-18 w-18 overflow-hidden rounded-full shadow-md"
        >
          <Image
            src={profile.avatar || "/hero/hero-avatar.png"}
            alt="Profile"
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        </div>

        <h2
          style={{ color: colors.text }}
          className="mt-1 text-xl font-bold tracking-wide uppercase"
        >
          {profile.displayName || "Your Name"}
        </h2>
        <p
          style={{ color: `${colors.text}80` }}
          className="text-[10px] font-medium"
        >
          Content Creator
        </p>

        <div
          style={{ color: colors.text }}
          className="mt-4 flex flex-wrap justify-center gap-3"
        >
          {socialIcons.map((social) => {
            if (socials[social.key]) {
              return (
                <FontAwesomeIcon
                  key={social.key}
                  icon={social.icon}
                  size={
                    social.icon === faInstagram || social.icon === faWhatsapp
                      ? "lg"
                      : ""
                  }
                  className="h-5 w-5 cursor-pointer text-[18px] hover:opacity-70"
                />
              );
            }
            return null;
          })}
        </div>

        <div className="scrollbar-hide inline-flex gap-1 overflow-x-auto pt-4">
          <Image
            src={profile.avatar || "/hero/hero-avatar.png"}
            alt="Profile"
            width={100}
            height={100}
            className="absolute -left-[22%] h-[128px] w-[128px] rounded-[8px] object-cover"
          />
          <Image
            src={profile.avatar || "/hero/hero-avatar.png"}
            alt="Profile"
            width={100}
            height={100}
            className="h-[128px] w-[128px] rounded-[8px]"
          />
          <Image
            src={profile.avatar || "/hero/hero-avatar.png"}
            alt="Profile"
            width={100}
            height={100}
            className="absolute -right-[22%] h-[128px] w-[128px] rounded-[8px] object-cover"
          />
        </div>

        <Button />
      </div>
    </div>
  );

  return (
    <div
      className={`relative h-[660px] w-[300px] rounded-[3rem] border-4 border-gray-800 bg-gray-900 p-[6px] shadow-2xl ${font}`}
    >
      {type === 2 ? (
        <Type_2 />
      ) : type === 3 ? (
        <Type_3 />
      ) : type === 4 ? (
        <Type_4 />
      ) : type === 5 ? (
        <Type_5 />
      ) : type === 6 ? (
        <Type_6 />
      ) : (
        <Type_1 />
      )}
    </div>
  );
};

export default PhonePreview;
