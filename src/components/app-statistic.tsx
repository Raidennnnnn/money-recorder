import AppStatisticMonthChart from "./app-statistic-month-chart";
import AppStatisticHeatMap from "./app-statistic-heat-map";
import { ConfirmedPaymentRecord } from "@/types";
import { useState } from "react";
import AppStatisticDayTable from "./app-statistic-day-table";
import BackHomeButton from "./back-home-button";
import AppSettings from "./app-settings";
export default function AppStatistic() {
  const [index, setIndex] = useState(NaN);
  const [data, setData] = useState<ConfirmedPaymentRecord[]>([]);

  return <>
    <AppStatisticMonthChart onBarClick={handleIndexChange} />
    { !isNaN(index) && <AppStatisticHeatMap index={index} onCellClick={setData} /> }
    {data.length > 0 && <AppStatisticDayTable data={data} />}
    <div className="fixed bottom-8 right-4 flex gap-2">
      <AppSettings />
      <BackHomeButton />
    </div>
  </>;

  function handleIndexChange(index:number) {
    setIndex(index);
    setData([])
  }
}

