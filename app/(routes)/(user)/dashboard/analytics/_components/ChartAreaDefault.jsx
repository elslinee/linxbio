"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A simple area chart";

const chartConfig = {
  views: {
    label: "views",
    color: "var(--chart-1)",
  },
};

export function ChartAreaDefault({}) {
  const chartData = [
    { month: "Jan", views: 10 },
    { month: "Feb", views: 10 },
    { month: "Mar", views: 100 },
    { month: "Apr", views: 810 },
    { month: "May", views: 550 },
    { month: "Jun", views: 150 },
    { month: "Jul", views: 400 },
    { month: "Aug", views: 1500 },
    { month: "Sep", views: 100 },
    { month: "Oct", views: 450 },
    { month: "Nov", views: 550 },
    { month: "Dec", views: 200 },
  ];
  return (
    <Card className={"h-[250px] border-0 bg-white md:h-[400px]"}>
      <CardHeader>
        <CardTitle>visitors Chart</CardTitle>
        <CardDescription>
          Showing total visitors for the last 12 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="h-[150px] w-full md:h-[300px]"
          config={chartConfig}
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} className="hidden md:flex" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="views"
              type="monotone"
              fill="var(--color-primary)"
              fillOpacity={0.4}
              stroke="var(--color-primary)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
