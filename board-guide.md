# Daily Math Puzzle blackboard — guide for AI assistants

You can explain maths to a person on a real chalkboard at dailymathpuzzle.com. You send drawing commands
over MCP and the person watches the board build up **live** in their browser, one step at a time, with your
captions beside it. Afterwards the person can replay the lesson, step through it, and draw on the same board.

MCP endpoint (Streamable HTTP, no sign-in): `https://dailymathpuzzle.com/api/mcp.php`

## How a lesson goes

1. `create_board` with a title (and the person's language: en, fr, es, ja or zh). You get a `board_id`,
   an `edit_key` and a `view_url`.
2. **Give the person the `view_url` straight away** so they can open it and watch.
3. `draw` with `board_id`, `edit_key` and a list of `commands`. Start each part of the explanation with a
   `step` (its caption), followed by the commands that draw that part. Several `draw` calls can follow each
   other — the board keeps growing, and the viewer plays each new batch as it arrives.
4. Optionally call `get_board` to see what is on the board and whether the viewer reported a problem
   (for example an equation it could not read). Fix it with another `draw`.

Keep `board_id` and `edit_key` for the whole conversation: the person may ask a follow-up question, and you can
continue on the same board (or start a fresh page of it with `{"type":"clear"}`).

## Where things go

Positions are **fractions of the board**: `x` from 0 (left edge) to 1 (right edge), `y` from 0 (top) to 1
(bottom). The board is usually wider than tall (about 3 : 2) but may be narrower on a phone, so keep a margin
of about 0.03 and do not crowd it. A good layout:

- left column (x 0.03 – 0.42) for written work, one line every 0.08 – 0.10 down;
- right part (box `[0.45, 0.08, 0.52, 0.84]`) for a graph or a figure;
- about 8 lines of writing fit; when the board is full, `clear` and continue.

Text and equations are placed with their **left edge at x** and their **vertical middle at y**.
Instead of `x`/`y` you can attach writing to things you drew: `"axes":"A","x":2,"y":4` (a point in
that coordinate system) or `"near":"B"` (a geometry point), with an optional nudge `dx`, `dy` (fractions).

Colours: `chalk` (white, the default), `yellow`, `pink`, `blue`, `green`, `orange`. Use one colour per idea
(e.g. yellow for the thing being asked for, blue for what is given), not a rainbow.

## Maths syntax

- `tex` and `$…$` inside captions/text are **LaTeX** (KaTeX): `\frac{a}{b}`, `\sqrt{x}`, `\int_0^1`, `\pi`, `\cdot`.
- `equation`, `plot` and `system` use the board's **calculator syntax**, not LaTeX:
  `y = x^2 - 3`, `x^2 + y^2 = 25`, `y = sin(x)`, `y = e^x`, `y = ln(x)`, `y = sqrt(x)`, `y = abs(x - 1)`,
  `2x + 3 = 7`, `x^2 - 5x + 6 = 0`, `d/dx(x^2 sin(x))`, `int(x^2, 0, 3)`, `lim(sin(x)/x, x→0)`,
  `tangent(x^2, 1)`, `17 mod 5`. Implicit multiplication works (`2x`, `3sin(x)`); use `pi` and `e`.
  An `equation` is typeset by the board itself and can show its solution (`"solve": true`).

## Commands

Every command is an object with a `type`. Optional on every command: `color`, and `pause` (extra
milliseconds to wait after drawing it, for pacing).

| type | what it does | fields |
|---|---|---|
| `step` | starts a step of the lesson; its text is the caption shown beside the board (and spoken order) | `text` (required, `$…$` for maths), `title` (short) |
| `write` | writes LaTeX or a sentence on the board | `tex` **or** `text`; position (`x`,`y` / `axes`+`x`,`y` / `near`); `size` (px, default 26); `align` (`"right"` = x is the right edge) |
| `equation` | the board's own typeset equation, optionally solved and/or plotted | `equation` (calculator syntax); position; `solve`; `plot`; `size` |
| `system` | a system of 2–4 equations, optionally solved/plotted | `equations` (list); position; `solve`; `plot` |
| `axes` | a coordinate system | `id` (required, e.g. `"A"`); `x_range` `[min,max]`; `y_range` `[min,max]`; `box` `[left, top, width, height]` (fractions, default `[0.45,0.08,0.52,0.84]`). Units are equal on both axes, so the box is shrunk to fit the ranges. |
| `plot` | graphs an equation on axes | `axes`; `equation` (`y = …` or implicit like `x^2+y^2=9`); `id` (to shade/tangent it later); `dashed`; `label` (false hides the label) |
| `shade` | shades the area under a graph and shows its value | `graph` (plot id); `from`; `to` |
| `tangent` | draws the tangent line to a graph | `graph`; `at` (x value) |
| `point` | a labelled dot on axes | `axes`; `x`; `y`; `label`; `hollow` |
| `line` / `arrow` | a straight chalk line / arrow | `x1`,`y1`,`x2`,`y2` as board fractions, or in maths units with `axes`; `dashed` |
| `circle` | a chalk circle | `x`,`y`,`r` (fractions of the board width), or maths units with `axes` |
| `geometry` | a geometric figure the person can drag afterwards (constraints are kept) | see below |
| `highlight` | a soft yellow box behind something to draw the eye | position (`x`,`y` = top-left); `w`; `h` |
| `wait` | pause | `ms` |
| `clear` | wipes the board (a fresh page; earlier steps can still be replayed) | — |

### Geometry

```json
{"type":"geometry",
 "points": {"A":[0,0], "B":[8,0], "C":[0,6]},
 "polygons": ["ABC"],
 "segments": [["C","M"]],
 "circles": [{"center":"A","radius":2}, {"through":"ABC"}],
 "construct": [{"type":"incircle","of":"ABC","names":["I"]}],
 "box": [0.45,0.08,0.52,0.84],
 "measures": true}
```

- Point coordinates are in **units with y pointing up** (like a maths exercise). The first geometry command
  fits its points into `box`; later geometry commands use the same frame, so their points line up.
- Point names are shown on the board. Names in lists can be written `"ABC"` or `["A","B","C"]`.
- `construct` types: `incircle`, `circumcircle`, `altitudes`, `medians` (of a triangle); `midpoint`,
  `perpBisector` (of a segment); `foot` (of the perpendicular `from` a point to a segment `of`).
  `names` gives the new points names you can refer to later (`incircle` → centre, `circumcircle` → centre,
  `midpoint`/`foot` → the new point).
- `measures: false` hides the automatic length labels (they are also hidden when the figure had to be shrunk
  to fit, because the shown lengths would then be wrong).

## A complete example

```json
[
 {"type":"step","title":"The question","text":"Where do $y = x^2$ and $y = x + 2$ meet?"},
 {"type":"axes","id":"A","x_range":[-4,4],"y_range":[-1,7]},
 {"type":"plot","axes":"A","equation":"y = x^2","id":"f","color":"yellow"},
 {"type":"plot","axes":"A","equation":"y = x + 2","id":"g","color":"blue"},
 {"type":"step","text":"Set the two right-hand sides equal and solve."},
 {"type":"equation","equation":"x^2 = x + 2","x":0.04,"y":0.12},
 {"type":"equation","equation":"x^2 - x - 2 = 0","x":0.04,"y":0.22,"solve":true},
 {"type":"step","text":"So they meet at $x=-1$ and $x=2$: the points $(-1,1)$ and $(2,4)$."},
 {"type":"point","axes":"A","x":-1,"y":1,"label":"(-1, 1)","color":"pink"},
 {"type":"point","axes":"A","x":2,"y":4,"label":"(2, 4)","color":"pink"},
 {"type":"write","text":"two meeting points","x":0.04,"y":0.34,"color":"pink"}
]
```

## Good teaching on the board

- One idea per `step`; 1–4 drawing commands per step. Captions are short (one or two sentences) — the board
  carries the maths, the caption says *why*.
- Write the given information first, then build towards the answer; finish with the answer highlighted.
- Prefer the board's own `equation` (with `solve`) and `plot` over writing results by hand: the board checks
  the maths and the person can interact with it.
- Write captions and board text in the person's language.
- Limits: 80 commands per `draw` call, 600 per board; boards are deleted 30 days after their last change.
