"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faXTwitter,
  faThreads,
  faTwitch,
  faFacebook,
  faWhatsapp,
  faGithub,
  faLinkedin,
  faPinterest,
  faBehance,
  faYoutube,
  faDiscord,
  faTelegram,
  faSnapchat,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faArrowLeft,
  faUser,
  faEarthAmericas,
} from "@fortawesome/free-solid-svg-icons";
export const description = "A horizontal bar chart";

const chartData = [
  { platform: "instagram", click: 10 },
  { platform: "tiktok", click: 0 },
  { platform: "twitter", click: 0 },
  { platform: "threads", click: 20 },
  { platform: "twitch", click: 3 },
  { platform: "facebook", click: 5 },
  { platform: "whatsapp", click: 1 },
  { platform: "github", click: 0 },
  { platform: "linkedin", click: 0 },
  { platform: "pinterest", click: 0 },
  { platform: "behance", click: 4 },
  { platform: "youtube", click: 0 },
  { platform: "discord", click: 0 },
  { platform: "telegram", click: 0 },
  { platform: "snapchat", click: 0 },
  { platform: "email", click: 0 },
  { platform: "website", click: 0 },
];
const fixedData = chartData.map((item) => ({
  ...item,
  click: item.click === 0 ? 0.00001 : item.click,
}));
const socialIcons = {
  instagram: faInstagram,
  tiktok: faTiktok,
  twitter: faXTwitter,
  threads: faThreads,
  twitch: faTwitch,
  facebook: faFacebook,
  whatsapp: faWhatsapp,
  github: faGithub,
  linkedin: faLinkedin,
  pinterest: faPinterest,
  behance: faBehance,
  youtube: faYoutube,
  discord: faDiscord,
  telegram: faTelegram,
  snapchat: faSnapchat,
  email: faEnvelope,
  website: faEarthAmericas,
  user: faUser,
};
const CustomTick = ({ x, y, payload }) => {
  const icon = socialIcons[payload.value];

  return (
    <g transform={`translate(${x},${y + 8})`}>
      <foreignObject x={-28} y={-20} width={24} height={24}>
        <FontAwesomeIcon icon={icon} className="text-xl" />
      </foreignObject>
    </g>
  );
};

const chartConfig = {
  platform: {
    label: "platform",
    color: "var(--chart-1)",
  },
};

export function ChartBarHorizontal({
  clicksData = [],
  title = "Social Media Clicks",
}) {
  // عرض فقط الـ platforms التي عندها clicks
  const chartData = clicksData.map((item) => ({
    platform: item.platform,
    clicks: item.clicks,
  }));

  // حساب ارتفاع الـ chart بناءً على عدد العناصر
  const chartHeight = Math.max(200, chartData.length * 40);

  return (
    <Card className={"w-full border-0 bg-white"}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Click analytics for social platforms</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className={`h-[${chartHeight}px] w-full`}
          >
            <BarChart
              accessibilityLayer
              barCategoryGap={8}
              data={chartData}
              layout="vertical"
              margin={{
                left: -20,
              }}
            >
              <XAxis type="number" dataKey="clicks" hide />

              <YAxis
                dataKey="platform"
                type="category"
                tick={<CustomTick />}
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="clicks" fill="var(--color-primary)" radius={5} />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="flex h-[200px] items-center justify-center text-gray-500">
            No social media clicks yet
          </div>
        )}
      </CardContent>
    </Card>
  );
}
