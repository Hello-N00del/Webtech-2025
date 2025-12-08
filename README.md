# Webtech-2025 – Infoletter Management System

Willkommen zum Webtech-2025 Projekt! Dies ist eine Full-Stack-Webanwendung zur Verwaltung von Infolettern mit kollaborativen Bearbeitungsfunktionen, Versionskontrolle und Rechteverwaltung.

---

## 🏗️ Projektstruktur

Webtech-2025/

├── frontend/ # Vue 3 + TypeScript Frontend

├── backend/ # Node.js + Express + Prisma Backend

└── README.md # Diese Datei

---

## 🚀 Schnellstart

### Voraussetzungen

Folgende Software muss installiert sein:

- **Node.js** (v18 oder höher) – [Download](https://nodejs.org)
- **PostgreSQL** (v14 oder höher) – [Download](https://www.postgresql.org/download/)
- **Git** – [Download](https://git-scm.com/downloads)
- **Visual Studio Code** (empfohlen) – [Download](https://code.visualstudio.com)

---

## 📦 Installation

### 1. Repository klonen

git clone https://github.com/Hello-N00del/Webtech-2025.git
cd Webtech-2025

### 2. PostgreSQL Datenbank einrichten

#### Windows

1. **PostgreSQL installieren**
   - Lade PostgreSQL von [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/) herunter
   - Installiere mit den Standard-Einstellungen
   - Merke dir das **Passwort für den postgres-User**!

2. **Datenbank erstellen**
   
   Öffne **pgAdmin 4** (wurde mit PostgreSQL installiert):
   
   - Rechtsklick auf **Databases** → **Create** → **Database**
   - Name: `webtech_db`
   - Owner: `postgres`
   - **Save**

   **ODER** über die Kommandozeile:

PostgreSQL SQL Shell (psql) öffnen
psql -U postgres

Passwort eingeben, dann:
CREATE DATABASE webtech_db;

Beenden mit:
\q

#### macOS

PostgreSQL installieren (mit Homebrew)
brew install postgresql@14
brew services start postgresql@14

Datenbank erstellen
createdb webtech_db


#### Linux (Ubuntu/Debian)

PostgreSQL installieren
sudo apt update
sudo apt install postgresql postgresql-contrib

Datenbank erstellen
sudo -u postgres createdb webtech_db

### 3. Backend einrichten

cd backend

Dependencies installieren
npm install

Environment-Datei erstellen
cp .env.example .env


**Bearbeite `.env` und setze deine PostgreSQL-Credentials:**

DATABASE_URL="postgresql://postgres:DEIN_PASSWORT@localhost:5432/webtech_db?schema=public"
JWT_SECRET="dein-super-geheimer-jwt-secret-key-mindestens-32-zeichen"
PORT=3001
BASE_URL="http://localhost:3001"


**Ersetze:**
- `DEIN_PASSWORT` mit deinem PostgreSQL-Passwort
- `JWT_SECRET` mit einem sicheren, zufälligen String (mind. 32 Zeichen)

**Datenbank-Migrationen ausführen:**

npx prisma migrate dev
npx prisma generate


**Backend starten:**

npm run dev


✅ Backend läuft jetzt auf [http://localhost:3001](http://localhost:3001)

### 4. Frontend einrichten

Öffne ein **neues Terminal** (Backend läuft weiter!):

cd frontend

Dependencies installieren
npm install

Frontend starten
npm run dev

✅ Frontend läuft jetzt auf [http://localhost:5173](http://localhost:5173/public/)

---

## 🧪 API-Tests

Das Backend enthält vorgefertigte API-Tests mit der REST Client Extension für VSCode.

### REST Client Extension installieren

1. Öffne VSCode
2. Extensions (Strg+Shift+X)
3. Suche nach **REST Client** (`humao.rest-client`)
4. Installieren

### Tests ausführen

Öffne `backend/tests/auth.http` und klicke auf **"Send Request"** über den einzelnen Requests.

---

## 📚 Projektdokumentation

- **[Frontend README](./frontend/README.md)** – Vue 3 Setup und Entwicklung
- **[Backend README](./backend/README.md)** – API-Dokumentation und Architektur

---

## 🛠️ Technologie-Stack

### Frontend
- **Vue 3** – Progressive JavaScript Framework
- **TypeScript** – Typsicheres JavaScript
- **Pinia** – State Management
- **Vue Router** – Routing
- **Vite** – Build Tool

### Backend
- **Node.js + Express** – Server Framework
- **Prisma ORM** – Datenbank-Abstraktionsschicht
- **PostgreSQL** – Relationale Datenbank
- **JWT** – Authentifizierung
- **Bcrypt** – Passwort-Hashing
- **Zod** – Schema-Validierung
- **Multer + Sharp** – Bildupload und -optimierung

---

## 🔑 Hauptfunktionen

### Authentifizierung
- ✅ Benutzerregistrierung mit E-Mail-Verifizierung
- ✅ Login mit JWT-Tokens
- ✅ Passwort-Reset-Funktionalität
- ✅ Token-Refresh-Mechanismus

### Benutzerverwaltung
- 🚧 Rollen (Admin, User)
- 🚧 Profilbearbeitung
- 🚧 Profilbild-Upload

### Infoletter
- 🚧 Erstellen, Bearbeiten, Löschen
- 🚧 Draft/Published Status
- 🚧 Rich Text Editing (TipTap)
- 🚧 Bildeinbettung
- 🚧 Kollaboration mit Rollen (Owner, Co-Author, Editor, Viewer)
- 🚧 Versionskontrolle und Branching
- 🚧 Pagination, Suche und Filter
- 🚧 Soft Deletes

### Sicherheit & Monitoring
- ✅ Audit Logging (CRUD, Login, Logout, etc.)
- ✅ Input-Validierung
- ✅ SQL-Injection-Schutz (Prisma)
- ✅ Password-Hashing (Bcrypt)

✅ = Implementiert | 🚧 = In Entwicklung

---

## 👥 Team & Entwicklung

### Git-Workflow

Aktuellen Stand holen
git pull

Neuen Branch erstellen
git checkout -b feature/dein-feature

Änderungen committen
git add .
git commit -m "feat: Beschreibung der Änderung"

Push zum Remote
git push origin feature/dein-feature

### VSCode Extensions (empfohlen)

- **Volar** – Vue 3 Support
- **Prettier** – Code-Formatierung
- **ESLint** – Linting
- **Prisma** – Prisma Schema Support
- **REST Client** – API-Tests
- **GitLens** – Git-Visualisierung
- **Thunder Client** – Alternative zu Postman

---

## 🐛 Troubleshooting

### Backend startet nicht

**Problem:** `Error: Cannot find module`

cd backend
npm install
npx prisma generate

**Problem:** `Can't reach database server`
- Überprüfe ob PostgreSQL läuft
- Überprüfe DATABASE_URL in `.env`
- Teste Verbindung: `psql -U postgres -d webtech_db`

### Frontend startet nicht

**Problem:** `EADDRINUSE: Port 5173 already in use`

Anderen Port verwenden
npm run dev -- --port 5174

### Prisma-Fehler

**Problem:** `Prisma Client not generated`

Reset und neu migrieren (ACHTUNG: Löscht Daten!)
npx prisma migrate reset

---

## 📖 Weitere Ressourcen

- [Vue 3 Dokumentation](https://vuejs.org/)
- [Prisma Dokumentation](https://www.prisma.io/docs/)
- [PostgreSQL Dokumentation](https://www.postgresql.org/docs/)
- [Express Dokumentation](https://expressjs.com/)

---

## 📄 Lizenz

Dieses Projekt ist Teil des Webtech-Kurses 2025.

---

**Viel Erfolg beim Entwickeln! 🚀**
