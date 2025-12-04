"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import Navbar from "@/app/(routes)/(user)/dashboard/_components/Navbar";
import useUserInfoStore from "@/stores/useUserInfoStore";
import {
  getAllClicks,
  getMonthlyPageViews,
} from "@/utils/client/user/trackingApi";
import { getLinkBioData } from "@/utils/client/user/linkBioApi";
import { ChartAreaDefault } from "./_components/ChartAreaDefault";
import { ChartBarHorizontal } from "./_components/ChartBarHorizontal";
import { ChartPieLabel } from "./_components/ChartPieLabel";

function Page() {
  const [chartData, setChartData] = useState([]);
  const { profile, setProfile } = useUserInfoStore();
  const [socialClicks, setSocialClicks] = useState([]);
  const [buttonClicks, setButtonClicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!profile?.username) {
          const res = await getLinkBioData();
          if (res?.data?.data?.profile) {
            setProfile(res.data.data.profile);
          }
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [profile?.username, setProfile]);

  useEffect(() => {
    const username = profile?.username || user?.username;
    if (!username) return;

    setLoading(true);

    getAllClicks(username)
      .then((res) => {
        const data = res?.data?.data || [];

        const socials = [];
        const buttons = [];

        data.forEach((item) => {
          if (!item?.action) return;

          const parts = item.action.split("-");
          if (parts.length < 3) return;

          const name = parts[parts.length - 1];
          const type = parts[parts.length - 2];

          if (type === "social") {
            socials.push({
              platform: name.toLowerCase(),
              clicks: item.count,
            });
          } else if (type === "button" || type === "block") {
            buttons.push({
              name,
              clicks: item.count,
            });
          }
        });

        setSocialClicks(socials);
        setButtonClicks(buttons);
      })
      .catch((err) => {
        console.error("Error fetching clicks:", err);
      });

    getMonthlyPageViews(username)
      .then((res) => {
        const data = res?.data?.data || [];

        const viewsMap = {};
        data.forEach((m) => {
          viewsMap[m.month] = m.views;
        });

        const fullYear = months.map((name, index) => {
          const monthNumber = index + 1;
          return {
            month: name,
            views: viewsMap[monthNumber] || 0,
          };
        });

        setChartData(fullYear);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching page views:", err);
        setLoading(false);
      });
  }, [profile?.username, user?.username]);

  const totalViews = chartData.reduce((acc, item) => acc + item.views, 0);
  const totalButtonClicks = buttonClicks.reduce(
    (acc, item) => acc + item.clicks,
    0,
  );
  const totalSocialClicks = socialClicks.reduce(
    (acc, item) => acc + item.clicks,
    0,
  );

  const router = useRouter();
  const { loading: authLoading } = useAuthStore();

  const firstName = profile?.displayName?.split(" ")?.[0] || "";
  useEffect(() => {
    if (authLoading) return;

    if (!user) return router.replace("/login");
    if (!user.isGetStartedDone) return router.replace("/get_started");
  }, [authLoading, user, router]);

  if (authLoading || !user || !user.isGetStartedDone) return null;

  return (
    <div className="bg-background min-h-screen overflow-hidden">
      <Navbar analytics={true} profile={profile} />
      <main className="mx-auto max-w-5xl px-4 py-4">
        <h2 className="mb-6 text-2xl font-semibold md:text-[32px]">
          Welcome, {firstName}
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-3 rounded-md bg-white px-6 py-8">
            <h2 className="min-h-[30px] text-xs font-medium text-gray-500 uppercase md:text-sm">
              Total Page Views
            </h2>
            <p className="text-4xl font-semibold">{totalViews}</p>
          </div>

          <div className="flex flex-col gap-3 rounded-md bg-white px-6 py-8">
            <h2 className="text-xs font-medium text-gray-500 uppercase md:text-sm">
              Total Buttons Clicks
            </h2>
            <p className="text-4xl font-semibold">{totalButtonClicks}</p>
          </div>
          <div className="col-span-2 flex min-h-[30px] flex-col gap-3 rounded-md bg-white px-6 py-8 md:col-span-1">
            <h2 className="text-xs font-medium text-gray-500 uppercase md:text-sm">
              Total Social Links Clicks
            </h2>
            <p className="text-4xl font-semibold">{totalSocialClicks}</p>
          </div>
        </div>
        <div className="my-4">
          <ChartAreaDefault chartData={chartData} />
        </div>
        <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <ChartBarHorizontal
            clicksData={socialClicks}
            title="Social Media Clicks"
          />
          <ChartPieLabel clicksData={buttonClicks} title="Button Clicks" />
        </div>
      </main>
    </div>
  );
}

export default Page;
