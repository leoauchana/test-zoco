import type { ApiError } from '../types';
import { API_BASE_URL, API_TIMEOUT } from '../utils/constants';

export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: response.statusText };
      }

      const error: ApiError = {
        status: response.status,
        message: errorData.message || `HTTP ${response.status}`,
        data: errorData,
      };

      throw error;
    }

    const result = await response.json();
    const data = result.response ?? result.data ?? result;
    return data as T;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === 'AbortError') {
      const timeoutError: ApiError = {
        status: 0,
        message: `Request timeout after ${API_TIMEOUT / 1000}s`,
      };
      throw timeoutError;
    }

    if (isApiError(error)) {
      throw error;
    }

    const networkError: ApiError = {
      status: 0,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
    throw networkError;
  }
}

function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'message' in error
  );
}

export async function apiGet<T>(endpoint: string): Promise<T> {
  return apiCall<T>(endpoint, { method: 'GET' });
}

export async function apiPost<T>(
  endpoint: string,
  body?: unknown
): Promise<T> {
  return apiCall<T>(endpoint, {
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });
}

export async function apiPatch<T>(
  endpoint: string,
  body?: unknown
): Promise<T> {
  return apiCall<T>(endpoint, {
    method: 'PATCH',
    body: body ? JSON.stringify(body) : undefined,
  });
}

export async function apiDelete<T>(endpoint: string): Promise<T> {
  return apiCall<T>(endpoint, { method: 'DELETE' });
}
