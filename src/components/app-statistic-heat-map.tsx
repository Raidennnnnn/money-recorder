import { useContext, useMemo } from "react";
import { AllPaymentRecordsSplitByCycleContext } from "./app-records-contexts";
import CalendarHeatmap, { ReactCalendarHeatmapValue } from "react-calendar-heatmap";
import { SlicePointsContext } from "./app-records-contexts";
import { PaymentRecordV2 } from "@/types";

export default function AppStatisticHeatMap({
  index,
  onCellClick,
}: {
  index: number;
  onCellClick: (data: PaymentRecordV2['confirmed']) => void;
}) {
  const slicePoints = useContext(SlicePointsContext);
  const allPaymentRecordsSplitByCycle = useContext(AllPaymentRecordsSplitByCycleContext);
  
  const startDate = new Date(slicePoints[index]);
  const calenderStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 1);
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate() - 1);
  
  const valuesByDay = useMemo(() => {  
    const valuesByDay: Record<string, PaymentRecordV2['confirmed']> = {};
    allPaymentRecordsSplitByCycle[index].forEach((record) => {
      const date = new Date(record.timeStamp);
      const dateString = date.toLocaleDateString(); // 获取日期部分 YYYY-MM-DD
      
      if (!valuesByDay[dateString]) {
        valuesByDay[dateString] = [];
      }
      valuesByDay[dateString].push(record);
    });
    return valuesByDay;
  }, [allPaymentRecordsSplitByCycle, index]);

  const values = useMemo(() => {
    return Object.entries(valuesByDay).map(([dateString, totalAmount]) => {
      return { date: dateString, count: totalAmount.reduce((acc, curr) => acc + (curr.removed ? 0 : curr.amount), 0) };
    });
  }, [valuesByDay]);

  return <div className="w-full p-2">
    <div className="font-bold text-lg">
      { startDate.toLocaleDateString() } - { endDate.toLocaleDateString() }
    </div>
    <CalendarHeatmap
      showMonthLabels={false}
      showWeekdayLabels={false}
      showOutOfRangeDays={false}
      horizontal={false}
      startDate={calenderStart}
      endDate={endDate}
      values={values}
      classForValue={(value) => {
        if (!value) {
          return 'color-empty';
        }
        return `color-scale-${Math.min(Math.round(value.count / 30), 7)}`;
      }}
      onClick={handleCellClick}
  />
  </div>;

  function handleCellClick(value: ReactCalendarHeatmapValue<string> | undefined) {
    if (value) {
      onCellClick(valuesByDay[value.date]);
    }
  }
}