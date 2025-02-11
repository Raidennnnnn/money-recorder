import { AllPaymentRecords } from "@/types";
import { useState, useEffect, useMemo } from "react";
import { defaultPast12MonthRecords, thisMonth, defaultRecords, Past12MonthRecordsContext, SetPast12MonthRecordsContext, RecordContext, TotalConfirmedContext } from "./record-context";

export function RecordsProviders({children}: {children: React.ReactNode}) {
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

  return <Past12MonthRecordsContext.Provider value={past12MonthRecords}>
    <SetPast12MonthRecordsContext.Provider value={setPast12MonthRecords}>
      <RecordContext.Provider value={thisMonthRecords}>
        <TotalConfirmedContext.Provider value={totalConfirmed}>
          {children}
        </TotalConfirmedContext.Provider>
      </RecordContext.Provider>
    </SetPast12MonthRecordsContext.Provider>
  </Past12MonthRecordsContext.Provider>
}