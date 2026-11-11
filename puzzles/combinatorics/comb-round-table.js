/* combinatorics · A round table
   Circular arrangements: fix one person, arrange the rest: (n − 1)!. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const P = k => [2 + 1.3 * Math.cos(Math.PI / 2 - 2 * Math.PI * k / 6), 2 + 1.3 * Math.sin(Math.PI / 2 - 2 * Math.PI * k / 6)];

  PuzzleBank.define({
    id: "comb-round-table",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["gaokao", "amc"]
    },
    difficulty: 1,
    title: {
      en: "A round table",
      fr: "Une table ronde",
      es: "Una mesa redonda",
      ja: "丸いテーブル",
      zh: "圆桌"
    },
    statement: {
      en: "<b>In how many ways can $6$ people sit around a round table?</b> (Two seatings are the same if everyone has the same neighbours on the left and on the right.)",
      fr: "<b>De combien de façons $6$ personnes peuvent-elles s’asseoir autour d’une table ronde ?</b> (Deux placements sont identiques si chacun a les mêmes voisins à gauche et à droite.)",
      es: "<b>¿De cuántas formas pueden sentarse $6$ personas alrededor de una mesa redonda?</b> (Dos disposiciones son iguales si todos tienen los mismos vecinos a izquierda y derecha.)",
      ja: "<b>$6$ 人が丸いテーブルに座る方法は何通りですか？</b>（全員の左右の隣人が同じなら同じ座り方とみなします。）",
      zh: "<b>$6$ 人围坐一张圆桌，有多少种坐法？</b>（若每个人左右两边的邻居都相同，视为同一种坐法。）"
    },
    figureText: {
      en: "A round table with six seats; one person is fixed at the top and the other five fill the remaining seats.",
      fr: "Une table ronde à six places ; une personne est fixée en haut et les cinq autres occupent les places restantes.",
      es: "Una mesa redonda con seis sillas; una persona se fija arriba y las otras cinco ocupan el resto.",
      ja: "6席の丸テーブル。1人を上に固定し、残り5人が残りの席に座ります。",
      zh: "有六个座位的圆桌；一人固定在上方，其余五人坐剩下的座位。"
    },
    hint: {
      en: "Rotating everyone gives the same seating: fix one person.",
      fr: "Tourner tout le monde donne le même placement : fixez une personne.",
      es: "Girar a todos da la misma disposición: fija a una persona.",
      ja: "全員を回転させても同じ座り方：1人を固定します。",
      zh: "整体旋转得到同一种坐法：固定一个人。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example dividing the 6! linear orders by the 6 rotations), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en divisant les 6! ordres en ligne par les 6 rotations), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo dividiendo los 6! órdenes en fila entre las 6 rotaciones), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば一列の並べ方 6! を回転の 6 通りで割る）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如把直线排列 6! 除以 6 种旋转），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4, h: 4, scale: 56, pad: 14 });
      F.circle([2, 2], 0.9, 'tri');
      for (let k = 0; k < 6; k++) { F.circle(P(k), 0.28, k ? 'fill-blue' : 'fill-pink'); F.text(P(k), k ? '?' : 'A', 'pt', 0, 1); }
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "A at the top": { fr: "A en haut", es: "A arriba", ja: "A を上に", zh: "A 在上方" }
    },
    options: [
      { tex: "120", correct: true, why: {
        en: "$(6 - 1)! = 5!$.",
        fr: "$(6 - 1)! = 5!$.",
        es: "$(6 - 1)! = 5!$.",
        ja: "$(6 - 1)! = 5!$.",
        zh: "$(6 - 1)! = 5!$."
      } },
      { tex: "720", correct: false, why: {
        en: "$6!$ counts rotations of the same seating as different.",
        fr: "$6!$ compte les rotations comme différentes.",
        es: "$6!$ cuenta las rotaciones como distintas.",
        ja: "$6!$ は回転したものを別々に数えています。",
        zh: "$6!$ 把旋转后的坐法当成不同。"
      } },
      { tex: "60", correct: false, why: {
        en: "$5!/2$ would also identify mirror images — but left and right neighbours matter here.",
        fr: "$5!/2$ identifie aussi les reflets — mais ici gauche et droite comptent.",
        es: "$5!/2$ identifica también los reflejos — pero aquí importan izquierda y derecha.",
        ja: "$5!/2$ は鏡像も同一視しますが、ここでは左右を区別します。",
        zh: "$5!/2$ 还把镜像视为相同 —— 但这里区分左右。"
      } },
      { tex: "6", correct: false, why: {
        en: "Only the $6$ rotations.",
        fr: "Seulement les $6$ rotations.",
        es: "Solo las $6$ rotaciones.",
        ja: "回転の $6$ 通りだけ。",
        zh: "只是 $6$ 种旋转。"
      } },
      { tex: "36", correct: false, why: {
        en: "$6^2$ has no meaning here.",
        fr: "$6^2$ n’a pas de sens ici.",
        es: "$6^2$ no tiene sentido aquí.",
        ja: "$6^2$ はここでは意味がありません。",
        zh: "$6^2$ 在这里没有意义。"
      } },
      { tex: "30", correct: false, why: {
        en: "$\\tfrac{6!}{4!}$ seats only two people.",
        fr: "$\\tfrac{6!}{4!}$ ne place que deux personnes.",
        es: "$\\tfrac{6!}{4!}$ solo sienta a dos personas.",
        ja: "$\\tfrac{6!}{4!}$ は2人しか座らせていません。",
        zh: "$\\tfrac{6!}{4!}$ 只安排了两个人。"
      } },
      { tex: "24", correct: false, why: {
        en: "$4!$: one person too few after fixing.",
        fr: "$4!$ : une personne de moins après avoir fixé.",
        es: "$4!$: una persona de menos tras fijar.",
        ja: "$4!$：固定後に1人少ない計算です。",
        zh: "$4!$：固定后少算了一人。"
      } },
      { tex: "360", correct: false, why: {
        en: "$6!/2$: divided by the wrong number.",
        fr: "$6!/2$ : mauvaise division.",
        es: "$6!/2$: dividió por el número equivocado.",
        ja: "$6!/2$：割る数が違います。",
        zh: "$6!/2$：除错了数。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Fix one person",
          fr: "Fixer une personne",
          es: "Fijar a una persona",
          ja: "1人を固定する",
          zh: "固定一人"
        },
        lines: ["\\text{A at the top}"],
        note: {
          en: "Any seating can be rotated so that A is at the top.",
          fr: "Tout placement peut être tourné pour mettre A en haut.",
          es: "Cualquier disposición se puede girar para que A quede arriba.",
          ja: "どの座り方も回転して A を上にできます。",
          zh: "任何坐法都可以旋转使 A 在上方。"
        }
      },
      {
        title: {
          en: "Arrange the others",
          fr: "Placer les autres",
          es: "Colocar a los demás",
          ja: "残りを並べる",
          zh: "安排其余人"
        },
        lines: ["5! = \\boxed{120}"],
        note: {
          en: "The five other seats are now distinguishable.",
          fr: "Les cinq autres places sont maintenant distinctes.",
          es: "Las otras cinco sillas ya son distinguibles.",
          ja: "残り5席は区別できるようになりました。",
          zh: "其余五个座位现在可以区分。"
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
          en: "Exactly one option is correct.",
          fr: "Une seule option est correcte.",
          es: "Exactamente una opción es correcta.",
          ja: "正しい選択肢はちょうど1つ。",
          zh: "恰有一个选项正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
