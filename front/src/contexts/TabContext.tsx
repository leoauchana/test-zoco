/* eslint-disable react-refresh/only-export-components */
import { createContext } from 'react';

interface TabContextType {
  activeTab: 'venues' | 'logs';
}

export const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children, activeTab }: { children: React.ReactNode; activeTab: 'venues' | 'logs' }) {
  return <TabContext.Provider value={{ activeTab }}>{children}</TabContext.Provider>;
}