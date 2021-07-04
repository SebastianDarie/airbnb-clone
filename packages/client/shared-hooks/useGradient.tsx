import { MouseEvent, useCallback, useState } from 'react';

type Coords = {
  x: number;
  y: number;
};

export const useGradient = (): [
  Coords,
  (e: MouseEvent<HTMLElement>) => void
] => {
  const [coords, setCoords] = useState<Coords>({
    x: 0,
    y: 0,
  });

  const updateCoords = useCallback(
    (x: number, y: number) => {
      setCoords({ x, y });
    },
    [setCoords]
  );

  const moveHandler = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    updateCoords(x, y);
  };

  return [coords, moveHandler];
};
