import { useEffect, useMemo, useState } from "react";
import { CurrentCycleRecordsContext, SelectedDayContext, SetSelectedDayContext, TotalConfirmedContext, UnconfirmedRecordsContext, SlicePointsContext, SetPast12CyclesRecords, RecordsSplitByCycleContext, getPaymentRecordsV3, SetUnconfirmedRecordsContext } from "./app-records-contexts";
import { ConfirmedPaymentRecord } from "@/types";
import { getSlicePoints } from "@/lib/get-slice-points";

export function AppRecordsProviders({children}: {children: React.ReactNode}) {
  const [selectedDay, setSelectedDay] = useState<string>(localStorage.getItem('selected-day') || '1');
  const [slicePoints, setSlicePoints] = useState<number[]>(getSlicePoints(selectedDay));

  const [defaultConfirmed, unConfirmed] = getPaymentRecordsV3();
  const [confirmedPaymentRecords, setConfirmedPaymentRecords] = useState(defaultConfirmed);
  const [unconfirmedPaymentRecord, setUnConfirmedPaymentRecord] = useState(unConfirmed);

  useEffect(() => {
    setSlicePoints(getSlicePoints(selectedDay));
  }, [selectedDay])

  useEffect(() => {
    const slicePoint = slicePoints[0];
    setConfirmedPaymentRecords((prev) => {
      return prev.filter((record) => record.timeStamp >= slicePoint);
    });
  }, [slicePoints])

  useEffect(() => {
    localStorage.setItem('all-confirmed-payment-records', JSON.stringify(confirmedPaymentRecords));
  }, [confirmedPaymentRecords]);

  useEffect(() => {
    localStorage.setItem('un-confirmed-payment-record', JSON.stringify(unconfirmedPaymentRecord));
  }, [unconfirmedPaymentRecord]);

  const allPaymentRecordsSplitByCycle = useMemo(() => {
    return slicePoints.map((slicePoint, index) => {
      const nextSlicePoint = index < slicePoints.length - 1 ? slicePoints[index + 1] : Infinity;
      return confirmedPaymentRecords.filter(
        (record) => record.timeStamp >= slicePoint && record.timeStamp < nextSlicePoint
      );
    });
  }, [confirmedPaymentRecords, slicePoints]);

  const thisCycleRecords: ConfirmedPaymentRecord[] = useMemo(() => 
    allPaymentRecordsSplitByCycle[11],
    [allPaymentRecordsSplitByCycle]
  );

  const totalConfirmedInThisCycle = useMemo(() => {
    return thisCycleRecords.reduce((acc, record) => acc + (record.removed ? 0 : record.amount), 0);
  }, [thisCycleRecords]);

  return <SetPast12CyclesRecords.Provider value={setConfirmedPaymentRecords}>
    <UnconfirmedRecordsContext.Provider value={unconfirmedPaymentRecord}>
      <SetUnconfirmedRecordsContext.Provider value={setUnConfirmedPaymentRecord}>
        <RecordsSplitByCycleContext.Provider value={allPaymentRecordsSplitByCycle}>
          <CurrentCycleRecordsContext.Provider value={thisCycleRecords}>
            <SlicePointsContext.Provider value={slicePoints}>
            <TotalConfirmedContext.Provider value={totalConfirmedInThisCycle}>
              <SelectedDayContext.Provider value={selectedDay}>
                <SetSelectedDayContext.Provider value={setSelectedDay}>
                  {children}
                </SetSelectedDayContext.Provider>
              </SelectedDayContext.Provider>
              </TotalConfirmedContext.Provider>
            </SlicePointsContext.Provider>
          </CurrentCycleRecordsContext.Provider>
        </RecordsSplitByCycleContext.Provider>
      </SetUnconfirmedRecordsContext.Provider>
    </UnconfirmedRecordsContext.Provider>
  </SetPast12CyclesRecords.Provider>;
}

