import { useContext, useState } from 'react';
import { Input } from './ui/input';
import MoneyRecorderButton from './money-recorder-button';
import { Category } from '../types';
import { Past12CyclesRecords, SetPast12CyclesRecords, SetUnconfirmedRecordsContext, TotalConfirmedContext } from './app-records-contexts';
import { SlicePointsContext } from './app-records-contexts';

const categorys = Object.values(Category).filter((c): c is Category => !isNaN(Number(c)));

export default function MoneyRecorderV2() {
  const slicePoints = useContext(SlicePointsContext);
  const past12CyclesRecord = useContext(Past12CyclesRecords);
  const totalConfirmed = useContext(TotalConfirmedContext);
  const setPast12CyclesRecord = useContext(SetPast12CyclesRecords);
  const setUnconfirmedRecords = useContext(SetUnconfirmedRecordsContext);

  const [amount, setAmount] = useState<string>('');
  const [unConfirmedLocation, setUnConfirmedLocation] = useState<Category | null>(null);

  return <div className="flex flex-col gap-2">
    <Input
      type="text"
      value={amount}
      placeholder="金额"
      onChange={handleInputChange}
    />
    { past12CyclesRecord.length > 0 && <div className="flex flex-col gap-2">
      {
        categorys.map((category) => (
          <MoneyRecorderButton
            key={category}
            category={category}
            onClick={setUnConfirmedRecord}
            onLongPress={handleAddRecord}
          />
        ))
      }
    </div>}
    <div className="text-muted-foreground text-xs leading-none">
      {new Date(slicePoints[11]).toLocaleDateString() + ' - 至今'}
    </div>
    <div className="text-lg font-bold leading-none">
      <span>总计：</span>
      <span>{totalConfirmed}</span>
    </div>
  </div>

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const amount = e.target.value;
    if (Number(amount) >= 0) {
      setAmount(amount);
      if (unConfirmedLocation) {
        setUnconfirmedRecords({
          amount,
          category: unConfirmedLocation,
        });
      }
    }
  }

  function setUnConfirmedRecord(category: Category) {
    if (!amount) {
      return;
    }

    setUnConfirmedLocation(category);
    setUnconfirmedRecords({ amount, category });
  }

  function handleAddRecord(category: Category, amount: number) {
    setUnconfirmedRecords(null);
    setPast12CyclesRecord(prev => [...prev, {
      timeStamp: new Date().getTime(),
      amount: Number(amount),
      category,
      removed: false,
    }]);
    

    setAmount('');
    setUnConfirmedLocation(null);
  }
};