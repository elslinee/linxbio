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
import { VerifiedIcon } from "@/components/VerifiedIcon";
import Link from "next/link";
const Desktop = ({
  desktop = false,
  profile,
  socials,
  socialsOrder,
  type = 1,
  colors = {
    accent: "#000000",
    bg: "#ffffff",
    text: "#000000",
  },
  cover = "",
  font = "font-poppins",
  buttons = "btns_style_1",
  blocks = [],
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

  const coverIsImage =
    cover.startsWith("http") ||
    cover.startsWith("https") ||
    cover.startsWith("blob");
  const baseClasses =
    "w-full flex justify-center items-center    rounded-full border-2  py-3  text-base text-base font-bold transition-transform hover:translate-x-[2px] hover:translate-y-[2px]";
  const showBio = profile?.showBio;
  const SocialMedia = () => {
    return (
      <div
        style={{ color: colors.text }}
        className="mt-4 flex flex-wrap justify-center gap-3"
      >
        {socialsOrder.map((key) => {
          const iconObj = socialIcons.find((s) => s.key === key);
          const value = socials[key];

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
              default:
                href = value;
                break;
            }
          }

          return (
            <Link
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <FontAwesomeIcon
                icon={iconObj.icon}
                className="h-5 w-5 text-xl hover:opacity-70"
              />
            </Link>
          );
        })}
      </div>
    );
  };
  const Button = () => {
    if (!buttons) return null;

    const getStyles = (style) => {
      switch (style) {
        case "btns_style_1":
          return (colors) => ({
            color: colors.accent,
            backgroundColor: colors.bg,
            borderColor: colors.accent,
            boxShadow: `6px 6px 0px 0px ${colors.accent}`,
          });

        case "btns_style_2":
          return (colors) => ({
            color: colors.accent,
            backgroundColor: colors.bg,
            borderColor: colors.accent,
          });

        case "btns_style_3":
          return (colors) => ({
            color: colors.bg,
            backgroundColor: colors.accent,
            borderColor: colors.accent,
          });

        case "btns_style_4":
          return (colors) => ({
            color: colors.bg,
            background: `linear-gradient(90deg, ${colors.accent}, ${colors.bg})`,
            borderColor: colors.bg,
          });

        case "btns_style_5":
          return (colors) => ({
            color: colors.accent,
            background: `linear-gradient(90deg, ${colors.bg}, ${colors.accent})`,
            borderColor: colors.bg,
          });

        default:
          return () => ({});
      }
    };

    const styleFn = getStyles(buttons);

    return (
      <div className="mt-6 mb-6 w-full space-y-4 px-2">
        {blocks.map((block) => {
          switch (block?.data?.subType) {
            case "Link":
              return (
                <Link
                  title={block?.subtitle}
                  target="_blank"
                  href={block?.data?.url || "/"}
                  key={block._id}
                  style={styleFn(colors)}
                  className={baseClasses}
                >
                  {block?.title}
                </Link>
              );
            case "Email":
              return (
                <Link
                  title={block?.subtitle}
                  target="_blank"
                  href={`mailto:${block?.data?.email}`}
                  key={block._id}
                  style={styleFn(colors)}
                  className={baseClasses}
                >
                  {block?.title}
                </Link>
              );
            case "Call":
              return (
                <Link
                  title={block?.subtitle}
                  target="_blank"
                  href={`tel:${block?.data?.phone}`}
                  key={block._id}
                  style={styleFn(colors)}
                  className={baseClasses}
                >
                  {block?.title}
                </Link>
              );
            case "Location":
              return (
                <Link
                  title={block?.subtitle}
                  target="_blank"
                  href={`${block?.data?.address}`}
                  key={block._id}
                  style={styleFn(colors)}
                  className={baseClasses}
                >
                  {block?.title}
                </Link>
              );
            case "WhatsApp":
              return (
                <Link
                  title={block?.subtitle}
                  target="_blank"
                  href={`https://wa.me/${block?.data?.phone}`}
                  key={block._id}
                  style={styleFn(colors)}
                  className={baseClasses}
                >
                  {block?.title}
                </Link>
              );
            default:
              return null;
          }
        })}
      </div>
    );
  };
  const Type_1 = () => (
    <div
      style={{ backgroundColor: colors.bg }}
      className={`relative flex h-full w-full flex-col overflow-hidden`}
    >
      <div
        style={{
          backgroundImage: coverIsImage
            ? `url(${cover})`
            : `linear-gradient(to bottom, ${cover}, ${cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-34 w-full"
      ></div>

      <div className="relative -mt-16 flex flex-col items-center px-4">
        <div
          style={{
            borderColor: colors.accent,
            backgroundColor: colors.bg,
          }}
          className="relative h-32 w-32 overflow-hidden rounded-full"
        >
          <Image
            src={profile.avatar || "/hero/hero-avatar.png"}
            onError={(e) => {
              e.target.src = "/hero/hero-avatar.png";
            }}
            alt="Profile"
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        </div>
        {profile?.showName && (
          <div
            style={{
              color: colors.text,
            }}
            className="mt-3 flex max-w-full items-center gap-1 text-lg font-bold tracking-wide text-black uppercase"
          >
            <h2 className="line-clamp-2 text-center">
              {profile.displayName || "Your Name"}
            </h2>
            {profile.verifiedBadge && (
              <span className="flex size-5">{VerifiedIcon}</span>
            )}
          </div>
        )}
        {showBio && (
          <p
            style={{ color: `${colors.text}80` }}
            className={`line-clamp-3 max-w-full text-sm font-medium ${!profile?.showName ? "mt-2" : ""}`}
          >
            {profile?.bio}
          </p>
        )}
        <SocialMedia />

        <Button />
      </div>
    </div>
  );
  const Type_2 = () => (
    <div
      style={{ backgroundColor: colors.bg }}
      className={`scrollbar-hide relative h-full w-full flex-col overflow-hidden overflow-y-auto`}
    >
      <div
        style={{
          backgroundImage: coverIsImage
            ? `url(${cover})`
            : `linear-gradient(to bottom, ${cover}, ${cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-32 w-full"
      ></div>

      <div className="relative -mt-12 flex flex-col items-center px-4">
        <div
          style={{ backgroundColor: colors.bg }}
          className="relative h-24 w-24 overflow-hidden rounded-full"
        >
          <Image
            src={profile.avatar || "/hero/hero-avatar.png"}
            onError={(e) => {
              e.target.src = "/hero/hero-avatar.png";
            }}
            alt="Profile"
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        </div>
        {profile?.showName && (
          <div
            style={{ color: colors.text }}
            className="mt-3 flex max-w-full items-center gap-1 text-lg font-medium tracking-wide uppercase"
          >
            <h2 className="line-clamp-2 text-center">
              {profile.displayName || "Your Name"}
            </h2>
            {profile.verifiedBadge && (
              <span className="flex size-5">{VerifiedIcon}</span>
            )}
          </div>
        )}

        {showBio && (
          <p
            style={{ color: `${colors.text}80` }}
            className={`line-clamp-3 max-w-full text-sm font-medium ${!profile?.showName ? "mt-2" : ""}`}
          >
            {profile?.bio}
          </p>
        )}

        <SocialMedia />

        <Button />
      </div>
    </div>
  );

  const Type_3 = () => (
    <div
      style={{ backgroundColor: colors.bg }}
      className={`scrollbar-hide relative h-full w-full flex-col overflow-hidden overflow-y-auto`}
    >
      <div className="relative mt-10 flex flex-col items-center px-4">
        <div
          style={{ backgroundColor: colors.bg }}
          className="relative h-24 w-24 overflow-hidden rounded-full"
        >
          <Image
            src={profile.avatar || "/hero/hero-avatar.png"}
            onError={(e) => {
              e.target.src = "/hero/hero-avatar.png";
            }}
            alt="Profile"
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        </div>
        {profile?.showName && (
          <div
            style={{ color: colors.text }}
            className="mt-3 flex max-w-full items-center gap-1 text-xl font-medium tracking-wide uppercase"
          >
            <h2 className="line-clamp-2 text-center">
              {profile.displayName || "Your Name"}
            </h2>
            {profile.verifiedBadge && (
              <span className="flex size-5">{VerifiedIcon}</span>
            )}
          </div>
        )}

        {showBio && (
          <p
            style={{ color: `${colors.text}80` }}
            className={`line-clamp-3 max-w-full text-sm font-medium ${!profile?.showName ? "mt-2" : ""}`}
          >
            {profile?.bio}
          </p>
        )}

        <SocialMedia />

        <Button />
      </div>
    </div>
  );

  const Type_4 = () => (
    <div
      style={{ backgroundColor: colors.bg }}
      className={`scrollbar-hide relative h-full w-full flex-col overflow-hidden overflow-y-auto`}
    >
      <div className="relative h-60 w-full bg-linear-to-b to-[#ffffff]">
        <Image
          src={coverIsImage ? cover : "/hero/hero-avatar.png"}
          alt="Profile"
          fill
          className="object-cover"
        />
        <div
          style={{
            background: `linear-gradient(to bottom, transparent, ${colors.bg})`,
          }}
          className="absolute bottom-0 h-28 w-full"
        ></div>
      </div>

      <div className="relative -mt-32 flex flex-col items-center px-4">
        <div
          style={{ backgroundColor: colors.bg }}
          className="relative h-24 w-24 overflow-hidden rounded-full"
        >
          <Image
            src={profile.avatar || "/hero/hero-avatar.png"}
            onError={(e) => {
              e.target.src = "/hero/hero-avatar.png";
            }}
            alt="Profile"
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        </div>
        {profile?.showName && (
          <div
            style={{ color: colors.text }}
            className="mt-1 flex max-w-full items-center gap-1 text-xl font-bold tracking-wide uppercase"
          >
            <h2 className="line-clamp-2 text-center">
              {profile.displayName || "Your Name"}
            </h2>
            {profile.verifiedBadge && (
              <span className="flex size-5">{VerifiedIcon}</span>
            )}
          </div>
        )}
        {showBio && (
          <p
            style={{ color: `${colors.text}80` }}
            className={`line-clamp-3 max-w-full text-sm font-medium ${!profile?.showName ? "mt-2" : ""}`}
          >
            {profile?.bio}
          </p>
        )}

        <SocialMedia />
        <Button />
      </div>
    </div>
  );

  const Type_5 = () => (
    <div
      style={{ backgroundColor: colors.bg }}
      className={`relative h-full min-h-full w-full flex-col`}
    >
      <div
        style={{
          background: `${coverIsImage ? "" : cover}`,
        }}
        className="relative h-50 w-full bg-linear-to-b"
      >
        {coverIsImage && (
          <Image
            src={coverIsImage ? cover : "/"}
            alt="Profile"
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="relative -mt-14 flex flex-col items-center px-4">
        <div
          style={{ backgroundColor: colors.bg }}
          className="relative h-24 w-24 overflow-hidden rounded-full"
        >
          <Image
            src={profile.avatar || "/hero/hero-avatar.png"}
            onError={(e) => {
              e.target.src = "/hero/hero-avatar.png";
            }}
            alt="Profile"
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        </div>
        {profile?.showName && (
          <div
            style={{ color: colors.text }}
            className="mt-1 flex max-w-full items-center gap-1 text-xl font-bold tracking-wide uppercase"
          >
            <h2 className="line-clamp-2 text-center">
              {profile.displayName || "Your Name"}
            </h2>
            {profile.verifiedBadge && (
              <span className="flex size-5">{VerifiedIcon}</span>
            )}
          </div>
        )}
        {showBio && (
          <p
            style={{ color: `${colors.text}80` }}
            className={`line-clamp-3 max-w-full text-sm font-medium ${!profile?.showName ? "mt-2" : ""}`}
          >
            {profile?.bio}
          </p>
        )}

        <SocialMedia />

        <Button />
      </div>
    </div>
  );
  const Type_6 = () => (
    <div
      style={{ backgroundColor: colors.bg }}
      className={`scrollbar-hide relative h-full w-full flex-col overflow-hidden overflow-y-auto`}
    >
      <div className="relative h-16 w-full bg-linear-to-b"></div>

      <div className="relative flex flex-col items-center px-4">
        <div
          style={{ backgroundColor: colors.bg }}
          className="relative h-18 w-18 overflow-hidden rounded-full"
        >
          <Image
            src={profile.avatar || "/hero/hero-avatar.png"}
            onError={(e) => {
              e.target.src = "/hero/hero-avatar.png";
            }}
            alt="Profile"
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        </div>
        {profile?.showName && (
          <div
            style={{ color: colors.text }}
            className="mt-1 flex max-w-full items-center gap-1 text-xl font-bold tracking-wide uppercase"
          >
            <h2 className="line-clamp-2 text-center">
              {profile.displayName || "Your Name"}
            </h2>
            {profile.verifiedBadge && (
              <span className="flex size-5">{VerifiedIcon}</span>
            )}
          </div>
        )}
        {showBio && (
          <p
            style={{ color: `${colors.text}80` }}
            className={`line-clamp-3 max-w-full text-sm font-medium ${!profile?.showName ? "mt-2" : ""}`}
          >
            {profile?.bio}
          </p>
        )}
        <SocialMedia />
        {desktop ? (
          <div className="scrollbar-hide inline-flex gap-1 overflow-x-auto pt-4">
            <Image
              src={profile.avatar || "/hero/hero-avatar.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar.png";
              }}
              alt="Profile"
              width={100}
              height={100}
              //   className="absolute -left-[22%] left-0 h-[90px] h-[180px] w-[90px] w-[220px] rounded-[8px] object-cover"
            />
            <Image
              src={profile.avatar || "/hero/hero-avatar.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar.png";
              }}
              alt="Profile"
              width={100}
              height={100}
              //   className="h-[90px] h-[180px] w-[90px] w-[220px] rounded-[8px] object-cover"
            />
            <Image
              src={profile.avatar || "/hero/hero-avatar.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar.png";
              }}
              alt="Profile"
              width={100}
              height={100}
              //   className="absolute -right-[22%] right-0 h-[90px] h-[180px] w-[90px] w-[220px] rounded-[8px] object-cover"
            />
          </div>
        ) : (
          <div className="scrollbar-hide inline-flex gap-1 overflow-x-auto pt-4">
            <Image
              src={profile.avatar || "/hero/hero-avatar.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar.png";
              }}
              alt="Profile"
              width={100}
              height={100}
              //   className="absolute -left-[16%] -left-[22%] h-[90px] h-[128px] w-[90px] w-[128px] rounded-[8px] object-cover"
            />
            <Image
              src={profile.avatar || "/hero/hero-avatar.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar.png";
              }}
              alt="Profile"
              width={100}
              height={100}
              //   className="h-[90px] h-[128px] w-[90px] w-[128px] rounded-[8px] object-cover"
            />
            <Image
              src={profile.avatar || "/hero/hero-avatar.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar.png";
              }}
              alt="Profile"
              width={100}
              height={100}
              //   className="absolute -right-[16%] -right-[22%] h-[90px] h-[128px] w-[90px] w-[128px] rounded-[8px] object-cover"
            />
          </div>
        )}

        <Button />
      </div>
    </div>
  );
  const rtlLanguages = ["ar", "fa", "ur", "he", "ps", "sd", "ckb", "ks"];
  return (
    <div
      lang={profile?.language}
      dir={rtlLanguages.includes(profile?.language) ? "rtl" : "ltr"}
      style={{ backgroundColor: profile?.backgroundColor }}
      className="hidden h-screen max-h-screen items-center justify-center sm:flex"
    >
      <div
        style={{ backgroundColor: colors.bg }}
        className={`scrollbar-hide relative mx-auto h-fit max-h-[600px] w-full max-w-[600px] overflow-y-auto rounded-xl ${font}`}
      >
        {type == 2 ? (
          <Type_2 />
        ) : type == 3 ? (
          <Type_3 />
        ) : type == 4 ? (
          <Type_4 />
        ) : type == 5 ? (
          <Type_5 />
        ) : type == 6 ? (
          <Type_6 />
        ) : (
          <Type_1 />
        )}
      </div>
    </div>
  );
};

export default Desktop;
