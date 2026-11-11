/* algebra · A function defined by a rule
   Gaokao 2023, New Curriculum Paper I (新课标I卷), Question 11 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-gaokao-2023-functional-equation",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2023, New Curriculum Paper I (新课标I卷), Question 11",
        fr: "Gaokao 2023, épreuve nationale I (新课标I卷), question 11",
        es: "Gaokao 2023, examen nacional I (新课标I卷), pregunta 11",
        ja: "2023年 中国・高考 新課程標準I卷 第11問",
        zh: "2023年高考数学新课标I卷 第11题"
      },
      exams: ["gaokao"]
    },
    difficulty: 3,
    title: {
      en: "A function defined by a rule",
      fr: "Une fonction définie par une règle",
      es: "Una función definida por una regla",
      ja: "規則で決まる関数",
      zh: "由规则定义的函数"
    },
    statement: {
      en: "$f$ is defined for all real numbers and $f(xy)=y^2f(x)+x^2f(y)$ for all real $x, y$. <b>Which of the following must be true?</b>",
      fr: "$f$ est définie sur $\\mathbb R$ et $f(xy)=y^2f(x)+x^2f(y)$ pour tous réels $x, y$. <b>Lesquelles des affirmations suivantes sont forcément vraies ?</b>",
      es: "$f$ está definida en $\\mathbb R$ y $f(xy)=y^2f(x)+x^2f(y)$ para todos los reales $x, y$. <b>¿Cuáles de las siguientes afirmaciones son necesariamente verdaderas?</b>",
      ja: "$f$ はすべての実数で定義され、任意の実数 $x, y$ で $f(xy)=y^2f(x)+x^2f(y)$ です。<b>必ず正しいものはどれですか？</b>",
      zh: "$f$ 的定义域为 $\\mathbb R$，且对任意实数 $x, y$ 有 $f(xy)=y^2f(x)+x^2f(y)$。<b>下列哪些一定正确？</b>"
    },
    figureText: {
      en: "The graph of one function that satisfies the rule, f(x) = x² ln|x| (with f(0) = 0): even, zero at −1, 0 and 1, and dipping below zero between −1 and 1.",
      fr: "La courbe d’une fonction qui vérifie la règle, f(x) = x² ln|x| (avec f(0) = 0) : paire, nulle en −1, 0 et 1, et négative entre −1 et 1.",
      es: "La gráfica de una función que cumple la regla, f(x) = x² ln|x| (con f(0) = 0): par, nula en −1, 0 y 1, y negativa entre −1 y 1.",
      ja: "規則を満たす関数の1つ f(x) = x² ln|x|（f(0) = 0）のグラフ：偶関数で −1、0、1 で 0、−1 と 1 の間で負。",
      zh: "满足规则的一个函数 f(x) = x² ln|x|（f(0) = 0）的图像：偶函数，在 −1、0、1 处为零，在 −1 与 1 之间为负。"
    },
    hint: {
      en: "Substitute $x=y=0$, then $x=y=1$, then $x=y=-1$, then $y=-1$.",
      fr: "Substituez $x=y=0$, puis $x=y=1$, puis $x=y=-1$, puis $y=-1$.",
      es: "Sustituye $x=y=0$, luego $x=y=1$, luego $x=y=-1$ y luego $y=-1$.",
      ja: "$x=y=0$、$x=y=1$、$x=y=-1$、$y=-1$ の順に代入。",
      zh: "依次代入 $x=y=0$、$x=y=1$、$x=y=-1$、$y=-1$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.0, scale: 58, pad: 18 });
      const T = F.T = axes(F, -2.5, 2.5, -0.9, 2.1);
      const f = x => x === 0 ? 0 : x * x * Math.log(Math.abs(x)) * 1.4;
      plot(F, T, f, -1.9, 1.9, 'graph', 'base', -0.9, 2.1);
      [-1, 1].forEach(x => { F.dot(T([x, 0])); F.text(T([x, 0]), x < 0 ? '−1' : '1', 'tick', x < 0 ? -10 : 10, 12); });
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "is even": {"fr": "est paire", "es": "es par", "ja": "は偶関数", "zh": "是偶函数"},
      "for": {"fr": "pour", "es": "para", "ja": "（次の範囲で）", "zh": "当"},
      "is odd": {"fr": "est impaire", "es": "es impar", "ja": "は奇関数", "zh": "是奇函数"},
      "for every": {"fr": "pour tout", "es": "para todo", "ja": "すべての", "zh": "对所有"}
    },
    options: [
      { tex: "f(0)=0", correct: true, why: {
        en: "$x=y=0$ gives $f(0)=0+0$.",
        fr: "$x=y=0$ donne $f(0)=0+0$.",
        es: "$x=y=0$ da $f(0)=0+0$.",
        ja: "$x=y=0$ で $f(0)=0+0$。",
        zh: "$x=y=0$ 得 $f(0)=0+0$。"
      } },
      { tex: "f \\text{ is even}", correct: true, why: {
        en: "$f(-1)=0$, so $y=-1$ gives $f(-x)=f(x)+x^2f(-1)=f(x)$.",
        fr: "$f(-1)=0$, donc $y=-1$ donne $f(-x)=f(x)+x^2f(-1)=f(x)$.",
        es: "$f(-1)=0$, así que $y=-1$ da $f(-x)=f(x)+x^2f(-1)=f(x)$.",
        ja: "$f(-1)=0$ なので $y=-1$ で $f(-x)=f(x)+x^2f(-1)=f(x)$。",
        zh: "$f(-1)=0$，令 $y=-1$ 得 $f(-x)=f(x)+x^2f(-1)=f(x)$。"
      } },
      { tex: "f(1)=1", correct: false, why: {
        en: "$x=y=1$ gives $f(1)=2f(1)$, so $f(1)=0$.",
        fr: "$x=y=1$ donne $f(1)=2f(1)$, donc $f(1)=0$.",
        es: "$x=y=1$ da $f(1)=2f(1)$, luego $f(1)=0$.",
        ja: "$x=y=1$ で $f(1)=2f(1)$、よって $f(1)=0$。",
        zh: "$x=y=1$ 得 $f(1)=2f(1)$，故 $f(1)=0$。"
      } },
      { tex: "f(x)\\ge f(0)\\ \\text{for}\\ |x|<\\tfrac12", correct: false, why: {
        en: "For $x^2\\ln|x|$ it is a local maximum; for $f\\equiv0$ neither.",
        fr: "Pour $x^2\\ln|x|$ c’est un maximum local ; pour $f\\equiv0$ ni l’un ni l’autre.",
        es: "Para $x^2\\ln|x|$ es un máximo local; para $f\\equiv0$, ninguno.",
        ja: "$x^2\\ln|x|$ では極大、$f\\equiv0$ ではどちらでもない。",
        zh: "对 $x^2\\ln|x|$ 是极大值点，对 $f\\equiv0$ 两者都不是。"
      } },
      { tex: "f \\text{ is odd}", correct: false, why: {
        en: "It is even; odd and even together would force $f\\equiv0$.",
        fr: "Elle est paire ; paire et impaire imposerait $f\\equiv0$.",
        es: "Es par; par e impar a la vez obligaría a $f\\equiv0$.",
        ja: "偶関数。奇でもあれば $f\\equiv0$ になってしまう。",
        zh: "它是偶函数；同时为奇函数会迫使 $f\\equiv0$。"
      } },
      { tex: "f(x)=0 \\text{ for every } x", correct: false, why: {
        en: "$f(x)=x^2\\ln|x|$ (with $f(0)=0$) also works.",
        fr: "$f(x)=x^2\\ln|x|$ (avec $f(0)=0$) convient aussi.",
        es: "$f(x)=x^2\\ln|x|$ (con $f(0)=0$) también sirve.",
        ja: "$f(x)=x^2\\ln|x|$（$f(0)=0$）も満たす。",
        zh: "$f(x)=x^2\\ln|x|$（$f(0)=0$）也满足。"
      } },
      { tex: "f(-1)=1", correct: false, why: {
        en: "$x=y=-1$ gives $f(1)=2f(-1)$, so $f(-1)=0$.",
        fr: "$x=y=-1$ donne $f(1)=2f(-1)$, donc $f(-1)=0$.",
        es: "$x=y=-1$ da $f(1)=2f(-1)$, luego $f(-1)=0$.",
        ja: "$x=y=-1$ で $f(1)=2f(-1)$、よって $f(-1)=0$。",
        zh: "$x=y=-1$ 得 $f(1)=2f(-1)$，故 $f(-1)=0$。"
      } },
      { tex: "f(2)=0", correct: false, why: {
        en: "Not forced: $x^2\\ln|x|$ gives $4\\ln2$.",
        fr: "Pas imposé : $x^2\\ln|x|$ donne $4\\ln2$.",
        es: "No es forzoso: $x^2\\ln|x|$ da $4\\ln2$.",
        ja: "必ずではない：$x^2\\ln|x|$ では $4\\ln2$。",
        zh: "并非必然：$x^2\\ln|x|$ 给出 $4\\ln2$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Special values",
          fr: "Valeurs particulières",
          es: "Valores especiales",
          ja: "特別な値",
          zh: "特殊值"
        },
        lines: ["x=y=0:\\ f(0)=0;\\qquad x=y=1:\\ f(1)=2f(1)\\Rightarrow f(1)=0", "x=y=-1:\\ f(1)=2f(-1)\\Rightarrow f(-1)=0"],
        note: {
          en: "Each substitution gives a value for free.",
          fr: "Chaque substitution donne une valeur gratuitement.",
          es: "Cada sustitución da un valor gratis.",
          ja: "代入するたびに値が1つ分かる。",
          zh: "每次代入都白得一个值。"
        }
      },
      {
        title: {
          en: "Parity",
          fr: "Parité",
          es: "Paridad",
          ja: "偶奇",
          zh: "奇偶性"
        },
        lines: ["y=-1:\\ f(-x)=f(x)+x^2f(-1)=f(x) \\;\\Rightarrow\\; f \\text{ is even}"],
        note: {
          en: "Nothing forces the value at $0$ to be a minimum: $x^2\\ln|x|$ is negative near $0$.",
          fr: "Rien n’impose un minimum en $0$ : $x^2\\ln|x|$ est négative près de $0$.",
          es: "Nada obliga a un mínimo en $0$: $x^2\\ln|x|$ es negativa cerca de $0$.",
          ja: "$0$ で極小とは限らない：$x^2\\ln|x|$ は $0$ の近くで負。",
          zh: "$0$ 处不一定是极小：$x^2\\ln|x|$ 在 $0$ 附近为负。"
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
          en: "A concrete example rules out the tempting extras.",
          fr: "Un exemple concret écarte les affirmations tentantes.",
          es: "Un ejemplo concreto descarta las afirmaciones tentadoras.",
          ja: "具体例で紛らわしい選択肢を除けます。",
          zh: "一个具体例子即可排除诱人的选项。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
