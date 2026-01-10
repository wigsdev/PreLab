import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, FlaskConical, Calculator, Globe2, BrainCircuit, GraduationCap, Loader2, MessageSquareText, ArrowRight, LogIn, LogOut, User, UserPlus } from 'lucide-react';

export default function HomeView() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, logout } = useAuth();
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
        <div className="min-h-screen py-4 px-4 max-w-7xl mx-auto">
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">
                        Pre<span className="text-indigo-600">Lab</span>_
                    </h1>
                    <p className="text-lg text-slate-500 font-medium">
                        Simulacros de admisión universitarios
                    </p>
                </div>

                <div>
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-2 text-slate-600 font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
                                <User className="w-4 h-4 text-indigo-500" />
                                <span>{user.email || 'Estudiante'}</span>
                            </div>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Salir</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate('/register')}
                                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-slate-200 hover:border-indigo-200 text-slate-700 font-bold rounded-xl transition-all hover:bg-slate-50 active:scale-95"
                            >
                                <UserPlus className="w-4 h-4" />
                                <span>Registrarse</span>
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95"
                            >
                                <LogIn className="w-4 h-4" />
                                <span>Ingresar</span>
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-1 h-full">
                {/* Tarjeta Especial: Simulacro General */}
                <div
                    onClick={() => navigate('/exam?mode=simulation')}
                    className="col-span-1 sm:col-span-2 lg:col-span-3 cursor-pointer rounded-xl p-4 border border-indigo-200/60 shadow-lg shadow-indigo-100/50
          transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group
          bg-gradient-to-r from-indigo-600 to-violet-600 relative overflow-hidden flex flex-col justify-center min-h-[140px]"
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
              cursor-pointer rounded-xl p-4 border border-slate-200/60 shadow-sm 
              transition-all duration-300 hover:shadow-md hover:-translate-y-1 group
              bg-gradient-to-br ${getGradient(course.code)} relative overflow-hidden flex flex-col justify-between
            `}
                    >
                        {/* Decorative blob */}
                        <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/40 rounded-full blur-2xl group-hover:bg-white/60 transition-colors" />

                        <div className="relative z-10 h-full flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <div className="bg-white w-10 h-10 rounded-lg flex items-center justify-center shadow-sm">
                                    {getIconForCourse(course.code)}
                                </div>
                            </div>

                            <h2 className="text-lg font-bold text-slate-800 mb-0.5 leading-tight">
                                {course.name}
                            </h2>
                            <p className="text-xs text-slate-600 line-clamp-2 mb-2">
                                {course.description || "Preguntas tipo examen."}
                            </p>

                            <div className="mt-auto flex items-center text-xs font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
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
