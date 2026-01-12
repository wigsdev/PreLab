📜 NORMATIVA DE DESARROLLO Y GESTIÓN DE VERSIONES (V1.0)
Proyecto: PreLab (Simulacros Preuniversitarios) Lead Developer: [Tu Nombre]

1. Filosofía del Código (Mindset)
   Antes de escribir una línea, interioriza estos tres principios:

Mobile First Absoluto: No diseñamos para PC y "luego lo achicamos". Diseñamos para una pantalla de 360px. Si no cabe en el celular, no existe.

Código en Inglés, Documentación en Español:

Variables, Funciones, Clases: Question, get_user_score(), ExamAttempt. (Estándar global).

Comentarios y Documentación: "Calcula el puntaje basado en ponderado UNI". (Para tu entendimiento y equipo local).

Atomicidad: Una función hace UNA sola cosa. Un archivo tiene UNA sola responsabilidad. Un Commit resuelve UN solo problema.

2. Estrategia de Git (Gitflow Workflow)
   No trabajaremos todo en una sola rama. Usaremos un sistema de ramas estricto para proteger el código que funciona (Producción) del código en desarrollo (Bugs).

Shutterstock

🌳 Estructura de Ramas (Branches)
main (Sagrada):

Contiene únicamente código listo para producción.

PROHIBIDO hacer git push directo aquí. Solo recibe código vía Pull Request desde develop o hotfix.

Cada vez que se toca esta rama, es porque se lanza una nueva versión (v1.0, v1.1).

develop (La Verdad):

Es la rama principal de desarrollo. Aquí se integran todas las nuevas funcionalidades.

Todo lo que está aquí funciona, pero puede estar incompleto visualmente.

feature/nombre-funcionalidad:

Ramas temporales. Nacen de develop y mueren (se borran) al terminar la tarea.

Ejemplo: feature/auth-login, feature/modelo-preguntas.

hotfix/nombre-error:

Solo para emergencias en producción. Nacen de main y se fusionan a main y develop.

3. Estándar de Commits (Conventional Commits)
   Olvídate de mensajes como "avances", "fix", o "cambios". Usaremos el estándar Conventional Commits para generar historiales legibles y automatizar notas de versión en el futuro.

Formato: <tipo>(<alcance>): <descripción breve>
**Idioma: Español.**

Tipos permitidos:
feat: Una nueva funcionalidad (ej. feat(auth): login con google).

fix: Solución a un error (ej. fix(exam): error calculo puntaje negativo).

docs: Cambios solo en documentación.

style: Formato, espacios, puntos y comas (no cambia lógica).

refactor: Cambio de código que no arregla bugs ni añade features (limpieza).

chore: Tareas de mantenimiento (actualizar librerías, configurar .gitignore).

Ejemplo de un buen historial:

Plaintext

feat(ui): agregar componente de tarjeta de pregunta
fix(backend): corregir error en migracion de usuarios
docs(readme): actualizar instrucciones de instalacion 4. Flujo de Trabajo (The Workflow)
Cada vez que te sientes a programar, sigue este ritual:

Sincronizar: git checkout develop -> git pull origin develop.

Crear Rama: git checkout -b feature/nueva-funcionalidad.

Programar: Escribe tu código.

Guardar (Commit): Haz commits pequeños y frecuentes. No esperes al final del día.

Publicar: git push origin feature/nueva-funcionalidad.

Pull Request (PR):

Ve a GitHub. Crea un "Pull Request" de tu rama hacia develop.

Autoevaluación: Revisa tus propios cambios. Si ves código comentado o print() olvidados, bórralos.

Acepta el Merge.

5. Estándares de Código (Python/Django & React)
   Backend (Python/Django)
   PEP8: Respetar los espacios y la indentación.

Type Hints: Obligatorio tipar los argumentos y retornos. Ayuda a entender el código meses después.

Python

# Mal

def calcular(a, b):
return a + b

# Bien (Production Ready)

def calcular*puntaje(correctas: int, incorrectas: int) -> float:
return (correctas * 20) - (incorrectas \_ 1.5)
Settings: NUNCA subir claves secretas (SECRET_KEY, DB passwords) al repositorio. Usar siempre variables de entorno (.env).

Frontend (React)
Componentes Funcionales: Usar siempre Arrow Functions.

Lógica separada: Si un componente tiene mucha lógica matemática, sacar esa lógica a un archivo utils.js o un hook personalizado.

Tailwind: Usar clases utilitarias, pero si una combinación se repite mucho, usar @apply en CSS o crear un componente pequeño.

6. Versionamiento (SemVer)
   Cuando el proyecto llegue a producción, usaremos tres números: X.Y.Z (Ej. 1.0.0).

X (Major): Cambio radical que rompe compatibilidad (ej. Rediseño total de la BD).

Y (Minor): Nueva funcionalidad compatible (ej. Agregar curso de "Filosofía").

Z (Patch): Arreglo de bugs compatible (ej. Corregir un texto mal escrito).
