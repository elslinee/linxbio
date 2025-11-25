import React from "react";
import PageTab from "@/app/(routes)/(user)/dashboard/_components/tabs/PageTab";
import HeaderTab from "@/app/(routes)/(user)/dashboard/_components/tabs/HeaderTab";
import SocialLinksTab from "@/app/(routes)/(user)/dashboard/_components/tabs/SocialLinksTab";
import DesignTab from "@/app/(routes)/(user)/dashboard/_components/tabs/DesignTab";
import SettingsTab from "@/app/(routes)/(user)/dashboard/_components/tabs/SettingsTab";
import { useSideBarTabsStore } from "@/stores/useSideBarTabsStore";
function Panel() {
  const { tab } = useSideBarTabsStore();
  console.log(tab);
  return tab === "Page" ? (
    <PageTab />
  ) : tab === "Header" ? (
    <HeaderTab />
  ) : tab === "Social Links" ? (
    <SocialLinksTab />
  ) : tab === "Design" ? (
    <DesignTab />
  ) : tab === "Settings" ? (
    <SettingsTab />
  ) : null;
}
export default Panel;
