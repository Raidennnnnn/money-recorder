type PaymentRecordDeprecated = {
  confirmed: number;
  unconfirmed: string;
}

export type PaymentRecord = {
  confirmed: {
    timeStamp: number;
    amount: number;
  }[];
  unconfirmed: string;
}

export type PaymentRecordUnion = PaymentRecordDeprecated | PaymentRecord;

export enum Category {
  CLOTH,
  EAT,
  ENTERTAINMENT,
  TRANSPORTATION,
  HEALTH,
  DAILY,
  OTHER,
}

export type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type PaymentRecords = Record<Category, PaymentRecord>;
export type AllPaymentRecords = [Month, PaymentRecords][];
export type PaymentRecordsUnion = Record<Category, PaymentRecordUnion>;
export type AllPaymentRecordsUnion = [Month, PaymentRecordsUnion][];
