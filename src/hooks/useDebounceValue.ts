import { useEffect, useState } from 'react';

export const useDebounceValue = (value: string, delay = 1000) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);

    return () => clearTimeout(handler);
  }, [delay, value]);

  return debounced;
};
