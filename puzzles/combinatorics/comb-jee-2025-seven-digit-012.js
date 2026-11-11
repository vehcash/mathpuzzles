/* combinatorics · Seven-digit numbers from 0, 1, 2
   JEE Advanced 2025 (India), Paper 1, Mathematics Q.10 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-jee-2025-seven-digit-012",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2025 (India), Paper 1, Mathematics Q.10",
        fr: "JEE Advanced 2025 (Inde), épreuve 1, mathématiques Q.10",
        es: "JEE Advanced 2025 (India), prueba 1, matemáticas Q.10",
        ja: "JEE Advanced 2025（インド工科大学入試）Paper 1 数学 Q.10",
        zh: "印度理工学院入学考试 JEE Advanced 2025 卷一 数学 Q.10"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "Seven-digit numbers from 0, 1, 2",
      fr: "Nombres à sept chiffres avec 0, 1, 2",
      es: "Números de siete cifras con 0, 1, 2",
      ja: "0, 1, 2 でつくる7桁の数",
      zh: "由 0、1、2 组成的七位数"
    },
    statement: {
      en: "$S$ is the set of seven-digit numbers using only the digits $0,1,2$ (the first digit is not $0$). <b>Which of the following equal the number of $x\\in S$ in which at least one of the digits $0$ and $1$ appears exactly twice?</b>",
      fr: "$S$ est l’ensemble des nombres à sept chiffres n’utilisant que $0,1,2$ (le premier chiffre n’est pas $0$). <b>Lesquelles des valeurs suivantes sont égales au nombre de $x\\in S$ dans lesquels au moins un des chiffres $0$ et $1$ apparaît exactement deux fois ?</b>",
      es: "$S$ es el conjunto de números de siete cifras con solo los dígitos $0,1,2$ (la primera cifra no es $0$). <b>¿Cuáles de los siguientes valores son iguales al número de $x\\in S$ en los que al menos uno de los dígitos $0$ y $1$ aparece exactamente dos veces?</b>",
      ja: "$S$ は数字 $0,1,2$ だけでつくる7桁の数（先頭は $0$ でない）の集合です。<b>数字 $0$ と $1$ の少なくとも一方がちょうど2回現れる $x\\in S$ の個数に等しいものはどれですか？</b>",
      zh: "$S$ 为仅用数字 $0,1,2$ 组成的七位数（首位非 $0$）的集合。<b>$0$ 与 $1$ 中至少有一个恰好出现两次的 $x\\in S$ 的个数等于下列哪些？</b>"
    },
    figureText: {
      en: "Seven boxes for the digits, the first one marked “1 or 2”.",
      fr: "Sept cases pour les chiffres, la première marquée « 1 ou 2 ».",
      es: "Siete casillas para las cifras, la primera marcada «1 o 2».",
      ja: "7桁の箱。先頭は「1 か 2」。",
      zh: "七个数位方框，首位标“1 或 2”。"
    },
    hint: {
      en: "Inclusion–exclusion: $|A|+|B|-|A\\cap B|$ with $A$ = “exactly two $0$s”, $B$ = “exactly two $1$s”. Handle the leading digit carefully.",
      fr: "Inclusion–exclusion : $|A|+|B|-|A\\cap B|$ avec $A$ = « exactement deux $0$ », $B$ = « exactement deux $1$ ». Attention au premier chiffre.",
      es: "Inclusión–exclusión: $|A|+|B|-|A\\cap B|$ con $A$ = «exactamente dos $0$», $B$ = «exactamente dos $1$». Cuidado con la primera cifra.",
      ja: "包除原理 $|A|+|B|-|A\\cap B|$（$A$：$0$ がちょうど2個、$B$：$1$ がちょうど2個）。先頭に注意。",
      zh: "容斥：$|A|+|B|-|A\\cap B|$，$A$=“恰两个 $0$”，$B$=“恰两个 $1$”，注意首位。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.6, h: 1.6, scale: 50, pad: 16 });
      for (let k = 0; k < 7; k++) { F.rect(0.2 + k * 0.9, 0.4, 0.8, 0.8, k === 0 ? 'fill-yellow' : 'fill-blue', 'fills'); }
      F.text([0.6, 0.4], '1 / 2', 'len small', 0, 14);
      F.reveal = () => {
      F.text([3.3, 1.5], '|A| + |B| − |A ∩ B|', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "first": {"fr": "premier", "es": "primera", "ja": "先頭", "zh": "首位"},
      "1 / 2": {"fr": "1 / 2", "es": "1 / 2", "ja": "1 / 2", "zh": "1 / 2"},
      "|A| + |B| − |A ∩ B|": {"fr": "|A| + |B| − |A ∩ B|", "es": "|A| + |B| − |A ∩ B|", "ja": "|A| + |B| − |A ∩ B|", "zh": "|A| + |B| − |A ∩ B|"}
    },
    options: [
      { tex: "762", correct: true, why: {
        en: "$|A|=480$, $|B|=432$, $|A\\cap B|=150$.",
        fr: "$|A|=480$, $|B|=432$, $|A\\cap B|=150$.",
        es: "$|A|=480$, $|B|=432$, $|A\\cap B|=150$.",
        ja: "$|A|=480$、$|B|=432$、$|A\\cap B|=150$。",
        zh: "$|A|=480$，$|B|=432$，$|A\\cap B|=150$。"
      } },
      { tex: "480+432-150", correct: true, why: {
        en: "The same count, term by term.",
        fr: "Le même compte, terme à terme.",
        es: "El mismo recuento, término a término.",
        ja: "同じ計算を項ごとに。",
        zh: "同一计数，逐项写出。"
      } },
      { tex: "912", correct: false, why: {
        en: "That forgets to subtract $|A\\cap B|$.",
        fr: "Cela oublie de retirer $|A\\cap B|$.",
        es: "Olvida restar $|A\\cap B|$.",
        ja: "$|A\\cap B|$ を引き忘れている。",
        zh: "忘了减去 $|A\\cap B|$。"
      } },
      { tex: "1458", correct: false, why: {
        en: "That is all of $S$: $2\\cdot3^6$.",
        fr: "C’est tout $S$ : $2\\cdot3^6$.",
        es: "Es todo $S$: $2\\cdot3^6$.",
        ja: "$S$ 全体 $2\\cdot3^6$。",
        zh: "那是 $S$ 的全部：$2\\cdot3^6$。"
      } },
      { tex: "150", correct: false, why: {
        en: "That is $|A\\cap B|$ only.",
        fr: "C’est seulement $|A\\cap B|$.",
        es: "Es solo $|A\\cap B|$.",
        ja: "$|A\\cap B|$ だけ。",
        zh: "那只是 $|A\\cap B|$。"
      } },
      { tex: "840", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "612", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "780", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Exactly two 0s",
          fr: "Exactement deux 0",
          es: "Exactamente dos 0",
          ja: "0 がちょうど2個",
          zh: "恰两个 0"
        },
        lines: ["|A|=\\underbrace{2}_{\\text{first}}\\cdot\\binom62\\cdot2^4=480"],
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
          en: "Exactly two 1s",
          fr: "Exactement deux 1",
          es: "Exactamente dos 1",
          ja: "1 がちょうど2個",
          zh: "恰两个 1"
        },
        lines: ["|B|=\\underbrace{6\\cdot2^5}_{\\text{first}=1}+\\underbrace{\\binom62\\cdot2^4}_{\\text{first}=2}=192+240=432"],
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
          en: "Both, then combine",
          fr: "Les deux, puis combiner",
          es: "Ambos y combinar",
          ja: "両方、そしてまとめる",
          zh: "两者同时，再合并"
        },
        lines: ["|A\\cap B|=\\underbrace{6\\cdot\\binom52}_{\\text{first}=1}+\\underbrace{\\binom62\\binom42}_{\\text{first}=2}=60+90=150", "480+432-150=\\boxed{762}"],
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
          en: "Two options are the same number.",
          fr: "Deux options sont le même nombre.",
          es: "Dos opciones son el mismo número.",
          ja: "2つの選択肢は同じ数です。",
          zh: "有两个选项是同一个数。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
