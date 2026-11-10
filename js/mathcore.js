/* MathCore — tiny math engine: tokenizer, parser, evaluator, LaTeX printer, solver, curve fitting.
   Works on plain ASCII math such as  "y = 3x^2 - 2",  "sqrt(6^2+8^2) =",  "sin 30° + 1/2". */
(function (global) {
  'use strict';

  const T = (s, v) => (global.tr ? global.tr(s, v) : (v ? s.replace(/\{(\w+)\}/g, (m, k) => (v[k] !== undefined ? v[k] : m)) : s));
  const FUNCS = ['asin', 'acos', 'atan', 'sqrt', 'sin', 'cos', 'tan', 'log', 'ln', 'abs', 'exp'];
  const CALC = ['derivative', 'tangent', 'integral', 'diff', 'int', 'lim'];
  const GREEK = { pi: '\\pi', 'π': '\\pi', theta: '\\theta', 'θ': '\\theta', alpha: '\\alpha', beta: '\\beta' };

  // ---------- Tokenizer ----------
  function tokenize(src) {
    const s = src.replace(/\s+/g, ' ').replace(/[×·*]/g, '*').replace(/[−–]/g, '-').replace(/÷/g, '/')
      .replace(/√/g, 'sqrt').replace(/²/g, '^2').replace(/³/g, '^3').replace(/≤/g, '<=').replace(/≥/g, '>=')
      .replace(/->/g, '→').replace(/∫/g, 'int').replace(/\binfinity\b|\binf\b|\boo\b/g, '∞').replace(/[′']/g, '′')
      // one-sided limits: "x→2+)" / "x→2-)"
      .replace(/(→[^,()]*?[^\s+\-→])\s*\+\s*\)/g, '$1⁺)').replace(/(→[^,()]*?[^\s+\-→])\s*-\s*\)/g, '$1⁻)');
    const out = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (c === ' ') { i++; continue; }
      if (/[0-9.]/.test(c)) {
        let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++;
        out.push({ t: 'num', v: parseFloat(s.slice(i, j)), raw: s.slice(i, j) }); i = j; continue;
      }
      if (c === 'd' && /^d(\^?2)?\/d[a-zθ](\^?2)?/.test(s.slice(i))) { // d/dx, d^2/dx^2
        const m = s.slice(i).match(/^d(\^?2)?\/d([a-zθ])(\^?2)?/);
        out.push({ t: 'calc', v: 'diff', dv: m[2], order: m[1] ? 2 : 1 }); i += m[0].length; continue;
      }
      if (c === '→') { out.push({ t: 'to' }); i++; continue; }
      if (c === '⁺' || c === '⁻') { out.push({ t: 'side', v: c === '⁺' ? 1 : -1 }); i++; continue; }
      if (c === '∞') { out.push({ t: 'id', v: '∞' }); i++; continue; }
      if (/[a-zA-Zπθ]/.test(c)) {
        const rest = s.slice(i);
        const cf = CALC.find(fn => rest.startsWith(fn) && !/[a-z]/.test(rest[fn.length] || ''));
        if (cf) { out.push({ t: 'calc', v: cf === 'integral' ? 'int' : cf === 'derivative' ? 'diff' : cf }); i += cf.length; continue; }
        const f = FUNCS.find(fn => rest.startsWith(fn));
        if (f) { out.push({ t: 'func', v: f }); i += f.length; continue; }
        const g = ['theta', 'alpha', 'beta', 'pi'].find(w => rest.startsWith(w));
        if (g) { out.push({ t: 'id', v: g === 'pi' ? 'π' : g === 'theta' ? 'θ' : g }); i += g.length; continue; }
        out.push({ t: 'id', v: c }); i++; continue;
      }
      if (s.startsWith('<=', i) || s.startsWith('>=', i)) { out.push({ t: 'rel', v: s.substr(i, 2) }); i += 2; continue; }
      if ('=<>'.includes(c)) { out.push({ t: 'rel', v: c }); i++; continue; }
      if ('+-*/^()|°!,'.includes(c)) { out.push({ t: c }); i++; continue; }
      throw new Error(T('Unexpected symbol "{c}"', { c }));
    }
    return out;
  }

  // ---------- Parser ----------
  function Parser(tokens) { this.tk = tokens; this.p = 0; }
  Parser.prototype = {
    peek() { return this.tk[this.p]; },
    next() { return this.tk[this.p++]; },
    eat(t) { const k = this.peek(); if (k && k.t === t) { this.p++; return k; } return null; },
    expect(t) { const k = this.next(); if (!k || k.t !== t) throw new Error(T('Expected {t}', { t })); return k; },
    expr() {
      let n = this.term();
      for (;;) {
        const k = this.peek();
        if (k && (k.t === '+' || k.t === '-')) { this.p++; n = { k: 'bin', op: k.t, a: n, b: this.term() }; }
        else return n;
      }
    },
    startsPrimary(k) { return k && (k.t === 'num' || k.t === 'id' || k.t === 'func' || k.t === 'calc' || k.t === '(' || (k.t === '|' && !this.inAbs)); },
    /** calculus call: diff(f[, x][, n]) · diff(f, x=a) · int(f, a, b) · int(f, t, a, b) · lim(f, x→a[±]) · tangent(f, a) */
    calcCall(k) {
      this.expect('(');
      const args = [];
      for (;;) {
        const t0 = this.peek(), t1 = this.tk[this.p + 1];
        if (t0 && t0.t === 'id' && t1 && t1.t === 'to') { this.p += 2; const to = this.expr(); const sd = this.eat('side'); args.push({ var: t0.v, to, side: sd ? sd.v : 0 }); }
        else if (t0 && t0.t === 'id' && t1 && t1.t === 'rel' && t1.v === '=') { this.p += 2; args.push({ var: t0.v, at: this.expr() }); }
        else { const e = this.expr(); const sd = this.eat('side'); args.push(sd ? { to: e, side: sd.v } : e); }
        if (this.eat(',')) continue;
        this.expect(')'); break;
      }
      const f = args[0]; if (!f || f.var) throw new Error(k.v + '(…) needs an expression first');
      const fv = [...freeVars(f)];
      const defVar = k.dv || (fv.length === 1 ? fv[0] : 'x');
      const isVar = a => a && !a.var && !a.to && a.k === 'var' && a.v !== '∞' && a.v !== 'π' && a.v !== 'e';
      if (k.v === 'diff') {
        let v = defVar, at = null, order = k.order || 1;
        args.slice(1).forEach(a => { if (a.var && a.at) { v = a.var; at = a.at; } else if (isVar(a)) v = a.v; else if (a.k === 'num' && Number.isInteger(a.v) && a.v >= 1 && a.v <= 6) order = a.v; else throw new Error('diff(f, x, n) or diff(f, x=a)'); });
        return { k: 'diff', a: f, v, order, at };
      }
      if (k.v === 'int') {
        const rest = args.slice(1);
        if (rest.length === 3 && isVar(rest[0])) return { k: 'int', a: f, v: rest[0].v, lo: rest[1], hi: rest[2] };
        if (rest.length === 2) return { k: 'int', a: f, v: defVar, lo: rest[0], hi: rest[1] };
        throw new Error(T('Integrals need limits, e.g. int(x^2, 0, 3)'));
      }
      if (k.v === 'lim') {
        const t = args[1]; if (!t) throw new Error('lim(f, x→a)');
        if (t.to) return { k: 'lim', a: f, v: t.var || defVar, to: t.to, side: t.side || 0 };
        return { k: 'lim', a: f, v: defVar, to: t, side: 0 };
      }
      if (k.v === 'tangent') {
        const t = args[1]; if (!t) throw new Error('tangent(f, a)');
        if (t.var && t.at) return { k: 'tangent', a: f, v: t.var, at: t.at };
        return { k: 'tangent', a: f, v: defVar, at: t.to || t };
      }
      throw new Error('Unknown ' + k.v);
    },
    term() {
      let n = this.unary();
      for (;;) {
        const k = this.peek();
        if (k && (k.t === '*' || k.t === '/')) { this.p++; n = { k: 'bin', op: k.t, a: n, b: this.unary() }; }
        else if (this.startsPrimary(k)) { n = { k: 'bin', op: 'imp', a: n, b: this.power() }; }
        else return n;
      }
    },
    unary() {
      if (this.eat('-')) return { k: 'neg', a: this.unary() };
      if (this.eat('+')) return this.unary();
      return this.power();
    },
    power() {
      const base = this.postfix();
      if (this.eat('^')) return { k: 'pow', a: base, b: this.unary() };
      return base;
    },
    postfix() {
      let n = this.primary();
      for (;;) {
        if (this.eat('°')) n = { k: 'deg', a: n };
        else if (this.eat('!')) n = { k: 'fact', a: n };
        else return n;
      }
    },
    primary() {
      const k = this.next();
      if (!k) throw new Error(T('Incomplete expression'));
      if (k.t === 'num') return { k: 'num', v: k.v, raw: k.raw };
      if (k.t === 'id') return { k: 'var', v: k.v };
      if (k.t === 'calc') return this.calcCall(k);
      if (k.t === '(') { const e = this.expr(); this.expect(')'); return { k: 'grp', a: e }; }
      if (k.t === '|') { const save = this.inAbs; this.inAbs = true; const e = this.expr(); this.inAbs = save; this.expect('|'); return { k: 'call', f: 'abs', a: e }; }
      if (k.t === 'func') {
        let arg;
        if (this.peek() && this.peek().t === '(') { this.p++; arg = this.expr(); this.expect(')'); arg = { k: 'grp', a: arg }; }
        else if (this.peek() && this.peek().t === '^' && k.v !== 'sqrt') { // sin^2 x
          this.p++; const ex = this.postfix(); const a2 = this.power();
          return { k: 'pow', a: { k: 'call', f: k.v, a: a2 }, b: ex, fnPow: true };
        }
        else arg = this.power();
        return { k: 'call', f: k.v, a: arg };
      }
      throw new Error(T('Unexpected "{x}"', { x: k.v || k.t }));
    }
  };

  function parseExpr(tokens) {
    const P = new Parser(tokens);
    const e = P.expr();
    if (P.p < tokens.length) throw new Error(T('Unexpected "{x}"', { x: tokens[P.p].v || tokens[P.p].t }));
    return e;
  }

  /** Parse a statement: sides separated by relations. Empty sides allowed (e.g. "3+4 ="). */
  function parse(src) {
    const toks = tokenize(src);
    const sides = []; const rels = []; let cur = [];
    let depth = 0;
    toks.forEach(t => {
      if (t.t === '(') depth++; if (t.t === ')') depth--;
      if (t.t === 'rel' && depth === 0) { sides.push(cur); rels.push(t.v); cur = []; } else cur.push(t);
    });
    sides.push(cur);
    return { sides: sides.map(s => (s.length ? parseExpr(s) : null)), rels };
  }

  // ---------- Evaluation ----------
  function fact(n) { if (n < 0 || n > 170 || n % 1) return NaN; let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }
  function evaluate(n, env) {
    env = env || {};
    switch (n.k) {
      case 'num': return n.v;
      case 'var':
        if (n.v in env) return env[n.v];
        if (n.v === 'π') return Math.PI;
        if (n.v === 'e') return Math.E;
        if (n.v === '∞') return Infinity;
        throw new Error('free:' + n.v);
      case 'diff': {
        if (!n._d) n._d = derivative(n.a, n.v, n.order);
        if (n.at) { const e2 = Object.assign({}, env); e2[n.v] = evaluate(n.at, env); return evaluate(n._d, e2); }
        return evaluate(n._d, env);
      }
      case 'nderiv': { // numeric derivative (fallback for things we cannot differentiate symbolically)
        const x0 = env[n.v], h = 1e-5 * (1 + Math.abs(x0)), e1 = Object.assign({}, env), e2 = Object.assign({}, env);
        e1[n.v] = x0 + h; e2[n.v] = x0 - h; return (evaluate(n.a, e1) - evaluate(n.a, e2)) / (2 * h);
      }
      case 'int': return integrate(x => { const e2 = Object.assign({}, env); e2[n.v] = x; return evaluate(n.a, e2); }, evaluate(n.lo, env), evaluate(n.hi, env));
      case 'lim': { const r = limit(x => { const e2 = Object.assign({}, env); e2[n.v] = x; return evaluate(n.a, e2); }, evaluate(n.to, env), n.side); return r.value; }
      case 'tangent': {
        if (!n._d) n._d = derivative(n.a, n.v, 1);
        const a = evaluate(n.at, env), ea = Object.assign({}, env); ea[n.v] = a;
        const fa = evaluate(n.a, ea), m = evaluate(n._d, ea), x = env[n.v];
        if (x === undefined) throw new Error('free:' + n.v);
        return fa + m * (x - a);
      }
      case 'grp': return evaluate(n.a, env);
      case 'neg': return -evaluate(n.a, env);
      case 'deg': return evaluate(n.a, env) * Math.PI / 180;
      case 'fact': return fact(evaluate(n.a, env));
      case 'pow': return Math.pow(evaluate(n.a, env), evaluate(n.b, env));
      case 'bin': {
        const a = evaluate(n.a, env), b = evaluate(n.b, env);
        switch (n.op) { case '+': return a + b; case '-': return a - b; case '/': return a / b; default: return a * b; }
      }
      case 'call': {
        const a = evaluate(n.a, env);
        switch (n.f) {
          case 'sin': return Math.sin(a); case 'cos': return Math.cos(a); case 'tan': return Math.tan(a);
          case 'asin': return Math.asin(a); case 'acos': return Math.acos(a); case 'atan': return Math.atan(a);
          case 'sqrt': return Math.sqrt(a); case 'log': return Math.log10(a); case 'ln': return Math.log(a);
          case 'abs': return Math.abs(a); case 'exp': return Math.exp(a);
        }
      }
    }
    throw new Error('Cannot evaluate');
  }

  function freeVars(n, set) {
    set = set || new Set();
    if (!n) return set;
    if (n.k === 'var' && n.v !== 'π' && n.v !== 'e' && n.v !== '∞') set.add(n.v);
    if (n.k === 'diff' || n.k === 'int' || n.k === 'lim' || n.k === 'tangent') {
      const inner = freeVars(n.a);
      const bound = n.k === 'int' || n.k === 'lim' || (n.k === 'diff' && n.at);
      inner.forEach(v => { if (!(bound && v === n.v)) set.add(v); });
      if (n.k === 'diff' && !n.at) set.add(n.v);
      if (n.k === 'tangent') set.add(n.v);
      ['at', 'lo', 'hi', 'to'].forEach(k => n[k] && freeVars(n[k], set));
      return set;
    }
    ['a', 'b'].forEach(k => n[k] && typeof n[k] === 'object' && freeVars(n[k], set));
    return set;
  }

  // ---------- LaTeX printer ----------
  const PREC = { '+': 1, '-': 1, '*': 2, '/': 2, imp: 2 };
  function prec(n) {
    if (n.k === 'bin') return PREC[n.op];
    if (n.k === 'neg') return 1.5;
    if (n.k === 'pow') return 3;
    if (n.k === 'int' || n.k === 'lim') return 1.6;
    return 4;
  }
  function strip(n) { return n && n.k === 'grp' ? n.a : n; }
  function varTex(v) { return v === '∞' ? '\\infty' : GREEK[v] || v; }
  function startsWithDigit(n) {
    while (n) {
      if (n.k === 'num') return true;
      if (n.k === 'bin' || n.k === 'pow' || n.k === 'deg' || n.k === 'fact') n = n.a; else return false;
    }
    return false;
  }
  function tex(n) {
    if (!n) return '';
    switch (n.k) {
      case 'num': return n.raw || fmt(n.v);
      case 'var': return varTex(n.v);
      case 'grp': return n.a.k === 'bin' && n.a.op === '/' ? tex(n.a) : '\\left(' + tex(n.a) + '\\right)';
      case 'neg': return '-' + wrap(n.a, 1.5);
      case 'deg': return wrap(n.a, 4) + '^{\\circ}';
      case 'fact': return wrap(n.a, 4) + '!';
      case 'pow': {
        if (n.fnPow) return '\\' + n.a.f + '^{' + tex(strip(n.b)) + '}' + argTex(n.a.a);
        if (n.a.k === 'call' && ['sin', 'cos', 'tan', 'ln', 'log'].includes(n.a.f) && strip(n.b).k === 'num') return '\\' + n.a.f + '^{' + tex(strip(n.b)) + '}' + argTex(n.a.a);
        const base = (n.a.k === 'call' && n.a.f !== 'sqrt' && n.a.f !== 'abs') ? '\\left(' + tex(n.a) + '\\right)' : n.a.k === 'grp' ? '\\left(' + tex(n.a.a) + '\\right)' : wrap(n.a, 4);
        return base + '^{' + tex(strip(n.b)) + '}';
      }
      case 'bin': {
        const p = PREC[n.op];
        if (n.op === '/') return '\\frac{' + tex(strip(n.a)) + '}{' + tex(strip(n.b)) + '}';
        const a = wrap(n.a, p), b = wrap(n.b, n.op === '-' ? p + 0.1 : p);
        if (n.op === '+') return a + '+' + b;
        if (n.op === '-') return a + '-' + b;
        // multiplication: explicit dot between two numbers, juxtaposition otherwise
        const fracB = (n.b.k === 'grp' && n.b.a.k === 'bin' && n.b.a.op === '/') || (n.b.k === 'bin' && n.b.op === '/');
        if (startsWithDigit(n.b) || (fracB && /\d$/.test(a)) || (n.op === '*' && /\d$/.test(a) && /^\d/.test(b))) return a + '\\cdot ' + b;
        return a + (/[a-zA-Z]$/.test(a) && /^[a-zA-Z]/.test(b) ? ' ' : '') + b;
      }
      case 'diff': {
        const d = n.order > 1 ? '\\frac{d^{' + n.order + '}}{d' + varTex(n.v) + '^{' + n.order + '}}' : '\\frac{d}{d' + varTex(n.v) + '}';
        const body = d + '\\left(' + tex(strip(n.a)) + '\\right)';
        return n.at ? '\\left.' + body + '\\right|_{' + varTex(n.v) + '=' + tex(n.at) + '}' : body;
      }
      case 'nderiv': return "\\left(" + tex(n.a) + "\\right)'";
      case 'int': return '\\int_{' + tex(n.lo) + '}^{' + tex(n.hi) + '} ' + wrap(strip(n.a), 1.5) + '\\,d' + varTex(n.v);
      case 'lim': return '\\lim_{' + varTex(n.v) + '\\to ' + tex(n.to) + (n.side ? '^{' + (n.side > 0 ? '+' : '-') + '}' : '') + '} ' + wrap(strip(n.a), 2);
      case 'tangent': return '\\operatorname{tangent}\\left(' + tex(strip(n.a)) + ',\\ ' + varTex(n.v) + '=' + tex(n.at) + '\\right)';
      case 'call':
        if (n.f === 'sqrt') return '\\sqrt{' + tex(strip(n.a)) + '}';
        if (n.f === 'abs') return '\\left|' + tex(strip(n.a)) + '\\right|';
        if (n.f === 'exp') return 'e^{' + tex(strip(n.a)) + '}';
        return (['asin', 'acos', 'atan'].includes(n.f) ? '\\' + n.f.slice(1).replace(/^/, 'arc') : '\\' + n.f) + argTex(n.a);
    }
    return '';
  }
  function argTex(a) {
    const s = strip(a);
    if (a.k === 'grp' && !(s.k === 'num' || s.k === 'var' || s.k === 'deg')) return '\\left(' + tex(s) + '\\right)';
    return ' ' + wrap(s, 3);
  }
  function wrap(n, p) {
    const t = tex(n);
    return prec(n) < p && n.k !== 'grp' ? '\\left(' + t + '\\right)' : t;
  }
  const REL_TEX = { '=': '=', '<': '<', '>': '>', '<=': '\\le', '>=': '\\ge' };
  function toLatex(stmt) {
    let s = '';
    stmt.sides.forEach((side, i) => { s += tex(side); if (i < stmt.rels.length) s += ' ' + REL_TEX[stmt.rels[i]] + ' '; });
    return s.trim();
  }

  // ---------- number formatting ----------
  function fmt(v) {
    if (!isFinite(v)) return isNaN(v) ? '\\text{undefined}' : (v > 0 ? '\\infty' : '-\\infty');
    if (Math.abs(v - Math.round(v)) < 1e-9) return String(Math.round(v));
    // try simple fractions
    for (let d = 2; d <= 12; d++) {
      const n = v * d;
      if (Math.abs(n - Math.round(n)) < 1e-9) return (n < 0 ? '-' : '') + '\\tfrac{' + Math.abs(Math.round(n)) + '}{' + d + '}';
    }
    // multiples of sqrt
    for (const r of [2, 3, 5, 6, 7]) {
      const q = v / Math.sqrt(r);
      if (Math.abs(q - Math.round(q)) < 1e-9 && Math.abs(Math.round(q)) < 50) {
        const c = Math.round(q);
        return (c === 1 ? '' : c === -1 ? '-' : c) + '\\sqrt{' + r + '}';
      }
    }
    const q = v / Math.PI;
    if (Math.abs(q * 12 - Math.round(q * 12)) < 1e-9 && Math.abs(q) < 20) {
      const n = Math.round(q * 12), g = gcd(Math.abs(n), 12), num = n / g, den = 12 / g;
      const numS = num === 1 ? '' : num === -1 ? '-' : num;
      return den === 1 ? numS + '\\pi' : (num < 0 ? '-' : '') + '\\tfrac{' + (Math.abs(num) === 1 ? '' : Math.abs(num)) + '\\pi}{' + den + '}';
    }
    return (+v.toPrecision(6)).toString();
  }
  function fmtApprox(v) {
    const exact = fmt(v);
    const plain = (+v.toPrecision(5)).toString();
    return exact === plain || /^-?\d+$/.test(exact) ? exact : exact + ' \\approx ' + plain;
  }
  function gcd(a, b) { return b ? gcd(b, a % b) : a; }

  // ---------- Solver (1 unknown) ----------
  function solve(stmt, v) {
    const L = stmt.sides[0], R = stmt.sides[1];
    const f = x => { const env = {}; env[v] = x; return evaluate(L, env) - evaluate(R, env); };
    const roots = [];
    const lo = -100, hi = 100, N = 4000, h = (hi - lo) / N;
    let px = lo, py = f(lo);
    for (let i = 1; i <= N; i++) {
      const x = lo + i * h, y = f(x);
      if (isFinite(py) && isFinite(y)) {
        if (py === 0) pushRoot(px);
        else if (py * y < 0) {
          let a = px, b = x, fa = py;
          for (let k = 0; k < 80; k++) { const m = (a + b) / 2, fm = f(m); if (fa * fm <= 0) b = m; else { a = m; fa = fm; } }
          const r = (a + b) / 2;
          if (Math.abs(f(r)) < 1e-6) pushRoot(r);
        } else if (i > 1) {
          // touch roots (double roots): local min of |f| near zero
          const mx = px, my = Math.abs(py);
          if (my < 1e-3) pushRoot(refineMin(f, mx - h, mx + h));
        }
      }
      px = x; py = y;
    }
    function pushRoot(r) {
      const rr = Math.abs(r - Math.round(r * 1e6) / 1e6) < 1e-7 ? Math.round(r * 1e6) / 1e6 : r;
      if (!roots.some(q => Math.abs(q - rr) < 1e-5)) roots.push(rr);
    }
    return roots.sort((a, b) => a - b);
  }
  function refineMin(f, a, b) {
    for (let k = 0; k < 60; k++) {
      const m1 = a + (b - a) / 3, m2 = b - (b - a) / 3;
      if (Math.abs(f(m1)) < Math.abs(f(m2))) b = m2; else a = m1;
    }
    return (a + b) / 2;
  }

  /** Classify a parsed statement into something "smart" the board can do with it. */
  function analyze(src) {
    const stmt = parse(src);
    const res = { stmt, latex: toLatex(stmt) };
    const nonEmpty = stmt.sides.filter(Boolean);
    const vars = new Set(); nonEmpty.forEach(s => freeVars(s, vars));
    res.vars = [...vars];
    // "expr =" → evaluate
    if (stmt.rels.length >= 1 && stmt.sides[stmt.sides.length - 1] === null && stmt.rels[stmt.rels.length - 1] === '=') {
      const lhs = stmt.sides[stmt.sides.length - 2];
      if (lhs && freeVars(lhs).size === 0) {
        res.kind = 'evaluate'; res.value = evaluate(lhs); res.resultTex = fmtApprox(res.value); return res;
      }
    }
    if (stmt.rels.length === 0 && nonEmpty.length === 1 && hasCalc(stmt.sides[0])) {
      const top = strip(stmt.sides[0]);
      res.calc = true;
      if (top.k === 'tangent') { const st = calcSteps(src); res.kind = 'tangent'; res.resultTex = st.resultTex; res.tangent = st; return res; }
      if (vars.size === 0) {
        res.kind = 'evaluate'; res.latex += ' = ';
        if (top.k === 'lim') { const st = calcSteps(src); res.resultTex = st.resultTex; res.value = evaluate(top); return res; }
        res.value = evaluate(stmt.sides[0]); res.resultTex = fmtApprox(snapValue(res.value)); return res;
      }
      if (top.k === 'diff' && !top.at) {
        res.kind = 'derivative'; const d = derivative(top.a, top.v, top.order);
        res.derivAst = d; res.derivAscii = toAscii(d); res.resultTex = tex(d); res.plotVar = top.v;
        res.fn = x => { const e = {}; e[top.v] = x; return evaluate(d, e); }; return res;
      }
    }
    if (stmt.rels.length >= 1 && stmt.sides[stmt.sides.length - 1] === null && hasCalc(stmt.sides[0])) res.calc = true;
    if (stmt.rels.length === 0 && nonEmpty.length === 1 && vars.size === 0) {
      res.kind = 'value'; res.value = evaluate(stmt.sides[0]); res.resultTex = fmtApprox(res.value); return res;
    }
    if (stmt.rels.length === 1 && stmt.rels[0] === '=' && stmt.sides[0] && stmt.sides[1]) {
      const L = stmt.sides[0], R = stmt.sides[1];
      const isY = n => n.k === 'var' && n.v === 'y';
      const isFx = n => n.k === 'bin' && n.op === 'imp' && n.a.k === 'var' && n.a.v === 'f' && n.b.k === 'grp' && n.b.a.k === 'var' && n.b.a.v === 'x';
      const rv = freeVars(R);
      if ((isY(L) || isFx(L)) && [...rv].every(v => v === 'x')) {
        res.kind = 'function'; res.fn = x => evaluate(R, { x }); res.exprTex = tex(R); return res;
      }
      if (vars.size === 2 && vars.has('x') && vars.has('y')) {
        res.kind = 'relation'; res.F = residual(src); return res;
      }
      if (vars.size === 1) {
        const v = [...vars][0];
        const roots = solve(stmt, v);
        res.kind = 'equation'; res.variable = v; res.roots = roots;
        res.resultTex = roots.length ? varTex(v) + (roots.length > 1 ? '\\in\\{' + roots.map(fmt).join(',\\ ') + '\\}' : ' = ' + fmtApprox(roots[0])) : '\\text{no real solution}';
        return res;
      }
    }
    if (stmt.rels.length === 0 && vars.size === 1 && vars.has('x')) {
      res.kind = 'function'; res.fn = x => evaluate(stmt.sides[0], { x }); res.exprTex = tex(stmt.sides[0]); return res;
    }
    res.kind = 'expression';
    return res;
  }


  // =====================================================================
  // ---------- Calculus: symbolic derivatives, simplification, numerics ----------
  // =====================================================================
  const N = v => ({ k: 'num', v }), V = v => ({ k: 'var', v });
  const add = (a, b) => ({ k: 'bin', op: '+', a, b }), sub = (a, b) => ({ k: 'bin', op: '-', a, b });
  const mul = (a, b) => ({ k: 'bin', op: '*', a, b }), dvd = (a, b) => ({ k: 'bin', op: '/', a, b });
  const pw = (a, b) => ({ k: 'pow', a, b }), ng = a => ({ k: 'neg', a }), fn = (f, a) => ({ k: 'call', f, a });
  const dep = (n, v) => freeVars(n).has(v);

  function D(n, v) {
    switch (n.k) {
      case 'num': return N(0);
      case 'var': return N(n.v === v ? 1 : 0);
      case 'grp': return D(n.a, v);
      case 'neg': return ng(D(n.a, v));
      case 'deg': return dvd(mul(V('π'), D(n.a, v)), N(180));
      case 'bin': {
        const a = n.a, b = n.b;
        if (n.op === '+') return add(D(a, v), D(b, v));
        if (n.op === '-') return sub(D(a, v), D(b, v));
        if (n.op === '/') { if (!dep(b, v)) return dvd(D(a, v), b); return dvd(sub(mul(D(a, v), b), mul(a, D(b, v))), pw(b, N(2))); }
        if (!dep(a, v)) return mul(a, D(b, v));
        if (!dep(b, v)) return mul(D(a, v), b);
        return add(mul(D(a, v), b), mul(a, D(b, v)));
      }
      case 'pow': {
        const a = n.a, b = n.b, da = dep(a, v), db = dep(b, v);
        if (!da && !db) return N(0);
        if (!db) return mul(mul(b, pw(a, sub(b, N(1)))), D(a, v));
        if (!da) return mul(mul(pw(a, b), fn('ln', a)), D(b, v));
        return mul(pw(a, b), add(mul(D(b, v), fn('ln', a)), dvd(mul(b, D(a, v)), a)));
      }
      case 'call': {
        const u = n.a, du = D(u, v);
        switch (n.f) {
          case 'sin': return mul(fn('cos', u), du);
          case 'cos': return ng(mul(fn('sin', u), du));
          case 'tan': return dvd(du, pw(fn('cos', u), N(2)));
          case 'ln': return dvd(du, u);
          case 'log': return dvd(du, mul(u, fn('ln', N(10))));
          case 'exp': return mul(fn('exp', u), du);
          case 'sqrt': return dvd(du, mul(N(2), fn('sqrt', u)));
          case 'abs': return mul(dvd(u, fn('abs', u)), du);
          case 'asin': return dvd(du, fn('sqrt', sub(N(1), pw(u, N(2)))));
          case 'acos': return ng(dvd(du, fn('sqrt', sub(N(1), pw(u, N(2))))));
          case 'atan': return dvd(du, add(N(1), pw(u, N(2))));
        }
        break;
      }
      case 'diff': return D(n.at ? n : derivative(n.a, n.v, n.order), v);
    }
    if (!dep(n, v)) return N(0);
    return { k: 'nderiv', a: n, v };
  }
  /** n-th derivative, simplified */
  function derivative(n, v, order = 1) {
    let r = n;
    for (let i = 0; i < order; i++) r = simplify(D(r, v));
    return r;
  }

  // ---------- simplifier ----------
  const isNum = n => n && n.k === 'num';
  const key = n => toAscii(n);
  function niceNum(v) { // snap floating noise to exact-looking values
    if (!isFinite(v)) return v;
    const r = Math.round(v); if (Math.abs(v - r) < 1e-10) return r;
    const q = rational(v, 1000); return q ? q.p / q.q : v;
  }
  function simplify(n) { let a = n, b; for (let i = 0; i < 4; i++) { b = S(a); if (key(b) === key(a)) return b; a = b; } return a; }
  function S(n) {
    switch (n.k) {
      case 'num': case 'var': return n;
      case 'grp': return S(n.a);
      case 'neg': { const a = S(n.a); if (isNum(a)) return N(-a.v); if (a.k === 'neg') return a.a; return simplifyProduct([N(-1), a]); }
      case 'deg': return { k: 'deg', a: S(n.a) };
      case 'pow': {
        const a = S(n.a), b = S(n.b);
        if (isNum(b) && b.v === 0) return N(1);
        if (isNum(b) && b.v === 1) return a;
        if (isNum(a) && a.v === 1) return N(1);
        if (isNum(a) && isNum(b)) { const r = Math.pow(a.v, b.v); if (isFinite(r) && Math.abs(r - Math.round(r)) < 1e-12) return N(Math.round(r)); }
        if (a.k === 'pow' && isNum(a.b) && isNum(b)) return S(pw(a.a, N(a.b.v * b.v)));
        if (a.k === 'call' && a.f === 'sqrt' && isNum(b) && b.v === 2) return a.a;
        return pw(a, b);
      }
      case 'call': {
        const a = S(n.a);
        if (isNum(a) || freeVars(a).size === 0) { try { const r = evaluate(fn(n.f, a)); if (Math.abs(r - Math.round(r)) < 1e-12) return N(Math.round(r)); } catch (e) { /* keep */ } }
        if (n.f === 'ln' && a.k === 'call' && a.f === 'exp') return a.a;
        if (n.f === 'exp' && a.k === 'call' && a.f === 'ln') return a.a;
        return fn(n.f, a);
      }
      case 'bin': {
        if (n.op === '+' || n.op === '-') return simplifySum(n);
        if (n.op === '/') {
          const a = S(n.a), b = S(n.b);
          if (isNum(b) && b.v === 1) return a;
          if (isNum(a) && a.v === 0) return N(0);
          if (isNum(a) && isNum(b)) return N(niceNum(a.v / b.v));
          if (key(a) === key(b)) return N(1);
          if (a.k === 'neg') return S(ng(dvd(a.a, b)));
          if (isNum(a) && a.v < 0) return ng(dvd(N(-a.v), b));
          const pa = productParts(a);
          if (pa.coef < 0) return ng(dvd(rebuildProduct(-pa.coef, pa.factors), b));
          return dvd(a, b);
        }
        return simplifyProduct([n.a, n.b]);
      }
    }
    return n;
  }
  function productParts(n) { // → {coef, factors:[node]}
    let coef = 1; const factors = [];
    const walk = m => {
      if (m.k === 'grp') return walk(m.a);
      if (m.k === 'bin' && (m.op === '*' || m.op === 'imp')) { walk(m.a); walk(m.b); return; }
      if (m.k === 'neg') { coef = -coef; walk(m.a); return; }
      if (isNum(m)) { coef *= m.v; return; }
      if (m.k === 'bin' && m.op === '/' && isNum(m.b)) { coef /= m.b.v; walk(m.a); return; }
      factors.push(m);
    };
    walk(n); return { coef: niceNum(coef), factors };
  }
  function simplifyProduct(list) {
    let coef = 1; const parts = [];
    list.forEach(x => { const s = S(x); const p = productParts(s); coef *= p.coef; parts.push(...p.factors); });
    coef = niceNum(coef);
    if (coef === 0) return N(0);
    // combine equal bases: x · x^2 → x^3
    const bases = [];
    parts.forEach(f => {
      const base = f.k === 'pow' && isNum(f.b) ? f.a : f, e = f.k === 'pow' && isNum(f.b) ? f.b.v : (f.k === 'pow' ? null : 1);
      if (e === null) { bases.push({ base: f, e: null }); return; }
      const k = key(base), ex = bases.find(b => b.e !== null && key(b.base) === k);
      if (ex) ex.e += e; else bases.push({ base, e });
    });
    const factors = bases.filter(b => b.e !== 0).map(b => (b.e === null ? b.base : b.e === 1 ? b.base : S(pw(b.base, N(b.e)))));
    // textbook order: polynomial-ish factors first, functions last
    const rank = f => (f.k === 'var' || (f.k === 'pow' && f.a.k === 'var') ? 0 : f.k === 'call' || (f.k === 'pow' && f.a.k === 'call') ? 2 : 1);
    factors.sort((a, b) => rank(a) - rank(b));
    return rebuildProduct(coef, factors);
  }
  function rebuildProduct(coef, factors) {
    if (!factors.length) return N(coef);
    let body = factors.reduce((acc, f) => (acc ? { k: 'bin', op: 'imp', a: acc, b: f } : f), null);
    if (coef === 1) return body;
    if (coef === -1) return ng(body);
    return { k: 'bin', op: 'imp', a: N(coef), b: body };
  }
  function simplifySum(n) {
    const terms = [];
    const walk = (m, sign) => {
      if (m.k === 'grp') return walk(m.a, sign);
      if (m.k === 'bin' && m.op === '+') { walk(m.a, sign); walk(m.b, sign); return; }
      if (m.k === 'bin' && m.op === '-') { walk(m.a, sign); walk(m.b, -sign); return; }
      const s = S(m);
      if (s.k === 'bin' && (s.op === '+' || s.op === '-')) { walk(s, sign); return; }
      const p = productParts(s);
      terms.push({ coef: p.coef * sign, factors: p.factors });
    };
    walk(n, 1);
    const combined = [];
    terms.forEach(t => {
      const k = t.factors.map(key).sort().join('·');
      const ex = combined.find(c => c.k === k);
      if (ex) ex.coef = niceNum(ex.coef + t.coef); else combined.push({ k, coef: niceNum(t.coef), factors: t.factors });
    });
    const live = combined.filter(c => Math.abs(c.coef) > 1e-12);
    if (!live.length) return N(0);
    // constants last
    live.sort((a, b) => (a.factors.length ? 0 : 1) - (b.factors.length ? 0 : 1));
    let out = null;
    live.forEach(c => {
      const mag = rebuildProduct(Math.abs(c.coef), c.factors);
      if (!out) out = c.coef < 0 ? (isNum(mag) ? N(-mag.v) : ng(mag)) : mag;
      else out = c.coef < 0 ? sub(out, mag) : add(out, mag);
    });
    return out;
  }

  // ---------- ASCII printer (used for keys, plotting and re-parsing) ----------
  function toAscii(n) {
    if (!n) return '';
    const P = m => (['num', 'var', 'call', 'grp', 'diff', 'tangent'].includes(m.k) ? toAscii(m) : '(' + toAscii(m) + ')');
    switch (n.k) {
      case 'num': { if (!isFinite(n.v)) return n.v > 0 ? '∞' : '-∞'; const r = rational(n.v, 1000); if (r && r.q !== 1) return '(' + r.p + '/' + r.q + ')'; return String(+n.v.toPrecision(12)); }
      case 'var': return n.v;
      case 'grp': return '(' + toAscii(n.a) + ')';
      case 'neg': return '-' + P(n.a);
      case 'deg': return P(n.a) + '°';
      case 'fact': return P(n.a) + '!';
      case 'pow': return P(n.a) + '^' + P(n.b);
      case 'bin': {
        if (n.op === '+') return toAscii(n.a) + '+' + toAscii(n.b);
        if (n.op === '-') return toAscii(n.a) + '-' + (n.b.k === 'bin' && (n.b.op === '+' || n.b.op === '-') ? '(' + toAscii(n.b) + ')' : toAscii(n.b));
        const wrapS = m => (m.k === 'bin' && (m.op === '+' || m.op === '-') ? '(' + toAscii(m) + ')' : toAscii(m));
        if (n.op === '/') return P(n.a) + '/' + P(n.b);
        return wrapS(n.a) + '*' + wrapS(n.b);
      }
      case 'call': return n.f + '(' + toAscii(n.a) + ')';
      case 'diff': return 'diff(' + toAscii(n.a) + ', ' + (n.at ? n.v + '=' + toAscii(n.at) : n.v) + (n.order > 1 ? ', ' + n.order : '') + ')';
      case 'nderiv': return 'diff(' + toAscii(n.a) + ', ' + n.v + ')';
      case 'int': return 'int(' + toAscii(n.a) + ', ' + n.v + ', ' + toAscii(n.lo) + ', ' + toAscii(n.hi) + ')';
      case 'lim': return 'lim(' + toAscii(n.a) + ', ' + n.v + '→' + toAscii(n.to) + (n.side ? (n.side > 0 ? '+' : '-') : '') + ')';
      case 'tangent': return 'tangent(' + toAscii(n.a) + ', ' + n.v + '=' + toAscii(n.at) + ')';
    }
    return '?';
  }

  // ---------- numeric integration (adaptive Simpson; infinite limits by substitution) ----------
  function integrate(f, a, b) {
    if (a === b) return 0;
    if (a > b) return -integrate(f, b, a);
    if (!isFinite(a) && !isFinite(b)) return integrate(f, -Infinity, 0) + integrate(f, 0, Infinity);
    if (!isFinite(b)) return integrate(t => { const x = a + t / (1 - t); return f(x) / ((1 - t) * (1 - t)); }, 0, 1 - 1e-12);
    if (!isFinite(a)) return integrate(t => { const x = b - (1 - t) / t; return f(x) / (t * t); }, 1e-12, 1);
    const F = x => { let y = f(x); if (!isFinite(y)) { const e = 1e-9 * (1 + Math.abs(x)); y = (f(x + e) + f(x - e)) / 2; if (!isFinite(y)) y = f(x + e); } return y; };
    const simpson = (a, b, fa, fm, fb) => (b - a) / 6 * (fa + 4 * fm + fb);
    let evals = 0;
    const rec = (a, b, fa, fm, fb, whole, eps, depth) => {
      const m = (a + b) / 2, lm = (a + m) / 2, rm = (m + b) / 2, flm = F(lm), frm = F(rm); evals += 2;
      const left = simpson(a, m, fa, flm, fm), right = simpson(m, b, fm, frm, fb);
      if (depth <= 0 || evals > 200000 || Math.abs(left + right - whole) <= 15 * eps) return left + right + (left + right - whole) / 15;
      return rec(a, m, fa, flm, fm, left, eps / 2, depth - 1) + rec(m, b, fm, frm, fb, right, eps / 2, depth - 1);
    };
    // split into pieces so narrow features are not missed
    const pieces = 16, h = (b - a) / pieces; let sum = 0;
    for (let i = 0; i < pieces; i++) {
      const x0 = a + i * h, x1 = x0 + h, f0 = F(x0), f1 = F(x1), fm = F((x0 + x1) / 2);
      sum += rec(x0, x1, f0, fm, f1, simpson(x0, x1, f0, fm, f1), 1e-11, 40);
    }
    return Math.abs(sum) < 1e-13 ? 0 : sum;
  }

  // ---------- numeric limits (Richardson / Neville extrapolation from both sides) ----------
  function oneSided(f, a, dir) {
    // sample f at a + dir·h for shrinking h; for a = ±∞ substitute x = ±1/h
    const at = h => (isFinite(a) ? f(a + dir * h) : f((a > 0 ? 1 : -1) / h));
    const hs = [], ys = [];
    for (let k = 0; k < 12; k++) { const h = 0.05 / Math.pow(2, k); const y = at(h); if (isFinite(y)) { hs.push(h); ys.push(y); } }
    if (ys.length < 4) {
      // maybe it blows up
      const big = [1e-3, 1e-4, 1e-5, 1e-6].map(at);
      if (big.every(y => !isFinite(y) || Math.abs(y) > 1e6)) { const s = Math.sign(big.find(isFinite) || big[0] || 1); return { value: s * Infinity }; }
      return { value: NaN };
    }
    const last = ys.slice(-5), growing = last.every((y, i) => i === 0 || Math.abs(y) > Math.abs(last[i - 1]) * 1.3);
    if (growing && Math.abs(last[last.length - 1]) > 1e3) return { value: Math.sign(last[last.length - 1]) * Infinity };
    // oscillation check (e.g. sin(1/x))
    const tail = ys.slice(-6); const spread = Math.max(...tail) - Math.min(...tail);
    // Neville extrapolation to h = 0 using the last 6 points
    const H = hs.slice(-6), Y = ys.slice(-6), P = Y.slice();
    for (let m = 1; m < P.length; m++) for (let i = P.length - 1; i >= m; i--) P[i] = ((0 - H[i - m]) * P[i] - (0 - H[i]) * P[i - 1]) / (H[i] - H[i - m]);
    const est = P[P.length - 1], est2 = (() => { const Q = Y.slice(0, 5), G = H.slice(0, 5); for (let m = 1; m < Q.length; m++) for (let i = Q.length - 1; i >= m; i--) Q[i] = (-G[i - m] * Q[i] + G[i] * Q[i - 1]) / (G[i] - G[i - m]); return Q[Q.length - 1]; })();
    const scale = 1 + Math.abs(est);
    if (spread > 0.5 * scale && Math.abs(est - est2) > 1e-3 * scale) return { value: NaN, oscillates: true };
    return { value: snapValue(est), raw: est };
  }
  function snapValue(v) {
    if (!isFinite(v)) return v;
    const tol = 1e-6 * (1 + Math.abs(v));
    const r = Math.round(v); if (Math.abs(v - r) < tol) return r;
    const q = rational(v, 200) || (() => { for (let d = 2; d <= 200; d++) { const n = Math.round(v * d); if (Math.abs(v - n / d) < tol) return { p: n, q: d }; } return null; })();
    if (q && Math.abs(v - q.p / q.q) < tol) return q.p / q.q;
    for (const c of [Math.PI, Math.E, Math.SQRT2, Math.sqrt(3), Math.LN2]) for (let d = 1; d <= 12; d++) { const n = Math.round(v * d / c); if (n && Math.abs(v - n * c / d) < tol) return n * c / d; }
    return +v.toPrecision(10);
  }
  function limit(f, a, side) {
    if (!isFinite(a)) { const r = oneSided(f, a, 0); return { value: r.value, left: r.value, right: r.value }; }
    const R = side >= 0 ? oneSided(f, a, 1) : null, L = side <= 0 ? oneSided(f, a, -1) : null;
    if (side > 0) return { value: R.value, right: R.value };
    if (side < 0) return { value: L.value, left: L.value };
    const same = (x, y) => (x === y) || (isFinite(x) && isFinite(y) && Math.abs(x - y) < 1e-5 * (1 + Math.abs(x)));
    return { value: same(L.value, R.value) ? R.value : NaN, left: L.value, right: R.value, dne: !same(L.value, R.value) };
  }

  // ---------- step-by-step explanations ----------
  const DT = (v, inner) => '\\frac{d}{d' + varTex(v) + '}\\left[' + inner + '\\right]';
  function derivSteps(n, v) {
    const steps = []; const seen = new Set();
    const T = m => tex(simplify(m));
    const visit = (m, depth) => {
      if (steps.length > 14 || depth > 6) return;
      m = m.k === 'grp' ? m.a : m;
      if (!dep(m, v) || m.k === 'var' || m.k === 'num') return;
      const k = key(m); if (seen.has(k)) return; seen.add(k);
      const lhs = DT(v, tex(m));
      const res = T(D(m, v));
      if (m.k === 'bin' && (m.op === '+' || m.op === '-')) {
        steps.push({ text: T('Sum rule — differentiate term by term'), tex: lhs + ' = ' + DT(v, tex(m.a)) + (m.op === '+' ? ' + ' : ' - ') + DT(v, tex(m.b)) });
        visit(m.a, depth + 1); visit(m.b, depth + 1); return;
      }
      if (m.k === 'neg') { visit(m.a, depth); return; }
      if (m.k === 'bin' && m.op === '/') {
        if (!dep(m.b, v)) { steps.push({ text: T('Constant denominator'), tex: lhs + ' = \\frac{1}{' + tex(m.b) + '}' + DT(v, tex(m.a)) + ' = ' + res }); visit(m.a, depth + 1); return; }
        steps.push({ text: T('Quotient rule: (u/v)′ = (u′v − uv′)/v²'), tex: 'u = ' + tex(m.a) + ',\\quad v = ' + tex(m.b) + ',\\quad u\' = ' + T(D(m.a, v)) + ',\\quad v\' = ' + T(D(m.b, v)) });
        steps.push({ text: T('So'), tex: lhs + ' = ' + res }); visit(m.a, depth + 1); visit(m.b, depth + 1); return;
      }
      if (m.k === 'bin') {
        if (!dep(m.a, v) || !dep(m.b, v)) { const c = dep(m.a, v) ? m.b : m.a, u = dep(m.a, v) ? m.a : m.b; steps.push({ text: T('Constant multiple rule'), tex: lhs + ' = ' + tex(c) + '\\cdot ' + DT(v, tex(u)) + ' = ' + res }); visit(u, depth + 1); return; }
        steps.push({ text: T('Product rule: (uv)′ = u′v + uv′'), tex: 'u = ' + tex(m.a) + ',\\quad v = ' + tex(m.b) + ',\\quad u\' = ' + T(D(m.a, v)) + ',\\quad v\' = ' + T(D(m.b, v)) });
        steps.push({ text: T('So'), tex: lhs + ' = ' + res }); visit(m.a, depth + 1); visit(m.b, depth + 1); return;
      }
      if (m.k === 'pow') {
        const base = m.a.k === 'grp' ? m.a.a : m.a;
        if (!dep(m.b, v)) {
          const chain = !(base.k === 'var' && base.v === v);
          steps.push({ text: chain ? 'Power rule with the chain rule: (uⁿ)′ = n·uⁿ⁻¹·u′' : 'Power rule: (xⁿ)′ = n·xⁿ⁻¹', tex: lhs + ' = ' + res });
          if (chain) visit(base, depth + 1); return;
        }
        steps.push({ text: dep(base, v) ? 'Variable exponent: write uᵛ = e^{v·ln u} and differentiate' : 'Exponential rule: (aᵘ)′ = aᵘ·ln a·u′', tex: lhs + ' = ' + res }); return;
      }
      if (m.k === 'call') {
        const NAMES = { sin: 'sin′ = cos', cos: 'cos′ = −sin', tan: 'tan′ = 1/cos²', ln: 'ln′(u) = 1/u', log: 'log′(u) = 1/(u ln 10)', exp: '(eᵘ)′ = eᵘ', sqrt: '(√u)′ = 1/(2√u)', abs: '|u|′ = u/|u|', asin: 'arcsin′ = 1/√(1−u²)', acos: 'arccos′ = −1/√(1−u²)', atan: 'arctan′ = 1/(1+u²)' };
        const inner = m.a.k === 'grp' ? m.a.a : m.a, chain = !(inner.k === 'var' && inner.v === v);
        steps.push({ text: (NAMES[m.f] || m.f) + (chain ? T(', times the inner derivative (chain rule)') : ''), tex: lhs + ' = ' + res });
        if (chain) visit(inner, depth + 1); return;
      }
      steps.push({ text: T('Differentiate'), tex: lhs + ' = ' + res });
    };
    visit(n, 0);
    return steps;
  }

  /** Explain a calculus expression step by step: {title, steps:[{text, tex}], resultTex} */
  function calcSteps(src) {
    const st = parse(src);
    let node = st.sides.length === 1 ? st.sides[0] : (st.sides[1] && st.sides[0] && st.sides[0].k === 'var' ? st.sides[1] : st.sides[0]);
    if (!node) throw new Error('Nothing to explain');
    const find = m => { if (!m) return null; if (['diff', 'int', 'lim', 'tangent'].includes(m.k)) return m; return find(m.a) || find(m.b); };
    const c = find(node) || node;
    const out = { steps: [] };
    const num = v => fmtApprox(v);
    if (c.k === 'diff') {
      out.title = 'Derivative';
      out.steps.push({ text: T('Differentiate with respect to {v}', { v: c.v }), tex: tex(c) });
      let cur = c.a;
      for (let o = 1; o <= c.order; o++) {
        if (c.order > 1) out.steps.push({ text: o === 1 ? T('First derivative') : o === 2 ? T('Second derivative') : T('Derivative of order {n}', { n: o }), tex: '' });
        out.steps.push(...derivSteps(cur, c.v));
        cur = simplify(D(cur, c.v));
        out.steps.push({ text: T('Simplify'), tex: (c.order > 1 ? "f^{(" + o + ")}" : "f'") + '(' + varTex(c.v) + ') = ' + tex(cur) });
      }
      if (c.at) { const a = evaluate(c.at); const e = {}; e[c.v] = a; const val = evaluate(cur, e); out.steps.push({ text: T('Evaluate at {v} = {a}', { v: c.v, a: toAscii(c.at) }), tex: (c.order > 1 ? "f^{(" + c.order + ")}" : "f'") + '(' + tex(c.at) + ') = ' + num(val) }); out.resultTex = num(val); }
      else out.resultTex = tex(cur);
      return out;
    }
    if (c.k === 'tangent') {
      out.title = 'Tangent line';
      const a = evaluate(c.at), e = {}; e[c.v] = a;
      const d1 = derivative(c.a, c.v), fa = evaluate(c.a, e), m = evaluate(d1, e);
      out.steps.push({ text: T('The point on the curve'), tex: 'f(' + tex(c.at) + ') = ' + num(fa) + '\\quad\\Rightarrow\\quad P\\left(' + fmt(a) + ',\\ ' + fmt(fa) + '\\right)' });
      out.steps.push({ text: T('The derivative gives the slope'), tex: "f'(" + varTex(c.v) + ') = ' + tex(d1) });
      out.steps.push({ text: T('Slope at the point'), tex: "m = f'(" + tex(c.at) + ') = ' + num(m) });
      out.steps.push({ text: T('Point–slope form y − f(a) = m(x − a)'), tex: 'y - ' + wrapNum(fa) + ' = ' + wrapNum(m) + '\\left(x - ' + wrapNum(a) + '\\right)' });
      const line = lineTex(m, fa - m * a);
      out.steps.push({ text: T('Tangent line'), tex: line });
      out.resultTex = line; out.slope = m; out.point = { x: a, y: fa }; out.lineAscii = lineAscii(m, fa - m * a); out.fAscii = toAscii(c.a);
      return out;
    }
    if (c.k === 'lim') {
      out.title = 'Limit';
      const to = evaluate(c.to), f = x => { const e = {}; e[c.v] = x; return evaluate(c.a, e); };
      const r = limit(f, to, c.side);
      let direct = NaN; try { direct = isFinite(to) ? f(to) : NaN; } catch (e) { /* */ }
      if (isFinite(to) && isFinite(direct) && isFinite(r.value) && Math.abs(direct - r.value) < 1e-6 * (1 + Math.abs(direct))) {
        out.steps.push({ text: T('Direct substitution works (the function is continuous there)'), tex: tex(c) + ' = ' + num(r.value) });
      } else {
        if (isFinite(to)) out.steps.push({ text: T('Direct substitution fails'), tex: 'f(' + tex(c.to) + ') = ' + (isFinite(direct) ? num(direct) : isNaN(direct) ? '\\tfrac{0}{0}\\ \\text{(indeterminate)}' : '\\pm\\infty') });
        const rows = []; const show = y => (isFinite(y) ? (+y.toPrecision(7)).toString() : y > 0 ? '\\infty' : y < 0 ? '-\\infty' : '\\text{—}');
        if (isFinite(to)) {
          [0.1, 0.01, 0.001, 0.0001].forEach(h => rows.push([fmtX(to - h), show(f(to - h)), fmtX(to + h), show(f(to + h))]));
          out.steps.push({ text: T('Approach from both sides'), tex: '\\begin{array}{c|c||c|c}' + varTex(c.v) + '\\to ' + tex(c.to) + '^{-} & f & ' + varTex(c.v) + '\\to ' + tex(c.to) + '^{+} & f \\\\ \\hline ' + rows.map(r => r.join(' & ')).join(' \\\\ ') + '\\end{array}' });
        } else {
          [10, 100, 1000, 1e4, 1e6].forEach(X => rows.push([fmtX(to > 0 ? X : -X), show(f(to > 0 ? X : -X))]));
          out.steps.push({ text: T('Let {v} grow without bound', { v: c.v }), tex: '\\begin{array}{c|c}' + varTex(c.v) + ' & f(' + varTex(c.v) + ')\\\\ \\hline ' + rows.map(r => r.join(' & ')).join(' \\\\ ') + '\\end{array}' });
        }
      }
      if (r.dne) { out.resultTex = '\\text{does not exist}'; out.steps.push({ text: T('The two one-sided limits differ'), tex: '\\lim_{' + varTex(c.v) + '\\to ' + tex(c.to) + '^-} = ' + fmt(r.left) + ',\\qquad \\lim_{' + varTex(c.v) + '\\to ' + tex(c.to) + '^+} = ' + fmt(r.right) }); }
      else if (isNaN(r.value)) { out.resultTex = '\\text{does not exist}'; out.steps.push({ text: T('The values keep oscillating — no single limit'), tex: '' }); }
      else { out.resultTex = fmt(r.value); out.steps.push({ text: T('The values approach'), tex: tex(c) + ' = ' + num(r.value) }); }
      return out;
    }
    if (c.k === 'int') {
      out.title = 'Definite integral';
      const lo = evaluate(c.lo), hi = evaluate(c.hi), f = x => { const e = {}; e[c.v] = x; return evaluate(c.a, e); };
      const val = integrate(f, lo, hi);
      out.steps.push({ text: T('The integral is the signed area between the curve and the axis'), tex: tex(c) });
      if (isFinite(lo) && isFinite(hi)) {
        const rows = [4, 16, 64, 256].map(n => { const h = (hi - lo) / n; let m = 0; for (let i = 0; i < n; i++) m += f(lo + (i + 0.5) * h); return [n, (+(m * h).toPrecision(8)).toString()]; });
        out.steps.push({ text: T('Midpoint Riemann sums with n rectangles get closer and closer'), tex: '\\begin{array}{r|l} n & \\sum f(x_i)\\,\\Delta x \\\\ \\hline ' + rows.map(r => r.join(' & ')).join(' \\\\ ') + '\\end{array}' });
      }
      out.steps.push({ text: T('Adaptive Simpson’s rule (accurate to about 10 digits)'), tex: tex(c) + ' = ' + num(snapValue(val)) });
      out.resultTex = num(snapValue(val));
      return out;
    }
    out.title = 'Value'; out.resultTex = num(evaluate(node)); out.steps.push({ text: T('Evaluate'), tex: tex(node) + ' = ' + out.resultTex });
    return out;
  }
  function fmtX(x) { return (+x.toPrecision(6)).toString(); }
  function wrapNum(v) { const t = fmt(v); return v < 0 ? '\\left(' + t + '\\right)' : t; }
  function lineTex(m, b) {
    m = snapValue(m); b = snapValue(b);
    let s = 'y = ';
    if (Math.abs(m) < 1e-12) return s + fmt(b);
    s += (m === 1 ? '' : m === -1 ? '-' : fmt(m)) + 'x';
    if (Math.abs(b) > 1e-12) s += (b < 0 ? ' - ' + fmt(-b) : ' + ' + fmt(b));
    return s;
  }
  function lineAscii(m, b) { m = snapValue(m); b = snapValue(b); const n = v => toAscii(N(v)); return 'y=' + n(m) + '*x' + (b < 0 ? '-' + n(-b) : '+' + n(b)); }
  function hasCalc(m) { if (!m || typeof m !== 'object') return false; if (['diff', 'int', 'lim', 'tangent'].includes(m.k)) return true; return hasCalc(m.a) || hasCalc(m.b); }

  // ---------- residual F = left − right (for implicit curves and systems) ----------
  function residual(src) {
    const st = typeof src === 'string' ? parse(src) : src;
    const L = st.sides[0], R = st.sides.length > 1 ? st.sides[1] : null;
    if (!L) throw new Error('Empty equation');
    return env => evaluate(L, env) - (R ? evaluate(R, env) : 0);
  }

  // best rational approximation, for exact-looking answers
  function rational(v, maxDen = 1000) {
    if (!isFinite(v)) return null;
    let h1 = 1, h0 = 0, k1 = 0, k0 = 1, x = Math.abs(v);
    for (let i = 0; i < 30; i++) {
      const a = Math.floor(x); const h2 = a * h1 + h0, k2 = a * k1 + k0;
      if (k2 > maxDen) break;
      h0 = h1; h1 = h2; k0 = k1; k1 = k2;
      if (Math.abs(Math.abs(v) - h1 / k1) < 1e-9) return { p: Math.sign(v) * h1, q: k1 };
      x = 1 / (x - a); if (!isFinite(x)) break;
    }
    return Math.abs(Math.abs(v) - h1 / k1) < 1e-9 ? { p: Math.sign(v) * h1, q: k1 } : null;
  }
  function num(v) {
    if (Math.abs(v) < 1e-12) return '0';
    const r = rational(v, 200);
    if (r) return r.q === 1 ? String(r.p) : (r.p < 0 ? '-' : '') + '\\tfrac{' + Math.abs(r.p) + '}{' + r.q + '}';
    return fmt(v);
  }
  function matrixTex(M, nv) {
    const cols = 'c'.repeat(nv) + '|c';
    return '\\left[\\begin{array}{' + cols + '}' + M.map(r => r.map(num).join(' & ')).join(' \\\\ ') + '\\end{array}\\right]';
  }
  const ORDER = ['x', 'y', 'z', 'w', 'a', 'b', 'c', 't', 'n', 'r', 'θ'];
  function sortVars(vs) { return vs.sort((a, b) => (ORDER.indexOf(a) + 100 * (ORDER.indexOf(a) < 0)) - (ORDER.indexOf(b) + 100 * (ORDER.indexOf(b) < 0)) || a.localeCompare(b)); }

  /** Solve a system of equations given as ASCII strings. Linear systems get Gauss–Jordan steps. */
  function solveSystem(list) {
    const eqs = list.map(s => s.trim()).filter(Boolean);
    if (!eqs.length) throw new Error('No equations');
    const stmts = eqs.map(e => { const st = parse(e); if (st.rels.length !== 1 || st.rels[0] !== '=' || !st.sides[0] || !st.sides[1]) throw new Error(T('“{e}” is not an equation of the form A = B', { e })); return st; });
    const Fs = stmts.map(st => residual(st));
    const set = new Set(); stmts.forEach(st => st.sides.forEach(sd => freeVars(sd, set)));
    const vars = sortVars([...set]);
    const n = vars.length, m = eqs.length;
    const res = { vars, eqs, latex: casesTex(stmts), steps: [] };
    if (!n) { res.status = Fs.every(F => Math.abs(F({})) < 1e-9) ? 'identity' : 'none'; res.solutions = []; return res; }
    const envOf = x => { const e = {}; vars.forEach((v, i) => { e[v] = x[i]; }); return e; };
    const evalAll = x => Fs.map(F => F(envOf(x)));

    // linearity test: F(p) == F(0) + Σ a_i p_i at random points
    const zero = new Array(n).fill(0);
    let linear = true; const A = [], b = [];
    try {
      const f0 = evalAll(zero);
      const cols = vars.map((_, j) => { const e = zero.slice(); e[j] = 1; return evalAll(e).map((v, i) => v - f0[i]); });
      for (let t = 0; t < 4 && linear; t++) {
        const p = vars.map(() => Math.round((Math.random() * 10 - 5) * 100) / 100);
        const fp = evalAll(p);
        fp.forEach((v, i) => { const pred = f0[i] + cols.reduce((s, c, j) => s + c[i] * p[j], 0); if (!isFinite(v) || Math.abs(v - pred) > 1e-7 * (1 + Math.abs(v))) linear = false; });
      }
      if (linear) for (let i = 0; i < m; i++) { A.push(cols.map(c => c[i])); b.push(-f0[i]); }
    } catch (e) { linear = false; }
    res.linear = linear;
    if (linear) return gaussJordan(res, A, b, vars);
    return newtonSystem(res, Fs, vars, envOf);
  }

  function casesTex(stmts) {
    return '\\begin{cases}' + stmts.map(st => toLatex(st)).join(' \\\\ ') + '\\end{cases}';
  }

  function gaussJordan(res, A, b, vars) {
    const n = vars.length, m = A.length;
    const M = A.map((r, i) => r.concat([b[i]]));
    const steps = res.steps;
    steps.push({ text: T('Write the system as an augmented matrix'), tex: matrixTex(M, n) });
    let row = 0; const pivots = [];
    for (let col = 0; col < n && row < m; col++) {
      // readable pivoting: keep the current row if usable, prefer a ±1 pivot, avoid swaps otherwise
      let p = -1;
      for (let r = row; r < m; r++) if (Math.abs(Math.abs(M[r][col]) - 1) < 1e-12) { p = r; break; }
      if (p < 0 || (p !== row && Math.abs(M[row][col]) > 1e-10 && Math.abs(Math.abs(M[row][col]) - 1) < 1e-12)) p = p < 0 ? -1 : p;
      if (p < 0) for (let r = row; r < m; r++) if (Math.abs(M[r][col]) > 1e-10) { p = r; break; }
      if (p < 0) continue;
      const ops = [];
      if (p !== row) { [M[p], M[row]] = [M[row], M[p]]; ops.push('R_{' + (row + 1) + '} \\leftrightarrow R_{' + (p + 1) + '}'); }
      const pv = M[row][col];
      if (Math.abs(pv - 1) > 1e-12) { M[row] = M[row].map(v => v / pv); ops.push('R_{' + (row + 1) + '} \\to ' + (Math.abs(pv + 1) < 1e-12 ? '-' : num(1 / pv)) + 'R_{' + (row + 1) + '}'); }
      for (let r = 0; r < m; r++) {
        if (r === row || Math.abs(M[r][col]) < 1e-12) continue;
        const f = M[r][col];
        M[r] = M[r].map((v, j) => v - f * M[row][j]);
        ops.push('R_{' + (r + 1) + '} \\to R_{' + (r + 1) + '}' + (f > 0 ? ' - ' : ' + ') + (Math.abs(Math.abs(f) - 1) < 1e-12 ? '' : num(Math.abs(f))) + 'R_{' + (row + 1) + '}');
      }
      M.forEach(r => r.forEach((v, j) => { if (Math.abs(v) < 1e-11) r[j] = 0; }));
      steps.push({ text: T('Eliminate {v} using row {r}', { v: vars[col], r: row + 1 }), ops, tex: matrixTex(M, n) });
      pivots.push(col); row++;
    }
    // inconsistent row 0 = c
    const bad = M.find(r => r.slice(0, n).every(v => Math.abs(v) < 1e-10) && Math.abs(r[n]) > 1e-9);
    if (bad) { res.status = 'none'; res.solutions = []; steps.push({ text: T('A row says 0 = {c}, which is impossible', { c: fmtPlain(bad[n]) }), tex: '\\text{No solution — the equations contradict each other.}' }); return res; }
    if (pivots.length < n) {
      res.status = 'infinite'; res.solutions = [];
      const free = vars.filter((_, j) => !pivots.includes(j));
      const lines = pivots.map((c, i) => {
        let t = vars[c] + ' = ' + num(M[i][n]);
        free.forEach(fv => { const j = vars.indexOf(fv), k = -M[i][j]; if (Math.abs(k) > 1e-12) t += (k > 0 ? ' + ' : ' - ') + (Math.abs(Math.abs(k) - 1) < 1e-12 ? '' : num(Math.abs(k))) + fv; });
        return t;
      });
      steps.push({ text: T('Infinitely many solutions ({v} free)', { v: free.join(', ') }), tex: lines.join(',\\quad ') });
      return res;
    }
    const sol = {}; pivots.forEach((c, i) => { sol[vars[c]] = M[i][n]; });
    res.status = 'unique'; res.solutions = [sol];
    steps.push({ text: T('Read off the solution'), tex: vars.map(v => v + ' = ' + num(sol[v])).join(',\\quad ') });
    // verification line
    return res;
  }

  function newtonSystem(res, Fs, vars, envOf) {
    const n = vars.length;
    const evalAll = x => Fs.map(F => F(envOf(x)));
    const found = [];
    const starts = [];
    if (n === 1) for (let a = -20; a <= 20; a += 0.5) starts.push([a]);
    else if (n === 2) { for (let a = -10; a <= 10; a += 2) for (let c = -10; c <= 10; c += 2) starts.push([a + 0.13, c - 0.07]); }
    else for (let k = 0; k < 300; k++) starts.push(vars.map(() => Math.random() * 20 - 10));
    starts.forEach(x0 => {
      let x = x0.slice();
      for (let it = 0; it < 60; it++) {
        let F; try { F = evalAll(x); } catch (e) { return; }
        if (F.some(v => !isFinite(v))) return;
        const norm = Math.hypot(...F); if (norm < 1e-12) break;
        // numeric Jacobian (m×n), solve least-squares J dx = -F via normal equations
        const J = F.map(() => new Array(n).fill(0));
        for (let j = 0; j < n; j++) { const h = 1e-6 * (1 + Math.abs(x[j])); const xp = x.slice(); xp[j] += h; let Fp; try { Fp = evalAll(xp); } catch (e) { return; } Fp.forEach((v, i) => { J[i][j] = (v - F[i]) / h; }); }
        const JT = (i, j) => J.reduce((s, r) => s + r[i] * r[j], 0);
        const N = []; const g = [];
        for (let i = 0; i < n; i++) { N.push([]); for (let j = 0; j < n; j++) N[i].push(JT(i, j) + (i === j ? 1e-12 : 0)); g.push(-J.reduce((s, r, k) => s + r[i] * F[k], 0)); }
        const dx = solveLin(N, g); if (!dx) return;
        let step = 1; const n0 = norm;
        for (let ls = 0; ls < 12; ls++) { const xn = x.map((v, i) => v + step * dx[i]); let Fn; try { Fn = evalAll(xn); } catch (e) { Fn = null; } if (Fn && Fn.every(isFinite) && Math.hypot(...Fn) < n0) { x = xn; break; } step /= 2; if (ls === 11) x = x.map((v, i) => v + step * dx[i]); }
      }
      let F; try { F = evalAll(x); } catch (e) { return; }
      if (Math.hypot(...F) < 1e-8 && x.every(v => Math.abs(v) < 1e6)) {
        const xr = x.map(v => { const r = Math.round(v * 1e6) / 1e6; return Math.abs(v - r) < 1e-7 ? r : v; });
        if (!found.some(q => q.every((v, i) => Math.abs(v - xr[i]) < 1e-5))) found.push(xr);
      }
    });
    found.sort((a, b) => a[0] - b[0] || (a[1] || 0) - (b[1] || 0));
    res.solutions = found.slice(0, 12).map(x => { const s = {}; vars.forEach((v, i) => { s[v] = x[i]; }); return s; });
    res.status = found.length ? 'numeric' : 'none';
    res.steps.push({ text: T('The system is not linear, so it is solved numerically (Newton’s method from many starting points)'), tex: '' });
    if (found.length) res.steps.push({ text: found.length === 1 ? T('Solution') : T('{n} solutions', { n: found.length }), tex: res.solutions.map(s => '(' + vars.map(v => fmt(s[v])).join(',\\ ') + ')').join(',\\quad ') });
    else res.steps.push({ text: T('No real solution was found in the search range'), tex: '' });
    return res;
  }
  function solveLin(A, b) {
    const n = A.length, M = A.map((r, i) => r.concat([b[i]]));
    for (let i = 0; i < n; i++) {
      let p = i; for (let r = i + 1; r < n; r++) if (Math.abs(M[r][i]) > Math.abs(M[p][i])) p = r;
      if (Math.abs(M[p][i]) < 1e-14) return null;
      [M[i], M[p]] = [M[p], M[i]];
      for (let r = 0; r < n; r++) if (r !== i) { const f = M[r][i] / M[i][i]; for (let c = i; c <= n; c++) M[r][c] -= f * M[i][c]; }
    }
    return M.map((r, i) => r[n] / r[i]);
  }

  // ---------- Least squares fitting for sketched graphs ----------
  function lstsq(rows, ys) { // normal equations, tiny systems
    const m = rows[0].length;
    const A = Array.from({ length: m }, () => new Array(m).fill(0)), b = new Array(m).fill(0);
    rows.forEach((r, i) => { for (let a = 0; a < m; a++) { b[a] += r[a] * ys[i]; for (let c = 0; c < m; c++) A[a][c] += r[a] * r[c]; } });
    // gaussian elimination
    for (let i = 0; i < m; i++) {
      let p = i; for (let r = i + 1; r < m; r++) if (Math.abs(A[r][i]) > Math.abs(A[p][i])) p = r;
      [A[i], A[p]] = [A[p], A[i]]; [b[i], b[p]] = [b[p], b[i]];
      if (Math.abs(A[i][i]) < 1e-12) return null;
      for (let r = 0; r < m; r++) if (r !== i) { const f = A[r][i] / A[i][i]; for (let c = i; c < m; c++) A[r][c] -= f * A[i][c]; b[r] -= f * b[i]; }
    }
    return b.map((v, i) => v / A[i][i]);
  }
  function rms(xs, ys, f) { let s = 0; xs.forEach((x, i) => { const d = f(x) - ys[i]; s += d * d; }); return Math.sqrt(s / xs.length); }
  function niceRound(v, step) { const r = Math.round(v / step) * step; return Math.abs(r) < 1e-9 ? 0 : +r.toFixed(4); }

  /** Fit a hand-sketched curve (math coords) with the simplest family that explains it. */
  function fitCurve(xs, ys) {
    const span = Math.max(...ys) - Math.min(...ys) || 1;
    const xspan = Math.max(...xs) - Math.min(...xs) || 1;
    const cands = [];
    const poly = deg => {
      const c = lstsq(xs.map(x => Array.from({ length: deg + 1 }, (_, k) => Math.pow(x, k))), ys);
      if (!c) return;
      const mk = cc => x => cc.reduce((s, ci, k) => s + ci * Math.pow(x, k), 0);
      // round coefficients: prefer nice numbers when they don't hurt the fit
      const err0 = rms(xs, ys, mk(c));
      let best = c, bestErr = err0;
      for (const step of [1, 0.5, 0.25, 0.1]) {
        const rc = c.map(v => niceRound(v, step));
        const e = rms(xs, ys, mk(rc));
        if (e < Math.max(err0 * 1.6, span * 0.035)) { best = rc; bestErr = e; break; }
      }
      cands.push({ kind: 'poly', deg, c: best, f: mk(best), err: bestErr, params: deg + 1, tex: polyTex(best) });
    };
    poly(1); poly(2); poly(3);
    // sinusoid: y = A sin(kx) + B cos(kx) + C, grid search on k
    let bs = null;
    for (let k = 0.25; k <= 6; k += 0.05) {
      const c = lstsq(xs.map(x => [Math.sin(k * x), Math.cos(k * x), 1]), ys);
      if (!c) continue;
      const f = x => c[0] * Math.sin(k * x) + c[1] * Math.cos(k * x) + c[2];
      const e = rms(xs, ys, f);
      if (!bs || e < bs.err) bs = { k, c, err: e };
    }
    if (bs && xspan * bs.k > Math.PI * 1.4) { // at least ~3/4 of a period visible
      const A = Math.hypot(bs.c[0], bs.c[1]);
      let ph = Math.atan2(bs.c[1], bs.c[0]);
      const k = niceRound(bs.k, bs.k < 1 ? 0.25 : 0.5) || bs.k, Ar = niceRound(A, 0.5) || A, C = niceRound(bs.c[2], 0.5);
      ph = Math.round(ph / (Math.PI / 4)) * (Math.PI / 4);
      const f = x => Ar * Math.sin(k * x + ph) + C;
      const e = rms(xs, ys, f);
      cands.push({ kind: 'sin', f, err: Math.min(e, e), params: 4, tex: sinTex(Ar, k, ph, C) });
    }
    // exponential y = a e^{bx} (y > 0)
    if (ys.every(y => y > 0.05)) {
      const c = lstsq(xs.map(x => [1, x]), ys.map(Math.log));
      if (c) {
        const a = niceRound(Math.exp(c[0]), 0.5) || Math.exp(c[0]), b = niceRound(c[1], 0.25) || c[1];
        const f = x => a * Math.exp(b * x);
        cands.push({ kind: 'exp', f, err: rms(xs, ys, f), params: 2, tex: (a === 1 ? '' : fmtPlain(a)) + 'e^{' + (b === 1 ? '' : b === -1 ? '-' : fmtPlain(b)) + 'x}' });
      }
    }
    cands.forEach(c => { c.score = c.err / span + 0.012 * c.params; });
    cands.sort((a, b) => a.score - b.score);
    const best = cands[0];
    if (!best || best.err / span > 0.12) return null;
    return best;
  }
  function fmtPlain(v) { return (+v.toFixed(3)).toString(); }
  function polyTex(c) {
    let s = '';
    for (let k = c.length - 1; k >= 0; k--) {
      const v = c[k]; if (Math.abs(v) < 1e-9) continue;
      const mag = Math.abs(v), sign = v < 0 ? '-' : (s ? '+' : '');
      const coef = k > 0 && Math.abs(mag - 1) < 1e-9 ? '' : fmtPlain(mag);
      s += sign + coef + (k === 0 ? '' : k === 1 ? 'x' : 'x^{' + k + '}');
    }
    return s || '0';
  }
  function sinTex(A, k, ph, C) {
    const kx = (k === 1 ? '' : fmtPlain(k)) + 'x';
    let arg = kx;
    if (Math.abs(ph) > 1e-6) {
      const q = Math.round(ph / (Math.PI / 4));
      const g = gcd(Math.abs(q), 4), n = q / g, d = 4 / g;
      const piT = (Math.abs(n) === 1 ? '' : Math.abs(n)) + '\\pi' + (d === 1 ? '' : '/' + d);
      arg += (n < 0 ? '-' : '+') + piT;
    }
    let s = (A === 1 ? '' : A === -1 ? '-' : fmtPlain(A)) + '\\sin(' + arg + ')';
    if (Math.abs(C) > 1e-9) s += (C < 0 ? '-' : '+') + fmtPlain(Math.abs(C));
    return s;
  }

  global.MathCore = { derivative, simplify, toAscii, integrate, limit, calcSteps, hasCalc, snapValue, residual, solveSystem, rational, num, tokenize, parse, evaluate, toLatex, tex, analyze, solve, fitCurve, fmt, fmtApprox, freeVars };
})(typeof window !== 'undefined' ? window : globalThis);
