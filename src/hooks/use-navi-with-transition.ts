import { flushSync } from "react-dom";
import { useNavigate } from "react-router";

export function useNavigateWithTransition() {
  const navigate = useNavigate();

  return async function handleNavigate(destination: string) {
    if (!document.startViewTransition) {
      navigate(destination);
    } else {
      const transitionClass = destination === '/' ? 'back-transition' : 'forward-transition';
      document.documentElement.classList.add(transitionClass);

      const button = document.querySelector('.float-button-container');
      if (button) {
        console.log('button', button);
        (button as HTMLButtonElement).style.viewTransitionName = 'float-button-container';
      }

      const transition = document.startViewTransition(() => {
        flushSync(() => {
          navigate(destination);
        });
      });
  

      try {
        await transition.finished;
      } finally {
        document.documentElement.classList.remove(transitionClass);
        if (button) {
          (button as HTMLButtonElement).style.viewTransitionName = '';
        }
      }
    }
  }
}