import type { SyncLog } from '../../types';
import { formatDate } from '../../utils/formatters';

interface LogsListProps {
  logs: SyncLog[];
}

export function LogsList({ logs }: LogsListProps) {
  if (logs.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        </div>
        <p>No hay registros de sincronización</p>
        <span>Ejecuta una sincronización para ver el historial aquí</span>
      </div>
    );
  }

  const getBadgeClass = (action: string) => {
    if (action.includes('success') || action.includes('complet')) return 'badge--success';
    if (action.includes('warning') || action.includes('duplicate')) return 'badge--warning';
    return 'badge--info';
  };

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Acción</th>
            <th>Nuevos</th>
            <th>Duplicados</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="td-id">{log.id ? log.id.substring(0, 8) : ''}</td>
              <td>
                <span className={`badge ${getBadgeClass(log.action)}`}>
                  {log.action}
                </span>
              </td>
              <td className="td-number">{log.newCount}</td>
              <td className="td-number">{log.duplicates}</td>
              <td className="td-date">{formatDate(log.executedAt, 'short')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
