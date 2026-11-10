# Chalk & Proof — math puzzles on a smart blackboard

Open `index.html` in Chrome or Edge (double-click works; no server or internet needed — KaTeX is bundled in `lib/`).

## Pages
- `index.html` — the puzzle + smart blackboard. `index.html?p=<puzzle id>` opens a specific puzzle; `?cat=algebra` a random one from a category.
- `list.html` — all puzzles as cards (category badge on each), quick search, category filters, loads more as you scroll. Linked from the board's **☷ All puzzles** button.

## Files
- `js/puzzles.js` — the puzzle bank. Add puzzles to `PUZZLES`; each needs a `category`, `statement`, `figure(svg)`, eight `options` (0–2 with `correct: true`) and `steps` (each step: `title`, `lines` in LaTeX, `note`, optional `fig(F)` animation).
- `js/board.js` — the smart blackboard: asks what you drew (intent menu), plots explicit and implicit equations, axes zoom/trace, click-to-place equations, dragging.
- `js/intent.js` — learns your answers to “What is this?” (kept in the browser's localStorage) so it can stop asking.
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
`d/dx(x^2 sin(x))`, `diff(f, x, 2)`, `diff(f, x=2)`, `lim(sin(x)/x, x→0)` (`x→0+` one-sided, `x→∞`), `int(x^2, 0, 3)`, `tangent(x^2, 1)` — results show automatically; **Steps** explains them; **Plot** draws them. Plotted curves get **f′**, **tangent** and **∫ area** buttons in the Graphs panel.
