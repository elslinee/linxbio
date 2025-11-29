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
const PhonePreviewDashboard = ({
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
    "w-full flex justify-center items-center    rounded-full border-2 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-bold transition-transform hover:translate-x-[2px] hover:translate-y-[2px]";
  const showBio = profile?.showBio;

  const Button = () => {
    if (!buttons) return null;

    const getStyles = (style) => {
      switch (style) {
        case "btns_style_1":
          return (colors) => ({
            color: colors.accent,
            backgroundColor: colors.bg,
            borderColor: colors.accent,
            boxShadow: `4px 4px 0px 0px ${colors.accent}`,
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
      <div className="mt-3 mb-6 w-full space-y-2.5 sm:space-y-3 md:mt-6 md:space-y-4">
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
      className={`relative flex h-full w-full flex-col overflow-hidden ${desktop ? "rounded-xl" : "rounded-[2.5rem]"}`}
    >
      <div
        style={{
          backgroundImage: coverIsImage
            ? `url(${cover})`
            : `linear-gradient(to bottom, ${cover}, ${cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-26 w-full md:h-30"
      ></div>

      <div className="relative -mt-16 flex flex-col items-center px-4 md:-mt-12">
        <div
          style={{
            borderColor: colors.accent,
            backgroundColor: colors.bg,
          }}
          className="relative h-24 w-24 overflow-hidden rounded-full md:h-32 md:w-32"
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
            className="mt-2  max-w-full flex items-center gap-1  text-base font-bold tracking-wide text-black uppercase md:mt-3 md:text-lg"
          >
            <h2 className="text-center line-clamp-2">
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
            className={`line-clamp-3 max-w-full text-[10px] font-medium md:text-xs ${!profile?.showName ? "mt-2" : ""}`}
          >
            {profile?.bio}
          </p>
        )}

        <div
          style={{
            color: colors.text,
          }}
          className="mt-3 flex flex-wrap justify-center gap-2.5 md:mt-4 md:gap-3"
        >
          {socialsOrder.map((key) => {
            const iconObj = socialIcons.find((s) => s.key === key);
            if (socials[key]) {
              return (
                <FontAwesomeIcon
                  key={key}
                  icon={iconObj.icon}
                  className="h-5 w-5 cursor-pointer hover:opacity-70"
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
      className={`scrollbar-hide relative h-full w-full flex-col overflow-hidden overflow-y-auto ${desktop ? "rounded-xl" : "rounded-[2.5rem]"}`}
    >
      <div
        style={{
          backgroundImage: coverIsImage
            ? `url(${cover})`
            : `linear-gradient(to bottom, ${cover}, ${cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-24 w-full md:h-32"
      ></div>

      <div className="relative -mt-10 flex flex-col items-center px-4 md:-mt-12">
        <div
          style={{ backgroundColor: colors.bg }}
          className="relative h-16 w-16 overflow-hidden rounded-full md:h-24 md:w-24"
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
            className="mt-1  max-w-full flex items-center gap-1  text-base font-medium tracking-wide uppercase md:mt-3 md:text-lg"
          >
            <h2 className="text-center line-clamp-2">
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
            className={`line-clamp-3 max-w-full text-[10px] font-medium md:text-xs ${!profile?.showName ? "mt-2" : ""}`}
          >
            {profile?.bio}
          </p>
        )}

        <div
          style={{
            color: colors.text,
          }}
          className="mt-3 flex flex-wrap justify-center gap-2.5 md:mt-4 md:gap-3"
        >
          {socialsOrder.map((key) => {
            const iconObj = socialIcons.find((s) => s.key === key);
            if (socials[key]) {
              return (
                <FontAwesomeIcon
                  key={key}
                  icon={iconObj.icon}
                  className={`h-5 w-5 cursor-pointer hover:opacity-70`}
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
      className={`scrollbar-hide relative h-full w-full flex-col overflow-hidden overflow-y-auto ${desktop ? "rounded-xl" : "rounded-[2.5rem]"}`}
    >
      <div className="relative mt-8 flex flex-col items-center px-4 md:mt-10">
        <div
          style={{ backgroundColor: colors.bg }}
          className="relative h-18 w-18 overflow-hidden rounded-full md:h-24 md:w-24"
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
            className="mt-3  max-w-full flex items-center gap-1  text-lg font-medium tracking-wide uppercase md:text-xl"
          >
            <h2 className="text-center line-clamp-2">
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
            className={`line-clamp-3 max-w-full text-[10px] font-medium md:text-xs ${!profile?.showName ? "mt-2" : ""}`}
          >
            {profile?.bio}
          </p>
        )}

        <div
          style={{
            color: colors.text,
          }}
          className="mt-3 flex flex-wrap justify-center gap-2.5 md:mt-4 md:gap-3"
        >
          {socialsOrder.map((key) => {
            const iconObj = socialIcons.find((s) => s.key === key);
            if (socials[key]) {
              return (
                <FontAwesomeIcon
                  key={key}
                  icon={iconObj.icon}
                  className={`h-5 w-5 cursor-pointer hover:opacity-70`}
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
      className={`scrollbar-hide relative h-full w-full flex-col overflow-hidden overflow-y-auto ${desktop ? "rounded-xl" : "rounded-[2.5rem]"}`}
    >
      <div className="relative h-40 w-full bg-linear-to-b to-[#ffffff] md:h-60">
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
          className="absolute bottom-0 h-25 w-full md:h-28"
        ></div>
      </div>

      <div className="relative -mt-26 flex flex-col items-center px-4 md:-mt-32">
        <div
          style={{ backgroundColor: colors.bg }}
          className="relative h-18 w-18 overflow-hidden rounded-full md:h-24 md:w-24"
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
            className="mt-1  max-w-full flex items-center gap-1  text-lg font-bold tracking-wide uppercase md:text-xl"
          >
            <h2 className="text-center line-clamp-2">
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
            className={`line-clamp-3 max-w-full text-[10px] font-medium md:text-xs ${!profile?.showName ? "mt-2" : ""}`}
          >
            {profile?.bio}
          </p>
        )}

        <div
          style={{
            color: colors.text,
          }}
          className="mt-3 flex flex-wrap justify-center gap-2.5 md:mt-4 md:gap-3"
        >
          {socialsOrder.map((key) => {
            const iconObj = socialIcons.find((s) => s.key === key);
            if (socials[key]) {
              return (
                <FontAwesomeIcon
                  key={key}
                  icon={iconObj.icon}
                  className={`h-5 w-5 cursor-pointer hover:opacity-70`}
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
      className={`scrollbar-hide relative h-full w-full flex-col overflow-hidden overflow-y-auto ${desktop ? "rounded-xl" : "rounded-[2.5rem]"}`}
    >
      <div
        style={{
          background: `${coverIsImage ? "" : cover}`,
        }}
        className="relative h-32 w-full bg-linear-to-b md:h-50"
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

      <div className="relative -mt-10 flex flex-col items-center px-4 md:-mt-14">
        <div
          style={{ backgroundColor: colors.bg }}
          className="relative h-18 w-18 overflow-hidden rounded-full md:h-24 md:w-24"
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
            className="mt-1 max-w-full  flex items-center gap-1  text-lg font-bold tracking-wide uppercase md:text-xl"
          >
            <h2 className="text-center  line-clamp-2">
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
            className={`line-clamp-3 max-w-full text-[10px] font-medium md:text-xs ${!profile?.showName ? "mt-2" : ""}`}
          >
            {profile?.bio}
          </p>
        )}

        <div
          style={{
            color: colors.text,
          }}
          className="mt-3 flex flex-wrap justify-center gap-2.5 md:mt-4 md:gap-3"
        >
          {socialsOrder.map((key) => {
            const iconObj = socialIcons.find((s) => s.key === key);
            if (socials[key]) {
              return (
                <FontAwesomeIcon
                  key={key}
                  icon={iconObj.icon}
                  className={`h-5 w-5 cursor-pointer hover:opacity-70`}
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
      className={`scrollbar-hide relative h-full w-full flex-col overflow-hidden overflow-y-auto ${desktop ? "rounded-xl" : "rounded-[2.5rem]"}`}
    >
      <div className="relative h-5 w-full bg-linear-to-b md:h-16"></div>

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
            className="mt-1  max-w-full flex items-center gap-1  font-bold tracking-wide uppercase md:text-xl"
          >
            <h2 className="text-center line-clamp-2   ">
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
            className={`line-clamp-3 max-w-full text-[10px] font-medium md:text-xs ${!profile?.showName ? "mt-2" : ""}`}
          >
            {profile?.bio}
          </p>
        )}
        <div
          style={{
            color: colors.text,
          }}
          className="mt-3 flex flex-wrap justify-center gap-2.5 md:mt-4 md:gap-3"
        >
          {socialsOrder.map((key) => {
            const iconObj = socialIcons.find((s) => s.key === key);
            if (socials[key]) {
              return (
                <FontAwesomeIcon
                  key={key}
                  icon={iconObj.icon}
                  className={`h-5 w-5 cursor-pointer hover:opacity-70`}
                />
              );
            }
            return null;
          })}
        </div>
        {desktop ? (
          <div className="scrollbar-hide inline-flex gap-1 overflow-x-auto pt-2 md:pt-4">
            <Image
              src={profile.avatar || "/hero/hero-avatar.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar.png";
              }}
              alt="Profile"
              width={100}
              height={100}
              className="absolute left-0 h-[90px] w-[90px] rounded-[8px] object-cover md:-left-[22%] md:h-[180px] md:w-[220px]"
            />
            <Image
              src={profile.avatar || "/hero/hero-avatar.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar.png";
              }}
              alt="Profile"
              width={100}
              height={100}
              className="h-[90px] w-[90px] rounded-[8px] object-cover md:h-[180px] md:w-[220px]"
            />
            <Image
              src={profile.avatar || "/hero/hero-avatar.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar.png";
              }}
              alt="Profile"
              width={100}
              height={100}
              className="absolute right-0 h-[90px] w-[90px] rounded-[8px] object-cover md:-right-[22%] md:h-[180px] md:w-[220px]"
            />
          </div>
        ) : (
          <div className="scrollbar-hide inline-flex gap-1 overflow-x-auto pt-2 md:pt-4">
            <Image
              src={profile.avatar || "/hero/hero-avatar.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar.png";
              }}
              alt="Profile"
              width={100}
              height={100}
              className="absolute -left-[16%] h-[90px] w-[90px] rounded-[8px] object-cover md:-left-[22%] md:h-[128px] md:w-[128px]"
            />
            <Image
              src={profile.avatar || "/hero/hero-avatar.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar.png";
              }}
              alt="Profile"
              width={100}
              height={100}
              className="h-[90px] w-[90px] rounded-[8px] object-cover md:h-[128px] md:w-[128px]"
            />
            <Image
              src={profile.avatar || "/hero/hero-avatar.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar.png";
              }}
              alt="Profile"
              width={100}
              height={100}
              className="absolute -right-[16%] h-[90px] w-[90px] rounded-[8px] object-cover md:-right-[22%] md:h-[128px] md:w-[128px]"
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
      style={{ backgroundColor: desktop ? profile?.backgroundColor : "" }}
      className={
        desktop
          ? "flex h-[500px] w-[1200px] max-w-[1200px] items-center justify-center overflow-hidden md:h-[700px]"
          : ""
      }
    >
      <div
        className={`relative ${font} ${!desktop ? "h-[500px] w-[260px] overflow-hidden rounded-[3rem] border-2 border-gray-800 bg-gray-900 p-[6px] md:h-[660px] md:w-[300px] md:border-4 md:shadow-2xl" : "h-[350px] w-[300px] md:h-[660px] md:w-[500px] "}`}
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

export default PhonePreviewDashboard;
