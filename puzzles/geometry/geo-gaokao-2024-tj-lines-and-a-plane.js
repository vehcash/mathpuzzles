/* geometry · Lines perpendicular to a plane
   Gaokao 2024, Tianjin paper (天津卷), Question 6 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2024-tj-lines-and-a-plane",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, Tianjin paper (天津卷), Question 6",
        fr: "Gaokao 2024, épreuve de Tianjin (天津卷), question 6",
        es: "Gaokao 2024, examen de Tianjin (天津卷), pregunta 6",
        ja: "2024年 中国・高考 天津卷 第6問",
        zh: "2024年高考数学天津卷 第6题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "Lines perpendicular to a plane",
      fr: "Droites perpendiculaires à un plan",
      es: "Rectas perpendiculares a un plano",
      ja: "平面に垂直な直線",
      zh: "直线与平面垂直"
    },
    statement: {
      en: "$m$ and $n$ are lines and $\\alpha$ is a plane. <b>Which of the following statements are true?</b>",
      fr: "$m$ et $n$ sont des droites et $\\alpha$ un plan. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$m$ y $n$ son rectas y $\\alpha$ un plano. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$m,n$ は直線、$\\alpha$ は平面です。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $m,n$ 是两条直线，$\\alpha$ 是一个平面。<b>下列哪些说法正确？</b>"
    },
    figureText: {
      en: "A plane α drawn as a parallelogram, with a line lying in it.",
      fr: "Un plan α dessiné comme un parallélogramme, avec une droite contenue dedans.",
      es: "Un plano α dibujado como paralelogramo, con una recta contenida en él.",
      ja: "平行四辺形で表した平面 α と、その上の直線。",
      zh: "用平行四边形表示的平面 α 及其中的一条直线。"
    },
    hint: {
      en: "A line perpendicular to a plane is perpendicular to every line in it. Try the rest with a pencil on a table.",
      fr: "Une droite perpendiculaire à un plan est orthogonale à toute droite du plan. Testez le reste avec un crayon sur une table.",
      es: "Una recta perpendicular a un plano es perpendicular a toda recta del plano. Prueba el resto con un lápiz sobre una mesa.",
      ja: "平面に垂直な直線は平面上のすべての直線と垂直。残りは机と鉛筆で試す。",
      zh: "垂直于平面的直线垂直于平面内的所有直线。其余可用桌面和铅笔试试。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.2, scale: 56, pad: 16 });
      F.path([[0.3, 0.4], [3.6, 0.4], [4.7, 1.6], [1.4, 1.6]], 'fill-blue', 'fills', true); F.path([[0.3, 0.4], [3.6, 0.4], [4.7, 1.6], [1.4, 1.6]], 'seg', 'base', true);
      F.seg([1.0, 0.8], [3.6, 1.2], 'seg'); F.text([3.6, 1.2], 'm', 'pt', 10, 0); F.text([4.1, 1.4], 'α', 'pt', 0, 0);
      F.reveal = () => {
      F.seg([2.3, 1.0], [2.3, 3.0], 'hl pink'); F.text([2.3, 3.0], 'n', 'pt', 10, 4); F.dot([2.3, 1.0]);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "is perpendicular to every line in": {"fr": "est orthogonale à toute droite de", "es": "es perpendicular a toda recta de", "ja": "は次の平面上のすべての直線と垂直：", "zh": "垂直于下列平面内所有直线："}
    },
    options: [
      { tex: "m\\subset\\alpha,\\ n\\perp\\alpha\\ \\Rightarrow\\ m\\perp n", correct: true, why: {
        en: "$n$ is perpendicular to every line of $\\alpha$.",
        fr: "$n$ est orthogonale à toute droite de $\\alpha$.",
        es: "$n$ es perpendicular a toda recta de $\\alpha$.",
        ja: "$n$ は $\\alpha$ 上のすべての直線と垂直。",
        zh: "$n$ 垂直于 $\\alpha$ 内所有直线。"
      } },
      { tex: "m\\perp\\alpha,\\ n\\perp\\alpha\\ \\Rightarrow\\ m\\parallel n", correct: true, why: {
        en: "Two lines perpendicular to the same plane are parallel.",
        fr: "Deux droites perpendiculaires au même plan sont parallèles.",
        es: "Dos rectas perpendiculares al mismo plano son paralelas.",
        ja: "同じ平面に垂直な2直線は平行。",
        zh: "垂直于同一平面的两条直线平行。"
      } },
      { tex: "m\\perp\\alpha,\\ n\\perp\\alpha\\ \\Rightarrow\\ m\\perp n", correct: false, why: {
        en: "They are parallel, not perpendicular.",
        fr: "Elles sont parallèles, pas orthogonales.",
        es: "Son paralelas, no perpendiculares.",
        ja: "平行であって垂直ではない。",
        zh: "它们平行，不垂直。"
      } },
      { tex: "m\\subset\\alpha,\\ m\\perp n\\ \\Rightarrow\\ n\\perp\\alpha", correct: false, why: {
        en: "$n$ could lie in $\\alpha$ too.",
        fr: "$n$ pourrait aussi être dans $\\alpha$.",
        es: "$n$ también podría estar en $\\alpha$.",
        ja: "$n$ も $\\alpha$ 上にありうる。",
        zh: "$n$ 也可能在 $\\alpha$ 内。"
      } },
      { tex: "m\\perp\\alpha,\\ m\\perp n\\ \\Rightarrow\\ n\\perp\\alpha", correct: false, why: {
        en: "Then $n\\parallel\\alpha$ or $n\\subset\\alpha$.",
        fr: "Alors $n\\parallel\\alpha$ ou $n\\subset\\alpha$.",
        es: "Entonces $n\\parallel\\alpha$ o $n\\subset\\alpha$.",
        ja: "このとき $n\\parallel\\alpha$ または $n\\subset\\alpha$。",
        zh: "此时 $n\\parallel\\alpha$ 或 $n\\subset\\alpha$。"
      } },
      { tex: "m\\parallel\\alpha,\\ n\\parallel\\alpha\\ \\Rightarrow\\ m\\parallel n", correct: false, why: {
        en: "Two lines parallel to a table top can cross at any angle.",
        fr: "Deux droites parallèles à une table peuvent se croiser sous n’importe quel angle.",
        es: "Dos rectas paralelas a una mesa pueden formar cualquier ángulo.",
        ja: "机に平行な2直線はどんな角度でもありうる。",
        zh: "平行于桌面的两条直线可成任意角。"
      } },
      { tex: "m\\subset\\alpha,\\ n\\parallel\\alpha\\ \\Rightarrow\\ m\\parallel n", correct: false, why: {
        en: "They may be skew.",
        fr: "Elles peuvent être non coplanaires.",
        es: "Pueden cruzarse sin cortarse.",
        ja: "ねじれの位置もありうる。",
        zh: "可能异面。"
      } },
      { tex: "m\\perp n,\\ n\\perp\\alpha\\ \\Rightarrow\\ m\\subset\\alpha", correct: false, why: {
        en: "$m$ could also be parallel to $\\alpha$ without lying in it.",
        fr: "$m$ peut aussi être parallèle à $\\alpha$ sans y être.",
        es: "$m$ también puede ser paralela a $\\alpha$ sin estar en él.",
        ja: "$m$ は $\\alpha$ 上になく平行のこともある。",
        zh: "$m$ 也可能平行于 $\\alpha$ 而不在其内。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Definition",
          fr: "Définition",
          es: "Definición",
          ja: "定義",
          zh: "定义"
        },
        lines: ["n\\perp\\alpha\\iff n\\ \\text{is perpendicular to every line in}\\ \\alpha"],
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
          en: "Check each claim",
          fr: "Vérifier chaque affirmation",
          es: "Comprobar cada afirmación",
          ja: "各命題を確認",
          zh: "逐条检验"
        },
        lines: ["m,n\\perp\\alpha\\Rightarrow m\\parallel n;\\qquad m\\subset\\alpha,\\ n\\perp\\alpha\\Rightarrow m\\perp n"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "In the exam only the second of these was offered; the first is a standard theorem.",
          fr: "Dans l’épreuve seule la seconde était proposée ; la première est un théorème classique.",
          es: "En el examen solo se ofrecía la segunda; la primera es un teorema clásico.",
          ja: "原題では後者のみが選択肢。前者は基本定理。",
          zh: "原题只给出后者；前者是基本定理。"
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
