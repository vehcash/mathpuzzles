/* complex · When the ratio is real
   JEE Advanced 2022 (India), Paper 1, Mathematics Q.4 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-jee-2022-real-ratio",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2022 (India), Paper 1, Mathematics Q.4",
        fr: "JEE Advanced 2022 (Inde), épreuve 1, mathématiques Q.4",
        es: "JEE Advanced 2022 (India), prueba 1, matemáticas Q.4",
        ja: "JEE Advanced 2022（インド工科大学入試）Paper 1 数学 Q.4",
        zh: "印度理工学院入学考试 JEE Advanced 2022 卷一 数学 Q.4"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "When the ratio is real",
      fr: "Quand le quotient est réel",
      es: "Cuando el cociente es real",
      ja: "比が実数になるとき",
      zh: "比值为实数时"
    },
    statement: {
      en: "$z$ is a complex number with non-zero imaginary part, and $\\dfrac{2+3z+4z^2}{2-3z+4z^2}$ is real. <b>Which of the following are true?</b>",
      fr: "$z$ est un complexe de partie imaginaire non nulle, et $\\dfrac{2+3z+4z^2}{2-3z+4z^2}$ est réel. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$z$ es un complejo con parte imaginaria no nula y $\\dfrac{2+3z+4z^2}{2-3z+4z^2}$ es real. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$z$ は虚部が 0 でない複素数で、$\\dfrac{2+3z+4z^2}{2-3z+4z^2}$ は実数です。<b>次のうち正しいものはどれですか？</b>",
      zh: "$z$ 是虚部非零的复数，且 $\\dfrac{2+3z+4z^2}{2-3z+4z^2}$ 为实数。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The complex plane with a point z off the real axis. The set of valid z is drawn in the solution.",
      fr: "Le plan complexe avec un point z hors de l’axe réel. L’ensemble des z valables est tracé dans la solution.",
      es: "El plano complejo con un punto z fuera del eje real. El conjunto de z válidos se dibuja en la solución.",
      ja: "実軸外の点 z を記した複素平面。条件を満たす z の集合は解答で描きます。",
      zh: "复平面上实轴外的一点 z。满足条件的 z 的集合在解答中画出。"
    },
    hint: {
      en: "Divide top and bottom by $z$: the ratio is real exactly when $u=\\tfrac{2}{z}+4z$ is real.",
      fr: "Divisez haut et bas par $z$ : le quotient est réel exactement quand $u=\\tfrac{2}{z}+4z$ l’est.",
      es: "Divide arriba y abajo por $z$: el cociente es real justo cuando $u=\\tfrac{2}{z}+4z$ lo es.",
      ja: "分子分母を $z$ で割ると、比が実数 ⇔ $u=\\tfrac{2}{z}+4z$ が実数。",
      zh: "分子分母同除以 $z$：比值为实数当且仅当 $u=\\tfrac{2}{z}+4z$ 为实数。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.4, h: 3.4, scale: 80, pad: 18 });
      const T = F.T = argand(F, -1.6, 1.6, -1.6, 1.6);
      const t = 1.0, Z = [0.7071 * Math.cos(t), 0.7071 * Math.sin(t)];
      F.dot(T(Z)); F.text(T(Z), 'z', 'pt', 10, -8);
      F.reveal = () => {
      F.circle(T([0, 0]), 0.7071, 'conic');
      F.text(T([0.5, -0.5]), '1/√2', 'len small', 22, 10);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "must be purely imaginary": {"fr": "doit être imaginaire pur", "es": "debe ser imaginario puro", "ja": "は純虚数でなければならない", "zh": "必须是纯虚数"}
    },
    options: [
      { tex: "|z|^2=\\tfrac12", correct: true, why: {
        en: "$\\operatorname{Im}\\left(\\tfrac{2\\bar z}{|z|^2}+4z\\right)=y\\left(4-\\tfrac{2}{|z|^2}\\right)=0$.",
        fr: "$\\operatorname{Im}\\left(\\tfrac{2\\bar z}{|z|^2}+4z\\right)=y\\left(4-\\tfrac{2}{|z|^2}\\right)=0$.",
        es: "$\\operatorname{Im}\\left(\\tfrac{2\\bar z}{|z|^2}+4z\\right)=y\\left(4-\\tfrac{2}{|z|^2}\\right)=0$.",
        ja: "$\\operatorname{Im}\\left(\\tfrac{2\\bar z}{|z|^2}+4z\\right)=y\\left(4-\\tfrac{2}{|z|^2}\\right)=0$.",
        zh: "$\\operatorname{Im}\\left(\\tfrac{2\\bar z}{|z|^2}+4z\\right)=y\\left(4-\\tfrac{2}{|z|^2}\\right)=0$."
      } },
      { tex: "|z|=\\tfrac{1}{\\sqrt2}", correct: true, why: {
        en: "The same condition, without squaring.",
        fr: "La même condition, sans le carré.",
        es: "La misma condición, sin el cuadrado.",
        ja: "2乗しない同じ条件。",
        zh: "同一条件，不取平方。"
      } },
      { tex: "|z|^2=1", correct: false, why: {
        en: "Then $u=2\\bar z+4z$ has imaginary part $2y\\ne0$.",
        fr: "Alors $u=2\\bar z+4z$ a pour partie imaginaire $2y\\ne0$.",
        es: "Entonces $u=2\\bar z+4z$ tiene parte imaginaria $2y\\ne0$.",
        ja: "このとき $u=2\\bar z+4z$ の虚部は $2y\\ne0$。",
        zh: "此时 $u=2\\bar z+4z$ 的虚部为 $2y\\ne0$。"
      } },
      { tex: "|z|^2=2", correct: false, why: {
        en: "Swaps the roles of $2$ and $4$.",
        fr: "Échange les rôles de $2$ et $4$.",
        es: "Intercambia los papeles de $2$ y $4$.",
        ja: "$2$ と $4$ の役割を取り違えた。",
        zh: "把 $2$ 和 $4$ 的作用弄反了。"
      } },
      { tex: "|z|^2=\\tfrac34", correct: false, why: {
        en: "Uses the middle coefficient $3$ by mistake.",
        fr: "Utilise par erreur le coefficient $3$.",
        es: "Usa por error el coeficiente $3$.",
        ja: "真ん中の係数 $3$ を誤って使った。",
        zh: "误用了中间系数 $3$。"
      } },
      { tex: "|z|=\\tfrac12", correct: false, why: {
        en: "$|z|^2=\\tfrac14$, not $\\tfrac12$.",
        fr: "$|z|^2=\\tfrac14$, pas $\\tfrac12$.",
        es: "$|z|^2=\\tfrac14$, no $\\tfrac12$.",
        ja: "$|z|^2=\\tfrac14$ で $\\tfrac12$ ではない。",
        zh: "$|z|^2=\\tfrac14$，不是 $\\tfrac12$。"
      } },
      { tex: "z \\text{ must be purely imaginary}", correct: false, why: {
        en: "Any argument works, e.g. $z=\\tfrac{1}{\\sqrt2}e^{i}$.",
        fr: "Tout argument convient, par ex. $z=\\tfrac{1}{\\sqrt2}e^{i}$.",
        es: "Vale cualquier argumento, p. ej. $z=\\tfrac{1}{\\sqrt2}e^{i}$.",
        ja: "偏角は任意、例えば $z=\\tfrac{1}{\\sqrt2}e^{i}$。",
        zh: "任意辐角都行，如 $z=\\tfrac{1}{\\sqrt2}e^{i}$。"
      } },
      { tex: "|z|^2=\\tfrac43", correct: false, why: {
        en: "Inverted ratio.",
        fr: "Rapport inversé.",
        es: "Cociente invertido.",
        ja: "比が逆。",
        zh: "比例倒了。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Divide by z",
          fr: "Diviser par z",
          es: "Dividir por z",
          ja: "z で割る",
          zh: "除以 z"
        },
        lines: ["\\frac{2+3z+4z^2}{2-3z+4z^2}=\\frac{u+3}{u-3},\\qquad u=\\frac2z+4z"],
        note: {
          en: "$\\tfrac{u+3}{u-3}$ is real $\\iff u$ is real (a Möbius map with real coefficients).",
          fr: "$\\tfrac{u+3}{u-3}$ est réel $\\iff u$ est réel.",
          es: "$\\tfrac{u+3}{u-3}$ es real $\\iff u$ es real.",
          ja: "$\\tfrac{u+3}{u-3}$ が実数 $\\iff u$ が実数。",
          zh: "$\\tfrac{u+3}{u-3}$ 为实数 $\\iff u$ 为实数。"
        }
      },
      {
        title: {
          en: "Imaginary part of u",
          fr: "Partie imaginaire de u",
          es: "Parte imaginaria de u",
          ja: "u の虚部",
          zh: "u 的虚部"
        },
        lines: ["\\frac2z=\\frac{2\\bar z}{|z|^2}\\;\\Rightarrow\\;\\operatorname{Im}u=y\\left(4-\\frac{2}{|z|^2}\\right)"],
        note: {
          en: "With $z=x+iy$.",
          fr: "Avec $z=x+iy$.",
          es: "Con $z=x+iy$.",
          ja: "$z=x+iy$ とする。",
          zh: "设 $z=x+iy$。"
        }
      },
      {
        title: {
          en: "Use y ≠ 0",
          fr: "Utiliser y ≠ 0",
          es: "Usar y ≠ 0",
          ja: "y ≠ 0 を使う",
          zh: "用 y ≠ 0"
        },
        lines: ["4-\\frac{2}{|z|^2}=0\\iff|z|^2=\\boxed{\\tfrac12}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Every point of that circle off the real axis works.",
          fr: "Tout point de ce cercle hors de l’axe réel convient.",
          es: "Vale cualquier punto de esa circunferencia fuera del eje real.",
          ja: "実軸以外のその円上の点はすべて条件を満たす。",
          zh: "该圆上实轴以外的点都满足。"
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
          en: "Two options say the same thing about |z|.",
          fr: "Deux options disent la même chose sur |z|.",
          es: "Dos opciones dicen lo mismo sobre |z|.",
          ja: "2つの選択肢は |z| について同じことを言っています。",
          zh: "有两个选项说的是同一件事。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
