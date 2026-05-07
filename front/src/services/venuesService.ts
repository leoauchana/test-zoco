import type { PaginatedResponse, Venue } from '../types';
import { API_ENDPOINTS } from '../utils/constants';
import { apiDelete, apiGet, apiPatch } from './api';

export async function getVenues(
  page: number = 1,
  limit: number = 10,
  actives?: boolean,
  category?: string
): Promise<PaginatedResponse<Venue>> {
  if (category) {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    const endpoint = `${API_ENDPOINTS.VENUES_BY_CATEGORY(category)}?${params.toString()}`;
    return apiGet<PaginatedResponse<Venue>>(endpoint);
  }

  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  if (actives !== undefined) {
    params.append('actives', actives.toString());
  }

  const endpoint = `${API_ENDPOINTS.VENUES}?${params.toString()}`;
  return apiGet<PaginatedResponse<Venue>>(endpoint);
}

export async function getVenueById(id: string): Promise<Venue> {
  return apiGet<Venue>(API_ENDPOINTS.VENUE_BY_ID(id));
}

export async function updateVenue(
  id: string,
  data: Partial<Venue>
): Promise<Venue> {
  return apiPatch<Venue>(API_ENDPOINTS.VENUE_BY_ID(id), data);
}

export async function deactivateVenue(id: string): Promise<Venue> {
  return apiPatch<Venue>(API_ENDPOINTS.VENUE_DEACTIVATE(id));
}

export async function activateVenue(id: string): Promise<Venue> {
  return apiPatch<Venue>(API_ENDPOINTS.VENUE_BY_ID(id), { active: true });
}

export async function deleteVenue(id: string): Promise<void> {
  await apiDelete<void>(API_ENDPOINTS.VENUE_BY_ID(id));
}
