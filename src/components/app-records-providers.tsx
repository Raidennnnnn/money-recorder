import { useEffect, useMemo, useState } from "react";
import { CurrentCycleRecordsContext, defaultPast12MonthRecordsV2, getSlicePoints, PaymentRecordsV2Context, SelectedDayContext, SetPaymentRecordsV2Context, SetSelectedDayContext, TotalConfirmedContext, UnconfirmedRecordsContext, SlicePointsContext, AllPaymentRecordsSplitByCycleContext } from "./app-records-contexts";
import { PaymentRecordV2 } from "@/types";

export function AppRecordsProviders({children}: {children: React.ReactNode}) {
  const [selectedDay, setSelectedDay] = useState<string>(localStorage.getItem('selected-day') || '1');
  const [slicePoints, setSlicePoints] = useState<number[]>(getSlicePoints(selectedDay));
  const [allPaymentRecords, setAllPaymentRecords] = useState<PaymentRecordV2>(defaultPast12MonthRecordsV2);

  useEffect(() => {
    setSlicePoints(getSlicePoints(selectedDay));
  }, [selectedDay])

  useEffect(() => {
    const slicePoint = slicePoints[0];
    setAllPaymentRecords((prev) => {
      return {
        ...prev,
        confirmed: prev.confirmed.filter((record) => record.timeStamp >= slicePoint),
      };
    });
  }, [slicePoints])

  useEffect(() => {
    localStorage.setItem('allRecords', JSON.stringify(allPaymentRecords));
  }, [allPaymentRecords]);

  const allPaymentRecordsSplitByCycle = useMemo(() => {
    return slicePoints.map((slicePoint, index) => {
      const nextSlicePoint = index < slicePoints.length - 1 ? slicePoints[index + 1] : Infinity;
      return allPaymentRecords.confirmed.filter(
        (record) => record.timeStamp >= slicePoint && record.timeStamp < nextSlicePoint
      );
    });
  }, [allPaymentRecords.confirmed, slicePoints]);

  const thisCycleRecords: PaymentRecordV2['confirmed'] = useMemo(() => 
    allPaymentRecordsSplitByCycle[11],
    [allPaymentRecordsSplitByCycle]
  );

  const unconfirmedRecords = useMemo(() => {
    return allPaymentRecords.unconfirmed;
  }, [allPaymentRecords]);

  const totalConfirmedInThisCycle = useMemo(() => {
    return thisCycleRecords.reduce((acc, record) => acc + (record.removed ? 0 : record.amount), 0);
  }, [thisCycleRecords]);

  return <PaymentRecordsV2Context.Provider value={allPaymentRecords}>
    <SetPaymentRecordsV2Context.Provider value={setAllPaymentRecords}>
      <AllPaymentRecordsSplitByCycleContext.Provider value={allPaymentRecordsSplitByCycle}>
        <CurrentCycleRecordsContext.Provider value={thisCycleRecords}>
          <SlicePointsContext.Provider value={slicePoints}>
            <UnconfirmedRecordsContext.Provider value={unconfirmedRecords}>
              <TotalConfirmedContext.Provider value={totalConfirmedInThisCycle}>
                <SelectedDayContext.Provider value={selectedDay}>
                  <SetSelectedDayContext.Provider value={setSelectedDay}>
                    {children}
                  </SetSelectedDayContext.Provider>
                </SelectedDayContext.Provider>
              </TotalConfirmedContext.Provider>
            </UnconfirmedRecordsContext.Provider>
          </SlicePointsContext.Provider>
        </CurrentCycleRecordsContext.Provider>
      </AllPaymentRecordsSplitByCycleContext.Provider>
    </SetPaymentRecordsV2Context.Provider>
  </PaymentRecordsV2Context.Provider>
}

