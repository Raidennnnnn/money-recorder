import { useEffect, useMemo, useState, Suspense, lazy } from 'react'
import MoneyRecorder from './components/money-recorder'
import './App.css'
import { Past12MonthRecordsContext, RecordContext, SetPast12MonthRecordsContext, TotalConfirmedContext, defaultPast12MonthRecords, defaultRecords, thisMonth } from './components/record-context';
import { AllPaymentRecords } from './types';

const Past12MonthChart = lazy(() => import('./components/past-12-month-chart'));

export default function App() {
  const [past12MonthRecords, setPast12MonthRecords] = useState<AllPaymentRecords>([]);

  useEffect(() => {
    const recordsLength = defaultPast12MonthRecords.length;
    const latest = defaultPast12MonthRecords[recordsLength - 1];

    if (!latest) {
      setPast12MonthRecords([[thisMonth, defaultRecords]]);
      return;
    }

    if (latest[0] !== thisMonth) {
      const p = recordsLength === 12 ? defaultPast12MonthRecords.slice(1) : defaultPast12MonthRecords;
      setPast12MonthRecords([...p, [thisMonth, defaultRecords]]);
      return;
    }

    setPast12MonthRecords(defaultPast12MonthRecords);
  }, []);

  useEffect(() => {
    if (past12MonthRecords.length === 0) {
      return;
    }

    localStorage.setItem('allRecords', JSON.stringify(past12MonthRecords));
  }, [past12MonthRecords]);

  const thisMonthRecords = useMemo(() => {
    const latest = past12MonthRecords[past12MonthRecords.length - 1];
    return latest ? latest[1] : defaultRecords;
  }, [past12MonthRecords]);

  const totalConfirmed = useMemo(() => {
    return Object
      .values(thisMonthRecords)
      .reduce((acc, record) => acc + record.confirmed.reduce((acc, record) => acc + record.amount, 0), 0);
  }, [thisMonthRecords]);

  return (
    <Past12MonthRecordsContext.Provider value={past12MonthRecords}>
      <SetPast12MonthRecordsContext.Provider value={setPast12MonthRecords}>
        <RecordContext.Provider value={thisMonthRecords}>
            <TotalConfirmedContext.Provider value={totalConfirmed}>
              <MoneyRecorder />
              <div className="mt-4 mb-2 text-xl font-bold">Past 12 Month</div>
              <Suspense fallback={<div className="w-full h-48 bg-gray-200 rounded-md"></div>}>
                <Past12MonthChart />
              </Suspense>
            </TotalConfirmedContext.Provider> 
        </RecordContext.Provider>
      </SetPast12MonthRecordsContext.Provider>
    </Past12MonthRecordsContext.Provider>
  )
}