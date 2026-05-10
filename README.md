# CLIC — Creative Agency Website

A premium, Awwwards-grade showcase site for **CLIC**, a Tunis-based creative agency for social media & content. Built with Angular 17 standalone components, with hand-crafted animations, custom cursor, smooth scroll, and a typography-driven editorial aesthetic.

---

## 🎨 Design System

### Brand Identity
The CLIC logo is a deep cobalt blue with a luminous gold Arabic inscription (كليك). The palette is built directly from those tones, modernized into a sophisticated dark-mode design system with one warm cream interlude.

### Color Palette

| Token | HEX | Role |
|-------|-----|------|
| `--clic-cobalt`        | `#1B1FB8` | **Primary** — direct match to logo background |
| `--clic-cobalt-bright` | `#2E32E0` | Glows, gradient highlights |
| `--clic-cobalt-deep`   | `#131593` | Borders, gradient depth |
| `--clic-gold`          | `#E8C547` | **Accent** — match to logo lettering, used for hover, links, key highlights |
| `--clic-gold-warm`     | `#F2D060` | Lighter gold variant |
| `--clic-gold-deep`     | `#C9A535` | Pressed / dark-on-gold states |
| `--bg-void`            | `#06081F` | Primary deep background |
| `--bg-night`           | `#0B0E2A` | Section backgrounds |
| `--bg-elevated`        | `#11163A` | Cards, panels |
| `--bg-cream`           | `#F5F0E6` | Light interlude (About section) |
| `--text-cloud`         | `#F8F7F2` | Primary text on dark |
| `--text-mist`          | `#C9CCDD` | Secondary text on dark |
| `--text-slate`         | `#7A819E` | Muted text on dark |
| `--text-ink`           | `#0B0E2A` | Primary text on light |
| `--text-graphite`      | `#4A4F66` | Secondary text on light |

### Strategic Color Use
- **Cobalt** → never a flat surface; appears as deep gradients in the Hero glow orbs and the Featured-work gradient. Section dividers and the brand mark also carry it.
- **Gold** → reserved for emotion: hover states, accent words ("italic accents" inside headlines), CTAs, the marquee divider, the live-time card, and the cursor itself.
- **Voids & nights** → primary container. The site is dark-first with one bright cream interlude (About) for editorial rhythm.
- **Cream** → cushions the About section, signaling "this is the human story."

### Typography
- **Display**: `Fraunces` (variable serif) — used italic for highlights to nod to the logo's Arabic letterform character.
- **Body**: `Geist` — neo-grotesque sans, neutral and modern.
- **Mono**: `Geist Mono` — labels, numbers, eyebrows, micro-copy.

The pairing breaks the agency-cliché of generic sans-only design and gives each section an editorial, magazine-like rhythm.

---

## 🧱 Sections

1. **Hero** — Massive editorial type with word-by-word reveal animation, atmospheric blue/gold orbs, animated grid, scroll cue, and live stat row.
2. **Marquee** — Continuous gold-on-blue infinite-scrolling band of services; pauses on hover.
3. **Services** — Six interactive accordion rows with click-to-expand panels showing tags, descriptions, and bullet points.
4. **Work** — Featured case study card + minimal portfolio rows with a **floating cursor-tracking preview** that follows the mouse and shows the project's monogram.
5. **Clients** — Auto-scrolling logo strip + sliding testimonial carousel with autoplay, prev/next buttons, and pagination dots.
6. **About** — Cream interlude with editorial statement, two-column story, 4-step process timeline, and big-number stats.
7. **Contact** — Modern form with chip selectors (services & budget), inline validation, animated submit states, and a sidebar showing live Tunis local time.
8. **Footer** — Monumental brand mark in transparent-fade gradient, four-column sitemap, newsletter capture, and back-to-top CTA.

---

## ✨ Interactions & Animations

- **Custom cursor** — Two-element cursor (dot + ring) that lerps toward the mouse with different easing speeds, scales up on interactive elements, and shows context labels (`view`, `email`, `case study`, etc.).
- **Smooth scroll** — Native `scroll-behavior: smooth` plus anchor-based section IDs.
- **Reveal-on-scroll** — IntersectionObserver-based, with `reveal` and `reveal-stagger` utility classes that apply staggered children animations.
- **Word-by-word hero reveal** — Each word in the H1 rises and fades in with cascading delays.
- **Magnetic services accordion** — Hover previews, click-to-lock, full-width row expansion with grid-row transitions.
- **Floating work preview** — A gradient card follows the cursor inside the work grid, displaying the hovered project's monogram with subtle rotation.
- **Marquee strip** — CSS keyframe infinite loop with seamless 3× content repetition; pauses on hover.
- **Testimonial carousel** — Autoplay every 6.5s, with cross-fade slide transitions and resettable interval on user interaction.
- **Animated form states** — Chip toggles, focus-bottom-border morph, validation shake, ellipsis-typing send animation.
- **Footer monumental mark** — Gigantic "CLIC" text with gradient mask fading into the void, paired with Arabic accent.
- **Subtle film grain** — SVG noise overlay across the entire page for premium texture.

All animations honor `prefers-reduced-motion`.

---

## 🧩 Project Structure

```
clic-agency/
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── README.md
└── src/
    ├── index.html
    ├── main.ts
    ├── styles.css                          ← global tokens, reset, utilities
    ├── favicon.ico
    └── app/
        ├── app.component.ts                ← root, imports all sections
        ├── app.component.html
        ├── app.component.css
        ├── app.module.ts                   ← optional NgModule alternative
        └── components/
            ├── cursor/                     ← custom mouse cursor
            ├── navbar/                     ← top bar with mobile menu
            ├── hero/                       ← landing section
            ├── marquee/                    ← gold strip divider
            ├── services/                   ← interactive accordion
            ├── work/                       ← portfolio grid + cursor preview
            ├── clients/                    ← logos + testimonial carousel
            ├── about/                      ← studio story + process
            ├── contact/                    ← form + info aside
            └── footer/                     ← sitemap, newsletter, mega-mark
```

Each component folder has the strict three-file structure:
```
*.component.html        (template only)
*.component.css         (styles only, scoped via Angular)
*.component.ts          (logic only, standalone)
```

---

## 🚀 Run the project

### Prerequisites
- Node.js 18.13+ (LTS recommended)
- npm 9+

### Install & start dev server
```bash
npm install
npm start
```
Opens at **http://localhost:4200** with hot-reload.

### Production build
```bash
npm run build
```
Outputs to `dist/clic-agency/`.

---

## 📱 Responsive

Mobile-first CSS with breakpoints at **600px** and **900px**. The custom cursor is automatically disabled on touch devices via `(hover: none)` media query. The mobile navigation slides in as a full-screen panel.

---

## 🔧 Notes for Devs

- **Standalone components**: This project uses Angular 17's modern standalone API, bootstrapped from `main.ts`. The `app.module.ts` is included as a fallback if you prefer classic NgModule architecture — see comments in that file.
- **No external animation libs**: All animation is CSS keyframes + IntersectionObserver + a small lerp loop for the cursor. Keeps the bundle lean.
- **Replace placeholders**: Logo monograms (`CL`, `MS`, `OC`, etc.) are CSS-rendered placeholders. Drop real logos as `<img>` inside `clients.component.html` and `work.component.html` when assets are ready.
- **Form backend**: `contact.component.ts` simulates submission (`setTimeout`). Wire `onSubmit` to your real endpoint (Formspree, Sanity, etc.).
- **Accessibility**: ARIA labels on icon buttons, `prefers-reduced-motion` honored, keyboard-focusable interactive elements.

---

Built with patience and good coffee, in Tunis. ☕
