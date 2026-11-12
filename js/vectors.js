/* VecCore — points, vectors and named results for the smart blackboard.
   Every typed line on the board is part of one worksheet, read from top to bottom (in the order the lines were placed):

     P1 = (1, 1, 1)            a point (a name that starts with a capital letter); also P1(1, 1, 1)
     u = (2, -1)   v = [1, 3]  vectors (lower-case names); 2-D or 3-D
     P1P2                      the vector from P1 to P2 (= P2 − P1), unless P1P2 was given its own definition
     P1P2 = P2 - P1            any name can be defined; later lines use it
     a = 3   k := 2            numbers too (:= always (re)defines, even x or a name used before)
     u·v  u*v  dot(u, v)       dot product          u×v  cross(u, v)   cross product
     |u|  norm(u)  |AB|        length               det(u, v, w)       determinant (also det(u, v) in 2-D)
     angle(u, v)  unit(u)  proj(u, v)  dist(A, B)  mid(A, B)  area(A, B, C)  volume(A, B, C, D)

   A line with an unknown is solved for it:  |det(P1P2, P1P3, P1P4)|/6 = 1  ⇒  a ∈ {3, 15}, and each solution can be
   put on the board as a new line (a = 3) that the lines below then use. A defined name that is used again with "="
   (V = 1 after V = …) is an equation, not a new definition.
   Scalar lines that only use defined numbers are handed to MathCore with the numbers substituted, so plotting,
   solving and calculus keep working: after  a = 2,  "y = a x + 1" plots y = 2x + 1. */
(function (global) {
  'use strict';
  const tr = (s, v) => (global.tr ? global.tr(s, v) : (v ? s.replace(/\{(\w+)\}/g, (m, k) => (v[k] !== undefined ? v[k] : m)) : s));

  const SCALAR = { sqrt: Math.sqrt, sin: Math.sin, cos: Math.cos, tan: Math.tan, asin: Math.asin, acos: Math.acos, atan: Math.atan, ln: Math.log, log: Math.log10, exp: Math.exp };
  const VECF = ['volume', 'cross', 'angle', 'norm', 'unit', 'proj', 'dist', 'area', 'det', 'dot', 'mid', 'vol', 'vec', 'abs'];
  const WORDS = VECF.concat(Object.keys(SCALAR)).sort((a, b) => b.length - a.length);
  const GREEK = { alpha: '\\alpha', beta: '\\beta', gamma: '\\gamma', delta: '\\delta', theta: '\\theta', lambda: '\\lambda', mu: '\\mu', phi: '\\varphi', omega: '\\omega', sigma: '\\sigma', rho: '\\rho', tau: '\\tau', pi: '\\pi', 'π': '\\pi', 'θ': '\\theta', 'α': '\\alpha', 'β': '\\beta', 'λ': '\\lambda' };
  const GREEKW = Object.keys(GREEK).filter(w => w.length > 1).sort((a, b) => b.length - a.length);
  // MathCore's calculus words and operators: such lines stay MathCore's (with defined numbers substituted)
  const CALC_RE = /d\^?2?\s*\/\s*d[a-zθ]|\b(int|integral|lim|diff|derivative|tangent|mod)\s*\(|\bmod\b|∫|%|!/;
  const PLOT_VARS = ['x', 'y'];

  class NotMine extends Error {}

  // ================================================================ tokenizer
  function normalize(src) {
    return String(src).replace(/[−–]/g, '-').replace(/[•∙⋅]/g, '·').replace(/√/g, 'sqrt').replace(/²/g, '^2').replace(/³/g, '^3')
      .replace(/≤/g, '<=').replace(/≥/g, '>=').replace(/÷/g, '/').replace(/[⃗]/g, '').replace(/\\(?:vec|overrightarrow)\s*\{([^{}]*)\}/g, '$1').replace(/->|→|⃗/g, '').replace(/\\cdot/g, '·').replace(/\\times/g, '×');
  }
  const NAME_TAIL = /^(?:_\{([A-Za-z0-9]+)\}|_([A-Za-z0-9])|(\d+))?(['′]*)/;
  function tokenize(src) {
    const s = normalize(src), out = []; let i = 0, sp = false;
    while (i < s.length) {
      const c = s[i];
      if (c === ' ' || c === '\t') { sp = true; i++; continue; }
      const tok = t => { t.sp = sp; sp = false; out.push(t); };
      let m;
      if ((m = s.slice(i).match(/^(\d+\.?\d*|\.\d+)/))) { tok({ t: 'num', v: parseFloat(m[1]), raw: m[1] }); i += m[1].length; continue; }
      if (s.startsWith(':=', i)) { tok({ t: 'rel', v: ':=' }); i += 2; continue; }
      if (s.startsWith('<=', i) || s.startsWith('>=', i)) { tok({ t: 'rel', v: s.substr(i, 2) }); i += 2; continue; }
      if ('=<>'.includes(c)) { tok({ t: 'rel', v: c }); i++; continue; }
      if (/[A-Za-zπθαβλ]/.test(c)) {
        const rest = s.slice(i);
        const cf = rest.match(/^(conj|arg|cis|Re|Im|re|im)(?=\s*\()/);
        if (cf) { tok({ t: 'func', v: cf[1].toLowerCase() }); i += cf[1].length; continue; }
        const w = WORDS.find(fn => rest.startsWith(fn));
        if (w) { tok({ t: 'func', v: w === 'vol' ? 'volume' : w }); i += w.length; continue; }
        const g = GREEKW.find(fn => rest.startsWith(fn));
        let base = g || c; i += base.length;
        if (base === 'π') base = 'pi'; if (base === 'θ') base = 'theta'; if (base === 'α') base = 'alpha'; if (base === 'β') base = 'beta'; if (base === 'λ') base = 'lambda';
        const t = s.slice(i).match(NAME_TAIL); const sub = t[1] || t[2] || t[3] || '';
        i += t[0].length;
        tok({ t: 'id', v: base + sub + (t[4] || '').replace(/′/g, "'"), base, sub, primes: (t[4] || '').length });
        continue;
      }
      if ('+-*/^()[],|°·×'.includes(c)) { tok({ t: c }); i++; continue; }
      throw new Error(tr('Unexpected symbol "{c}"', { c }));
    }
    return out;
  }

  // ================================================================ parser
  function Parser(tk) { this.tk = tk; this.p = 0; this.inAbs = 0; }
  Parser.prototype = {
    peek() { return this.tk[this.p]; },
    eat(t) { const k = this.tk[this.p]; if (k && k.t === t) { this.p++; return k; } return null; },
    expect(t) { const k = this.tk[this.p++]; if (!k || k.t !== t) throw new Error(tr('Expected {t}', { t })); return k; },
    expr() {
      let n = this.term();
      for (;;) { const k = this.peek(); if (k && (k.t === '+' || k.t === '-')) { this.p++; n = { k: 'bin', op: k.t, a: n, b: this.term() }; } else return n; }
    },
    startsPrimary(k) { return k && (k.t === 'num' || k.t === 'id' || k.t === 'func' || k.t === '(' || k.t === '[' || (k.t === '|' && !this.inAbs)); },
    term() {
      let n = this.unary();
      for (;;) {
        const k = this.peek();
        if (k && '*/·×'.includes(k.t) && k.t.length === 1) { this.p++; n = { k: 'bin', op: k.t, a: n, b: this.unary() }; }
        else if (this.startsPrimary(k)) n = { k: 'bin', op: 'imp', a: n, b: this.power() };
        else return n;
      }
    },
    unary() { if (this.eat('-')) return { k: 'neg', a: this.unary() }; if (this.eat('+')) return this.unary(); return this.power(); },
    power() { const b = this.postfix(); if (this.eat('^')) return { k: 'pow', a: b, b: this.unary() }; return b; },
    postfix() { let n = this.primary(); while (this.eat('°')) n = { k: 'deg', a: n }; return n; },
    list(close) { const items = [this.expr()]; while (this.eat(',')) items.push(this.expr()); this.expect(close); return items; },
    primary() {
      const k = this.tk[this.p++];
      if (!k) throw new Error(tr('Incomplete expression'));
      if (k.t === 'num') return { k: 'num', v: k.v, raw: k.raw };
      if (k.t === 'id') {   // a run of names written together (P1P2, AB, ax): resolved when evaluating
        const list = [k.v];
        while (this.peek() && this.peek().t === 'id' && !this.peek().sp) list.push(this.tk[this.p++].v);
        return { k: 'names', list };
      }
      if (k.t === '(') { const items = this.list(')'); return items.length > 1 ? { k: 'tuple', items } : { k: 'grp', a: items[0] }; }
      if (k.t === '[') return { k: 'tuple', items: this.list(']') };
      if (k.t === '|') { this.inAbs++; const e = this.expr(); this.inAbs--; this.expect('|'); return { k: 'abs', a: e }; }
      if (k.t === 'func') {
        if (this.eat('(')) return { k: 'call', f: k.v, args: this.list(')') };
        if (SCALAR[k.v]) return { k: 'call', f: k.v, args: [this.power()] };   // sin x
        throw new Error(tr('Write {f}( … )', { f: k.v }));
      }
      throw new Error(tr('Unexpected "{x}"', { x: k.v || k.t }));
    }
  };
  function parseExpr(tk) {
    const P = new Parser(tk), e = P.expr();
    if (P.p < tk.length) throw new Error(tr('Unexpected "{x}"', { x: tk[P.p].v || tk[P.p].t }));
    return e;
  }
  /** "A(1,2,3)" (point notation) → "A = (1,2,3)" */
  function pointNotation(src) {
    const m = String(src).match(/^\s*([A-Z](?:_\{?[A-Za-z0-9]+\}?|\d+)?['′]*)\s*\(([^()]*,[^()]*)\)\s*$/);
    return m ? m[1] + ' = (' + m[2] + ')' : src;
  }
  function parse(src) {
    const tk = tokenize(pointNotation(src)), sides = [], rels = []; let cur = [], depth = 0;
    tk.forEach(t => {
      if (t.t === '(' || t.t === '[') depth++; if (t.t === ')' || t.t === ']') depth--;
      if (t.t === 'rel' && depth === 0) { sides.push(cur); rels.push(t.v); cur = []; } else cur.push(t);
    });
    sides.push(cur);
    if (rels.includes(':=') && (rels.length !== 1 || !sides[0].length)) throw new Error(tr('Write name := value'));
    return { sides: sides.map(s => (s.length ? parseExpr(s) : null)), rels };
  }

  // ================================================================ values
  const NUM = v => ({ t: 'num', v }), VEC = (c, pt, from) => ({ t: 'vec', c, pt: !!pt, from: from || null });
  const isVec = x => x && x.t === 'vec';
  // complex numbers: { t: 'cx', re, im } (a result with no imaginary part becomes a plain number again)
  const CX = (re, im) => (Math.abs(im) < 1e-12 * Math.max(1, Math.abs(re)) ? NUM(re) : { t: 'cx', re, im });
  const isCx = x => x && x.t === 'cx';
  const cre = x => (isCx(x) ? x.re : x.v), cim = x => (isCx(x) ? x.im : 0);
  const C = {
    add: (a, b, s = 1) => CX(cre(a) + s * cre(b), cim(a) + s * cim(b)),
    mul: (a, b) => CX(cre(a) * cre(b) - cim(a) * cim(b), cre(a) * cim(b) + cim(a) * cre(b)),
    div: (a, b) => { const d = cre(b) ** 2 + cim(b) ** 2; return CX((cre(a) * cre(b) + cim(a) * cim(b)) / d, (cim(a) * cre(b) - cre(a) * cim(b)) / d); },
    abs: a => Math.hypot(cre(a), cim(a)), arg: a => Math.atan2(cim(a), cre(a)),
    exp: a => { const r = Math.exp(cre(a)); return CX(r * Math.cos(cim(a)), r * Math.sin(cim(a))); },
    log: a => CX(Math.log(C.abs(a)), C.arg(a)),
    pow(a, b) {
      if (!isCx(b) && Number.isInteger(b.v) && Math.abs(b.v) <= 64) {   // exact for whole powers
        let r = NUM(1), base = b.v < 0 ? C.div(NUM(1), a) : a;
        for (let k = 0; k < Math.abs(b.v); k++) r = C.mul(r, base); return r;
      }
      if (C.abs(a) === 0) return NUM(0);
      return C.exp(C.mul(b, C.log(a)));
    }
  };
  const IUNIT = { t: 'cx', re: 0, im: 1 };
  function need(x, what) {
    if (what === 'num' && isVec(x)) throw new Error(tr('A number was expected here, not a vector'));
    if (what === 'vec' && isCx(x)) throw new Error(tr('A vector was expected here, not a complex number'));
    if (what === 'vec' && !isVec(x)) throw new Error(tr('A vector was expected here'));
    return x;
  }
  const sameDim = (a, b) => { if (a.c.length !== b.c.length) throw new Error(tr('The vectors have different dimensions ({a} and {b})', { a: a.c.length, b: b.c.length })); };
  const vdot = (a, b) => { sameDim(a, b); return a.c.reduce((s, x, i) => s + x * b.c[i], 0); };
  const vnorm = a => Math.hypot(...a.c);
  function vcross(a, b) {
    sameDim(a, b);
    if (a.c.length === 2) return NUM(a.c[0] * b.c[1] - a.c[1] * b.c[0]);
    if (a.c.length !== 3) throw new Error(tr('The cross product needs 3-D vectors'));
    const [x1, y1, z1] = a.c, [x2, y2, z2] = b.c;
    return VEC([y1 * z2 - z1 * y2, z1 * x2 - x1 * z2, x1 * y2 - y1 * x2]);
  }
  function det(rows) {
    const n = rows.length; if (rows.some(r => r.length !== n)) throw new Error(tr('det needs {n} vectors with {n} components', { n }));
    if (n === 1) return rows[0][0];
    if (n === 2) return rows[0][0] * rows[1][1] - rows[0][1] * rows[1][0];
    let s = 0; for (let j = 0; j < n; j++) s += (j % 2 ? -1 : 1) * rows[0][j] * det(rows.slice(1).map(r => r.filter((_, k) => k !== j)));
    return s;
  }

  // ================================================================ scope (the worksheet's definitions)
  const CONST = { pi: Math.PI, e: Math.E };
  const isPointName = n => /^[A-Z]/.test(n);
  /** the single name a statement's left side spells (P1, u, P1P2, AB, a), or null */
  function lhsName(n) { return n && n.k === 'names' ? n.list.join('') : null; }
  function definitionOf(st, defs) {
    if (st.rels.length !== 1 || !st.sides[0] || !st.sides[1]) return null;
    const name = lhsName(st.sides[0]); if (!name) return null;
    const op = st.rels[0];
    if (op === ':=') return { name, rhs: st.sides[1], op };
    if (op !== '=' || defs.has(name) || name in CONST && name !== 'e') return null;
    const rhsNames = namesIn(st.sides[1]);
    if (rhsNames.has(name)) return null;   // a = 2a − 3 is an equation
    if (PLOT_VARS.includes(name)) {
      // x = 3 + a, y = x·b are definitions; y = 2x + 1 (x not defined) is a curve to plot, and x = 5, y = 3 are lines
      const other = name === 'x' ? 'y' : 'x';
      if (rhsNames.has(other) && !defs.has(other)) return null;
      if (![...rhsNames].some(n => !(n in CONST))) return null;
    }
    if (st.sides[0].list.length > 1 && st.sides[0].list.length !== 2) return null;   // "ab = 6": a product, not a name
    if (st.sides[0].list.length === 2 && !st.sides[0].list.every(isPointName)) return null;
    return { name, rhs: st.sides[1], op };
  }
  function namesIn(n, set = new Set()) {
    if (!n || typeof n !== 'object') return set;
    if (n.k === 'names') { set.add(n.list.join('')); n.list.forEach(x => set.add(x)); }
    ['a', 'b'].forEach(k => namesIn(n[k], set)); (n.items || n.args || []).forEach(x => namesIn(x, set));
    return set;
  }
  const scopeCache = new Map();
  /** definitions made by these lines (read in order: the first "name = …" defines, a later one is an equation; := redefines).
      lineDefs[i] = the name line i defines. */
  function scope(lines) {
    const key = lines.join('\n');
    if (scopeCache.has(key)) return scopeCache.get(key);
    const defs = new Map(), lineDefs = [];
    lines.forEach((src, i) => {
      lineDefs.push(null);
      if (CALC_RE.test(src)) return;
      let st; try { st = parse(src); } catch (e) { return; }
      const d = definitionOf(st, defs); if (d) { defs.set(d.name, { ast: d.rhs, src, line: i }); lineDefs[i] = d.name; }
    });
    const sc = { defs, lineDefs };
    if (scopeCache.size > 200) scopeCache.clear();
    scopeCache.set(key, sc);
    return sc;
  }

  // ================================================================ evaluation
  /** ctx: { defs, free: {name: number}, busy: Set, freeSeen: Set, sawVec, used: Set } */
  function lookup(name, ctx) {
    if (ctx.free && name in ctx.free) { const f = ctx.free[name]; return typeof f === 'object' ? CX(f.re, f.im) : NUM(f); }
    if (ctx.defs.has(name)) {
      if (ctx.busy.has(name)) throw new Error(tr('{n} is defined in terms of itself', { n: name }));
      ctx.busy.add(name); ctx.used.add(name);
      try { const v = ev(ctx.defs.get(name).ast, ctx); return isVec(v) ? VEC(v.c, v.pt || (isPointName(name) && name.length <= 4 && !/[A-Z].*[A-Z]/.test(name)), v.from) : v; }
      finally { ctx.busy.delete(name); }
    }
    if (name in CONST) return NUM(CONST[name]);
    if (name === 'i') { ctx.sawCx = true; return IUNIT; }   // the imaginary unit (unless i was defined)
    ctx.freeSeen.add(name);
    if (ctx.probe) return NUM(ctx.probe(name));
    throw new NotMine(name);
  }
  /** how a run of names (P1P2, AB, ax) is meant: a defined name, the vector between two points, or a product */
  function resolveNames(list, ctx) {
    const whole = list.join('');
    if (list.length === 1 || ctx.defs.has(whole)) return { kind: 'name', name: whole };
    if (list.length === 2 && list.every(n => ctx.defs.has(n) && isPointName(n))) return { kind: 'pair' };
    return { kind: 'product' };
  }
  function ev(n, ctx) {
    switch (n.k) {
      case 'num': return NUM(n.v);
      case 'grp': return ev(n.a, ctx);
      case 'names': {
        const r = resolveNames(n.list, ctx);
        if (r.kind === 'name') { const v = lookup(r.name, ctx); if (isVec(v)) ctx.sawVec = true; return v; }
        if (r.kind === 'pair') {
          const A = need(lookup(n.list[0], ctx), 'vec'), B = need(lookup(n.list[1], ctx), 'vec'); sameDim(A, B); ctx.sawVec = true;
          return VEC(B.c.map((x, i) => x - A.c[i]), false, A.c);
        }
        return n.list.map(x => lookup(x, ctx)).reduce((a, b) => mulv(a, b, 'imp', ctx));
      }
      case 'tuple': { ctx.sawVec = true; return VEC(n.items.map(x => need(ev(x, ctx), 'num').v), false); }
      case 'abs': { const v = ev(n.a, ctx); return isVec(v) ? NUM(vnorm(v)) : NUM(C.abs(v)); }
      case 'neg': { const v = ev(n.a, ctx); return isVec(v) ? VEC(v.c.map(x => -x), false) : CX(-cre(v), -cim(v)); }
      case 'deg': return NUM(need(ev(n.a, ctx), 'num').v * Math.PI / 180);
      case 'pow': {
        const a = ev(n.a, ctx), b = need(ev(n.b, ctx), 'num');
        if (isVec(a)) { if (b.v === 2) return NUM(vdot(a, a)); throw new Error(tr('A vector can only be squared (u^2 = u·u)')); }
        if (isCx(a) || isCx(b) || (a.v < 0 && !Number.isInteger(b.v))) { ctx.sawCx = true; return C.pow(a, b); }
        return NUM(Math.pow(a.v, b.v));
      }
      case 'bin': {
        const a = ev(n.a, ctx), b = ev(n.b, ctx);
        if (n.op === '+' || n.op === '-') {
          const s = n.op === '+' ? 1 : -1;
          if (!isVec(a) && !isVec(b)) return isCx(a) || isCx(b) ? C.add(a, b, s) : NUM(a.v + s * b.v);
          if (!isVec(a) || !isVec(b)) throw new Error(tr('A number and a vector cannot be added'));
          sameDim(a, b);
          const c = a.c.map((x, i) => x + s * b.c[i]);
          // point − point = vector; point ± vector = point
          return VEC(c, a.pt && !b.pt, n.op === '-' && a.pt && b.pt ? b.c : null);
        }
        if (n.op === '/') { need(b, 'num'); if (isCx(b)) { if (isVec(a)) throw new Error(tr('A vector cannot be divided by a complex number')); return C.div(a, b); } return isVec(a) ? VEC(a.c.map(x => x / b.v), false) : isCx(a) ? C.div(a, b) : NUM(a.v / b.v); }
        if (n.op === '×') { if (isVec(a) && isVec(b)) return vcross(a, b); }
        return mulv(a, b, n.op, ctx);
      }
      case 'call': return call(n.f, n.args.map(x => ev(x, ctx)), ctx);
    }
    throw new Error('?');
  }
  function mulv(a, b, op, ctx) {
    if (isVec(a) && isVec(b)) { if (op === '×') return vcross(a, b); return NUM(vdot(a, b)); }   // u·v, u*v, u v
    if ((isVec(a) && isCx(b)) || (isCx(a) && isVec(b))) throw new Error(tr('Vectors and complex numbers cannot be multiplied'));
    if (isVec(a)) return VEC(a.c.map(x => x * b.v), false);
    if (isVec(b)) return VEC(b.c.map(x => x * a.v), false);
    if (isCx(a) || isCx(b)) return C.mul(a, b);
    return NUM(a.v * b.v);
  }
  function call(f, A, ctx) {
    const argc = k => { if (A.length !== k) throw new Error(tr('{f} takes {n} arguments', { f, n: k })); };
    const z = A[0];
    if (['conj', 're', 'im', 'arg', 'cis'].includes(f)) {
      argc(1); need(z, 'num'); ctx && (ctx.sawCx = true);
      if (f === 'conj') return CX(cre(z), -cim(z));
      if (f === 're') return NUM(cre(z)); if (f === 'im') return NUM(cim(z));
      if (f === 'arg') return { t: 'num', v: C.arg(z), angle: true };
      return C.exp(C.mul(IUNIT, z));   // cis θ = cos θ + i sin θ
    }
    if (SCALAR[f] && isCx(z)) {   // functions of a complex number
      argc(1);
      if (f === 'exp') return C.exp(z); if (f === 'ln') return C.log(z); if (f === 'sqrt') return C.pow(z, NUM(0.5));
      if (f === 'sin' || f === 'cos') { const e1 = C.exp(C.mul(IUNIT, z)), e2 = C.exp(C.mul(CX(0, -1), z)); return f === 'cos' ? C.mul(C.add(e1, e2), NUM(0.5)) : C.div(C.add(e1, e2, -1), CX(0, 2)); }
      throw new Error(tr('{f} of a complex number is not supported', { f }));
    }
    if (f === 'sqrt' && z && !isVec(z) && z.v < 0) { ctx && (ctx.sawCx = true); return CX(0, Math.sqrt(-z.v)); }   // √−4 = 2i
    if (f === 'ln' && z && !isVec(z) && z.v < 0) { ctx && (ctx.sawCx = true); return C.log(z); }
    if (SCALAR[f]) { argc(1); return NUM(SCALAR[f](need(A[0], 'num').v)); }
    switch (f) {
      case 'abs': argc(1); return isVec(A[0]) ? NUM(vnorm(A[0])) : NUM(C.abs(A[0]));
      case 'norm': argc(1); return NUM(vnorm(need(A[0], 'vec')));
      case 'dot': argc(2); return NUM(vdot(need(A[0], 'vec'), need(A[1], 'vec')));
      case 'cross': argc(2); return vcross(need(A[0], 'vec'), need(A[1], 'vec'));
      case 'unit': { argc(1); const v = need(A[0], 'vec'), L = vnorm(v); return VEC(v.c.map(x => x / L), false); }
      case 'angle': { argc(2); const u = need(A[0], 'vec'), v = need(A[1], 'vec'); const c = vdot(u, v) / (vnorm(u) * vnorm(v)); return { t: 'num', v: Math.acos(Math.max(-1, Math.min(1, c))), angle: true }; }
      case 'proj': { argc(2); const u = need(A[0], 'vec'), v = need(A[1], 'vec'); const k = vdot(u, v) / vdot(v, v); return VEC(v.c.map(x => x * k), false); }
      case 'dist': { argc(2); const P = need(A[0], 'vec'), Q = need(A[1], 'vec'); sameDim(P, Q); return NUM(Math.hypot(...P.c.map((x, i) => x - Q.c[i]))); }
      case 'mid': { argc(2); const P = need(A[0], 'vec'), Q = need(A[1], 'vec'); sameDim(P, Q); return VEC(P.c.map((x, i) => (x + Q.c[i]) / 2), true); }
      case 'vec': { argc(2); const P = need(A[0], 'vec'), Q = need(A[1], 'vec'); sameDim(P, Q); return VEC(Q.c.map((x, i) => x - P.c[i]), false, P.c); }
      case 'det': {
        const V = A.map(x => need(x, 'vec'));
        return NUM(det(V.map(v => v.c)));
      }
      case 'area': {
        argc(3); const [P, Q, R] = A.map(x => need(x, 'vec')); sameDim(P, Q); sameDim(P, R);
        const u = VEC(Q.c.map((x, i) => x - P.c[i])), v = VEC(R.c.map((x, i) => x - P.c[i]));
        if (u.c.length === 2) return NUM(Math.abs(u.c[0] * v.c[1] - u.c[1] * v.c[0]) / 2);
        return NUM(vnorm(vcross(u, v)) / 2);
      }
      case 'volume': {
        argc(4); const [P, ...rest] = A.map(x => need(x, 'vec')); rest.forEach(Q => sameDim(P, Q));
        if (P.c.length !== 3) throw new Error(tr('volume needs four 3-D points'));
        return NUM(Math.abs(det(rest.map(Q => Q.c.map((x, i) => x - P.c[i])))) / 6);
      }
    }
    throw new Error(tr('Unknown function {f}', { f }));
  }

  // ================================================================ number formatting (exact when it can)
  function frac(v, maxDen = 60) {
    for (let d = 1; d <= maxDen; d++) { const n = Math.round(v * d); if (Math.abs(n / d - v) < 1e-9 * Math.max(1, Math.abs(v))) return [n, d]; }
    return null;
  }
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  function sqrtParts(n) { let k = 1, m = n; for (let f = 2; f * f <= m; f++) while (m % (f * f) === 0) { m /= f * f; k *= f; } return [k, m]; }
  /** {tex, ascii, exact} for a number: integers, fractions, k√m / d, multiples of π, else a decimal */
  function numForm(v) {
    if (!isFinite(v)) return { tex: isNaN(v) ? '\\text{undefined}' : (v > 0 ? '\\infty' : '-\\infty'), ascii: String(v), exact: true };
    if (Math.abs(v) < 1e-12) v = 0;
    const sg = v < 0 ? '-' : '', a = Math.abs(v);
    let f = frac(a, 60);
    if (f) { const [n, d] = f; return d === 1 ? { tex: sg + n, ascii: sg + n, exact: true } : { tex: sg + '\\tfrac{' + n + '}{' + d + '}', ascii: sg + n + '/' + d, exact: true }; }
    for (let q = 1; q <= 12; q++) {   // a = √p / q
      const p = Math.round(a * a * q * q);
      if (p > 0 && p < 1e6 && Math.abs(Math.sqrt(p) / q - a) < 1e-9 * Math.max(1, a)) {
        const [k, m] = sqrtParts(p); if (m === 1) continue;
        const g = gcd(k, q), kk = k / g, qq = q / g;
        const num = (kk === 1 ? '' : kk) + '\\sqrt{' + m + '}', numA = (kk === 1 ? '' : kk + '*') + 'sqrt(' + m + ')';
        return { tex: sg + (qq === 1 ? num : '\\tfrac{' + num + '}{' + qq + '}'), ascii: sg + (qq === 1 ? numA : numA + '/' + qq), exact: true };
      }
    }
    f = frac(a / Math.PI, 12);
    if (f) { const [n, d] = f; const t = (n === 1 ? '' : n) + '\\pi'; return { tex: sg + (d === 1 ? t : '\\tfrac{' + t + '}{' + d + '}'), ascii: sg + (n === 1 ? '' : n + '*') + 'pi' + (d === 1 ? '' : '/' + d), exact: true }; }
    const plain = (+v.toPrecision(6)).toString();
    return { tex: plain, ascii: plain, exact: false };
  }
  function numTex(v, approx = true) {
    const f = numForm(v);
    if (!approx || !f.exact || /^-?\d+$/.test(f.tex)) return f.tex;
    return f.tex + ' \\approx ' + (+v.toPrecision(5));
  }
  const angleTex = r => { const d = r * 180 / Math.PI, f = frac(d, 12); return (f ? (f[1] === 1 ? f[0] : '\\tfrac{' + f[0] + '}{' + f[1] + '}') : (+d.toPrecision(5))) + '^\\circ'; };
  const vecTex = c => '\\left(' + c.map(x => numForm(x).tex).join(',\\ ') + '\\right)';
  /** a + bi, exactly when it can (½ + (√3/2)i) */
  function cxForm(re, im) {
    const R = numForm(re), I = numForm(Math.abs(im)), neg = im < 0;
    const iT = (I.tex === '1' ? '' : /[+-]/.test(I.tex.replace(/^-/, '')) || /frac/.test(I.tex) ? I.tex : I.tex) + 'i';
    const iA = I.ascii === '1' ? 'i' : /^[\d.]+$/.test(I.ascii) ? I.ascii + 'i' : '(' + I.ascii + ')i';
    if (Math.abs(re) < 1e-12) return { tex: (neg ? '-' : '') + iT, ascii: (neg ? '-' : '') + iA, exact: I.exact };
    return { tex: R.tex + (neg ? ' - ' : ' + ') + iT, ascii: R.ascii + (neg ? ' - ' : ' + ') + iA, exact: R.exact && I.exact };
  }
  const cxPolar = z => '\\quad\\textcolor{#9aa7a0}{\\small r = ' + numForm(C.abs(z)).tex + ',\\ \\theta = ' + angleTex(C.arg(z)) + '}';
  function cxTex(z) {
    const f = cxForm(z.re, z.im), polar = cxPolar(z);
    return (f.exact ? f.tex : (+z.re.toPrecision(5)) + (z.im < 0 ? ' - ' : ' + ') + (+Math.abs(z.im).toPrecision(5)) + 'i') + polar;
  }
  function valueTex(x) {
    if (isVec(x)) return vecTex(x.c);
    if (isCx(x)) return cxTex(x);
    if (x.angle) return angleTex(x.v);
    return numTex(x.v);
  }

  // ---------- results with unknowns, worked out symbolically when they are polynomials (x = 3 + a, y = x·b → ab + 3b)
  class Unsym extends Error {}
  const P = {
    c: v => new Map(Math.abs(v) < 1e-15 ? [] : [['', v]]),
    v: n => new Map([[n, 1]]),
    add(a, b, s = 1) { const r = new Map(a); b.forEach((c, k) => { const v = (r.get(k) || 0) + s * c; if (Math.abs(v) < 1e-12) r.delete(k); else r.set(k, v); }); return r; },
    mul(a, b) {
      let r = new Map();
      a.forEach((ca, ka) => b.forEach((cb, kb) => { const k = ka.split('*').concat(kb.split('*')).filter(Boolean).sort().join('*'); r = P.add(r, new Map([[k, ca * cb]])); }));
      return r;
    },
    isC: a => [...a.keys()].every(k => k === ''), val: a => a.get('') || 0,
    pow(a, n) { if (!Number.isInteger(n) || n < 0 || n > 12) throw new Unsym(); let r = P.c(1); for (let i = 0; i < n; i++) r = P.mul(r, a); return r; }
  };
  const SN = p => ({ t: 'num', p }), SV = (c, pt, from) => ({ t: 'vec', c, pt: !!pt, from: from || null });
  const cnum = x => { if (x.t !== 'num' || !P.isC(x.p)) throw new Unsym(); return P.val(x.p); };
  function sev(n, ctx) {   // like ev, but unknowns stay letters
    switch (n.k) {
      case 'num': return SN(P.c(n.v));
      case 'grp': return sev(n.a, ctx);
      case 'names': {
        const r = resolveNames(n.list, ctx);
        const look = name => {
          if (ctx.defs.has(name)) {
            if (ctx.busy.has(name)) throw new Unsym(); ctx.busy.add(name);
            try { const v = sev(ctx.defs.get(name).ast, ctx); return v.t === 'vec' ? SV(v.c, v.pt || (isPointName(name) && !/[A-Z].*[A-Z]/.test(name)), v.from) : v; } finally { ctx.busy.delete(name); }
          }
          if (name in CONST) return SN(P.c(CONST[name]));
          if (name === 'i') throw new Unsym();
          return SN(P.v(name));
        };
        if (r.kind === 'name') return look(r.name);
        if (r.kind === 'pair') { const A = look(n.list[0]), B = look(n.list[1]); if (A.t !== 'vec' || B.t !== 'vec' || A.c.length !== B.c.length) throw new Unsym(); return SV(B.c.map((x, i) => P.add(x, A.c[i], -1)), false); }
        return n.list.map(look).reduce((a, b) => smul(a, b, 'imp'));
      }
      case 'tuple': return SV(n.items.map(x => { const v = sev(x, ctx); if (v.t !== 'num') throw new Unsym(); return v.p; }), false);
      case 'neg': { const v = sev(n.a, ctx); return v.t === 'vec' ? SV(v.c.map(x => P.add(P.c(0), x, -1)), false) : SN(P.add(P.c(0), v.p, -1)); }
      case 'pow': {
        const a = sev(n.a, ctx), e = cnum(sev(n.b, ctx));
        if (a.t === 'vec') { if (e !== 2) throw new Unsym(); return smul(a, a, '·'); }
        if (P.isC(a.p)) return SN(P.c(Math.pow(P.val(a.p), e)));
        return SN(P.pow(a.p, e));
      }
      case 'bin': {
        const a = sev(n.a, ctx), b = sev(n.b, ctx);
        if (n.op === '+' || n.op === '-') {
          const s = n.op === '+' ? 1 : -1;
          if (a.t === 'num' && b.t === 'num') return SN(P.add(a.p, b.p, s));
          if (a.t !== 'vec' || b.t !== 'vec' || a.c.length !== b.c.length) throw new Unsym();
          return SV(a.c.map((x, i) => P.add(x, b.c[i], s)), a.pt && !b.pt);
        }
        if (n.op === '/') { const d = cnum(b); if (!d) throw new Unsym(); return a.t === 'vec' ? SV(a.c.map(x => P.mul(x, P.c(1 / d))), false) : SN(P.mul(a.p, P.c(1 / d))); }
        return smul(a, b, n.op);
      }
      case 'call': {
        const A = n.args.map(x => sev(x, ctx));
        if (n.f === 'dot' && A.length === 2) return smul(A[0], A[1], '·');
        if (n.f === 'cross' && A.length === 2) return smul(A[0], A[1], '×');
        if (n.f === 'det' && A.every(x => x.t === 'vec' && x.c.length === A.length) && A.length <= 3) return SN(sdet(A.map(x => x.c)));
        if (n.f === 'vec' && A.length === 2 && A.every(x => x.t === 'vec')) return SV(A[1].c.map((x, i) => P.add(x, A[0].c[i], -1)), false);
        if (n.f === 'mid' && A.length === 2 && A.every(x => x.t === 'vec')) return SV(A[0].c.map((x, i) => P.mul(P.add(x, A[1].c[i]), P.c(0.5))), true);
        // anything else only on plain numbers
        const nums = A.map(x => (x.t === 'vec' ? (() => { const c = x.c.map(p => { if (!P.isC(p)) throw new Unsym(); return P.val(p); }); return VEC(c, x.pt); })() : NUM(cnum(x))));
        const r = call(n.f, nums, ctx);
        return r.t === 'vec' ? SV(r.c.map(P.c), r.pt) : SN(P.c(r.v));
      }
      case 'abs': { const v = sev(n.a, ctx); if (v.t === 'vec') { const c = v.c.map(p => { if (!P.isC(p)) throw new Unsym(); return P.val(p); }); return SN(P.c(Math.hypot(...c))); } return SN(P.c(Math.abs(cnum(v)))); }
      case 'deg': return SN(P.c(cnum(sev(n.a, ctx)) * Math.PI / 180));
    }
    throw new Unsym();
  }
  function smul(a, b, op) {
    if (a.t === 'vec' && b.t === 'vec') {
      if (a.c.length !== b.c.length) throw new Unsym();
      if (op === '×') {
        if (a.c.length !== 3) throw new Unsym();
        const [x1, y1, z1] = a.c, [x2, y2, z2] = b.c, m = P.mul, d = (p, q) => P.add(p, q, -1);
        return SV([d(m(y1, z2), m(z1, y2)), d(m(z1, x2), m(x1, z2)), d(m(x1, y2), m(y1, x2))], false);
      }
      return SN(a.c.reduce((s, x, i) => P.add(s, P.mul(x, b.c[i])), P.c(0)));
    }
    if (a.t === 'vec') return SV(a.c.map(x => P.mul(x, b.p)), false);
    if (b.t === 'vec') return SV(b.c.map(x => P.mul(x, a.p)), false);
    return SN(P.mul(a.p, b.p));
  }
  function sdet(M) {
    if (M.length === 1) return M[0][0];
    if (M.length === 2) return P.add(P.mul(M[0][0], M[1][1]), P.mul(M[0][1], M[1][0]), -1);
    let r = P.c(0);
    for (let j = 0; j < 3; j++) r = P.add(r, P.mul(M[0][j], sdet(M.slice(1).map(row => row.filter((_, k) => k !== j)))), j % 2 ? -1 : 1);
    return r;
  }
  function mpolyTex(p) {
    if (!p.size) return '0';
    const terms = [...p.entries()].map(([k, c]) => ({ vars: k ? k.split('*') : [], c }));
    terms.sort((A, B) => B.vars.length - A.vars.length || A.vars.join().localeCompare(B.vars.join()));
    let s = '';
    terms.forEach(({ vars, c }) => {
      const cnt = {}; vars.forEach(v => { cnt[v] = (cnt[v] || 0) + 1; });
      const names = Object.keys(cnt).sort();
      const plain = names.every(v => v.length === 1);
      const mono = names.map(v => nameTex(v) + (cnt[v] > 1 ? '^{' + cnt[v] + '}' : '')).join(plain ? '' : '\\,');
      const m = Math.abs(c), f = numForm(m).tex, neg = c < 0;
      const coef = !mono ? f : Math.abs(m - 1) < 1e-12 ? '' : f;
      const term = coef + mono;
      s += s ? (neg ? ' - ' : ' + ') + term : (neg ? '-' : '') + term;
    });
    return s;
  }
  /** a value with unknowns as LaTeX (polynomials only), or null */
  function symTex(n, defs) {
    let v; try { v = sev(n, { defs, busy: new Set() }); } catch (e) { if (e instanceof Unsym || e instanceof Error) return null; throw e; }
    if (v.t === 'vec') return '\\left(' + v.c.map(mpolyTex).join(',\\ ') + '\\right)';
    return mpolyTex(v.p);
  }

  // ---------- results that still depend on one unknown: show them as a polynomial in it (or |polynomial|)
  function polyFit(f) {
    const xs = [0, 1, 2, 3, 4], ys = xs.map(f);
    if (ys.some(y => !isFinite(y))) return null;
    // Newton divided differences on 0..4 → monomial coefficients
    const dd = ys.slice(), c = [dd[0]];
    for (let j = 1; j < 5; j++) { for (let i = 4; i >= j; i--) dd[i] = (dd[i] - dd[i - 1]) / j; c.push(dd[j]); }
    let poly = [0, 0, 0, 0, 0];
    let basis = [1];   // ∏ (t − i)
    for (let j = 0; j < 5; j++) {
      basis.forEach((b, k) => { poly[k] += c[j] * b; });
      const nb = new Array(basis.length + 1).fill(0); basis.forEach((b, k) => { nb[k + 1] += b; nb[k] -= j * b; }); basis = nb;
    }
    poly = poly.map(x => { const r = frac(x, 36); return r ? r[0] / r[1] : x; });
    const P = t => poly.reduce((s, a, k) => s + a * Math.pow(t, k), 0);
    for (const t of [5, 0.37, -2.6, 7.3, -11, 23.5, -47.2, 61.9]) { const y = f(t); if (!isFinite(y) || Math.abs(P(t) - y) > 1e-7 * (1 + Math.abs(y))) return null; }
    while (poly.length > 1 && Math.abs(poly[poly.length - 1]) < 1e-12) poly.pop();
    return poly;
  }
  function polyTex(poly, vt) {
    let s = '';
    for (let k = poly.length - 1; k >= 0; k--) {
      const a = poly[k]; if (Math.abs(a) < 1e-12) continue;
      const neg = a < 0, m = Math.abs(a), f = numForm(m).tex;
      const coef = k === 0 ? f : (Math.abs(m - 1) < 1e-12 ? '' : f);
      const term = coef + (k === 0 ? '' : vt + (k > 1 ? '^{' + k + '}' : ''));
      s += s ? (neg ? ' - ' : ' + ') + term : (neg ? '-' : '') + term;
    }
    return s || '0';
  }
  function symbolicTex(fn, name, isVecResult, dim) {
    const vt = nameTex(name);
    if (isVecResult) {
      const parts = [];
      for (let i = 0; i < dim; i++) { const p = polyFit(t => { const w = fn(t); return isVec(w) ? w.c[i] : NaN; }); if (!p) return null; parts.push(polyTex(p, vt)); }
      return '\\left(' + parts.join(',\\ ') + '\\right)';
    }
    const p = polyFit(t => fn(t).v); if (p) return polyTex(p, vt);
    // |p(t)|: fit p far to the right (where it does not change sign), then check everywhere
    const q = polyFit(t => fn(t + 1000).v);
    if (q) {
      const shift = t => q.reduce((s, a, k) => s + a * Math.pow(t - 1000, k), 0);
      const p2 = polyFit(shift);
      if (p2 && [-7.1, -1.3, 0.4, 2.2, 9.6].every(t => Math.abs(Math.abs(shift(t)) - fn(t).v) < 1e-7 * (1 + Math.abs(fn(t).v)))) return '\\left|' + polyTex(p2, vt) + '\\right|';
    }
    return null;
  }

  // ---------- solving one unknown
  function roots1(g) {
    const out = [];
    const add = r => { if (isFinite(r) && !out.some(x => Math.abs(x - r) < 1e-6 * (1 + Math.abs(r)))) out.push(r); };
    const bis = (a, b, fa) => { for (let i = 0; i < 80; i++) { const m = (a + b) / 2, fm = g(m); if (!isFinite(fm)) return null; if (fm === 0) return m; if ((fm < 0) === (fa < 0)) { a = m; fa = fm; } else b = m; } return (a + b) / 2; };
    const scan = (lo, hi, N) => {
      const h = (hi - lo) / N; let xp = lo, fp = g(lo), fpp = NaN;
      for (let i = 1; i <= N; i++) {
        const x = lo + i * h, fx = g(x);
        if (fp === 0) add(xp);
        else if (isFinite(fp) && isFinite(fx) && (fp < 0) !== (fx < 0) && fx !== 0) {
          const r = bis(xp, x, fp); if (r !== null && Math.abs(g(r)) < 1e-6 * (1 + Math.abs(fp) + Math.abs(fx))) add(r);   // not a pole
        } else if (isFinite(fpp) && isFinite(fp) && isFinite(fx) && Math.abs(fp) < Math.abs(fpp) && Math.abs(fp) <= Math.abs(fx) && Math.abs(fp) < 1e-2) {
          // touching root: minimise |g| (golden section)
          let a = xp - h, b = x; for (let k = 0; k < 60; k++) { const m1 = a + (b - a) * 0.382, m2 = a + (b - a) * 0.618; if (Math.abs(g(m1)) < Math.abs(g(m2))) b = m2; else a = m1; }
          const r = (a + b) / 2; if (Math.abs(g(r)) < 1e-9) add(r);
        }
        fpp = fp; xp = x; fp = fx;
      }
    };
    scan(-100, 100, 8000);
    if (!out.length) { scan(-10000, -100, 4000); scan(100, 10000, 4000); }
    return out.map(r => { const f = frac(r, 12); if (f && Math.abs(g(f[0] / f[1])) <= Math.abs(g(r)) + 1e-12) return f[0] / f[1]; const ri = Math.round(r); return Math.abs(g(ri)) < 1e-10 ? ri : r; }).sort((a, b) => a - b);
  }
  // ---------- all complex roots of a polynomial equation (Durand–Kerner), found from values of the residual
  /** R(t) for complex t → value; returns the roots [{re, im}] when R is a polynomial of degree 1–8, else null */
  function cxPolyRoots(R) {
    const val = t => { const v = R(t); return v && !isVec(v) ? { re: cre(v), im: cim(v) } : { re: NaN, im: NaN }; };
    const N = 9, xs = [...Array(N).keys()], ys = xs.map(x => val({ re: x, im: 0 }));
    if (ys.some(y => !isFinite(y.re) || !isFinite(y.im))) return null;
    // Newton divided differences (real nodes 0..8) → coefficients c0 + c1 t + … (complex)
    const dd = ys.map(y => ({ ...y })), cN = [{ ...dd[0] }];
    for (let j = 1; j < N; j++) { for (let i = N - 1; i >= j; i--) dd[i] = { re: (dd[i].re - dd[i - 1].re) / j, im: (dd[i].im - dd[i - 1].im) / j }; cN.push({ ...dd[j] }); }
    let poly = Array.from({ length: N }, () => ({ re: 0, im: 0 })), basis = [1];
    for (let j = 0; j < N; j++) {
      basis.forEach((b, k) => { poly[k].re += cN[j].re * b; poly[k].im += cN[j].im * b; });
      const nb = new Array(basis.length + 1).fill(0); basis.forEach((b, k) => { nb[k + 1] += b; nb[k] -= j * b; }); basis = nb;
    }
    const scale = Math.max(1, ...poly.map(c => Math.hypot(c.re, c.im)));
    poly = poly.map(c => ({ re: Math.abs(c.re) < 1e-9 * scale ? 0 : c.re, im: Math.abs(c.im) < 1e-9 * scale ? 0 : c.im }));
    while (poly.length > 1 && !poly[poly.length - 1].re && !poly[poly.length - 1].im) poly.pop();
    const n = poly.length - 1; if (n < 1) return null;
    const P = t => poly.reduceRight((acc, c) => { const m = C.mul(CXo(acc), CXo(t)); return { re: cre(m) + c.re, im: cim(m) + c.im }; }, { re: 0, im: 0 });
    // is it really this polynomial? check at complex points
    for (const t of [{ re: 0.3, im: 0.7 }, { re: -1.2, im: 0.4 }, { re: 2.5, im: -1.1 }, { re: 11.3, im: 2 }]) {
      const a = val(t), b = P(t); if (!isFinite(a.re) || Math.hypot(a.re - b.re, a.im - b.im) > 1e-6 * (1 + Math.hypot(a.re, a.im))) return null;
    }
    // Durand–Kerner on the monic polynomial
    const lead = CXo(poly[n]), mon = poly.map(c => { const q = C.div(CXo(c), lead); return { re: cre(q), im: cim(q) }; });
    const M = t => mon.reduceRight((acc, c) => { const m = C.mul(CXo(acc), CXo(t)); return { re: cre(m) + c.re, im: cim(m) + c.im }; }, { re: 0, im: 0 });
    let z = Array.from({ length: n }, (_, k) => { const w = C.pow(CX(0.4, 0.9), NUM(k)); return { re: cre(w), im: cim(w) }; });
    for (let it = 0; it < 500; it++) {
      let moved = 0;
      z = z.map((zk, k) => {
        let den = NUM(1); z.forEach((zj, j) => { if (j !== k) den = C.mul(den, CX(zk.re - zj.re, zk.im - zj.im)); });
        const step = C.div(CXo(M(zk)), den), nz = { re: zk.re - cre(step), im: zk.im - cim(step) };
        moved = Math.max(moved, Math.hypot(cre(step), cim(step))); return nz;
      });
      if (moved < 1e-14) break;
    }
    // snap to exact-looking values (½, √3/2, …) when that still solves it
    const snap = x => { const f = frac(x, 12); if (f) return f[0] / f[1]; const r = Math.sqrt(Math.abs(x) * Math.abs(x)); for (let q = 1; q <= 12; q++) { const p = Math.round(x * x * q * q); if (Math.abs(Math.sqrt(p) / q - Math.abs(x)) < 1e-7) return Math.sign(x) * Math.sqrt(p) / q; } return Math.abs(x) < 1e-9 ? 0 : x; };
    z = z.map(r => { const sr = { re: snap(r.re), im: snap(r.im) }, a = val(sr); return isFinite(a.re) && Math.hypot(a.re, a.im) < 1e-7 * scale ? sr : { re: Math.abs(r.re) < 1e-10 ? 0 : r.re, im: Math.abs(r.im) < 1e-10 ? 0 : r.im }; });
    const out = []; z.forEach(r => { if (!out.some(o => Math.hypot(o.re - r.re, o.im - r.im) < 1e-6)) out.push(r); });
    return out.sort((a, b) => a.re - b.re || b.im - a.im);
  }
  const CXo = o => CX(o.re, o.im);
  const short = v => { const f = numForm(v); return /sqrt|pi/.test(f.ascii) ? String(+v.toPrecision(3)) : f.ascii; };
  /** "1 + 2i", "−0.5 − 0.866i" for canvas labels */
  const cxLabel = r => { const re = Math.abs(r.re) < 1e-12 ? '' : short(r.re), m = Math.abs(r.im); if (m < 1e-12) return re || '0'; const im = (Math.abs(m - 1) < 1e-12 ? '' : short(m)) + 'i'; return (re ? re + (r.im < 0 ? ' − ' : ' + ') : (r.im < 0 ? '−' : '')) + im; };
  const cxRootTex = r => (Math.abs(r.im) < 1e-12 ? numForm(r.re).tex : cxForm(r.re, r.im).tex);
  const cxRootAscii = r => (Math.abs(r.im) < 1e-12 ? numForm(r.re).ascii : cxForm(r.re, r.im).ascii);

  const REL = {
    '=': (a, b) => Math.abs(a - b) < 1e-9 * (1 + Math.abs(a) + Math.abs(b)),
    '<': (a, b) => a < b - 1e-12, '>': (a, b) => a > b + 1e-12,
    '<=': (a, b) => a <= b + 1e-9 * (1 + Math.abs(b)), '>=': (a, b) => a >= b - 1e-9 * (1 + Math.abs(b))
  };
  const RELTEX = { '=': '=', '<': '<', '>': '>', '<=': '\\le', '>=': '\\ge', ':=': '\\coloneqq' };

  // ================================================================ LaTeX of what was typed
  function nameTex(n) {
    const m = n.match(/^([A-Za-z]+?)(\d+|_?[A-Za-z0-9]*)?('*)$/);
    if (!m) return n;
    let base = m[1], sub = (m[2] || '').replace(/^_/, '');
    if (GREEK[base + sub] && !GREEK[base]) { base = base + sub; sub = ''; }
    const b = GREEK[base] || (base.length > 1 ? '\\mathrm{' + base + '}' : base);
    return b + (sub ? '_{' + sub + '}' : '') + (m[3] || '');
  }
  function texOf(n, ctx) {
    const T = x => texOf(x, ctx);
    switch (n.k) {
      case 'num': return n.raw;
      case 'grp': return '\\left(' + T(n.a) + '\\right)';
      case 'tuple': return '\\left(' + n.items.map(T).join(',\\ ') + '\\right)';
      case 'abs': return '\\left|' + T(n.a) + '\\right|';
      case 'neg': return '-' + T(n.a);
      case 'deg': return T(n.a) + '^\\circ';
      case 'pow': return (n.a.k === 'names' && n.a.list.length === 1 || n.a.k === 'num' || n.a.k === 'grp' || n.a.k === 'abs' ? T(n.a) : '\\left(' + T(n.a) + '\\right)') + '^{' + T(n.b) + '}';
      case 'names': {
        const r = resolveNames(n.list, ctx);
        if (r.kind === 'pair') return '\\overrightarrow{' + n.list.map(nameTex).join('') + '}';
        if (r.kind === 'name') {
          const nm = r.name, d = ctx.defs.get(nm);
          let vec = false; if (d && !isPointName(nm)) { try { vec = isVec(ev(d.ast, probeCtx(ctx.defs))); } catch (e) { /* */ } }
          if (d && isPointName(nm) && n.list.length === 2) return '\\overrightarrow{' + n.list.map(nameTex).join('') + '}';
          if (ctx.lhsVec && ctx.lhsVec === nm) vec = true;
          if (ctx.lhsPair && ctx.lhsPair === nm) return '\\overrightarrow{' + n.list.map(nameTex).join('') + '}';
          return vec ? '\\vec{' + nameTex(nm) + '}' : nameTex(nm);
        }
        return n.list.map(nameTex).join('\\,');
      }
      case 'bin': {
        if (n.op === '/') return '\\frac{' + T(n.a.k === 'grp' ? n.a.a : n.a) + '}{' + T(n.b.k === 'grp' ? n.b.a : n.b) + '}';
        if (n.op === '+') return T(n.a) + ' + ' + T(n.b);
        if (n.op === '-') return T(n.a) + ' - ' + (n.b.k === 'bin' && (n.b.op === '+' || n.b.op === '-') ? '\\left(' + T(n.b) + '\\right)' : T(n.b));
        const wrap = x => (x.k === 'bin' && (x.op === '+' || x.op === '-') ? '\\left(' + T(x) + '\\right)' : T(x));
        if (n.op === '×') return wrap(n.a) + ' \\times ' + wrap(n.b);
        if (n.op === '·' || n.op === '*') return wrap(n.a) + ' \\cdot ' + wrap(n.b);
        const bt = wrap(n.b);
        if (n.b.k === 'num' || /^\d/.test(bt)) return wrap(n.a) + ' \\cdot ' + bt;
        return wrap(n.a) + (n.a.k === 'num' ? '' : '\\,') + bt;
      }
      case 'call': {
        const args = n.args.map(T).join(',\\ ');
        if (n.f === 'sqrt') return '\\sqrt{' + args + '}';
        if (n.f === 'abs' || n.f === 'norm') return n.f === 'norm' ? '\\left\\|' + args + '\\right\\|' : '\\left|' + args + '\\right|';
        if (n.f === 'det') return '\\det\\left(' + args + '\\right)';
        if (n.f === 'vec' && n.args.length === 2 && n.args.every(a => a.k === 'names' && a.list.length === 1)) return '\\overrightarrow{' + n.args.map(T).join('') + '}';
        if (n.f === 'angle' && n.args.length === 2) return '\\angle\\left(' + args + '\\right)';
        if (n.f === 'conj') return '\\overline{' + args + '}';
        if (n.f === 're' || n.f === 'im') return '\\operatorname{' + (n.f === 're' ? 'Re' : 'Im') + '}\\left(' + args + '\\right)';
        if (n.f === 'arg') return '\\arg\\left(' + args + '\\right)';
        const op = ['sin', 'cos', 'tan', 'ln', 'log', 'exp'].includes(n.f) ? '\\' + n.f : '\\operatorname{' + n.f + '}';
        return op + '\\left(' + args + '\\right)';
      }
    }
    return '?';
  }
  const probeCtx = defs => ({ defs, busy: new Set(), freeSeen: new Set(), used: new Set(), probe: () => 0.731 });

  // ================================================================ analysing one line
  function freeNames(n, defs) {   // unknowns a line depends on (through its definitions too), and whether vectors are involved
    const ctx = { defs, busy: new Set(), freeSeen: new Set(), used: new Set(), probe: () => 1.2345 };
    let v = null; try { v = ev(n, ctx); } catch (e) { if (!(e instanceof NotMine)) throw e; }
    return { free: [...ctx.freeSeen], sawVec: ctx.sawVec || isVec(v), sawCx: !!ctx.sawCx || isCx(v), used: [...ctx.used], value: v };
  }
  function evalWith(n, defs, name) { return t => { const ctx = { defs, busy: new Set(), freeSeen: new Set(), used: new Set(), free: { [name]: t } }; try { return ev(n, ctx); } catch (e) { return { t: 'num', v: NaN }; } }; }
  const isLiteral = n => n.k === 'num' || (n.k === 'neg' && n.a.k === 'num') || (n.k === 'tuple' && n.items.every(isLiteral));

  /** Replace the defined numbers in an ASCII line by their values (for MathCore). Returns null if nothing changes. */
  function substitute(src, consts, all) {
    let out = '', i = 0, changed = false;
    const s = String(src);
    while (i < s.length) {
      const rest = s.slice(i);
      const d = rest.match(/^d\^?2?\s*\/\s*d[a-zθ](\^?2)?/); if (d) { out += d[0]; i += d[0].length; continue; }
      if (/[A-Za-z]/.test(s[i]) && (i === 0 || !/[A-Za-z_0-9]/.test(s[i - 1]) || true)) {
        const w = WORDS.concat(['int', 'integral', 'lim', 'diff', 'derivative', 'tangent', 'mod', 'infinity', 'inf']).sort((a, b) => b.length - a.length).find(x => rest.startsWith(x)) || GREEKW.find(x => rest.startsWith(x));
        if (w) { out += w; i += w.length; continue; }
        const m = rest.match(/^[A-Za-z](?:_\{[A-Za-z0-9]+\}|_[A-Za-z0-9]|\d+)?['′]*/);
        const name = m[0].replace(/_\{?([A-Za-z0-9]+)\}?/, '$1').replace(/′/g, "'");
        if ((all || !PLOT_VARS.includes(name)) && name in consts) {
          const v = consts[name], before = out.replace(/\s+$/, '').slice(-1), after = s[i + m[0].length] || '';
          out += /^\d+(\.\d+)?$/.test(v) && !/[\d.^]/.test(before) && !/[\d.^]/.test(after) ? v : '(' + v + ')'; changed = true;
        } else out += m[0];
        i += m[0].length; continue;
      }
      out += s[i]; i++;
    }
    return changed ? out : null;
  }

  /**
   * Analyse a typed line against the definitions above it. Returns null when it is an ordinary MathCore line,
   * { delegate: ascii, latex } when MathCore should handle it with the defined numbers substituted, or a result:
   * { kind: 'def'|'eval'|'equation'|'check', latex, value, drawable, roots, unknown, use: [ascii…] }
   */
  function analyze(src, sc) {
    sc = sc || { defs: new Map() };
    const defs = sc.defs;
    src = String(src || '').trim(); if (!src) return null;
    if (CALC_RE.test(src)) {   // calculus: MathCore's; only substitute defined numbers
      const consts = constNumbers(defs); const sub = substitute(src, consts);
      return sub ? { delegate: sub, latex: null } : null;
    }
    let st; try { st = parse(src); } catch (e) { return null; }
    const def = definitionOf(st, defs);
    const ctxT = { defs, busy: new Set(), freeSeen: new Set(), used: new Set(), probe: () => 0.731 };
    const sides = st.sides.filter(Boolean);
    let info;
    try { info = sides.map(n => freeNames(n, defs)); } catch (e) { return { kind: 'error', latex: '\\text{' + texEsc(src) + '}', error: e.message }; }
    // an equation in z or w is solved over the complex numbers
    const cxName = !def && st.rels.length === 1 && st.rels[0] === '=' && !!st.sides[1] && info.some(x => x.free.some(n => /^[zw]\d*$/.test(n)));
    const sawCx = info.some(x => x.sawCx) || cxName, sawVec = info.some(x => x.sawVec) || sawCx, used = new Set(info.flatMap(x => x.used));
    const free = [...new Set(info.flatMap(x => x.free))];
    if (!def && !sawVec && !used.size) return null;                      // nothing of ours: MathCore as before
    if (!def && !sawVec) {                                                 // scalars using defined numbers
      const consts = constNumbers(defs), allConst = [...used].every(n => n in consts);
      if (allConst && free.length) { const sub = substitute(src, consts, true); if (sub) return { delegate: sub, latex: latexLine(st, ctxT, null) }; }
    }
    // ---------- ours
    const res = { latex: '', resultTex: '', roots: null, use: [], drawable: null };
    if (def) {
      const lhsVal = (() => { try { return ev(def.rhs, probeCtx(defs)); } catch (e) { return null; } })();
      const ctxD = Object.assign({}, ctxT, { defs: new Map([...defs, [def.name, { ast: def.rhs }]]) });
      if (lhsVal && isVec(lhsVal) && !isPointName(def.name)) ctxD.lhsVec = def.name;
      if (st.sides[0].list.length === 2 && st.sides[0].list.every(n => defs.has(n) && isPointName(n))) ctxD.lhsPair = def.name;
      res.kind = 'def'; res.name = def.name;
      res.latex = texOf(st.sides[0], ctxD) + ' ' + RELTEX[def.op] + ' ' + texOf(def.rhs, Object.assign({}, ctxT));
      const fr = info[1].free;
      if (!fr.length) {
        let v = info[1].value;
        if (isVec(v) && isPointName(def.name) && !/[A-Z].*[A-Z]/.test(def.name)) v = VEC(v.c, true);   // P = (…) is a point
        res.value = v;
        if (isCx(v) && !info[1].used.length) res.resultTex = cxPolar(v);   // z = 3 + 4i: just its modulus and argument
        else if (!isLiteral(def.rhs)) res.resultTex = ' = ' + valueTex(v);
        res.drawable = drawableOf(v, def.name, st.sides[0]);
      } else if (!isLiteral(def.rhs) && (info[1].used.length || info[1].sawVec)) {   // shown worked out when it uses other names
        let sym = symTex(def.rhs, defs);
        if (!sym && fr.length === 1) { const fn = evalWith(def.rhs, defs, fr[0]), v0 = fn(0.731); sym = symbolicTex(fn, fr[0], isVec(v0), isVec(v0) ? v0.c.length : 0); }
        if (sym && sym !== texOf(def.rhs, ctxT)) res.resultTex = ' = ' + sym;
      }
      return res;
    }
    res.latex = latexLine(st, ctxT, null);
    if (st.rels.length === 0 || (st.rels.length === 1 && !st.sides[1] && st.rels[0] === '=')) {   // a value: "u·v", "|AB| ="
      res.kind = 'eval';
      const n = st.sides[0];
      if (!free.length) { res.value = info[0].value; res.resultTex = (st.rels.length ? ' ' : ' = ') + valueTex(res.value); res.drawable = drawableOf(res.value, null, n); }
      else {
        let sym = symTex(n, defs);
        if (!sym && free.length === 1) { const fn = evalWith(n, defs, free[0]), v0 = fn(0.731); sym = symbolicTex(fn, free[0], isVec(v0), isVec(v0) ? v0.c.length : 0); }
        if (sym) res.resultTex = (st.rels.length ? ' ' : ' = ') + sym;
      }
      return res;
    }
    if (st.rels.length !== 1 || !st.sides[0] || !st.sides[1]) return { kind: 'error', latex: res.latex, error: tr('Write one equation (or one comparison) per line') };
    const rel = st.rels[0], [L, R] = st.sides;
    if (!free.length) {                                                    // a check: true or false
      const a = info[0].value, b = info[1].value;
      let ok;
      if (isVec(a) || isVec(b)) {
        if (!isVec(a) || !isVec(b)) return { kind: 'error', latex: res.latex, error: tr('A vector cannot be equal to a number') };
        if (rel !== '=') return { kind: 'error', latex: res.latex, error: tr('Vectors can only be compared with =') };
        sameDim(a, b); ok = a.c.every((x, i) => REL['='](x, b.c[i]));
      } else if (isCx(a) || isCx(b)) {
        if (rel !== '=') return { kind: 'error', latex: res.latex, error: tr('Complex numbers can only be compared with =') };
        ok = REL['='](cre(a), cre(b)) && REL['='](cim(a), cim(b));
      } else ok = REL[rel](a.v, b.v);
      res.kind = 'check'; res.ok = ok;
      res.resultTex = '\\quad' + (ok ? '\\textcolor{#8fd694}{\\checkmark}' : '\\textcolor{#ff8f8f}{\\times\\ \\text{false}}') + (isVec(a) || isCx(a) || isCx(b) ? '' : '\\quad\\textcolor{#9aa7a0}{(' + numTex(a.v, false) + ' ' + RELTEX[rel] + ' ' + numTex(b.v, false) + ')}');
      return res;
    }
    if (free.length > 1) { res.kind = 'equation'; res.resultTex = '\\quad\\textcolor{#9aa7a0}{\\text{' + texEsc(tr('unknowns')) + '}\\ ' + free.map(nameTex).join(',\\ ') + '}'; res.unknowns = free; return res; }
    if (rel !== '=') { res.kind = 'equation'; res.resultTex = '\\quad\\textcolor{#9aa7a0}{\\text{' + texEsc(tr('give {v} a value to check it', { v: free[0] })) + '}}'; return res; }
    // one unknown: solve (vector equations component by component)
    const t = free[0], fL = evalWith(L, defs, t), fR = evalWith(R, defs, t), v0 = fL(0.731), w0 = fR(0.731);
    let roots;
    if (isVec(v0) || isVec(w0)) {
      if (!isVec(v0) || !isVec(w0) || v0.c.length !== w0.c.length) return { kind: 'error', latex: res.latex, error: tr('Both sides must be vectors of the same size') };
      let cand = null;
      for (let i = 0; i < v0.c.length; i++) {
        const g = x => fL(x).c[i] - fR(x).c[i];
        if ([0, 1.7, -3.2, 11].every(x => Math.abs(g(x)) < 1e-9)) continue;           // holds for every value
        const r = roots1(g); cand = cand === null ? r : cand.filter(x => r.some(y => Math.abs(x - y) < 1e-6 * (1 + Math.abs(x))));
      }
      roots = cand === null ? 'all' : cand;
    } else {
      // complex: the line uses i, or the unknown is called z or w, or there is no real root
      const cxCtx = sawCx || isCx(v0) || isCx(w0) || /^[zw]\d*$/.test(t);
      const g = x => fL(x).v - fR(x).v;
      const all = !cxCtx && [0, 1.7, -3.2, 11].every(x => Math.abs(g(x)) < 1e-9);
      roots = all ? 'all' : cxCtx ? [] : roots1(g);
      if (!all && (cxCtx || !roots.length)) {
        const cr = cxPolyRoots(z => C.add(fL(z), fR(z), -1));
        if (cr && cr.some(r => Math.abs(r.im) > 1e-12 || cxCtx)) return Object.assign(res, cxRootsResult(t, cr, defs, !cxCtx));
      }
    }
    res.kind = 'equation'; res.unknown = t;
    const vt = nameTex(t);
    if (roots === 'all') res.resultTex = '\\quad\\textcolor{#f3d36b}{\\Rightarrow\\ \\text{' + texEsc(tr('true for every {v}', { v: t })) + '}}';
    else if (!roots.length) res.resultTex = '\\quad\\textcolor{#f3d36b}{\\Rightarrow\\ \\text{' + texEsc(tr('no real solution')) + '}}';
    else {
      res.roots = roots;
      res.resultTex = '\\quad\\textcolor{#f3d36b}{\\Rightarrow\\ ' + vt + (roots.length > 1 ? '\\in\\left\\{' + roots.map(r => numForm(r).tex).join(',\\ ') + '\\right\\}' : ' = ' + numTex(roots[0])) + '}';
      res.use = roots.slice(0, 4).map(r => useLine(t, r, defs));
    }
    return res;
  }
  function cxRootsResult(t, cr, defs, onlyComplex) {
    const vt = nameTex(t), list = cr.map(cxRootTex);
    return {
      kind: 'equation', unknown: t, cxRoots: cr,
      resultTex: '\\quad\\textcolor{#f3d36b}{\\Rightarrow\\ ' + vt + (cr.length > 1 ? '\\in\\left\\{' + list.join(',\\ ') + '\\right\\}' : ' = ' + list[0]) + '}' + (onlyComplex && cr.every(r => Math.abs(r.im) > 1e-12) ? '\\quad\\textcolor{#9aa7a0}{(\\text{' + texEsc(tr('no real solution')) + '}:\\ \\mathbb{C})}' : ''),
      use: cr.slice(0, 4).map(r => t + (defs.has(t) || PLOT_VARS.includes(t) ? ' := ' : ' = ') + cxRootAscii(r)),
      // the roots as points of the complex plane
      drawables: cr.map(r => ({ type: 'point', complex: true, x: r.re, y: r.im, label: cxLabel(r) }))
    };
  }
  /** complex roots of an ordinary (MathCore) equation in one unknown: "x^2 + 1 = 0" → x ∈ {i, −i}; null if none */
  function complexRoots(src, sc) {
    const defs = (sc && sc.defs) || new Map();
    let st; try { st = parse(src); } catch (e) { return null; }
    if (st.rels.length !== 1 || st.rels[0] !== '=' || !st.sides[0] || !st.sides[1]) return null;
    let info; try { info = st.sides.map(n => freeNames(n, defs)); } catch (e) { return null; }
    const free = [...new Set(info.flatMap(x => x.free))]; if (free.length !== 1) return null;
    const fL = evalWith(st.sides[0], defs, free[0]), fR = evalWith(st.sides[1], defs, free[0]);
    const cr = cxPolyRoots(z => C.add(fL(z), fR(z), -1));
    return cr && cr.some(r => Math.abs(r.im) > 1e-12) ? cxRootsResult(free[0], cr, defs, true) : null;
  }
  function useLine(name, r, defs) { return name + (defs.has(name) || PLOT_VARS.includes(name) ? ' := ' : ' = ') + numForm(r).ascii; }
  function latexLine(st, ctx) {
    let s = '';
    st.sides.forEach((n, i) => { if (n) s += texOf(n, ctx); if (i < st.rels.length) s += ' ' + RELTEX[st.rels[i]] + ' '; });
    return s;
  }
  function constNumbers(defs) {   // defined names whose value is a plain number (no unknowns)
    const out = {};
    defs.forEach((d, name) => {
      try { const ctx = { defs, busy: new Set(), freeSeen: new Set(), used: new Set() }; const v = ev(d.ast, ctx); if (!isVec(v) && isFinite(v.v)) out[name] = numForm(v.v).exact ? numForm(v.v).ascii : String(v.v); } catch (e) { /* not a constant */ }
    });
    return out;
  }
  /** something the board can draw on 2-D axes: a point, or a vector (from a tail point when it has one) */
  function drawableOf(v, name, lhs) {
    const label = name || (lhs && lhs.k === 'names' ? lhs.list.join('') : '');
    if (isCx(v) && isFinite(v.re) && isFinite(v.im)) return { type: 'vector', complex: true, x1: 0, y1: 0, x2: v.re, y2: v.im, label: (label ? label + ' = ' : '') + cxLabel(v) };
    if (!isVec(v) || v.c.length !== 2 || !v.c.every(isFinite)) return null;
    if (v.pt) return { type: 'point', x: v.c[0], y: v.c[1], label };
    const from = v.from && v.from.length === 2 ? v.from : [0, 0];
    return { type: 'vector', x1: from[0], y1: from[1], x2: from[0] + v.c[0], y2: from[1] + v.c[1], label };
  }
  function texEsc(s) { return String(s).replace(/[\\{}$&#^_%~]/g, c => '\\' + c); }
  function numAscii(v) { return numForm(v).ascii; }
  /** "u·v" → does this line belong to VecCore at all (for quick checks) */
  function handles(src, sc) { const r = analyze(src, sc); return !!r && !r.delegate; }

  global.VecCore = { analyze, scope, handles, numAscii, numForm, nameTex, tokenize, parse, useLine, complexRoots, cxLabel };
})(typeof window !== 'undefined' ? window : globalThis);
