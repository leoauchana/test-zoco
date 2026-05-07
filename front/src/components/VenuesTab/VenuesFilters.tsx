import './VenuesTab.css';

export interface VenuesFiltersProps {
  status: 'all' | 'active' | 'inactive';
  onStatusChange: (status: 'all' | 'active' | 'inactive') => void;
}

export function VenuesFilters({
  status,
  onStatusChange,
}: VenuesFiltersProps) {
  return (
    <div className="filters-section">
      <div className="filters-row">
        <div className="filter-group">
          <label htmlFor="status-filter">Estado</label>
          <select
            id="status-filter"
            value={status}
            onChange={(e) => onStatusChange(e.target.value as 'all' | 'active' | 'inactive')}
          >
            <option value="all">Todos</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>

        <button
          className="btn-clear-filters"
          onClick={() => {
            onStatusChange('all');
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}
