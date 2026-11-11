/* matrix · A shift and a quarter turn
   Oxford MAT 2018 (Mathematics Admissions Test), Question 2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "mat-mat-2018-shift-and-turn",
    category: "matrix",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2018 (Mathematics Admissions Test), Question 2",
        fr: "MAT d’Oxford 2018 (test d’admission en mathématiques), question 2",
        es: "MAT de Oxford 2018 (prueba de admisión de matemáticas), pregunta 2",
        ja: "オックスフォード大学 数学入学試験 MAT 2018 問題 2",
        zh: "牛津大学数学入学考试 MAT 2018 第 2 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "A shift and a quarter turn",
      fr: "Une translation et un quart de tour",
      es: "Un desplazamiento y un cuarto de vuelta",
      ja: "平行移動と4分の1回転",
      zh: "平移与四分之一转"
    },
    statement: {
      en: "$S(x,y)=(x+1,\\,y)$ and $T(x,y)=(-y,\\,x)$. Words such as $TS$ mean “do $S$, then $T$”. <b>Which of the following are true?</b>",
      fr: "$S(x,y)=(x+1,\\,y)$ et $T(x,y)=(-y,\\,x)$. Un mot comme $TS$ signifie « faire $S$, puis $T$ ». <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$S(x,y)=(x+1,\\,y)$ y $T(x,y)=(-y,\\,x)$. Una palabra como $TS$ significa «hacer $S$ y luego $T$». <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$S(x,y)=(x+1,\\,y)$、$T(x,y)=(-y,\\,x)$ とし、$TS$ は「$S$ のあと $T$」を表します。<b>次のうち正しいものはどれですか？</b>",
      zh: "$S(x,y)=(x+1,\\,y)$，$T(x,y)=(-y,\\,x)$。$TS$ 表示“先 $S$ 后 $T$”。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A point (x, y) with what S does (one step right) and what T does (a quarter turn about the origin). The word giving (x − 1, y) is traced in the solution.",
      fr: "Un point (x, y), avec l’effet de S (un pas à droite) et de T (quart de tour autour de l’origine). Le mot donnant (x − 1, y) est tracé dans la solution.",
      es: "Un punto (x, y), con el efecto de S (un paso a la derecha) y de T (cuarto de vuelta alrededor del origen). La palabra que da (x − 1, y) se traza en la solución.",
      ja: "点 (x, y) と、S（右に1歩）と T（原点中心の4分の1回転）の働き。(x − 1, y) を与える語は解答でたどります。",
      zh: "点 (x, y)，以及 S（右移一步）与 T（绕原点转四分之一圈）的作用。得到 (x − 1, y) 的词在解答中演示。"
    },
    hint: {
      en: "$T$ is a $90^\\circ$ rotation about the origin. A half turn $T^2$ reverses the direction of $S$.",
      fr: "$T$ est une rotation de $90^\\circ$ autour de l’origine. Un demi-tour $T^2$ inverse le sens de $S$.",
      es: "$T$ es un giro de $90^\\circ$ alrededor del origen. Media vuelta $T^2$ invierte el sentido de $S$.",
      ja: "$T$ は原点中心の $90^\\circ$ 回転。半回転 $T^2$ で $S$ の向きが逆になる。",
      zh: "$T$ 是绕原点 $90^\\circ$ 旋转。半圈 $T^2$ 使 $S$ 方向反转。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 3.0, scale: 56, pad: 18 });
      const T = F.T = axes(F, -2.3, 2.3, -1.4, 1.6);
      const P = [1.2, 0.8];
      F.dot(T(P)); F.text(T(P), '(x, y)', 'len small', 22, 12);
      arrow(F, T(P), T([1.9, 0.8])); F.text(T([1.55, 0.8]), 'S', 'pt small', 0, -10);
      arrow(F, T(P), T([-0.8, 1.2]), 'seg thin dashc'); F.text(T([-0.8, 1.2]), 'T', 'pt small', -10, -6);
      F.reveal = () => {
      const Q = [-1.2, -0.8], U = [0.2, 0.8];
      F.dot(T(Q)); F.dot(T([-0.2, -0.8])); F.dot(T(U));
      arrow(F, T([1.1, 0.7]), T([-1.1, -0.7]), 'seg thin dashc'); arrow(F, T(Q), T([-0.3, -0.8])); arrow(F, T([-0.15, -0.7]), T([0.15, 0.7]), 'seg thin dashc');
      F.text(T(U), '(x−1, y)', 'len small', -28, -10);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "a word of length 4 gives": {"fr": "un mot de longueur 4 donne", "es": "una palabra de longitud 4 da", "ja": "長さ4の語で次が得られる：", "zh": "某个长度为 4 的词给出"},
      "is a rotation": {"fr": "est une rotation", "es": "es un giro", "ja": "は回転", "zh": "是旋转"}
    },
    options: [
      { tex: "T^4=I", correct: true, why: {
        en: "Four quarter turns are a full turn.",
        fr: "Quatre quarts de tour font un tour complet.",
        es: "Cuatro cuartos de vuelta son una vuelta.",
        ja: "4回の90°回転で1回転。",
        zh: "四次四分之一转为一整圈。"
      } },
      { tex: "T^2ST^2(x,y)=(x-1,\\,y)", correct: true, why: {
        en: "$T^2:(x,y)\\mapsto(-x,-y)$, then $S$, then $T^2$ again.",
        fr: "$T^2:(x,y)\\mapsto(-x,-y)$, then $S$, then $T^2$ again.",
        es: "$T^2:(x,y)\\mapsto(-x,-y)$, then $S$, then $T^2$ again.",
        ja: "$T^2:(x,y)\\mapsto(-x,-y)$, then $S$, then $T^2$ again.",
        zh: "$T^2:(x,y)\\mapsto(-x,-y)$, then $S$, then $T^2$ again."
      } },
      { tex: "TS=ST", correct: false, why: {
        en: "$TS(0,0)=(0,1)$ but $ST(0,0)=(1,0)$.",
        fr: "$TS(0,0)=(0,1)$ but $ST(0,0)=(1,0)$.",
        es: "$TS(0,0)=(0,1)$ but $ST(0,0)=(1,0)$.",
        ja: "$TS(0,0)=(0,1)$ but $ST(0,0)=(1,0)$.",
        zh: "$TS(0,0)=(0,1)$ but $ST(0,0)=(1,0)$."
      } },
      { tex: "T^2=I", correct: false, why: {
        en: "$T^2(x,y)=(-x,-y)$.",
        fr: "$T^2(x,y)=(-x,-y)$.",
        es: "$T^2(x,y)=(-x,-y)$.",
        ja: "$T^2(x,y)=(-x,-y)$。",
        zh: "$T^2(x,y)=(-x,-y)$。"
      } },
      { tex: "T^3S T(x,y)=(x-1,\\,y)", correct: false, why: {
        en: "It gives $(x,\\,y-1)$.",
        fr: "It gives $(x,\\,y-1)$.",
        es: "It gives $(x,\\,y-1)$.",
        ja: "It gives $(x,\\,y-1)$.",
        zh: "It gives $(x,\\,y-1)$."
      } },
      { tex: "\\text{a word of length 4 gives } (x-1,y)", correct: false, why: {
        en: "A computer search finds none shorter than 5 letters.",
        fr: "Une recherche exhaustive n’en trouve aucun de moins de 5 lettres.",
        es: "Una búsqueda exhaustiva no halla ninguno de menos de 5 letras.",
        ja: "5文字より短い語は存在しない。",
        zh: "穷举搜索找不到少于 5 个字母的。"
      } },
      { tex: "S\\ \\text{is a rotation}", correct: false, why: {
        en: "It is a translation; it has no fixed point.",
        fr: "C’est une translation, sans point fixe.",
        es: "Es una traslación, sin punto fijo.",
        ja: "平行移動で不動点がない。",
        zh: "它是平移，没有不动点。"
      } },
      { tex: "TST^{-1}(x,y)=(x+1,\\,y)", correct: false, why: {
        en: "It is $(x,\\,y+1)$: conjugating turns the shift.",
        fr: "It is $(x,\\,y+1)$: conjugating turns the shift.",
        es: "It is $(x,\\,y+1)$: conjugating turns the shift.",
        ja: "It is $(x,\\,y+1)$: conjugating turns the shift.",
        zh: "It is $(x,\\,y+1)$: conjugating turns the shift."
      } }
    ],
    steps: [
      {
        title: {
          en: "Half turn",
          fr: "Demi-tour",
          es: "Media vuelta",
          ja: "半回転",
          zh: "半圈"
        },
        lines: ["T^2(x,y)=(-x,-y),\\qquad T^4=I"],
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
          en: "Reverse the shift",
          fr: "Inverser la translation",
          es: "Invertir el desplazamiento",
          ja: "平行移動を逆向きに",
          zh: "反向平移"
        },
        lines: ["(x,y)\\xrightarrow{T^2}(-x,-y)\\xrightarrow{S}(1-x,-y)\\xrightarrow{T^2}(x-1,\\,y)"],
        note: {
          en: "Five letters, and an exhaustive check shows nothing shorter works.",
          fr: "Cinq lettres ; une vérification exhaustive montre que rien de plus court ne convient.",
          es: "Cinco letras; una comprobación exhaustiva muestra que nada más corto sirve.",
          ja: "5文字。全探索でそれより短いものはない。",
          zh: "五个字母；穷举表明没有更短的。"
        }
      },
      {
        title: {
          en: "Non-commuting",
          fr: "Non commutatives",
          es: "No conmutan",
          ja: "非可換",
          zh: "不可交换"
        },
        lines: ["TS(0,0)=T(1,0)=(0,1)\\ne(1,0)=ST(0,0)"],
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
