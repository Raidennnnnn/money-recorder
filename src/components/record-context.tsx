import { Category, AllPaymentRecords, PaymentRecordV2 } from "@/types";
import { createContext } from "react";

// export const defaultRecords: PaymentRecords = {
//   [Category.EAT]: {
//     confirmed: [],
//     unconfirmed: '',
//   },
//   [Category.CLOTH]: {
//     confirmed: [],
//     unconfirmed: '',
//   },
//   [Category.ENTERTAINMENT]: {
//     confirmed: [],
//     unconfirmed: '',
//   },
//   [Category.TRANSPORTATION]: {
//     confirmed: [],
//     unconfirmed: '',
//   },
//   [Category.HEALTH]: {
//     confirmed: [],
//     unconfirmed: '',
//   },
//   [Category.DAILY]: {
//     confirmed: [],
//     unconfirmed: '',
//   },
//   [Category.OTHER]: {
//     confirmed: [],
//     unconfirmed: '',
//   },
// }

export const defaultRecordsV2: PaymentRecordV2 = {
  confirmed: [],
  unconfirmed: null
}

// export const thisMonth = new Date().getMonth() as Month;
// export const defaultPast12MonthRecords: AllPaymentRecords = function () {
//   const allRecords = localStorage.getItem('allRecords');
//   if (!allRecords) {
//     return [];
//   }

//   const parsedRecords = JSON.parse(allRecords) as AllPaymentRecordsUnion;
//   const result = parsedRecords.map(([month, records]) => {
//     Object.entries(records).forEach(([, record]) => {
//       if (typeof record.confirmed === 'number') {
//         record.confirmed = [{
//           timeStamp: new Date(new Date().getFullYear(), month).getTime(),
//           amount: record.confirmed,
//           removed: false,
//         }];
//       }
//     });
//     return [month, {
//       ...defaultRecords,
//       ...records,
//     }] as [Month, PaymentRecords];
//   });
//   return result;
// }();

export const defaultPast12MonthRecordsV2: PaymentRecordV2 = getPaymentRecordsV2();

export const PaymentRecordsV2Context = createContext<PaymentRecordV2>(defaultPast12MonthRecordsV2);
export const SetPaymentRecordsV2Context = createContext<React.Dispatch<React.SetStateAction<PaymentRecordV2>>>(() => {});
export const CurrentCycleRecordsContext = createContext<PaymentRecordV2>(defaultRecordsV2);

// export const Past12MonthRecordsContext = createContext<AllPaymentRecords>(defaultPast12MonthRecords);
// export const SetPast12MonthRecordsContext = createContext<React.Dispatch<React.SetStateAction<AllPaymentRecords>>>(() => {});
// export const RecordContext = createContext<PaymentRecords>(defaultRecords);
export const TotalConfirmedContext = createContext<number>(0);

function getPaymentRecordsV2() {
  const allRecords = localStorage.getItem('allRecords');
  if (!allRecords) {
    return defaultRecordsV2;
  }

  const parsedRecords = JSON.parse(allRecords) as AllPaymentRecords | PaymentRecordV2;

  const isArray = Array.isArray(parsedRecords);
  const result = isArray 
    ? parsedRecords.reduce((acc, curr) => {    
      const [, records] = curr;
      const result = Object.entries(records).flatMap(([category, record]) => {
      return record.confirmed.map(r => ({ ...r, category: Number(category) as Category}))
      });
      return { ...acc, confirmed: [...acc.confirmed, ...result] }
      }, defaultRecordsV2)
    : parsedRecords;

  return result;
}
