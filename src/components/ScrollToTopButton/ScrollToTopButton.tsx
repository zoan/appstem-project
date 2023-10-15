import { scrollToTop } from '@/utils/helpers';

import { useScrollHelpers } from '@/utils/hooks';

export const ScrollToTopButton = () => {
  const { isScrolled } = useScrollHelpers();

  return (
    <div
      className={`${
        !isScrolled ? 'to-top-button-hidden' : ''
      } fixed flex items-center justify-center cursor-pointer bottom-5 right-5 w-[5rem] h-[5rem] bg-white text-white border-black-2 text-4xl rounded-full shadow-lg transition-all ease-in-out duration-200`}
      onClick={scrollToTop}
    >
      ⬆️
    </div>
  );
};

export default ScrollToTopButton;
