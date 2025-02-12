import { flushSync } from "react-dom";
import { useNavigate } from "react-router";

export function useNavigateWithTransition() {
  const navigate = useNavigate();

  return async function handleNavigate(destination: string, ref: React.RefObject<HTMLElement | null>) {
    if (!document.startViewTransition) {
      navigate(destination);
    } else {
      const transitionClass = destination === '/' ? 'back-transition' : 'forward-transition';
      document.documentElement.classList.add('circle-transition', transitionClass);
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          navigate(destination);
        });
      });

      transition.ready.then(() => {
        if (!ref?.current) return;
        const { top, left, width, height } = ref.current.getBoundingClientRect();
        const x = left + width / 2;
        const y = top + height / 2;
        const right = window.innerWidth - left;
        const bottom = window.innerHeight - top;
        const maxRadius = Math.hypot(
          Math.max(left, right),
          Math.max(top, bottom),
        );
  
        const clipPath = destination === '/' 
          ? [`circle(${maxRadius}px at ${x}px ${y}px)`, `circle(0px at ${x}px ${y}px)`]
          : [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`]
  
        document.documentElement.animate(
          {
            clipPath,
          },
          {
            duration: 500,
            easing: destination === '/' ? 'ease-out' : 'ease-in-out',
            pseudoElement: destination === '/' ? '::view-transition-old(root)' : '::view-transition-new(root)',
          }
        );
      })
  

      try {
        await transition.finished;
      } finally {
        document.documentElement.classList.remove('circle-transition', transitionClass);
      }
    }
  }
}