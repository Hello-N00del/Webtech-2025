# 🛡️ Router Guards - Dokumentation

## Überblick

Das Frontend verfügt über ein vollständiges **Authentication Guards System**, das:

✅ Routes automatisch schützt (`requiresAuth` meta flag)  
✅ Unauthentifizierte User zu Login weiterleitet  
✅ User-Rollen-basierte Access-Kontrolle unterstützt  
✅ Page Titles automatisch setzt  
✅ Zentrale Pinia Auth-Verwaltung nutzt  

---

## 📁 Dateistruktur

```
frontend/src/
├── router/
│   └── index.ts                    # Router Config mit Guards
├── stores/
│   └── authStore.ts                # Pinia Auth State
├── composables/
│   ├── useRouterGuards.ts          # Router Guard Logic
│   └── useAuthGuard.ts             # Component Auth Helper
├── types/
│   └── router.ts                   # CustomRouteMeta Types
└── main.ts                         # App Init mit Auth
```

---

## 🎯 Konzepte

### Route Meta

Jede Route kann Meta-Daten mit sich tragen:

```typescript
const route: RouteRecordRaw = {
  path: '/dashboard',
  component: Dashboard,
  meta: {
    title: 'Dashboard',                    // Browser Tab Title
    description: 'User Dashboard',         // Doku
    requiresAuth: true,                    // 🔐 Authentifizierung erforderlich
    requiredRoles: ['ADMIN', 'USER'],     // 👥 Erlaubte Rollen
    layout: 'default'                     // Layout-Type
  } as CustomRouteMeta
}
```

### Guard Flow

```
User klickt Link
    ↓
router.beforeEach() ausgelöst
    ↓
checkRouteAccess(to.meta)
    ↓
┌─────────────┬────────────────────┐
│ Allowed?    │ Action            │
├─────────────┼────────────────────┤
│ false       │ Redirect zu Login  │
│             │ mit return-URL     │
│ true        │ next() → Weiter    │
└─────────────┴────────────────────┘
    ↓
router.afterEach()
    ↓
Update Page Title
Scroll oben
```

---

## 🚀 Verwendung

### 1. Route Definition mit Guard

```typescript
// src/router/index.ts
const routes: RouteRecordRaw[] = [
  {
    path: '/public',
    component: PublicPage,
    meta: {
      title: 'Public Page'
      // requiresAuth: false (default)
    } as CustomRouteMeta
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
      requiresAuth: true,  // 🔐 Geschützte Route
      layout: 'default'
    } as CustomRouteMeta
  },
  {
    path: '/admin',
    component: AdminPanel,
    meta: {
      title: 'Admin Panel',
      requiresAuth: true,
      requiredRoles: ['ADMIN'],  // 👥 Nur für Admins
      layout: 'default'
    } as CustomRouteMeta
  }
]
```

### 2. Guard automatisch aktiv

Die Guards laufen automatisch! Keine zusätzliche Konfiguration nötig.

**Was passiert automatisch:**

✅ Bei Route-Änderung wird `beforeEach` ausgeführt  
✅ Wenn `requiresAuth: true` und User nicht angemeldet → Redirect zu `/login`  
✅ Nach erfolgreichem Navigation wird `afterEach` ausgeführt  
✅ Page Title wird aktualisiert  

### 3. In Vue Components verwenden

**Composable importieren:**

```typescript
import { useAuthGuard } from '@/composables/useAuthGuard'

// In <script setup>
const {
  isAuthenticated,
  isAdmin,
  user,
  loading,
  error,
  logout,
  login,
  redirectToLogin,
  reloadUser
} = useAuthGuard()
```

**In Template:**

```vue
<script setup lang="ts">
import { useAuthGuard } from '@/composables/useAuthGuard'

const { isAuthenticated, user, logout, loading } = useAuthGuard()
</script>

<template>
  <header>
    <!-- Nur für authentifizierte User sichtbar -->
    <div v-if="isAuthenticated">
      <p>Willkommen, {{ user?.name }}!</p>
      <button @click="logout" :disabled="loading">
        Logout
      </button>
    </div>

    <!-- Nur für nicht-authentifizierte User sichtbar -->
    <div v-else>
      <a href="/login">Login</a>
    </div>
  </header>
</template>
```

---

## 🔐 Login/Redirect Flow

### Scenario 1: Unauthentifizierter User versucht geschützte Route zu öffnen

```
1. User klickt auf "/dashboard"
2. router.beforeEach() wird ausgeführt
3. checkRouteAccess() prüft meta.requiresAuth = true
4. authService.isAuthenticated() = false
5. Guard erkennt: Nicht authentifiziert!
6. Redirect zu: /login?redirect=/dashboard
7. User sieht Login-Formular
8. Nach erfolgreicher Anmeldung:
   → Redirect zurück zu /dashboard (aus query-Parameter)
```

### Scenario 2: Authentifizierter User öffnet Route

```
1. User klickt auf "/dashboard"
2. router.beforeEach() wird ausgeführt
3. checkRouteAccess() prüft meta.requiresAuth = true
4. authService.isAuthenticated() = true ✓
5. next() → Route wird geladen
6. router.afterEach() wird ausgeführt
7. Page Title wird auf "Dashboard" gesetzt
```

---

## 📝 Beispiel: Login View

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useAuthGuard } from '@/composables/useAuthGuard'
import { useRouter } from 'vue-router'
import { ApiError, getErrorMessage } from '@/utils/apiErrorHandler'

const router = useRouter()
const { login, loading, error } = useAuthGuard()

const email = ref('')
const password = ref('')
const localError = ref('')

async function handleLogin() {
  localError.value = ''

  try {
    await login(email.value, password.value)
    // Redirect erfolgt automatisch in useAuthGuard
    // Oder manual:
    const redirect = router.currentRoute.value.query.redirect as string
    router.push(redirect || '/dashboard')
  } catch (err) {
    if (err instanceof ApiError) {
      localError.value = getErrorMessage(err)
    } else {
      localError.value = 'Login fehlgeschlagen'
    }
  }
}
</script>

<template>
  <div class="login-page">
    <form @submit.prevent="handleLogin">
      <h1>Login</h1>

      <div v-if="error || localError" class="error-message">
        {{ error || localError }}
      </div>

      <input
        v-model="email"
        type="email"
        placeholder="E-Mail"
        required
        :disabled="loading"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Passwort"
        required
        :disabled="loading"
      />

      <button :disabled="loading">
        {{ loading ? 'Loading...' : 'Login' }}
      </button>
    </form>
  </div>
</template>
```

---

## 👥 Rollen-basierte Access Control (RBAC)

### Route mit Rollen-Check

```typescript
{
  path: '/admin',
  component: AdminPanel,
  meta: {
    title: 'Admin Panel',
    requiresAuth: true,
    requiredRoles: ['ADMIN'],  // 🔑 Nur Admins
    layout: 'default'
  } as CustomRouteMeta
}
```

### In Component prüfen

```vue
<script setup lang="ts">
import { useAuthGuard } from '@/composables/useAuthGuard'

const { isAdmin, isUser } = useAuthGuard()
</script>

<template>
  <div>
    <!-- Admin-only content -->
    <section v-if="isAdmin">
      <h2>Admin Controls</h2>
      <!-- Admin UI -->
    </section>

    <!-- User content -->
    <section v-if="isUser">
      <h2>User Dashboard</h2>
      <!-- User UI -->
    </section>

    <!-- Fallback -->
    <div v-else>
      <p>Du hast keine Berechtigung für diese Seite</p>
    </div>
  </div>
</template>
```

---

## 🔄 Auth Store Integration

Die `authStore` ist zentral für alle Auth-Operationen:

```typescript
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

// Computed Properties
authStore.isAuthenticated  // true/false
authStore.isAdmin          // true/false wenn ADMIN
authStore.isUser           // true/false wenn USER
authStore.user             // UserInfo | null
authStore.loading          // true während API-Call
authStore.error            // Error Message

// Actions
await authStore.login(email, password)
await authStore.register(email, password, name)
await authStore.logout()
await authStore.loadUser()
await authStore.updateProfile(data)
await authStore.initializeAuth()  // Beim App-Start aufgerufen
```

---

## 🛠️ Tipps & Best Practices

### 1. Layout-Komponente für unterschiedliche Seiten

```typescript
{
  path: '/login',
  component: LoginPage,
  meta: {
    title: 'Login',
    layout: 'auth'  // Minimales Layout ohne Navigation
  } as CustomRouteMeta
},
{
  path: '/dashboard',
  component: Dashboard,
  meta: {
    title: 'Dashboard',
    requiresAuth: true,
    layout: 'default'  // Full Layout mit Navigation
  } as CustomRouteMeta
}
```

**In App.vue:**

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'

const route = useRoute()
const layout = computed(
  () => (route.meta as any)?.layout || 'default'
)
</script>

<template>
  <component :is="layout === 'auth' ? AuthLayout : DefaultLayout">
    <RouterView />
  </component>
</template>
```

### 2. Redirect nach Login

Der Guard speichert die ursprüngliche URL in `query.redirect`:

```typescript
// In Login-Component
const redirect = router.currentRoute.value.query.redirect as string
await router.push(redirect || '/dashboard')
```

### 3. Logout Handler

```typescript
function handleLogout() {
  authStore.logout()
  // oder mit useAuthGuard:
  const { logout } = useAuthGuard()
  logout()  // Redirect erfolgt automatisch
}
```

### 4. User-Daten beim App-Start laden

```typescript
// In main.ts
const authStore = useAuthStore()
await authStore.initializeAuth()  // Lädt User-Daten wenn Token existiert
```

---

## 🐛 Debugging

### Console Logging

```javascript
// Browser Console
const token = localStorage.getItem('accessToken')
console.log('Token:', token)

const expiry = localStorage.getItem('tokenExpiry')
console.log('Expiry:', new Date(parseInt(expiry)))

// In Chrome DevTools > Network
// Jeder Request sollte Authorization Header haben:
// Authorization: Bearer <token>
```

### Guard Debugging

```typescript
// In router/index.ts
router.beforeEach((to, from, next) => {
  console.log('📍 Navigating to:', to.path)
  console.log('🔐 Requires Auth:', (to.meta as CustomRouteMeta)?.requiresAuth)
  console.log('✓ Is Authenticated:', authService.isAuthenticated())
  // ...
})
```

---

## 📦 Next Steps

Mit Router Guards können wir jetzt:

✅ Login/Register Pages erstellen  
✅ Protected Dashboard bauen  
✅ Error Pages (404, 403) hinzufügen  
✅ User-Profile-Page implementieren  
✅ Admin-Panel aufbauen  
✅ Token Refresh bei Expiry testen  

---

## 🔗 Verwandte Dokumentation

- [Axios Setup](./AXIOS_SETUP.md) - HTTP Client & API Integration
- [Frontend README](./README.md) - Frontend Übersicht
- [Vue Router Docs](https://router.vuejs.org/)
- [Pinia Docs](https://pinia.vuejs.org/)

---

**Die App ist jetzt vollständig geschützt! 🛡️**
