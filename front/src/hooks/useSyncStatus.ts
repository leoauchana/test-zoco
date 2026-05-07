import { useCallback, useState } from 'react';
import * as syncService from '../services/syncService';
import type { ApiError, SyncResponse } from '../types';

export interface SyncStatus {
  loading: boolean;
  success: boolean;
  error: string | null;
  result: SyncResponse | null;
}

export function useSyncStatus() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SyncResponse | null>(null);

  const sync = useCallback(async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);
    setResult(null);

    try {
      const syncResult = await syncService.triggerSync();
      setResult(syncResult);
      setSuccess(true);
      return syncResult;
    } catch (err) {
      const apiError = err as ApiError;
      const errorMessage = apiError.message || 'Error durante la sincronización';
      setError(errorMessage);
      setSuccess(false);
      throw new Error(errorMessage, { cause: err });
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setSuccess(false);
    setError(null);
    setResult(null);
  }, []);

  return {
    loading,
    success,
    error,
    result,
    sync,
    reset,
  };
}