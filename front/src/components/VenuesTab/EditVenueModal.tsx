import { useEffect, useState } from 'react';
import type { Venue } from '../../types';
import { VENUE_CATEGORIES } from '../../utils/constants';
import { getErrorMessage, validateVenueForm } from '../../utils/validators';
import { ConfirmationModal } from '../Shared/ConfirmationModal';

interface EditVenueModalProps {
  isOpen: boolean;
  venue: Venue | null;
  onClose: () => void;
  onSave: (venue: Venue) => Promise<void>;
  onError?: (error: string) => void;
  isSaving?: boolean;
}

export function EditVenueModal({
  isOpen,
  venue,
  onClose,
  onSave,
  onError,
  isSaving = false,
}: EditVenueModalProps) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (venue && isOpen) {
      setName(venue.name);
      setLocation(venue.location);
      setCategory(venue.category);
      setValidationErrors({});
    }
  }, [venue, isOpen]);

  const handleSave = () => {
    const errors = validateVenueForm(name, location, category);
    if (errors.length > 0) {
      const errorMap: Record<string, string> = {};
      errors.forEach((err) => {
        errorMap[err.field] = err.message;
      });
      setValidationErrors(errorMap);
      return;
    }

    if (
      name === venue?.name &&
      location === venue.location &&
      category === venue.category
    ) {
      onClose();
      return;
    }

    setValidationErrors({});
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    if (!venue) return;

    try {
      await onSave({
        ...venue,
        name,
        location,
        category,
      });
      setShowConfirmation(false);
      onClose();
    } catch (error) {
      console.error('Error saving venue:', error);
      const errorMsg = getErrorMessage(error);
      if (onError) {
        onError(errorMsg);
      } else {
        alert(`Error al guardar: ${errorMsg}`);
      }
    }
  };

  if (!isOpen || !venue) {
    return null;
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal modal--edit" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">Editar Bar</h2>
            <span className="modal-subtitle">{venue.id.slice(0, 8)}</span>
          </div>

          <div className="form">
            <div className="form-group">
              <label htmlFor="edit-name">Nombre</label>
              <input
                id="edit-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setValidationErrors((prev) => ({ ...prev, name: '' }));
                }}
                disabled={isSaving}
                className={validationErrors.name ? 'input-error' : ''}
                placeholder="Nombre del bar"
              />
              {validationErrors.name && (
                <span className="error-text">{validationErrors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="edit-location">Ubicación</label>
              <input
                id="edit-location"
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setValidationErrors((prev) => ({ ...prev, location: '' }));
                }}
                disabled={isSaving}
                className={validationErrors.location ? 'input-error' : ''}
                placeholder="Dirección o ubicación"
              />
              {validationErrors.location && (
                <span className="error-text">{validationErrors.location}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="edit-category">Categoría</label>
              <select
                id="edit-category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setValidationErrors((prev) => ({ ...prev, category: '' }));
                }}
                disabled={isSaving}
                className={validationErrors.category ? 'input-error' : ''}
              >
                <option value="">Seleccionar categoría</option>
                {VENUE_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {validationErrors.category && (
                <span className="error-text">{validationErrors.category}</span>
              )}
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={onClose}
                disabled={isSaving}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        title="Confirmar cambios"
        message={`¿Está seguro de que desea guardar los cambios en "${name}"?`}
        confirmText="Guardar"
        cancelText="Cancelar"
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirmation(false)}
      />
    </>
  );
}
