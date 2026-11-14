/* number · Reachable numbers with x + 1 and x/2 − 1
   Oxford MAT 2020, additional multiple-choice test (Mathematics Admissions Test), Question G */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-mat-2020b-add-one-or-halve-minus-one",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2020, additional multiple-choice test (Mathematics Admissions Test), Question G",
        fr: "MAT d’Oxford 2020, test complémentaire à choix multiples (test d’admission en mathématiques), question G",
        es: "MAT de Oxford 2020, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta G",
        ja: "オックスフォード大学 数学入学試験 MAT 2020 追加選択式テスト 問題 G",
        zh: "牛津大学数学入学考试 MAT 2020 补充选择题测试 第 G 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "Reachable numbers with x + 1 and x/2 − 1",
      fr: "Nombres atteignables avec x + 1 et x/2 − 1",
      es: "Números alcanzables con x + 1 y x/2 − 1",
      ja: "x + 1 と x/2 − 1 で到達できる数",
      zh: "用 x + 1 与 x/2 − 1 能得到的数"
    },
    statement: {
      en: "Let $S(x)=x+1$ and $T(x)=\\tfrac x2-1$. Starting from $0$, apply $S$ and $T$ any number of times in any order, and collect all the numbers you can get. <b>Which of the following are true?</b>",
      fr: "Soit $S(x)=x+1$ et $T(x)=\\tfrac x2-1$. En partant de $0$, on applique $S$ et $T$ autant de fois qu’on veut, dans n’importe quel ordre, et on recueille tous les nombres obtenus. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $S(x)=x+1$ y $T(x)=\\tfrac x2-1$. Partiendo de $0$, se aplican $S$ y $T$ cualquier número de veces en cualquier orden y se reúnen todos los números obtenidos. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$S(x)=x+1$、$T(x)=\\tfrac x2-1$ とします。$0$ から始めて $S,T$ を任意の順に何回でも適用し、得られる数をすべて集めます。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $S(x)=x+1$，$T(x)=\\tfrac x2-1$。从 $0$ 出发，以任意顺序任意次数作用 $S$、$T$，收集所有能得到的数。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A tree of values starting at 0, branching with S and T.",
      fr: "Un arbre de valeurs partant de 0, avec des branches S et T.",
      es: "Un árbol de valores desde 0, con ramas S y T.",
      ja: "0 から S と T で枝分かれする値の木。",
      zh: "从 0 出发、按 S 和 T 分叉的数值树。"
    },
    hint: {
      en: "Dyadic rationals $\\tfrac{m}{2^k}$ appear because of halving. What is the smallest value $T$ can push you towards?",
      fr: "Des rationnels dyadiques $\\tfrac{m}{2^k}$ apparaissent à cause des divisions par $2$. Vers quelle valeur minimale $T$ peut-il pousser ?",
      es: "Aparecen racionales diádicos $\\tfrac{m}{2^k}$ por las divisiones entre $2$. ¿Hacia qué valor mínimo puede empujar $T$?",
      ja: "半分にするので $\\tfrac{m}{2^k}$ 型の有理数が出る。$T$ はどの値に向かって押し下げるか？",
      zh: "因减半出现二进分数 $\\tfrac{m}{2^k}$。$T$ 最低能把数推向哪里？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 3.0, scale: 46, pad: 16 });
      const nodes = [[3.0, 2.6, '0'], [1.6, 1.6, '1'], [4.4, 1.6, '−1'], [0.8, 0.5, '2'], [2.3, 0.5, '−1/2'], [3.7, 0.5, '0'], [5.2, 0.5, '−3/2']];
      [[0, 1, 'S'], [0, 2, 'T'], [1, 3, 'S'], [1, 4, 'T'], [2, 5, 'S'], [2, 6, 'T']].forEach(([a, b, t]) => { F.seg(nodes[a], nodes[b], 'seg thin'); F.text(mid(nodes[a], nodes[b]), t, 'tick', -8, 0); });
      nodes.forEach(([x, y, t]) => { F.circle([x, y], 0.3, 'fill-blue'); F.text([x, y], t, 'len small', 0, 0); });
      F.reveal = () => {
      F.text([3.0, 0.0], '> −2', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "S": {"fr": "S", "es": "S", "ja": "S", "zh": "S"},
      "T": {"fr": "T", "es": "T", "ja": "T", "zh": "T"},
      "> −2": {"fr": "> −2", "es": "> −2", "ja": "> −2", "zh": "> −2"},
      "rationals": {"fr": "rationnels", "es": "racionales", "ja": "有理数", "zh": "有理数"},
      "with denominator a power of 2": {"fr": "de dénominateur une puissance de 2", "es": "con denominador potencia de 2", "ja": "分母が2の累乗", "zh": "分母为 2 的幂"},
      "all positive rationals": {"fr": "tous les rationnels positifs", "es": "todos los racionales positivos", "ja": "すべての正の有理数", "zh": "所有正有理数"},
      "all dyadic rationals": {"fr": "tous les rationnels dyadiques", "es": "todos los racionales diádicos", "ja": "すべての2進有理数", "zh": "所有二进有理数"},
      "can be reached": {"fr": "peut être atteint", "es": "se puede alcanzar", "ja": "に到達できる", "zh": "可以得到"},
      "cannot be reached": {"fr": "ne peut pas être atteint", "es": "no se puede alcanzar", "ja": "には到達できない", "zh": "不能得到"},
      "positive": {"fr": "positifs", "es": "positivos", "ja": "正の", "zh": "正"},
      "and": {"fr": "et", "es": "y", "ja": "かつ", "zh": "且"},
      "denominators stay powers of": {"fr": "les dénominateurs restent des puissances de", "es": "los denominadores siguen siendo potencias de", "ja": "分母は次の累乗のまま：", "zh": "分母保持为下列数的幂"},
      "induct on the power of": {"fr": "récurrence sur la puissance de", "es": "inducción sobre la potencia de", "ja": "次の累乗について帰納法：", "zh": "对下列数的幂归纳"}
    },
    options: [
      { tex: "\\text{rationals}\\ >-2\\ \\text{with denominator a power of 2}", correct: true, why: {
        en: "$x>-2\\Rightarrow T(x)>-2$, and every such number can be built up from $0$.",
        fr: "$x>-2\\Rightarrow T(x)>-2$, et chaque tel nombre s’obtient à partir de $0$.",
        es: "$x>-2\\Rightarrow T(x)>-2$, y todo número así se construye desde $0$.",
        ja: "$x>-2$ なら $T(x)>-2$。そのような数はすべて $0$ から作れる。",
        zh: "$x>-2\\Rightarrow T(x)>-2$，且这类数都能从 $0$ 得到。"
      } },
      { tex: "-\\tfrac74\\ \\text{can be reached}", correct: true, why: {
        en: "$0\\xrightarrow{S}1\\xrightarrow{S}2\\xrightarrow{T}0\\xrightarrow{T}-1\\xrightarrow{T}-\\tfrac32\\xrightarrow{T}-\\tfrac74$",
        fr: "$0\\xrightarrow{S}1\\xrightarrow{S}2\\xrightarrow{T}0\\xrightarrow{T}-1\\xrightarrow{T}-\\tfrac32\\xrightarrow{T}-\\tfrac74$",
        es: "$0\\xrightarrow{S}1\\xrightarrow{S}2\\xrightarrow{T}0\\xrightarrow{T}-1\\xrightarrow{T}-\\tfrac32\\xrightarrow{T}-\\tfrac74$",
        ja: "$0\\xrightarrow{S}1\\xrightarrow{S}2\\xrightarrow{T}0\\xrightarrow{T}-1\\xrightarrow{T}-\\tfrac32\\xrightarrow{T}-\\tfrac74$",
        zh: "$0\\xrightarrow{S}1\\xrightarrow{S}2\\xrightarrow{T}0\\xrightarrow{T}-1\\xrightarrow{T}-\\tfrac32\\xrightarrow{T}-\\tfrac74$"
      } },
      { tex: "\\text{all positive rationals}", correct: false, why: {
        en: "$\\tfrac13$ is never reached: denominators are powers of $2$; and negatives are reached too.",
        fr: "$\\tfrac13$ n’est jamais atteint ; et des négatifs le sont.",
        es: "$\\tfrac13$ nunca se alcanza; y también salen negativos.",
        ja: "$\\tfrac13$ には届かず、負の数も出る。",
        zh: "$\\tfrac13$ 得不到，而且也能得到负数。"
      } },
      { tex: "\\text{all dyadic rationals}", correct: false, why: {
        en: "Nothing $\\le-2$ can be reached.",
        fr: "Rien de $\\le-2$ n’est atteint.",
        es: "Nada $\\le-2$ se alcanza.",
        ja: "$-2$ 以下には届かない。",
        zh: "得不到 $\\le-2$ 的数。"
      } },
      { tex: "\\text{rationals}\\ >-1\\ \\text{with denominator a power of 2}", correct: false, why: {
        en: "$T(0)=-1,\\ T(-1)=-\\tfrac32$",
        fr: "$T(0)=-1,\\ T(-1)=-\\tfrac32$",
        es: "$T(0)=-1,\\ T(-1)=-\\tfrac32$",
        ja: "$T(0)=-1,\\ T(-1)=-\\tfrac32$",
        zh: "$T(0)=-1,\\ T(-1)=-\\tfrac32$"
      } },
      { tex: "\\text{positive}\\ \\text{rationals}\\ \\text{with denominator a power of 2}", correct: false, why: {
        en: "$T(0)=-1$",
        fr: "$T(0)=-1$",
        es: "$T(0)=-1$",
        ja: "$T(0)=-1$",
        zh: "$T(0)=-1$"
      } },
      { tex: "-2\\ \\text{can be reached}", correct: false, why: {
        en: "$T(x)=-2$ needs $x=-2$: it is a fixed point you never land on.",
        fr: "$T(x)=-2$ exige $x=-2$ : point fixe jamais atteint.",
        es: "$T(x)=-2$ exige $x=-2$: punto fijo que nunca se alcanza.",
        ja: "$T(x)=-2$ には $x=-2$ が必要で、不動点に着くことはない。",
        zh: "$T(x)=-2$ 需 $x=-2$，这个不动点到不了。"
      } },
      { tex: "\\tfrac13\\ \\text{can be reached}", correct: false, why: {
        en: "Every value has a power of $2$ as denominator.",
        fr: "Toute valeur a une puissance de $2$ au dénominateur.",
        es: "Todo valor tiene una potencia de $2$ como denominador.",
        ja: "どの値も分母は2の累乗。",
        zh: "所有值的分母都是 $2$ 的幂。"
      } }
    ],
    steps: [
      {
        title: {
          en: "What stays true",
          fr: "Ce qui reste vrai",
          es: "Lo que se conserva",
          ja: "不変なこと",
          zh: "不变量"
        },
        lines: ["x>-2\\Rightarrow S(x)>-2,\\ T(x)>-2;\\quad \\text{denominators stay powers of}\\ 2"],
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
          en: "Everything allowed is reached",
          fr: "Tout ce qui est permis est atteint",
          es: "Se alcanza todo lo permitido",
          ja: "許されるものはすべて届く",
          zh: "允许的都能达到"
        },
        lines: ["y>-2\\ \\Rightarrow\\ y=T(2y+2),\\ \\ 2y+2>-2;\\ \\text{induct on the power of}\\ 2"],
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
