import { useContext, useState } from 'react';
import { Input } from './ui/input';
import MoneyRecorderButton from './money-recorder-button';
import { PaymentRecords, Category, Month } from '../types';
import { Past12MonthRecordsContext, SetPast12MonthRecordsContext, TotalConfirmedContext } from './record-context';

const categorys = Object.values(Category).filter((c): c is Category => !isNaN(Number(c)));

export default function MoneyRecorder() {
  const past12MonthRecords = useContext(Past12MonthRecordsContext);
  const totalConfirmed = useContext(TotalConfirmedContext);
  const setPast12MonthRecords = useContext(SetPast12MonthRecordsContext);

  const [amount, setAmount] = useState<string>('');
  const [unConfirmedLocation, setUnConfirmedLocation] = useState<Category | null>(null);


  return <div className="flex flex-col gap-2">
    <Input
      type="text"
      value={amount}
      placeholder="金额"
      onChange={handleInputChange}
    />
    { past12MonthRecords.length > 0 && <div className="flex flex-col gap-2">
      {
        categorys.map((category) => (
          <MoneyRecorderButton
            key={category}
            category={category}
            onClick={handlePreAddRecord}
            onLongPress={handleAddRecord}
          />
        ))
      }
    </div>}
    <div>
      <span className="text-lg font-bold">总计：</span>
      <span className="text-lg font-bold">{totalConfirmed}</span>
    </div>
  </div>

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (Number(value) >= 0) {
      setAmount(value);
      if (unConfirmedLocation) {
        setPast12MonthRecords((prev) => {
          const [month, records] = prev.pop() as [Month, PaymentRecords];
          records[unConfirmedLocation].unconfirmed = value;
          return [...prev, [month, { ...records }]];
        });
      }
    }
  }

  function handlePreAddRecord(category: Category) {
    if (!amount) {
      return;
    }

    setUnConfirmedLocation(category);
    setPast12MonthRecords((prev) => {
      const latest = prev[prev.length - 1];
      if (!latest) {
        return prev;
      }
      const [month, records] = latest;

      return [
        ...prev.slice(0, -1), 
        [
          month, 
          Object.entries(records)
            .reduce((acc, [key, value]) => {
              acc[Number(key) as Category] = { ...value, unconfirmed: Number(key) === category ? amount : '' };
              return acc;
            }, {} as PaymentRecords)
        ]
      ]
    });
  }

  function handleAddRecord(category: Category, amount: number) {
    setPast12MonthRecords((prev) => {
      const latest = prev[prev.length - 1];
      if (!latest) {
        return prev;
      }
      const [month, records] = latest;
      return [...prev.slice(0, -1), [month, { 
        ...records,
        [category]: {
          unconfirmed: '',
          confirmed: [...records[category].confirmed, {
            timeStamp: new Date().getTime(),
            amount: Number(amount),
          }],
        }
      }]];
    });
    setUnConfirmedLocation(null);
    setAmount('');
  }
};