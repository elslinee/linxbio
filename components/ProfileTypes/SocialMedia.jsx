import React from "react";
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
  faSnapchat,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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
  { key: "snapchat", icon: faSnapchat },
  { key: "whatsapp", icon: faWhatsapp },
  { key: "email", icon: faEnvelope },
  { key: "website", icon: faEarthAmericas },
];

const SocialMedia = ({
  socials,
  socialsOrder,
  colors,
  enableTracking = false,
  onTrackClick,
  className = "mt-4 flex flex-wrap justify-center gap-3",
  iconClassName = "h-5 w-5 text-2xl hover:opacity-70",
  isPreview = false,
}) => {
  const getHref = (key, value) => {
    if (!value) return null;

    let href = value;
    const isFullUrl =
      value.startsWith("http://") || value.startsWith("https://");

    if (!isFullUrl) {
      switch (key) {
        case "email":
          href = `mailto:${value}`;
          break;
        case "whatsapp":
          href = `https://wa.me/${value.replace(/\D/g, "")}`;
          break;
        case "instagram":
          href = `https://instagram.com/${value}`;
          break;
        case "threads":
          href = `https://threads.com/${value}`;
          break;
        case "tiktok":
          href = `https://www.tiktok.com/@${value}`;
          break;
        case "x":
          href = `https://x.com/${value}`;
          break;
        case "twitch":
          href = `https://twitch.tv/${value}`;
          break;
        case "facebook":
          href = `https://facebook.com/${value}`;
          break;
        case "github":
          href = `https://github.com/${value}`;
          break;
        case "linkedin":
          href = `https://linkedin.com/in/${value}`;
          break;
        case "pinterest":
          href = `https://pinterest.com/${value}`;
          break;
        case "behance":
          href = `https://behance.net/${value}`;
          break;
        case "telegram":
          href = `https://t.me/${value}`;
          break;
        case "snapchat":
          href = `https://www.snapchat.com/add/${value}`;
          break;
        default:
          href = value;
          break;
      }
    }

    return href;
  };

  if (isPreview) {
    return (
      <div style={{ color: colors.text }} className={className}>
        {socialsOrder.map((key) => {
          const iconObj = socialIcons.find((s) => s.key === key);
          const value = socials[key];

          if (!value) return null;

          const href = getHref(key, value);

          return (
            <Link
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <FontAwesomeIcon icon={iconObj.icon} className={iconClassName} />
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ color: colors.text }} className={className}>
      {socialsOrder.map((key) => {
        const iconObj = socialIcons.find((s) => s.key === key);
        const value = socials[key];

        if (!value) return null;

        const href = getHref(key, value);

        return (
          <Link
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
            onClick={() => {
              if (enableTracking && onTrackClick) {
                onTrackClick(`social-${key}`);
              }
            }}
          >
            <FontAwesomeIcon icon={iconObj.icon} className={iconClassName} />
          </Link>
        );
      })}
    </div>
  );
};

export default SocialMedia;
export { socialIcons };
