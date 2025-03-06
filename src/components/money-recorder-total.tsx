import { SlicePointsContext } from "./app-records-contexts";
import { TotalConfirmedContext } from "./app-records-contexts";
import { useContext } from "react";

export default function MoneyRecorderTotal() {
  const slicePoints = useContext(SlicePointsContext);
  const totalConfirmed = useContext(TotalConfirmedContext);

  return <div className='shrink-0'>
    <div className="text-muted-foreground text-xs">
      {new Date(slicePoints[11]).toLocaleDateString() + ' - 至今'}
    </div>
    <div className="text-lg font-bold">
      <span>总计：</span>
      <span>{totalConfirmed}</span>
    </div>
  </div>;
}
