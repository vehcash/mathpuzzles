/* algebra · Eighty points from three kinds of shot
   PAU 2025 (Madrid, Spain), Matemáticas II, ordinary session (June 2025), Question 1.1 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-evau-2025-basketball-shots",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "PAU 2025 (Madrid, Spain), Matemáticas II, ordinary session (June 2025), Question 1.1",
        fr: "PAU 2025 (Madrid, Espagne), Matemáticas II, session ordinaire (juin 2025), question 1.1",
        es: "PAU 2025 (Madrid), Matemáticas II, convocatoria ordinaria (junio de 2025), pregunta 1.1",
        ja: "スペイン PAU 2025（マドリード）数学 II 通常日程（2025年6月）問 1.1",
        zh: "西班牙 PAU 2025（马德里）数学 II 常规考试（2025年6月）第 1.1 题"
      },
      exams: ["ebau"]
    },
    difficulty: 2,
    title: {
      en: "Eighty points from three kinds of shot",
      fr: "Quatre-vingts points avec trois types de tirs",
      es: "Ochenta puntos con tres tipos de lanzamiento",
      ja: "3種類のシュートで80点",
      zh: "三种投篮共得 80 分"
    },
    statement: {
      en: "A team scored $80$ points, making $80\\%$ of its $1$-point shots, $50\\%$ of its $2$-point shots and $40\\%$ of its $3$-point shots. A third of the $2$-point attempts equals a fifth of all the other attempts, and twice the $3$-point attempts is $5$ less than all the other attempts. Let $x,y,z$ be the numbers of $1$-, $2$- and $3$-point attempts. <b>Which of the following are true?</b>",
      fr: "Une équipe a marqué $80$ points, réussissant $80\\,\\%$ de ses tirs à $1$ point, $50\\,\\%$ à $2$ points et $40\\,\\%$ à $3$ points. Le tiers des tirs à $2$ points égale le cinquième des autres tirs, et le double des tirs à $3$ points vaut $5$ de moins que les autres tirs. Soit $x,y,z$ les nombres de tirs à $1$, $2$ et $3$ points. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Un equipo anotó $80$ puntos, acertando el $80\\,\\%$ de sus tiros de $1$ punto, el $50\\,\\%$ de los de $2$ y el $40\\,\\%$ de los de $3$. La tercera parte de los lanzamientos de $2$ puntos es la quinta parte del resto, y el doble de los de $3$ puntos es $5$ unidades menor que el resto. Sean $x,y,z$ los lanzamientos de $1$, $2$ y $3$ puntos. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "あるチームは $80$ 点を取り、1点シュートの $80\\%$、2点の $50\\%$、3点の $40\\%$ を決めました。2点シュートの試投数の $\\tfrac13$ はそれ以外の試投数の $\\tfrac15$ に等しく、3点の試投数の2倍はそれ以外の試投数より $5$ 少ない。1点・2点・3点の試投数を $x,y,z$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "某队共得 $80$ 分：罚球（1 分）命中 $80\\%$，2 分球命中 $50\\%$，3 分球命中 $40\\%$。2 分球出手数的三分之一等于其余出手数的五分之一；3 分球出手数的两倍比其余出手数少 $5$。设 1、2、3 分出手数为 $x,y,z$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Three baskets labelled 1, 2 and 3 points, each with its success rate.",
      fr: "Trois paniers marqués 1, 2 et 3 points, chacun avec son taux de réussite.",
      es: "Tres canastas de 1, 2 y 3 puntos, cada una con su porcentaje de acierto.",
      ja: "1点・2点・3点のゴールと成功率。",
      zh: "标有 1、2、3 分的三个篮筐及命中率。"
    },
    hint: {
      en: "Points: $0.8x+2(0.5y)+3(0.4z)=80$. The other two sentences: $5y=3(x+z)$ and $2z=x+y-5$.",
      fr: "Points : $0{,}8x+2(0{,}5y)+3(0{,}4z)=80$. Les deux autres phrases : $5y=3(x+z)$ et $2z=x+y-5$.",
      es: "Puntos: $0{,}8x+2(0{,}5y)+3(0{,}4z)=80$. Las otras dos frases: $5y=3(x+z)$ y $2z=x+y-5$.",
      ja: "得点：$0.8x+2(0.5y)+3(0.4z)=80$。他の2文は $5y=3(x+z)$、$2z=x+y-5$。",
      zh: "得分：$0.8x+2(0.5y)+3(0.4z)=80$；另两句：$5y=3(x+z)$，$2z=x+y-5$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 2.2, scale: 50, pad: 16 });
      [['1', '80 %'], ['2', '50 %'], ['3', '40 %']].forEach(([t, r], k) => { const cx = 1.0 + k * 2.0; F.circle([cx, 1.3], 0.5, 'fill-blue'); F.text([cx, 1.3], t, 'pt', 0, 0); F.text([cx, 0.5], r, 'len small', 0, 6); });
      F.reveal = () => {
      ['25', '30', '25'].forEach((t, k) => F.text([1.0 + k * 2.0, 2.0], t, 'len small', 0, -4));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "80 %": {"fr": "80 %", "es": "80 %", "ja": "80 %", "zh": "80 %"},
      "50 %": {"fr": "50 %", "es": "50 %", "ja": "50 %", "zh": "50 %"},
      "40 %": {"fr": "40 %", "es": "40 %", "ja": "40 %", "zh": "40 %"},
      "25": {"fr": "25", "es": "25", "ja": "25", "zh": "25"},
      "30": {"fr": "30", "es": "30", "ja": "30", "zh": "30"},
      "the team made": {"fr": "l’équipe a réussi", "es": "el equipo anotó", "ja": "チームが決めたのは", "zh": "球队命中了"},
      "one-point shots": {"fr": "tirs à 1 point", "es": "tiros de 1 punto", "ja": "本の1点シュート", "zh": "个罚球"},
      "3-pointers gave": {"fr": "les tirs à 3 points ont donné", "es": "los triples dieron", "ja": "3点シュートの得点は", "zh": "三分球得到"},
      "points": {"fr": "points", "es": "puntos", "ja": "点", "zh": "分"},
      "the system has infinitely many solutions": {"fr": "le système a une infinité de solutions", "es": "el sistema tiene infinitas soluciones", "ja": "連立方程式の解は無数", "zh": "方程组有无穷多解"}
    },
    options: [
      { tex: "x=25", correct: true, why: {
        en: "$(x,y,z)=(25,30,25)$",
        fr: "$(x,y,z)=(25,30,25)$",
        es: "$(x,y,z)=(25,30,25)$",
        ja: "$(x,y,z)=(25,30,25)$",
        zh: "$(x,y,z)=(25,30,25)$"
      } },
      { tex: "y=30", correct: true, why: {
        en: "$20+30+30=80$ ✓",
        fr: "$20+30+30=80$ ✓",
        es: "$20+30+30=80$ ✓",
        ja: "$20+30+30=80$ ✓",
        zh: "$20+30+30=80$ ✓"
      } },
      { tex: "z=30", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "x=30", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "x+y+z=75", correct: false, why: {
        en: "$25+30+25=80$",
        fr: "$25+30+25=80$",
        es: "$25+30+25=80$",
        ja: "$25+30+25=80$",
        zh: "$25+30+25=80$"
      } },
      { tex: "\\text{the team made}\\ 30\\ \\text{one-point shots}", correct: false, why: {
        en: "$0.8\\cdot25=20$",
        fr: "$0.8\\cdot25=20$",
        es: "$0.8\\cdot25=20$",
        ja: "$0.8\\cdot25=20$",
        zh: "$0.8\\cdot25=20$"
      } },
      { tex: "\\text{3-pointers gave}\\ 25\\ \\text{points}", correct: false, why: {
        en: "$3\\cdot0.4\\cdot25=30$",
        fr: "$3\\cdot0.4\\cdot25=30$",
        es: "$3\\cdot0.4\\cdot25=30$",
        ja: "$3\\cdot0.4\\cdot25=30$",
        zh: "$3\\cdot0.4\\cdot25=30$"
      } },
      { tex: "\\text{the system has infinitely many solutions}", correct: false, why: {
        en: "Its determinant is non-zero: one solution.",
        fr: "Son déterminant est non nul : une seule solution.",
        es: "Su determinante no es nulo: una única solución.",
        ja: "行列式が $0$ でないので解は1つ。",
        zh: "行列式非零，唯一解。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Three equations",
          fr: "Trois équations",
          es: "Tres ecuaciones",
          ja: "3つの式",
          zh: "三个方程"
        },
        lines: ["0.8x+y+1.2z=80,\\quad 3x-5y+3z=0,\\quad x+y-2z=5"],
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
          en: "Solve",
          fr: "Résoudre",
          es: "Resolver",
          ja: "解く",
          zh: "求解"
        },
        lines: ["(x,y,z)=(25,30,25)"],
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
