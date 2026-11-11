/* calculus · Integration by parts
   Integration by parts: ∫₀¹ x eˣ dx = [x eˣ − eˣ]₀¹ = 1. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const f = x => x * Math.exp(x);

  PuzzleBank.define({
    id: "calc-int-x-ex",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["ap", "alevel", "bac", "ebau"]
    },
    difficulty: 2,
    title: {
      en: "Integration by parts",
      fr: "Intégration par parties",
      es: "Integración por partes",
      ja: "部分積分",
      zh: "分部积分"
    },
    statement: {
      en: "<b>Which of the following equal $\\displaystyle\\int_0^1 x\\,e^x\\,dx$?</b>",
      fr: "<b>Lesquelles des expressions suivantes sont égales à $\\displaystyle\\int_0^1 x\\,e^x\\,dx$ ?</b>",
      es: "<b>¿Cuáles de los siguientes son iguales a $\\displaystyle\\int_0^1 x\\,e^x\\,dx$?</b>",
      ja: "<b>次のうち $\\displaystyle\\int_0^1 x\\,e^x\\,dx$ に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $\\displaystyle\\int_0^1 x\\,e^x\\,dx$？</b>"
    },
    figureText: {
      en: "The region under y = x eˣ between x = 0 and x = 1 is shaded.",
      fr: "La région sous y = x eˣ entre x = 0 et x = 1 est ombrée.",
      es: "Está sombreada la región bajo y = x eˣ entre x = 0 y x = 1.",
      ja: "x = 0 から x = 1 までの y = x eˣ の下の部分が塗られています。",
      zh: "y = x eˣ 在 x = 0 到 x = 1 之间的下方区域被涂色。"
    },
    hint: {
      en: "$\\int u\\,dv = uv - \\int v\\,du$ with $u = x$, $dv = e^x dx$.",
      fr: "$\\int u\\,dv = uv - \\int v\\,du$ avec $u = x$, $dv = e^x dx$.",
      es: "$\\int u\\,dv = uv - \\int v\\,du$ con $u = x$, $dv = e^x dx$.",
      ja: "$u = x$、$dv = e^x dx$ として $\\int u\\,dv = uv - \\int v\\,du$。",
      zh: "$\\int u\\,dv = uv - \\int v\\,du$，取 $u = x$，$dv = e^x dx$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example by checking that (x − 1)eˣ is an antiderivative), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en vérifiant que (x − 1)eˣ est une primitive), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo comprobando que (x − 1)eˣ es una primitiva), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば (x − 1)eˣ が原始関数であることを確かめる）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如验证 (x − 1)eˣ 是一个原函数），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 3.6, scale: 58, pad: 18 });
      const T = F.T = axes(F, -1.2, 1.6, -0.5, 3.1);
      const area = (f, a, b) => { const q = [T([a, 0])]; for (let k = 0; k <= 60; k++) { const x = a + (b - a) * k / 60; q.push(T([x, f(x)])); } q.push(T([b, 0])); return F.path(q, 'fill-yellow', 'fills'); };
      area(f, 0, 1); plot(F, T, f, -1.2, 1.35, 'graph', 'base', -0.5, 3.1);
      F.text(T([1, 0]), '1', 'tick', 0, 14); F.dot(T([1, Math.E])); F.text(T([1, Math.E]), 'e', 'len small', -12, 0);
      return F;
    },
    options: [
      { tex: "1", correct: true, why: {
        en: "$(1 - 1)e - (0 - 1) = 1$.",
        fr: "$(1 - 1)e - (0 - 1) = 1$.",
        es: "$(1 - 1)e - (0 - 1) = 1$.",
        ja: "$(1 - 1)e - (0 - 1) = 1$.",
        zh: "$(1 - 1)e - (0 - 1) = 1$."
      } },
      { tex: "e - (e - 1)", correct: true, why: {
        en: "$\\left[x e^x\\right]_0^1 - \\int_0^1 e^x\\,dx$ written out.",
        fr: "$\\left[x e^x\\right]_0^1 - \\int_0^1 e^x\\,dx$ écrit en détail.",
        es: "$\\left[x e^x\\right]_0^1 - \\int_0^1 e^x\\,dx$ desarrollado.",
        ja: "$\\left[x e^x\\right]_0^1 - \\int_0^1 e^x\\,dx$ を書き出したもの。",
        zh: "把 $\\left[x e^x\\right]_0^1 - \\int_0^1 e^x\\,dx$ 写出来。"
      } },
      { tex: "e - 1", correct: false, why: {
        en: "That is $\\int_0^1 e^x\\,dx$ — the factor $x$ was dropped.",
        fr: "C’est $\\int_0^1 e^x\\,dx$ — le facteur $x$ a disparu.",
        es: "Es $\\int_0^1 e^x\\,dx$ — se perdió el factor $x$.",
        ja: "$\\int_0^1 e^x\\,dx$ で、$x$ が落ちています。",
        zh: "那是 $\\int_0^1 e^x\\,dx$，丢了因子 $x$。"
      } },
      { tex: "e", correct: false, why: {
        en: "Only the boundary term $\\left[x e^x\\right]_0^1$.",
        fr: "Seulement le terme $\\left[x e^x\\right]_0^1$.",
        es: "Solo el término $\\left[x e^x\\right]_0^1$.",
        ja: "境界項 $\\left[x e^x\\right]_0^1$ だけです。",
        zh: "只有边界项 $\\left[x e^x\\right]_0^1$。"
      } },
      { tex: "\\tfrac{e}{2}", correct: false, why: {
        en: "$\\tfrac{x^2}{2}e^x$ is not an antiderivative of $x e^x$.",
        fr: "$\\tfrac{x^2}{2}e^x$ n’est pas une primitive de $x e^x$.",
        es: "$\\tfrac{x^2}{2}e^x$ no es una primitiva de $x e^x$.",
        ja: "$\\tfrac{x^2}{2}e^x$ は $x e^x$ の原始関数ではありません。",
        zh: "$\\tfrac{x^2}{2}e^x$ 不是 $x e^x$ 的原函数。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "$\\int_0^1 x\\,dx$ — the factor $e^x$ was dropped.",
        fr: "$\\int_0^1 x\\,dx$ — le facteur $e^x$ a disparu.",
        es: "$\\int_0^1 x\\,dx$ — se perdió el factor $e^x$.",
        ja: "$\\int_0^1 x\\,dx$ で、$e^x$ が落ちています。",
        zh: "$\\int_0^1 x\\,dx$，丢了因子 $e^x$。"
      } },
      { tex: "2e - 1", correct: false, why: {
        en: "Sign error: $\\int v\\,du$ must be subtracted.",
        fr: "Erreur de signe : il faut soustraire $\\int v\\,du$.",
        es: "Error de signo: hay que restar $\\int v\\,du$.",
        ja: "符号ミス：$\\int v\\,du$ は引きます。",
        zh: "符号错误：应减去 $\\int v\\,du$。"
      } },
      { tex: "e - 2", correct: false, why: {
        en: "$\\left[(x - 1)e^x\\right]_0^1$ also needs the lower limit: $0 - (-1)$.",
        fr: "Il faut aussi la borne inférieure : $0 - (-1)$.",
        es: "Falta el límite inferior: $0 - (-1)$.",
        ja: "下端の値も必要です：$0 - (-1)$。",
        zh: "还要代入下限：$0 - (-1)$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Choose the parts",
          fr: "Choisir les parties",
          es: "Elegir las partes",
          ja: "部分を選ぶ",
          zh: "选取 u 与 dv"
        },
        lines: ["u = x,\\ dv = e^x dx \\quad\\Rightarrow\\quad du = dx,\\ v = e^x"],
        note: {
          en: "Differentiating $x$ makes it simpler; $e^x$ stays the same.",
          fr: "Dériver $x$ le simplifie ; $e^x$ ne change pas.",
          es: "Derivar $x$ lo simplifica; $e^x$ no cambia.",
          ja: "$x$ は微分で簡単になり、$e^x$ は変わりません。",
          zh: "$x$ 求导后变简单，$e^x$ 不变。"
        }
      },
      {
        title: {
          en: "Apply the formula",
          fr: "Appliquer la formule",
          es: "Aplicar la fórmula",
          ja: "公式を使う",
          zh: "套用公式"
        },
        lines: ["\\int_0^1 x e^x\\,dx = \\left[x e^x\\right]_0^1 - \\int_0^1 e^x\\,dx = e - (e - 1) = \\boxed{1}"],
        note: {
          en: "An antiderivative is $(x - 1)e^x$.",
          fr: "Une primitive est $(x - 1)e^x$.",
          es: "Una primitiva es $(x - 1)e^x$.",
          ja: "原始関数は $(x - 1)e^x$。",
          zh: "一个原函数是 $(x - 1)e^x$。"
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
          en: "Two options are the same value written differently.",
          fr: "Deux options sont la même valeur écrite différemment.",
          es: "Dos opciones son el mismo valor escrito de forma distinta.",
          ja: "2つの選択肢は同じ値を別の形で書いたものです。",
          zh: "有两个选项是同一个值的不同写法。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
