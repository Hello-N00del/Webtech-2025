# Frontend – Webtech-2025

Vue 3 + TypeScript Frontend für das Infoletter Management System.

---

## 🏗️ Projektstruktur

```
frontend/
├── public/                 # Statische Assets
├── src/
│   ├── assets/            # Bilder, Styles, Icons
│   ├── components/        # Vue-Komponenten (UI)
│   ├── composables/       # Vue Composables (useAuth, useRouterGuards, etc.)
│   ├── models/            # TypeScript Interfaces & Types
│   ├── router/            # Vue Router Konfiguration & Guards
│   ├── services/          # API-Services (authService, api.ts)
│   ├── stores/            # Pinia State Management (authStore)
│   ├── types/             # Global TypeScript Types
│   ├── utils/             # Hilfsfunktionen (apiErrorHandler, tokenManager)
│   ├── views/             # Page-Komponenten (LoginView, DashboardView)
│   ├── App.vue            # Root-Komponente (Global Header)
│   ├── main.ts            # App Entry Point (Auth Initialization)
│   └── style.css          # Global Styles + CSS Variables
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Installation & Setup

Siehe [Haupt-README](../README.md) für vollständige Installationsanleitung.

### Schnellstart

```bash
# Dependencies installieren
npm install

# Development Server starten (Hot Module Reload)
npm run dev
```

✅ Frontend läuft auf [http://localhost:5173/](http://localhost:5173/)

---

## 🛠️ Technologie-Stack & Warum?

### **Vue 3 + Composition API**
> **Warum Vue 3?** Progressive JavaScript Framework mit reaktiven Komponenten. Composition API erlaubt flexible, wiederverwendbare Logik ohne tiefe Verschachtelung. Perfekt für komplexe State-Management.

```typescript
// ✅ Composition API mit <script setup>
<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>
```

### **TypeScript**
> **Warum TypeScript?** Compile-time Type-Checking verhindert Runtime-Fehler. Auto-completion in IDEs. Bessere Code-Dokumentation. Auch Refactoring wird sicherer.

```typescript
// ✅ Type-Safe Code
interface User {
  id: string
  email: string
  name: string
}

const user: User = { /* ... */ }
```

### **Pinia State Management**
> **Warum Pinia statt Vuex?** Offizielle Vue 3 Empfehlung. Simpler & intuitiver. Bessere TypeScript-Unterstützung mit auto-generated Types. Composition API First.

```typescript
// ✅ src/stores/authStore.ts - Reaktives State Management
export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserInfo | null>(null)
  
  // Computed Property - reaktiv auf user.value Änderungen
  const isAuthenticated = computed(() => {
    return !!user.value && authService.isAuthenticated()
  })
  
  return { user, isAuthenticated, login, logout }
})
```

**Key Advantage:** Wenn `user.value` ändert → `isAuthenticated` wird sofort neu berechnet → Vue re-rendert die UI → Header updated INSTANT!

### **Vue Router**
> **Warum Vue Router?** Offizielle Single-Page-Application (SPA) Routing-Lösung. Client-Side Navigation ohne Page-Reload. Lazy-Loaded Routes für bessere Performance.

```typescript
// ✅ src/router/index.ts - Navigation Guards für Auth-Prüfung
router.beforeEach(async (to, from, next) => {
  // 10ms Delay gibt Pinia Zeit zu aktualisieren
  await new Promise(resolve => setTimeout(resolve, 10))
  
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
```

### **Vite Build Tool**
> **Warum Vite?** Blitzschnelle Dev Server (Native ESM). Sofortiges Hot Module Replacement (HMR). Schnellere Builds durch esbuild. Moderne JavaScript Support.

```bash
# ✅ Sofortiger Dev Server (~100ms startup)
npm run dev

# ✅ Optimierter Production Build
npm run build
```

### **Tailwind CSS**
> **Warum Tailwind?** Utility-First CSS Framework. Konsistentes Design über CSS-Variablen. Responsive Design out-of-the-box. Dark Mode Support.

```html
<!-- ✅ Utility-First Styling -->
<button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
  Click me
</button>
```

### **Axios HTTP Client**
> **Warum Axios?** Intuitives API. Request/Response Interceptors für Auth-Tokens. Automatic JSON Serialization. Better Error Handling.

```typescript
// ✅ src/services/api.ts - Automatischer Token-Refresh
api.interceptors.request.use((config) => {
  const token = tokenManager.getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(...handleTokenRefresh)
```

---

## 📦 Verfügbare Scripts

```bash
# Development
npm run dev          # Dev-Server mit Hot-Reload

# Build
npm run build        # Production Build
npm run preview      # Preview des Production Builds

# Linting & Formatting
npm run lint         # ESLint prüfen
npm run format       # Prettier formatieren

# Type Checking
npm run type-check   # TypeScript Typen prüfen
```

---

## 🎨 Styling & Design System

### **Global CSS Variables** (src/style.css)

```css
/* ✅ Design System in CSS-Variablen */
:root {
  /* Farben */
  --color-primary: var(--color-teal-500);
  --color-text: var(--color-slate-900);
  --color-background: var(--color-cream-50);
  
  /* Spacing */
  --space-4: 4px;
  --space-8: 8px;
  --space-16: 16px;
  
  /* Border Radius */
  --radius-base: 8px;
  --radius-lg: 12px;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.04);
}
```

### **Responsive Design**

```vue
<!-- ✅ Mobile-First mit Tailwind -->
<div class="px-4 md:px-6 lg:px-8">
  <button class="text-sm md:text-base lg:text-lg">
    Responsive Button
  </button>
</div>
```

---

## 🧩 Komponenten & Patterns

### **Composition API Pattern**

```vue
<script setup lang="ts">
// 1️⃣ Imports
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import type { User } from '@/models/User'

// 2️⃣ Props & Emits
interface Props {
  user: User
}
const props = defineProps<Props>()
const emit = defineEmits<{
  update: [user: User]
}>()

// 3️⃣ Reactive State
const isEditing = ref(false)

// 4️⃣ Computed Properties
const displayName = computed(() => props.user.name.toUpperCase())

// 5️⃣ Functions
const handleUpdate = () => {
  emit('update', props.user)
}
</script>

<template>
  <div class="user-card">
    <h3>{{ displayName }}</h3>
    <button @click="handleUpdate">Update</button>
  </div>
</template>

<style scoped>
.user-card {
  padding: var(--space-16);
  background: var(--color-surface);
}
</style>
```

### **Naming Conventions**

```
✅ Komponenten:     PascalCase (UserProfile.vue)
✅ Composables:     camelCase + use Prefix (useAuth.ts)
✅ Stores:          camelCase + Store Suffix (authStore.ts)
✅ Services:        camelCase + Service Suffix (authService.ts)
✅ Types/Interfaces: PascalCase (User.ts, LoginResponse.ts)
✅ Utilities:       camelCase (tokenManager.ts, errorHandler.ts)
```

---

## 🔌 API-Integration

### **Backend-Verbindung**

```typescript
// ✅ Environment Variables
// .env.local (nicht in Git)
VITE_API_URL=http://localhost:3001/api
VITE_APP_TITLE=Webtech-2025
```

### **Axios Konfiguration** (src/services/api.ts)

```typescript
// ✅ HTTP Client mit Auth-Interceptor
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000  // 10 Sekunden Timeout
})

// Request Interceptor: Token automatisch hinzufügen
api.interceptors.request.use((config) => {
  const token = tokenManager.getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response Interceptor: Token-Refresh bei 401
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Token expired, try to refresh
      const newToken = await tokenManager.refreshToken()
      if (newToken) {
        // Retry original request
        return api(error.config)
      }
    }
    throw error
  }
)
```

### **Auth Service** (src/services/authService.ts)

```typescript
// ✅ API-Calls für Authentifizierung
export const authService = {
  async register(data: RegisterData) {
    const response = await api.post('/auth/register', data)
    const { user, accessToken, refreshToken } = response.data
    
    // Token speichern
    tokenManager.setTokens(accessToken, refreshToken)
    
    return { user, accessToken, refreshToken }
  },
  
  async login(credentials: LoginCredentials) {
    const response = await api.post('/auth/login', credentials)
    const { user, accessToken, refreshToken } = response.data
    
    tokenManager.setTokens(accessToken, refreshToken)
    
    return { user, accessToken, refreshToken }
  },
  
  async logout() {
    try {
      await api.post('/auth/logout')
    } finally {
      tokenManager.clearTokens()
    }
  }
}
```

---

## 📱 Routing & Navigation

### **Route Definition** (src/router/index.ts)

```typescript
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/LandingPage.vue'),
    meta: { requiresAuth: false }  // Öffentlich
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/infoletter',
    name: 'Dashboard',
    component: () => import('@/views/InfoletterFeed.vue'),
    meta: { requiresAuth: true }  // Geschützt!
  }
]
```

### **Lazy Loading**

```typescript
// ✅ Komponenten nur laden wenn nötig
component: () => import('@/views/DashboardView.vue')

// Benefit: Schnellerer Initial Load, größere Chunks später
```

---

## 🔐 Authentication Flow

### **1. Initialization (main.ts)**

```typescript
// ✅ App-Start: Token aus localStorage laden
const authStore = useAuthStore()
await authStore.initializeAuth()  // Lädt user vom /auth/me endpoint
app.mount('#app')  // DANN erst rendern
```

### **2. Login (LoginView.vue)**

```typescript
// ✅ Benutzer registriert/loggt sich ein
await authStore.login(email, password)
// → user.value wird gesetzt (reactive!)
// → isAuthenticated = true
// → Header aktualisiert sich SOFORT
await router.push('/infoletter')
```

### **3. Protected Routes (beforeEach Guard)**

```typescript
// ✅ Jede Route wird geprüft
if (to.meta.requiresAuth && !authStore.isAuthenticated) {
  // Kein Zugriff, redirect zu /login
  next('/login')
} else {
  // Zugriff erlaubt
  next()
}
```

### **4. Logout (App.vue)**

```typescript
// ✅ Benutzer klickt Abmelden
await authStore.logout()
// → user.value wird auf null gesetzt (reactive!)
// → isAuthenticated = false
// → Header aktualisiert sich SOFORT
await router.push('/')
```

---

## 🧪 Development Best Practices

### **1. Komponenten-Struktur**

```
✅ ONE component responsibility
✅ Props für Input, Emits für Output
✅ Scoped Styles (keine globalen Conflicts)
✅ TypeScript Types für Props/Emits
```

### **2. State Management**

```
✅ Kleine State in components (form inputs)
✅ Global State in Pinia (auth, user data)
✅ Keine Props Drilling (Pinia statt data passing)
```

### **3. Error Handling**

```typescript
// ✅ Alle API-Calls mit try-catch
try {
  await authStore.login(email, password)
} catch (error) {
  if (error instanceof ApiError) {
    showErrorMessage(getErrorMessage(error))
  }
}
```

---

## 🔧 Environment Variables

Erstelle `.env.local` für lokale Entwicklung:

```env
# API
VITE_API_URL=http://localhost:3001/api

# App Title
VITE_APP_TITLE=Webtech-2025

# Optional
VITE_DEBUG=true
```

**Verwendung im Code:**

```typescript
const apiUrl = import.meta.env.VITE_API_URL
const appTitle = import.meta.env.VITE_APP_TITLE
```

---

## 🎨 VSCode Extensions (empfohlen)

```
✅ Volar - Vue 3 Language Support
✅ TypeScript Vue Plugin (Volar)
✅ ESLint - Code Quality
✅ Prettier - Code Formatting
✅ Vue VSCode Snippets - Quick Snippets
✅ Tailwind CSS IntelliSense - CSS Hints
```

---

## 🐛 Troubleshooting

### Port bereits belegt

```bash
npm run dev -- --port 5174
```

### Type Errors

```bash
rm -rf node_modules/.vite
npm run dev
```

### Hot Reload funktioniert nicht

```bash
rm -rf node_modules/.vite
npm install
npm run dev
```

### CORS Errors

✅ Prüfe: Backend läuft auf http://localhost:3001?
✅ Prüfe: VITE_API_URL in .env.local korrekt?
✅ Prüfe: Backend CORS konfiguriert für localhost:5173?

---

## 📖 Weitere Ressourcen

- [Vue 3 Dokumentation](https://vuejs.org/)
- [Pinia Docs](https://pinia.vuejs.org/)
- [Vue Router Docs](https://router.vuejs.org/)
- [Vite Docs](https://vitejs.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Hauptprojekt README](../README.md)
- [Authentifizierung Docs](../AUTHENTICATION_FIX_SUMMARY.md)

---

**Happy Coding! 🚀**
