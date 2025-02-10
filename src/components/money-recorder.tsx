import { useContext, useState } from 'react';
import { Input } from './ui/input';
import MoneyRecorderButton from './money-recorder-button';
import { PaymentRecords, Category, Month } from '../types';
import { SetPast12MonthRecordsContext } from './record-context';

export default function MoneyRecorder() {
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
    <div className="flex flex-col gap-2">
      <MoneyRecorderButton
        category={Category.CLOTH}
        onClick={handlePreAddRecord}
        onLongPress={handleAddRecord}
      />
      <MoneyRecorderButton
        category={Category.EAT}
        onClick={handlePreAddRecord}
        onLongPress={handleAddRecord}
      />
      <MoneyRecorderButton
        category={Category.ENTERTAINMENT}
        onClick={handlePreAddRecord}
        onLongPress={handleAddRecord}
      />
      <MoneyRecorderButton
        category={Category.TRANSPORTATION}
        onClick={handlePreAddRecord}
        onLongPress={handleAddRecord}
      />
      <MoneyRecorderButton
        category={Category.HEALTH}
        onClick={handlePreAddRecord}
        onLongPress={handleAddRecord}
      />
      <MoneyRecorderButton
        category={Category.DAILY}
        onClick={handlePreAddRecord}
        onLongPress={handleAddRecord}
      />
      <MoneyRecorderButton
        category={Category.OTHER}
        onClick={handlePreAddRecord}
        onLongPress={handleAddRecord}
      />
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
          confirmed: records[category].confirmed + amount,
        }
      }]];
    });
    setUnConfirmedLocation(null);
    setAmount('');
  }
};