# bit.clarity

[![Ghost](https://img.shields.io/badge/Ghost-5.x-black)](https://ghost.org)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> Ghost-Theme mit Apple-inspiriertem Editorial-Design — klare Typografie, großzügiges Whitespace, gemacht für Wissenschaftskommunikation.

bit.clarity ist ein Ghost-Theme das für die Plattform [bit.transfer](https://github.com/alexanderpenner89/bit.transfer) entwickelt wurde. Es folgt einem minimalistischen Editorial-Design mit Fokus auf Lesbarkeit und Inhalt — geeignet für wissenschaftliche Publikationen und gewerkeorientierten Wissenstransfer.

## Features

- **Editorial-Layout** — Apple-inspiriertes Design mit klarer Typografiehierarchie
- **Dossier-System** — Dedizierte Seiten für thematisch gebündelte Artikelreihen (`/dossiers`)
- **Gewerke-Seiten** — Custom-Template für gewerk-spezifische Übersichtsseiten (`/gewerke`)
- **Homepage-Template** — Eigenständige Startseite mit Hero-Bereich
- **Newsletter-Integration** — Konfigurierbare Newsletter-CTAs in Sidebar und Beiträgen
- **Paginierung** — Seitenweise Navigation durch Beitragsübersichten

## Installation

1. ZIP der aktuellen Version unter [Releases](https://github.com/alexanderpenner89/bit.clarity/releases/latest) herunterladen
2. Ghost Admin → Settings → Design → Change theme → ZIP hochladen
3. Theme aktivieren

## Anpassung

Über Ghost Admin → Settings → Design → Customize stehen folgende Optionen zur Verfügung:

| Option | Beschreibung | Standard |
|--------|--------------|---------|
| `Newsletter-Button` | Button-Text im Newsletter CTA | `Newsletter auswählen` |
| `Sidebar-Text` | Text im Newsletter-Block | `Forschung direkt ins Postfach…` |

## Dateistruktur

```
bit.clarity/
├── assets/
│   ├── css/screen.css     # Styles
│   └── js/app.js          # JavaScript
├── partials/
│   ├── dossier-card.hbs   # Dossier-Karte
│   ├── navigation.hbs     # Navigation
│   ├── pagination.hbs     # Paginierung
│   ├── post-card.hbs      # Beitrags-Karte
│   └── sidebar.hbs        # Sidebar
├── default.hbs            # Basis-Layout
├── home.hbs               # Startseite
├── index.hbs              # Beitragsübersicht
├── dossiers.hbs           # Dossier-Übersicht
├── page-dossiers.hbs      # Dossier-Seite (Custom)
├── page-gewerke.hbs       # Gewerke-Seite (Custom)
├── post.hbs               # Einzelbeitrag
├── page.hbs               # Statische Seite
├── tag.hbs                # Tag-Übersicht
├── error.hbs              # Fehlerseite
└── package.json           # Ghost Theme Konfiguration
```

## Entwicklung

```bash
# Theme lokal mit Ghost testen
docker compose --profile ghost up -d
# Theme-Verzeichnis in Ghost mounten oder ZIP hochladen
```

Änderungen am Theme lösen automatisch einen neuen Release mit aktualisierter ZIP aus (via GitHub Actions).

## Lizenz

MIT — siehe [LICENSE](LICENSE).
