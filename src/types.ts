export type PaymentRecord = {
  confirmed: number;
  unconfirmed: string;
}

export enum Category {
  EAT,
  CLOTH,
  ENTERTAINMENT,
  TRANSPORTATION,
  HEALTH,
  DAILY,
  OTHER,
}

export type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type PaymentRecords = Record<Category, PaymentRecord>;
export type AllPaymentRecords = [Month, PaymentRecords][];
