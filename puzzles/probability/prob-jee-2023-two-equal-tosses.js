/* probability · Stop at two equal tosses
   JEE Advanced 2023 (India), Paper 2, Mathematics Q.2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-jee-2023-two-equal-tosses",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2023 (India), Paper 2, Mathematics Q.2",
        fr: "JEE Advanced 2023 (Inde), épreuve 2, mathématiques Q.2",
        es: "JEE Advanced 2023 (India), prueba 2, matemáticas Q.2",
        ja: "JEE Advanced 2023（インド工科大学入試）Paper 2 数学 Q.2",
        zh: "印度理工学院入学考试 JEE Advanced 2023 卷二 数学 Q.2"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "Stop at two equal tosses",
      fr: "S’arrêter à deux lancers égaux",
      es: "Parar con dos lanzamientos iguales",
      ja: "同じ面が2回続いたら終了",
      zh: "连续两次相同就停"
    },
    statement: {
      en: "A coin with $P(\\text{head})=\\tfrac13$ is tossed repeatedly, and the experiment stops as soon as two consecutive tosses are the same. <b>Which of the following equal the probability that it stops with a head?</b>",
      fr: "Une pièce avec $P(\\text{face})=\\tfrac13$ est lancée de façon répétée, et l’expérience s’arrête dès que deux lancers consécutifs sont identiques. <b>Lesquelles des valeurs suivantes sont égales à la probabilité qu’elle s’arrête sur face ?</b>",
      es: "Una moneda con $P(\\text{cara})=\\tfrac13$ se lanza repetidamente y el experimento se detiene en cuanto dos lanzamientos seguidos coinciden. <b>¿Cuáles de los siguientes valores son iguales a la probabilidad de que termine en cara?</b>",
      ja: "表の確率が $\\tfrac13$ の硬貨を繰り返し投げ、連続する2回が同じ面になった時点で終了します。<b>表で終わる確率に等しいものはどれですか？</b>",
      zh: "一枚正面概率为 $\\tfrac13$ 的硬币反复抛掷，一旦连续两次结果相同就停止。<b>停止时为正面的概率等于下列哪些？</b>"
    },
    figureText: {
      en: "A two-state diagram H ⇄ T: from H, another H (1/3) ends the game; from T, another T (2/3) ends it; otherwise move to the other state.",
      fr: "Un diagramme à deux états H ⇄ T : depuis H, un nouveau H (1/3) termine ; depuis T, un nouveau T (2/3) termine ; sinon on change d’état.",
      es: "Un diagrama de dos estados H ⇄ T: desde H, otra H (1/3) termina; desde T, otra T (2/3) termina; si no, se cambia de estado.",
      ja: "2状態の図 H ⇄ T。H の次に H（1/3）で終了、T の次に T（2/3）で終了、それ以外は反対の状態へ。",
      zh: "两状态图 H ⇄ T：在 H 时再出 H（1/3）结束；在 T 时再出 T（2/3）结束；否则转到另一状态。"
    },
    hint: {
      en: "Let $a$ be the chance of ending with a head given that the last toss was a head, and $b$ the same given the last toss was a tail. Write two equations.",
      fr: "Soit $a$ la probabilité de finir sur face sachant que le dernier lancer est face, et $b$ sachant qu’il est pile. Écrivez deux équations.",
      es: "Sea $a$ la probabilidad de acabar en cara si el último fue cara, y $b$ si fue cruz. Escribe dos ecuaciones.",
      ja: "直前が表のとき表で終わる確率を $a$、裏のときを $b$ として2式を立てます。",
      zh: "设上一次为正面时以正面结束的概率为 $a$，上一次为反面时为 $b$，列两个方程。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 2.6, scale: 50, pad: 14 });
      const H = [1.6, 1.3], Tt = [4.4, 1.3];
      F.circle(H, 0.42, 'fill-yellow'); F.circle(Tt, 0.42, 'fill-blue');
      F.text(H, 'H', 'pt', 0, 0); F.text(Tt, 'T', 'pt', 0, 0);
      arrow(F, [2.05, 1.5], [3.95, 1.5]); arrow(F, [3.95, 1.1], [2.05, 1.1]);
      F.text([3.0, 1.75], '2/3', 'len small', 0, -4); F.text([3.0, 0.85], '1/3', 'len small', 0, 6);
      F.text([0.55, 1.3], 'HH 1/3', 'len small', 0, 0); F.text([5.45, 1.3], 'TT 2/3', 'len small', 0, 0);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "head": {"fr": "face", "es": "cara", "ja": "表", "zh": "正面"}
    },
    options: [
      { tex: "\\tfrac{5}{21}", correct: true, why: {
        en: "$p\\,a+q\\,b$ with $a=\\tfrac{p}{1-pq}=\\tfrac37$, $b=pa=\\tfrac17$.",
        fr: "$p\\,a+q\\,b$ with $a=\\tfrac{p}{1-pq}=\\tfrac37$, $b=pa=\\tfrac17$.",
        es: "$p\\,a+q\\,b$ with $a=\\tfrac{p}{1-pq}=\\tfrac37$, $b=pa=\\tfrac17$.",
        ja: "$p\\,a+q\\,b$ with $a=\\tfrac{p}{1-pq}=\\tfrac37$, $b=pa=\\tfrac17$.",
        zh: "$p\\,a+q\\,b$ with $a=\\tfrac{p}{1-pq}=\\tfrac37$, $b=pa=\\tfrac17$."
      } },
      { tex: "\\dfrac{p^2(1+q)}{1-pq}\\ \\ \\left(p=\\tfrac13,\\ q=\\tfrac23\\right)", correct: true, why: {
        en: "The general formula: $\\tfrac{\\frac19\\cdot\\frac53}{\\frac79}=\\tfrac{5}{21}$.",
        fr: "La formule générale : $\\tfrac{\\frac19\\cdot\\frac53}{\\frac79}=\\tfrac{5}{21}$.",
        es: "La fórmula general: $\\tfrac{\\frac19\\cdot\\frac53}{\\frac79}=\\tfrac{5}{21}$.",
        ja: "一般式：$\\tfrac{\\frac19\\cdot\\frac53}{\\frac79}=\\tfrac{5}{21}$。",
        zh: "一般公式：$\\tfrac{\\frac19\\cdot\\frac53}{\\frac79}=\\tfrac{5}{21}$。"
      } },
      { tex: "\\tfrac13", correct: false, why: {
        en: "The chance of a single head, not of ending on heads.",
        fr: "La probabilité d’un seul face, pas de finir sur face.",
        es: "La probabilidad de una cara, no de acabar en cara.",
        ja: "1回表が出る確率。",
        zh: "那是单次正面的概率。"
      } },
      { tex: "\\tfrac19", correct: false, why: {
        en: "Only the path $HH$ at the start.",
        fr: "Seulement le chemin $HH$ au début.",
        es: "Solo el camino $HH$ al principio.",
        ja: "最初の $HH$ だけ。",
        zh: "只算了开头 $HH$ 的情形。"
      } },
      { tex: "\\tfrac15", correct: false, why: {
        en: "$\\tfrac{p^2}{p^2+q^2}$: compares $HH$ with $TT$ directly, ignoring alternation.",
        fr: "$\\tfrac{p^2}{p^2+q^2}$ : compare $HH$ à $TT$ sans tenir compte de l’alternance.",
        es: "$\\tfrac{p^2}{p^2+q^2}$: compara $HH$ con $TT$ sin la alternancia.",
        ja: "$\\tfrac{p^2}{p^2+q^2}$：交互の列を無視。",
        zh: "$\\tfrac{p^2}{p^2+q^2}$：忽略了交替的过程。"
      } },
      { tex: "\\tfrac{16}{21}", correct: false, why: {
        en: "That is the chance of ending with a tail.",
        fr: "C’est la probabilité de finir sur pile.",
        es: "Es la probabilidad de acabar en cruz.",
        ja: "裏で終わる確率。",
        zh: "那是以反面结束的概率。"
      } },
      { tex: "\\tfrac37", correct: false, why: {
        en: "That is $a$, conditional on the last toss being a head.",
        fr: "C’est $a$, conditionné au dernier lancer face.",
        es: "Es $a$, condicionado a que el último fuera cara.",
        ja: "直前が表という条件つきの $a$。",
        zh: "那是 $a$，是以上次为正面为条件的。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "The coin is not fair.",
        fr: "La pièce n’est pas équilibrée.",
        es: "La moneda no es equilibrada.",
        ja: "公平な硬貨ではない。",
        zh: "硬币不均匀。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Two states",
          fr: "Deux états",
          es: "Dos estados",
          ja: "2つの状態",
          zh: "两个状态"
        },
        lines: ["a=p+q\\,b,\\qquad b=p\\,a"],
        note: {
          en: "From $H$: a head ends it now, a tail moves to state $T$. From $T$: only a head continues.",
          fr: "Depuis $H$ : face termine, pile mène à $T$. Depuis $T$ : seul face continue.",
          es: "Desde $H$: cara termina, cruz lleva a $T$. Desde $T$: solo cara continúa.",
          ja: "$H$ から：表で終了、裏で $T$ へ。$T$ から：表のときだけ続く。",
          zh: "在 $H$：正面即结束，反面转到 $T$。在 $T$：只有正面能继续。"
        }
      },
      {
        title: {
          en: "Solve",
          fr: "Résoudre",
          es: "Resolver",
          ja: "解く",
          zh: "求解"
        },
        lines: ["a=\\frac{p}{1-pq}=\\frac{1/3}{7/9}=\\frac37,\\qquad b=\\frac17"],
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
          en: "First toss",
          fr: "Premier lancer",
          es: "Primer lanzamiento",
          ja: "1回目",
          zh: "第一次抛掷"
        },
        lines: ["P=p\\,a+q\\,b=\\tfrac13\\cdot\\tfrac37+\\tfrac23\\cdot\\tfrac17=\\boxed{\\tfrac{5}{21}}"],
        note: {
          en: "The first toss puts us in state $H$ or $T$.",
          fr: "Le premier lancer nous place en $H$ ou $T$.",
          es: "El primer lanzamiento nos pone en $H$ o $T$.",
          ja: "1回目で状態 $H$ か $T$ になる。",
          zh: "第一次抛掷决定处于 $H$ 还是 $T$。"
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
