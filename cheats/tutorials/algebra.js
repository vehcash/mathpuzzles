(function () {
  const R = String.raw;
  const IDEA = 'The idea|L’idée|La idea|考え方|思路', EX = 'Worked example|Exemple résolu|Ejemplo resuelto|例題|例题', YOUR = 'Your turn|À vous|Te toca|やってみよう|轮到你了';
  const TRY = 'Work it out on paper, type the answer (a fraction or a decimal) and check it. Each hint writes the next line of the solution on the board.|Faites le calcul sur papier, tapez la réponse (fraction ou décimal) et vérifiez. Chaque indice écrit la ligne suivante de la solution au tableau.|Hazlo en papel, escribe la respuesta (fracción o decimal) y compruébala. Cada pista escribe en la pizarra la siguiente línea de la solución.|紙で計算し、答え（分数か小数）を入力して確かめましょう。ヒントごとに解答が 1 行ずつ黒板に書かれます。|先在纸上算，输入答案（分数或小数）并检查。每次提示会在黑板上写出解答的下一行。';
  const F = (tex, o = {}) => ['w', R`\displaystyle ` + tex, Object.assign({ s: 26 }, o)];
  const Y = (tex, o = {}) => F(tex, Object.assign({ c: 'y' }, o));
  const W = (txt, o = {}) => ['t', txt, Object.assign({ s: 18, c: 'b' }, o)];
  const H = name => ['t', name, { head: true, s: 16, c: 'y' }];
  const Z = (x, y) => [x, y, 0];
  // give a group of scene items quick, staggered delays (the default is 300 ms per item, too slow for grids)
  const SEQ = (items, d0 = 200, step = 40) => items.map((a, i) => { const o = a[a.length - 1]; if (o && typeof o === 'object' && !Array.isArray(o)) o.d = d0 + i * step; return a; });
  const S2 = (c, r, axes = false) => ['3d', { flat: true, axes, c: [c[0], c[1], 0], r }];
  const CI = (o, r, c, fill = 0.16) => ['circ3', Z(...o), [0, 0, 1], r, { c, fill }];
  const LB = (p, t, c = 'y', size) => ['lab3', Z(...p), t, Object.assign({ c }, size ? { size } : {})];
  const SG = (p, q, c = 'chalk', o = {}) => ['seg', Z(...p), Z(...q), Object.assign({ c }, o)];
  const PT = (p, lab, c = 'y', o = {}) => ['pt3', Z(...p), lab || '', Object.assign({ c }, o)];
  const RECT = (x0, y0, x1, y1, c = 'b', fill = 0.3) => ['poly3', [Z(x0, y0), Z(x1, y0), Z(x1, y1), Z(x0, y1)], { c, fill }];
  // a Venn diagram of A and B inside the universe
  const VENN = (la = 'A', lb = 'B', extra = []) => [S2([0, 0], 2.2), ...SEQ([RECT(-2.4, -1.6, 2.4, 1.6, 'chalk', 0.03), CI([-0.6, 0], 1.1, 'b'), CI([0.6, 0], 1.1, 'p'), LB([-1.3, 1.1], la, 'b'), LB([1.2, 1.1], lb, 'p'), LB([-2.2, 1.35], 'Ω', 'chalk'), ...extra], 200, 160)];
  // a two-level tree: first branch probability p (labels a, ā), then q1 / q2 for the event on each branch
  const TREE = (p, q1, q2, la, lb) => [S2([1.5, 0], 2.2), ...SEQ([
    SG([0, 0], [1.5, 1.2], 'b'), SG([0, 0], [1.5, -1.2], 'b'), SG([1.5, 1.2], [3, 1.8], 'y'), SG([1.5, 1.2], [3, 0.6], 'chalk'), SG([1.5, -1.2], [3, -0.6], 'y'), SG([1.5, -1.2], [3, -1.8], 'chalk'),
    LB([0.45, 0.85], p, 'b'), LB([0.45, -1.05], '1 − ' + p, 'b'), LB([1.5, 1.4], la[0], 'b'), LB([1.5, -1.0], la[1], 'b'),
    LB([2.0, 1.75], q1, 'y'), LB([2.0, -0.55], q2, 'y'), LB([3.1, 1.8], lb[0], 'y'), LB([3.1, 0.6], lb[1], 'chalk'), LB([3.1, -0.6], lb[0], 'y'), LB([3.1, -1.8], lb[1], 'chalk')], 200, 90)];
  // a bar chart: probabilities p[k] at x = k0 + k (height scaled by s)
  const BARS = (ps, k0 = 0, s = 1, c = 'b', hi = -1) => SEQ(ps.map((p, k) => RECT(k0 + k - 0.38, 0, k0 + k + 0.38, p * s, k === hi ? 'y' : c, k === hi ? 0.55 : 0.3)), 200, 70);
  const AX = (xw, yw) => ['ax', { xw, yw }], P = (eq, c = 'y', o = {}) => ['p', 'y=' + eq, Object.assign({ c }, o)], SH = (a, b) => ['sh', a, b];
  const N01 = 'e^(-x^2/2)/sqrt(2pi)';
  const L = {};
  const lesson = (key, head, idea, ex, your) => {
    L[key] = [{ t: IDEA, s: idea.s, a: [H(head), ...idea.a] }, { t: EX, s: ex.s, a: [['clr'], H(head), ...ex.a] },
      { t: YOUR, s: your.s || TRY, a: [['clr'], H(head), ...(your.a || [])], ex: your.ex }];
  };
  const C = (a, b) => { let r = 1; for (let k = 1; k <= b; k++) r = r * (a - b + k) / k; return r; };
  const binom = (n, p) => [...Array(n + 1)].map((_, k) => C(n, k) * p ** k * (1 - p) ** (n - k));

  const TRY_E = 'Type an expression in x and check it (it is accepted in any equivalent form). Each hint writes the next line of the solution.|Tapez une expression en x et vérifiez (toute forme équivalente est acceptée). Chaque indice écrit la ligne suivante.|Escribe una expresión en x y compruébala (se acepta cualquier forma equivalente). Cada pista escribe la siguiente línea.|x の式を入力して確かめよう（同値な形ならどれでも可）。ヒントごとに 1 行ずつ書かれます。|输入关于 x 的式子并检查（任何等价形式都可以）。每次提示写出下一行。';
  const TRY_R = 'Type all the values separated by ; in any order (for example 2; -3) and check. Each hint writes the next line of the solution.|Tapez toutes les valeurs séparées par ; dans n’importe quel ordre (par exemple 2; -3) et vérifiez.|Escribe todos los valores separados por ; en cualquier orden (por ejemplo 2; -3) y comprueba.|すべての値を ; で区切って順不同で入力（例：2; -3）して確かめよう。|输入所有值，用 ; 分隔，顺序不限（如 2; -3），并检查。';
  const TRY_TF = 'Type 1 for yes (true) or 0 for no (false), then check.|Tapez 1 pour oui (vrai) ou 0 pour non (faux), puis vérifiez.|Escribe 1 para sí (verdadero) o 0 para no (falso) y comprueba.|はい（真）なら 1、いいえ（偽）なら 0 を入力。|是（真）输入 1，否（假）输入 0。';
  const LINE = (pieces, pts, c = [0, 0], r = 4) => [S2(c, r), SG([c[0] - r + 0.3, 0], [c[0] + r - 0.3, 0], 'g'), ...SEQ([...pieces.map(([a, b]) => SG([a, 0], [b, 0], 'y', { w: 5 })), ...pts.map(([x, closed, lab]) => PT([x, 0], lab, 'y', { hollow: !closed, dy: 22 }))], 200, 150)];
  const PTG = (x, y, lab, c = 'o') => ['pt', x, y, lab, { c }];
  const LP = (verts, lines, best) => [S2([2.5, 2.4], 3.3, true), ['poly3', verts.map(([x, y]) => Z(x, y)), { c: 'y', fill: 0.22 }], ...SEQ([...lines.map(([p, q]) => SG(p, q, 'b')), ...verts.map(([x, y]) => PT([x, y], `(${x}, ${y})`, best && best[0] === x && best[1] === y ? 'o' : 'chalk', { dx: 6, dy: -8 }))], 300, 120)];
  const A = (key, head, idea, ex, your) => lesson(key, head, idea, ex, your);

  // =============================== Powers and roots ===============================
  A('Powers and roots/Product', 'Multiplying powers|Produit de puissances|Producto de potencias|累乗の積|同底数幂相乘',
    { s: R`$a^m$ is $m$ factors $a$, $a^n$ is $n$ more; together $m + n$ factors. The rule needs the same base: $2^3\cdot 3^2$ cannot be combined this way.|$a^m$, c’est $m$ facteurs $a$ ; $a^n$ en ajoute $n$ : en tout $m + n$ facteurs. Il faut la même base : $2^3\cdot 3^2$ ne se regroupe pas ainsi.|$a^m$ son $m$ factores $a$ y $a^n$ añade $n$: en total $m + n$. Hace falta la misma base: $2^3\cdot 3^2$ no se junta así.|$a^m$ は $a$ が $m$ 個、$a^n$ でさらに $n$ 個、合わせて $m + n$ 個。底が同じときだけ。|$a^m$ 是 $m$ 个 $a$ 相乘，$a^n$ 再加 $n$ 个，共 $m + n$ 个。必须同底。`,
      a: [Y(R`a^m\,a^n = a^{m+n}`, { s: 30 }), F(R`a\cdot a\cdot a \times a\cdot a = a^{3+2}`)] },
    { s: R`$2^3\cdot 2^4 = 2^7 = 128$; $x^2\cdot x^5 = x^7$.|$2^3\cdot 2^4 = 2^7 = 128$ ; $x^2\cdot x^5 = x^7$.|$2^3\cdot 2^4 = 2^7 = 128$; $x^2\cdot x^5 = x^7$.|$2^7 = 128$。|$2^7 = 128$。`,
      a: [Y(R`2^3\cdot 2^4 = 2^7 = 128`)] },
    { s: TRY_E, a: [F(R`x^2\cdot x^5\cdot x`)],
      ex: { k: 'expr', f: 'x^8', q: R`Simplify $x^2\cdot x^5\cdot x$.|Simplifiez $x^2\cdot x^5\cdot x$.|Simplifica $x^2\cdot x^5\cdot x$.|$x^2\cdot x^5\cdot x$ を簡単にせよ。|化简 $x^2\cdot x^5\cdot x$。`, sol: [R`x = x^1`, R`x^{2 + 5 + 1} = x^8`] } });

  A('Powers and roots/Quotient', 'Dividing powers|Quotient de puissances|Cociente de potencias|累乗の商|同底数幂相除',
    { s: R`Dividing cancels $n$ of the $m$ factors, so $m - n$ remain. If $n > m$ the exponent is negative, which simply means the factors are left in the denominator.|Diviser simplifie $n$ des $m$ facteurs : il en reste $m - n$. Si $n > m$, l’exposant est négatif : les facteurs restent au dénominateur.|Dividir cancela $n$ de los $m$ factores: quedan $m - n$. Si $n > m$ el exponente es negativo: los factores quedan en el denominador.|割ると $n$ 個が約分され $m - n$ 個が残る。$n > m$ なら負の指数（分母に残る）。|相除约去 $n$ 个，剩 $m - n$ 个。若 $n > m$ 指数为负，即留在分母。`,
      a: [Y(R`\frac{a^m}{a^n} = a^{m-n}`, { s: 30 })] },
    { s: R`$\tfrac{5^7}{5^4} = 5^3 = 125$; $\tfrac{x^2}{x^5} = x^{-3} = \tfrac{1}{x^3}$.|$\tfrac{5^7}{5^4} = 125$ ; $\tfrac{x^2}{x^5} = x^{-3}$.|$\tfrac{5^7}{5^4} = 125$; $\tfrac{x^2}{x^5} = x^{-3}$.|$125$、$x^{-3}$。|$125$，$x^{-3}$。`,
      a: [Y(R`\frac{5^7}{5^4} = 5^3 = 125`)] },
    { s: TRY_E, a: [F(R`\frac{x^9}{x^3}`)],
      ex: { k: 'expr', f: 'x^6', q: R`Simplify $\dfrac{x^9}{x^3}$.|Simplifiez $\dfrac{x^9}{x^3}$.|Simplifica $\dfrac{x^9}{x^3}$.|$\dfrac{x^9}{x^3}$ を簡単にせよ。|化简 $\dfrac{x^9}{x^3}$。`, sol: [R`x^{9 - 3}`, R`= x^6`] } });

  A('Powers and roots/Power of a power', 'Power of a power|Puissance d’une puissance|Potencia de una potencia|累乗の累乗|幂的乘方',
    { s: R`$\left(a^m\right)^n$ is $n$ blocks of $m$ factors each: $mn$ factors. Do not confuse with $a^{m^n}$, which means $a^{(m^n)}$.|$\left(a^m\right)^n$, ce sont $n$ blocs de $m$ facteurs : $mn$ facteurs. Ne pas confondre avec $a^{m^n} = a^{(m^n)}$.|$\left(a^m\right)^n$ son $n$ bloques de $m$ factores: $mn$ factores. No confundir con $a^{m^n} = a^{(m^n)}$.|$\left(a^m\right)^n$ は $m$ 個の組が $n$ 組で $mn$ 個。$a^{m^n} = a^{(m^n)}$ と混同しない。|$\left(a^m\right)^n$ 是 $n$ 组、每组 $m$ 个因子：共 $mn$ 个。别与 $a^{m^n} = a^{(m^n)}$ 混淆。`,
      a: [Y(R`\left(a^m\right)^n = a^{mn}`, { s: 30 })] },
    { s: R`$\left(2^3\right)^2 = 2^6 = 64$, while $2^{3^2} = 2^9 = 512$.|$\left(2^3\right)^2 = 64$, mais $2^{3^2} = 512$.|$\left(2^3\right)^2 = 64$, pero $2^{3^2} = 512$.|$64$ と $512$。|$64$ 与 $512$。`,
      a: [F(R`\left(2^3\right)^2 = 2^6 = 64`), Y(R`2^{3^2} = 2^9 = 512`)] },
    { s: TRY_E, a: [F(R`\left(x^4\right)^3`)],
      ex: { k: 'expr', f: 'x^12', q: R`Simplify $\left(x^4\right)^3$.|Simplifiez $\left(x^4\right)^3$.|Simplifica $\left(x^4\right)^3$.|$\left(x^4\right)^3$ を簡単にせよ。|化简 $\left(x^4\right)^3$。`, sol: [R`x^{4\cdot 3} = x^{12}`] } });

  A('Powers and roots/Power of a product', 'Power of a product or quotient|Puissance d’un produit ou d’un quotient|Potencia de un producto o cociente|積・商の累乗|积与商的乘方',
    { s: R`$(ab)^n$ is $n$ copies of $ab$; reorder them as $n$ copies of $a$ times $n$ copies of $b$. The exponent goes to every factor — but not to the terms of a sum: $(a + b)^2 \ne a^2 + b^2$.|$(ab)^n$, ce sont $n$ copies de $ab$ ; on les réordonne en $n$ copies de $a$ et $n$ de $b$. L’exposant s’applique à chaque facteur — mais pas aux termes d’une somme : $(a + b)^2 \ne a^2 + b^2$.|$(ab)^n$ son $n$ copias de $ab$; se reordenan como $n$ copias de $a$ por $n$ de $b$. El exponente afecta a cada factor, pero no a los sumandos: $(a + b)^2 \ne a^2 + b^2$.|$(ab)^n$ は $ab$ が $n$ 個、並べ替えて $a^n b^n$。指数は各因数にかかるが和の項にはかからない：$(a + b)^2 \ne a^2 + b^2$。|$(ab)^n$ 是 $n$ 个 $ab$，重排为 $a^n b^n$。指数作用于每个因子，但不作用于和的各项：$(a + b)^2 \ne a^2 + b^2$。`,
      a: [Y(R`(ab)^n = a^n b^n,\qquad \left(\frac ab\right)^n = \frac{a^n}{b^n}`, { s: 26 })] },
    { s: R`$(3x)^2 = 9x^2$; $\left(\tfrac23\right)^3 = \tfrac{8}{27}$.|$(3x)^2 = 9x^2$ ; $\left(\tfrac23\right)^3 = \tfrac{8}{27}$.|$(3x)^2 = 9x^2$; $\left(\tfrac23\right)^3 = \tfrac{8}{27}$.|$9x^2$、$\tfrac{8}{27}$。|$9x^2$，$\tfrac{8}{27}$。`,
      a: [F(R`(3x)^2 = 9x^2`), Y(R`\left(\tfrac23\right)^3 = \tfrac{8}{27}`)] },
    { s: TRY_E, a: [F(R`(2x)^3`)],
      ex: { k: 'expr', f: '8x^3', q: R`Simplify $(2x)^3$.|Simplifiez $(2x)^3$.|Simplifica $(2x)^3$.|$(2x)^3$ を簡単にせよ。|化简 $(2x)^3$。`, sol: [R`2^3 x^3`, R`= 8x^3`] } });

  A('Powers and roots/Negative and zero exponents', 'Negative and zero exponents|Exposants négatifs et nul|Exponentes negativos y cero|負の指数と 0 乗|负指数与零指数',
    { s: R`Keep dividing by $a$: $a^3, a^2, a^1$, then $a^0 = 1$, $a^{-1} = \tfrac1a$, $a^{-2} = \tfrac{1}{a^2}$. The definitions are exactly what keeps the quotient rule working.|Divisez par $a$ à chaque fois : $a^3, a^2, a^1$, puis $a^0 = 1$, $a^{-1} = \tfrac1a$, $a^{-2} = \tfrac{1}{a^2}$. Ces définitions sont exactement celles qui gardent la règle du quotient vraie.|Sigue dividiendo entre $a$: $a^3, a^2, a^1$, luego $a^0 = 1$, $a^{-1} = \tfrac1a$, $a^{-2} = \tfrac{1}{a^2}$. Estas definiciones son justo las que mantienen la regla del cociente.|$a$ で割り続けると $a^3, a^2, a^1, a^0 = 1, a^{-1} = \tfrac1a, \dots$。商の法則が成り立つように決めたもの。|不断除以 $a$：$a^3, a^2, a^1$，然后 $a^0 = 1$，$a^{-1} = \tfrac1a$……这些定义正好使除法法则成立。`,
      a: [Y(R`a^{-n} = \frac{1}{a^n},\qquad a^0 = 1`, { s: 30 }), AX([-3, 3], [-0.5, 8.5]), P('2^x'), PTG(0, 1, '2⁰ = 1'), PTG(-1, 0.5, '2⁻¹'), PTG(-2, 0.25, '')] },
    { s: R`$2^{-3} = \tfrac18$; $\left(\tfrac23\right)^{-2} = \tfrac94$; $7^0 = 1$.|$2^{-3} = \tfrac18$ ; $\left(\tfrac23\right)^{-2} = \tfrac94$ ; $7^0 = 1$.|$2^{-3} = \tfrac18$; $\left(\tfrac23\right)^{-2} = \tfrac94$; $7^0 = 1$.|$\tfrac18$、$\tfrac94$、$1$。|$\tfrac18$，$\tfrac94$，$1$。`,
      a: [F(R`2^{-3} = \frac18`), Y(R`\left(\frac23\right)^{-2} = \frac94`)] },
    { a: [F(R`4^{-2}`)],
      ex: { k: 'val', v: '1/16', q: R`Compute $4^{-2}$.|Calculez $4^{-2}$.|Calcula $4^{-2}$.|$4^{-2}$ を計算せよ。|计算 $4^{-2}$。`, sol: [R`\frac{1}{4^2}`, R`= \frac{1}{16}`] } });

  A('Powers and roots/Fractional exponents', 'Fractional exponents|Exposants fractionnaires|Exponentes fraccionarios|分数指数|分数指数',
    { s: R`$a^{1/n}$ is the number whose $n$-th power is $a$: the $n$-th root. Then $a^{m/n}$ is that root raised to the power $m$. Take the root first — the numbers stay small.|$a^{1/n}$ est le nombre dont la puissance $n$-ième vaut $a$ : la racine $n$-ième. $a^{m/n}$ est cette racine élevée à la puissance $m$. Prenez la racine d’abord — les nombres restent petits.|$a^{1/n}$ es el número cuya potencia $n$-ésima es $a$: la raíz $n$-ésima. $a^{m/n}$ es esa raíz elevada a $m$. Saca primero la raíz: los números quedan pequeños.|$a^{1/n}$ は $n$ 乗すると $a$ になる数（$n$ 乗根）。$a^{m/n}$ はそれの $m$ 乗。先に根をとると数が小さい。|$a^{1/n}$ 是 $n$ 次方等于 $a$ 的数：$n$ 次根。$a^{m/n}$ 是这个根的 $m$ 次方。先开方，数字更小。`,
      a: [Y(R`a^{m/n} = \sqrt[n]{a^m} = \left(\sqrt[n]{a}\right)^m`, { s: 26 })] },
    { s: R`$8^{2/3} = \left(\sqrt[3]8\right)^2 = 2^2 = 4$; $27^{4/3} = 3^4 = 81$.|$8^{2/3} = 2^2 = 4$ ; $27^{4/3} = 3^4 = 81$.|$8^{2/3} = 2^2 = 4$; $27^{4/3} = 3^4 = 81$.|$4$、$81$。|$4$，$81$。`,
      a: [Y(R`8^{2/3} = \left(\sqrt[3]{8}\right)^2 = 4`)] },
    { a: [F(R`16^{3/4}`)],
      ex: { k: 'val', v: '8', q: R`Compute $16^{3/4}$.|Calculez $16^{3/4}$.|Calcula $16^{3/4}$.|$16^{3/4}$ を計算せよ。|计算 $16^{3/4}$。`, sol: [R`\sqrt[4]{16} = 2`, R`2^3 = 8`] } });

  A('Powers and roots/Roots', 'Simplifying roots|Simplifier des racines|Simplificar raíces|根号の計算|根式化简',
    { s: R`Roots of products split into products of roots. To simplify, pull out the largest square factor: $\sqrt{50} = \sqrt{25\cdot 2} = 5\sqrt2$. Sums do not split: $\sqrt{9 + 16} = 5$, not $7$.|La racine d’un produit est le produit des racines. Pour simplifier, on sort le plus grand facteur carré : $\sqrt{50} = 5\sqrt2$. Les sommes ne se séparent pas : $\sqrt{9 + 16} = 5$, pas $7$.|La raíz de un producto es el producto de raíces. Para simplificar, saca el mayor factor cuadrado: $\sqrt{50} = 5\sqrt2$. Las sumas no se separan: $\sqrt{9 + 16} = 5$, no $7$.|積の根は根の積。最大の平方因数を外に出す：$\sqrt{50} = 5\sqrt2$。和は分けられない：$\sqrt{9 + 16} = 5$（7 ではない）。|积的根等于根的积。化简时提出最大的平方因子：$\sqrt{50} = 5\sqrt2$。和不能拆：$\sqrt{9 + 16} = 5$，不是 $7$。`,
      a: [Y(R`\sqrt{ab} = \sqrt a\,\sqrt b,\qquad \sqrt{\frac ab} = \frac{\sqrt a}{\sqrt b}`, { s: 26 })] },
    { s: R`$\sqrt{72} = \sqrt{36\cdot 2} = 6\sqrt2$; $\sqrt{\tfrac{9}{25}} = \tfrac35$.|$\sqrt{72} = 6\sqrt2$ ; $\sqrt{\tfrac{9}{25}} = \tfrac35$.|$\sqrt{72} = 6\sqrt2$; $\sqrt{\tfrac{9}{25}} = \tfrac35$.|$6\sqrt2$、$\tfrac35$。|$6\sqrt2$，$\tfrac35$。`,
      a: [Y(R`\sqrt{72} = \sqrt{36}\sqrt2 = 6\sqrt2`)] },
    { a: [F(R`\sqrt{12}\cdot\sqrt3`)],
      ex: { k: 'val', v: '6', q: R`Compute $\sqrt{12}\cdot\sqrt3$.|Calculez $\sqrt{12}\cdot\sqrt3$.|Calcula $\sqrt{12}\cdot\sqrt3$.|$\sqrt{12}\cdot\sqrt3$ を計算せよ。|计算 $\sqrt{12}\cdot\sqrt3$。`, sol: [R`\sqrt{36}`, R`= 6`] } });

  A('Powers and roots/Rationalising', 'Rationalising the denominator|Rendre le dénominateur rationnel|Racionalizar el denominador|分母の有理化|分母有理化',
    { s: R`Multiply top and bottom by the conjugate $\sqrt a - \sqrt b$: the denominator becomes a difference of squares, $a - b$, with no roots left.|On multiplie en haut et en bas par le conjugué $\sqrt a - \sqrt b$ : le dénominateur devient une différence de carrés, $a - b$, sans racine.|Multiplica arriba y abajo por el conjugado $\sqrt a - \sqrt b$: el denominador queda como diferencia de cuadrados, $a - b$, sin raíces.|分子分母に共役 $\sqrt a - \sqrt b$ を掛けると分母は $a - b$（根号なし）。|分子分母同乘共轭 $\sqrt a - \sqrt b$：分母变成平方差 $a - b$，不再含根号。`,
      a: [Y(R`\frac{1}{\sqrt a + \sqrt b}\cdot\frac{\sqrt a - \sqrt b}{\sqrt a - \sqrt b} = \frac{\sqrt a - \sqrt b}{a - b}`, { s: 22 })] },
    { s: R`$\tfrac{1}{\sqrt3 + \sqrt2} = \tfrac{\sqrt3 - \sqrt2}{3 - 2} = \sqrt3 - \sqrt2$; $\tfrac{6}{\sqrt3} = \tfrac{6\sqrt3}{3} = 2\sqrt3$.|$\tfrac{1}{\sqrt3 + \sqrt2} = \sqrt3 - \sqrt2$ ; $\tfrac{6}{\sqrt3} = 2\sqrt3$.|$\tfrac{1}{\sqrt3 + \sqrt2} = \sqrt3 - \sqrt2$; $\tfrac{6}{\sqrt3} = 2\sqrt3$.|$\sqrt3 - \sqrt2$、$2\sqrt3$。|$\sqrt3 - \sqrt2$，$2\sqrt3$。`,
      a: [F(R`\frac{1}{\sqrt3 + \sqrt2} = \sqrt3 - \sqrt2`), Y(R`\frac{6}{\sqrt3} = 2\sqrt3`)] },
    { a: [F(R`\frac{2}{\sqrt5 - 1}`)],
      ex: { k: 'val', v: '(sqrt(5)+1)/2', q: R`Rationalise $\dfrac{2}{\sqrt5 - 1}$ (type the exact value or a decimal).|Rendez rationnel le dénominateur de $\dfrac{2}{\sqrt5 - 1}$ (valeur exacte ou décimale).|Racionaliza $\dfrac{2}{\sqrt5 - 1}$ (valor exacto o decimal).|$\dfrac{2}{\sqrt5 - 1}$ を有理化せよ（正確な値か小数）。|将 $\dfrac{2}{\sqrt5 - 1}$ 分母有理化（精确值或小数）。`, sol: [R`\frac{2(\sqrt5 + 1)}{5 - 1}`, R`= \frac{\sqrt5 + 1}{2} \approx 1.618`] } });

  A('Powers and roots/Square root of a square', 'The square root of a square|La racine d’un carré|La raíz de un cuadrado|2 乗の平方根|平方的算术平方根',
    { s: R`$\sqrt{\ }$ always gives the non-negative root, so $\sqrt{x^2}$ is $x$ only when $x \ge 0$; for negative $x$ it is $-x$. In one formula: $\lvert x\rvert$. Forgetting this loses solutions or creates false ones.|$\sqrt{\ }$ donne toujours la racine positive : $\sqrt{x^2}$ vaut $x$ seulement si $x \ge 0$ ; sinon $-x$. En une formule : $\lvert x\rvert$. L’oublier fait perdre ou inventer des solutions.|$\sqrt{\ }$ siempre da la raíz no negativa, así que $\sqrt{x^2}$ es $x$ solo si $x \ge 0$; si no, $-x$. En una fórmula: $\lvert x\rvert$. Olvidarlo pierde o inventa soluciones.|$\sqrt{\ }$ は常に 0 以上なので $\sqrt{x^2}$ は $x \ge 0$ のとき $x$、負なら $-x$：つまり $\lvert x\rvert$。|$\sqrt{\ }$ 总取非负根，所以 $\sqrt{x^2}$ 只有 $x \ge 0$ 时等于 $x$，否则为 $-x$：即 $\lvert x\rvert$。`,
      a: [Y(R`\sqrt{x^2} = \lvert x\rvert`, { s: 30 }), AX([-4, 4], [-1, 4]), P('sqrt(x^2)')] },
    { s: R`$\sqrt{(-3)^2} = \sqrt9 = 3 = \lvert -3\rvert$; $\sqrt{(x - 2)^2} = \lvert x - 2\rvert$.|$\sqrt{(-3)^2} = 3$ ; $\sqrt{(x - 2)^2} = \lvert x - 2\rvert$.|$\sqrt{(-3)^2} = 3$; $\sqrt{(x - 2)^2} = \lvert x - 2\rvert$.|$3$、$\lvert x - 2\rvert$。|$3$，$\lvert x - 2\rvert$。`,
      a: [Y(R`\sqrt{(-3)^2} = 3`)] },
    { a: [F(R`\sqrt{(1 - \sqrt2)^2}`)],
      ex: { k: 'val', v: 'sqrt(2)-1', q: R`Simplify $\sqrt{(1 - \sqrt2)^2}$.|Simplifiez $\sqrt{(1 - \sqrt2)^2}$.|Simplifica $\sqrt{(1 - \sqrt2)^2}$.|$\sqrt{(1 - \sqrt2)^2}$ を簡単にせよ。|化简 $\sqrt{(1 - \sqrt2)^2}$。`, sol: [R`\lvert 1 - \sqrt2\rvert,\ 1 - \sqrt2 < 0`, R`= \sqrt2 - 1 \approx 0.414`] } });

  // =============================== Logarithms ===============================
  A('Logarithms/Definition', 'What a logarithm is|Définition du logarithme|Definición de logaritmo|対数の定義|对数的定义',
    { s: R`$\log_a x$ answers “which power of $a$ gives $x$?”. It is the inverse of $x \mapsto a^x$, so it only accepts $x > 0$, and the base must be positive and not 1.|$\log_a x$ répond à « quelle puissance de $a$ donne $x$ ? ». C’est la réciproque de $x \mapsto a^x$ : il n’accepte que $x > 0$, et la base doit être positive et différente de 1.|$\log_a x$ responde a «¿qué potencia de $a$ da $x$?». Es la inversa de $x \mapsto a^x$, así que solo acepta $x > 0$, y la base debe ser positiva y distinta de 1.|$\log_a x$ は「$a$ を何乗すると $x$ か」。$a^x$ の逆関数なので $x > 0$、底は正で 1 でない。|$\log_a x$ 回答“$a$ 的几次方等于 $x$”。它是 $a^x$ 的反函数，只接受 $x > 0$，底数为正且不为 1。`,
      a: [Y(R`\log_a x = y \iff a^y = x`, { s: 30 }), AX([-1, 11], [-3, 4.5]), P('log(x)/log(2)'), PTG(8, 3, 'log₂8 = 3')] },
    { s: R`$\log_2 32 = 5$ because $2^5 = 32$; $\log_3\tfrac19 = -2$ because $3^{-2} = \tfrac19$.|$\log_2 32 = 5$ car $2^5 = 32$ ; $\log_3\tfrac19 = -2$ car $3^{-2} = \tfrac19$.|$\log_2 32 = 5$ porque $2^5 = 32$; $\log_3\tfrac19 = -2$ porque $3^{-2} = \tfrac19$.|$5$、$-2$。|$5$，$-2$。`,
      a: [F(R`\log_2 32 = 5\ (2^5 = 32)`), Y(R`\log_3\tfrac19 = -2\ (3^{-2} = \tfrac19)`)] },
    { a: [F(R`\log_5 125`)],
      ex: { k: 'val', v: '3', q: R`Compute $\log_5 125$.|Calculez $\log_5 125$.|Calcula $\log_5 125$.|$\log_5 125$ を求めよ。|计算 $\log_5 125$。`, sol: [R`5^3 = 125`, R`\log_5 125 = 3`] } });

  A('Logarithms/Product and quotient', 'Log of a product and a quotient|Logarithme d’un produit et d’un quotient|Logaritmo de un producto y un cociente|積と商の対数|积与商的对数',
    { s: R`Multiplying numbers adds their exponents, so logs turn products into sums and quotients into differences. Use it both ways: to expand, or to combine several logs into one.|Multiplier des nombres additionne leurs exposants : le log transforme un produit en somme et un quotient en différence. On s’en sert dans les deux sens : développer, ou regrouper plusieurs logs en un seul.|Multiplicar números suma sus exponentes, así que el log convierte productos en sumas y cocientes en restas. Se usa en los dos sentidos: desarrollar o juntar varios logs en uno.|掛け算は指数の足し算なので、対数は積を和に、商を差にする。展開にも、まとめるのにも使う。|相乘时指数相加，所以对数把积变成和、商变成差。可正反使用：展开，或合并成一个对数。`,
      a: [Y(R`\log(xy) = \log x + \log y,\qquad \log\frac xy = \log x - \log y`, { s: 22 })] },
    { s: R`$\log 2 + \log 50 = \log 100 = 2$ (base 10) — no calculator needed.|$\log 2 + \log 50 = \log 100 = 2$.|$\log 2 + \log 50 = \log 100 = 2$.|$\log 100 = 2$。|$\log 100 = 2$。`,
      a: [Y(R`\log 2 + \log 50 = \log 100 = 2`)] },
    { a: [F(R`\log_2 48 - \log_2 3`)],
      ex: { k: 'val', v: '4', q: R`Compute $\log_2 48 - \log_2 3$.|Calculez $\log_2 48 - \log_2 3$.|Calcula $\log_2 48 - \log_2 3$.|$\log_2 48 - \log_2 3$ を求めよ。|计算 $\log_2 48 - \log_2 3$。`, sol: [R`\log_2\frac{48}{3} = \log_2 16`, R`= 4`] } });

  A('Logarithms/Power', 'Log of a power|Logarithme d’une puissance|Logaritmo de una potencia|累乗の対数|幂的对数',
    { s: R`$x^k$ is $k$ factors $x$, so its log is $k$ copies of $\log x$. This brings exponents down — the key step for solving $a^x = b$.|$x^k$, ce sont $k$ facteurs $x$ : son log vaut $k$ fois $\log x$. Cela fait « descendre » l’exposant — l’étape clé pour résoudre $a^x = b$.|$x^k$ son $k$ factores $x$, así que su log son $k$ copias de $\log x$. Así se «baja» el exponente: el paso clave para resolver $a^x = b$.|$x^k$ は $x$ が $k$ 個なので対数は $k\log x$。指数を下ろせる（$a^x = b$ を解く鍵）。|$x^k$ 是 $k$ 个 $x$ 相乘，其对数是 $k\log x$。这样把指数“拿下来”——解 $a^x = b$ 的关键。`,
      a: [Y(R`\log x^k = k\log x`, { s: 30 })] },
    { s: R`$\log 8 = 3\log 2$; $\log_3\sqrt3 = \tfrac12$.|$\log 8 = 3\log 2$ ; $\log_3\sqrt3 = \tfrac12$.|$\log 8 = 3\log 2$; $\log_3\sqrt3 = \tfrac12$.|$3\log 2$、$\tfrac12$。|$3\log 2$，$\tfrac12$。`,
      a: [Y(R`\log_3\sqrt3 = \tfrac12\log_3 3 = \tfrac12`)] },
    { a: [F(R`\log_2\left(8^5\right)`)],
      ex: { k: 'val', v: '15', q: R`Compute $\log_2\left(8^5\right)$.|Calculez $\log_2\left(8^5\right)$.|Calcula $\log_2\left(8^5\right)$.|$\log_2\left(8^5\right)$ を求めよ。|计算 $\log_2\left(8^5\right)$。`, sol: [R`5\log_2 8 = 5\cdot 3`, R`= 15`] } });

  A('Logarithms/Change of base', 'Change of base|Changement de base|Cambio de base|底の変換|换底公式',
    { s: R`Calculators know $\ln$ and $\log_{10}$; any other base is a ratio of two of those. Choose a common base that makes both numbers nice powers.|Les calculatrices connaissent $\ln$ et $\log_{10}$ ; toute autre base est un quotient de deux d’entre eux. Choisissez une base commune qui rend les deux nombres des puissances simples.|Las calculadoras conocen $\ln$ y $\log_{10}$; cualquier otra base es un cociente de ellos. Elige una base común que haga de ambos números potencias sencillas.|電卓は $\ln$ と $\log_{10}$。他の底は 2 つの比。両方がきれいな累乗になる底を選ぶ。|计算器只有 $\ln$ 和 $\log_{10}$；其他底都是二者之比。选一个使两数都是简单幂的公共底。`,
      a: [Y(R`\log_a x = \frac{\ln x}{\ln a} = \frac{\log_b x}{\log_b a}`, { s: 26 })] },
    { s: R`$\log_4 8 = \tfrac{\log_2 8}{\log_2 4} = \tfrac32$.|$\log_4 8 = \tfrac{3}{2}$.|$\log_4 8 = \tfrac32$.|$\tfrac32$。|$\tfrac32$。`,
      a: [Y(R`\log_4 8 = \frac{\log_2 8}{\log_2 4} = \frac32`)] },
    { a: [F(R`\log_9 27`)],
      ex: { k: 'val', v: '1.5', q: R`Compute $\log_9 27$.|Calculez $\log_9 27$.|Calcula $\log_9 27$.|$\log_9 27$ を求めよ。|计算 $\log_9 27$。`, sol: [R`\frac{\log_3 27}{\log_3 9} = \frac32`] } });

  A('Logarithms/Inverse of the power', 'Logs and powers undo each other|Log et puissance se défont|Log y potencia se deshacen|対数と累乗は互いに逆|对数与幂互逆',
    { s: R`$\log_a$ and $a^{(\ )}$ are inverse functions: one undoes the other. Use it to simplify towers like $10^{2\log 3}$: first move the 2 inside, $10^{\log 9} = 9$.|$\log_a$ et $a^{(\ )}$ sont réciproques : l’une défait l’autre. Pour simplifier $10^{2\log 3}$, on rentre le 2 : $10^{\log 9} = 9$.|$\log_a$ y $a^{(\ )}$ son inversas: una deshace a la otra. Para simplificar $10^{2\log 3}$, mete el 2 dentro: $10^{\log 9} = 9$.|$\log_a$ と $a^{(\ )}$ は逆関数。$10^{2\log 3}$ は 2 を中に入れて $10^{\log 9} = 9$。|$\log_a$ 与 $a^{(\ )}$ 互为反函数。化简 $10^{2\log 3}$：先把 2 移进去，$10^{\log 9} = 9$。`,
      a: [Y(R`a^{\log_a x} = x,\qquad \log_a a^x = x`, { s: 28 })] },
    { s: R`$3^{\log_3 7} = 7$; $\log_2 2^5 = 5$; $e^{\ln 4} = 4$.|$3^{\log_3 7} = 7$ ; $\log_2 2^5 = 5$ ; $e^{\ln 4} = 4$.|$3^{\log_3 7} = 7$; $\log_2 2^5 = 5$; $e^{\ln 4} = 4$.|$7$、$5$、$4$。|$7$，$5$，$4$。`,
      a: [Y(R`3^{\log_3 7} = 7,\quad e^{\ln 4} = 4`)] },
    { a: [F(R`10^{2\log 3}`)],
      ex: { k: 'val', v: '9', q: R`Compute $10^{2\log 3}$ (log in base 10).|Calculez $10^{2\log 3}$ (log en base 10).|Calcula $10^{2\log 3}$ (log en base 10).|$10^{2\log 3}$ を求めよ（常用対数）。|计算 $10^{2\log 3}$（常用对数）。`, sol: [R`2\log 3 = \log 9`, R`10^{\log 9} = 9`] } });

  A('Logarithms/Special values', 'Special values|Valeurs particulières|Valores especiales|特別な値|特殊值',
    { s: R`Every base gives $a^0 = 1$ and $a^1 = a$, so $\log_a 1 = 0$ and $\log_a a = 1$. On the graph, every $\log_a$ crosses the $x$-axis at $(1, 0)$.|Toute base vérifie $a^0 = 1$ et $a^1 = a$ : $\log_a 1 = 0$ et $\log_a a = 1$. Sur le graphe, tout $\log_a$ coupe l’axe des $x$ en $(1, 0)$.|Toda base cumple $a^0 = 1$ y $a^1 = a$, así que $\log_a 1 = 0$ y $\log_a a = 1$. En la gráfica, todo $\log_a$ corta el eje $x$ en $(1, 0)$.|どの底でも $a^0 = 1$、$a^1 = a$ なので $\log_a 1 = 0$、$\log_a a = 1$。どの $\log_a$ も $(1, 0)$ を通る。|任何底都有 $a^0 = 1$、$a^1 = a$，所以 $\log_a 1 = 0$，$\log_a a = 1$。每个 $\log_a$ 都过 $(1, 0)$。`,
      a: [Y(R`\log_a 1 = 0,\quad \log_a a = 1,\quad \ln e = 1`, { s: 26 }), AX([-0.5, 6], [-3, 3]), P('ln(x)'), P('log(x)/log(2)', 'b'), PTG(1, 0, '(1, 0)')] },
    { s: R`$\log_5 1 + \log_5 5 = 0 + 1 = 1$; $\ln e^3 = 3$.|$\log_5 1 + \log_5 5 = 1$ ; $\ln e^3 = 3$.|$\log_5 1 + \log_5 5 = 1$; $\ln e^3 = 3$.|$1$、$3$。|$1$，$3$。`,
      a: [Y(R`\log_5 1 + \log_5 5 = 1`)] },
    { a: [F(R`\log_7 7 + \log_7 1 + \ln e^2`)],
      ex: { k: 'val', v: '3', q: R`Compute $\log_7 7 + \log_7 1 + \ln e^2$.|Calculez $\log_7 7 + \log_7 1 + \ln e^2$.|Calcula $\log_7 7 + \log_7 1 + \ln e^2$.|$\log_7 7 + \log_7 1 + \ln e^2$ を求めよ。|计算 $\log_7 7 + \log_7 1 + \ln e^2$。`, sol: [R`1 + 0 + 2`, R`= 3`] } });

  A('Logarithms/Swap base and argument', 'Swapping base and argument|Échanger base et argument|Intercambiar base y argumento|底と真数の入れ替え|交换底数与真数',
    { s: R`By change of base, $\log_a b = \tfrac{\ln b}{\ln a}$ and $\log_b a = \tfrac{\ln a}{\ln b}$: they are reciprocals. So their product is always 1.|Par changement de base, $\log_a b = \tfrac{\ln b}{\ln a}$ et $\log_b a = \tfrac{\ln a}{\ln b}$ : ce sont des inverses, de produit 1.|Por cambio de base, $\log_a b = \tfrac{\ln b}{\ln a}$ y $\log_b a = \tfrac{\ln a}{\ln b}$: son inversos y su producto es 1.|底の変換で $\log_a b$ と $\log_b a$ は逆数、積は 1。|由换底公式，$\log_a b$ 与 $\log_b a$ 互为倒数，积为 1。`,
      a: [Y(R`\log_a b = \frac{1}{\log_b a}`, { s: 30 })] },
    { s: R`$\log_8 2 = \tfrac{1}{\log_2 8} = \tfrac13$; $\log_2 3\cdot\log_3 2 = 1$.|$\log_8 2 = \tfrac13$ ; $\log_2 3\cdot\log_3 2 = 1$.|$\log_8 2 = \tfrac13$; $\log_2 3\cdot\log_3 2 = 1$.|$\tfrac13$、$1$。|$\tfrac13$，$1$。`,
      a: [Y(R`\log_8 2 = \frac{1}{\log_2 8} = \frac13`)] },
    { a: [F(R`\log_{16} 2`)],
      ex: { k: 'val', v: '0.25', q: R`Compute $\log_{16} 2$.|Calculez $\log_{16} 2$.|Calcula $\log_{16} 2$.|$\log_{16} 2$ を求めよ。|计算 $\log_{16} 2$。`, sol: [R`\frac{1}{\log_2 16} = \frac14`] } });

  // =============================== Identities ===============================
  A('Identities/Square of a sum', 'Square of a sum|Carré d’une somme|Cuadrado de una suma|和の平方|完全平方公式',
    { s: R`Picture a square of side $a + b$: it splits into $a^2$, $b^2$ and two $ab$ rectangles. The middle term $2ab$ is the one people forget.|Imaginez un carré de côté $a + b$ : il se découpe en $a^2$, $b^2$ et deux rectangles $ab$. Le terme du milieu $2ab$ est celui qu’on oublie.|Imagina un cuadrado de lado $a + b$: se divide en $a^2$, $b^2$ y dos rectángulos $ab$. El término central $2ab$ es el que se olvida.|1 辺 $a + b$ の正方形は $a^2$、$b^2$ と 2 つの $ab$ に分かれる。忘れがちなのは $2ab$。|边长 $a + b$ 的正方形分成 $a^2$、$b^2$ 和两个 $ab$ 矩形。常被忘掉的是中间项 $2ab$。`,
      a: [Y(R`(a \pm b)^2 = a^2 \pm 2ab + b^2`, { s: 28 }), S2([1.5, 1.5], 2.1), ...SEQ([RECT(0, 0, 2, 2, 'b', 0.25), RECT(2, 0, 3, 2, 'y', 0.25), RECT(0, 2, 2, 3, 'y', 0.25), RECT(2, 2, 3, 3, 'p', 0.25), LB([1, 1], 'a²', 'chalk'), LB([2.5, 1], 'ab', 'chalk'), LB([1, 2.5], 'ab', 'chalk'), LB([2.5, 2.5], 'b²', 'chalk')], 200, 150)] },
    { s: R`$103^2 = (100 + 3)^2 = 10\,000 + 600 + 9 = 10\,609$.|$103^2 = 10\,000 + 600 + 9 = 10\,609$.|$103^2 = 10\,000 + 600 + 9 = 10\,609$.|$10\,609$。|$10\,609$。`,
      a: [Y(R`103^2 = 100^2 + 2\cdot 300 + 9 = 10\,609`)] },
    { s: TRY_E, a: [F(R`(2x - 3)^2`)],
      ex: { k: 'expr', f: '4x^2-12x+9', q: R`Expand $(2x - 3)^2$.|Développez $(2x - 3)^2$.|Desarrolla $(2x - 3)^2$.|$(2x - 3)^2$ を展開せよ。|展开 $(2x - 3)^2$。`, sol: [R`(2x)^2 - 2\cdot 2x\cdot 3 + 3^2`, R`= 4x^2 - 12x + 9`] } });

  A('Identities/Difference of squares', 'Difference of squares|Différence de deux carrés|Diferencia de cuadrados|平方の差|平方差公式',
    { s: R`$(a - b)(a + b)$: the cross terms $+ab$ and $-ab$ cancel. Read backwards, it factors any difference of two squares — and gives quick mental products.|$(a - b)(a + b)$ : les termes croisés $+ab$ et $-ab$ s’annulent. Lu à l’envers, cela factorise toute différence de carrés — et donne des produits de tête.|$(a - b)(a + b)$: los términos cruzados $+ab$ y $-ab$ se cancelan. Al revés, factoriza toda diferencia de cuadrados y permite productos mentales.|交差項 $+ab$ と $-ab$ が消える。逆に読めば平方の差の因数分解、暗算にも便利。|交叉项 $+ab$ 与 $-ab$ 抵消。反过来可分解平方差，也便于心算。`,
      a: [Y(R`a^2 - b^2 = (a - b)(a + b)`, { s: 30 })] },
    { s: R`$47\cdot 53 = (50 - 3)(50 + 3) = 2500 - 9 = 2491$; $x^2 - 9 = (x - 3)(x + 3)$.|$47\cdot 53 = 2500 - 9 = 2491$.|$47\cdot 53 = 2500 - 9 = 2491$.|$2491$。|$2491$。`,
      a: [Y(R`47\cdot 53 = 50^2 - 3^2 = 2491`)] },
    { a: [F(R`101^2 - 99^2`)],
      ex: { k: 'val', v: '400', q: R`Compute $101^2 - 99^2$ without a calculator.|Calculez $101^2 - 99^2$ sans calculatrice.|Calcula $101^2 - 99^2$ sin calculadora.|電卓なしで $101^2 - 99^2$ を計算せよ。|不用计算器计算 $101^2 - 99^2$。`, sol: [R`(101 - 99)(101 + 99)`, R`= 2\cdot 200 = 400`] } });

  A('Identities/Cube of a sum', 'Cube of a sum|Cube d’une somme|Cubo de una suma|和の 3 乗|和的立方',
    { s: R`The coefficients 1, 3, 3, 1 are row 3 of Pascal’s triangle. With a minus sign, the signs alternate: $+, -, +, -$.|Les coefficients 1, 3, 3, 1 sont la ligne 3 du triangle de Pascal. Avec un moins, les signes alternent : $+, -, +, -$.|Los coeficientes 1, 3, 3, 1 son la fila 3 del triángulo de Pascal. Con un menos, los signos alternan: $+, -, +, -$.|係数 1, 3, 3, 1 はパスカルの三角形の 3 段目。マイナスなら符号が交互。|系数 1, 3, 3, 1 是帕斯卡三角形第 3 行。减号时符号交替。`,
      a: [Y(R`(a \pm b)^3 = a^3 \pm 3a^2b + 3ab^2 \pm b^3`, { s: 26 })] },
    { s: R`$(x + 2)^3 = x^3 + 6x^2 + 12x + 8$.|$(x + 2)^3 = x^3 + 6x^2 + 12x + 8$.|$(x + 2)^3 = x^3 + 6x^2 + 12x + 8$.|展開。|展开。`,
      a: [Y(R`(x + 2)^3 = x^3 + 3\cdot 2x^2 + 3\cdot 4x + 8`, { s: 24 })] },
    { s: TRY_E, a: [F(R`(x - 1)^3`)],
      ex: { k: 'expr', f: 'x^3-3x^2+3x-1', q: R`Expand $(x - 1)^3$.|Développez $(x - 1)^3$.|Desarrolla $(x - 1)^3$.|$(x - 1)^3$ を展開せよ。|展开 $(x - 1)^3$。`, sol: [R`x^3 - 3x^2 + 3x - 1`] } });

  A('Identities/Sum and difference of cubes', 'Sum and difference of cubes|Somme et différence de cubes|Suma y diferencia de cubos|3 乗の和と差|立方和与立方差',
    { s: R`$a^3 + b^3$ always has the factor $a + b$, and $a^3 - b^3$ the factor $a - b$; the other factor is $a^2 \mp ab + b^2$ (signs opposite to the first). It also gives $a^3 + b^3 = (a + b)^3 - 3ab(a + b)$.|$a^3 + b^3$ a toujours le facteur $a + b$, et $a^3 - b^3$ le facteur $a - b$ ; l’autre facteur est $a^2 \mp ab + b^2$. On en tire aussi $a^3 + b^3 = (a + b)^3 - 3ab(a + b)$.|$a^3 + b^3$ siempre tiene el factor $a + b$ y $a^3 - b^3$ el factor $a - b$; el otro es $a^2 \mp ab + b^2$. También da $a^3 + b^3 = (a + b)^3 - 3ab(a + b)$.|$a^3 + b^3$ は $a + b$、$a^3 - b^3$ は $a - b$ を因数にもち、残りは $a^2 \mp ab + b^2$。$a^3 + b^3 = (a + b)^3 - 3ab(a + b)$ も。|$a^3 + b^3$ 总含因子 $a + b$，$a^3 - b^3$ 含 $a - b$；另一个因子为 $a^2 \mp ab + b^2$。还有 $a^3 + b^3 = (a + b)^3 - 3ab(a + b)$。`,
      a: [Y(R`a^3 \pm b^3 = (a \pm b)\left(a^2 \mp ab + b^2\right)`, { s: 26 })] },
    { s: R`$x^3 - 8 = (x - 2)(x^2 + 2x + 4)$; $27 + y^3 = (3 + y)(9 - 3y + y^2)$.|$x^3 - 8 = (x - 2)(x^2 + 2x + 4)$.|$x^3 - 8 = (x - 2)(x^2 + 2x + 4)$.|因数分解。|分解。`,
      a: [Y(R`x^3 - 8 = (x - 2)(x^2 + 2x + 4)`)] },
    { a: [F(R`a + b = 5,\quad ab = 6`)],
      ex: { k: 'val', v: '35', q: R`$a + b = 5$ and $ab = 6$. Find $a^3 + b^3$.|$a + b = 5$ et $ab = 6$. Calculez $a^3 + b^3$.|$a + b = 5$ y $ab = 6$. Halla $a^3 + b^3$.|$a + b = 5$, $ab = 6$ のとき $a^3 + b^3$ を求めよ。|$a + b = 5$，$ab = 6$，求 $a^3 + b^3$。`, sol: [R`(a + b)^3 - 3ab(a + b)`, R`= 125 - 90 = 35`] } });

  A('Identities/Three terms', 'Square of three terms|Carré de trois termes|Cuadrado de tres términos|3 項の平方|三项和的平方',
    { s: R`Each term squared, plus twice every product of two different terms. Rearranged, it links the sum, the sum of squares and the sum of pairwise products: knowing two gives the third.|Chaque terme au carré, plus deux fois chaque produit de deux termes différents. Réarrangé, cela relie la somme, la somme des carrés et la somme des produits deux à deux : deux d’entre elles donnent la troisième.|Cada término al cuadrado más el doble de cada producto de dos términos distintos. Reordenado, relaciona la suma, la suma de cuadrados y la de productos dos a dos: dos dan la tercera.|各項の 2 乗と、異なる 2 項の積の 2 倍の和。和・平方和・2 つずつの積の和を結び、2 つから残りが出る。|每项平方，加上每两项乘积的两倍。它联系和、平方和与两两积之和：知二求一。`,
      a: [Y(R`(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)`, { s: 22 })] },
    { s: R`$a + b + c = 6$, $ab + bc + ca = 11$: $a^2 + b^2 + c^2 = 36 - 22 = 14$ (e.g. 1, 2, 3).|$a + b + c = 6$, $ab + bc + ca = 11$ : $a^2 + b^2 + c^2 = 14$.|$a + b + c = 6$, $ab + bc + ca = 11$: $a^2 + b^2 + c^2 = 14$.|$14$。|$14$。`,
      a: [Y(R`a^2 + b^2 + c^2 = 36 - 2\cdot 11 = 14`)] },
    { a: [F(R`a + b + c = 5,\quad a^2 + b^2 + c^2 = 13`)],
      ex: { k: 'val', v: '6', q: R`$a + b + c = 5$ and $a^2 + b^2 + c^2 = 13$. Find $ab + bc + ca$.|$a + b + c = 5$ et $a^2 + b^2 + c^2 = 13$. Calculez $ab + bc + ca$.|$a + b + c = 5$ y $a^2 + b^2 + c^2 = 13$. Halla $ab + bc + ca$.|$ab + bc + ca$ を求めよ。|求 $ab + bc + ca$。`, sol: [R`25 = 13 + 2(ab + bc + ca)`, R`ab + bc + ca = 6`] } });

  A('Identities/Difference of powers', 'Difference of powers|Différence de puissances|Diferencia de potencias|累乗の差|幂之差',
    { s: R`$a - b$ always divides $a^n - b^n$; the other factor is the geometric sum $a^{n-1} + a^{n-2}b + \dots + b^{n-1}$. With $b = 1$: $x^n - 1 = (x - 1)(x^{n-1} + \dots + x + 1)$.|$a - b$ divise toujours $a^n - b^n$ ; l’autre facteur est la somme géométrique $a^{n-1} + a^{n-2}b + \dots + b^{n-1}$. Avec $b = 1$ : $x^n - 1 = (x - 1)(x^{n-1} + \dots + 1)$.|$a - b$ siempre divide a $a^n - b^n$; el otro factor es la suma geométrica $a^{n-1} + a^{n-2}b + \dots + b^{n-1}$. Con $b = 1$: $x^n - 1 = (x - 1)(x^{n-1} + \dots + 1)$.|$a - b$ は常に $a^n - b^n$ を割り切り、残りは等比数列の和。$b = 1$ なら $x^n - 1 = (x - 1)(x^{n-1} + \dots + 1)$。|$a - b$ 总整除 $a^n - b^n$，另一因子是等比和。取 $b = 1$：$x^n - 1 = (x - 1)(x^{n-1} + \dots + 1)$。`,
      a: [Y(R`a^n - b^n = (a - b)\left(a^{n-1} + a^{n-2}b + \dots + b^{n-1}\right)`, { s: 20 })] },
    { s: R`$x^4 - 1 = (x - 1)(x^3 + x^2 + x + 1)$; $7^5 - 2^5$ is divisible by $5$.|$x^4 - 1 = (x - 1)(x^3 + x^2 + x + 1)$ ; $7^5 - 2^5$ est divisible par 5.|$x^4 - 1 = (x - 1)(x^3 + x^2 + x + 1)$; $7^5 - 2^5$ es divisible entre 5.|$7^5 - 2^5$ は 5 の倍数。|$7^5 - 2^5$ 能被 5 整除。`,
      a: [Y(R`x^4 - 1 = (x - 1)(x^3 + x^2 + x + 1)`)] },
    { a: [F(R`\frac{x^5 - 1}{x - 1},\quad x = 2`)],
      ex: { k: 'val', v: '31', q: R`Evaluate $\dfrac{x^5 - 1}{x - 1}$ at $x = 2$.|Calculez $\dfrac{x^5 - 1}{x - 1}$ en $x = 2$.|Calcula $\dfrac{x^5 - 1}{x - 1}$ en $x = 2$.|$x = 2$ で $\dfrac{x^5 - 1}{x - 1}$ を求めよ。|求 $x = 2$ 时 $\dfrac{x^5 - 1}{x - 1}$。`, sol: [R`x^4 + x^3 + x^2 + x + 1`, R`16 + 8 + 4 + 2 + 1 = 31`] } });

  // =============================== Quadratic equations ===============================
  A('Quadratic equations/Roots of ax² + bx + c = 0', 'The quadratic formula|La formule des racines|La fórmula de la ecuación de segundo grado|解の公式|求根公式',
    { s: R`Completing the square in $ax^2 + bx + c = 0$ gives the formula. The roots are where the parabola meets the $x$-axis, symmetric about $x = -\tfrac{b}{2a}$.|En complétant le carré dans $ax^2 + bx + c = 0$ on obtient la formule. Les racines sont là où la parabole coupe l’axe des $x$, symétriques autour de $x = -\tfrac{b}{2a}$.|Completando el cuadrado en $ax^2 + bx + c = 0$ sale la fórmula. Las raíces son donde la parábola corta el eje $x$, simétricas respecto a $x = -\tfrac{b}{2a}$.|平方完成から公式が出る。解は放物線と $x$ 軸の交点で、$x = -\tfrac{b}{2a}$ に関して対称。|对 $ax^2 + bx + c = 0$ 配方即得公式。根是抛物线与 $x$ 轴的交点，关于 $x = -\tfrac{b}{2a}$ 对称。`,
      a: [Y(R`x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}`, { s: 28 }), AX([-1, 5], [-1.5, 4]), P('x^2-5x+6'), PTG(2, 0, '2'), PTG(3, 0, '3')] },
    { s: R`$2x^2 + 3x - 2 = 0$: $\Delta = 9 + 16 = 25$, $x = \tfrac{-3 \pm 5}{4}$, so $x = \tfrac12$ or $x = -2$.|$2x^2 + 3x - 2 = 0$ : $\Delta = 25$, $x = \tfrac12$ ou $-2$.|$2x^2 + 3x - 2 = 0$: $\Delta = 25$, $x = \tfrac12$ o $-2$.|$x = \tfrac12, -2$。|$x = \tfrac12, -2$。`,
      a: [F(R`\Delta = 9 + 16 = 25`), Y(R`x = \frac{-3 \pm 5}{4} = \tfrac12,\ -2`)] },
    { s: TRY_R, a: [F(R`x^2 - 2x - 15 = 0`)],
      ex: { k: 'roots', v: [5, -3], q: R`Solve $x^2 - 2x - 15 = 0$.|Résolvez $x^2 - 2x - 15 = 0$.|Resuelve $x^2 - 2x - 15 = 0$.|$x^2 - 2x - 15 = 0$ を解け。|解 $x^2 - 2x - 15 = 0$。`, sol: [R`\Delta = 4 + 60 = 64`, R`x = \frac{2 \pm 8}{2} = 5,\ -3`] } });

  A('Quadratic equations/Discriminant', 'The discriminant|Le discriminant|El discriminante|判別式|判别式',
    { s: R`$\Delta = b^2 - 4ac$ is what sits under the root. Positive: two real roots (the parabola crosses the axis). Zero: one double root (it touches). Negative: no real roots (it stays on one side).|$\Delta = b^2 - 4ac$ est ce qui est sous la racine. Positif : deux racines réelles (la parabole coupe l’axe). Nul : une racine double (elle le touche). Négatif : pas de racine réelle.|$\Delta = b^2 - 4ac$ es lo que va bajo la raíz. Positivo: dos raíces reales (la parábola corta el eje). Cero: una raíz doble (lo toca). Negativo: ninguna real.|根号の中身 $\Delta$。正なら 2 実解（交わる）、0 なら重解（接する）、負なら実解なし。|$\Delta = b^2 - 4ac$ 是根号下的部分。正：两个实根（穿过轴）；零：一个重根（相切）；负：无实根。`,
      a: [Y(R`\Delta = b^2 - 4ac`, { s: 30 }), AX([-4, 2], [-2, 4]), P('x^2+2x-1'), P('x^2+2x+1', 'b'), P('x^2+2x+2', 'p')] },
    { s: R`$x^2 + 4x + 5$: $\Delta = 16 - 20 = -4 < 0$, no real roots. $x^2 - 6x + 9$: $\Delta = 0$, double root 3.|$x^2 + 4x + 5$ : $\Delta = -4$, pas de racine. $x^2 - 6x + 9$ : $\Delta = 0$, racine double 3.|$x^2 + 4x + 5$: $\Delta = -4$, sin raíces. $x^2 - 6x + 9$: $\Delta = 0$, raíz doble 3.|実解なし／重解 3。|无实根；重根 3。`,
      a: [F(R`x^2 + 4x + 5:\ \Delta = -4 < 0`), Y(R`x^2 - 6x + 9:\ \Delta = 0`)] },
    { a: [F(R`x^2 + 6x + k = 0`)],
      ex: { k: 'val', v: '9', q: R`For which $k$ does $x^2 + 6x + k = 0$ have a double root?|Pour quel $k$ l’équation $x^2 + 6x + k = 0$ a-t-elle une racine double ?|¿Para qué $k$ tiene $x^2 + 6x + k = 0$ una raíz doble?|$x^2 + 6x + k = 0$ が重解をもつ $k$ は？|$k$ 为何值时 $x^2 + 6x + k = 0$ 有重根？`, sol: [R`\Delta = 36 - 4k = 0`, R`k = 9`] } });

  A('Quadratic equations/Vieta’s formulas', 'Vieta’s formulas|Relations de Viète|Fórmulas de Vieta|解と係数の関係|韦达定理',
    { s: R`Expand $a(x - x_1)(x - x_2)$ and compare with $ax^2 + bx + c$: the sum of the roots is $-\tfrac ba$ and the product $\tfrac ca$. They let you work with the roots without finding them.|En développant $a(x - x_1)(x - x_2)$ et en comparant à $ax^2 + bx + c$ : somme des racines $-\tfrac ba$, produit $\tfrac ca$. On manipule les racines sans les calculer.|Desarrolla $a(x - x_1)(x - x_2)$ y compara con $ax^2 + bx + c$: la suma de raíces es $-\tfrac ba$ y el producto $\tfrac ca$. Permiten trabajar con las raíces sin hallarlas.|$a(x - x_1)(x - x_2)$ を展開して比べると和 $-\tfrac ba$、積 $\tfrac ca$。解を求めずに扱える。|展开 $a(x - x_1)(x - x_2)$ 与 $ax^2 + bx + c$ 比较：两根之和 $-\tfrac ba$，之积 $\tfrac ca$。无需求根即可运算。`,
      a: [Y(R`x_1 + x_2 = -\frac ba,\qquad x_1 x_2 = \frac ca`, { s: 28 })] },
    { s: R`$x^2 - 7x + 10$: sum 7, product 10 — the roots are 2 and 5. And $x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2$.|$x^2 - 7x + 10$ : somme 7, produit 10 — racines 2 et 5. Et $x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2$.|$x^2 - 7x + 10$: suma 7, producto 10; raíces 2 y 5. Y $x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2$.|和 7、積 10 で 2 と 5。|和 7，积 10：2 与 5。`,
      a: [F(R`x_1 + x_2 = 7,\quad x_1x_2 = 10`), Y(R`x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2`)] },
    { a: [F(R`2x^2 - 6x + 1 = 0`)],
      ex: { k: 'val', v: '8', q: R`The roots of $2x^2 - 6x + 1 = 0$ are $x_1$, $x_2$. Find $x_1^2 + x_2^2$.|Les racines de $2x^2 - 6x + 1 = 0$ sont $x_1$, $x_2$. Calculez $x_1^2 + x_2^2$.|Las raíces de $2x^2 - 6x + 1 = 0$ son $x_1$, $x_2$. Halla $x_1^2 + x_2^2$.|$2x^2 - 6x + 1 = 0$ の解について $x_1^2 + x_2^2$ を求めよ。|$2x^2 - 6x + 1 = 0$ 的两根为 $x_1$、$x_2$，求 $x_1^2 + x_2^2$。`, sol: [R`x_1 + x_2 = 3,\ x_1x_2 = \tfrac12`, R`9 - 1 = 8`] } });

  A('Quadratic equations/Vertex form', 'Vertex form (completing the square)|Forme canonique|Forma canónica|平方完成|配方法',
    { s: R`Complete the square: $ax^2 + bx + c = a\left(x + \tfrac{b}{2a}\right)^2 - \tfrac{\Delta}{4a}$. The vertex is $\left(-\tfrac{b}{2a}, -\tfrac{\Delta}{4a}\right)$, which gives the minimum (if $a > 0$) or maximum value.|On complète le carré : $ax^2 + bx + c = a\left(x + \tfrac{b}{2a}\right)^2 - \tfrac{\Delta}{4a}$. Le sommet est $\left(-\tfrac{b}{2a}, -\tfrac{\Delta}{4a}\right)$ : c’est le minimum (si $a > 0$) ou le maximum.|Completa el cuadrado: $ax^2 + bx + c = a\left(x + \tfrac{b}{2a}\right)^2 - \tfrac{\Delta}{4a}$. El vértice es $\left(-\tfrac{b}{2a}, -\tfrac{\Delta}{4a}\right)$: el mínimo (si $a > 0$) o el máximo.|平方完成すると頂点 $\left(-\tfrac{b}{2a}, -\tfrac{\Delta}{4a}\right)$ が出て、最小値（$a > 0$）か最大値がわかる。|配方得顶点 $\left(-\tfrac{b}{2a}, -\tfrac{\Delta}{4a}\right)$，即最小值（$a > 0$）或最大值。`,
      a: [Y(R`ax^2 + bx + c = a\left(x + \frac{b}{2a}\right)^2 - \frac{\Delta}{4a}`, { s: 22 }), AX([-1, 5], [-6, 6]), P('2x^2-8x+3'), PTG(2, -5, '(2, −5)')] },
    { s: R`$2x^2 - 8x + 3 = 2(x^2 - 4x + 4) - 8 + 3 = 2(x - 2)^2 - 5$: minimum $-5$ at $x = 2$.|$2x^2 - 8x + 3 = 2(x - 2)^2 - 5$ : minimum $-5$ en $x = 2$.|$2x^2 - 8x + 3 = 2(x - 2)^2 - 5$: mínimo $-5$ en $x = 2$.|最小値 $-5$。|最小值 $-5$。`,
      a: [Y(R`2(x - 2)^2 - 5`)] },
    { a: [F(R`x^2 + 4x + 9`)],
      ex: { k: 'val', v: '5', q: R`Find the minimum value of $x^2 + 4x + 9$.|Trouvez la valeur minimale de $x^2 + 4x + 9$.|Halla el valor mínimo de $x^2 + 4x + 9$.|$x^2 + 4x + 9$ の最小値を求めよ。|求 $x^2 + 4x + 9$ 的最小值。`, sol: [R`(x + 2)^2 + 5`, R`\min = 5`] } });

  A('Quadratic equations/Factored form', 'Factored form|Forme factorisée|Forma factorizada|因数分解形|因式分解形式',
    { s: R`If $x_1$, $x_2$ are the roots, the quadratic is $a(x - x_1)(x - x_2)$. To factor, find the roots (formula or Vieta) and write them in. Don’t forget the leading coefficient $a$.|Si $x_1$, $x_2$ sont les racines, le trinôme vaut $a(x - x_1)(x - x_2)$. Pour factoriser, on trouve les racines puis on les écrit. N’oubliez pas le coefficient $a$.|Si $x_1$, $x_2$ son las raíces, el polinomio es $a(x - x_1)(x - x_2)$. Para factorizar, halla las raíces y escríbelas. No olvides el coeficiente $a$.|解 $x_1$, $x_2$ を使えば $a(x - x_1)(x - x_2)$。最高次の係数 $a$ を忘れない。|根为 $x_1$、$x_2$ 时二次式为 $a(x - x_1)(x - x_2)$。先求根再写入，别忘首项系数 $a$。`,
      a: [Y(R`ax^2 + bx + c = a(x - x_1)(x - x_2)`, { s: 26 })] },
    { s: R`$2x^2 - x - 3$: roots $\tfrac32$ and $-1$, so $2\left(x - \tfrac32\right)(x + 1) = (2x - 3)(x + 1)$.|$2x^2 - x - 3 = (2x - 3)(x + 1)$.|$2x^2 - x - 3 = (2x - 3)(x + 1)$.|$(2x - 3)(x + 1)$。|$(2x - 3)(x + 1)$。`,
      a: [F(R`x_1 = \tfrac32,\ x_2 = -1`), Y(R`2x^2 - x - 3 = (2x - 3)(x + 1)`)] },
    { s: TRY_E, a: [F(R`x^2 + x - 12`)],
      ex: { k: 'expr', f: '(x+4)(x-3)', q: R`Factor $x^2 + x - 12$.|Factorisez $x^2 + x - 12$.|Factoriza $x^2 + x - 12$.|$x^2 + x - 12$ を因数分解せよ。|分解因式 $x^2 + x - 12$。`, sol: [R`\text{roots } 3,\ -4`, R`(x - 3)(x + 4)`] } });

  // =============================== Polynomials ===============================
  A('Polynomials/Remainder theorem', 'The remainder theorem|Le théorème du reste|El teorema del resto|剰余の定理|余数定理',
    { s: R`Dividing by $x - a$ leaves a constant remainder $r$: $P(x) = (x - a)Q(x) + r$. Put $x = a$: the first term vanishes, so $r = P(a)$. No long division needed.|La division par $x - a$ laisse un reste constant $r$ : $P(x) = (x - a)Q(x) + r$. En $x = a$, le premier terme s’annule : $r = P(a)$. Pas besoin de poser la division.|Dividir entre $x - a$ deja un resto constante $r$: $P(x) = (x - a)Q(x) + r$. Con $x = a$ el primer término se anula: $r = P(a)$. Sin hacer la división.|$x - a$ で割った余りは定数 $r$。$x = a$ を代入すると $r = P(a)$。割り算は不要。|除以 $x - a$ 余数为常数 $r$：$P(x) = (x - a)Q(x) + r$。代入 $x = a$ 得 $r = P(a)$，无需长除。`,
      a: [Y(R`P(x) = (x - a)\,Q(x) + P(a)`, { s: 28 })] },
    { s: R`$x^3 - 2x + 5$ divided by $x - 2$: remainder $P(2) = 8 - 4 + 5 = 9$.|$x^3 - 2x + 5$ par $x - 2$ : reste $P(2) = 9$.|$x^3 - 2x + 5$ entre $x - 2$: resto $P(2) = 9$.|余り 9。|余数 9。`,
      a: [Y(R`P(2) = 8 - 4 + 5 = 9`)] },
    { a: [F(R`P(x) = x^4 - 3x + 1,\quad x - 2`)],
      ex: { k: 'val', v: '11', q: R`Find the remainder when $x^4 - 3x + 1$ is divided by $x - 2$.|Trouvez le reste de la division de $x^4 - 3x + 1$ par $x - 2$.|Halla el resto de dividir $x^4 - 3x + 1$ entre $x - 2$.|$x^4 - 3x + 1$ を $x - 2$ で割った余りは？|求 $x^4 - 3x + 1$ 除以 $x - 2$ 的余数。`, sol: [R`P(2) = 16 - 6 + 1`, R`= 11`] } });

  A('Polynomials/Factor theorem', 'The factor theorem|Le théorème du facteur|El teorema del factor|因数定理|因式定理',
    { s: R`A remainder of 0 means $x - a$ divides $P$. So every root gives a factor, and finding one root of a cubic reduces it to a quadratic.|Un reste nul signifie que $x - a$ divise $P$. Chaque racine donne un facteur, et trouver une racine d’un polynôme de degré 3 le ramène au degré 2.|Un resto 0 significa que $x - a$ divide a $P$. Cada raíz da un factor, y hallar una raíz de una cúbica la reduce a una cuadrática.|余りが 0 なら $x - a$ は $P$ の因数。解 1 つで 3 次式は 2 次式に下がる。|余数为 0 即 $x - a$ 整除 $P$。每个根给出一个因式，找到三次式的一个根就降为二次。`,
      a: [Y(R`P(a) = 0 \iff (x - a) \mid P(x)`, { s: 28 }), AX([0, 4], [-1, 1]), P('x^3-6x^2+11x-6'), PTG(1, 0, '1'), PTG(2, 0, '2'), PTG(3, 0, '3')] },
    { s: R`$x^3 - 6x^2 + 11x - 6$: $P(1) = 0$, so it equals $(x - 1)(x^2 - 5x + 6) = (x - 1)(x - 2)(x - 3)$.|$P(1) = 0$ : $(x - 1)(x^2 - 5x + 6) = (x - 1)(x - 2)(x - 3)$.|$P(1) = 0$: $(x - 1)(x^2 - 5x + 6) = (x - 1)(x - 2)(x - 3)$.|$(x - 1)(x - 2)(x - 3)$。|$(x - 1)(x - 2)(x - 3)$。`,
      a: [F(R`P(1) = 1 - 6 + 11 - 6 = 0`), Y(R`(x - 1)(x - 2)(x - 3)`)] },
    { a: [F(R`P(x) = x^3 + kx - 6,\quad (x - 2) \mid P`)],
      ex: { k: 'val', v: '-1', q: R`Find $k$ so that $x - 2$ is a factor of $x^3 + kx - 6$.|Trouvez $k$ pour que $x - 2$ soit un facteur de $x^3 + kx - 6$.|Halla $k$ para que $x - 2$ sea factor de $x^3 + kx - 6$.|$x - 2$ が $x^3 + kx - 6$ の因数となる $k$ は？|求 $k$ 使 $x - 2$ 是 $x^3 + kx - 6$ 的因式。`, sol: [R`P(2) = 8 + 2k - 6 = 0`, R`k = -1`] } });

  A('Polynomials/Vieta for a cubic', 'Vieta’s formulas for a cubic|Relations de Viète pour un polynôme de degré 3|Vieta para una cúbica|3 次方程式の解と係数|三次方程的韦达定理',
    { s: R`Expanding $a(x - x_1)(x - x_2)(x - x_3)$ gives the sum, the sum of pairwise products and the product of the roots in terms of the coefficients, with alternating signs.|En développant $a(x - x_1)(x - x_2)(x - x_3)$ on obtient la somme, la somme des produits deux à deux et le produit des racines, avec des signes alternés.|Desarrollando $a(x - x_1)(x - x_2)(x - x_3)$ se obtienen la suma, la suma de productos dos a dos y el producto de las raíces, con signos alternados.|$a(x - x_1)(x - x_2)(x - x_3)$ を展開すると、和・2 つずつの積の和・積が符号を交互にして係数で表される。|展开 $a(x - x_1)(x - x_2)(x - x_3)$ 得到根之和、两两积之和与根之积，符号交替。`,
      a: [Y(R`\sum x_i = -\frac ba,\quad \sum x_ix_j = \frac ca,\quad x_1x_2x_3 = -\frac da`, { s: 22 })] },
    { s: R`$x^3 - 6x^2 + 11x - 6$ (roots 1, 2, 3): sum 6, pairwise sum 11, product 6.|Racines 1, 2, 3 : somme 6, somme des produits 11, produit 6.|Raíces 1, 2, 3: suma 6, suma de productos 11, producto 6.|和 6、11、積 6。|和 6、11、积 6。`,
      a: [Y(R`1 + 2 + 3 = 6,\ 2 + 3 + 6 = 11,\ 1\cdot 2\cdot 3 = 6`, { s: 24 })] },
    { a: [F(R`2x^3 - 4x^2 + x + 5 = 0`)],
      ex: { k: 'val', v: '-2.5', q: R`Find the product of the roots of $2x^3 - 4x^2 + x + 5 = 0$.|Trouvez le produit des racines de $2x^3 - 4x^2 + x + 5 = 0$.|Halla el producto de las raíces de $2x^3 - 4x^2 + x + 5 = 0$.|$2x^3 - 4x^2 + x + 5 = 0$ の解の積を求めよ。|求 $2x^3 - 4x^2 + x + 5 = 0$ 三根之积。`, sol: [R`-\frac da = -\frac52`] } });

  A('Polynomials/Rational roots', 'Rational roots|Racines rationnelles|Raíces racionales|有理数解|有理根',
    { s: R`If $\tfrac pq$ (in lowest terms) is a root of a polynomial with integer coefficients, $p$ divides the constant term and $q$ the leading coefficient. That gives a short list of candidates to test.|Si $\tfrac pq$ (irréductible) est racine d’un polynôme à coefficients entiers, $p$ divise le terme constant et $q$ le coefficient dominant. On obtient une courte liste de candidats à tester.|Si $\tfrac pq$ (irreducible) es raíz de un polinomio de coeficientes enteros, $p$ divide al término independiente y $q$ al coeficiente principal. Así sale una lista corta de candidatos.|整数係数多項式の有理数解 $\tfrac pq$ では $p$ は定数項、$q$ は最高次係数の約数。候補が少しに絞れる。|整系数多项式的有理根 $\tfrac pq$（既约）中，$p$ 整除常数项，$q$ 整除首项系数。候选很少。`,
      a: [Y(R`x = \frac pq \Rightarrow p \mid a_0,\ q \mid a_n`, { s: 28 })] },
    { s: R`$2x^3 - 3x^2 - 3x + 2$: candidates $\pm 1, \pm 2, \pm\tfrac12$. Testing gives the roots $2$, $-1$, $\tfrac12$.|Candidats $\pm 1, \pm 2, \pm\tfrac12$ ; racines $2$, $-1$, $\tfrac12$.|Candidatos $\pm 1, \pm 2, \pm\tfrac12$; raíces $2$, $-1$, $\tfrac12$.|解 $2, -1, \tfrac12$。|根 $2, -1, \tfrac12$。`,
      a: [F(R`\pm 1,\ \pm 2,\ \pm\tfrac12`), Y(R`x = 2,\ -1,\ \tfrac12`)] },
    { s: TRY_R, a: [F(R`x^3 - 2x^2 - 5x + 6 = 0`)],
      ex: { k: 'roots', v: [1, 3, -2], q: R`Find all roots of $x^3 - 2x^2 - 5x + 6 = 0$.|Trouvez toutes les racines de $x^3 - 2x^2 - 5x + 6 = 0$.|Halla todas las raíces de $x^3 - 2x^2 - 5x + 6 = 0$.|$x^3 - 2x^2 - 5x + 6 = 0$ の解をすべて求めよ。|求 $x^3 - 2x^2 - 5x + 6 = 0$ 的全部根。`, sol: [R`P(1) = 0 \Rightarrow (x - 1)(x^2 - x - 6)`, R`x = 1,\ 3,\ -2`] } });

  // =============================== Inequalities ===============================
  A('Inequalities/AM–GM', 'AM–GM inequality|Inégalité arithmético-géométrique|Desigualdad de las medias|相加相乗平均|均值不等式',
    { s: R`$\tfrac{a + b}{2} - \sqrt{ab} = \tfrac12\left(\sqrt a - \sqrt b\right)^2 \ge 0$, with equality when $a = b$. It gives extremes without calculus: a fixed sum makes the product largest when the parts are equal, and a fixed product makes the sum smallest.|$\tfrac{a + b}{2} - \sqrt{ab} = \tfrac12\left(\sqrt a - \sqrt b\right)^2 \ge 0$, avec égalité si $a = b$. On en tire des extremums sans dérivée : à somme fixée, le produit est maximal quand les parts sont égales, et à produit fixé la somme est minimale.|$\tfrac{a + b}{2} - \sqrt{ab} = \tfrac12\left(\sqrt a - \sqrt b\right)^2 \ge 0$, con igualdad si $a = b$. Da extremos sin derivadas: con suma fija el producto es máximo si las partes son iguales, y con producto fijo la suma es mínima.|$\tfrac{a + b}{2} - \sqrt{ab} = \tfrac12\left(\sqrt a - \sqrt b\right)^2 \ge 0$（等号は $a = b$）。和一定なら積は等しいとき最大、積一定なら和は最小。|$\tfrac{a + b}{2} - \sqrt{ab} = \tfrac12\left(\sqrt a - \sqrt b\right)^2 \ge 0$，$a = b$ 时取等。和定积最大，积定和最小。`,
      a: [Y(R`\frac{a + b}{2} \ge \sqrt{ab}`, { s: 30 })] },
    { s: R`A rectangle with perimeter 20 has $a + b = 10$, so $ab \le 25$: the square $5 \times 5$ has the largest area.|Un rectangle de périmètre 20 : $a + b = 10$, donc $ab \le 25$ : le carré $5 \times 5$.|Un rectángulo de perímetro 20: $a + b = 10$, así que $ab \le 25$: el cuadrado $5 \times 5$.|面積最大は $5 \times 5$。|面积最大为 $5 \times 5$。`,
      a: [Y(R`ab \le \left(\frac{a + b}{2}\right)^2 = 25`)] },
    { a: [F(R`x + \frac9x,\quad x > 0`)],
      ex: { k: 'val', v: '6', q: R`Find the minimum of $x + \tfrac9x$ for $x > 0$.|Trouvez le minimum de $x + \tfrac9x$ pour $x > 0$.|Halla el mínimo de $x + \tfrac9x$ para $x > 0$.|$x > 0$ で $x + \tfrac9x$ の最小値は？|$x > 0$ 时求 $x + \tfrac9x$ 的最小值。`, sol: [R`x + \frac9x \ge 2\sqrt{9}`, R`= 6\ (x = 3)`] } });

  A('Inequalities/AM–GM for n numbers', 'AM–GM for n numbers|Inégalité arithmético-géométrique à n termes|Desigualdad de las medias para n números|n 個の相加相乗平均|n 元均值不等式',
    { s: R`The arithmetic mean of non-negative numbers is at least their geometric mean, with equality only when they are all equal. Choose the pieces so that their product (or sum) is fixed.|La moyenne arithmétique de nombres positifs est au moins leur moyenne géométrique, avec égalité seulement s’ils sont tous égaux. On choisit les morceaux pour que leur produit (ou leur somme) soit fixé.|La media aritmética de números no negativos es al menos su media geométrica, con igualdad solo si son todos iguales. Elige los trozos de modo que su producto (o su suma) sea fijo.|非負の数の相加平均は相乗平均以上（等号はすべて等しいとき）。積か和が一定になるように分ける。|非负数的算术平均不小于几何平均，全相等时取等。拆分时让积（或和）固定。`,
      a: [Y(R`\frac{a_1 + \dots + a_n}{n} \ge \sqrt[n]{a_1\cdots a_n}`, { s: 26 })] },
    { s: R`$a + b + c = 12$ (positive): $abc \le 4^3 = 64$, reached at $a = b = c = 4$.|$a + b + c = 12$ : $abc \le 64$, atteint pour $a = b = c = 4$.|$a + b + c = 12$: $abc \le 64$, con $a = b = c = 4$.|$abc \le 64$。|$abc \le 64$。`,
      a: [Y(R`abc \le \left(\frac{12}{3}\right)^3 = 64`)] },
    { a: [F(R`xyz = 27,\quad x, y, z > 0`)],
      ex: { k: 'val', v: '9', q: R`Positive numbers $x, y, z$ have product 27. Find the smallest possible value of $x + y + z$.|Des nombres positifs $x, y, z$ ont pour produit 27. Trouvez la plus petite valeur possible de $x + y + z$.|Los positivos $x, y, z$ tienen producto 27. Halla el menor valor posible de $x + y + z$.|正の数 $x, y, z$ の積が 27。$x + y + z$ の最小値は？|正数 $x, y, z$ 之积为 27，求 $x + y + z$ 的最小值。`, sol: [R`x + y + z \ge 3\sqrt[3]{27}`, R`= 9`] } });

  A('Inequalities/Cauchy–Schwarz', 'The Cauchy–Schwarz inequality|L’inégalité de Cauchy–Schwarz|La desigualdad de Cauchy–Schwarz|コーシー・シュワルツの不等式|柯西不等式',
    { s: R`For vectors, $\lvert\vec u\cdot\vec v\rvert \le \lvert\vec u\rvert\,\lvert\vec v\rvert$ because $\lvert\cos\theta\rvert \le 1$. Written with coordinates it bounds a linear expression on a circle or sphere; equality when the vectors are parallel.|Pour des vecteurs, $\lvert\vec u\cdot\vec v\rvert \le \lvert\vec u\rvert\,\lvert\vec v\rvert$ car $\lvert\cos\theta\rvert \le 1$. En coordonnées, cela borne une expression linéaire sur un cercle ou une sphère ; égalité si les vecteurs sont colinéaires.|Para vectores, $\lvert\vec u\cdot\vec v\rvert \le \lvert\vec u\rvert\,\lvert\vec v\rvert$ porque $\lvert\cos\theta\rvert \le 1$. En coordenadas acota una expresión lineal sobre una circunferencia o esfera; igualdad si son paralelos.|ベクトルでは $\lvert\cos\theta\rvert \le 1$ より $\lvert\vec u\cdot\vec v\rvert \le \lvert\vec u\rvert\lvert\vec v\rvert$。円や球の上での 1 次式の最大値がわかる（平行で等号）。|向量形式 $\lvert\vec u\cdot\vec v\rvert \le \lvert\vec u\rvert\lvert\vec v\rvert$（因 $\lvert\cos\theta\rvert \le 1$）。坐标形式给出圆或球上线性式的界，平行时取等。`,
      a: [Y(R`\left(\textstyle\sum a_ib_i\right)^2 \le \left(\sum a_i^2\right)\left(\sum b_i^2\right)`, { s: 24 })] },
    { s: R`If $a^2 + b^2 = 5$, then $(a + 2b)^2 \le 5\cdot(1 + 4) = 25$, so $a + 2b \le 5$ (at $a = 1$, $b = 2$).|Si $a^2 + b^2 = 5$ : $(a + 2b)^2 \le 25$, donc $a + 2b \le 5$.|Si $a^2 + b^2 = 5$: $(a + 2b)^2 \le 25$, así que $a + 2b \le 5$.|最大 5。|最大值 5。`,
      a: [Y(R`(1\cdot a + 2\cdot b)^2 \le (1 + 4)(a^2 + b^2) = 25`, { s: 22 })] },
    { a: [F(R`x^2 + y^2 = 1`)],
      ex: { k: 'val', v: '5', q: R`Find the maximum of $3x + 4y$ when $x^2 + y^2 = 1$.|Trouvez le maximum de $3x + 4y$ quand $x^2 + y^2 = 1$.|Halla el máximo de $3x + 4y$ si $x^2 + y^2 = 1$.|$x^2 + y^2 = 1$ のとき $3x + 4y$ の最大値は？|$x^2 + y^2 = 1$ 时 $3x + 4y$ 的最大值是多少？`, sol: [R`(3x + 4y)^2 \le 25\cdot 1`, R`\max = 5`] } });

  A('Inequalities/Triangle inequality', 'The triangle inequality for absolute values|L’inégalité triangulaire|La desigualdad triangular|三角不等式（絶対値）|绝对值三角不等式',
    { s: R`$\lvert a + b\rvert \le \lvert a\rvert + \lvert b\rvert$: going $a$ then $b$ along the line never gets you farther than the two distances added. Equality when $a$ and $b$ have the same sign. A typical use: $\lvert x - p\rvert + \lvert x - q\rvert \ge \lvert p - q\rvert$.|$\lvert a + b\rvert \le \lvert a\rvert + \lvert b\rvert$ : faire $a$ puis $b$ sur la droite n’emmène jamais plus loin que la somme des distances. Égalité si $a$ et $b$ ont le même signe. Usage typique : $\lvert x - p\rvert + \lvert x - q\rvert \ge \lvert p - q\rvert$.|$\lvert a + b\rvert \le \lvert a\rvert + \lvert b\rvert$: avanzar $a$ y luego $b$ nunca lleva más lejos que la suma de distancias. Igualdad si tienen el mismo signo. Uso típico: $\lvert x - p\rvert + \lvert x - q\rvert \ge \lvert p - q\rvert$.|$\lvert a + b\rvert \le \lvert a\rvert + \lvert b\rvert$（同符号で等号）。典型例：$\lvert x - p\rvert + \lvert x - q\rvert \ge \lvert p - q\rvert$。|$\lvert a + b\rvert \le \lvert a\rvert + \lvert b\rvert$（同号时取等）。典型应用：$\lvert x - p\rvert + \lvert x - q\rvert \ge \lvert p - q\rvert$。`,
      a: [Y(R`\lvert a + b\rvert \le \lvert a\rvert + \lvert b\rvert`, { s: 28 }), AX([-2, 8], [-1, 9]), P('abs(x-1)+abs(x-5)'), P('4', 'g', { dash: true })] },
    { s: R`$\lvert x - 1\rvert + \lvert x - 5\rvert \ge \lvert (x - 1) - (x - 5)\rvert = 4$, with equality for every $x$ between 1 and 5 — the flat bottom of the graph.|$\lvert x - 1\rvert + \lvert x - 5\rvert \ge 4$, égalité pour $1 \le x \le 5$.|$\lvert x - 1\rvert + \lvert x - 5\rvert \ge 4$, igualdad para $1 \le x \le 5$.|最小値 4。|最小值 4。`,
      a: [Y(R`\lvert x - 1\rvert + \lvert x - 5\rvert \ge 4`)] },
    { a: [F(R`\lvert x + 2\rvert + \lvert x - 6\rvert`)],
      ex: { k: 'val', v: '8', q: R`Find the minimum value of $\lvert x + 2\rvert + \lvert x - 6\rvert$.|Trouvez la valeur minimale de $\lvert x + 2\rvert + \lvert x - 6\rvert$.|Halla el valor mínimo de $\lvert x + 2\rvert + \lvert x - 6\rvert$.|$\lvert x + 2\rvert + \lvert x - 6\rvert$ の最小値は？|求 $\lvert x + 2\rvert + \lvert x - 6\rvert$ 的最小值。`, sol: [R`\ge \lvert (x + 2) - (x - 6)\rvert`, R`= 8`] } });

  A('Inequalities/Absolute value', 'Inequalities with absolute value|Inéquations avec valeur absolue|Inecuaciones con valor absoluto|絶対値を含む不等式|含绝对值的不等式',
    { s: R`$\lvert x\rvert$ is the distance from 0. “Distance less than $a$” is the interval between $-a$ and $a$; “more than $a$” is the two outer rays. With $\lvert x - c\rvert$ the centre moves to $c$.|$\lvert x\rvert$ est la distance à 0. « Distance inférieure à $a$ » : l’intervalle entre $-a$ et $a$ ; « supérieure à $a$ » : les deux demi-droites extérieures. Avec $\lvert x - c\rvert$, le centre devient $c$.|$\lvert x\rvert$ es la distancia a 0. «Distancia menor que $a$» es el intervalo entre $-a$ y $a$; «mayor que $a$», las dos semirrectas exteriores. Con $\lvert x - c\rvert$ el centro pasa a $c$.|$\lvert x\rvert$ は 0 からの距離。「$a$ 未満」は $-a$〜$a$、「$a$ より大」は外側の 2 つ。$\lvert x - c\rvert$ なら中心は $c$。|$\lvert x\rvert$ 是到 0 的距离。“小于 $a$”是 $-a$ 到 $a$ 的区间；“大于 $a$”是外侧两条射线。$\lvert x - c\rvert$ 的中心移到 $c$。`,
      a: [Y(R`\lvert x\rvert < a \iff -a < x < a`, { s: 28 }), ...LINE([[1, 5]], [[1, false, '1'], [5, false, '5']], [3, 0], 3.6)] },
    { s: R`$\lvert x - 3\rvert < 2$: within 2 of 3, so $1 < x < 5$.|$\lvert x - 3\rvert < 2$ : $1 < x < 5$.|$\lvert x - 3\rvert < 2$: $1 < x < 5$.|$1 < x < 5$。|$1 < x < 5$。`,
      a: [Y(R`-2 < x - 3 < 2 \iff 1 < x < 5`)] },
    { a: [F(R`\lvert 2x + 1\rvert \le 5`)],
      ex: { k: 'val', v: '6', q: R`How many integers satisfy $\lvert 2x + 1\rvert \le 5$?|Combien d’entiers vérifient $\lvert 2x + 1\rvert \le 5$ ?|¿Cuántos enteros cumplen $\lvert 2x + 1\rvert \le 5$?|$\lvert 2x + 1\rvert \le 5$ を満たす整数は何個か。|满足 $\lvert 2x + 1\rvert \le 5$ 的整数有几个？`, sol: [R`-5 \le 2x + 1 \le 5 \iff -3 \le x \le 2`, R`-3, \dots, 2:\ 6`] } });

  A('Inequalities/Multiplying by a negative', 'Multiplying by a negative number|Multiplier par un nombre négatif|Multiplicar por un número negativo|負の数を掛けるとき|乘以负数',
    { s: R`Multiplying by a negative number reflects the number line, so the order flips: $2 < 3$ but $-2 > -3$. Whenever you multiply or divide an inequality by a negative, reverse the sign.|Multiplier par un négatif retourne la droite numérique : l’ordre s’inverse, $2 < 3$ mais $-2 > -3$. Dès qu’on multiplie ou divise par un négatif, on change le sens.|Multiplicar por un negativo refleja la recta, así que el orden se invierte: $2 < 3$ pero $-2 > -3$. Al multiplicar o dividir por un negativo, cambia el sentido.|負の数を掛けると数直線が反転し大小が逆に（$2 < 3$ だが $-2 > -3$）。不等号の向きを変える。|乘以负数相当于翻转数轴，大小颠倒：$2 < 3$ 但 $-2 > -3$。乘除负数时改变不等号方向。`,
      a: [Y(R`a < b,\ c < 0 \Rightarrow ac > bc`, { s: 28 })] },
    { s: R`$-2x < 6$: divide by $-2$ and flip: $x > -3$.|$-2x < 6$ : on divise par $-2$ et on retourne : $x > -3$.|$-2x < 6$: divide entre $-2$ y cambia: $x > -3$.|$x > -3$。|$x > -3$。`,
      a: [Y(R`-2x < 6 \iff x > -3`), ...LINE([[-3, 1.5]], [[-3, false, '−3']], [-1.5, 0], 3)] },
    { a: [F(R`5 - 3x \ge 11`)],
      ex: { k: 'val', v: '-2', q: R`Solve $5 - 3x \ge 11$. What is the largest $x$ that works?|Résolvez $5 - 3x \ge 11$. Quel est le plus grand $x$ solution ?|Resuelve $5 - 3x \ge 11$. ¿Cuál es el mayor $x$ que sirve?|$5 - 3x \ge 11$ を解け。最大の $x$ は？|解 $5 - 3x \ge 11$，最大的 $x$ 是多少？`, sol: [R`-3x \ge 6`, R`x \le -2`] } });

  // =============================== Sequences and sums ===============================
  const SEQB = (vals, c = 'b') => [S2([vals.length / 2 + 0.5, Math.max(...vals) / 2], Math.max(vals.length / 2 + 0.8, Math.max(...vals) / 2 + 0.5), true), ...SEQ(vals.map((v, k) => RECT(k + 0.65, 0, k + 1.35, v, c, 0.3)), 200, 90)];
  A('Sequences and sums/Arithmetic sequence', 'Arithmetic sequences|Suites arithmétiques|Progresiones aritméticas|等差数列|等差数列',
    { s: R`Each term adds $d$, so after $n - 1$ steps $a_n = a_1 + (n - 1)d$. For the sum, pair the first and last terms (Gauss): every pair has the same sum, and there are $\tfrac n2$ pairs.|Chaque terme ajoute $d$ : après $n - 1$ pas, $a_n = a_1 + (n - 1)d$. Pour la somme, on associe premier et dernier terme (Gauss) : chaque paire a la même somme, et il y a $\tfrac n2$ paires.|Cada término suma $d$, así que tras $n - 1$ pasos $a_n = a_1 + (n - 1)d$. Para la suma, empareja el primero con el último (Gauss): cada pareja suma lo mismo y hay $\tfrac n2$ parejas.|毎回 $d$ を足すので $a_n = a_1 + (n - 1)d$。和は最初と最後を組にする（ガウス）：各組の和は同じで $\tfrac n2$ 組。|每项加 $d$，所以 $a_n = a_1 + (n - 1)d$。求和时首尾配对（高斯）：每对之和相同，共 $\tfrac n2$ 对。`,
      a: [Y(R`a_n = a_1 + (n - 1)d,\qquad S_n = \frac{n(a_1 + a_n)}{2}`, { s: 24 }), ...SEQB([1, 1.5, 2, 2.5, 3, 3.5])] },
    { s: R`$3, 7, 11, \dots$: $a_{20} = 3 + 19\cdot 4 = 79$ and $S_{20} = \tfrac{20(3 + 79)}{2} = 820$.|$3, 7, 11, \dots$ : $a_{20} = 79$, $S_{20} = 820$.|$3, 7, 11, \dots$: $a_{20} = 79$, $S_{20} = 820$.|$79$、$820$。|$79$，$820$。`,
      a: [F(R`a_{20} = 3 + 19\cdot 4 = 79`), Y(R`S_{20} = \frac{20(3 + 79)}{2} = 820`)] },
    { a: [F(R`a_1 = 5,\quad d = 3`)],
      ex: { k: 'val', v: '185', q: R`An arithmetic sequence has $a_1 = 5$ and $d = 3$. Find the sum of its first 10 terms.|Une suite arithmétique a $a_1 = 5$ et $d = 3$. Calculez la somme de ses 10 premiers termes.|Una progresión aritmética tiene $a_1 = 5$ y $d = 3$. Halla la suma de sus 10 primeros términos.|$a_1 = 5$, $d = 3$ の等差数列の初めの 10 項の和を求めよ。|首项 5、公差 3 的等差数列前 10 项和是多少？`, sol: [R`a_{10} = 5 + 27 = 32`, R`S_{10} = \frac{10(5 + 32)}{2} = 185`] } });

  A('Sequences and sums/Geometric sequence', 'Geometric sequences|Suites géométriques|Progresiones geométricas|等比数列|等比数列',
    { s: R`Each term multiplies by $r$, so $a_n = a_1r^{n-1}$. For the sum, subtract $rS_n$ from $S_n$: everything cancels except the first and the last-plus-one terms, giving $S_n = a_1\tfrac{1 - r^n}{1 - r}$.|Chaque terme multiplie par $r$ : $a_n = a_1r^{n-1}$. Pour la somme, on soustrait $rS_n$ de $S_n$ : tout s’annule sauf deux termes, d’où $S_n = a_1\tfrac{1 - r^n}{1 - r}$.|Cada término multiplica por $r$: $a_n = a_1r^{n-1}$. Para la suma, resta $rS_n$ de $S_n$: todo se cancela salvo dos términos, y sale $S_n = a_1\tfrac{1 - r^n}{1 - r}$.|毎回 $r$ 倍なので $a_n = a_1r^{n-1}$。和は $S_n - rS_n$ で 2 項だけ残り $S_n = a_1\tfrac{1 - r^n}{1 - r}$。|每项乘 $r$：$a_n = a_1r^{n-1}$。求和时 $S_n - rS_n$ 只剩两项，得 $S_n = a_1\tfrac{1 - r^n}{1 - r}$。`,
      a: [Y(R`a_n = a_1 r^{\,n-1},\qquad S_n = a_1\frac{1 - r^n}{1 - r}`, { s: 24 }), ...SEQB([0.25, 0.5, 1, 2, 4])] },
    { s: R`$2, 6, 18, \dots$ ($r = 3$): $a_6 = 2\cdot 3^5 = 486$ and $S_6 = 2\cdot\tfrac{3^6 - 1}{2} = 728$.|$2, 6, 18, \dots$ : $a_6 = 486$, $S_6 = 728$.|$2, 6, 18, \dots$: $a_6 = 486$, $S_6 = 728$.|$486$、$728$。|$486$，$728$。`,
      a: [F(R`a_6 = 2\cdot 3^5 = 486`), Y(R`S_6 = 2\cdot\frac{1 - 3^6}{1 - 3} = 728`)] },
    { a: [F(R`a_1 = 3,\quad r = 2`)],
      ex: { k: 'val', v: '189', q: R`A geometric sequence has $a_1 = 3$ and $r = 2$. Find the sum of its first 6 terms.|Une suite géométrique a $a_1 = 3$ et $r = 2$. Calculez la somme de ses 6 premiers termes.|Una progresión geométrica tiene $a_1 = 3$ y $r = 2$. Halla la suma de sus 6 primeros términos.|$a_1 = 3$, $r = 2$ の等比数列の初めの 6 項の和は？|首项 3、公比 2 的等比数列前 6 项和是多少？`, sol: [R`3\cdot\frac{2^6 - 1}{2 - 1}`, R`= 3\cdot 63 = 189`] } });

  A('Sequences and sums/Infinite geometric series', 'Infinite geometric series|Série géométrique infinie|Serie geométrica infinita|無限等比級数|无穷等比级数',
    { s: R`When $\lvert r\rvert < 1$, $r^n \to 0$, so the partial sums approach $\tfrac{a_1}{1 - r}$. Repeating decimals are such series: $0.333\ldots = \tfrac{0.3}{1 - 0.1} = \tfrac13$.|Quand $\lvert r\rvert < 1$, $r^n \to 0$ : les sommes partielles tendent vers $\tfrac{a_1}{1 - r}$. Les décimaux périodiques en sont : $0{,}333\ldots = \tfrac13$.|Cuando $\lvert r\rvert < 1$, $r^n \to 0$, así que las sumas parciales tienden a $\tfrac{a_1}{1 - r}$. Los decimales periódicos lo son: $0{,}333\ldots = \tfrac13$.|$\lvert r\rvert < 1$ なら $r^n \to 0$ で和は $\tfrac{a_1}{1 - r}$ に近づく。循環小数もその例：$0.333\ldots = \tfrac13$。|$\lvert r\rvert < 1$ 时 $r^n \to 0$，部分和趋于 $\tfrac{a_1}{1 - r}$。循环小数即是：$0.333\ldots = \tfrac13$。`,
      a: [Y(R`S_\infty = \frac{a_1}{1 - r}\quad (\lvert r\rvert < 1)`, { s: 28 }), S2([2, 0.5], 2.4), ...SEQ([[0, 2, 'b'], [2, 3, 'y'], [3, 3.5, 'b'], [3.5, 3.75, 'y'], [3.75, 3.875, 'b']].map(([a, b, c]) => RECT(a, 0, b, 1, c, 0.3)), 200, 200)] },
    { s: R`$1 + \tfrac12 + \tfrac14 + \dots = \tfrac{1}{1 - 1/2} = 2$: each piece fills half of what is left (the picture).|$1 + \tfrac12 + \tfrac14 + \dots = 2$ : chaque morceau remplit la moitié de ce qui reste.|$1 + \tfrac12 + \tfrac14 + \dots = 2$: cada trozo llena la mitad de lo que queda.|和は 2。|和为 2。`,
      a: [Y(R`1 + \tfrac12 + \tfrac14 + \dots = 2`), S2([2, 0.5], 2.4), ...SEQ([[0, 2, 'b'], [2, 3, 'y'], [3, 3.5, 'b'], [3.5, 3.75, 'y'], [3.75, 3.875, 'b']].map(([a, b, c]) => RECT(a, 0, b, 1, c, 0.3)), 200, 200)] },
    { a: [F(R`6 - 2 + \tfrac23 - \tfrac29 + \cdots`)],
      ex: { k: 'val', v: '4.5', q: R`Find the sum of $6 - 2 + \tfrac23 - \tfrac29 + \cdots$.|Calculez la somme $6 - 2 + \tfrac23 - \tfrac29 + \cdots$.|Halla la suma $6 - 2 + \tfrac23 - \tfrac29 + \cdots$.|$6 - 2 + \tfrac23 - \tfrac29 + \cdots$ の和を求めよ。|求 $6 - 2 + \tfrac23 - \tfrac29 + \cdots$ 的和。`, sol: [R`r = -\tfrac13`, R`\frac{6}{1 + 1/3} = 4.5`] } });

  A('Sequences and sums/Sum of integers', 'Sum of the first n integers|Somme des n premiers entiers|Suma de los n primeros enteros|1 から n までの和|前 n 个正整数之和',
    { s: R`Write the sum forwards and backwards and add: every column gives $n + 1$, and there are $n$ columns. That is twice the sum, so $\tfrac{n(n + 1)}{2}$ — the triangular numbers.|On écrit la somme à l’endroit et à l’envers et on additionne : chaque colonne vaut $n + 1$, il y a $n$ colonnes. C’est deux fois la somme : $\tfrac{n(n + 1)}{2}$ — les nombres triangulaires.|Escribe la suma al derecho y al revés y súmalas: cada columna da $n + 1$ y hay $n$ columnas. Es el doble de la suma: $\tfrac{n(n + 1)}{2}$, los números triangulares.|順と逆に書いて足すと各列が $n + 1$ で $n$ 列。これは和の 2 倍なので $\tfrac{n(n + 1)}{2}$（三角数）。|正着写和倒着写相加：每列 $n + 1$，共 $n$ 列，是和的两倍，得 $\tfrac{n(n + 1)}{2}$——三角形数。`,
      a: [Y(R`\sum_{k=1}^n k = \frac{n(n + 1)}{2}`, { s: 28 }), S2([2.5, 2.5], 3.2), ...SEQ((() => { const o = []; for (let i = 1; i <= 5; i++) for (let j = 1; j <= i; j++) o.push(PT([j - 0.5, i - 0.5], '', 'y')); return o; })(), 200, 50)] },
    { s: R`$1 + 2 + \dots + 100 = \tfrac{100\cdot 101}{2} = 5050$.|$1 + \dots + 100 = 5050$.|$1 + \dots + 100 = 5050$.|$5050$。|$5050$。`,
      a: [Y(R`\frac{100\cdot 101}{2} = 5050`)] },
    { a: [F(R`1 + 2 + \dots + 50`)],
      ex: { k: 'val', v: '1275', q: R`Compute $1 + 2 + \dots + 50$.|Calculez $1 + 2 + \dots + 50$.|Calcula $1 + 2 + \dots + 50$.|$1 + 2 + \dots + 50$ を求めよ。|计算 $1 + 2 + \dots + 50$。`, sol: [R`\frac{50\cdot 51}{2}`, R`= 1275`] } });

  A('Sequences and sums/Sum of squares', 'Sum of squares|Somme des carrés|Suma de cuadrados|平方の和|平方和',
    { s: R`$1^2 + 2^2 + \dots + n^2 = \tfrac{n(n + 1)(2n + 1)}{6}$. Prove it by induction, or by stacking squares into a pyramid: three copies fit into a box $n \times (n + 1) \times \left(n + \tfrac12\right)$.|$1^2 + \dots + n^2 = \tfrac{n(n + 1)(2n + 1)}{6}$. Par récurrence, ou en empilant des carrés en pyramide : trois copies remplissent un pavé $n \times (n + 1) \times \left(n + \tfrac12\right)$.|$1^2 + \dots + n^2 = \tfrac{n(n + 1)(2n + 1)}{6}$. Por inducción, o apilando cuadrados en pirámide: tres copias llenan una caja $n \times (n + 1) \times \left(n + \tfrac12\right)$.|帰納法で、または正方形を積んだピラミッド 3 つで箱 $n \times (n + 1) \times (n + \tfrac12)$ を作って示せる。|可用归纳法证明，或把正方形堆成金字塔：三份拼成 $n \times (n + 1) \times (n + \tfrac12)$ 的盒子。`,
      a: [Y(R`\sum_{k=1}^n k^2 = \frac{n(n + 1)(2n + 1)}{6}`, { s: 26 }), ...SEQB([1, 4, 9, 16].map(v => v / 3), 'p')] },
    { s: R`$n = 10$: $\tfrac{10\cdot 11\cdot 21}{6} = 385$.|$n = 10$ : $385$.|$n = 10$: $385$.|$385$。|$385$。`,
      a: [Y(R`\frac{10\cdot 11\cdot 21}{6} = 385`)] },
    { a: [F(R`1^2 + 2^2 + \dots + 6^2`)],
      ex: { k: 'val', v: '91', q: R`Compute $1^2 + 2^2 + \dots + 6^2$.|Calculez $1^2 + 2^2 + \dots + 6^2$.|Calcula $1^2 + 2^2 + \dots + 6^2$.|$1^2 + \dots + 6^2$ を求めよ。|计算 $1^2 + \dots + 6^2$。`, sol: [R`\frac{6\cdot 7\cdot 13}{6}`, R`= 91`] } });

  A('Sequences and sums/Sum of cubes', 'Sum of cubes|Somme des cubes|Suma de cubos|立方の和|立方和',
    { s: R`A surprise: the sum of the first $n$ cubes is the square of the sum of the first $n$ integers — $1 + 8 + 27 = 36 = 6^2$.|Une surprise : la somme des $n$ premiers cubes est le carré de la somme des $n$ premiers entiers — $1 + 8 + 27 = 36 = 6^2$.|Una sorpresa: la suma de los $n$ primeros cubos es el cuadrado de la suma de los $n$ primeros enteros: $1 + 8 + 27 = 36 = 6^2$.|最初の $n$ 個の立方の和は 1〜$n$ の和の 2 乗：$1 + 8 + 27 = 36 = 6^2$。|前 $n$ 个立方之和等于前 $n$ 个整数和的平方：$1 + 8 + 27 = 36 = 6^2$。`,
      a: [Y(R`\sum_{k=1}^n k^3 = \left(\frac{n(n + 1)}{2}\right)^2`, { s: 26 })] },
    { s: R`$n = 10$: $55^2 = 3025$.|$n = 10$ : $55^2 = 3025$.|$n = 10$: $55^2 = 3025$.|$3025$。|$3025$。`,
      a: [Y(R`\left(\frac{10\cdot 11}{2}\right)^2 = 3025`)] },
    { a: [F(R`1^3 + 2^3 + \dots + 5^3`)],
      ex: { k: 'val', v: '225', q: R`Compute $1^3 + 2^3 + \dots + 5^3$.|Calculez $1^3 + 2^3 + \dots + 5^3$.|Calcula $1^3 + 2^3 + \dots + 5^3$.|$1^3 + \dots + 5^3$ を求めよ。|计算 $1^3 + \dots + 5^3$。`, sol: [R`(1 + \dots + 5)^2 = 15^2`, R`= 225`] } });

  A('Sequences and sums/Telescoping', 'Telescoping sums|Sommes télescopiques|Sumas telescópicas|望遠鏡和（差分で消える和）|裂项相消',
    { s: R`Split each term as a difference: $\tfrac{1}{k(k + 1)} = \tfrac1k - \tfrac{1}{k + 1}$. In the sum, each negative part cancels the next positive part, leaving only the first and the last pieces.|On écrit chaque terme comme une différence : $\tfrac{1}{k(k + 1)} = \tfrac1k - \tfrac{1}{k + 1}$. Dans la somme, chaque partie négative annule la partie positive suivante : il ne reste que le premier et le dernier morceau.|Escribe cada término como diferencia: $\tfrac{1}{k(k + 1)} = \tfrac1k - \tfrac{1}{k + 1}$. En la suma, cada parte negativa cancela la positiva siguiente y solo quedan el primer y el último trozo.|各項を差に分ける：$\tfrac1k - \tfrac{1}{k + 1}$。和では次々に打ち消し合い、最初と最後だけが残る。|把每项拆成差：$\tfrac1k - \tfrac{1}{k + 1}$。求和时逐项相消，只剩首尾。`,
      a: [Y(R`\sum_{k=1}^n \frac{1}{k(k + 1)} = 1 - \frac{1}{n + 1}`, { s: 26 }), F(R`\left(1 - \tfrac12\right) + \left(\tfrac12 - \tfrac13\right) + \cdots`, { s: 22 })] },
    { s: R`$n = 9$: $1 - \tfrac{1}{10} = \tfrac{9}{10}$.|$n = 9$ : $\tfrac{9}{10}$.|$n = 9$: $\tfrac{9}{10}$.|$\tfrac{9}{10}$。|$\tfrac{9}{10}$。`,
      a: [Y(R`\sum_{k=1}^{9}\frac{1}{k(k + 1)} = \frac{9}{10}`)] },
    { a: [F(R`\sum_{k=1}^{99}\frac{1}{k(k + 1)}`)],
      ex: { k: 'val', v: '0.99', q: R`Compute $\displaystyle\sum_{k=1}^{99}\frac{1}{k(k + 1)}$.|Calculez $\displaystyle\sum_{k=1}^{99}\frac{1}{k(k + 1)}$.|Calcula $\displaystyle\sum_{k=1}^{99}\frac{1}{k(k + 1)}$.|$\displaystyle\sum_{k=1}^{99}\frac{1}{k(k + 1)}$ を求めよ。|计算 $\displaystyle\sum_{k=1}^{99}\frac{1}{k(k + 1)}$。`, sol: [R`1 - \frac{1}{100}`, R`= 0.99`] } });

  // =============================== Solving inequalities ===============================
  A('Solving inequalities/Quadratic inequality (a > 0)', 'Quadratic inequalities|Inéquations du second degré|Inecuaciones de segundo grado|2 次不等式|一元二次不等式',
    { s: R`With $a > 0$ the parabola opens upwards: it is negative between the roots and positive outside them. Find the roots, then read the sign from the picture — no need for case analysis.|Avec $a > 0$ la parabole est tournée vers le haut : négative entre les racines, positive à l’extérieur. On trouve les racines, puis on lit le signe sur la figure.|Con $a > 0$ la parábola abre hacia arriba: es negativa entre las raíces y positiva fuera. Halla las raíces y lee el signo en el dibujo.|$a > 0$ の放物線は上に開き、解の間で負、外側で正。解を求めて図から読む。|$a > 0$ 时抛物线开口向上：两根之间为负，外侧为正。求根后看图读符号。`,
      a: [Y(R`a(x - x_1)(x - x_2) < 0 \iff x_1 < x < x_2`, { s: 24 }), AX([-4, 5], [-7, 6]), P('x^2-x-6'), ['ln', -2, 0, 3, 0, { c: 'o' }], ['pt', -2, 0, '−2', { c: 'o', hollow: true }], ['pt', 3, 0, '3', { c: 'o', hollow: true }]] },
    { s: R`$x^2 - x - 6 < 0$: roots $-2$ and $3$, so $-2 < x < 3$.|$x^2 - x - 6 < 0$ : racines $-2$ et $3$, donc $-2 < x < 3$.|$x^2 - x - 6 < 0$: raíces $-2$ y $3$, así que $-2 < x < 3$.|$-2 < x < 3$。|$-2 < x < 3$。`,
      a: [Y(R`(x + 2)(x - 3) < 0 \iff -2 < x < 3`)] },
    { s: TRY_R, a: [F(R`x^2 - 5x + 4 > 0`)],
      ex: { k: 'roots', v: [1, 4], q: R`The solution of $x^2 - 5x + 4 > 0$ is $x < a$ or $x > b$. Give $a$ and $b$.|La solution de $x^2 - 5x + 4 > 0$ est $x < a$ ou $x > b$. Donnez $a$ et $b$.|La solución de $x^2 - 5x + 4 > 0$ es $x < a$ o $x > b$. Da $a$ y $b$.|$x^2 - 5x + 4 > 0$ の解は $x < a$ または $x > b$。$a$, $b$ は？|$x^2 - 5x + 4 > 0$ 的解为 $x < a$ 或 $x > b$，求 $a$、$b$。`, sol: [R`(x - 1)(x - 4) > 0`, R`x < 1\ \text{or}\ x > 4`] } });

  A('Solving inequalities/Rational inequality', 'Rational inequalities|Inéquations rationnelles|Inecuaciones racionales|分数不等式|分式不等式',
    { s: R`Never multiply by a denominator of unknown sign. Instead, find where numerator and denominator vanish, make a sign table, and read the intervals. Zeros of the numerator may be included (for $\ge$); zeros of the denominator never.|Ne multipliez jamais par un dénominateur de signe inconnu. On cherche où numérateur et dénominateur s’annulent, on fait un tableau de signes et on lit les intervalles. Les zéros du numérateur peuvent être inclus (pour $\ge$) ; ceux du dénominateur jamais.|Nunca multipliques por un denominador de signo desconocido. Busca dónde se anulan numerador y denominador, haz una tabla de signos y lee los intervalos. Los ceros del numerador pueden incluirse (con $\ge$); los del denominador nunca.|符号のわからない分母を掛けない。分子・分母が 0 になる点で符号表を作り区間を読む。分子の零点は（$\ge$ なら）含め、分母の零点は除く。|不要乘以符号未知的分母。找出分子分母的零点，列符号表读区间。分子零点（$\ge$ 时）可取，分母零点永远不取。`,
      a: [Y(R`\frac{P(x)}{Q(x)} \ge 0`, { s: 30 }), AX([-4, 6], [-6, 6]), P('(x+2)(x-1)/(x-3)'), ['ln', 3, -6, 3, 6, { c: 'p', dash: true }]] },
    { s: R`$\tfrac{(x + 2)(x - 1)}{x - 3} \ge 0$: signs $-, +, -, +$ on the four intervals (the table below this card), so $x \in [-2, 1] \cup (3, \infty)$.|Signes $-, +, -, +$ : $x \in [-2, 1] \cup ]3, +\infty[$.|Signos $-, +, -, +$: $x \in [-2, 1] \cup (3, \infty)$.|$[-2, 1] \cup (3, \infty)$。|$[-2, 1] \cup (3, \infty)$。`,
      a: [Y(R`x \in [-2, 1] \cup (3, \infty)`), ...LINE([[-2, 1], [3, 6.2]], [[-2, true, '−2'], [1, true, '1'], [3, false, '3']], [1.5, 0], 5.2)] },
    { a: [F(R`\frac{x - 4}{x + 1} \le 0`)],
      ex: { k: 'val', v: '5', q: R`How many integers satisfy $\dfrac{x - 4}{x + 1} \le 0$?|Combien d’entiers vérifient $\dfrac{x - 4}{x + 1} \le 0$ ?|¿Cuántos enteros cumplen $\dfrac{x - 4}{x + 1} \le 0$?|$\dfrac{x - 4}{x + 1} \le 0$ を満たす整数は何個か。|满足 $\dfrac{x - 4}{x + 1} \le 0$ 的整数有几个？`, sol: [R`-1 < x \le 4`, R`0, 1, 2, 3, 4:\ 5`] } });

  const ROWL = (key, head, sEn, sFr, sEs, sJa, sZh, a, ex) => lesson('Solving inequalities/' + key, head, { s: [sEn, sFr, sEs, sJa, sZh].join('|'), a },
    { s: R`Each factor changes sign only at its own zero; multiply the signs column by column to get the last row.|Chaque facteur ne change de signe qu’en son propre zéro ; on multiplie les signes colonne par colonne pour obtenir la dernière ligne.|Cada factor solo cambia de signo en su propio cero; multiplica los signos columna a columna para obtener la última fila.|各因数は自分の零点でだけ符号が変わる。列ごとに符号を掛けて最後の行を得る。|每个因子只在自己的零点变号；逐列相乘得到最后一行。`, a: [F(R`x + 2:\ -\ +\ +\ +`), F(R`x - 1:\ -\ -\ +\ +`), F(R`x - 3:\ -\ -\ -\ +`), Y(R`\text{quotient}:\ -\ +\ -\ +`)] }, ex);
  ROWL('x + 2', 'Sign of x + 2|Signe de x + 2|Signo de x + 2|x + 2 の符号|x + 2 的符号',
    'x + 2 is negative to the left of −2 and positive to the right: one minus, then three pluses in the table.', 'x + 2 est négatif à gauche de −2 et positif à droite : un moins puis trois plus dans le tableau.', 'x + 2 es negativo a la izquierda de −2 y positivo a la derecha: un menos y luego tres más en la tabla.', 'x + 2 は −2 の左で負、右で正：表では − のあと + が 3 つ。', 'x + 2 在 −2 左侧为负、右侧为正：表中先一个负号再三个正号。',
    [Y(R`x + 2 = 0 \iff x = -2`), AX([-5, 5], [-4, 6]), P('x+2'), PTG(-2, 0, '−2')],
    { a: [F(R`x + 2`)], ex: { k: 'val', v: '-2', q: R`At which $x$ does $x + 2$ change sign?|En quel $x$ le facteur $x + 2$ change-t-il de signe ?|¿En qué $x$ cambia de signo $x + 2$?|$x + 2$ の符号が変わる $x$ は？|$x + 2$ 在哪个 $x$ 处变号？`, sol: [R`x + 2 = 0`, R`x = -2`] } });
  ROWL('x - 1', 'Sign of x − 1|Signe de x − 1|Signo de x − 1|x − 1 の符号|x − 1 的符号',
    'x − 1 vanishes at 1: it is negative on the first two intervals and positive on the last two.', 'x − 1 s’annule en 1 : négatif sur les deux premiers intervalles, positif sur les deux derniers.', 'x − 1 se anula en 1: es negativo en los dos primeros intervalos y positivo en los dos últimos.', 'x − 1 は 1 で 0：前の 2 区間で負、後の 2 区間で正。', 'x − 1 在 1 处为零：前两个区间为负，后两个为正。',
    [Y(R`x - 1 = 0 \iff x = 1`), AX([-5, 5], [-6, 4]), P('x-1'), PTG(1, 0, '1')],
    { a: [F(R`x - 1`)], ex: { k: 'val', v: '2', q: R`On how many of the four intervals of the table is $x - 1$ positive?|Sur combien des quatre intervalles du tableau $x - 1$ est-il positif ?|¿En cuántos de los cuatro intervalos de la tabla es positivo $x - 1$?|表の 4 区間のうち $x - 1$ が正なのはいくつか。|表的四个区间中 $x - 1$ 为正的有几个？`, sol: [R`(1, 3),\ (3, \infty)`, R`2`] } });
  ROWL('x - 3', 'Sign of x − 3|Signe de x − 3|Signo de x − 3|x − 3 の符号|x − 3 的符号',
    'x − 3 is the denominator: negative before 3, positive after, and the value x = 3 itself is forbidden.', 'x − 3 est le dénominateur : négatif avant 3, positif après, et la valeur x = 3 est interdite.', 'x − 3 es el denominador: negativo antes de 3, positivo después, y el valor x = 3 está prohibido.', 'x − 3 は分母：3 の前で負、後で正、x = 3 は除外。', 'x − 3 是分母：3 之前为负，之后为正，且 x = 3 被排除。',
    [Y(R`x - 3 = 0 \iff x = 3\ (\text{excluded})`), AX([-5, 6], [-7, 4]), P('x-3'), ['pt', 3, 0, '3', { c: 'p', hollow: true }]],
    { a: [F(R`\frac{(x + 2)(x - 1)}{x - 3}`)], ex: { k: 'val', v: '3', q: R`Which value of $x$ must always be excluded from the solution?|Quelle valeur de $x$ doit toujours être exclue de la solution ?|¿Qué valor de $x$ hay que excluir siempre de la solución?|解から必ず除く $x$ の値は？|哪个 $x$ 值必须从解中排除？`, sol: [R`x - 3 \ne 0`, R`x = 3`] } });
  ROWL(R`\frac{(x + 2)(x - 1)}{x - 3}`, 'Sign of the quotient|Signe du quotient|Signo del cociente|商の符号|商的符号',
    'Multiplying the three rows column by column gives −, +, −, +. The quotient is ≥ 0 on [−2, 1] and on (3, ∞).', 'En multipliant les trois lignes colonne par colonne : −, +, −, +. Le quotient est ≥ 0 sur [−2, 1] et sur ]3, +∞[.', 'Multiplicando las tres filas columna a columna: −, +, −, +. El cociente es ≥ 0 en [−2, 1] y en (3, ∞).', '3 行を列ごとに掛けると −, +, −, +。商が 0 以上なのは [−2, 1] と (3, ∞)。', '三行逐列相乘得 −、+、−、+。商 ≥ 0 的区间为 [−2, 1] 与 (3, ∞)。',
    [Y(R`-,\ +,\ -,\ + \Rightarrow [-2, 1] \cup (3, \infty)`), AX([-4, 6], [-6, 6]), P('(x+2)(x-1)/(x-3)'), ['ln', 3, -6, 3, 6, { c: 'p', dash: true }]],
    { a: [F(R`\frac{(x + 2)(x - 1)}{x - 3} \ge 0,\quad -5 \le x \le 5`)], ex: { k: 'val', v: '6', q: R`How many integers $x$ with $-5 \le x \le 5$ satisfy $\dfrac{(x + 2)(x - 1)}{x - 3} \ge 0$?|Combien d’entiers $x$ avec $-5 \le x \le 5$ vérifient $\dfrac{(x + 2)(x - 1)}{x - 3} \ge 0$ ?|¿Cuántos enteros $x$ con $-5 \le x \le 5$ cumplen $\dfrac{(x + 2)(x - 1)}{x - 3} \ge 0$?|$-5 \le x \le 5$ の整数で条件を満たすものは何個か。|$-5 \le x \le 5$ 的整数中满足该不等式的有几个？`, sol: [R`[-2, 1]:\ -2, -1, 0, 1`, R`(3, 5]:\ 4, 5`, R`6`] } });

  A('Solving inequalities/Absolute values', 'Absolute value against an expression|Valeur absolue et expression|Valor absoluto frente a una expresión|絶対値と式の不等式|绝对值不等式（右边为式子）',
    { s: R`$\lvert f\rvert < g$ means $f$ lies strictly between $-g$ and $g$: write it as two inequalities that must both hold. $\lvert f\rvert > g$ means $f$ is outside: either $f < -g$ or $f > g$.|$\lvert f\rvert < g$ signifie que $f$ est strictement entre $-g$ et $g$ : deux inéquations à satisfaire ensemble. $\lvert f\rvert > g$ : $f$ est à l’extérieur, $f < -g$ ou $f > g$.|$\lvert f\rvert < g$ significa que $f$ está estrictamente entre $-g$ y $g$: dos inecuaciones que deben cumplirse a la vez. $\lvert f\rvert > g$: $f$ está fuera, $f < -g$ o $f > g$.|$\lvert f\rvert < g$ は $-g < f < g$（2 つ同時）。$\lvert f\rvert > g$ は外側：$f < -g$ または $f > g$。|$\lvert f\rvert < g$ 即 $-g < f < g$（两个同时成立）。$\lvert f\rvert > g$ 即在外侧：$f < -g$ 或 $f > g$。`,
      a: [Y(R`\lvert f\rvert < g \iff -g < f < g`, { s: 28 }), AX([-2, 5], [-1, 8]), P('abs(2x-1)'), P('x+2', 'b')] },
    { s: R`$\lvert 2x - 1\rvert < x + 2$: $-x - 2 < 2x - 1$ gives $x > -\tfrac13$, and $2x - 1 < x + 2$ gives $x < 3$. So $-\tfrac13 < x < 3$.|$\lvert 2x - 1\rvert < x + 2$ : $x > -\tfrac13$ et $x < 3$.|$\lvert 2x - 1\rvert < x + 2$: $x > -\tfrac13$ y $x < 3$.|$-\tfrac13 < x < 3$。|$-\tfrac13 < x < 3$。`,
      a: [F(R`-x - 2 < 2x - 1 \Rightarrow x > -\tfrac13`), Y(R`2x - 1 < x + 2 \Rightarrow x < 3`)] },
    { s: TRY_R, a: [F(R`\lvert x + 1\rvert < 3`)],
      ex: { k: 'roots', v: [-4, 2], q: R`The solution of $\lvert x + 1\rvert < 3$ is $a < x < b$. Give $a$ and $b$.|La solution de $\lvert x + 1\rvert < 3$ est $a < x < b$. Donnez $a$ et $b$.|La solución de $\lvert x + 1\rvert < 3$ es $a < x < b$. Da $a$ y $b$.|$\lvert x + 1\rvert < 3$ の解は $a < x < b$。$a$, $b$ は？|$\lvert x + 1\rvert < 3$ 的解为 $a < x < b$，求 $a$、$b$。`, sol: [R`-3 < x + 1 < 3`, R`-4 < x < 2`] } });

  A('Solving inequalities/Two absolute values', 'Two absolute values|Deux valeurs absolues|Dos valores absolutos|絶対値が 2 つ|两个绝对值',
    { s: R`Both sides are non-negative, so you may square without changing the direction: $\lvert f\rvert < \lvert g\rvert \iff f^2 < g^2$. The squares usually cancel to something linear. Geometrically: closer to one point than to another.|Les deux membres sont positifs : on peut élever au carré sans changer le sens. Les carrés se simplifient souvent en une inéquation du premier degré. Géométriquement : plus près d’un point que d’un autre.|Ambos lados son no negativos, así que se puede elevar al cuadrado sin cambiar el sentido. Los cuadrados suelen dejar algo lineal. Geométricamente: más cerca de un punto que de otro.|両辺とも 0 以上なので 2 乗しても向きは変わらない。たいてい 1 次式に。幾何的には「ある点のほうが近い」。|两边都非负，平方不改变方向。平方后常化为一次式。几何意义：离一点比离另一点近。`,
      a: [Y(R`\lvert f\rvert < \lvert g\rvert \iff f^2 < g^2`, { s: 28 }), ...LINE([[-1, 3.5]], [[-1, false, '−1'], [1, true, '1'], [-3, true, '−3']], [0, 0], 4)] },
    { s: R`$\lvert x - 1\rvert < \lvert x + 3\rvert$: $x^2 - 2x + 1 < x^2 + 6x + 9$, so $x > -1$ — the points closer to 1 than to $-3$ (the midpoint is $-1$).|$\lvert x - 1\rvert < \lvert x + 3\rvert$ : $x > -1$.|$\lvert x - 1\rvert < \lvert x + 3\rvert$: $x > -1$.|$x > -1$。|$x > -1$。`,
      a: [F(R`x^2 - 2x + 1 < x^2 + 6x + 9`), Y(R`-8x < 8 \Rightarrow x > -1`)] },
    { a: [F(R`\lvert x - 4\rvert \le \lvert x\rvert`)],
      ex: { k: 'val', v: '2', q: R`The solution of $\lvert x - 4\rvert \le \lvert x\rvert$ is $x \ge a$. Find $a$.|La solution de $\lvert x - 4\rvert \le \lvert x\rvert$ est $x \ge a$. Trouvez $a$.|La solución de $\lvert x - 4\rvert \le \lvert x\rvert$ es $x \ge a$. Halla $a$.|$\lvert x - 4\rvert \le \lvert x\rvert$ の解は $x \ge a$。$a$ は？|$\lvert x - 4\rvert \le \lvert x\rvert$ 的解为 $x \ge a$，求 $a$。`, sol: [R`x^2 - 8x + 16 \le x^2`, R`x \ge 2`] } });

  A('Solving inequalities/Square roots', 'Inequalities with square roots|Inéquations avec racines|Inecuaciones con raíces|根号を含む不等式|根式不等式',
    { s: R`Three conditions: the root must exist ($f \ge 0$), the right side must be positive (a root is never negative), and then you may square ($f < g^2$). Forgetting the first two lets false solutions in.|Trois conditions : la racine doit exister ($f \ge 0$), le membre de droite doit être positif (une racine n’est jamais négative), et alors on peut élever au carré ($f < g^2$). Oublier les deux premières introduit de fausses solutions.|Tres condiciones: la raíz debe existir ($f \ge 0$), el lado derecho debe ser positivo (una raíz nunca es negativa) y entonces se puede elevar al cuadrado ($f < g^2$). Olvidar las dos primeras deja pasar soluciones falsas.|3 条件：根号が定義される（$f \ge 0$）、右辺が正（根号は負にならない）、そして 2 乗（$f < g^2$）。前の 2 つを忘れると偽の解が入る。|三个条件：根式有意义（$f \ge 0$），右边为正（根式不为负），再平方（$f < g^2$）。忘记前两个会混入增解。`,
      a: [Y(R`\sqrt f < g \iff f \ge 0,\ g > 0,\ f < g^2`, { s: 26 }), AX([-3, 5], [-2, 5]), P('sqrt(x+2)'), P('x', 'b')] },
    { s: R`$\sqrt{x + 2} < x$: $x \ge -2$, $x > 0$ and $x + 2 < x^2$, i.e. $(x - 2)(x + 1) > 0$. Together: $x > 2$ (where the blue line rises above the root).|$\sqrt{x + 2} < x$ : $x \ge -2$, $x > 0$, $x + 2 < x^2$ ; d’où $x > 2$.|$\sqrt{x + 2} < x$: $x \ge -2$, $x > 0$ y $x + 2 < x^2$; en total $x > 2$.|$x > 2$。|$x > 2$。`,
      a: [F(R`x \ge -2,\ x > 0,\ (x - 2)(x + 1) > 0`), Y(R`x > 2`)] },
    { a: [F(R`\sqrt{x + 6} \le x`)],
      ex: { k: 'val', v: '3', q: R`The solution of $\sqrt{x + 6} \le x$ is $x \ge a$. Find $a$.|La solution de $\sqrt{x + 6} \le x$ est $x \ge a$. Trouvez $a$.|La solución de $\sqrt{x + 6} \le x$ es $x \ge a$. Halla $a$.|$\sqrt{x + 6} \le x$ の解は $x \ge a$。$a$ は？|$\sqrt{x + 6} \le x$ 的解为 $x \ge a$，求 $a$。`, sol: [R`x \ge 0,\ x + 6 \le x^2`, R`(x - 3)(x + 2) \ge 0 \Rightarrow x \ge 3`] } });

  // =============================== Exponential, logarithmic and irrational equations ===============================
  A('Exponential, logarithmic and irrational equations/Same base', 'Exponential equations: same base|Équations exponentielles : même base|Ecuaciones exponenciales: misma base|指数方程式：底をそろえる|指数方程：化为同底',
    { s: R`$x \mapsto a^x$ is one-to-one, so equal powers of the same base have equal exponents. Rewrite both sides as powers of one base (2, 3, 5…), then compare the exponents.|$x \mapsto a^x$ est injective : deux puissances égales de même base ont des exposants égaux. On écrit les deux membres comme puissances d’une même base (2, 3, 5…), puis on compare les exposants.|$x \mapsto a^x$ es inyectiva: potencias iguales de la misma base tienen exponentes iguales. Escribe ambos lados como potencias de una base (2, 3, 5…) y compara exponentes.|$a^x$ は単射なので同じ底の累乗が等しければ指数も等しい。両辺を同じ底（2, 3, 5…）の累乗に直して指数を比べる。|$a^x$ 是单射，同底幂相等则指数相等。把两边化为同一底（2、3、5……）的幂，再比较指数。`,
      a: [Y(R`a^{f(x)} = a^{g(x)} \iff f(x) = g(x)`, { s: 28 })] },
    { s: R`$2^{x+1} = 8 = 2^3$, so $x + 1 = 3$, $x = 2$. And $4^x = 2^{x+3}$: $2^{2x} = 2^{x+3}$, so $x = 3$.|$2^{x+1} = 2^3$ : $x = 2$. $4^x = 2^{x+3}$ : $2x = x + 3$, $x = 3$.|$2^{x+1} = 2^3$: $x = 2$. $4^x = 2^{x+3}$: $2x = x + 3$, $x = 3$.|$x = 2$、$x = 3$。|$x = 2$，$x = 3$。`,
      a: [F(R`2^{x+1} = 2^3 \Rightarrow x = 2`), Y(R`2^{2x} = 2^{x+3} \Rightarrow x = 3`)] },
    { a: [F(R`9^x = 27`)],
      ex: { k: 'val', v: '1.5', q: R`Solve $9^x = 27$.|Résolvez $9^x = 27$.|Resuelve $9^x = 27$.|$9^x = 27$ を解け。|解 $9^x = 27$。`, sol: [R`3^{2x} = 3^3`, R`x = \tfrac32`] } });

  A('Exponential, logarithmic and irrational equations/Taking logarithms', 'Taking logarithms|Prendre le logarithme|Tomar logaritmos|両辺の対数をとる|两边取对数',
    { s: R`When the bases cannot be matched, take logarithms of both sides: the power rule brings $x$ down, and you divide. Any base works; $\ln$ is the usual choice.|Quand on ne peut pas avoir la même base, on prend le logarithme des deux membres : la règle de la puissance fait descendre $x$, et on divise. N’importe quelle base convient ; on prend souvent $\ln$.|Cuando las bases no se pueden igualar, toma logaritmos en los dos lados: la regla de la potencia baja la $x$ y se divide. Sirve cualquier base; lo habitual es $\ln$.|底がそろわないときは両辺の対数をとり、指数を下ろして割る。底は何でもよく、ふつう $\ln$。|底不能统一时两边取对数：幂的法则把 $x$ 拿下来，再相除。任何底都行，常用 $\ln$。`,
      a: [Y(R`a^x = b \iff x = \log_a b = \frac{\ln b}{\ln a}`, { s: 26 }), AX([-1, 5], [-2, 14]), P('2^x'), P('10', 'b', { dash: true }), PTG(3.3219, 10, 'x ≈ 3.32')] },
    { s: R`$2^x = 10$: $x\ln 2 = \ln 10$, $x = \tfrac{\ln 10}{\ln 2} \approx 3.32$.|$2^x = 10$ : $x = \tfrac{\ln 10}{\ln 2} \approx 3{,}32$.|$2^x = 10$: $x = \tfrac{\ln 10}{\ln 2} \approx 3{,}32$.|$x \approx 3.32$。|$x \approx 3.32$。`,
      a: [Y(R`x = \frac{\ln 10}{\ln 2} \approx 3.32`)] },
    { a: [F(R`3^x = 20`)],
      ex: { k: 'val', v: 'ln(20)/ln(3)', q: R`Solve $3^x = 20$ (exact value or decimal).|Résolvez $3^x = 20$ (valeur exacte ou décimale).|Resuelve $3^x = 20$ (valor exacto o decimal).|$3^x = 20$ を解け（正確な値か小数）。|解 $3^x = 20$（精确值或小数）。`, sol: [R`x\ln 3 = \ln 20`, R`x = \frac{\ln 20}{\ln 3} \approx 2.73`] } });

  A('Exponential, logarithmic and irrational equations/Substitution', 'Substitution t = aˣ|Changement de variable t = aˣ|Cambio de variable t = aˣ|置き換え t = aˣ|换元 t = aˣ',
    { s: R`$a^{2x} = \left(a^x\right)^2$, so with $t = a^x$ the equation becomes a quadratic in $t$. Remember $t > 0$: reject negative roots, then solve $a^x = t$.|$a^{2x} = \left(a^x\right)^2$ : avec $t = a^x$ on obtient une équation du second degré en $t$. N’oubliez pas $t > 0$ : on rejette les racines négatives, puis on résout $a^x = t$.|$a^{2x} = \left(a^x\right)^2$, así que con $t = a^x$ queda una cuadrática en $t$. Recuerda $t > 0$: descarta raíces negativas y resuelve $a^x = t$.|$a^{2x} = (a^x)^2$ なので $t = a^x$ で 2 次方程式に。$t > 0$ を忘れず負の解は捨て、$a^x = t$ を解く。|$a^{2x} = (a^x)^2$，令 $t = a^x$ 得关于 $t$ 的二次方程。注意 $t > 0$：舍去负根，再解 $a^x = t$。`,
      a: [Y(R`t = a^x > 0:\quad t^2 + pt + q = 0`, { s: 28 })] },
    { s: R`$4^x - 6\cdot 2^x + 8 = 0$: $t^2 - 6t + 8 = 0$, $t = 2$ or $4$, so $x = 1$ or $x = 2$.|$t^2 - 6t + 8 = 0$ : $t = 2$ ou $4$, donc $x = 1$ ou $2$.|$t^2 - 6t + 8 = 0$: $t = 2$ o $4$, así que $x = 1$ o $2$.|$x = 1, 2$。|$x = 1, 2$。`,
      a: [F(R`t^2 - 6t + 8 = 0 \Rightarrow t = 2,\ 4`), Y(R`2^x = 2,\ 4 \Rightarrow x = 1,\ 2`)] },
    { s: TRY_R, a: [F(R`9^x - 4\cdot 3^x + 3 = 0`)],
      ex: { k: 'roots', v: [0, 1], q: R`Solve $9^x - 4\cdot 3^x + 3 = 0$.|Résolvez $9^x - 4\cdot 3^x + 3 = 0$.|Resuelve $9^x - 4\cdot 3^x + 3 = 0$.|$9^x - 4\cdot 3^x + 3 = 0$ を解け。|解 $9^x - 4\cdot 3^x + 3 = 0$。`, sol: [R`t^2 - 4t + 3 = 0 \Rightarrow t = 1,\ 3`, R`x = 0,\ 1`] } });

  A('Exponential, logarithmic and irrational equations/Logarithmic equations', 'Logarithmic equations|Équations logarithmiques|Ecuaciones logarítmicas|対数方程式|对数方程',
    { s: R`Combine everything into a single log, then either compare arguments ($\log f = \log g$) or rewrite as a power ($\log_a f = c \iff f = a^c$). Always check that the original arguments are positive — that removes false roots.|On regroupe tout en un seul logarithme, puis on compare les arguments ou on repasse à la puissance ($\log_a f = c \iff f = a^c$). Vérifiez toujours que les arguments de départ sont positifs — cela élimine les fausses racines.|Junta todo en un solo logaritmo y compara argumentos o pásalo a potencia ($\log_a f = c \iff f = a^c$). Comprueba siempre que los argumentos originales son positivos: así se eliminan raíces falsas.|1 つの対数にまとめ、真数を比べるか累乗に直す（$\log_a f = c \iff f = a^c$）。元の真数が正か必ず確認（偽の解を除く）。|合并成一个对数，再比较真数或化为幂（$\log_a f = c \iff f = a^c$）。务必检验原真数为正——排除增根。`,
      a: [Y(R`\log_a f = \log_a g \iff f = g > 0,\qquad \log_a f = c \iff f = a^c`, { s: 20 })] },
    { s: R`$\log x + \log(x - 3) = 1$: $x(x - 3) = 10$, so $x = 5$ or $x = -2$. Only $x = 5$ keeps both arguments positive.|$x(x - 3) = 10$ : $x = 5$ ou $-2$ ; seul $x = 5$ convient.|$x(x - 3) = 10$: $x = 5$ o $-2$; solo vale $x = 5$.|$x = 5$ のみ。|只有 $x = 5$。`,
      a: [F(R`x(x - 3) = 10 \Rightarrow x = 5,\ -2`), Y(R`x > 3 \Rightarrow x = 5`)] },
    { a: [F(R`\log_3(2x - 1) = 2`)],
      ex: { k: 'val', v: '5', q: R`Solve $\log_3(2x - 1) = 2$.|Résolvez $\log_3(2x - 1) = 2$.|Resuelve $\log_3(2x - 1) = 2$.|$\log_3(2x - 1) = 2$ を解け。|解 $\log_3(2x - 1) = 2$。`, sol: [R`2x - 1 = 3^2 = 9`, R`x = 5`] } });

  A('Exponential, logarithmic and irrational equations/Inequalities and the base', 'Inequalities: the base decides the direction|Inéquations : la base décide du sens|Inecuaciones: la base decide el sentido|不等式：底で向きが決まる|不等式：底决定方向',
    { s: R`If $a > 1$, $a^x$ and $\log_a x$ are increasing: the inequality keeps its direction. If $0 < a < 1$ they are decreasing: the direction flips. For logs, also require the arguments to be positive.|Si $a > 1$, $a^x$ et $\log_a x$ sont croissantes : l’inégalité garde son sens. Si $0 < a < 1$, elles sont décroissantes : le sens s’inverse. Pour les logs, il faut aussi des arguments positifs.|Si $a > 1$, $a^x$ y $\log_a x$ son crecientes: la desigualdad conserva el sentido. Si $0 < a < 1$ son decrecientes: el sentido se invierte. Con logs, exige además argumentos positivos.|$a > 1$ なら増加関数で向きはそのまま、$0 < a < 1$ なら減少関数で向きが逆。対数では真数 $> 0$ も。|$a > 1$ 时 $a^x$ 与 $\log_a x$ 递增，不等号方向不变；$0 < a < 1$ 时递减，方向改变。对数还需真数为正。`,
      a: [Y(R`0 < a < 1:\ a^f < a^g \iff f > g`, { s: 28 }), AX([-3, 4], [-0.5, 8]), P('0.5^x'), P('2^x', 'b')] },
    { s: R`$\left(\tfrac12\right)^x > \tfrac18 = \left(\tfrac12\right)^3$: the base is less than 1, so $x < 3$.|$\left(\tfrac12\right)^x > \left(\tfrac12\right)^3$ : base inférieure à 1, donc $x < 3$.|$\left(\tfrac12\right)^x > \left(\tfrac12\right)^3$: base menor que 1, así que $x < 3$.|$x < 3$。|$x < 3$。`,
      a: [Y(R`\left(\tfrac12\right)^x > \left(\tfrac12\right)^3 \iff x < 3`)] },
    { a: [F(R`\log_{1/2} x > -2`)],
      ex: { k: 'val', v: '4', q: R`The solution of $\log_{1/2} x > -2$ is $0 < x < a$. Find $a$.|La solution de $\log_{1/2} x > -2$ est $0 < x < a$. Trouvez $a$.|La solución de $\log_{1/2} x > -2$ es $0 < x < a$. Halla $a$.|$\log_{1/2} x > -2$ の解は $0 < x < a$。$a$ は？|$\log_{1/2} x > -2$ 的解为 $0 < x < a$，求 $a$。`, sol: [R`-2 = \log_{1/2} 4`, R`x < 4\ (\text{base} < 1)`] } });

  A('Exponential, logarithmic and irrational equations/Irrational equations', 'Equations with square roots|Équations irrationnelles|Ecuaciones irracionales|無理方程式|无理方程',
    { s: R`Isolate the root and square. Squaring can create false solutions (it turns $g = -\sqrt f$ into a solution too), so keep only those with $g \ge 0$ — or check every answer in the original equation.|On isole la racine et on élève au carré. Le carré peut créer de fausses solutions (il fait aussi apparaître $g = -\sqrt f$) : on ne garde que celles avec $g \ge 0$ — ou on vérifie chaque solution dans l’équation de départ.|Aísla la raíz y eleva al cuadrado. Elevar puede crear soluciones falsas (también aparece $g = -\sqrt f$), así que quédate con las que cumplen $g \ge 0$ o comprueba cada una en la ecuación original.|根号を孤立させて 2 乗。2 乗で偽の解が入る（$g = -\sqrt f$ も解になる）ので $g \ge 0$ のものだけ残すか、元の式で確かめる。|把根式单独放一边再平方。平方可能产生增根（$g = -\sqrt f$ 也成解），所以只保留 $g \ge 0$ 的解——或逐个代回检验。`,
      a: [Y(R`\sqrt f = g \iff f = g^2,\ g \ge 0`, { s: 28 }), AX([-6, 7], [-3, 5]), P('sqrt(x+5)'), P('x-1', 'b'), PTG(4, 3, '(4, 3)')] },
    { s: R`$\sqrt{x + 5} = x - 1$: $x + 5 = x^2 - 2x + 1$, $x^2 - 3x - 4 = 0$, $x = 4$ or $-1$. But $x - 1 \ge 0$, so only $x = 4$ (the one meeting point in the picture).|$x^2 - 3x - 4 = 0$ : $x = 4$ ou $-1$ ; seul $x = 4$ vérifie $x - 1 \ge 0$.|$x^2 - 3x - 4 = 0$: $x = 4$ o $-1$; solo $x = 4$ cumple $x - 1 \ge 0$.|$x = 4$ のみ。|只有 $x = 4$。`,
      a: [F(R`x^2 - 3x - 4 = 0 \Rightarrow x = 4,\ -1`), Y(R`x - 1 \ge 0 \Rightarrow x = 4`)] },
    { a: [F(R`\sqrt{2x + 3} = x`)],
      ex: { k: 'val', v: '3', q: R`Solve $\sqrt{2x + 3} = x$.|Résolvez $\sqrt{2x + 3} = x$.|Resuelve $\sqrt{2x + 3} = x$.|$\sqrt{2x + 3} = x$ を解け。|解 $\sqrt{2x + 3} = x$。`, sol: [R`2x + 3 = x^2 \Rightarrow x = 3,\ -1`, R`x \ge 0 \Rightarrow x = 3`] } });

  // =============================== More on sequences ===============================
  A('More on sequences/Terms from partial sums', 'Terms from partial sums|Termes à partir des sommes partielles|Términos a partir de las sumas parciales|部分和から一般項|由前 n 项和求通项',
    { s: R`$S_n$ is the sum up to term $n$, so the $n$-th term is what $S_n$ adds to $S_{n-1}$. This only works for $n \ge 2$; check $n = 1$ separately with $a_1 = S_1$.|$S_n$ est la somme jusqu’au rang $n$ : le terme $a_n$ est ce que $S_n$ ajoute à $S_{n-1}$. Cela ne vaut que pour $n \ge 2$ ; on traite $n = 1$ à part avec $a_1 = S_1$.|$S_n$ es la suma hasta el término $n$, así que $a_n$ es lo que $S_n$ añade a $S_{n-1}$. Solo vale para $n \ge 2$; comprueba $n = 1$ aparte con $a_1 = S_1$.|$S_n$ は第 $n$ 項までの和なので $a_n = S_n - S_{n-1}$（$n \ge 2$）。$n = 1$ は $a_1 = S_1$ で別に確認。|$S_n$ 是前 $n$ 项和，所以 $a_n = S_n - S_{n-1}$（$n \ge 2$）。$n = 1$ 时单独用 $a_1 = S_1$ 检验。`,
      a: [Y(R`a_1 = S_1,\qquad a_n = S_n - S_{n-1}\ (n \ge 2)`, { s: 26 })] },
    { s: R`$S_n = n^2 + 2n$: $a_1 = 3$ and $a_n = (n^2 + 2n) - ((n - 1)^2 + 2(n - 1)) = 2n + 1$, which also gives 3 for $n = 1$.|$S_n = n^2 + 2n$ : $a_1 = 3$, $a_n = 2n + 1$ (qui donne aussi 3 pour $n = 1$).|$S_n = n^2 + 2n$: $a_1 = 3$, $a_n = 2n + 1$ (que también da 3 en $n = 1$).|$a_n = 2n + 1$。|$a_n = 2n + 1$。`,
      a: [F(R`S_n - S_{n-1} = 2n + 1`), Y(R`a_1 = S_1 = 3\ \checkmark`)] },
    { a: [F(R`S_n = 2n^2 - n`)],
      ex: { k: 'val', v: '17', q: R`The partial sums of a sequence are $S_n = 2n^2 - n$. Find $a_5$.|Les sommes partielles d’une suite sont $S_n = 2n^2 - n$. Calculez $a_5$.|Las sumas parciales de una sucesión son $S_n = 2n^2 - n$. Halla $a_5$.|部分和が $S_n = 2n^2 - n$ の数列の $a_5$ を求めよ。|数列前 $n$ 项和 $S_n = 2n^2 - n$，求 $a_5$。`, sol: [R`S_5 = 45,\quad S_4 = 28`, R`a_5 = 17`] } });

  A('More on sequences/Arithmetic and geometric means', 'Arithmetic and geometric means|Moyennes arithmétique et géométrique|Medias aritmética y geométrica|等差中項と等比中項|等差中项与等比中项',
    { s: R`Three numbers form an arithmetic sequence when the middle one is the average of its neighbours, and a geometric one when its square is their product. Use this to turn “these are in progression” into an equation.|Trois nombres sont en progression arithmétique quand celui du milieu est la moyenne de ses voisins, et géométrique quand son carré est leur produit. Cela traduit « en progression » en équation.|Tres números forman progresión aritmética cuando el central es la media de sus vecinos, y geométrica cuando su cuadrado es su producto. Así «están en progresión» se convierte en una ecuación.|3 数が等差なら中央は両隣の平均、等比なら中央の 2 乗は両隣の積。「数列をなす」を式にできる。|三个数成等差时中间数是两边的平均；成等比时中间数的平方等于两边之积。可把“成数列”化为方程。`,
      a: [Y(R`\text{A}: 2b = a + c,\qquad \text{G}: b^2 = ac`, { s: 28 })] },
    { s: R`Between 3 and 27: the arithmetic mean is 15, the geometric mean is 9 (3, 9, 27 with ratio 3).|Entre 3 et 27 : moyenne arithmétique 15, géométrique 9.|Entre 3 y 27: media aritmética 15, geométrica 9.|15 と 9。|15 与 9。`,
      a: [F(R`2b = 30 \Rightarrow b = 15`), Y(R`b^2 = 81 \Rightarrow b = 9`)] },
    { a: [F(R`x - 1,\ x + 1,\ 2x + 2\ \ (\text{G},\ \text{non-zero})`, { s: 22 })],
      ex: { k: 'val', v: '3', q: R`$x - 1$, $x + 1$, $2x + 2$ form a geometric sequence of non-zero terms. Find $x$.|$x - 1$, $x + 1$, $2x + 2$ forment une suite géométrique de termes non nuls. Trouvez $x$.|$x - 1$, $x + 1$, $2x + 2$ forman una progresión geométrica de términos no nulos. Halla $x$.|$x - 1$, $x + 1$, $2x + 2$ が 0 でない項の等比数列。$x$ は？|$x - 1$、$x + 1$、$2x + 2$ 成非零等比数列，求 $x$。`, sol: [R`(x + 1)^2 = 2(x - 1)(x + 1)`, R`x + 1 = 2x - 2 \Rightarrow x = 3`] } });

  A('More on sequences/Index properties', 'Index properties|Propriétés des indices|Propiedades de los índices|添字の性質|下标性质',
    { s: R`In an arithmetic sequence terms equally far from a centre add up to the same value; in a geometric one they multiply to the same value. So if $m + n = p + q$, then $a_m + a_n = a_p + a_q$ (A) or $a_ma_n = a_pa_q$ (G).|Dans une suite arithmétique, deux termes à égale distance d’un centre ont la même somme ; dans une géométrique, le même produit. Si $m + n = p + q$, alors $a_m + a_n = a_p + a_q$ (A) ou $a_ma_n = a_pa_q$ (G).|En una progresión aritmética, términos equidistantes de un centro suman lo mismo; en una geométrica, multiplican lo mismo. Si $m + n = p + q$, entonces $a_m + a_n = a_p + a_q$ (A) o $a_ma_n = a_pa_q$ (G).|等差では中心から等距離の 2 項の和が等しく、等比では積が等しい。$m + n = p + q$ なら成り立つ。|等差数列中与中心等距的两项之和相等；等比数列中积相等。若 $m + n = p + q$ 则成立。`,
      a: [Y(R`m + n = p + q \Rightarrow a_m + a_n = a_p + a_q\ (\text{A})`, { s: 24 })] },
    { s: R`Arithmetic with $a_3 + a_9 = 20$: since $3 + 9 = 6 + 6$, $2a_6 = 20$, so $a_6 = 10$ — without knowing $a_1$ or $d$.|Arithmétique avec $a_3 + a_9 = 20$ : $2a_6 = 20$, donc $a_6 = 10$.|Aritmética con $a_3 + a_9 = 20$: $2a_6 = 20$, así que $a_6 = 10$.|$a_6 = 10$。|$a_6 = 10$。`,
      a: [Y(R`a_3 + a_9 = 2a_6 \Rightarrow a_6 = 10`)] },
    { a: [F(R`\text{G},\ a_n > 0,\ a_2 a_8 = 36`)],
      ex: { k: 'val', v: '6', q: R`A geometric sequence of positive terms has $a_2a_8 = 36$. Find $a_5$.|Une suite géométrique à termes positifs vérifie $a_2a_8 = 36$. Calculez $a_5$.|Una progresión geométrica de términos positivos cumple $a_2a_8 = 36$. Halla $a_5$.|正の項の等比数列で $a_2a_8 = 36$。$a_5$ は？|正项等比数列 $a_2a_8 = 36$，求 $a_5$。`, sol: [R`a_2a_8 = a_5^2 = 36`, R`a_5 = 6`] } });

  A('More on sequences/Linear recurrence', 'Linear recurrences|Suites arithmético-géométriques|Recurrencias lineales|漸化式 aₙ₊₁ = paₙ + q|线性递推',
    { s: R`For $a_{n+1} = pa_n + q$, find the fixed point $\lambda$ with $\lambda = p\lambda + q$. The distance to it, $a_n - \lambda$, is multiplied by $p$ each step — a geometric sequence. So $a_n = \lambda + p^{n-1}(a_1 - \lambda)$.|Pour $a_{n+1} = pa_n + q$, on cherche le point fixe $\lambda = p\lambda + q$. L’écart $a_n - \lambda$ est multiplié par $p$ à chaque pas : suite géométrique. Donc $a_n = \lambda + p^{n-1}(a_1 - \lambda)$.|Para $a_{n+1} = pa_n + q$, halla el punto fijo $\lambda = p\lambda + q$. La distancia $a_n - \lambda$ se multiplica por $p$ en cada paso: es geométrica. Así $a_n = \lambda + p^{n-1}(a_1 - \lambda)$.|$a_{n+1} = pa_n + q$ では不動点 $\lambda = p\lambda + q$ を求める。$a_n - \lambda$ は毎回 $p$ 倍の等比数列なので $a_n = \lambda + p^{n-1}(a_1 - \lambda)$。|对 $a_{n+1} = pa_n + q$，求不动点 $\lambda = p\lambda + q$。差 $a_n - \lambda$ 每步乘 $p$，是等比数列，故 $a_n = \lambda + p^{n-1}(a_1 - \lambda)$。`,
      a: [Y(R`a_n - \lambda = p^{\,n-1}(a_1 - \lambda),\quad \lambda = \frac{q}{1 - p}`, { s: 22 }), ...SEQB([1, 3, 7, 15].map(v => v / 3))] },
    { s: R`$a_1 = 1$, $a_{n+1} = 2a_n + 1$: $\lambda = -1$, so $a_n + 1 = 2^{n-1}\cdot 2$, i.e. $a_n = 2^n - 1$ (1, 3, 7, 15, …).|$a_1 = 1$, $a_{n+1} = 2a_n + 1$ : $\lambda = -1$, $a_n = 2^n - 1$.|$a_1 = 1$, $a_{n+1} = 2a_n + 1$: $\lambda = -1$, $a_n = 2^n - 1$.|$a_n = 2^n - 1$。|$a_n = 2^n - 1$。`,
      a: [F(R`\lambda = \frac{1}{1 - 2} = -1`), Y(R`a_n = 2^n - 1`)] },
    { a: [F(R`a_1 = 4,\quad a_{n+1} = \tfrac12 a_n + 3`)],
      ex: { k: 'val', v: '5.875', q: R`$a_1 = 4$ and $a_{n+1} = \tfrac12 a_n + 3$. Find $a_5$.|$a_1 = 4$ et $a_{n+1} = \tfrac12 a_n + 3$. Calculez $a_5$.|$a_1 = 4$ y $a_{n+1} = \tfrac12 a_n + 3$. Halla $a_5$.|$a_1 = 4$, $a_{n+1} = \tfrac12 a_n + 3$ のとき $a_5$ を求めよ。|$a_1 = 4$，$a_{n+1} = \tfrac12 a_n + 3$，求 $a_5$。`, sol: [R`\lambda = 6,\quad a_n - 6 = \left(\tfrac12\right)^{n-1}(-2)`, R`a_5 = 6 - \tfrac{2}{16} = 5.875`] } });

  A('More on sequences/Arithmetic × geometric', 'Arithmetic × geometric sums|Sommes arithmético-géométriques|Sumas aritmético-geométricas|等差 × 等比の和|错位相减',
    { s: R`For $S = \sum k\,r^k$, write $rS$ shifted one place under $S$ and subtract: the coefficients become all 1, leaving a plain geometric sum minus the last term. Then divide by $1 - r$.|Pour $S = \sum k\,r^k$, on écrit $rS$ décalé d’un rang sous $S$ et on soustrait : les coefficients deviennent tous 1, il reste une somme géométrique moins le dernier terme. Puis on divise par $1 - r$.|Para $S = \sum k\,r^k$, escribe $rS$ desplazada un lugar bajo $S$ y resta: los coeficientes pasan a ser 1 y queda una suma geométrica menos el último término. Luego divide entre $1 - r$.|$S = \sum k\,r^k$ の下に 1 つずらした $rS$ を書いて引くと係数が 1 になり、等比数列の和 − 最後の項。$1 - r$ で割る。|对 $S = \sum k\,r^k$，把 $rS$ 错一位写在下面相减：系数都变为 1，得等比和减末项，再除以 $1 - r$。`,
      a: [Y(R`S - rS = \sum r^k - n\,r^{n+1}`, { s: 28 })] },
    { s: R`$S = \sum_{k=1}^n k\,2^k$: $S - 2S = (2 + 4 + \dots + 2^n) - n2^{n+1}$, so $S = (n - 1)2^{n+1} + 2$. Check $n = 3$: $2 + 8 + 24 = 34 = 2\cdot 16 + 2$.|$S = (n - 1)2^{n+1} + 2$ ; pour $n = 3$ : $34$.|$S = (n - 1)2^{n+1} + 2$; para $n = 3$: $34$.|$n = 3$ で 34。|$n = 3$ 时 34。`,
      a: [F(R`-S = (2^{n+1} - 2) - n2^{n+1}`), Y(R`S = (n - 1)2^{n+1} + 2`)] },
    { a: [F(R`\sum_{k=1}^{5} k\,2^k`)],
      ex: { k: 'val', v: '258', q: R`Compute $\displaystyle\sum_{k=1}^{5} k\,2^k$.|Calculez $\displaystyle\sum_{k=1}^{5} k\,2^k$.|Calcula $\displaystyle\sum_{k=1}^{5} k\,2^k$.|$\displaystyle\sum_{k=1}^{5} k\,2^k$ を求めよ。|计算 $\displaystyle\sum_{k=1}^{5} k\,2^k$。`, sol: [R`(5 - 1)2^6 + 2`, R`= 258`] } });

  A('More on sequences/Telescoping fractions', 'Telescoping with partial fractions|Télescopage par décomposition|Telescópicas con fracciones simples|部分分数分解で打ち消す|裂项（部分分式）',
    { s: R`When the factors in the denominator differ by $d$, split $\tfrac{1}{k(k + d)}$ into $\tfrac1d\left(\tfrac1k - \tfrac{1}{k + d}\right)$. In the sum, terms cancel $d$ places apart, so $d$ pieces survive at each end.|Quand les facteurs du dénominateur diffèrent de $d$, on écrit $\tfrac{1}{k(k + d)} = \tfrac1d\left(\tfrac1k - \tfrac{1}{k + d}\right)$. Dans la somme, les termes s’annulent à $d$ rangs d’écart : il reste $d$ morceaux à chaque bout.|Si los factores del denominador difieren en $d$, escribe $\tfrac{1}{k(k + d)} = \tfrac1d\left(\tfrac1k - \tfrac{1}{k + d}\right)$. En la suma los términos se cancelan a $d$ lugares de distancia y quedan $d$ trozos en cada extremo.|分母の因数の差が $d$ なら $\tfrac1d\left(\tfrac1k - \tfrac{1}{k + d}\right)$。和では $d$ 個離れて消え、両端に $d$ 個ずつ残る。|分母两因子相差 $d$ 时拆成 $\tfrac1d\left(\tfrac1k - \tfrac{1}{k + d}\right)$。求和时隔 $d$ 项相消，两端各剩 $d$ 项。`,
      a: [Y(R`\frac{1}{k(k + d)} = \frac1d\left(\frac1k - \frac{1}{k + d}\right)`, { s: 26 })] },
    { s: R`$\sum_{k=1}^4 \tfrac{1}{k(k + 2)} = \tfrac12\left(1 + \tfrac12 - \tfrac15 - \tfrac16\right) = \tfrac{17}{30}$.|$\sum_{k=1}^4 \tfrac{1}{k(k + 2)} = \tfrac{17}{30}$.|$\sum_{k=1}^4 \tfrac{1}{k(k + 2)} = \tfrac{17}{30}$.|$\tfrac{17}{30}$。|$\tfrac{17}{30}$。`,
      a: [F(R`\tfrac12\left(1 + \tfrac12 - \tfrac15 - \tfrac16\right)`), Y(R`= \frac{17}{30}`)] },
    { a: [F(R`\sum_{k=1}^{10}\frac{1}{(2k - 1)(2k + 1)}`)],
      ex: { k: 'val', v: '10/21', q: R`Compute $\displaystyle\sum_{k=1}^{10}\frac{1}{(2k - 1)(2k + 1)}$.|Calculez $\displaystyle\sum_{k=1}^{10}\frac{1}{(2k - 1)(2k + 1)}$.|Calcula $\displaystyle\sum_{k=1}^{10}\frac{1}{(2k - 1)(2k + 1)}$.|$\displaystyle\sum_{k=1}^{10}\frac{1}{(2k - 1)(2k + 1)}$ を求めよ。|计算 $\displaystyle\sum_{k=1}^{10}\frac{1}{(2k - 1)(2k + 1)}$。`, sol: [R`\tfrac12\left(\tfrac{1}{2k - 1} - \tfrac{1}{2k + 1}\right)`, R`\tfrac12\left(1 - \tfrac{1}{21}\right) = \tfrac{10}{21}`] } });

  // =============================== Linear programming ===============================
  const REG1 = LP([[0, 0], [3, 0], [3, 1], [0, 4]], [[[0, 4], [4.5, -0.5]], [[3, -0.5], [3, 4.5]]], [3, 1]);
  A('Linear programming/The problem', 'A linear programming problem|Un problème de programmation linéaire|Un problema de programación lineal|線形計画法|线性规划问题',
    { s: R`Maximise or minimise a linear objective $z = ax + by$ over the region allowed by linear constraints. The region is a polygon, and the best value is always reached at one of its corners: list the vertices, evaluate $z$, pick the best.|On maximise ou minimise un objectif linéaire $z = ax + by$ sur la région définie par des contraintes linéaires. La région est un polygone, et l’optimum est atteint en un de ses sommets : on liste les sommets, on calcule $z$, on choisit.|Se maximiza o minimiza un objetivo lineal $z = ax + by$ en la región de restricciones lineales. La región es un polígono y el óptimo se alcanza en un vértice: lista los vértices, evalúa $z$ y elige.|1 次の制約で決まる領域で $z = ax + by$ を最大・最小化。領域は多角形で、最適値は頂点でとる：頂点を列挙し $z$ を計算して選ぶ。|在线性约束确定的区域上最大化或最小化 $z = ax + by$。区域是多边形，最优值在某个顶点取得：列出顶点、计算 $z$、取最优。`,
      a: [Y(R`\max\ z = ax + by\quad :\quad a_ix + b_iy \le c_i`, { s: 24 }), ...REG1] },
    { s: R`Maximise $z = 3x + 2y$ with $x + y \le 4$, $x \le 3$, $x, y \ge 0$. Vertices $(0, 0), (3, 0), (3, 1), (0, 4)$ give $z = 0, 9, 11, 8$: the maximum is 11 at $(3, 1)$.|Maximiser $z = 3x + 2y$ avec $x + y \le 4$, $x \le 3$, $x, y \ge 0$ : sommets $z = 0, 9, 11, 8$ ; maximum 11 en $(3, 1)$.|Maximizar $z = 3x + 2y$ con $x + y \le 4$, $x \le 3$, $x, y \ge 0$: vértices $z = 0, 9, 11, 8$; máximo 11 en $(3, 1)$.|最大 11（$(3, 1)$）。|最大值 11，在 $(3, 1)$。`,
      a: [F(R`z(0,0) = 0,\ z(3,0) = 9,\ z(3,1) = 11,\ z(0,4) = 8`, { s: 20 }), Y(R`\max z = 11\ \text{at}\ (3, 1)`), ...REG1] },
    { a: [F(R`\max\ x + 3y:\ x + y \le 6,\ y \le 4,\ x, y \ge 0`, { s: 22 }), ...LP([[0, 0], [6, 0], [2, 4], [0, 4]], [[[0, 6], [6.5, -0.5]], [[-0.3, 4], [5, 4]]])],
      ex: { k: 'val', v: '14', q: R`Maximise $z = x + 3y$ subject to $x + y \le 6$, $y \le 4$, $x \ge 0$, $y \ge 0$.|Maximisez $z = x + 3y$ sous $x + y \le 6$, $y \le 4$, $x \ge 0$, $y \ge 0$.|Maximiza $z = x + 3y$ con $x + y \le 6$, $y \le 4$, $x \ge 0$, $y \ge 0$.|$x + y \le 6$, $y \le 4$, $x, y \ge 0$ で $z = x + 3y$ の最大値は？|在 $x + y \le 6$、$y \le 4$、$x, y \ge 0$ 下求 $z = x + 3y$ 的最大值。`, sol: [R`(0,0), (6,0), (2,4), (0,4)`, R`z = 0,\ 6,\ 14,\ 12 \Rightarrow 14`] } });

  A('Linear programming/Half-planes', 'Half-planes|Demi-plans|Semiplanos|半平面|半平面',
    { s: R`A line $ax + by = c$ splits the plane in two; $ax + by \le c$ is one side. To find which, test a point not on the line — the origin is easiest: if it satisfies the inequality, shade its side.|Une droite $ax + by = c$ partage le plan en deux ; $ax + by \le c$ est l’un des côtés. Pour savoir lequel, on teste un point hors de la droite — l’origine est le plus simple : s’il vérifie l’inégalité, on hachure son côté.|Una recta $ax + by = c$ divide el plano en dos; $ax + by \le c$ es uno de los lados. Para saber cuál, prueba un punto fuera de la recta (el origen es lo más fácil): si cumple la desigualdad, sombrea su lado.|直線 $ax + by = c$ は平面を 2 つに分け、$ax + by \le c$ はその片側。直線上にない点（原点が楽）を代入して確かめる。|直线 $ax + by = c$ 把平面分成两半，$ax + by \le c$ 是其中一侧。代入直线外一点（原点最方便）判断：满足就画它那一侧。`,
      a: [Y(R`ax + by \le c`, { s: 30 }), S2([3, 2.5], 3.6, true), ['poly3', [Z(-0.5, -0.5), Z(6.75, -0.5), Z(-0.5, 4.33)], { c: 'y', fill: 0.2 }], SG([-0.5, 4.33], [6.75, -0.5], 'b'), PT([0, 0], 'O ✓', 'o', { dx: 6, dy: -8 }), PT([4, 2], '(4, 2)', 'p', { dx: 6, dy: -8 })] },
    { s: R`$2x + 3y \le 12$: at $(0, 0)$, $0 \le 12$ is true, so the region is the side of the line containing the origin.|$2x + 3y \le 12$ : en $(0, 0)$, $0 \le 12$ est vrai ; on garde le côté de l’origine.|$2x + 3y \le 12$: en $(0, 0)$, $0 \le 12$ es cierto; se toma el lado del origen.|原点側。|原点一侧。`,
      a: [Y(R`2\cdot 0 + 3\cdot 0 = 0 \le 12\ \checkmark`)] },
    { s: TRY_TF, a: [F(R`(4, 2),\quad 2x + 3y \le 12`)],
      ex: { k: 'val', v: '0', q: R`Does the point $(4, 2)$ satisfy $2x + 3y \le 12$? Type 1 (yes) or 0 (no).|Le point $(4, 2)$ vérifie-t-il $2x + 3y \le 12$ ? Tapez 1 (oui) ou 0 (non).|¿Cumple el punto $(4, 2)$ la desigualdad $2x + 3y \le 12$? Escribe 1 (sí) o 0 (no).|点 $(4, 2)$ は $2x + 3y \le 12$ を満たすか。1 か 0。|点 $(4, 2)$ 满足 $2x + 3y \le 12$ 吗？输入 1 或 0。`, sol: [R`8 + 6 = 14 > 12`, R`\text{no: } 0`] } });

  A('Linear programming/Optimum at a vertex', 'The optimum is at a vertex|L’optimum est en un sommet|El óptimo está en un vértice|最適解は頂点|最优解在顶点',
    { s: R`A linear function cannot have a peak in the middle of a polygon: moving in the right direction always improves it until you hit the boundary, and along an edge until you hit a corner. So it suffices to compare the vertices.|Une fonction linéaire ne peut pas avoir de sommet au milieu d’un polygone : en avançant dans la bonne direction on l’améliore jusqu’au bord, puis le long d’un côté jusqu’à un coin. Il suffit de comparer les sommets.|Una función lineal no puede tener un máximo en el interior de un polígono: moverse en la dirección adecuada la mejora hasta el borde, y por un lado hasta una esquina. Basta comparar los vértices.|1 次関数は多角形の内部に頂上をもたない：よい方向へ進めば境界まで、辺に沿って頂点まで改善する。頂点を比べればよい。|线性函数不可能在多边形内部取极值：沿合适方向移动会一直变好直到边界，再沿边直到顶点。只需比较顶点。`,
      a: [Y(R`z^{*} = \max_{V_i} z(V_i)`, { s: 30 }), ...REG1] },
    { s: R`Same region, minimise $z = x - y$: values $0, 3, 2, -4$, so the minimum is $-4$ at $(0, 4)$.|Même région, minimiser $z = x - y$ : $0, 3, 2, -4$ ; minimum $-4$ en $(0, 4)$.|Misma región, minimizar $z = x - y$: $0, 3, 2, -4$; mínimo $-4$ en $(0, 4)$.|最小 $-4$。|最小值 $-4$。`,
      a: [Y(R`\min (x - y) = -4\ \text{at}\ (0, 4)`)] },
    { a: [F(R`\min\ 2x + y:\ x + y \ge 2,\ x \le 4,\ y \le 3,\ x, y \ge 0`, { s: 20 }), ...LP([[2, 0], [4, 0], [4, 3], [0, 3], [0, 2]], [[[-0.3, 2.3], [2.5, -0.5]], [[4, -0.5], [4, 3.5]], [[-0.3, 3], [4.5, 3]]])],
      ex: { k: 'val', v: '2', q: R`Minimise $z = 2x + y$ subject to $x + y \ge 2$, $x \le 4$, $y \le 3$, $x, y \ge 0$.|Minimisez $z = 2x + y$ sous $x + y \ge 2$, $x \le 4$, $y \le 3$, $x, y \ge 0$.|Minimiza $z = 2x + y$ con $x + y \ge 2$, $x \le 4$, $y \le 3$, $x, y \ge 0$.|$z = 2x + y$ の最小値を求めよ。|求 $z = 2x + y$ 的最小值。`, sol: [R`(2,0), (4,0), (4,3), (0,3), (0,2)`, R`z = 4, 8, 11, 3, 2 \Rightarrow 2`] } });

  A('Linear programming/Level lines', 'Level lines of the objective|Droites de niveau|Rectas de nivel|目的関数の等高線|目标函数的等值线',
    { s: R`Each value of $z$ gives a line $ax + by = z$; all these lines are parallel with slope $-\tfrac ab$. Slide the line in the direction where $z$ grows: the last point of the region it touches is the optimum.|Chaque valeur de $z$ donne une droite $ax + by = z$ ; toutes sont parallèles, de pente $-\tfrac ab$. On fait glisser la droite dans le sens où $z$ augmente : le dernier point de la région touché est l’optimum.|Cada valor de $z$ da una recta $ax + by = z$; todas son paralelas, de pendiente $-\tfrac ab$. Desliza la recta en el sentido en que crece $z$: el último punto de la región que toca es el óptimo.|$z$ の値ごとに直線 $ax + by = z$（傾き $-\tfrac ab$ の平行線）。$z$ が増える向きに動かし、最後に触れる点が最適解。|每个 $z$ 值对应直线 $ax + by = z$，彼此平行，斜率 $-\tfrac ab$。沿 $z$ 增大的方向平移，最后接触区域的点就是最优解。`,
      a: [Y(R`ax + by = c,\quad c \uparrow`, { s: 30 }), ...REG1, ...SEQ([3, 7, 11].map(c => SG([0, c / 2], [c / 3, 0], c === 11 ? 'p' : 'g', { dash: c !== 11 })), 1200, 400)] },
    { s: R`For $z = 3x + 2y$ the level lines have slope $-\tfrac32$; pushing them outwards, the last corner reached is $(3, 1)$ with $z = 11$.|Pour $z = 3x + 2y$ : pente $-\tfrac32$ ; le dernier sommet atteint est $(3, 1)$, $z = 11$.|Para $z = 3x + 2y$: pendiente $-\tfrac32$; el último vértice alcanzado es $(3, 1)$, $z = 11$.|最後は $(3, 1)$。|最后到 $(3, 1)$。`,
      a: [Y(R`3x + 2y = 11\ \text{touches at}\ (3, 1)`)] },
    { a: [F(R`z = 2x + 5y`)],
      ex: { k: 'val', v: '-0.4', q: R`What is the slope of the level lines of $z = 2x + 5y$?|Quelle est la pente des droites de niveau de $z = 2x + 5y$ ?|¿Cuál es la pendiente de las rectas de nivel de $z = 2x + 5y$?|$z = 2x + 5y$ の等高線の傾きは？|$z = 2x + 5y$ 等值线的斜率是多少？`, sol: [R`y = -\tfrac25 x + \tfrac z5`, R`-0.4`] } });

  // =============================== Binomial theorem ===============================
  A('Binomial theorem/Expansion', 'The binomial theorem|La formule du binôme|El binomio de Newton|二項定理|二项式定理',
    { s: R`In $(a + b)^n$, each term picks $b$ from $k$ of the $n$ brackets and $a$ from the rest, which can be done in $\binom nk$ ways. The coefficients are a row of Pascal’s triangle.|Dans $(a + b)^n$, chaque terme choisit $b$ dans $k$ des $n$ parenthèses et $a$ dans les autres, de $\binom nk$ façons. Les coefficients forment une ligne du triangle de Pascal.|En $(a + b)^n$, cada término elige $b$ en $k$ de los $n$ paréntesis y $a$ en los demás, de $\binom nk$ formas. Los coeficientes son una fila del triángulo de Pascal.|$(a + b)^n$ の各項は $n$ 個の括弧のうち $k$ 個から $b$、残りから $a$ を選ぶので $\binom nk$ 通り。係数はパスカルの三角形の 1 段。|$(a + b)^n$ 的每一项从 $n$ 个括号中 $k$ 个取 $b$、其余取 $a$，有 $\binom nk$ 种。系数是帕斯卡三角形的一行。`,
      a: [Y(R`(a + b)^n = \sum_{k=0}^n \binom nk a^{n-k} b^k`, { s: 28 }), F(R`1\quad 4\quad 6\quad 4\quad 1`)] },
    { s: R`$(x + 1)^4 = x^4 + 4x^3 + 6x^2 + 4x + 1$.|$(x + 1)^4 = x^4 + 4x^3 + 6x^2 + 4x + 1$.|$(x + 1)^4 = x^4 + 4x^3 + 6x^2 + 4x + 1$.|展開。|展开。`,
      a: [Y(R`(x + 1)^4 = x^4 + 4x^3 + 6x^2 + 4x + 1`)] },
    { a: [F(R`(x + 2)^5`)],
      ex: { k: 'val', v: '80', q: R`Find the coefficient of $x^2$ in $(x + 2)^5$.|Trouvez le coefficient de $x^2$ dans $(x + 2)^5$.|Halla el coeficiente de $x^2$ en $(x + 2)^5$.|$(x + 2)^5$ の $x^2$ の係数は？|求 $(x + 2)^5$ 中 $x^2$ 的系数。`, sol: [R`\binom53 x^2\cdot 2^3`, R`10\cdot 8 = 80`] } });

  A('Binomial theorem/General term', 'The general term|Le terme général|El término general|一般項|通项',
    { s: R`$T_{k+1} = \binom nk a^{n-k}b^k$ is the term with $b^k$. To find a particular power of $x$, write the exponent of $x$ in $T_{k+1}$ as a function of $k$ and solve for $k$.|$T_{k+1} = \binom nk a^{n-k}b^k$ est le terme en $b^k$. Pour une puissance précise de $x$, on écrit l’exposant de $x$ dans $T_{k+1}$ en fonction de $k$ et on résout en $k$.|$T_{k+1} = \binom nk a^{n-k}b^k$ es el término con $b^k$. Para una potencia concreta de $x$, escribe el exponente de $x$ en $T_{k+1}$ en función de $k$ y despeja $k$.|$T_{k+1} = \binom nk a^{n-k}b^k$。特定の $x$ の累乗を求めるには、$T_{k+1}$ の $x$ の指数を $k$ で表して $k$ を解く。|$T_{k+1} = \binom nk a^{n-k}b^k$ 是含 $b^k$ 的项。求某个 $x$ 的幂，就用 $k$ 表示 $T_{k+1}$ 中 $x$ 的指数再解 $k$。`,
      a: [Y(R`T_{k+1} = \binom nk a^{n-k} b^k`, { s: 30 })] },
    { s: R`$x^3$ in $(2x - 1)^5$: $(2x)^{5-k}$ needs $5 - k = 3$, so $k = 2$: $\binom52\cdot 2^3\cdot(-1)^2 = 80$.|$x^3$ dans $(2x - 1)^5$ : $k = 2$, coefficient $80$.|$x^3$ en $(2x - 1)^5$: $k = 2$, coeficiente $80$.|係数 80。|系数 80。`,
      a: [F(R`5 - k = 3 \Rightarrow k = 2`), Y(R`\binom52\cdot 2^3\cdot(-1)^2 = 80`)] },
    { a: [F(R`\left(x + \frac1x\right)^6`)],
      ex: { k: 'val', v: '20', q: R`Find the constant term of $\left(x + \tfrac1x\right)^6$.|Trouvez le terme constant de $\left(x + \tfrac1x\right)^6$.|Halla el término independiente de $\left(x + \tfrac1x\right)^6$.|$\left(x + \tfrac1x\right)^6$ の定数項は？|求 $\left(x + \tfrac1x\right)^6$ 的常数项。`, sol: [R`x^{6-k}x^{-k} = x^{6-2k},\ k = 3`, R`\binom63 = 20`] } });

  A('Binomial theorem/Sum of coefficients', 'Sums of coefficients|Somme des coefficients|Suma de coeficientes|係数の和|系数之和',
    { s: R`Put $x = 1$ in a polynomial and you get the sum of its coefficients. For $(a + b)^n$ with $a = b = 1$: $2^n$; with $a = 1$, $b = -1$: $0$, so the even-position and odd-position coefficients have equal sums.|En posant $x = 1$ dans un polynôme on obtient la somme de ses coefficients. Pour $(a + b)^n$ avec $a = b = 1$ : $2^n$ ; avec $a = 1$, $b = -1$ : $0$, d’où l’égalité des sommes des coefficients de rang pair et impair.|Con $x = 1$ en un polinomio sale la suma de sus coeficientes. En $(a + b)^n$ con $a = b = 1$: $2^n$; con $a = 1$, $b = -1$: $0$, así que los coeficientes de lugar par e impar suman lo mismo.|多項式に $x = 1$ を代入すると係数の和。$a = b = 1$ で $2^n$、$a = 1$, $b = -1$ で 0（偶数番目と奇数番目の和が等しい）。|多项式中令 $x = 1$ 得系数之和。$(a + b)^n$ 中 $a = b = 1$ 得 $2^n$；$a = 1, b = -1$ 得 0，故奇偶位系数和相等。`,
      a: [Y(R`\sum_{k=0}^n \binom nk = 2^n,\qquad \sum_{k=0}^n (-1)^k\binom nk = 0`, { s: 24 })] },
    { s: R`The coefficients of $(3x - 1)^4$ add up to $(3 - 1)^4 = 16$.|Les coefficients de $(3x - 1)^4$ ont pour somme $2^4 = 16$.|Los coeficientes de $(3x - 1)^4$ suman $2^4 = 16$.|和は 16。|和为 16。`,
      a: [Y(R`x = 1:\ (3 - 1)^4 = 16`)] },
    { a: [F(R`(2x + 1)^5`)],
      ex: { k: 'val', v: '243', q: R`Find the sum of the coefficients of $(2x + 1)^5$.|Calculez la somme des coefficients de $(2x + 1)^5$.|Halla la suma de los coeficientes de $(2x + 1)^5$.|$(2x + 1)^5$ の係数の和を求めよ。|求 $(2x + 1)^5$ 的系数之和。`, sol: [R`x = 1:\ 3^5`, R`= 243`] } });

  Cheats.tutor('algebra', L);
})();
