# Changelog

Todas las modificaciones notables en este proyecto serán documentadas en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/), y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

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
