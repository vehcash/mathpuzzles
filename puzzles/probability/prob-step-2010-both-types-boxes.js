/* probability · Opening boxes until both kinds appear
   STEP Mathematics I 2010 (Cambridge), Question 12 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-step-2010-both-types-boxes",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "STEP Mathematics I 2010 (Cambridge), Question 12",
        fr: "STEP Mathématiques I 2010 (Cambridge), question 12",
        es: "STEP Matemáticas I 2010 (Cambridge), pregunta 12",
        ja: "STEP 数学 I 2010（ケンブリッジ大学）第12問",
        zh: "STEP 数学 I 2010（剑桥大学）第 12 题"
      },
      exams: ["step"]
    },
    difficulty: 3,
    title: {
      en: "Opening boxes until both kinds appear",
      fr: "Ouvrir des boîtes jusqu’à voir les deux sortes",
      es: "Abrir cajas hasta ver los dos tipos",
      ja: "2種類そろうまで箱を開ける",
      zh: "开盒直到两种都出现"
    },
    statement: {
      en: "Each box independently holds an item of type $1$ with probability $p$ or type $2$ with probability $q=1-p$ ($0<p<1$). $X$ is the number of boxes opened until both types have appeared. <b>Which of the following are true?</b>",
      fr: "Chaque boîte contient, indépendamment, un objet de type $1$ avec probabilité $p$ ou de type $2$ avec probabilité $q=1-p$ ($0<p<1$). $X$ est le nombre de boîtes ouvertes jusqu’à avoir vu les deux types. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Cada caja contiene, de forma independiente, un objeto de tipo $1$ con probabilidad $p$ o de tipo $2$ con probabilidad $q=1-p$ ($0<p<1$). $X$ es el número de cajas abiertas hasta que han aparecido los dos tipos. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "各箱には独立に確率 $p$ でタイプ $1$、確率 $q=1-p$ でタイプ $2$ の品が入っています（$0<p<1$）。両方のタイプが出るまでに開けた箱の数を $X$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "每个盒子独立地以概率 $p$ 装类型 $1$、以概率 $q=1-p$ 装类型 $2$（$0<p<1$）。$X$ 为两种类型都出现时已开的盒子数。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A row of boxes: the first few all show the same type, then the other type appears.",
      fr: "Une rangée de boîtes : les premières montrent le même type, puis l’autre apparaît.",
      es: "Una fila de cajas: las primeras muestran el mismo tipo y luego aparece el otro.",
      ja: "箱の列：最初は同じタイプが続き、やがて別のタイプ。",
      zh: "一排盒子：前几个类型相同，然后出现另一种。"
    },
    hint: {
      en: "$X>n$ means the first $n$ boxes are all the same type, so $P(X>n)=p^n+q^n$ for $n\\ge1$. Then $E(X)=\\sum_{n\\ge0}P(X>n)$.",
      fr: "$X>n$ signifie que les $n$ premières boîtes sont du même type : $P(X>n)=p^n+q^n$ pour $n\\ge1$. Puis $E(X)=\\sum_{n\\ge0}P(X>n)$.",
      es: "$X>n$ significa que las $n$ primeras cajas son del mismo tipo: $P(X>n)=p^n+q^n$ para $n\\ge1$. Luego $E(X)=\\sum_{n\\ge0}P(X>n)$.",
      ja: "$X>n$ は最初の $n$ 箱が同じタイプ：$n\\ge1$ で $P(X>n)=p^n+q^n$。$E(X)=\\sum_{n\\ge0}P(X>n)$。",
      zh: "$X>n$ 表示前 $n$ 个同类型：$n\\ge1$ 时 $P(X>n)=p^n+q^n$；$E(X)=\\sum_{n\\ge0}P(X>n)$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 1.6, scale: 50, pad: 16 });
      ['1', '1', '1', '2'].forEach((t, k) => { F.rect(0.4 + k * 1.3, 0.4, 1.0, 0.8, t === '1' ? 'fill-blue' : 'fill-yellow', 'fills'); F.text([0.9 + k * 1.3, 0.8], t, 'pt', 0, 0); });
      F.reveal = () => {
      F.text([4.75, 1.4], 'X = 4', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "1": {"fr": "1", "es": "1", "ja": "1", "zh": "1"},
      "2": {"fr": "2", "es": "2", "ja": "2", "zh": "2"},
      "X = 4": {"fr": "X = 4", "es": "X = 4", "ja": "X = 4", "zh": "X = 4"},
      "with equality only for": {"fr": "avec égalité seulement pour", "es": "con igualdad solo para", "ja": "等号は次のときのみ：", "zh": "仅当下列时取等号"},
      "when": {"fr": "quand", "es": "cuando", "ja": "のとき", "zh": "当"},
      "is largest at": {"fr": "est maximale en", "es": "es máxima en", "ja": "は次で最大：", "zh": "在下列处最大"},
      "can equal": {"fr": "peut valoir", "es": "puede valer", "ja": "は次の値をとりうる：", "zh": "可以等于"}
    },
    options: [
      { tex: "E(X)=\\dfrac1{pq}-1", correct: true, why: {
        en: "$1+\\tfrac pq+\\tfrac qp=\\dfrac{pq+p^2+q^2}{pq}=\\dfrac{1-pq}{pq}$",
        fr: "$1+\\tfrac pq+\\tfrac qp=\\dfrac{pq+p^2+q^2}{pq}=\\dfrac{1-pq}{pq}$",
        es: "$1+\\tfrac pq+\\tfrac qp=\\dfrac{pq+p^2+q^2}{pq}=\\dfrac{1-pq}{pq}$",
        ja: "$1+\\tfrac pq+\\tfrac qp=\\dfrac{pq+p^2+q^2}{pq}=\\dfrac{1-pq}{pq}$",
        zh: "$1+\\tfrac pq+\\tfrac qp=\\dfrac{pq+p^2+q^2}{pq}=\\dfrac{1-pq}{pq}$"
      } },
      { tex: "E(X)\\ge3,\\ \\text{with equality only for}\\ p=\\tfrac12", correct: true, why: {
        en: "$pq\\le\\tfrac14$",
        fr: "$pq\\le\\tfrac14$",
        es: "$pq\\le\\tfrac14$",
        ja: "$pq\\le\\tfrac14$",
        zh: "$pq\\le\\tfrac14$"
      } },
      { tex: "E(X)=\\dfrac1{pq}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "E(X)=2\\ \\text{when}\\ p=\\tfrac12", correct: false, why: {
        en: "$\\tfrac1{1/4}-1=3$",
        fr: "$\\tfrac1{1/4}-1=3$",
        es: "$\\tfrac1{1/4}-1=3$",
        ja: "$\\tfrac1{1/4}-1=3$",
        zh: "$\\tfrac1{1/4}-1=3$"
      } },
      { tex: "P(X>n)=p^nq^n", correct: false, why: {
        en: "“All the same type” is all $1$ or all $2$: $p^n+q^n$.",
        fr: "« Tous du même type » : tous $1$ ou tous $2$ : $p^n+q^n$.",
        es: "«Todos del mismo tipo»: todos $1$ o todos $2$: $p^n+q^n$.",
        ja: "「すべて同じ」は全部 $1$ か全部 $2$：$p^n+q^n$。",
        zh: "“全同类型”指全为 1 或全为 2：$p^n+q^n$。"
      } },
      { tex: "P(X=2)=pq", correct: false, why: {
        en: "$P(X=2)=pq+qp=2pq$",
        fr: "$P(X=2)=pq+qp=2pq$",
        es: "$P(X=2)=pq+qp=2pq$",
        ja: "$P(X=2)=pq+qp=2pq$",
        zh: "$P(X=2)=pq+qp=2pq$"
      } },
      { tex: "E(X)\\ \\text{is largest at}\\ p=\\tfrac12", correct: false, why: {
        en: "It is smallest there; it grows without bound as $p\\to0$ or $1$.",
        fr: "C’est son minimum ; elle tend vers l’infini quand $p\\to0$ ou $1$.",
        es: "Ahí es mínima; crece sin límite cuando $p\\to0$ o $1$.",
        ja: "そこで最小。$p\\to0,1$ で発散。",
        zh: "那里取最小值；$p\\to0$ 或 $1$ 时趋于无穷。"
      } },
      { tex: "X\\ \\text{can equal}\\ 1", correct: false, why: {
        en: "One box shows only one type.",
        fr: "Une boîte ne montre qu’un type.",
        es: "Una caja solo muestra un tipo.",
        ja: "1箱では1種類だけ。",
        zh: "一个盒子只有一种类型。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Tail probabilities",
          fr: "Probabilités de queue",
          es: "Probabilidades de cola",
          ja: "裾確率",
          zh: "尾概率"
        },
        lines: ["P(X>0)=1,\\quad P(X>n)=p^n+q^n\\ (n\\ge1)"],
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
          en: "Sum",
          fr: "Somme",
          es: "Suma",
          ja: "和",
          zh: "求和"
        },
        lines: ["E(X)=1+\\frac pq+\\frac qp=\\frac1{pq}-1\\ge4-1=3"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "STEP asks for proofs; here the results of the question are turned into statements to check.",
          fr: "Le STEP demande des démonstrations ; ici les résultats de la question deviennent des affirmations à vérifier.",
          es: "El STEP pide demostraciones; aquí los resultados de la pregunta se convierten en afirmaciones que comprobar.",
          ja: "STEP は証明問題。ここでは結果を判定する命題にした。",
          zh: "STEP 要求证明，此处把结论改为待判断的命题。"
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
