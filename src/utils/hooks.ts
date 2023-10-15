import { useEffect, useState } from 'react';
import throttle from 'lodash.throttle';

/**
 * A custom hook that helps track and expose helpful values/properties related to page scrolling. The scroll listener is added on mount and removed on unmount. The listener is throttled to prevent extraneous calls to the listener.
 *
 * @returns {Object} an object containing helpful values related to scrolling, such as isAtBottomOfPage, scrollY, innerHeight
 */
export const useScrollHelpers = () => {
  const [isAtBottomOfPage, setIsAtBottomOfPage] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [innerHeight, setInnerHeight] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const pageBottomOffset = 200; // update this value to adjust when "bottom of page" should be detected

  const listener = () => {
    const scrollHeight = window.innerHeight + window.scrollY;
    const clientHeight = document.body.clientHeight;

    setIsAtBottomOfPage(scrollHeight + pageBottomOffset >= clientHeight);
    setScrollY(window.scrollY);
    setInnerHeight(window.innerHeight);
    setIsScrolled(window.scrollY > 140);
  };

  const throttledListener = throttle(listener, 100);

  useEffect(() => {
    window.addEventListener('scroll', throttledListener);

    return () => {
      window.removeEventListener('scroll', throttledListener);
    };
  }, []);

  return { isAtBottomOfPage, isScrolled, scrollY, innerHeight };
};
