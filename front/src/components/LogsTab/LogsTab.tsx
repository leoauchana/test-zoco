import { useEffect } from 'react';
import { useTabContext } from '../../hooks/useTabContext';
import { useLogs } from '../../hooks/useLogs';
import { LoadingSpinner } from '../Shared/LoadingSpinner';
import { LogsList } from './LogsList';
import './LogsTab.css';

interface LogsTabProps {
  syncVersion?: number;
}

export function LogsTab({ syncVersion = 0 }: LogsTabProps) {
  const { activeTab } = useTabContext();
  const { logs, loading, error, loadLogs } = useLogs();

  useEffect(() => {
    if (syncVersion > 0) {
      loadLogs();
    }
  }, [syncVersion, loadLogs]);

  if (activeTab !== 'logs') {
    return null;
  }

  if (loading && logs.length === 0) {
    return (
      <div className="logs-tab">
        <LoadingSpinner message="Cargando registros..." />
      </div>
    );
  }

  if (error && logs.length === 0) {
    return (
      <div className="logs-tab">
        <div className="error-state">
          <div className="error-icon">!</div>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="logs-tab">
      <h2 className="section-title">Registros de Sincronización</h2>
      <p className="section-subtitle">
        Historial de sincronizaciones automáticas (más recientes primero)
      </p>

      <LogsList logs={logs} />
    </div>
  );
}
