/* Blackboard lessons for the number theory cheat sheet: one lesson per card (and per divisibility rule).
   Pictures: residue clocks, Euclid's squares, divisor grids, the sieve. Texts: 'en|fr|es|ja|zh'. */
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

  // a clock of residues 0 … m−1 (highlight one)
  const CLOCK = (m, hl = -1) => { const P = k => [1.3 * Math.sin(2 * Math.PI * k / m), 1.3 * Math.cos(2 * Math.PI * k / m)];
    return [S2([0, 0], 1.9), CI([0, 0], 1.3, 'b', 0.05), ...SEQ([...Array(m)].map((_, k) => PT(P(k), String(k), k === hl ? 'y' : 'chalk', { dx: P(k)[0] * 13 - 4, dy: -P(k)[1] * 13 + 5 })), 200, 90)]; };
  // a 10 × 10 grid of 1 … 100 with the primes in yellow
  const isP = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
  const SIEVE = (lo = 1) => [S2([5.5, -5.5], 6.2), ...SEQ([...Array(100)].map((_, k) => { const n = k + 1; return LB([k % 10 + 1, -Math.floor(k / 10) - 1], String(n), isP(n) ? (n >= lo ? 'y' : 'o') : 'chalk', 13); }), 200, 8)];
  // Euclid’s algorithm as squares cut from a rectangle w × h
  const EUCLID = (w, h) => { const out = []; let x = 0, y = 0, W = w, Hh = h;
    while (W > 0 && Hh > 0) { if (W >= Hh) { out.push(RECT(x, y, x + Hh, y + Hh, 'y', 0.25)); x += Hh; W -= Hh; } else { out.push(RECT(x, y, x + W, y + W, 'b', 0.25)); y += W; Hh -= W; } }
    return [S2([w / 2, h / 2], Math.max(w, h) / 2 + 0.6), RECT(0, 0, w, h, 'chalk', 0.02), ...SEQ(out, 300, 220)]; };
  const TRY_N = 'Type a whole number and check it. Each hint writes the next line of the solution.|Tapez un nombre entier et vérifiez. Chaque indice écrit la ligne suivante de la solution.|Escribe un número entero y compruébalo. Cada pista escribe la siguiente línea de la solución.|整数を入力して確かめよう。ヒントごとに解答が 1 行ずつ書かれます。|输入一个整数并检查。每次提示写出解答的下一行。';
  const N = (key, head, idea, ex, your) => lesson(key, head, idea, ex, Object.assign({ s: TRY_N }, your));

  // =============================== Divisibility rules (rows) ===============================
  N(R`Divisibility rules/2,\ 5,\ 10`, 'Divisibility by 2, 5 and 10|Divisibilité par 2, 5 et 10|Divisibilidad entre 2, 5 y 10|2, 5, 10 で割り切れる条件|被 2、5、10 整除',
    { s: R`Every number is “tens + last digit”, and 10 is divisible by 2, 5 and 10. So only the last digit decides: even for 2, 0 or 5 for 5, 0 for 10.|Tout nombre s’écrit « dizaines + chiffre des unités », et 10 est divisible par 2, 5 et 10. Seul le dernier chiffre décide : pair pour 2, 0 ou 5 pour 5, 0 pour 10.|Todo número es «decenas + última cifra», y 10 es divisible entre 2, 5 y 10. Solo decide la última cifra: par para 2, 0 o 5 para 5, 0 para 10.|どの数も「10 の倍数 + 一の位」で、10 は 2, 5, 10 で割り切れる。だから一の位だけで決まる：2 は偶数、5 は 0 か 5、10 は 0。|每个数都是“十的倍数 + 个位”，而 10 能被 2、5、10 整除。所以只看个位：被 2 整除看偶数，被 5 看 0 或 5，被 10 看 0。`,
      a: [Y(R`n = 10q + u:\quad d \mid n \iff d \mid u\quad (d = 2, 5, 10)`, { s: 22 })] },
    { s: R`$7350$ ends in 0: divisible by 2, 5 and 10. $4615$ ends in 5: by 5 only.|$7350$ se termine par 0 : divisible par 2, 5 et 10. $4615$ se termine par 5 : seulement par 5.|$7350$ acaba en 0: divisible entre 2, 5 y 10. $4615$ acaba en 5: solo entre 5.|7350 は 2, 5, 10 で、4615 は 5 だけ。|7350 能被 2、5、10 整除；4615 只能被 5。`,
      a: [F(R`735\underline{0}:\ 2,\ 5,\ 10\ \checkmark`), Y(R`461\underline{5}:\ 5\ \text{only}`)] },
    { a: [F(R`n = 8\,426`)],
      ex: { k: 'val', v: '1', q: R`How many of the numbers 2, 5, 10 divide $8\,426$?|Combien des nombres 2, 5, 10 divisent $8\,426$ ?|¿Cuántos de los números 2, 5, 10 dividen a $8\,426$?|2, 5, 10 のうち $8\,426$ を割り切るものはいくつか。|2、5、10 中有几个能整除 $8\,426$？`, sol: [R`\text{last digit } 6:\ \text{even}`, R`\text{only } 2:\ 1`] } });

  N('Divisibility rules/4', 'Divisibility by 4|Divisibilité par 4|Divisibilidad entre 4|4 で割り切れる条件|被 4 整除',
    { s: R`$100$ is a multiple of 4, so the hundreds and everything above do not matter: look at the number formed by the last two digits. The remainder mod 4 is the remainder of that two-digit number.|$100$ est multiple de 4 : les centaines et au-delà ne comptent pas, on regarde le nombre formé par les deux derniers chiffres. Le reste modulo 4 est celui de ce nombre.|$100$ es múltiplo de 4, así que las centenas y lo demás no importan: mira el número de las dos últimas cifras. El resto entre 4 es el de ese número.|100 は 4 の倍数なので百の位以上は関係なく、下 2 桁の数を見る。4 で割った余りもその数の余り。|100 是 4 的倍数，所以百位以上无关，只看末两位组成的数。除以 4 的余数也就是它的余数。`,
      a: [Y(R`4 \mid n \iff 4 \mid \overline{\text{last two digits}}`, { s: 24 })] },
    { s: R`$7316$: $16 = 4\cdot 4$, so $4 \mid 7316$. $5\,342$: $42 = 40 + 2$, remainder 2.|$7316$ : $16$ divisible par 4. $5\,342$ : $42$ donne un reste 2.|$7316$: $16$ es divisible entre 4. $5\,342$: $42$ da resto 2.|7316 は割り切れ、5342 は余り 2。|7316 能整除；5342 余 2。`,
      a: [F(R`73\underline{16}:\ 16 = 4\cdot 4\ \checkmark`), Y(R`53\underline{42}:\ 42 \bmod 4 = 2`)] },
    { a: [F(R`123\,457`)],
      ex: { k: 'val', v: '1', q: R`Find the remainder of $123\,457$ when divided by 4.|Trouvez le reste de la division de $123\,457$ par 4.|Halla el resto de dividir $123\,457$ entre 4.|$123\,457$ を 4 で割った余りを求めよ。|求 $123\,457$ 除以 4 的余数。`, sol: [R`57 = 4\cdot 14 + 1`, R`1`] } });

  N('Divisibility rules/8', 'Divisibility by 8|Divisibilité par 8|Divisibilidad entre 8|8 で割り切れる条件|被 8 整除',
    { s: R`$1000 = 8\cdot 125$, so only the last three digits matter for 8 (in general, $2^k$ needs the last $k$ digits).|$1000 = 8\cdot 125$ : pour 8, seuls les trois derniers chiffres comptent (en général, $2^k$ demande les $k$ derniers chiffres).|$1000 = 8\cdot 125$: para 8 solo importan las tres últimas cifras (en general, $2^k$ necesita las $k$ últimas).|$1000 = 8\cdot 125$ なので 8 は下 3 桁（一般に $2^k$ は下 $k$ 桁）。|$1000 = 8\cdot 125$，所以被 8 整除只看末三位（一般地 $2^k$ 看末 $k$ 位）。`,
      a: [Y(R`8 \mid n \iff 8 \mid \overline{\text{last three digits}}`, { s: 24 })] },
    { s: R`$5\,128$: $128 = 8\cdot 16$, so divisible. $3\,210$: $210 = 8\cdot 26 + 2$, remainder 2.|$5\,128$ : $128 = 8\cdot 16$. $3\,210$ : $210$ donne un reste 2.|$5\,128$: $128 = 8\cdot 16$. $3\,210$: $210$ da resto 2.|5128 は割り切れる。|5128 能整除。`,
      a: [Y(R`5\underline{128}:\ 128 = 8\cdot 16\ \checkmark`)] },
    { a: [F(R`71\,234`)],
      ex: { k: 'val', v: '2', q: R`Find the remainder of $71\,234$ when divided by 8.|Trouvez le reste de la division de $71\,234$ par 8.|Halla el resto de dividir $71\,234$ entre 8.|$71\,234$ を 8 で割った余りを求めよ。|求 $71\,234$ 除以 8 的余数。`, sol: [R`234 = 8\cdot 29 + 2`, R`2`] } });

  N(R`Divisibility rules/3,\ 9`, 'Divisibility by 3 and 9|Divisibilité par 3 et 9|Divisibilidad entre 3 y 9|3 と 9 で割り切れる条件|被 3、9 整除',
    { s: R`$10 = 9 + 1$, so every power of 10 leaves remainder 1 when divided by 9 (or 3). Hence a number has the same remainder as the sum of its digits — and you can repeat until one digit is left.|$10 = 9 + 1$ : toute puissance de 10 a pour reste 1 modulo 9 (ou 3). Un nombre a donc le même reste que la somme de ses chiffres — on peut recommencer jusqu’à un seul chiffre.|$10 = 9 + 1$, así que toda potencia de 10 deja resto 1 entre 9 (o 3). Un número tiene el mismo resto que la suma de sus cifras, y se puede repetir hasta quedar una cifra.|$10 = 9 + 1$ なので 10 の累乗は 9（3）で割ると余り 1。数とその各位の和は余りが同じ（1 桁になるまで繰り返せる）。|$10 = 9 + 1$，10 的每个幂除以 9（或 3）都余 1。所以一个数与其各位数字之和同余——可反复求和直到一位数。`,
      a: [Y(R`n \equiv S(n) \pmod 9,\qquad 3 \mid n \iff 3 \mid S(n)`, { s: 24 })] },
    { s: R`$4581$: $4 + 5 + 8 + 1 = 18$, divisible by 9, so $9 \mid 4581$ (and $3 \mid 4581$).|$4581$ : somme $18$, divisible par 9.|$4581$: suma $18$, divisible entre 9.|和 18 なので 9 で割り切れる。|数字和 18，能被 9 整除。`,
      a: [Y(R`4 + 5 + 8 + 1 = 18 = 9\cdot 2\ \checkmark`)] },
    { a: [F(R`\overline{52d7}`)],
      ex: { k: 'val', v: '4', q: R`Find the digit $d$ that makes the number $52d7$ divisible by 9.|Trouvez le chiffre $d$ qui rend le nombre $52d7$ divisible par 9.|Halla la cifra $d$ que hace divisible entre 9 al número $52d7$.|$52d7$ が 9 で割り切れるような数字 $d$ を求めよ。|求使 $52d7$ 能被 9 整除的数字 $d$。`, sol: [R`5 + 2 + d + 7 = 14 + d`, R`14 + d = 18 \Rightarrow d = 4`] } });

  N('Divisibility rules/6', 'Divisibility by 6|Divisibilité par 6|Divisibilidad entre 6|6 で割り切れる条件|被 6 整除',
    { s: R`$6 = 2\cdot 3$ with 2 and 3 coprime, so a number is divisible by 6 exactly when it passes both tests: even, and digit sum divisible by 3. The same trick works for 12 = 3 · 4, 15 = 3 · 5…|$6 = 2\cdot 3$ avec 2 et 3 premiers entre eux : un nombre est divisible par 6 exactement s’il passe les deux tests — pair, et somme des chiffres divisible par 3. Même idée pour 12 = 3 · 4, 15 = 3 · 5…|$6 = 2\cdot 3$ con 2 y 3 coprimos, así que un número es divisible entre 6 justo cuando pasa ambas pruebas: par, y suma de cifras múltiplo de 3. Igual para 12 = 3 · 4, 15 = 3 · 5…|$6 = 2\cdot 3$（互いに素）なので、偶数かつ各位の和が 3 の倍数のときちょうど 6 で割り切れる。12 = 3 · 4 なども同様。|$6 = 2\cdot 3$ 且 2、3 互素，所以一个数恰在两项检验都通过时能被 6 整除：偶数，且数字和是 3 的倍数。12 = 3 · 4 等同理。`,
      a: [Y(R`6 \mid n \iff 2 \mid n \ \land\ 3 \mid n`, { s: 28 })] },
    { s: R`$2154$: even, and $2 + 1 + 5 + 4 = 12$ is a multiple of 3 — so $6 \mid 2154$.|$2154$ : pair, et $12$ est multiple de 3 — donc $6 \mid 2154$.|$2154$: par, y $12$ es múltiplo de 3, así que $6 \mid 2154$.|偶数かつ和 12。|偶数且和为 12。`,
      a: [Y(R`2154:\ \text{even},\ S = 12\ \Rightarrow\ 6 \mid 2154`)] },
    { a: [F(R`\overline{71d}`)],
      ex: { k: 'val', v: '4', q: R`Find the digit $d$ that makes $71d$ divisible by 6.|Trouvez le chiffre $d$ qui rend $71d$ divisible par 6.|Halla la cifra $d$ que hace divisible entre 6 a $71d$.|$71d$ が 6 で割り切れる数字 $d$ を求めよ。|求使 $71d$ 能被 6 整除的数字 $d$。`, sol: [R`3 \mid 8 + d:\ d \in \{1, 4, 7\}`, R`\text{even: } d = 4`] } });

  N('Divisibility rules/11', 'Divisibility by 11|Divisibilité par 11|Divisibilidad entre 11|11 で割り切れる条件|被 11 整除',
    { s: R`$10 \equiv -1 \pmod{11}$, so powers of 10 alternate $+1, -1, +1, \dots$. Add and subtract the digits alternately, starting from the units: the number has the same remainder as that alternating sum.|$10 \equiv -1 \pmod{11}$ : les puissances de 10 alternent $+1, -1, +1, \dots$. On additionne et soustrait les chiffres alternativement depuis les unités : le nombre a le même reste que cette somme alternée.|$10 \equiv -1 \pmod{11}$, así que las potencias de 10 alternan $+1, -1, +1, \dots$. Suma y resta las cifras alternadamente desde las unidades: el número tiene el mismo resto que esa suma alternada.|$10 \equiv -1 \pmod{11}$ なので 10 の累乗は $+1, -1, \dots$ と交互。一の位から交互に足し引きした和と余りが同じ。|$10 \equiv -1 \pmod{11}$，所以 10 的幂交替为 $+1, -1, \dots$。从个位起交替加减各位数字，所得与原数同余。`,
      a: [Y(R`n \equiv u_0 - u_1 + u_2 - u_3 + \cdots \pmod{11}`, { s: 24 })] },
    { s: R`$918\,082$: from the right $2 - 8 + 0 - 8 + 1 - 9 = -22$, a multiple of 11, so $11 \mid 918\,082$.|$918\,082$ : depuis la droite $2 - 8 + 0 - 8 + 1 - 9 = -22$, multiple de 11.|$918\,082$: desde la derecha $2 - 8 + 0 - 8 + 1 - 9 = -22$, múltiplo de 11.|交互和 $-22$ で割り切れる。|交错和 $-22$，能整除。`,
      a: [Y(R`2 - 8 + 0 - 8 + 1 - 9 = -22 = 11\cdot(-2)\ \checkmark`, { s: 24 })] },
    { a: [F(R`4\,381`)],
      ex: { k: 'val', v: '3', q: R`Find the remainder of $4\,381$ when divided by 11.|Trouvez le reste de la division de $4\,381$ par 11.|Halla el resto de dividir $4\,381$ entre 11.|$4\,381$ を 11 で割った余りを求めよ。|求 $4\,381$ 除以 11 的余数。`, sol: [R`1 - 8 + 3 - 4 = -8`, R`-8 \equiv 3 \pmod{11}`] } });

  N('Divisibility rules/Linear combinations', 'Divisors of combinations|Diviseurs des combinaisons|Divisores de combinaciones|1 次結合の約数|线性组合的因数',
    { s: R`If $d$ divides both $a$ and $b$, it divides anything built from them by adding and multiplying by integers. The standard trick: choose $x, y$ so that the variable cancels and only a constant is left.|Si $d$ divise $a$ et $b$, il divise tout ce qu’on fabrique avec eux par additions et multiplications par des entiers. L’astuce : choisir $x, y$ pour que la variable disparaisse et qu’il ne reste qu’une constante.|Si $d$ divide a $a$ y a $b$, divide todo lo que se construya con ellos sumando y multiplicando por enteros. El truco: elige $x, y$ para que la variable se cancele y quede una constante.|$d$ が $a$ と $b$ を割り切れば、整数倍して足したものも割り切る。定番：変数が消えて定数だけ残るように $x, y$ を選ぶ。|若 $d$ 同时整除 $a$ 和 $b$，它就整除用整数系数组合出的任何数。技巧：选 $x, y$ 消去变量，只剩常数。`,
      a: [Y(R`d \mid a,\ d \mid b \Rightarrow d \mid ax + by`, { s: 28 })] },
    { s: R`If $d \mid n$ and $d \mid n + 6$, then $d \mid (n + 6) - n = 6$. So $\gcd(n, n + 6)$ can only be 1, 2, 3 or 6.|Si $d \mid n$ et $d \mid n + 6$, alors $d \mid 6$ : $\gcd(n, n + 6) \in \{1, 2, 3, 6\}$.|Si $d \mid n$ y $d \mid n + 6$, entonces $d \mid 6$: $\gcd(n, n + 6) \in \{1, 2, 3, 6\}$.|$d \mid 6$。|$d \mid 6$。`,
      a: [Y(R`d \mid (n + 6) - n = 6`)] },
    { a: [F(R`\gcd(3n + 5,\ n + 2)`)],
      ex: { k: 'val', v: '1', q: R`Find $\gcd(3n + 5,\ n + 2)$ for every integer $n$.|Calculez $\gcd(3n + 5,\ n + 2)$ pour tout entier $n$.|Halla $\gcd(3n + 5,\ n + 2)$ para todo entero $n$.|任意の整数 $n$ について $\gcd(3n + 5,\ n + 2)$ を求めよ。|对任意整数 $n$，求 $\gcd(3n + 5,\ n + 2)$。`, sol: [R`d \mid 3(n + 2) - (3n + 5) = 1`, R`\gcd = 1`] } });

  // =============================== gcd and lcm ===============================
  N('gcd and lcm/Product', 'gcd × lcm = ab|pgcd × ppcm = ab|mcd × mcm = ab|最大公約数 × 最小公倍数 = ab|最大公因数 × 最小公倍数 = ab',
    { s: R`In the prime factorisations, the gcd takes the smaller exponent of each prime and the lcm the larger one. Together they use each exponent exactly once, so their product is $ab$ — find one and you get the other.|Dans les décompositions, le pgcd prend le plus petit exposant de chaque premier et le ppcm le plus grand. Ensemble ils utilisent chaque exposant une fois : leur produit vaut $ab$ — l’un donne l’autre.|En las factorizaciones, el mcd toma el exponente menor de cada primo y el mcm el mayor. Juntos usan cada exponente una vez, así que su producto es $ab$: con uno sale el otro.|素因数分解で gcd は各素数の小さい指数、lcm は大きい指数をとる。合わせると各指数をちょうど 1 回ずつ使うので積は $ab$。|在质因数分解中，最大公因数取每个质数的较小指数，最小公倍数取较大指数。两者合起来每个指数恰用一次，所以乘积为 $ab$。`,
      a: [Y(R`\gcd(a, b)\cdot\operatorname{lcm}(a, b) = ab`, { s: 28 })] },
    { s: R`$\gcd(12, 18) = 6$, so $\operatorname{lcm}(12, 18) = \tfrac{216}{6} = 36$.|$\gcd(12, 18) = 6$, donc $\operatorname{lcm} = \tfrac{216}{6} = 36$.|$\gcd(12, 18) = 6$, así que $\operatorname{lcm} = \tfrac{216}{6} = 36$.|lcm = 36。|最小公倍数 36。`,
      a: [Y(R`\operatorname{lcm}(12, 18) = \frac{12\cdot 18}{6} = 36`)] },
    { a: [F(R`ab = 360,\quad \gcd(a, b) = 6`)],
      ex: { k: 'val', v: '60', q: R`Two numbers have product 360 and gcd 6. Find their lcm.|Deux nombres ont pour produit 360 et pour pgcd 6. Trouvez leur ppcm.|Dos números tienen producto 360 y mcd 6. Halla su mcm.|積が 360、最大公約数が 6 の 2 数の最小公倍数を求めよ。|两数之积为 360，最大公因数为 6，求最小公倍数。`, sol: [R`\operatorname{lcm} = \frac{360}{6}`, R`= 60`] } });

  N('gcd and lcm/Euclid’s algorithm', 'Euclid’s algorithm|Algorithme d’Euclide|Algoritmo de Euclides|ユークリッドの互除法|辗转相除法',
    { s: R`Any common divisor of $a$ and $b$ also divides $a - qb$, the remainder. So replace $(a, b)$ by $(b, a \bmod b)$ again and again; the numbers shrink fast, and the last non-zero remainder is the gcd. Geometrically: cut the largest squares from a rectangle until the squares fit exactly.|Tout diviseur commun de $a$ et $b$ divise aussi $a - qb$, le reste. On remplace donc $(a, b)$ par $(b, a \bmod b)$ encore et encore ; les nombres diminuent vite, et le dernier reste non nul est le pgcd. Géométriquement : on découpe les plus grands carrés d’un rectangle jusqu’à ce qu’ils tombent juste.|Todo divisor común de $a$ y $b$ divide también a $a - qb$, el resto. Así que sustituye $(a, b)$ por $(b, a \bmod b)$ una y otra vez; los números bajan rápido y el último resto no nulo es el mcd. Geométricamente: corta los mayores cuadrados posibles de un rectángulo hasta que encajen exactamente.|$a$ と $b$ の公約数は余り $a - qb$ も割り切る。$(a, b) \to (b, a \bmod b)$ を繰り返すと数はすぐ小さくなり、最後の 0 でない余りが gcd。図形的には長方形から最大の正方形を切り取り続ける。|$a$、$b$ 的公因数也整除余数 $a - qb$。反复把 $(a, b)$ 换成 $(b, a \bmod b)$，数迅速变小，最后一个非零余数就是最大公因数。几何上：从长方形中不断切下最大的正方形，直到恰好分完。`,
      a: [Y(R`\gcd(a, b) = \gcd(b,\ a \bmod b),\quad \gcd(a, 0) = a`, { s: 22 }), ...EUCLID(12, 5)] },
    { s: R`$\gcd(252, 105)$: $252 = 2\cdot 105 + 42$, $105 = 2\cdot 42 + 21$, $42 = 2\cdot 21 + 0$. The gcd is 21. (The picture is the same rectangle measured in units of 21: $12 \times 5$.)|$\gcd(252, 105)$ : $252 = 2\cdot 105 + 42$, $105 = 2\cdot 42 + 21$, $42 = 2\cdot 21$. Le pgcd vaut 21.|$\gcd(252, 105)$: $252 = 2\cdot 105 + 42$, $105 = 2\cdot 42 + 21$, $42 = 2\cdot 21$. El mcd es 21.|gcd = 21。|最大公因数 21。`,
      a: [F(R`252 = 2\cdot 105 + 42`), F(R`105 = 2\cdot 42 + 21`), Y(R`42 = 2\cdot 21 + 0\ \Rightarrow\ \gcd = 21`)] },
    { a: [F(R`\gcd(391,\ 299)`)],
      ex: { k: 'val', v: '23', q: R`Use Euclid’s algorithm to find $\gcd(391, 299)$.|Avec l’algorithme d’Euclide, calculez $\gcd(391, 299)$.|Con el algoritmo de Euclides, halla $\gcd(391, 299)$.|互除法で $\gcd(391, 299)$ を求めよ。|用辗转相除法求 $\gcd(391, 299)$。`, sol: [R`391 = 1\cdot 299 + 92`, R`299 = 3\cdot 92 + 23`, R`92 = 4\cdot 23 \Rightarrow 23`] } });

  lesson('gcd and lcm/Bézout’s identity', 'Bézout’s identity|Identité de Bézout|Identidad de Bézout|ベズーの等式|裴蜀定理',
    { s: R`Running Euclid’s algorithm backwards writes the gcd as a combination $ax + by$. Consequences: $ax + by = c$ has integer solutions exactly when $\gcd(a, b) \mid c$, and $a$ has an inverse mod $b$ when they are coprime.|En remontant l’algorithme d’Euclide on écrit le pgcd comme combinaison $ax + by$. Conséquences : $ax + by = c$ a des solutions entières exactement si $\gcd(a, b) \mid c$, et $a$ est inversible modulo $b$ s’ils sont premiers entre eux.|Recorriendo el algoritmo de Euclides hacia atrás se escribe el mcd como combinación $ax + by$. Consecuencias: $ax + by = c$ tiene soluciones enteras justo cuando $\gcd(a, b) \mid c$, y $a$ tiene inverso módulo $b$ si son coprimos.|互除法を逆にたどると gcd が $ax + by$ の形で書ける。帰結：$ax + by = c$ は $\gcd(a, b) \mid c$ のときちょうど整数解をもち、互いに素なら $a$ は $b$ を法として逆元をもつ。|把辗转相除法倒推回去，就把最大公因数写成 $ax + by$。推论：$ax + by = c$ 有整数解当且仅当 $\gcd(a, b) \mid c$；互素时 $a$ 模 $b$ 有逆元。`,
      a: [Y(R`\exists\,x, y \in \mathbb Z:\ ax + by = \gcd(a, b)`, { s: 24 })] },
    { s: R`Back-substitute in $\gcd(252, 105) = 21$: $21 = 105 - 2\cdot 42 = 105 - 2(252 - 2\cdot 105) = 5\cdot 105 - 2\cdot 252$. So $x = -2$, $y = 5$.|On remonte : $21 = 105 - 2\cdot 42 = 5\cdot 105 - 2\cdot 252$. Donc $x = -2$, $y = 5$.|Hacia atrás: $21 = 105 - 2\cdot 42 = 5\cdot 105 - 2\cdot 252$. Así $x = -2$, $y = 5$.|$21 = 5\cdot 105 - 2\cdot 252$。|$21 = 5\cdot 105 - 2\cdot 252$。`,
      a: [F(R`21 = 105 - 2\cdot 42`), F(R`= 105 - 2(252 - 2\cdot 105)`), Y(R`= 252\cdot(-2) + 105\cdot 5`)] },
    { s: 'Type the solution as (x, y) and check it.|Tapez la solution sous la forme (x, y) et vérifiez.|Escribe la solución como (x, y) y compruébala.|解を (x, y) の形で入力して確かめよう。|以 (x, y) 形式输入解并检查。', a: [F(R`13x + 5y = 1`)],
      ex: { k: 'pt', v: [2, -5], q: R`Find the solution of $13x + 5y = 1$ with $0 < x < 5$.|Trouvez la solution de $13x + 5y = 1$ avec $0 < x < 5$.|Halla la solución de $13x + 5y = 1$ con $0 < x < 5$.|$0 < x < 5$ となる $13x + 5y = 1$ の解を求めよ。|求 $13x + 5y = 1$ 满足 $0 < x < 5$ 的解。`, sol: [R`13 = 2\cdot 5 + 3,\ 5 = 3 + 2,\ 3 = 2 + 1`, R`1 = 13\cdot 2 + 5\cdot(-5)`, R`(2,\ -5)`] } });

  N('gcd and lcm/From prime factorisations', 'gcd and lcm from factorisations|pgcd et ppcm par les décompositions|mcd y mcm por factorización|素因数分解から gcd と lcm|由质因数分解求最大公因数与最小公倍数',
    { s: R`Line the factorisations up prime by prime. The gcd keeps each prime with the smaller exponent (what both share); the lcm keeps the larger exponent (enough for both). Primes missing from one number have exponent 0.|On aligne les décompositions premier par premier. Le pgcd garde chaque premier avec le plus petit exposant (ce qu’ils partagent) ; le ppcm le plus grand (assez pour les deux). Un premier absent a l’exposant 0.|Alinea las factorizaciones primo a primo. El mcd toma cada primo con el exponente menor (lo que comparten) y el mcm con el mayor (lo suficiente para ambos). Un primo que falta tiene exponente 0.|素数ごとに並べ、gcd は小さい指数（共通部分）、lcm は大きい指数（両方に足りる分）。現れない素数は指数 0。|按质数逐一对齐。最大公因数取较小指数（共有部分），最小公倍数取较大指数（两者都够）。缺少的质数指数为 0。`,
      a: [Y(R`\gcd = \prod p^{\min},\qquad \operatorname{lcm} = \prod p^{\max}`, { s: 26 })] },
    { s: R`$360 = 2^3\cdot 3^2\cdot 5$, $84 = 2^2\cdot 3\cdot 7$: $\gcd = 2^2\cdot 3 = 12$, $\operatorname{lcm} = 2^3\cdot 3^2\cdot 5\cdot 7 = 2520$.|$\gcd = 12$, $\operatorname{lcm} = 2520$.|$\gcd = 12$, $\operatorname{lcm} = 2520$.|gcd 12、lcm 2520。|12 与 2520。`,
      a: [F(R`360 = 2^3\cdot 3^2\cdot 5,\quad 84 = 2^2\cdot 3\cdot 7`), Y(R`\gcd = 2^2\cdot 3 = 12,\quad \operatorname{lcm} = 2^3\cdot 3^2\cdot 5\cdot 7 = 2520`, { s: 22 })] },
    { a: [F(R`a = 2^4\cdot 3^2\cdot 5,\quad b = 2^2\cdot 3^5\cdot 7`)],
      ex: { k: 'val', v: '36', q: R`Find $\gcd(2^4\cdot 3^2\cdot 5,\ 2^2\cdot 3^5\cdot 7)$.|Calculez $\gcd(2^4\cdot 3^2\cdot 5,\ 2^2\cdot 3^5\cdot 7)$.|Halla $\gcd(2^4\cdot 3^2\cdot 5,\ 2^2\cdot 3^5\cdot 7)$.|$\gcd(2^4\cdot 3^2\cdot 5,\ 2^2\cdot 3^5\cdot 7)$ を求めよ。|求 $\gcd(2^4\cdot 3^2\cdot 5,\ 2^2\cdot 3^5\cdot 7)$。`, sol: [R`2^{\min(4, 2)}\cdot 3^{\min(2, 5)}`, R`= 2^2\cdot 3^2 = 36`] } });

  N('gcd and lcm/Coprime', 'Coprime numbers|Nombres premiers entre eux|Números coprimos|互いに素|互素',
    { s: R`$a$ and $b$ are coprime when they share no prime factor. Then if $a$ divides a product $bc$, all of $a$’s primes must sit in $c$: $a \mid c$ (Gauss’s lemma). Without coprimality this fails: $4 \mid 2\cdot 6$ but $4 \nmid 6$.|$a$ et $b$ sont premiers entre eux s’ils n’ont aucun facteur premier commun. Alors si $a$ divise un produit $bc$, tous les premiers de $a$ sont dans $c$ : $a \mid c$ (lemme de Gauss). Sans cette hypothèse c’est faux : $4 \mid 2\cdot 6$ mais $4 \nmid 6$.|$a$ y $b$ son coprimos si no comparten factores primos. Entonces si $a$ divide a un producto $bc$, todos los primos de $a$ están en $c$: $a \mid c$ (lema de Gauss). Sin coprimalidad falla: $4 \mid 2\cdot 6$ pero $4 \nmid 6$.|共通の素因数がなければ互いに素。このとき $a \mid bc$ なら $a$ の素因数はすべて $c$ にあり $a \mid c$（ガウスの補題）。互いに素でないと成り立たない：$4 \mid 2\cdot 6$ だが $4 \nmid 6$。|$a$、$b$ 没有公共质因数时互素。此时若 $a$ 整除积 $bc$，$a$ 的质因数都在 $c$ 中：$a \mid c$（高斯引理）。不互素时不成立：$4 \mid 2\cdot 6$ 但 $4 \nmid 6$。`,
      a: [Y(R`\gcd(a, b) = 1,\ a \mid bc\ \Rightarrow\ a \mid c`, { s: 26 })] },
    { s: R`$\gcd(8, 15) = 1$. If $3 \mid 2c$, since $\gcd(3, 2) = 1$, then $3 \mid c$.|$\gcd(8, 15) = 1$. Si $3 \mid 2c$, alors $3 \mid c$.|$\gcd(8, 15) = 1$. Si $3 \mid 2c$, entonces $3 \mid c$.|$3 \mid 2c \Rightarrow 3 \mid c$。|$3 \mid 2c \Rightarrow 3 \mid c$。`,
      a: [Y(R`3 \mid 2c,\ \gcd(3, 2) = 1 \Rightarrow 3 \mid c`)] },
    { a: [F(R`5 \mid 6c,\quad 0 < c < 20`)],
      ex: { k: 'val', v: '3', q: R`How many integers $c$ with $0 < c < 20$ satisfy $5 \mid 6c$?|Combien d’entiers $c$ avec $0 < c < 20$ vérifient $5 \mid 6c$ ?|¿Cuántos enteros $c$ con $0 < c < 20$ cumplen $5 \mid 6c$?|$0 < c < 20$ で $5 \mid 6c$ を満たす整数 $c$ は何個か。|满足 $0 < c < 20$ 且 $5 \mid 6c$ 的整数 $c$ 有几个？`, sol: [R`\gcd(5, 6) = 1 \Rightarrow 5 \mid c`, R`c = 5, 10, 15:\ 3`] } });

  // =============================== Primes and divisors ===============================
  N('Primes and divisors/Prime factorisation', 'Prime factorisation|Décomposition en facteurs premiers|Factorización en primos|素因数分解|质因数分解',
    { s: R`Every integer $n \ge 2$ is a product of primes in exactly one way (up to order). To find it, divide by 2 as long as you can, then by 3, 5, 7, … — you only need to try primes up to $\sqrt n$ of what is left.|Tout entier $n \ge 2$ est un produit de nombres premiers d’une seule façon (à l’ordre près). On divise par 2 tant qu’on peut, puis par 3, 5, 7, … — il suffit d’essayer les premiers jusqu’à la racine de ce qui reste.|Todo entero $n \ge 2$ es producto de primos de una única forma (salvo el orden). Divide entre 2 mientras puedas, luego entre 3, 5, 7…; basta probar primos hasta la raíz de lo que queda.|2 以上の整数は順序を除いてただ一通りに素数の積で表せる。2 で割れるだけ割り、次に 3, 5, 7, … と進む（残りの平方根まで試せばよい）。|每个 $n \ge 2$ 的整数都唯一地（不计顺序）分解为质数之积。先尽量除以 2，再除以 3、5、7……只需试到剩余部分的平方根。`,
      a: [Y(R`n = p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_k^{\alpha_k}`, { s: 28 })] },
    { s: R`$360 \to 180 \to 90 \to 45$ (three 2s), $45 \to 15 \to 5$ (two 3s), then 5: $360 = 2^3\cdot 3^2\cdot 5$.|$360 \to 180 \to 90 \to 45$ (trois 2), $45 \to 15 \to 5$ (deux 3), puis 5 : $360 = 2^3\cdot 3^2\cdot 5$.|$360 \to 180 \to 90 \to 45$ (tres 2), $45 \to 15 \to 5$ (dos 3) y 5: $360 = 2^3\cdot 3^2\cdot 5$.|$360 = 2^3\cdot 3^2\cdot 5$。|$360 = 2^3\cdot 3^2\cdot 5$。`,
      a: [F(R`360 = 2\cdot 2\cdot 2\cdot 45`), Y(R`= 2^3\cdot 3^2\cdot 5`)] },
    { a: [F(R`2310`)],
      ex: { k: 'val', v: '11', q: R`Find the largest prime factor of 2310.|Trouvez le plus grand facteur premier de 2310.|Halla el mayor factor primo de 2310.|2310 の最大の素因数を求めよ。|求 2310 的最大质因数。`, sol: [R`2310 = 2\cdot 3\cdot 5\cdot 7\cdot 11`, R`11`] } });

  N('Primes and divisors/Number of divisors', 'Number of divisors|Nombre de diviseurs|Número de divisores|約数の個数|因数个数',
    { s: R`A divisor of $n = p^\alpha q^\beta\cdots$ picks an exponent for each prime: $0, 1, \dots, \alpha$ for $p$ ($\alpha + 1$ choices), and so on. Multiply the numbers of choices. The grid shows the 12 divisors of $72 = 2^3\cdot 3^2$ as $4 \times 3$.|Un diviseur de $n = p^\alpha q^\beta\cdots$ choisit un exposant pour chaque premier : $0, 1, \dots, \alpha$ pour $p$ ($\alpha + 1$ choix), etc. On multiplie les nombres de choix. La grille montre les 12 diviseurs de $72 = 2^3\cdot 3^2$ en $4 \times 3$.|Un divisor de $n = p^\alpha q^\beta\cdots$ elige un exponente para cada primo: $0, 1, \dots, \alpha$ para $p$ ($\alpha + 1$ opciones), etc. Multiplica los números de opciones. La cuadrícula muestra los 12 divisores de $72 = 2^3\cdot 3^2$ como $4 \times 3$.|約数は各素数の指数を選ぶこと：$p$ は $0, \dots, \alpha$ の $\alpha + 1$ 通り…。選び方を掛ける。格子は $72 = 2^3\cdot 3^2$ の 12 個の約数（$4 \times 3$）。|因数就是为每个质数选指数：$p$ 可取 $0, \dots, \alpha$（$\alpha + 1$ 种），等等。选法相乘。网格显示 $72 = 2^3\cdot 3^2$ 的 12 个因数（$4 \times 3$）。`,
      a: [Y(R`\tau(n) = (\alpha_1 + 1)(\alpha_2 + 1)\cdots(\alpha_k + 1)`, { s: 24 }), S2([1.5, 1], 2.4), ...SEQ([...Array(12)].map((_, k) => { const i = k % 4, j = Math.floor(k / 4); return LB([i, j], String(2 ** i * 3 ** j), 'y', 16); }), 200, 60)] },
    { s: R`$360 = 2^3\cdot 3^2\cdot 5$: $\tau = 4\cdot 3\cdot 2 = 24$ divisors.|$360 = 2^3\cdot 3^2\cdot 5$ : $\tau = 4\cdot 3\cdot 2 = 24$.|$360 = 2^3\cdot 3^2\cdot 5$: $\tau = 4\cdot 3\cdot 2 = 24$.|24 個。|24 个。`,
      a: [Y(R`\tau(360) = (3 + 1)(2 + 1)(1 + 1) = 24`)] },
    { a: [F(R`144`)],
      ex: { k: 'val', v: '15', q: R`How many positive divisors does 144 have?|Combien de diviseurs positifs a 144 ?|¿Cuántos divisores positivos tiene 144?|144 の正の約数は何個か。|144 有多少个正因数？`, sol: [R`144 = 2^4\cdot 3^2`, R`\tau = 5\cdot 3 = 15`] } });

  N('Primes and divisors/Sum of divisors', 'Sum of divisors|Somme des diviseurs|Suma de divisores|約数の和|因数之和',
    { s: R`Expanding $(1 + p + \dots + p^\alpha)(1 + q + \dots + q^\beta)\cdots$ produces every divisor exactly once. Each bracket is a geometric sum, $\tfrac{p^{\alpha + 1} - 1}{p - 1}$. A number is perfect when $\sigma(n) = 2n$.|En développant $(1 + p + \dots + p^\alpha)(1 + q + \dots + q^\beta)\cdots$ on obtient chaque diviseur une fois. Chaque parenthèse est une somme géométrique, $\tfrac{p^{\alpha + 1} - 1}{p - 1}$. Un nombre est parfait si $\sigma(n) = 2n$.|Al desarrollar $(1 + p + \dots + p^\alpha)(1 + q + \dots + q^\beta)\cdots$ sale cada divisor una vez. Cada paréntesis es una suma geométrica, $\tfrac{p^{\alpha + 1} - 1}{p - 1}$. Un número es perfecto si $\sigma(n) = 2n$.|$(1 + p + \dots + p^\alpha)(1 + q + \dots)\cdots$ を展開すると各約数がちょうど 1 回現れる。各括弧は等比数列の和 $\tfrac{p^{\alpha + 1} - 1}{p - 1}$。$\sigma(n) = 2n$ なら完全数。|展开 $(1 + p + \dots + p^\alpha)(1 + q + \dots)\cdots$ 恰得到每个因数一次。每个括号是等比求和 $\tfrac{p^{\alpha + 1} - 1}{p - 1}$。$\sigma(n) = 2n$ 时为完全数。`,
      a: [Y(R`\sigma(n) = \prod_i\frac{p_i^{\alpha_i + 1} - 1}{p_i - 1}`, { s: 26 })] },
    { s: R`$12 = 2^2\cdot 3$: $\sigma = (1 + 2 + 4)(1 + 3) = 7\cdot 4 = 28$. Check: $1 + 2 + 3 + 4 + 6 + 12 = 28$.|$12 = 2^2\cdot 3$ : $\sigma = 7\cdot 4 = 28$. Vérification : $1 + 2 + 3 + 4 + 6 + 12 = 28$.|$12 = 2^2\cdot 3$: $\sigma = 7\cdot 4 = 28$. Comprobación: $1 + 2 + 3 + 4 + 6 + 12 = 28$.|$\sigma(12) = 28$。|$\sigma(12) = 28$。`,
      a: [F(R`(1 + 2 + 4)(1 + 3) = 7\cdot 4`), Y(R`= 28 = 1 + 2 + 3 + 4 + 6 + 12`)] },
    { a: [F(R`28 = 2^2\cdot 7`)],
      ex: { k: 'val', v: '56', q: R`Compute $\sigma(28)$, the sum of all positive divisors of 28.|Calculez $\sigma(28)$, la somme des diviseurs positifs de 28.|Calcula $\sigma(28)$, la suma de los divisores positivos de 28.|28 の正の約数の和 $\sigma(28)$ を求めよ。|求 28 的所有正因数之和 $\sigma(28)$。`, sol: [R`(1 + 2 + 4)(1 + 7) = 7\cdot 8`, R`= 56 = 2\cdot 28\ (\text{perfect})`] } });

  N('Primes and divisors/Euler’s totient', 'Euler’s totient function|L’indicatrice d’Euler|La función φ de Euler|オイラーの φ 関数|欧拉函数',
    { s: R`$\varphi(n)$ counts the numbers from 1 to $n$ coprime to $n$. Each prime $p$ of $n$ removes the fraction $\tfrac1p$ of them (its multiples), and for different primes these removals combine by multiplication.|$\varphi(n)$ compte les nombres de 1 à $n$ premiers avec $n$. Chaque premier $p$ de $n$ en retire la fraction $\tfrac1p$ (ses multiples), et pour des premiers différents ces retraits se combinent par produit.|$\varphi(n)$ cuenta los números de 1 a $n$ coprimos con $n$. Cada primo $p$ de $n$ quita la fracción $\tfrac1p$ (sus múltiplos), y para primos distintos esas fracciones se combinan multiplicando.|$\varphi(n)$ は 1〜$n$ で $n$ と互いに素な数の個数。$n$ の素因数 $p$ ごとに $\tfrac1p$（その倍数）を除き、異なる素数では掛け合わせる。|$\varphi(n)$ 是 1 到 $n$ 中与 $n$ 互素的数的个数。$n$ 的每个质因数 $p$ 去掉其中 $\tfrac1p$（它的倍数），不同质数的去除按乘法组合。`,
      a: [Y(R`\varphi(n) = n\prod_{p \mid n}\left(1 - \frac1p\right)`, { s: 28 })] },
    { s: R`$36 = 2^2\cdot 3^2$: $\varphi(36) = 36\cdot\tfrac12\cdot\tfrac23 = 12$. For a prime, $\varphi(p) = p - 1$.|$\varphi(36) = 36\cdot\tfrac12\cdot\tfrac23 = 12$. Pour un premier, $\varphi(p) = p - 1$.|$\varphi(36) = 36\cdot\tfrac12\cdot\tfrac23 = 12$. Para un primo, $\varphi(p) = p - 1$.|$\varphi(36) = 12$。|$\varphi(36) = 12$。`,
      a: [Y(R`\varphi(36) = 36\cdot\tfrac12\cdot\tfrac23 = 12`)] },
    { a: [F(R`\varphi(100)`)],
      ex: { k: 'val', v: '40', q: R`Compute $\varphi(100)$.|Calculez $\varphi(100)$.|Calcula $\varphi(100)$.|$\varphi(100)$ を求めよ。|求 $\varphi(100)$。`, sol: [R`100 = 2^2\cdot 5^2`, R`100\cdot\tfrac12\cdot\tfrac45 = 40`] } });

  N('Primes and divisors/Primality test', 'Testing primality|Tester la primalité|Comprobar si es primo|素数判定|素数判定',
    { s: R`If $n = ab$ with $1 < a \le b$, then $a \le \sqrt n$. So a composite $n$ always has a prime factor at most $\sqrt n$: test only the primes up to $\sqrt n$. If none divides, $n$ is prime.|Si $n = ab$ avec $1 < a \le b$, alors $a \le \sqrt n$. Un nombre composé a donc toujours un facteur premier au plus $\sqrt n$ : on teste seulement les premiers jusqu’à $\sqrt n$. Si aucun ne divise, $n$ est premier.|Si $n = ab$ con $1 < a \le b$, entonces $a \le \sqrt n$. Un compuesto siempre tiene un factor primo como mucho $\sqrt n$: prueba solo los primos hasta $\sqrt n$. Si ninguno divide, $n$ es primo.|$n = ab$（$1 < a \le b$）なら $a \le \sqrt n$。合成数は必ず $\sqrt n$ 以下の素因数をもつので、$\sqrt n$ までの素数だけ試せばよい。|若 $n = ab$ 且 $1 < a \le b$，则 $a \le \sqrt n$。合数总有不超过 $\sqrt n$ 的质因数：只需试到 $\sqrt n$ 的质数。都不整除则 $n$ 是质数。`,
      a: [Y(R`n\ \text{prime} \iff \text{no prime } p \le \sqrt n \text{ divides } n`, { s: 24 })] },
    { s: R`$221$: $\sqrt{221} \approx 14.9$, so test 2, 3, 5, 7, 11, 13. $221 = 13\cdot 17$ — composite. $223$ survives all these tests, so it is prime.|$221$ : $\sqrt{221} \approx 14{,}9$ ; on teste 2, 3, 5, 7, 11, 13. $221 = 13\cdot 17$. $223$ passe tous les tests : premier.|$221$: $\sqrt{221} \approx 14{,}9$; se prueban 2, 3, 5, 7, 11, 13. $221 = 13\cdot 17$. $223$ pasa todas: primo.|$221 = 13\cdot 17$、223 は素数。|$221 = 13\cdot 17$；223 是质数。`,
      a: [F(R`\sqrt{221} \approx 14.9:\ 2, 3, 5, 7, 11, 13`), Y(R`221 = 13\cdot 17`)] },
    { a: [F(R`n = 391`)],
      ex: { k: 'val', v: '19', q: R`To test whether 391 is prime, what is the largest prime you need to try?|Pour tester si 391 est premier, quel est le plus grand nombre premier à essayer ?|Para comprobar si 391 es primo, ¿cuál es el mayor primo que hay que probar?|391 が素数か調べるとき、試す必要のある最大の素数は？|判断 391 是否为质数，需要试的最大质数是多少？`, sol: [R`\sqrt{391} \approx 19.8`, R`19\quad (391 = 17\cdot 23)`] } });

  N('Primes and divisors/Primes below 100', 'The primes below 100|Les nombres premiers inférieurs à 100|Los primos menores que 100|100 未満の素数|100 以内的质数',
    { s: R`The sieve of Eratosthenes: cross out the multiples of 2, 3, 5 and 7 (enough, since $\sqrt{100} = 10$); what remains are the 25 primes below 100. Apart from 2 and 3, every prime is $6k \pm 1$.|Le crible d’Ératosthène : on barre les multiples de 2, 3, 5 et 7 (suffisant car $\sqrt{100} = 10$) ; il reste les 25 nombres premiers inférieurs à 100. À part 2 et 3, tout premier est de la forme $6k \pm 1$.|La criba de Eratóstenes: tacha los múltiplos de 2, 3, 5 y 7 (basta, porque $\sqrt{100} = 10$); quedan los 25 primos menores que 100. Salvo 2 y 3, todo primo es $6k \pm 1$.|エラトステネスのふるい：2, 3, 5, 7 の倍数を消せば（$\sqrt{100} = 10$ なので十分）25 個の素数が残る。2, 3 以外の素数は $6k \pm 1$。|埃拉托色尼筛法：划去 2、3、5、7 的倍数（因 $\sqrt{100} = 10$ 已足够），剩下 100 以内的 25 个质数。除 2、3 外，质数都形如 $6k \pm 1$。`,
      a: [Y(R`25\ \text{primes} < 100`), ...SIEVE()] },
    { s: R`Between 1 and 50 there are 15 primes; they thin out slowly — about $\tfrac{n}{\ln n}$ primes below $n$.|Entre 1 et 50 il y a 15 nombres premiers ; ils se raréfient lentement — environ $\tfrac{n}{\ln n}$ en dessous de $n$.|Entre 1 y 50 hay 15 primos; se hacen raros despacio: unos $\tfrac{n}{\ln n}$ por debajo de $n$.|50 までに 15 個、$n$ 未満に約 $\tfrac{n}{\ln n}$ 個。|50 以内 15 个；$n$ 以内约 $\tfrac{n}{\ln n}$ 个。`,
      a: [Y(R`\pi(50) = 15,\quad \pi(100) = 25`)] },
    { a: [F(R`50 < p < 100`), ...SIEVE(51)],
      ex: { k: 'val', v: '10', q: R`How many primes are there between 50 and 100?|Combien y a-t-il de nombres premiers entre 50 et 100 ?|¿Cuántos primos hay entre 50 y 100?|50 と 100 の間に素数は何個あるか。|50 到 100 之间有多少个质数？`, sol: [R`53, 59, 61, 67, 71, 73, 79, 83, 89, 97`, R`10`] } });

  // =============================== Modular arithmetic ===============================
  N('Modular arithmetic/Congruence', 'Congruences|Congruences|Congruencias|合同式|同余',
    { s: R`$a \equiv b \pmod m$ means $a$ and $b$ leave the same remainder when divided by $m$ — they sit at the same place on a clock with $m$ hours. Equivalently, $m$ divides $a - b$.|$a \equiv b \pmod m$ signifie que $a$ et $b$ ont le même reste dans la division par $m$ — ils sont au même endroit d’une horloge à $m$ heures. Autrement dit, $m$ divise $a - b$.|$a \equiv b \pmod m$ significa que $a$ y $b$ dejan el mismo resto al dividir entre $m$: están en el mismo lugar de un reloj de $m$ horas. Equivalentemente, $m$ divide a $a - b$.|$a \equiv b \pmod m$ は $m$ で割った余りが同じこと（$m$ 時間の時計で同じ位置）。$m \mid a - b$ と同値。|$a \equiv b \pmod m$ 表示 $a$、$b$ 除以 $m$ 余数相同——在 $m$ 小时的钟面上位置相同。等价于 $m \mid a - b$。`,
      a: [Y(R`a \equiv b \pmod m \iff m \mid a - b`, { s: 28 }), ...CLOCK(7, 3)] },
    { s: R`$38 \equiv 3 \pmod 7$ because $38 - 3 = 35 = 5\cdot 7$. On the 7-hour clock, 38 steps from 0 land on 3.|$38 \equiv 3 \pmod 7$ car $38 - 3 = 35 = 5\cdot 7$.|$38 \equiv 3 \pmod 7$ porque $38 - 3 = 35 = 5\cdot 7$.|$38 - 3 = 35$。|$38 - 3 = 35$。`,
      a: [Y(R`38 - 3 = 35 = 5\cdot 7 \Rightarrow 38 \equiv 3 \pmod 7`, { s: 24 }), ...CLOCK(7, 3)] },
    { a: [F(R`x \equiv 100 \pmod 9,\quad 0 \le x < 9`), ...CLOCK(9)],
      ex: { k: 'val', v: '1', q: R`Find $x$ with $0 \le x < 9$ and $x \equiv 100 \pmod 9$.|Trouvez $x$ avec $0 \le x < 9$ et $x \equiv 100 \pmod 9$.|Halla $x$ con $0 \le x < 9$ y $x \equiv 100 \pmod 9$.|$0 \le x < 9$ で $x \equiv 100 \pmod 9$ となる $x$ を求めよ。|求 $0 \le x < 9$ 且 $x \equiv 100 \pmod 9$ 的 $x$。`, sol: [R`100 = 11\cdot 9 + 1`, R`x = 1`] } });

  N('Modular arithmetic/Remainder', 'The remainder|Le reste|El resto|余り|余数',
    { s: R`The remainder is always between $0$ and $m - 1$, even for negative numbers: go down to the multiple of $m$ just below (that is the floor), then measure up. $-17 = 5\cdot(-4) + 3$, so $-17 \bmod 5 = 3$, not $-2$.|Le reste est toujours entre $0$ et $m - 1$, même pour un nombre négatif : on descend au multiple de $m$ juste en dessous (la partie entière), puis on mesure vers le haut. $-17 = 5\cdot(-4) + 3$ : le reste vaut 3, pas $-2$.|El resto siempre está entre $0$ y $m - 1$, incluso para negativos: baja al múltiplo de $m$ justo debajo (la parte entera) y mide hacia arriba. $-17 = 5\cdot(-4) + 3$: el resto es 3, no $-2$.|余りは負の数でも 0〜$m - 1$。すぐ下の $m$ の倍数（床関数）まで下がって上に測る。$-17 = 5\cdot(-4) + 3$ なので余りは 3（$-2$ ではない）。|余数总在 $0$ 到 $m - 1$ 之间，负数也一样：降到下方最近的 $m$ 的倍数（取整），再往上量。$-17 = 5\cdot(-4) + 3$，余数是 3，不是 $-2$。`,
      a: [Y(R`a \bmod m = a - m\left\lfloor\frac am\right\rfloor`, { s: 28 }), S2([-17.5, 0], 4.2), SG([-21.5, 0], [-13.5, 0], 'chalk'), ...SEQ([PT([-20, 0], '−20', 'b', { dy: 22 }), PT([-15, 0], '−15', 'b', { dy: 22 }), PT([-17, 0], '−17', 'y', { dy: -14 }), SG([-20, 0.25], [-17, 0.25], 'o', { w: 4 }), LB([-18.5, 0.75], '+3', 'o')], 200, 200)] },
    { s: R`$-17 \bmod 5$: $\left\lfloor -\tfrac{17}{5}\right\rfloor = -4$, so the remainder is $-17 + 20 = 3$.|$\left\lfloor -\tfrac{17}{5}\right\rfloor = -4$ : reste $-17 + 20 = 3$.|$\left\lfloor -\tfrac{17}{5}\right\rfloor = -4$: resto $-17 + 20 = 3$.|余り 3。|余数 3。`,
      a: [F(R`\left\lfloor -3.4\right\rfloor = -4`), Y(R`-17 - 5\cdot(-4) = 3`)] },
    { a: [F(R`-23 \bmod 6`)],
      ex: { k: 'val', v: '1', q: R`Find $-23 \bmod 6$ (a number from 0 to 5).|Calculez $-23 \bmod 6$ (un nombre entre 0 et 5).|Calcula $-23 \bmod 6$ (un número de 0 a 5).|$-23 \bmod 6$（0〜5）を求めよ。|求 $-23 \bmod 6$（0 到 5 之间）。`, sol: [R`-23 = 6\cdot(-4) + 1`, R`1`] } });

  N('Modular arithmetic/Operations', 'Calculating with congruences|Calculer avec des congruences|Operar con congruencias|合同式の計算|同余运算',
    { s: R`You may replace any number by a congruent one in sums, products and powers. So reduce early: find a small residue (or $\pm 1$) for the base, then the power is easy.|On peut remplacer tout nombre par un nombre congru dans les sommes, produits et puissances. On réduit donc tôt : on trouve un petit reste (ou $\pm 1$) pour la base, et la puissance devient facile.|Se puede sustituir cualquier número por uno congruente en sumas, productos y potencias. Reduce pronto: busca un resto pequeño (o $\pm 1$) para la base y la potencia sale fácil.|和・積・累乗では合同な数に置き換えてよい。早めに小さい余り（$\pm 1$ など）に直すと累乗が簡単。|在和、积、幂中可以把数换成同余的数。尽早化简：给底数找一个小余数（或 $\pm 1$），幂就容易了。`,
      a: [Y(R`a \equiv b,\ c \equiv d\ \Rightarrow\ a \pm c \equiv b \pm d,\ ac \equiv bd,\ a^k \equiv b^k`, { s: 20 })] },
    { s: R`$7^{100} \bmod 4$: $7 \equiv -1$, so $7^{100} \equiv (-1)^{100} = 1$. And $2^{10} \bmod 7$: $2^3 = 8 \equiv 1$, so $2^{10} = (2^3)^3\cdot 2 \equiv 2$.|$7^{100} \bmod 4$ : $7 \equiv -1$, donc $7^{100} \equiv 1$. $2^{10} \bmod 7$ : $2^3 \equiv 1$, donc $2^{10} \equiv 2$.|$7^{100} \bmod 4$: $7 \equiv -1$, así que $7^{100} \equiv 1$. $2^{10} \bmod 7$: $2^3 \equiv 1$, así que $2^{10} \equiv 2$.|$7^{100} \equiv 1$、$2^{10} \equiv 2$。|$7^{100} \equiv 1$，$2^{10} \equiv 2$。`,
      a: [F(R`7 \equiv -1 \pmod 4 \Rightarrow 7^{100} \equiv 1`), Y(R`2^3 \equiv 1 \pmod 7 \Rightarrow 2^{10} = (2^3)^3\cdot 2 \equiv 2`, { s: 22 })] },
    { a: [F(R`2^{50} \bmod 7`)],
      ex: { k: 'val', v: '4', q: R`Find $2^{50} \bmod 7$.|Calculez $2^{50} \bmod 7$.|Calcula $2^{50} \bmod 7$.|$2^{50} \bmod 7$ を求めよ。|求 $2^{50} \bmod 7$。`, sol: [R`2^3 \equiv 1,\quad 50 = 3\cdot 16 + 2`, R`2^{50} \equiv 2^2 = 4`] } });

  N('Modular arithmetic/Fermat’s little theorem', 'Fermat’s little theorem|Petit théorème de Fermat|Pequeño teorema de Fermat|フェルマーの小定理|费马小定理',
    { s: R`For a prime $p$ not dividing $a$, $a^{p-1} \equiv 1 \pmod p$. So powers mod $p$ repeat with period dividing $p - 1$: reduce the exponent mod $p - 1$ first.|Pour un premier $p$ qui ne divise pas $a$, $a^{p-1} \equiv 1 \pmod p$. Les puissances modulo $p$ se répètent avec une période qui divise $p - 1$ : on réduit d’abord l’exposant modulo $p - 1$.|Para un primo $p$ que no divide a $a$, $a^{p-1} \equiv 1 \pmod p$. Las potencias módulo $p$ se repiten con periodo divisor de $p - 1$: reduce primero el exponente módulo $p - 1$.|素数 $p$ が $a$ を割らなければ $a^{p-1} \equiv 1 \pmod p$。累乗は $p - 1$ の約数を周期として繰り返すので、まず指数を $p - 1$ で割った余りにする。|对不整除 $a$ 的质数 $p$，$a^{p-1} \equiv 1 \pmod p$。所以模 $p$ 的幂以 $p - 1$ 的因数为周期重复：先把指数模 $p - 1$。`,
      a: [Y(R`a^{p-1} \equiv 1 \pmod p\quad (p \nmid a)`, { s: 28 })] },
    { s: R`$3^{100} \bmod 7$: $3^6 \equiv 1$ and $100 = 6\cdot 16 + 4$, so $3^{100} \equiv 3^4 = 81 \equiv 4$.|$3^{100} \bmod 7$ : $3^6 \equiv 1$, $100 = 6\cdot 16 + 4$, donc $3^{100} \equiv 81 \equiv 4$.|$3^{100} \bmod 7$: $3^6 \equiv 1$, $100 = 6\cdot 16 + 4$, así que $3^{100} \equiv 81 \equiv 4$.|$3^{100} \equiv 4$。|$3^{100} \equiv 4$。`,
      a: [F(R`3^6 \equiv 1 \pmod 7,\quad 100 = 96 + 4`), Y(R`3^{100} \equiv 3^4 = 81 \equiv 4`)] },
    { a: [F(R`5^{38} \bmod 13`)],
      ex: { k: 'val', v: '12', q: R`Find $5^{38} \bmod 13$.|Calculez $5^{38} \bmod 13$.|Calcula $5^{38} \bmod 13$.|$5^{38} \bmod 13$ を求めよ。|求 $5^{38} \bmod 13$。`, sol: [R`5^{12} \equiv 1,\quad 38 = 36 + 2`, R`5^{38} \equiv 25 \equiv 12`] } });

  N('Modular arithmetic/Euler’s theorem', 'Euler’s theorem|Théorème d’Euler|Teorema de Euler|オイラーの定理|欧拉定理',
    { s: R`Fermat for any modulus: if $\gcd(a, m) = 1$ then $a^{\varphi(m)} \equiv 1 \pmod m$. With $m = 10$ ($\varphi = 4$) it explains why last digits of powers repeat every 4.|Fermat pour un module quelconque : si $\gcd(a, m) = 1$, alors $a^{\varphi(m)} \equiv 1 \pmod m$. Avec $m = 10$ ($\varphi = 4$), cela explique pourquoi les derniers chiffres des puissances se répètent tous les 4.|Fermat para cualquier módulo: si $\gcd(a, m) = 1$, entonces $a^{\varphi(m)} \equiv 1 \pmod m$. Con $m = 10$ ($\varphi = 4$) explica por qué las últimas cifras de las potencias se repiten cada 4.|任意の法でのフェルマー：$\gcd(a, m) = 1$ なら $a^{\varphi(m)} \equiv 1 \pmod m$。$m = 10$（$\varphi = 4$）で累乗の一の位が 4 ごとに繰り返す理由がわかる。|任意模数的费马定理：若 $\gcd(a, m) = 1$，则 $a^{\varphi(m)} \equiv 1 \pmod m$。取 $m = 10$（$\varphi = 4$）就解释了幂的个位为何每 4 次重复。`,
      a: [Y(R`a^{\varphi(m)} \equiv 1 \pmod m\quad (\gcd(a, m) = 1)`, { s: 26 })] },
    { s: R`$3^{2023} \bmod 10$: $\varphi(10) = 4$ and $2023 = 4\cdot 505 + 3$, so $3^{2023} \equiv 3^3 = 27 \equiv 7$.|$3^{2023} \bmod 10$ : $\varphi(10) = 4$, $2023 \equiv 3 \pmod 4$, donc $3^{2023} \equiv 7$.|$3^{2023} \bmod 10$: $\varphi(10) = 4$, $2023 \equiv 3 \pmod 4$, así que $3^{2023} \equiv 7$.|$3^{2023} \equiv 7$。|$3^{2023} \equiv 7$。`,
      a: [F(R`\varphi(10) = 4,\quad 2023 \equiv 3 \pmod 4`), Y(R`3^{2023} \equiv 3^3 = 27 \equiv 7`)] },
    { a: [F(R`7^{222} \bmod 10`)],
      ex: { k: 'val', v: '9', q: R`Find the last digit of $7^{222}$.|Trouvez le dernier chiffre de $7^{222}$.|Halla la última cifra de $7^{222}$.|$7^{222}$ の一の位を求めよ。|求 $7^{222}$ 的个位数字。`, sol: [R`222 \equiv 2 \pmod 4`, R`7^2 = 49 \Rightarrow 9`] } });

  N('Modular arithmetic/Wilson’s theorem', 'Wilson’s theorem|Théorème de Wilson|Teorema de Wilson|ウィルソンの定理|威尔逊定理',
    { s: R`For a prime $p$, every number $1, \dots, p - 1$ pairs up with its inverse mod $p$, except $1$ and $p - 1$, which are their own inverses. The pairs multiply to 1, leaving $1\cdot(p - 1) \equiv -1$. For composite $n > 4$, $(n - 1)! \equiv 0$.|Pour un premier $p$, chaque nombre $1, \dots, p - 1$ s’associe à son inverse modulo $p$, sauf $1$ et $p - 1$, qui sont leurs propres inverses. Les paires donnent 1, il reste $1\cdot(p - 1) \equiv -1$. Pour $n > 4$ composé, $(n - 1)! \equiv 0$.|Para un primo $p$, cada número $1, \dots, p - 1$ se empareja con su inverso módulo $p$, salvo $1$ y $p - 1$, que son sus propios inversos. Los pares dan 1 y queda $1\cdot(p - 1) \equiv -1$. Para $n > 4$ compuesto, $(n - 1)! \equiv 0$.|素数 $p$ では $1, \dots, p - 1$ が逆元と組になる（$1$ と $p - 1$ は自分自身が逆元）。組の積は 1 なので $1\cdot(p - 1) \equiv -1$ が残る。合成数 $n > 4$ なら $(n - 1)! \equiv 0$。|对质数 $p$，$1, \dots, p - 1$ 中每个数都与其模 $p$ 逆元配对，只有 $1$ 和 $p - 1$ 自逆。配对积为 1，剩下 $1\cdot(p - 1) \equiv -1$。合数 $n > 4$ 时 $(n - 1)! \equiv 0$。`,
      a: [Y(R`(p - 1)! \equiv -1 \pmod p`, { s: 30 })] },
    { s: R`$p = 7$: $6! = 720 = 7\cdot 103 - 1 \equiv -1$. The pairs are $2\cdot 4 = 8 \equiv 1$ and $3\cdot 5 = 15 \equiv 1$.|$p = 7$ : $6! = 720 \equiv -1$ ; paires $2\cdot 4 \equiv 1$, $3\cdot 5 \equiv 1$.|$p = 7$: $6! = 720 \equiv -1$; pares $2\cdot 4 \equiv 1$, $3\cdot 5 \equiv 1$.|$6! \equiv -1 \pmod 7$。|$6! \equiv -1 \pmod 7$。`,
      a: [F(R`6! = 1\cdot(2\cdot 4)(3\cdot 5)\cdot 6`), Y(R`\equiv 1\cdot 1\cdot 1\cdot 6 \equiv -1 \pmod 7`)] },
    { a: [F(R`10! \bmod 11`)],
      ex: { k: 'val', v: '10', q: R`Find $10! \bmod 11$.|Calculez $10! \bmod 11$.|Calcula $10! \bmod 11$.|$10! \bmod 11$ を求めよ。|求 $10! \bmod 11$。`, sol: [R`10! \equiv -1 \pmod{11}`, R`-1 \equiv 10`] } });

  N('Modular arithmetic/Last digits', 'Last digits|Derniers chiffres|Últimas cifras|下の桁|末位数字',
    { s: R`The last digit is the remainder mod 10 (the last two digits, mod 100). Powers cycle: list the last digits until one repeats, then reduce the exponent modulo the cycle length.|Le dernier chiffre est le reste modulo 10 (les deux derniers, modulo 100). Les puissances sont cycliques : on liste les derniers chiffres jusqu’à une répétition, puis on réduit l’exposant modulo la longueur du cycle.|La última cifra es el resto módulo 10 (las dos últimas, módulo 100). Las potencias son cíclicas: anota las últimas cifras hasta que se repita una y reduce el exponente módulo la longitud del ciclo.|一の位は 10 で割った余り（下 2 桁は 100）。累乗は周期的：一の位を並べて繰り返しを見つけ、指数を周期で割った余りにする。|个位是模 10 的余数（末两位是模 100）。幂是循环的：列出个位直到重复，再把指数对循环长度取模。`,
      a: [Y(R`\text{last digit} = n \bmod 10`, { s: 28 }), F(R`2^n:\ 2,\ 4,\ 8,\ 6,\ 2,\ 4, \dots`)] },
    { s: R`$2^{2023}$: the cycle 2, 4, 8, 6 has length 4 and $2023 \equiv 3 \pmod 4$, so the last digit is the third one: 8.|$2^{2023}$ : cycle 2, 4, 8, 6 de longueur 4, $2023 \equiv 3$ : dernier chiffre 8.|$2^{2023}$: ciclo 2, 4, 8, 6 de longitud 4, $2023 \equiv 3$: última cifra 8.|一の位 8。|个位 8。`,
      a: [Y(R`2023 \equiv 3 \pmod 4 \Rightarrow 8`)] },
    { a: [F(R`3^{2026}`)],
      ex: { k: 'val', v: '9', q: R`Find the last digit of $3^{2026}$.|Trouvez le dernier chiffre de $3^{2026}$.|Halla la última cifra de $3^{2026}$.|$3^{2026}$ の一の位を求めよ。|求 $3^{2026}$ 的个位数字。`, sol: [R`3, 9, 7, 1, \dots\ (\text{length } 4)`, R`2026 \equiv 2 \pmod 4 \Rightarrow 9`] } });

  N('Modular arithmetic/Chinese remainder theorem', 'The Chinese remainder theorem|Théorème des restes chinois|Teorema chino del resto|中国剰余定理|中国剩余定理',
    { s: R`If the moduli are coprime, any pair of remainders happens for exactly one number mod $mn$. To find it, list the numbers with the first remainder ($a, a + m, a + 2m, \dots$) and stop at the one with the second.|Si les modules sont premiers entre eux, tout couple de restes est atteint par exactement un nombre modulo $mn$. Pour le trouver, on liste les nombres de premier reste ($a, a + m, a + 2m, \dots$) jusqu’à celui qui a le second.|Si los módulos son coprimos, cada par de restos lo cumple exactamente un número módulo $mn$. Para hallarlo, lista los números con el primer resto ($a, a + m, a + 2m, \dots$) hasta el que tenga el segundo.|法が互いに素なら、余りの組は $mn$ を法としてただ一つの数で実現される。最初の余りをもつ数 $a, a + m, \dots$ を並べ、2 つ目の余りをもつものを探す。|模数互素时，任意一对余数恰对应模 $mn$ 的一个数。求法：列出满足第一个余数的数（$a, a + m, a + 2m, \dots$），找到满足第二个的为止。`,
      a: [Y(R`x \equiv a \pmod m,\ x \equiv b \pmod n\ \Rightarrow\ \text{one } x \bmod mn`, { s: 22 })] },
    { s: R`$x \equiv 2 \pmod 3$, $x \equiv 3 \pmod 5$: numbers $\equiv 3 \pmod 5$ are 3, 8, 13, …; $8 \equiv 2 \pmod 3$. So $x \equiv 8 \pmod{15}$.|$x \equiv 2 \pmod 3$, $x \equiv 3 \pmod 5$ : 3, 8, 13, … ; $8 \equiv 2 \pmod 3$. Donc $x \equiv 8 \pmod{15}$.|$x \equiv 2 \pmod 3$, $x \equiv 3 \pmod 5$: 3, 8, 13…; $8 \equiv 2 \pmod 3$. Así $x \equiv 8 \pmod{15}$.|$x \equiv 8 \pmod{15}$。|$x \equiv 8 \pmod{15}$。`,
      a: [F(R`3,\ 8,\ 13, \dots`), Y(R`8 \equiv 2 \pmod 3 \Rightarrow x \equiv 8 \pmod{15}`)] },
    { a: [F(R`x \equiv 1 \pmod 4,\quad x \equiv 2 \pmod 5`)],
      ex: { k: 'val', v: '17', q: R`Find the smallest positive $x$ with $x \equiv 1 \pmod 4$ and $x \equiv 2 \pmod 5$.|Trouvez le plus petit $x > 0$ avec $x \equiv 1 \pmod 4$ et $x \equiv 2 \pmod 5$.|Halla el menor $x > 0$ con $x \equiv 1 \pmod 4$ y $x \equiv 2 \pmod 5$.|$x \equiv 1 \pmod 4$, $x \equiv 2 \pmod 5$ を満たす最小の正の $x$ を求めよ。|求满足 $x \equiv 1 \pmod 4$、$x \equiv 2 \pmod 5$ 的最小正整数 $x$。`, sol: [R`2,\ 7,\ 12,\ 17, \dots`, R`17 \equiv 1 \pmod 4 \Rightarrow x = 17`] } });

  // =============================== Handy facts ===============================
  N('Handy facts/Squares', 'Squares modulo small numbers|Carrés modulo de petits nombres|Cuadrados módulo números pequeños|小さい数を法とした平方数|平方数的同余性质',
    { s: R`Check all residues: mod 4, $0^2, 1^2, 2^2, 3^2$ give 0, 1, 0, 1. So a square is never $\equiv 2$ or $3 \pmod 4$ — a quick way to show a number is not a square, or that an equation has no integer solution.|On teste tous les restes : modulo 4, $0^2, 1^2, 2^2, 3^2$ donnent 0, 1, 0, 1. Un carré n’est donc jamais $\equiv 2$ ou $3 \pmod 4$ — un moyen rapide de montrer qu’un nombre n’est pas un carré ou qu’une équation n’a pas de solution entière.|Prueba todos los restos: módulo 4, $0^2, 1^2, 2^2, 3^2$ dan 0, 1, 0, 1. Un cuadrado nunca es $\equiv 2$ o $3 \pmod 4$: así se ve rápido que un número no es cuadrado o que una ecuación no tiene solución entera.|すべての余りを調べる：4 を法として $0^2, 1^2, 2^2, 3^2$ は 0, 1, 0, 1。平方数は 4 で割って 2, 3 余らない。平方数でないことや整数解がないことをすぐ示せる。|检查所有余数：模 4 时 $0^2, 1^2, 2^2, 3^2$ 得 0, 1, 0, 1。所以平方数模 4 不会余 2 或 3——快速判断非平方数或方程无整数解。`,
      a: [Y(R`n^2 \bmod 4 \in \{0, 1\},\quad n^2 \bmod 3 \in \{0, 1\},\quad n^2 \bmod 8 \in \{0, 1, 4\}`, { s: 20 })] },
    { s: R`$1\,000\,003 \equiv 3 \pmod 4$, so it is not a perfect square. And $x^2 + y^2 = 4k + 3$ has no solutions: a sum of two squares is 0, 1 or 2 mod 4.|$1\,000\,003 \equiv 3 \pmod 4$ : ce n’est pas un carré. Et $x^2 + y^2 = 4k + 3$ n’a pas de solution.|$1\,000\,003 \equiv 3 \pmod 4$: no es un cuadrado. Y $x^2 + y^2 = 4k + 3$ no tiene solución.|$1\,000\,003$ は平方数でない。|$1\,000\,003$ 不是平方数。`,
      a: [Y(R`1\,000\,003 \equiv 3 \pmod 4\ \Rightarrow\ \text{not a square}`, { s: 24 })] },
    { a: [F(R`n\ \text{odd}:\ n^2 \bmod 8`)],
      ex: { k: 'val', v: '1', q: R`What is $n^2 \bmod 8$ for every odd $n$?|Que vaut $n^2 \bmod 8$ pour tout $n$ impair ?|¿Cuánto vale $n^2 \bmod 8$ para todo $n$ impar?|奇数 $n$ について $n^2 \bmod 8$ は？|对每个奇数 $n$，$n^2 \bmod 8$ 是多少？`, sol: [R`n = 2k + 1:\ n^2 = 4k(k + 1) + 1`, R`k(k + 1)\ \text{even} \Rightarrow 1`] } });

  N('Handy facts/Consecutive integers', 'Products of consecutive integers|Produits d’entiers consécutifs|Productos de enteros consecutivos|連続する整数の積|连续整数之积',
    { s: R`Among $k$ consecutive integers one is a multiple of $k$, one of $k - 1$, and so on — and in fact their product divided by $k!$ is a binomial coefficient, an integer. So 2 consecutive → divisible by 2, 3 → by 6, 4 → by 24.|Parmi $k$ entiers consécutifs, l’un est multiple de $k$, un autre de $k - 1$, etc. — et leur produit divisé par $k!$ est un coefficient binomial, donc entier. 2 consécutifs → divisible par 2, 3 → par 6, 4 → par 24.|Entre $k$ enteros consecutivos hay un múltiplo de $k$, otro de $k - 1$, etc.; de hecho su producto entre $k!$ es un número combinatorio, entero. 2 consecutivos → divisible entre 2, 3 → entre 6, 4 → entre 24.|$k$ 個の連続整数には $k$ の倍数、$k - 1$ の倍数…が含まれ、積 ÷ $k!$ は二項係数で整数。2 個なら 2、3 個なら 6、4 個なら 24 で割り切れる。|$k$ 个连续整数中有 $k$ 的倍数、$k - 1$ 的倍数……事实上其积除以 $k!$ 是组合数，为整数。2 个连续数被 2 整除，3 个被 6，4 个被 24。`,
      a: [Y(R`k! \mid n(n + 1)\cdots(n + k - 1)`, { s: 28 })] },
    { s: R`$n^3 - n = (n - 1)n(n + 1)$ is a product of 3 consecutive integers, so it is always divisible by 6 (e.g. $5^3 - 5 = 120$).|$n^3 - n = (n - 1)n(n + 1)$ : toujours divisible par 6 (ex. $5^3 - 5 = 120$).|$n^3 - n = (n - 1)n(n + 1)$: siempre divisible entre 6 (p. ej. $5^3 - 5 = 120$).|$n^3 - n$ は常に 6 の倍数。|$n^3 - n$ 总被 6 整除。`,
      a: [Y(R`n^3 - n = (n - 1)n(n + 1) \Rightarrow 6 \mid n^3 - n`)] },
    { a: [F(R`n(n + 1)(n + 2)(n + 3)`)],
      ex: { k: 'val', v: '24', q: R`What is the largest integer that divides $n(n + 1)(n + 2)(n + 3)$ for every $n$?|Quel est le plus grand entier qui divise $n(n + 1)(n + 2)(n + 3)$ pour tout $n$ ?|¿Cuál es el mayor entero que divide a $n(n + 1)(n + 2)(n + 3)$ para todo $n$?|すべての $n$ で $n(n + 1)(n + 2)(n + 3)$ を割り切る最大の整数は？|对所有 $n$ 都整除 $n(n + 1)(n + 2)(n + 3)$ 的最大整数是多少？`, sol: [R`4! = 24\ \text{always divides}`, R`n = 1:\ 1\cdot 2\cdot 3\cdot 4 = 24 \Rightarrow 24`] } });

  N('Handy facts/Digit sum', 'Digit sums and remainders mod 9|Somme des chiffres et reste modulo 9|Suma de cifras y resto módulo 9|各位の和と 9 での余り|数字和与模 9 余数',
    { s: R`Because $10 \equiv 1 \pmod 9$, a number and the sum of its digits have the same remainder mod 9 (“casting out nines”). It is also a quick check of multiplications: the digit sums must multiply consistently.|Comme $10 \equiv 1 \pmod 9$, un nombre et la somme de ses chiffres ont le même reste modulo 9 (« preuve par 9 »). C’est aussi un contrôle rapide des multiplications.|Como $10 \equiv 1 \pmod 9$, un número y la suma de sus cifras tienen el mismo resto módulo 9 («prueba del nueve»). También sirve para comprobar multiplicaciones.|$10 \equiv 1 \pmod 9$ なので数と各位の和は 9 で割った余りが同じ（九去法）。掛け算の検算にも使える。|因 $10 \equiv 1 \pmod 9$，一个数与其数字和模 9 同余（“弃九法”）。也可快速验算乘法。`,
      a: [Y(R`n \equiv S(n) \pmod 9`, { s: 30 })] },
    { s: R`$7341$: $7 + 3 + 4 + 1 = 15$, $1 + 5 = 6$, so $7341 \equiv 6 \pmod 9$. Check: $7341 = 9\cdot 815 + 6$.|$7341$ : $15$, puis $6$ : $7341 \equiv 6 \pmod 9$.|$7341$: $15$ y luego $6$: $7341 \equiv 6 \pmod 9$.|$7341 \equiv 6$。|$7341 \equiv 6$。`,
      a: [Y(R`7 + 3 + 4 + 1 = 15 \to 6`)] },
    { a: [F(R`987\,654`)],
      ex: { k: 'val', v: '3', q: R`Find the remainder of $987\,654$ when divided by 9.|Trouvez le reste de la division de $987\,654$ par 9.|Halla el resto de dividir $987\,654$ entre 9.|$987\,654$ を 9 で割った余りを求めよ。|求 $987\,654$ 除以 9 的余数。`, sol: [R`9 + 8 + 7 + 6 + 5 + 4 = 39`, R`3 + 9 = 12 \to 3`] } });

  N('Handy facts/Zeros at the end of n!', 'Trailing zeros of n!|Zéros à la fin de n!|Ceros finales de n!|n! の末尾の 0|n! 末尾的零',
    { s: R`Each trailing zero needs a factor $10 = 2\cdot 5$. Twos are plentiful, so count the fives: one for every multiple of 5, one more for every multiple of 25, another for every multiple of 125…|Chaque zéro final demande un facteur $10 = 2\cdot 5$. Les 2 abondent : on compte les 5 — un par multiple de 5, un de plus par multiple de 25, encore un par multiple de 125…|Cada cero final necesita un factor $10 = 2\cdot 5$. Los 2 sobran, así que cuenta los 5: uno por cada múltiplo de 5, otro más por cada múltiplo de 25, otro por cada múltiplo de 125…|末尾の 0 は因数 $10 = 2\cdot 5$ ごとに 1 つ。2 は十分あるので 5 を数える：5 の倍数で 1、25 の倍数でもう 1、125 の倍数でさらに 1…|每个末尾零需要因子 $10 = 2\cdot 5$。2 很多，只数 5：每个 5 的倍数一个，每个 25 的倍数再一个，每个 125 的倍数又一个……`,
      a: [Y(R`\left\lfloor\frac n5\right\rfloor + \left\lfloor\frac n{25}\right\rfloor + \left\lfloor\frac n{125}\right\rfloor + \cdots`, { s: 24 })] },
    { s: R`$100!$: $20 + 4 = 24$ zeros (25, 50, 75 and 100 contribute two fives each).|$100!$ : $20 + 4 = 24$ zéros.|$100!$: $20 + 4 = 24$ ceros.|24 個。|24 个。`,
      a: [Y(R`\left\lfloor\frac{100}{5}\right\rfloor + \left\lfloor\frac{100}{25}\right\rfloor = 20 + 4 = 24`)] },
    { a: [F(R`250!`)],
      ex: { k: 'val', v: '62', q: R`How many zeros does $250!$ end with?|Par combien de zéros se termine $250!$ ?|¿En cuántos ceros termina $250!$?|$250!$ の末尾に 0 は何個並ぶか。|$250!$ 末尾有几个零？`, sol: [R`50 + 10 + 2`, R`= 62`] } });

  N('Handy facts/Legendre’s formula', 'Legendre’s formula|Formule de Legendre|Fórmula de Legendre|ルジャンドルの公式|勒让德公式',
    { s: R`The exponent of a prime $p$ in $n!$: the multiples of $p$ up to $n$ each give one factor $p$, the multiples of $p^2$ give one more, and so on. Stop when $p^k > n$.|L’exposant d’un premier $p$ dans $n!$ : les multiples de $p$ jusqu’à $n$ donnent chacun un facteur $p$, les multiples de $p^2$ un de plus, etc. On s’arrête quand $p^k > n$.|El exponente de un primo $p$ en $n!$: los múltiplos de $p$ hasta $n$ dan un factor $p$ cada uno, los de $p^2$ uno más, etc. Para cuando $p^k > n$.|$n!$ の素数 $p$ の指数：$n$ までの $p$ の倍数で 1 つずつ、$p^2$ の倍数でさらに 1 つ…。$p^k > n$ で止める。|$n!$ 中质数 $p$ 的指数：$n$ 以内每个 $p$ 的倍数贡献一个，$p^2$ 的倍数再贡献一个……直到 $p^k > n$。`,
      a: [Y(R`v_p(n!) = \sum_{k \ge 1}\left\lfloor\frac{n}{p^k}\right\rfloor`, { s: 28 })] },
    { s: R`$v_2(10!) = 5 + 2 + 1 = 8$, so $2^8$ is the largest power of 2 dividing $10! = 3\,628\,800$.|$v_2(10!) = 5 + 2 + 1 = 8$ : $2^8$ est la plus grande puissance de 2 divisant $10!$.|$v_2(10!) = 5 + 2 + 1 = 8$: $2^8$ es la mayor potencia de 2 que divide a $10!$.|$v_2(10!) = 8$。|$v_2(10!) = 8$。`,
      a: [Y(R`v_2(10!) = \left\lfloor\tfrac{10}{2}\right\rfloor + \left\lfloor\tfrac{10}{4}\right\rfloor + \left\lfloor\tfrac{10}{8}\right\rfloor = 5 + 2 + 1 = 8`, { s: 22 })] },
    { a: [F(R`v_3(30!)`)],
      ex: { k: 'val', v: '14', q: R`Find the exponent of 3 in $30!$.|Trouvez l’exposant de 3 dans $30!$.|Halla el exponente de 3 en $30!$.|$30!$ の素因数分解における 3 の指数を求めよ。|求 $30!$ 中 3 的指数。`, sol: [R`10 + 3 + 1`, R`= 14`] } });

  Cheats.tutor('number', L);
})();
