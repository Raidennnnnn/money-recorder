import { flushSync } from "react-dom";
import { useNavigate } from "react-router";

export function useNavigateWithTransition() {
  const navigate = useNavigate();

  return function handleNavigate(destination: string) {
    if (!document.startViewTransition) {
      navigate(destination);
    } else {
      document.startViewTransition(() => {
        flushSync(() => {
          navigate(destination);
        });
      });
    }
  }
}