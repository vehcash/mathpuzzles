/* cheat sheet · combinatorics — text is 'en|fr|es|ja|zh' */
(function () {
  const R = String.raw;
  Cheats.topic({
    id: 'combinatorics', icon: '⁂', color: '#6d6a1e', bg: '#f1f0d8', cat: 'combinatorics',
    name: 'Combinatorics|Combinatoire|Combinatoria|組合せ|组合计数',
    blurb: 'Counting principles, arrangements, selections, inclusion–exclusion and the pigeonhole principle.|Principes de dénombrement, arrangements, combinaisons, inclusion–exclusion et principe des tiroirs.|Principios de conteo, ordenaciones, combinaciones, inclusión–exclusión y principio del palomar.|数え上げの原理、順列、組合せ、包除原理、鳩の巣原理。|计数原理、排列、组合、容斥原理与抽屉原理。',
    sections: [
      { t: 'Counting principles|Principes de dénombrement|Principios de conteo|数え上げの原理|计数原理', items: [
        ['Product rule|Principe multiplicatif|Regla del producto|積の法則|乘法原理', R`|A \times B| = |A|\cdot|B|`, 'Choices made one after another multiply.|Des choix successifs se multiplient.|Elecciones sucesivas se multiplican.|続けて選ぶときは掛け算。|分步完成用乘法。'],
        ['Sum rule|Principe additif|Regla de la suma|和の法則|加法原理', R`|A \cup B| = |A| + |B| \qquad (A \cap B = \varnothing)`, 'Separate cases add.|Des cas disjoints s’additionnent.|Casos disjuntos se suman.|場合分けは足し算。|分类完成用加法。'],
        ['Complement|Complémentaire|Complemento|余事象で数える|补集计数', R`|\bar A| = |\Omega| - |A|`, 'Count what you do not want and subtract.|Compter ce qu’on ne veut pas et le retrancher.|Contar lo que no se quiere y restarlo.|条件を満たさないものを数えて引きます。|数出不要的再减去。'],
        ['Restricted position first|Position contrainte d’abord|Primero la posición restringida|制限のある場所から|先排有限制的位置', R`3\cdot5\cdot4\cdot3 = 180`, 'Example: even 4-digit numbers with distinct digits from 1–6 — choose the last digit first.|Exemple : nombres pairs à 4 chiffres distincts pris dans 1–6 — choisir d’abord le dernier chiffre.|Ejemplo: números pares de 4 cifras distintas de 1–6 — elegir primero la última cifra.|例：1〜6 の異なる数字でできる4桁の偶数 — 一の位を先に選ぶ。|例：用 1–6 组成各位不同的四位偶数——先选个位。']
      ] },
      { t: 'Arrangements|Arrangements et permutations|Ordenaciones|順列|排列', items: [
        ['Permutations|Permutations|Permutaciones|順列|全排列', R`n! = n(n - 1)\cdots2\cdot1, \qquad 0! = 1`],
        ['k out of n, in order|k parmi n, avec ordre|k de n, con orden|n 個から k 個を並べる|从 n 个中取 k 个排列', R`P(n, k) = \frac{n!}{(n - k)!}`],
        ['With repetition|Avec répétition|Con repetición|重複順列|可重复排列', R`n^k`],
        ['Repeated letters|Lettres répétées|Letras repetidas|同じものを含む順列|有重复元素的排列', R`\frac{n!}{n_1!\,n_2!\cdots n_r!}`, R`BANANA: $\frac{6!}{3!\,2!} = 60$.|BANANA : $\frac{6!}{3!\,2!} = 60$.|BANANA: $\frac{6!}{3!\,2!} = 60$.|BANANA：$\frac{6!}{3!\,2!} = 60$。|BANANA：$\frac{6!}{3!\,2!} = 60$。`],
        ['Round table|Table ronde|Mesa redonda|円順列|环形排列', R`(n - 1)!`, R`Bracelets that can be flipped: $\frac{(n - 1)!}{2}$.|Bracelets retournables : $\frac{(n - 1)!}{2}$.|Pulseras que se pueden voltear: $\frac{(n - 1)!}{2}$.|裏返せる数珠順列：$\frac{(n - 1)!}{2}$。|可翻转的项链：$\frac{(n - 1)!}{2}$。`]
      ] },
      { t: 'Selections|Combinaisons|Combinaciones|組合せ|组合', fig: 'pascal', items: [
        ['Binomial coefficient|Coefficient binomial|Coeficiente binomial|二項係数|组合数', R`\binom nk = \frac{n!}{k!\,(n - k)!}`],
        ['Symmetry|Symétrie|Simetría|対称性|对称性', R`\binom nk = \binom n{n - k}`],
        ['Pascal’s rule|Formule de Pascal|Regla de Pascal|パスカルの法則|杨辉三角递推', R`\binom nk = \binom{n - 1}{k - 1} + \binom{n - 1}{k}`],
        ['Sums|Sommes|Sumas|和|求和', R`\sum_{k=0}^n\binom nk = 2^n, \qquad \sum_k\binom mk\binom n{r - k} = \binom{m + n}{r}`, 'The second is Vandermonde’s identity.|La seconde est l’identité de Vandermonde.|La segunda es la identidad de Vandermonde.|2つ目はヴァンデルモンドの恒等式。|第二个是范德蒙德恒等式。'],
        ['Committee with a chair|Comité avec président|Comité con presidente|委員長付きの委員会|带主席的委员会', R`k\binom nk = n\binom{n - 1}{k - 1}`],
        ['With repetition|Avec répétition|Con repetición|重複組合せ|可重复组合', R`\binom{n + k - 1}{k}`]
      ] },
      { t: 'Distributions and paths|Répartitions et chemins|Repartos y caminos|分配と経路|分配与路径', items: [
        ['Stars and bars|Étoiles et barres|Estrellas y barras|玉と仕切り|隔板法', R`x_1 + \dots + x_k = n,\ x_i \ge 0:\quad \binom{n + k - 1}{k - 1}`],
        ['Positive solutions|Solutions strictement positives|Soluciones positivas|正の整数解|正整数解', R`x_i \ge 1:\quad \binom{n - 1}{k - 1}`],
        ['Lattice paths|Chemins sur un quadrillage|Caminos en una cuadrícula|格子の最短経路|格点路径', R`(0, 0) \to (m, n):\quad \binom{m + n}{m}`],
        ['Catalan numbers|Nombres de Catalan|Números de Catalan|カタラン数|卡特兰数', R`C_n = \frac{1}{n + 1}\binom{2n}{n}: \ 1, 1, 2, 5, 14, 42, \dots`],
        ['Handshakes and diagonals|Poignées de main et diagonales|Apretones y diagonales|握手と対角線|握手与对角线', R`\binom n2 = \frac{n(n - 1)}{2}, \qquad \binom n2 - n = \frac{n(n - 3)}{2}`]
      ] },
      { t: 'Inclusion–exclusion|Inclusion–exclusion|Inclusión–exclusión|包除原理|容斥原理', fig: 'venn', items: [
        ['Two sets|Deux ensembles|Dos conjuntos|2つの集合|两个集合', R`|A \cup B| = |A| + |B| - |A \cap B|`],
        ['Three sets|Trois ensembles|Tres conjuntos|3つの集合|三个集合', R`|A \cup B \cup C| = \sum|A| - \sum|A \cap B| + |A \cap B \cap C|`],
        ['Multiples up to N|Multiples jusqu’à N|Múltiplos hasta N|N 以下の倍数|不超过 N 的倍数', R`\#\{n \le N : d \mid n\} = \left\lfloor\frac Nd\right\rfloor`, R`Divisible by 2 or 3 up to 100: $50 + 33 - 16 = 67$.|Divisibles par 2 ou 3 jusqu’à 100 : $50 + 33 - 16 = 67$.|Divisibles entre 2 o 3 hasta 100: $50 + 33 - 16 = 67$.|100 以下で 2 または 3 の倍数：$50 + 33 - 16 = 67$。|100 以内被 2 或 3 整除：$50 + 33 - 16 = 67$。`],
        ['Derangements|Dérangements|Desarreglos|完全順列（攪乱順列）|错排', R`D_n = n!\sum_{k=0}^n\frac{(-1)^k}{k!} \approx \frac{n!}{e}, \qquad D_n = (n - 1)(D_{n-1} + D_{n-2})`, R`$D_1 = 0,\ D_2 = 1,\ D_3 = 2,\ D_4 = 9,\ D_5 = 44$.|$D_1 = 0,\ D_2 = 1,\ D_3 = 2,\ D_4 = 9,\ D_5 = 44$.|$D_1 = 0,\ D_2 = 1,\ D_3 = 2,\ D_4 = 9,\ D_5 = 44$.|$D_1 = 0,\ D_2 = 1,\ D_3 = 2,\ D_4 = 9,\ D_5 = 44$。|$D_1 = 0,\ D_2 = 1,\ D_3 = 2,\ D_4 = 9,\ D_5 = 44$。`]
      ] },
      { t: 'Pigeonhole principle|Principe des tiroirs|Principio del palomar|鳩の巣原理|抽屉原理', items: [
        ['Basic form|Forme simple|Forma básica|基本形|基本形式', R`n + 1 \to n \ \Rightarrow\ \exists\,i:\ |B_i| \ge 2`, 'Put n + 1 objects into n boxes: some box gets at least two.|n + 1 objets dans n tiroirs : un tiroir en contient au moins deux.|n + 1 objetos en n cajas: alguna caja recibe al menos dos.|n + 1 個を n 個の箱に入れると、2個以上入る箱がある。|n + 1 个物品放进 n 个抽屉，必有一个抽屉至少两个。'],
        ['General form|Forme générale|Forma general|一般形|一般形式', R`N \to k \ \Rightarrow\ \exists\,i:\ |B_i| \ge \left\lceil\frac Nk\right\rceil`, R`13 people guarantee two with the same birth month; 25 guarantee three.|13 personnes garantissent deux nés le même mois ; 25 en garantissent trois.|13 personas garantizan dos del mismo mes; 25 garantizan tres.|13 人いれば同じ誕生月の2人がいる。25 人なら3人。|13 人中必有两人同月生；25 人中必有三人。`]
      ] }
    ]
  });
})();
