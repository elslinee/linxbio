import React from "react";
import { X } from "lucide-react";
import AnimatedTab from "@/app/(routes)/(user)/dashboard/_components/AnimatedTab";
import { useSideBarTabsStore } from "@/stores/useSideBarTabsStore";
import AddSocialLinkButton from "@/app/(routes)/(user)/dashboard/_components/AddSocialLinkButton";
import SocialLinksSortable from "@/app/(routes)/(user)/dashboard/_components/SocialLinksSortable";
import useUserInfoStore from "@/stores/useUserInfoStore";
function SocialLinksTab() {
  const { socials } = useUserInfoStore();
  const { setTab } = useSideBarTabsStore();
  const calcLinks = Object.values(socials).filter((v) => !!v).length;

  return (
    <AnimatedTab className="absolute bottom-24 left-1/2 w-[calc(100vw-2rem)] max-w-[425px] -translate-x-1/2 md:relative md:bottom-auto md:left-auto md:w-[425px] md:translate-x-0">
      <div className="flex h-[calc(100vh-200px)] w-full flex-col rounded-[8px] bg-white md:h-[calc(100vh-100px)]">
        <div className="flex shrink-0 items-center justify-between px-4 py-4">
          <p className="font-medium">Social Links</p>
          <button
            onClick={() => {
              setTab("");
            }}
          >
            <X size={20} />
          </button>
        </div>

        <hr className="mb-4 text-gray-200" />

        <div className="custom-scroll flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex w-full items-center justify-between gap-3">
              <p className="text-sm font-medium">
                Social Links ({calcLinks || 0})
              </p>
              <AddSocialLinkButton />
            </div>
          </div>
          <SocialLinksSortable socials={socials} />
        </div>
      </div>
    </AnimatedTab>
  );
}

export default SocialLinksTab;
