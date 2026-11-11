/* combinatorics · Walking on a grid
   Paths of 4 right and 3 up steps: C(7, 3). */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-lattice-paths",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["amc"]
    },
    difficulty: 1,
    title: {
      en: "Walking on a grid",
      fr: "Marcher sur un quadrillage",
      es: "Caminar por una cuadrícula",
      ja: "格子の道",
      zh: "网格上的路径"
    },
    statement: {
      en: "Moving only right or up along grid lines, <b>how many shortest paths go from $(0, 0)$ to $(4, 3)$?</b> Which of the following equal that number?",
      fr: "En se déplaçant seulement vers la droite ou vers le haut sur le quadrillage, <b>combien de plus courts chemins vont de $(0, 0)$ à $(4, 3)$ ?</b> Lesquelles des valeurs suivantes conviennent ?",
      es: "Moviéndose solo a la derecha o hacia arriba por la cuadrícula, <b>¿cuántos caminos más cortos van de $(0, 0)$ a $(4, 3)$?</b> ¿Cuáles de los siguientes son iguales a ese número?",
      ja: "格子線に沿って右か上にだけ進むとき、<b>$(0, 0)$ から $(4, 3)$ への最短経路は何通りですか？</b> 次のうちその数に等しいものはどれですか？",
      zh: "沿网格线只向右或向上走，<b>从 $(0, 0)$ 到 $(4, 3)$ 的最短路径有多少条？</b>下列哪些等于这个数？"
    },
    figureText: {
      en: "A 4 × 3 grid with one shortest path from the bottom-left corner to the top-right corner highlighted.",
      fr: "Un quadrillage 4 × 3 avec un plus court chemin du coin inférieur gauche au coin supérieur droit mis en évidence.",
      es: "Una cuadrícula 4 × 3 con un camino más corto de la esquina inferior izquierda a la superior derecha resaltado.",
      ja: "4 × 3 の格子。左下から右上への最短経路の1つが強調されています。",
      zh: "4 × 3 网格，突出显示从左下角到右上角的一条最短路径。"
    },
    hint: {
      en: "Every path is a word of $4$ R’s and $3$ U’s.",
      fr: "Chaque chemin est un mot de $4$ D et $3$ H.",
      es: "Cada camino es una palabra de $4$ D y $3$ A.",
      ja: "どの経路も R を4つ、U を3つ並べた語です。",
      zh: "每条路径都是由 $4$ 个“右”和 $3$ 个“上”组成的序列。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example writing at each grid point the number of ways to reach it (Pascal’s triangle)), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en écrivant à chaque nœud le nombre de façons d’y arriver (triangle de Pascal)), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo escribiendo en cada nodo el número de formas de llegar (triángulo de Pascal)), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば各格子点にそこへ行く方法の数を書き込む（パスカルの三角形））。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如在每个格点写出到达它的路径数（杨辉三角）），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4, h: 3, scale: 56, pad: 22 });
      grid(F, 0, 0, 4, 3);
      F.path([[0, 0], [2, 0], [2, 1], [3, 1], [3, 3], [4, 3]], 'hl yellow', 'over', false);
      F.dot([0, 0]); F.dot([4, 3]); F.text([0, 0], '(0, 0)', 'len small', -6, 16); F.text([4, 3], '(4, 3)', 'len small', 6, -14);
      return F;
    },
    options: [
      { tex: "35", correct: true, why: {
        en: "$\\binom73 = \\tfrac{7\\cdot6\\cdot5}{6}$.",
        fr: "$\\binom73 = \\tfrac{7\\cdot6\\cdot5}{6}$.",
        es: "$\\binom73 = \\tfrac{7\\cdot6\\cdot5}{6}$.",
        ja: "$\\binom73 = \\tfrac{7\\cdot6\\cdot5}{6}$.",
        zh: "$\\binom73 = \\tfrac{7\\cdot6\\cdot5}{6}$."
      } },
      { tex: "\\binom74", correct: true, why: {
        en: "Choosing the $4$ right steps instead of the $3$ up steps gives the same number.",
        fr: "Choisir les $4$ pas à droite donne le même nombre.",
        es: "Elegir los $4$ pasos a la derecha da el mismo número.",
        ja: "右の4歩を選んでも同じ数です。",
        zh: "选 $4$ 个向右步也得到同一个数。"
      } },
      { tex: "12", correct: false, why: {
        en: "$4\\cdot3$ counts grid squares, not paths.",
        fr: "$4\\cdot3$ compte des cases, pas des chemins.",
        es: "$4\\cdot3$ cuenta cuadrados, no caminos.",
        ja: "$4\\cdot3$ はマスの数で、経路ではありません。",
        zh: "$4\\cdot3$ 是格子数，不是路径数。"
      } },
      { tex: "7", correct: false, why: {
        en: "The length of each path, not the number of paths.",
        fr: "La longueur de chaque chemin, pas leur nombre.",
        es: "La longitud de cada camino, no su número.",
        ja: "各経路の長さで、経路の数ではありません。",
        zh: "每条路径的长度，而不是路径数。"
      } },
      { tex: "128", correct: false, why: {
        en: "$2^7$ allows any mix of R and U, not exactly $4$ and $3$.",
        fr: "$2^7$ autorise n’importe quel mélange.",
        es: "$2^7$ permite cualquier mezcla.",
        ja: "$2^7$ は R と U の個数を制限していません。",
        zh: "$2^7$ 没有限制 R、U 各自的个数。"
      } },
      { tex: "70", correct: false, why: {
        en: "Double the answer.",
        fr: "Le double de la réponse.",
        es: "El doble de la respuesta.",
        ja: "答えの2倍。",
        zh: "答案的两倍。"
      } },
      { tex: "21", correct: false, why: {
        en: "$\\binom72$ uses only two up steps.",
        fr: "$\\binom72$ n’utilise que deux pas vers le haut.",
        es: "$\\binom72$ usa solo dos pasos hacia arriba.",
        ja: "$\\binom72$ は上の歩が2つしかありません。",
        zh: "$\\binom72$ 只有两步向上。"
      } },
      { tex: "5040", correct: false, why: {
        en: "$7!$ treats all steps as different.",
        fr: "$7!$ traite tous les pas comme différents.",
        es: "$7!$ trata todos los pasos como distintos.",
        ja: "$7!$ はすべての歩を区別しています。",
        zh: "$7!$ 把所有步都看成不同。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Encode a path",
          fr: "Coder un chemin",
          es: "Codificar un camino",
          ja: "経路を記号で表す",
          zh: "编码路径"
        },
        lines: ["RRURUUR"],
        note: {
          en: "Any shortest path uses exactly $4$ right and $3$ up steps.",
          fr: "Tout plus court chemin utilise exactement $4$ pas à droite et $3$ vers le haut.",
          es: "Todo camino más corto usa exactamente $4$ pasos a la derecha y $3$ arriba.",
          ja: "最短経路は右4歩・上3歩をちょうど使います。",
          zh: "任一最短路径恰有 $4$ 步向右、$3$ 步向上。"
        }
      },
      {
        title: {
          en: "Choose where the up steps go",
          fr: "Choisir la place des pas vers le haut",
          es: "Elegir dónde van los pasos hacia arriba",
          ja: "上の歩の位置を選ぶ",
          zh: "选择向上步的位置"
        },
        lines: ["\\binom73 = \\boxed{35}"],
        note: {
          en: "$3$ positions out of $7$.",
          fr: "$3$ places parmi $7$.",
          es: "$3$ posiciones de $7$.",
          ja: "7か所から3か所。",
          zh: "从 $7$ 个位置中选 $3$ 个。"
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
          en: "Two options are the same value written differently.",
          fr: "Deux options sont la même valeur écrite différemment.",
          es: "Dos opciones son el mismo valor escrito de forma distinta.",
          ja: "2つの選択肢は同じ値を別の形で書いたものです。",
          zh: "有两个选项是同一个值的不同写法。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
