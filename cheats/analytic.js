/* cheat sheet · analytic geometry and conics — text is 'en|fr|es|ja|zh' */
(function () {
  const R = String.raw;
  Cheats.topic({
    id: 'analytic', icon: '⌖', color: '#1f7a6a', bg: '#dff2ee', cat: 'geometry',
    name: 'Analytic geometry|Géométrie analytique|Geometría analítica|解析幾何|解析几何',
    blurb: 'Points, lines, circles and the conic sections in coordinates.|Points, droites, cercles et coniques en coordonnées.|Puntos, rectas, circunferencias y cónicas en coordenadas.|座標で表す点・直線・円・2次曲線。|用坐标研究点、直线、圆与圆锥曲线。',
    sections: [
      { t: 'Points|Points|Puntos|点|点', fig: 'points', items: [
        ['Distance|Distance|Distancia|2点間の距離|两点间距离', R`d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}`],
        ['Midpoint|Milieu|Punto medio|中点|中点', R`M = \left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)`],
        ['Dividing in a ratio m : n|Partage dans le rapport m : n|División en razón m : n|m : n に内分する点|按 m : n 分点', R`P = \left(\frac{n x_1 + m x_2}{m + n}, \frac{n y_1 + m y_2}{m + n}\right)`],
        ['Centroid of a triangle|Centre de gravité|Baricentro|三角形の重心|三角形重心', R`G = \left(\frac{x_1 + x_2 + x_3}{3}, \frac{y_1 + y_2 + y_3}{3}\right)`],
        ['Triangle area|Aire d’un triangle|Área de un triángulo|三角形の面積|三角形面积', R`S = \tfrac12\left|x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)\right|`],
        ['Distance in space|Distance dans l’espace|Distancia en el espacio|空間の距離|空间两点距离', R`d = \sqrt{\Delta x^2 + \Delta y^2 + \Delta z^2}`]
      ] },
      { t: 'Lines|Droites|Rectas|直線|直线', items: [
        ['Slope|Pente|Pendiente|傾き|斜率', R`m = \frac{y_2 - y_1}{x_2 - x_1} = \tan\alpha`],
        ['Forms of a line|Formes d’une droite|Formas de la recta|直線の方程式|直线方程的形式', R`y = mx + b, \qquad y - y_1 = m(x - x_1), \qquad Ax + By + C = 0`],
        ['Intercept form|Forme segmentaire|Forma segmentaria|切片形|截距式', R`\frac xa + \frac yb = 1`],
        ['Parallel and perpendicular|Parallèles et perpendiculaires|Paralelas y perpendiculares|平行と垂直|平行与垂直', R`m_1 = m_2, \qquad m_1 m_2 = -1`],
        ['Angle between two lines|Angle entre deux droites|Ángulo entre dos rectas|2直線のなす角|两直线夹角', R`\tan\theta = \left|\frac{m_2 - m_1}{1 + m_1 m_2}\right|`],
        ['Point to line|Point–droite|Punto–recta|点と直線の距離|点到直线距离', R`d = \frac{|Ax_0 + By_0 + C|}{\sqrt{A^2 + B^2}}`],
        ['Parallel lines|Droites parallèles|Rectas paralelas|平行な2直線の距離|平行线间距离', R`d = \frac{|C_1 - C_2|}{\sqrt{A^2 + B^2}}`]
      ] },
      { t: 'Circles|Cercles|Circunferencias|円|圆', items: [
        ['Centre and radius|Centre et rayon|Centro y radio|中心と半径|标准方程', R`(x - a)^2 + (y - b)^2 = r^2`],
        ['General form|Forme générale|Forma general|一般形|一般方程', R`x^2 + y^2 + Dx + Ey + F = 0`, R`Centre $\left(-\tfrac D2, -\tfrac E2\right)$, $r^2 = \tfrac{D^2 + E^2}{4} - F$.|Centre $\left(-\tfrac D2, -\tfrac E2\right)$, $r^2 = \tfrac{D^2 + E^2}{4} - F$.|Centro $\left(-\tfrac D2, -\tfrac E2\right)$, $r^2 = \tfrac{D^2 + E^2}{4} - F$.|中心 $\left(-\tfrac D2, -\tfrac E2\right)$、$r^2 = \tfrac{D^2 + E^2}{4} - F$。|圆心 $\left(-\tfrac D2, -\tfrac E2\right)$，$r^2 = \tfrac{D^2 + E^2}{4} - F$。`],
        ['Tangent at a point|Tangente en un point|Tangente en un punto|接線の方程式|切线方程', R`(x_0 - a)(x - a) + (y_0 - b)(y - b) = r^2`],
        ['Line and circle|Droite et cercle|Recta y circunferencia|円と直線の位置関係|直线与圆的位置关系', R`d < r:\ 2, \qquad d = r:\ 1, \qquad d > r:\ 0`, R`$d$ = distance from the centre to the line; the number of common points.|$d$ = distance du centre à la droite ; nombre de points communs.|$d$ = distancia del centro a la recta; número de puntos comunes.|$d$ は中心と直線の距離。共有点の個数。|$d$ 为圆心到直线的距离；公共点的个数。`]
      ] },
      { t: 'Ellipse|Ellipse|Elipse|楕円|椭圆', fig: 'ellipse', items: [
        ['Equation|Équation|Ecuación|方程式|标准方程', R`\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1 \qquad (a > b > 0)`],
        ['Foci|Foyers|Focos|焦点|焦点', R`F_{1,2} = (\pm c, 0), \qquad c^2 = a^2 - b^2`],
        ['Definition|Définition|Definición|定義|定义', R`PF_1 + PF_2 = 2a`],
        ['Eccentricity|Excentricité|Excentricidad|離心率|离心率', R`e = \frac ca < 1`],
        ['Area and parametrisation|Aire et paramétrage|Área y parametrización|面積と媒介変数表示|面积与参数方程', R`S = \pi ab, \qquad (a\cos t,\ b\sin t)`]
      ] },
      { t: 'Parabola|Parabole|Parábola|放物線|抛物线', fig: 'parabola', items: [
        ['Equations|Équations|Ecuaciones|方程式|标准方程', R`x^2 = 4py, \qquad y^2 = 4px`, R`Focus $(0, p)$, directrix $y = -p$ (first form).|Foyer $(0, p)$, directrice $y = -p$ (première forme).|Foco $(0, p)$, directriz $y = -p$ (primera forma).|1つ目の形：焦点 $(0, p)$、準線 $y = -p$。|第一种：焦点 $(0, p)$，准线 $y = -p$。`],
        ['Definition|Définition|Definición|定義|定义', R`PF = d(P, \ell)`, R`Every point is as far from the focus as from the directrix $\ell$.|Chaque point est aussi loin du foyer que de la directrice $\ell$.|Cada punto dista lo mismo del foco que de la directriz $\ell$.|各点は焦点と準線 $\ell$ から等距離。|每一点到焦点与到准线 $\ell$ 的距离相等。`],
        ['Vertex form|Forme canonique|Forma canónica|頂点形|顶点式', R`y = a(x - h)^2 + k`, R`Vertex $(h, k)$, focus $\left(h, k + \tfrac{1}{4a}\right)$.|Sommet $(h, k)$, foyer $\left(h, k + \tfrac{1}{4a}\right)$.|Vértice $(h, k)$, foco $\left(h, k + \tfrac{1}{4a}\right)$.|頂点 $(h, k)$、焦点 $\left(h, k + \tfrac{1}{4a}\right)$。|顶点 $(h, k)$，焦点 $\left(h, k + \tfrac{1}{4a}\right)$。`],
        ['Eccentricity|Excentricité|Excentricidad|離心率|离心率', R`e = 1`]
      ] },
      { t: 'Hyperbola|Hyperbole|Hipérbola|双曲線|双曲线', fig: 'hyperbola', items: [
        ['Equation|Équation|Ecuación|方程式|标准方程', R`\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1`],
        ['Foci|Foyers|Focos|焦点|焦点', R`F_{1,2} = (\pm c, 0), \qquad c^2 = a^2 + b^2`],
        ['Definition|Définition|Definición|定義|定义', R`|PF_1 - PF_2| = 2a`],
        ['Asymptotes|Asymptotes|Asíntotas|漸近線|渐近线', R`y = \pm\frac ba\,x`],
        ['Eccentricity|Excentricité|Excentricidad|離心率|离心率', R`e = \frac ca > 1`],
        ['Rectangular hyperbola|Hyperbole équilatère|Hipérbola equilátera|直角双曲線|等轴双曲线', R`xy = k`]
      ] },
      { t: 'Tangents and chords of conics|Tangentes et cordes des coniques|Tangentes y cuerdas de las cónicas|2次曲線の接線と弦|圆锥曲线的切线与弦', items: [
        ['Ellipse tangent at (x₀, y₀)|Tangente à l’ellipse en (x₀, y₀)|Tangente a la elipse en (x₀, y₀)|楕円上の点 (x₀, y₀) での接線|椭圆在 (x₀, y₀) 处的切线', R`\frac{x x_0}{a^2} + \frac{y y_0}{b^2} = 1`],
        ['Hyperbola tangent at (x₀, y₀)|Tangente à l’hyperbole en (x₀, y₀)|Tangente a la hipérbola en (x₀, y₀)|双曲線上の点 (x₀, y₀) での接線|双曲线在 (x₀, y₀) 处的切线', R`\frac{x x_0}{a^2} - \frac{y y_0}{b^2} = 1`],
        ['Parabola tangent at (x₀, y₀)|Tangente à la parabole en (x₀, y₀)|Tangente a la parábola en (x₀, y₀)|放物線上の点 (x₀, y₀) での接線|抛物线在 (x₀, y₀) 处的切线', R`y^2 = 4px:\ \ y y_0 = 2p(x + x_0), \qquad x^2 = 4py:\ \ x x_0 = 2p(y + y_0)`],
        ['Tangency condition|Condition de tangence|Condición de tangencia|接する条件|相切条件', R`y = mx + c:\quad c^2 = a^2m^2 + b^2`, R`For the ellipse; hyperbola: $c^2 = a^2m^2 - b^2$; parabola $y^2 = 4px$: $c = \tfrac pm$. In general substitute and set $\Delta = 0$.|Pour l’ellipse ; hyperbole : $c^2 = a^2m^2 - b^2$ ; parabole $y^2 = 4px$ : $c = \tfrac pm$. En général, substituer et poser $\Delta = 0$.|Para la elipse; hipérbola: $c^2 = a^2m^2 - b^2$; parábola $y^2 = 4px$: $c = \tfrac pm$. En general sustituir e imponer $\Delta = 0$.|楕円の場合。双曲線：$c^2 = a^2m^2 - b^2$、放物線 $y^2 = 4px$：$c = \tfrac pm$。一般には代入して $\Delta = 0$。|椭圆情形；双曲线：$c^2 = a^2m^2 - b^2$；抛物线 $y^2 = 4px$：$c = \tfrac pm$。一般代入后令 $\Delta = 0$。`],
        ['Latus rectum|Paramètre (corde focale)|Lado recto|通径|通径', R`\frac{2b^2}{a}\ \ (E, H), \qquad 4p \ \ (y^2 = 4px)`, 'Chord through a focus, perpendicular to the main axis. E: ellipse, H: hyperbola.|Corde passant par un foyer, perpendiculaire à l’axe principal. E : ellipse, H : hyperbole.|Cuerda por un foco, perpendicular al eje principal. E: elipse, H: hipérbola.|焦点を通り主軸に垂直な弦。E：楕円、H：双曲線。|过焦点且垂直于主轴的弦。E：椭圆，H：双曲线。'],
        ['Focal chord of a parabola|Corde focale d’une parabole|Cuerda focal de una parábola|放物線の焦点弦|抛物线的焦点弦', R`y^2 = 4px:\ \ |AB| = x_1 + x_2 + 2p, \qquad PF = x_0 + p`],
        ['Focal distances of an ellipse|Rayons focaux de l’ellipse|Radios focales de la elipse|楕円の焦半径|椭圆的焦半径', R`PF_1 = a + e\,x_0, \qquad PF_2 = a - e\,x_0`],
        ['Chord with a given midpoint|Corde de milieu donné|Cuerda de punto medio dado|中点が与えられた弦|中点弦', R`m_{AB} = -\frac{b^2 x_0}{a^2 y_0}`, R`Ellipse chord with midpoint $(x_0, y_0)$ (difference of the two equations).|Corde de l’ellipse de milieu $(x_0, y_0)$ (différence des deux équations).|Cuerda de la elipse con punto medio $(x_0, y_0)$ (restando las dos ecuaciones).|中点 $(x_0, y_0)$ の楕円の弦（2式の差をとる・点差法）。|中点为 $(x_0, y_0)$ 的椭圆弦（点差法）。`]
      ] },
      { t: 'Conics in general|Coniques en général|Cónicas en general|2次曲線の分類|圆锥曲线的判别', items: [
        ['Classification|Classification|Clasificación|分類|分类', R`Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0`, R`$B^2 - 4AC < 0$ ellipse, $= 0$ parabola, $> 0$ hyperbola.|$B^2 - 4AC < 0$ ellipse, $= 0$ parabole, $> 0$ hyperbole.|$B^2 - 4AC < 0$ elipse, $= 0$ parábola, $> 0$ hipérbola.|$B^2 - 4AC < 0$ 楕円、$= 0$ 放物線、$> 0$ 双曲線。|$B^2 - 4AC < 0$ 椭圆，$= 0$ 抛物线，$> 0$ 双曲线。`],
        ['Focus–directrix|Foyer–directrice|Foco–directriz|焦点と準線|焦点–准线', R`\frac{PF}{d(P, \ell)} = e`, R`$e < 1$ ellipse, $e = 1$ parabola, $e > 1$ hyperbola.|$e < 1$ ellipse, $e = 1$ parabole, $e > 1$ hyperbole.|$e < 1$ elipse, $e = 1$ parábola, $e > 1$ hipérbola.|$e < 1$ 楕円、$e = 1$ 放物線、$e > 1$ 双曲線。|$e < 1$ 椭圆，$e = 1$ 抛物线，$e > 1$ 双曲线。`],
        ['Polar form|Forme polaire|Forma polar|極方程式|极坐标方程', R`r = \frac{e\,p}{1 + e\cos\theta}`]
      ] }
    ]
  });
})();
