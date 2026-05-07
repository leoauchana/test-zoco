# Frontend - Dashboard de Bares

Dashboard web desarrollado con **React + TypeScript + Vite** para visualizar y administrar los bares de la provincia de Tucumán. Se comunica con el backend NestJS para gestionar bares, disparar sincronizaciones y consultar logs.

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</p>

---

## Tecnologías

| Tecnología | Uso |
|---|---|
| [React](https://react.dev/) | Biblioteca de UI |
| [TypeScript](https://www.typescriptlang.org/) | Lenguaje tipado |
| [Vite](https://vitejs.dev/) | Build tool y dev server |
| CSS Vanilla | Estilos de componentes |

---

## Estructura del Proyecto

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── Dashboard.tsx          # Componente principal
│   │   └── Dashboard.css
│   ├── Header/
│   │   ├── Header.tsx             # Cabecera del dashboard
│   │   └── Header.css
│   ├── LogsTab/
│   │   ├── LogsTab.tsx            # Pestaña de logs
│   │   ├── LogsList.tsx           # Lista de logs
│   │   └── LogsTab.css
│   ├── Shared/
│   │   ├── ConfirmationModal.tsx  # Modal de confirmación
│   │   ├── LoadingSpinner.tsx     # Spinner de carga
│   │   ├── Toast.tsx              # Notificaciones toast
│   │   └── Shared.css
│   ├── TabNavigation/
│   │   ├── TabNavigation.tsx      # Navegación por pestañas
│   │   └── TabNavigation.css
│   └── VenuesTab/
│       ├── VenuesTab.tsx          # Pestaña de bares
│       ├── VenuesList.tsx         # Lista de bares
│       ├── VenuesFilters.tsx      # Filtros de búsqueda
│       ├── VenuePagination.tsx    # Paginación
│       ├── EditVenueModal.tsx     # Modal de edición
│       └── VenuesTab.css
├── contexts/
│   └── TabContext.tsx             # Estado global de tabs
├── hooks/
│   ├── useLocalStorage.ts         # Persistencia en localStorage
│   ├── useLogs.ts                 # Lógica de logs
│   ├── useSyncStatus.ts           # Estado de sincronización
│   ├── useTabContext.ts           # Hook para contexto de tabs
│   ├── useToast.ts                # Gestión de notificaciones
│   └── useVenues.ts               # Lógica de bares
├── services/
│   ├── api.ts                     # Cliente HTTP base
│   ├── logsService.ts             # Servicio de logs
│   ├── syncService.ts             # Servicio de sync
│   └── venuesService.ts           # Servicio de bares
├── types/
│   └── index.ts                   # Tipos TypeScript
├── utils/
│   ├── constants.ts               # Constantes de la app
│   ├── formatters.ts              # Funciones de formato
│   └── validators.ts              # Validaciones de formularios
├── assets/
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
├── App.tsx
├── App.css
├── main.tsx
└── index.css
```

---

## Características

### Gestión de Bares (VenuesTab)

- Visualización de bares en lista
- Filtros por estado
- Paginación de resultados
- Edición de bares mediante modal
- Soft delete (desactivación)

### Historial de Sincronizaciones (LogsTab)

- Lista de ejecuciones del sync
- Detalle de bares nuevos y duplicados
- Timestamp de cada ejecución

### Componentes Compartidos (Shared)

- **ConfirmationModal**: Modal reutilizable para confirmar acciones
- **LoadingSpinner**: Indicador de carga
- **Toast**: Notificaciones de éxito/error

### Navegación por Pestañas

- Sistema de tabs para alternar entre Venues y Logs
- Estado global manejado con React Context (`TabContext`)

---

## Arquitectura

```
Components → Hooks → Services → API
                ↓
           Context (TabContext)
                ↓
           Types + Utils
```

- **Custom Hooks**: Lógica de negocio separada de la UI
- **Services**: Capa de comunicación con la API
- **Context**: Estado global para navegación por tabs
- **Types**: Definiciones TypeScript centralizadas
- **Utils**: Constantes, formatters y validadores reutilizables

---

## Instalación

```bash
npm install
```

## Ejecución

```bash
# Desarrollo (con hot reload)
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## Lint

```bash
npm run lint
```

---

## Variables de Entorno

Crear un archivo `.env` en la raíz del frontend:

```env
VITE_API_URL=http://localhost:3000
```

---

## Autor

**Auchana Matías Leonel** - Estudiante de Ingeniería en Sistemas de Información
