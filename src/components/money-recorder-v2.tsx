import { useContext } from 'react';
import { Input } from './ui/input';
import MoneyRecorderButton from './money-recorder-button';
import { Category } from '../types';
import { SetPast12CyclesRecords, SetUnconfirmedRecordsContext, TotalConfirmedContext, UnconfirmedRecordsContext } from './app-records-contexts';
import { SlicePointsContext } from './app-records-contexts';

const categorys = Object.values(Category).filter((c): c is Category => !isNaN(Number(c)));

export default function MoneyRecorderV2() {
  const slicePoints = useContext(SlicePointsContext);
  const totalConfirmed = useContext(TotalConfirmedContext);
  const unconfirmedRecords = useContext(UnconfirmedRecordsContext);
  const setPast12CyclesRecord = useContext(SetPast12CyclesRecords);
  const setUnconfirmedRecords = useContext(SetUnconfirmedRecordsContext);

  return <div className="flex flex-col gap-2">
    <div className="flex flex-col gap-2">
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
    </div>
    <div className='flex gap-2 items-start'>
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
    </div>
  </div>

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const amount = e.target.value;
    if (Number(amount) < 0) return;

    setUnconfirmedRecords(prev => prev ? { ...prev, amount } : { amount, category: null });
  }

  function setUnConfirmedRecord(category: Category) {
    setUnconfirmedRecords(prev => ({...prev, category}));
  }

  function handleAddRecord(category: Category, amount: number) {
    setUnconfirmedRecords({ amount: '', category: null });
    setPast12CyclesRecord(prev => [...prev, {
      timeStamp: new Date().getTime(),
      amount: Number(amount),
      category,
      removed: false,
    }]);
  }
};