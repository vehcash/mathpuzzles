/* cheat sheet · geometry — text is 'en|fr|es|ja|zh' */
(function () {
  const R = String.raw;
  Cheats.topic({
    id: 'geometry', icon: '△', color: '#2f6f8f', bg: '#e3eff5', cat: 'geometry',
    name: 'Geometry|Géométrie|Geometría|幾何|几何',
    blurb: 'Triangles, circles, polygons and solids: lengths, angles, areas and volumes.|Triangles, cercles, polygones et solides : longueurs, angles, aires et volumes.|Triángulos, circunferencias, polígonos y sólidos: longitudes, ángulos, áreas y volúmenes.|三角形・円・多角形・立体の長さ、角、面積、体積。|三角形、圆、多边形与立体：长度、角、面积与体积。',
    sections: [
      { t: 'Triangles|Triangles|Triángulos|三角形|三角形', fig: 'triangle', items: [
        ['Angle sum|Somme des angles|Suma de ángulos|内角の和|内角和', R`A + B + C = 180^\circ`],
        ['Area|Aire|Área|面積|面积', R`S = \tfrac12\,c\,h = \tfrac12\,ab\sin C`],
        ['Heron’s formula|Formule de Héron|Fórmula de Herón|ヘロンの公式|海伦公式', R`S = \sqrt{s(s - a)(s - b)(s - c)}, \quad s = \frac{a + b + c}{2}`, R`$s$ is the semi-perimeter: half of the perimeter $a + b + c$. Area from the three sides alone, no height or angle needed.|$s$ est le demi-périmètre : la moitié du périmètre $a + b + c$. L’aire à partir des trois côtés seulement, sans hauteur ni angle.|$s$ es el semiperímetro: la mitad del perímetro $a + b + c$. El área solo con los tres lados, sin altura ni ángulo.|$s$ は半周長（周の長さ $a + b + c$ の半分）。高さも角もいらず、3 辺だけで面積が求まる。|$s$ 是半周长：周长 $a + b + c$ 的一半。只用三边求面积，不需要高或角。`, { fig: 'heron', ex: R`Sides $5, 6, 7$: $s = 9$, $S = \sqrt{9\cdot 4\cdot 3\cdot 2} = \sqrt{216} = 6\sqrt6$.|Côtés $5, 6, 7$ : $s = 9$, $S = \sqrt{9\cdot 4\cdot 3\cdot 2} = \sqrt{216} = 6\sqrt6$.|Lados $5, 6, 7$: $s = 9$, $S = \sqrt{9\cdot 4\cdot 3\cdot 2} = \sqrt{216} = 6\sqrt6$.|3 辺 $5, 6, 7$：$s = 9$、$S = \sqrt{9\cdot 4\cdot 3\cdot 2} = \sqrt{216} = 6\sqrt6$。|三边 $5, 6, 7$：$s = 9$，$S = \sqrt{9\cdot 4\cdot 3\cdot 2} = \sqrt{216} = 6\sqrt6$。` }],
        ['Triangle inequality|Inégalité triangulaire|Desigualdad triangular|三角不等式|三角形不等式', R`|a - b| < c < a + b`],
        ['Exterior angle|Angle extérieur|Ángulo exterior|外角|外角', R`180^\circ - C = A + B`],
        ['Largest side|Plus grand côté|Lado mayor|最大の辺|最大边', R`a > b \iff A > B`, 'The largest side faces the largest angle.|Le plus grand côté est opposé au plus grand angle.|El lado mayor está frente al ángulo mayor.|大きい辺の向かいに大きい角があります。|大边对大角。']
      ] },
      { t: 'Right triangles|Triangles rectangles|Triángulos rectángulos|直角三角形|直角三角形', fig: 'right', items: [
        ['Pythagoras|Pythagore|Pitágoras|三平方の定理|勾股定理', R`a^2 + b^2 = c^2`],
        ['Altitude to the hypotenuse|Hauteur sur l’hypoténuse|Altura sobre la hipotenusa|斜辺への高さ|斜边上的高', R`h = \frac{ab}{c}, \qquad h^2 = p\,q`, R`$p, q$: the pieces of the hypotenuse.|$p, q$ : les morceaux de l’hypoténuse.|$p, q$: los trozos de la hipotenusa.|$p, q$：斜辺の2つの部分。|$p, q$：斜边被分成的两段。`],
        ['Legs and projections|Côtés et projections|Catetos y proyecciones|射影定理|射影定理', R`a^2 = c\,p, \qquad b^2 = c\,q`],
        ['Median to the hypotenuse|Médiane sur l’hypoténuse|Mediana sobre la hipotenusa|斜辺への中線|斜边上的中线', R`m_c = \frac c2`, 'The hypotenuse is a diameter of the circumcircle.|L’hypoténuse est un diamètre du cercle circonscrit.|La hipotenusa es un diámetro de la circunferencia circunscrita.|斜辺は外接円の直径です。|斜边是外接圆的直径。'],
        ['Special triangles|Triangles remarquables|Triángulos notables|特別な直角三角形|特殊直角三角形', R`30^\circ\!-\!60^\circ\!-\!90^\circ:\ 1 : \sqrt3 : 2, \qquad 45^\circ\!-\!45^\circ\!-\!90^\circ:\ 1 : 1 : \sqrt2`],
        ['Pythagorean triples|Triplets pythagoriciens|Ternas pitagóricas|ピタゴラス数|勾股数', R`(3, 4, 5),\ (5, 12, 13),\ (8, 15, 17),\ (7, 24, 25)`]
      ] },
      { t: 'Centres and special lines|Centres et droites remarquables|Centros y rectas notables|三角形の五心|三角形的心与特殊线', items: [
        ['Circumradius|Rayon du cercle circonscrit|Radio circunscrito|外接円の半径|外接圆半径', R`R = \frac{abc}{4S} = \frac{a}{2\sin A}`],
        ['Inradius|Rayon du cercle inscrit|Radio inscrito|内接円の半径|内切圆半径', R`r = \frac{S}{s}`, R`$s$ is the semiperimeter.|$s$ est le demi-périmètre.|$s$ es el semiperímetro.|$s$ は周の長さの半分。|$s$ 为半周长。`],
        ['Median length|Longueur d’une médiane|Longitud de la mediana|中線の長さ|中线长', R`m_a = \tfrac12\sqrt{2b^2 + 2c^2 - a^2}`],
        ['Centroid|Centre de gravité|Baricentro|重心|重心', R`AG : GM = 2 : 1`],
        ['Angle bisector theorem|Théorème de la bissectrice|Teorema de la bisectriz|角の二等分線の定理|角平分线定理', R`\frac{BD}{DC} = \frac{AB}{AC}`],
        ['Similar triangles|Triangles semblables|Triángulos semejantes|相似な三角形|相似三角形', R`L' = kL, \quad S' = k^2 S, \quad V' = k^3 V`, 'Lengths scale by k, areas by k², volumes by k³.|Les longueurs sont multipliées par k, les aires par k², les volumes par k³.|Las longitudes se multiplican por k, las áreas por k², los volúmenes por k³.|長さは k 倍、面積は k² 倍、体積は k³ 倍。|长度变为 k 倍，面积 k² 倍，体积 k³ 倍。']
      ] },
      { t: 'Circles|Cercles|Circunferencias|円|圆', fig: 'sector', items: [
        ['Circumference and area|Périmètre et aire|Longitud y área|円周と面積|周长与面积', R`C = 2\pi r, \qquad S = \pi r^2`],
        ['Arc length|Longueur d’un arc|Longitud de arco|弧の長さ|弧长', R`s = r\theta`, R`$\theta$ in radians.|$\theta$ en radians.|$\theta$ en radianes.|$\theta$ は弧度法。|$\theta$ 用弧度。`],
        ['Sector area|Aire d’un secteur|Área del sector|扇形の面積|扇形面积', R`S = \tfrac12 r^2\theta = \tfrac12 r s`],
        ['Degrees and radians|Degrés et radians|Grados y radianes|度と弧度|角度与弧度', R`180^\circ = \pi \text{ rad}, \qquad \theta = \frac{\pi\,\alpha^\circ}{180}`],
        ['Chord|Corde|Cuerda|弦|弦长', R`AB = 2r\sin\frac\theta2`],
        ['Segment area|Aire d’un segment circulaire|Área del segmento circular|弓形の面積|弓形面积', R`S = \tfrac12 r^2(\theta - \sin\theta)`]
      ] },
      { t: 'Circle theorems|Théorèmes du cercle|Teoremas de la circunferencia|円の定理|圆的定理', fig: 'inscribed', items: [
        ['Inscribed angle|Angle inscrit|Ángulo inscrito|円周角|圆周角', R`\angle APB = \tfrac12\,\angle AOB`],
        ['Angle in a semicircle|Angle dans un demi-cercle|Ángulo en una semicircunferencia|半円の円周角|半圆上的圆周角', R`AB = 2r \ \Rightarrow\ \angle APB = 90^\circ`],
        ['Cyclic quadrilateral|Quadrilatère inscrit|Cuadrilátero inscrito|円に内接する四角形|圆内接四边形', R`A + C = B + D = 180^\circ`],
        ['Tangent and radius|Tangente et rayon|Tangente y radio|接線と半径|切线与半径', R`OT \perp t`, 'The tangent is perpendicular to the radius at the point of contact.|La tangente est perpendiculaire au rayon au point de contact.|La tangente es perpendicular al radio en el punto de tangencia.|接線は接点で半径に垂直です。|切线垂直于过切点的半径。'],
        ['Equal tangents|Tangentes égales|Tangentes iguales|接線の長さ|切线长定理', R`PT_1 = PT_2`, 'Two tangents from an outside point have equal length.|Deux tangentes issues d’un même point ont la même longueur.|Dos tangentes desde un punto exterior miden lo mismo.|外部の点から引いた2本の接線の長さは等しい。|从圆外一点引的两条切线长相等。'],
        ['Power of a point|Puissance d’un point|Potencia de un punto|方べきの定理|圆幂定理', R`PA\cdot PB = PC\cdot PD = PT^2`]
      ] },
      { t: 'Polygons and quadrilaterals|Polygones et quadrilatères|Polígonos y cuadriláteros|多角形と四角形|多边形与四边形', items: [
        ['Interior angle sum|Somme des angles intérieurs|Suma de ángulos interiores|内角の和|内角和', R`(n - 2)\cdot180^\circ`],
        ['Regular polygon angle|Angle d’un polygone régulier|Ángulo del polígono regular|正多角形の内角|正多边形的内角', R`\frac{(n - 2)\cdot180^\circ}{n}`, 'The exterior angles always add up to 360°.|Les angles extérieurs ont toujours pour somme 360°.|Los ángulos exteriores siempre suman 360°.|外角の和は常に 360°。|外角和恒为 360°。'],
        ['Diagonals|Diagonales|Diagonales|対角線の本数|对角线条数', R`\frac{n(n - 3)}{2}`],
        ['Regular polygon area|Aire d’un polygone régulier|Área del polígono regular|正多角形の面積|正多边形面积', R`S = \tfrac12\,P\,a = \tfrac12\,n R^2\sin\frac{2\pi}{n}`, R`$P$ perimeter, $a$ apothem, $R$ circumradius.|$P$ périmètre, $a$ apothème, $R$ rayon circonscrit.|$P$ perímetro, $a$ apotema, $R$ radio circunscrito.|$P$ 周、$a$ 辺心距離、$R$ 外接円の半径。|$P$ 周长，$a$ 边心距，$R$ 外接圆半径。`],
        ['Parallelogram, rhombus, trapezoid|Parallélogramme, losange, trapèze|Paralelogramo, rombo, trapecio|平行四辺形・ひし形・台形|平行四边形、菱形、梯形', R`S = b\,h, \qquad S = \frac{d_1 d_2}{2}, \qquad S = \frac{(a + b)\,h}{2}`],
        ['Shoelace formula|Formule du lacet|Fórmula del lazo|座標による面積公式|鞋带公式', R`S = \tfrac12\left|\sum_{i} (x_i y_{i+1} - x_{i+1} y_i)\right|`]
      ] },
      { t: 'Solids|Solides|Sólidos|立体|立体', fig: 'solids', items: [
        ['Cube and box|Cube et pavé|Cubo y ortoedro|立方体と直方体|正方体与长方体', R`V = a^3, \quad d = a\sqrt3; \qquad V = abc, \quad d = \sqrt{a^2 + b^2 + c^2}`],
        ['Prism and cylinder|Prisme et cylindre|Prisma y cilindro|角柱と円柱|棱柱与圆柱', R`V = B\,h, \qquad V = \pi r^2 h, \quad A = 2\pi r(r + h)`],
        ['Pyramid and cone|Pyramide et cône|Pirámide y cono|角錐と円錐|棱锥与圆锥', R`V = \tfrac13 B\,h, \qquad V = \tfrac13\pi r^2 h, \quad A_{\text{lat}} = \pi r l`, R`Slant height $l = \sqrt{r^2 + h^2}$.|Génératrice $l = \sqrt{r^2 + h^2}$.|Generatriz $l = \sqrt{r^2 + h^2}$.|母線 $l = \sqrt{r^2 + h^2}$。|母线 $l = \sqrt{r^2 + h^2}$。`],
        ['Sphere|Sphère|Esfera|球|球', R`V = \tfrac43\pi r^3, \qquad A = 4\pi r^2`],
        ['Euler’s formula|Formule d’Euler|Fórmula de Euler|オイラーの多面体定理|欧拉公式', R`V - E + F = 2`, 'Vertices, edges and faces of a convex polyhedron.|Sommets, arêtes et faces d’un polyèdre convexe.|Vértices, aristas y caras de un poliedro convexo.|凸多面体の頂点・辺・面の数。|凸多面体的顶点、棱、面数。']
      ] }
    ]
  });
})();
