import { useEffect, useState } from 'react';
import throttle from 'lodash.throttle';

/**
 * A custom hook that helps track and expose helpful values/properties related to page scrolling. The scroll listener is added on mount and removed on unmount. The listener is throttled to prevent extraneous calls to the listener.
 *
 * @returns {Object} an object containing helpful values related to scrolling, such as isAtBottomOfPage, scrollY, innerHeight
 */
export const useScrollHelpers = () => {
  const [isAtBottomOfPage, setIsAtBottomOfPage] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);

  const listener = () => {
    const scrollHeight = window.innerHeight + window.scrollY;
    const clientHeight = document.body.clientHeight;

    setIsAtBottomOfPage(scrollHeight >= clientHeight);
    setScrollY(window.scrollY);
    setInnerHeight(window.innerHeight);
  };

  const throttledListener = throttle(listener, 100);

  useEffect(() => {
    window.addEventListener('scroll', throttledListener);

    return () => {
      window.removeEventListener('scroll', throttledListener);
    };
  }, []);

  return { isAtBottomOfPage, scrollY, innerHeight };
};
