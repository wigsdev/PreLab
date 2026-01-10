import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getExamHistory } from '../services/api';
import useTheme from '../hooks/useTheme';
import {
    BookOpen,
    BarChart3,
    Trophy,
    Clock,
    Calendar,
    ChevronRight,
    Loader2,
    Plus,
    ArrowRight
} from 'lucide-react';
import clsx from 'clsx';

import AdminDashboard from './admin/AdminDashboard'; // [NEW]

export default function DashboardView() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, average: 0, best: 0 });

    // Redirect to Admin Dashboard if staff
    if (user?.is_staff) {
        return <AdminDashboard />;
    }

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getExamHistory();
                setHistory(data);
                calculateStats(data);
            } catch (error) {
                console.error("Failed to load history", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchHistory();
        }
    }, [user]);

    const calculateStats = (data) => {
        if (!data || data.length === 0) return;

        const total = data.length;
        const sum = data.reduce((acc, curr) => acc + curr.score, 0);
        const average = (sum / total).toFixed(1);
        const best = Math.max(...data.map(h => h.score));

        setStats({ total, average, best });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('es-PE', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        }).format(date); // Ej: 10 ene, 11:30
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
                <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-24 bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>
                    ))}
                </div>
                <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-20 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 min-h-[calc(100vh-80px)]">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    👋 Hola, <span className="text-indigo-600 dark:text-indigo-400">{user?.first_name || user?.email?.split('@')[0]}</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Aquí tienes el resumen de tu progreso.
                </p>
            </header>

            {/* Empty State */}
            {history.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <BarChart3 className="w-10 h-10 text-indigo-500" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Aún no hay estadísticas</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs mx-auto">
                        Realiza tu primer simulacro para empezar a ver tu progreso aquí.
                    </p>
                    <Link to="/" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                        Iniciar Simulacro <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            ) : (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8">
                        {/* Total Exámenes */}
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center">
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-full mb-2">
                                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="text-2xl font-black text-slate-800 dark:text-white">{stats.total}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Exámenes</span>
                        </div>

                        {/* Promedio */}
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center">
                            <div className="bg-purple-50 dark:bg-purple-900/30 p-2 rounded-full mb-2">
                                <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span className="text-2xl font-black text-slate-800 dark:text-white">{stats.average}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Promedio</span>
                        </div>

                        {/* Mejor Nota */}
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center">
                            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-2 rounded-full mb-2">
                                <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <span className="text-2xl font-black text-slate-800 dark:text-white">{stats.best}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Mejor Nota</span>
                        </div>
                    </div>

                    {/* Timeline */}
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 px-1">Historial Reciente</h3>
                    <div className="space-y-3">
                        {history.map((attempt) => (
                            <div key={attempt.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between transition-colors hover:border-indigo-200 dark:hover:border-indigo-900/50 group">
                                <div className="flex items-center gap-4">
                                    <div className={clsx(
                                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                                        attempt.score >= 11
                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                    )}>
                                        {attempt.score}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800 dark:text-white text-sm line-clamp-1">
                                            {attempt.topic_name || "Simulacro General"}
                                        </h4>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                            <Calendar className="w-3 h-3" />
                                            {formatDate(attempt.created_at)}
                                        </div>
                                    </div>
                                </div>
                                {/* Optional: Add arrow or details action later */}
                                {/* <div className="text-xs text-slate-400 font-medium">
                                    {attempt.total_questions} pregs
                                </div> */}
                            </div>
                        ))}
                    </div>
                </>
            )}
            {/* Admin Floating Button */}
            {user?.is_staff && (
                <button
                    onClick={() => navigate('/admin/create')}
                    className="fixed bottom-6 right-6 p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg hover:shadow-indigo-500/30 transition-all z-50 group"
                    title="Crear Pregunta"
                >
                    <Plus size={24} className="group-hover:rotate-90 transition-transform" />
                </button>
            )}
        </div>
    );
}
