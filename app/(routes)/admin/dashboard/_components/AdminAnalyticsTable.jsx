"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  getUserAnalyticsForAdmin,
  resetUserTrackingData,
} from "@/utils/client/admin/trackingApi";
import { ChartAreaDefault } from "@/app/(routes)/(user)/dashboard/analytics/_components/ChartAreaDefault";
import { ChartBarHorizontal } from "@/app/(routes)/(user)/dashboard/analytics/_components/ChartBarHorizontal";
import { ChartPieLabel } from "@/app/(routes)/(user)/dashboard/analytics/_components/ChartPieLabel";
import { RotateCcw } from "lucide-react";

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

function AdminAnalyticsTable({ username }) {
  const [chartData, setChartData] = useState([]);
  const [socialClicks, setSocialClicks] = useState([]);
  const [buttonClicks, setButtonClicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);

  const fetchAnalyticsData = useCallback(async () => {
    if (!username) return;

    setLoading(true);
    getUserAnalyticsForAdmin(username)
      .then((res) => {
        const data = res?.data?.data || {};

        setSocialClicks(data.socialClicks || []);
        setButtonClicks(data.buttonClicks || []);

        const viewsMap = {};
        (data.monthlyViews || []).forEach((m) => {
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
        console.error("Error fetching user analytics:", err);
        setLoading(false);
      });
  }, [username]);

  useEffect(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  const totalViews = chartData.reduce((acc, item) => acc + item.views, 0);
  const totalButtonClicks = buttonClicks.reduce(
    (acc, item) => acc + item.clicks,
    0,
  );
  const totalSocialClicks = socialClicks.reduce(
    (acc, item) => acc + item.clicks,
    0,
  );

  const handleReset = async () => {
    if (!username) return;
    if (
      !confirm(
        `Are you sure you want to reset all tracking data for @${username}? This action cannot be undone.`,
      )
    ) {
      return;
    }

    try {
      setResetting(true);
      await resetUserTrackingData(username);
      await fetchAnalyticsData();
      alert("Tracking data reset successfully");
    } catch (error) {
      console.error("Error resetting tracking data:", error);
      alert("Failed to reset tracking data");
    } finally {
      setResetting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="border-t-primary h-8 w-8 animate-spin rounded-full border-4 border-gray-200"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Analytics</h2>
        <button
          onClick={handleReset}
          disabled={resetting}
          className="flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
        >
          <RotateCcw size={16} className={resetting ? "animate-spin" : ""} />
          {resetting ? "Resetting..." : "Reset Data"}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white px-6 py-8 shadow-sm">
          <h2 className="text-xs font-medium text-gray-500 uppercase md:text-sm">
            Total Page Views
          </h2>
          <p className="text-4xl font-semibold">
            {totalViews.toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white px-6 py-8 shadow-sm">
          <h2 className="text-xs font-medium text-gray-500 uppercase md:text-sm">
            Total Button Clicks
          </h2>
          <p className="text-4xl font-semibold">
            {totalButtonClicks.toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white px-6 py-8 shadow-sm">
          <h2 className="text-xs font-medium text-gray-500 uppercase md:text-sm">
            Total Social Links Clicks
          </h2>
          <p className="text-4xl font-semibold">
            {totalSocialClicks.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <ChartAreaDefault chartData={chartData} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <ChartBarHorizontal
            clicksData={socialClicks}
            title="Social Media Clicks"
          />
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <ChartPieLabel clicksData={buttonClicks} title="Button Clicks" />
        </div>
      </div>
    </div>
  );
}

export default AdminAnalyticsTable;
