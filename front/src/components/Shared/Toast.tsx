import { useEffect } from 'react';
import type { Toast as ToastType } from '../../types';
import { TOAST_DURATION } from '../../utils/constants';

interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

export function Toast({ toast, onClose }: ToastProps) {
  useEffect(() => {
    const duration = toast.duration || TOAST_DURATION.DEFAULT;
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, duration);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onClose]);

  return (
    <div className={`toast toast--${toast.type}`}>
      <p className="toast-message">{toast.message}</p>
      <button className="toast-close" onClick={() => onClose(toast.id)}>
        ×
      </button>
    </div>
  );
}