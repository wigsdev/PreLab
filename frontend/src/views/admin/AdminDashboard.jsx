import { useState, useEffect } from 'react';
import { Users, BookOpen, Trophy, Activity, ArrowUpRight, Calendar, Search } from 'lucide-react';
import { getAnalytics } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [range, setRange] = useState('7d'); // State for selected range

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true); // Show loading when range changes
            try {
                const data = await getAnalytics({ range }); // Pass range param
                setStats(data);
            } catch {
                console.error('Error loading analytics');
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [range]); // Refetch when range changes

    // Helper for date formatting (Lima/Colombia Time)
    const formatDate = (dateString, withTime = false) => {
        if (!dateString) return '-';
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            ...(withTime && { hour: '2-digit', minute: '2-digit', hour12: false }),
        };
        // Use browser locale but prefer es-PE structure
        return new Date(dateString).toLocaleDateString('es-PE', options);
    };

    if (loading && !stats) {
        // Only full skeleton on initial load
        return (
            <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse space-y-8">
                <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="h-32 bg-slate-200 dark:bg-slate-700 rounded-2xl"
                        ></div>
                    ))}
                </div>
            </div>
        );
    }

    if (!stats && !loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8 text-center">
                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-200 dark:border-red-800 inline-block">
                    <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">
                        No se pudieron cargar los datos
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                        Ocurrió un error al contactar el servidor de analíticas.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 pb-24">
            <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                        Panel de Administración
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Resumen global de la plataforma
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/admin/questions')}
                        className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                    >
                        Gestionar Preguntas
                    </button>
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-indigo-600/20">
                        Descargar Reporte
                    </button>
                </div>
            </header>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    title="Total Estudiantes"
                    value={stats?.total_students || 0}
                    icon={Users}
                    color="text-blue-500"
                    bg="bg-blue-500/10"
                />
                <StatCard
                    title="Exámenes Realizados"
                    value={stats?.total_exams || 0}
                    icon={BookOpen}
                    color="text-purple-500"
                    bg="bg-purple-500/10"
                    trend={`+${stats?.exams_this_week || 0} en este periodo`}
                />
                <StatCard
                    title="Promedio Global"
                    value={stats?.average_score || 0}
                    icon={Trophy}
                    color="text-yellow-500"
                    bg="bg-yellow-500/10"
                />
                <StatCard
                    title="Actividad Reciente"
                    value="Alta"
                    icon={Activity}
                    color="text-green-500"
                    bg="bg-green-500/10"
                />
            </div>

            {/* Charts & Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Recent Activity & Trend (2/3 width) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Activity Chart */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm relative">
                        {loading && (
                            <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 flex items-center justify-center z-10 backdrop-blur-sm rounded-2xl">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                            </div>
                        )}
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                                <Activity size={20} className="text-indigo-500" /> Tendencia de
                                Exámenes
                            </h3>
                            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 gap-1">
                                {[
                                    { id: '7d', label: '7 Días' },
                                    { id: '30d', label: '30 Días' },
                                    { id: '90d', label: '90 Días' },
                                ].map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setRange(opt.id)}
                                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                                            range === opt.id
                                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="h-48 flex items-end justify-between gap-1 sm:gap-2">
                            {(stats?.trend_data || []).map((item, idx) => {
                                const maxVal = Math.max(
                                    ...(stats?.trend_data || []).map((d) => d.count),
                                    1
                                );
                                const height = item.count > 0 ? (item.count / maxVal) * 100 : 0;
                                return (
                                    <div
                                        key={idx}
                                        className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                                    >
                                        <div className="relative w-full flex justify-center h-full items-end">
                                            {/* Tooltip */}
                                            <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10 shadow-lg">
                                                <div className="font-bold">
                                                    {item.count} exámenes
                                                </div>
                                                <div className="text-[10px] opacity-75">
                                                    {item.date}
                                                </div>
                                            </div>
                                            {/* Bar */}
                                            <div
                                                className="w-full max-w-[40px] bg-indigo-100 dark:bg-indigo-900/30 rounded-t-sm sm:rounded-t-lg group-hover:bg-indigo-500 dark:group-hover:bg-indigo-500 transition-all relative overflow-hidden"
                                                style={{ height: `${Math.max(height, 5)}%` }}
                                            >
                                                {height > 0 && (
                                                    <div
                                                        className="absolute bottom-0 w-full bg-indigo-500/20"
                                                        style={{ height: '100%' }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        {/* Show date label every N items depending on range density */}
                                        {(range === '7d' ||
                                            idx % 5 === 0 ||
                                            idx === stats.trend_data.length - 1) && (
                                            <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium text-center truncate w-full">
                                                {item.date}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Recent Activity Table */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                                Actividad Reciente
                            </h3>
                            <button className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                                Ver todo
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">
                                    <tr>
                                        <th className="p-4 pl-6">Estudiante</th>
                                        <th className="p-4">Tipo</th>
                                        <th className="p-4">Examen</th>
                                        <th className="p-4">Puntaje</th>
                                        <th className="p-4 text-right pr-6">Detalle</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {(stats?.recent_activity || []).map((item) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                                        >
                                            <td className="p-4 pl-6 font-medium text-slate-800 dark:text-slate-200">
                                                {item.user}
                                                <div className="text-xs text-slate-400 font-normal mt-0.5">
                                                    {formatDate(item.date, true)}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                        item.type_label === 'Simulacro'
                                                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                                                            : 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-100 dark:border-blue-900'
                                                    }`}
                                                >
                                                    {item.type_label}
                                                </span>
                                            </td>
                                            <td className="p-4 font-semibold text-slate-700 dark:text-slate-300">
                                                {item.exam_name}
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`font-bold ${
                                                        item.score >= 11
                                                            ? 'text-green-600 dark:text-green-400'
                                                            : 'text-red-500 dark:text-red-400'
                                                    }`}
                                                >
                                                    {item.score}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right pr-6 text-sm text-slate-500 dark:text-slate-400 max-w-[150px] truncate">
                                                {item.exam_detail}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column: Top Students (1/3 width) */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm h-full">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                                <Trophy size={20} className="text-yellow-500" /> Top Estudiantes
                            </h3>
                        </div>
                        <div className="space-y-4">
                            {(stats?.top_students || []).map((student, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                                idx === 0
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : idx === 1
                                                      ? 'bg-slate-200 text-slate-700'
                                                      : idx === 2
                                                        ? 'bg-orange-100 text-orange-700'
                                                        : 'bg-slate-100 text-slate-500'
                                            }`}
                                        >
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-slate-800 dark:text-white">
                                                {student.name}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {student.exams} exámenes
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-black text-indigo-600 dark:text-indigo-400">
                                            {student.avg_score}
                                        </span>
                                        <p className="text-[10px] text-slate-400 uppercase font-bold">
                                            Promedio
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {stats?.top_students?.length === 0 && (
                                <p className="text-slate-500 text-sm text-center py-4">
                                    Aún no hay datos suficientes
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color, bg, trend }) {
    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
                <div
                    className={`p-3 rounded-xl ${bg} ${color} group-hover:scale-110 transition-transform`}
                >
                    {/* eslint-disable-next-line no-unused-vars */}
                    <Icon size={24} />
                </div>
                {trend && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                        <ArrowUpRight size={12} /> {trend}
                    </span>
                )}
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                    {title}
                </p>
                <h3 className="text-3xl font-black text-slate-800 dark:text-white">{value}</h3>
            </div>
        </div>
    );
}
