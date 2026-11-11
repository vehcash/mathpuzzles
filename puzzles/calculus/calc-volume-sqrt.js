/* calculus · Spinning a curve
   Volume of revolution of y = √x on [0, 4] about the x-axis: π∫₀⁴ x dx = 8π. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-volume-sqrt",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["ap", "alevelfm"]
    },
    difficulty: 2,
    title: {
      en: "Spinning a curve",
      fr: "Faire tourner une courbe",
      es: "Girar una curva",
      ja: "曲線を回転させる",
      zh: "旋转一条曲线"
    },
    statement: {
      en: "The region under $y = \\sqrt x$ for $0 \\le x \\le 4$ is rotated about the $x$-axis. <b>Which of the following equal the volume of the solid?</b>",
      fr: "La région sous $y = \\sqrt x$ pour $0 \\le x \\le 4$ tourne autour de l’axe des $x$. <b>Lesquelles des expressions suivantes sont égales au volume du solide ?</b>",
      es: "La región bajo $y = \\sqrt x$ para $0 \\le x \\le 4$ gira alrededor del eje $x$. <b>¿Cuáles de las siguientes son iguales al volumen del sólido?</b>",
      ja: "$0 \\le x \\le 4$ の $y = \\sqrt x$ の下の領域を $x$ 軸のまわりに回転させます。<b>次のうち立体の体積に等しいものはどれですか？</b>",
      zh: "把 $0 \\le x \\le 4$ 内 $y = \\sqrt x$ 下方的区域绕 $x$ 轴旋转。<b>下列哪些等于所得旋转体的体积？</b>"
    },
    figureText: {
      en: "The curve y = √x and its mirror image y = −√x from 0 to 4, forming a bowl shape, with an ellipse at x = 4 for the circular end.",
      fr: "La courbe y = √x et son reflet y = −√x de 0 à 4, formant un bol, avec une ellipse en x = 4 pour la face circulaire.",
      es: "La curva y = √x y su reflejo y = −√x de 0 a 4, formando un cuenco, con una elipse en x = 4 para la cara circular.",
      ja: "y = √x とその鏡像 y = −√x（0 から 4）でできたお椀形と、x = 4 の円形の端を表す楕円。",
      zh: "y = √x 与其镜像 y = −√x（0 到 4）构成碗形，x = 4 处的椭圆表示圆形端面。"
    },
    hint: {
      en: "Disc method: $V = \\pi\\displaystyle\\int_a^b y^2\\,dx$.",
      fr: "Méthode des disques : $V = \\pi\\displaystyle\\int_a^b y^2\\,dx$.",
      es: "Método de discos: $V = \\pi\\displaystyle\\int_a^b y^2\\,dx$.",
      ja: "円板法：$V = \\pi\\displaystyle\\int_a^b y^2\\,dx$。",
      zh: "圆盘法：$V = \\pi\\displaystyle\\int_a^b y^2\\,dx$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example with the shell method around the x-axis, integrating in y), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple par la méthode des coquilles, en intégrant en y), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo con el método de capas, integrando en y), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば y で積分する殻の方法（シェル法））。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如用柱壳法对 y 积分），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.4, h: 5, scale: 46, pad: 16 });
      const T = F.T = axes(F, -0.4, 5, -2.5, 2.5);
      plot(F, T, Math.sqrt, 0, 4, 'graph'); plot(F, T, x => -Math.sqrt(x), 0, 4, 'graph');
      const e = []; for (let k = 0; k <= 48; k++) { const t = 2 * Math.PI * k / 48; e.push(T([4 + 0.45 * Math.cos(t), 2 * Math.sin(t)])); }
      F.path(e, 'fill-blue', 'fills'); F.path(e, 'seg thin').setAttribute('fill', 'none');
      F.text(T([4, 0]), '4', 'tick', -10, 12);
      return F;
    },
    options: [
      { tex: "8\\pi", correct: true, why: {
        en: "$\\pi\\left[\\tfrac{x^2}{2}\\right]_0^4 = 8\\pi$.",
        fr: "$\\pi\\left[\\tfrac{x^2}{2}\\right]_0^4 = 8\\pi$.",
        es: "$\\pi\\left[\\tfrac{x^2}{2}\\right]_0^4 = 8\\pi$.",
        ja: "$\\pi\\left[\\tfrac{x^2}{2}\\right]_0^4 = 8\\pi$.",
        zh: "$\\pi\\left[\\tfrac{x^2}{2}\\right]_0^4 = 8\\pi$."
      } },
      { tex: "\\pi\\displaystyle\\int_0^4 x\\,dx", correct: true, why: {
        en: "Discs of radius $\\sqrt x$ have area $\\pi x$.",
        fr: "Les disques de rayon $\\sqrt x$ ont pour aire $\\pi x$.",
        es: "Los discos de radio $\\sqrt x$ tienen área $\\pi x$.",
        ja: "半径 $\\sqrt x$ の円板の面積は $\\pi x$。",
        zh: "半径为 $\\sqrt x$ 的圆盘面积为 $\\pi x$。"
      } },
      { tex: "\\tfrac{16\\pi}{3}", correct: false, why: {
        en: "$\\pi\\int_0^4\\sqrt x\\,dx$: the radius must be squared.",
        fr: "$\\pi\\int_0^4\\sqrt x\\,dx$ : il faut élever le rayon au carré.",
        es: "$\\pi\\int_0^4\\sqrt x\\,dx$: hay que elevar el radio al cuadrado.",
        ja: "$\\pi\\int_0^4\\sqrt x\\,dx$：半径を2乗する必要があります。",
        zh: "$\\pi\\int_0^4\\sqrt x\\,dx$：半径要平方。"
      } },
      { tex: "16\\pi", correct: false, why: {
        en: "The cylinder $\\pi\\cdot2^2\\cdot4$ — the bowl is only half of it.",
        fr: "Le cylindre $\\pi\\cdot2^2\\cdot4$ — le bol n’en fait que la moitié.",
        es: "El cilindro $\\pi\\cdot2^2\\cdot4$ — el cuenco es solo la mitad.",
        ja: "円柱 $\\pi\\cdot2^2\\cdot4$ で、お椀はその半分です。",
        zh: "圆柱 $\\pi\\cdot2^2\\cdot4$——碗只是它的一半。"
      } },
      { tex: "8", correct: false, why: {
        en: "The $\\pi$ is missing.",
        fr: "Il manque le $\\pi$.",
        es: "Falta el $\\pi$.",
        ja: "$\\pi$ が抜けています。",
        zh: "漏了 $\\pi$。"
      } },
      { tex: "4\\pi", correct: false, why: {
        en: "Halved: $\\int_0^4 x\\,dx = 8$, not $4$.",
        fr: "Divisé par deux : $\\int_0^4 x\\,dx = 8$, pas $4$.",
        es: "Dividido por dos: $\\int_0^4 x\\,dx = 8$, no $4$.",
        ja: "半分にしています：$\\int_0^4 x\\,dx = 8$ で $4$ ではありません。",
        zh: "减半了：$\\int_0^4 x\\,dx = 8$，不是 $4$。"
      } },
      { tex: "2\\pi\\displaystyle\\int_0^4 x\\sqrt x\\,dx", correct: false, why: {
        en: "Shells around the $y$-axis: a different solid.",
        fr: "Des coquilles autour de l’axe des $y$ : un autre solide.",
        es: "Capas alrededor del eje $y$: otro sólido.",
        ja: "$y$ 軸まわりのシェル法で、別の立体です。",
        zh: "绕 $y$ 轴的柱壳：是另一个立体。"
      } },
      { tex: "\\tfrac{32\\pi}{3}", correct: false, why: {
        en: "That is the volume of a sphere of radius $2$, not of this bowl.",
        fr: "C’est le volume d’une boule de rayon $2$, pas de ce bol.",
        es: "Es el volumen de una esfera de radio $2$, no de este cuenco.",
        ja: "半径 $2$ の球の体積で、このお椀ではありません。",
        zh: "那是半径为 $2$ 的球的体积，不是这个碗的。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Slice into discs",
          fr: "Découper en disques",
          es: "Cortar en discos",
          ja: "円板に切る",
          zh: "切成圆盘"
        },
        lines: ["dV = \\pi y^2\\,dx = \\pi\\left(\\sqrt x\\right)^2 dx = \\pi x\\,dx"],
        note: {
          en: "Each slice at $x$ is a disc of radius $\\sqrt x$.",
          fr: "Chaque tranche en $x$ est un disque de rayon $\\sqrt x$.",
          es: "Cada rebanada en $x$ es un disco de radio $\\sqrt x$.",
          ja: "$x$ での切り口は半径 $\\sqrt x$ の円板です。",
          zh: "$x$ 处每个切片是半径为 $\\sqrt x$ 的圆盘。"
        }
      },
      {
        title: {
          en: "Add the discs",
          fr: "Additionner les disques",
          es: "Sumar los discos",
          ja: "円板を足し合わせる",
          zh: "累加圆盘"
        },
        lines: ["V = \\pi\\int_0^4 x\\,dx = \\pi\\cdot\\frac{16}{2} = \\boxed{8\\pi}"],
        note: {
          en: "Exactly half of the surrounding cylinder $\\pi\\cdot2^2\\cdot4 = 16\\pi$.",
          fr: "Exactement la moitié du cylindre $\\pi\\cdot2^2\\cdot4 = 16\\pi$.",
          es: "Exactamente la mitad del cilindro $\\pi\\cdot2^2\\cdot4 = 16\\pi$.",
          ja: "外側の円柱 $\\pi\\cdot2^2\\cdot4 = 16\\pi$ のちょうど半分。",
          zh: "恰为外接圆柱 $\\pi\\cdot2^2\\cdot4 = 16\\pi$ 的一半。"
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
