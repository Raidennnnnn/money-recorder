import { PaymentRecords, Category, AllPaymentRecords, Month } from "@/types";
import { createContext } from "react";

export const defaultRecords: PaymentRecords = {
  [Category.EAT]: {
    confirmed: 0,
    unconfirmed: '',
  },
  [Category.CLOTH]: {
    confirmed: 0,
    unconfirmed: '',
  },
  [Category.ENTERTAINMENT]: {
    confirmed: 0,
    unconfirmed: '',
  },
  [Category.TRANSPORTATION]: {
    confirmed: 0,
    unconfirmed: '',
  },
}

export const thisMonth = new Date().getMonth() as Month;
export const defaultPast12MonthRecords: AllPaymentRecords = localStorage.getItem('allRecords') 
  ? JSON.parse(localStorage.getItem('allRecords') as string) 
  : [];

export const Past12MonthRecordsContext = createContext<AllPaymentRecords>(defaultPast12MonthRecords);
export const SetPast12MonthRecordsContext = createContext<React.Dispatch<React.SetStateAction<AllPaymentRecords>>>(() => {});
export const RecordContext = createContext<PaymentRecords>(defaultRecords);
export const TotalConfirmedContext = createContext<number>(0);
