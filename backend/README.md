# Backend - Sistema de Gestión de Bares

API REST desarrollada con **NestJS** para la gestión automatizada de bares de la provincia de Tucumán, Argentina. El sistema obtiene datos desde una fuente mock, los procesa con IA para clasificarlos y detectar duplicados, y los expone mediante endpoints consumidos por un dashboard web.

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Groq-000000?style=for-the-badge&logo=groq&logoColor=white" alt="Groq" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

---

## Tecnologías

| Tecnología | Uso |
|---|---|
| [NestJS](https://nestjs.com/) | Framework principal |
| [TypeScript](https://www.typescriptlang.org/) | Lenguaje tipado |
| [Prisma ORM](https://www.prisma.io/) | Acceso a base de datos |
| [PostgreSQL](https://www.postgresql.org/) (Supabase) | Base de datos relacional |
| [Groq API](https://groq.com/) | Clasificación y detección de duplicados con IA |
| [@nestjs/schedule](https://docs.nestjs.com/techniques/task-scheduling) | Cron jobs automáticos |
| [class-validator](https://github.com/typestack/class-validator) | Validación de DTOs |
| [class-transformer](https://github.com/typestack/class-transformer) | Transformación de datos |
| [Docker](https://www.docker.com/) | Contenedorización |

---

## Estructura del Proyecto

```
src/
├── ai/                          # Módulo de IA (Groq)
│   ├── ai.module.ts
│   └── ai.service.ts            # Clasificación y detección de duplicados
├── common/
│   ├── filters/
│   │   └── exceptions.filter.ts # Exception filter global
│   └── interceptors/
│       └── response.interceptor.ts  # Response interceptor global
├── database/
│   ├── database.module.ts
│   └── database.service.ts      # Servicio de Prisma
├── logs/
│   ├── dto/
│   │   └── response-logs.dto.ts
│   ├── interfaces/
│   │   ├── logs.repository.interface.ts
│   │   └── logs.service.interface.ts
│   ├── logs.constants.ts
│   ├── logs.controller.ts
│   ├── logs.module.ts
│   ├── logs.repository.ts
│   └── logs.service.ts
├── sync/
│   ├── data/
│   │   └── venues.mock.ts       # Mock de bares tucumanos
│   ├── interfaces/
│   │   └── sync.service.interface.ts
│   ├── sync.constants.ts
│   ├── sync.controller.ts
│   ├── sync.module.ts
│   └── sync.service.ts          # Lógica de sincronización + cron job
├── venues/
│   ├── dto/
│   │   ├── create-venues.dto.ts
│   │   ├── get-venues.dto.ts
│   │   ├── query-vanues.dto.ts
│   │   ├── response-venues.dto.ts
│   │   └── update-venues.dto.ts
│   ├── interfaces/
│   │   ├── venues.repository.interface.ts
│   │   └── venues.service.interface.ts
│   ├── mappers/
│   │   └── venue.mapper.ts
│   ├── venues.constants.ts
│   ├── venues.controller.ts
│   ├── venues.module.ts
│   ├── venues.repository.ts
│   └── venues.service.ts
├── app.module.ts
└── main.ts
```

---

## Módulos

### `ai/` - Inteligencia Artificial

Módulo responsable de integrar la API de Groq para dos tareas:

- **Detección de duplicados**: Compara nombres de bares nuevos contra los existentes, detectando coincidencias semánticas (ej: "Bar Irlanda" = "Irlanda Bar")
- **Clasificación**: Asigna categorías automáticamente (bar, boliche, café, restaurante, peña, resto-bar) y genera descripciones

### `venues/` - Gestión de Bares

Módulo principal del sistema que implementa el CRUD completo de bares:

- Controller, Service y Repository con patrón de repositorio
- Interfaces para inversión de dependencias
- Mappers para transformación de datos
- DTOs con validación usando `class-validator`
- Paginación y filtros

### `sync/` - Sincronización

Automatización del proceso de obtención y procesamiento de bares:

- Obtiene datos del mock (`venues.mock.ts`)
- Detecta duplicados mediante IA
- Clasifica nuevos bares
- Registra resultados en logs
- **Cron job** que se ejecuta cada hora
- Endpoint manual para disparar sincronización

### `logs/` - Historial de Sincronizaciones

Registro de cada ejecución del proceso de sync:

- Cantidad de bares nuevos agregados
- Duplicados detectados
- Timestamp de ejecución
- Consultable vía API

### `common/` - Utilidades Compartidas

- **Exception Filter Global**: Manejo centralizado de errores
- **Response Interceptor Global**: Formato estandarizado de respuestas

### `database/` - Base de Datos

- Wrapper del servicio de Prisma
- Integración con PostgreSQL (Supabase)
- Migraciones gestionadas por Prisma

---

## Endpoints de la API

### Venues

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/venues?page=1&limit=10&actives=true` | Listar bares con paginación |
| `GET` | `/venues/:id` | Obtener bar por ID |
| `POST` | `/venues` | Crear bar manualmente |
| `PATCH` | `/venues/:id` | Actualizar bar |
| `PATCH` | `/venues/:id` | Desactivar bar (soft delete) |

### Sync

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/sync` | Disparar sincronización manualmente |

### Logs

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/logs` | Obtener logs registrados |
| `GET` | `/logs/:id` | Detalle de un log |

---

## Modelo de Datos

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

## Instalación

```bash
npm install
```

## Variables de Entorno

Crear un archivo `.env` basado en `.env.example`:

```env
DATABASE_URL="postgresql://..."
GROQ_API_KEY="tu-api-key"
```

## Ejecución

```bash
# Desarrollo
npm run start:dev

# Producción
npm run start:prod

# Build
npm run build
```

## Base de Datos

```bash
# Aplicar migraciones
npx prisma migrate deploy

# Generar cliente
npx prisma generate
```

## Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

## Testing de Servicios

### Servicios Testeados

El proyecto incluye **tests unitarios** para los cuatro servicios principales usando **Jest** y **@nestjs/testing**:

#### 1. **AiService** (`src/ai/ai.service.spec.ts`)

Pruebas de integración con la API de Groq para análisis de bares.

| Test | Descripción |
|---|---|
| `analyzeVenue` - JSON parsing | Valida que la respuesta JSON de Groq se interprete correctamente |
| `analyzeVenue` - Markdown cleanup | Verifica la limpieza de JSON embebido en markdown (```json...```) |
| `analyzeVenue` - Fallback response | Confirma que devuelve respuesta por defecto si Groq falla |

**Casos de uso:**
- Clasificación automática de bares
- Detección de duplicados semánticos
- Recuperación ante fallos de API

---

#### 2. **VenuesService** (`src/venues/venues.service.spec.ts`)

Pruebas del CRUD completo y validaciones de bares.

| Test | Descripción |
|---|---|
| `findAll` - Paginación | Retorna bares paginados con total de registros |
| `findAll` - Validación de página | Lanza error si el número de página es inválido (≤ 0) |
| `create` - Creación exitosa | Agrega un nuevo bar sin duplicados |
| `create` - Detección de duplicados | Lanza `ConflictException` si el bar ya existe |

**Casos de uso:**
- Listar y paginar bares
- Crear nuevos bares con validación
- Evitar duplicados manuales

---

#### 3. **SyncService** (`src/sync/sync.service.spec.ts`)

Pruebas del proceso de sincronización automática con análisis de IA.

| Test | Descripción |
|---|---|
| `run` - Sincronización exitosa | Crea nuevos bares y registra logs de éxito |
| `run` - Duplicados detectados por IA | Salta creación si IA detecta duplicado |
| `run` - Duplicados por conflicto | Cuenta como duplicado si `create` lanza `ConflictException` |

**Casos de uso:**
- Proceso automático de obtención de datos (mock)
- Análisis con IA para filtrar duplicados
- Registro de resultados en logs

---

#### 4. **LogsService** (`src/logs/logs.service.spec.ts`)

Pruebas del registro y consulta de logs de sincronización.

| Test | Descripción |
|---|---|
| `findAll` | Retorna todos los logs registrados |
| `findOne` | Obtiene detalle de un log específico por ID |
| `findOne` - Error | Lanza `NotFoundException` si el log no existe |
| `create` - Creación exitosa | Registra nuevo log con acción y contadores |
| `create` - Error de repositorio | Propaga errores de base de datos |

**Casos de uso:**
- Auditar sincronizaciones ejecutadas
- Consultar estadísticas de procesos
- Seguimiento de errores y duplicados

---

### Tecnologías de Testing

- **Framework**: Jest
- **Mocking**: Jest mocks para dependencias
- **Módulos NestJS**: `Test`, `TestingModule` de `@nestjs/testing`
- **Patrones**:
  - Mock de repositorios y servicios inyectados
  - Spies para verificar llamadas
  - beforeEach para limpieza y setup

### Ejecución de Tests

```bash
# Ejecutar todos los tests
npm run test

# Modo watch (re-ejecuta al cambiar archivos)
npm run test:watch

# Con coverage detallado
npm run test:cov

# Debug interactivo
npm run test:debug
```

### Cobertura Esperada

Los tests cubren:
- ✅ Flujos exitosos (happy path)
- ✅ Validaciones y errores
- ✅ Integración entre servicios
- ✅ Respuestas de APIs externas (mocked)

---

## Docker

```bash
# Build
docker build -t backend .

# Con docker-compose
docker-compose up --build
```

## Lint & Format

```bash
npm run lint
npm run format
```

---

## Arquitectura

El proyecto sigue una arquitectura por capas con el patrón de repositorio:

```
Controller → Service → Repository → Database
                ↓
              AI Service (Groq)
```

- **Inversión de dependencias**: Interfaces para services y repositories
- **Validación**: DTOs con `class-validator` y `class-transformer`
- **Modular**: Cada funcionalidad es un módulo independiente de NestJS

---

## Autor

**Auchana Matías Leonel** - Estudiante de Ingeniería en Sistemas de Información
