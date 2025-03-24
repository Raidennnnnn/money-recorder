import { SlicePointsContext } from "./app-records-contexts";
import { TotalConfirmedContext } from "./app-records-contexts";
import { useContext } from "react";
import { AppMonthlyLimitContext } from "./app-monthly-limit-context";
export default function MoneyRecorderTotal({
  className,
}: {
  className?: string;
}) {
  const { monthlyLimit } = useContext(AppMonthlyLimitContext);
  const slicePoints = useContext(SlicePointsContext);
  const totalConfirmed = useContext(TotalConfirmedContext);

  return <div className={className}>
    <div className="text-muted-foreground text-xs">
      {new Date(slicePoints[11]).toLocaleDateString() + ' - 至今'}
    </div>
    <div className="text-lg font-bold">
      <span>总计：</span>
      <span className={`${totalConfirmed > monthlyLimit ? 'text-destructive' : ''}`}>{totalConfirmed}</span>
    </div>
  </div>;
}
