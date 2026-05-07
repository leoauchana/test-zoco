import { useContext } from 'react';
import { TabContext } from '../contexts/TabContext';

export function useTabContext() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext debe usarse dentro de un TabProvider');
  }
  return context;
}