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

Entregable: Código limpio para los 3 archivos (serializers.py, views.py, urls.py) y una explicación breve de qué es un "Nested Serializer".
```
