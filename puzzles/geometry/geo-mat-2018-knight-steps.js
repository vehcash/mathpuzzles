/* geometry · Steps of (2, 1) and (1, 2)
   Oxford MAT 2018 (Mathematics Admissions Test), Question 1F */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-mat-2018-knight-steps",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2018 (Mathematics Admissions Test), Question 1F",
        fr: "MAT d’Oxford 2018 (test d’admission en mathématiques), question 1F",
        es: "MAT de Oxford 2018 (prueba de admisión de matemáticas), pregunta 1F",
        ja: "オックスフォード大学 数学入学試験 MAT 2018 問題 1F",
        zh: "牛津大学数学入学考试 MAT 2018 第 1F 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "Steps of (2, 1) and (1, 2)",
      fr: "Des pas (2, 1) et (1, 2)",
      es: "Pasos (2, 1) y (1, 2)",
      ja: "(2, 1) と (1, 2) の歩み",
      zh: "(2, 1) 与 (1, 2) 的步伐"
    },
    statement: {
      en: "Starting at the origin, a point may repeatedly move by $(2,1)$ or by $(1,2)$. <b>Which of the following equal the smallest possible distance from the point to $(25,75)$?</b>",
      fr: "Partant de l’origine, un point peut se déplacer de façon répétée de $(2,1)$ ou de $(1,2)$. <b>Lesquelles des valeurs suivantes sont égales à la plus petite distance possible entre le point et $(25,75)$ ?</b>",
      es: "Desde el origen, un punto puede moverse repetidamente $(2,1)$ o $(1,2)$. <b>¿Cuáles de los siguientes valores son iguales a la menor distancia posible del punto a $(25,75)$?</b>",
      ja: "原点から出発し、点は何度でも $(2,1)$ または $(1,2)$ だけ動けます。<b>点と $(25,75)$ の距離の最小値に等しいものはどれですか？</b>",
      zh: "从原点出发，点每次可移动 $(2,1)$ 或 $(1,2)$。<b>点与 $(25,75)$ 的最小可能距离等于下列哪些？</b>"
    },
    figureText: {
      en: "The two allowed steps (2, 1) and (1, 2) from the origin, and the target (25, 75). The reachable region is drawn in the solution.",
      fr: "Les deux pas permis (2, 1) et (1, 2) depuis l’origine, et la cible (25, 75). La région atteignable est tracée dans la solution.",
      es: "Los dos pasos permitidos (2, 1) y (1, 2) desde el origen, y el objetivo (25, 75). La región alcanzable se dibuja en la solución.",
      ja: "原点からの2つの歩み (2, 1)、(1, 2) と目標 (25, 75)。到達できる範囲は解答で描きます。",
      zh: "从原点出发的两种步伐 (2, 1)、(1, 2) 与目标 (25, 75)。可到达区域在解答中画出。"
    },
    hint: {
      en: "After $a$ moves of $(2,1)$ and $b$ of $(1,2)$ the point is $(2a+b,\\,a+2b)$, so it never goes above $y=2x$. Look along that edge.",
      fr: "Après $a$ pas $(2,1)$ et $b$ pas $(1,2)$, le point est en $(2a+b,\\,a+2b)$ : jamais au-dessus de $y=2x$. Cherchez sur ce bord.",
      es: "Tras $a$ pasos $(2,1)$ y $b$ pasos $(1,2)$, el punto está en $(2a+b,\\,a+2b)$: nunca por encima de $y=2x$. Busca en ese borde.",
      ja: "$(2,1)$ を $a$ 回、$(1,2)$ を $b$ 回で $(2a+b,\\,a+2b)$。$y=2x$ より上には行かない。その辺で探す。",
      zh: "走 $a$ 次 $(2,1)$、$b$ 次 $(1,2)$ 后点为 $(2a+b,\\,a+2b)$，永远不超过 $y=2x$。沿该边找。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 4.4, scale: 46, pad: 18 });
      const T = F.T = axes(F, -0.3, 4.1, -0.3, 4.1);
      const k = 0.05;
      arrow(F, T([0, 0]), T([2 * k * 6, 1 * k * 6])); arrow(F, T([0, 0]), T([1 * k * 6, 2 * k * 6]));
      F.text(T([0.6, 0.3]), '(2, 1)', 'len small', 24, 6); F.text(T([0.3, 0.6]), '(1, 2)', 'len small', -24, -4);
      F.dot(T([25 * k, 75 * k])); F.text(T([25 * k, 75 * k]), '(25, 75)', 'len small', 34, -8);
      F.reveal = () => {
      F.path([T([0, 0]), T([2.0, 4.0]), T([4.0, 4.0]), T([4.0, 2.0])], 'fill-blue', 'fills');
      F.seg(T([0, 0]), T([2.0, 4.0]), 'seg'); F.seg(T([0, 0]), T([4.0, 2.0]), 'seg');
      F.dot(T([35 * k, 70 * k])); F.text(T([35 * k, 70 * k]), '(35, 70)', 'len small', 34, 4);
      F.seg(T([25 * k, 75 * k]), T([35 * k, 70 * k]), 'hl pink');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "look on": {"fr": "chercher sur", "es": "buscar en", "ja": "辺上で探す：", "zh": "在此线上找："},
      "least at": {"fr": "minimal en", "es": "mínimo en", "ja": "の最小は", "zh": "最小于"}
    },
    options: [
      { tex: "5\\sqrt5", correct: true, why: {
        en: "$|(35,70)-(25,75)|=\\sqrt{100+25}$.",
        fr: "$|(35,70)-(25,75)|=\\sqrt{100+25}$.",
        es: "$|(35,70)-(25,75)|=\\sqrt{100+25}$.",
        ja: "$|(35,70)-(25,75)|=\\sqrt{100+25}$.",
        zh: "$|(35,70)-(25,75)|=\\sqrt{100+25}$."
      } },
      { tex: "\\sqrt{125}", correct: true, why: {
        en: "The same number.",
        fr: "Le même nombre.",
        es: "El mismo número.",
        ja: "同じ数。",
        zh: "同一个数。"
      } },
      { tex: "0", correct: false, why: {
        en: "$(25,75)$ has $y>2x$: unreachable.",
        fr: "$(25,75)$ vérifie $y>2x$ : inatteignable.",
        es: "$(25,75)$ cumple $y>2x$: inalcanzable.",
        ja: "$(25,75)$ は $y>2x$ で到達不能。",
        zh: "$(25,75)$ 满足 $y>2x$，不可到达。"
      } },
      { tex: "\\sqrt{130}", correct: false, why: {
        en: "$(34,68)$ is on the edge but farther.",
        fr: "$(34,68)$ est sur le bord mais plus loin.",
        es: "$(34,68)$ está en el borde pero más lejos.",
        ja: "$(34,68)$ は辺上だが遠い。",
        zh: "$(34,68)$ 在边上但更远。"
      } },
      { tex: "5\\sqrt{10}", correct: false, why: {
        en: "Too big: $(35,70)$ is closer.",
        fr: "Trop grand.",
        es: "Demasiado grande.",
        ja: "大きすぎ。",
        zh: "太大。"
      } },
      { tex: "\\sqrt{5}", correct: false, why: {
        en: "Would need a reachable point next to the target.",
        fr: "Il faudrait un point atteignable voisin de la cible.",
        es: "Haría falta un punto alcanzable junto al objetivo.",
        ja: "目標のすぐ隣に到達点が必要。",
        zh: "需要紧挨目标的可到达点。"
      } },
      { tex: "25", correct: false, why: {
        en: "Distance to $(25,50)$, which is not reachable either ($75\\not\\equiv0\\pmod3$).",
        fr: "Distance à $(25,50)$, qui n’est pas atteignable ($75\\not\\equiv0\\pmod3$).",
        es: "Distancia a $(25,50)$, tampoco alcanzable ($75\\not\\equiv0\\pmod3$).",
        ja: "$(25,50)$ までの距離。そこも到達不能（$75\\not\\equiv0\\pmod3$）。",
        zh: "到 $(25,50)$ 的距离，它也不可达（$75\\not\\equiv0\\pmod3$）。"
      } },
      { tex: "10", correct: false, why: {
        en: "$(35,75)$ is not reachable: $110\\not\\equiv0\\pmod3$.",
        fr: "$(35,75)$ n’est pas atteignable : $110\\not\\equiv0\\pmod3$.",
        es: "$(35,75)$ no es alcanzable: $110\\not\\equiv0\\pmod3$.",
        ja: "$(35,75)$ は到達不能：$110\\not\\equiv0\\pmod3$。",
        zh: "$(35,75)$ 不可达：$110\\not\\equiv0\\pmod3$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Reachable points",
          fr: "Points atteignables",
          es: "Puntos alcanzables",
          ja: "到達できる点",
          zh: "可到达的点"
        },
        lines: ["(2a+b,\\,a+2b),\\ a,b\\ge0\\iff \\tfrac x2\\le y\\le2x,\\ 3\\mid x+y"],
        note: {
          en: "Solve for $a=\\tfrac{2x-y}{3}$, $b=\\tfrac{2y-x}{3}$: both must be non-negative integers.",
          fr: "On résout $a=\\tfrac{2x-y}{3}$, $b=\\tfrac{2y-x}{3}$ : entiers positifs ou nuls.",
          es: "Se despeja $a=\\tfrac{2x-y}{3}$, $b=\\tfrac{2y-x}{3}$: enteros no negativos.",
          ja: "$a=\\tfrac{2x-y}{3}$, $b=\\tfrac{2y-x}{3}$ が非負整数。",
          zh: "解得 $a=\\tfrac{2x-y}{3}$、$b=\\tfrac{2y-x}{3}$ 须为非负整数。"
        }
      },
      {
        title: {
          en: "The target is outside",
          fr: "La cible est dehors",
          es: "El objetivo queda fuera",
          ja: "目標は外側",
          zh: "目标在外"
        },
        lines: ["75>2\\cdot25\\;\\Rightarrow\\;\\text{look on } y=2x:\\ (t,2t),\\ 3\\mid3t"],
        note: {
          en: "Every point $(t,2t)$ with $t\\ge0$ is reachable (use $t$ moves of $(1,2)$).",
          fr: "Tout point $(t,2t)$, $t\\ge0$, est atteignable ($t$ pas $(1,2)$).",
          es: "Todo punto $(t,2t)$, $t\\ge0$, es alcanzable ($t$ pasos $(1,2)$).",
          ja: "$(t,2t)$ は $(1,2)$ を $t$ 回で到達。",
          zh: "$(t,2t)$ 用 $t$ 次 $(1,2)$ 即可到达。"
        }
      },
      {
        title: {
          en: "Minimise on the edge",
          fr: "Minimiser sur le bord",
          es: "Minimizar en el borde",
          ja: "辺上で最小化",
          zh: "在边上求最小"
        },
        lines: ["(t-25)^2+(2t-75)^2\\ \\text{least at}\\ t=35:\\ \\ 100+25=125\\;\\Rightarrow\\;\\boxed{5\\sqrt5}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "The foot of the perpendicular is exactly $(35,70)$, an integer point.",
          fr: "Le pied de la perpendiculaire est exactement $(35,70)$, point entier.",
          es: "El pie de la perpendicular es exactamente $(35,70)$, punto entero.",
          ja: "垂線の足はちょうど整数点 $(35,70)$。",
          zh: "垂足恰为整点 $(35,70)$。"
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
