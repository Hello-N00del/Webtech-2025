# Frontend – Webtech-2025

Vue 3 + TypeScript Frontend für das Infoletter Management System.

---

## 🏗️ Projektstruktur

frontend/

├── public/ # Statische Assets

├── src/

│ ├── assets/ # Bilder, Styles, Icons

│ ├── components/ # Vue-Komponenten

│ ├── models/ # TypeScript Interfaces

│ ├── router/ # Vue Router Konfiguration

│ ├── services/ # API-Services

│ ├── stores/ # Pinia State Management

│ ├── views/ # Page-Komponenten

│ ├── App.vue # Root-Komponente

│ └── main.ts # App Entry Point

├── package.json

├── tsconfig.json

└── vite.config.ts

---

## 🚀 Installation & Setup

Siehe [Haupt-README](../README.md) für vollständige Installationsanleitung.

### Schnellstart

Im frontend Ordner
npm install

Development Server starten
npm run dev

Frontend läuft auf [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Technologie-Stack

- **Vue 3** – Composition API mit `<script setup>`
- **TypeScript** – Typsicherheit
- **Pinia** – State Management
- **Vue Router** – Client-Side Routing
- **Vite** – Build Tool & Dev Server
- **Axios** 🚧 – HTTP Client (geplant)

---

## 📦 Verfügbare Scripts

Development
npm run dev # Dev-Server mit Hot-Reload

Build
npm run build # Production Build
npm run preview # Preview des Production Builds

Linting & Formatting
npm run lint # ESLint prüfen
npm run format # Prettier formatieren

Type Checking
npm run type-check # TypeScript Typen prüfen

---

## 🧩 Komponenten-Struktur

### Models (TypeScript Interfaces)

// src/models/User.ts
export interface User {
id: string;
email: string;
name: string;
role: 'ADMIN' | 'USER';
profileImageUrl?: string;
}

// src/models/Infoletter.ts
export interface Infoletter {
id: string;
ownerId: string;
title: string;
content: string;
status: 'DRAFT' | 'PUBLISHED';
createdAt: string;
updatedAt: string;
}

### Services (API-Integration)

// src/services/authService.ts
export const authService = {
register(data: RegisterData) { /* ... / },
login(credentials: LoginCredentials) { / ... / },
logout() { / ... */ }
}

### Stores (Pinia)

// src/stores/authStore.ts
export const useAuthStore = defineStore('auth', () => {
const user = ref<User | null>(null)
const isAuthenticated = computed(() => !!user.value)

function login(credentials: LoginCredentials) { /* ... / }
function logout() { / ... */ }

return { user, isAuthenticated, login, logout }
})

---

## 🎨 Styling

### CSS-Variablen

Globale Design-Tokens in `src/assets/main.css`:

:root {
--color-primary: #42b883;
--color-text: #2c3e50;
--font-family: 'Inter', sans-serif;
}

### Scoped Styles

<style scoped> /* Komponenten-spezifische Styles */ .button { background: var(--color-primary); } </style>

---

## 🔌 API-Integration

### Backend-Verbindung

Die Frontend-App kommuniziert mit dem Backend über REST-API:

- **Development:** `http://localhost:3001`
- **Production:** 🚧 (wird konfiguriert)

### Axios Setup 🚧

// src/services/api.ts (geplant)
import axios from 'axios'

const api = axios.create({
baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
headers: {
'Content-Type': 'application/json'
}
})

// Auth-Interceptor für JWT
api.interceptors.request.use(config => {
const token = localStorage.getItem('accessToken')
if (token) {
config.headers.Authorization = Bearer ${token}
}
return config
})

---

## 🧪 Development Best Practices

### Komponenten-Konventionen

<script setup lang="ts"> // 1. Imports import { ref, computed } from 'vue' import type { User } from '@/models/User' // 2. Props & Emits interface Props { user: User } const props = defineProps<Props>() const emit = defineEmits<{ update: [user: User] }>() // 3. Reactive State const isEditing = ref(false) // 4. Computed Properties const displayName = computed(() => props.user.name) // 5. Functions function handleUpdate() { emit('update', props.user) } </script> <template> <!-- Template hier --> </template> <style scoped> /* Styles hier */ </style>

### Naming Conventions

- **Komponenten:** PascalCase (`UserProfile.vue`)
- **Composables:** camelCase mit `use` Prefix (`useAuth.ts`)
- **Stores:** camelCase mit `use` Prefix und `Store` Suffix (`useAuthStore.ts`)
- **Services:** camelCase mit `Service` Suffix (`authService.ts`)

---

## 📱 Routing

// src/router/index.ts
const routes = [
{
path: '/',
name: 'Home',
component: () => import('@/views/HomeView.vue')
},
{
path: '/login',
name: 'Login',
component: () => import('@/views/LoginView.vue')
},
{
path: '/dashboard',
name: 'Dashboard',
component: () => import('@/views/DashboardView.vue'),
meta: { requiresAuth: true }
}
]

### Navigation Guards 🚧

router.beforeEach((to, from, next) => {
const authStore = useAuthStore()

if (to.meta.requiresAuth && !authStore.isAuthenticated) {
next('/login')
} else {
next()
}
})

---

## 🔧 Environment Variables

Erstelle `.env.local` für lokale Entwicklung:

VITE_API_URL=http://localhost:3001
VITE_APP_TITLE=Webtech-2025

Verwendung im Code:

const apiUrl = import.meta.env.VITE_API_URL

---

## 🎨 VSCode Extensions (empfohlen)

- **Volar** – Vue 3 Language Support
- **TypeScript Vue Plugin (Volar)** – TS Support in Vue
- **ESLint** – Code Quality
- **Prettier** – Code Formatting
- **Vue VSCode Snippets** – Schnelle Snippets

---

## 🐛 Troubleshooting

### Port bereits belegt

Anderen Port verwenden
npm run dev -- --port 5174

### Type Errors

TypeScript Cache löschen
rm -rf node_modules/.vite
npm run dev

### Hot Reload funktioniert nicht

Vite Cache löschen
rm -rf node_modules/.vite
npm install

---

## 📖 Weitere Ressourcen

- [Vue 3 Dokumentation](https://vuejs.org/)
- [Vue Router Docs](https://router.vuejs.org/)
- [Pinia Docs](https://pinia.vuejs.org/)
- [Vite Docs](https://vitejs.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/)

---

**Happy Coding! 🚀**