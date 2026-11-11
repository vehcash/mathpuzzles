/* complex · A number plus its length
   z + |z| = 2 + 8i: the imaginary part is fixed, then solve for the real part. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-z-plus-modulus",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["gaokao"]
    },
    difficulty: 3,
    title: {
      en: "A number plus its length",
      fr: "Un nombre plus sa longueur",
      es: "Un número más su longitud",
      ja: "数とその大きさの和",
      zh: "一个数加上它的模"
    },
    statement: {
      en: "The complex number $z$ satisfies $z + |z| = 2 + 8i$. <b>Which of the following are true?</b>",
      fr: "Le nombre complexe $z$ vérifie $z + |z| = 2 + 8i$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "El número complejo $z$ cumple $z + |z| = 2 + 8i$. <b>¿Cuáles de las siguientes son verdaderas?</b>",
      ja: "複素数 $z$ が $z + |z| = 2 + 8i$ を満たします。<b>次のうち正しいものはどれですか？</b>",
      zh: "复数 $z$ 满足 $z + |z| = 2 + 8i$。<b>下列说法中正确的是？</b>"
    },
    figureText: {
      en: "The complex plane with z = −15 + 8i at distance 17 from the origin; adding the real number 17 moves it to 2 + 8i.",
      fr: "Le plan complexe avec z = −15 + 8i à distance 17 de l’origine ; ajouter le réel 17 l’amène en 2 + 8i.",
      es: "El plano complejo con z = −15 + 8i a distancia 17 del origen; sumar el real 17 lo lleva a 2 + 8i.",
      ja: "原点からの距離が 17 の z = −15 + 8i。実数 17 を足すと 2 + 8i に移ります。",
      zh: "复平面上到原点距离为 17 的 z = −15 + 8i；加上实数 17 后移到 2 + 8i。"
    },
    hint: {
      en: "$|z|$ is real, so $\\mathrm{Im}\\,z = 8$. Write $z = a + 8i$.",
      fr: "$|z|$ est réel, donc $\\mathrm{Im}\\,z = 8$. Posez $z = a + 8i$.",
      es: "$|z|$ es real, así que $\\mathrm{Im}\\,z = 8$. Escribe $z = a + 8i$.",
      ja: "$|z|$ は実数なので $\\mathrm{Im}\\,z = 8$。$z = a + 8i$ とおきます。",
      zh: "$|z|$ 是实数，所以 $\\mathrm{Im}\\,z = 8$。设 $z = a + 8i$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example a geometric argument: |z| and z differ by a horizontal shift), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple un argument géométrique : z et z + |z| diffèrent d’une translation horizontale), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo un argumento geométrico: z y z + |z| difieren en un desplazamiento horizontal), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば幾何的に：z と z + |z| は水平方向の平行移動の関係にある）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如几何论证：z 与 z + |z| 相差一个水平平移），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 19, h: 10, scale: 18, pad: 16 });
      const T = F.T = argand(F, -16, 3, -1, 9, { grid: false });
      F.seg(T([0, 0]), T([-15, 8]), 'seg thin'); F.dot(T([-15, 8])); F.dot(T([2, 8]));
      const a = arrow(F, T([-15, 8]), T([1.6, 8]), 'vec two');
      F.text(T([-15, 8]), 'z', 'pt', -10, -8); F.text(T([2, 8]), '2 + 8i', 'len small', 18, 14); F.text(T([-7.5, 4]), '17', 'len', -12, -4); F.text(T([-6.5, 8]), '+17', 'len small', 0, -12);
      return F;
    },
    options: [
      { tex: "z = -15 + 8i", correct: true, why: {
        en: "$|z| = 17$ and $-15 + 17 = 2$.",
        fr: "$|z| = 17$ and $-15 + 17 = 2$.",
        es: "$|z| = 17$ and $-15 + 17 = 2$.",
        ja: "$|z| = 17$ and $-15 + 17 = 2$.",
        zh: "$|z| = 17$ and $-15 + 17 = 2$."
      } },
      { tex: "|z| = 17", correct: true, why: {
        en: "$\\sqrt{225 + 64} = 17$.",
        fr: "$\\sqrt{225 + 64} = 17$.",
        es: "$\\sqrt{225 + 64} = 17$.",
        ja: "$\\sqrt{225 + 64} = 17$.",
        zh: "$\\sqrt{225 + 64} = 17$."
      } },
      { tex: "z = 2 + 8i", correct: false, why: {
        en: "Then $z + |z| = 2 + \\sqrt{68} + 8i \\ne 2 + 8i$.",
        fr: "Then $z + |z| = 2 + \\sqrt{68} + 8i \\ne 2 + 8i$.",
        es: "Then $z + |z| = 2 + \\sqrt{68} + 8i \\ne 2 + 8i$.",
        ja: "Then $z + |z| = 2 + \\sqrt{68} + 8i \\ne 2 + 8i$.",
        zh: "Then $z + |z| = 2 + \\sqrt{68} + 8i \\ne 2 + 8i$."
      } },
      { tex: "z = 15 + 8i", correct: false, why: {
        en: "Sign slip: $15 + 17 = 32 \\ne 2$.",
        fr: "Erreur de signe : $15 + 17 = 32 \\ne 2$.",
        es: "Error de signo: $15 + 17 = 32 \\ne 2$.",
        ja: "符号ミス：$15 + 17 = 32 \\ne 2$。",
        zh: "符号错误：$15 + 17 = 32 \\ne 2$。"
      } },
      { tex: "|z| = \\sqrt{68}", correct: false, why: {
        en: "That is $|2 + 8i|$, the right-hand side.",
        fr: "C’est $|2 + 8i|$, le second membre.",
        es: "Es $|2 + 8i|$, el lado derecho.",
        ja: "それは右辺の $|2 + 8i|$ です。",
        zh: "那是右边的 $|2 + 8i|$。"
      } },
      { tex: "z = -15 - 8i", correct: false, why: {
        en: "The imaginary part must be $+8$.",
        fr: "La partie imaginaire doit valoir $+8$.",
        es: "La parte imaginaria debe ser $+8$.",
        ja: "虚部は $+8$ でなければなりません。",
        zh: "虚部必须是 $+8$。"
      } },
      { tex: "|z| = 15", correct: false, why: {
        en: "That is $|\\mathrm{Re}\\,z|$, not the modulus.",
        fr: "C’est $|\\mathrm{Re}\\,z|$, pas le module.",
        es: "Es $|\\mathrm{Re}\\,z|$, no el módulo.",
        ja: "それは $|\\mathrm{Re}\\,z|$ で、絶対値ではありません。",
        zh: "那是 $|\\mathrm{Re}\\,z|$，不是模。"
      } },
      { tex: "z = 1 + 4i", correct: false, why: {
        en: "Halves both sides — but $|z|$ does not halve like that.",
        fr: "Divise tout par $2$ — mais $|z|$ ne se divise pas ainsi.",
        es: "Divide todo entre $2$ — pero $|z|$ no se divide así.",
        ja: "両辺を半分にしていますが、$|z|$ はそうなりません。",
        zh: "把两边都减半了 —— 但 $|z|$ 不能这样处理。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The imaginary part",
          fr: "La partie imaginaire",
          es: "La parte imaginaria",
          ja: "虚部",
          zh: "虚部"
        },
        lines: ["|z| \\in \\mathbb{R} \\ \\Rightarrow\\ \\mathrm{Im}\\,z = 8, \\quad z = a + 8i"],
        note: {
          en: "Adding a real number only moves $z$ horizontally.",
          fr: "Ajouter un réel ne déplace $z$ qu’horizontalement.",
          es: "Sumar un real solo mueve $z$ horizontalmente.",
          ja: "実数を足すと $z$ は水平に動くだけです。",
          zh: "加实数只让 $z$ 水平移动。"
        }
      },
      {
        title: {
          en: "Solve for the real part",
          fr: "Trouver la partie réelle",
          es: "Hallar la parte real",
          ja: "実部を求める",
          zh: "求实部"
        },
        lines: ["a + \\sqrt{a^2 + 64} = 2 \\ \\Rightarrow\\ \\sqrt{a^2 + 64} = 2 - a", "a^2 + 64 = 4 - 4a + a^2 \\ \\Rightarrow\\ a = -15", "z = \\boxed{-15 + 8i}, \\qquad |z| = \\sqrt{225 + 64} = 17"],
        note: {
          en: "Check: $-15 + 17 = 2$ and $2 - a = 17 \\ge 0$, so squaring was safe.",
          fr: "Vérification : $-15 + 17 = 2$ et $2 - a = 17 \\ge 0$.",
          es: "Comprobación: $-15 + 17 = 2$ y $2 - a = 17 \\ge 0$.",
          ja: "確認：$-15 + 17 = 2$、$2 - a = 17 \\ge 0$。",
          zh: "验证：$-15 + 17 = 2$，且 $2 - a = 17 \\ge 0$。"
        },
        fig(F) { F.draw(F.seg(F.T([0, 0]), F.T([-15, 8]), 'hl yellow', 'over'), 700); }
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
          en: "Two statements are true.",
          fr: "Deux affirmations sont vraies.",
          es: "Dos afirmaciones son verdaderas.",
          ja: "正しい記述は2つです。",
          zh: "有两个说法正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
