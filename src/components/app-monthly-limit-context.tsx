import { createContext } from "react";

type MonthlyLimitProviderState = {
  monthlyLimit: number
  setMonthlyLimit: (monthlyLimit: number) => void
}

export const AppMonthlyLimitContext = createContext<MonthlyLimitProviderState>({
  monthlyLimit: 0,
  setMonthlyLimit: () => null,
});
