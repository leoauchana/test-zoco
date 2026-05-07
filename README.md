# Sistema de Gestión de Bares

Sistema automatizado para obtener, procesar y administrar bares de la provincia de Tucumán, Argentina.

---

## ¿De qué trata el sistema?

Este sistema permite gestionar bares de Tucumán de forma automatizada. El sistema obtiene datos desde una fuente mock, los procesa con Inteligencia Artificial para clasificarlos y detectar duplicados, y los expone mediante una API REST consumida por un dashboard web.

**Funcionalidades principales:**
- Gestión completa (CRUD) de bares
- Sincronización automática de datos mediante un scheduler
- Clasificación automática por categoría usando IA (bar, boliche, café, restaurante, etc.)
- Detección de duplicados semánticos aunque los nombres sean distintos ("Bar Irlanda" = "Irlanda Bar")
- Dashboard web para visualizar, editar y administrar los bares
- Historial de sincronizaciones con logs detallados

---

## Stack Tecnológico

### Backend
| Tecnología | Uso |
|---|---|
| NestJS + TypeScript | Framework principal |
| Prisma ORM | Acceso a base de datos |
| PostgreSQL (Supabase) | Base de datos relacional |
| Groq API | Clasificación y detección de duplicados con IA |
| @nestjs/schedule | Automatización con cron jobs |
| class-validator | Validación de DTOs |
| class-transformer | Transformación de datos de DTOs |
| Docker | Contenedorización |

### Frontend
| Tecnología | Uso |
|---|---|
| React + TypeScript | UI del dashboard |
| Vite | Build tool |

---

## Estructura del Proyecto

### Backend (`backend/`)

```
backend/
├── src/
│   ├── ai/                          # Módulo de IA (Groq)
│   │   ├── ai.module.ts
│   │   └── ai.service.ts            # Clasificación y detección de duplicados
│   ├── common/
│   │   ├── filters/
│   │   │   └── exceptions.filter.ts # Exception filter global
│   │   └── interceptors/
│   │       └── response.interceptor.ts  # Response interceptor global
│   ├── database/
│   │   ├── database.module.ts
│   │   └── database.service.ts      # Servicio de Prisma
│   ├── logs/
│   │   ├── dto/
│   │   │   └── response-logs.dto.ts
│   │   ├── interfaces/
│   │   │   ├── logs.repository.interface.ts
│   │   │   └── logs.service.interface.ts
│   │   ├── logs.constants.ts
│   │   ├── logs.controller.ts
│   │   ├── logs.module.ts
│   │   ├── logs.repository.ts
│   │   └── logs.service.ts
│   ├── sync/
│   │   ├── data/
│   │   │   └── venues.mock.ts       # Mock de bares tucumanos
│   │   ├── interfaces/
│   │   │   └── sync.service.interface.ts
│   │   ├── sync.constants.ts
│   │   ├── sync.controller.ts
│   │   ├── sync.module.ts
│   │   └── sync.service.ts          # Lógica de sincronización + cron job
│   ├── venues/
│   │   ├── dto/
│   │   │   ├── create-venues.dto.ts
│   │   │   ├── get-venues.dto.ts
│   │   │   ├── query-vanues.dto.ts
│   │   │   ├── response-venues.dto.ts
│   │   │   └── update-venues.dto.ts
│   │   ├── interfaces/
│   │   │   ├── venues.repository.interface.ts
│   │   │   └── venues.service.interface.ts
│   │   ├── mappers/
│   │   │   └── venue.mapper.ts
│   │   ├── venues.constants.ts
│   │   ├── venues.controller.ts
│   │   ├── venues.module.ts
│   │   ├── venues.repository.ts
│   │   └── venues.service.ts
│   ├── app.module.ts
│   └── main.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── docker-compose.yml
├── Dockerfile
├── nest-cli.json
├── package.json
└── tsconfig.json
```

### Frontend (`front/`)

```
front/
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   └── Dashboard.css
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   └── Header.css
│   │   ├── LogsTab/
│   │   │   ├── LogsTab.tsx
│   │   │   ├── LogsList.tsx
│   │   │   └── LogsTab.css
│   │   ├── Shared/
│   │   │   ├── ConfirmationModal.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── Shared.css
│   │   ├── TabNavigation/
│   │   │   ├── TabNavigation.tsx
│   │   │   └── TabNavigation.css
│   │   └── VenuesTab/
│   │       ├── VenuesTab.tsx
│   │       ├── VenuesList.tsx
│   │       ├── VenuesFilters.tsx
│   │       ├── VenuePagination.tsx
│   │       ├── EditVenueModal.tsx
│   │       └── VenuesTab.css
│   ├── contexts/
│   │   └── TabContext.tsx             # Estado global de tabs
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── useLogs.ts
│   │   ├── useSyncStatus.ts
│   │   ├── useTabContext.ts
│   │   ├── useToast.ts
│   │   └── useVenues.ts
│   ├── services/
│   │   ├── api.ts                     # Cliente Fetch
│   │   ├── logsService.ts
│   │   ├── syncService.ts
│   │   └── venuesService.ts
│   ├── types/
│   │   └── index.ts                   # Definiciones de TypeScript
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── formatters.ts
│   │   └── validators.ts
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── index.html
├── vite.config.ts
├── package.json
└── tsconfig.json
```

---

## Modelo de datos

### Tabla `venues`
| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador único |
| name | TEXT | Nombre del bar |
| location | TEXT | Dirección |
| category | TEXT | Clasificado por IA |
| description | TEXT | Generado por IA |
| source | TEXT | Origen del dato |
| active | BOOLEAN | Soft delete |
| obtainedAt | TIMESTAMP | Fecha de obtención |
| createdAt | TIMESTAMP | Fecha de creación |
| updatedAt | TIMESTAMP | Última actualización |

### Tabla `logs`
| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador único |
| action | TEXT | Tipo de acción ejecutada |
| newCount | INT | Bares nuevos agregados |
| duplicates | INT | Duplicados detectados |
| executedAt | TIMESTAMP | Fecha de ejecución |

---

## 📡 Endpoints de la API

### Venues
```
GET    /venues?page=1&limit=10?actives=true/false        Paginación y filtro (opcional)
GET    /venues/:id            Obtener bar por ID
POST   /venues                Crear bar manualmente
PATCH    /venues/:id          Actualizar bar
PATCH /venues/:id             Desactivar bar (soft delete)
```

### Sync
```
POST   /sync                          Disparar sincronización manualmente
```

### Logs
```
GET    /logs                  Obtención de logs registrados
GET    /logs/:id              Detalle de un log
```

---

## ¿Cómo correr el proyecto?

### Con Docker (recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/proyecto-tucuman.git
cd proyecto-tucuman

# Configurar variables de entorno
cp backend/.env.example backend/.env
# Completar las variables en backend/.env

# Levantar todo
docker-compose up --build
```

### Sin Docker

```bash
# Backend
cd backend
npm install
npx prisma migrate deploy
npm run start:dev

# Frontend (en otra terminal)
cd frontend
npm install
npm run dev
```

La API estará disponible en `http://localhost:3000` y el frontend en `http://localhost:5173`.

---

## ¿Cómo funciona la IA?

El sistema usa **Groq API** en dos momentos clave:

**1. Detección de duplicados**

Antes de guardar un bar nuevo, se le pasa al modelo la lista de bares existentes y el nombre nuevo. La IA detecta si son el mismo lugar aunque el nombre esté escrito diferente.

```
"Bar Irlanda Tucumán"+"Irlanda Bar"  → duplicado detectado 
"El Cairo"           +"Bar El Cairo" → duplicado detectado
```

**2. Clasificación y descripción**

Cuando se agrega un bar nuevo, la IA le asigna automáticamente una categoría (bar, boliche, café, restaurante, peña, resto-bar) y genera una descripción breve del lugar.

---

## Automatización

El sistema incluye un **cron job** que se ejecuta cada hora automáticamente:

```
Cada 1 hora
    ↓
Obtiene bares del mock/fuente
    ↓
Para cada bar → IA detecta duplicado
    ↓
Si no es duplicado → IA clasifica y genera descripción
    ↓
Guarda en base de datos
    ↓
Registra resultado en logs
```

También se puede disparar manualmente desde el dashboard o vía `POST /sync` mediante el boton de sincronizar de la interfaz de usuario del sistema.

---

## Criterio técnico

### ¿Cómo se evitan duplicados?
Se usa una combinación de dos estrategias: primero se busca coincidencia exacta por nombre en la base de datos, y luego se utiliza la IA para detectar duplicados semánticos donde el nombre puede estar escrito diferente pero referirse al mismo lugar.

### ¿Cómo escalarías el sistema?
- Separar el scraper en un microservicio independiente
- Usar una cola de trabajo (Bull + Redis) para procesar bares en background sin bloquear el servidor
- Cachear resultados de IA para nombres ya procesados
- Agregar índices en la base de datos para búsquedas por nombre y categoría
- Implementar rate limiting en los endpoints públicos

### ¿Qué problemas puede tener este flujo?
- La IA puede tener falsos positivos en la detección de duplicados
- El mock no refleja datos reales actualizados
- Si la API de Groq falla, el sync continúa pero sin clasificación automática
- El cron job no tiene reintentos automáticos ante fallos

### ¿Cómo mejorarías la calidad de los datos?
- Integrar Google Places API para obtener datos reales y actualizados
- Agregar un sistema de aprobación manual antes de publicar bares
- Normalizar direcciones usando una API de geocodificación
- Implementar un score de confianza por venue

---

## Desarrollador del proyecto

Auchana Matías Leonel -  Estudiante de Ingeniería en Sistemas de Información