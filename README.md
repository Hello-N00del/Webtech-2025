# Webtech-2025 – Anfänger Setup Guide

Herzlich willkommen zum Projekt „Webtech-2025“. Dieser Guide hilft dir, das Projekt von GitHub zu klonen, alle nötigen Programme und VSCode-Erweiterungen zu installieren und danach das Projekt lokal auszuführen – auch wenn du noch nie mit GitHub, VSCode, Node.js oder Git gearbeitet hast.

---

## 📌 Repository Link zum Klonen

Das Projekt findest du hier auf GitHub (zum Klonen brauchst du diese URL):

https://github.com/Hello-N00del/Webtech-2025.git

---

## 1. Programme installieren (einmalig)

### Visual Studio Code (VSCode)

- Webseite: https://code.visualstudio.com  
- Lade es herunter und installiere es.

### Node.js (JavaScript-Laufzeitumgebung)

- Webseite: https://nodejs.org  
- Installiere die **LTS-Version** (empfohlen).

### Git (Versionskontrolle)

- Webseite: https://git-scm.com/downloads  
- Installiere Git mit den Standard-Einstellungen.  
- Nach Installation im Terminal prüfen:  
*git --version*
Es sollte eine Versionsnummer erscheinen

---

## 2. VSCode Erweiterungen (Plugins) installieren

Diese Plugins machen die Entwicklung, Git-Nutzung und den Umgang mit Vue und TypeScript viel einfacher. So geht’s:

1. Öffne VSCode  
2. Klicke links auf das Symbol für **Extensions** (Symbol mit 4 Kästchen) oder drücke `Strg + Shift + X`  
3. Suche nacheinander folgende Erweiterungen und installiere sie:

| Erweiterung         | Zweck                                       |
|---------------------|---------------------------------------------|
| **Volar**           | Vue 3 + TypeScript Unterstützung            |
| **Prettier**        | Code-Formatierung (automatisch sauberer Code)|
| **ESLint**          | Code-Qualität und Fehlerwarnungen            |
| **Git Graph**       | Visuelle Git-Historie und einfache Bedienung |
| **npm Intellisense**| Schnelle Vorschläge für npm Pakete           |
| **Node.js Extension Pack** | Praktische Tools für Node.js Entwicklung|
| **Path Intellisense**| Automatische Pfad-Ergänzungen beim Import   |
| **Debugger for Chrome** | Debugging direkt aus VSCode im Browser      |

---

## 3. Projekt von GitHub klonen

1. Öffne VSCode  
2. Klicke links unten auf das **Source Control** Symbol (oder drücke `Strg + Shift + G`)  
3. Klicke oben auf **Repository klonen**  
4. Füge diese URL ein:  
    https://github.com/Hello-N00del/Webtech-2025.git
5. Wähle einen Ordner auf deinem Computer aus, z.B. Desktop oder Dokumente  
6. Klicke auf „Öffnen“, wenn VSCode fragt, ob das geklonte Projekt geöffnet werden soll  

---

## 4. Projekt lokal starten

### Terminal öffnen

- Gehe in VSCode auf **Terminal > Neues Terminal**

### Nötige Pakete installieren

Gib folgenden Befehl ein und drücke Enter:

*npm install*

Das lädt alle benötigten Bibliotheken herunter. Warte, bis der Vorgang abgeschlossen ist.

### Entwicklungsserver starten

Starte den Server mit:

*npm run dev*

Nach einiger Zeit erscheint eine Adresse, z.B. `http://localhost:5173`. Öffne diese in deinem Webbrowser.

---

## 5. Git-Grundlagen

- `git status` – zeigt Änderungen an  
- `git add .` – bereitet alle Änderungen zum Speichern vor  
- `git commit -m "Kurze Nachricht"` – sichert Änderungen lokal  
- `git push` – überträgt Änderungen zurück zu GitHub  

**Tipp:** Mit dem Plugin **Git Graph** kannst du diese Aktionen auch per Mausklick erledigen und deine Versionsgeschichte visuell ansehen.

---

## Hilfe & Tipps

- Frag bitte dein Team oder erfahrene Personen, falls du irgendwo hängen bleibst.  
- Offizielle Anleitungen:  
  - [GitHub Docs](https://docs.github.com)  
  - [VSCode Docs](https://code.visualstudio.com/docs)  

---

Wir wünschen dir viel Erfolg und Spaß beim Programmieren mit Webtech-2025! 🚀