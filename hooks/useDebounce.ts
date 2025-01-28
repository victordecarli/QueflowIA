import { useCallback, useRef } from 'react';

export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const lastValueRef = useRef<any>(undefined);

  return useCallback((...args: Parameters<T>) => {
    // If the value hasn't changed, don't schedule a new update
    if (JSON.stringify(args) === JSON.stringify(lastValueRef.current)) {
      return;
    }
    
    lastValueRef.current = args;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
}
