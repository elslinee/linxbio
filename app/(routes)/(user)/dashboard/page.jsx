"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import Navbar from "@/app/(routes)/(user)/dashboard/_components/Navbar";
import Sidebar from "@/app/(routes)/(user)/dashboard/_components/Sidebar";
import Panel from "@/app/(routes)/(user)/dashboard/_components/Panel";
import PhonePreviewDashboard from "@/app/(routes)/(user)/dashboard/_components/PhonePreviewDashboard";
import useTemplateStore from "@/stores/useTemplateStore";
import useUserInfoStore from "@/stores/useUserInfoStore";
import useBlocksStore from "@/stores/useBlocksStore";
import {
  getLinkBioData,
  updateLinkBioData,
} from "@/utils/client/user/linkBioApi";

function page() {
  const [desktop, setDesktop] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const {
    header,
    colors,
    font,
    buttons,
    setHeader,
    setColors,
    setFont,
    setButtons,
  } = useTemplateStore();
  const {
    profile,
    socials,
    socialsOrder,
    setSocials,
    startUploadImage,
    setStartUploadImage,
  } = useUserInfoStore();
  const { blocks, setBlocks } = useBlocksStore();

  const cover = useUserInfoStore((state) => state.profile.cover);

  const setProfile = useUserInfoStore((state) => state.setProfile);
  const getUserLinkBio_ = () => {
    getLinkBioData().then((res) => {
      const { profile, socials, template, blocks } = res?.data?.data;
      console.log("api storage", profile);

      setProfile(profile);
      setSocials(socials);
      setBlocks(blocks || []);
      setHeader(template.header);
      setColors(template.colors);
      setFont(template.font);
      setButtons(template.buttons);
    });
  };
  useEffect(() => {
    getUserLinkBio_();
  }, []);
  const router = useRouter();
  const { loading, user } = useAuthStore();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!user.isGetStartedDone) {
      router.replace("/get_started");
      return;
    }
  }, [loading, user, router]);

  if (loading) return null;
  if (!user) return null;
  if (!user.isGetStartedDone) return null;

  const handlePublish = () => {
    setPublishLoading(true);
    updateLinkBioData({
      profile,
      socials,
      template: {
        header,
        colors,
        font,
        buttons,
      },
      socialsOrder,
      blocks,
    })
      .then((res) => {
        console.log(res);
        setPublishLoading(false);
      })
      .finally(() => {
        setStartUploadImage("");
      });
  };
  console.log("zustand storage", profile);
  return (
    <div className="min-h-screen overflow-hidden bg-gray-200">
      <Navbar
        publishLoading={publishLoading}
        profile={profile}
        setDesktop={setDesktop}
        onClick={handlePublish}
      />
      <Sidebar />
      <main className="flex py-4 md:pl-32">
        <div className="z-9999">
          <Panel desktop={desktop} />
        </div>
        <div className="flex h-[calc(100vh-160px)] flex-1 items-center justify-center overflow-hidden md:h-[calc(100vh-97px)]">
          <PhonePreviewDashboard
            desktop={desktop}
            font={font}
            buttons={buttons}
            type={header}
            colors={colors}
            profile={profile}
            socials={socials}
            socialsOrder={socialsOrder}
            cover={cover}
            blocks={blocks}
          />
        </div>
      </main>
    </div>
  );
}

export default page;
