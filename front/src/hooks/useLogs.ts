/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from 'react';
import * as logsService from '../services/logsService';
import type { ApiError, SyncLog } from '../types';

export function useLogs() {
  const [logs, setLogs] = useState<SyncLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadLogs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await logsService.getLogs();
      const sorted = [...data].sort((a, b) => {
        return new Date(b.executedAt).getTime() - new Date(a.executedAt).getTime();
      });
      setLogs(sorted);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Error al cargar logs');
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  const addLog = useCallback((log: SyncLog) => {
    setLogs((prev) => [log, ...prev]);
  }, []);

  return {
    logs,
    loading,
    error,
    loadLogs,
    addLog,
  };
}