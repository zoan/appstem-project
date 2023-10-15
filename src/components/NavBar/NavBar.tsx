import { useEffect } from 'react';
import { useScrollHelpers } from '@/utils/hooks';

export const NavBar = () => {
  const { isScrolled } = useScrollHelpers();

  return (
    <div
      className={`${
        !isScrolled ? 'nav-hidden' : ''
      } fixed w-screen h-[6rem] top-0 backdrop-blur-md bg-glass shadow-lg transition ease-in-out duration-200 visible opacity-100 z-10`}
    ></div>
  );
};

export default NavBar;
