🗺️ PRELAB: RUTA HACIA LA VERSIÓN 1.0.0

Shutterstock
🏗️ FASE 1: Cimientos y Datos (El Backend)
Objetivo: Tener una base de datos robusta y un sistema para cargar preguntas masivamente.

📦 v0.1.0: "Genesis" (Setup Inicial)
Peso: 🟢 Bajo (Configuración)

Objetivos:

[x] Estructura de carpetas (Backend/Frontend).

[x] Entorno virtual y dependencias instaladas.

[x] Base de Datos conectada (PostgreSQL local o SQLite para dev rápido).

[x] Configuración de Git y Repositorio.

📦 v0.2.0: "The Librarian" (Gestión de Contenido)
Peso: 🟡 Medio (Modelado de Datos)

Objetivos:

[ ] Modelos creados: Universidad, Curso, Tema, Pregunta, Opcion.

[ ] Admin Panel Optimizado: Personalización del Django Admin para cargar preguntas con imágenes y opciones en una sola pantalla.

[ ] API Básica (Solo lectura): Endpoint para listar preguntas por tema.

Resultado: Ya puedes empezar a digitar las preguntas para tu sobrina, aunque ella aún no pueda verlas en una app.

📱 FASE 2: La Experiencia Core (El MVP Interno)
Objetivo: Que la aplicación sea usable en el celular. Aquí es donde tu sobrina empieza a probar.

📦 v0.3.0: "First Playable" (Alpha Testing)
Peso: 🔴 Alto (Frontend & UI)

Objetivos:

[ ] Setup de React + Tailwind.

[ ] Diseño Mobile First: Header, Footer y "Card de Pregunta".

[ ] Lógica de Examen: Ver pregunta -> Tocar opción -> Feedback inmediato (Correcto/Incorrecto + Explicación).

[ ] Navegación simple: Home -> Elegir Curso -> Elegir Tema -> Jugar.

Estado: Funcional. Tu sobrina ya puede usarlo en tu laptop o red local para estudiar.

📦 v0.4.0: "The Engine" (Lógica de Sesión)
Peso: 🟡 Medio (Lógica Frontend/Backend)

Objetivos:

[x] Modo Invitado: Guardar racha en localStorage del navegador.

[x] Algoritmo de "Aleatoriedad": Que las preguntas no salgan siempre en el mismo orden.

[x] Pantalla de "Resultados": Resumen al final del micro-simulacro (Ej: 8/10 correctas).

🔐 FASE 3: Identidad y Experiencia
Objetivo: Diferenciar usuarios y pulir la interfaz antes de lógica compleja.

📦 v0.5.0: "Identity" (Usuarios)
Peso: 🔴 Alto (Seguridad)

Objetivos:

[x] Modelo de Usuario Custom (Email como ID).

[x] Autenticación JWT (Login/Registro/Logout).

[x] Protección de rutas en Frontend (Redirección al Login).

📦 v0.6.0: "The Experience" (Dark Mode & UI)
Peso: 🟡 Medio (Frontend Styles)

Objetivos:

[x] Sistema de Modo Oscuro (Tailwind).

[x] Navbar Global Responsivo.

[x] Feedback Visual (Skeletons y Transiciones).

📦 v0.7.0: "The Memory" (Historial & Cloud Persistence)
Peso: � Terminada (Backend Logic)

Objetivos:

[x] Modelo ExamAttempt en DB.

[x] Endpoint para guardar resultados (POST).

[x] Integración de servicio en ResultsCard (Frontend).

[x] Manejo de "Double Save" (Strict Mode Fix).

📦 v0.8.0: "The Analytics" (User Dashboard)
Peso: 🟢 Terminada (Frontend/UX)

Objetivos:

[x] Endpoint GET /api/history/ (Backend).

[x] DashboardView con Cards de Estadísticas (Frontend).

[x] Historial de Exámenes scrolleable (Timeline).

[x] Rutas Protegidas (PrivateRoute).

🚀 FASE 4: Pulido y Despegue (Pre-Producción)
Objetivo: Que la app se vea profesional y esté en internet.

📦 v0.9.0: "Release Candidate" (Pre-Producción)
Peso: 🟡 Medio (DevOps)

Objetivos:

[ ] Variables de entorno configuradas para Producción (.env).

[ ] Base de Datos en la nube (ej: Supabase o Railway Postgres).

[ ] Despliegue de Backend (ej: Railway/Render).

[ ] Despliegue de Frontend (ej: Vercel/Netlify).

🏆 v1.0.0: "Grand Opening" (PRODUCCIÓN)
Peso: 🟢 Bajo (Marketing/Finalización)

Objetivos:

[ ] Dominio conectado (www.prelab.pe o similar).

[ ] Google Analytics/Adsense configurado.

[ ] Lanzamiento Oficial.

¿Cómo seguimos el hilo?
Cada vez que hables con tu agente para pedir código, dile en qué versión estás trabajando.

Ejemplo:

"Agente, actualmente estamos en la v0.1.0. Necesito que generes el código para..."

Cuando termines todas las tareas de la v0.1.0, haces un: git checkout -b release/v0.1.0 -> git push -> Fusionas a main -> Y etiquetas git tag v0.1.0.