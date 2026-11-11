/* complex · Iterating z² + i from 0
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2023, 1st phase (16 October 2022), Mathematics, Question 38 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-ita-2023-iterate-z-squared-plus-i",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2023, 1st phase (16 October 2022), Mathematics, Question 38",
        fr: "Concours de l’ITA (Brésil) 2023, 1re phase (16 octobre 2022), mathématiques, question 38",
        es: "Examen de ingreso del ITA (Brasil) 2023, 1.ª fase (16 de octubre de 2022), matemáticas, pregunta 38",
        ja: "ITA（ブラジル航空技術大学）2023 入試 第1次（2022年10月16日）数学 第38問",
        zh: "巴西航空技术学院 ITA 2023 入学考试第一阶段（2022年10月16日）数学第 38 题"
      },
      exams: ["ita"]
    },
    difficulty: 2,
    title: {
      en: "Iterating z² + i from 0",
      fr: "Itérer z² + i à partir de 0",
      es: "Iterar z² + i desde 0",
      ja: "0 から z² + i を繰り返す",
      zh: "从 0 开始迭代 z² + i"
    },
    statement: {
      en: "Let $f(z)=z^2+i$, $f^{(1)}=f$ and $f^{(n)}=f\\circ f^{(n-1)}$. <b>Which of the following equal $f^{(2023)}(0)$?</b>",
      fr: "Soit $f(z)=z^2+i$, $f^{(1)}=f$ et $f^{(n)}=f\\circ f^{(n-1)}$. <b>Lesquelles des valeurs suivantes sont égales à $f^{(2023)}(0)$ ?</b>",
      es: "Sea $f(z)=z^2+i$, $f^{(1)}=f$ y $f^{(n)}=f\\circ f^{(n-1)}$. <b>¿Cuáles de los siguientes valores son iguales a $f^{(2023)}(0)$?</b>",
      ja: "$f(z)=z^2+i$、$f^{(1)}=f$、$f^{(n)}=f\\circ f^{(n-1)}$ とします。<b>$f^{(2023)}(0)$ に等しいものはどれですか？</b>",
      zh: "设 $f(z)=z^2+i$，$f^{(1)}=f$，$f^{(n)}=f\\circ f^{(n-1)}$。<b>下列哪些等于 $f^{(2023)}(0)$？</b>"
    },
    figureText: {
      en: "The complex plane with the first few iterates of 0 marked.",
      fr: "Le plan complexe avec les premiers itérés de 0.",
      es: "El plano complejo con los primeros iterados de 0.",
      ja: "複素平面上の 0 の最初の数回の反復。",
      zh: "复平面上 0 的前几次迭代点。"
    },
    hint: {
      en: "Compute $f(0)$, $f^{(2)}(0)$, $f^{(3)}(0)$, $f^{(4)}(0)$ and look for a cycle.",
      fr: "Calculez $f(0)$, $f^{(2)}(0)$, $f^{(3)}(0)$, $f^{(4)}(0)$ et cherchez un cycle.",
      es: "Calcula $f(0)$, $f^{(2)}(0)$, $f^{(3)}(0)$, $f^{(4)}(0)$ y busca un ciclo.",
      ja: "$f(0)$ から $f^{(4)}(0)$ まで計算して周期を探す。",
      zh: "计算 $f(0)$ 至 $f^{(4)}(0)$，寻找循环。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.0, h: 3.0, scale: 70, pad: 16 });
      const T = F.T = axes(F, -1.5, 1.5, -1.5, 1.5);
      F.dot(T([0, 0])); F.dot(T([0, 1])); arrow(F, T([0, 0.05]), T([0, 0.9]));
      F.text(T([0, 1]), 'i', 'pt', 10, 0);
      F.reveal = () => {
      F.dot(T([-1, 1])); F.dot(T([0, -1])); arrow(F, T([-0.05, 1]), T([-0.9, 1])); arrow(F, T([-0.95, 0.9]), T([-0.08, -0.9])); arrow(F, T([0.05, -0.9]), T([-0.9, 0.9]));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "i": {"fr": "i", "es": "i", "ja": "i", "zh": "i"},
      "the sequence grows without bound": {"fr": "la suite croît sans limite", "es": "la sucesión crece sin límite", "ja": "数列は限りなく大きくなる", "zh": "数列无界增长"},
      "odd": {"fr": "impair", "es": "impar", "ja": "奇数", "zh": "奇数"}
    },
    options: [
      { tex: "-i", correct: true, why: {
        en: "$f^{(n)}(0)=-i$ for every odd $n\\ge3$.",
        fr: "$f^{(n)}(0)=-i$ pour tout $n\\ge3$ impair.",
        es: "$f^{(n)}(0)=-i$ para todo $n\\ge3$ impar.",
        ja: "奇数 $n\\ge3$ で $f^{(n)}(0)=-i$。",
        zh: "对奇数 $n\\ge3$，$f^{(n)}(0)=-i$。"
      } },
      { tex: "f^{(3)}(0)", correct: true, why: {
        en: "From $n=2$ on the values alternate with period $2$.",
        fr: "À partir de $n=2$ les valeurs alternent avec période $2$.",
        es: "Desde $n=2$ los valores alternan con periodo $2$.",
        ja: "$n=2$ 以降は周期 $2$ で交互。",
        zh: "从 $n=2$ 起以周期 $2$ 交替。"
      } },
      { tex: "i", correct: false, why: {
        en: "That is $f(0)$ only.",
        fr: "C’est seulement $f(0)$.",
        es: "Es solo $f(0)$.",
        ja: "$f(0)$ だけ。",
        zh: "只是 $f(0)$。"
      } },
      { tex: "-1+i", correct: false, why: {
        en: "That is the value for even $n\\ge2$.",
        fr: "C’est la valeur pour $n\\ge2$ pair.",
        es: "Es el valor para $n\\ge2$ par.",
        ja: "偶数 $n\\ge2$ の値。",
        zh: "那是偶数 $n\\ge2$ 时的值。"
      } },
      { tex: "1-i", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "0", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "f^{(2)}(0)", correct: false, why: {
        en: "$f^{(2)}(0)=-1+i$",
        fr: "$f^{(2)}(0)=-1+i$",
        es: "$f^{(2)}(0)=-1+i$",
        ja: "$f^{(2)}(0)=-1+i$",
        zh: "$f^{(2)}(0)=-1+i$"
      } },
      { tex: "\\text{the sequence grows without bound}", correct: false, why: {
        en: "It is eventually periodic.",
        fr: "Elle est périodique à partir d’un rang.",
        es: "Es periódica a partir de cierto término.",
        ja: "いずれ周期的。",
        zh: "最终是周期的。"
      } }
    ],
    steps: [
      {
        title: {
          en: "First iterates",
          fr: "Premiers itérés",
          es: "Primeros iterados",
          ja: "最初の反復",
          zh: "前几次迭代"
        },
        lines: ["0\\mapsto i\\mapsto -1+i\\mapsto -i\\mapsto -1+i\\mapsto -i\\mapsto\\cdots"],
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
          en: "Parity",
          fr: "Parité",
          es: "Paridad",
          ja: "偶奇",
          zh: "奇偶性"
        },
        lines: ["2023\\ \\text{odd}\\Rightarrow f^{(2023)}(0)=-i"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "In the exam this was a five-choice question; here a second correct form is added.",
          fr: "Dans l’épreuve c’était un QCM à cinq choix ; une seconde forme correcte est ajoutée ici.",
          es: "En el examen era de cinco opciones; aquí se añade una segunda forma correcta.",
          ja: "原題は5択。ここでは正しい別表現を追加。",
          zh: "原题为五选一，此处增加了一个等价的正确选项。"
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
