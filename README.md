# Real Estate API

API REST profesional para gestión de propiedades inmobiliarias.
Construida con **Node.js + Express + TypeScript + PostgreSQL + Prisma + JWT**, siguiendo principios de **Clean Architecture**.

---

## Tabla de Contenidos

- [Stack](#-stack)
- [Arquitectura](#-arquitectura)
- [Setup](#-setup)
- [Variables de Entorno](#-variables-de-entorno)
- [Endpoints](#-endpoints)
- [Autenticación](#-autenticación)
- [Ejemplos de Uso](#-ejemplos-de-uso)
- [Validaciones](#-validaciones)
- [Manejo de Errores](#-manejo-de-errores)
- [Documentación Swagger](#-documentación-swagger)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Decisiones Técnicas](#-decisiones-técnicas)

---

## Stack

| Tecnología | Uso |
|------------|-----|
| **Node.js** | Runtime |
| **Express 5** | Framework HTTP |
| **TypeScript** | Tipado estático |
| **PostgreSQL** | Base de datos relacional (Supabase) |
| **Prisma 6** | ORM + migraciones |
| **JWT** | Autenticación con tokens firmados |
| **bcryptjs** | Hash de contraseñas |
| **Zod** | Validación de body, params, query |
| **Swagger UI** | Documentación interactiva |
| **tsx** | Ejecución TypeScript en dev (hot reload) |

---

## Arquitectura

Clean Architecture en 4 capas:

```
┌─────────────────────────────────────────┐
│        interfaces (HTTP layer)          │  ← Controllers, Routes
├─────────────────────────────────────────┤
│        application (use cases)          │  ← Lógica de negocio
├─────────────────────────────────────────┤
│        domain (entities + contratos)    │  ← Reglas puras
├─────────────────────────────────────────┤
│        infrastructure (DB, JWT, env)    │  ← Detalles externos
└─────────────────────────────────────────┘
```

**Regla de dependencia**: capas externas dependen de internas. `domain` no conoce `infrastructure`.

---

## Setup

### 1. Clonar e instalar

```bash
git clone <repo-url>
cd PracticaBack
npm install
```

### 2. Configurar variables de entorno

Crear `.env` en la raíz:

```env
PORT=4000
JWT_SECRET=tu_secreto_super_seguro_aqui
DATABASE_URL="postgresql://usuario:password@host:5432/database"
```

### 3. Correr migraciones de Prisma

```bash
npx prisma migrate deploy
npx prisma generate
```

### 4. Levantar el servidor

```bash
npm run dev
```

Servidor disponible en:
- API: `http://localhost:4000/api/v1`
- Swagger: `http://localhost:4000/api/docs`

---

## Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | `4000` |
| `JWT_SECRET` | Clave secreta para firmar tokens JWT | `mi_clave_secreta` |
| `DATABASE_URL` | Cadena de conexión PostgreSQL | `postgresql://user:pass@host:5432/db` |

---

## Endpoints

Todos los endpoints están versionados bajo el prefijo **`/api/v1`**.

### Auth

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/v1/auth/register` | Registrar nuevo usuario | No |
| `POST` | `/api/v1/auth/login` | Iniciar sesión y obtener token JWT | No |

### Properties

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/v1/properties` | Listar propiedades (con filtros + paginación) | No |
| `GET` | `/api/v1/properties/:id` | Obtener propiedad por ID | No |
| `POST` | `/api/v1/properties` | Crear propiedad | Sí |
| `PUT` | `/api/v1/properties/:id` | Actualizar propiedad | Sí |
| `DELETE` | `/api/v1/properties/:id` | Eliminar propiedad | Sí |

---

## Autenticación

### Flujo

1. **Registrar usuario** → `POST /api/v1/auth/register`
2. **Iniciar sesión** → `POST /api/v1/auth/login` → recibes `token`
3. **Usar el token** en endpoints protegidos:
   ```http
   Authorization: Bearer <token>
   ```

### Detalles del token

- **Algoritmo**: HS256
- **Expiración**: 24 horas
- **Payload**: `{ id, email, iat, exp }`

---

## Ejemplos de Uso

### 1. Registrar usuario

```bash
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "123456"
  }'
```

**Respuesta `201`:**
```json
{
  "ok": true,
  "data": {
    "id": 1,
    "email": "admin@test.com"
  }
}
```

---

### 2. Iniciar sesión

```bash
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "123456"
  }'
```

**Respuesta `200`:**
```json
{
  "ok": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> Guarda el `token` — lo necesitas para crear, actualizar y eliminar propiedades.

---

### 3. Listar propiedades (público)

```bash
curl http://localhost:4000/api/v1/properties
```

**Con filtros + paginación:**

```bash
curl "http://localhost:4000/api/v1/properties?location=Medellin&minPrice=100000000&maxPrice=500000000&page=1&limit=10"
```

**Respuesta `200`:**
```json
{
  "ok": true,
  "data": [
    {
      "id": 1,
      "title": "Apartamento en El Poblado",
      "price": 350000000,
      "location": "Medellín",
      "available": true,
      "createdAt": "2026-05-07T01:24:39.613Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}
```

#### Query params disponibles

| Param | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `location` | string | — | Búsqueda parcial (case-insensitive) |
| `minPrice` | number | — | Precio mínimo |
| `maxPrice` | number | — | Precio máximo |
| `page` | number | `1` | Número de página |
| `limit` | number | `10` | Resultados por página (máx 100) |

---

### 4. Obtener propiedad por ID (público)

```bash
curl http://localhost:4000/api/v1/properties/1
```

**Respuesta `200`:**
```json
{
  "ok": true,
  "data": {
    "id": 1,
    "title": "Apartamento en El Poblado",
    "price": 350000000,
    "location": "Medellín",
    "available": true,
    "createdAt": "2026-05-07T01:24:39.613Z"
  }
}
```

---

### 5. Crear propiedad (protegido)

```bash
curl -X POST http://localhost:4000/api/v1/properties \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "title": "Casa Laureles",
    "price": 500000000,
    "location": "Laureles",
    "available": true
  }'
```

**Respuesta `201`:**
```json
{
  "ok": true,
  "data": {
    "id": 3,
    "title": "Casa Laureles",
    "price": 500000000,
    "location": "Laureles",
    "available": true,
    "createdAt": "2026-05-07T01:39:17.820Z"
  }
}
```

---

### 6. Actualizar propiedad (protegido)

Todos los campos son **opcionales** — manda solo lo que quieras cambiar.

```bash
curl -X PUT http://localhost:4000/api/v1/properties/3 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "price": 550000000,
    "available": false
  }'
```

**Respuesta `200`:**
```json
{
  "ok": true,
  "data": {
    "id": 3,
    "title": "Casa Laureles",
    "price": 550000000,
    "location": "Laureles",
    "available": false,
    "createdAt": "2026-05-07T01:39:17.820Z"
  }
}
```

---

### 7. Eliminar propiedad (protegido)

```bash
curl -X DELETE http://localhost:4000/api/v1/properties/3 \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

**Respuesta `200`:**
```json
{
  "ok": true,
  "message": "Propiedad eliminada correctamente"
}
```

---

## Validaciones

Implementadas con **Zod** en middleware genérico (`validate.ts`).

### Body — `POST /properties` (todos requeridos)

| Campo | Reglas |
|-------|--------|
| `title` | string, mínimo 3 caracteres |
| `price` | number, > 0 |
| `location` | string, mínimo 2 caracteres |
| `available` | boolean (default `true`) |

### Body — `PUT /properties/:id` (todos opcionales)

Mismas reglas, pero cualquier subconjunto.

### Params

| Campo | Reglas |
|-------|--------|
| `id` | string que matchee `^\d+$`, transformado a `number` |

### Query — `GET /properties`

Coerción automática string → number con `z.coerce.number()`.

### Body — Auth

| Campo | Reglas |
|-------|--------|
| `email` | string formato email válido |
| `password` | string, mínimo 6 caracteres |

---

## Manejo de Errores

Middleware global (`errorHandler.ts`) que mapea errores de negocio a códigos HTTP.

| Código | Cuándo |
|--------|--------|
| `200` | Éxito |
| `201` | Recurso creado |
| `400` | Datos inválidos / duplicado |
| `401` | Token faltante, inválido o expirado |
| `404` | Recurso no encontrado |
| `500` | Error interno |

### Formato de respuesta de error

```json
{
  "ok": false,
  "error": "Mensaje descriptivo",
  "details": [
    { "field": "price", "message": "El precio debe ser mayor a 0" }
  ]
}
```

`details` solo aparece en errores `400` de validación.

---

## Documentación Swagger

Disponible en:

```
http://localhost:4000/api/docs
```

Generada con `swagger-jsdoc` + `swagger-ui-express`.
Especificaciones en `src/infrastructure/swagger/docs/`.

---

## Estructura del Proyecto

```
src/
├── app.ts                              # Entry point — Express, middlewares, rutas
│
├── domain/                             # Capa de dominio (reglas puras)
│   ├── entities/
│   │   ├── Property.ts                 # Entidad con validaciones de negocio
│   │   └── User.ts
│   └── repositories/
│       ├── IPropertyRepository.ts      # Contrato (interfaz)
│       └── IUserRepository.ts
│
├── application/                        # Capa de casos de uso
│   └── usecases/
│       ├── CreateProperty.ts
│       ├── GetProperties.ts
│       ├── GetPropertyById.ts
│       ├── UpdateProperty.ts
│       ├── DeleteProperty.ts
│       ├── RegisterUser.ts
│       └── LoginUser.ts
│
├── infrastructure/                     # Capa de detalles externos
│   ├── db/
│   │   ├── prismaClient.ts             # Singleton de Prisma
│   │   ├── PrismaPropertyRepository.ts # Implementación con Prisma
│   │   └── PrismaUserRepository.ts
│   ├── middlewares/
│   │   ├── authMiddleware.ts           # Verificación de JWT
│   │   ├── validate.ts                 # Wrapper genérico de Zod
│   │   ├── errorHandler.ts             # Catch-all de errores
│   │   └── schemas/
│   │       ├── authSchemas.ts
│   │       └── propertySchemas.ts
│   └── swagger/
│       ├── swagger.ts
│       └── docs/
│           ├── auth.ts
│           └── properties.ts
│
└── interfaces/                         # Capa de entrada HTTP
    ├── controllers/
    │   ├── AuthController.ts
    │   └── PropertyController.ts
    └── routes/
        ├── index.ts                    # Router raíz montado en /api/v1
        ├── authRoutes.ts
        └── propertyRoutes.ts

prisma/
├── schema.prisma                       # Modelo de datos
└── migrations/                         # Historial de migraciones
```

---

## Decisiones Técnicas

### ¿Por qué Clean Architecture?
Separa la lógica de negocio de detalles externos (DB, framework HTTP). Permite cambiar Prisma por TypeORM sin tocar use cases ni entidades.

### ¿Por qué Prisma sobre SQL nativo?
- Type safety end-to-end
- Migraciones declarativas
- Auto-completado del schema en TypeScript
- Productividad alta sin perder legibilidad

### ¿Por qué Zod sobre Joi/class-validator?
- Inferencia de tipos automática (`z.infer<typeof Schema>`)
- API funcional simple
- `z.coerce` resuelve el caso de query params (siempre vienen como string)

### ¿Por qué JWT y no sesiones?
- Stateless — no requiere store en el server
- Escalable horizontalmente sin sticky sessions
- Estándar de facto en APIs REST

### ¿Por qué bcryptjs sobre bcrypt?
- Funciona en Windows sin compilar binarios nativos
- Pure JS, cero dependencias del sistema operativo

### ¿Por qué GETs públicos?
Spec del proyecto. Modelo similar a Zillow/Idealista — listar es público, modificar requiere auth.

### Manejo de password
- Validado en plano por Zod (mínimo 6 chars)
- Hasheado con bcrypt salt 10 antes de guardar
- Nunca devuelto en respuestas de API

---

## Equipo

Práctica académica realizada en parejas. Ambos integrantes contribuyen vía commits firmados.

---

## Scripts Disponibles

```bash
npm run dev      # Servidor con hot reload (tsx watch)
npm run build    # Compilar TypeScript a dist/
npm start        # Ejecutar build de producción
```

---

## Licencia

ISC
