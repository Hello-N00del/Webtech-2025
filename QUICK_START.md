# 🚀 Quick Start - WebTech 2025 Phase 3

## Setup (5 min)

```bash
# Backend
cd backend
npm install isomorphic-dompurify
mkdir -p public/uploads/infoletter-images
npm run dev  # Terminal 1

# Frontend (neues Terminal)
cd frontend
npm install @tiptap/extension-underline
npm run dev  # Terminal 2
```

## URLs

```
Frontend:  http://localhost:5173
Backend:   http://localhost:3001
API Test:  http://localhost:3001/api/test
```

## Test Flow

```
1. Open http://localhost:5173
2. Login
3. Go to "Meine Infoletter"
4. Click "Neuer Infoletter"
5. Test Rich-Text: B I U buttons
6. Add Content
7. Save
8. Edit: Upload Image
9. Publish
10. Delete
```

## Files Changed

### Frontend
```
✅ infoletterService.ts  - Service Fixes (getAll, create, etc)
🚧 InfoletterForm.vue    - TipTap Editor + Image Upload
```

### Backend
```
✅ infoletterRoutes.ts      - Route Order Fixed
🚧 htmlSanitizer.ts        - New: XSS Protection
🚧 infoletterController.ts - Enhanced: Sanitization
```

## Features

- ✅ Rich-Text Editor (Bold, Italic, H1, H2, Lists)
- ✅ Image Upload & Gallery
- ✅ CRUD: Create, Read, Update, Delete
- ✅ Status: Draft, Published
- ✅ HTML Sanitization (Security)
- ✅ Error Handling
- ✅ Loading States

## Troubleshooting

**"Cannot find module '@tiptap/extension-underline'"**
```bash
cd frontend && npm install @tiptap/extension-underline
```

**"401 Unauthorized"**
That's normal for API tests. Works in browser (has JWT token).

**"Image upload failed"**
```bash
mkdir -p backend/public/uploads/infoletter-images
```

## Next Phase

- User-Lookup for Collaborators
- Version History Viewer
- Email Preview & Send
- Pagination

## Docs

- `FINAL_REPORT_PHASE_3.md` - Full Report
- `PHASE_3_FRONTEND_COMPLETE_GUIDE.md` - Detailed Guide
- `PHASE_3_BACKEND_SUMMARY.md` - Backend Docs
