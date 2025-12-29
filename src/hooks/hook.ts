import { useCallback, useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number = 300) => {
  const [debounce, setDebounce] = useState<T>(value);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => clearTimeout(timeOut);
  }, [value, delay]);

  return debounce;
};

export const useModalState = (value: boolean = false) => {
  const [open, setIsOpen] = useState(value);
  const onOpenChange = useCallback((open: boolean) => setIsOpen(open), []);

  return {
    open,
    onOpenChange,
  };
};
