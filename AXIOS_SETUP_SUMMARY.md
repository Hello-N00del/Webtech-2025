# 🚀 Axios Setup - Zusammenfassung

**Status**: ✅ **ABGESCHLOSSEN** am 08.12.2025

Das Frontend-Projekt wurde mit einem professionellen Axios HTTP-Client konfiguriert, der alle API-Kommunikation mit JWT-basierter Authentifizierung, automatischem Token-Refresh und zentralisiertem Error-Handling handhabt.

---

## 📄 Was wurde implementiert?

### 💿 Dependencies
- ✅ **axios ^1.7.7** - HTTP Client Library

### 📚 Core Files

| Datei | Zweck | Status |
|-------|-------|--------|
| `frontend/src/services/api.ts` | Axios-Instanz mit Interceptors | ✅ |
| `frontend/src/services/authService.ts` | Auth API-Calls (Login, Register, Logout) | ✅ |
| `frontend/src/services/infoletterService.ts` | Infoletter CRUD API-Calls | ✅ |
| `frontend/src/utils/tokenManager.ts` | Token Storage Management | ✅ |
| `frontend/src/utils/apiErrorHandler.ts` | Error Handling & Custom Error Class | ✅ |
| `frontend/src/types/api.ts` | TypeScript Interfaces | ✅ |
| `frontend/.env.example` | Environment Variables Template | ✅ |
| `frontend/AXIOS_SETUP.md` | Detaillierte Dokumentation | ✅ |

---

## 🎨 Features

### 🔐 Authentication (JWT)
- ✅ Access Token Speicherung in localStorage
- ✅ Refresh Token Handling
- ✅ Automatische Token Injection in Request Headers
- ✅ Automatischer Token Refresh bei Expiry
- ✅ Queue für parallele Requests bei Token Refresh

### 🖄 Error Handling
- ✅ Custom `ApiError` Klasse
- ✅ Status-Code basierte Fehlermeldungen
- ✅ Validierungsfehler Extraktion
- ✅ Auth-Error Erkennung
- ✅ Benutzerfreundliche Fehlermeldungen

### 💫 Interceptors
- ✅ Request Interceptor: Adds Authorization Header
- ✅ Response Interceptor: Error Handling & Token Refresh
- ✅ Automatic Response Data Unwrapping

### 🤐 Services
- ✅ **authService**: Login, Register, Logout, Password Reset, Profile Management
- ✅ **infoletterService**: CRUD Operations mit Pagination & Filtering
- ✅ Konsistentes Error-Handling über alle Services

---

## 🚀 Quick Start

### 1. Dependencies installieren
```bash
cd frontend
npm install
```

### 2. Environment konfigurieren
```bash
cp .env.example .env.local
```

### 3. Im Code verwenden

**Login:**
```typescript
import { authService } from '@/services/authService'

const response = await authService.login({
  email: 'user@example.com',
  password: 'password123'
})
```

**API Call (Infoletter):**
```typescript
import { infoletterService } from '@/services/infoletterService'

const infoletters = await infoletterService.fetchInfoletters({
  page: 1,
  pageSize: 10
})
```

**Error Handling:**
```typescript
import { ApiError, getErrorMessage } from '@/utils/apiErrorHandler'

try {
  // API Call
} catch (error) {
  if (error instanceof ApiError) {
    console.error(getErrorMessage(error))
  }
}
```

---

## 📋 Architektur

```
┌───────────────────────────────┋
│ Vue Components / Pinia Stores │
└───────────────────────────────┘
         ↑
         │ import
         ↓
┌─────────────────────────┋
│  API Services           │
│  - authService          │
│  - infoletterService    │
│  - (weitere Services)   │
└─────────────────────────┘
         ↑
         │ uses
         ↓
┌─────────────────────────┋
│  Axios Instance (api.ts)│
│  - Request Interceptor  │
│  - Response Interceptor │
│  - Token Refresh Logic  │
└─────────────────────────┘
         ↑
         │ uses
         ↓
┌─────────────────────────┋
│  Utils & Types          │
│  - tokenManager.ts      │
│  - apiErrorHandler.ts   │
│  - api.ts (types)       │
└─────────────────────────┘
         ↑
         │ uses
         ↓
┌───────────────────────────┋
│  Backend API              │
│  http://localhost:3001/api│
└───────────────────────────┘
```

---

## 🔁 Request/Response Flow

### Normaler Flow
```
1. Vue Component ruft authService.login() auf
2. authService verwendet postRequest('/auth/login', ...)
3. postRequest verwendet api.post(...) (Axios-Instanz)
4. REQUEST INTERCEPTOR fügt Authorization Header hinzu
5. Request wird an Backend gesendet
6. Backend antwortet mit 200 + { accessToken, refreshToken, ... }
7. RESPONSE INTERCEPTOR verarbeitet Response
8. Token wird in localStorage gespeichert
9. Service gibt AuthResponse zurück
10. Component erhält Daten und kann damit arbeiten
```

### Token Refresh Flow (bei Expiry)
```
1. Component macht API Call
2. Backend antwortet mit 401 Unauthorized
3. RESPONSE INTERCEPTOR erkennt 401
4. Interceptor sendet Refresh Token an /auth/refresh
5. Backend gibt neuen Access Token zurück
6. Neuer Token wird in localStorage gespeichert
7. Ursprünglicher Request wird mit neuem Token wiederholt
8. Response wird zurückgegeben
```

---

## 📋 Verwendete Patterns

### Service Pattern
Alle API-Calls sind in Services kapselt, nicht direkt in Components.

### Error Handling Pattern
Zentralisiertes Error Handling über `ApiError` Klasse und Helper-Funktionen.

### Token Manager Pattern
Token-Storage wird zentral verwaltet, nicht in Components.

### Interceptor Pattern
Request/Response Logic wird über Interceptors zentralisiert.

---

## 🌟 Nächste Aufgaben

Mit dem Axios-Setup abgeschlossen können wir folgende Aufgaben angehen:

1. **Vue Components** für Login/Register/Dashboard
2. **Pinia Stores** für State Management (User, Infoletters, etc.)
3. **Router Guards** für authentifizierte Routes
4. **Error Pages & Error UI** für API-Fehlerbehandlung
5. **Loading States** in Components
6. **Form Validation** mit Zod oder anderen Libraries
7. **Infoletter Editor** mit TipTap
8. **Collaboration Features** (Roles, Permissions)
9. **Real-time Features** (WebSockets) - optional

---

## 📦 Commits

1. ✅ `feat: Add axios dependency for API integration`
2. ✅ `feat: Add API response and error type definitions`
3. ✅ `feat: Add token manager for JWT handling`
4. ✅ `feat: Add centralized API error handler`
5. ✅ `feat: Create Axios API client with JWT interceptors`
6. ✅ `feat: Create auth service with login/register/logout functions`
7. ✅ `feat: Update infoletter service with Axios API calls`
8. ✅ `feat: Add environment variables example`
9. ✅ `docs: Add comprehensive Axios setup documentation`
10. ✅ `docs: Add Axios setup summary for quick reference`

---

## 📚 Dokumentation

Detaillierte Dokumentation mit Beispielen und Best Practices findest du in:

📓 **[frontend/AXIOS_SETUP.md](./frontend/AXIOS_SETUP.md)**

---

## 🔨 Troubleshooting

**Problem**: "Cannot find module 'axios'"  
**Lösung**: `npm install` im `frontend/` Ordner ausführen

**Problem**: "VITE_API_URL is undefined"  
**Lösung**: `.env.local` erstellen mit `VITE_API_URL=http://localhost:3001/api`

**Problem**: "401 Unauthorized bei jedem Request"  
**Lösung**: Backend muss auf Port 3001 laufen und OAuth/JWT korrekt konfiguriert sein

---

## 🎉 Zusammenfassung

Das Frontend ist nun vollständig für die API-Integration vorbereitet! Der Axios HTTP Client bietet:

✅ Type-Safe API-Calls mit TypeScript  
✅ Automatische JWT Token-Verwaltung  
✅ Automatischer Token Refresh  
✅ Zentralisiertes Error Handling  
✅ Service-basierte API-Struktur  
✅ Wiederverwendbare Request-Funktionen  

**Der Design-Developer kann jetzt mit dieser Setup-Grundlage UI-Komponenten erstellen, die einfach die Services nutzen können!** 🚀
