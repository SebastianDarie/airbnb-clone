import { RefObject, useEffect } from 'react';

// const OverrideContext = React.createContext(
//   (isClickedInside: boolean) => !isClickedInside
// );

// export const useClickOutside = (callback: (arg0: any) => any) => {
//   const isClickedInside = useRef(false);
//   const isClickedOutside = useContext(OverrideContext);

//   const handleDocumentMouseDown = useCallback(
//     (e) =>
//       (isClickedInside.current = !isClickedOutside(isClickedInside.current)),
//     [isClickedInside, isClickedOutside]
//   );

//   const handleDocumentMouseUp = useCallback(
//     (e) =>
//       isClickedInside.current ? (isClickedInside.current = false) : callback(e),
//     [callback, isClickedInside]
//   );

//   useEffect(() => {
//     document.addEventListener('mousedown', handleDocumentMouseDown);
//     document.addEventListener('mouseup', handleDocumentMouseUp);
//     return () => {
//       document.removeEventListener('mousedown', handleDocumentMouseDown);
//       document.removeEventListener('mouseup', handleDocumentMouseUp);
//     };
//   }, [handleDocumentMouseDown, handleDocumentMouseUp]);

//   return useCallback(() => {
//     isClickedInside.current = true;
//   }, [isClickedInside]);
// };

export const useOnClickOutside = (
  ref: RefObject<any>,
  exception: RefObject<any>,
  handler: (e: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        !ref.current ||
        ref.current.contains(event.target) ||
        exception.current.contains(event.target)
      ) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, exception, handler]);
};

function useClickAway<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return;
      }

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
