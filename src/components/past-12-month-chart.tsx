import { Bar, BarChart, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Past12MonthRecordsContext } from "./record-context";
import { useContext } from "react";
import { Month } from "@/types";

const chartConfig = {
  records: {
    label: "支出",
    color: "#2563eb",
  },
} satisfies ChartConfig

export default function Past12MonthChart() {
  const past12MonthRecords = useContext(Past12MonthRecordsContext);

  const chartData = (function() {
    const data = past12MonthRecords.map(([month, records]) => {
      return {
        month,
        records: Object.values(records).map((record) => record.confirmed).reduce((acc, record) => acc + record, 0),
      };
    });
    
    if (!data.length || data.length === 12) {
      return data;
    }

    const length = data.length;
    const lastMonth = data[length - 1].month;
    for (let i = 0; i < 12 - length; i++) {
      data.push({ month: (lastMonth + i + 1 < 12 ? lastMonth + i + 1 : lastMonth + i - 11) as Month, records: 0 });
    }
    return data;
  })();

  return <ChartContainer config={chartConfig} className="h-48 w-full">
    <BarChart accessibilityLayer data={chartData}>
      <XAxis 
        dataKey="month" 
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        tickFormatter={(value: Month) => String(value + 1)} 
      />
      <ChartTooltip content={<ChartTooltipContent />} />
      <Bar dataKey="records" fill="var(--color-records)" radius={4} />
    </BarChart>
  </ChartContainer>;
}