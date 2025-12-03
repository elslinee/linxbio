"use client";
import React, { useState } from "react";
import Phone from "@/app/(routes)/[username]/_components/Phone";
import Desktop from "@/app/(routes)/[username]/_components/Desktop";
import useTrackUserPageView from "@/hooks/useTrackUserPageView";

function Wrapper({ user }) {
  const username = user?.profile?.username;
  useTrackUserPageView(username);
  const [desktop, setDesktop] = useState(false);
  const font = user?.template?.font;
  const buttons = user?.template?.buttons;
  const header = user?.template?.header;
  const colors = user?.template?.colors;
  const profile = user?.profile;
  const socials = user?.socials;
  const socialsOrder = user?.socialsOrder;
  const cover = user?.profile?.cover;
  const blocks = user?.blocks;
  return (
    <div>
      <Phone
        desktop={desktop}
        font={font || "font-mulish"}
        buttons={buttons || "btns_style_1"}
        type={header || "4"}
        colors={colors || {}}
        profile={profile || {}}
        socials={socials || {}}
        socialsOrder={socialsOrder || []}
        cover={cover || ""}
        blocks={blocks || []}
      />
      <Desktop
        desktop={desktop}
        font={font || "font-mulish"}
        buttons={buttons || "btns_style_1"}
        type={header || "4"}
        colors={colors || {}}
        profile={profile || {}}
        socials={socials || {}}
        socialsOrder={socialsOrder || []}
        cover={cover || ""}
        blocks={blocks || []}
      />
    </div>
  );
}

export default Wrapper;
