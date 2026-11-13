/* geometry · Integer triangle with one angle twice another
   AMC 12B 2024 (Mathematical Association of America), Problem 22 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-amc-2024-one-angle-twice-another",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12B 2024 (Mathematical Association of America), Problem 22",
        fr: "AMC 12B 2024 (Mathematical Association of America), problème 22",
        es: "AMC 12B 2024 (Mathematical Association of America), problema 22",
        ja: "AMC 12B 2024（アメリカ数学協会）第22問",
        zh: "AMC 12B 2024（美国数学协会）第 22 题"
      },
      exams: ["amc"]
    },
    difficulty: 3,
    title: {
      en: "Integer triangle with one angle twice another",
      fr: "Triangle entier dont un angle est le double d’un autre",
      es: "Triángulo entero con un ángulo doble de otro",
      ja: "1つの角が他の2倍の整数辺三角形",
      zh: "一角是另一角两倍的整数边三角形"
    },
    statement: {
      en: "Triangle $ABC$ has integer sides and $\\angle B=2\\angle A$. <b>Which of the following are true?</b>",
      fr: "Le triangle $ABC$ a des côtés entiers et $\\angle B=2\\angle A$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "El triángulo $ABC$ tiene lados enteros y $\\angle B=2\\angle A$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "三角形 $ABC$ は辺が整数で $\\angle B=2\\angle A$。<b>次のうち正しいものはどれですか？</b>",
      zh: "三角形 $ABC$ 边长为整数，$\\angle B=2\\angle A$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A triangle with the angle at B marked as twice the angle at A.",
      fr: "Un triangle dont l’angle en B est marqué comme double de celui en A.",
      es: "Un triángulo con el ángulo en B marcado como el doble del de A.",
      ja: "B の角が A の角の2倍と印された三角形。",
      zh: "标出 B 角为 A 角两倍的三角形。"
    },
    hint: {
      en: "$\\angle B=2\\angle A$ is equivalent to $b^2=a(a+c)$, with $a=BC$, $b=CA$, $c=AB$. Also $A<60^\\circ$.",
      fr: "$\\angle B=2\\angle A$ équivaut à $b^2=a(a+c)$, avec $a=BC$, $b=CA$, $c=AB$. Et $A<60^\\circ$.",
      es: "$\\angle B=2\\angle A$ equivale a $b^2=a(a+c)$, con $a=BC$, $b=CA$, $c=AB$. Además $A<60^\\circ$.",
      ja: "$\\angle B=2\\angle A\\iff b^2=a(a+c)$（$a=BC$、$b=CA$、$c=AB$）。$A<60^\\circ$。",
      zh: "$\\angle B=2\\angle A$ 等价于 $b^2=a(a+c)$，其中 $a=BC$，$b=CA$，$c=AB$；且 $A<60^\\circ$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 3.6, scale: 60, pad: 16 });
      const A = [0.3, 0.3], B = [0.3 + 5 * 0.75, 0.3]; const ang = Math.acos(3 / 4), C = [B[0] - 4 * 0.75 * Math.cos(2 * ang), 0.3 + 4 * 0.75 * Math.sin(2 * ang)];
      F.path([A, B, C], 'graph', 'base', true);
      [[A, 'A', -10, 12], [B, 'B', 10, 12], [C, 'C', 0, -10]].forEach(([p, t, dx, dy]) => F.text(p, t, 'pt', dx, dy));
      F.text(A, 'α', 'pt', 30, -8); F.text(B, '2α', 'pt', -32, -10);
      F.reveal = () => {
      F.text([2.2, 0.3], '5', 'len small', 0, 14); F.text([(B[0] + C[0]) / 2, (B[1] + C[1]) / 2], '4', 'len small', 12, 0); F.text([(A[0] + C[0]) / 2, (A[1] + C[1]) / 2], '6', 'len small', -12, -4);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "α": {"fr": "α", "es": "α", "ja": "α", "zh": "α"},
      "2α": {"fr": "2α", "es": "2α", "ja": "2α", "zh": "2α"},
      "5": {"fr": "5", "es": "5", "ja": "5", "zh": "5"},
      "4": {"fr": "4", "es": "4", "ja": "4", "zh": "4"},
      "6": {"fr": "6", "es": "6", "ja": "6", "zh": "6"},
      "the least perimeter is": {"fr": "le plus petit périmètre est", "es": "el menor perímetro es", "ja": "周の長さの最小値は", "zh": "最小周长为"},
      "in that triangle": {"fr": "dans ce triangle", "es": "en ese triángulo", "ja": "（その三角形で）", "zh": "（在该三角形中）"},
      "works": {"fr": "convient", "es": "funciona", "ja": "は条件を満たす", "zh": "满足"},
      "has": {"fr": "a", "es": "tiene", "ja": "で", "zh": "满足"},
      "a 3-4-5 triangle has": {"fr": "un triangle 3-4-5 a", "es": "un triángulo 3-4-5 tiene", "ja": "3-4-5 の三角形は", "zh": "3-4-5 三角形满足"}
    },
    options: [
      { tex: "\\text{the least perimeter is}\\ 15", correct: true, why: {
        en: "Sides $a=4$, $c=5$, $b=6$: $36=4\\cdot9$.",
        fr: "Côtés $a=4$, $c=5$, $b=6$ : $36=4\\cdot9$.",
        es: "Lados $a=4$, $c=5$, $b=6$: $36=4\\cdot9$.",
        ja: "$a=4$、$c=5$、$b=6$：$36=4\\cdot9$。",
        zh: "边 $a=4$、$c=5$、$b=6$：$36=4\\cdot9$。"
      } },
      { tex: "\\cos A=\\tfrac34\\ \\text{in that triangle}", correct: true, why: {
        en: "$\\cos A=\\dfrac{b}{2a}=\\dfrac68$",
        fr: "$\\cos A=\\dfrac{b}{2a}=\\dfrac68$",
        es: "$\\cos A=\\dfrac{b}{2a}=\\dfrac68$",
        ja: "$\\cos A=\\dfrac{b}{2a}=\\dfrac68$",
        zh: "$\\cos A=\\dfrac{b}{2a}=\\dfrac68$"
      } },
      { tex: "\\text{the least perimeter is}\\ 13", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the least perimeter is}\\ 14", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the least perimeter is}\\ 16", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "(a,b,c)=(1,\\sqrt2,1)\\ \\text{works}", correct: false, why: {
        en: "That is the right isosceles triangle, but $\\sqrt2$ is not an integer.",
        fr: "C’est le triangle rectangle isocèle, mais $\\sqrt2$ n’est pas entier.",
        es: "Es el rectángulo isósceles, pero $\\sqrt2$ no es entero.",
        ja: "直角二等辺三角形だが $\\sqrt2$ は整数でない。",
        zh: "那是等腰直角三角形，但 $\\sqrt2$ 不是整数。"
      } },
      { tex: "(a,b,c)=(4,6,5)\\ \\text{has}\\ \\angle A=2\\angle B", correct: false, why: {
        en: "It is the other way round: the larger angle $B$ is twice $A$.",
        fr: "C’est l’inverse : le plus grand angle $B$ vaut le double de $A$.",
        es: "Es al revés: el ángulo mayor $B$ es el doble de $A$.",
        ja: "逆で、大きい角 $B$ が $A$ の2倍。",
        zh: "反了：较大的角 $B$ 是 $A$ 的两倍。"
      } },
      { tex: "\\text{a 3-4-5 triangle has}\\ \\angle B=2\\angle A", correct: false, why: {
        en: "$b^2=a(a+c)$: $16\\ne3\\cdot8$",
        fr: "$b^2=a(a+c)$: $16\\ne3\\cdot8$",
        es: "$b^2=a(a+c)$: $16\\ne3\\cdot8$",
        ja: "$b^2=a(a+c)$: $16\\ne3\\cdot8$",
        zh: "$b^2=a(a+c)$: $16\\ne3\\cdot8$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Condition",
          fr: "Condition",
          es: "Condición",
          ja: "条件",
          zh: "条件"
        },
        lines: ["\\angle B=2\\angle A\\iff b^2=a(a+c)"],
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
          en: "Smallest case",
          fr: "Plus petit cas",
          es: "Caso más pequeño",
          ja: "最小の場合",
          zh: "最小情形"
        },
        lines: ["a=4,\\ a+c=9:\\ b^2=36\\Rightarrow(4,6,5),\\ 4+5+6=15"],
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
