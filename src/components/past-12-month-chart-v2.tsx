import { Bar, BarChart, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { PaymentRecordsV2Context } from "./record-context";
import { Suspense, lazy, useContext } from "react";
import { Month, PaymentRecordV2 } from "@/types";
import AppSubpageCornerButtons from "./app-subpage-corner-buttons";

const PlaceHolder = lazy(() => import("./place-holder"));

const chartConfig = {
  records: {
    label: "支出",
    color: "#2563eb",
  },
} satisfies ChartConfig

export default function Past12MonthChart() {
  const allPaymentRecords = useContext(PaymentRecordsV2Context);
  const chartData = getChartData(allPaymentRecords);
  
  return <>
    <div className="flex flex-col h-96 items-center justify-center relative">
      <Suspense fallback={<div className="w-full h-full bg-secondary rounded-lg animate-pulse" />}>
        <PlaceHolder />
      </Suspense>
    </div>
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <XAxis 
          dataKey="month" 
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="records" fill="var(--color-records)" radius={4} />
      </BarChart>
    </ChartContainer>
    <AppSubpageCornerButtons />
  </>;
}

function getChartData(allPaymentRecords: PaymentRecordV2) {
  const thisYear = new Date().getFullYear();
  const thisMonth = new Date().getMonth() as Month;
  const thisDate = new Date().getDate();
  const selectedDay = localStorage.getItem('selected-day') || '1';

  let month = thisDate >= Number(selectedDay) ? thisMonth : thisMonth - 1;
  let cycleStartPoint = new Date(thisYear, month, Number(selectedDay)).getTime();

  const chartDataObject = allPaymentRecords.confirmed.reduce((acc, record) => {
    if (record.timeStamp < cycleStartPoint) {
      month = month - 1;
      cycleStartPoint = new Date(new Date().getFullYear(), month, Number(selectedDay)).getTime();
    }

    acc[month] = acc[month] || 0;
    acc[month] += record.removed ? 0 : record.amount;
    return acc;
  }, {} as Record<number, number>);
  
  const chartData = Object.entries(chartDataObject).map(([month, records]) => ({ month: Number(month) + 1, records }));
  const chartDataLength = chartData.length;
  const lastMonth = chartData[chartDataLength - 1].month;
  if (chartDataLength < 12) {
    for (let i = 0; i < 12 - chartDataLength; i++) {
      chartData.push({ month: (lastMonth + i + 1 < 13 ? lastMonth + i + 1 : lastMonth + i - 11) as Month, records: 0 });
    }
  }

  return chartData;
}