import { useContext, useMemo } from "react";
import { RecordsSplitByCycleContext } from "./app-records-contexts";
import CalendarHeatmap, { ReactCalendarHeatmapValue } from "react-calendar-heatmap";
import { SlicePointsContext } from "./app-records-contexts";
import { ConfirmedPaymentRecord } from "@/types";
import { flushSync } from "react-dom";
const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

export default function AppStatisticHeatMap({
  index,
  onCellClick,
}: {
  index: number;
  onCellClick: (data: ConfirmedPaymentRecord[]) => void;
}) {
  const slicePoints = useContext(SlicePointsContext);
  const recordsSplitByCycle = useContext(RecordsSplitByCycleContext);
  
  const startDate = new Date(slicePoints[index]);
  const calenderStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 1);
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate() - 1);
  
  const valuesByDay = useMemo(() => {  
    const valuesByDay: Record<string, ConfirmedPaymentRecord[]> = {};
    recordsSplitByCycle[index].forEach((record) => {
      const date = new Date(record.timeStamp);
      const dateString = date.toLocaleDateString(); // 获取日期部分 YYYY-MM-DD
      
      if (!valuesByDay[dateString]) {
        valuesByDay[dateString] = [];
      }
      valuesByDay[dateString].push(record);
    });
    return valuesByDay;
  }, [recordsSplitByCycle, index]);

  const values = useMemo(() => {
    return Object.entries(valuesByDay).map(([dateString, totalAmount]) => {
      return { date: dateString, count: totalAmount.reduce((acc, curr) => acc + (curr.removed ? 0 : curr.amount), 0) };
    });
  }, [valuesByDay]);

  return <div id="heat-map" className="w-full p-2">
    <div className="text-sm text-muted-foreground">
      { startDate.toLocaleDateString() } - { endDate.toLocaleDateString() }
    </div>
    <div className="flex flex-row justify-between my-2">
      { weekdays.map((weekday) => <div key={weekday} className="w-9 text-center font-bold">{ weekday }</div> ) }
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

  async function handleCellClick(value: ReactCalendarHeatmapValue<string> | undefined) {
    const dayTable = document.getElementById('day-table');
    if (dayTable) {
      dayTable.style.viewTransitionName = 'day-table';
    }
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        onCellClick(value ? valuesByDay[value.date]: []);
      });
    });

    await transition.finished;
    if (dayTable) {
      dayTable.style.viewTransitionName = '';
    }
  }
}