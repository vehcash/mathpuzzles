/* cheat sheet · number theory — text is 'en|fr|es|ja|zh'; a table cell starting with ~ is text */
(function () {
  const R = String.raw;
  Cheats.topic({
    id: 'number', icon: '#', color: '#3d5a9e', bg: '#e5eaf7', cat: 'number',
    name: 'Number theory|Théorie des nombres|Teoría de números|整数論|数论',
    blurb: 'Divisibility, gcd and lcm, primes and divisors, modular arithmetic and handy facts.|Divisibilité, PGCD et PPCM, nombres premiers et diviseurs, congruences et faits utiles.|Divisibilidad, mcd y mcm, primos y divisores, congruencias y resultados útiles.|約数と倍数、最大公約数・最小公倍数、素数、合同式、便利な事実。|整除、最大公约数与最小公倍数、素数与约数、同余及常用结论。',
    sections: [
      { t: 'Divisibility rules|Critères de divisibilité|Criterios de divisibilidad|倍数の判定法|整除判别法', items: [
        { tbl: [
          ['d', '~n is divisible by d when…|n est divisible par d si…|n es divisible entre d si…|n が d で割り切れる条件|n 能被 d 整除的条件'],
          ['2,\\ 5,\\ 10', '~its last digit is|son dernier chiffre l’est|su última cifra lo es|一の位が割り切れる|个位能被整除'],
          ['4', '~its last two digits are|ses deux derniers chiffres le sont|sus dos últimas cifras lo son|下2桁が割り切れる|末两位能被整除'],
          ['8', '~its last three digits are|ses trois derniers chiffres le sont|sus tres últimas cifras lo son|下3桁が割り切れる|末三位能被整除'],
          ['3,\\ 9', '~its digit sum is|la somme de ses chiffres l’est|la suma de sus cifras lo es|各位の数の和が割り切れる|各位数字之和能被整除'],
          ['6', '~it is divisible by 2 and by 3|il l’est par 2 et par 3|lo es entre 2 y entre 3|2 と 3 で割り切れる|能被 2 和 3 整除'],
          ['11', '~the alternating digit sum is|la somme alternée de ses chiffres l’est|la suma alternada de sus cifras lo es|各位の数を交互に足し引きした値が割り切れる|奇偶位数字和之差能被整除']
        ], k: 'divisibility rules digits divisibilité divisibilidad 倍数 判定 整除' },
        ['Linear combinations|Combinaisons linéaires|Combinaciones lineales|1次結合|线性组合', R`d \mid a,\ d \mid b \ \Rightarrow\ d \mid ax + by`]
      ] },
      { t: 'gcd and lcm|PGCD et PPCM|mcd y mcm|最大公約数と最小公倍数|最大公约数与最小公倍数', items: [
        ['Product|Produit|Producto|積の関係|乘积关系', R`\gcd(a, b)\cdot\operatorname{lcm}(a, b) = ab`],
        ['Euclid’s algorithm|Algorithme d’Euclide|Algoritmo de Euclides|ユークリッドの互除法|辗转相除法', R`\gcd(a, b) = \gcd(b,\ a \bmod b), \qquad \gcd(a, 0) = a`],
        ['Bézout’s identity|Identité de Bézout|Identidad de Bézout|ベズーの等式|裴蜀定理', R`\exists\,x, y \in \mathbb Z:\ ax + by = \gcd(a, b)`],
        ['From prime factorisations|À partir des décompositions|A partir de las factorizaciones|素因数分解から|由质因数分解', R`\gcd = \prod p^{\min(\alpha, \beta)}, \qquad \operatorname{lcm} = \prod p^{\max(\alpha, \beta)}`],
        ['Coprime|Premiers entre eux|Coprimos|互いに素|互质', R`\gcd(a, b) = 1, \quad a \mid bc \ \Rightarrow\ a \mid c`, 'Gauss’s lemma.|Lemme de Gauss.|Lema de Gauss.|ガウスの補題。|高斯引理。']
      ] },
      { t: 'Primes and divisors|Nombres premiers et diviseurs|Primos y divisores|素数と約数|素数与约数', items: [
        ['Prime factorisation|Décomposition en facteurs premiers|Descomposición en factores primos|素因数分解|质因数分解', R`n = p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_k^{\alpha_k}`, 'Unique up to order (fundamental theorem of arithmetic).|Unique à l’ordre près (théorème fondamental de l’arithmétique).|Única salvo el orden (teorema fundamental de la aritmética).|順序を除いて一意（算術の基本定理）。|除顺序外唯一（算术基本定理）。'],
        ['Number of divisors|Nombre de diviseurs|Número de divisores|約数の個数|约数个数', R`\tau(n) = (\alpha_1 + 1)(\alpha_2 + 1)\cdots(\alpha_k + 1)`],
        ['Sum of divisors|Somme des diviseurs|Suma de divisores|約数の和|约数和', R`\sigma(n) = \prod_i\frac{p_i^{\alpha_i + 1} - 1}{p_i - 1}`],
        ['Euler’s totient|Indicatrice d’Euler|Función φ de Euler|オイラー関数|欧拉函数', R`\varphi(n) = n\prod_{p \mid n}\left(1 - \frac1p\right)`, R`How many of $1, \dots, n$ are coprime to $n$; $\varphi(p) = p - 1$.|Combien de $1, \dots, n$ sont premiers avec $n$ ; $\varphi(p) = p - 1$.|Cuántos de $1, \dots, n$ son coprimos con $n$; $\varphi(p) = p - 1$.|$1, \dots, n$ のうち $n$ と互いに素な数の個数。$\varphi(p) = p - 1$。|$1, \dots, n$ 中与 $n$ 互质的个数；$\varphi(p) = p - 1$。`],
        ['Primality test|Test de primalité|Test de primalidad|素数判定|素数判定', R`n \in \mathbb P \iff \nexists\,p \le \sqrt n:\ p \mid n`, R`Only primes up to $\sqrt n$ need to be tried.|Il suffit d’essayer les premiers jusqu’à $\sqrt n$.|Basta probar los primos hasta $\sqrt n$.|$\sqrt n$ 以下の素数だけ調べれば十分。|只需试除不超过 $\sqrt n$ 的素数。`],
        ['Primes below 100|Premiers inférieurs à 100|Primos menores que 100|100 未満の素数|100 以内的素数', R`2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, \dots, 97`, '25 primes in all.|25 nombres premiers en tout.|25 primos en total.|全部で 25 個。|共 25 个。']
      ] },
      { t: 'Modular arithmetic|Congruences|Aritmética modular|合同式|同余', items: [
        ['Congruence|Congruence|Congruencia|合同|同余', R`a \equiv b \pmod m \iff m \mid a - b`],
        ['Remainder|Reste|Resto|余り|余数', R`a \bmod m = a - m\left\lfloor\frac am\right\rfloor`],
        ['Operations|Opérations|Operaciones|演算|运算', R`a \equiv b,\ c \equiv d \ \Rightarrow\ a \pm c \equiv b \pm d,\ \ ac \equiv bd,\ \ a^k \equiv b^k`],
        ['Fermat’s little theorem|Petit théorème de Fermat|Pequeño teorema de Fermat|フェルマーの小定理|费马小定理', R`a^{p-1} \equiv 1 \pmod p \qquad (p \nmid a)`],
        ['Euler’s theorem|Théorème d’Euler|Teorema de Euler|オイラーの定理|欧拉定理', R`a^{\varphi(m)} \equiv 1 \pmod m \qquad (\gcd(a, m) = 1)`],
        ['Wilson’s theorem|Théorème de Wilson|Teorema de Wilson|ウィルソンの定理|威尔逊定理', R`(p - 1)! \equiv -1 \pmod p`],
        ['Last digits|Derniers chiffres|Últimas cifras|下の桁|末位数字', R`n \bmod 10`, R`Powers mod 10 repeat: $7^1, 7^2, 7^3, 7^4 \equiv 7, 9, 3, 1$.|Les puissances modulo 10 se répètent : $7^1, 7^2, 7^3, 7^4 \equiv 7, 9, 3, 1$.|Las potencias módulo 10 se repiten: $7^1, 7^2, 7^3, 7^4 \equiv 7, 9, 3, 1$.|10 を法とする累乗は周期的：$7^1, 7^2, 7^3, 7^4 \equiv 7, 9, 3, 1$。|模 10 的幂循环：$7^1, 7^2, 7^3, 7^4 \equiv 7, 9, 3, 1$。`],
        ['Chinese remainder theorem|Théorème chinois|Teorema chino del resto|中国剰余定理|中国剩余定理', R`x \equiv a \pmod m,\ \ x \equiv b \pmod n,\ \ \gcd(m, n) = 1`, R`Has exactly one solution modulo $mn$.|A une unique solution modulo $mn$.|Tiene exactamente una solución módulo $mn$.|$mn$ を法としてただ1つの解をもつ。|模 $mn$ 有唯一解。`]
      ] },
      { t: 'Handy facts|Faits utiles|Datos útiles|便利な事実|常用结论', items: [
        ['Squares|Carrés|Cuadrados|平方数|平方数', R`n^2 \bmod 4 \in \{0, 1\}, \qquad n^2 \bmod 3 \in \{0, 1\}, \qquad n^2 \bmod 8 \in \{0, 1, 4\}`],
        ['Consecutive integers|Entiers consécutifs|Enteros consecutivos|連続する整数|连续整数', R`k! \mid n(n + 1)\cdots(n + k - 1)`, R`E.g. $n(n + 1)$ is even and $n(n + 1)(n + 2)$ is a multiple of $6$.|Ex. $n(n + 1)$ est pair et $n(n + 1)(n + 2)$ est multiple de $6$.|P. ej. $n(n + 1)$ es par y $n(n + 1)(n + 2)$ es múltiplo de $6$.|例：$n(n + 1)$ は偶数、$n(n + 1)(n + 2)$ は $6$ の倍数。|如 $n(n + 1)$ 为偶数，$n(n + 1)(n + 2)$ 是 $6$ 的倍数。`],
        ['Digit sum|Somme des chiffres|Suma de cifras|各位の和|数字和', R`n \equiv S(n) \pmod 9`],
        ['Zeros at the end of n!|Zéros à la fin de n!|Ceros al final de n!|n! の末尾の 0 の個数|n! 末尾零的个数', R`\left\lfloor\frac n5\right\rfloor + \left\lfloor\frac n{25}\right\rfloor + \left\lfloor\frac n{125}\right\rfloor + \cdots`],
        ['Legendre’s formula|Formule de Legendre|Fórmula de Legendre|ルジャンドルの公式|勒让德公式', R`v_p(n!) = \sum_{k \ge 1}\left\lfloor\frac{n}{p^k}\right\rfloor`, 'The exponent of the prime p in n!.|L’exposant du nombre premier p dans n!.|El exponente del primo p en n!.|n! に含まれる素数 p の指数。|n! 中素数 p 的幂次。']
      ] }
    ]
  });
})();
