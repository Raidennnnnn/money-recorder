import { useState } from "react";
import { AppInputLayoutContext } from "./app-input-layout-context";

export default function AppInputLayoutProvider({ children }: { children: React.ReactNode }) {
  const [inputLayout, setInputLayout] = useState<'up' | 'down'>('down');

  const value = {
    inputLayout,
    setInputLayout: (inputLayout: 'up' | 'down') => {
      localStorage.setItem('app-input-layout', inputLayout);
      setInputLayout(inputLayout);
    },
  }

  return <AppInputLayoutContext.Provider value={value}>
    {children}
  </AppInputLayoutContext.Provider>
}
