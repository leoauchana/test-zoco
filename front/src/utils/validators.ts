export interface ValidationError {
  field: string;
  message: string;
}

export function validateVenueName(name: string): ValidationError | null {
  if (!name || !name.trim()) {
    return { field: 'name', message: 'El nombre no puede estar vacío' };
  }
  if (name.trim().length < 3) {
    return { field: 'name', message: 'El nombre debe tener al menos 3 caracteres' };
  }
  if (name.length > 100) {
    return { field: 'name', message: 'El nombre no puede exceder 100 caracteres' };
  }
  return null;
}

export function validateVenueLocation(location: string): ValidationError | null {
  if (!location || !location.trim()) {
    return { field: 'location', message: 'La ubicación no puede estar vacía' };
  }
  if (location.trim().length < 3) {
    return { field: 'location', message: 'La ubicación debe tener al menos 3 caracteres' };
  }
  if (location.length > 100) {
    return { field: 'location', message: 'La ubicación no puede exceder 100 caracteres' };
  }
  return null;
}

export function validateVenueCategory(category: string): ValidationError | null {
  if (!category || !category.trim()) {
    return { field: 'category', message: 'La categoría no puede estar vacía' };
  }
  return null;
}

export function validateVenueForm(
  name: string,
  location: string,
  category: string
): ValidationError[] {
  const errors: ValidationError[] = [];

  const nameError = validateVenueName(name);
  if (nameError) errors.push(nameError);

  const locationError = validateVenueLocation(location);
  if (locationError) errors.push(locationError);

  const categoryError = validateVenueCategory(category);
  if (categoryError) errors.push(categoryError);

  return errors;
}

export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    if (error.message.includes('timeout')) {
      return 'La solicitud tardó demasiado. Por favor, intenta nuevamente.';
    }
    if (error.message.includes('Network')) {
      return 'Error de conexión. Verifica tu conexión a internet.';
    }
    if (error.message.includes('404')) {
      return 'No se encontró el recurso solicitado.';
    }
    if (error.message.includes('401') || error.message.includes('403')) {
      return 'No tienes permisos para realizar esta acción.';
    }
    if (error.message.includes('500')) {
      return 'Error del servidor. Por favor, intenta nuevamente más tarde.';
    }
    return error.message;
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message: unknown }).message);
  }

  return 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente.';
}