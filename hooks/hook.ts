import { useCallback, useEffect, useState } from "react";

export const useDebounce = <T>(value: T) => {
  const [debounce, setDebounce] = useState<T>(value);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounce(value);
    }, 500);

    return () => clearTimeout(timeOut);
  }, [value, 500]);

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
