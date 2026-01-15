# Análisis de Contenido: Física

Este documento contiene la transcripción rigurosa, análisis y solución paso a paso de los ejercicios del curso de Física.

---

## Tema: Análisis Dimensional

### Pregunta 1

**Enunciado:**
La cantidad de calor que se entrega a una sustancia para incrementar su temperatura, se calcula:
$$Q = m C_p \Delta T$$
Donde: Q=Calor, m=Masa; Cp=Calor específico
$\Delta T$ = Variacion de temperatura

Determinar las dimensiones de $C_p$.

**Opciones:**
a) $L^2 T^{-3} \theta^{-1}$
b) $M L^2 T^{-2}$
c) $T^{-2} N^{-1} \theta^{-1}$
d) $M L^2 T^{-2} N^{-1} \theta^{-1}$
e) $M L^2 T^{-2} N^{-1} \theta^{-1}$
**Marca Visual:** -

**Solución:**
1.  ** Análisis de Magnitudes:**
    *   $Q$ (Calor) es Energía: $[Q] = ML^2T^{-2}$.
    *   $m$ (Masa): $[m] = M$.
    *   $\Delta T$ (Temperatura): $[\Delta T] = \theta$.
2.  **Despeje de $C_p$:**
    De la fórmula $Q = m C_p \Delta T$, despejamos $C_p$:
    $$C_p = \frac{Q}{m \Delta T}$$
3.  **Análisis Dimensional:**
    $$[C_p] = \frac{[Q]}{[m][\Delta T]}$$
    $$[C_p] = \frac{ML^2T^{-2}}{M \cdot \theta}$$
    $$[C_p] = L^2T^{-2}\theta^{-1}$$
4.  **Revisión de Opciones:**
    Ninguna de las opciones impresas (a-e) coincide con $L^2T^{-2}\theta^{-1}$.
    *   La opción (b) es Energía.
    *   Hay una nota manuscrita en la imagen ("f") con la respuesta correcta: $L^2T^{-2}\theta^{-1}$.
    *   Sin embargo, estrictamente hablando, ninguna de las opciones dadas es correcta.

---

### Pregunta 2

**Enunciado:**
Si la expresión: $(amo)^{UNAS}$ que representa una energía, es dimensionalmente correcta; cuales son las dimensiones de "S" a partir de las magnitudes:
O: (frecuencia)$^2$ ; m: masa ; a = A: Área
N: Velocidad ; U: Longitud.

**Opciones:**
a) $L, T^{-3}$
b) $L, T^{-2}$
c) $L, T$
d) $L^{-4} \cdot T$
e) $L, T^{-4}$
**Marca Visual:** d

**Solución:**
1.  **Análisis de la Base ($X = amo$):**
    *   $a$ (Área): $[a] = L^2$.
    *   $m$ (Masa): $[m] = M$.
    *   $o$ (Frecuencia$^2$): $[o] = (T^{-1})^2 = T^{-2}$.
    *   Base $[X] = [a][m][o] = L^2 \cdot M \cdot T^{-2} = ML^2T^{-2}$.
    *   Observamos que la dimensión de la base **es igual a la dimensión de la Energía**.

2.  **Análisis de la Ecuación:**
    Nos dicen que la expresión $(amo)^{UNAS}$ representa una Energía.
    $$ [ (amo)^{UNAS} ] = \text{Energía} $$
    $$ (ML^2T^{-2})^{[UNAS]} = ML^2T^{-2} $$
    Para que esto se cumpla, el exponente debe ser igual a la unidad (adimensionalmente 1).
    $$ [UNAS] = 1 $$

3.  **Despeje de S:**
    El exponente es el producto de las magnitudes $U, N, A, S$.
    *   $U$ (Longitud): $L$.
    *   $N$ (Velocidad): $LT^{-1}$.
    *   $A$ (Área): $L^2$.
    *   $S$: Desconocido.
    
    Plantemos la ecuación dimensional del exponente:
    $$ [U][N][A][S] = 1 $$
    $$ (L)(LT^{-1})(L^2)[S] = 1 $$
    $$ (L^4 T^{-1}) [S] = 1 $$
    $$ [S] = \frac{1}{L^4 T^{-1}} $$
    $$ [S] = L^{-4} T^{1} $$

4.  **Respuesta:**
    La dimensión de S es $L^{-4}T$. Esto coincide con la opción **d**.

---

### Pregunta 3

**Enunciado:**
En un ensayo realizado en el Laboratorio de Física de la UNAS, se pudo observar que cuando un cuerpo cae libremente en el vacío, la relación entre la altura y el tiempo está definido por la ecuación:
$$h = k g t^{1/k}$$
Si "k" es una constante adimensional, a cuánto equivale?

**Opciones:**
a) 0
b) 3/5
c) 2
d) 4
e) 1/2
**Marca Visual:** e

**Solución:**
1.  **Análisis Dimensional:**
    *   $h$ (Altura): $[h] = L$.
    *   $g$ (Aceleración): $[g] = LT^{-2}$.
    *   $t$ (Tiempo): $[t] = T$.
    *   $k$: Adimensional, $[k] = 1$.
2.  **Ecuación Dimensional:**
    $$[h] = [k] [g] [t]^{1/k}$$
    $$L = (1) (LT^{-2}) (T)^{1/k}$$
    $$L = L T^{-2} T^{1/k}$$
    $$L = L T^{-2 + 1/k}$$
3.  **Igualando Exponentes:**
    Para $T$: $-2 + 1/k = 0$
    $$1/k = 2 \Rightarrow k = 1/2$$
    Respuesta: 1/2.

---

### Pregunta 4

**Enunciado:**
Durante un disparo horizontal, el móvil describe una trayectoria gobernada por la ecuación siguiente:
$$H = \frac{gd^2}{2v_o^q}$$
H: altura, g: gravedad terrestre, $v_o$: velocidad inicial, d: distancia de alcance horizontal.
¿Cuál debe ser el valor de "q" para que dicha ecuación sea correcta y entonces dimensionalmente homogénea?

**Opciones:**
a) 0
b) 1
c) 2
d) 5
e) 1/2
**Marca Visual:** c

**Solución:**
1.  **Análisis Dimensional:**
    *   $H, d$ (Longitud): $L$.
    *   $g$ (Aceleración): $LT^{-2}$.
    *   $v_o$ (Velocidad): $LT^{-1}$.
2.  **Ecuación:**
    $$[H] = \frac{[g][d]^2}{[v_o]^q}$$
    $$L = \frac{(LT^{-2})(L^2)}{(LT^{-1})^q}$$
    $$L = \frac{L^3 T^{-2}}{L^q T^{-q}}$$
    $$L^1 = L^{3-q} T^{q-2}$$
3.  **Igualando Exponentes:**
    *   Para $L$: $1 = 3 - q \Rightarrow q = 2$.
    *   Para $T$: $0 = q - 2 \Rightarrow q = 2$.
    Respuesta: 2.

---

### Pregunta 5

**Enunciado:**
Si la siguiente expresión es dimensionalmente homogénea, hallar: $x-3y$
$$P = q^z R^{-y} S^x$$
Donde: P = Presión, q = Fuerza, R = Volumen, S = Longitud.

**Opciones:**
a) 5
b) 4
c) 3
d) 2
e) 1
**Marca Visual:** -

**Solución:**
1.  **Análisis Dimensional:**
    *   $P$ (Presión): $ML^{-1}T^{-2}$.
    *   $q$ (Fuerza): $MLT^{-2}$.
    *   $R$ (Volumen): $L^3$.
    *   $S$ (Longitud): $L$.
2.  **Ecuación:**
    $$[P] = [q]^z [R]^{-y} [S]^x$$
    $$ML^{-1}T^{-2} = (MLT^{-2})^z (L^3)^{-y} (L)^x$$
    $$M^1 L^{-1} T^{-2} = M^z L^{z - 3y + x} T^{-2z}$$
3.  **Sistema de Ecuaciones:**
    *   M: $z = 1$.
    *   T: $-2 = -2z \Rightarrow z = 1$.
    *   L: $-1 = z - 3y + x$.
        Sustituyendo $z=1$:
        $$-1 = 1 - 3y + x$$
        $$x - 3y = -2$$
4.  **Discrepancia:**
    Ninguna opción coincide con -2. Si asumimos un error en el signo de la pregunta (hallar $3y-x$) la respuesta sería 2 (Opción d). Dado el contexto de exámenes, seleccionaremos la opción que coincide en valor absoluto.
    Respuesta probable: 2.

---

### Pregunta 6

**Enunciado:**
Una turbina eólica define su potencia "P" según la ecuación:
$$P = \frac{1}{2} \rho \pi R^2 C_p v^3$$
En donde; P: Potencia, $\rho$: Densidad del aire, R: radio, v: velocidad.
Las dimensiones de $C_p$ son:

**Opciones:**
a) LT
b) 1
c) ML
d) $MLT^{-1}$
e) $L^2T^{-2}$
**Marca Visual:** b

**Solución:**
1.  **Magnitudes:**
    *   $P$ (Potencia): $ML^2T^{-3}$.
    *   $\rho$ (Densidad): $ML^{-3}$.
    *   $R$ (Longitud): $L$.
    *   $v$ (Velocidad): $LT^{-1}$.
2.  **Ecuación:**
    $$[P] = [\rho] [R]^2 [C_p] [v]^3$$ (1/2 y $\pi$ son adimensionales)
    $$ML^2T^{-3} = (ML^{-3}) (L^2) [C_p] (LT^{-1})^3$$
    $$ML^2T^{-3} = M L^{-1} [C_p] L^3 T^{-3}$$
    $$ML^2T^{-3} = M L^{2} T^{-3} [C_p]$$
    $$[C_p] = 1$$
    Es adimensional. Respuesta: 1.

---

### Pregunta 7

**Enunciado:**
Si la siguiente ecuación es dimensionalmente homogénea, hallar los valores de "a-3b".
$$m^{1/3} v^2 = k g^a D^b$$
Siendo: m = Masa, v = Velocidad, k = Número, g = Aceleración de la gravedad, D = Densidad.

**Opciones:**
a) 1
b) 2
c) 3
d) 4
e) 5
**Marca Visual:** c

**Solución:**
1.  **Magnitudes:**
    *   $m$: $M$.
    *   $v$: $LT^{-1}$.
    *   $g$: $LT^{-2}$.
    *   $D$: $ML^{-3}$.
2.  **Ecuación:**
    $$[m]^{1/3} [v]^2 = [g]^a [D]^b$$
    $$M^{1/3} (LT^{-1})^2 = (LT^{-2})^a (ML^{-3})^b$$
    $$M^{1/3} L^2 T^{-2} = L^a T^{-2a} M^b L^{-3b}$$
    $$M^{1/3} L^2 T^{-2} = M^b L^{a-3b} T^{-2a}$$
3.  **Igualando:**
    *   M: $b = 1/3$.
    *   T: $-2 = -2a \Rightarrow a = 1$.
    *   L (Verificación): $2 = a - 3b$.
        $1 - 3(1/3) = 1 - 1 = 0 \neq 2$.
    *   **Nota:** Existe una inconsistencia en el problema planteado. Sin embargo, matemáticamente se pide "a-3b".
    *   Si usamos la ecuación de L directamente: $a-3b = 2$.
    *   Si usamos T y M: $a-3b = 0$.
    *   La marca visual sugiere la opción c) 3? No, parece estar en c. Pero 2 es una deducción directa de la dimensión de longitud. Asumiremos que se busca el exponente de L. La opción b) es 2.
    *   Evaluando opciones y contexto, si hubo un error de tipeo en $v$ (quizás volumen?), pero $v$ dice Vel.
    Respuesta sugerida: 2 (Opción b) por consistencia de L, o Inconsistente. (Se dejará indicado).

---

### Pregunta 8

**Enunciado:**
Si el siguiente quebrado es dimensionalmente homogéneo, hallar las dimensiones de "B", sabiendo:
$$P = \frac{Ax^2 + Bx + C}{At^2 + Bt + C}$$
$[A]=LT^{-1}$, $[t]=T$.

**Opciones:**
a) LT
b) L
c) MLT
d) MT
e) T
**Marca Visual:** b

**Solución:**
1.  **Principio de Homogeneidad:** En una suma ($At^2 + Bt + C$), todos los términos tienen la misma dimensión.
2.  **Análisis del Denominador:**
    $$[At^2] = [Bt]$$
    $$[A]T^2 = [B]T$$
    $$(LT^{-1})T^2 = [B]T$$
    $$LT = [B]T$$
    $$[B] = L$$
    Respuesta: L.

---

### Pregunta 9

**Enunciado:**
Determine la dimensión de $\alpha$ en la siguiente ecuación que es dimensionalmente correcta:
$$y = \alpha \tan(\theta_0) - \left[ \frac{a}{2\beta^2 \cos^2(\theta_0)} \right] x^2$$
Donde $x$ e $y$ son los desplazamientos y $a$ es la aceleración.

**Opciones:**
a) $L^{-1}$
b) $L$
c) $LT$
d) $M$
e) $LM$
**Marca Visual:** -

**Solución:**
1.  **Homogeneidad:** Todos los términos de una suma/resta deben tener la misma dimensión.
    $$[y] = [\alpha \tan(\theta_0)]$$
2.  **Análisis:**
    *   $[y] = L$ (Desplazamiento).
    *   $[\tan(\theta_0)] = 1$ (Adimensional).
    *   $L = [\alpha] (1)$.
    *   $[\alpha] = L$.
    Respuesta: L (Opción b).

---

### Pregunta 10

**Enunciado:**
Hallar la dimensión de x para que la siguiente ecuación sea dimensionalmente correcta:
$$v x = a^{\cos 60} + U \cdot P \cdot \ln 100$$
donde: v=velocidad lineal y a=aceleración.

**Opciones:**
a) $T^{-1}$
b) $L^{-1}$
c) $L$
d) $L^{-1}T$
e) $L^{-1/2}$
**Marca Visual:** -

**Solución:**
1.  **Homogeneidad:**
    $$[vx] = [a^{\cos 60}]$$
2.  **Análisis:**
    *   $\cos 60 = 1/2$.
    *   $[a] = LT^{-2}$.
    *   $[a^{\cos 60}] = (LT^{-2})^{1/2} = L^{1/2}T^{-1}$.
    *   $[v] = LT^{-1}$.
3.  **Despeje:**
    $$[v][x] = L^{1/2}T^{-1}$$
    $$(LT^{-1})[x] = L^{1/2}T^{-1}$$
    $$[x] = \frac{L^{1/2}T^{-1}}{LT^{-1}}$$
    $$[x] = L^{-1/2}$$
    Respuesta: $L^{-1/2}$.

---

### Pregunta 11

**Enunciado:**
Cuál debe ser las dimensiones de A y B para que la ecuación sea dimensionalmente correcta?
$$A = \frac{W \sin \theta}{m(B^2 + S)}$$
siendo W=trabajo, m=masa y S=área.

**Opciones:**
a) $L, T^{-3}$
b) $L, T^{-2}$
c) $L, T$
d) $L^{-3}, T$
e) $L, T^{-4}$
**Marca Visual:** b

**Solución:**
1.  **Homogeneidad (Denominador):**
    $$[B^2] = [S]$$
    $$[B]^2 = L^2 \Rightarrow [B] = L$$
2.  **Dimensión de A:**
    $$[A] = \frac{[W]}{[m][S]}$$
    $$[A] = \frac{ML^2T^{-2}}{M \cdot L^2}$$
    $$[A] = T^{-2}$$
3.  **Resultado:**
    A: $T^{-2}$, B: $L$.
    La opción b) muestra $L, T^{-2}$. Asumimos el orden B, A o simplemente el conjunto de valores.
    Respuesta: b) $L, T^{-2}$.

---

### Pregunta 12

**Enunciado:**
En un experimento del laboratorio de ingeniería de los alimentos se comprobó, que la relación:
$$pF = (FIA)^{UNAS}$$
es dimensionalmente correcta, siendo F=fuerza, A=Área, I=Volumen, U=energía, S=longitud. Cuales son las dimensiones de N. (Nota: asumimos 'p' adimensional o parte del nombre, analizamos el exponente que debe ser adimensional).

**Opciones:**
a) $M^{-1}L^{-5}T^{-2}$
b) $M^{-1}L^{5}T^{2}$
c) $M^{-1}L^{-5}T^{-3}$
d) $M L^{-5}T^{2}$
e) $M^{-1}L^{-5}T^{2}$
**Marca Visual:** e

**Solución:**
1.  **Propiedad de Exponentes:** Los exponentes son siempre adimensionales.
    $$[UNAS] = 1$$
    $$[U][N][A][S] = 1$$
2.  **Magnitudes:**
    *   $U$ (Energía): $ML^2T^{-2}$.
    *   $A$ (Área): $L^2$.
    *   $S$ (Longitud): $L$.
3.  **Despeje:**
    $$(ML^2T^{-2}) [N] (L^2) (L) = 1$$
    $$M L^{2+2+1} T^{-2} [N] = 1$$
    $$M L^5 T^{-2} [N] = 1$$
    $$[N] = M^{-1} L^{-5} T^2$$
    Respuesta: $M^{-1} L^{-5} T^2$ (Opción e).

---

### Pregunta 13

**Enunciado:**
Determinar las dimensiones de X para que la relación: $E X = F v \cos \theta$ sea dimensionalmente correcta. Se sabe que E=energía cinética, F=Fuerza y v=Velocidad.

**Opciones:**
a) $T^{-2}$
b) $T^2$
c) $T^{-3}$
d) $T^{-1}$
e) $L^{-5}T^2$
**Marca Visual:** d

**Solución:**
1.  **Ecuación:**
    $$[E] [X] = [F] [v]$$
2.  **Magnitudes:**
    *   $E$: $ML^2T^{-2}$.
    *   $F$: $MLT^{-2}$.
    *   $v$: $LT^{-1}$.
3.  **Despeje:**
    $$ML^2T^{-2} [X] = (MLT^{-2})(LT^{-1})$$
    $$ML^2T^{-2} [X] = ML^2 T^{-3}$$
    $$[X] = \frac{ML^2 T^{-3}}{ML^2 T^{-2}} = T^{-1}$$
    Respuesta: $T^{-1}$.

---

### Pregunta 14

**Enunciado:**
Sabiendo que la expresión $pV = nRT$ es dimensionalmente correcta, siendo p=presión, V=volumen, n=Cantidad de sustancia, y T=temperatura, determinar las dimensiones de R.

**Opciones:**
a) $ML^2T^{-2}N^{-1}\theta^{-1}$
b) $ML^{-2}T^{-2}N^{-1}\theta^{-1}$
c) $ML^2T^{-2}N^{1}\theta^{-1}$
d) $ML^{-2}T^{-2}N^{-1}\theta^{-1}$
e) $ML^2T^{-2}N^{-1}\theta^{1}$
**Marca Visual:** a

**Solución:**
1.  **Ecuación:**
    $$[p][V] = [n][R][T]$$
2.  **Magnitudes:**
    *   $p$: $ML^{-1}T^{-2}$.
    *   $V$: $L^3$.
    *   $n$: $N$.
    *   $T$: $\theta$.
3.  **Despeje:**
    $$(ML^{-1}T^{-2})(L^3) = N [R] \theta$$
    $$ML^2T^{-2} = N [R] \theta$$
    $$[R] = ML^2 T^{-2} N^{-1} \theta^{-1}$$
    Respuesta: $ML^2 T^{-2} N^{-1} \theta^{-1}$.
