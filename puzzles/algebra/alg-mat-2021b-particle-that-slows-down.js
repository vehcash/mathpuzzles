/* algebra · A particle that halves its speed at every integer
   Oxford MAT 2021, additional multiple-choice test (Mathematics Admissions Test), Question D */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2021b-particle-that-slows-down",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2021, additional multiple-choice test (Mathematics Admissions Test), Question D",
        fr: "MAT d’Oxford 2021, test complémentaire à choix multiples (test d’admission en mathématiques), question D",
        es: "MAT de Oxford 2021, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta D",
        ja: "オックスフォード大学 数学入学試験 MAT 2021 追加選択式テスト 問題 D",
        zh: "牛津大学数学入学考试 MAT 2021 补充选择题测试 第 D 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "A particle that halves its speed at every integer",
      fr: "Une particule qui divise sa vitesse par deux à chaque entier",
      es: "Una partícula que reduce su velocidad a la mitad en cada entero",
      ja: "整数点ごとに速さが半分になる粒子",
      zh: "每到整数点速度减半的质点"
    },
    statement: {
      en: "A particle starts at $x=0$ moving right with speed $1$. Whenever it reaches $x=n$ for a positive integer $n$, its speed becomes $2^{-n}$. Let $X$ be its position at time $t=100$. <b>Which of the following are true?</b>",
      fr: "Une particule part de $x=0$ vers la droite à la vitesse $1$. Chaque fois qu’elle atteint $x=n$, $n$ entier strictement positif, sa vitesse devient $2^{-n}$. Soit $X$ sa position à l’instant $t=100$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Una partícula parte de $x=0$ hacia la derecha con velocidad $1$. Cada vez que llega a $x=n$, $n$ entero positivo, su velocidad pasa a ser $2^{-n}$. Sea $X$ su posición en $t=100$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "粒子が $x=0$ から速さ $1$ で右へ進みます。正の整数 $n$ に対し $x=n$ に達すると速さが $2^{-n}$ になります。時刻 $t=100$ の位置を $X$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "质点从 $x=0$ 以速度 $1$ 向右运动。每到正整数 $x=n$，速度变为 $2^{-n}$。设 $t=100$ 时其位置为 $X$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Unit intervals on a line with the time each one takes: 1, 2, 4, 8, …",
      fr: "Des intervalles unité avec la durée de chacun : 1, 2, 4, 8, …",
      es: "Intervalos unidad con el tiempo de cada uno: 1, 2, 4, 8, …",
      ja: "単位区間と各区間の所要時間：1, 2, 4, 8, …",
      zh: "单位区间及各段用时：1, 2, 4, 8, …"
    },
    hint: {
      en: "The stretch from $n$ to $n+1$ takes $2^n$ time units. Add up until you pass $100$.",
      fr: "Le trajet de $n$ à $n+1$ dure $2^n$. Additionnez jusqu’à dépasser $100$.",
      es: "El tramo de $n$ a $n+1$ dura $2^n$. Suma hasta pasar de $100$.",
      ja: "$n$ から $n+1$ まで $2^n$ かかる。$100$ を超えるまで足す。",
      zh: "从 $n$ 到 $n+1$ 用时 $2^n$，累加直到超过 $100$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.6, h: 1.6, scale: 46, pad: 16 });
      F.seg([0.2, 0.6], [6.4, 0.6], 'axis');
      for (let k = 0; k <= 7; k++) { F.seg([0.3 + k * 0.85, 0.5], [0.3 + k * 0.85, 0.7], 'axis'); F.text([0.3 + k * 0.85, 0.6], String(k), 'tick', 0, 16); if (k < 7) F.text([0.72 + k * 0.85, 0.6], String(2 ** k), 'len small', 0, -14); }
      F.reveal = () => {
      F.dot([0.3 + 6.578125 * 0.85, 0.6]); F.text([0.3 + 6.578125 * 0.85, 0.6], 'X', 'pt', 0, -30);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "it reaches": {"fr": "elle atteint", "es": "alcanza", "ja": "到達：", "zh": "到达"},
      "at": {"fr": "à", "es": "en", "ja": "時刻", "zh": "于"},
      "it escapes to infinity": {"fr": "elle part à l’infini", "es": "se escapa al infinito", "ja": "無限遠に行く", "zh": "跑到无穷远"},
      "speed": {"fr": "vitesse", "es": "velocidad", "ja": "速さ", "zh": "速度"}
    },
    options: [
      { tex: "X=\\tfrac{421}{64}", correct: true, why: {
        en: "$6+\\tfrac{37}{64}$",
        fr: "$6+\\tfrac{37}{64}$",
        es: "$6+\\tfrac{37}{64}$",
        ja: "$6+\\tfrac{37}{64}$",
        zh: "$6+\\tfrac{37}{64}$"
      } },
      { tex: "\\text{it reaches}\\ x=6\\ \\text{at}\\ t=63", correct: true, why: {
        en: "$1+2+4+8+16+32=63$",
        fr: "$1+2+4+8+16+32=63$",
        es: "$1+2+4+8+16+32=63$",
        ja: "$1+2+4+8+16+32=63$",
        zh: "$1+2+4+8+16+32=63$"
      } },
      { tex: "X=\\tfrac{105}{16}", correct: false, why: {
        en: "Uses speed $2^{-4}$ on the last stretch instead of $2^{-6}$.",
        fr: "Utilise la vitesse $2^{-4}$ au lieu de $2^{-6}$ à la fin.",
        es: "Usa velocidad $2^{-4}$ en vez de $2^{-6}$ al final.",
        ja: "最後の区間で $2^{-6}$ でなく $2^{-4}$ を使った。",
        zh: "最后一段误用速度 $2^{-4}$。"
      } },
      { tex: "X=\\tfrac{89}{16}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{it escapes to infinity}", correct: false, why: {
        en: "Each stretch takes twice as long; it reaches only finitely many integers by any fixed time.",
        fr: "Chaque trajet dure deux fois plus ; à un instant donné, seulement un nombre fini d’entiers atteints.",
        es: "Cada tramo dura el doble; en un tiempo dado solo alcanza un número finito de enteros.",
        ja: "各区間は2倍ずつ長くかかり、有限時間では有限個の整数しか到達しない。",
        zh: "每段用时翻倍，有限时间内只能到达有限个整数。"
      } },
      { tex: "X=7", correct: false, why: {
        en: "Reaching $7$ needs $t=127$.",
        fr: "Atteindre $7$ demande $t=127$.",
        es: "Llegar a $7$ requiere $t=127$.",
        ja: "$7$ に達するのは $t=127$。",
        zh: "到达 $7$ 需 $t=127$。"
      } },
      { tex: "\\text{it reaches}\\ x=6\\ \\text{at}\\ t=64", correct: false, why: {
        en: "Off by one: $2^6-1=63$.",
        fr: "Décalage : $2^6-1=63$.",
        es: "Error de uno: $2^6-1=63$.",
        ja: "1ずれ：$2^6-1=63$。",
        zh: "差一：$2^6-1=63$。"
      } },
      { tex: "X=\\tfrac{100}{64}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Time per stretch",
          fr: "Durée par trajet",
          es: "Tiempo por tramo",
          ja: "区間ごとの時間",
          zh: "每段用时"
        },
        lines: ["[n,n+1]:\\ \\tfrac{1}{2^{-n}}=2^n;\\quad 1+2+\\dots+32=63"],
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
          en: "The rest of the time",
          fr: "Le temps restant",
          es: "El tiempo restante",
          ja: "残りの時間",
          zh: "剩余时间"
        },
        lines: ["100-63=37,\\ \\ \\text{speed}\\ 2^{-6}\\Rightarrow X=6+\\tfrac{37}{64}=\\tfrac{421}{64}"],
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
