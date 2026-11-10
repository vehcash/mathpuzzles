/* cheat sheet · sets and logic — text is 'en|fr|es|ja|zh' */
(function () {
  const R = String.raw;
  Cheats.topic({
    id: 'logic', icon: '∈', color: '#5b5f97', bg: '#e8e9f6',
    name: 'Sets and logic|Ensembles et logique|Conjuntos y lógica|集合と論理|集合与逻辑',
    blurb: 'Set operations, De Morgan’s laws, propositions, quantifiers, necessary and sufficient conditions and proofs.|Opérations sur les ensembles, lois de De Morgan, propositions, quantificateurs, conditions nécessaires et suffisantes, démonstrations.|Operaciones con conjuntos, leyes de De Morgan, proposiciones, cuantificadores, condiciones necesarias y suficientes y demostraciones.|集合の演算、ド・モルガンの法則、命題、量化子、必要条件・十分条件、証明法。|集合运算、德摩根律、命题、量词、充分条件与必要条件、证明方法。',
    sections: [
      { t: 'Sets|Ensembles|Conjuntos|集合|集合', fig: 'venn', items: [
        ['Union and intersection|Réunion et intersection|Unión e intersección|和集合と共通部分|并集与交集', R`A \cup B = \{x : x \in A \lor x \in B\}, \qquad A \cap B = \{x : x \in A \land x \in B\}`],
        ['Complement and difference|Complémentaire et différence|Complementario y diferencia|補集合と差集合|补集与差集', R`\bar A = U \setminus A, \qquad A \setminus B = A \cap \bar B`],
        ['De Morgan’s laws|Lois de De Morgan|Leyes de De Morgan|ド・モルガンの法則|德摩根律', R`\overline{A \cup B} = \bar A \cap \bar B, \qquad \overline{A \cap B} = \bar A \cup \bar B`],
        ['Distributive laws|Distributivité|Propiedad distributiva|分配法則|分配律', R`A \cap (B \cup C) = (A \cap B) \cup (A \cap C), \qquad A \cup (B \cap C) = (A \cup B) \cap (A \cup C)`],
        ['Subsets|Sous-ensembles|Subconjuntos|部分集合|子集', R`A \subseteq B \iff A \cap B = A \iff A \cup B = B`, R`A set with $n$ elements has $2^n$ subsets ($2^n - 1$ proper, $2^n - 2$ proper non-empty).|Un ensemble à $n$ éléments a $2^n$ sous-ensembles ($2^n - 1$ propres, $2^n - 2$ propres non vides).|Un conjunto de $n$ elementos tiene $2^n$ subconjuntos ($2^n - 1$ propios, $2^n - 2$ propios no vacíos).|要素が $n$ 個の集合の部分集合は $2^n$ 個（真部分集合は $2^n - 1$ 個）。|$n$ 个元素的集合有 $2^n$ 个子集（真子集 $2^n - 1$ 个，非空真子集 $2^n - 2$ 个）。`],
        ['Counting|Cardinal|Cardinal|要素の個数|元素个数', R`|A \cup B| = |A| + |B| - |A \cap B|`],
        ['Number sets|Ensembles de nombres|Conjuntos numéricos|数の集合|数集', R`\mathbb N \subset \mathbb Z \subset \mathbb Q \subset \mathbb R \subset \mathbb C`],
        ['Intervals|Intervalles|Intervalos|区間|区间', R`[a, b] = \{a \le x \le b\}, \qquad (a, b) = \{a < x < b\}, \qquad [a, \infty) = \{x \ge a\}`]
      ] },
      { t: 'Propositions|Propositions|Proposiciones|命題|命题', items: [
        { tbl: [['p', 'q', R`\lnot p`, R`p \land q`, R`p \lor q`, R`p \Rightarrow q`, R`p \Leftrightarrow q`],
                ['~T|V|V|真|真', '~T|V|V|真|真', '~F|F|F|偽|假', '~T|V|V|真|真', '~T|V|V|真|真', '~T|V|V|真|真', '~T|V|V|真|真'], ['~T|V|V|真|真', '~F|F|F|偽|假', '~F|F|F|偽|假', '~F|F|F|偽|假', '~T|V|V|真|真', '~F|F|F|偽|假', '~F|F|F|偽|假'], ['~F|F|F|偽|假', '~T|V|V|真|真', '~T|V|V|真|真', '~F|F|F|偽|假', '~T|V|V|真|真', '~T|V|V|真|真', '~F|F|F|偽|假'], ['~F|F|F|偽|假', '~F|F|F|偽|假', '~T|V|V|真|真', '~F|F|F|偽|假', '~F|F|F|偽|假', '~T|V|V|真|真', '~T|V|V|真|真']], cls: 'tight', k: 'truth table and or not implies equivalence vérité verdad 真理値表 真值表 V F' },
        ['Negations|Négations|Negaciones|否定|否定', R`\lnot(p \land q) \equiv \lnot p \lor \lnot q, \qquad \lnot(p \lor q) \equiv \lnot p \land \lnot q`],
        ['Implication|Implication|Implicación|含意（ならば）|蕴含', R`p \Rightarrow q \ \equiv\ \lnot p \lor q, \qquad \lnot(p \Rightarrow q) \equiv p \land \lnot q`],
        ['Converse, inverse, contrapositive|Réciproque, contraire, contraposée|Recíproca, contraria, contrarrecíproca|逆・裏・対偶|逆命题、否命题、逆否命题', R`q \Rightarrow p, \qquad \lnot p \Rightarrow \lnot q, \qquad \lnot q \Rightarrow \lnot p`, 'Only the contrapositive (the third) is always equivalent to p ⇒ q.|Seule la contraposée (la troisième) est toujours équivalente à p ⇒ q.|Solo la contrarrecíproca (la tercera) es siempre equivalente a p ⇒ q.|常に p ⇒ q と同値なのは対偶（3つ目）だけ。|只有逆否命题（第三个）与 p ⇒ q 总等价。']
      ] },
      { t: 'Necessary and sufficient|Nécessaire et suffisant|Necesario y suficiente|必要条件と十分条件|充分条件与必要条件', items: [
        ['Sufficient condition|Condition suffisante|Condición suficiente|十分条件|充分条件', R`p \Rightarrow q:\ \ p \to q \ \checkmark`, 'If p ⇒ q, then p is sufficient for q and q is necessary for p.|Si p ⇒ q, p est suffisante pour q et q est nécessaire pour p.|Si p ⇒ q, p es suficiente para q y q es necesaria para p.|p ⇒ q なら、p は q の十分条件、q は p の必要条件。|若 p ⇒ q，则 p 是 q 的充分条件，q 是 p 的必要条件。'],
        ['With sets|Avec des ensembles|Con conjuntos|集合で考える|用集合理解', R`P = \{x : p(x)\},\ Q = \{x : q(x)\}: \qquad p \Rightarrow q \iff P \subseteq Q`, 'The smaller set is the sufficient condition, the bigger one the necessary condition.|Le plus petit ensemble est la condition suffisante, le plus grand la condition nécessaire.|El conjunto menor es la condición suficiente y el mayor la necesaria.|小さい集合が十分条件、大きい集合が必要条件。|小范围是充分条件，大范围是必要条件。'],
        ['Necessary and sufficient|Nécessaire et suffisante|Necesaria y suficiente|必要十分条件|充要条件', R`p \iff q \iff P = Q`]
      ] },
      { t: 'Quantifiers|Quantificateurs|Cuantificadores|量化子（全称・存在）|量词', items: [
        ['For all, there exists|Pour tout, il existe|Para todo, existe|すべての・ある|全称与存在', R`\forall x \in A:\ p(x), \qquad \exists\,x \in A:\ p(x)`],
        ['Negating quantifiers|Nier les quantificateurs|Negar los cuantificadores|量化子の否定|量词的否定', R`\lnot\big(\forall x:\ p(x)\big) \equiv \exists\,x:\ \lnot p(x), \qquad \lnot\big(\exists\,x:\ p(x)\big) \equiv \forall x:\ \lnot p(x)`, R`Example: the negation of “$\forall x,\ x^2 \ge 0$” is “$\exists\,x,\ x^2 < 0$”.|Exemple : la négation de « $\forall x,\ x^2 \ge 0$ » est « $\exists\,x,\ x^2 < 0$ ».|Ejemplo: la negación de «$\forall x,\ x^2 \ge 0$» es «$\exists\,x,\ x^2 < 0$».|例：「$\forall x,\ x^2 \ge 0$」の否定は「$\exists\,x,\ x^2 < 0$」。|例：“$\forall x,\ x^2 \ge 0$”的否定是“$\exists\,x,\ x^2 < 0$”。`],
        ['Unique existence|Existence et unicité|Existencia y unicidad|一意存在|唯一存在', R`\exists!\,x:\ p(x)`]
      ] },
      { t: 'Methods of proof|Méthodes de démonstration|Métodos de demostración|証明の方法|证明方法', items: [
        ['Mathematical induction|Récurrence|Inducción matemática|数学的帰納法|数学归纳法', R`P(1) \ \land\ \big(P(k) \Rightarrow P(k + 1)\big) \ \Rightarrow\ \forall n \ge 1:\ P(n)`, R`Base case, then assume $P(k)$ and prove $P(k + 1)$.|Initialisation, puis supposer $P(k)$ et prouver $P(k + 1)$.|Caso base; luego suponer $P(k)$ y probar $P(k + 1)$.|$n = 1$ で示し、$P(k)$ を仮定して $P(k + 1)$ を示す。|先验证起始值，再假设 $P(k)$ 成立并证明 $P(k + 1)$。`],
        ['Contradiction|Raisonnement par l’absurde|Reducción al absurdo|背理法|反证法', R`\lnot p \Rightarrow \bot \ \ \therefore\ p`, R`Classic: $\sqrt2$ is irrational; there are infinitely many primes.|Classique : $\sqrt2$ est irrationnel ; il y a une infinité de nombres premiers.|Clásico: $\sqrt2$ es irracional; hay infinitos primos.|定番：$\sqrt2$ は無理数、素数は無限にある。|经典例子：$\sqrt2$ 是无理数；素数有无穷多个。`],
        ['Contrapositive|Contraposée|Contrarrecíproco|対偶による証明|逆否命题证明', R`\lnot q \Rightarrow \lnot p \ \ \therefore\ p \Rightarrow q`],
        ['Counterexample|Contre-exemple|Contraejemplo|反例|反例', R`\exists\,x:\ \lnot p(x) \ \Rightarrow\ \lnot\big(\forall x:\ p(x)\big)`, 'One counterexample is enough to disprove a “for all” statement.|Un seul contre-exemple suffit à réfuter un énoncé « pour tout ».|Basta un contraejemplo para refutar un enunciado «para todo».|「すべての」の主張は反例1つで否定できる。|一个反例就足以否定全称命题。']
      ] }
    ]
  });
})();
