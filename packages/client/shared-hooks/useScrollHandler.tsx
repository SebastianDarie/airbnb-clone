import { useState, useEffect } from "react";

export const useScrollHandler = () => {
  let unmounted = false;
  const [scroll, setScroll] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset > 1 && !unmounted) {
        setScroll(true);
      } else if (!unmounted) {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      unmounted = true;
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  return scroll;
};
