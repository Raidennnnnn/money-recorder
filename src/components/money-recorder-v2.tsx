import { useContext, useState } from 'react';
import { Input } from './ui/input';
import MoneyRecorderButton from './money-recorder-button';
import { Category } from '../types';
import { PaymentRecordsV2Context, SetPaymentRecordsV2Context, TotalConfirmedContext } from './app-records-contexts';
import { SlicePointsContext } from './app-records-contexts';

const categorys = Object.values(Category).filter((c): c is Category => !isNaN(Number(c)));

export default function MoneyRecorderV2() {
  const slicePoints = useContext(SlicePointsContext);
  const allPaymentRecords = useContext(PaymentRecordsV2Context);
  const totalConfirmed = useContext(TotalConfirmedContext);
  const setAllPaymentRecords = useContext(SetPaymentRecordsV2Context);

  const [amount, setAmount] = useState<string>('');
  const [unConfirmedLocation, setUnConfirmedLocation] = useState<Category | null>(null);

  return <div className="flex flex-col gap-2">
    <Input
      type="text"
      value={amount}
      placeholder="金额"
      onChange={handleInputChange}
    />
    { allPaymentRecords.confirmed.length > 0 && <div className="flex flex-col gap-2">
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
        setAllPaymentRecords((prev) => {
          return {
            ...prev,
            unconfirmed: {
              amount,
              category: unConfirmedLocation,
            },
          };
        });
      }
    }
  }

  function setUnConfirmedRecord(category: Category) {
    if (!amount) {
      return;
    }

    setUnConfirmedLocation(category);
    setAllPaymentRecords((prev) => {
      return {
        ...prev,
        unconfirmed: { amount, category },
      };
    });
  }

  function handleAddRecord(category: Category, amount: number) {
    setAllPaymentRecords(prev => ({
      unconfirmed: null,
      confirmed: [...prev.confirmed, {
        timeStamp: new Date().getTime(),
        amount: Number(amount),
        category,
        removed: false,
      }]
    }))

    setAmount('');
    setUnConfirmedLocation(null);
  }
};