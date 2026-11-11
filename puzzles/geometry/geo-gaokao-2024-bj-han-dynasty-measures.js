/* geometry · The Han dynasty bronze measures
   Gaokao 2024, Beijing paper (北京卷), Question 14 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2024-bj-han-dynasty-measures",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, Beijing paper (北京卷), Question 14",
        fr: "Gaokao 2024, épreuve de Pékin (北京卷), question 14",
        es: "Gaokao 2024, examen de Pekín (北京卷), pregunta 14",
        ja: "2024年 中国・高考 北京卷 第14問",
        zh: "2024年高考数学北京卷 第14题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "The Han dynasty bronze measures",
      fr: "Les mesures en bronze des Han",
      es: "Las medidas de bronce de los Han",
      ja: "漢代の銅嘉量",
      zh: "汉代铜嘉量"
    },
    statement: {
      en: "A Han dynasty bronze measuring vessel has three cylindrical cups, the <i>sheng</i>, <i>dou</i> and <i>hu</i>, whose volumes form a geometric sequence with ratio $10$. Their diameters are $65$ mm, $325$ mm and $325$ mm, and the <i>hu</i> is $230$ mm tall. Ignoring wall thickness, <b>which of the following give the heights of the <i>dou</i> and the <i>sheng</i>?</b>",
      fr: "Un récipient de mesure en bronze des Han comporte trois godets cylindriques, le <i>sheng</i>, le <i>dou</i> et le <i>hu</i>, dont les volumes forment une suite géométrique de raison $10$. Leurs diamètres sont $65$ mm, $325$ mm et $325$ mm, et le <i>hu</i> mesure $230$ mm de haut. Sans tenir compte des parois, <b>lesquelles des réponses suivantes donnent les hauteurs du <i>dou</i> et du <i>sheng</i> ?</b>",
      es: "Un recipiente de medida de bronce de los Han tiene tres vasos cilíndricos, el <i>sheng</i>, el <i>dou</i> y el <i>hu</i>, cuyos volúmenes forman una progresión geométrica de razón $10$. Sus diámetros son $65$ mm, $325$ mm y $325$ mm, y el <i>hu</i> mide $230$ mm de alto. Sin contar las paredes, <b>¿cuáles de las siguientes dan las alturas del <i>dou</i> y del <i>sheng</i>?</b>",
      ja: "漢代の「銅嘉量」には円柱形の升・斗・斛があり、体積は公比 $10$ の等比数列をなします。直径はそれぞれ $65$ mm、$325$ mm、$325$ mm、斛の高さは $230$ mm です。壁の厚さを無視して、<b>斗と升の高さを正しく表すものはどれですか？</b>",
      zh: "汉代“铜嘉量”中的升、斗、斛均为圆柱形，容积成公比为 $10$ 的等比数列，直径分别为 $65$ mm、$325$ mm、$325$ mm，斛的高为 $230$ mm。忽略壁厚，<b>下列哪些正确给出斗和升的高？</b>"
    },
    figureText: {
      en: "The three cylinders side by side: the narrow sheng (65 mm), the dou (325 mm) and the tall hu (325 mm wide, 230 mm high).",
      fr: "Les trois cylindres côte à côte : l’étroit sheng (65 mm), le dou (325 mm) et le haut hu (325 mm de large, 230 mm de haut).",
      es: "Los tres cilindros juntos: el estrecho sheng (65 mm), el dou (325 mm) y el alto hu (325 mm de ancho, 230 mm de alto).",
      ja: "3つの円柱：細い升（65 mm）、斗（325 mm）、高い斛（幅 325 mm・高さ 230 mm）。",
      zh: "三个圆柱：细的升（65 mm）、斗（325 mm）、高的斛（宽 325 mm，高 230 mm）。"
    },
    hint: {
      en: "Same diameter: volume is proportional to height. A diameter $5$ times smaller divides the base area by $25$.",
      fr: "Même diamètre : le volume est proportionnel à la hauteur. Un diamètre $5$ fois plus petit divise l’aire de base par $25$.",
      es: "Mismo diámetro: el volumen es proporcional a la altura. Un diámetro $5$ veces menor divide el área de la base entre $25$.",
      ja: "直径が同じなら体積は高さに比例。直径が $1/5$ なら底面積は $1/25$。",
      zh: "直径相同时体积与高成正比；直径为 $1/5$ 时底面积为 $1/25$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 3.4, scale: 50, pad: 16 });
      const cyl = (cx, r, h, lab) => { const E = (y) => { const p = []; for (let k = 0; k <= 48; k++) { const t = 2 * Math.PI * k / 48; p.push([cx + r * Math.cos(t), y + 0.12 * r * Math.sin(t)]); } F.path(p, 'seg', 'base', true); }; E(0.5); E(0.5 + h); F.seg([cx - r, 0.5], [cx - r, 0.5 + h], 'seg'); F.seg([cx + r, 0.5], [cx + r, 0.5 + h], 'seg'); F.text([cx, 0.5], lab, 'len small', 0, 18); };
      cyl(0.6, 0.2, 1.0, 'sheng'); cyl(2.2, 1.0, 0.4, 'dou'); cyl(4.9, 1.0, 2.3, 'hu');
      F.text([6.0, 1.65], '230', 'len small', 10, 0);
      F.reveal = () => {
      F.text([3.3, 0.7], '23', 'len small', 10, 0); F.text([0.85, 1.0], '57.5', 'len small', 20, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "sheng": {"fr": "sheng", "es": "sheng", "ja": "升", "zh": "升"},
      "dou": {"fr": "dou", "es": "dou", "ja": "斗", "zh": "斗"},
      "hu": {"fr": "hu", "es": "hu", "ja": "斛", "zh": "斛"},
      "dou ": {"fr": "dou ", "es": "dou ", "ja": "斗 ", "zh": "斗 "},
      "mm, sheng": {"fr": "mm, sheng", "es": "mm, sheng", "ja": "mm、升", "zh": "mm，升"},
      "cm, sheng": {"fr": "cm, sheng", "es": "cm, sheng", "ja": "cm、升", "zh": "cm，升"},
      "mm": {"fr": "mm", "es": "mm", "ja": "mm", "zh": "mm"},
      "cm": {"fr": "cm", "es": "cm", "ja": "cm", "zh": "cm"},
      "base": {"fr": "base", "es": "base", "ja": "底面", "zh": "底面积"},
      "volume": {"fr": "volume", "es": "volumen", "ja": "体積", "zh": "容积"},
      "same base, volume": {"fr": "même base, volume", "es": "misma base, volumen", "ja": "底面が同じ、体積", "zh": "同底，容积"}
    },
    options: [
      { tex: "\\text{dou }23\\text{ mm, sheng }57.5\\text{ mm}", correct: true, why: {
        en: "The dou holds $\\tfrac1{10}$ of the hu with the same base; the sheng holds $\\tfrac1{100}$ with $\\tfrac1{25}$ of the base.",
        fr: "Le dou contient $\\tfrac1{10}$ du hu avec la même base ; le sheng $\\tfrac1{100}$ avec $\\tfrac1{25}$ de la base.",
        es: "El dou contiene $\\tfrac1{10}$ del hu con la misma base; el sheng $\\tfrac1{100}$ con $\\tfrac1{25}$ de la base.",
        ja: "斗は底面が同じで斛の $\\tfrac1{10}$、升は底面 $\\tfrac1{25}$ で体積 $\\tfrac1{100}$。",
        zh: "斗与斛同底，容积为 $\\tfrac1{10}$；升容积为 $\\tfrac1{100}$，底面积为 $\\tfrac1{25}$。"
      } },
      { tex: "\\text{dou }2.3\\text{ cm, sheng }5.75\\text{ cm}", correct: true, why: {
        en: "The same heights in centimetres.",
        fr: "Les mêmes hauteurs en centimètres.",
        es: "Las mismas alturas en centímetros.",
        ja: "同じ高さをセンチメートルで。",
        zh: "同样的高度，用厘米表示。"
      } },
      { tex: "\\text{dou }23\\text{ mm, sheng }2.3\\text{ mm}", correct: false, why: {
        en: "This forgets that the sheng is narrower.",
        fr: "Cela oublie que le sheng est plus étroit.",
        es: "Olvida que el sheng es más estrecho.",
        ja: "升が細いことを忘れている。",
        zh: "忘了升更细。"
      } },
      { tex: "\\text{dou }23\\text{ mm, sheng }9.2\\text{ mm}", correct: false, why: {
        en: "This divides by $25$ instead of multiplying.",
        fr: "Cela divise par $25$ au lieu de multiplier.",
        es: "Divide entre $25$ en lugar de multiplicar.",
        ja: "$25$ を掛けずに割っている。",
        zh: "应乘 $25$ 却除了。"
      } },
      { tex: "\\text{dou }23\\text{ mm, sheng }115\\text{ mm}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\text{dou }2.3\\text{ mm, sheng }57.5\\text{ mm}", correct: false, why: {
        en: "Ratio $10$, not $100$, between hu and dou.",
        fr: "Rapport $10$, pas $100$, entre hu et dou.",
        es: "Razón $10$, no $100$, entre hu y dou.",
        ja: "斛と斗の比は $100$ でなく $10$。",
        zh: "斛与斗之比是 $10$，不是 $100$。"
      } },
      { tex: "\\text{dou }46\\text{ mm, sheng }57.5\\text{ mm}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\text{dou }23\\text{ mm, sheng }575\\text{ mm}", correct: false, why: {
        en: "This uses the ratio $\\tfrac1{10}$ for the sheng instead of $\\tfrac1{100}$.",
        fr: "Cela prend le rapport $\\tfrac1{10}$ pour le sheng au lieu de $\\tfrac1{100}$.",
        es: "Usa la razón $\\tfrac1{10}$ para el sheng en lugar de $\\tfrac1{100}$.",
        ja: "升に $\\tfrac1{100}$ でなく $\\tfrac1{10}$ を使っている。",
        zh: "升误用了 $\\tfrac1{10}$，应为 $\\tfrac1{100}$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Dou against hu",
          fr: "Dou contre hu",
          es: "Dou frente a hu",
          ja: "斗と斛",
          zh: "斗与斛"
        },
        lines: ["\\text{same base, volume}\\ \\tfrac1{10}\\ \\Rightarrow\\ h_{\\text{dou}}=\\tfrac{230}{10}=23"],
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
          en: "Sheng against hu",
          fr: "Sheng contre hu",
          es: "Sheng frente a hu",
          ja: "升と斛",
          zh: "升与斛"
        },
        lines: ["\\text{volume}\\ \\tfrac1{100},\\ \\text{base}\\ \\left(\\tfrac{65}{325}\\right)^2=\\tfrac1{25}\\ \\Rightarrow\\ h_{\\text{sheng}}=230\\cdot\\tfrac{25}{100}=57.5"],
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
          en: "Two options are the same pair of heights in different units.",
          fr: "Deux options sont les mêmes hauteurs en unités différentes.",
          es: "Dos opciones son las mismas alturas en unidades distintas.",
          ja: "2つの選択肢は単位違いの同じ高さ。",
          zh: "有两个选项是不同单位的同一组高度。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
