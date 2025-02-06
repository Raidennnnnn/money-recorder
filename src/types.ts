type ConfirmedRecord = {
  id: number;
  amount: number;
}

export type PaymentRecord = {
  confirmed: ConfirmedRecord[];
  unconfirmed: string;
}

export enum Category {
  EAT,
  CLOTH,
  ENTERTAINMENT,
  TRANSPORTATION,
}

export type PaymentRecords = Record<Category, PaymentRecord>;
