import AppStatisticMonthChart from "./app-statistic-month-chart";
import AppStatisticHeatMap from "./app-statistic-heat-map";
import { PaymentRecordV2 } from "@/types";
import { useState } from "react";
import AppStatisticDayTable from "./app-statistic-day-table";
import BackHomeButton from "./back-home-button";
export default function AppStatistic() {
  const [index, setIndex] = useState(NaN);
  const [data, setData] = useState<PaymentRecordV2['confirmed']>([]);

  return <>
    <AppStatisticMonthChart onBarClick={setIndex} />
    { !isNaN(index) && <AppStatisticHeatMap index={index} onCellClick={setData} /> }
    {data.length > 0 && <AppStatisticDayTable data={data} />}
    <BackHomeButton />
  </>;
}

