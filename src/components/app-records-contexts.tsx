import { ConfirmedPaymentRecord, UnConfirmedPaymentRecord, PaymentRecordV3 } from "@/types";
import { createContext } from "react";

export const SlicePointsContext = createContext<number[]>([]);

export const SelectedDayContext = createContext<string>(localStorage.getItem('selected-day') || '1');
export const SetSelectedDayContext = createContext<React.Dispatch<React.SetStateAction<string>>>(() => {});

// export const Past12CyclesRecords = createContext<ConfirmedPaymentRecord[]>([]);
export const SetPast12CyclesRecords = createContext<React.Dispatch<React.SetStateAction<ConfirmedPaymentRecord[]>>>(() => {});
export const UnconfirmedRecordsContext = createContext<UnConfirmedPaymentRecord>({ amount: '', category: null });
export const SetUnconfirmedRecordsContext = createContext<React.Dispatch<React.SetStateAction<UnConfirmedPaymentRecord>>>(() => {});

export const RecordsSplitByCycleContext = createContext<ConfirmedPaymentRecord[][]>([]);
export const CurrentCycleRecordsContext = createContext<ConfirmedPaymentRecord[]>([]);

export const TotalConfirmedContext = createContext<number>(0);

export function getPaymentRecordsV3(): [ConfirmedPaymentRecord[], UnConfirmedPaymentRecord] {
  const allRecords = localStorage.getItem('allRecords');
  const unconfirmedRecords = localStorage.getItem('un-confirmed-payment-record');
  const confirmedRecords = localStorage.getItem('all-confirmed-payment-records');

  if (confirmedRecords && unconfirmedRecords) {
    const parsed = JSON.parse(confirmedRecords) as ConfirmedPaymentRecord[];
    const unconfirmed = JSON.parse(unconfirmedRecords) as UnConfirmedPaymentRecord | null;
    return [parsed, unconfirmed ?? { amount: '', category: null }];
  }

  if (!allRecords) {
    return [[], { amount: '', category: null }];
  }

  const parsed = JSON.parse(allRecords) as PaymentRecordV3;
  return [parsed.confirmed, parsed.unconfirmed ?? { amount: '', category: null }];
}
