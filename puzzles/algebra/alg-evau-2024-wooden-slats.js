/* algebra · Long, middle and short wooden slats
   EvAU 2024 (Madrid, Spain), Matemáticas II, ordinary session, Question A.1 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-evau-2024-wooden-slats",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "EvAU 2024 (Madrid, Spain), Matemáticas II, ordinary session, Question A.1",
        fr: "EvAU 2024 (Madrid, Espagne), Matemáticas II, session ordinaire, question A.1",
        es: "EvAU 2024 (Madrid), Matemáticas II, convocatoria ordinaria, pregunta A.1",
        ja: "スペイン EvAU 2024（マドリード）数学 II 通常日程 問 A.1",
        zh: "西班牙 EvAU 2024（马德里）数学 II 常规考试 第 A.1 题"
      },
      exams: ["ebau"]
    },
    difficulty: 1,
    title: {
      en: "Long, middle and short wooden slats",
      fr: "Des lattes longues, moyennes et courtes",
      es: "Listones largos, intermedios y cortos",
      ja: "長・中・短の木の板",
      zh: "长、中、短三种木条"
    },
    statement: {
      en: "Slats come in three lengths: long $L$, middle $I$ and short $C$ (in cm). Laid end to end, two long and four middle slats are as long as three middle and fifteen short ones. A long slat is $17$ cm longer than a middle plus a short one. Nine short slats plus $7$ cm equal a middle slat followed by a long one. <b>Which of the following are true?</b>",
      fr: "Des lattes ont trois longueurs : longue $L$, moyenne $I$ et courte $C$ (en cm). Mises bout à bout, deux longues et quatre moyennes mesurent autant que trois moyennes et quinze courtes. Une longue dépasse de $17$ cm une moyenne plus une courte. Neuf courtes plus $7$ cm égalent une moyenne suivie d’une longue. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Hay listones de madera de tres longitudes: largos $L$, intermedios $I$ y cortos $C$ (en cm). Colocados uno tras otro, dos largos con cuatro intermedios miden lo mismo que tres intermedios con quince cortos. Un listón largo supera en $17$ cm la suma de un intermedio y un corto. Con nueve cortos hay que añadir $7$ cm para igualar un intermedio seguido de un largo. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "木の板に長 $L$、中 $I$、短 $C$ の3種類（cm）があります。並べると、長2枚と中4枚は中3枚と短15枚に等しく、長1枚は中1枚と短1枚の和より $17$ cm 長く、短9枚に $7$ cm 足すと中1枚と長1枚に等しくなります。<b>次のうち正しいものはどれですか？</b>",
      zh: "木条有长 $L$、中 $I$、短 $C$ 三种（单位 cm）。首尾相接时，2 根长条加 4 根中条与 3 根中条加 15 根短条等长；1 根长条比 1 根中条加 1 根短条长 $17$ cm；9 根短条再加 $7$ cm 等于 1 根中条接 1 根长条。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Two rows of slats of equal total length: 2 long + 4 middle above, 3 middle + 15 short below.",
      fr: "Deux rangées de lattes de même longueur : 2 longues + 4 moyennes en haut, 3 moyennes + 15 courtes en bas.",
      es: "Dos filas de listones de igual longitud: 2 largos + 4 intermedios arriba, 3 intermedios + 15 cortos abajo.",
      ja: "同じ長さの2列：上は長2＋中4、下は中3＋短15。",
      zh: "两排等长木条：上排 2 长 + 4 中，下排 3 中 + 15 短。"
    },
    hint: {
      en: "$2L+4I=3I+15C$, $L=I+C+17$, $9C+7=I+L$. Substitute $L$ into the third equation.",
      fr: "$2L+4I=3I+15C$, $L=I+C+17$, $9C+7=I+L$. Reportez $L$ dans la troisième.",
      es: "$2L+4I=3I+15C$, $L=I+C+17$, $9C+7=I+L$. Sustituye $L$ en la tercera.",
      ja: "$2L+4I=3I+15C$、$L=I+C+17$、$9C+7=I+L$。$L$ を3式目に代入。",
      zh: "$2L+4I=3I+15C$，$L=I+C+17$，$9C+7=I+L$，把 $L$ 代入第三式。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.6, h: 1.8, scale: 50, pad: 16 });
      const S = 6.0 / (2 * 107 + 4 * 71); let x = 0.3;
      [[107, 'L'], [107, 'L'], [71, 'I'], [71, 'I'], [71, 'I'], [71, 'I']].forEach(([l, t]) => { F.rect(x, 1.0, l * S - 0.03, 0.4, t === 'L' ? 'fill-pink' : 'fill-blue', 'fills'); F.text([x + l * S / 2, 1.2], t, 'len small', 0, 0); x += l * S; });
      x = 0.3; [[71, 'I'], [71, 'I'], [71, 'I']].forEach(([l, t]) => { F.rect(x, 0.3, l * S - 0.03, 0.4, 'fill-blue', 'fills'); F.text([x + l * S / 2, 0.5], t, 'len small', 0, 0); x += l * S; });
      for (let k = 0; k < 15; k++) { F.rect(x, 0.3, 19 * S - 0.02, 0.4, 'fill-yellow', 'fills'); x += 19 * S; }
      F.reveal = () => {
      F.text([6.4, 1.2], '107', 'len small', 12, 0); F.text([6.4, 0.5], '19', 'len small', 12, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "cm": {"fr": "cm", "es": "cm", "ja": "cm", "zh": "cm"},
      "and": {"fr": "et", "es": "y", "ja": "かつ", "zh": "且"},
      "the system has infinitely many solutions": {"fr": "le système a une infinité de solutions", "es": "el sistema tiene infinitas soluciones", "ja": "連立方程式の解は無数", "zh": "方程组有无穷多解"}
    },
    options: [
      { tex: "C=19\\ \\text{cm}", correct: true, why: {
        en: "$I=4C-5$, $L=5C+12$, then $14C+19=15C$.",
        fr: "$I=4C-5$, $L=5C+12$, puis $14C+19=15C$.",
        es: "$I=4C-5$, $L=5C+12$, luego $14C+19=15C$.",
        ja: "$I=4C-5$、$L=5C+12$ から $14C+19=15C$。",
        zh: "$I=4C-5$，$L=5C+12$，再得 $14C+19=15C$。"
      } },
      { tex: "L=107\\ \\text{cm}\\ \\text{and}\\ I=71\\ \\text{cm}", correct: true, why: {
        en: "$L=5\\cdot19+12$, $I=4\\cdot19-5$.",
        fr: "$L=5\\cdot19+12$, $I=4\\cdot19-5$.",
        es: "$L=5\\cdot19+12$, $I=4\\cdot19-5$.",
        ja: "$L=5\\cdot19+12$、$I=4\\cdot19-5$。",
        zh: "$L=5\\cdot19+12$，$I=4\\cdot19-5$。"
      } },
      { tex: "C=17\\ \\text{cm}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "L=100\\ \\text{cm}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "I=76\\ \\text{cm}", correct: false, why: {
        en: "That is $4C$; subtract $5$.",
        fr: "C’est $4C$ ; retirez $5$.",
        es: "Es $4C$; resta $5$.",
        ja: "$4C$ の値。$5$ を引く。",
        zh: "那是 $4C$，还要减 $5$。"
      } },
      { tex: "\\text{the system has infinitely many solutions}", correct: false, why: {
        en: "It has exactly one.",
        fr: "Il en a exactement une.",
        es: "Tiene exactamente una.",
        ja: "解はちょうど1つ。",
        zh: "恰有一组解。"
      } },
      { tex: "L+I+C=200\\ \\text{cm}", correct: false, why: {
        en: "$107+71+19=197$.",
        fr: "$107+71+19=197$.",
        es: "$107+71+19=197$.",
        ja: "$107+71+19=197$。",
        zh: "$107+71+19=197$。"
      } },
      { tex: "2L=3I", correct: false, why: {
        en: "$214\\ne213$, close but not equal.",
        fr: "$214\\ne213$, proche mais pas égal.",
        es: "$214\\ne213$, cerca pero no igual.",
        ja: "$214\\ne213$。",
        zh: "$214\\ne213$，接近但不等。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Equations",
          fr: "Équations",
          es: "Ecuaciones",
          ja: "方程式",
          zh: "列方程"
        },
        lines: ["2L+I=15C,\\qquad L=I+C+17,\\qquad I+L=9C+7"],
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
          en: "Eliminate L",
          fr: "Éliminer L",
          es: "Eliminar L",
          ja: "L を消去",
          zh: "消去 L"
        },
        lines: ["2I+C+17=9C+7\\ \\Rightarrow\\ I=4C-5,\\quad L=5C+12"],
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
        lines: ["2(5C+12)+(4C-5)=15C\\ \\Rightarrow\\ C=19,\\ I=71,\\ L=107"],
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
