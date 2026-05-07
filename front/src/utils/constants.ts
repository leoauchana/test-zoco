export const API_BASE_URL = 'http://localhost:3000';

export const API_ENDPOINTS = {
  VENUES: '/venues',
  VENUES_BY_CATEGORY: (category: string) => `/venues/category/${category}`,
  VENUE_BY_ID: (id: string) => `/venues/${id}`,
  VENUE_DEACTIVATE: (id: string) => `/venues/${id}/desactivate`,
  LOGS: '/logs',
  SYNC: '/sync',
} as const;

export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  DEFAULT_PAGE: 1,
  OPTIONS: [10, 25, 50, 100],
} as const;

export const STORAGE_KEYS = {
  USER_PREFERENCES: 'zoco_user_preferences',
} as const;

export const TOAST_DURATION = {
  DEFAULT: 4000,
  SHORT: 2000,
  LONG: 6000,
} as const;

export const VENUE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ALL: 'all',
} as const;

export const VENUE_CATEGORIES = [
  { label: 'Bar', value: 'bar' },
  { label: 'Club', value: 'club' },
  { label: 'Pub', value: 'pub' },
  { label: 'Nightclub', value: 'nightclub' },
  { label: 'Lounge', value: 'lounge' },
  { label: 'Café', value: 'cafe' },
] as const;

export const API_TIMEOUT = 30000;