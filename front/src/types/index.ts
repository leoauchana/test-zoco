export interface Venue {
  id: string;
  name: string;
  location: string;
  category: string;
  description: string;
  source: string;
  active: boolean;
  obtainedAt: string;
}

export interface SyncLog {
  id: string;
  action: string;
  newCount: number;
  duplicates: number;
  executedAt: string;
}

export interface SyncResponse {
  newCount: number;
  duplicates: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  total: number;
  page: number;
  limit: number;
}

export interface UserPreferences {
  lastTab: 'venues' | 'logs';
  venuesFilters: {
    status: 'all' | 'active' | 'inactive';
  };
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
}

export interface ApiError {
  status: number;
  message: string;
  data?: unknown;
}