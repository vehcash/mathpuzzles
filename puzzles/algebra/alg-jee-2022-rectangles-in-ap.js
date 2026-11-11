/* algebra · A hundred growing rectangles
   JEE Advanced 2022 (India), Paper 1, Mathematics Q.6 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-jee-2022-rectangles-in-ap",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2022 (India), Paper 1, Mathematics Q.6",
        fr: "JEE Advanced 2022 (Inde), épreuve 1, mathématiques Q.6",
        es: "JEE Advanced 2022 (India), prueba 1, matemáticas Q.6",
        ja: "JEE Advanced 2022（インド工科大学入試）Paper 1 数学 Q.6",
        zh: "印度理工学院入学考试 JEE Advanced 2022 卷一 数学 Q.6"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "A hundred growing rectangles",
      fr: "Cent rectangles qui grandissent",
      es: "Cien rectángulos que crecen",
      ja: "大きくなる100個の長方形",
      zh: "一百个逐渐变大的矩形"
    },
    statement: {
      en: "$l_1,\\dots,l_{100}$ is an arithmetic progression with common difference $d_1$, and $w_1,\\dots,w_{100}$ one with common difference $d_2$, where $d_1d_2=10$. Rectangle $i$ has length $l_i$, width $w_i$ and area $A_i$. If $A_{51}-A_{50}=1000$, <b>which of the following equal $A_{100}-A_{90}$?</b>",
      fr: "$l_1,\\dots,l_{100}$ est une suite arithmétique de raison $d_1$, et $w_1,\\dots,w_{100}$ une de raison $d_2$, avec $d_1d_2=10$. Le rectangle $i$ a pour longueur $l_i$, largeur $w_i$ et aire $A_i$. Si $A_{51}-A_{50}=1000$, <b>lesquelles des valeurs suivantes sont égales à $A_{100}-A_{90}$ ?</b>",
      es: "$l_1,\\dots,l_{100}$ es una progresión aritmética de diferencia $d_1$, y $w_1,\\dots,w_{100}$ otra de diferencia $d_2$, con $d_1d_2=10$. El rectángulo $i$ tiene largo $l_i$, ancho $w_i$ y área $A_i$. Si $A_{51}-A_{50}=1000$, <b>¿cuáles de los siguientes valores son iguales a $A_{100}-A_{90}$?</b>",
      ja: "$l_1,\\dots,l_{100}$ は公差 $d_1$ の等差数列、$w_1,\\dots,w_{100}$ は公差 $d_2$ の等差数列で、$d_1d_2=10$ です。長方形 $i$ は縦 $l_i$、横 $w_i$、面積 $A_i$。$A_{51}-A_{50}=1000$ のとき、<b>$A_{100}-A_{90}$ に等しいものはどれですか？</b>",
      zh: "$l_1,\\dots,l_{100}$ 是公差为 $d_1$ 的等差数列，$w_1,\\dots,w_{100}$ 是公差为 $d_2$ 的等差数列，且 $d_1d_2=10$。第 $i$ 个矩形长 $l_i$、宽 $w_i$、面积 $A_i$。若 $A_{51}-A_{50}=1000$，<b>下列哪些等于 $A_{100}-A_{90}$？</b>"
    },
    figureText: {
      en: "Two nested rectangles i and i + 1: the extra area is two strips plus a small d₁ × d₂ corner.",
      fr: "Deux rectangles emboîtés i et i + 1 : l’aire en plus est formée de deux bandes et d’un petit coin d₁ × d₂.",
      es: "Dos rectángulos encajados i e i + 1: el área extra son dos franjas más una esquina d₁ × d₂.",
      ja: "入れ子の長方形 i と i + 1。増えた面積は2本の帯と小さな d₁ × d₂ の角。",
      zh: "嵌套的矩形 i 与 i + 1：多出的面积是两条带子加一个 d₁ × d₂ 的小角。"
    },
    hint: {
      en: "Compute $A_{i+1}-A_i$ in general: it grows linearly in $i$ with step $2d_1d_2$.",
      fr: "Calculez $A_{i+1}-A_i$ en général : il croît linéairement en $i$, de pas $2d_1d_2$.",
      es: "Calcula $A_{i+1}-A_i$ en general: crece linealmente en $i$ con paso $2d_1d_2$.",
      ja: "一般の $A_{i+1}-A_i$ を求めると、$i$ について公差 $2d_1d_2$ で増える。",
      zh: "一般地求 $A_{i+1}-A_i$：它关于 $i$ 线性增长，步长 $2d_1d_2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 3.2, scale: 60, pad: 16 });
      F.rect(0.2, 0.2, 3.0, 2.0, 'fill-yellow', 'fills');
      F.rect(3.2, 0.2, 1.0, 2.0, 'fill-blue', 'fills'); F.rect(0.2, 2.2, 3.0, 0.7, 'fill-pink', 'fills'); F.rect(3.2, 2.2, 1.0, 0.7, 'fill-green', 'fills');
      F.rect(0.2, 0.2, 3.0, 2.0, 'tri'); F.rect(0.2, 0.2, 4.0, 2.7, 'tri');
      F.text([1.7, 1.2], 'Aᵢ', 'pt', 0, 0); F.text([3.7, 2.55], 'd₁d₂', 'len small', 0, 0);
      F.text([3.7, 0.0], 'd₁', 'len small', 0, 0); F.text([4.45, 2.55], 'd₂', 'len small', 0, 0);
      return F;
    },
    options: [
      { tex: "18900", correct: true, why: {
        en: "$100+10\\cdot1880=18900$.",
        fr: "$100+10\\cdot1880=18900$.",
        es: "$100+10\\cdot1880=18900$.",
        ja: "$100+10\\cdot1880=18900$.",
        zh: "$100+10\\cdot1880=18900$."
      } },
      { tex: "\\sum_{i=90}^{99}\\big(10+10(2i-1)\\big)", correct: true, why: {
        en: "Adding the ten consecutive differences.",
        fr: "La somme des dix différences successives.",
        es: "La suma de las diez diferencias consecutivas.",
        ja: "連続する10個の差の和。",
        zh: "十个相邻差之和。"
      } },
      { tex: "10000", correct: false, why: {
        en: "Ten times $1000$: the differences are not constant.",
        fr: "Dix fois $1000$ : les différences ne sont pas constantes.",
        es: "Diez veces $1000$: las diferencias no son constantes.",
        ja: "$1000$ の10倍。差は一定ではない。",
        zh: "$1000$ 的十倍，但差不是常数。"
      } },
      { tex: "18000", correct: false, why: {
        en: "Forgets the constant part $10$ of each difference.",
        fr: "Oublie la partie constante $10$ de chaque différence.",
        es: "Olvida la parte constante $10$ de cada diferencia.",
        ja: "各差の定数部分 $10$ を忘れた。",
        zh: "漏了每个差中的常数 $10$。"
      } },
      { tex: "19000", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "9450", correct: false, why: {
        en: "That is $10\\sum i$ for $i=90..99$.",
        fr: "C’est $10\\sum i$ pour $i=90..99$.",
        es: "Es $10\\sum i$ para $i=90..99$.",
        ja: "$i=90..99$ の $10\\sum i$。",
        zh: "那是 $i=90..99$ 时的 $10\\sum i$。"
      } },
      { tex: "1990", correct: false, why: {
        en: "Only $A_{100}-A_{99}$.",
        fr: "Seulement $A_{100}-A_{99}$.",
        es: "Solo $A_{100}-A_{99}$.",
        ja: "$A_{100}-A_{99}$ だけ。",
        zh: "只算了 $A_{100}-A_{99}$。"
      } },
      { tex: "20900", correct: false, why: {
        en: "Counts eleven differences instead of ten.",
        fr: "Compte onze différences au lieu de dix.",
        es: "Cuenta once diferencias en vez de diez.",
        ja: "差を10個でなく11個数えた。",
        zh: "算了十一个差而不是十个。"
      } }
    ],
    steps: [
      {
        title: {
          en: "One step",
          fr: "Un pas",
          es: "Un paso",
          ja: "1段階",
          zh: "一步"
        },
        lines: ["A_{i+1}-A_i=(l_1d_2+w_1d_1)+(2i-1)\\,d_1d_2"],
        note: {
          en: "Expand $(l_1+id_1)(w_1+id_2)-(l_1+(i-1)d_1)(w_1+(i-1)d_2)$.",
          fr: "Développez $(l_1+id_1)(w_1+id_2)-(l_1+(i-1)d_1)(w_1+(i-1)d_2)$.",
          es: "Desarrolla $(l_1+id_1)(w_1+id_2)-(l_1+(i-1)d_1)(w_1+(i-1)d_2)$.",
          ja: "$(l_1+id_1)(w_1+id_2)-(l_1+(i-1)d_1)(w_1+(i-1)d_2)$ を展開。",
          zh: "展开 $(l_1+id_1)(w_1+id_2)-(l_1+(i-1)d_1)(w_1+(i-1)d_2)$。"
        }
      },
      {
        title: {
          en: "Use the data",
          fr: "Utiliser les données",
          es: "Usar los datos",
          ja: "条件を使う",
          zh: "代入条件"
        },
        lines: ["i=50:\\quad l_1d_2+w_1d_1+99\\cdot10=1000\\;\\Rightarrow\\;l_1d_2+w_1d_1=10"],
        note: {
          en: "So every difference is $10+10(2i-1)$.",
          fr: "Chaque différence vaut donc $10+10(2i-1)$.",
          es: "Así cada diferencia es $10+10(2i-1)$.",
          ja: "よって各差は $10+10(2i-1)$。",
          zh: "所以每个差为 $10+10(2i-1)$。"
        }
      },
      {
        title: {
          en: "Telescope",
          fr: "Télescoper",
          es: "Telescópica",
          ja: "和をとる",
          zh: "累加"
        },
        lines: ["A_{100}-A_{90}=\\sum_{i=90}^{99}\\big(10+10(2i-1)\\big)=100+10\\cdot1880=\\boxed{18900}"],
        note: {
          en: "$\\sum_{i=90}^{99}(2i-1)=2\\cdot945-10=1880$.",
          fr: "$\\sum_{i=90}^{99}(2i-1)=2\\cdot945-10=1880$.",
          es: "$\\sum_{i=90}^{99}(2i-1)=2\\cdot945-10=1880$.",
          ja: "$\\sum_{i=90}^{99}(2i-1)=2\\cdot945-10=1880$。",
          zh: "$\\sum_{i=90}^{99}(2i-1)=2\\cdot945-10=1880$。"
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
