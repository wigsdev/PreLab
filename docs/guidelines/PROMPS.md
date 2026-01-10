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
