import { useCallback, useState } from 'react';
import type { Toast } from '../types';
import { generateId } from '../utils/formatters';

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((
    message: string,
    type: 'success' | 'error' | 'info' = 'info',
    duration?: number
  ) => {
    const id = generateId();
    const toast: Toast = { id, message, type, duration };
    setToasts((prev) => [...prev, toast]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}