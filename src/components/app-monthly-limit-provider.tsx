import { useState } from "react";
import { AppMonthlyLimitContext } from "./app-monthly-limit-context";

export default function AppMonthlyLimitProvider({ children }: { children: React.ReactNode }) {
  const [monthlyLimit, setMonthlyLimit] = useState<number>(
    Number(localStorage.getItem('app-monthly-limit')) || 3000
  );

  const value = {
    monthlyLimit,
    setMonthlyLimit: (monthlyLimit: number) => {
      localStorage.setItem('app-monthly-limit', monthlyLimit.toString());
      setMonthlyLimit(monthlyLimit);
    },
  }

  return <AppMonthlyLimitContext.Provider value={value}>
    {children}
  </AppMonthlyLimitContext.Provider>
}