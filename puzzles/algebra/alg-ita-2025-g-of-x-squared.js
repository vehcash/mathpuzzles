/* algebra · g(x²) = f(2x² − x + 1): what must fail?
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2025, 1st phase (13 October 2024), Mathematics, Question 4 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-ita-2025-g-of-x-squared",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2025, 1st phase (13 October 2024), Mathematics, Question 4",
        fr: "Concours de l’ITA (Brésil) 2025, 1re phase (13 octobre 2024), mathématiques, question 4",
        es: "Examen de ingreso del ITA (Brasil) 2025, 1.ª fase (13 de octubre de 2024), matemáticas, pregunta 4",
        ja: "ITA（ブラジル航空技術大学）2025 入試 第1次（2024年10月13日） 数学 第4問",
        zh: "巴西航空技术学院 ITA 2025 入学考试第一阶段（2024年10月13日）数学第 4 题"
      },
      exams: ["ita"]
    },
    difficulty: 3,
    title: {
      en: "g(x²) = f(2x² − x + 1): what must fail?",
      fr: "g(x²) = f(2x² − x + 1) : qu’est-ce qui échoue forcément ?",
      es: "g(x²) = f(2x² − x + 1): ¿qué falla seguro?",
      ja: "g(x²) = f(2x² − x + 1)：必ず成り立たないのは？",
      zh: "g(x²) = f(2x² − x + 1)：什么必然不成立？"
    },
    statement: {
      en: "Let $f,g:\\mathbb R\\to\\mathbb R$ satisfy $g(x^2)=f(2x^2-x+1)$ for every $x>0$. <b>Which of the following are true?</b>",
      fr: "Soient $f,g:\\mathbb R\\to\\mathbb R$ telles que $g(x^2)=f(2x^2-x+1)$ pour tout $x>0$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sean $f,g:\\mathbb R\\to\\mathbb R$ con $g(x^2)=f(2x^2-x+1)$ para todo $x>0$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$f,g:\\mathbb R\\to\\mathbb R$ はすべての $x>0$ で $g(x^2)=f(2x^2-x+1)$ を満たします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $f,g:\\mathbb R\\to\\mathbb R$ 对所有 $x>0$ 满足 $g(x^2)=f(2x^2-x+1)$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The parabola u = 2x² − x + 1 for x > 0, which takes some values twice.",
      fr: "La parabole u = 2x² − x + 1 pour x > 0, qui prend certaines valeurs deux fois.",
      es: "La parábola u = 2x² − x + 1 para x > 0, que toma algunos valores dos veces.",
      ja: "x > 0 での放物線 u = 2x² − x + 1（ある値を2回とる）。",
      zh: "x > 0 时的抛物线 u = 2x² − x + 1，某些值取两次。"
    },
    hint: {
      en: "Find two different $x,y>0$ with $2x^2-x+1=2y^2-y+1$.",
      fr: "Trouvez $x\\ne y$ positifs avec $2x^2-x+1=2y^2-y+1$.",
      es: "Busca $x\\ne y$ positivos con $2x^2-x+1=2y^2-y+1$.",
      ja: "$2x^2-x+1=2y^2-y+1$ となる異なる正の $x,y$ を探す。",
      zh: "找两个不同的正数 $x,y$ 使 $2x^2-x+1=2y^2-y+1$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.8, h: 3.4, scale: 50, pad: 16 });
      const S = ([x, y]) => [(x + 0.2) * 3.4, (y - 0.5) * 2.8];
      F.seg(S([-0.2, 0.55]), S([1.1, 0.55]), 'axis'); F.seg(S([0, 0.5]), S([0, 1.65]), 'axis'); F.text(S([1.1, 0.55]), 'x', 'tick', -8, 12); F.text(S([0, 1.65]), 'u', 'tick', 12, 8);
      plot(F, S, x => 2 * x * x - x + 1, 0.01, 0.85, 'graph');
      F.reveal = () => {
      F.seg(S([0.1, 0.92]), S([0.4, 0.92]), 'hl pink'); F.dot(S([0.1, 0.92])); F.dot(S([0.4, 0.92]));
      F.text(S([0.25, 0.92]), 'x + y = 1/2', 'len small', 0, -14);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "x + y = 1/2": {"fr": "x + y = 1/2", "es": "x + y = 1/2", "ja": "x + y = 1/2", "zh": "x + y = 1/2"},
      "is not injective": {"fr": "n’est pas injective", "es": "no es inyectiva", "ja": "は単射でない", "zh": "不是单射"},
      "for": {"fr": "pour", "es": "para", "ja": "：", "zh": "对"},
      "is not surjective": {"fr": "n’est pas surjective", "es": "no es sobreyectiva", "ja": "は全射でない", "zh": "不是满射"},
      "for all": {"fr": "pour tout", "es": "para todo", "ja": "すべての", "zh": "对所有"},
      "is injective on": {"fr": "est injective sur", "es": "es inyectiva en", "ja": "は次で単射：", "zh": "在下列区间是单射"},
      "is increasing for": {"fr": "est croissante pour", "es": "es creciente para", "ja": "は次で増加：", "zh": "在下列范围递增"}
    },
    options: [
      { tex: "g\\ \\text{is not injective}", correct: true, why: {
        en: "$x=0.1$, $y=0.4$: same input to $f$, so $g(0.01)=g(0.16)$.",
        fr: "$x=0{,}1$, $y=0{,}4$ : même argument pour $f$, donc $g(0{,}01)=g(0{,}16)$.",
        es: "$x=0{,}1$, $y=0{,}4$: mismo argumento para $f$, así $g(0{,}01)=g(0{,}16)$.",
        ja: "$x=0.1, y=0.4$ で $f$ の引数が同じなので $g(0.01)=g(0.16)$。",
        zh: "$x=0.1$、$y=0.4$ 时 $f$ 的自变量相同，故 $g(0.01)=g(0.16)$。"
      } },
      { tex: "2x^2-x+1=2y^2-y+1\\ \\text{for}\\ x\\ne y>0\\iff x+y=\\tfrac12", correct: true, why: {
        en: "$(x-y)\\big(2(x+y)-1\\big)=0$",
        fr: "$(x-y)\\big(2(x+y)-1\\big)=0$",
        es: "$(x-y)\\big(2(x+y)-1\\big)=0$",
        ja: "$(x-y)\\big(2(x+y)-1\\big)=0$",
        zh: "$(x-y)\\big(2(x+y)-1\\big)=0$"
      } },
      { tex: "f\\ \\text{is not injective}", correct: false, why: {
        en: "Nothing forces it: $f(u)=u$ with $g(t)=2t-\\sqrt t+1$ for $t>0$ works.",
        fr: "Rien ne l’impose : $f(u)=u$ et $g(t)=2t-\\sqrt t+1$ pour $t>0$ conviennent.",
        es: "Nada lo impone: $f(u)=u$ y $g(t)=2t-\\sqrt t+1$ para $t>0$ sirven.",
        ja: "強制されない。$f(u)=u$、$t>0$ で $g(t)=2t-\\sqrt t+1$ が例。",
        zh: "并非必然：$f(u)=u$，$t>0$ 时 $g(t)=2t-\\sqrt t+1$ 即满足。"
      } },
      { tex: "f\\ \\text{is not surjective}", correct: false, why: {
        en: "$f$ is only constrained on $u\\ge\\tfrac78$; it can be onto.",
        fr: "$f$ n’est contrainte que pour $u\\ge\\tfrac78$ ; elle peut être surjective.",
        es: "$f$ solo está restringida en $u\\ge\\tfrac78$; puede ser sobreyectiva.",
        ja: "$f$ は $u\\ge\\tfrac78$ でしか制約されず、全射にできる。",
        zh: "$f$ 只在 $u\\ge\\tfrac78$ 受约束，可以是满射。"
      } },
      { tex: "g\\ \\text{is not surjective}", correct: false, why: {
        en: "$g$ is free on $t\\le0$, so it can be onto.",
        fr: "$g$ est libre pour $t\\le0$ : elle peut être surjective.",
        es: "$g$ es libre en $t\\le0$: puede ser sobreyectiva.",
        ja: "$g$ は $t\\le0$ で自由なので全射にできる。",
        zh: "$g$ 在 $t\\le0$ 上自由，可为满射。"
      } },
      { tex: "f(a)\\ne g(a)\\ \\text{for all}\\ a>0", correct: false, why: {
        en: "Nothing forces this: the functions are only linked through different arguments.",
        fr: "Rien ne l’impose : les fonctions ne sont reliées qu’en des arguments différents.",
        es: "Nada lo impone: las funciones solo se relacionan en argumentos distintos.",
        ja: "強制されない。両関数は異なる引数で結ばれているだけ。",
        zh: "并非必然：两函数只在不同自变量处相联系。"
      } },
      { tex: "g\\ \\text{is injective on}\\ (0,\\infty)", correct: false, why: {
        en: "$g(0.01)=g(0.16)$",
        fr: "$g(0.01)=g(0.16)$",
        es: "$g(0.01)=g(0.16)$",
        ja: "$g(0.01)=g(0.16)$",
        zh: "$g(0.01)=g(0.16)$"
      } },
      { tex: "u=2x^2-x+1\\ \\text{is increasing for}\\ x>0", correct: false, why: {
        en: "$u'=4x-1<0\\ \\text{for}\\ x<\\tfrac14$",
        fr: "$u'=4x-1<0\\ \\text{for}\\ x<\\tfrac14$",
        es: "$u'=4x-1<0\\ \\text{for}\\ x<\\tfrac14$",
        ja: "$u'=4x-1<0\\ \\text{for}\\ x<\\tfrac14$",
        zh: "$u'=4x-1<0\\ \\text{for}\\ x<\\tfrac14$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Equal inputs",
          fr: "Arguments égaux",
          es: "Argumentos iguales",
          ja: "等しい引数",
          zh: "相同自变量"
        },
        lines: ["2x^2-x+1=2y^2-y+1\\iff(x-y)(2x+2y-1)=0"],
        note: {
          en: "",
          fr: "",
          es: "",
          ja: "",
          zh: ""
        }
      },
      {
        title: {
          en: "Consequence for g",
          fr: "Conséquence pour g",
          es: "Consecuencia para g",
          ja: "g への帰結",
          zh: "对 g 的推论"
        },
        lines: ["x=0.1,\\ y=0.4:\\ g(0.01)=f(0.92)=g(0.16)"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "",
          fr: "",
          es: "",
          ja: "",
          zh: ""
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
          en: "Exactly two options are true here.",
          fr: "Exactement deux options sont vraies ici.",
          es: "Aquí hay exactamente dos opciones verdaderas.",
          ja: "ここで正しいのはちょうど2つ。",
          zh: "这里恰有两个正确选项。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
