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

Folgende Software muss installiert sein:

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

## 📊 Technologie-Stack

### Frontend
- **Vue 3** – Progressive JavaScript Framework
- **TypeScript** – Typsicheres JavaScript
- **Pinia** – State Management
- **Vue Router** – Client-Side Routing
- **Vite** – Build Tool
- **Tailwind CSS** – Utility-First CSS
- **Axios** – HTTP Client

### Backend
- **Node.js + Express** – Server Framework
- **TypeScript** – Typsicherer Code
- **Prisma ORM** – Datenbank-Abstraktionsschicht
- **PostgreSQL** – Relationale Datenbank
- **JWT** – Authentifizierung
- **Bcrypt** – Passwort-Hashing
- **Zod** – Schema-Validierung
- **Multer** – File Upload

---

## 🔐 Sicherheit & DSGVO

✅ **Implementiert:**
- Password-Hashing mit Bcrypt
- JWT-basierte Authentifizierung
- Input-Validierung mit Zod
- SQL-Injection-Schutz durch Prisma
- CORS-Konfiguration
- Audit-Logging aller Operationen
- Soft-Deletes (14 Tage Retention)
- Email-Verification vor Login

🚧 **Zu beachten:**
- Datenschutzerklärung hinzufügen
- Cookies-Banner implementieren
- HTTPS in Production aktivieren

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

- [Frontend README](./frontend/README.md) – Vue 3 Setup und Architektur
- [Backend README](./backend/README.md) – API-Dokumentation
- [Vue 3 Dokumentation](https://vuejs.org/)
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

**💡 Tip:** Bei Fragen oder Problemen → Check Troubleshooting oder frage im Team-Chat! 🚀
