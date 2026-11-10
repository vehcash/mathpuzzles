/* cheat sheet · geometry in space (lines, planes, spheres) — text is 'en|fr|es|ja|zh' */
(function () {
  const R = String.raw;
  Cheats.topic({
    id: 'space', icon: '⬡', color: '#4b6b2f', bg: '#e7f0dc', cat: 'matrix',
    name: '3D geometry|Géométrie dans l’espace|Geometría del espacio|空間図形|空间解析几何',
    blurb: 'Lines, planes and spheres in space: equations, angles, distances, intersections and relative positions.|Droites, plans et sphères de l’espace : équations, angles, distances, intersections et positions relatives.|Rectas, planos y esferas en el espacio: ecuaciones, ángulos, distancias, intersecciones y posiciones relativas.|空間の直線・平面・球：方程式、角、距離、交わり、位置関係。|空间中的直线、平面与球：方程、夹角、距离、交点与位置关系。',
    sections: [
      { t: 'Lines in space|Droites de l’espace|Rectas en el espacio|空間の直線|空间直线', fig: 'line3d', items: [
        ['Vector equation|Équation vectorielle|Ecuación vectorial|ベクトル方程式|向量方程', R`\mathbf r = \mathbf r_0 + t\,\mathbf d, \qquad t \in \mathbb R`, R`$\mathbf r_0 = (x_0, y_0, z_0)$ a point, $\mathbf d = (a, b, c)$ a direction vector.|$\mathbf r_0 = (x_0, y_0, z_0)$ un point, $\mathbf d = (a, b, c)$ un vecteur directeur.|$\mathbf r_0 = (x_0, y_0, z_0)$ un punto, $\mathbf d = (a, b, c)$ un vector director.|$\mathbf r_0 = (x_0, y_0, z_0)$ は通る点、$\mathbf d = (a, b, c)$ は方向ベクトル。|$\mathbf r_0 = (x_0, y_0, z_0)$ 为一点，$\mathbf d = (a, b, c)$ 为方向向量。`],
        ['Parametric equations|Équations paramétriques|Ecuaciones paramétricas|媒介変数表示|参数方程', R`x = x_0 + at, \quad y = y_0 + bt, \quad z = z_0 + ct`],
        ['Symmetric (continuous) form|Forme symétrique|Forma continua|対称形|对称式（点向式）', R`\frac{x - x_0}{a} = \frac{y - y_0}{b} = \frac{z - z_0}{c}`],
        ['Through two points|Par deux points|Por dos puntos|2点を通る直線|过两点的直线', R`\mathbf d = P_2 - P_1, \qquad \mathbf r = P_1 + t\,(P_2 - P_1)`],
        ['As two planes|Intersection de deux plans|Como dos planos|2平面の交線として|两平面的交线', R`\begin{cases} A_1x + B_1y + C_1z = D_1\\ A_2x + B_2y + C_2z = D_2\end{cases}, \qquad \mathbf d = \mathbf n_1 \times \mathbf n_2`]
      ] },
      { t: 'Planes|Plans|Planos|平面|平面', fig: 'plane3d', items: [
        ['Normal form|Forme normale|Forma normal|法線ベクトルによる方程式|点法式', R`\mathbf n\cdot(\mathbf r - \mathbf r_0) = 0, \qquad A(x - x_0) + B(y - y_0) + C(z - z_0) = 0`],
        ['General equation|Équation cartésienne|Ecuación general|一般形|一般式', R`Ax + By + Cz + D = 0, \qquad \mathbf n = (A, B, C)`],
        ['Parametric form|Forme paramétrique|Forma paramétrica|媒介変数表示|参数方程', R`\mathbf r = \mathbf r_0 + s\,\mathbf u + t\,\mathbf v, \qquad \mathbf n = \mathbf u \times \mathbf v`],
        ['Through three points|Par trois points|Por tres puntos|3点を通る平面|过三点的平面', R`\mathbf n = (P_2 - P_1)\times(P_3 - P_1), \qquad \begin{vmatrix} x - x_1 & y - y_1 & z - z_1\\ x_2 - x_1 & y_2 - y_1 & z_2 - z_1\\ x_3 - x_1 & y_3 - y_1 & z_3 - z_1\end{vmatrix} = 0`],
        ['Intercept form|Forme segmentaire|Forma segmentaria|切片形|截距式', R`\frac xa + \frac yb + \frac zc = 1`, R`Cuts the axes at $(a, 0, 0)$, $(0, b, 0)$, $(0, 0, c)$.|Coupe les axes en $(a, 0, 0)$, $(0, b, 0)$, $(0, 0, c)$.|Corta los ejes en $(a, 0, 0)$, $(0, b, 0)$, $(0, 0, c)$.|軸と $(a, 0, 0)$、$(0, b, 0)$、$(0, 0, c)$ で交わる。|与坐标轴交于 $(a, 0, 0)$、$(0, b, 0)$、$(0, 0, c)$。`],
        ['Coordinate planes|Plans de coordonnées|Planos coordenados|座標平面|坐标平面', R`xy:\ z = 0, \qquad yz:\ x = 0, \qquad xz:\ y = 0`]
      ] },
      { t: 'Angles|Angles|Ángulos|なす角|夹角', items: [
        ['Two lines|Deux droites|Dos rectas|2直線|两直线', R`\cos\theta = \frac{|\mathbf d_1\cdot\mathbf d_2|}{|\mathbf d_1|\,|\mathbf d_2|}`],
        ['Two planes|Deux plans|Dos planos|2平面|两平面', R`\cos\theta = \frac{|\mathbf n_1\cdot\mathbf n_2|}{|\mathbf n_1|\,|\mathbf n_2|}`],
        ['Line and plane|Droite et plan|Recta y plano|直線と平面|直线与平面', R`\sin\theta = \frac{|\mathbf d\cdot\mathbf n|}{|\mathbf d|\,|\mathbf n|}`, R`Sine, not cosine: the angle with the normal is $90^\circ - \theta$.|Sinus et non cosinus : l’angle avec la normale vaut $90^\circ - \theta$.|Seno, no coseno: el ángulo con la normal es $90^\circ - \theta$.|cos ではなく sin：法線とのなす角が $90^\circ - \theta$。|用正弦而非余弦：与法向量的夹角是 $90^\circ - \theta$。`]
      ] },
      { t: 'Distances|Distances|Distancias|距離|距离', items: [
        ['Point to plane|Point–plan|Punto–plano|点と平面|点到平面', R`d = \frac{|Ax_0 + By_0 + Cz_0 + D|}{\sqrt{A^2 + B^2 + C^2}}`],
        ['Point to line|Point–droite|Punto–recta|点と直線|点到直线', R`d = \frac{\left|\overrightarrow{P_0Q}\times\mathbf d\right|}{|\mathbf d|}`, R`$P_0$ on the line, $Q$ the point.|$P_0$ sur la droite, $Q$ le point.|$P_0$ en la recta, $Q$ el punto.|$P_0$ は直線上の点、$Q$ は与えられた点。|$P_0$ 在直线上，$Q$ 为该点。`],
        ['Skew lines|Droites non coplanaires|Rectas que se cruzan|ねじれの位置の2直線|异面直线', R`d = \frac{\left|\overrightarrow{P_1P_2}\cdot(\mathbf d_1\times\mathbf d_2)\right|}{|\mathbf d_1\times\mathbf d_2|}`],
        ['Parallel planes|Plans parallèles|Planos paralelos|平行な2平面|平行平面', R`d = \frac{|D_1 - D_2|}{\sqrt{A^2 + B^2 + C^2}}`, R`Same normal $(A, B, C)$ in both equations.|Même normale $(A, B, C)$ dans les deux équations.|Misma normal $(A, B, C)$ en las dos ecuaciones.|2つの式で同じ法線 $(A, B, C)$ を使います。|两方程的法向量 $(A, B, C)$ 相同。`],
        ['Parallel lines|Droites parallèles|Rectas paralelas|平行な2直線|平行直线', R`d = \frac{\left|\overrightarrow{P_1P_2}\times\mathbf d\right|}{|\mathbf d|}`]
      ] },
      { t: 'Intersections|Intersections|Intersecciones|交わり|交点与交线', items: [
        ['Line and plane|Droite et plan|Recta y plano|直線と平面の交点|直线与平面的交点', R`t = -\frac{\mathbf n\cdot\mathbf r_0 + D}{\mathbf n\cdot\mathbf d}, \qquad P = \mathbf r_0 + t\,\mathbf d`, R`Substitute the parametric line into the plane. If $\mathbf n\cdot\mathbf d = 0$ the line is parallel to the plane (or lies in it).|Remplacer la droite paramétrée dans le plan. Si $\mathbf n\cdot\mathbf d = 0$, la droite est parallèle au plan (ou contenue).|Sustituir la recta paramétrica en el plano. Si $\mathbf n\cdot\mathbf d = 0$ la recta es paralela al plano (o está en él).|媒介変数表示を平面の式に代入。$\mathbf n\cdot\mathbf d = 0$ なら平行（または平面上）。|把参数方程代入平面方程。若 $\mathbf n\cdot\mathbf d = 0$，直线与平面平行（或在平面内）。`],
        ['Two planes|Deux plans|Dos planos|2平面の交線|两平面的交线', R`\mathbf d = \mathbf n_1\times\mathbf n_2`, 'Find one common point (e.g. set z = 0 and solve), then use this direction.|Trouver un point commun (par ex. z = 0 et résoudre), puis prendre cette direction.|Hallar un punto común (p. ej. z = 0 y resolver) y usar esta dirección.|共通の点を1つ求め（例：z = 0 として解く）、この方向を使います。|先求一个公共点（如令 z = 0 求解），再用此方向。'],
        ['Three planes|Trois plans|Tres planos|3平面|三个平面', R`\det\begin{pmatrix}A_1 & B_1 & C_1\\ A_2 & B_2 & C_2\\ A_3 & B_3 & C_3\end{pmatrix} \ne 0 \ \Rightarrow\ \exists!\,P`, 'Exactly one common point; solve the system (Cramer). Otherwise they share a line, or nothing.|Un seul point commun ; résoudre le système (Cramer). Sinon ils partagent une droite, ou rien.|Exactamente un punto común; resolver el sistema (Cramer). Si no, comparten una recta o nada.|共有点はちょうど1つ（クラメルで解く）。そうでなければ1直線を共有するか、共有点なし。|恰有一个公共点（用克拉默法则）；否则共有一条直线或无公共点。'],
        ['Two lines|Deux droites|Dos rectas|2直線|两直线', R`\mathbf r_1 + s\,\mathbf d_1 = \mathbf r_2 + t\,\mathbf d_2`, R`Three equations, two unknowns $s, t$: solve two, check the third.|Trois équations, deux inconnues $s, t$ : en résoudre deux, vérifier la troisième.|Tres ecuaciones, dos incógnitas $s, t$: resolver dos y comprobar la tercera.|式は3つ、未知数は $s, t$ の2つ：2式を解いて残りで確認。|三个方程、两个未知数 $s, t$：解两个，验证第三个。`]
      ] },
      { t: 'Relative positions|Positions relatives|Posiciones relativas|位置関係|位置关系', items: [
        ['Two lines|Deux droites|Dos rectas|2直線|两直线', R`\mathbf d_1 \parallel \mathbf d_2:\ \parallel \lor =, \qquad \overrightarrow{P_1P_2}\cdot(\mathbf d_1\times\mathbf d_2) = 0:\ \cap`, 'Parallel directions: parallel or the same line. Otherwise the triple product is 0 if they meet, and non-zero if they are skew.|Directions parallèles : parallèles ou confondues. Sinon le produit mixte est nul si elles se coupent, non nul si elles ne sont pas coplanaires.|Direcciones paralelas: paralelas o coincidentes. Si no, el producto mixto es 0 si se cortan y distinto de 0 si se cruzan.|方向が平行なら平行か一致。そうでなければ三重積が 0 なら交わり、0 でなければねじれの位置。|方向平行：平行或重合；否则混合积为 0 则相交，不为 0 则异面。'],
        ['Line and plane|Droite et plan|Recta y plano|直線と平面|直线与平面', R`\mathbf d\cdot\mathbf n \ne 0:\ \cap, \qquad \mathbf d\cdot\mathbf n = 0:\ \parallel \ \lor\ \subset`],
        ['Two planes|Deux plans|Dos planos|2平面|两平面', R`\mathbf n_1 \parallel \mathbf n_2:\ \parallel \ \lor\ =, \qquad \mathbf n_1 \perp \mathbf n_2:\ \perp`],
        ['Perpendicular line and plane|Droite perpendiculaire au plan|Recta perpendicular al plano|直線と平面が垂直|线面垂直', R`\ell \perp \pi \iff \mathbf d \parallel \mathbf n`]
      ] },
      { t: 'Projections and reflections|Projections et symétries|Proyecciones y simetrías|正射影と対称点|投影与对称', items: [
        ['Foot of the perpendicular on a plane|Projeté orthogonal sur un plan|Proyección ortogonal sobre un plano|平面への垂線の足|点在平面上的投影', R`H = Q - \frac{\mathbf n\cdot Q + D}{|\mathbf n|^2}\,\mathbf n`],
        ['Reflection in a plane|Symétrique par rapport à un plan|Simétrico respecto a un plano|平面に関する対称点|关于平面的对称点', R`Q' = Q - 2\,\frac{\mathbf n\cdot Q + D}{|\mathbf n|^2}\,\mathbf n`],
        ['Foot of the perpendicular on a line|Projeté orthogonal sur une droite|Proyección ortogonal sobre una recta|直線への垂線の足|点在直线上的投影', R`H = P_0 + \frac{\overrightarrow{P_0Q}\cdot\mathbf d}{|\mathbf d|^2}\,\mathbf d`]
      ] },
      { t: 'Spheres|Sphères|Esferas|球面|球面', items: [
        ['Equation|Équation|Ecuación|方程式|方程', R`(x - a)^2 + (y - b)^2 + (z - c)^2 = r^2`],
        ['General form|Forme développée|Forma general|一般形|一般式', R`x^2 + y^2 + z^2 + Dx + Ey + Fz + G = 0`, R`Centre $\left(-\tfrac D2, -\tfrac E2, -\tfrac F2\right)$, $r^2 = \tfrac{D^2 + E^2 + F^2}{4} - G$.|Centre $\left(-\tfrac D2, -\tfrac E2, -\tfrac F2\right)$, $r^2 = \tfrac{D^2 + E^2 + F^2}{4} - G$.|Centro $\left(-\tfrac D2, -\tfrac E2, -\tfrac F2\right)$, $r^2 = \tfrac{D^2 + E^2 + F^2}{4} - G$.|中心 $\left(-\tfrac D2, -\tfrac E2, -\tfrac F2\right)$、$r^2 = \tfrac{D^2 + E^2 + F^2}{4} - G$。|球心 $\left(-\tfrac D2, -\tfrac E2, -\tfrac F2\right)$，$r^2 = \tfrac{D^2 + E^2 + F^2}{4} - G$。`],
        ['Sphere and plane|Sphère et plan|Esfera y plano|球と平面|球与平面', R`d < r:\ \ \rho = \sqrt{r^2 - d^2}`, R`$d$ = distance from the centre to the plane; $d = r$: tangent; $d > r$: no intersection. The cut is a circle of radius $\rho$.|$d$ = distance du centre au plan ; $d = r$ : tangent ; $d > r$ : pas d’intersection. La section est un cercle de rayon $\rho$.|$d$ = distancia del centro al plano; $d = r$: tangente; $d > r$: sin corte. La sección es una circunferencia de radio $\rho$.|$d$ は中心と平面の距離。$d = r$ で接し、$d > r$ で交わらない。切り口は半径 $\rho$ の円。|$d$ 为球心到平面距离；$d = r$ 相切；$d > r$ 不相交。截面是半径为 $\rho$ 的圆。`],
        ['Tangent plane|Plan tangent|Plano tangente|接平面|切平面', R`(x_0 - a)(x - a) + (y_0 - b)(y - b) + (z_0 - c)(z - c) = r^2`, R`At the point $(x_0, y_0, z_0)$ of the sphere; its normal is the radius.|Au point $(x_0, y_0, z_0)$ de la sphère ; sa normale est le rayon.|En el punto $(x_0, y_0, z_0)$ de la esfera; su normal es el radio.|球面上の点 $(x_0, y_0, z_0)$ での接平面。法線は半径方向。|在球面上点 $(x_0, y_0, z_0)$ 处；法向量为半径方向。`]
      ] }
    ]
  });
})();
