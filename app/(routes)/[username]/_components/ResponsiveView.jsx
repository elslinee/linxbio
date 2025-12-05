import React from "react";
import useTrackClick from "@/hooks/useTrackClick";
import ProfileTypes from "@/components/ProfileTypes/ProfileTypes";

const ResponsiveView = ({
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
  const track = useTrackClick();
  const username = profile?.username;

  const coverIsImage =
    cover.startsWith("http") ||
    cover.startsWith("https") ||
    cover.startsWith("blob");
  const baseClasses =
    "w-full flex justify-center items-center    rounded-full border-2  py-3  text-base text-base font-bold transition-transform hover:translate-x-[2px] hover:translate-y-[2px]";
  const showBio = profile?.showBio;

  const handleTrackClick = (action) => {
    track(`${username}-${action}`);
  };

  const rtlLanguages = ["ar", "fa", "ur", "he", "ps", "sd", "ckb", "ks"];

  return (
    <div
      lang={profile?.language}
      dir={rtlLanguages.includes(profile?.language) ? "rtl" : "ltr"}
      style={{ backgroundColor: profile?.backgroundColor }}
      className="relative min-h-screen"
    >
      <div className="block sm:hidden">
        <div
          style={{ backgroundColor: colors.bg }}
          className={`relative min-h-screen ${font}`}
        >
          <ProfileTypes
            type={type}
            profile={profile}
            colors={colors}
            cover={cover}
            coverIsImage={coverIsImage}
            showBio={showBio}
            socials={socials}
            socialsOrder={socialsOrder}
            buttons={buttons}
            blocks={blocks}
            baseClasses={baseClasses}
            enableTracking={true}
            onTrackClick={handleTrackClick}
            isPreview={false}
            desktop={false}
          />
        </div>
      </div>

      <div className="hidden h-screen max-h-screen items-center justify-center sm:flex">
        <div
          style={{ backgroundColor: colors.bg }}
          className={`scrollbar-hide relative mx-auto min-h-[calc(100%-10rem)] w-full max-w-[600px] overflow-y-auto rounded-xl ${font}`}
        >
          <ProfileTypes
            type={type}
            profile={profile}
            colors={colors}
            cover={cover}
            coverIsImage={coverIsImage}
            showBio={showBio}
            socials={socials}
            socialsOrder={socialsOrder}
            buttons={buttons}
            blocks={blocks}
            baseClasses={baseClasses}
            enableTracking={true}
            onTrackClick={handleTrackClick}
            isPreview={false}
            desktop={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ResponsiveView;
