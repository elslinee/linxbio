"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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

export const description = "A simple area chart";

const chartConfig = {
  views: {
    label: "views",
    color: "var(--chart-1)",
  },
};

export function ChartAreaDefault({ chartData }) {
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
