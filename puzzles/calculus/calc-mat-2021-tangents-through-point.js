/* calculus · Tangents through (2, 0)
   Oxford MAT 2021 (Mathematics Admissions Test), Question 1F */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-mat-2021-tangents-through-point",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2021 (Mathematics Admissions Test), Question 1F",
        fr: "MAT d’Oxford 2021 (test d’admission en mathématiques), question 1F",
        es: "MAT de Oxford 2021 (prueba de admisión de matemáticas), pregunta 1F",
        ja: "オックスフォード大学 数学入学試験 MAT 2021 問題 1F",
        zh: "牛津大学数学入学考试 MAT 2021 第 1F 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "Tangents through (2, 0)",
      fr: "Tangentes par (2, 0)",
      es: "Tangentes por (2, 0)",
      ja: "(2, 0) を通る接線",
      zh: "过 (2, 0) 的切线"
    },
    statement: {
      en: "For how many real numbers $a$ does the tangent to $y=x^3-3x$ at the point $(a,\\,a^3-3a)$ pass through $(2,\\,0)$? <b>Which of the following equal that number?</b>",
      fr: "Pour combien de réels $a$ la tangente à $y=x^3-3x$ au point $(a,\\,a^3-3a)$ passe-t-elle par $(2,\\,0)$ ? <b>Lesquelles des valeurs suivantes sont égales à ce nombre ?</b>",
      es: "¿Para cuántos números reales $a$ pasa por $(2,\\,0)$ la tangente a $y=x^3-3x$ en el punto $(a,\\,a^3-3a)$? <b>¿Cuáles de los siguientes valores son iguales a ese número?</b>",
      ja: "$y=x^3-3x$ の点 $(a,\\,a^3-3a)$ における接線が $(2,\\,0)$ を通るような実数 $a$ はいくつありますか？<b>その個数に等しいものはどれですか？</b>",
      zh: "有多少个实数 $a$，使 $y=x^3-3x$ 在点 $(a,\\,a^3-3a)$ 处的切线经过 $(2,\\,0)$？<b>下列哪些等于这个个数？</b>"
    },
    figureText: {
      en: "The cubic y = x³ − 3x and the point (2, 0). The tangents through that point are drawn in the solution.",
      fr: "La cubique y = x³ − 3x et le point (2, 0). Les tangentes passant par ce point sont tracées dans la solution.",
      es: "La cúbica y = x³ − 3x y el punto (2, 0). Las tangentes que pasan por él se dibujan en la solución.",
      ja: "3次曲線 y = x³ − 3x と点 (2, 0)。その点を通る接線は解答で描きます。",
      zh: "三次曲线 y = x³ − 3x 与点 (2, 0)。过该点的切线在解答中画出。"
    },
    hint: {
      en: "Write the tangent at $a$, put $(2,0)$ into it and count the real roots of the cubic in $a$.",
      fr: "Écrivez la tangente en $a$, imposez $(2,0)$ et comptez les racines réelles de la cubique en $a$.",
      es: "Escribe la tangente en $a$, impón $(2,0)$ y cuenta las raíces reales de la cúbica en $a$.",
      ja: "$a$ での接線に $(2,0)$ を代入し、$a$ の3次方程式の実数解を数えます。",
      zh: "写出 $a$ 处的切线，代入 $(2,0)$，数关于 $a$ 的三次方程的实根。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.4, h: 5.0, scale: 44, pad: 18 });
      const T = F.T = axes(F, -2.4, 3.0, -2.6, 2.4);
      plot(F, T, x => x ** 3 - 3 * x, -2.2, 2.2, 'graph', 'base', -2.6, 2.4);
      F.dot(T([2, 0])); F.text(T([2, 0]), '(2, 0)', 'len small', 22, 36);
      F.reveal = () => {
      [-0.879385, 1.347296, 2.532089].forEach(a => {
        const m = 3 * a * a - 3, c = a ** 3 - 3 * a;
        plot(F, T, x => m * (x - a) + c, -2.4, 2.6, 'seg thin', 'base', -2.6, 2.4);
        if (Math.abs(c) < 2.4) F.dot(T([a, c]));
      });
      };
      return F;
    },
    options: [
      { tex: "3", correct: true, why: {
        en: "$a^3-3a^2+3=0$ changes sign three times.",
        fr: "$a^3-3a^2+3=0$ change trois fois de signe.",
        es: "$a^3-3a^2+3=0$ cambia de signo tres veces.",
        ja: "$a^3-3a^2+3$ は3回符号を変える。",
        zh: "$a^3-3a^2+3$ 变号三次。"
      } },
      { tex: "\\deg\\!\\left(a^3-3a^2+3\\right)", correct: true, why: {
        en: "A cubic has at most 3 roots, and this one has all 3 real.",
        fr: "Une cubique a au plus 3 racines, et celle-ci les a toutes réelles.",
        es: "Una cúbica tiene a lo sumo 3 raíces, y esta las tiene todas reales.",
        ja: "3次式の解は最大3個で、これは3個とも実数。",
        zh: "三次式最多 3 个根，这里 3 个都是实根。"
      } },
      { tex: "1", correct: false, why: {
        en: "Only the obvious tangent on the right; two more touch the curve elsewhere.",
        fr: "Seulement la tangente évidente à droite ; deux autres touchent la courbe ailleurs.",
        es: "Solo la tangente evidente a la derecha; otras dos tocan la curva en otro sitio.",
        ja: "右側の目立つ接線だけ。ほかに2本ある。",
        zh: "只看到右边那条，另外还有两条。"
      } },
      { tex: "2", correct: false, why: {
        en: "Counts only the stationary points $a=\\pm1$ of $x^3-3x$.",
        fr: "Compte seulement les points stationnaires $a=\\pm1$ de $x^3-3x$.",
        es: "Solo cuenta los puntos estacionarios $a=\\pm1$ de $x^3-3x$.",
        ja: "$x^3-3x$ の停留点 $a=\\pm1$ だけを数えている。",
        zh: "只数了 $x^3-3x$ 的驻点 $a=\\pm1$。"
      } },
      { tex: "0", correct: false, why: {
        en: "$(2,0)$ is not on the curve, but tangents still reach it.",
        fr: "$(2,0)$ n’est pas sur la courbe, mais des tangentes y passent.",
        es: "$(2,0)$ no está en la curva, pero hay tangentes que pasan por él.",
        ja: "$(2,0)$ は曲線上にないが、接線は通る。",
        zh: "$(2,0)$ 不在曲线上，但有切线经过。"
      } },
      { tex: "4", correct: false, why: {
        en: "A cubic in $a$ cannot have 4 roots.",
        fr: "Une cubique en $a$ ne peut avoir 4 racines.",
        es: "Una cúbica en $a$ no puede tener 4 raíces.",
        ja: "$a$ の3次方程式に4個の解はない。",
        zh: "关于 $a$ 的三次方程不会有 4 个根。"
      } },
      { tex: "6", correct: false, why: {
        en: "Double counting.",
        fr: "Double comptage.",
        es: "Doble conteo.",
        ja: "二重に数えている。",
        zh: "重复计数。"
      } },
      { tex: "\\infty", correct: false, why: {
        en: "Each tangent line is fixed by its point $a$; only finitely many work.",
        fr: "Chaque tangente est fixée par $a$ ; il n’y en a qu’un nombre fini.",
        es: "Cada tangente queda fijada por $a$; solo hay un número finito.",
        ja: "接線は $a$ で決まり、有限個だけ。",
        zh: "每条切线由 $a$ 决定，只有有限条。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The tangent at a",
          fr: "La tangente en a",
          es: "La tangente en a",
          ja: "a での接線",
          zh: "a 处的切线"
        },
        lines: ["y=(3a^2-3)(x-a)+a^3-3a"],
        note: {
          en: "Slope from $y'=3x^2-3$.",
          fr: "Pente donnée par $y'=3x^2-3$.",
          es: "Pendiente dada por $y'=3x^2-3$.",
          ja: "傾きは $y'=3x^2-3$。",
          zh: "斜率来自 $y'=3x^2-3$。"
        }
      },
      {
        title: {
          en: "Put in (2, 0)",
          fr: "Imposer (2, 0)",
          es: "Imponer (2, 0)",
          ja: "(2, 0) を代入",
          zh: "代入 (2, 0)"
        },
        lines: ["0=(3a^2-3)(2-a)+a^3-3a\\iff g(a)=a^3-3a^2+3=0"],
        note: {
          en: "Expand: $-2a^3+6a^2-6=0$, then divide by $-2$.",
          fr: "Développez : $-2a^3+6a^2-6=0$, puis divisez par $-2$.",
          es: "Desarrolla: $-2a^3+6a^2-6=0$ y divide entre $-2$.",
          ja: "展開すると $-2a^3+6a^2-6=0$、$-2$ で割る。",
          zh: "展开得 $-2a^3+6a^2-6=0$，再除以 $-2$。"
        }
      },
      {
        title: {
          en: "Count real roots",
          fr: "Compter les racines réelles",
          es: "Contar raíces reales",
          ja: "実数解を数える",
          zh: "数实根"
        },
        lines: ["g(-1)=-1<0,\\; g(0)=3>0,\\; g(2)=-1<0,\\; g(3)=3>0\\;\\Rightarrow\\;\\boxed{3}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Three sign changes give three real roots.",
          fr: "Trois changements de signe : trois racines réelles.",
          es: "Tres cambios de signo: tres raíces reales.",
          ja: "符号が3回変わるので実数解は3個。",
          zh: "三次变号，故有三个实根。"
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
