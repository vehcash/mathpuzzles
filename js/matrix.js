/* Matrix tools for the blackboard: a floating, draggable panel to type matrices up to 4 × 4 (any shape) and get
   determinants, inverses, transposes, ranks, products and the solution of a system from its augmented matrix,
   all with exact fractions and step by step. Also makes the floating panels draggable by their header. */
(function (global) {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const K = (t, o) => katex.renderToString(t, Object.assign({ throwOnError: false }, o || {}));
  const tr = (s, v) => (global.I18N ? I18N.t(s, v) : s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ------------------------------------------------------------------ exact fractions (BigInt)
  const babs = a => (a < 0n ? -a : a);
  const gcd = (a, b) => { a = babs(a); b = babs(b); while (b) { [a, b] = [b, a % b]; } return a || 1n; };
  const Fr = (n, d = 1n) => { n = BigInt(n); d = BigInt(d); if (d === 0n) throw new Error('division by zero'); if (d < 0n) { n = -n; d = -d; } const g = gcd(n, d); return { n: n / g, d: d / g }; };
  const ZERO = Fr(0), ONE = Fr(1);
  const add = (a, b) => Fr(a.n * b.d + b.n * a.d, a.d * b.d);
  const sub = (a, b) => Fr(a.n * b.d - b.n * a.d, a.d * b.d);
  const mul = (a, b) => Fr(a.n * b.n, a.d * b.d);
  const div = (a, b) => Fr(a.n * b.d, a.d * b.n);
  const neg = a => Fr(-a.n, a.d);
  const isZ = a => a.n === 0n, isOne = a => a.n === 1n && a.d === 1n;
  const tex = a => (a.d === 1n ? String(a.n) : (a.n < 0n ? '-' : '') + '\\tfrac{' + babs(a.n) + '}{' + a.d + '}');
  const texP = a => (a.n < 0n ? '(' + tex(a) + ')' : tex(a));   // parenthesised when negative (inside products)
  const asc = a => (a.d === 1n ? String(a.n) : a.n + '/' + a.d);

  /** "3", "-2", "1/2", "0.25", "-3/4", "1,5" → fraction (or throws) */
  function parseEntry(s) {
    s = String(s).trim().replace(',', '.').replace(/−/g, '-');
    if (s === '' ) return ZERO;
    let m = s.match(/^([+-]?)(\d+)(?:\.(\d+))?(?:\/([+-]?\d+)(?:\.(\d+))?)?$/);
    if (!m) throw new Error(tr('Use numbers or fractions such as 3, -2, 1/2 or 0.5'));
    const dec = (i, f) => Fr(BigInt(i + (f || '')), 10n ** BigInt((f || '').length));
    let v = dec(m[2], m[3]); if (m[1] === '-') v = neg(v);
    if (m[4] !== undefined) { const sg = m[4].startsWith('-') ? -1n : 1n; const d = dec(m[4].replace(/^[+-]/, ''), m[5]); v = div(v, sg < 0n ? neg(d) : d); }
    return v;
  }

  // ------------------------------------------------------------------ matrix helpers
  const clone = M => M.map(r => r.slice());
  const mtex = (M, bar, env = 'pmatrix') => {
    if (M.some(r => r.some(x => x.d !== 1n))) return '{\\def\\arraystretch{1.65}' + mtex0(M, bar, env) + '}';   // room for stacked fractions
    return mtex0(M, bar, env);
  };
  const mtex0 = (M, bar, env) => {
    if (bar) { const c = M[0].length; return '\\left(\\begin{array}{' + 'c'.repeat(bar) + '|' + 'c'.repeat(c - bar) + '}' + M.map(r => r.map(tex).join(' & ')).join(' \\\\ ') + '\\end{array}\\right)'; }
    return '\\begin{' + env + '}' + M.map(r => r.map(tex).join(' & ')).join(' \\\\ ') + '\\end{' + env + '}';
  };
  const vtex = M => mtex(M, 0, 'vmatrix');
  const R = i => 'R_{' + (i + 1) + '}';

  /** row reduction with a log of operations. mode 'ref' (echelon, below the pivots) or 'rref' (reduced, pivots 1).
      bar = number of coefficient columns that may hold pivots (the rest are an augmented part). */
  function reduce(M0, mode, bar) {
    const M = clone(M0), rows = M.length, cols = M[0].length, lim = bar || cols;
    const steps = []; const pivots = []; let swaps = 0, r = 0;
    for (let c = 0; c < lim && r < rows; c++) {
      let p = -1;
      for (let i = r; i < rows; i++) if (!isZ(M[i][c])) { if (p < 0 || (isOne(M[i][c]) && !isOne(M[p][c]))) p = i; if (isOne(M[i][c])) break; }
      if (p < 0) continue;
      const ops = [];
      if (p !== r) { [M[p], M[r]] = [M[r], M[p]]; swaps++; ops.push(R(r) + '\\leftrightarrow ' + R(p)); }
      if (mode === 'rref' && !isOne(M[r][c])) { const k = M[r][c]; M[r] = M[r].map(x => div(x, k)); ops.push(R(r) + '\\to ' + (k.d === 1n && k.n > 0n ? '\\tfrac{1}{' + k.n + '}' : '\\left(' + tex(div(ONE, k)) + '\\right)') + R(r)); }
      for (let i = 0; i < rows; i++) {
        if (i === r || isZ(M[i][c]) || (mode !== 'rref' && i < r)) continue;
        const f = div(M[i][c], M[r][c]);
        M[i] = M[i].map((x, j) => sub(x, mul(f, M[r][j])));
        const fp = f.n < 0n ? '+' : '-', fa = Fr(babs(f.n), f.d);
        ops.push(R(i) + '\\to ' + R(i) + ' ' + fp + ' ' + (isOne(fa) ? '' : tex(fa)) + R(r));
      }
      pivots.push([r, c]);
      if (ops.length) steps.push({ ops, M: clone(M) });
      r++;
    }
    return { M, steps, pivots, swaps, rank: pivots.length };
  }

  function minor(M, i, j) { return M.filter((_, a) => a !== i).map(r => r.filter((_, b) => b !== j)); }
  function detVal(M) {
    const n = M.length; if (n === 1) return M[0][0];
    if (n === 2) return sub(mul(M[0][0], M[1][1]), mul(M[0][1], M[1][0]));
    let s = ZERO; for (let j = 0; j < n; j++) if (!isZ(M[0][j])) { const t = mul(M[0][j], detVal(minor(M, 0, j))); s = j % 2 ? sub(s, t) : add(s, t); } return s;
  }

  // ------------------------------------------------------------------ operations (each returns { answer, steps, place })
  function opDet(A) {
    const n = A.length; if (n !== A[0].length) throw new Error(tr('The determinant needs a square matrix'));
    const steps = []; const d = detVal(A);
    if (n === 1) steps.push({ t: tr('A 1 × 1 determinant is the entry itself'), m: vtex(A) + ' = ' + tex(d) });
    else if (n === 2) {
      const [[a, b], [c, e]] = A;
      steps.push({ t: tr('Main diagonal minus the other diagonal'), m: vtex(A) + ' = ' + texP(a) + '\\cdot ' + texP(e) + ' - ' + texP(b) + '\\cdot ' + texP(c) });
      steps.push({ t: tr('Compute'), m: '= ' + tex(mul(a, e)) + ' - ' + texP(mul(b, c)) + ' = ' + tex(d) });
    } else if (n === 3) {
      // expand along the row or column with the most zeros
      let best = { z: -1 };
      for (let i = 0; i < 3; i++) { const z = A[i].filter(isZ).length; if (z > best.z) best = { z, row: true, k: i }; }
      for (let j = 0; j < 3; j++) { const z = A.filter(r => isZ(r[j])).length; if (z > best.z) best = { z, row: false, k: j }; }
      const cells = [0, 1, 2].map(t => (best.row ? [best.k, t] : [t, best.k]));
      const where = best.row ? tr('row {n}', { n: best.k + 1 }) : tr('column {n}', { n: best.k + 1 });
      steps.push({ t: tr('Cofactor expansion along {w}', { w: where }) + (best.z > 0 ? ' — ' + tr('it has the most zeros') : ''),
        m: vtex(A) + ' = ' + cells.map(([i, j], q) => ((i + j) % 2 ? '-' : (q ? '+' : '')) + texP(A[i][j]) + vtex(minor(A, i, j))).join(' ') });
      const terms = cells.filter(([i, j]) => !isZ(A[i][j])).map(([i, j]) => { const m = detVal(minor(A, i, j)); return { i, j, m, v: mul(A[i][j], (i + j) % 2 ? neg(m) : m) }; });
      steps.push({ t: tr('Each 2 × 2 minor: main diagonal minus the other diagonal'), m: '= ' + (terms.map(({ i, j, m }, q) => ((i + j) % 2 ? '-' : (q ? '+' : '')) + texP(A[i][j]) + '\\cdot ' + texP(m)).join(' ') || '0') });
      steps.push({ t: tr('Add up'), m: '= ' + (terms.map((t, q) => (q && t.v.n >= 0n ? '+' : '') + tex(t.v)).join(' ') || '0') + ' = ' + tex(d) });
    } else {
      const red = reduce(A, 'ref');
      steps.push({ t: tr('Row operations: adding a multiple of a row does not change the determinant; each swap changes its sign'), m: vtex(A) });
      red.steps.forEach(s => steps.push({ ops: s.ops, m: '\\to ' + vtex(s.M) }));
      const U = red.M, diag = U.map((r, i) => r[i]);
      if (red.rank < n) steps.push({ t: tr('A row became zero, so the determinant is 0'), m: '\\det A = 0' });
      else steps.push({ t: tr('Triangular: multiply the diagonal') + (red.swaps ? ' (' + tr('{n} swap(s): sign', { n: red.swaps }) + ' ' + (red.swaps % 2 ? '−' : '+') + ')' : ''),
        m: '\\det A = ' + (red.swaps % 2 ? '-' : '') + diag.map(texP).join('\\cdot ') + ' = ' + tex(d) });
    }
    return { answer: '\\det A = ' + tex(d), steps, place: vtex(A) + ' = ' + tex(d) };
  }

  function opInv(A) {
    const n = A.length; if (n !== A[0].length) throw new Error(tr('Only square matrices have an inverse'));
    const d = detVal(A); const steps = [];
    steps.push({ t: tr('First the determinant'), m: '\\det A = ' + tex(d) });
    if (isZ(d)) { steps.push({ t: tr('The determinant is 0, so A has no inverse (it is singular)') }); return { answer: '\\det A = 0 \\Rightarrow \\nexists\\, A^{-1}', steps, place: '\\det A = 0 \\Rightarrow \\nexists\\, A^{-1}' }; }
    let Inv;
    if (n === 1) Inv = [[div(ONE, A[0][0])]];
    else if (n === 2) {
      const [[a, b], [c, e]] = A; Inv = [[div(e, d), div(neg(b), d)], [div(neg(c), d), div(a, d)]];
      steps.push({ t: tr('Swap the diagonal, change the sign of the other two entries and divide by the determinant'), m: 'A^{-1} = \\frac{1}{' + tex(d) + '}' + mtex([[e, neg(b)], [neg(c), a]]) });
    } else {
      const Aug = A.map((r, i) => r.concat(A.map((_, j) => (i === j ? ONE : ZERO))));
      steps.push({ t: tr('Gauss–Jordan: write (A | I) and reduce the left half to the identity'), m: mtex(Aug, n) });
      const red = reduce(Aug, 'rref', n);
      red.steps.forEach(s => steps.push({ ops: s.ops, m: '\\to ' + mtex(s.M, n) }));
      Inv = red.M.map(r => r.slice(n));
    }
    steps.push({ t: tr('Check: A · A⁻¹ = I'), m: mtex(A) + mtex(Inv) + ' = ' + mtex(mmul(A, Inv)) });
    return { answer: 'A^{-1} = ' + mtex(Inv), steps, place: 'A^{-1} = ' + mtex(Inv) };
  }

  function opT(A) {
    const T = A[0].map((_, j) => A.map(r => r[j]));
    return { answer: 'A^{T} = ' + mtex(T), steps: [{ t: tr('Rows become columns: entry (i, j) moves to (j, i)'), m: mtex(A) + '^{T} = ' + mtex(T) }], place: mtex(A) + '^{T} = ' + mtex(T) };
  }

  function opRank(A) {
    const red = reduce(A, 'ref'); const steps = [{ t: tr('Gaussian elimination to echelon form'), m: mtex(A) }];
    red.steps.forEach(s => steps.push({ ops: s.ops, m: '\\to ' + mtex(s.M) }));
    steps.push({ t: tr('Count the non-zero rows'), m: '\\operatorname{rank} A = ' + red.rank });
    return { answer: '\\operatorname{rank} A = ' + red.rank, steps, place: '\\operatorname{rank}' + mtex(A) + ' = ' + red.rank };
  }

  const VARS = ['x', 'y', 'z', 'w'];
  function opSolve(A) {
    const rows = A.length, cols = A[0].length; if (cols < 2) throw new Error(tr('Write the system as an augmented matrix: the last column holds the constants'));
    const n = cols - 1, vars = n <= 4 ? VARS.slice(0, n) : [...Array(n)].map((_, i) => 'x_' + (i + 1));
    const eqs = A.map(r => { const t = r.slice(0, n).map((c, j) => [c, vars[j]]).filter(([c]) => !isZ(c)); return (t.map(([c, v], q) => (c.n < 0n ? '-' : q ? '+' : '') + (isOne(Fr(babs(c.n), c.d)) ? '' : tex(Fr(babs(c.n), c.d))) + v).join(' ') || '0') + ' = ' + tex(r[n]); });
    const steps = [{ t: tr('The system and its augmented matrix'), m: '\\begin{cases}' + eqs.join(' \\\\ ') + '\\end{cases}\\qquad ' + mtex(A, n) }];
    const red = reduce(A, 'rref', n);
    red.steps.forEach(s => steps.push({ ops: s.ops, m: '\\to ' + mtex(s.M, n) }));
    const M = red.M, rA = red.rank, rAb = M.filter(r => r.some(x => !isZ(x))).length;
    let answer;
    if (rAb > rA) {
      steps.push({ t: tr('rank A = {a} but rank (A | b) = {b}: a row says 0 = (non-zero), so there is no solution', { a: rA, b: rAb }) });
      answer = '\\text{' + tr('no solution') + '}';
    } else if (rA === n) {
      const sol = vars.map((v, j) => v + ' = ' + tex(M[red.pivots.findIndex(p => p[1] === j)][n]));
      steps.push({ t: tr('rank A = rank (A | b) = number of unknowns: one solution'), m: sol.join(',\\quad ') });
      answer = sol.join(',\\ ');
    } else {
      const piv = red.pivots.map(p => p[1]), free = vars.map((_, j) => j).filter(j => !piv.includes(j));
      const PAR = ['\\lambda', '\\mu', '\\nu'];
      const par = {}; free.forEach((j, q) => { par[j] = PAR[q] || 't_' + (q + 1); });
      const exprs = vars.map((v, j) => {
        if (par[j]) return v + ' = ' + par[j];
        const row = M[red.pivots.find(p => p[1] === j)[0]];
        let s = isZ(row[n]) ? '' : tex(row[n]);
        free.forEach(f => { const c = neg(row[f]); if (isZ(c)) return; const ca = Fr(babs(c.n), c.d); s += (c.n < 0n ? ' - ' : s ? ' + ' : '') + (isOne(ca) ? '' : tex(ca)) + par[f]; });
        return v + ' = ' + (s || '0');
      });
      steps.push({ t: tr('rank A = rank (A | b) = {r} < {n} unknowns: infinitely many solutions ({f} free parameter(s))', { r: rA, n, f: free.length }), m: exprs.join(',\\quad ') });
      answer = exprs.join(',\\ ');
    }
    return { answer, steps, place: '\\begin{cases}' + eqs.join(' \\\\ ') + '\\end{cases}\\Rightarrow ' + answer };
  }

  function mmul(A, B) { return A.map(r => B[0].map((_, j) => r.reduce((s, x, k) => add(s, mul(x, B[k][j])), ZERO))); }
  function opMul(A, B) {
    if (A[0].length !== B.length) throw new Error(tr('A · B needs the columns of A to match the rows of B ({a} ≠ {b})', { a: A[0].length, b: B.length }));
    const P = mmul(A, B);
    const e00 = A[0].map((x, k) => texP(x) + '\\cdot ' + texP(B[k][0])).join(' + ');
    return { answer: 'AB = ' + mtex(P), steps: [
      { t: tr('Entry (i, j) = row i of A times column j of B'), m: '(AB)_{11} = ' + e00 + ' = ' + tex(P[0][0]) },
      { t: tr('All entries') + ' (' + A.length + ' × ' + A[0].length + ' · ' + B.length + ' × ' + B[0].length + ' → ' + P.length + ' × ' + P[0].length + ')', m: mtex(A) + mtex(B) + ' = ' + mtex(P) }], place: mtex(A) + mtex(B) + ' = ' + mtex(P) };
  }
  function opAdd(A, B, s) {
    if (A.length !== B.length || A[0].length !== B[0].length) throw new Error(tr('A and B must have the same size'));
    const S = A.map((r, i) => r.map((x, j) => (s < 0 ? sub : add)(x, B[i][j]))), op = s < 0 ? '-' : '+';
    return { answer: 'A ' + op + ' B = ' + mtex(S), steps: [{ t: tr('Entry by entry'), m: mtex(A) + op + mtex(B) + ' = ' + mtex(S) }], place: mtex(A) + op + mtex(B) + ' = ' + mtex(S) };
  }

  // ------------------------------------------------------------------ draggable floating panels
  function draggable(el, handle) {
    handle = handle || el.querySelector('header'); if (!handle || handle._drag) return; handle._drag = true;
    handle.classList.add('drag-handle'); handle.title = handle.title || tr('Drag to move');
    const clampIn = () => {
      const par = el.offsetParent; if (!par || el.hidden || !el.dataset.moved) return;
      const x = Math.max(0, Math.min(par.clientWidth - el.offsetWidth, el.offsetLeft)), y = Math.max(0, Math.min(par.clientHeight - el.offsetHeight, el.offsetTop));
      el.style.left = x + 'px'; el.style.top = y + 'px';
    };
    handle.addEventListener('pointerdown', e => {
      if (e.button !== 0 || e.target.closest('button, input, select, a, label')) return;
      const par = el.offsetParent; if (!par) return;
      e.preventDefault(); handle.setPointerCapture(e.pointerId);
      const sx = e.clientX, sy = e.clientY, ox = el.offsetLeft, oy = el.offsetTop;
      el.style.right = 'auto'; el.style.bottom = 'auto'; el.style.left = ox + 'px'; el.style.top = oy + 'px'; el.dataset.moved = '1';
      el.classList.add('dragging');
      const mv = ev => {
        // the whole panel stays inside the board
        const x = Math.max(0, Math.min(par.clientWidth - el.offsetWidth, ox + ev.clientX - sx));
        const y = Math.max(0, Math.min(par.clientHeight - el.offsetHeight, oy + ev.clientY - sy));
        el.style.left = x + 'px'; el.style.top = y + 'px';
      };
      const up = () => { handle.removeEventListener('pointermove', mv); handle.removeEventListener('pointerup', up); handle.removeEventListener('pointercancel', up); el.classList.remove('dragging'); };
      handle.addEventListener('pointermove', mv); handle.addEventListener('pointerup', up); handle.addEventListener('pointercancel', up);
    });
    // bring the clicked panel to the front
    el.addEventListener('pointerdown', () => { draggable.z = (draggable.z || 20) + 1; el.style.zIndex = draggable.z; });
    global.addEventListener('resize', clampIn);
    if (global.ResizeObserver) new ResizeObserver(clampIn).observe(el);
  }

  // ------------------------------------------------------------------ the panel
  function MatrixPanel(board, el) {
    const st = { A: { r: 3, c: 3, v: {} }, B: { r: 3, c: 3, v: {} }, useB: false };
    const out = $('.mx-out', el);
    const grid = name => {
      const m = st[name], box = $('.mx-' + name, el);
      const keep = {}; box.querySelectorAll('input').forEach(i => { keep[i.dataset.k] = i.value; });
      Object.assign(m.v, keep);
      box.innerHTML = '<div class="mx-head"><b>' + name + '</b><span class="mx-size"><button data-d="r-">−</button><span>' + m.r + '</span><button data-d="r+">+</button> × <button data-d="c-">−</button><span>' + m.c + '</span><button data-d="c+">+</button></span></div>' +
        '<div class="mx-grid" style="grid-template-columns:repeat(' + m.c + ', 1fr)">' +
        [...Array(m.r * m.c)].map((_, q) => { const k = Math.floor(q / m.c) + ',' + (q % m.c); return '<input data-k="' + k + '" inputmode="decimal" spellcheck="false" placeholder="0" value="' + esc(m.v[k] || '') + '">'; }).join('') + '</div>';
      box.querySelectorAll('[data-d]').forEach(b => b.onclick = () => { const [w, s] = [b.dataset.d[0], b.dataset.d[1]]; m[w] = Math.max(1, Math.min(4, m[w] + (s === '+' ? 1 : -1))); grid(name); });
      const ins = [...box.querySelectorAll('input')];
      ins.forEach((i, q) => {
        i.addEventListener('keydown', e => {
          e.stopPropagation();
          const mv = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: m.c, ArrowUp: -m.c }[e.key];
          if (mv && (e.key.length > 7 || i.selectionStart === (mv > 0 ? i.value.length : 0))) { const t = ins[q + mv]; if (t) { e.preventDefault(); t.focus(); t.select(); } }
          if (e.key === 'Enter') { e.preventDefault(); const t = ins[q + 1]; if (t) { t.focus(); t.select(); } else run(last || (m.r === m.c ? 'det' : 'rank')); }
        });
        i.addEventListener('input', () => { m.v[i.dataset.k] = i.value; i.classList.remove('bad'); });
      });
      syncOps();
    };
    const read = name => {
      const m = st[name], box = $('.mx-' + name, el), M = [];
      for (let i = 0; i < m.r; i++) { M.push([]); for (let j = 0; j < m.c; j++) { const inp = box.querySelector('[data-k="' + i + ',' + j + '"]'); try { M[i].push(parseEntry(inp.value)); } catch (e) { inp.classList.add('bad'); inp.focus(); throw e; } } }
      return M;
    };
    const syncOps = () => {
      const A = st.A, sq = A.r === A.c;
      el.querySelectorAll('[data-op]').forEach(b => {
        const o = b.dataset.op;
        b.disabled = ((o === 'det' || o === 'inv') && !sq) || (o === 'solve' && A.c < 2) || (['mul', 'add', 'sub'].includes(o) && !st.useB);
        b.hidden = ['mul', 'add', 'sub'].includes(o) && !st.useB;
      });
      $('.mx-B', el).hidden = !st.useB; $('.mx-useb', el).textContent = st.useB ? tr('− remove B') : tr('+ second matrix B');
    };
    let last = null, result = null;
    const OPS = { det: A => opDet(A), inv: A => opInv(A), T: A => opT(A), rank: A => opRank(A), solve: A => opSolve(A), mul: (A, B) => opMul(A, B), add: (A, B) => opAdd(A, B, 1), sub: (A, B) => opAdd(A, B, -1) };
    function run(op) {
      last = op; let res;
      try { const A = read('A'), B = st.useB ? read('B') : null; res = OPS[op](A, B); }
      catch (e) { out.innerHTML = '<p class="err">' + esc(e.message) + '</p>'; result = null; return; }
      result = res;
      let html = '<div class="sys-answer">' + K(I18N.tex(res.answer)) + '</div><ol class="sys-steps">';
      res.steps.forEach(s => { html += '<li>' + (s.t ? '<div class="t">' + esc(s.t) + '</div>' : '') + (s.ops && s.ops.length ? '<div class="ops">' + K(s.ops.join(',\\quad ')) + '</div>' : '') + (s.m ? '<div class="m">' + K(I18N.tex(s.m), { displayMode: true }) + '</div>' : '') + '</li>'; });
      out.innerHTML = html + '</ol>';
      out.querySelectorAll('li').forEach((li, i) => { li.style.animationDelay = (i * 0.25) + 's'; });
      $('.mx-place', el).disabled = false;
    }
    const PRESETS = [[2, 2], [3, 3], [4, 4], [2, 3], [3, 2], [3, 4]];
    $('.mx-presets', el).innerHTML = PRESETS.map(([r, c]) => '<button data-p="' + r + ',' + c + '">' + r + '×' + c + '</button>').join('');
    $('.mx-presets', el).querySelectorAll('button').forEach(b => b.onclick = () => { const [r, c] = b.dataset.p.split(',').map(Number); st.A.r = r; st.A.c = c; grid('A'); out.innerHTML = ''; const f = $('.mx-A input', el); f && f.focus(); });
    el.querySelectorAll('[data-op]').forEach(b => b.onclick = () => run(b.dataset.op));
    $('.mx-useb', el).onclick = () => { st.useB = !st.useB; if (st.useB) grid('B'); syncOps(); };
    $('.mx-clear', el).onclick = () => { st.A.v = {}; st.B.v = {}; $('.mx-A', el).querySelectorAll('input').forEach(i => { i.value = ''; }); $('.mx-B', el).querySelectorAll('input').forEach(i => { i.value = ''; }); out.innerHTML = ''; result = null; $('.mx-place', el).disabled = true; };
    $('.mx-place', el).onclick = () => { if (!result) return; board.startPlacing({ tex: result.place }); close(); };
    $('.mx-close', el).onclick = () => close();
    const close = () => { el.hidden = true; };
    grid('A'); grid('B'); syncOps(); $('.mx-place', el).disabled = true;
    draggable(el);
    return {
      open() { el.hidden = false; const f = $('.mx-A input', el); f && f.focus(); },
      toggle() { if (el.hidden) this.open(); else close(); },
      // for tests
      _ops: { opDet, opInv, opT, opRank, opSolve, opMul, opAdd, parseEntry }
    };
  }

  // the panel's markup, for pages generated before the panel was in index.html
  const PANEL_HTML = '<section id="mat-panel" class="float-panel sys-panel mat-panel" hidden>\n        <header><b>Matrices</b><button class="mx-close" title="Close">×</button></header>\n        <div class="mx-presets" data-no-i18n></div>\n        <div class="mx-mats"><div class="mx-A"></div><div class="mx-B" hidden></div></div>\n        <div class="mx-tools"><button class="mx-useb link">+ second matrix B</button><button class="mx-clear link">Clear</button></div>\n        <div class="sys-actions mx-ops">\n          <button class="act solve" data-op="det" title="Determinant, step by step">det A</button>\n          <button class="act" data-op="inv" title="Inverse matrix">A⁻¹</button>\n          <button class="act" data-op="T" title="Transpose">Aᵀ</button>\n          <button class="act" data-op="rank" title="Rank by Gaussian elimination">rank</button>\n          <button class="act" data-op="solve" title="Read A as the augmented matrix of a system (last column = constants) and solve it">Solve system</button>\n          <button class="act" data-op="mul" title="Matrix product">A · B</button>\n          <button class="act" data-op="add">A + B</button>\n          <button class="act" data-op="sub">A − B</button>\n        </div>\n        <div class="sys-out mx-out"></div>\n        <div class="sys-actions"><button class="mx-place act">＋ Place on board</button></div>\n      </section>';
  function ensureMarkup() {
    if (!document.getElementById('mat-panel')) { const host = document.getElementById('sys-panel'); if (host) host.insertAdjacentHTML('afterend', PANEL_HTML); }
    if (!document.getElementById('eq-matrix')) { const sb = document.getElementById('eq-system'); if (sb) sb.insertAdjacentHTML('afterend', '<button id="eq-matrix" class="act" title="Matrices up to 4 × 4: determinant, inverse, rank, products and systems, step by step">▦ Matrices</button>'); }
  }

  global.BoardMatrix = { ensureMarkup, MatrixPanel, draggable, tex, parseEntry, ops: { opDet, opInv, opT, opRank, opSolve, opMul, opAdd } };
})(typeof window !== 'undefined' ? window : globalThis);
