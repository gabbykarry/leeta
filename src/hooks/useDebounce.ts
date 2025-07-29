import { useEffect } from "react";

export const useDebounce = <T>(
  value: T,
  delay: number,
  callback: (value: T) => void
) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      callback(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay, callback]);
};
