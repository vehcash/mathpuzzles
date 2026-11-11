/* probability · White, then green, then blue
   JEE Advanced 2024 (India), Paper 2, Mathematics Q.9 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-jee-2024-white-green-blue-bag",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 2, Mathematics Q.9",
        fr: "JEE Advanced 2024 (Inde), épreuve 2, mathématiques Q.9",
        es: "JEE Advanced 2024 (India), prueba 2, matemáticas Q.9",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 2 数学 Q.9",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷二 数学 Q.9"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "White, then green, then blue",
      fr: "Blanc, puis vert, puis bleu",
      es: "Blanco, luego verde, luego azul",
      ja: "白、緑、青の順",
      zh: "白、绿、蓝依次取出"
    },
    statement: {
      en: "A bag has $N$ balls: $3$ white, $6$ green and the rest blue. Three are drawn one at a time without replacement; $W_i,G_i,B_i$ mean the $i$-th ball is white, green, blue. If $P(W_1\\cap G_2\\cap B_3)=\\dfrac{2}{5N}$ and $P(B_3\\mid W_1\\cap G_2)=\\dfrac29$, <b>which of the following equal $N$?</b>",
      fr: "Un sac contient $N$ boules : $3$ blanches, $6$ vertes et le reste bleues. On en tire trois une à une sans remise ; $W_i,G_i,B_i$ signifient que la $i$-ème est blanche, verte, bleue. Si $P(W_1\\cap G_2\\cap B_3)=\\dfrac{2}{5N}$ et $P(B_3\\mid W_1\\cap G_2)=\\dfrac29$, <b>lesquelles des valeurs suivantes sont égales à $N$ ?</b>",
      es: "Una bolsa tiene $N$ bolas: $3$ blancas, $6$ verdes y el resto azules. Se sacan tres de una en una sin reposición; $W_i,G_i,B_i$ indican que la $i$-ésima es blanca, verde, azul. Si $P(W_1\\cap G_2\\cap B_3)=\\dfrac{2}{5N}$ y $P(B_3\\mid W_1\\cap G_2)=\\dfrac29$, <b>¿cuáles de los siguientes valores son iguales a $N$?</b>",
      ja: "袋に $N$ 個の玉（白 $3$、緑 $6$、残りは青）があり、非復元で1つずつ3個取ります。$W_i,G_i,B_i$ は $i$ 番目が白・緑・青である事象です。$P(W_1\\cap G_2\\cap B_3)=\\dfrac{2}{5N}$、$P(B_3\\mid W_1\\cap G_2)=\\dfrac29$ のとき、<b>$N$ に等しいものはどれですか？</b>",
      zh: "袋中有 $N$ 个球：$3$ 白、$6$ 绿，其余为蓝。不放回地依次取三个，$W_i,G_i,B_i$ 表示第 $i$ 个为白、绿、蓝。若 $P(W_1\\cap G_2\\cap B_3)=\\dfrac{2}{5N}$，$P(B_3\\mid W_1\\cap G_2)=\\dfrac29$，<b>下列哪些等于 $N$？</b>"
    },
    figureText: {
      en: "Three draws as boxes: white, then green, then blue.",
      fr: "Trois tirages en cases : blanc, puis vert, puis bleu.",
      es: "Tres extracciones en cajas: blanco, luego verde, luego azul.",
      ja: "3回の取り出し：白、緑、青。",
      zh: "三次抽取：白、绿、蓝。"
    },
    hint: {
      en: "After a white and a green there are $N-2$ balls left, $N-9$ of them blue.",
      fr: "Après une blanche et une verte, il reste $N-2$ boules, dont $N-9$ bleues.",
      es: "Tras una blanca y una verde quedan $N-2$ bolas, $N-9$ de ellas azules.",
      ja: "白と緑の後、残り $N-2$ 個のうち青は $N-9$ 個。",
      zh: "取出一白一绿后剩 $N-2$ 个，其中蓝球 $N-9$ 个。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.6, h: 1.8, scale: 52, pad: 16 });
      [['W₁', 'fill-yellow'], ['G₂', 'fill-green'], ['B₃', 'fill-blue']].forEach(([t, c], k) => { F.rect(0.3 + k * 1.8, 0.4, 1.4, 1.0, c, 'fills'); F.text([1.0 + k * 1.8, 0.9], t, 'pt', 0, 0); });
      F.reveal = () => {
      ['3/11', '6/10', '2/9'].forEach((t, k) => F.text([1.0 + k * 1.8, 0.4], t, 'len small', 0, 14));
      };
      return F;
    },
    options: [
      { tex: "11", correct: true, why: {
        en: "$\\tfrac{N-9}{N-2}=\\tfrac29$.",
        fr: "$\\tfrac{N-9}{N-2}=\\tfrac29$.",
        es: "$\\tfrac{N-9}{N-2}=\\tfrac29$.",
        ja: "$\\tfrac{N-9}{N-2}=\\tfrac29$。",
        zh: "$\\tfrac{N-9}{N-2}=\\tfrac29$。"
      } },
      { tex: "3+6+2", correct: true, why: {
        en: "Three white, six green, two blue.",
        fr: "Trois blanches, six vertes, deux bleues.",
        es: "Tres blancas, seis verdes, dos azules.",
        ja: "白 3・緑 6・青 2。",
        zh: "3 白 6 绿 2 蓝。"
      } },
      { tex: "9", correct: false, why: {
        en: "Then there would be no blue balls.",
        fr: "Il n’y aurait alors aucune bleue.",
        es: "No habría bolas azules.",
        ja: "青が1つもない。",
        zh: "那就没有蓝球了。"
      } },
      { tex: "12", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "10", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "15", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "18", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "2", correct: false, why: {
        en: "That is the number of blue balls.",
        fr: "C’est le nombre de boules bleues.",
        es: "Es el número de bolas azules.",
        ja: "青玉の個数。",
        zh: "那是蓝球个数。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Conditional",
          fr: "Conditionnelle",
          es: "Condicional",
          ja: "条件付き",
          zh: "条件概率"
        },
        lines: ["P(B_3\\mid W_1G_2)=\\frac{N-9}{N-2}=\\frac29\\ \\Rightarrow\\ 9N-81=2N-4\\ \\Rightarrow\\ N=\\boxed{11}"],
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
          en: "Check the other condition",
          fr: "Vérifier l’autre condition",
          es: "Comprobar la otra condición",
          ja: "もう一方の条件を確認",
          zh: "检验另一条件"
        },
        lines: ["\\frac3{11}\\cdot\\frac6{10}\\cdot\\frac29=\\frac{2}{55}=\\frac{2}{5\\cdot11}\\ \\checkmark"],
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
          en: "Two options are the same number.",
          fr: "Deux options sont le même nombre.",
          es: "Dos opciones son el mismo número.",
          ja: "2つの選択肢は同じ数です。",
          zh: "有两个选项是同一个数。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
