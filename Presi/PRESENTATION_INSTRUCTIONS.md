# Präsentations-Anleitung: Webtech-2025

## 💡 Übersicht

Die Präsentation ist bereits vorbereitet und enthält:

- ✅ 13 professionell gestaltete Folien
- ✅ Alle wichtigen Inhalte basierend auf README
- ✅ Responsive Design für Print & Web
- ✅ Professinelle Farbschema (Lila/Blau)
- ✅ Placeholder für Screenshots

---

## 💻 Anpassen der Präsentation

### 1. Namen einfügen

**Datei:** `PRESENTATION.html`

**Zeile 1 (Title Slide):**
```html
<!-- ÄNDERN VON: -->
<p class="subtitle" style="margin-top: 80px; font-size: 16px;">Team: [Name 1] & [Name 2]</p>

<!-- ZU: -->
<p class="subtitle" style="margin-top: 80px; font-size: 16px;">Team: Max Mustermann & Erika Müller</p>
```

### 2. Aufgabenteilung einfügen

**Slide 7 (Aufgabenteilung):**
```html
<!-- ÄNDERN VON: -->
<strong>[Name 1]</strong>
<p>Frontend-Entwicklung</p>

<!-- ZU: -->
<strong>Max Mustermann</strong>
<p>Frontend-Entwicklung</p>
```

### 3. Screenshots einfügen

**Slide 6 (Live Demo):**

Machte Screenshots von:
1. **Landing Page** (nicht eingeloggt) - Marketing View
2. **Login/Register Page** - Forms
3. **Dashboard** (eingeloggt) - Infoletter Management

**HTML-Code anpassen:**
```html
<!-- Ersetze: -->
<p style="font-size: 18px; margin: 20px 0;">✏️ [Screenshot der Landing Page hier einfügen]</p>

<!-- Mit: -->
<img src="screenshot-landing.png" style="width: 100%; max-width: 600px; margin: 20px auto; border-radius: 6px;" alt="Landing Page">
```

### 4. Repository-Link aktualisieren

**Slide 12 (Zusammenfassung):**
```html
<!-- Aktualisiere ggf.: -->
<p style="font-size: 18px; color: #667eea;"><strong>GitHub Repository:</strong> Hello-N00del/Webtech-2025</p>
```

---

## 🚫 HTML zu PDF konvertieren

### Option 1: Browser Print (Empfohlen)

**Schritt 1:** Öffne die HTML-Datei im Browser
```bash
# Lade die PRESENTATION.html lokal:
open PRESENTATION.html
# ODER
firefox PRESENTATION.html
# ODER
chrome PRESENTATION.html
```

**Schritt 2:** Drucke als PDF
```
Strg+P (oder Cmd+P auf Mac)
```

**Schritt 3:** Stelle sicher, dass folgende Einstellungen aktiviert sind:
- ✅ "Hintergrund-Grafiken drucken" AN
- ✅ Größe: "Actual size" oder "Fit to page"
- ✅ Margins: 0
- ✅ Format: DIN A4

**Schritt 4:** Speichere als PDF
```
Datei name: WebTech_WINF_mXXXXX.pdf
```

### Option 2: Kommandozeilen-Tool

Mit `wkhtmltopdf` oder `puppeteer`:

```bash
# Mit wkhtmltopdf (falls installiert)
wkhtmltopdf --enable-local-file-access PRESENTATION.html WebTech_WINF_mXXXXX.pdf

# Mit Node.js Puppeteer
npm install -g puppeteer
puppeteer html-to-pdf PRESENTATION.html WebTech_WINF_mXXXXX.pdf
```

### Option 3: Online Converter

- CloudConvert: https://cloudconvert.com/html-to-pdf
- HtmlToPdf: https://htmltopdf.com/
- SmallPDF: https://smallpdf.com/html-to-pdf

---

## 📋 Screenshot-Anleitung

### Screenshots machen

**1. Landing Page (nicht eingeloggt):**
```
1. Starte Backend & Frontend (npm run dev)
2. Öffne http://localhost:5173
3. Mache Screenshot (vollständige Seite)
```

**2. Login/Register Seite:**
```
1. Klicke auf "Anmelden"
2. Mache Screenshot der Form
3. Wechsle zum Register-Tab
4. Mache Screenshot
```

**3. Dashboard (eingeloggt):**
```
1. Registriere dich oder logge dich ein
2. Navigiere zu Dashboard (/infoletter)
3. Mache Screenshot der Infoletter-List
```

### Screenshots in die Präsentation einfügen

**HTML-Code anpassen:**

```html
<!-- Slide 6: Live Demo -->
<div class="slide">
    <h2>💻 Live Demo</h2>
    <div class="demo-section" style="padding: 0;">
        <h3>1. Landing Page</h3>
        <img src="path/to/screenshot-landing.png" style="width: 100%; max-width: 700px; border-radius: 6px; margin: 10px 0;" alt="Landing Page">
        
        <h3>2. Login Page</h3>
        <img src="path/to/screenshot-login.png" style="width: 100%; max-width: 700px; border-radius: 6px; margin: 10px 0;" alt="Login Page">
        
        <h3>3. Dashboard</h3>
        <img src="path/to/screenshot-dashboard.png" style="width: 100%; max-width: 700px; border-radius: 6px; margin: 10px 0;" alt="Dashboard">
    </div>
</div>
```

---

## 📘 Folieninhälte zur Anpassung

### Slide 1: Titel
- ✅ Status: Ready (ergänze nur Team-Namen)

### Slide 2: Motivation & Thema
- ✅ Status: Ready (ggf. anpassen zu eurem Fokus)

### Slide 3: Features
- ✅ Status: Ready (alle 4 Features gelistet)

### Slide 4: Tech-Stack
- ✅ Status: Ready (Frontend + Backend)

### Slide 5: Architektur
- ✅ Status: Ready (Vue + Express Pattern erklärt)

### Slide 6: Live Demo
- 📝 **MUSS ANGEPASST:** Screenshots einfügen!

### Slide 7: Aufgabenteilung
- 📝 **MUSS ANGEPASST:** Namen und Fokus anpassen

### Slide 8: Security & Best Practices
- ✅ Status: Ready

### Slide 9: LLM-Reflexion
- 📝 **OPTIONAL:** Ggf. anpassen zu euren Erfahrungen

### Slide 10: Ausblick
- ✅ Status: Ready (geplante Features)

### Slide 11: Lessons Learned
- 📝 **OPTIONAL:** Eure spezifischen Learnings hinzufügen

### Slide 12: Zusammenfassung
- ✅ Status: Ready (GitHub Links aktualisieren)

### Slide 13: Danke
- ✅ Status: Ready

---

## 💳 Präsentations-Tipps

### Best Practices (8 Minuten total)

**Zeitaufteilung (ca. 4 Min pro Person):**
- **Person 1 (Slides 1-6):** Motivation, Features, Tech-Stack, Demo (~4 Min)
- **Person 2 (Slides 7-13):** Aufgabenteilung, Security, LLM-Reflexion, Lessons Learned (~4 Min)

### Redezeit-Tipps

1. **Klar und langsam sprechen** - Dozent muss folgen können
2. **Live-Demo bestücken** - App wirklich zeigen!
3. **Code-Beispiele vorbereiten** - Für Q&A bereit sein
4. **Augen-Kontakt** - Nicht zu lange auf Slides schauen
5. **Pausen machen** - Zeit zum Nachdenken geben

### Demo-Szenario (3 Minuten)

```
1. Landing Page zeigen (30 Sekunden)
   - Marketing Content, Buttons erklären

2. Registrierung/Login (1 Min)
   - Form ausfüllen
   - Zeige dass Header sofort updated!

3. Dashboard Navigation (1 Minute)
   - Infoletter liste
   - Navigation zwischen Pages
   - Logout

4. Responsive Design (30 Sekunden)
   - Browser-Größe ändern
```

---

## ✅ Checkliste vor dem Referat

- [ ] Alle Namen eingefügt
- [ ] Screenshots eingefügt
- [ ] PDF exportiert
- [ ] PDF benannt: `WebTech_WINF_mXXXXX.pdf`
- [ ] PDF in StudIP hochgeladen (einen Tag vorher)
- [ ] Backend läuft lokal
- [ ] Frontend läuft lokal
- [ ] Demo-Szenario geprobt
- [ ] Notizen für Red vorbereit (nicht ablesen!)
- [ ] Code-Walkthrough vorbereitet

---

## 📄 FAQ

**F: Wie viele Folien sollte ich haben?**
A: 13 Folien sind perfekt für 8 Minuten (ca. 1.5-2 Minuten pro Folie)

**F: Kann ich die HTML-Datei mit PowerPoint öffnen?**
A: Nein, aber du kannst sie als PDF exportieren und dann in PowerPoint importieren

**F: Was wenn die Screenshots nicht gut passen?**
A: Du kannst auch auf "Präsentationsmodus" umschalten und während des Vortrags live vorbeigehen

**F: Darf ich die Folienlayouts ändern?**
A: Ja! Die HTML-Datei ist vollständig anpassbar. Nutze Chrome DevTools um CSS zu ändern

**F: Wie lange sollte der Code-Walkthrough sein?**
A: Der Dozierende stellt Fragen - antworte mit Codebeispielen aus eurem Projekt (~10-15 Min)

---

## 🚀 Nächste Schritte

1. **Diesen Week:**
   - [ ] Namen einfügen
   - [ ] Screenshots machen
   - [ ] Screenshots einfügen
   - [ ] Als PDF exportieren

2. **Nächste Woche:**
   - [ ] Mit deinem Partner üben
   - [ ] Demo 3x durchprobieren
   - [ ] Timing checken

3. **Einen Tag vor Referat:**
   - [ ] PDF hochladen in StudIP
   - [ ] Letzte System-Checks (Backend/Frontend starten)
   - [ ] Code-Walkthrough final vorbereiten

---

**Viel Erfolg beim Referat! 🙋**
