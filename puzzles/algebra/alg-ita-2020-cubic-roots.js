/* algebra · Roots that obey a rule
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2020, Mathematics, Question 48 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-ita-2020-cubic-roots",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2020, Mathematics, Question 48",
        fr: "Concours de l’ITA (Institut technologique d’aéronautique, Brésil) 2020, mathématiques, question 48",
        es: "Examen de ingreso del ITA (Instituto Tecnológico de Aeronáutica, Brasil) 2020, matemáticas, pregunta 48",
        ja: "ITA（ブラジル航空技術大学）2020 入試 数学 第48問",
        zh: "巴西航空技术学院 ITA 2020 入学考试 数学第 48 题"
      },
      exams: ["ita"]
    },
    difficulty: 3,
    title: {
      en: "Roots that obey a rule",
      fr: "Des racines qui obéissent à une règle",
      es: "Raíces que obedecen una regla",
      ja: "規則に従う解",
      zh: "服从规则的根"
    },
    statement: {
      en: "$p(x)=x^3-mx^2+x+5+n$, where $m$ and $n$ are fixed real numbers. Every root $z=a+bi$ of $p$ satisfies $a=mb^2+nb-1$. <b>Which of the following equal the sum of the squares of the roots of $p$?</b>",
      fr: "$p(x)=x^3-mx^2+x+5+n$, où $m$ et $n$ sont des réels fixés. Toute racine $z=a+bi$ de $p$ vérifie $a=mb^2+nb-1$. <b>Lesquelles des valeurs suivantes sont égales à la somme des carrés des racines de $p$ ?</b>",
      es: "$p(x)=x^3-mx^2+x+5+n$, donde $m$ y $n$ son reales fijos. Toda raíz $z=a+bi$ de $p$ cumple $a=mb^2+nb-1$. <b>¿Cuáles de los siguientes valores son iguales a la suma de los cuadrados de las raíces de $p$?</b>",
      ja: "$p(x)=x^3-mx^2+x+5+n$（$m$、$n$ は定数の実数）。$p$ のすべての解 $z=a+bi$ が $a=mb^2+nb-1$ を満たします。<b>$p$ の解の2乗の和に等しいものはどれですか？</b>",
      zh: "$p(x)=x^3-mx^2+x+5+n$，其中 $m$、$n$ 是给定实数。$p$ 的每个根 $z=a+bi$ 都满足 $a=mb^2+nb-1$。<b>下列哪些等于 $p$ 的各根的平方和？</b>"
    },
    figureText: {
      en: "The complex plane where the three roots will be placed. They are plotted in the solution.",
      fr: "Le plan complexe où seront placées les trois racines. Elles sont placées dans la solution.",
      es: "El plano complejo donde irán las tres raíces. Se colocan en la solución.",
      ja: "3つの解を置く複素平面。解は解答で描きます。",
      zh: "将放置三个根的复平面。根在解答中标出。"
    },
    hint: {
      en: "The coefficients are real, so non-real roots come in conjugate pairs $a\\pm bi$ — and both must satisfy the rule.",
      fr: "Les coefficients sont réels, donc les racines non réelles vont par paires conjuguées $a\\pm bi$ — et les deux doivent suivre la règle.",
      es: "Los coeficientes son reales, así que las raíces no reales van en pares conjugados $a\\pm bi$, y ambas deben cumplir la regla.",
      ja: "係数は実数なので、虚数解は共役な組 $a\\pm bi$ で現れ、どちらも規則を満たす必要があります。",
      zh: "系数是实数，非实根成共轭对 $a\\pm bi$——两者都要满足这一规则。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 3.6, scale: 58, pad: 16 });
      const T = argand(F, -1.6, 3.0, -1.8, 1.8);
      F.reveal = () => {
      [[-1, 0], [2, 1], [2, -1]].forEach(z => F.dot(T(z)));
      F.text(T([-1, 0]), '−1', 'len', -4, -14); F.text(T([2, 1]), '2 + i', 'len', 26, -6); F.text(T([2, -1]), '2 − i', 'len', 26, 6);
      F.seg(T([2, 1]), T([2, -1]), 'seg thin');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "but the coefficient of": {"fr": "mais le coefficient de", "es": "pero el coeficiente de", "ja": "しかし", "zh": "但"},
      "is": {"fr": "vaut", "es": "es", "ja": "の係数は", "zh": "的系数是"}
    },
    options: [
      { tex: "7", correct: true, why: {
        en: "$m=3$, so $\\sum z_k^2=m^2-2\\cdot1=7$.",
        fr: "$m=3$, donc $\\sum z_k^2=m^2-2\\cdot1=7$.",
        es: "$m=3$, así que $\\sum z_k^2=m^2-2\\cdot1=7$.",
        ja: "$m=3$ なので $\\sum z_k^2=m^2-2\\cdot1=7$。",
        zh: "$m=3$，所以 $\\sum z_k^2=m^2-2\\cdot1=7$。"
      } },
      { tex: "m^2-2", correct: true, why: {
        en: "Always true here: $\\sum z_k^2=(\\sum z_k)^2-2\\sum z_jz_k=m^2-2$, and $m=3$.",
        fr: "Toujours vrai ici : $\\sum z_k^2=(\\sum z_k)^2-2\\sum z_jz_k=m^2-2$, et $m=3$.",
        es: "Siempre cierto aquí: $\\sum z_k^2=(\\sum z_k)^2-2\\sum z_jz_k=m^2-2$, y $m=3$.",
        ja: "ここでは常に $\\sum z_k^2=(\\sum z_k)^2-2\\sum z_jz_k=m^2-2$、$m=3$。",
        zh: "这里恒有 $\\sum z_k^2=(\\sum z_k)^2-2\\sum z_jz_k=m^2-2$，且 $m=3$。"
      } },
      { tex: "9", correct: false, why: {
        en: "That is $m^2=(\\sum z_k)^2$; subtract $2\\sum z_jz_k=2$.",
        fr: "C’est $m^2=(\\sum z_k)^2$ ; il faut retrancher $2\\sum z_jz_k=2$.",
        es: "Es $m^2=(\\sum z_k)^2$; hay que restar $2\\sum z_jz_k=2$.",
        ja: "それは $m^2=(\\sum z_k)^2$。$2\\sum z_jz_k=2$ を引く。",
        zh: "那是 $m^2=(\\sum z_k)^2$；还要减去 $2\\sum z_jz_k=2$。"
      } },
      { tex: "11", correct: false, why: {
        en: "$1+5+5$ adds the squared moduli $|z|^2$, not the squares $z^2$.",
        fr: "$1+5+5$ additionne les modules au carré $|z|^2$, pas les carrés $z^2$.",
        es: "$1+5+5$ suma los módulos al cuadrado $|z|^2$, no los cuadrados $z^2$.",
        ja: "$1+5+5$ は $|z|^2$ の和で、$z^2$ の和ではない。",
        zh: "$1+5+5$ 是模的平方 $|z|^2$ 之和，不是 $z^2$ 之和。"
      } },
      { tex: "3", correct: false, why: {
        en: "That is the sum of the roots, $m$.",
        fr: "C’est la somme des racines, $m$.",
        es: "Es la suma de las raíces, $m$.",
        ja: "それは解の和 $m$。",
        zh: "那是根之和 $m$。"
      } },
      { tex: "6", correct: false, why: {
        en: "Check: $1+(3+4i)+(3-4i)=7$.",
        fr: "Vérification : $1+(3+4i)+(3-4i)=7$.",
        es: "Comprobación: $1+(3+4i)+(3-4i)=7$.",
        ja: "確認：$1+(3+4i)+(3-4i)=7$。",
        zh: "检验：$1+(3+4i)+(3-4i)=7$。"
      } },
      { tex: "8", correct: false, why: {
        en: "Off by one: $(-1)^2=1$, $(2\\pm i)^2=3\\pm4i$.",
        fr: "Décalé de un : $(-1)^2=1$, $(2\\pm i)^2=3\\pm4i$.",
        es: "Se pasa en uno: $(-1)^2=1$, $(2\\pm i)^2=3\\pm4i$.",
        ja: "1 ずれ：$(-1)^2=1$、$(2\\pm i)^2=3\\pm4i$。",
        zh: "差一：$(-1)^2=1$，$(2\\pm i)^2=3\\pm4i$。"
      } },
      { tex: "5", correct: false, why: {
        en: "That is $|2\\pm i|^2$ for one root.",
        fr: "C’est $|2\\pm i|^2$ pour une racine.",
        es: "Es $|2\\pm i|^2$ de una raíz.",
        ja: "それは1つの解の $|2\\pm i|^2$。",
        zh: "那是一个根的 $|2\\pm i|^2$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Not all roots can be real",
          fr: "Les racines ne peuvent pas être toutes réelles",
          es: "No todas las raíces pueden ser reales",
          ja: "すべてが実数解ではありえない",
          zh: "根不可能全是实数"
        },
        lines: ["b=0 \\Rightarrow a=-1:\\; p(x)=(x+1)^3=x^3+3x^2+3x+1", "\\text{but the coefficient of } x \\text{ is } 1 \\ne 3"],
        note: {
          en: "So there is a pair $a\\pm qi$ with $q\\ne0$, and a real root, which must be $-1$.",
          fr: "Il y a donc une paire $a\\pm qi$ avec $q\\ne0$, et une racine réelle, forcément $-1$.",
          es: "Así que hay un par $a\\pm qi$ con $q\\ne0$ y una raíz real, que debe ser $-1$.",
          ja: "よって $q\\ne0$ の組 $a\\pm qi$ と、実数解（必ず $-1$）がある。",
          zh: "所以有一对 $a\\pm qi$（$q\\ne0$）和一个实根，且实根必为 $-1$。"
        }
      },
      {
        title: {
          en: "Use both members of the pair",
          fr: "Utiliser les deux membres de la paire",
          es: "Usar los dos miembros del par",
          ja: "組の両方を使う",
          zh: "利用共轭对的两个根"
        },
        lines: ["a=mq^2+nq-1=mq^2-nq-1 \\Rightarrow n=0", "p(-1)=-1-m-1+5=0 \\Rightarrow m=3"],
        note: {
          en: "Then $2a-1=m=3$ gives $a=2$ and $3q^2-1=2$ gives $q^2=1$: the roots are $-1,\\ 2\\pm i$.",
          fr: "Puis $2a-1=m=3$ donne $a=2$ et $3q^2-1=2$ donne $q^2=1$ : les racines sont $-1,\\ 2\\pm i$.",
          es: "Luego $2a-1=m=3$ da $a=2$ y $3q^2-1=2$ da $q^2=1$: las raíces son $-1,\\ 2\\pm i$.",
          ja: "さらに $2a-1=m=3$ から $a=2$、$3q^2-1=2$ から $q^2=1$。解は $-1,\\ 2\\pm i$。",
          zh: "再由 $2a-1=m=3$ 得 $a=2$，$3q^2-1=2$ 得 $q^2=1$：根为 $-1,\\ 2\\pm i$。"
        }
      },
      {
        title: {
          en: "Sum of squares",
          fr: "Somme des carrés",
          es: "Suma de cuadrados",
          ja: "2乗の和",
          zh: "平方和"
        },
        lines: ["\\sum z_k^2=\\Big(\\sum z_k\\Big)^2-2\\sum_{j<k}z_jz_k=3^2-2\\cdot1=\\boxed{7}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "$\\sum z_k=m=3$ and $\\sum z_jz_k=1$ (the coefficient of $x$).",
          fr: "$\\sum z_k=m=3$ et $\\sum z_jz_k=1$ (le coefficient de $x$).",
          es: "$\\sum z_k=m=3$ y $\\sum z_jz_k=1$ (el coeficiente de $x$).",
          ja: "$\\sum z_k=m=3$、$\\sum z_jz_k=1$（$x$ の係数）。",
          zh: "$\\sum z_k=m=3$，$\\sum z_jz_k=1$（$x$ 的系数）。"
        }
      },
      {
        title: {
          en: "Check every option",
          fr: "Vérifier chaque option",
          es: "Comprobar cada opción",
          ja: "各選択肢を確認",
          zh: "逐项检查选项"
        },
        options: true,
        note: {
          en: "One option is the number, one the formula that gives it.",
          fr: "Une option est le nombre, une autre la formule qui le donne.",
          es: "Una opción es el número y otra la fórmula que lo da.",
          ja: "1つは数、1つはそれを与える式。",
          zh: "一个是数值，一个是得出它的公式。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
