import { useState, useEffect } from 'react';
import { useTabContext } from '../../hooks/useTabContext';
import { useVenues } from '../../hooks/useVenues';
import { VENUE_CATEGORIES } from '../../utils/constants';
import type { Venue } from '../../types';
import { ConfirmationModal } from '../Shared/ConfirmationModal';
import { LoadingSpinner } from '../Shared/LoadingSpinner';
import { EditVenueModal } from './EditVenueModal';
import { VenuePagination } from './VenuePagination';
import { VenuesFilters } from './VenuesFilters';
import { VenuesList } from './VenuesList';
import './VenuesTab.css';

interface VenuesTabProps {
  syncVersion?: number;
}

export function VenuesTab({ syncVersion = 0 }: VenuesTabProps) {
  const { activeTab } = useTabContext();
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [deactivatingVenue, setDeactivatingVenue] = useState<Venue | null>(null);
  const [isEditingSaving, setIsEditingSaving] = useState(false);
  const [isDeactivatingSaving, setIsDeactivatingSaving] = useState(false);

  const {
    venues,
    total,
    page,
    limit,
    totalPages,
    status,
    category,
    loading,
    error,
    refresh,
    updateVenue,
    deactivateVenue,
    setFilters,
    goToPage,
    nextPage,
    prevPage,
    setLimit,
    canGoNext,
    canGoPrev,
  } = useVenues();

  useEffect(() => {
    if (syncVersion > 0) {
      refresh();
    }
  }, [syncVersion, refresh]);

  if (activeTab !== 'venues') {
    return null;
  }

  const handleEditVenue = (venue: Venue) => {
    setEditingVenue(venue);
  };

  const handleSaveVenue = async (updatedVenue: Venue) => {
    setIsEditingSaving(true);
    try {
      await updateVenue(updatedVenue.id, {
        name: updatedVenue.name,
        location: updatedVenue.location,
        category: updatedVenue.category,
      });
    } finally {
      setIsEditingSaving(false);
    }
  };

  const handleDeactivateVenue = (venue: Venue) => {
    setDeactivatingVenue(venue);
  };

  const handleConfirmDeactivate = async () => {
    if (!deactivatingVenue) return;
    setIsDeactivatingSaving(true);
    try {
      await deactivateVenue(deactivatingVenue.id);
      setDeactivatingVenue(null);
    } catch (err) {
      alert(`Error al desactivar: ${err instanceof Error ? err.message : 'Error desconocido'}`);
    } finally {
      setIsDeactivatingSaving(false);
    }
  };

  if (loading && venues.length === 0) {
    return (
      <div className="venues-card">
        <LoadingSpinner message="Cargando bares..." />
      </div>
    );
  }

  if (error && venues.length === 0) {
    return (
      <div className="venues-card">
        <div className="error-state">
          <div className="error-icon">!</div>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const filterLabel = category
    ? VENUE_CATEGORIES.find(c => c.value === category)?.label || category
    : status === 'all'
      ? 'Todos los bares'
      : status === 'active'
        ? 'Bares activos'
        : 'Bares inactivos';

  return (
    <div className="venues-card">
      <div className="card-header">
        <div className="card-header-left">
          <h2 className="card-title">Bares</h2>
          <span className="card-subtitle">{total} registrados</span>
        </div>
      </div>

      <VenuesFilters
        status={status}
        category={category}
        onStatusChange={(newStatus) => setFilters(newStatus, category)}
        onCategoryChange={(newCategory) => setFilters(status, newCategory)}
      />

      {loading && <div className="inline-loading"><LoadingSpinner message="Actualizando..." size="small" /></div>}

      {(status !== 'all' || category) && (
        <div className="filter-indicator">
          <span className="filter-dot"></span>
          <span className="filter-text">Filtrando: {filterLabel}</span>
          <button
            className="filter-clear-btn"
            onClick={() => {
              setFilters('all', null);
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      )}

      <VenuesList
        venues={venues}
        onEdit={handleEditVenue}
        onDeactivate={handleDeactivateVenue}
      />

      {venues.length > 0 && (
      <VenuePagination
        page={page}
        totalPages={totalPages}
        total={total}
        limit={limit}
        canGoNext={canGoNext}
        canGoPrev={canGoPrev}
        onNextPage={nextPage}
        onPrevPage={prevPage}
        onPageChange={goToPage}
        onLimitChange={setLimit}
      />
      )}

      <EditVenueModal
        isOpen={editingVenue !== null}
        venue={editingVenue}
        onClose={() => setEditingVenue(null)}
        onSave={handleSaveVenue}
        isSaving={isEditingSaving}
      />

      <ConfirmationModal
        isOpen={deactivatingVenue !== null}
        title="Desactivar Bar"
        message={`¿Está seguro de que desea desactivar "${deactivatingVenue?.name}"?`}
        confirmText="Desactivar"
        cancelText="Cancelar"
        isDangerous
        onConfirm={handleConfirmDeactivate}
        onCancel={() => setDeactivatingVenue(null)}
        isLoading={isDeactivatingSaving}
      />
    </div>
  );
}
