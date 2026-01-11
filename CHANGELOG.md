# Changelog

Todas las modificaciones notables en este proyecto serán documentadas en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/), y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [v0.9.3] - UX Polish (Admin Sidebar) - 2026-01-10
### Changed
- **Admin UX:**
    - `AdminLayout` refactorizado para soportar comportamiento híbrido.
    - **Desktop**: Sidebar colapsable (Toggle Expandir/Colapsar) que empuja el contenido.
    - **Tablet/Mobile**: Sidebar "Drawer" (Overlay) activado por botón hamburguesa, maximizando espacio.
    - Breakpoint ajustado (XL) para que tablets usen la experiencia móvil (Drawer).
    - Lógica de visibilidad de texto mejorada para evitar errores al redimensionar.
- **Routing:**
    - Corregida ruta índice `/admin` para redirigir correctamente al Dashboard.

## [v0.9.2] - User Management (Admin) - 2026-01-10
### Added
- **Admin Features:**
    - `UserListView`: Tabla de gestión de usuarios con búsqueda en tiempo real.
    - Edición de Roles: Modal/Inline para promover usuarios a Staff/Admin.
    - `UserViewSet`: Endpoints de backend para listar y modificar usuarios (`/api/users/`).
### Fixed
- **Dashboard:**
    - Corregido redirección de usuarios Staff para permitirles acceso a su Dashboard personal en lugar de forzar Admin Panel.

## [v0.9.1] - The Admin Powerhouse - 2026-01-10

### Added
- **Admin Dashboard & Analytics:**
    - `AnalyticsView`: Gráficos de tendencias y Top Estudiantes.
    - Tabla de Actividad Reciente mejorada con distinción visual entre "Simulacro Integral" y "Por Curso".
    - `AdminLayout`: Layout dedicado con Sidebar de navegación.
    - `QuestionListView`: Tabla avanzada (DataGrid) para gestión de preguntas.
    - `QuestionFilter`: Backend filters para búsqueda de preguntas.
    - `QuestionEditView`: Formulario reutilizable para editar contenido.
- **Backend Mechanics:**
    - Soporte para registrar el contexto del curso (`course`) en `ExamAttempt`.
    - Endpoint `/api/analytics/` optimizado.
    - Endpoints optimizados para listar y filtrar preguntas (para admins).
    - Validaciones de permisos `IsAdminUser`.

### Changed
- **Exam Logic:**
    - `ResultsCard.jsx` ahora envía `exam_type` ('COURSE' o 'INTEGRAL') y el ID del curso.
    - `ExamView.jsx` pasa correctamente las props de contexto al guardar resultados.
- **Data Models:**
    - Actualizado modelo `ExamAttempt` para incluir relación con `Course`.

### Fixed
- Error 500 en Analytics por variable `topic` nula (ahora se maneja `course` como fallback).
- Crash en `Navbar` por `AuthContext` undefined (se agregó valor por defecto).
- Orden de URLs en backend para evitar conflictos con routers.

## [v0.9.0] - Creator Panel & Settings - 2026-01-09
### Added
- **Content Creation:**
    - `CreateQuestionView`: Formulario mobile-first para crear preguntas.
    - Permisos de Staff/Admin requeridos para endpoints de escritura.
- **Profile:**
    - Editor de perfil de usuario (`ProfileView`).
    - Actualización de `UserSerializer` para manejar avatares y passwords.

## [v0.8.0] - The Analytics (User Dashboard) - 2026-01-08
### Added
- **Dashboard:**
    - `DashboardView` con tarjetas de estadísticas (Total, Promedio, Mejor Nota).
    - Historial de exámenes en formato Timeline.
- **Frontend:**
    - Hook `getExamHistory` para consumir datos de usuario.
    - Componente `PrivateRoute` para proteger vistas de usuario.

## [v0.7.0] - The Memory (Cloud Persistence) - 2026-01-08
### Added
- **Backend:**
    - Modelo `ExamAttempt` para persistencia de simulacros.
    - Endpoints CRUD para historial (`/api/history/`).
- **Frontend:**
    - Integración de guardado automático al finalizar examen.
    - Manejo de duplicados en modo estricto de React.

## [v0.6.0] - The Experience (UI Polish) - 2026-01-07
### Added
- **UI/UX:**
    - Sistema de Modo Oscuro global (Tailwind `dark` mode).
    - `Navbar` responsivo con menú de usuario.
    - Skeletons de carga para mejorar la experiencia visual (`QuestionSkeleton`).

## [v0.5.1] - Auth Experience Polish - 2026-01-07
### Added
- **Auth UI:**
    - Toggle de visibilidad de contraseña.
    - Validación visual de requisitos de contraseña (Regex).
    - Redirección inteligente post-login (`intended` path).

## [v0.5.0] - Identity (Authentication) - 2026-01-07
### Added
- **Security:**
    - Autenticación completa con JWT (Access/Refresh tokens).
    - Modelo de Usuario personalizado (`CustomUser` usando Email).
    - Vistas de Login y Registro completamente funcionals.
    - Persistencia de sesión con `AuthContext`.

## [v0.4.0] - The Engine (Session Logic) - 2026-01-06
### Added
- **Exam Core:**
    - Lógica de estado de examen (Timer, Score, Progreso).
    - Algoritmo de Shuffle para aleatorizar preguntas y opciones.
    - `ResultView` con resumen de desempeño.
    - Modo Revisión para ver respuestas correctas/incorrectas.
- **Routing:**
    - Configuración de React Router (SPA).

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
