/* algebra · 9ˣ against 3ˣ − 2ˣ
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2023, 1st phase (16 October 2022), Mathematics, Question 41 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-ita-2023-nine-to-x-versus-difference",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2023, 1st phase (16 October 2022), Mathematics, Question 41",
        fr: "Concours de l’ITA (Brésil) 2023, 1re phase (16 octobre 2022), mathématiques, question 41",
        es: "Examen de ingreso del ITA (Brasil) 2023, 1.ª fase (16 de octubre de 2022), matemáticas, pregunta 41",
        ja: "ITA（ブラジル航空技術大学）2023 入試 第1次（2022年10月16日）数学 第41問",
        zh: "巴西航空技术学院 ITA 2023 入学考试第一阶段（2022年10月16日）数学第 41 题"
      },
      exams: ["ita"]
    },
    difficulty: 2,
    title: {
      en: "9ˣ against 3ˣ − 2ˣ",
      fr: "9ˣ face à 3ˣ − 2ˣ",
      es: "9ˣ frente a 3ˣ − 2ˣ",
      ja: "9ˣ と 3ˣ − 2ˣ",
      zh: "9ˣ 与 3ˣ − 2ˣ"
    },
    statement: {
      en: "Let $f(x)=3^{2x}$ and $g(x)=3^x-2^x$ for real $x$. <b>Which of the following are true?</b>",
      fr: "Soit $f(x)=3^{2x}$ et $g(x)=3^x-2^x$ pour $x$ réel. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sean $f(x)=3^{2x}$ y $g(x)=3^x-2^x$ para $x$ real. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "実数 $x$ に対し $f(x)=3^{2x}$、$g(x)=3^x-2^x$。<b>次のうち正しいものはどれですか？</b>",
      zh: "对实数 $x$，$f(x)=3^{2x}$，$g(x)=3^x-2^x$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The graphs of f and g; g dips below the axis for negative x.",
      fr: "Les courbes de f et g ; g passe sous l’axe pour x négatif.",
      es: "Las gráficas de f y g; g baja del eje para x negativo.",
      ja: "f と g のグラフ。x < 0 で g は軸の下。",
      zh: "f 与 g 的图像，x 为负时 g 在轴下方。"
    },
    hint: {
      en: "Try $x=-1$. For $x>0$ compare $9^x$ with $3^x$.",
      fr: "Essayez $x=-1$. Pour $x>0$, comparez $9^x$ et $3^x$.",
      es: "Prueba $x=-1$. Para $x>0$ compara $9^x$ con $3^x$.",
      ja: "$x=-1$ を試す。$x>0$ では $9^x$ と $3^x$ を比べる。",
      zh: "试 $x=-1$；$x>0$ 时比较 $9^x$ 与 $3^x$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.6, scale: 56, pad: 16 });
      const T = F.T = axes(F, -3, 2, -0.6, 3.0);
      plot(F, T, x => 9 ** x, -3, 0.49, 'graph', 'base', -0.6, 3.0);
      plot(F, T, x => 3 ** x - 2 ** x, -3, 1.9, 'conic', 'base', -0.6, 3.0);
      F.text(T([0.45, 2.7]), 'f', 'pt', 10, 0); F.text(T([1.5, 3 ** 1.5 - 2 ** 1.5]), 'g', 'pt', 12, 4);
      F.reveal = () => {
      F.dot(T([-1, -1 / 6])); F.text(T([-1, -1 / 6]), 'g(−1) = −1/6', 'len small', 0, 16);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "f": {"fr": "f", "es": "f", "ja": "f", "zh": "f"},
      "g": {"fr": "g", "es": "g", "ja": "g", "zh": "g"},
      "g(−1) = −1/6": {"fr": "g(−1) = −1/6", "es": "g(−1) = −1/6", "ja": "g(−1) = −1/6", "zh": "g(−1) = −1/6"},
      "for all real": {"fr": "pour tout réel", "es": "para todo real", "ja": "すべての実数", "zh": "对所有实数"},
      "is increasing on": {"fr": "est croissante sur", "es": "es creciente en", "ja": "は次で増加：", "zh": "在下列区间递增"},
      "for some": {"fr": "pour un certain", "es": "para algún", "ja": "ある", "zh": "对某个"},
      "only for": {"fr": "seulement pour", "es": "solo para", "ja": "のみ", "zh": "仅当"}
    },
    options: [
      { tex: "f(x)\\ge g(x)\\ \\text{for all real}\\ x", correct: true, why: {
        en: "For $x\\le0$, $g\\le0<f$; for $x>0$, $9^x\\ge3^x>3^x-2^x$.",
        fr: "Pour $x\\le0$, $g\\le0<f$ ; pour $x>0$, $9^x\\ge3^x>3^x-2^x$.",
        es: "Para $x\\le0$, $g\\le0<f$; para $x>0$, $9^x\\ge3^x>3^x-2^x$.",
        ja: "$x\\le0$ で $g\\le0<f$、$x>0$ で $9^x\\ge3^x>3^x-2^x$。",
        zh: "$x\\le0$ 时 $g\\le0<f$；$x>0$ 时 $9^x\\ge3^x>3^x-2^x$。"
      } },
      { tex: "f(-1)+g(-1)<0", correct: true, why: {
        en: "$\\tfrac19-\\tfrac16=-\\tfrac1{18}$",
        fr: "$\\tfrac19-\\tfrac16=-\\tfrac1{18}$",
        es: "$\\tfrac19-\\tfrac16=-\\tfrac1{18}$",
        ja: "$\\tfrac19-\\tfrac16=-\\tfrac1{18}$",
        zh: "$\\tfrac19-\\tfrac16=-\\tfrac1{18}$"
      } },
      { tex: "g(x)\\ge0\\ \\text{for all real}\\ x", correct: false, why: {
        en: "$g(-1)=\\tfrac13-\\tfrac12<0$",
        fr: "$g(-1)=\\tfrac13-\\tfrac12<0$",
        es: "$g(-1)=\\tfrac13-\\tfrac12<0$",
        ja: "$g(-1)=\\tfrac13-\\tfrac12<0$",
        zh: "$g(-1)=\\tfrac13-\\tfrac12<0$"
      } },
      { tex: "f(x)+g(x)\\ge0\\ \\text{for all real}\\ x", correct: false, why: {
        en: "$x=-1$: $-\\tfrac1{18}$",
        fr: "$x=-1$: $-\\tfrac1{18}$",
        es: "$x=-1$: $-\\tfrac1{18}$",
        ja: "$x=-1$: $-\\tfrac1{18}$",
        zh: "$x=-1$: $-\\tfrac1{18}$"
      } },
      { tex: "g\\ \\text{is increasing on}\\ \\mathbb R", correct: false, why: {
        en: "$g(-3)\\approx-0.088>g(-1)\\approx-0.167$: $g$ first decreases.",
        fr: "$g(-3)\\approx-0{,}088>g(-1)\\approx-0{,}167$ : $g$ décroît d’abord.",
        es: "$g(-3)\\approx-0{,}088>g(-1)\\approx-0{,}167$: $g$ primero decrece.",
        ja: "$g(-3)\\approx-0.088>g(-1)\\approx-0.167$。最初は減少。",
        zh: "$g(-3)\\approx-0.088>g(-1)\\approx-0.167$，先减。"
      } },
      { tex: "f(x)=g(x)\\ \\text{for some}\\ x", correct: false, why: {
        en: "$f>g$ everywhere.",
        fr: "$f>g$ partout.",
        es: "$f>g$ en todo punto.",
        ja: "どこでも $f>g$。",
        zh: "处处 $f>g$。"
      } },
      { tex: "g(x)=0\\ \\text{only for}\\ x=1", correct: false, why: {
        en: "$g(x)=0\\iff(3/2)^x=1\\iff x=0$",
        fr: "$g(x)=0\\iff(3/2)^x=1\\iff x=0$",
        es: "$g(x)=0\\iff(3/2)^x=1\\iff x=0$",
        ja: "$g(x)=0\\iff(3/2)^x=1\\iff x=0$",
        zh: "$g(x)=0\\iff(3/2)^x=1\\iff x=0$"
      } },
      { tex: "f(-1)=-9", correct: false, why: {
        en: "$9^{-1}=\\tfrac19$",
        fr: "$9^{-1}=\\tfrac19$",
        es: "$9^{-1}=\\tfrac19$",
        ja: "$9^{-1}=\\tfrac19$",
        zh: "$9^{-1}=\\tfrac19$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Test x = −1",
          fr: "Tester x = −1",
          es: "Probar x = −1",
          ja: "x = −1 を試す",
          zh: "试 x = −1"
        },
        lines: ["g(-1)=-\\tfrac16,\\quad f(-1)+g(-1)=-\\tfrac1{18}"],
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
          en: "Compare f and g",
          fr: "Comparer f et g",
          es: "Comparar f y g",
          ja: "f と g を比べる",
          zh: "比较 f 与 g"
        },
        lines: ["x\\le0:\\ g\\le0<f;\\qquad x>0:\\ 9^x\\ge3^x>3^x-2^x"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "In the exam: statements I, II, III with answer “only II”.",
          fr: "Dans l’épreuve : affirmations I, II, III, réponse « seulement II ».",
          es: "En el examen: afirmaciones I, II, III con respuesta «solo II».",
          ja: "原題は I, II, III の判定で答えは「II のみ」。",
          zh: "原题为判断 I、II、III，答案“只有 II”。"
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
