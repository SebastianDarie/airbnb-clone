import { useState, useCallback } from 'react';

export const useToggle = (initialState: boolean): [boolean, () => void] => {
  const [isToggled, setIsToggled] = useState<boolean>(initialState);

  const toggle = useCallback(() => setIsToggled((state) => !state), [
    setIsToggled,
  ]);

  return [isToggled, toggle];
};
