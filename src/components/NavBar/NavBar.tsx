import { useEffect, useState } from 'react';
import { useScrollHelpers } from '@/utils/hooks';

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const { scrollY } = useScrollHelpers();

  useEffect(() => {
    setIsScrolled(scrollY > 140);
  }, [scrollY]);

  return (
    <div
      className={`${
        !isScrolled ? 'nav-hidden' : ''
      } fixed w-screen h-[6rem] top-0 backdrop-blur-md bg-glass shadow-lg transition-all duration-200 visible opacity-100 z-10`}
    ></div>
  );
};

export default NavBar;
