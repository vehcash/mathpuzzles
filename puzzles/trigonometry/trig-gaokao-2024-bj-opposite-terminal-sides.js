/* trigonometry · Terminal sides through the origin
   Gaokao 2024, Beijing paper (北京卷), Question 12 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-gaokao-2024-bj-opposite-terminal-sides",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, Beijing paper (北京卷), Question 12",
        fr: "Gaokao 2024, épreuve de Pékin (北京卷), question 12",
        es: "Gaokao 2024, examen de Pekín (北京卷), pregunta 12",
        ja: "2024年 中国・高考 北京卷 第12問",
        zh: "2024年高考数学北京卷 第12题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "Terminal sides through the origin",
      fr: "Côtés terminaux symétriques par l’origine",
      es: "Lados terminales simétricos respecto del origen",
      ja: "原点対称な動径",
      zh: "终边关于原点对称"
    },
    statement: {
      en: "Angles $\\alpha$ and $\\beta$ both start from $Ox$, and their terminal sides are symmetric about the origin. If $\\alpha\\in\\left[\\dfrac\\pi6,\\dfrac\\pi3\\right]$, <b>which of the following equal the maximum of $\\cos\\beta$?</b>",
      fr: "Les angles $\\alpha$ et $\\beta$ partent de $Ox$ et leurs côtés terminaux sont symétriques par rapport à l’origine. Si $\\alpha\\in\\left[\\dfrac\\pi6,\\dfrac\\pi3\\right]$, <b>lesquelles des valeurs suivantes sont égales au maximum de $\\cos\\beta$ ?</b>",
      es: "Los ángulos $\\alpha$ y $\\beta$ parten de $Ox$ y sus lados terminales son simétricos respecto del origen. Si $\\alpha\\in\\left[\\dfrac\\pi6,\\dfrac\\pi3\\right]$, <b>¿cuáles de los siguientes valores son iguales al máximo de $\\cos\\beta$?</b>",
      ja: "角 $\\alpha,\\beta$ の始線はともに $Ox$ で、動径は原点に関して対称です。$\\alpha\\in\\left[\\dfrac\\pi6,\\dfrac\\pi3\\right]$ のとき、<b>$\\cos\\beta$ の最大値に等しいものはどれですか？</b>",
      zh: "在平面直角坐标系中，角 $\\alpha$ 与角 $\\beta$ 均以 $Ox$ 为始边，终边关于原点对称。若 $\\alpha\\in\\left[\\dfrac\\pi6,\\dfrac\\pi3\\right]$，<b>下列哪些等于 $\\cos\\beta$ 的最大值？</b>"
    },
    figureText: {
      en: "A unit circle with the sector of possible terminal sides of α, from 30° to 60°.",
      fr: "Un cercle unité avec le secteur des côtés terminaux possibles de α, de 30° à 60°.",
      es: "Una circunferencia unidad con el sector de lados terminales posibles de α, de 30° a 60°.",
      ja: "α の動径がとりうる 30° から 60° の扇形を描いた単位円。",
      zh: "单位圆上 α 终边可能所在的扇形，30° 到 60°。"
    },
    hint: {
      en: "Symmetric about the origin means $\\beta=\\alpha+\\pi+2k\\pi$, so $\\cos\\beta=-\\cos\\alpha$.",
      fr: "Symétrique par l’origine : $\\beta=\\alpha+\\pi+2k\\pi$, donc $\\cos\\beta=-\\cos\\alpha$.",
      es: "Simétrico respecto del origen: $\\beta=\\alpha+\\pi+2k\\pi$, así que $\\cos\\beta=-\\cos\\alpha$.",
      ja: "原点対称なので $\\beta=\\alpha+\\pi+2k\\pi$、$\\cos\\beta=-\\cos\\alpha$。",
      zh: "关于原点对称即 $\\beta=\\alpha+\\pi+2k\\pi$，故 $\\cos\\beta=-\\cos\\alpha$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.0, h: 3.0, scale: 80, pad: 16 });
      const T = F.T = axes(F, -1.4, 1.6, -1.4, 1.6);
      { const cx = 0, cy = 0, r = 1, cls = 'seg thin'; const C = []; for (let k = 0; k <= 72; k++) { const t = k * Math.PI / 36; C.push(T([cx + r * Math.cos(t), cy + r * Math.sin(t)])); } F.path(C, cls, 'base', true); }
      const sec = (a0, a1, cls) => { const p = [T([0, 0])]; for (let k = 0; k <= 20; k++) { const t = a0 + (a1 - a0) * k / 20; p.push(T([Math.cos(t), Math.sin(t)])); } F.path(p, cls, 'fills', true); };
      sec(Math.PI / 6, Math.PI / 3, 'fill-yellow'); F.text(T([0.75, 0.75]), 'α', 'pt', 10, -6);
      F.reveal = () => {
      sec(7 * Math.PI / 6, 4 * Math.PI / 3, 'fill-pink'); F.text(T([-0.75, -0.75]), 'β', 'pt', -10, 8);
      F.seg(T([-0.5, -Math.sqrt(3) / 2]), T([-0.5, 0]), 'seg thin dashc'); F.text(T([-0.5, 0]), '−½', 'len small', 0, -10);
      };
      return F;
    },
    options: [
      { tex: "-\\tfrac12", correct: true, why: {
        en: "$\\cos\\beta=-\\cos\\alpha$ is largest when $\\cos\\alpha$ is smallest, at $\\alpha=\\tfrac\\pi3$.",
        fr: "$\\cos\\beta=-\\cos\\alpha$ est maximal quand $\\cos\\alpha$ est minimal, en $\\alpha=\\tfrac\\pi3$.",
        es: "$\\cos\\beta=-\\cos\\alpha$ es máximo cuando $\\cos\\alpha$ es mínimo, en $\\alpha=\\tfrac\\pi3$.",
        ja: "$\\cos\\beta=-\\cos\\alpha$ は $\\cos\\alpha$ が最小の $\\alpha=\\tfrac\\pi3$ で最大。",
        zh: "$\\cos\\beta=-\\cos\\alpha$ 在 $\\cos\\alpha$ 最小即 $\\alpha=\\tfrac\\pi3$ 时最大。"
      } },
      { tex: "\\cos\\tfrac{2\\pi}{3}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "-\\tfrac{\\sqrt3}2", correct: false, why: {
        en: "That is the minimum, at $\\alpha=\\tfrac\\pi6$.",
        fr: "C’est le minimum, en $\\alpha=\\tfrac\\pi6$.",
        es: "Es el mínimo, en $\\alpha=\\tfrac\\pi6$.",
        ja: "最小値（$\\alpha=\\tfrac\\pi6$）。",
        zh: "那是最小值（$\\alpha=\\tfrac\\pi6$）。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "That is the smallest $\\cos\\alpha$, without the minus sign.",
        fr: "C’est le plus petit $\\cos\\alpha$, sans le signe moins.",
        es: "Es el menor $\\cos\\alpha$, sin el signo menos.",
        ja: "最小の $\\cos\\alpha$ で、マイナスがない。",
        zh: "那是最小的 $\\cos\\alpha$，少了负号。"
      } },
      { tex: "\\tfrac{\\sqrt3}2", correct: false, why: {
        en: "That is the largest $\\cos\\alpha$.",
        fr: "C’est le plus grand $\\cos\\alpha$.",
        es: "Es el mayor $\\cos\\alpha$.",
        ja: "最大の $\\cos\\alpha$。",
        zh: "那是最大的 $\\cos\\alpha$。"
      } },
      { tex: "0", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "1", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "-1", correct: false, why: {
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
          en: "Opposite rays",
          fr: "Demi-droites opposées",
          es: "Semirrectas opuestas",
          ja: "反対向きの動径",
          zh: "相反射线"
        },
        lines: ["\\beta=\\alpha+\\pi+2k\\pi\\ \\Rightarrow\\ \\cos\\beta=-\\cos\\alpha"],
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
          en: "Maximise",
          fr: "Maximiser",
          es: "Maximizar",
          ja: "最大化",
          zh: "求最大"
        },
        lines: ["\\cos\\alpha\\in\\left[\\tfrac12,\\tfrac{\\sqrt3}2\\right]\\ \\Rightarrow\\ \\max\\cos\\beta=\\boxed{-\\tfrac12}"],
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
