import { useRef, useEffect } from "react";

// todo: add dependencies
export default function useDebounce<T extends (...args: any[]) => void>(
  fuc: T,
  delay: number
) {
  let timeId = useRef<NodeJS.Timeout>(undefined);

  const debonceFunc = (...args: any[]) => {
    clearTimeout(timeId.current);

    timeId.current = setTimeout(() => {
      fuc(...args);
    }, delay);
  };

  useEffect(() => {
    // The cleanup function inside useEffect will execute once, when the component unmounts.
    return () => clearTimeout(timeId.current);
  }, []);

  return debonceFunc;
}
