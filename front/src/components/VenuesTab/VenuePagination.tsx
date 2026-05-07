import { PAGINATION } from '../../utils/constants';
import './VenuesTab.css';

interface VenuePaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  canGoNext: boolean;
  canGoPrev: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export function VenuePagination({
  page,
  totalPages,
  total,
  limit,
  canGoNext,
  canGoPrev,
  onNextPage,
  onPrevPage,
  onPageChange,
  onLimitChange,
}: VenuePaginationProps) {
  const safePage = page || 1;
  const safeTotal = total || 0;
  const safeTotalPages = totalPages || 1;
  const safeLimit = limit || 10;
  const start = (safePage - 1) * safeLimit + 1;
  const end = Math.min(safePage * safeLimit, safeTotal);

  if (safeTotalPages <= 1) {
    return null;
  }

  const getVisiblePages = (): number[] => {
    const pages: number[] = [];
    const maxVisible = 5;

    if (safeTotalPages <= maxVisible) {
      for (let i = 1; i <= safeTotalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (safePage > 3) {
        pages.push(-1);
      }
      const startRange = Math.max(2, safePage - 1);
      const endRange = Math.min(safeTotalPages - 1, safePage + 1);
      for (let i = startRange; i <= endRange; i++) {
        pages.push(i);
      }
      if (safePage < safeTotalPages - 2) {
        pages.push(-1);
      }
      pages.push(safeTotalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="pagination-section">
      <div className="pagination-left">
        <div className="pagination-info">
          <span className="pagination-range">{start}-{end}</span>
        </div>

        <div className="limit-selector">
          <label htmlFor="page-limit">Mostrar</label>
          <select
            id="page-limit"
            value={safeLimit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
          >
            {PAGINATION.OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={onPrevPage}
          disabled={!canGoPrev}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Anterior
        </button>

        <div className="pagination-pages">
          {visiblePages.map((p) =>
            p === -1 ? (
              <span key={`ellipsis-${p}`} className="pagination-ellipsis">...</span>
            ) : (
              <button
                key={p}
                className={`pagination-page-btn ${p === safePage ? 'active' : ''}`}
                onClick={() => onPageChange(p)}
              >
                {p}
              </button>
            )
          )}
        </div>

        <button
          className="pagination-btn"
          onClick={onNextPage}
          disabled={!canGoNext}
        >
          Siguiente
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
