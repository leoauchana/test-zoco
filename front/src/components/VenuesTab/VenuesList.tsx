import type { Venue } from "../../types";
import {
  formatDate,
  formatStatus,
  getStatusClass,
  truncateText,
} from "../../utils/formatters";

interface VenuesListProps {
  venues: Venue[];
  onEdit: (venue: Venue) => void;
  onDeactivate: (venue: Venue) => void;
}

export function VenuesList({ venues, onEdit, onDeactivate }: VenuesListProps) {
  if (venues.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <p>No se encontraron bares</p>
        <span>
          Intenta cambiar los filtros o sincroniza para obtener más datos
        </span>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th className="th-id">ID</th>
            <th className="th-name">Nombre</th>
            <th>Ubicación</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Fuente</th>
            <th>Estado</th>
            <th>Obtenido</th>
            <th className="th-actions">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {[...venues]
            .sort(
              (a, b) =>
                new Date(b.obtainedAt).getTime() -
                new Date(a.obtainedAt).getTime(),
            )
            .map((venue) => (
              <tr key={venue.id} className={venue.active ? "" : "row-inactive"}>
                <td className="td-id">
                  {venue.id ? truncateText(venue.id, 8) : ""}
                </td>
                <td className="td-name">{venue.name || ""}</td>
                <td className="td-location">
                  {truncateText(venue.location, 25)}
                </td>
                <td>
                  <span className="category-badge">{venue.category || ""}</span>
                </td>
                <td className="td-description">
                  {truncateText(venue.description, 30)}
                </td>
                <td className="td-source">{venue.source || ""}</td>
                <td>
                  <span
                    className={`status-badge ${getStatusClass(venue.active)}`}
                  >
                    <span className="status-dot"></span>
                    {formatStatus(venue.active)}
                  </span>
                </td>
                <td className="td-date">
                  {formatDate(venue.obtainedAt, "short")}
                </td>
                <td className="td-actions">
                  <button
                    className="btn-action btn-edit"
                    onClick={() => onEdit(venue)}
                    title="Editar bar"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      width="16"
                      height="16"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  {venue.active && (
                    <button
                      className="btn-action btn-deactivate"
                      onClick={() => onDeactivate(venue)}
                      title="Desactivar bar"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        width="16"
                        height="16"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                      </svg>
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
