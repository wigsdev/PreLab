# Project Initialization and Setup

- [x] Create initial documentation files (README, .gitignore, CONTRIBUTING, ROADMAP, TASKS)
- [x] Create project folder structure (`backend`, `frontend`, `docs`)
- [x] Initialize Git repository (Local & Remote Sync)
- [x] Create Python virtual environment
- [x] Install Django, DRF, and initial dependencies
- [x] Backend: Create models (Course, Topic, Question)
- [x] Backend: Configure Admin
- [x] Frontend: Initialize React + Vite
- [x] Frontend: Configure Tailwind CSS
- [x] Frontend: Create base Layout

# v0.4.0: The Engine (Session Logic)

- [x] Frontend: Implementar Router (React Router)
- [x] Frontend: Crear Pantalla de Selección (HomeView)
- [x] Frontend: Implementar Lógica de Examen (Estado, Progreso)
- [x] Frontend: Crear Pantalla de Resultados (ResultsView)
- [x] Frontend: Algoritmo de Aleatoriedad (Shuffle)
- [x] Backend: Endpoint para Simulacro General
- [x] Frontend: Implementar Review Mode

# v0.5.0: Identity & Authentication (JWT)

- [x] Backend: Create `users` app
- [x] Backend: Implement `CustomUser` model (Email unique)
- [x] Backend: Install `simplejwt` & Config Settings
- [x] Backend: Reset DB & Migrations (Critical)
- [x] Backend: Auth Endpoints (Login/Refresh)
- [x] Frontend: Implement `AuthContext`
- [x] Frontend: Login View (UI)
- [x] Frontend: Protected Routes (Home Header Logic)
- [x] Backend: Registration Endpoint (API)
- [x] Frontend: Register View (UI)

# v0.5.1: Auth Experience Polish

- [x] Frontend: Password Visibility Toggle (Eye Icon)
- [x] Frontend: Password Regex Validation & Visual Feedback
- [x] Frontend: Smart Redirect (Login -> Intended Page)
- [x] Frontend: Forgot Password Link (Visual only)

# v0.6.0: The Experience (Polish & Dark Mode)

- [x] Frontend: Configurar Tailwind (`darkMode: 'class'`)
- [x] Frontend: Implementar Hook `useTheme`
- [x] Frontend: Crear componente `Navbar` (Logo + Toggle + User)
- [x] Frontend: Integrar `Navbar` en `App.jsx`
- [x] Frontend: Crear `QuestionSkeleton`
- [x] Frontend: Aplicar estilos Dark Mode a vistas principales

# v0.7.0: The Memory (History & Cloud Persistence)

- [x] Backend: Crear modelo `ExamAttempt` (Usuario, Tema, Puntaje)
- [x] Backend: Implementar `ExamAttemptSerializer`
- [x] Backend: Crear `ExamAttemptViewSet` con seguridad (Solo propios)
- [x] Backend: Configurar Rutas API (`/api/history/`)
- [x] Backend: Ejecutar Migraciones
- [x] Frontend: Crear servicio `saveExamResult` en `services/api.js`
- [x] Frontend: Integrar lógica de guardado en `ResultsCard.jsx`
- [x] Frontend: Mostrar feedback (Toast/Mensaje) tras guardar
- [x] Manual Check: Verificar guardado en DB (Admin Panel)

# v0.8.0: The Analytics (User Dashboard)

- [x] Frontend: Implementar servicio `getExamHistory`
- [x] Frontend: Crear componente `PrivateRoute`
- [x] Frontend: Crear `DashboardView` (Stats: Total, Promedio, Mejor Nota)
- [x] Frontend: Implementar Historial (Timeline) con estados de carga/vacío
- [x] Frontend: Actualizar `Navbar` (Link a Perfil)
- [x] Frontend: Configurar Ruta Protegida `/dashboard`

# v0.9.0: Settings & Creator Panel (Admin)

- [x] **Backend**: Update `UserSerializer` (include `avatar`, `is_staff`, `password` handling) <!-- id: 4 -->
- [x] **Frontend**: Update `AuthContext` to fetch full profile (`/users/me/`) <!-- id: 5 -->
- [x] **Frontend**: Fix `LoginView` redirect loop and `ProfileView` update logic <!-- id: 6 -->
- [x] **Frontend**: Implement `DashboardView` FAB for Admins <!-- id: 7 -->
- [x] Backend: Asegurar permisos `IsAdminUser` para crear preguntas `POST /api/questions/`
- [x] Frontend: Crear `CreateQuestionView.jsx` (Mobile First Form)
- [x] Frontend: Agregar botón flotante Admin en `DashboardView`
- [x] Frontend: Rutas en `App.jsx` (`/profile`, `/admin/create`)

## Infrastructure: QA & CI/CD

- [x] **Backend**: Configure `black` & `flake8` (update requirements.txt) <!-- id: 14 -->
- [x] **Frontend**: Configure `prettier`, `husky`, & `lint-staged` <!-- id: 15 -->
- [x] **CI**: Create GitHub Actions Workflow (`.github/workflows/ci.yml`) <!-- id: 16 -->

## v0.9.1: The Admin Powerhouse

- [x] **Backend**: Create `QuestionFilter` and optimized endpoints for Admin List <!-- id: 8 -->
- [x] **Frontend**: Create `AdminLayout` and Sidebar <!-- id: 9 -->
- [x] **Frontend**: Implement `QuestionListView` (DataGrid with Actions) <!-- id: 10 -->
- [x] **Frontend**: Implement `QuestionEditView` (Reuse Create form with pre-fill) <!-- id: 11 -->

## v0.9.2: User Management (Admin)

- [x] **Frontend**: Implement `UserListView` (Table & Search) <!-- id: 12 -->
- [x] **Backend**: Implement `UserViewSet` (List/Update Roles) <!-- id: 17 -->
- [x] **Frontend**: Implement Role Editing (Modal/Inline) <!-- id: 18 -->

## v0.9.3: UX Polish (Admin Sidebar)

- [x] **Frontend**: Refactor `AdminLayout` for Gemini-style Drawer Nav <!-- id: 19 -->

## v0.9.4: The Student Experience

- [x] **Backend**: Create `QuestionReport` & `ExamAttemptAnswer` models <!-- id: 20 -->
- [x] **Backend**: Update `serializers.py` (Fix Dashboard Bug & Add Detail View) <!-- id: 21 -->
- [x] **Backend**: Update `views.py` (Save Aswers & Report Endpoint) <!-- id: 22 -->
- [x] **Frontend**: Implement `LandingView.jsx` (Public Home) <!-- id: 23 -->
- [x] **Frontend**: Implement History Review Mode & Report Button <!-- id: 24 -->

## v0.9.5: Quality Assurance & Code Integrity

- [x] **Backend**: Configure `pytest` and `coverage`.
- [x] **Backend**: Unit Tests for Models (`CustomUser`, `ExamAttempt`, `ExamAttemptAnswer`).
- [x] **Backend**: Unit Tests for API (`ExamAttemptViewSet`, permissions).
- [x] **Frontend**: Configure `vitest` for React Testing.
- [x] **Frontend**: Unit Tests for critical components (`ResultsCard`, `ExamReviewView`).
- [x] **Code Quality**: Run full linting (`black`, `isort`, `prettier`) and fix all issues.

## v0.9.6: Regional Ops & Analytics Polish 🌎

- [x] **Backend**: Configure `TIME_ZONE` (America/Lima) and verify `USE_TZ`.
- [x] **Backend**: Refactor `AnalyticsView` to support date range filtering (7d, 30d, 90d).
- [x] **Frontend**: Update `AdminDashboard` with chart range selectors.
- [x] **Frontend**: Ensure all dates are localized (User Timezone/Format).

## v1.0.0: Deployment & DevOps (Production Ready) 🐳

- [x] **Backend**: Dockerize Django App (`Dockerfile`, `entrypoint.sh`)
  - [x] Create Dockerfile
  - [x] Create entrypoint.sh (wait-for-db, migrate, collectstatic)
- [x] **Frontend**: Dockerize React App (Build + Nginx)
  - [x] Create custom `nginx.conf` for SPA routing.
  - [x] Create Multi-stage `Dockerfile` (Node -> Nginx).
- [x] **Orchestration**: Create `docker-compose.yml` (Postgres, Backend, Frontend)
- [x] **Verification**: Launch stack and verify connectivity.
- [x] **Backend**: Configure `whitenoise` for Static Files
- [x] **Backend**: Separate Settings (`base.py`, `dev.py`, `prod.py`)

## v1.1.0: Automation (CI/CD & Tests) 🤖

- [x] **GitHub Actions**: Setup `ci.yml` for Backend/Frontend Linting & Build.
- [x] **Backend Tests**: Setup `pytest` infrastructure (`conftest.py`, `pytest.ini`).
- [x] **Backend Tests**: Expand Model Tests coverage (Core Models Tested).
- [ ] **Backend Tests**: Expand View Tests coverage.
