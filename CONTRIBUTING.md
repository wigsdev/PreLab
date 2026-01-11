# 📏 Reglas de Desarrollo y Contribución

## 1. Filosofía de Código
* **Educational First:** Todo código complejo debe tener comentarios explicando el "Por qué", no solo el "Qué". Estamos aquí para aprender.
* **Mobile First:** Cualquier componente de UI debe diseñarse pensando primero en pantallas de 360px de ancho.
* **Clean Code:** Variables en inglés (ej: `user_score`), comentarios en español.

## 2. Flujo de Trabajo (Git Flow Simplificado)
* Rama principal: `main` (Solo código producción).
* Rama desarrollo: `develop` (Aquí se integra todo).
* Ramas features: `feature/nombre-funcionalidad` (ej: `feature/modelo-preguntas`).

## 3. Entorno de Desarrollo (Docker) 🐳
Recomendamos usar Docker para garantizar que todos tengamos el mismo entorno.

1.  **Iniciar:** `docker-compose up --build`
2.  **Frontend:** http://localhost
3.  **Backend:** http://localhost:8000/admin

## 4. Tests y Calidad (QA) 🧪
Antes de enviar un Pull Request, asegúrate de que los tests pasen:

*   **Backend:** `docker-compose exec backend pytest`
*   **Frontend:** Ver `README.md` (comando `docker run ... node:22-alpine` según tu OS).

## 5. Estándares
* **Backend:** Seguir PEP8. Usar Type Hints en Python (ej: `def sumar(a: int, b: int) -> int:`).
* **Frontend:** Componentes funcionales en React + Tailwind.
* **Commits:** Usar Conventional Commits:
    * `feat:` Nueva funcionalidad.
    * `fix:` Corrección de errores.
    * `docs:` Cambios en documentación.
    * `refactor:` Cambios de código que no cambian funcionalidad.
    * `chore:` Mantenimiento (Docker, Configs).
