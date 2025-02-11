import { Bar, BarChart, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Past12MonthRecordsContext } from "./record-context";
import { useContext } from "react";
import { Month } from "@/types";
import { HomeIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigateWithTransition } from "./use-navi-with-transition";

const chartConfig = {
  records: {
    label: "支出",
    color: "#2563eb",
  },
} satisfies ChartConfig

export default function Past12MonthChart() {
  const navigate = useNavigateWithTransition();
  const past12MonthRecords = useContext(Past12MonthRecordsContext);

  const chartData = (function() {
    const data = past12MonthRecords.map(([month, records]) => {
      return {
        month,
        records: Object
          .values(records)
          .map((record) => record.confirmed.reduce((acc, record) => acc + record.amount, 0))
          .reduce((acc, record) => acc + record, 0),
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

  return <>
    <ChartContainer config={chartConfig}>
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
    </ChartContainer>
    <Button 
      variant="outline" 
      className="fixed bottom-4 right-4 px-2.5" 
      onClick={() => navigate('/')}
    >
      <HomeIcon className="w-4 h-4" />
    </Button>
  </>;
}