import React, {
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';

const OverrideContext = React.createContext(
  (isClickedInside: boolean) => !isClickedInside
);

export const useClickOutside = (callback: (arg0: any) => any) => {
  const isClickedInside = useRef(false);
  const isClickedOutside = useContext(OverrideContext);

  const handleDocumentMouseDown = useCallback(
    (e) =>
      (isClickedInside.current = !isClickedOutside(isClickedInside.current, e)),
    [isClickedInside, isClickedOutside]
  );

  const handleDocumentMouseUp = useCallback(
    (e) =>
      isClickedInside.current ? (isClickedInside.current = false) : callback(e),
    [callback, isClickedInside]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentMouseDown);
    document.addEventListener('mouseup', handleDocumentMouseUp);
    return () => {
      document.removeEventListener('mousedown', handleDocumentMouseDown);
      document.removeEventListener('mouseup', handleDocumentMouseUp);
    };
  }, [handleDocumentMouseDown, handleDocumentMouseUp]);

  return useCallback(() => {
    isClickedInside.current = true;
  }, [isClickedInside]);
};

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
