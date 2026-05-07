import { VENUE_CATEGORIES } from '../../utils/constants';
import './VenuesTab.css';

export interface VenuesFiltersProps {
  status: 'all' | 'active' | 'inactive';
  category: string | null;
  onStatusChange: (status: 'all' | 'active' | 'inactive') => void;
  onCategoryChange: (category: string | null) => void;
}

export function VenuesFilters({
  status,
  category,
  onStatusChange,
  onCategoryChange,
}: VenuesFiltersProps) {
  const hasCategory = category && category.length > 0;

  return (
    <div className="filters-section">
      <div className="filters-row">
        <div className="filter-group">
          <label htmlFor="status-filter">Estado</label>
          <select
            id="status-filter"
            value={status}
            onChange={(e) => onStatusChange(e.target.value as 'all' | 'active' | 'inactive')}
            disabled={hasCategory}
            className={hasCategory ? 'filter-disabled' : ''}
          >
            <option value="all">Todos</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>

        <div className="filter-divider"></div>

        <div className="filter-group">
          <label htmlFor="category-filter">Categoría</label>
          <select
            id="category-filter"
            value={category || ''}
            onChange={(e) => {
              const value = e.target.value || null;
              onCategoryChange(value);
              if (value) {
                onStatusChange('all');
              }
            }}
          >
            <option value="">Todas las categorías</option>
            {VENUE_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <button
          className="btn-clear-filters"
          onClick={() => {
            onStatusChange('all');
            onCategoryChange(null);
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
