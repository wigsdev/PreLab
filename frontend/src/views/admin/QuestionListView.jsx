import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Edit, Trash2, Plus, AlertCircle } from 'lucide-react';
import { getQuestions, getCourses, getTopics, deleteQuestion } from '../../services/api';
import toast from 'react-hot-toast';

export default function QuestionListView() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        difficulty: '',
        course: '',
        topic: '',
    });

    // Data for filters
    const [courses, setCourses] = useState([]);
    const [topics, setTopics] = useState([]);

    // Load filter data
    useEffect(() => {
        const loadFilterData = async () => {
            try {
                const [coursesData, topicsData] = await Promise.all([getCourses(), getTopics()]);
                setCourses(coursesData);
                setTopics(topicsData);
            } catch {
                console.error('Error loading filters');
            }
        };
        loadFilterData();
    }, []);

    const fetchQuestions = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getQuestions(filters);
            setQuestions(data);
        } catch {
            toast.error('Error al cargar preguntas');
        } finally {
            setLoading(false);
        }
    }, [filters]);

    // Load questions with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchQuestions();
        }, 500);
        return () => clearTimeout(timer);
    }, [fetchQuestions]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
            // Reset topic if course changes
            ...(name === 'course' ? { topic: '' } : {}),
        }));
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar esta pregunta?')) return;
        try {
            await deleteQuestion(id);
            toast.success('Pregunta eliminada');
            fetchQuestions(); // Refresh list
        } catch {
            toast.error('Error al eliminar');
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/questions/${id}/edit`);
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'BASICO':
                return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'INTERMEDIO':
                return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'AVANZADO':
                return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default:
                return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Banco de Preguntas
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Gestiona el contenido del simulacro
                    </p>
                </div>
                <button
                    onClick={() => navigate('/admin/create')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium shadow-sm shadow-indigo-600/20"
                >
                    <Plus size={20} />
                    Nueva Pregunta
                </button>
            </div>

            {/* Filters Bar */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        name="search"
                        placeholder="Buscar en el enunciado..."
                        value={filters.search}
                        onChange={handleFilterChange}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
                <div className="flex gap-4">
                    <select
                        name="difficulty"
                        value={filters.difficulty}
                        onChange={handleFilterChange}
                        className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value="">Todas las Dificultades</option>
                        <option value="BASICO">Básico</option>
                        <option value="INTERMEDIO">Intermedio</option>
                        <option value="AVANZADO">Avanzado</option>
                    </select>

                    <select
                        name="course"
                        value={filters.course}
                        onChange={handleFilterChange}
                        className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none max-w-[200px]"
                    >
                        <option value="">Todos los Cursos</option>
                        {courses.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                    <select
                        name="topic"
                        value={filters.topic}
                        onChange={handleFilterChange}
                        className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none max-w-[200px]"
                        disabled={!filters.course}
                    >
                        <option value="">Todos los Temas</option>
                        {topics
                            .filter((t) => !filters.course || t.course === parseInt(filters.course))
                            .map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.name}
                                </option>
                            ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold tracking-wider">
                                <th className="p-4">ID</th>
                                <th className="p-4">Enunciado</th>
                                <th className="p-4">Curso / Tema</th>
                                <th className="p-4">Dificultad</th>
                                <th className="p-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">
                                        Cargando...
                                    </td>
                                </tr>
                            ) : questions.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <AlertCircle className="w-8 h-8 opacity-50" />
                                            <span>No se encontraron preguntas</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                questions.map((q) => (
                                    <tr
                                        key={q.id}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                    >
                                        <td className="p-4 text-slate-500 font-mono text-xs">
                                            #{q.id}
                                        </td>
                                        <td className="p-4 max-w-md">
                                            <p className="line-clamp-2 text-slate-800 dark:text-slate-200 font-medium">
                                                {q.statement}
                                            </p>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm text-slate-900 dark:text-white font-medium">
                                                    {q.topic_name || `Tema ${q.topic}`}
                                                </span>
                                                <span className="text-xs text-slate-500">
                                                    {q.course_name || 'Curso General'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(q.difficulty)}`}
                                            >
                                                {q.difficulty}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(q.id)}
                                                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                                                    title="Editar"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(q.id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination (Simple) */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-sm text-slate-500">
                    <span>Mostrando {questions.length} resultados</span>
                    {/* Add real pagination here later */}
                </div>
            </div>
        </div>
    );
}
