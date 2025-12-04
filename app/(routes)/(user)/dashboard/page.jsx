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
    setSocialsOrder,
    setStartUploadImage,
  } = useUserInfoStore();
  const { blocks, setBlocks } = useBlocksStore();

  const cover = useUserInfoStore((state) => state.profile.cover);

  const setProfile = useUserInfoStore((state) => state.setProfile);
  const getUserLinkBio_ = () => {
    getLinkBioData()
      .then((res) => {
        const { profile, socials, socialsOrder, template, blocks } =
          res?.data?.data;

        setProfile(profile);
        setSocials(socials);
        if (socialsOrder) {
          setSocialsOrder(socialsOrder);
        }
        setBlocks(blocks || []);
        setHeader(template.header);
        setColors(template.colors);
        setFont(template.font);
        setButtons(template.buttons);
      })
      .catch((err) => {});
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

    const cleanedBlocks = blocks.map((block) => {
      if (block._id && block._id.startsWith("temp_")) {
        const { _id, ...blockWithoutId } = block;
        return blockWithoutId;
      }
      return block;
    });

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
      blocks: cleanedBlocks,
    })
      .then((res) => {
        setPublishLoading(false);
        if (res?.data?.data?.blocks) {
          setBlocks(res.data.data.blocks);
        }
      })
      .finally(() => {
        setStartUploadImage("");
      });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-background">
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
