import AppStatisticMonthChart from "./statistic-month-chart";
import AppStatisticHeatMap from "./statistic-heat-map";
import { ConfirmedPaymentRecord } from "@/types";
import { useState } from "react";
import AppStatisticDayTable from "./statistic-day-table";
import { flushSync } from "react-dom";

export default function Statistic() {
  const [index, setIndex] = useState(NaN);
  const [data, setData] = useState<ConfirmedPaymentRecord[]>([]);

  return <>
    <AppStatisticMonthChart onBarClick={handleIndexChange} />
    { !isNaN(index) && <AppStatisticHeatMap index={index} onCellClick={setData} /> }
    {data.length > 0 && <AppStatisticDayTable data={data} />}
  </>;

  async function handleIndexChange(nextIndex:number) {
    if (nextIndex === index) {
      return;
    }

    const heatMap = document.getElementById('heat-map');
    const heatMapContainer = document.getElementById('heat-map-container');
    if (heatMap) {
      heatMap.style.viewTransitionName = 'heat-map';
    }
    if (heatMapContainer) {
      heatMapContainer.style.viewTransitionName = nextIndex > index ? 'next-image' : 'previous-image';
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setIndex(nextIndex);
        setData([]);
      });
    });

    await transition.finished;
    if (heatMap) {
      heatMap.style.viewTransitionName = '';
    }
    if (heatMapContainer) {
      heatMapContainer.style.viewTransitionName = '';
    }
  }
}

