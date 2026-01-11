# Walkthrough - User Management & Admin Dashboard Polish (v0.9.2)

We have successfully implemented the **User Management** module and refined the **Admin Dashboard** experience, ensuring a clear distinction between Personal Progress (Student View) and Platform Overview (Admin View).

## Features Implemented

### 1. User Management (Admin Only)
*   **List View**: A new `UserListView` (`/admin/users`) displaying all registered users with avatars, emails, roles, and status.
*   **Search**: Real-time server-side search by name or email.
*   **Role Management**: Admins can now promote/demote other users to/from "Admin" status (toggle button with shield icon).
*   **Account Status**: Admins can deactivate/reactivate user access (toggle button with check/cross icon).
*   **Security**: Backend `UserViewSet` prevents admins from removing their own admin privileges to avoid lockouts.

### 2. Dual Dashboard Architecture
*   **Student Dashboard (`/dashboard`)**: Focuses on **personal** progress, exam history, and improvement stats. Available to everyone.
*   **Admin Dashboard (`/admin`)**: Focuses on **global** platform stats (Total Students, Exams taken, Global Average, Top Students). Available only to Admins.
*   **Navigation**:
    *   Added **"Panel Admin"** link in the main Navbar for Admins.
    *   Added **"Vista Estudiante"** link in the Admin Sidebar to easily switch back to the personal dashboard.
    *   Added **"Django Admin"** link for legacy backend access.

## Files Modified

### Backend
*   `backend/users/serializers.py`: Added `UserManagementSerializer` to expose system fields (`is_staff`, `is_active`).
*   `backend/users/views.py`: Implemented `UserViewSet` with restricted permissions.
*   `backend/users/urls.py`: Registered new management endpoints.
*   `backend/config/urls.py`: Included user URLs.

### Frontend
*   `frontend/src/views/admin/UserListView.jsx`: The new management interface.
*   `frontend/src/views/admin/AdminDashboard.jsx`: Hardened against empty data and improved error states.
*   `frontend/src/components/layout/AdminLayout.jsx`: Updated sidebar navigation links.
*   `frontend/src/components/layout/Navbar.jsx`: Corrected Admin Panel link destination.
*   `frontend/src/services/api.js`: Added `getUsers` and `updateUserRole` services.
*   `frontend/src/App.jsx`: Wired up the new routes.

## v0.9.3 Verification: Admin Sidebar UX
### UX Improvements
- [x] **Hybrid Sidebar Behavior**:
    - **Desktop**: Persistent sidebar, collapsible (Icons only vs Full width). Content resizes dynamically.
    - **Tablet/Mobile (< 1280px)**: Off-canvas "Drawer" style. Occults completely and slides in with backdrop.
- [x] **Responsiveness**:
    - Verified proper breakpoint switch at 1280px (XL).
    - Verified text visibility persists in mobile drawer even if desktop state was "collapsed".

## v0.9.2 Verification: User Management
### Features Tested
- [x] **User List**:
    - Confirmed table renders with mock/real data.
    - Search bar filters users by name/email instantly.
- [x] **Role Management**:
    - Verified ability to toggle `is_staff` and `is_superuser` status.
    - Permissions enforced on backend (Non-admins cannot edit roles).
- [x] **Access Control**:
    - Verified Staff users can see "Create Question" but also access their own student Dashboard.

## v0.9.1 Verification: Admin Tables
*   **Manual Test**: Verified that "Panel Admin" redirects to `/admin`.
*   **Manual Test**: Verified that `/admin` loads the global analytics.
*   **Manual Test**: Verified that users can be searched and roles updated in `/admin/users`.
*   **Regression Test**: Confirmed Student Dashboard still loads correctly via "Vista Estudiante".

## v0.9.4 Verification: The Student Experience
### Features tested
- [x] **New Landing Page**:
    - **Guest View**: Verified that accessing `/` without login now shows `LandingView` ("La Vitrina") instead of the login screen or protected home.
    - **Smart Redirection**: Verified that logged-in users are automatically redirected or shown the Exam Selection view when accessing `/`.
- [x] **Detailed Exam History (Backend)**:
    - **Models**: Created `ExamAttemptAnswer` and `QuestionReport` models with migrations.
    - **API**: Updated `ExamAttemptViewSet` to handle `answers` payload.
- [x] **Review Mode (Frontend)**:
    - **Saving Answers**: `ResultsCard` now constructs and sends the detailed answer map (question + selection) to the backend.
    - **Review Interface**: New `ExamReviewView` (`/exam/review/:id`) cleanly displays past attempts with "Tu Respuesta" vs "Correcta".

## v1.0.0: Deployment & DevOps (Production Ready) 🐳
**Objective**: Containerize the entire stack for production deployment.

### 1. Backend Dockerization
- Created `backend/Dockerfile` using `python:3.12-slim`.
- Created `entrypoint.sh` to handle DB connection waiting, migrations, and static file collection.
- Configured **Gunicorn** as the production application server.
- Configured **Whitenoise** (`CompressedManifestStaticFilesStorage`) to serve static files efficiently.

### 2. Frontend Dockerization
- Created `frontend/Dockerfile` with a multi-stage build:
    1.  **Build**: Uses `node:22-alpine` to compile React (`npm run build`).
    2.  **Serve**: Uses `nginx:alpine` to serve static assets.
- Configured `nginx.conf` to handle SPA routing (redirects 404s to `index.html`) and enable Gzip compression.

### 3. Orchestration (Docker Compose)
- Created `docker-compose.yml` to spin up:
    - **db**: PostgreSQL 15.
    - **backend**: Gunicorn on port 8000.
    - **frontend**: Nginx on port 80.
- **Config**: Backend reads DB credentials and `ALLOWED_HOSTS` from environment variables passed by Docker.

### 4. Running the Project
```bash
# Build and Start
docker-compose up --build

# Access
Frontend: http://localhost
Backend Admin: http://localhost:8000/admin
```

### 5. Running Tests (QA) 🧪
Because the frontend container is optimized for production (Nginx), we use specific commands to run tests:

**Backend (Pytest):**
```bash
docker-compose exec backend pytest
```

**Frontend (Vitest via ephemeral container):**
```bash
# Windows (Git Bash):
MSYS_NO_PATHCONV=1 docker run -it --rm -v "/$(pwd)/frontend://app" -w //app node:22-alpine /bin/sh -c "npm ci && npm test"

# Linux/Mac:
docker run -it --rm -v "$(pwd)/frontend:/app" -w /app node:22-alpine /bin/sh -c "npm ci && npm test"
```

## Next Steps
- Consider setting up CI/CD pipelines (GitHub Actions).
- Prepare for cloud deployment (AWS/DigitalOcean/Render).
- [x] **Question Reporting**:
    - **UI**: Added a "Flag" icon to `QuestionCard`.
    - **Flow**: Verified that clicking the flag opens `ReportModal` and submission hits the `/api/reports/` endpoint successfully.
    - **Debugging (Safe Mode)**: 
        - Fixed `500 Internal Server Error` caused by missing `ExamAttemptAnswer` table (applied migration `0005`).
        - Implemented `try-except` blocks in Serializers to safely handle missing relations (null safety).
        - Added empty state UI in `ExamReviewView` for legacy/incomplete attempts.

## v0.9.5 Verification: Quality Assurance (QA) 🧪
**Objective**: Ensure codebase integrity with automated tests and pre-commit hooks.

### 1. Test Suite Implementation
- [x] **Backend**: Configured `pytest` with `pytest-django`. Created fixtures in `conftest.py`.
- [x] **Backend Tests**: Implemented comprehensive tests for `ExamAttempt` logic and `ExamAttemptViewSet` API.
- [x] **Frontend**: Configured `vitest` with `@testing-library/react`.
- [x] **Frontend Tests**: Implemented unit tests for `ResultsCard` component.

### 2. Code Quality & Hooks
- [x] **Linting**: Configured `black` (formatter) and `flake8` (linter) for backend.
- [x] **Formatting**: Configured `prettier` for frontend.
- **Automation**: Use `husky` and `lint-staged` to run these tools automatically on `git commit`.

### 3. Debugging Journey
- **Issue**: `flake8` reported line length errors (E501) in migration files.
- **Resolution**: Updated `.flake8` config (moved to root) to ignore auto-generated migration files while enforcing standards elsewhere.
- **Outcome**: Successfully committed `feat(qa)` with all hooks passing. 🟢

## Next Steps
*   Proceed to **v0.9.6** (Deploy & DevOps).
