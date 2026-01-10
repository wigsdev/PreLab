# 🧠 Prompts Maestros del Proyecto

Este documento almacena los "Prompts Maestros" utilizados para generar y guiar el desarrollo de cada versión. Sirve como registro histórico y guía de estilo para interactuar con el Agente.

## 📦 v0.1.0: Inicialización ("Genesis")

**Objetivo:** Configuración de estructura, entorno y "Hello World" de Django.

```markdown
🟢 PROMPT: Inicialización del Proyecto (v0.1.0)
Rol: Actúa como un Senior Python Developer y DevOps especializado en arquitecturas escalables.

Contexto: Estamos iniciando el proyecto "PreLab" (Plataforma de simulacros preuniversitarios). El objetivo actual es completar la versión v0.1.0 (Genesis). Necesito configurar el entorno de desarrollo local con una arquitectura separada (Monorepo):

- backend/: Django + DRF.
- frontend/: React (se configurará luego, solo crear carpeta).

Instrucciones: Genera un script de Bash (comandos de terminal) secuencial y comentado para realizar lo siguiente:

1. Estructura de Directorios:
   - Crear carpeta raíz prelab_project.
   - Dentro, crear carpetas backend, frontend y docs.

2. Entorno Python (Backend):
   - Navegar a backend.
   - Crear entorno virtual llamado venv.
   - Importante: Incluir el comando para activar el entorno.

3. Instalación de Dependencias:
   - Instalar: django, djangorestframework, django-cors-headers (para conectar React), python-dotenv (variables de entorno) y Pillow (para imágenes).
   - Generar el archivo requirements.txt inmediatamente.

4. Inicialización de Django:
   - Crear el proyecto Django llamado config (usamos "config" para que no choque con el nombre del producto). 
   - Nota: Asegúrate de crearlo en la carpeta actual (.) para no anidar carpetas innecesariamente.

5. Configuración de Git:
   - Volver a la raíz del proyecto.
   - Inicializar repositorio Git (git init).
   - Crear un archivo .gitignore en la raíz que ignore: venv/, __pycache__/, db.sqlite3, .env, node_modules/ y archivos de sistema (.DS_Store).

Entregable: Proporcióname el bloque de código con los comandos listos para copiar y pegar en mi terminal (PowerShell o Bash). Al final, explícame brevemente por qué instalamos django-cors-headers.
```

### 🔍 Análisis de Implementación Real vs Prompt
*   **Estructura:** ✅ Cumple.
*   **Venv:** Diferencia menor. El prompt sugiere `backend/venv`, implementamos `root/venv` (más cómodo para IDEs en monorepos simples).
*   **Dependencias:** ⚠️ Faltantes.
    *   En implementación actual falta: `django-cors-headers` (Crítico para v0.3.0) y `Pillow` (Crítico para v0.2.0 soporte imágenes).
    *   Acción Correctiva: Se instalarán inmediatamente.

## 📚 v0.2.0: "The Librarian" (Base de Datos & Admin)

**Objetivo:** Implementación del Core del negocio (Modelos y Admin avanzado).

```markdown
🟡 PROMPT: Base de Datos y Admin Panel (v0.2.0)
Rol: Actúa como un Arquitecto de Software experto en Django y Modelado de Datos.

Contexto: Ya tenemos el proyecto config creado y el entorno virtual activo. Ahora necesitamos implementar la lógica de negocio "Core" para un sistema de exámenes.

Objetivo (Task):
1. Crear la aplicación core.
2. Definir los Modelos (Tablas) en models.py.
3. Configurar un Admin Panel avanzado en admin.py para cargar preguntas masivamente de forma fácil.

Instrucciones Paso a Paso:

Paso 1: Comandos de Terminal (Bash)
- Crear la app llamada core.

Paso 2: Código para core/models.py
- Entidades: Universidad, Curso, Tema, Pregunta (con dificultad y explicación), Opcion.
- Requisito: __str__ legible.

Paso 3: Código para core/admin.py
- Usa admin.TabularInline para Opcion.
- Filtros y búsqueda en PreguntaAdmin.

Paso 4: Registro y Migración
- Registrar 'core' en settings.py.
- Comandos para makemigrations, migrate y createsuperuser.

```markdown
🔵 PROMPT: Construcción de la API REST (v0.2.1)
Rol: Actúa como un Backend Developer especialista en Django REST Framework (DRF).

Estado Actual: Ya tenemos la app core con los modelos (Curso, Tema, Pregunta, Opcion) creados y migrados. Ya tenemos preguntas cargadas en la base de datos a través del Admin.

Objetivo: Crear los "endpoints" (puntos de acceso) para que el Frontend (React) pueda consultar estos datos. Por ahora, solo necesitamos leer datos (GET).

Instrucciones Paso a Paso:

1. Serializers (core/serializers.py):
   - Crea un archivo serializers.py en la app core.
   - Necesito un OpcionSerializer (que muestre solo el texto y si es correcta o no).
   - Necesito un PreguntaSerializer que incluya:
     - Los campos básicos (enunciado, imagen, etc.).
     - Importante: Debe incluir las opciones relacionadas (Nested Serializer) para que cuando pida una pregunta, vengan sus opciones ahí mismo.
   - Necesito TemaSerializer y CursoSerializer.

2. Vistas (core/views.py):
   - Vamos a usar ReadOnlyModelViewSet de DRF (porque por ahora el usuario no va a editar preguntas, solo leerlas).
   - Crea vistas para Curso, Tema y Pregunta.
   - Filtros: Asegúrate de que en la vista de Pregunta se pueda filtrar por tema (ej: ?tema=5).

3. Rutas (urls.py):
   - Crea un archivo core/urls.py.
   - Usa DefaultRouter para registrar las rutas automáticamente.
   - Dime cómo conectar estas rutas en el urls.py principal del proyecto (config/urls.py) usando include().

   - Dime cómo conectar estas rutas en el urls.py principal del proyecto (config/urls.py) usando include().

Entregable: Código limpio para los 3 archivos (serializers.py, views.py, urls.py) y una explicación breve de qué es un "Nested Serializer".
```

## 🎨 v0.3.0: "First Playable" (Frontend React)

**Objetivo:** Inicialización de React + Vite y creación de la primera experiencia de usuario (Resolver una pregunta).

```markdown
🔴 PROMPT: Frontend Mobile First (v0.3.0)
Rol: Actúa como un Senior Frontend Developer experto en React y UX Mobile.

Estado Actual:
Backend: Django API listo y corriendo en http://127.0.0.1:8000/api/.
Frontend: Carpeta frontend/ vacía.

Objetivo (Task): Inicializar la aplicación React y construir la interfaz de usuario para resolver un simulacro.

Instrucciones Paso a Paso:

Paso 1: Inicialización (Terminal) Dame los comandos de Bash para:
- Navegar a la carpeta raíz.
- Crear el proyecto React usando Vite dentro de la carpeta frontend (si la carpeta ya existe, usa la opción para instalar en el directorio actual o borra y crea).
- Instalar dependencias clave: axios (para consumir la API), clsx (para clases condicionales) y lucide-react (para íconos ligeros).
- Instalar y configurar Tailwind CSS (dame los comandos para generar el tailwind.config.js y qué debo poner en index.css).

Paso 2: Componente QuestionCard (El Corazón de la App) Crea el archivo src/components/QuestionCard.jsx.
- Diseño: Debe ocupar todo el ancho del móvil.
- Opciones: Deben ser botones grandes verticales (min-height: 48px para la "Thumb Zone").
- Lógica Visual:
  - Si el usuario toca una opción:
    - Si es correcta: Pinta el borde de verde 🟢.
    - Si es incorrecta: Pinta el borde de rojo 🔴 y muestra cuál era la correcta.
  - Feedback: Inmediatamente después de responder, muestra un cuadro con el texto de la explicacion (feedback educativo).
- Props: Debe recibir el objeto question y una función onNext para pasar a la siguiente.

Paso 3: Integración Básica (App.jsx) Modifica src/App.jsx para probar esto:
- Usa useEffect y axios para traer preguntas de tu API.
- Muestra la QuestionCard con la primera pregunta recibida.
- Agrega un botón "Siguiente" que solo aparezca después de responder.

Entregable:
Script de instalación, config de tailwind, QuestionCard.jsx y App.jsx.
```

## 🧠 v0.4.0: "The Engine" (Lógica de Sesión)

**Objetivo:** Implementación del "Game Loop" (Inicio -> Jugar -> Resultados) y persistencia local.

```markdown
🟡 PROMPT: Lógica del Motor de Examen y Persistencia (v0.4.0)
Rol: Actúa como un Senior React Developer especializado en "State Management" (Gestión de Estado).

Estado Actual:
Backend: API entrega preguntas.
Frontend: Tenemos QuestionCard.jsx mostrando una pregunta individual.

Objetivo (Task): Implementar la lógica completa de un "Micro-Simulacro" (10 preguntas) y la pantalla de Resultados.

Instrucciones Paso a Paso:

Paso 1: Custom Hook (useExamEngine.js) Necesito que separemos la lógica de la vista. Crea un hook personalizado src/hooks/useExamEngine.js que maneje:
- Estados: questions (array), currentIndex (int), score (int), isFinished (bool), loading (bool).
- Funciones:
  - startExam(temaId): Llama a la API, mezcla las preguntas (shuffle) y toma solo 10.
  - submitAnswer(isCorrect): Actualiza el puntaje y avanza al siguiente índice. Si es la última, marca isFinished = true.
  - resetExam(): Reinicia todo para jugar de nuevo.

Paso 2: Componente de Resultados (ResultsCard.jsx) Crea src/components/ResultsCard.jsx.
- Debe mostrarse cuando isFinished sea true.
- Diseño Mobile: Un círculo grande con la nota final (ej: "14/20").
- Mensaje Dinámico:
  - Si nota < 10: "Sigue practicando 😐"
  - Si nota > 15: "¡Eres un genio! 🚀"
- Persistencia (Clave): Al renderizarse, este componente debe guardar el resultado en el localStorage del navegador bajo la clave guest_history (para que el invitado vea su progreso luego).
- Botones: "Intentar de nuevo" y "Volver al Inicio".

Paso 3: Integración en App.jsx Actualiza el archivo principal para orquestar todo:
- Si loading: Muestra un spinner o texto "Cargando...".
- Si !isFinished: Muestra QuestionCard.
- Si isFinished: Muestra ResultsCard.

Entregable: Código de useExamEngine.js, ResultsCard.jsx y la actualización de App.jsx. Explícame brevemente cómo funciona el localStorage en este contexto.
```
## 🔐 v0.5.0: "Identity" (Autenticación JWT)

**Objetivo:** Gestión de usuarios y seguridad.

```markdown
🟣 PROMPT: Sistema de Autenticación (v0.5.0)
Objetivo: Implementar sistema de usuarios con JWT.
Stack: Django REST Framework SimpleJWT + React Context.
Requerimientos:
- Backend: Modelo CustomUser (email como user), endpoints /token y /register.
- Frontend: AuthContext para manejar tokens en localStorage.
- UI: Pantallas LoginView y RegisterView.
- Routing: Rutas protegidas (PrivateRoute simulado o redirección).
```

## 🎨 v0.6.0: "The Experience" (UI Polish & Dark Mode)

**Objetivo:** Mejorar la UX y añadir tema oscuro.

```markdown
🔵 PROMPT: Dark Mode y UI Kit (v0.6.0)
Objetivo: Implementar cambio de tema y mejorar componentes visuales.
Requerimientos:
- Tailwind: Configurar 'darkMode: class'.
- Hook: useTheme para persistencia en localStorage.
- UI: Navbar responsivo con toggle de tema.
- Feedback: Skeletons de carga (QuestionSkeleton).
```

## 💾 v0.7.0: "The Memory" (Persistencia Cloud)

**Objetivo:** Guardar resultados en base de datos.

```markdown
🟤 PROMPT: Persistencia de Historial (v0.7.0)
Objetivo: Endpoint y lógica para guardar exámenes de usuarios logueados.
Requerimientos:
- Backend: Modelo ExamAttempt (user, score, topic).
- API: Endpoint POST /api/history/ securizado.
- Frontend: Modificar ResultsCard para enviar datos si hay usuario.
- Fix: Manejar doble mount de React Query/Strict Mode (useRef flag).
```

## 📊 v0.8.0: "The Analytics" (Dashboard)

**Objetivo:** Visualización de progreso y estadísticas.

```markdown
📊 PROMPT: Dashboard de Estudiante y Visualización de Datos (v0.8.0)
Rol: Actúa como un Senior React Developer especializado en Dashboards y visualización de datos.

Estado Actual:
Backend: Endpoint GET /api/historial/ devuelve la lista de exámenes del usuario.
Frontend: Login funciona, pero no hay una pantalla "privada" donde el usuario vea su progreso.

Objetivo (Task): Crear la página de Perfil/Dashboard (src/pages/Dashboard.jsx) que muestre las estadísticas del usuario y su historial de exámenes.

Instrucciones Paso a Paso:

Paso 1: Servicio de Fetching (src/services/api.js)
Agrega la función getExamHistory() a nuestro servicio de API.
Debe hacer un GET al endpoint de historial enviando el token de autenticación.

Paso 2: Componente Dashboard.jsx (Diseño Mobile First)
Crea la página con esta estructura visual:

Header de Perfil:
Un saludo: "Hola, [Email del usuario]".

Tarjetas de Resumen (Stats): 3 cuadros pequeños en fila mostrando:
"Exámenes" (Total jugados).
"Promedio" (Nota media).
"Mejor Nota".

Lista de Historial (Timeline):
Una lista vertical scrolleable.
Cada ítem debe ser una tarjeta pequeña (HistoryItem) que muestre:
Nombre del Tema (ej: "Guerra del Pacífico").
Nota (ej: "14/20") con color (Verde si >11, Rojo si <11).
Fecha relativa (ej: "hace 2 horas").

Estado de Carga: Muestra un Skeleton o spinner mientras cargan los datos.
Estado Vacío: Si no hay exámenes, muestra un dibujo o texto animando a dar el primero.

Paso 3: Protección de Ruta (PrivateRoute)
Crea un componente src/components/PrivateRoute.jsx.
Lógica: Si hay usuario (user en AuthContext), renderiza el componente hijo (Dashboard). Si no, redirige a /login.
Implementa esta protección en App.jsx para la ruta /dashboard.

Entregable:
Código de Dashboard.jsx (incluyendo la lógica para calcular el promedio simple en el frontend).
Código de PrivateRoute.jsx.
Actualización de App.jsx con la nueva ruta protegida.
```
