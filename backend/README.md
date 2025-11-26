# Backend – Webtech-2025 API

Node.js + Express + Prisma Backend für das Infoletter Management System.

---

## 🏗️ Architektur

backend/
├── prisma/
│ ├── schema.prisma # Datenbank-Schema
│ └── migrations/ # Datenbank-Migrationen
├── src/
│ ├── config/ # Konfiguration (DB, Env, Multer)
│ ├── controllers/ # Request-Handler
│ ├── middleware/ # Auth, Logging, Validation
│ ├── routes/ # API-Routen
│ ├── services/ # Business-Logik
│ ├── utils/ # Hilfsfunktionen (JWT, Password, Validation)
│ ├── types/ # TypeScript Type Definitions
│ ├── app.ts # Express App Setup
│ └── server.ts # Server Entry Point
├── tests/ # API-Tests (REST Client)
├── uploads/ # Hochgeladene Dateien (gitignored)
├── .env # Environment Variables (gitignored)
├── .env.example # Environment Template
├── package.json
└── tsconfig.json

---

## 🚀 Installation & Setup

Siehe [Haupt-README](../README.md) für vollständige Installationsanleitung.

### Schnellstart

Dependencies installieren
npm install

.env erstellen
cp .env.example .env

Datenbank migrieren
npx prisma migrate dev

Prisma Client generieren
npx prisma generate

Development Server starten
npm run dev

---

## 🔌 API-Endpunkte

### Authentifizierung (`/api/auth`)

| Methode | Endpunkt | Beschreibung | Auth |
|---------|----------|--------------|------|
| POST | `/register` | Benutzer registrieren | ❌ |
| GET | `/verify-email/:token` | E-Mail verifizieren | ❌ |
| POST | `/login` | Einloggen | ❌ |
| POST | `/refresh` | Access Token erneuern | ❌ |
| POST | `/logout` | Ausloggen | ✅ |
| POST | `/forgot-password` | Passwort-Reset anfordern | ❌ |
| POST | `/reset-password` | Passwort zurücksetzen | ❌ |

### Benutzer (`/api/users`) 🚧

| Methode | Endpunkt | Beschreibung | Auth |
|---------|----------|--------------|------|
| GET | `/me` | Eigenes Profil abrufen | ✅ |
| PUT | `/me` | Profil bearbeiten | ✅ |
| POST | `/me/profile-image` | Profilbild hochladen | ✅ |
| DELETE | `/me` | Konto löschen | ✅ |
| GET | `/` | Alle Benutzer (Admin) | ✅ Admin |
| POST | `/` | Benutzer erstellen (Admin) | ✅ Admin |
| DELETE | `/:id` | Benutzer löschen (Admin) | ✅ Admin |

### Infoletters (`/api/infoletters`) 🚧

| Methode | Endpunkt | Beschreibung | Auth |
|---------|----------|--------------|------|
| GET | `/` | Alle Infoletters (paginiert) | ✅ |
| POST | `/` | Neuen Infoletter erstellen | ✅ |
| GET | `/:id` | Einzelnen Infoletter abrufen | ✅ |
| PUT | `/:id` | Infoletter bearbeiten | ✅ |
| DELETE | `/:id` | Infoletter löschen | ✅ |
| PATCH | `/:id/publish` | Infoletter veröffentlichen | ✅ |
| POST | `/:id/images` | Bild hochladen | ✅ |
| GET | `/:id/images` | Alle Bilder auflisten | ✅ |
| DELETE | `/:id/images/:imageId` | Bild löschen | ✅ |

### Collaborators (`/api/infoletters/:id/collaborators`) 🚧

| Methode | Endpunkt | Beschreibung | Auth |
|---------|----------|--------------|------|
| GET | `/` | Collaborators auflisten | ✅ |
| POST | `/` | Collaborator hinzufügen | ✅ Owner/Co-Author |
| PUT | `/:userId` | Rolle ändern | ✅ Owner |
| DELETE | `/:userId` | Collaborator entfernen | ✅ Owner/Co-Author |

### Versions (`/api/infoletters/:id/versions`) 🚧

| Methode | Endpunkt | Beschreibung | Auth |
|---------|----------|--------------|------|
| GET | `/` | Alle Versionen auflisten | ✅ |
| GET | `/:versionId` | Spezifische Version abrufen | ✅ |
| POST | `/` | Neue Version (Branch) | ✅ |
| POST | `/:versionId/merge` | Version mergen | ✅ Owner/Co-Author |

### Audit Logs (`/api/audit`) 🚧

| Methode | Endpunkt | Beschreibung | Auth |
|---------|----------|--------------|------|
| GET | `/` | Alle Logs | ✅ Admin |
| GET | `/users/:userId` | User-spezifische Logs | ✅ Admin |
| GET | `/infoletters/:id` | Infoletter-Logs | ✅ Admin |

---

## 🧪 API-Tests

### REST Client Extension (VSCode)

1. Installiere **REST Client** Extension
2. Öffne `tests/auth.http`
3. Klicke auf **"Send Request"**

### Beispiel-Request

Register
POST http://localhost:3001/api/auth/register
Content-Type: application/json

{
"email": "test@example.com",
"password": "securePassword123",
"name": "Max Mustermann"
}

---

## 🗄️ Datenbank-Schema

### Haupttabellen

- **users** – Benutzerkonten und Authentifizierung
- **refresh_tokens** – JWT Refresh Tokens
- **infoletters** – Infoletter mit Draft/Published Status
- **infoletter_collaborators** – Kollaborations-Rollen
- **infoletter_versions** – Versions-Historie und Branching
- **infoletter_images** – Hochgeladene Bilder
- **audit_logs** – Aktivitäts-Logging

### Prisma Studio

Visuelle Datenbank-Verwaltung:

npx prisma studio

Öffnet Browser auf [http://localhost:5555](http://localhost:5555)

---

## 🔧 Scripts

Development
npm run dev # Start mit Hot-Reload (tsx watch)

Build
npm run build # TypeScript kompilieren
npm start # Production Server starten

Prisma
npm run prisma:generate # Prisma Client generieren
npm run prisma:migrate # Neue Migration erstellen
npm run prisma:studio # Prisma Studio öffnen

---

## 🔐 Umgebungsvariablen

Siehe `.env.example` für alle verfügbaren Variablen.

### Wichtigste Variablen

| Variable | Beschreibung | Beispiel |
|----------|--------------|----------|
| `DATABASE_URL` | PostgreSQL Connection String | `postgresql://user:pass@localhost:5432/db` |
| `JWT_SECRET` | Secret für JWT-Signierung | Min. 32 Zeichen |
| `PORT` | Server Port | `3001` |
| `BASE_URL` | Öffentliche Backend-URL | `http://localhost:3001` |
| `NODE_ENV` | Environment | `development` / `production` |

---

## 📊 Logging & Monitoring

### Audit Logs

Alle wichtigen Aktionen werden automatisch geloggt:

- **REGISTER** – Benutzerregistrierung
- **LOGIN** / **LOGOUT** – Authentifizierung
- **EMAIL_VERIFY** – E-Mail-Verifizierung
- **PASSWORD_RESET** – Passwort-Änderungen
- **CREATE** / **UPDATE** / **DELETE** – CRUD-Operationen
- **INVITE_COLLABORATOR** / **REMOVE_COLLABORATOR** – Kollaboration
- **PUBLISH** / **UNPUBLISH** – Infoletter-Status

### Prisma Query Logging

Im Development-Modus werden alle DB-Queries geloggt:

// src/config/database.ts
new PrismaClient({
log: ['query', 'error', 'warn']
})

---

## 🔒 Sicherheit

### Implementierte Maßnahmen

- ✅ **Password Hashing** mit Bcrypt (12 Rounds)
- ✅ **JWT Tokens** mit 24h Expiry
- ✅ **Input Validation** mit Zod
- ✅ **SQL Injection Prevention** durch Prisma ORM
- ✅ **CORS** konfiguriert
- ✅ **Soft Deletes** für Datenwiederherstellung
- ✅ **Email Verification** vor Login
- ✅ **Rate Limiting** 🚧 (geplant)

---

## 🐛 Troubleshooting

### Prisma Fehler

**Problem:** `Prisma Client not generated`

npx prisma generate

**Problem:** `Migration failed`

ACHTUNG: Löscht alle Daten!
npx prisma migrate reset

### Port bereits belegt

Ändere PORT in .env
PORT=3002

### TypeScript Fehler

Node Modules neu installieren
rm -rf node_modules package-lock.json
npm install

---

## 📖 Weiterführende Dokumentation

- [Prisma Docs](https://www.prisma.io/docs/)
- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [JWT.io](https://jwt.io/)
- [Zod Validation](https://zod.dev/)

---

**Happy Coding! 🚀**