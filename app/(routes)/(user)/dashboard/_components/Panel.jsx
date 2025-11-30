import React from "react";
import PageTab from "@/app/(routes)/(user)/dashboard/_components/tabs/PageTab";
import HeaderTab from "@/app/(routes)/(user)/dashboard/_components/tabs/HeaderTab";
import SocialLinksTab from "@/app/(routes)/(user)/dashboard/_components/tabs/SocialLinksTab";
import DesignTab from "@/app/(routes)/(user)/dashboard/_components/tabs/DesignTab";
import SettingsTab from "@/app/(routes)/(user)/dashboard/_components/tabs/SettingsTab";
import { useSideBarTabsStore } from "@/stores/useSideBarTabsStore";
import { AnimatePresence } from "framer-motion";
function Panel({ desktop }) {
  const { tab } = useSideBarTabsStore();
  return (
    <AnimatePresence mode="wait">
      {tab === "Page" && <PageTab key="page" />}
      {tab === "Header" && <HeaderTab desktop={desktop} key="header" />}
      {tab === "Social Links" && <SocialLinksTab key="social" />}
      {tab === "Design" && <DesignTab key="design" />}
      {tab === "Settings" && <SettingsTab key="settings" />}
    </AnimatePresence>
  );
}
export default Panel;
