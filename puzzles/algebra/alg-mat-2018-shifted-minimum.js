/* algebra · Where is the minimum after a shift?
   Oxford MAT 2018 (Mathematics Admissions Test), Question 1D */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2018-shifted-minimum",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2018 (Mathematics Admissions Test), Question 1D",
        fr: "MAT d’Oxford 2018 (test d’admission en mathématiques), question 1D",
        es: "MAT de Oxford 2018 (prueba de admisión de matemáticas), pregunta 1D",
        ja: "オックスフォード大学 数学入学試験 MAT 2018 問題 1D",
        zh: "牛津大学数学入学考试 MAT 2018 第 1D 题"
      },
      exams: ["mat"]
    },
    difficulty: 1,
    title: {
      en: "Where is the minimum after a shift?",
      fr: "Où est le minimum après translation ?",
      es: "¿Dónde está el mínimo tras desplazar?",
      ja: "平行移動後の最小点は？",
      zh: "平移后的最低点在哪？"
    },
    statement: {
      en: "$f(x)=x^2-5x+7$. <b>Which of the following are true about the graph of $y=f(x-2)$?</b>",
      fr: "$f(x)=x^2-5x+7$. <b>Lesquelles des affirmations suivantes sur la courbe de $y=f(x-2)$ sont vraies ?</b>",
      es: "$f(x)=x^2-5x+7$. <b>¿Cuáles de las siguientes afirmaciones sobre la gráfica de $y=f(x-2)$ son verdaderas?</b>",
      ja: "$f(x)=x^2-5x+7$ とします。<b>$y=f(x-2)$ のグラフについて正しいものはどれですか？</b>",
      zh: "$f(x)=x^2-5x+7$。<b>关于 $y=f(x-2)$ 的图像，下列哪些正确？</b>"
    },
    figureText: {
      en: "The parabola y = f(x) = x² − 5x + 7. The shifted graph is drawn in the solution.",
      fr: "La parabole y = f(x) = x² − 5x + 7. La courbe décalée est tracée dans la solution.",
      es: "La parábola y = f(x) = x² − 5x + 7. La gráfica desplazada se dibuja en la solución.",
      ja: "放物線 y = f(x) = x² − 5x + 7。平行移動したグラフは解答で描きます。",
      zh: "抛物线 y = f(x) = x² − 5x + 7。平移后的图像在解答中画出。"
    },
    hint: {
      en: "$f(x-2)$ is $f$ moved $2$ to the right. First find the vertex of $f$.",
      fr: "$f(x-2)$ est $f$ décalée de $2$ vers la droite. Trouvez d’abord le sommet de $f$.",
      es: "$f(x-2)$ es $f$ desplazada $2$ a la derecha. Halla primero el vértice de $f$.",
      ja: "$f(x-2)$ は $f$ を右に $2$ ずらしたもの。まず $f$ の頂点を。",
      zh: "$f(x-2)$ 是把 $f$ 右移 $2$。先求 $f$ 的顶点。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7.0, h: 3.6, scale: 44, pad: 18 });
      const T = F.T = axes(F, -0.3, 6.7, -0.3, 3.3);
      const f = x => x * x - 5 * x + 7;
      plot(F, T, f, 0.9, 4.1, 'graph', 'base', -0.3, 3.3); F.text(T([0.95, f(0.95)]), 'y = f(x)', 'len small', -10, -12);
      F.reveal = () => {
      plot(F, T, x => f(x - 2), 2.9, 6.1, 'graph', 'base', -0.3, 3.3);
      F.dot(T([2.5, 0.75])); F.dot(T([4.5, 0.75])); arrow(F, T([2.7, 0.75]), T([4.3, 0.75]));
      F.text(T([4.5, 0.75]), '(9/2, 3/4)', 'len small', 0, 16);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "the minimum point is": {"fr": "le point minimum est", "es": "el punto mínimo es", "ja": "最小点は", "zh": "最低点为"},
      "the minimum value is": {"fr": "la valeur minimale est", "es": "el valor mínimo es", "ja": "最小値は", "zh": "最小值为"},
      "at": {"fr": "en", "es": "en", "ja": "で", "zh": "在"}
    },
    options: [
      { tex: "\\text{the minimum point is } \\left(\\tfrac92,\\tfrac34\\right)", correct: true, why: {
        en: "$f$ has vertex $(\\tfrac52,\\tfrac34)$; shift right by $2$.",
        fr: "$f$ has vertex $(\\tfrac52,\\tfrac34)$; shift right by $2$.",
        es: "$f$ has vertex $(\\tfrac52,\\tfrac34)$; shift right by $2$.",
        ja: "$f$ has vertex $(\\tfrac52,\\tfrac34)$; shift right by $2$.",
        zh: "$f$ has vertex $(\\tfrac52,\\tfrac34)$; shift right by $2$."
      } },
      { tex: "\\text{the minimum value is } \\tfrac34", correct: true, why: {
        en: "A horizontal shift does not change the height.",
        fr: "Une translation horizontale ne change pas la hauteur.",
        es: "Un desplazamiento horizontal no cambia la altura.",
        ja: "水平移動では高さは変わらない。",
        zh: "水平平移不改变高度。"
      } },
      { tex: "\\text{the minimum point is } \\left(\\tfrac12,\\tfrac34\\right)", correct: false, why: {
        en: "Shifted left instead of right.",
        fr: "Décalée à gauche au lieu de droite.",
        es: "Desplazada a la izquierda en vez de a la derecha.",
        ja: "右でなく左にずらした。",
        zh: "向左而不是向右平移。"
      } },
      { tex: "\\text{the minimum point is } \\left(\\tfrac52,\\tfrac34\\right)", correct: false, why: {
        en: "That is the vertex of $f$ itself.",
        fr: "C’est le sommet de $f$ elle-même.",
        es: "Es el vértice de $f$ misma.",
        ja: "$f$ そのものの頂点。",
        zh: "那是 $f$ 本身的顶点。"
      } },
      { tex: "\\text{the minimum point is } \\left(\\tfrac92,\\tfrac{11}4\\right)", correct: false, why: {
        en: "Shifts up as well; only a horizontal move happens.",
        fr: "Décale aussi vers le haut ; seul un déplacement horizontal a lieu.",
        es: "Sube también; solo hay desplazamiento horizontal.",
        ja: "上にもずらした。水平移動だけ。",
        zh: "还向上移了；只有水平平移。"
      } },
      { tex: "\\text{the minimum value is } 7", correct: false, why: {
        en: "$7=f(0)$, not the minimum.",
        fr: "$7=f(0)$, not the minimum.",
        es: "$7=f(0)$, not the minimum.",
        ja: "$7=f(0)$, not the minimum.",
        zh: "$7=f(0)$, not the minimum."
      } },
      { tex: "\\text{the minimum value is } -\\tfrac34", correct: false, why: {
        en: "Sign slip completing the square.",
        fr: "Erreur de signe en mettant sous forme canonique.",
        es: "Error de signo al completar el cuadrado.",
        ja: "平方完成の符号ミス。",
        zh: "配方时符号错。"
      } },
      { tex: "\\min_x f(x-2)<0", correct: false, why: {
        en: "It has no real roots because $\\min=\\tfrac34>0$.",
        fr: "Pas de racine réelle car $\\min=\\tfrac34>0$.",
        es: "No tiene raíces reales porque $\\min=\\tfrac34>0$.",
        ja: "$\\min=\\tfrac34>0$ なので実数解なし。",
        zh: "因 $\\min=\\tfrac34>0$，无实根。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Vertex of f",
          fr: "Sommet de f",
          es: "Vértice de f",
          ja: "f の頂点",
          zh: "f 的顶点"
        },
        lines: ["f(x)=\\left(x-\\tfrac52\\right)^2+\\tfrac34"],
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
          en: "Shift right by 2",
          fr: "Décaler de 2 à droite",
          es: "Desplazar 2 a la derecha",
          ja: "右に2",
          zh: "右移 2"
        },
        lines: ["f(x-2)=\\left(x-\\tfrac92\\right)^2+\\tfrac34\\;\\Rightarrow\\;\\min\\ \\text{at}\\ \\left(\\tfrac92,\\tfrac34\\right)"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Replacing $x$ by $x-2$ moves the graph to the right.",
          fr: "Remplacer $x$ par $x-2$ décale la courbe vers la droite.",
          es: "Cambiar $x$ por $x-2$ mueve la gráfica a la derecha.",
          ja: "$x$ を $x-2$ にすると右に移動。",
          zh: "把 $x$ 换成 $x-2$ 使图像右移。"
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
          en: "Exactly two statements are true.",
          fr: "Exactement deux affirmations sont vraies.",
          es: "Exactamente dos afirmaciones son verdaderas.",
          ja: "正しいのはちょうど2つです。",
          zh: "恰有两个说法正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
