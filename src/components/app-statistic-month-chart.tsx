import { Bar, BarChart, LabelList, XAxis } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { AllPaymentRecordsSplitByCycleContext, SlicePointsContext } from "./app-records-contexts";
import { useContext } from "react";
import { PaymentRecordV2 } from "@/types";

const chartConfig = {
  records: {
    label: "支出",
    color: "#2563eb",
  },
} satisfies ChartConfig

export default function AppStatisticMonthChart({
  onBarClick,
}: {
  onBarClick: (index: number) => void;
}) {
  const slicePoints = useContext(SlicePointsContext);
  const allPaymentRecordsSplitByCycle = useContext(AllPaymentRecordsSplitByCycleContext);
  const chartData = getChartData(slicePoints, allPaymentRecordsSplitByCycle);
  
  return <ChartContainer config={chartConfig}>
    <BarChart accessibilityLayer data={chartData}>
      <XAxis 
        dataKey="cycle" 
        fontSize={10}
      />
      <Bar dataKey="records" fill="var(--color-records)" onClick={handleBarClick}>
        <LabelList
          offset={8}
          fontSize={12}
          dataKey="records"
          position="top"
          className="fill-foreground"
          formatter={(value: number) => value === 0 ? '' : value }
        />
      </Bar>
    </BarChart>
  </ChartContainer>;

  function handleBarClick(data: { cycle: string, records: number }) {
    const index = chartData.findIndex((item) => item.cycle === data.cycle);
    onBarClick(index);
  }
}

function getChartData(slicePoints: number[], allPaymentRecordsSplitByCycle: PaymentRecordV2['confirmed'][]) {
  const result = slicePoints.map((point, index) => {
    const start = new Date(point).toLocaleString().split(" ")[0].slice(5);

    const records = allPaymentRecordsSplitByCycle[index];
    return {
      cycle: `${start}`,
      records: records.reduce((acc, record) => acc + (record.removed ? 0 : record.amount), 0),
    }
  })
  return result;
}