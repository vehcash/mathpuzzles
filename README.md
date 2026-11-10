# Mathpuzzles — math puzzles on a smart blackboard

Open `index.html` in Chrome or Edge (double-click works; no server or internet needed — KaTeX is bundled in `lib/`).

## Pages
- `index.html` — the puzzle + smart blackboard. `index.html?p=<puzzle id>` opens a specific puzzle; `?cat=algebra` a random one from a category.
- `list.html` — all puzzles as cards (category badge on each), quick search, category filters, loads more as you scroll. Linked from the board's **☷ All puzzles** button.

## Puzzles — one file each
```
puzzles/
  index.js                 generated: id, category, difficulty, file of every puzzle (always loaded, tiny)
  search/en.js … zh.js     generated: title, statement and search words per puzzle, one file per language
  geometry/geo-incircle-6-8-10.js
  algebra/alg-rectangle-area-40.js
  …                        one puzzle per file, all five languages inside
```
- The board loads only `puzzles/index.js` plus the one puzzle it shows; the list page loads the search file for your language and each puzzle file when its card scrolls into view. Tested with 1,024 puzzles: the board opens in ~0.4 s.
- Puzzle files are small scripts (`PuzzleBank.define({...})`), not `.json`, so the site still works opened straight from disk — browsers block reading `.json` from `file://`. Their content is JSON-shaped data plus the figure/animation functions.
- Every text field is `{ en, fr, es, ja, zh }` (a plain English string also works; missing languages fall back to English): `title`, `statement`, `hint`, `figureText`, `aiHint`, each option's `why`, each step's `title` and `note`. `words` translates labels drawn in the figure and `\text{…}` words inside formulas.
- Each puzzle needs eight `options` (0–2 with `correct: true`), `figure(svg)` and `steps` (`lines` in LaTeX, optional `fig(F)` animation). Shared drawing helpers come from `PuzzleBank.kit` (`Figure`, `mid`, `unit`, `lerp`, `S2`, `S3`).
- **After adding or editing a puzzle run `node tools/build-index.js`** (needs Node.js). It rebuilds `index.js` and the search files, checks the puzzle (8 options, at most 2 correct, steps present, unique id) and lists any missing translations.

## Languages and cookies
- English, Français, Español, 日本語, 简体中文. Click a flag to switch (the page reloads in the new language, on the same puzzle); the first visit follows the browser's language settings.
- Interface text: `js/lang/<lang>.js` (keys are the English text). Puzzle text: inside each puzzle file.
- Cookie banner and **Cookies** settings (EU ePrivacy/GDPR): nothing optional is stored until the visitor accepts "Preferences"; "Reject" is as easy as "Accept"; no analytics, ads or third-party content; switching Preferences off deletes what was stored. The choice itself is kept 6 months.
- Stored with consent: language, ask mode, learned drawings, recent equations. Small values use cookies; opened from disk (`file://`) the browser has no cookies, so localStorage is used under the same rules.

## Files
- `js/puzzles.js` — the puzzle engine: categories, SVG figure kit, loading puzzle files on demand, localisation.
- `js/board.js` — the smart blackboard: asks what you drew (intent menu), plots explicit and implicit equations, axes zoom/trace, click-to-place equations, dragging.
- `js/intent.js` — learns your answers to “What is this?” so it can stop asking (remembered across visits only with cookie consent).
- `js/i18n.js`, `js/lang/*.js` — languages, flags and automatic translation of the interface.
- `js/consent.js`, `js/consent-ui.js` — cookie consent and the storage it controls.
- `lib/fonts/` — self-hosted fonts (no Google Fonts request, which matters for GDPR).
- `js/geometry.js` — constraint-based geometry editor (points, segments, polygons, circles; length/angle/perpendicular/parallel/tangent… constraints; incircle, circumcircle, altitudes, medians).
- `js/list.js` — the list page.
- `js/ui.js` — equation bar + keypad, system-of-equations panel, graph list, geometry panel, ask settings.
- `js/recognizer.js` — offline handwriting recogniser ($P point clouds + layout analysis for fractions, roots, exponents, sin/cos/tan/log/ln, degrees).
- `js/mathcore.js` — parser, evaluator, solver, LaTeX printer and curve fitting.
- `js/app.js` — UI glue: categories, answers, confirmation, step-by-step solution.

## Board tips
- Draw, pause: pick what it is in the menu (Enter = best guess). ⚙ chooses Always ask / Ask until learned / Never ask.
- Type in the ƒ(x) bar: Enter plots (`y = x`, `x^2 + y^2 = 25`), Shift+Enter places it where you click. `{ System` solves several equations step by step and plots them.
- △ Geometry: draw figures, select them to measure and add constraints; drag points and the figure keeps its constraints.
- Drag any equation, axes origin or point to move it. Double-click an equation to edit it.
- ✨ Ask an AI (puzzle card / System panel) opens the problem in ChatGPT, Copilot, Claude, Perplexity, Le Chat, Gemini or DeepSeek.

## Calculus syntax
`17 mod 5` (also `%`; exact for big powers like `2^100 mod 7`), `d/dx(x^2 sin(x))`, `diff(f, x, 2)`, `diff(f, x=2)`, `lim(sin(x)/x, x→0)` (`x→0+` one-sided, `x→∞`), `int(x^2, 0, 3)`, `tangent(x^2, 1)` — results show automatically; **Steps** explains them; **Plot** draws them. Plotted curves get **f′**, **tangent** and **∫ area** buttons in the Graphs panel.
