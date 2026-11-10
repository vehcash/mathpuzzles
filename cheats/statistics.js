/* cheat sheet · statistics — text is 'en|fr|es|ja|zh' */
(function () {
  const R = String.raw;
  Cheats.topic({
    id: 'statistics', icon: '▥', color: '#8a4f9e', bg: '#f1e6f5', cat: 'probability',
    name: 'Statistics|Statistiques|Estadística|統計|统计',
    blurb: 'Centre and spread, quartiles, grouped data, correlation and the regression line.|Position et dispersion, quartiles, données groupées, corrélation et droite de régression.|Centralización y dispersión, cuartiles, datos agrupados, correlación y recta de regresión.|代表値と散らばり、四分位数、度数分布、相関と回帰直線。|集中趋势与离散程度、四分位数、分组数据、相关与回归直线。',
    sections: [
      { t: 'Measures of centre|Paramètres de position|Medidas de centralización|代表値|集中趋势', items: [
        ['Mean|Moyenne|Media|平均値|平均数', R`\bar x = \frac{1}{n}\sum_{i=1}^n x_i, \qquad \bar x = \frac{\sum f_i x_i}{\sum f_i}`, R`The second form uses frequencies $f_i$ (or class midpoints for grouped data).|La seconde utilise les effectifs $f_i$ (ou les centres de classes pour des données groupées).|La segunda usa las frecuencias $f_i$ (o las marcas de clase en datos agrupados).|2つ目は度数 $f_i$ を使う形（階級値を使えば度数分布表にも）。|第二种用频数 $f_i$（分组数据用组中值）。`],
        ['Median|Médiane|Mediana|中央値|中位数', R`n = 2k + 1:\ x_{\left(\frac{n+1}{2}\right)}, \qquad n = 2k:\ \frac{x_{(n/2)} + x_{(n/2 + 1)}}{2}`, 'Middle value of the sorted data; not pulled by outliers.|Valeur du milieu des données triées ; peu sensible aux valeurs extrêmes.|Valor central de los datos ordenados; no le afectan los valores atípicos.|並べたデータの真ん中の値。外れ値の影響を受けにくい。|排序后中间的数；不受极端值影响。'],
        ['Mode|Mode|Moda|最頻値|众数', R`\text{Mo}:\ \max f_i`, 'The most frequent value (there can be several).|La valeur la plus fréquente (il peut y en avoir plusieurs).|El valor más frecuente (puede haber varios).|最も度数の大きい値（複数あることも）。|出现次数最多的值（可能不止一个）。'],
        ['Weighted mean|Moyenne pondérée|Media ponderada|加重平均|加权平均', R`\bar x_w = \frac{\sum w_i x_i}{\sum w_i}`],
        ['Effect of a linear change|Effet d’un changement affine|Efecto de un cambio lineal|1次変換の効果|线性变换的影响', R`y_i = a x_i + b \ \Rightarrow\ \bar y = a\bar x + b, \quad s_y = |a|\,s_x`]
      ] },
      { t: 'Measures of spread|Paramètres de dispersion|Medidas de dispersión|散らばりの尺度|离散程度', items: [
        ['Variance|Variance|Varianza|分散|方差', R`s^2 = \frac1n\sum (x_i - \bar x)^2 = \frac1n\sum x_i^2 - \bar x^2`],
        ['Standard deviation|Écart type|Desviación típica|標準偏差|标准差', R`s = \sqrt{s^2}`, R`Sample (unbiased) version divides by $n - 1$ instead of $n$.|La version de l’échantillon (non biaisée) divise par $n - 1$ au lieu de $n$.|La versión muestral (insesgada) divide entre $n - 1$ en lugar de $n$.|不偏分散では $n$ ではなく $n - 1$ で割ります。|样本（无偏）方差除以 $n - 1$ 而不是 $n$。`],
        ['Range|Étendue|Rango (recorrido)|範囲（レンジ）|极差', R`x_{\max} - x_{\min}`],
        ['Coefficient of variation|Coefficient de variation|Coeficiente de variación|変動係数|变异系数', R`CV = \frac{s}{\bar x}`, 'Compares spread between data sets with different means or units.|Compare la dispersion de séries de moyennes ou d’unités différentes.|Compara la dispersión de conjuntos con medias o unidades distintas.|平均や単位の異なるデータの散らばりを比べる。|用于比较均值或单位不同的数据的离散程度。'],
        ['Standard score|Score centré réduit|Puntuación típica|標準化（z スコア）|标准分', R`z = \frac{x - \bar x}{s}`]
      ] },
      { t: 'Quartiles and box plots|Quartiles et boîtes à moustaches|Cuartiles y diagramas de caja|四分位数と箱ひげ図|四分位数与箱线图', fig: 'boxplot', items: [
        ['Quartiles|Quartiles|Cuartiles|四分位数|四分位数', R`Q_1 = P_{25}, \quad Q_2 = \tilde x = P_{50}, \quad Q_3 = P_{75}`, 'Medians of the lower and upper halves of the sorted data.|Médianes des moitiés inférieure et supérieure des données triées.|Medianas de las mitades inferior y superior de los datos ordenados.|並べたデータの下半分・上半分の中央値。|排序数据下半部分与上半部分的中位数。'],
        ['Interquartile range|Écart interquartile|Rango intercuartílico|四分位範囲|四分位距', R`IQR = Q_3 - Q_1`],
        ['Outliers|Valeurs aberrantes|Valores atípicos|外れ値|异常值', R`x < Q_1 - 1.5\,IQR \quad \lor \quad x > Q_3 + 1.5\,IQR`],
        ['Percentile position|Rang d’un centile|Posición de un percentil|百分位の位置|百分位数位置', R`P_k:\ \ i = \frac{k}{100}\,n`, 'Round up; if it is a whole number, average that value and the next.|Arrondir au supérieur ; si c’est un entier, faire la moyenne de cette valeur et de la suivante.|Redondear hacia arriba; si es entero, promediar ese valor y el siguiente.|切り上げる。整数ならその値と次の値の平均。|向上取整；若为整数，取该数与下一个数的平均。']
      ] },
      { t: 'Grouped data|Données groupées|Datos agrupados|度数分布表|分组数据', items: [
        ['Relative frequency|Fréquence relative|Frecuencia relativa|相対度数|频率', R`h_i = \frac{f_i}{n}, \qquad \sum h_i = 1`],
        ['Cumulative frequency|Effectif cumulé|Frecuencia acumulada|累積度数|累积频数', R`F_i = f_1 + f_2 + \dots + f_i`],
        ['Median of grouped data|Médiane de données groupées|Mediana en datos agrupados|度数分布表の中央値|分组数据的中位数', R`\tilde x = L + \frac{\frac n2 - F_{i-1}}{f_i}\cdot c`, R`$L$ lower limit of the median class, $c$ its width, $F_{i-1}$ cumulative frequency before it.|$L$ borne inférieure de la classe médiane, $c$ son amplitude, $F_{i-1}$ effectif cumulé précédent.|$L$ límite inferior de la clase mediana, $c$ su amplitud, $F_{i-1}$ frecuencia acumulada anterior.|$L$ は中央値を含む階級の下限、$c$ は階級の幅、$F_{i-1}$ はその前までの累積度数。|$L$ 为中位数所在组的下限，$c$ 为组距，$F_{i-1}$ 为前一组的累积频数。`],
        ['Histogram|Histogramme|Histograma|ヒストグラム|频率分布直方图', R`H = \frac{h_i}{c}`, R`With unequal widths, bar area (not height) shows the frequency; total area $= 1$.|Avec des classes inégales, c’est l’aire (pas la hauteur) qui représente la fréquence ; aire totale $= 1$.|Con amplitudes distintas, el área (no la altura) representa la frecuencia; área total $= 1$.|幅が異なるときは高さでなく面積が度数を表す。面積の合計 $= 1$。|组距不等时，面积（而非高度）表示频率；总面积 $= 1$。`]
      ] },
      { t: 'Correlation and regression|Corrélation et régression|Correlación y regresión|相関と回帰|相关与回归', fig: 'regression', items: [
        ['Covariance|Covariance|Covarianza|共分散|协方差', R`s_{xy} = \frac1n\sum (x_i - \bar x)(y_i - \bar y) = \frac1n\sum x_iy_i - \bar x\,\bar y`],
        ['Correlation coefficient|Coefficient de corrélation|Coeficiente de correlación|相関係数|相关系数', R`r = \frac{s_{xy}}{s_x\,s_y}, \qquad -1 \le r \le 1`, R`$\lvert r\rvert$ near $1$: strong linear relation; sign gives the direction; $r \approx 0$: no linear relation.|$\lvert r\rvert$ proche de $1$ : forte relation linéaire ; le signe donne le sens ; $r \approx 0$ : pas de relation linéaire.|$\lvert r\rvert$ cerca de $1$: relación lineal fuerte; el signo da el sentido; $r \approx 0$: sin relación lineal.|$\lvert r\rvert$ が $1$ に近い：強い直線的関係。符号は向き。$r \approx 0$：直線的関係なし。|$\lvert r\rvert$ 接近 $1$：线性关系强；符号表示方向；$r \approx 0$：无线性关系。`],
        ['Regression line of y on x|Droite de régression de y en x|Recta de regresión de y sobre x|y の x への回帰直線|y 对 x 的回归直线', R`y - \bar y = \frac{s_{xy}}{s_x^2}(x - \bar x), \qquad \hat b = \frac{s_{xy}}{s_x^2}, \quad \hat a = \bar y - \hat b\,\bar x`, R`Always passes through $(\bar x, \bar y)$. Use it to predict $y$ only inside the data range.|Passe toujours par $(\bar x, \bar y)$. À utiliser pour prédire $y$ seulement dans la plage des données.|Pasa siempre por $(\bar x, \bar y)$. Úsala para predecir $y$ solo dentro del rango de los datos.|必ず $(\bar x, \bar y)$ を通る。予測はデータの範囲内で。|总过点 $(\bar x, \bar y)$。只在数据范围内用于预测 $y$。`],
        ['Least squares form|Forme des moindres carrés|Forma de mínimos cuadrados|最小二乗法の形|最小二乘法形式', R`\hat b = \frac{\sum x_iy_i - n\bar x\bar y}{\sum x_i^2 - n\bar x^2}`],
        ['Coefficient of determination|Coefficient de détermination|Coeficiente de determinación|決定係数|决定系数', R`R^2 = r^2`, 'Share of the variation of y explained by the line.|Part de la variation de y expliquée par la droite.|Parte de la variación de y explicada por la recta.|y の変動のうち直線で説明される割合。|y 的变化中被直线解释的比例。'],
        ['Line of x on y|Droite de x en y|Recta de x sobre y|x の y への回帰直線|x 对 y 的回归直线', R`x - \bar x = \frac{s_{xy}}{s_y^2}(y - \bar y)`, R`Both lines meet at $(\bar x, \bar y)$; the product of their slopes $\frac{s_{xy}}{s_x^2}\cdot\frac{s_{xy}}{s_y^2} = r^2$.|Les deux droites se coupent en $(\bar x, \bar y)$ ; le produit des pentes (dans le même repère) donne $r^2$.|Ambas rectas se cortan en $(\bar x, \bar y)$; el producto de los coeficientes da $r^2$.|2本の直線は $(\bar x, \bar y)$ で交わり、回帰係数の積は $r^2$。|两直线交于 $(\bar x, \bar y)$；两回归系数之积为 $r^2$。`]
      ] },
      { t: 'Contingency tables and χ²|Tableaux de contingence et χ²|Tablas de contingencia y χ²|分割表と χ² 検定|列联表与 χ² 检验', items: [
        ['Expected frequency|Effectif théorique|Frecuencia esperada|期待度数|期望频数', R`E_{ij} = \frac{R_i\,C_j}{n}`, R`$R_i$ row total, $C_j$ column total, if the two variables were independent.|$R_i$ total de la ligne, $C_j$ total de la colonne, si les deux variables étaient indépendantes.|$R_i$ total de la fila, $C_j$ total de la columna, si las dos variables fueran independientes.|$R_i$ は行の合計、$C_j$ は列の合計（2変数が独立と仮定）。|$R_i$ 为行合计，$C_j$ 为列合计（假设两变量独立）。`],
        ['Chi-squared statistic|Statistique du χ²|Estadístico χ²|χ² 統計量|χ² 统计量', R`\chi^2 = \sum\frac{(O - E)^2}{E}`, R`Large $\chi^2$ (beyond the table value for the chosen significance) suggests the variables are related.|Un $\chi^2$ grand (au-delà de la valeur de la table) suggère que les variables sont liées.|Un $\chi^2$ grande (mayor que el valor de la tabla) indica que las variables están relacionadas.|$\chi^2$ が表の値より大きければ、2変数に関係があると判断。|$\chi^2$ 较大（超过临界值）说明两变量有关。`],
        ['2 × 2 table|Tableau 2 × 2|Tabla 2 × 2|2 × 2 分割表|2 × 2 列联表', R`\chi^2 = \frac{n(ad - bc)^2}{(a + b)(c + d)(a + c)(b + d)}`]
      ] }
    ]
  });
})();
