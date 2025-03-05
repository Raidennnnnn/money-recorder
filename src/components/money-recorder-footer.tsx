import { SetUnconfirmedRecordsContext } from "./app-records-contexts";
import { SlicePointsContext } from "./app-records-contexts";
import { TotalConfirmedContext } from "./app-records-contexts";
import { useContext } from "react";
import { Input } from "./ui/input";
import { UnconfirmedRecordsContext } from "./app-records-contexts";

export default function MoneyRecorderFooter() {
  const slicePoints = useContext(SlicePointsContext);
  const totalConfirmed = useContext(TotalConfirmedContext);
  const unconfirmedRecords = useContext(UnconfirmedRecordsContext);
  const setUnconfirmedRecords = useContext(SetUnconfirmedRecordsContext);

  return <div className='flex gap-2 items-start'>
    <div className='shrink-0'>
      <div className="text-muted-foreground text-xs">
        {new Date(slicePoints[11]).toLocaleDateString() + ' - 至今'}
      </div>
      <div className="text-lg font-bold">
        <span>总计：</span>
        <span>{totalConfirmed}</span>
      </div>
    </div>
    <Input
      type="text"
      value={unconfirmedRecords.amount}
      placeholder="金额"
      onChange={handleInputChange}
    />
  </div>;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const amount = e.target.value;
    if (Number(amount) < 0) return;

    setUnconfirmedRecords(prev => prev ? { ...prev, amount } : { amount, category: null });
  }
}
