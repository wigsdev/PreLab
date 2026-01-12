# 📄 DOCUMENTACIÓN MAESTRA DEL PROYECTO (MVP)

## 1. Visión del Producto

- **Nombre Clave:** PreLab (Nombre provisional).
- **Objetivo Principal:** Desarrollar una plataforma web progresiva (PWA) para realizar simulacros de preguntas de admisión a universidades peruanas (San Marcos, UNI, etc.).
- **Objetivo Inmediato (MVP):** Crear una herramienta funcional para validación con usuarios reales (caso de uso: sobrina del fundador) que permita reforzar temas específicos estudiados durante la semana.
- **Objetivo a Largo Plazo:** Convertir el MVP en una plataforma SAAS escalable y monetizable (modelo Freemium + Ads).

## 2. Perfil del Usuario

- **Usuario Final:** Estudiantes preuniversitarios (16-20 años). Uso intensivo de celular (Mobile First). Conexión a internet variable. Busca inmediatez.
- **Stakeholder (Dueño):** Desarrollador en aprendizaje (perfil técnico: Python/JS/Java). Busca código limpio, escalable y educativo.

## 3. Stack Tecnológico (Definido)

- **Infraestructura:** Docker & Docker Compose (Base de la arquitectura).
- **Backend:** Python con Django + Django REST Framework + Gunicorn.
  - _Razón:_ Aprovechar el Django Admin para carga rápida de preguntas y la robustez para escalar.
- **Frontend:** React.js + Tailwind CSS + Nginx.
  - _Enfoque:_ Diseño Mobile First estricto. La UI debe sentirse como una App nativa.
- **Base de Datos:** PostgreSQL 15.
- **Autenticación:** JWT (JSON Web Tokens).

## 4. Requisitos Funcionales del MVP

### A. Flujo de Usuario

- **Modo Invitado (Guest):** El usuario puede seleccionar un curso/tema y realizar un micro-simulacro sin registrarse. Al finalizar, se le invita a registrarse para guardar progreso.
- **Modo Registrado:** Acceso a historial, estadísticas y guardado de racha.

### B. Sistema de Práctica

- **Filtrado granular:** Selección por Curso (ej. Historia) -> Tema (ej. Guerra del Pacífico).
- **Feedback inmediato:** Al responder, mostrar si es correcto/incorrecto y la explicación.

### C. Arquitectura de Datos (Core)

- **Entidades principales:** `University`, `Course`, `Topic`, `Question` (con soporte para imágenes y LaTeX), `ExamAttempt`.

## 5. Directrices de Desarrollo (Reglas de Oro)

1.  **Mobile First:** Todo componente visual debe diseñarse primero para pantallas de 360px de ancho. La "Zona del Pulgar" es prioritaria.
2.  **Escalabilidad:** El código debe ser modular. No hardcodear valores. Usar variables de entorno (.env).
3.  **Código Educativo:** Dado que el dueño está aprendiendo, el código generado debe incluir comentarios explicativos breves sobre por qué se toma una decisión técnica (ej. "Usamos select_related aquí para optimizar la consulta a la BD").
4.  **Simplicidad:** Para el MVP, priorizar funcionalidad sobre animaciones complejas.

## 6. Estado Actual (v1.0.0)

- **Fase:** Producción / Despliegue.
- **Versión:** v1.0.0 (Dockerizada).
- **Hitos:** Backend y Frontend integrados, Admin Panel funcional, CI/CD básico implementado.
- **Siguiente paso:** Expansión de cobertura de pruebas y despliegue en nube.
