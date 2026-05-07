import { useCallback, useEffect, useState } from 'react';
import * as venuesService from '../services/venuesService';
import type { ApiError, Venue } from '../types';
import { PAGINATION } from '../utils/constants';

export interface UseVenuesOptions {
  initialPage?: number;
  initialLimit?: number;
  initialStatus?: 'active' | 'inactive' | 'all';
}

export function useVenues(options: UseVenuesOptions = {}) {
  const {
    initialPage = PAGINATION.DEFAULT_PAGE,
    initialLimit = PAGINATION.DEFAULT_LIMIT,
    initialStatus = 'all',
  } = options;

  const [venues, setVenues] = useState<Venue[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [status, setStatus] = useState<'active' | 'inactive' | 'all'>(initialStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadVenues = useCallback(async (
    pageNum: number,
    limitNum: number,
    statusFilter: 'active' | 'inactive' | 'all'
  ) => {
    setLoading(true);
    setError(null);

    try {
      let actives: boolean | undefined;

      if (statusFilter !== 'all') {
        actives = statusFilter === 'active';
      }

      const response = await venuesService.getVenues(
        pageNum,
        limitNum,
        actives
      );

      setVenues(response.data);
      setTotal(response.count ?? 0);
      setPage(response.page ?? pageNum);
      setLimit(response.limit ?? limitNum);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Error al cargar bares');
      setVenues([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVenues(page, limit, status);
  }, [page, limit, status, loadVenues]);

  const updateVenue = useCallback(async (id: string, data: Partial<Venue>) => {
    try {
      await venuesService.updateVenue(id, data);
      setVenues((prev) =>
        prev.map((v) => (v.id === id ? { ...v, ...data } : v))
      );
    } catch (err) {
      const apiError = err as ApiError;
      throw new Error(apiError.message || 'Error al actualizar venue', { cause: err });
    }
  }, []);

  const deactivateVenue = useCallback(async (id: string) => {
    try {
      await venuesService.deactivateVenue(id);
      setVenues((prev) =>
        prev.map((v) => (v.id === id ? { ...v, active: false } : v))
      );
    } catch (err) {
      const apiError = err as ApiError;
      throw new Error(apiError.message || 'Error al desactivar venue', { cause: err });
    }
  }, []);

  const activateVenue = useCallback(async (id: string) => {
    try {
      await venuesService.activateVenue(id);
      setVenues((prev) =>
        prev.map((v) => (v.id === id ? { ...v, active: true } : v))
      );
    } catch (err) {
      const apiError = err as ApiError;
      throw new Error(apiError.message || 'Error al activar venue', { cause: err });
    }
  }, []);

  const setFilters = useCallback((newStatus: 'active' | 'inactive' | 'all') => {
    setStatus(newStatus);
    setPage(1);
  }, []);

  const setLimitWithReset = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  }, []);

  const goToPage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const nextPage = useCallback(() => {
    if (page * limit < total) {
      setPage((p) => p + 1);
    }
  }, [page, limit, total]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage((p) => p - 1);
    }
  }, [page]);

  const canGoNext = limit > 0 && page * limit < total;
  const canGoPrev = page > 1;
  const totalPages = limit > 0 ? Math.ceil(total / limit) : 0;

  const refresh = useCallback(() => {
    loadVenues(page, limit, status);
  }, [page, limit, status, loadVenues]);

  return {
    venues,
    total,
    page,
    limit,
    totalPages,
    status,
    loading,
    error,
    loadVenues,
    refresh,
    updateVenue,
    deactivateVenue,
    activateVenue,
    setFilters,
    goToPage,
    nextPage,
    prevPage,
    setLimit: setLimitWithReset,
    canGoNext,
    canGoPrev,
  };
}
