# PreLab 🚀

![Project Status](https://img.shields.io/badge/Status-Development-orange)
![License](https://img.shields.io/badge/License-MIT-blue)
![Python](https://img.shields.io/badge/Python-3.11%2B-yellow)
![Django](https://img.shields.io/badge/Django-5.0-green)
![React](https://img.shields.io/badge/React-18-blue)

**Plataforma de Simulacros Preuniversitarios - Mobile First**

PreLab es una **Plataforma Web Progresiva (PWA)** diseñada meticulosamente para estudiantes que aspiran a ingresar a universidades peruanas (UNMSM, UNI, Villarreal, etc.). Nuestra prioridad es la experiencia móvil ("Thumb Zone friendly"), permitiendo micro-simulacros eficientes y aprendizaje continuo.

---

## 📖 Tabla de Contenidos
- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Características Clave](#-características-clave)
- [Stack Tecnológico](#-stack-tecnológico)
- [Pre-requisitos](#-pre-requisitos)
- [Instalación](#-instalación)
- [Hoja de Ruta](#-hoja-de-ruta)
- [Contribución](#-contribución)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

---

## 🧐 Sobre el Proyecto

El objetivo de PreLab es democratizar y modernizar la preparación preuniversitaria.
- **Validación (MVP):** Herramienta funcional para reforzar temas semanalmente.
- **Visión:** Escalar a un modelo SAAS Freemium.

## ✨ Características Clave (Planeadas)
*   📱 **Mobile First Design:** Interfaz optimizada para uso con una sola mano.
*   🎯 **Micro-Simulacros:** Prácticas filtradas por Curso y Tema específico.
*   ⚡ **Feedback Instantáneo:** Explicaciones detalladas al momento de responder.
*   📊 **Analíticas de Progreso:** Historial de rendimiento y rachas de estudio.

## 🛠 Stack Tecnológico

### Backend
*   **Lenguaje:** Python 3.11+
*   **Framework:** Django 5.0 & Django REST Framework
*   **Base de Datos:** PostgreSQL
*   **Seguridad:** JWT Authentication

### Frontend
*   **Librería:** React.js
*   **Estilos:** Tailwind CSS
*   **Build Tool:** Vite

---

## ⚡ Instalación

Sigue estos pasos para levantar el entorno de desarrollo local.

### Pre-requisitos
*   Git
*   Python 3.11+
*   Node.js (para el frontend, próximamente)

### Pasos
1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/wigsdev/PreLab.git
    cd PreLab
    ```

2.  **Configurar entorno virtual (Backend):**
    ```bash
    python -m venv venv
    # En Windows:
    venv\Scripts\activate
    # En Mac/Linux:
    source venv/bin/activate
    ```

3.  **Instalar dependencias:**
    ```bash
    pip install -r backend/requirements.txt
    ```

4.  **Iniciar el proyecto Django:**
    ```bash
    cd backend
    python manage.py migrate
    python manage.py runserver
    ```

## 🗺 Hoja de Ruta
Consulta nuestro [ROADMAP.md](./docs/management/ROADMAP.md) para ver el plan de desarrollo detallado y las próximas funcionalidades.

## 🤝 Contribución
¡Las contribuciones son bienvenidas! Por favor lee el archivo [CONTRIBUTING.md](./CONTRIBUTING.md) para conocer nuestros estándares de código y flujo de trabajo.

## 📝 Licencia
Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

## 👤 Autor
**Wilmer (WigsDev)**
*   GitHub: [@wigsdev](https://github.com/wigsdev)
