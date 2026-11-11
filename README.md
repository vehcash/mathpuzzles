# Daily Math Puzzle (dailymathpuzzle.com) — math puzzles on a smart blackboard

Open `index.html` in Chrome or Edge (double-click works; no server or internet needed — KaTeX is bundled in `lib/`).

## Pages
- `index.html` — the puzzle + smart blackboard. Opens today's puzzle (or a random one when there is no server); `index.html?p=<puzzle id>` opens a specific puzzle; `?cat=algebra` a random one from a category; `?daily` / `?daily=<date>` a daily puzzle.
- `daily-admin.html` — choose and schedule the puzzle of the day (see below; needs the admin key).
- `list.html` — all puzzles as cards (category badge on each), quick search, category filters, loads more as you scroll. Linked from the board's **☷ All puzzles** button.

## Search engines
- **`node tools/build-index.js`** also runs `tools/build-pages.js`, which writes:
  - `puzzle/<id>.html` — a real page per puzzle (the address used online, also by the list page): `index.html` with that puzzle's title, description, statement, canonical link, `hreflang` links for the five languages, Open Graph/Twitter card and schema.org data (Quiz + breadcrumbs) already in the HTML. The scripts then load the puzzle as usual. **Re-run after editing `index.html`**, which is the template (its `<!-- seo:start -->…<!-- seo:end -->` block is replaced per puzzle).
  - `sitemap.xml` — home, list, cheat sheets (and each topic) and every puzzle page, each language (`?lang=fr` …) with its alternates.
- `robots.txt` points to the sitemap and keeps `api/`, `data/`, `tools/` and the admin page out of search results.
- While you browse, the page title, description and canonical link follow the puzzle and language shown; today's puzzle stays on the clean address `/`.
- `og-image.png` (1200×630) is the picture shown when a link is shared.
- After going live: add the site to Google Search Console and Bing Webmaster Tools and submit `https://dailymathpuzzle.com/sitemap.xml`.

## Puzzle of the day (dailymathpuzzle.com)
Needs PHP 7.4+ on the server (any Apache shared host). Opened from disk, the site works as before without it (a random puzzle on the home page).
- `api/daily.php` picks **one puzzle per day** (days start at midnight Europe/Madrid, `DAILY_TZ`), the same for every visitor, and saves it in `data/daily-history.json`. The first request of the day makes the choice.
- **A puzzle is never the daily puzzle twice.** Categories take turns (`CATEGORY_ORDER`); a category with no unused puzzles left is skipped. When every puzzle has been used, the site stops showing a daily puzzle until you add more.
- The home page opens today's puzzle; `/?daily` links to it and `index.html?daily=2026-11-11` to a past day. The **★ Puzzle of the day** button opens it, and its **▾** menu lists all past daily puzzles. The card shows a ★ badge with the date.
- **Choose the daily puzzle:** `daily-admin.html`. Set a key first: edit `api/config.php` **on the server** (`ADMIN_KEY`, e.g. `php -r "echo bin2hex(random_bytes(16));"`; empty = admin off). There you can replace today's puzzle, schedule puzzles for future dates (a scheduled day wins over the automatic choice) and see how many puzzles each category has left.
- Deploying: upload everything **except `data/`** (it holds the history, so overwriting it would allow repeats). `data/` is created on the first request and protected by its own `.htaccess`; PHP must be able to write to the site folder (or create `data/` yourself, writable by PHP).

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
- Every puzzle has a **`source`** (shown under the hint on the board and as tags on the list cards):
  ```js
  source: {
    kind: 'standard',              // 'standard' = original exercise of a common type · 'classic' = a famous old problem
    note: { en: '…', fr: '…', … },  // optional: the classic it is based on (e.g. Montmort 1708, Nine Chapters)
    exams: ['gaokao', 'ap'],       // exams where this KIND of question is typical (keys: EXAMS in js/puzzles.js)
    from: { en: 'Gaokao 2023, New Curriculum Paper I, Q7', zh: '2023 新高考 I 卷 第 7 题' },   // only for a real past-paper question
    url: 'https://…'               // optional link for `from`
  },
  ```
  Most puzzles were written for the site and say "Original puzzle"; `exams` only says the type of question is standard there, never that the exact question was set there. 37 puzzles are real past entrance-exam questions (reworded, with 8 options) from STEP, the Oxford MAT, the Gaokao, JEE Advanced, IME, ITA and the EBAU, and carry `from` with the paper and question number. Use `from` (shown instead of "Original puzzle", tagged "Exam question" in the list) only when the puzzle really is a past exam question. Exam keys: `gaokao`, `zhongkao`, `kyotsu`, `ebau`, `bac`, `alevel`, `alevelfm`, `gcse`, `ib`, `ap`, `amc`, `uni`, `step`, `mat`, `jee`, `ime`, `ita` — add new ones to `EXAMS`. Exam names and notes are searchable ("gaokao", "高考", "Montmort").
- **After adding or editing a puzzle run `node tools/build-index.js`** (needs Node.js). It rebuilds `index.js` and the search files, checks the puzzle (8 options, at most 2 correct, steps present, unique id, a `source` with known exam keys) and lists any missing translations.
- **Figures:** lines (`seg`, `arc`, `graph`) are never filled, so no solid black shapes. Keep labels off lines and other labels and inside the figure box (`pad` in `Figure(...)`); the figure's `w`/`h` must cover the plotted range, or it spills into the text above.

## AI assistants on the blackboard (MCP) — live lessons
AI assistants can teach on the blackboard: they draw an explanation step by step and the student watches it appear live.
- **`api/mcp.php`** — the MCP server (Streamable HTTP, JSON-RPC, stateless, no sign-in). URL: `https://dailymathpuzzle.com/api/mcp.php`. Tools: `board_guide`, `create_board` (returns `board_id`, `edit_key`, `view_url`), `draw` (a list of commands), `get_board` (what is drawn + what the viewer could not draw). Also the resource `board://guide` and the prompt `explain_on_board`.
- **`board-guide.md`** — the guide for AIs (every command, the maths syntax, layout, an example). The `board_guide` tool returns this file, so editing it updates what assistants learn. `mcp.html` is the page for people (how to connect Claude, ChatGPT, Claude Code, Cursor…), `llms.txt` points AIs to both.
- **`live.html?b=<id>`** + `js/live.js` + `css/live.css` — the viewer: the real smart board plays the commands (polling `api/board.php` every 2 s), with the step captions beside it, Back / Next / Replay, Copy link; the viewer can draw too. What it cannot draw is reported back and shown by `get_board`.
- **`api/boards-lib.php`** — storage and checks shared by both endpoints: boards are `data/boards/<id>.json` (under the protected `data/`), deleted 30 days after their last change; limits 600 commands per board, 80 per call, 30 new boards per hour per address, 40 draw calls per minute per board. Every command is validated (types, numbers, references to axes/graphs/points) and errors are returned to the AI with the command number.
- Deploying: upload `api/`, `live.html`, `mcp.html`, `board-guide.md`, `llms.txt`, `js/live.js`, `css/live.css` (and, as always, not `data/`). PHP must be able to create `data/boards/`. Test with `npx @modelcontextprotocol/inspector` (Streamable HTTP, the URL above).

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
- `js/live.js` — live lessons: plays an AI's board commands on the smart board (see the MCP section).

## Board tips
- Draw, pause: pick what it is in the menu (Enter = best guess). ⚙ chooses Always ask / Ask until learned / Never ask.
- Type in the ƒ(x) bar: Enter plots (`y = x`, `x^2 + y^2 = 25`), Shift+Enter places it where you click. `{ System` solves several equations step by step and plots them.
- △ Geometry: draw figures, select them to measure and add constraints; drag points and the figure keeps its constraints.
- Drag any equation, axes origin or point to move it. Double-click an equation to edit it.
- ✨ Ask an AI (puzzle card / System panel) opens the problem in ChatGPT, Copilot, Claude, Perplexity, Le Chat, Gemini or DeepSeek.

## Calculus syntax
`17 mod 5` (also `%`; exact for big powers like `2^100 mod 7`), `d/dx(x^2 sin(x))`, `diff(f, x, 2)`, `diff(f, x=2)`, `lim(sin(x)/x, x→0)` (`x→0+` one-sided, `x→∞`), `int(x^2, 0, 3)`, `tangent(x^2, 1)` — results show automatically; **Steps** explains them; **Plot** draws them. Plotted curves get **f′**, **tangent** and **∫ area** buttons in the Graphs panel.
