/* cheat sheet · vectors and matrices — text is 'en|fr|es|ja|zh' */
(function () {
  const R = String.raw;
  Cheats.topic({
    id: 'vectors', icon: '▦', color: '#1d7f86', bg: '#def2f3', cat: 'matrix',
    name: 'Vectors and matrices|Vecteurs et matrices|Vectores y matrices|ベクトルと行列|向量与矩阵',
    blurb: 'Dot and cross products, determinants, inverses, linear systems, eigenvalues and transformations.|Produits scalaire et vectoriel, déterminants, inverses, systèmes linéaires, valeurs propres et transformations.|Productos escalar y vectorial, determinantes, inversas, sistemas lineales, autovalores y transformaciones.|内積・外積、行列式、逆行列、連立1次方程式、固有値、1次変換。|数量积与向量积、行列式、逆矩阵、线性方程组、特征值与线性变换。',
    sections: [
      { t: 'Vectors|Vecteurs|Vectores|ベクトル|向量', fig: 'vectors', items: [
        ['Length|Norme|Módulo|大きさ|模', R`|\mathbf v| = \sqrt{v_1^2 + v_2^2 + v_3^2}, \qquad \hat{\mathbf v} = \frac{\mathbf v}{|\mathbf v|}`],
        ['Dot product|Produit scalaire|Producto escalar|内積|数量积', R`\mathbf u\cdot\mathbf v = u_1v_1 + u_2v_2 + u_3v_3 = |\mathbf u||\mathbf v|\cos\theta`],
        ['Perpendicular|Orthogonaux|Perpendiculares|垂直|垂直', R`\mathbf u \perp \mathbf v \iff \mathbf u\cdot\mathbf v = 0`],
        ['Projection|Projection|Proyección|正射影|投影', R`\operatorname{proj}_{\mathbf v}\mathbf u = \frac{\mathbf u\cdot\mathbf v}{|\mathbf v|^2}\,\mathbf v`],
        ['Cross product|Produit vectoriel|Producto vectorial|外積|向量积', R`\mathbf u\times\mathbf v = \begin{vmatrix}\mathbf i & \mathbf j & \mathbf k\\ u_1 & u_2 & u_3\\ v_1 & v_2 & v_3\end{vmatrix}`],
        ['Parallelogram area|Aire du parallélogramme|Área del paralelogramo|平行四辺形の面積|平行四边形面积', R`S = |\mathbf u\times\mathbf v| = |\mathbf u||\mathbf v|\sin\theta, \qquad S_{2D} = |u_1v_2 - u_2v_1|`],
        ['Triple product|Produit mixte|Producto mixto|スカラー三重積|混合积', R`V = |\mathbf u\cdot(\mathbf v\times\mathbf w)| = \left|\det(\mathbf u, \mathbf v, \mathbf w)\right|`, 'Volume of the parallelepiped.|Volume du parallélépipède.|Volumen del paralelepípedo.|平行六面体の体積。|平行六面体的体积。']
      ] },
      { t: 'Matrix algebra|Calcul matriciel|Álgebra de matrices|行列の計算|矩阵运算', items: [
        ['Product|Produit|Producto|積|乘法', R`(AB)_{ij} = \sum_k a_{ik}\,b_{kj}`, R`Rows of $A$ times columns of $B$; in general $AB \ne BA$.|Lignes de $A$ fois colonnes de $B$ ; en général $AB \ne BA$.|Filas de $A$ por columnas de $B$; en general $AB \ne BA$.|$A$ の行 × $B$ の列。一般に $AB \ne BA$。|$A$ 的行乘 $B$ 的列；一般 $AB \ne BA$。`],
        ['Transpose|Transposée|Traspuesta|転置|转置', R`(AB)^{T} = B^{T}A^{T}`],
        ['Inverse of a product|Inverse d’un produit|Inversa de un producto|積の逆行列|积的逆', R`(AB)^{-1} = B^{-1}A^{-1}`],
        ['Identity|Identité|Identidad|単位行列|单位矩阵', R`AI = IA = A, \qquad AA^{-1} = I`]
      ] },
      { t: 'Determinants|Déterminants|Determinantes|行列式|行列式', fig: 'sarrus', items: [
        ['2 × 2|2 × 2|2 × 2|2 × 2|2 × 2', R`\begin{vmatrix} a & b\\ c & d\end{vmatrix} = ad - bc`, 'Main diagonal minus the other diagonal.|Diagonale principale moins l’autre diagonale.|Diagonal principal menos la otra diagonal.|主対角線の積 − もう一方の対角線の積。|主对角线之积减去副对角线之积。'],
        ['3 × 3 — Sarrus’ rule|3 × 3 — règle de Sarrus|3 × 3 — regla de Sarrus|3 × 3 — サラスの方法|3 × 3 — 萨吕法则（对角线法则）', R`\begin{vmatrix} a & b & c\\ d & e & f\\ g & h & i\end{vmatrix} = aei + bfg + cdh - ceg - afh - bdi`, 'Copy the first two columns to the right: the three ↘ diagonals count +, the three ↙ diagonals count −. Only for 3 × 3.|Recopier les deux premières colonnes à droite : les trois diagonales ↘ comptent +, les trois ↙ comptent −. Seulement en 3 × 3.|Copiar las dos primeras columnas a la derecha: las tres diagonales ↘ suman, las tres ↙ restan. Solo para 3 × 3.|最初の2列を右に書き足し、↘ の3本は +、↙ の3本は −。3 × 3 専用。|把前两列抄到右边：三条 ↘ 对角线取 +，三条 ↙ 取 −。仅适用于 3 × 3。'],
        ['3 × 3 — first row|3 × 3 — première ligne|3 × 3 — primera fila|3 × 3 — 第1行で展開|3 × 3 — 按第一行展开', R`= a\begin{vmatrix} e & f\\ h & i\end{vmatrix} - b\begin{vmatrix} d & f\\ g & i\end{vmatrix} + c\begin{vmatrix} d & e\\ g & h\end{vmatrix}`],
        ['Cofactor (Laplace) expansion|Développement selon une ligne (Laplace)|Desarrollo por adjuntos (Laplace)|余因子展開（ラプラス展開）|按行（列）展开（拉普拉斯）', R`\det A = \sum_{j=1}^n a_{ij}\,C_{ij}, \qquad C_{ij} = (-1)^{i+j}M_{ij}`, R`Along any row $i$ (or column). $M_{ij}$ is the determinant left after deleting row $i$ and column $j$. Pick the row with the most zeros.|Selon n’importe quelle ligne $i$ (ou colonne). $M_{ij}$ est le déterminant obtenu en supprimant la ligne $i$ et la colonne $j$. Choisir la ligne avec le plus de zéros.|Por cualquier fila $i$ (o columna). $M_{ij}$ es el determinante que queda al quitar la fila $i$ y la columna $j$. Elegir la fila con más ceros.|任意の行 $i$（または列）で展開。$M_{ij}$ は第 $i$ 行と第 $j$ 列を除いた行列式。0 の多い行を選びます。|可按任意一行 $i$（或一列）展开。$M_{ij}$ 是去掉第 $i$ 行第 $j$ 列后的行列式。选零最多的行。`],
        ['Sign pattern|Signes des cofacteurs|Signos de los adjuntos|余因子の符号|代数余子式的符号', R`\begin{pmatrix} + & - & +\\ - & + & -\\ + & - & +\end{pmatrix}`],
        ['Product and transpose|Produit et transposée|Producto y traspuesta|積と転置|乘积与转置', R`\det(AB) = \det A\,\det B, \qquad \det A^{T} = \det A`],
        ['Scaling|Multiplication par un scalaire|Producto por un escalar|スカラー倍|数乘', R`\det(kA) = k^n\det A, \qquad \det A^{-1} = \frac{1}{\det A}`, R`$A$ is $n \times n$.|$A$ est $n \times n$.|$A$ es $n \times n$.|$A$ は $n \times n$。|$A$ 为 $n \times n$ 矩阵。`],
        ['Row operations|Opérations sur les lignes|Operaciones con filas|行基本変形|行变换', R`R_i \leftrightarrow R_j:\ -\det, \qquad R_i \to kR_i:\ k\det, \qquad R_i \to R_i + kR_j:\ \det`, 'Swapping two rows changes the sign; adding a multiple of another row changes nothing. Reduce to triangular form, then multiply the diagonal.|Échanger deux lignes change le signe ; ajouter un multiple d’une autre ligne ne change rien. Se ramener à une forme triangulaire puis multiplier la diagonale.|Intercambiar dos filas cambia el signo; sumar un múltiplo de otra fila no cambia nada. Llevar a forma triangular y multiplicar la diagonal.|2行の入れ替えで符号が変わり、他の行の定数倍を足しても変わりません。三角行列にしてから対角成分を掛けます。|交换两行变号；某行加上另一行的倍数不变。化为三角形后把对角线相乘。'],
        ['Triangular matrix|Matrice triangulaire|Matriz triangular|三角行列|三角矩阵', R`\det = a_{11}a_{22}\cdots a_{nn}`],
        ['When det = 0|Quand det = 0|Cuándo det = 0|det = 0 となるとき|det = 0 的情形', R`\det A = 0 \iff \nexists A^{-1} \iff \exists\,\mathbf x \ne \mathbf 0:\ A\mathbf x = \mathbf 0`, 'Also when two rows (or columns) are equal or proportional, or a row is zero.|Aussi quand deux lignes (ou colonnes) sont égales ou proportionnelles, ou qu’une ligne est nulle.|También cuando dos filas (o columnas) son iguales o proporcionales, o una fila es nula.|2行（列）が等しい・比例する、またはある行が 0 のときも。|两行（列）相等或成比例，或某行全为零时也是。'],
        ['Geometric meaning|Sens géométrique|Significado geométrico|図形的な意味|几何意义', R`S = |\det(\mathbf u, \mathbf v)|, \qquad V = |\det(\mathbf u, \mathbf v, \mathbf w)|`, 'Area of the parallelogram (2D) or volume of the parallelepiped (3D) spanned by the columns; the sign gives the orientation.|Aire du parallélogramme (2D) ou volume du parallélépipède (3D) engendré par les colonnes ; le signe donne l’orientation.|Área del paralelogramo (2D) o volumen del paralelepípedo (3D) generado por las columnas; el signo da la orientación.|列ベクトルが張る平行四辺形の面積（2D）または平行六面体の体積（3D）。符号は向き。|列向量张成的平行四边形面积（二维）或平行六面体体积（三维）；符号表示定向。'],
        ['Vandermonde|Vandermonde|Vandermonde|ヴァンデルモンドの行列式|范德蒙德行列式', R`\begin{vmatrix} 1 & 1 & 1\\ a & b & c\\ a^2 & b^2 & c^2\end{vmatrix} = (b - a)(c - a)(c - b)`]
      ] },
      { t: 'Cramer’s rule|Règle de Cramer|Regla de Cramer|クラメルの公式|克拉默法则', items: [
        ['General rule|Règle générale|Regla general|一般形|一般形式', R`A\mathbf x = \mathbf b, \ \det A \ne 0 \ \Rightarrow\ x_i = \frac{\det A_i}{\det A}`, R`$A_i$ is $A$ with column $i$ replaced by $\mathbf b$.|$A_i$ est $A$ où la colonne $i$ est remplacée par $\mathbf b$.|$A_i$ es $A$ con la columna $i$ sustituida por $\mathbf b$.|$A_i$ は $A$ の第 $i$ 列を $\mathbf b$ に置き換えた行列。|$A_i$ 是把 $A$ 的第 $i$ 列换成 $\mathbf b$ 的矩阵。`],
        ['2 × 2 system|Système 2 × 2|Sistema 2 × 2|2元連立方程式|二元一次方程组', R`\begin{cases} ax + by = e\\ cx + dy = f\end{cases} \qquad x = \frac{\begin{vmatrix} e & b\\ f & d\end{vmatrix}}{\begin{vmatrix} a & b\\ c & d\end{vmatrix}} = \frac{ed - bf}{ad - bc}, \qquad y = \frac{\begin{vmatrix} a & e\\ c & f\end{vmatrix}}{\begin{vmatrix} a & b\\ c & d\end{vmatrix}} = \frac{af - ec}{ad - bc}`],
        ['3 × 3 system|Système 3 × 3|Sistema 3 × 3|3元連立方程式|三元一次方程组', R`x = \frac{\begin{vmatrix} b_1 & a_{12} & a_{13}\\ b_2 & a_{22} & a_{23}\\ b_3 & a_{32} & a_{33}\end{vmatrix}}{\det A}, \qquad y = \frac{\begin{vmatrix} a_{11} & b_1 & a_{13}\\ a_{21} & b_2 & a_{23}\\ a_{31} & b_3 & a_{33}\end{vmatrix}}{\det A}, \qquad z = \frac{\begin{vmatrix} a_{11} & a_{12} & b_1\\ a_{21} & a_{22} & b_2\\ a_{31} & a_{32} & b_3\end{vmatrix}}{\det A}`],
        ['When det A = 0|Quand det A = 0|Cuándo det A = 0|det A = 0 のとき|det A = 0 时', R`\exists i:\ \det A_i \ne 0 \Rightarrow \varnothing, \qquad \forall i:\ \det A_i = 0 \Rightarrow \varnothing \lor \infty`, 'No unique solution. If some det Aᵢ ≠ 0 there is none; if all are 0 there are infinitely many or none — check with elimination.|Pas de solution unique. Si un det Aᵢ ≠ 0, il n’y en a aucune ; si tous sont nuls, une infinité ou aucune — vérifier par élimination.|No hay solución única. Si algún det Aᵢ ≠ 0 no hay ninguna; si todos son 0 hay infinitas o ninguna — comprobar por eliminación.|解は一意ではない。det Aᵢ ≠ 0 のものがあれば解なし。すべて 0 なら無数か解なし（消去法で確認）。|无唯一解。若某个 det Aᵢ ≠ 0 则无解；若全为 0 则有无穷多解或无解——用消元法检验。'],
        ['Homogeneous system|Système homogène|Sistema homogéneo|同次連立方程式|齐次方程组', R`A\mathbf x = \mathbf 0:\ \ \det A \ne 0 \Rightarrow \mathbf x = \mathbf 0, \qquad \det A = 0 \Rightarrow \exists\,\mathbf x \ne \mathbf 0`]
      ] },
      { t: 'Inverse and linear systems|Inverse et systèmes linéaires|Inversa y sistemas lineales|逆行列と連立方程式|逆矩阵与线性方程组', items: [
        ['Inverse of a 2 × 2|Inverse d’une 2 × 2|Inversa de una 2 × 2|2 × 2 の逆行列|2 × 2 逆矩阵', R`\begin{pmatrix} a & b\\ c & d\end{pmatrix}^{-1} = \frac{1}{ad - bc}\begin{pmatrix} d & -b\\ -c & a\end{pmatrix}`],
        ['General inverse|Inverse générale|Inversa general|一般の逆行列|一般逆矩阵', R`A^{-1} = \frac{1}{\det A}\operatorname{adj}A, \qquad \exists A^{-1} \iff \det A \ne 0`],
        ['Rouché–Capelli|Rouché–Capelli|Rouché–Frobenius|解の存在（階数）|解的存在性（秩）', R`\exists\,\mathbf x:\ A\mathbf x = \mathbf b \iff \operatorname{rank}A = \operatorname{rank}[A \mid \mathbf b]`]
      ] },
      { t: 'Eigenvalues|Valeurs propres|Autovalores|固有値|特征值', items: [
        ['Definition|Définition|Definición|定義|定义', R`A\mathbf v = \lambda\mathbf v, \qquad \det(A - \lambda I) = 0`],
        ['2 × 2 shortcut|Raccourci 2 × 2|Atajo 2 × 2|2 × 2 の場合|2 × 2 的情形', R`\lambda^2 - (\operatorname{tr}A)\,\lambda + \det A = 0`],
        ['Trace and determinant|Trace et déterminant|Traza y determinante|トレースと行列式|迹与行列式', R`\lambda_1 + \dots + \lambda_n = \operatorname{tr}A, \qquad \lambda_1\cdots\lambda_n = \det A`],
        ['Powers by diagonalising|Puissances par diagonalisation|Potencias por diagonalización|対角化による累乗|对角化求幂', R`A = PDP^{-1} \ \Rightarrow\ A^n = PD^nP^{-1}`]
      ] },
      { t: 'Transformations of the plane|Transformations du plan|Transformaciones del plano|平面の1次変換|平面线性变换', items: [
        ['Rotation by θ|Rotation d’angle θ|Giro de ángulo θ|角 θ の回転|旋转 θ', R`\begin{pmatrix}\cos\theta & -\sin\theta\\ \sin\theta & \cos\theta\end{pmatrix}`, 'Determinant 1; rotating twice adds the angles.|Déterminant 1 ; deux rotations additionnent les angles.|Determinante 1; dos giros suman los ángulos.|行列式は 1。2回の回転で角が足されます。|行列式为 1；两次旋转角度相加。'],
        ['Reflections|Symétries|Simetrías|対称移動|反射', R`S_{Ox} = \begin{pmatrix}1 & 0\\ 0 & -1\end{pmatrix}, \qquad S_{y = x} = \begin{pmatrix}0 & 1\\ 1 & 0\end{pmatrix}`],
        ['Scaling and shear|Homothétie et cisaillement|Escalado y cizalla|拡大とずらし|伸缩与错切', R`\begin{pmatrix}k_1 & 0\\ 0 & k_2\end{pmatrix}, \qquad \begin{pmatrix}1 & k\\ 0 & 1\end{pmatrix}^n = \begin{pmatrix}1 & nk\\ 0 & 1\end{pmatrix}`],
        ['Area scale factor|Facteur d’aire|Factor de área|面積の拡大率|面积缩放因子', R`S' = |\det A|\,S`, 'A negative determinant also reverses orientation.|Un déterminant négatif inverse aussi l’orientation.|Un determinante negativo además invierte la orientación.|行列式が負なら向きも反転します。|行列式为负时还会改变定向。']
      ] }
    ]
  });
})();
