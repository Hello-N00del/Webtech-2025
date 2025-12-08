# 🔌 Axios Setup - Dokumentation

## Überblick

Das Frontend ist nun mit einem vollständig konfigurierten **Axios HTTP Client** ausgestattet, der automatisch:

✅ JWT-Token-basierte Authentifizierung handhabt  
✅ Token-Refresh bei Expiry durchführt  
✅ Globale Error-Behandlung bietet  
✅ Request/Response Interceptors nutzt  
✅ Type-Safe API-Calls mit TypeScript ermöglicht  

---

## 📁 Dateistruktur

```
frontend/src/
├── services/
│   ├── api.ts                    # 🎯 Hauptbestandteil - Axios-Instanz
│   ├── authService.ts            # Auth-API-Calls (login, register, logout)
│   └── infoletterService.ts      # Infoletter-API-Calls (CRUD)
│
├── utils/
│   ├── tokenManager.ts           # Token-Speicherverwaltung
│   └── apiErrorHandler.ts        # Zentralisiertes Error Handling
│
└── types/
    └── api.ts                    # TypeScript Interfaces für API
```

---

## 🚀 Installation

### 1️⃣ Dependencies installieren

Axios wurde bereits zu `package.json` hinzugefügt:

```bash
cd frontend
npm install
```

### 2️⃣ Environment Variables konfigurieren

Erstellte `.env.local` basierend auf `.env.example`:

```bash
cp .env.example .env.local
```

Inhalt von `.env.local`:

```env
# API Configuration
VITE_API_URL=http://localhost:3001/api

# App Configuration
VITE_APP_TITLE=Webtech-2025 Infoletter Management
```

---

## 🔑 Core Konzepte

### Request Interceptor

Fügt automatisch den **Authorization Header** mit JWT-Token hinzu:

```typescript
// Automatisch bei jedem Request
header: {
  'Authorization': 'Bearer <access_token>'
}
```

### Response Interceptor

Handhabt automatisch:

1. **Erfolgreiche Responses**: Gibt nur die `data` zurück
2. **401 Errors**: Versucht Token zu refreshen
3. **Andere Errors**: Wandelt in `ApiError` um

### Token Refresh Logic

Wenn Access Token abgelaufen:

1. Client sendet Refresh Token
2. Backend gibt neuen Access Token zurück
3. Ursprünglicher Request wird wiederholt
4. Parallele Requests warten auf neuen Token

---

## 📝 API Services verwenden

### Auth Service

```typescript
import { authService } from '@/services/authService'

// Login
const authResponse = await authService.login({
  email: 'user@example.com',
  password: 'password123'
})

// Register
const newUser = await authService.register({
  email: 'newuser@example.com',
  password: 'secure123',
  name: 'Max Mustermann'
})

// Get Current User
const user = await authService.getCurrentUser()

// Logout
await authService.logout()

// Check Auth Status
if (authService.isAuthenticated()) {
  // User ist angemeldet
}
```

### Infoletter Service

```typescript
import { infoletterService } from '@/services/infoletterService'

// Alle abrufen (mit Pagination)
const response = await infoletterService.fetchInfoletters({
  page: 1,
  pageSize: 10,
  status: 'PUBLISHED',
  search: 'Newsletter',
  sortBy: 'updatedAt',
  sortOrder: 'desc'
})

console.log(response.data)       // Array von Infoletttern
console.log(response.pagination) // Pagination-Info

// Einzelnen abrufen
const infoletter = await infoletterService.fetchInfoletter('123')

// Erstellen
const newLetter = await infoletterService.createInfoletter({
  title: 'Mein Newsletter',
  content: 'Inhalt...'
})

// Aktualisieren
const updated = await infoletterService.updateInfoletter('123', {
  title: 'Neuer Titel'
})

// Veröffentlichen
const published = await infoletterService.publishInfoletter('123')

// Löschen
await infoletterService.deleteInfoletter('123')

// Bild hochladen
const file = event.target.files[0]
await infoletterService.uploadImage('123', file)
```

---

## 🛠️ Error Handling

### Mit try-catch

```typescript
import { authService } from '@/services/authService'
import { ApiError } from '@/utils/apiErrorHandler'

try {
  const user = await authService.login({
    email: 'test@example.com',
    password: 'wrong'
  })
} catch (error) {
  if (error instanceof ApiError) {
    console.error('Status:', error.statusCode)      // 401
    console.error('Message:', error.message)        // "Invalid credentials"
    console.error('Validation Errors:', error.errors) // { email: ['Invalid'] }
  }
}
```

### Error Helper Functions

```typescript
import {
  ApiError,
  getErrorMessage,
  isAuthError,
  isValidationError,
  getValidationErrors
} from '@/utils/apiErrorHandler'

try {
  // ...
} catch (error) {
  if (error instanceof ApiError) {
    // Benutzerfreundliche Meldung
    const userMessage = getErrorMessage(error)
    console.error(userMessage)

    // Authentifizierungsfehler?
    if (isAuthError(error)) {
      // Redirect zu Login
    }

    // Validierungsfehler?
    if (isValidationError(error)) {
      const fieldErrors = getValidationErrors(error)
      // Form-Fehler anzeigen
    }
  }
}
```

---

## 🔐 Token Management

Das `tokenManager` Utility handhabt die localStorage-Verwaltung:

```typescript
import { tokenManager } from '@/utils/tokenManager'

// Token speichern (wird automatisch in authService gemacht)
tokenManager.setTokens(accessToken, refreshToken, expiresIn)

// Token abrufen
const token = tokenManager.getAccessToken()
const refreshToken = tokenManager.getRefreshToken()

// Prüfen ob Tokens vorhanden
if (tokenManager.hasTokens()) {
  // User hat gespeicherte Tokens
}

// Prüfen ob abgelaufen
if (tokenManager.isTokenExpired()) {
  // Token ist abgelaufen - Refresh nötig
}

// Verbleibende Zeit abrufen (in Sekunden)
const remaining = tokenManager.getTokenTimeRemaining()

// Tokens löschen
tokenManager.clearTokens()
```

---

## 🔄 Vue Komponente Beispiel

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { authService } from '@/services/authService'
import { ApiError, getErrorMessage } from '@/utils/apiErrorHandler'

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await authService.login({
      email: email.value,
      password: password.value
    })

    // Token wurde automatisch gespeichert
    console.log('Login erfolgreich!', response.user)
    // Redirect zur Dashboard
  } catch (error) {
    if (error instanceof ApiError) {
      errorMessage.value = getErrorMessage(error)
    } else {
      errorMessage.value = 'Ein unerwarteter Fehler ist aufgetreten'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" type="email" placeholder="E-Mail" />
    <input v-model="password" type="password" placeholder="Passwort" />
    <button :disabled="loading">{{ loading ? 'Loading...' : 'Login' }}</button>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </form>
</template>
```

---

## 🎯 Pinia Store Beispiel

```typescript
// src/stores/authStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService, type UserInfo } from '@/services/authService'
import { ApiError, getErrorMessage } from '@/utils/apiErrorHandler'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserInfo | null>(null)
  const loading = ref(false)
  const error = ref('')

  const isAuthenticated = computed(() => {
    return authService.isAuthenticated() && !!user.value
  })

  async function login(email: string, password: string) {
    loading.value = true
    error.value = ''

    try {
      const response = await authService.login({ email, password })
      user.value = response.user
    } catch (err) {
      if (err instanceof ApiError) {
        error.value = getErrorMessage(err)
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    await authService.logout()
    user.value = null
  }

  async function loadUser() {
    try {
      user.value = await authService.getCurrentUser()
    } catch (err) {
      console.error('Failed to load user:', err)
    }
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    loadUser
  }
})
```

---

## ⚙️ Axios Config erweitern

Falls du die Axios-Instanz direkt brauchst:

```typescript
import api from '@/services/api'

// Custom Request
const response = await api.get('/custom-endpoint', {
  timeout: 5000 // Custom Timeout
})

// Mit Custom Headers
const response = await api.post('/upload', data, {
  headers: {
    'X-Custom-Header': 'value'
  }
})
```

---

## 🧪 Entwicklungs-Tipps

### API Requests in Browser Console debuggen

```javascript
// Chrome DevTools > Console
const token = localStorage.getItem('accessToken')
console.log('Current Token:', token)

const expiry = localStorage.getItem('tokenExpiry')
console.log('Token Expiry:', new Date(parseInt(expiry)))
```

### Network Tab überprüfen

In Chrome DevTools > Network Tab kannst du sehen:

1. **Request Headers**: `Authorization: Bearer ...`
2. **Status Codes**: 200, 401, 500, etc.
3. **Response Bodies**: API-Responses

---

## 🔄 Nächste Schritte

Mit der Axios-Setup können wir nun:

1. ✅ **Vue Components** erstellen, die API-Calls verwenden
2. ✅ **Pinia Stores** für State Management nutzen
3. ✅ **Router Guards** für authentifizierte Routes hinzufügen
4. ✅ **Error Pages** für API-Fehler anzeigen
5. ✅ **Loading States** in UI implementieren

---

## 📚 Weitere Ressourcen

- [Axios Dokumentation](https://axios-http.com/)
- [Vue 3 + Axios Best Practices](https://vuejs.org/guide/scaling-up/state-management.html)
- [JWT Authentication](https://jwt.io/)
- [TypeScript in Vue](https://vuejs.org/guide/typescript/overview.html)
