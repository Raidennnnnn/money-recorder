import { useEffect, useMemo, useState } from "react";
import { CurrentCycleRecordsContext, defaultPast12MonthRecordsV2, PaymentRecordsV2Context, SetPaymentRecordsV2Context, TotalConfirmedContext } from "./record-context";
import { Month, PaymentRecordV2 } from "@/types";

export function AppRecordsProviders({children}: {children: React.ReactNode}) {
  const [allPaymentRecords, setAllPaymentRecords] = useState<PaymentRecordV2>(defaultPast12MonthRecordsV2);

  useEffect(() => {
    const thisYear = new Date().getFullYear();
    const thisMonth = new Date().getMonth() as Month;
    const selectedDay = localStorage.getItem('selected-day') || '1';
    const slicePoint = new Date(thisYear - 1, thisMonth, Number(selectedDay)).getTime();

    setAllPaymentRecords((prev) => {
      return {
        ...prev,
        confirmed: prev.confirmed.filter((record) => record.timeStamp >= slicePoint),
      };
    });
  }, [])

  useEffect(() => {
    localStorage.setItem('allRecords', JSON.stringify(allPaymentRecords));
  }, [allPaymentRecords]);

  const thisCycleStartPoint = getThisCycleStartPoint();
  const thisCycleRecords: PaymentRecordV2 = useMemo(() => ({
    confirmed: allPaymentRecords.confirmed.filter((record) => {
      return record.timeStamp >= thisCycleStartPoint;
    }),
    unconfirmed: allPaymentRecords.unconfirmed
  }), [allPaymentRecords, thisCycleStartPoint]);

  const totalConfirmedInThisCycle = useMemo(() => {
    return thisCycleRecords.confirmed.reduce((acc, record) => acc + (record.removed ? 0 : record.amount), 0);
  }, [thisCycleRecords]);

  return <PaymentRecordsV2Context.Provider value={allPaymentRecords}>
    <SetPaymentRecordsV2Context.Provider value={setAllPaymentRecords}>
      <CurrentCycleRecordsContext.Provider value={thisCycleRecords}>
        <TotalConfirmedContext.Provider value={totalConfirmedInThisCycle}>
          {children}
        </TotalConfirmedContext.Provider>
      </CurrentCycleRecordsContext.Provider>
    </SetPaymentRecordsV2Context.Provider>
  </PaymentRecordsV2Context.Provider>
}

function getThisCycleStartPoint() {
  const thisYear = new Date().getFullYear();
  const thisMonth = new Date().getMonth() as Month;
  const thisDate = new Date().getDate();
  const selectedDay = localStorage.getItem('selected-day') || '1';

  if (thisDate >= Number(selectedDay)) {
      return new Date(thisYear, thisMonth, Number(selectedDay)).getTime();
  }

  return new Date(thisYear, thisMonth - 1, Number(selectedDay)).getTime();
}

