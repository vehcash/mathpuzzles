/* algebra · A logarithm in the exponent
   JEE Advanced 2022 (India), Paper 2, Mathematics Q.4 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-jee-2022-log-exponent-roots",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2022 (India), Paper 2, Mathematics Q.4",
        fr: "JEE Advanced 2022 (Inde), épreuve 2, mathématiques Q.4",
        es: "JEE Advanced 2022 (India), prueba 2, matemáticas Q.4",
        ja: "JEE Advanced 2022（インド工科大学入試）Paper 2 数学 Q.4",
        zh: "印度理工学院入学考试 JEE Advanced 2022 卷二 数学 Q.4"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "A logarithm in the exponent",
      fr: "Un logarithme en exposant",
      es: "Un logaritmo en el exponente",
      ja: "指数の中の対数",
      zh: "指数里的对数"
    },
    statement: {
      en: "<b>Which of the following equal the product of all positive real $x$ with $x^{\\,16(\\log_5 x)^3-68\\log_5 x}=5^{-16}$?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales au produit de tous les réels $x>0$ tels que $x^{\\,16(\\log_5 x)^3-68\\log_5 x}=5^{-16}$ ?</b>",
      es: "<b>¿Cuáles de los siguientes valores son iguales al producto de todos los reales $x>0$ con $x^{\\,16(\\log_5 x)^3-68\\log_5 x}=5^{-16}$?</b>",
      ja: "<b>$x^{\\,16(\\log_5 x)^3-68\\log_5 x}=5^{-16}$ を満たす正の実数 $x$ すべての積に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于满足 $x^{\\,16(\\log_5 x)^3-68\\log_5 x}=5^{-16}$ 的所有正实数 $x$ 之积？</b>"
    },
    figureText: {
      en: "The graph of 4t⁴ − 17t² + 4 against t = log₅x: it crosses zero at t = −2, −1/2, 1/2 and 2, symmetric about t = 0.",
      fr: "La courbe de 4t⁴ − 17t² + 4 en fonction de t = log₅x : elle s’annule en t = −2, −1/2, 1/2 et 2, symétrique par rapport à t = 0.",
      es: "La gráfica de 4t⁴ − 17t² + 4 frente a t = log₅x: se anula en t = −2, −1/2, 1/2 y 2, simétrica respecto de t = 0.",
      ja: "t = log₅x に対する 4t⁴ − 17t² + 4 のグラフ。t = −2, −1/2, 1/2, 2 で 0、t = 0 について対称。",
      zh: "以 t = log₅x 为横轴的 4t⁴ − 17t² + 4 图像：在 t = −2、−1/2、1/2、2 处为零，关于 t = 0 对称。"
    },
    hint: {
      en: "Take $\\log_5$ of both sides and write $t=\\log_5 x$. The product of the $x$'s is $5^{\\text{(sum of the } t\\text{'s)}}$.",
      fr: "Prenez $\\log_5$ des deux côtés et posez $t=\\log_5 x$. Le produit des $x$ vaut $5$ puissance la somme des $t$.",
      es: "Toma $\\log_5$ en ambos lados y llama $t=\\log_5 x$. El producto de las $x$ es $5$ elevado a la suma de las $t$.",
      ja: "両辺の $\\log_5$ をとり $t=\\log_5 x$ とおく。$x$ の積は $5$ の（$t$ の和）乗。",
      zh: "两边取 $\\log_5$，令 $t=\\log_5 x$。各 $x$ 之积等于 $5$ 的（各 $t$ 之和）次方。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.6, h: 4.0, scale: 50, pad: 18 });
      const T = F.T = axes(F, -2.8, 2.8, -1.6, 2.4, { xl: 't' });
      plot(F, T, t => (4 * t ** 4 - 17 * t * t + 4) / 10, -2.25, 2.25, 'graph', 'base', -1.6, 2.4);
      [[-2, '−2'], [-0.5, '−½'], [0.5, '½'], [2, '2']].forEach(([t, s]) => { F.dot(T([t, 0])); F.text(T([t, 0]), s, 'tick', (Math.abs(t) > 1 ? 1 : -1) * (t < 0 ? -10 : 10), 14); });
      return F;
    },
    options: [
      { tex: "1", correct: true, why: {
        en: "$x=5^{\\pm2},\\,5^{\\pm1/2}$: exponents add to $0$.",
        fr: "$x=5^{\\pm2},\\,5^{\\pm1/2}$: exponents add to $0$.",
        es: "$x=5^{\\pm2},\\,5^{\\pm1/2}$: exponents add to $0$.",
        ja: "$x=5^{\\pm2},\\,5^{\\pm1/2}$: exponents add to $0$.",
        zh: "$x=5^{\\pm2},\\,5^{\\pm1/2}$: exponents add to $0$."
      } },
      { tex: "5^0", correct: true, why: {
        en: "The same number, from the sum of the four $t$'s.",
        fr: "Le même nombre, via la somme des quatre $t$.",
        es: "El mismo número, por la suma de las cuatro $t$.",
        ja: "4つの $t$ の和から得られる同じ数。",
        zh: "由四个 $t$ 之和得到的同一个数。"
      } },
      { tex: "5^{5/2}", correct: false, why: {
        en: "Keeps only the positive $t$'s; $x=5^{-2}$ and $5^{-1/2}$ are positive too.",
        fr: "Ne garde que les $t$ positifs ; or $5^{-2}$ et $5^{-1/2}$ sont aussi positifs.",
        es: "Solo toma las $t$ positivas; $5^{-2}$ y $5^{-1/2}$ también son positivos.",
        ja: "正の $t$ だけを使った。$5^{-2}$, $5^{-1/2}$ も正の $x$。",
        zh: "只取了正的 $t$；$5^{-2}$ 和 $5^{-1/2}$ 也是正数。"
      } },
      { tex: "5^{-16}", correct: false, why: {
        en: "The right-hand side, not the product of solutions.",
        fr: "Le second membre, pas le produit des solutions.",
        es: "El lado derecho, no el producto de soluciones.",
        ja: "右辺の値で、解の積ではない。",
        zh: "那是右边，不是解的积。"
      } },
      { tex: "25", correct: false, why: {
        en: "Only the root $x=5^2$.",
        fr: "Seulement la racine $x=5^2$.",
        es: "Solo la raíz $x=5^2$.",
        ja: "解 $x=5^2$ だけ。",
        zh: "只是根 $x=5^2$。"
      } },
      { tex: "5^{17/4}", correct: false, why: {
        en: "$\\tfrac{17}{4}$ is the sum of the $t^2$, not of the $t$.",
        fr: "$\\tfrac{17}{4}$ est la somme des $t^2$, pas des $t$.",
        es: "$\\tfrac{17}{4}$ es la suma de las $t^2$, no de las $t$.",
        ja: "$\\tfrac{17}{4}$ は $t^2$ の和で $t$ の和ではない。",
        zh: "$\\tfrac{17}{4}$ 是 $t^2$ 之和，不是 $t$ 之和。"
      } },
      { tex: "5", correct: false, why: {
        en: "Off: the exponents cancel in pairs.",
        fr: "Faux : les exposants s’annulent deux à deux.",
        es: "No: los exponentes se cancelan por parejas.",
        ja: "指数は2つずつ打ち消し合う。",
        zh: "不对：指数两两抵消。"
      } },
      { tex: "\\tfrac{1}{25}", correct: false, why: {
        en: "Only the root $x=5^{-2}$.",
        fr: "Seulement la racine $x=5^{-2}$.",
        es: "Solo la raíz $x=5^{-2}$.",
        ja: "解 $x=5^{-2}$ だけ。",
        zh: "只是根 $x=5^{-2}$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Take log base 5",
          fr: "Passer au log en base 5",
          es: "Tomar log en base 5",
          ja: "底5の対数をとる",
          zh: "取以 5 为底的对数"
        },
        lines: ["t=\\log_5 x:\\quad t\\,(16t^3-68t)=-16\\iff4t^4-17t^2+4=0"],
        note: {
          en: "$\\log_5\\left(x^{k}\\right)=k\\log_5 x$.",
          fr: "$\\log_5\\left(x^{k}\\right)=k\\log_5 x$.",
          es: "$\\log_5\\left(x^{k}\\right)=k\\log_5 x$.",
          ja: "$\\log_5\\left(x^{k}\\right)=k\\log_5 x$。",
          zh: "$\\log_5\\left(x^{k}\\right)=k\\log_5 x$。"
        }
      },
      {
        title: {
          en: "Solve in t²",
          fr: "Résoudre en t²",
          es: "Resolver en t²",
          ja: "t² で解く",
          zh: "解关于 t² 的方程"
        },
        lines: ["(4t^2-1)(t^2-4)=0\\;\\Rightarrow\\;t=\\pm\\tfrac12,\\ \\pm2"],
        note: {
          en: "Four real $t$, so four positive $x=5^t$.",
          fr: "Quatre $t$ réels, donc quatre $x=5^t>0$.",
          es: "Cuatro $t$ reales, luego cuatro $x=5^t>0$.",
          ja: "実数 $t$ が4つなので正の $x=5^t$ も4つ。",
          zh: "四个实数 $t$，对应四个正的 $x=5^t$。"
        }
      },
      {
        title: {
          en: "Multiply",
          fr: "Multiplier",
          es: "Multiplicar",
          ja: "掛け合わせる",
          zh: "相乘"
        },
        lines: ["\\prod x=5^{\\,2-2+\\frac12-\\frac12}=5^0=\\boxed{1}"],
        note: {
          en: "An even quartic in $t$ always has roots that cancel in pairs.",
          fr: "Une quartique paire en $t$ a des racines opposées deux à deux.",
          es: "Una cuártica par en $t$ tiene raíces opuestas por parejas.",
          ja: "$t$ の偶関数4次式の解は正負の組になる。",
          zh: "关于 $t$ 的偶四次式的根两两互为相反数。"
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
