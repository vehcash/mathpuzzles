/* algebra · When two parabolas meet twice
   Oxford MAT 2018 (Mathematics Admissions Test), Question 1C */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2018-two-parabolas-meet",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2018 (Mathematics Admissions Test), Question 1C",
        fr: "MAT d’Oxford 2018 (test d’admission en mathématiques), question 1C",
        es: "MAT de Oxford 2018 (prueba de admisión de matemáticas), pregunta 1C",
        ja: "オックスフォード大学 数学入学試験 MAT 2018 問題 1C",
        zh: "牛津大学数学入学考试 MAT 2018 第 1C 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "When two parabolas meet twice",
      fr: "Quand deux paraboles se coupent deux fois",
      es: "Cuándo dos parábolas se cortan dos veces",
      ja: "2つの放物線が2点で交わる条件",
      zh: "两条抛物线交于两点的条件"
    },
    statement: {
      en: "<b>Which of the following conditions make the curves $y=ax^2+c$ and $y=bx^2+d$ meet at exactly two points?</b>",
      fr: "<b>Lesquelles des conditions suivantes font que les courbes $y=ax^2+c$ et $y=bx^2+d$ se coupent en exactement deux points ?</b>",
      es: "<b>¿Cuáles de las siguientes condiciones hacen que las curvas $y=ax^2+c$ e $y=bx^2+d$ se corten en exactamente dos puntos?</b>",
      ja: "<b>曲線 $y=ax^2+c$ と $y=bx^2+d$ がちょうど2点で交わる条件はどれですか？</b>",
      zh: "<b>下列哪些条件能使曲线 $y=ax^2+c$ 与 $y=bx^2+d$ 恰好交于两点？</b>"
    },
    figureText: {
      en: "Two parabolas with vertices on the y-axis: a narrow one starting lower and a wide one starting higher cross at two points symmetric about the y-axis.",
      fr: "Deux paraboles de sommets sur l’axe des y : une étroite partant plus bas et une large partant plus haut se coupent en deux points symétriques.",
      es: "Dos parábolas con vértice en el eje y: una estrecha que empieza más abajo y una ancha que empieza más arriba se cortan en dos puntos simétricos.",
      ja: "頂点が y 軸上の2つの放物線。低い位置から始まる細い方と高い位置から始まる広い方が、y 軸対称な2点で交わる。",
      zh: "两条顶点在 y 轴上的抛物线：较窄、起点较低的与较宽、起点较高的交于关于 y 轴对称的两点。"
    },
    hint: {
      en: "Subtract: $(a-b)x^2=d-c$. When does this have exactly two real solutions?",
      fr: "Soustrayez : $(a-b)x^2=d-c$. Quand y a-t-il exactement deux solutions réelles ?",
      es: "Resta: $(a-b)x^2=d-c$. ¿Cuándo tiene exactamente dos soluciones reales?",
      ja: "引くと $(a-b)x^2=d-c$。実数解がちょうど2つになるのは？",
      zh: "相减得 $(a-b)x^2=d-c$。何时恰有两个实数解？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 4.0, scale: 50, pad: 18 });
      const T = F.T = axes(F, -2.2, 2.2, -0.8, 3.2);
      plot(F, T, x => 2 * x * x - 0.5, -1.4, 1.4, 'graph', 'base', -0.8, 3.2);
      plot(F, T, x => 0.4 * x * x + 1, -2.1, 2.1, 'graph', 'base', -0.8, 3.2);
      const r = Math.sqrt(1.5 / 1.6); F.dot(T([r, 0.4 * r * r + 1])); F.dot(T([-r, 0.4 * r * r + 1]));
      return F;
    },
    options: [
      { tex: "(a-b)(d-c)>0", correct: true, why: {
        en: "Then $x^2=\\tfrac{d-c}{a-b}>0$ gives $x=\\pm\\sqrt{\\cdot}$.",
        fr: "Then $x^2=\\tfrac{d-c}{a-b}>0$ gives $x=\\pm\\sqrt{\\cdot}$.",
        es: "Then $x^2=\\tfrac{d-c}{a-b}>0$ gives $x=\\pm\\sqrt{\\cdot}$.",
        ja: "Then $x^2=\\tfrac{d-c}{a-b}>0$ gives $x=\\pm\\sqrt{\\cdot}$.",
        zh: "Then $x^2=\\tfrac{d-c}{a-b}>0$ gives $x=\\pm\\sqrt{\\cdot}$."
      } },
      { tex: "\\frac{d-c}{a-b}>0", correct: true, why: {
        en: "The same condition, written as a quotient.",
        fr: "La même condition, écrite comme un quotient.",
        es: "La misma condición, escrita como cociente.",
        ja: "同じ条件を商で書いたもの。",
        zh: "同一条件写成商。"
      } },
      { tex: "(a-b)(d-c)<0", correct: false, why: {
        en: "Then $x^2$ would be negative: no meeting points.",
        fr: "Alors $x^2$ serait négatif : aucun point commun.",
        es: "Entonces $x^2$ sería negativo: ningún corte.",
        ja: "$x^2<0$ となり交わらない。",
        zh: "那样 $x^2<0$，无交点。"
      } },
      { tex: "a\\ne b", correct: false, why: {
        en: "Also need $d\\ne c$ and the right sign; $a=1,b=2,c=0,d=1$ gives none.",
        fr: "Il faut aussi $d\\ne c$ et le bon signe ; $a=1,b=2,c=0,d=1$ n’en donne aucun.",
        es: "Hace falta además $d\\ne c$ y el signo correcto; $a=1,b=2,c=0,d=1$ no da ninguno.",
        ja: "$d\\ne c$ と符号も必要。$a=1,b=2,c=0,d=1$ では交わらない。",
        zh: "还需 $d\\ne c$ 且符号正确；$a=1,b=2,c=0,d=1$ 无交点。"
      } },
      { tex: "a=b,\\ c\\ne d", correct: false, why: {
        en: "Parallel copies: they never meet.",
        fr: "Copies translatées : jamais de point commun.",
        es: "Copias trasladadas: nunca se cortan.",
        ja: "平行移動しただけで交わらない。",
        zh: "平移的副本，永不相交。"
      } },
      { tex: "c=d", correct: false, why: {
        en: "They meet only at $x=0$ (or everywhere if $a=b$).",
        fr: "Elles se coupent seulement en $x=0$ (ou partout si $a=b$).",
        es: "Se cortan solo en $x=0$ (o en todo si $a=b$).",
        ja: "$x=0$ だけで交わる（$a=b$ なら一致）。",
        zh: "只交于 $x=0$（$a=b$ 时重合）。"
      } },
      { tex: "ab<0", correct: false, why: {
        en: "$a=1,b=-1,c=1,d=0$: $2x^2=-1$, no solution.",
        fr: "$a=1,b=-1,c=1,d=0$ : $2x^2=-1$, aucune solution.",
        es: "$a=1,b=-1,c=1,d=0$: $2x^2=-1$, sin solución.",
        ja: "$a=1,b=-1,c=1,d=0$ で $2x^2=-1$、解なし。",
        zh: "$a=1,b=-1,c=1,d=0$：$2x^2=-1$，无解。"
      } },
      { tex: "(a-b)(d-c)\\ge0", correct: false, why: {
        en: "Equality gives one point or infinitely many.",
        fr: "L’égalité donne un point ou une infinité.",
        es: "La igualdad da un punto o infinitos.",
        ja: "等号なら1点か無数。",
        zh: "取等号时为一点或无穷多点。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Equate",
          fr: "Égaler",
          es: "Igualar",
          ja: "等置",
          zh: "联立"
        },
        lines: ["ax^2+c=bx^2+d\\iff(a-b)x^2=d-c"],
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
          en: "Two solutions",
          fr: "Deux solutions",
          es: "Dos soluciones",
          ja: "2つの解",
          zh: "两个解"
        },
        lines: ["x^2=\\frac{d-c}{a-b}>0\\iff(a-b)(d-c)>0"],
        note: {
          en: "Then $x=\\pm\\sqrt{(d-c)/(a-b)}$: exactly two points.",
          fr: "Alors $x=\\pm\\sqrt{(d-c)/(a-b)}$ : exactement deux points.",
          es: "Entonces $x=\\pm\\sqrt{(d-c)/(a-b)}$: exactamente dos puntos.",
          ja: "$x=\\pm\\sqrt{(d-c)/(a-b)}$ でちょうど2点。",
          zh: "则 $x=\\pm\\sqrt{(d-c)/(a-b)}$，恰两点。"
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
          en: "Two options are the same condition.",
          fr: "Deux options sont la même condition.",
          es: "Dos opciones son la misma condición.",
          ja: "2つの選択肢は同じ条件です。",
          zh: "有两个选项是同一条件。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
