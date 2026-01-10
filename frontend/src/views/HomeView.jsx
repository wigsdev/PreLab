import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BookOpen, FlaskConical, Calculator, Globe2, BrainCircuit, GraduationCap, Loader2, MessageSquareText, ArrowRight } from 'lucide-react';

export default function HomeView() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
            case 'quim': return <FlaskConical className="w-8 h-8 text-purple-500" />; // Reusing flask for now or find atom equivalent if available
            case 'cult-gen': return <Globe2 className="w-8 h-8 text-yellow-500" />;
            default: return <GraduationCap className="w-8 h-8 text-slate-500" />;
        }
    };

    const getGradient = (code) => {
        switch (code) {
            case 'comu': return 'from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200';
            case 'rv': return 'from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200';
            case 'rm': return 'from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200';
            case 'bio': return 'from-green-50 to-green-100 hover:from-green-100 hover:to-green-200';
            case 'quim': return 'from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200';
            case 'cult-gen': return 'from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200';
            default: return 'from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-500 gap-2">
                <Loader2 className="animate-spin" /> Cargando cursos...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 max-w-sm text-center">
                    <p className="font-bold">Error</p>
                    <p className="text-sm mt-1">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-10 px-4 max-w-5xl mx-auto">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
                    PreLab <span className="text-blue-600">Academy</span>
                </h1>
                <p className="text-slate-500 font-medium">Elige tu reto y comienza a practicar</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tarjeta Especial: Simulacro General */}
                <div
                    onClick={() => navigate('/exam?mode=simulation')}
                    className="col-span-1 sm:col-span-2 lg:col-span-3 cursor-pointer rounded-2xl p-8 border border-indigo-200/60 shadow-lg shadow-indigo-100/50
          transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group
          bg-gradient-to-r from-indigo-600 to-violet-600 relative overflow-hidden"
                >
                    <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <BrainCircuit className="w-8 h-8 text-indigo-200" />
                                <span className="bg-indigo-500/30 text-indigo-50 text-xs font-bold px-2 py-1 rounded backdrop-blur-sm border border-indigo-400/30 uppercase tracking-widest">
                                    Recomendado
                                </span>
                            </div>
                            <h2 className="text-3xl font-black text-white mb-2 leading-tight">
                                Simulacro General
                            </h2>
                            <p className="text-indigo-100 font-medium max-w-xl text-lg">
                                Pon a prueba tus conocimientos con un mix balanceado de 30 preguntas de todos los cursos.
                            </p>
                        </div>
                        <div className="hidden sm:flex bg-white/20 p-3 rounded-full backdrop-blur-md border border-white/30 group-hover:scale-110 transition-transform">
                            <ArrowRight className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>

                {courses.map(course => (
                    <div
                        key={course.id}
                        onClick={() => navigate(`/exam?course=${course.id}`)}
                        className={`
              cursor-pointer rounded-2xl p-6 border border-slate-200/60 shadow-sm 
              transition-all duration-300 hover:shadow-md hover:-translate-y-1 group
              bg-gradient-to-br ${getGradient(course.code)} relative overflow-hidden
            `}
                    >
                        {/* Decorative blob */}
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/40 rounded-full blur-2xl group-hover:bg-white/60 transition-colors" />

                        <div className="relative z-10">
                            <div className="mb-4 bg-white w-14 h-14 rounded-xl flex items-center justify-center shadow-sm">
                                {getIconForCourse(course.code)}
                            </div>

                            <h2 className="text-xl font-bold text-slate-800 mb-1 leading-tight">
                                {course.name}
                            </h2>
                            <p className="text-sm text-slate-600 line-clamp-2">
                                {course.description || "Practica con preguntas tipo examen de admisión."}
                            </p>

                            <div className="mt-6 flex items-center text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                                Iniciar Simulacro
                                <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
