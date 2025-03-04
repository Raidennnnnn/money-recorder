// import { Category, AllPaymentRecords, PaymentRecordV2 } from "@/types";
// import { createContext } from "react";

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

// export const defaultRecordsV2: PaymentRecordV2 = {
//   confirmed: [],
//   unconfirmed: null
// }

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

// export const slicePoints = getSlicePoints(localStorage.getItem('selected-day') || '1');
// export const defaultPast12MonthRecordsV2: PaymentRecordV2 = getPaymentRecordsV2();

// export const SelectedDayContext = createContext<string>(localStorage.getItem('selected-day') || '1');
// export const SetSelectedDayContext = createContext<React.Dispatch<React.SetStateAction<string>>>(() => {});
// export const PaymentRecordsV2Context = createContext<PaymentRecordV2>(defaultPast12MonthRecordsV2);
// export const SetPaymentRecordsV2Context = createContext<React.Dispatch<React.SetStateAction<PaymentRecordV2>>>(() => {});
// export const CurrentCycleRecordsContext = createContext<PaymentRecordV2['confirmed']>([]);
// export const UnconfirmedRecordsContext = createContext<PaymentRecordV2['unconfirmed']>(null);

// export const Past12MonthRecordsContext = createContext<AllPaymentRecords>(defaultPast12MonthRecords);
// export const SetPast12MonthRecordsContext = createContext<React.Dispatch<React.SetStateAction<AllPaymentRecords>>>(() => {});
// export const RecordContext = createContext<PaymentRecords>(defaultRecords);
// export const TotalConfirmedContext = createContext<number>(0);

// export function getSlicePoints(selectedDay: string) {
//   const today = new Date().getDate();
//   const currentMonth = new Date().getMonth();
//   const currentYear = new Date().getFullYear();

//   const slicePoints: number[] = [];
//   let month = Number(selectedDay) > today 
//     ? currentMonth - 1 < 0
//       ? 11
//       : currentMonth -1
//     : currentMonth;
//   let year = month > currentMonth ? currentYear - 1 : currentYear;
//   while (slicePoints.length < 12) {
//     slicePoints.push(new Date(year, month, Number(selectedDay)).getTime());
//     month--;
//     if (month < 0) {
//       month = 11;
//       year--;
//     }
//   }

//   return slicePoints.reverse();
// }

// function getPaymentRecordsV2() {
//   const allRecords = localStorage.getItem('allRecords');
//   if (!allRecords) {
//     return defaultRecordsV2;
//   }

//   const parsedRecords = JSON.parse(allRecords) as AllPaymentRecords | PaymentRecordV2;

//   const isArray = Array.isArray(parsedRecords);
//   const formattedRecords = isArray 
//     ? parsedRecords.reduce((acc, curr) => {    
//       const [, records] = curr;
//       const result = Object.entries(records).flatMap(([category, record]) => {
//       return record.confirmed.map(r => ({ ...r, category: Number(category) as Category}))
//       });
//       return { ...acc, confirmed: [...acc.confirmed, ...result] }
//       }, defaultRecordsV2)
//     : parsedRecords;

//   const lastSlicePoint = slicePoints[0];
//   const result = {
//     ...formattedRecords,
//     confirmed: formattedRecords.confirmed.filter(r => r.timeStamp >= lastSlicePoint),
//   }
//   localStorage.setItem('allRecords', JSON.stringify(result));

//   return result;
// }
