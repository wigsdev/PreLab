# Changelog

Todas las modificaciones notables en este proyecto serán documentadas en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/), y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [v0.3.0] - First Playable - 2026-01-09

### Added
- **Frontend App:**
    - Proyecto React + Vite inicializado (`/frontend`).
    - Configuración de Tailwind CSS (v3).
    - Integración con API Django (`axios`).
- **Components:**
    - `QuestionCard.jsx`: Interfaz de tarjeta con lógica de selección, validación visual (Verde/Rojo) y feedback.
    - `App.jsx`: Lógica de navegación simple (Siguiente pregunta) y manejo de estados de carga/error.
- **UX/UI:**
    - Diseño Mobile-First con "Thumb Zone" para respuestas.
    - Feedback inmediato educativo.

## [v0.2.0] - The Librarian - 2026-01-09

### Added
- **Core App:**
    - Modelos de Base de Datos: `University`, `Course`, `Topic`, `Question`, `Option`.
    - Admin Panel Optimizado: `TabularInline` para opciones, filtros y búsqueda.
- **API REST (v1):**
    - Endpoints de solo lectura: `/api/courses/`, `/api/topics/`, `/api/questions/`.
    - Serializers con soporte Nested (Opciones dentro de Preguntas).
    - Filtrado de preguntas por tema (`?topic=ID`).

## [v0.1.0] - Genesis - 2026-01-09

### Added
- **Estructura del Proyecto:**
    - Directorios: `backend/`, `frontend/`, `docs/`.
    - Documentación: `README.md`, `LICENSE`, `CONTRIBUTING.md`.
    - Gestión: `ROADMAP.md`, `TASKS.md`, `PROMPS.md`.
- **Backend Setup:**
    - Proyecto Django inicializado (`config`).
    - Entorno virtual (`venv`) configurado.
    - Dependencias instaladas: `Django`, `DRF`, `django-cors-headers`, `Pillow`.
- **DevOps:**
    - Repositorio Git inicializado.
    - Ramas configuradas: `main`, `develop`.
    - Configuración de `.gitignore`.
