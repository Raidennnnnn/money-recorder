import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import MoneyRecorderButton from './money-recorder-button';
import { PaymentRecords, Category } from '../types';

export default function MoneyRecorder() {
  const [amount, setAmount] = useState<string>('');
  const [unConfirmedLocation, setUnConfirmedLocation] = useState<Category | null>(null);
  const [records, setRecords] = useState<PaymentRecords>({
    [Category.EAT]: {
      confirmed: [],
      unconfirmed: '',
    },
    [Category.CLOTH]: {
      confirmed: [],
      unconfirmed: '',
    },
    [Category.ENTERTAINMENT]: {
      confirmed: [],
      unconfirmed: '',
    },
    [Category.TRANSPORTATION]: {
      confirmed: [],
      unconfirmed: '',
    },
  });

  useEffect(() => {
    if (unConfirmedLocation) {
      setRecords((prev) => ({
        ...prev,
        [unConfirmedLocation]: {
          ...prev[unConfirmedLocation],
          unconfirmed: amount,
        },
      }));
    }
  }, [amount, unConfirmedLocation]);

  return <div className="flex flex-col gap-2">
    <Input
      type="text"
      value={amount}
      placeholder="金额"
      onChange={(e) => {
        const value = e.target.value;
        if (Number(value) >= 0) {
          setAmount(value);
        }
      }}
    />
    <div className="flex flex-col gap-2">
      <MoneyRecorderButton
        category={Category.CLOTH}
        records={records[Category.CLOTH]}
        onClick={() => handlePreAddRecord(Category.CLOTH)}
        onLongPress={() => handleAddRecord(Category.CLOTH)}
      />
      <MoneyRecorderButton
        category={Category.EAT}
        records={records[Category.EAT]}
        onClick={() => handlePreAddRecord(Category.EAT)}
        onLongPress={() => handleAddRecord(Category.EAT)}
      />
      <MoneyRecorderButton
        category={Category.ENTERTAINMENT}
        records={records[Category.ENTERTAINMENT]}
        onClick={() => handlePreAddRecord(Category.ENTERTAINMENT)}
        onLongPress={() => handleAddRecord(Category.ENTERTAINMENT)}
      />
      <MoneyRecorderButton
        category={Category.TRANSPORTATION}
        records={records[Category.TRANSPORTATION]}
        onClick={() => handlePreAddRecord(Category.TRANSPORTATION)}
        onLongPress={() => handleAddRecord(Category.TRANSPORTATION)}
      />
    </div>
  </div>

  function handlePreAddRecord(category: Category) {
    if (!amount) {
      return;
    }

    setUnConfirmedLocation(category);
    setRecords((prev) => {
      const newRecords = Object.entries(prev).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: {
          ...value,
          unconfirmed: Number(key) === category ? amount : '',
        },
      }), {} as PaymentRecords);
      return newRecords;
    });
  }

  function handleAddRecord(category: Category) {
    if (!amount) {
      return;
    }

    setRecords({
      ...records,
      [category]: {
        unconfirmed: '',
        confirmed: [...records[category].confirmed, { id: Date.now(), amount: Number(amount) }],
      },
    });
    setUnConfirmedLocation(null);
    setAmount('');
  }
};