import { PaymentRecords, Category, AllPaymentRecords, Month, AllPaymentRecordsUnion } from "@/types";
import { createContext } from "react";

export const defaultRecords: PaymentRecords = {
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
  [Category.HEALTH]: {
    confirmed: [],
    unconfirmed: '',
  },
  [Category.DAILY]: {
    confirmed: [],
    unconfirmed: '',
  },
  [Category.OTHER]: {
    confirmed: [],
    unconfirmed: '',
  },
}

export const thisMonth = new Date().getMonth() as Month;
export const defaultPast12MonthRecords: AllPaymentRecords = function () {
  const allRecords = localStorage.getItem('allRecords');
  if (!allRecords) {
    return [];
  }

  const parsedRecords = JSON.parse(allRecords) as AllPaymentRecordsUnion;
  const result = parsedRecords.map(([month, records]) => {
    Object.entries(records).forEach(([, record]) => {
      if (typeof record.confirmed === 'number') {
        record.confirmed = [{
          timeStamp: new Date(new Date().getFullYear(), month).getTime(),
          amount: record.confirmed,
        }];
      }
    });
    return [month, {
      ...defaultRecords,
      ...records,
    }] as [Month, PaymentRecords];
  });
  return result;
}();

export const Past12MonthRecordsContext = createContext<AllPaymentRecords>(defaultPast12MonthRecords);
export const SetPast12MonthRecordsContext = createContext<React.Dispatch<React.SetStateAction<AllPaymentRecords>>>(() => {});
export const RecordContext = createContext<PaymentRecords>(defaultRecords);
export const TotalConfirmedContext = createContext<number>(0);
