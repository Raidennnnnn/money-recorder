/**
 * @deprecated
 */
export type PaymentRecordDeprecated = {
  confirmed: number;
  unconfirmed: string;
}

/**
 * @deprecated
 */
export type PaymentRecordV2Deprecated = {
  confirmed: {
    timeStamp: number;
    amount: number;
    removed: boolean;
  }[];
  unconfirmed: string;
}

export enum Category {
  CLOTH,
  EAT,
  ENTERTAINMENT,
  TRANSPORTATION,
  HEALTH,
  DAILY,
  OTHER,
}

/**
 * @deprecated
 */
export type PaymentRecordV3 = {
  confirmed: {
    timeStamp: number;
    amount: number;
    removed: boolean;
    category: Category
  }[]
  unconfirmed: {
    amount: string;
    category: Category;
  } | null
}

export type ConfirmedPaymentRecord = {
  timeStamp: number;
  amount: number;
  removed: boolean;
  category: Category
  description?: string;
}

export type UnConfirmedPaymentRecord = {
  amount: string;
  category: Category | null;
  description?: string;
}

// export type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

// export type PaymentRecords = Record<Category, PaymentRecord>;
// export type AllPaymentRecords = [Month, PaymentRecords][];

// export type PaymentRecordsUnion = Record<Category, PaymentRecord | PaymentRecordDeprecated>;
// export type AllPaymentRecordsUnion = [Month, PaymentRecordsUnion][];
