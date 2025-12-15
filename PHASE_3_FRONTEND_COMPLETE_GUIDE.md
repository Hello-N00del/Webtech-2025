# Phase 3: Frontend Complete - Rich-Text + Image Upload + CRUD Fixes

**Stand:** 15.12.2025 17:50 CET

## 🎯 Was wurde implementiert

### ✅ Service-Layer Fixes

**Problem:** `infoletterService.create is not a function`
**Lösung:** Methoden-Aliase hinzugefügt:

```typescript
// Beide Methoden funktionieren jetzt:
await infoletterService.getAll()        // neu
await infoletterService.fetchInfoletters() // alt (alias)

await infoletterService.getById(id)    // neu
await infoletterService.fetchInfoletter(id) // alt (alias)

await infoletterService.create(data)   // neu
await infoletterService.createInfoletter(data) // alt (alias)

await infoletterService.update(id, data)    // neu
await infoletterService.updateInfoletter()  // alt (alias)

await infoletterService.delete(id)     // neu
await infoletterService.deleteInfoletter(id) // alt (alias)
```

**Status:** ✅ Komplett

### ✅ TipTap Rich-Text Editor

**Features:**
- Text-Formatierung: **Bold**, *Italic*, <u>Underline</u>
- Headings: H1, H2
- Listen: Bullet Lists, Numbered Lists
- Clear Formatting Button
- Automatische HTML-Generierung
- Backend-Sanitization (XSS-Protection)

**HTML Output beispiel:**
```html
<h2>Willkommen!</h2>
<p>Das ist ein <strong>Paragraph</strong> mit <em>Formatierung</em>.</p>
<ul><li>Punkt 1</li><li>Punkt 2</li></ul>
```

**Status:** ✅ Implementiert in InfoletterForm.vue

### ✅ Image Upload Feature

**Features:**
- File-Input für Image-Selection
- Upload-Button mit Loading-State
- Image-Gallery mit Thumbnails
- Delete-Button für Bilder
- Formdata-basierter Upload
- Fehlerbehandlung

**Workflow:**
1. User klickt "Bild wählen"
2. Image wird in Input gespeichert
3. User klickt "Hochladen"
4. FormData wird via POST /api/infoletters/:id/images gesendet
5. Backend speichert und gibt URL zurück
6. Bild erscheint in Gallery
7. User kann Bild löschen mit Delete-Button

**Status:** ✅ Implementiert in InfoletterForm.vue

### ✅ Component-Fixes

**HelloWorld.vue:**
- Fix: `.getAll()` statt `.fetchInfoletters()`
- Fix: Kompatibel mit Service-Layer

**InfoletterFeed.vue:**
- ✅ Funktioniert bereits mit neuer Service
- CRUD-Operationen: Create, Read, Update, Delete
- Delete-Confirmation Dialog
- Error-Handling

**InfoletterForm.vue:**
- ✅ Neu implementiert mit TipTap
- ✅ Image-Upload integriert
- ✅ Service-Method-Aliase verwenden
- ✅ Collaborator-Section (noch nicht vollständig)

---

## 📊 Installations-Anleitung

### Step 1: Dependencies installieren

```bash
cd frontend

# TipTap Extension hinzufügen
npm install @tiptap/extension-underline

# Oder alle TipTap Extensions auf einmal:
npm install @tiptap/extension-underline @tiptap/extension-link @tiptap/extension-image

# Install all
npm install
```

### Step 2: Backend Setup (für Image-Upload)

```bash
cd backend

# Falls noch nicht installiert
npm install isomorphic-dompurify

# Upload-Ordner erstellen
mkdir -p public/uploads/infoletter-images
mkdir -p public/uploads/profile-images
chmod 755 public/uploads
```

### Step 3: Frontend starten

```bash
cd frontend
npm run dev
# Startet auf http://localhost:5173
```

### Step 4: Backend starten (separales Terminal)

```bash
cd backend
npm run dev
# Startet auf http://localhost:3001
```

---

## 💫 Feature Testing

### Test 1: CRUD Operations (Dashboard)

1. Login mit deinem Account
2. Homepage zeigt Dashboard mit Stats
3. Klick "Alle anzeigen" für Infoletter-Liste

### Test 2: Create Newsletter

1. Gehe zu "Meine Infoletter"
2. Klick "Neuer Infoletter"
3. Fülle aus:
   - **Titel:** "Test Newsletter"
   - **Inhalt:** Nutze Rich-Text Editor:
     - Schreib Text
     - Mach Wort **Bold** (Toolbar Button)
     - Mach Wort *Italic* (Toolbar Button)
     - Erstelle Liste (Toolbar Button)
   - **Status:** DRAFT
4. Klick "Infoletter erstellen"
5. Rückkehr zur Liste

### Test 3: Edit & Image Upload

1. Klick "Bearbeiten" auf einem Newsletter
2. Ändere Title
3. **Image Upload:**
   - Klick "Datei wählen"
   - Selektiere ein Bild
   - Klick "Hochladen"
   - Bild erscheint in Gallery (warte max 5 sec)
   - Kann auf "X" klicken um zu löschen
4. Ändere Content mit Rich-Text Editor
5. Klick "Änderungen speichern"
6. Rückkehr zur Liste

### Test 4: Delete Newsletter

1. In "Meine Infoletter"
2. Klick "Löschen" auf Newsletter
3. Bestätige Dialog
4. Newsletter verschwindet aus Liste

### Test 5: Publish Newsletter

1. Klick "Bearbeiten" auf Newsletter
2. Wähle Status "Veröffentlicht"
3. Klick "Speichern"
4. In Liste sollte Status zu "Published" ändern

---

## 🐛 Troubleshooting

### Fehler: "Cannot find module '@tiptap/extension-underline'"

**Lösung:**
```bash
cd frontend
npm install @tiptap/extension-underline
npm run dev
```

### Fehler: "infoletterService.create is not a function"

**Status:** ✅ BEHOBEN - Service hat jetzt alle Method-Aliase

Wenn noch vorhanden:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Fehler: "401 Unauthorized bei API-Calls"

**Das ist normal!** Der Test-Runner hat kein JWT Token.

**In der Browser-App funktioniert es, weil:**
1. User loggt sich ein
2. Token wird in localStorage gespeichert
3. Alle API-Calls nutzen den Token automatisch

### Fehler: Image-Upload fehlgeschlagen

**Checklist:**
1. Upload-Folder erstellt? `mkdir -p public/uploads/infoletter-images`
2. Backend läuft? `npm run dev` im backend-Folder
3. Max-File-Size? Max 5MB, Backend-Limit: `MAX_FILE_SIZE=5242880`
4. Browser-Console für Details

---

## 💪 Rich-Text Editor Shortcuts

| Action | Shortcut |
|--------|----------|
| Bold | Ctrl+B or Cmd+B |
| Italic | Ctrl+I or Cmd+I |
| Underline | Ctrl+U or Cmd+U |
| Heading 1 | Ctrl+Alt+1 |
| Heading 2 | Ctrl+Alt+2 |
| Bullet List | Ctrl+Shift+8 |
| Ordered List | Ctrl+Shift+7 |

---

## 🏙️ Architecture Overview

```
Frontend
├── services/
│   ├── api.ts              (Axios Instance, JWT Handling)
│   └── infoletterService.ts (API Client mit Aliase)
├── components/
│   ├── HelloWorld.vue      (Dashboard, Stats)
│   ├── InfoletterFeed.vue  (Liste mit CRUD)
│   ├── InfoletterForm.vue  (Create/Edit + TipTap + Images)
│   ├── StatusBadge.vue     (Status Display)
│   └── StatCard.vue        (Stats Card)
└── stores/
    └── authStore.ts        (User + Auth State)

Backend
├── routes/
│   └── infoletterRoutes.ts
├── controllers/
│   └── infoletterController.ts (CRUD + Sanitization)
├── services/
│   └── infoletterService.ts (DB Layer + Versionierung)
├── utils/
│   ├── htmlSanitizer.ts   (XSS Protection)
│   └── multer.ts           (Image Upload Config)
└── public/uploads/
    ├── infoletter-images/  (Newsletter Images)
    └── profile-images/     (User Profiles)
```

---

## 📦 Wichtige Dateien & Änderungen

### Frontend Changes (Phase 3)

```
frontend/src/
├── services/
│   └── infoletterService.ts  ✅ FIXED: Method Aliase
├── components/
│   ├── HelloWorld.vue        ✅ Dashboard (unchanged)
│   ├── InfoletterFeed.vue    ✅ List mit CRUD (unchanged)
│   ├── InfoletterForm.vue    🚧 NEW: TipTap + Images
│   ├── StatusBadge.vue       ✅ Status Display
│   └── StatCard.vue          ✅ Stats Card
frontend/
└── package.json          🚧 ADD: @tiptap/extension-underline
```

### Backend Changes (Phase 3)

```
backend/src/
├── routes/
│   └── infoletterRoutes.ts  ✅ FIXED: Route Order
├── controllers/
│   └── infoletterController.ts  🚧 NEW: Sanitization
├── utils/
│   └── htmlSanitizer.ts     🚧 NEW: XSS Protection
backend/
└── public/uploads/        🚧 NEW: Image Storage
```

---

## ✅ Checkliste vor Launch

- [ ] Frontend Dependencies installiert (`npm install`)
- [ ] Backend Dependencies installiert (`npm install`)
- [ ] Upload-Folders erstellt (`mkdir -p public/uploads/infoletter-images`)
- [ ] Frontend dev-Server läuft (`npm run dev` in frontend/)
- [ ] Backend dev-Server läuft (`npm run dev` in backend/)
- [ ] Login funktioniert
- [ ] Dashboard zeigt Stats
- [ ] Newsletter erstellen funktioniert
- [ ] Rich-Text Editor funktioniert
- [ ] Image-Upload funktioniert
- [ ] Newsletter bearbeiten funktioniert
- [ ] Newsletter löschen funktioniert

---

## 🔗 Nächste Schritte (Phase 4)

### Priority 1: Collaborator User-Lookup
- Backend: `GET /api/users/search?email=...` Endpoint
- Frontend: Email-Input mit Autocomplete
- Backend: User-Lookup funktional machen

### Priority 2: Version History Viewer
- Modal für Version-History
- Diff-Viewer für Contentänderungen
- Restore-Funktion

### Priority 3: Email Preview & Send
- Email-Preview HTML
- Email Send Feature
- Tracking/Analytics

### Priority 4: Performance Optimization
- Pagination für Newsletter-Liste
- Image Compression
- Caching-Strategien

---

## 🌟 Summary

**Phase 3 ist COMPLETE:**
- ✅ Service-Layer Fixes
- ✅ TipTap Rich-Text Editor
- ✅ Image Upload Feature
- ✅ HTML Sanitization (Backend)
- ✅ Full CRUD Operations
- ✅ Error Handling & Loading States

**Status:** 🟢 **READY FOR TESTING**

Starte beide Server, login, und teste alle Features! 🚀
