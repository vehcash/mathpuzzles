/* cheat sheet · trigonometry — text is 'en|fr|es|ja|zh' */
(function () {
  const R = String.raw;
  Cheats.topic({
    id: 'trigonometry', icon: 'θ', color: '#7b4fa0', bg: '#efe6f6', cat: 'trigonometry',
    name: 'Trigonometry|Trigonométrie|Trigonometría|三角関数|三角学',
    blurb: 'Ratios, the unit circle, exact values, identities, triangle laws and sinusoids.|Rapports, cercle trigonométrique, valeurs exactes, identités, lois des triangles et sinusoïdes.|Razones, circunferencia unidad, valores exactos, identidades, leyes del triángulo y sinusoides.|三角比、単位円、代表的な値、公式、正弦・余弦定理、正弦波。|三角比、单位圆、特殊角的值、恒等式、正余弦定理与正弦曲线。',
    sections: [
      { t: 'Right-triangle ratios|Rapports dans le triangle rectangle|Razones en el triángulo rectángulo|直角三角形の三角比|直角三角形中的三角比', fig: 'righttrig', items: [
        ['Sine, cosine, tangent|Sinus, cosinus, tangente|Seno, coseno, tangente|sin・cos・tan|正弦、余弦、正切', [R`\sin\theta = \frac{\text{opp}}{\text{hyp}}, \qquad \cos\theta = \frac{\text{adj}}{\text{hyp}}, \qquad \tan\theta = \frac{\text{opp}}{\text{adj}}`, R`\sin\theta = \frac{\text{opp}}{\text{hyp}}, \qquad \cos\theta = \frac{\text{adj}}{\text{hyp}}, \qquad \tan\theta = \frac{\text{opp}}{\text{adj}}`, R`\sin\theta = \frac{\text{op}}{\text{hip}}, \qquad \cos\theta = \frac{\text{cont}}{\text{hip}}, \qquad \tan\theta = \frac{\text{op}}{\text{cont}}`, R`\sin\theta = \frac{\text{対辺}}{\text{斜辺}}, \qquad \cos\theta = \frac{\text{隣辺}}{\text{斜辺}}, \qquad \tan\theta = \frac{\text{対辺}}{\text{隣辺}}`, R`\sin\theta = \frac{\text{对边}}{\text{斜边}}, \qquad \cos\theta = \frac{\text{邻边}}{\text{斜边}}, \qquad \tan\theta = \frac{\text{对边}}{\text{邻边}}`]],
        ['Reciprocal ratios|Rapports inverses|Razones recíprocas|逆数の三角比|倒数关系', R`\cot\theta = \frac{1}{\tan\theta}, \qquad \sec\theta = \frac{1}{\cos\theta}, \qquad \csc\theta = \frac{1}{\sin\theta}`],
        ['Complementary angles|Angles complémentaires|Ángulos complementarios|余角の関係|余角关系', R`\sin(90^\circ - \theta) = \cos\theta, \qquad \tan(90^\circ - \theta) = \frac{1}{\tan\theta}`]
      ] },
      { t: 'The unit circle|Le cercle trigonométrique|La circunferencia unidad|単位円|单位圆', fig: 'unit', items: [
        ['Coordinates of the point|Coordonnées du point|Coordenadas del punto|点の座標|点的坐标', R`P = (\cos\theta, \sin\theta), \qquad \tan\theta = \frac{\sin\theta}{\cos\theta}`],
        ['Pythagorean identities|Identités de Pythagore|Identidades pitagóricas|三角関数の相互関係|平方关系', R`\sin^2\theta + \cos^2\theta = 1, \qquad 1 + \tan^2\theta = \frac{1}{\cos^2\theta}`],
        ['Signs by quadrant|Signes par quadrant|Signos por cuadrante|象限ごとの符号|各象限的符号', R`\text{I}: \sin, \cos, \tan > 0 \qquad \text{II}: \sin > 0 \qquad \text{III}: \tan > 0 \qquad \text{IV}: \cos > 0`],
        ['Periods|Périodes|Períodos|周期|周期', R`\sin, \cos:\ 2\pi, \qquad \tan:\ \pi`]
      ] },
      { t: 'Exact values|Valeurs exactes|Valores exactos|代表的な角の値|特殊角的三角函数值', items: [
        { tbl: [[R`\theta`, '0', R`\tfrac{\pi}{6}`, R`\tfrac{\pi}{4}`, R`\tfrac{\pi}{3}`, R`\tfrac{\pi}{2}`, R`\pi`],
                [R`\sin`, '0', R`\tfrac12`, R`\tfrac{\sqrt2}{2}`, R`\tfrac{\sqrt3}{2}`, '1', '0'],
                [R`\cos`, '1', R`\tfrac{\sqrt3}{2}`, R`\tfrac{\sqrt2}{2}`, R`\tfrac12`, '0', '-1'],
                [R`\tan`, '0', R`\tfrac{\sqrt3}{3}`, '1', R`\sqrt3`, '—', '0']], k: 'exact values table 30 45 60 degrees valeurs exactes valores exactos 値 特殊角' },
        ['Degrees|Degrés|Grados|度数法|角度', R`0^\circ,\ 30^\circ,\ 45^\circ,\ 60^\circ,\ 90^\circ,\ 180^\circ`],
        ['15° and 75°|15° et 75°|15° y 75°|15° と 75°|15° 与 75°', R`\sin 15^\circ = \frac{\sqrt6 - \sqrt2}{4}, \qquad \cos 15^\circ = \frac{\sqrt6 + \sqrt2}{4}`]
      ] },
      { t: 'Symmetries|Symétries|Simetrías|対称性|诱导公式', items: [
        ['Negative angle|Angle opposé|Ángulo opuesto|負の角|负角', R`\sin(-x) = -\sin x, \qquad \cos(-x) = \cos x, \qquad \tan(-x) = -\tan x`],
        ['Supplementary angle|Angle supplémentaire|Ángulo suplementario|補角|补角', R`\sin(\pi - x) = \sin x, \qquad \cos(\pi - x) = -\cos x`],
        ['Half turn|Demi-tour|Media vuelta|π ずらす|加 π', R`\sin(x + \pi) = -\sin x, \qquad \cos(x + \pi) = -\cos x, \qquad \tan(x + \pi) = \tan x`],
        ['Quarter turn|Quart de tour|Cuarto de vuelta|π/2 ずらす|加 π/2', R`\sin\left(x + \tfrac\pi2\right) = \cos x, \qquad \cos\left(x + \tfrac\pi2\right) = -\sin x`]
      ] },
      { t: 'Sum and difference|Somme et différence|Suma y diferencia|加法定理|和差角公式', items: [
        ['Sine|Sinus|Seno|sin|正弦', R`\sin(a \pm b) = \sin a\cos b \pm \cos a\sin b`],
        ['Cosine|Cosinus|Coseno|cos|余弦', R`\cos(a \pm b) = \cos a\cos b \mp \sin a\sin b`],
        ['Tangent|Tangente|Tangente|tan|正切', R`\tan(a \pm b) = \frac{\tan a \pm \tan b}{1 \mp \tan a\tan b}`]
      ] },
      { t: 'Double and half angles|Angle double et moitié|Ángulo doble y mitad|2倍角・半角|二倍角与半角', items: [
        ['Double angle|Angle double|Ángulo doble|2倍角|二倍角', R`\sin 2x = 2\sin x\cos x, \qquad \tan 2x = \frac{2\tan x}{1 - \tan^2 x}`],
        ['Cosine of a double angle|Cosinus de l’angle double|Coseno del ángulo doble|cos の2倍角|余弦二倍角', R`\cos 2x = \cos^2 x - \sin^2 x = 2\cos^2 x - 1 = 1 - 2\sin^2 x`],
        ['Lowering the power|Linéarisation|Reducción de potencias|半角（次数下げ）|降幂公式', R`\sin^2 x = \frac{1 - \cos 2x}{2}, \qquad \cos^2 x = \frac{1 + \cos 2x}{2}`],
        ['Triple angle|Angle triple|Ángulo triple|3倍角|三倍角', R`\sin 3x = 3\sin x - 4\sin^3 x, \qquad \cos 3x = 4\cos^3 x - 3\cos x`],
        ['In terms of t = tan(x/2)|En fonction de t = tan(x/2)|En función de t = tan(x/2)|t = tan(x/2) で表す|用 t = tan(x/2) 表示', R`\sin x = \frac{2t}{1 + t^2}, \qquad \cos x = \frac{1 - t^2}{1 + t^2}`]
      ] },
      { t: 'Sums and products|Sommes et produits|Sumas y productos|和積・積和の公式|和差化积与积化和差', items: [
        ['Sum to product|Somme en produit|Suma en producto|和を積に|和差化积', R`\sin a + \sin b = 2\sin\frac{a + b}{2}\cos\frac{a - b}{2}`],
        ['', R`\cos a + \cos b = 2\cos\frac{a + b}{2}\cos\frac{a - b}{2}, \qquad \cos a - \cos b = -2\sin\frac{a + b}{2}\sin\frac{a - b}{2}`],
        ['Product to sum|Produit en somme|Producto en suma|積を和に|积化和差', R`\sin a\cos b = \tfrac12\left[\sin(a + b) + \sin(a - b)\right]`],
        ['', R`\cos a\cos b = \tfrac12\left[\cos(a - b) + \cos(a + b)\right], \qquad \sin a\sin b = \tfrac12\left[\cos(a - b) - \cos(a + b)\right]`]
      ] },
      { t: 'Solving triangles|Résolution des triangles|Resolución de triángulos|三角形の解法|解三角形', fig: 'triangle', items: [
        ['Law of sines|Loi des sinus|Teorema del seno|正弦定理|正弦定理', R`\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R`],
        ['Law of cosines|Loi des cosinus|Teorema del coseno|余弦定理|余弦定理', R`c^2 = a^2 + b^2 - 2ab\cos C`],
        ['Angle from the sides|Angle à partir des côtés|Ángulo a partir de los lados|3辺から角を求める|由三边求角', R`\cos C = \frac{a^2 + b^2 - c^2}{2ab}`],
        ['Area|Aire|Área|面積|面积', R`S = \tfrac12 ab\sin C = \frac{abc}{4R}`],
        ['Ambiguous case (SSA)|Cas ambigu (CCA)|Caso ambiguo (LLA)|2辺と1角（2通りの可能性）|边边角（可能两解）', R`\sin B = \frac{b\sin A}{a}`, R`Can give $0$, $1$ or $2$ triangles: $B$ and $180^\circ - B$.|Peut donner $0$, $1$ ou $2$ triangles : $B$ et $180^\circ - B$.|Puede dar $0$, $1$ o $2$ triángulos: $B$ y $180^\circ - B$.|三角形は $0$、$1$、$2$ 個：$B$ と $180^\circ - B$。|可能有 $0$、$1$ 或 $2$ 个三角形：$B$ 与 $180^\circ - B$。`]
      ] },
      { t: 'Sinusoids|Sinusoïdes|Sinusoides|正弦波|正弦型函数', fig: 'sine', items: [
        ['General sinusoid|Sinusoïde générale|Sinusoide general|一般の正弦波|一般正弦型函数', R`y = A\sin(\omega x + \varphi) + D`, R`Amplitude $\lvert A\rvert$, period $\tfrac{2\pi}{\omega}$, phase shift $-\tfrac{\varphi}{\omega}$, midline $y = D$.|Amplitude $\lvert A\rvert$, période $\tfrac{2\pi}{\omega}$, déphasage $-\tfrac{\varphi}{\omega}$, axe $y = D$.|Amplitud $\lvert A\rvert$, período $\tfrac{2\pi}{\omega}$, desfase $-\tfrac{\varphi}{\omega}$, eje $y = D$.|振幅 $\lvert A\rvert$、周期 $\tfrac{2\pi}{\omega}$、位相のずれ $-\tfrac{\varphi}{\omega}$、中心線 $y = D$。|振幅 $\lvert A\rvert$，周期 $\tfrac{2\pi}{\omega}$，相移 $-\tfrac{\varphi}{\omega}$，中线 $y = D$。`],
        ['Combining sine and cosine|Combiner sinus et cosinus|Combinar seno y coseno|三角関数の合成|辅助角公式', R`a\sin x + b\cos x = R\sin(x + \varphi), \qquad R = \sqrt{a^2 + b^2}`, R`$\cos\varphi = \tfrac aR$, $\sin\varphi = \tfrac bR$. Maximum $R$, minimum $-R$.|$\cos\varphi = \tfrac aR$, $\sin\varphi = \tfrac bR$. Maximum $R$, minimum $-R$.|$\cos\varphi = \tfrac aR$, $\sin\varphi = \tfrac bR$. Máximo $R$, mínimo $-R$.|$\cos\varphi = \tfrac aR$、$\sin\varphi = \tfrac bR$。最大値 $R$、最小値 $-R$。|$\cos\varphi = \tfrac aR$，$\sin\varphi = \tfrac bR$。最大值 $R$，最小值 $-R$。`]
      ] },
      { t: 'Equations and inverse functions|Équations et fonctions réciproques|Ecuaciones y funciones inversas|方程式と逆三角関数|三角方程与反三角函数', items: [
        ['sin x = a|sin x = a|sen x = a|sin x = a|sin x = a', R`x = \arcsin a + 2k\pi, \qquad x = \pi - \arcsin a + 2k\pi`],
        ['cos x = a|cos x = a|cos x = a|cos x = a|cos x = a', R`x = \pm\arccos a + 2k\pi`],
        ['tan x = a|tan x = a|tan x = a|tan x = a|tan x = a', R`x = \arctan a + k\pi`],
        ['Ranges|Images|Recorridos|値域|值域', R`\arcsin \in \left[-\tfrac\pi2, \tfrac\pi2\right], \qquad \arccos \in [0, \pi], \qquad \arctan \in \left(-\tfrac\pi2, \tfrac\pi2\right)`],
        ['Useful identity|Identité utile|Identidad útil|便利な公式|常用恒等式', R`\arcsin x + \arccos x = \frac\pi2`]
      ] }
    ]
  });
})();
