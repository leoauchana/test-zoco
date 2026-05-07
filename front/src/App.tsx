import { useState } from 'react';
import { Dashboard } from './components/Dashboard/Dashboard';
import { LogsTab } from './components/LogsTab/LogsTab';
import { Toast } from './components/Shared/Toast';
import { useToast } from './hooks/useToast';
import { VenuesTab } from './components/VenuesTab/VenuesTab';
import { useSyncStatus } from './hooks/useSyncStatus';
import './App.css';

function App() {
  const { toasts, addToast, removeToast } = useToast();
  const { loading: syncLoading, sync } = useSyncStatus();
  const [syncVersion, setSyncVersion] = useState(0);

  const handleSync = async () => {
    try {
      const result = await sync();
      setSyncVersion(v => v + 1);
      const newCount = result?.newCount ?? 0;
      const duplicates = result?.duplicates ?? 0;
      addToast(
        `Sincronización completada - ${newCount} nuevos bares, ${duplicates} duplicados`,
        'success',
        5000
      );
    } catch (error) {
      addToast(
        `Error de sincronización: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        'error',
        5000
      );
    }
  };

  return (
    <>
      <Dashboard onSync={handleSync} syncLoading={syncLoading} syncVersion={syncVersion}>
        <VenuesTab />
        <LogsTab />
      </Dashboard>

      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </div>
    </>
  );
}

export default App;