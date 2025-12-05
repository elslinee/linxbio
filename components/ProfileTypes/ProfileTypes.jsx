import React from "react";
import Image from "next/image";
import { VerifiedIcon } from "@/components/VerifiedIcon";
import SocialMedia from "./SocialMedia";
import Button from "./Button";
import { useIsMobile } from "@/hooks/useIsMobile";

const ProfileTypes = ({
  type = 1,
  profile,
  colors,
  cover,
  coverIsImage,
  showBio,
  socials,
  socialsOrder,
  buttons,
  blocks,
  baseClasses,
  enableTracking = false,
  onTrackClick,
  isPreview = false,
  desktop = false,
}) => {
  const isMobile = useIsMobile();

  const typeNumber = typeof type === "string" ? parseInt(type, 10) : type;

  const Type_1 = () => (
    <div
      style={{ backgroundColor: colors.bg }}
      className={`relative flex h-full w-full flex-col overflow-hidden ${isPreview && desktop ? "rounded-xl" : isPreview ? "rounded-[2.5rem]" : ""}`}
    >
      <div
        style={{
          backgroundImage: coverIsImage
            ? `url(${cover})`
            : `linear-gradient(to bottom, ${cover}, ${cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={isPreview ? "h-26 w-full md:h-30" : "h-34 w-full"}
      ></div>

      <div
        className={
          isPreview
            ? "relative -mt-16 flex flex-col items-center px-4 md:-mt-12"
            : "relative -mt-16 flex flex-col items-center px-4"
        }
      >
        <div
          style={{
            borderColor: colors.accent,
            backgroundColor: colors.bg,
          }}
          className={
            isPreview
              ? "relative h-24 w-24 overflow-hidden rounded-full md:h-32 md:w-32"
              : "relative h-32 w-32 overflow-hidden rounded-full"
          }
        >
          <Image
            src={profile.avatar || "/hero/hero-avatar2.png"}
            onError={(e) => {
              e.target.src = "/hero/hero-avatar2.png";
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
            className={
              isPreview
                ? "mt-2 flex max-w-full items-center gap-1 text-base font-bold tracking-wide text-black md:mt-3 md:text-lg"
                : "mt-3 flex max-w-full items-center gap-1 text-lg font-bold tracking-wide text-black"
            }
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
            className={
              isPreview
                ? `line-clamp-3 max-w-full text-[10px] font-medium md:text-xs ${!profile?.showName ? "mt-2" : ""}`
                : `line-clamp-3 max-w-full text-sm font-medium ${!profile?.showName ? "mt-2" : ""}`
            }
          >
            {profile?.bio}
          </p>
        )}
        <SocialMedia
          socials={socials}
          socialsOrder={socialsOrder}
          colors={colors}
          enableTracking={enableTracking}
          onTrackClick={onTrackClick}
          isPreview={isPreview}
          className={
            isPreview
              ? "mt-3 flex flex-wrap justify-center gap-2.5 md:mt-4 md:gap-3"
              : "mt-4 flex flex-wrap justify-center gap-3"
          }
        />
        <Button
          buttons={buttons}
          blocks={blocks}
          colors={colors}
          baseClasses={baseClasses}
          enableTracking={enableTracking}
          onTrackClick={onTrackClick}
          isPreview={isPreview}
        />
      </div>
    </div>
  );

  const Type_2 = () => (
    <div
      style={{ backgroundColor: colors.bg }}
      className={`scrollbar-hide relative h-full w-full flex-col overflow-hidden overflow-y-auto ${isPreview && desktop ? "rounded-xl" : isPreview ? "rounded-[2.5rem]" : ""}`}
    >
      <div
        style={{
          backgroundImage: coverIsImage
            ? `url(${cover})`
            : `linear-gradient(to bottom, ${cover}, ${cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={isPreview ? "h-24 w-full md:h-32" : "h-32 w-full"}
      ></div>

      <div
        className={
          isPreview
            ? "relative -mt-10 flex flex-col items-center px-4 md:-mt-12"
            : "relative -mt-12 flex flex-col items-center px-4"
        }
      >
        <div
          style={{ backgroundColor: colors.bg }}
          className={
            isPreview
              ? "relative h-16 w-16 overflow-hidden rounded-full md:h-24 md:w-24"
              : "relative h-24 w-24 overflow-hidden rounded-full"
          }
        >
          <Image
            src={profile.avatar || "/hero/hero-avatar2.png"}
            onError={(e) => {
              e.target.src = "/hero/hero-avatar2.png";
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
            className={
              isPreview
                ? "mt-1 flex max-w-full items-center gap-1 text-base font-medium tracking-wide md:mt-3 md:text-lg"
                : "mt-3 flex max-w-full items-center gap-1 text-lg font-medium tracking-wide uppercase"
            }
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
            className={
              isPreview
                ? `line-clamp-3 max-w-full text-[10px] font-medium md:text-xs ${!profile?.showName ? "mt-2" : ""}`
                : `line-clamp-3 max-w-full text-sm font-medium ${!profile?.showName ? "mt-2" : ""}`
            }
          >
            {profile?.bio}
          </p>
        )}

        <SocialMedia
          socials={socials}
          socialsOrder={socialsOrder}
          colors={colors}
          enableTracking={enableTracking}
          onTrackClick={onTrackClick}
          isPreview={isPreview}
          className={
            isPreview
              ? "mt-3 flex flex-wrap justify-center gap-2.5 md:mt-4 md:gap-3"
              : "mt-4 flex flex-wrap justify-center gap-3"
          }
        />

        <Button
          buttons={buttons}
          blocks={blocks}
          colors={colors}
          baseClasses={baseClasses}
          enableTracking={enableTracking}
          onTrackClick={onTrackClick}
          isPreview={isPreview}
        />
      </div>
    </div>
  );

  const Type_3 = () => (
    <div
      style={{ backgroundColor: colors.bg }}
      className={`scrollbar-hide relative h-full w-full flex-col overflow-hidden overflow-y-auto ${isPreview && desktop ? "rounded-xl" : isPreview ? "rounded-[2.5rem]" : ""}`}
    >
      <div
        className={
          isPreview
            ? "relative mt-8 flex flex-col items-center px-4 md:mt-10"
            : "relative mt-10 flex flex-col items-center px-4"
        }
      >
        <div
          style={{ backgroundColor: colors.bg }}
          className={
            isPreview
              ? "relative h-18 w-18 overflow-hidden rounded-full md:h-24 md:w-24"
              : "relative h-24 w-24 overflow-hidden rounded-full"
          }
        >
          <Image
            src={profile.avatar || "/hero/hero-avatar2.png"}
            onError={(e) => {
              e.target.src = "/hero/hero-avatar2.png";
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
            className={
              isPreview
                ? "mt-3 flex max-w-full items-center gap-1 text-lg font-medium tracking-wide md:text-xl"
                : "mt-3 flex max-w-full items-center gap-1 text-xl font-medium tracking-wide uppercase"
            }
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
            className={
              isPreview
                ? `line-clamp-3 max-w-full text-[10px] font-medium md:text-xs ${!profile?.showName ? "mt-2" : ""}`
                : `line-clamp-3 max-w-full text-sm font-medium ${!profile?.showName ? "mt-2" : ""}`
            }
          >
            {profile?.bio}
          </p>
        )}

        <SocialMedia
          socials={socials}
          socialsOrder={socialsOrder}
          colors={colors}
          enableTracking={enableTracking}
          onTrackClick={onTrackClick}
          isPreview={isPreview}
          className={
            isPreview
              ? "mt-3 flex flex-wrap justify-center gap-2.5 md:mt-4 md:gap-3"
              : "mt-4 flex flex-wrap justify-center gap-3"
          }
        />

        <Button
          buttons={buttons}
          blocks={blocks}
          colors={colors}
          baseClasses={baseClasses}
          enableTracking={enableTracking}
          onTrackClick={onTrackClick}
          isPreview={isPreview}
        />
      </div>
    </div>
  );

  const Type_4 = () => (
    <div
      style={{ backgroundColor: colors.bg }}
      className={`scrollbar-hide relative h-full w-full flex-col overflow-hidden overflow-y-auto ${isPreview && desktop ? "rounded-xl" : isPreview ? "rounded-[2.5rem]" : ""}`}
    >
      <div
        className={
          isPreview
            ? "relative h-40 w-full bg-linear-to-b to-[#ffffff] md:h-60"
            : "relative h-60 w-full bg-linear-to-b to-[#ffffff]"
        }
      >
        <Image
          src={coverIsImage ? cover : "/hero/hero-avatar2.png"}
          alt="Profile"
          fill
          className="object-cover"
        />
        <div
          style={{
            background: `linear-gradient(to bottom, transparent, ${colors.bg})`,
          }}
          className={
            isPreview
              ? "absolute bottom-0 h-25 w-full md:h-28"
              : "absolute -bottom-px h-28 w-full"
          }
        ></div>
      </div>

      <div
        className={
          isPreview
            ? "relative -mt-26 flex flex-col items-center px-4 md:-mt-32"
            : "relative -mt-32 flex flex-col items-center px-4"
        }
      >
        <div
          style={{ backgroundColor: colors.bg }}
          className={
            isPreview
              ? "relative h-18 w-18 overflow-hidden rounded-full md:h-24 md:w-24"
              : "relative h-24 w-24 overflow-hidden rounded-full"
          }
        >
          <Image
            src={profile.avatar || "/hero/hero-avatar2.png"}
            onError={(e) => {
              e.target.src = "/hero/hero-avatar2.png";
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
            className={
              isPreview
                ? "mt-1 flex max-w-full items-center gap-1 text-lg font-bold tracking-wide md:text-xl"
                : "mt-1 flex max-w-full items-center gap-1 text-xl font-bold tracking-wide uppercase"
            }
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
            className={
              isPreview
                ? `line-clamp-3 max-w-full text-[10px] font-medium md:text-xs ${!profile?.showName ? "mt-2" : ""}`
                : `line-clamp-3 max-w-full text-sm font-medium ${!profile?.showName ? "mt-2" : ""}`
            }
          >
            {profile?.bio}
          </p>
        )}

        <SocialMedia
          socials={socials}
          socialsOrder={socialsOrder}
          colors={colors}
          enableTracking={enableTracking}
          onTrackClick={onTrackClick}
          isPreview={isPreview}
          className={
            isPreview
              ? "mt-3 flex flex-wrap justify-center gap-2.5 md:mt-4 md:gap-3"
              : "mt-4 flex flex-wrap justify-center gap-3"
          }
        />
        <Button
          buttons={buttons}
          blocks={blocks}
          colors={colors}
          baseClasses={baseClasses}
          enableTracking={enableTracking}
          onTrackClick={onTrackClick}
          isPreview={isPreview}
        />
      </div>
    </div>
  );

  const Type_5 = () => (
    <div
      style={{ backgroundColor: colors.bg }}
      className={`scrollbar-hide relative h-full w-full flex-col overflow-hidden overflow-y-auto ${isPreview && desktop ? "rounded-xl" : isPreview ? "rounded-[2.5rem]" : ""}`}
    >
      <div
        style={{
          background: `${coverIsImage ? "" : cover}`,
        }}
        className={
          isPreview
            ? "relative h-32 w-full bg-linear-to-b md:h-50"
            : "relative h-50 w-full bg-linear-to-b"
        }
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

      <div
        className={
          isPreview
            ? "relative -mt-10 flex flex-col items-center px-4 md:-mt-14"
            : "relative -mt-14 flex flex-col items-center px-4"
        }
      >
        <div
          style={{ backgroundColor: colors.bg }}
          className={
            isPreview
              ? "relative h-18 w-18 overflow-hidden rounded-full md:h-24 md:w-24"
              : "relative h-24 w-24 overflow-hidden rounded-full"
          }
        >
          <Image
            src={profile.avatar || "/hero/hero-avatar2.png"}
            onError={(e) => {
              e.target.src = "/hero/hero-avatar2.png";
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
            className={
              isPreview
                ? "mt-1 flex max-w-full items-center gap-1 text-lg font-bold tracking-wide md:text-xl"
                : "mt-1 flex max-w-full items-center gap-1 text-xl font-bold tracking-wide uppercase"
            }
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
            className={
              isPreview
                ? `line-clamp-3 max-w-full text-[10px] font-medium md:text-xs ${!profile?.showName ? "mt-2" : ""}`
                : `line-clamp-3 max-w-full text-sm font-medium ${!profile?.showName ? "mt-2" : ""}`
            }
          >
            {profile?.bio}
          </p>
        )}

        <SocialMedia
          socials={socials}
          socialsOrder={socialsOrder}
          colors={colors}
          enableTracking={enableTracking}
          onTrackClick={onTrackClick}
          isPreview={isPreview}
          className={
            isPreview
              ? "mt-3 flex flex-wrap justify-center gap-2.5 md:mt-4 md:gap-3"
              : "mt-4 flex flex-wrap justify-center gap-3"
          }
        />

        <Button
          buttons={buttons}
          blocks={blocks}
          colors={colors}
          baseClasses={baseClasses}
          enableTracking={enableTracking}
          onTrackClick={onTrackClick}
          isPreview={isPreview}
        />
      </div>
    </div>
  );

  const Type_6 = () => (
    <div
      style={{ backgroundColor: colors.bg }}
      className={`scrollbar-hide relative h-full w-full flex-col overflow-hidden overflow-y-auto ${isPreview && desktop ? "rounded-xl" : isPreview ? "rounded-[2.5rem]" : ""}`}
    >
      <div
        className={
          isPreview
            ? "relative h-5 w-full bg-linear-to-b md:h-16"
            : "relative h-16 w-full bg-linear-to-b"
        }
      ></div>

      <div className="relative flex flex-col items-center px-4">
        <div
          style={{ backgroundColor: colors.bg }}
          className="relative h-18 w-18 overflow-hidden rounded-full"
        >
          <Image
            src={profile.avatar || "/hero/hero-avatar2.png"}
            onError={(e) => {
              e.target.src = "/hero/hero-avatar2.png";
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
            className={
              isPreview
                ? "mt-1 flex max-w-full items-center gap-1 font-bold tracking-wide md:text-xl"
                : "mt-1 flex max-w-full items-center gap-1 text-xl font-bold tracking-wide uppercase"
            }
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
            className={
              isPreview
                ? `line-clamp-3 max-w-full text-[10px] font-medium md:text-xs ${!profile?.showName ? "mt-2" : ""}`
                : `line-clamp-3 max-w-full text-sm font-medium ${!profile?.showName ? "mt-2" : ""}`
            }
          >
            {profile?.bio}
          </p>
        )}
        <SocialMedia
          socials={socials}
          socialsOrder={socialsOrder}
          colors={colors}
          enableTracking={enableTracking}
          onTrackClick={onTrackClick}
          isPreview={isPreview}
          className={
            isPreview
              ? "mt-3 flex flex-wrap justify-center gap-2.5 md:mt-4 md:gap-3"
              : "mt-4 flex flex-wrap justify-center gap-3"
          }
        />
        {!isMobile && !isPreview ? (
          <div className="scrollbar-hide inline-flex gap-1 overflow-x-auto pt-4">
            <Image
              src={profile.avatar || "/hero/hero-avatar2.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar2.png";
              }}
              alt="Profile"
              width={100}
              height={100}
            />
            <Image
              src={profile.avatar || "/hero/hero-avatar2.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar2.png";
              }}
              alt="Profile"
              width={100}
              height={100}
            />
            <Image
              src={profile.avatar || "/hero/hero-avatar2.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar2.png";
              }}
              alt="Profile"
              width={100}
              height={100}
            />
          </div>
        ) : isPreview && desktop ? (
          <div className="scrollbar-hide inline-flex gap-1 overflow-x-auto pt-2 md:pt-4">
            <Image
              src={profile.avatar || "/hero/hero-avatar2.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar2.png";
              }}
              alt="Profile"
              width={100}
              height={100}
              className="absolute left-0 h-[90px] w-[90px] rounded-[8px] object-cover md:-left-[22%] md:h-[180px] md:w-[220px]"
            />
            <Image
              src={profile.avatar || "/hero/hero-avatar2.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar2.png";
              }}
              alt="Profile"
              width={100}
              height={100}
              className="h-[90px] w-[90px] rounded-[8px] object-cover md:h-[180px] md:w-[220px]"
            />
            <Image
              src={profile.avatar || "/hero/hero-avatar2.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar2.png";
              }}
              alt="Profile"
              width={100}
              height={100}
              className="absolute right-0 h-[90px] w-[90px] rounded-[8px] object-cover md:-right-[22%] md:h-[180px] md:w-[220px]"
            />
          </div>
        ) : isPreview ? (
          <div className="scrollbar-hide inline-flex gap-1 overflow-x-auto pt-2 md:pt-4">
            <Image
              src={profile.avatar || "/hero/hero-avatar2.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar2.png";
              }}
              alt="Profile"
              width={100}
              height={100}
              className="absolute -left-[16%] h-[90px] w-[90px] rounded-[8px] object-cover md:-left-[22%] md:h-[128px] md:w-[128px]"
            />
            <Image
              src={profile.avatar || "/hero/hero-avatar2.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar2.png";
              }}
              alt="Profile"
              width={100}
              height={100}
              className="h-[90px] w-[90px] rounded-[8px] object-cover md:h-[128px] md:w-[128px]"
            />
            <Image
              src={profile.avatar || "/hero/hero-avatar2.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar2.png";
              }}
              alt="Profile"
              width={100}
              height={100}
              className="absolute -right-[16%] h-[90px] w-[90px] rounded-[8px] object-cover md:-right-[22%] md:h-[128px] md:w-[128px]"
            />
          </div>
        ) : (
          <div className="scrollbar-hide inline-flex gap-1 overflow-x-auto pt-4">
            <Image
              src={profile.avatar || "/hero/hero-avatar2.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar2.png";
              }}
              alt="Profile"
              width={100}
              height={100}
            />
            <Image
              src={profile.avatar || "/hero/hero-avatar2.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar2.png";
              }}
              alt="Profile"
              width={100}
              height={100}
            />
            <Image
              src={profile.avatar || "/hero/hero-avatar2.png"}
              onError={(e) => {
                e.target.src = "/hero/hero-avatar2.png";
              }}
              alt="Profile"
              width={100}
              height={100}
            />
          </div>
        )}

        <Button
          buttons={buttons}
          blocks={blocks}
          colors={colors}
          baseClasses={baseClasses}
          enableTracking={enableTracking}
          onTrackClick={onTrackClick}
          isPreview={isPreview}
        />
      </div>
    </div>
  );

  const renderType = () => {
    switch (typeNumber) {
      case 2:
        return <Type_2 />;
      case 3:
        return <Type_3 />;
      case 4:
        return <Type_4 />;
      case 5:
        return <Type_5 />;
      case 6:
        return <Type_6 />;
      default:
        return <Type_1 />;
    }
  };

  return renderType();
};

export default ProfileTypes;
