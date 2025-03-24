import { SetUnconfirmedRecordsContext } from "./app-records-contexts";
import { useContext } from "react";
import { Input } from "./ui/input";
import { UnconfirmedRecordsContext } from "./app-records-contexts";


export default function MoneyRecorderInput({
  className,
}: {
  className?: string;
}) {
  const unconfirmedRecords = useContext(UnconfirmedRecordsContext);
  const setUnconfirmedRecords = useContext(SetUnconfirmedRecordsContext);

  return <div className="flex flex-col gap-2">
    <Input
      type="text"
      className={className}
      value={unconfirmedRecords.amount}
      placeholder="金额"
      onChange={handleInputChange}
    />
    <Input
      type="text"
      className={className}
      value={unconfirmedRecords.description}
      placeholder="备注"
      onChange={handleDescriptionChange}
    />
  </div>

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const amount = e.target.value;
    if (isNaN(Number(amount))) return;
    
    setUnconfirmedRecords(prev => prev ? { ...prev, amount } : { amount, category: null });
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    const description = e.target.value;
    setUnconfirmedRecords(prev => prev ? { ...prev, description } : { amount: '', category: null, description });
  }
}
