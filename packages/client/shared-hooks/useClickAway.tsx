import { useEffect, useState, useRef, RefObject, useCallback } from 'react';

// const useClickAway = () => {
//   const [activeElement, setActiveElement] = useState<{
//     active: boolean;
//     el: string;
//   }>({
//     active: false,
//     el: '',
//   });
//   const ref = useRef<HTMLDivElement | null>(null);

//   const handleClickAway = (e: MouseEvent | TouchEvent): void => {
//     if (ref.current && !ref.current.contains(e.currentTarget as HTMLElement))
//       setActiveElement({
//         active: false,
//         el: '',
//       });
//   };

//   const toggle = (el: string) => {
//     setActiveElement({ el, active: !activeElement.active });
//   };

//   useEffect(() => {
//     if (activeElement.active) {
//       document.addEventListener('mousedown', handleClickAway);
//     } else {
//       document.removeEventListener('mousedown', handleClickAway);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickAway);
//     };
//   }, [activeElement.active]);

//   return { ref, activeElement, setActiveElement, toggle };
// };

type Event = MouseEvent | TouchEvent;

function useClickAway<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
) {
  useEffect(() => {
    const listener = (e: Event) => {
      const el = ref?.current;

      if (!el || el.contains(e.target as Node)) {
        return;
      }

      // const memoizedHandler = useCallback(
      //   (e: Event) => {
      //     handler(e);
      //   },
      //   [e]
      // );

      // memoizedHandler(e);
      handler(e);
    };

    document.addEventListener(`mousedown`, listener);
    document.addEventListener(`touchstart`, listener);

    return () => {
      document.removeEventListener(`mousedown`, listener);
      document.removeEventListener(`touchstart`, listener);
    };
  }, [ref, handler]);
}

export default useClickAway;
