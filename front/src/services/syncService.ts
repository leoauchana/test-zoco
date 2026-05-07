import type { SyncResponse } from '../types';
import { API_ENDPOINTS } from '../utils/constants';
import { apiPost } from './api';

export async function triggerSync(): Promise<SyncResponse> {
  const raw = await apiPost<Record<string, unknown>>(API_ENDPOINTS.SYNC);
  return {
    newCount: typeof raw.news === 'number' ? raw.news : 0,
    duplicates: typeof raw.duplicates === 'number' ? raw.duplicates : 0,
  } as SyncResponse;
}
