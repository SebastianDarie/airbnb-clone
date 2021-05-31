import { useState, useEffect } from 'react';

export const useScrollHandler = () => {
  const [scroll, setScroll] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset > 1) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  return scroll;
};
