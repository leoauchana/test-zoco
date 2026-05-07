import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react';
import { TabProvider } from '../../contexts/TabContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { UserPreferences } from '../../types';
import { STORAGE_KEYS } from '../../utils/constants';
import { Header } from '../Header/Header';
import { TabNavigation } from '../TabNavigation/TabNavigation';
import './Dashboard.css';

export interface DashboardProps {
  onSync: () => Promise<void>;
  syncLoading?: boolean;
  syncVersion?: number;
  children?: React.ReactNode;
}

export function Dashboard({ onSync, syncLoading = false, syncVersion = 0, children }: DashboardProps) {
  const defaultPreferences: UserPreferences = {
    lastTab: 'venues',
    venuesFilters: {
      status: 'all',
    },
  };

  const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
    STORAGE_KEYS.USER_PREFERENCES,
    defaultPreferences
  );

  const [activeTab, setActiveTab] = useState<'venues' | 'logs'>(preferences.lastTab);
  const initialTabSet = useRef(false);

  useEffect(() => {
    if (!initialTabSet.current) {
      setActiveTab(preferences.lastTab);
      initialTabSet.current = true;
    }
  }, [preferences.lastTab]);

  useEffect(() => {
    setPreferences((prev) => ({
      ...prev,
      lastTab: activeTab,
    }));
  }, [activeTab]);

  const handleTabChange = (tab: 'venues' | 'logs') => {
    setActiveTab(tab);
  };

  const childrenArray = Children.toArray(children).map((child) => {
    if (isValidElement(child)) {
      return cloneElement(child as React.ReactElement<{ syncVersion?: number }>, { syncVersion });
    }
    return child;
  });

  return (
    <div className="dashboard">
      <Header onSync={onSync} syncLoading={syncLoading} />
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="dashboard-content">
        <TabProvider activeTab={activeTab}>
          {childrenArray}
        </TabProvider>
      </main>
    </div>
  );
}
