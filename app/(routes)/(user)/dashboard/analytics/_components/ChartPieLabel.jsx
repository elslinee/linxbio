"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const colors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",

];

export function ChartPieLabel({ clicksData = [], title = "Button Clicks" }) {
  // تحويل البيانات للـ Pie Chart
  const chartData = clicksData.map((item, index) => ({
    name: item.name,
    clicks: item.clicks,
    fill: colors[index % colors.length],
  }));

  // إنشاء chartConfig ديناميكي
  const chartConfig = {
    clicks: {
      label: "Clicks",
    },
    ...clicksData.reduce((acc, item, index) => {
      acc[item.name.toLowerCase()] = {
        label: item.name,
        color: colors[index % colors.length],
      };
      return acc;
    }, {}),
  };

  // حساب إجمالي الـ clicks
  const totalClicks = clicksData.reduce((sum, item) => sum + item.clicks, 0);

  return (
    <Card className="flex flex-col border-0 bg-white">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>Click analytics for buttons</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto max-h-[300px] aspect-square pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="clicks" label nameKey="name" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Total Clicks: {totalClicks}
        </div>
        <div className="text-muted-foreground leading-none">
          Showing button click distribution
        </div>
      </CardFooter>
    </Card>
  );
}
