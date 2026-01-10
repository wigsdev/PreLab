import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, FlaskConical, Calculator, Globe2, BrainCircuit, GraduationCap, Loader2, MessageSquareText, ArrowRight } from 'lucide-react';

export default function HomeView() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/courses/');
                setCourses(response.data);
            } catch (err) {
                console.error("Error loading courses:", err);
                setError("Error al cargar los cursos. Verifica que el backend esté corriendo.");
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const getIconForCourse = (code) => {
        switch (code) {
            case 'comu': return <MessageSquareText className="w-8 h-8 text-orange-500" />;
            case 'rv': return <BookOpen className="w-8 h-8 text-blue-500" />;
            case 'rm': return <Calculator className="w-8 h-8 text-indigo-500" />;
            case 'bio': return <FlaskConical className="w-8 h-8 text-green-500" />;
            case 'quim': return <FlaskConical className="w-8 h-8 text-purple-500" />;
            case 'cult-gen': return <Globe2 className="w-8 h-8 text-yellow-500" />;
            default: return <GraduationCap className="w-8 h-8 text-slate-500" />;
        }
    };

    const getGradient = (code) => {
        switch (code) {
            case 'comu': return 'from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 dark:from-orange-900/20 dark:to-orange-900/10 dark:hover:from-orange-900/30';
            case 'rv': return 'from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 dark:from-blue-900/20 dark:to-blue-900/10 dark:hover:from-blue-900/30';
            case 'rm': return 'from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 dark:from-indigo-900/20 dark:to-indigo-900/10 dark:hover:from-indigo-900/30';
            case 'bio': return 'from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 dark:from-green-900/20 dark:to-green-900/10 dark:hover:from-green-900/30';
            case 'quim': return 'from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 dark:from-purple-900/20 dark:to-purple-900/10 dark:hover:from-purple-900/30';
            case 'cult-gen': return 'from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 dark:from-yellow-900/20 dark:to-yellow-900/10 dark:hover:from-yellow-900/30';
            default: return 'from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 dark:from-slate-800 dark:to-slate-900';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-500 dark:text-slate-400 gap-2">
                <Loader2 className="animate-spin" /> Cargando cursos...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg border border-red-200 dark:border-red-800 max-w-sm text-center">
                    <p className="font-bold">Error</p>
                    <p className="text-sm mt-1">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full">
            <section className="mb-6">
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                    Hola, {user?.first_name || 'Estudiante'} 👋
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                    ¿Qué vamos a aprender hoy?
                </p>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-1 h-full">
                {/* Tarjeta Especial: Simulacro General */}
                <div
                    onClick={() => navigate('/exam?mode=simulation')}
                    className="col-span-1 sm:col-span-2 lg:col-span-3 cursor-pointer rounded-xl p-4 border border-indigo-200/60 dark:border-indigo-500/30 shadow-lg shadow-indigo-100/50 dark:shadow-none
          transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group
          bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-700 dark:to-violet-800 relative overflow-hidden flex flex-col justify-center min-h-[140px]"
                >
                    <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <BrainCircuit className="w-6 h-6 text-indigo-200" />
                                <span className="bg-indigo-500/30 text-indigo-50 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm border border-indigo-400/30 uppercase tracking-widest">
                                    Recomendado
                                </span>
                            </div>
                            <h2 className="text-2xl font-black text-white mb-1 leading-tight">
                                Simulacro General
                            </h2>
                            <p className="text-indigo-100 font-medium max-w-xl text-sm leading-tight">
                                Pon a prueba tus conocimientos con un mix balanceado de 30 preguntas.
                            </p>
                        </div>
                        <div className="hidden sm:flex bg-white/20 p-2 rounded-full backdrop-blur-md border border-white/30 group-hover:scale-110 transition-transform">
                            <ArrowRight className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                {courses.map(course => (
                    <div
                        key={course.id}
                        onClick={() => navigate(`/exam?course=${course.id}`)}
                        className={`
              cursor-pointer rounded-xl p-4 border border-slate-200/60 dark:border-slate-700 shadow-sm dark:shadow-none
              transition-all duration-300 hover:shadow-md hover:-translate-y-1 group
              bg-gradient-to-br ${getGradient(course.code)} relative overflow-hidden flex flex-col justify-between
            `}
                    >
                        {/* Decorative blob */}
                        <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/40 dark:bg-white/5 rounded-full blur-2xl group-hover:bg-white/60 dark:group-hover:bg-white/10 transition-colors" />

                        <div className="relative z-10 h-full flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <div className="bg-white dark:bg-slate-800 w-10 h-10 rounded-lg flex items-center justify-center shadow-sm dark:shadow-none border dark:border-slate-700">
                                    {getIconForCourse(course.code)}
                                </div>
                            </div>

                            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-0.5 leading-tight">
                                {course.name}
                            </h2>
                            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
                                {course.description || "Preguntas tipo examen."}
                            </p>

                            <div className="mt-auto flex items-center text-xs font-semibold text-slate-800 dark:text-slate-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                                Iniciar
                                <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
