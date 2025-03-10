import { Bar, BarChart, LabelList, XAxis } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { RecordsSplitByCycleContext, SlicePointsContext } from "./app-records-contexts";
import { useContext } from "react";
import { ConfirmedPaymentRecord } from "@/types";

const chartConfig = {
  records: {
    label: "支出",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig

export default function StatisticMonthChart({
  onBarClick,
}: {
  onBarClick: (index: number) => void;
}) {
  const slicePoints = useContext(SlicePointsContext);
  const recordsSplitByCycle = useContext(RecordsSplitByCycleContext);
  const chartData = getChartData(slicePoints, recordsSplitByCycle);
  
  return <ChartContainer config={chartConfig}>
    <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
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

  async function handleBarClick(_data: { cycle: string, records: number }, index: number) {
    onBarClick(index);
  }
}

function getChartData(slicePoints: number[], allPaymentRecordsSplitByCycle: ConfirmedPaymentRecord[][]) {
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