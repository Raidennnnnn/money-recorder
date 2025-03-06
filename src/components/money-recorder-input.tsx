import { SetUnconfirmedRecordsContext } from "./app-records-contexts";
import { useContext } from "react";
import { Input } from "./ui/input";
import { UnconfirmedRecordsContext } from "./app-records-contexts";


export default function MoneyRecorderInput() {
  const unconfirmedRecords = useContext(UnconfirmedRecordsContext);
  const setUnconfirmedRecords = useContext(SetUnconfirmedRecordsContext);

  return <Input
    type="text"
    value={unconfirmedRecords.amount}
    placeholder="金额"
    onChange={handleInputChange}
  />

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const amount = e.target.value;
    if (Number(amount) < 0) return;

    setUnconfirmedRecords(prev => prev ? { ...prev, amount } : { amount, category: null });
  }
}
