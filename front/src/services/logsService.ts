import type { SyncLog } from '../types';
import { API_ENDPOINTS } from '../utils/constants';
import { apiGet } from './api';

export async function getLogs(): Promise<SyncLog[]> {
  return apiGet<SyncLog[]>(API_ENDPOINTS.LOGS);
}

export async function getLogById(id: string): Promise<SyncLog> {
  return apiGet<SyncLog>(`${API_ENDPOINTS.LOGS}/${id}`);
}