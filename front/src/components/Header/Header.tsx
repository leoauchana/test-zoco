import { useState } from 'react';
import './Header.css';

export interface HeaderProps {
  onSync: () => Promise<void>;
  syncLoading?: boolean;
}

export function Header({ onSync, syncLoading = false }: HeaderProps) {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await onSync();
    } catch (error) {
      console.error('Sync error:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">Panel de Bares</h1>
          <p className="header-subtitle">Gestión y administración de locales</p>
        </div>

        <div className="header-right">
          <button
            className="btn-sync"
            onClick={handleSync}
            disabled={isSyncing || syncLoading}
          >
            {isSyncing || syncLoading ? (
              <>
                <span className="spinner-icon"></span>
                Sincronizando...
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <polyline points="23 4 23 10 17 10"/>
                  <polyline points="1 20 1 14 7 14"/>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                </svg>
                Sincronizar
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
