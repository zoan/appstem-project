import { useEffect, useState } from "react";

export const useDetectPageBottom = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const listener = () => {
    const scrollHeight = window.innerHeight + window.scrollY;
    const clientHeight = document.body.clientHeight;

    setIsAtBottom(scrollHeight >= clientHeight);
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  return { isAtBottom };
};
