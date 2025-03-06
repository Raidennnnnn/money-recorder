import { createContext } from "react";

type InputLayoutProviderState = {
  inputLayout: 'up' | 'down'
  setInputLayout: (inputLayout: 'up' | 'down') => void
}

export const AppInputLayoutContext = createContext<InputLayoutProviderState>({
  inputLayout: 'down',
  setInputLayout: () => null,
});
