/* calculus · sin² x against a semicircle
   JEE Advanced 2024 (India), Paper 2, Mathematics Q.16–17 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-jee-2024-sin2-times-semicircle",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 2, Mathematics Q.16–17",
        fr: "JEE Advanced 2024 (Inde), épreuve 2, mathématiques Q.16–17",
        es: "JEE Advanced 2024 (India), prueba 2, matemáticas Q.16–17",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 2 数学 Q.16–17",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷二 数学 Q.16–17"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "sin² x against a semicircle",
      fr: "sin² x contre un demi-cercle",
      es: "sen² x frente a una semicircunferencia",
      ja: "sin² x と半円",
      zh: "sin² x 与半圆"
    },
    statement: {
      en: "$f(x)=\\sin^2x$ and $g(x)=\\sqrt{\\dfrac{\\pi x}{2}-x^2}$ on $\\left[0,\\tfrac\\pi2\\right]$. <b>Which of the following are true?</b>",
      fr: "$f(x)=\\sin^2x$ et $g(x)=\\sqrt{\\dfrac{\\pi x}{2}-x^2}$ sur $\\left[0,\\tfrac\\pi2\\right]$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$f(x)=\\sin^2x$ y $g(x)=\\sqrt{\\dfrac{\\pi x}{2}-x^2}$ en $\\left[0,\\tfrac\\pi2\\right]$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$\\left[0,\\tfrac\\pi2\\right]$ 上で $f(x)=\\sin^2x$、$g(x)=\\sqrt{\\dfrac{\\pi x}{2}-x^2}$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "在 $\\left[0,\\tfrac\\pi2\\right]$ 上，$f(x)=\\sin^2x$，$g(x)=\\sqrt{\\dfrac{\\pi x}{2}-x^2}$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The graph of g: a semicircle of radius π/4 centred at π/4, and the graph of sin² x on the same interval.",
      fr: "La courbe de g : un demi-cercle de rayon π/4 centré en π/4, et la courbe de sin² x sur le même intervalle.",
      es: "La gráfica de g: una semicircunferencia de radio π/4 centrada en π/4, y la de sen² x en el mismo intervalo.",
      ja: "g のグラフ（中心 π/4・半径 π/4 の半円）と同じ区間の sin² x。",
      zh: "g 的图像是以 π/4 为圆心、π/4 为半径的半圆，以及同一区间上的 sin² x。"
    },
    hint: {
      en: "$g$ is symmetric about $x=\\tfrac\\pi4$, and $x\\mapsto\\tfrac\\pi2-x$ turns $\\sin^2$ into $\\cos^2$.",
      fr: "$g$ est symétrique par rapport à $x=\\tfrac\\pi4$, et $x\\mapsto\\tfrac\\pi2-x$ change $\\sin^2$ en $\\cos^2$.",
      es: "$g$ es simétrica respecto de $x=\\tfrac\\pi4$, y $x\\mapsto\\tfrac\\pi2-x$ cambia $\\sin^2$ en $\\cos^2$.",
      ja: "$g$ は $x=\\tfrac\\pi4$ に関して対称。$x\\mapsto\\tfrac\\pi2-x$ で $\\sin^2$ は $\\cos^2$ に。",
      zh: "$g$ 关于 $x=\\tfrac\\pi4$ 对称，$x\\mapsto\\tfrac\\pi2-x$ 把 $\\sin^2$ 变成 $\\cos^2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 2.2, h: 1.3, scale: 150, pad: 16 });
      const T = F.T = axes(F, -0.3, 1.9, -0.2, 1.1);
      const c = Math.PI / 4; plot(F, T, x => Math.sqrt(Math.max(0, Math.PI * x / 2 - x * x)), 0, Math.PI / 2, 'graph', 'base', -0.2, 1.1);
      plot(F, T, x => Math.sin(x) ** 2, 0, Math.PI / 2, 'hl blue', 'base', -0.2, 1.1);
      F.text(T([Math.PI / 2, 0]), 'π/2', 'tick', 0, 14); F.text(T([c, 0]), 'π/4', 'tick', 0, 14); F.text(T([1.1, 0.5]), 'g', 'pt', 40, -6); F.text(T([0.95, 1.05]), 'sin²', 'len small', 0, 0);
      F.reveal = () => {
      F.seg(T([c, 0]), T([c, 1.05]), 'seg thin dashc');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "is symmetric about": {"fr": "est symétrique par rapport à", "es": "es simétrica respecto de", "ja": "は次に関して対称：", "zh": "关于下列对称："}
    },
    options: [
      { tex: "2\\int_0^{\\pi/2}fg\\,dx-\\int_0^{\\pi/2}g\\,dx=0", correct: true, why: {
        en: "$\\int fg=\\int\\cos^2\\!\\cdot g$, so $\\int fg=\\tfrac12\\int g$.",
        fr: "$\\int fg=\\int\\cos^2\\!\\cdot g$, donc $\\int fg=\\tfrac12\\int g$.",
        es: "$\\int fg=\\int\\cos^2\\!\\cdot g$, así que $\\int fg=\\tfrac12\\int g$.",
        ja: "$\\int fg=\\int\\cos^2\\!\\cdot g$ より $\\int fg=\\tfrac12\\int g$。",
        zh: "$\\int fg=\\int\\cos^2\\!\\cdot g$，故 $\\int fg=\\tfrac12\\int g$。"
      } },
      { tex: "\\frac{16}{\\pi^3}\\int_0^{\\pi/2}fg\\,dx=\\frac14", correct: true, why: {
        en: "$\\int g=\\tfrac12\\pi\\left(\\tfrac\\pi4\\right)^2=\\tfrac{\\pi^3}{32}$, so $\\int fg=\\tfrac{\\pi^3}{64}$.",
        fr: "$\\int g=\\tfrac12\\pi\\left(\\tfrac\\pi4\\right)^2=\\tfrac{\\pi^3}{32}$, donc $\\int fg=\\tfrac{\\pi^3}{64}$.",
        es: "$\\int g=\\tfrac12\\pi\\left(\\tfrac\\pi4\\right)^2=\\tfrac{\\pi^3}{32}$, así que $\\int fg=\\tfrac{\\pi^3}{64}$.",
        ja: "$\\int g=\\tfrac12\\pi\\left(\\tfrac\\pi4\\right)^2=\\tfrac{\\pi^3}{32}$ より $\\int fg=\\tfrac{\\pi^3}{64}$。",
        zh: "$\\int g=\\tfrac12\\pi\\left(\\tfrac\\pi4\\right)^2=\\tfrac{\\pi^3}{32}$，故 $\\int fg=\\tfrac{\\pi^3}{64}$。"
      } },
      { tex: "\\int_0^{\\pi/2}g\\,dx=\\frac{\\pi^3}{16}", correct: false, why: {
        en: "That is a full disc's area; $g$ is a half-disc.",
        fr: "C’est l’aire d’un disque entier ; $g$ est un demi-disque.",
        es: "Es el área de un disco entero; $g$ es medio disco.",
        ja: "円全体の面積。$g$ は半円。",
        zh: "那是整圆面积，$g$ 只是半圆。"
      } },
      { tex: "\\frac{16}{\\pi^3}\\int_0^{\\pi/2}fg\\,dx=\\frac12", correct: false, why: {
        en: "This uses $\\int fg=\\int g$.",
        fr: "Cela prend $\\int fg=\\int g$.",
        es: "Toma $\\int fg=\\int g$.",
        ja: "$\\int fg=\\int g$ としている。",
        zh: "误用 $\\int fg=\\int g$。"
      } },
      { tex: "2\\int_0^{\\pi/2}fg\\,dx-\\int_0^{\\pi/2}g\\,dx=\\frac{\\pi^3}{64}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\int_0^{\\pi/2}fg\\,dx=\\int_0^{\\pi/2}g\\,dx", correct: false, why: {
        en: "$f\\le1$ and $f<1$ almost everywhere, so $\\int fg<\\int g$.",
        fr: "$f<1$ presque partout, donc $\\int fg<\\int g$.",
        es: "$f<1$ casi en todo punto, así que $\\int fg<\\int g$.",
        ja: "ほぼ全域で $f<1$ なので $\\int fg<\\int g$。",
        zh: "$f$ 几乎处处小于 $1$，故 $\\int fg<\\int g$。"
      } },
      { tex: "\\frac{16}{\\pi^3}\\int_0^{\\pi/2}fg\\,dx=1", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "g\\ \\text{is symmetric about}\\ x=\\tfrac\\pi2", correct: false, why: {
        en: "About $x=\\tfrac\\pi4$, the midpoint of the interval.",
        fr: "Par rapport à $x=\\tfrac\\pi4$, le milieu de l’intervalle.",
        es: "Respecto de $x=\\tfrac\\pi4$, el punto medio del intervalo.",
        ja: "区間の中点 $x=\\tfrac\\pi4$ に関して対称。",
        zh: "关于区间中点 $x=\\tfrac\\pi4$ 对称。"
      } }
    ],
    steps: [
      {
        title: {
          en: "g is a semicircle",
          fr: "g est un demi-cercle",
          es: "g es una semicircunferencia",
          ja: "g は半円",
          zh: "g 是半圆"
        },
        lines: ["y^2=\\tfrac{\\pi x}2-x^2\\iff\\left(x-\\tfrac\\pi4\\right)^2+y^2=\\left(\\tfrac\\pi4\\right)^2,\\quad\\int_0^{\\pi/2}g=\\frac{\\pi^3}{32}"],
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
          en: "Symmetry",
          fr: "Symétrie",
          es: "Simetría",
          ja: "対称性",
          zh: "对称性"
        },
        lines: ["x\\mapsto\\tfrac\\pi2-x:\\ \\int\\sin^2x\\,g=\\int\\cos^2x\\,g\\ \\Rightarrow\\ \\int fg=\\tfrac12\\int g=\\frac{\\pi^3}{64}"],
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
          en: "Both answers",
          fr: "Les deux réponses",
          es: "Las dos respuestas",
          ja: "2つの答え",
          zh: "两个答案"
        },
        lines: ["2\\cdot\\frac{\\pi^3}{64}-\\frac{\\pi^3}{32}=0,\\qquad\\frac{16}{\\pi^3}\\cdot\\frac{\\pi^3}{64}=\\frac14"],
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
