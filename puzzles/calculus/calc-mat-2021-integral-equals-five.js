/* calculus · An integral equal to 5
   Oxford MAT 2021 (Mathematics Admissions Test), Question 1B */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-mat-2021-integral-equals-five",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2021 (Mathematics Admissions Test), Question 1B",
        fr: "MAT d’Oxford 2021 (test d’admission en mathématiques), question 1B",
        es: "MAT de Oxford 2021 (prueba de admisión de matemáticas), pregunta 1B",
        ja: "オックスフォード大学 数学入学試験 MAT 2021 問題 1B",
        zh: "牛津大学数学入学考试 MAT 2021 第 1B 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "An integral equal to 5",
      fr: "Une intégrale égale à 5",
      es: "Una integral igual a 5",
      ja: "値が5の積分",
      zh: "等于 5 的积分"
    },
    statement: {
      en: "<b>Which of the following equal the positive number $a$ with $\\displaystyle\\int_0^a\\left(\\sqrt{x}+x^2\\right)dx=5$?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales au réel $a>0$ tel que $\\displaystyle\\int_0^a\\left(\\sqrt{x}+x^2\\right)dx=5$ ?</b>",
      es: "<b>¿Cuáles de los siguientes valores son iguales al número $a>0$ con $\\displaystyle\\int_0^a\\left(\\sqrt{x}+x^2\\right)dx=5$?</b>",
      ja: "<b>$\\displaystyle\\int_0^a\\left(\\sqrt{x}+x^2\\right)dx=5$ を満たす正の数 $a$ に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于满足 $\\displaystyle\\int_0^a\\left(\\sqrt{x}+x^2\\right)dx=5$ 的正数 $a$？</b>"
    },
    figureText: {
      en: "The curve y = √x + x² with the area from 0 to a shaded; the area is 5.",
      fr: "La courbe y = √x + x² avec l’aire de 0 à a grisée ; cette aire vaut 5.",
      es: "La curva y = √x + x² con el área de 0 a a sombreada; el área vale 5.",
      ja: "曲線 y = √x + x² と 0 から a までの面積（5）に色付け。",
      zh: "曲线 y = √x + x²，0 到 a 的面积涂色，面积为 5。"
    },
    hint: {
      en: "After integrating, put $t=a^{3/2}$: you get a quadratic in $t$.",
      fr: "Après intégration, posez $t=a^{3/2}$ : on obtient une quadratique en $t$.",
      es: "Tras integrar, llama $t=a^{3/2}$: sale una cuadrática en $t$.",
      ja: "積分したあと $t=a^{3/2}$ とおくと $t$ の2次方程式になる。",
      zh: "积分后令 $t=a^{3/2}$，得到关于 $t$ 的二次方程。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.6, h: 4.4, scale: 56, pad: 18 });
      const T = F.T = axes(F, -0.3, 3.3, -0.3, 4.1);
      const f = x => (Math.sqrt(x) + x * x) / 2, a = Math.cbrt(9);
      const q = [T([0, 0])]; for (let k = 0; k <= 50; k++) { const x = a * k / 50; q.push(T([x, f(x)])); } q.push(T([a, 0]));
      F.path(q, 'fill-yellow', 'fills');
      plot(F, T, f, 0, 2.5, 'graph');
      F.seg(T([a, 0]), T([a, f(a)]), 'seg thin dashc'); F.text(T([a, 0]), 'a', 'tick', 0, 14);
      F.text(T([1.4, 0.6]), '5', 'len', 0, 0);
      return F;
    },
    options: [
      { tex: "\\sqrt[3]{9}", correct: true, why: {
        en: "$a^{3/2}=3$, so $a=3^{2/3}=\\sqrt[3]{9}\\approx2.08$.",
        fr: "$a^{3/2}=3$, so $a=3^{2/3}=\\sqrt[3]{9}\\approx2.08$.",
        es: "$a^{3/2}=3$, so $a=3^{2/3}=\\sqrt[3]{9}\\approx2.08$.",
        ja: "$a^{3/2}=3$, so $a=3^{2/3}=\\sqrt[3]{9}\\approx2.08$.",
        zh: "$a^{3/2}=3$, so $a=3^{2/3}=\\sqrt[3]{9}\\approx2.08$."
      } },
      { tex: "3^{2/3}", correct: true, why: {
        en: "The same number in power form.",
        fr: "Le même nombre sous forme de puissance.",
        es: "El mismo número como potencia.",
        ja: "累乗で書いた同じ数。",
        zh: "同一个数的幂形式。"
      } },
      { tex: "3", correct: false, why: {
        en: "That is $a^{3/2}$, not $a$.",
        fr: "C’est $a^{3/2}$, pas $a$.",
        es: "Es $a^{3/2}$, no $a$.",
        ja: "それは $a^{3/2}$ で $a$ ではない。",
        zh: "那是 $a^{3/2}$，不是 $a$。"
      } },
      { tex: "\\sqrt3", correct: false, why: {
        en: "$a^{3/2}=3^{3/4}\\ne3$.",
        fr: "$a^{3/2}=3^{3/4}\\ne3$.",
        es: "$a^{3/2}=3^{3/4}\\ne3$.",
        ja: "$a^{3/2}=3^{3/4}\\ne3$。",
        zh: "$a^{3/2}=3^{3/4}\\ne3$。"
      } },
      { tex: "\\sqrt[3]{15}", correct: false, why: {
        en: "Drops the $\\sqrt x$ term: $\\tfrac{a^3}{3}=5$.",
        fr: "Oublie le terme $\\sqrt x$ : $\\tfrac{a^3}{3}=5$.",
        es: "Olvida el término $\\sqrt x$: $\\tfrac{a^3}{3}=5$.",
        ja: "$\\sqrt x$ の項を落とした：$\\tfrac{a^3}{3}=5$。",
        zh: "漏了 $\\sqrt x$ 项：$\\tfrac{a^3}{3}=5$。"
      } },
      { tex: "9", correct: false, why: {
        en: "Squares instead of taking the $\\tfrac23$ power.",
        fr: "Élève au carré au lieu de la puissance $\\tfrac23$.",
        es: "Eleva al cuadrado en vez de a la $\\tfrac23$.",
        ja: "$\\tfrac23$ 乗でなく2乗した。",
        zh: "平方了，而不是取 $\\tfrac23$ 次方。"
      } },
      { tex: "\\sqrt[3]{25}", correct: false, why: {
        en: "Uses $t=-5$ squared: but $t=a^{3/2}>0$.",
        fr: "Utilise $t=-5$ : or $t=a^{3/2}>0$.",
        es: "Usa $t=-5$: pero $t=a^{3/2}>0$.",
        ja: "$t=-5$ を使ったが $t=a^{3/2}>0$。",
        zh: "用了 $t=-5$，但 $t=a^{3/2}>0$。"
      } },
      { tex: "2", correct: false, why: {
        en: "$\\tfrac23\\cdot2^{3/2}+\\tfrac83\\approx4.55<5$.",
        fr: "$\\tfrac23\\cdot2^{3/2}+\\tfrac83\\approx4.55<5$.",
        es: "$\\tfrac23\\cdot2^{3/2}+\\tfrac83\\approx4.55<5$.",
        ja: "$\\tfrac23\\cdot2^{3/2}+\\tfrac83\\approx4.55<5$.",
        zh: "$\\tfrac23\\cdot2^{3/2}+\\tfrac83\\approx4.55<5$."
      } }
    ],
    steps: [
      {
        title: {
          en: "Integrate",
          fr: "Intégrer",
          es: "Integrar",
          ja: "積分する",
          zh: "积分"
        },
        lines: ["\\int_0^a\\left(\\sqrt x+x^2\\right)dx=\\tfrac23a^{3/2}+\\tfrac13a^3=5"],
        note: {
          en: "Both terms are powers of $a^{3/2}$: $a^3=(a^{3/2})^2$.",
          fr: "Les deux termes sont des puissances de $a^{3/2}$ : $a^3=(a^{3/2})^2$.",
          es: "Ambos términos son potencias de $a^{3/2}$: $a^3=(a^{3/2})^2$.",
          ja: "2項とも $a^{3/2}$ の累乗：$a^3=(a^{3/2})^2$。",
          zh: "两项都是 $a^{3/2}$ 的幂：$a^3=(a^{3/2})^2$。"
        }
      },
      {
        title: {
          en: "A quadratic in t",
          fr: "Une quadratique en t",
          es: "Una cuadrática en t",
          ja: "t の2次方程式",
          zh: "关于 t 的二次方程"
        },
        lines: ["t=a^{3/2}:\\quad t^2+2t-15=0\\iff(t+5)(t-3)=0\\;\\Rightarrow\\;t=3"],
        note: {
          en: "$t>0$ rules out $-5$.",
          fr: "$t>0$ exclut $-5$.",
          es: "$t>0$ descarta $-5$.",
          ja: "$t>0$ なので $-5$ は除く。",
          zh: "$t>0$ 排除 $-5$。"
        }
      },
      {
        title: {
          en: "Back to a",
          fr: "Revenir à a",
          es: "Volver a a",
          ja: "a に戻す",
          zh: "回到 a"
        },
        lines: ["a=3^{2/3}=\\boxed{\\sqrt[3]{9}}"],
        note: {
          en: "Check: about $2.08$, between the guesses $2$ and $3$.",
          fr: "Vérification : environ $2{,}08$, entre $2$ et $3$.",
          es: "Comprobación: unos $2{,}08$, entre $2$ y $3$.",
          ja: "確認：約 $2.08$ で $2$ と $3$ の間。",
          zh: "验证：约 $2.08$，介于 $2$ 与 $3$ 之间。"
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
