# Transcripción de Contenido: Aritmética

## Tema: Lógica Proposicional

### Pregunta 1

**Enunciado:**
¿Cuántas proposiciones lógicas hay en los siguientes enunciados?

I. ¡Viva el Perú!
II. La célula es la unidad fundamental de los seres vivos
III. Las matemáticas son agradables
IV. $2x - 1 < 100$
V. Atahualpa descubrió América

**Opciones:**
a) 1
b) 2
c) 3
d) 4
e) 5
**Marca Visual:** b

**Solución:**
1.  Analizamos cada enunciado:
    *   **I. ¡Viva el Perú!:** Es una oración exclamativa. No es proposición (no es V ni F).
    *   **II. La célula es la unidad fundamental de los seres vivos:** Es un enunciado declarativo que puede ser calificado como verdadero o falso. **Es proposición**.
    *   **III. Las matemáticas son agradables:** Es un enunciado de opinión subjetiva. No es una proposición lógica objetiva.
    *   **IV. $2x - 1 < 100$:** Es un enunciado abierto (su valor de verdad depende de la variable $x$). No es proposición.
    *   **V. Atahualpa descubrió América:** Es un enunciado declarativo falso (históricamente incorrecto), pero tiene valor de verdad. **Es proposición**.
2.  Conteo:
    Solo II y V son proposiciones.
    Total = 2.

---

### Pregunta 2

**Enunciado:**
Sea p: "Estudio" y q: "Apruebo".
¿Cuál es la expresión simbólica de: "No es cierto que si estudio entonces apruebo"?

**Opciones:**
a) $p \rightarrow q$
b) $\sim p \rightarrow \sim q$
c) $\sim(p \rightarrow q)$
d) $\sim p \land q$
e) $p \land \sim q$
**Marca Visual:** c

**Solución:**
1.  Identificamos las partes del enunciado verbal:
    *   "si estudio entonces apruebo": es una condicional ($p \rightarrow q$).
    *   "No es cierto que...": es una negación externa ($\sim$).
2.  Estructura completa:
    "No es cierto que (si estudio entonces apruebo)"
    $\sim (p \rightarrow q)$
3.  Coincide con la opción c.

---

### Pregunta 3

**Enunciado:**
La proposición: $[r \land \sim(p \rightarrow q)] \land \sim[p \land \sim(s \rightarrow q)]$ es verdadera. Los valores de verdad de las proposiciones p, q, r y s son respectivamente:

**Opciones:**
a) VFVF
b) VFVV
c) VFFV
d) VFFF
e) FFVF
**Marca Visual:** a

**Solución:**
1.  El operador principal es $\land$ (y) y el resultado es Verdadero. Por tanto, ambos corchetes deben ser Verdaderos.
2.  **Primer Corchete:** $[r \land \sim(p \rightarrow q)] \equiv V$
    *   $r \equiv V$
    *   $\sim(p \rightarrow q) \equiv V \Rightarrow (p \rightarrow q) \equiv F$.
    *   Para que un condicional sea falso, el antecedente es V y el consecuente F:
    *   $p \equiv V$
    *   $q \equiv F$
3.  **Segundo Corchete:** $\sim[p \land \sim(s \rightarrow q)] \equiv V$
    *   Lo de adentro debe ser Falso: $[p \land \sim(s \rightarrow q)] \equiv F$.
    *   Sabemos que $p \equiv V$. Para que la conjunción ($V \land \dots$) sea F, el segundo término debe ser F.
    *   $\sim(s \rightarrow q) \equiv F \Rightarrow (s \rightarrow q) \equiv V$.
    *   Sabemos que $q \equiv F$. Entonces $(s \rightarrow F) \equiv V$.
    *   Para que un condicional sea Verdadero con consecuente Falso, el antecedente ($s$) debe ser Falso.
    *   $s \equiv F$.
4.  **Resumen:**
    p=V, q=F, r=V, s=F.
    Opción a.

---

### Pregunta 4

**Enunciado:**
Si la proposición: $[(\sim p \lor q) \rightarrow (q \leftrightarrow r)] \lor (q \land s)$ es falsa, siendo p una proposición verdadera, determine los valores de verdad de q, r, s en ese orden.

**Opciones:**
a) VVV
b) VFV
c) VFF
d) FFV
e) FFF
**Marca Visual:** c

**Solución:**
1.  El operador principal es $\lor$ (o) y el resultado es Falso. Por tanto, ambos términos deben ser Falsos.
    *   Term 1 (Izquierda): $[(\sim p \lor q) \rightarrow (q \leftrightarrow r)] \equiv F$
    *   Term 2 (Derecha): $(q \land s) \equiv F$
2.  Analizamos Term 1 con el dato $p \equiv V$:
    *   $\sim p \equiv F$.
    *   Antecedente: $(\sim p \lor q) \equiv (F \lor q) \equiv q$.
    *   Para que el condicional $q \rightarrow (q \leftrightarrow r)$ sea Falso, el antecedente ($q$) debe ser Verdadero y el consecuente Falso.
    *   $\Rightarrow q \equiv V$.
    *   Consecuente: $(q \leftrightarrow r) \equiv F$. Como $q \equiv V$, para que el bicondicional sea falso, $r$ debe ser diferente.
    *   $\Rightarrow r \equiv F$.
3.  Analizamos Term 2: $(q \land s) \equiv F$.
    *   Sabemos $q \equiv V$.
    *   $V \land s \equiv F \Rightarrow s \equiv F$.
4.  **Resumen:**
    q=V, r=F, s=F.
    Opción c.

---

### Pregunta 5

**Enunciado:**
Si la proposición compuesta $(p \land q) \rightarrow (\sim r \land p)$ es falsa, indicar los valores de verdad de:
I) $t \rightarrow q$
II) $r \lor s$
III) $w \land \sim p$

**Opciones:**
a) VFV
b) FFV
c) FVV
d) VVF
e) FFF
**Marca Visual:** d

**Solución:**
1.  Condición $(p \land q) \rightarrow (\sim r \land p) \equiv F$.
    *   Antecedente V: $(p \land q) \equiv V \Rightarrow p \equiv V, q \equiv V$.
    *   Consecuente F: $(\sim r \land p) \equiv F$.
    *   Como $p \equiv V$, queda $\sim r \land V \equiv F \Rightarrow \sim r \equiv F \Rightarrow r \equiv V$.
    *   Valores: p=V, q=V, r=V.
2.  Evaluamos las proposiciones pedidas:
    *   **I) $t \rightarrow q$:** $t \rightarrow V$. Un condicional con consecuente verdadero siempre es Verdadero. **(V)**
    *   **II) $r \lor s$:** $V \lor s$. Una disyunción con un verdadero siempre es Verdadera. **(V)**
    *   **III) $w \land \sim p$:** $w \land \sim V \equiv w \land F$. Una conjunción con un falso siempre es Falsa. **(F)**
3.  Resultado: VVF.
    Opción d.

---

### Pregunta 6

**Enunciado:**
Si: $p \rightarrow (q \rightarrow r)$ y $q \leftrightarrow (p \rightarrow t)$ son proposiciones falsas, indicar el valor de verdad de las siguientes proposiciones:
I) $\sim t \land (r \rightarrow w)$
II) $q \lor (\sim r \leftrightarrow u)$
III) $t \rightarrow (s \Delta r)$

**Opciones:**
a) VVV
b) VVF
c) VFV
d) FVV
e) FFF
**Marca Visual:** a

**Solución:**
1.  Dato 1: $p \rightarrow (q \rightarrow r) \equiv F$.
    *   $p \equiv V$.
    *   $(q \rightarrow r) \equiv F \Rightarrow q \equiv V, r \equiv F$.
    *   Valores parciales: p=V, q=V, r=F.
2.  Dato 2: $q \leftrightarrow (p \rightarrow t) \equiv F$.
    *   Reemplazamos valores conocidos: $V \leftrightarrow (V \rightarrow t) \equiv F$.
    *   Para que el bicondicional sea falso con un lado V, el otro lado debe ser F.
    *   $(V \rightarrow t) \equiv F \Rightarrow t \equiv F$.
    *   Valores finales: p=V, q=V, r=F, t=F.
3.  Evaluamos I, II, III:
    *   **I) $\sim t \land (r \rightarrow w)$:**
        $\sim F \land (F \rightarrow w) \equiv V \land V \equiv V$. **(V)**
    *   **II) $q \lor (\sim r \leftrightarrow u)$:**
        $V \lor (\dots) \equiv V$. **(V)**
    *   **III) $t \rightarrow (s \Delta r)$:**
        $F \rightarrow (\dots) \equiv V$. **(V)**
4.  Resultado: VVV.
    Opción a.

---

### Pregunta 7

**Enunciado:**
Dada la proposición: $\sim [(r \lor q) \rightarrow (r \rightarrow p)] \equiv V$, donde se sabe que $q$ es una proposición falsa.
Halle el valor de verdad de las siguientes proposiciones:
I. $r \rightarrow (\sim p \lor \sim q)$
II. $[r \leftrightarrow (p \land q)] \leftrightarrow (q \land \sim p)$
III. $(r \lor \sim p) \land (q \lor p)$

**Opciones:**
a) VVV
b) VVF
c) VFF
d) FFF
e) FFV
**Marca Visual:** b

**Solución:**
1.  Del enunciado: $\sim [\dots] \equiv V \Rightarrow [(r \lor q) \rightarrow (r \rightarrow p)] \equiv F$.
    *   Antecedente Verdadero: $(r \lor q) \equiv V$. Como $q \equiv F$, entonces **$r \equiv V$**.
    *   Consecuente Falso: $(r \rightarrow p) \equiv F$. Como $r \equiv V$, entonces **$p \equiv F$**.
    *   Valores: $p=F, q=F, r=V$.
2.  Evaluamos las proposiciones:
    *   **I.** $r \rightarrow (\sim p \lor \sim q) \equiv V \rightarrow (V \lor V) \equiv V \rightarrow V \equiv \mathbf{V}$.
    *   **II.** $[V \leftrightarrow (F \land F)] \leftrightarrow (F \land V) \equiv [V \leftrightarrow F] \leftrightarrow F \equiv F \leftrightarrow F \equiv \mathbf{V}$.
    *   **III.** $(V \lor V) \land (F \lor F) \equiv V \land F \equiv \mathbf{F}$.
3.  Resultado: VVF.
    Opción b.

---

### Pregunta 8

**Enunciado:**
Se sabe que $(p \land q)$ y $(q \rightarrow t)$ son falsas.
De los esquemas moleculares siguientes:
$A = (\sim p \lor t) \lor \sim q$
$B = \sim [p \land (\sim q \lor \sim p)]$
$C = [(p \rightarrow q) \land \sim (q \land t)] \leftrightarrow [\sim p \lor (q \land \sim t)]$
¿Cuáles son verdaderos?

**Opciones:**
a) A, B y C
b) A y C
c) B y C
d) Solo B
e) Solo C
**Marca Visual:** a

**Solución:**
1.  Valores de verdad:
    *   $(p \land q) \equiv F$.
    *   $(q \rightarrow t) \equiv F \Rightarrow q \equiv V, t \equiv F$.
    *   Reemplazando $q=V$ en la primera: $(p \land V) \equiv F \Rightarrow p \equiv F$.
    *   Valores: **$p=F, q=V, t=F$**.
2.  Evaluamos esquemas:
    *   **A**: $(\sim F \lor F) \lor \sim V \equiv (V \lor F) \lor F \equiv V \lor F \equiv \mathbf{V}$.
    *   **B**: $\sim [F \land (\dots)]$. Una conjunción que empieza con Falso es Falsa. Negación de Falso es Verdadero. $\sim[F] \equiv \mathbf{V}$.
    *   **C**:
        *   Izquierda: $[(F \rightarrow V) \land \sim (V \land F)] \equiv [V \land \sim F] \equiv [V \land V] \equiv V$.
        *   Derecha: $[\sim F \lor (\dots)] \equiv [V \lor \dots] \equiv V$.
        *   Total: $V \leftrightarrow V \equiv \mathbf{V}$.
3.  Los tres (A, B y C) son verdaderos.
    Opción a.

---

### Pregunta 9

**Enunciado:**
La proposición $(p \land q) \rightarrow (q \rightarrow r)$ es falsa, y se tienen los esquemas moleculares:
$A = \sim(q \lor r) \lor (p \lor q)$
$B = (p \lor \sim q) \rightarrow (\sim r \land q)$
$C = p \leftrightarrow \sim[q \rightarrow \sim(p \rightarrow r)]$
¿Cuáles son falsos?

**Opciones:**
a) solo A
b) solo B
c) solo C
d) A y B
e) A, B y C
**Marca Visual:** c

**Solución:**
1.  Enunciado: $(p \land q) \rightarrow (q \rightarrow r) \equiv F$.
    *   Antecedente V: $(p \land q) \equiv V \Rightarrow p \equiv V, q \equiv V$.
    *   Consecuente F: $(q \rightarrow r) \equiv F \Rightarrow q \equiv V, r \equiv F$.
    *   Valores: **$p=V, q=V, r=F$**.
2.  Evaluamos esquemas:
    *   **A**: $\sim(V \lor F) \lor (V \lor V) \equiv \sim V \lor V \equiv F \lor V \equiv \mathbf{V}$.
    *   **B**: $(V \lor F) \rightarrow (V \land V) \equiv V \rightarrow V \equiv \mathbf{V}$.
    *   **C**:
        *   Dentro del corchete: $[q \rightarrow \sim(p \rightarrow r)] \equiv [V \rightarrow \sim(V \rightarrow F)] \equiv [V \rightarrow \sim F] \equiv [V \rightarrow V] \equiv V$.
        *   Negación del corchete: $\sim V \equiv F$.
        *   Total: $p \leftrightarrow F \Rightarrow V \leftrightarrow F \equiv \mathbf{F}$.
3.  Pregunta "¿Cuáles son falsos?".
    Solo C es falso.
    Opción c.

---

### Pregunta 10

**Enunciado:**
Hallar los valores de verdad de p, q, r si se sabe que:
$\neg[(p \rightarrow q) \lor (r \rightarrow q)] \land [(\neg p \lor q) \rightarrow \neg(q \rightarrow p)]$ es verdadero.

**Opciones:**
a) VFV
b) VFF
c) FVV
d) FVF
e) VVF
**Marca Visual:** a

**Solución:**
1.  Operador principal $\land$ es Verdadero, entonces ambos corchetes son Verdaderos.
2.  **Primer corchete:** $\neg[(p \rightarrow q) \lor (r \rightarrow q)] \equiv V$.
    *   Lo de adentro es Falso: $[(p \rightarrow q) \lor (r \rightarrow q)] \equiv F$.
    *   Para que un $\lor$ sea falso, ambos deben ser falsos.
    *   $(p \rightarrow q) \equiv F \Rightarrow \mathbf{p \equiv V, q \equiv F}$.
    *   $(r \rightarrow q) \equiv F$. Como $q \equiv F$, queda $(r \rightarrow F) \equiv F \Rightarrow \mathbf{r \equiv V}$.
    *   Valores tentativos: p=V, q=F, r=V.
3.  **Segundo corchete (Verificación):** $[(\neg p \lor q) \rightarrow \neg(q \rightarrow p)]$.
    *   Reemplazamos: $[(\neg V \lor F) \rightarrow \neg(F \rightarrow V)]$.
    *   $[ (F \lor F) \rightarrow \neg(V) ]$.
    *   $[ F \rightarrow F ]$.
    *   $V$. (Verdadero).
    *   Se cumple la condición.
4.  Resultado: VFV.
    Opción a.

---

### Pregunta 11

**Enunciado:**
Si la proposición $(q \rightarrow p) \rightarrow (r \lor p)$ es falsa, hallar el valor de verdad de cada uno de las siguientes proposiciones (en ese orden):
$A = (p \land x) \rightarrow (m \leftrightarrow y)$
$B = (q \rightarrow n) \lor (x \land y)$
$C = (r \leftrightarrow p) \rightarrow (s \land q)$

**Opciones:**
a) VVV
b) VVF
c) VFF
d) FVV
e) FFV
**Marca Visual:** b

**Solución:**
1.  Condición inicial: $(q \rightarrow p) \rightarrow (r \lor p) \equiv F$.
    *   Antecedente V: $(q \rightarrow p) \equiv V$.
    *   Consecuente F: $(r \lor p) \equiv F$.
    *   Para que un $\lor$ sea Falso, ambos deben ser Falsos: **$r \equiv F, p \equiv F$**.
    *   Volviendo al antecedente: $(q \rightarrow F) \equiv V$. Para que esto sea Verdadero, el antecedente $q$ debe ser Falso.
    *   Valores: **$p=F, q=F, r=F$**.
2.  Evaluamos A, B, C:
    *   **A:** $(F \land x) \rightarrow (\dots) \equiv F \rightarrow (\dots) \equiv \mathbf{V}$. (Falso implica cualquier cosa es Verdadero).
    *   **B:** $(F \rightarrow n) \lor (\dots) \equiv V \lor (\dots) \equiv \mathbf{V}$. (Verdadero o cualquier cosa es Verdadero).
    *   **C:** $(F \leftrightarrow F) \rightarrow (s \land F) \equiv V \rightarrow F \equiv \mathbf{F}$.
3.  Resultado: VVF.
    Opción b.

---

### Pregunta 12

**Enunciado:**
Sabiendo que el valor de verdad de la proposición compuesta:
$\{\sim [(p \land r) \rightarrow q] \land [(p \lor q) \Delta s]\} \rightarrow [(s \Delta p) \rightarrow t]$
es siempre falso. Determinar el valor de verdad de p, q, r, s, t.

**Opciones:**
a) VVVV
b) VVFF
c) VFFF
d) VFVFF
e) FFVV
**Marca Visual:** c (posible error de imagen o interpretación, resultado VFVFF corresponde a d)

**Solución:**
1.  Condicional principal FALSA:
    *   Antecedente Verdadero.
    *   Consecuente Falso: $[(s \Delta p) \rightarrow t] \equiv F \Rightarrow (s \Delta p) \equiv V, t \equiv F$.
2.  Antecedente Verdadero (Conjunción):
    *   Parte 1: $\sim [(p \land r) \rightarrow q] \equiv V \Rightarrow [(p \land r) \rightarrow q] \equiv F$.
        *   $(p \land r) \equiv V \Rightarrow p \equiv V, r \equiv V$.
        *   $q \equiv F$.
    *   Parte 2: $[(p \lor q) \Delta s] \equiv V$.
        *   $(V \lor F) \Delta s \equiv V \Delta s \equiv V$.
        *   Para que $V \Delta s$ sea Verdadero, $s$ debe ser Falso.
        *   $s \equiv F$.
3.  Verificación de $(s \Delta p) \equiv (F \Delta V) \equiv V$. Correcto.
4.  Resultado: $p=V, q=F, r=V, s=F, t=F$.
    Orden: VFVFF.
    (Opción d).

---

### Pregunta 13

**Enunciado:**
Si: $(p \leftrightarrow q)$ es falsa; los valores de verdad de:
$M = r \rightarrow (p \Delta q)$
$N = (p \land q) \rightarrow s$
$R = (p \lor q) \leftrightarrow (p \land q)$
respectivamente son:

**Opciones:**
a) VVV
b) VFV
c) FVF
d) FVV
e) VVF
**Marca Visual:** e

**Solución:**
1.  Dato: $(p \leftrightarrow q) \equiv F \Rightarrow p \neq q$.
2.  Evaluamos M: $r \rightarrow (p \Delta q)$.
    *   $(p \Delta q)$: "p diferente de q", es Verdadero.
    *   $r \rightarrow V \equiv \mathbf{V}$.
3.  Evaluamos N: $(p \land q) \rightarrow s$.
    *   $(p \land q)$: Como son diferentes, uno es Falso, así que es Falso.
    *   $F \rightarrow s \equiv \mathbf{V}$.
4.  Evaluamos R: $(p \lor q) \leftrightarrow (p \land q)$.
    *   $(p \lor q) \equiv V$ (al menos uno es V).
    *   $(p \land q) \equiv F$ (al menos uno es F).
    *   $V \leftrightarrow F \equiv \mathbf{F}$.
5.  Resultado: VVF.
    Opción e.

---

### Pregunta 14

**Enunciado:**
Si la proposición compuesta:
$\sim [(p \land \sim r) \rightarrow (r \Delta \sim q)]$ es verdadera,
hallar el valor de verdad de las proposiciones p, q y r respectivamente.

**Opciones:**
a) VVF
b) FVV
c) VFV
d) FVF
e) FFV
**Marca Visual:** a

**Solución:**
1.  Enunciado: $\sim [\dots] \equiv V \Rightarrow [(p \land \sim r) \rightarrow (r \Delta \sim q)] \equiv F$.
2.  Antecedente V: $(p \land \sim r) \equiv V \Rightarrow p \equiv V, r \equiv F$.
3.  Consecuente F: $(r \Delta \sim q) \equiv F$.
    *   $(F \Delta \sim q) \equiv F$. Deben ser iguales.
    *   $\sim q \equiv F \Rightarrow q \equiv V$.
4.  Resultado: $p=V, q=V, r=F$. (VVF).
    Opción a.

---

### Pregunta 15

**Enunciado:**
Si "t" es falsa y la proposición:
$\sim \{(r \lor s) \rightarrow [(p \land \sim s) \rightarrow (p \land \sim q)]\} \Delta (t \land q)$
es verdadera, hallar los valores de verdad de "p", "q", "r" y "s" respectivamente.

**Opciones:**
a) FVFF
b) VVFF
c) VFFF
d) VVVF
e) VFVF
**Marca Visual:** Según análisis, d.

**Solución:**
1.  Dato: $t \equiv F$.
2.  Prop. Principal: $\{ \dots \} \Delta (t \land q) \equiv V$.
    *   Lado derecho: $(F \land q) \equiv F$.
    *   Para que $\dots \Delta F \equiv V$, el lado izquierdo debe ser Verdadero.
    *   $\sim \{ \dots \} \equiv V \Rightarrow \{ (r \lor s) \rightarrow [\dots] \} \equiv F$.
3.  Condicional Falso:
    *   Antecedente: $(r \lor s) \equiv V$.
    *   Consecuente: $[(p \land \sim s) \rightarrow (p \land \sim q)] \equiv F$.
4.  Del Consecuente Falso (segundo condicional):
    *   Antecedente: $(p \land \sim s) \equiv V \Rightarrow \mathbf{p \equiv V, s \equiv F}$.
    *   Consecuente: $(p \land \sim q) \equiv F$. Como $p \equiv V$, entonces $\sim q \equiv F \Rightarrow \mathbf{q \equiv V}$.
5.  Volviendo al primer Antecedente:
    *   $(r \lor s) \equiv V$. Como $s \equiv F$, entonces $\mathbf{r \equiv V}$.
6.  Valores: $p=V, q=V, r=V, s=F$.
    Orden: VVVF.
    Opción d.

---

### Pregunta 16

**Enunciado:**
Sean: $(p \land q) \equiv V$, $(q \rightarrow t) \equiv V$ y
$A = [(p \lor q) \land (r \rightarrow q)] \rightarrow \sim t$
$B = [(\sim p \rightarrow w) \land q]$
$C = \sim(w \lor t) \rightarrow t$.
Son verdaderas:

**Opciones:**
a) Solo A y B
b) Solo A y C
c) Solo B y C
d) Solo A
e) Solo B
**Marca Visual:** Según análisis, c.

**Solución:**
1.  Datos:
    *   $(p \land q) \equiv V \Rightarrow p \equiv V, q \equiv V$.
    *   $(q \rightarrow t) \equiv V \Rightarrow (V \rightarrow t) \equiv V \Rightarrow t \equiv V$.
    *   Valores: $p=V, q=V, t=V$.
2.  Evaluamos esquemas:
    *   **A:** $[(V \lor V) \land (r \rightarrow V)] \rightarrow \sim V$.
        *   $[V \land V] \rightarrow F$.
        *   $V \rightarrow F \equiv \mathbf{F}$.
    *   **B:** $[(\sim V \rightarrow w) \land V]$.
        *   $[(F \rightarrow w) \land V]$.
        *   $[V \land V] \equiv \mathbf{V}$.
    *   **C:** $\sim(w \lor V) \rightarrow V$.
        *   $\sim(V) \rightarrow V$.
        *   $F \rightarrow V \equiv \mathbf{V}$.
3.  Verdaderas: B y C.
    Opción c.

---

### Pregunta 17

**Enunciado:**
Dada la proposición:
$\sim [(r \lor q) \rightarrow (r \rightarrow p)] \equiv V$
donde se sabe que q es una proposición falsa. Halle el valor de verdad de las siguientes proposiciones:
I. $r \rightarrow (\sim s \lor \sim q)$
II. $[r \leftrightarrow (p \land s)] \leftrightarrow (q \land \sim t)$
III. $(t \lor \sim p) \land (q \lor p)$

**Opciones:**
a) VVV
b) VVF
c) VFF
d) FFF
e) FFV
**Marca Visual:** Según análisis, b.

**Solución:**
1.  Enunciado equivalente a Pregunta 7. $\sim[\dots] \equiv V \Rightarrow \dots \equiv F$.
    *   $(r \lor q) \equiv V$ (con $q \equiv F \Rightarrow r \equiv V$).
    *   $(r \rightarrow p) \equiv F$ (con $r \equiv V \Rightarrow p \equiv F$).
    *   Valores: $p=F, q=F, r=V$.
2.  Evaluamos Items (considerando nuevas variables s, t pueden ser cualquiera):
    *   **I.** $r \rightarrow (\sim s \lor \sim q)$.
        *   $V \rightarrow (\sim s \lor \sim F) \equiv V \rightarrow (\sim s \lor V) \equiv V \rightarrow V \equiv \mathbf{V}$.
    *   **II.** $[r \leftrightarrow (p \land s)] \leftrightarrow (q \land \sim t)$.
        *   $[V \leftrightarrow (F \land s)] \leftrightarrow (F \land \sim t)$.
        *   $[V \leftrightarrow F] \leftrightarrow F$.
        *   $F \leftrightarrow F \equiv \mathbf{V}$.
    *   **III.** $(t \lor \sim p) \land (q \lor p)$.
        *   $(t \lor \sim F) \land (F \lor F)$.
        *   $(t \lor V) \land F$.
        *   $V \land F \equiv \mathbf{F}$.
3.  Resultado: VVF.
    Opción b.

---

### Pregunta 18

**Enunciado:**
Se definen las proposiciones $p \# q \equiv \sim p \land q$, $p \theta q \equiv p \lor \sim q$.
Además la proposición: $\sim [(q \# p) \rightarrow (q \theta r)]$ es verdadera. Halle los valores de verdad de p, q y r.

**Opciones:**
a) VFV
b) FVV
c) VVV
d) VVF
e) FFF
**Marca Visual:** Según análisis, a.

**Solución:**
1.  Condición: $\sim [(q \# p) \rightarrow (q \theta r)] \equiv V \Rightarrow [(q \# p) \rightarrow (q \theta r)] \equiv F$.
2.  Condicional Falso:
    *   Antecedente V: $(q \# p) \equiv V$.
        *   Definición $\#$: $\sim q \land p \equiv V$.
        *   $\Rightarrow q \equiv F, p \equiv V$.
    *   Consecuente F: $(q \theta r) \equiv F$.
        *   Definición $\theta$: $q \lor \sim r \equiv F$.
        *   Reemplazamos $q=F$: $F \lor \sim r \equiv F \Rightarrow \sim r \equiv F \Rightarrow r \equiv V$.
3.  Valores: $p=V, q=F, r=V$.
    Opción a.

---

### Pregunta 19

**Enunciado:**
Sabiendo que:
$p \sqcap q \equiv p \lor \sim q$ y $p \circ q \equiv \sim p \land \sim q$.
Señale los valores de las combinaciones (VV, VF, FV, FF) para:
$(p \sqcap q) \circ (p \circ q)$

**Opciones:**
a) VVVV
b) FFVF
c) FFPV
d) VFVF
e) VVVF
**Marca Visual:** b

**Solución:**
1.  Simplificamos la expresión:
    *   Sea $A = (p \sqcap q) = p \lor \sim q$.
    *   Sea $B = (p \circ q) = \sim p \land \sim q = \sim(p \lor q)$ (Ley de Morgan).
    *   Hallamos $A \circ B$: Por definición es $\sim A \land \sim B$.
2.  Calculamos $\sim A$ y $\sim B$:
    *   $\sim A = \sim(p \lor \sim q) = \sim p \land q$.
    *   $\sim B = \sim(\sim p \land \sim q) = p \lor q$.
3.  Operamos $\sim A \land \sim B$:
    *   $(\sim p \land q) \land (p \lor q)$.
    *   Distribuimos: $[(\sim p \land q) \land p] \lor [(\sim p \land q) \land q]$.
    *   Primer término: $\sim p \land p \land q \equiv F \land q \equiv F$.
    *   Queda solo el segundo término: $\sim p \land q$.
4.  Tabla de verdad de $\sim p \land q$:
    *   VV (p=V, q=V): $\sim V \land V = F \land V = F$.
    *   VF (p=V, q=F): $\sim V \land F = F \land F = F$.
    *   FV (p=F, q=V): $\sim F \land V = V \land V = V$.
    *   FF (p=F, q=F): $\sim F \land F = V \land F = F$.
5.  Resultado Final (Columna): FFVF.
    Opción b.

---

### Pregunta 20

**Enunciado:**
Si el esquema es F, señale el valor de p, q, r, s y t, en ese orden:
$[(p \leftrightarrow q) \rightarrow (s \lor p)] \lor [(q \Delta r) \rightarrow (\sim s \land t)]$

**Opciones:**
a) VVVVV
b) FFVVF
c) FFFVF
d) FFFFF
e) FFVFF
**Marca Visual:** e

**Solución:**
1.  Esquema Disyuntivo ($\lor$) es Falso $\Rightarrow$ Ambos términos son falsos.
2.  **Término 1:** $[(p \leftrightarrow q) \rightarrow (s \lor p)] \equiv F$.
    *   Antecedente V: $(p \leftrightarrow q) \equiv V \Rightarrow p \equiv q$.
    *   Consecuente F: $(s \lor p) \equiv F \Rightarrow \mathbf{s \equiv F, p \equiv F}$.
    *   Como $p \equiv q$, entonces $\mathbf{q \equiv F}$.
3.  **Término 2:** $[(q \Delta r) \rightarrow (\sim s \land t)] \equiv F$.
    *   Antecedente V: $(q \Delta r) \equiv V$. Sabemos $q \equiv F$, así que $F \Delta r \equiv V$. Para que esto ocurra, $r$ debe ser diferente de F. $\Rightarrow \mathbf{r \equiv V}$.
    *   Consecuente F: $(\sim s \land t) \equiv F$. Sabemos $s \equiv F \Rightarrow \sim s \equiv V$.
    *   Queda $V \land t \equiv F \Rightarrow \mathbf{t \equiv F}$.
4.  Valores finales:
    *   p = F
    *   q = F
    *   r = V
    *   s = F
    *   t = F
5.  Orden p,q,r,s,t: FFVFF.
    Opción e.

---

### Pregunta 21

**Enunciado:**
¿Sabiendo que la proposición p es verdadera en cuáles de los siguientes casos es suficiente dicha información para determinar el valor de las siguientes proposiciones?

I) $(p \lor q) \leftrightarrow (\sim p \land \sim q)$
II) $(p \land q) \rightarrow (p \lor r)$
III) $(p \rightarrow q) \rightarrow r$

**Opciones:**
a) Sólo I
b) Sólo II
c) I y II
d) I y III
e) I, II y III
**Marca Visual:** c

**Solución:**
1.  Dato: $p \equiv V$.
2.  Analizamos casos:
    *   **I)** $(V \lor q) \leftrightarrow (\sim V \land \sim q)$.
        *   Izquierda: $V \lor q \equiv V$.
        *   Derecha: $F \land \sim q \equiv F$.
        *   $V \leftrightarrow F \equiv F$.
        *   **Sí se determina** (siempre es Falso).
    *   **II)** $(V \land q) \rightarrow (V \lor r)$.
        *   Derecha: $V \lor r \equiv V$.
        *   Algo $\rightarrow V$ siempre es Verdadero.
        *   **Sí se determina** (siempre es Verdadero).
    *   **III)** $(V \rightarrow q) \rightarrow r$.
        *   $q \rightarrow r$.
        *   Depende de los valores de q y r.
        *   **No se determina**.
3.  Conclusión: I y II son suficientes.
    Opción c.
