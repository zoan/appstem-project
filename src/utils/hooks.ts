import { useEffect, useState } from "react";
import throttle from "lodash.throttle";

export const useScrollHelpers = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);

  const listener = () => {
    const scrollHeight = window.innerHeight + window.scrollY;
    const clientHeight = document.body.clientHeight;

    setIsAtBottom(scrollHeight >= clientHeight);
    setScrollY(window.scrollY);
    setInnerHeight(window.innerHeight);
  };

  const throttledListener = throttle(listener, 300);

  useEffect(() => {
    window.addEventListener("scroll", throttledListener);

    return () => {
      window.removeEventListener("scroll", throttledListener);
    };
  }, []);

  return { isAtBottom, scrollY, innerHeight };
};
