import React from "react";
import ProfileTypes from "@/components/ProfileTypes/ProfileTypes";
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
  const coverIsImage =
    cover.startsWith("http") ||
    cover.startsWith("https") ||
    cover.startsWith("blob");
  const baseClasses =
    "w-full flex justify-center items-center    rounded-full border-2 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-bold transition-transform hover:translate-x-[2px] hover:translate-y-[2px]";
  const showBio = profile?.showBio;

  const rtlLanguages = ["ar", "fa", "ur", "he", "ps", "sd", "ckb", "ks"];
  return (
    <div
      lang={profile?.language}
      dir={rtlLanguages.includes(profile?.language) ? "rtl" : "ltr"}
      style={{
        backgroundColor: desktop ? profile?.backgroundColor || "#dedede" : "",
      }}
      className={
        desktop
          ? "flex h-[500px] w-[1200px] max-w-[1200px] items-center justify-center overflow-hidden md:h-[700px]"
          : ""
      }
    >
      <div
        className={`relative ${font} ${!desktop ? "h-[500px] w-[260px] overflow-hidden rounded-[3rem] border-2 border-gray-800 bg-gray-900 p-[6px] md:h-[660px] md:w-[300px] md:border-4 md:shadow-2xl" : "h-[350px] w-[300px] md:h-[660px] md:w-[500px] "}`}
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
          enableTracking={false}
          isPreview={true}
          desktop={desktop}
        />
      </div>
    </div>
  );
};

export default PhonePreviewDashboard;
