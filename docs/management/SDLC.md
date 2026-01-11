# 🔄 Ciclo de Vida del Desarrollo de Software (SDLC) - PreLab

Este documento define el proceso estándar de ingeniería de software adoptado para **PreLab**. Seguimos una metodología **Ágil/Iterativa** que prioriza la entrega continua de valor, la calidad del código y la adaptabilidad ante cambios.

El SDLC (*Software Development Life Cycle*) es el marco de trabajo que estructura cómo nacen, crecen y maduran nuestras funcionalidades.

---

## 1. 📅 Planificación (Planning)
**Objetivo:** Definir *qué* vamos a construir y *por qué*.
*   **Actividades:**
    *   Identificación de necesidades del usuario (ej. "El estudiante necesita ver respuestas incorrectas").
    *   Definición del alcance (Scope) para evitar el "feature creep".
    *   Estimación de recursos y tiempos.
*   **Entregables:** Documento `TASKS.md` actualizado, Historias de Usuario.

## 2. 🔍 Análisis (Analysis)
**Objetivo:** Entender técnicamente el requerimiento.
*   **Actividades:**
    *   Desglose de requerimientos funcionales y no funcionales.
    *   Análisis de viabilidad técnica (¿Tenemos la librería adecuada? ¿Afecta el rendimiento?).
*   **Entregables:** `implementation_plan.md` (Plan de Implementación).

## 3. 📐 Diseño (Design)
**Objetivo:** Modelar la solución antes de escribir código.
*   **Actividades:**
    *   **Diseño de Datos:** Creación/modificación de Modelos (ER Diagrams).
    *   **Diseño de API:** Definición de Endpoints y Serializadores (Contratos de interfaz).
    *   **Diseño UI/UX:** Prototipado de componentes (Mockups mentales o en papel).
*   **Entregables:** Esquemas de Base de Datos, Definición de Rutas API.

## 4. 💻 Desarrollo (Development)
**Objetivo:** Construir la solución ("Make it work").
*   **Principios:**
    *   **Backend:** Python/Django limpio, siguiendo PEP8.
    *   **Frontend:** React modular, componentes reutilizables.
    *   **Mobile First:** Siempre verificar la vista móvil primero.
*   **Flujo:** Git Flow simplificado (Feature Branches -> Develop/Main).

## 5. 🧪 Pruebas (Testing / QA)
**Objetivo:** Asegurar la calidad y robustez ("Make it right").
**IMPORTANTE:** Esta fase es crítica y se divide en:
*   **Pruebas Unitarias (Unit Tests):** Verificación de componentes aislados (ej. "¿Calcula bien el puntaje?"). Herramientas: `pytest` (Backend), `vitest` (Frontend).
*   **Pruebas de Integración:** Verificar que el Frontend se comunica bien con el Backend.
*   **Pruebas Manuales (User Acceptance Testing - UAT):** El usuario final prueba el flujo completo.
*   **Linting/Estática:** `black`, `flake8`, `prettier` para consistencia de código.

## 6. 🚀 Implementación (Deployment)
**Objetivo:** Llevar el valor al usuario final ("Make it live").
*   **Actividades:**
    *   Contenerización (Docker).
    *   Configuración de entorno (Producción).
    *   Migración de Base de Datos.
    *   CI/CD (Integración y Despliegue Continuo).

## 7. 🔧 Mantenimiento (Maintenance)
**Objetivo:** Sostener y mejorar el producto en el tiempo.
*   **Actividades:**
    *   Monitoreo de errores (Logs, Sentry).
    *   Optimización de rendimiento.
    *   Corrección de bugs reportados post-despliegue.
    *   Actualización de dependencias de seguridad.

---
*"La calidad no es un acto, es un hábito."* - Aristóteles.
Este ciclo se repite para cada nueva versión (v0.x.x), asegurando que PreLab evolucione de manera sólida y profesional.
