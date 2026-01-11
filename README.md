# PreLab 🚀

![Project Status](https://img.shields.io/badge/Status-Production%20v1.0.0-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue?logo=docker)
![Python](https://img.shields.io/badge/Python-3.12-yellow?logo=python)
![React](https://img.shields.io/badge/React-18-cyan?logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)

**Plataforma de Simulacros Preuniversitarios - Mobile First**

PreLab es una **Plataforma Web Progresiva (PWA)** diseñada meticulosamente para estudiantes que aspiran a ingresar a universidades peruanas (UNMSM, UNI, Villarreal, etc.). Nuestra prioridad es la experiencia móvil ("Thumb Zone friendly"), permitiendo micro-simulacros eficientes y aprendizaje continuo.

---

## 📖 Tabla de Contenidos
- [Características](#-características)
- [Arquitectura](#-arquitectura)
- [Instalación y Uso](#-instalación-y-uso)
- [Documentación](#-documentación)
- [Roadmap](#-roadmap)
- [Contribución](#-contribución)

---

## ✨ Características

### 🎓 Usuario Final (Estudiante)
*   📱 **Mobile First Design:** Interfaz optimizada para uso con una sola mano.
*   🎯 **Micro-Simulacros:** Prácticas filtradas por Curso y Tema específico.
*   ⚡ **Feedback Instantáneo:** Explicaciones detalladas al momento de responder.
*   📊 **Dashboard Personal:** Analíticas de progreso histórico y rachas.
*   🌙 **Modo Oscuro:** Soporte nativo y persistente.

### 🛡️ Administración (Staff)
*   👥 **Gestión de Usuarios:** Control de roles y accesos desde el panel.
*   📈 **Analíticas Globales:** Métricas de uso de la plataforma en tiempo real.
*   🚩 **Reporte de Errores:** Sistema de gestión de preguntas reportadas por usuarios.
*   📝 **Banco de Preguntas:** Editor avanzado para mantenimiento del contenido.

---

## 🛠 Arquitectura

El proyecto está **Dockerizado** para garantizar consistencia entre desarrollo y producción.

*   **Frontend:** React 18 + Vite + Tailwind CSS (Servido por **Nginx** en Prod).
*   **Backend:** Django 5.0 + DRF + Gunicorn + Whitenoise.
*   **Base de Datos:** PostgreSQL 15.
*   **Infraestructura:** Docker Compose.

---

## ⚡ Instalación y Uso

### Requisitos Previos
*   [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y corriendo.
*   Git.

### Pasos
1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/wigsdev/PreLab.git
    cd PreLab
    ```

2.  **Iniciar la aplicación (Docker):**
    ```bash
    docker-compose up --build
    ```
    *El sistema iniciará la DB, ejecutará migraciones y servirá los estáticos automáticamente.*

3.  **Acceder:**
    *   **Frontend:** [http://localhost](http://localhost)
    *   **Backend Admin:** [http://localhost:8000/admin](http://localhost:8000/admin)

### Tests (QA) 🧪

**Backend:**
```bash
docker-compose exec backend pytest
```

**Frontend (Windows Git Bash):**
```bash
MSYS_NO_PATHCONV=1 docker run -it --rm -v "/$(pwd)/frontend://app" -w //app node:22-alpine /bin/sh -c "npm ci && npm test"
```

---

## 📚 Documentación

En la carpeta [`docs/`](./docs) encontrarás guías detalladas:

*   [**Reglas de Desarrollo**](./docs/guidelines/DEVELOPMENT_RULES.md): Estándares de código y Git Flow.
*   [**Ciclo de Vida (SDLC)**](./docs/management/SDLC.md): Metodología de trabajo.
*   [**Roadmap de Versiones**](./docs/management/VERSION_ROADMAP.md): Historial y plan futuro.
*   [**Contexto del Proyecto**](./docs/PROJECT_CONTEXT.md): Visión y alcance.

---

## 🗺 Roadmap
Consulta nuestro [VERSION_ROADMAP.md](./docs/management/VERSION_ROADMAP.md) para ver el historial de versiones (v0.1.0 -> v1.0.0) y los planes futuros.

---

## 🤝 Contribución
¡Las contribuciones son bienvenidas! Por favor lee nuestras [Reglas de Desarrollo](./docs/guidelines/DEVELOPMENT_RULES.md) antes de enviar un PR.

---

## 👤 Autor
**Wilmer (WigsDev)**
*   GitHub: [@wigsdev](https://github.com/wigsdev)

---
*Distribuido bajo licencia MIT.*
