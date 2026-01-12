import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Zap, BookOpen } from 'lucide-react';

export default function LandingView() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
            {/* Hero Section */}
            <header className="relative overflow-hidden pt-20 pb-32">
                {/* Background Blobs */}
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-full px-4 py-1.5 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">
                            Nuevo: Simulacros 2026
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                        Domina tu Ingreso
                        <br />
                        <span className="text-indigo-600 dark:text-indigo-400">
                            Sin Miedo al Éxito
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        La plataforma de entrenamiento intensivo para postulantes a la UNI. Practica
                        con preguntas reales, obtén métricas al instante y asegura tu vacante.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <Link
                            to="/register"
                            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            Empezar Gratis
                            <ArrowRight size={20} />
                        </Link>
                        <Link
                            to="/login"
                            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl border border-slate-200 dark:border-slate-700 active:scale-95 transition-all"
                        >
                            Iniciar Sesión
                        </Link>
                    </div>

                    <div className="mt-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
                        <Link
                            to="/practice"
                            className="text-sm font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 underline decoration-slate-300 dark:decoration-slate-700 underline-offset-4 transition-colors"
                        >
                            O prueba una demo sin registrarte
                        </Link>
                    </div>
                </div>
            </header>

            {/* Features Grid */}
            <section className="py-20 bg-white dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Feedback Inmediato</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Olvídate de esperar. Recibe tu nota y explicaciones detalladas al
                                instante después de cada respuesta.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
                                <BookOpen size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Simulacros Reales</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Preguntas tipo admisión organizadas por cursos y temas. Entrena con
                                la dificultad real del examen.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                                <Shield size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Seguimiento de Progreso</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Tu dashboard personal guarda todo tu historial. Mira cómo mejora tu
                                promedio día tras día.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 text-center text-slate-500 dark:text-slate-400 text-sm border-t border-slate-100 dark:border-slate-800">
                <p>© 2026 PreLab. Creado para futuros ingenieros.</p>
            </footer>
        </div>
    );
}
