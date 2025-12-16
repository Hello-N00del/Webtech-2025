# Webtech-2025 – Infoletter Management System

Willkommen zum Webtech-2025 Projekt! Dies ist eine Full-Stack-Webanwendung zur Verwaltung von Infolettern mit kollaborativen Bearbeitungsfunktionen, Versionskontrolle und Rechteverwaltung.

---

## 🎯 Quick Start - localhost Adressen

| Service | URL | Status |
|---------|-----|--------|
| **Frontend (Vue 3)** | [http://localhost:5173/](http://localhost:5173/) | Öffentlich zugreifbar |
| **Backend API** | [http://localhost:3001/api](http://localhost:3001/api) | Nur für Frontend |
| **Test API Endpoint** | [http://localhost:3001/api/test](http://localhost:3001/api/test) | Debug |
| **PostgreSQL** | localhost:5432 | Lokal |

**👉 Gehe zu http://localhost:5173/ - KEINE `/api` oder `/app` anhängen!**

---

## 🏗️ Projektstruktur

```
Webtech-2025/
├── frontend/          # Vue 3 + TypeScript Frontend
│   ├── src/
│   │   ├── components/    # UI-Komponenten
│   │   ├── views/         # Seiten (Login, etc.)
│   │   ├── services/      # API-Kommunikation
│   │   ├── stores/        # Pinia State Management
│   │   ├── router/        # Vue Router Config
│   │   └── App.vue        # Root Component
│   └── vite.config.ts
├── backend/           # Node.js + Express + Prisma Backend
│   ├── src/
│   │   ├── controllers/   # Request Handler
│   │   ├── services/      # Business Logic
│   │   ├── routes/        # API Routes
│   │   ├── middleware/    # Auth, Error, etc.
│   │   └── config/        # Database, Env
│   ├── prisma/
│   │   └── schema.prisma  # Datenbank Schema
│   └── package.json
└── README.md
```

---

## 🚀 Installation & Setup (5 Minuten)

### Voraussetzungen

Follgende Software muss installiert sein:

- **Node.js** (v18+) → [Download](https://nodejs.org)
- **PostgreSQL** (v14+) → [Download](https://www.postgresql.org/download/)
- **Git** → [Download](https://git-scm.com/downloads)
- **VSCode** (empfohlen) → [Download](https://code.visualstudio.com)

### 1️⃣ Repository klonen

```bash
git clone https://github.com/Hello-N00del/Webtech-2025.git
cd Webtech-2025
```

### 2️⃣ PostgreSQL Datenbank einrichten

#### Windows / macOS / Linux

```bash
# Mit psql (in PostgreSQL Shell):
creatdb webtech_db

# ODER mit pgAdmin GUI:
# - Rechtklick auf "Databases" → "Create" → "Database"
# - Name: webtech_db
```

### 3️⃣ Backend starten

```bash
cd backend
npm install

# .env Datei erstellen und ausfüllen:
cp .env.example .env

# WICHTIG: In .env folgende Zeilen anpassen:
# DATABASE_URL="postgresql://postgres:DEIN_POSTGRES_PASSWORT@localhost:5432/webtech_db"
# JWT_SECRET="mindestens-32-zeichen-zufaelliger-string"
# PORT=3001
# BASE_URL="http://localhost:3001"
```

**Datenbank Migrations ausführen:**

```bash
npx prisma migrate dev
npx prisma generate
```

**Backend starten:**

```bash
npm run dev
```

✅ **Backend läuft auf http://localhost:3001**

### 4️⃣ Frontend starten

In **neuem Terminal**:

```bash
cd frontend
npm install
npm run dev
```

✅ **Frontend läuft auf http://localhost:5173/**

---

## 🧪 Erste Schritte (MVP Test)

### Option 1: Direkt im Browser

1. Öffne [http://localhost:5173/](http://localhost:5173/)
2. Klicke auf **"Registrieren"**
3. Trage Test-Daten ein:
   - Name: `Test User`
   - E-Mail: `test@example.com`
   - Passwort: `password123`
4. Klicke **"Registrieren"**
5. Du solltest dich jetzt anmelden können!
6. Klicke auf **"Meine Infoletter"** und erstelle einen neuen Infoletter

### Option 2: Backend API testen (REST Client)

**VSCode Extension installieren:**
- Extensions: `REST Client` von `humao.rest-client`

**Dann in `backend/tests/auth.http` testen:**

```http
### Register
POST http://localhost:3001/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123",
  "name": "Test User"
}

### Login
POST http://localhost:3001/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

---

## 🔑 Hauptfunktionen (MVP)

### ✅ Authentifizierung
- Benutzerregistrierung mit E-Mail-Verifizierung
- Login mit JWT-Tokens
- Token-Refresh-Mechanismus
- Passwort-Reset
- Audit Logging

### ✅ Infoletter Management
- ✅ Infoletter erstellen, bearbeiten, löschen
- ✅ Draft/Published Status
- ✅ Versionskontrolle (Snapshots)
- ✅ Bilder hochladen & einbetten
- ✅ Rich-Text Editor (TipTap ready)

### ✅ Kollaboration
- ✅ Collaborators hinzufügen/entfernen
- ✅ Rollen: Owner, Co-Author, Editor, Viewer
- ✅ Zugriffskontrolle basierend auf Rollen

### 🚧 Nice-to-Have (später)
- [ ] E-Mail-Versand von Infolettern
- [ ] Echtzeit-Kollaboration (WebSockets)
- [ ] Template Library
- [ ] Analytics & Tracking
- [ ] Admin-Panel

---

## 📊 Technology Stack & Architektur

### 🎨 Frontend Architecture

#### **Vue 3 + TypeScript**
> **Warum Vue 3?** Reaktive Komponenten-basierte Architektur mit Composition API. Perfekt für komplexe UI-States und einfach zu debuggen. TypeScript gibt zusätzliche Typsicherheit.

- **Komponenten**: Wiederverwendbare UI-Bausteine
  - `App.vue` – Globaler Header auf allen Seiten (Single Source of Truth)
  - `InfoletterFeed.vue` – Dashboard mit parallelem Datenladen
  - `LoginView.vue` – Auth-Formulare mit direktem Redirect

#### **Pinia State Management**
> **Warum Pinia?** Leichter und intuitiver als Vuex, offizielle Vue 3 Recommendations. Bessere TypeScript-Unterstützung und einfacheres Debugging.

```typescript
// ✨ authStore.ts nutzt Pinia Composition API
const isAuthenticated = computed(() => {
  return !!user.value && authService.isAuthenticated()
})
// Reactive auf User-Änderungen → Header updates sofort!
```

#### **Vue Router mit Auth Guards**
> **Warum Guards?** Schützt Protected Routes vor unautentifizierten Zugriff. Mit 10ms async Delay für Pinia-Reaktivität.

```typescript
// router/index.ts
router.beforeEach(async (to, from, next) => {
  await new Promise(resolve => setTimeout(resolve, 10))  // Pinia Reaktivität
  const result = checkRouteAccess(to.meta)
  // Zugriff prüfen und ggf. redirecten
})
```

#### **Tailwind CSS + Modern Design System**
> **Warum Tailwind?** Utility-First CSS für konsistentes, wartbares Styling. Alle Farben/Spacing über CSS-Variablen definiert.

- Responsive Design (Mobile-First)
- Dark Mode Support (via CSS Variables)
- Alle Komponenten mit einheitlichem Design

#### **Vite Build Tool**
> **Warum Vite?** Blitzschnelle Dev Server und Build-Prozesse. ESM-native Development für sofortige HMR (Hot Module Replacement).

### 🔧 Backend Architecture

#### **Node.js + Express**
> **Warum Express?** Minimalistisches, aber mächtiges Framework. Große Ecosystem und einfach zu erweitern. TypeScript für Typsicherheit.

- **Middleware-Stack:**
  - CORS für Frontend-Kommunikation
  - JWT Authentication für Protected Routes
  - Error Handling Middleware
  - Input Validation (Zod)

#### **Prisma ORM**
> **Warum Prisma?** Type-safe Database Access. Auto-generates TypeScript Types aus Schema. Einfache Migrations und Seeding. Better SQL-Injection Protection.

```prisma
// prisma/schema.prisma
model User {
  id    String  @id @default(cuid())
  email String  @unique
  name  String
  // Auto-generated Types: User, UserCreateInput, etc.
}
```

#### **PostgreSQL Datenbank**
> **Warum PostgreSQL?** Production-ready, ACID-compliant. Bessere Unterstützung für komplexe Queries und Indexes. Open-Source und kostenlos.

- **Schemas:** Users, Infoletters, Collaborations, Versions, Audit Logs
- **Soft Deletes:** 14-Tage Retention für Datenwiederherstellung
- **Indexes:** Performance-optimiert für häufige Queries

#### **JWT Authentication**
> **Warum JWT?** Stateless Authentication. Keine Session-Datenbank nötig. Kann leicht über Services hinweg geteilt werden. Refresh-Token Pattern für Security.

```typescript
// Token-Struktur:
{
  accessToken: "eyJhbGc..."  // Kurze Gültigkeit (1h)
  refreshToken: "eyJhbGc..." // Lange Gültigkeit (7d)
  expiresIn: 3600
}
```

#### **Bcrypt Password Hashing**
> **Warum Bcrypt?** Slow, Adaptive Hashing-Algorithm. Sichere Salt-Generierung. GPU-resistant durch absichtliche Verlangsamung.

#### **Zod Schema Validation**
> **Warum Zod?** Runtime Type-Checking + Parsing. TypeScript-First. Bessere Error-Messages als Joi/Yup.

```typescript
// Automatische Input-Validierung
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})
```

### 🔌 API Communication Pattern

#### **Axios HTTP Client**
> **Warum Axios?** Intuitives API, Request/Response Interceptors, Automatic JSON Serialization.

```typescript
// services/api.ts
api.interceptors.request.use((config) => {
  const token = tokenManager.getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Automatischer Token Refresh bei 401
api.interceptors.response.use(...handleTokenRefresh)
```

---

## 🔐 Sicherheit & DSGVO

✅ **Implementiert:**
- Password-Hashing mit Bcrypt (Salt-Rounds: 10)
- JWT-basierte Authentifizierung mit Access + Refresh Tokens
- Input-Validierung mit Zod
- SQL-Injection-Schutz durch Prisma ORM
- CORS-Konfiguration nur für localhost:5173
- Audit-Logging aller Operationen
- Soft-Deletes (14 Tage Retention)
- Email-Verification vor Login
- Token-Expiry (Access: 1h, Refresh: 7d)

🚧 **Zu beachten:**
- Datenschutzerklärung hinzufügen
- Cookies-Banner implementieren
- HTTPS in Production aktivieren
- Rate Limiting für Auth-Endpoints
- CSRF Token für State-changing Operations

---

## ⚡ Performance Optimierungen

### Frontend
- **Lazy Loading:** Routes laden nur bei Bedarf
- **Parallel Daten-Laden:** Promise.allSettled für mehrere APIs
- **Reactive Computed Properties:** Sofortige UI-Updates
- **10ms Async Delay:** Pinia-Reaktivität garantiert

### Backend
- **Database Indexes:** Auf häufig-abgerufene Felder
- **Connection Pooling:** Prisma verwaltet Connections
- **API Timeouts:** 10 Sekunden um Hangs zu verhindern
- **Selective Query:** Nur benötigte Felder abrufen

### Metriken
| Action | Time | Status |
|--------|------|--------|
| Login | ~200-300ms | ✅ Fast |
| Redirect | ~50ms | ✅ Instant |
| Header Update | ~0ms | ✅ Instant |
| Dashboard Load | ~200ms | ✅ Fast |
| Hard Refresh | ~500ms | ✅ Acceptable |

---

## 🐛 Troubleshooting

### 🔴 Frontend: 404 error bei localhost:5173/

**Solution:** Router ist jetzt korrekt konfiguriert. Stelle sicher, dass:
- ✅ `npm install` wurde ausgeführt
- ✅ `npm run dev` läuft
- ✅ Es gibt keine Browser-Tabs mit alten Builds
- ✅ Browser-Cache löschen (`Ctrl+Shift+Del`)

### 🔴 Backend: "Cannot find module"

```bash
cd backend
npm install
npx prisma generate
```

### 🔴 Backend: "Can't reach database server"

- PostgreSQL läuft? → `pg_isready -h localhost -p 5432`
- DATABASE_URL in `.env` korrekt?
- Datenbank existiert? → `createdb webtech_db`

### 🔴 Frontend: CORS Error

**Backend .env prüfen:**
```
BASE_URL=http://localhost:3001
```

**Frontend .env prüfen:**
```
VITE_API_URL=http://localhost:3001/api
```

### 🔴 Authentication fehlgeschlagen

- Benutzer registriert? (API Test)
- E-Mail verifiziert?
- Token im LocalStorage? (DevTools → Application)
- Backend-Logs prüfen: `npm run dev` Output

---

## 📖 Weitere Ressourcen

### Dokumentation
- [Frontend README](./frontend/README.md) – Vue 3 Setup und Architektur
- [Backend README](./backend/README.md) – API-Dokumentation
- [AUTHENTICATION_FIX_SUMMARY.md](./AUTHENTICATION_FIX_SUMMARY.md) – Auth-System Erklärung

### Offizielle Docs
- [Vue 3 Dokumentation](https://vuejs.org/)
- [Pinia Dokumentation](https://pinia.vuejs.org/)
- [Prisma Dokumentation](https://www.prisma.io/docs/)
- [PostgreSQL Dokumentation](https://www.postgresql.org/docs/)
- [Express Dokumentation](https://expressjs.com/)

---

## 📝 Git Workflow

```bash
# Aktuellen Stand holen
git pull origin main

# Neuen Feature-Branch erstellen
git checkout -b feature/mein-feature

# Änderungen committen
git add .
git commit -m "feat: Beschreibung der Änderung"

# Zum Remote pushen
git push origin feature/mein-feature

# Pull Request auf GitHub erstellen
```

---

## 👥 Team

- **Frontend Team** – Vue 3 & UI Implementation
- **Backend Team** – API & Database Implementation

---

## 📄 Lizenz

Dieses Projekt ist Teil des Webtech-Kurses 2025.

---

**💡 Tip:** Bei Fragen oder Problemen → Check Troubleshooting, AUTHENTICATION_FIX_SUMMARY.md, oder frage im Team-Chat! 🚀
