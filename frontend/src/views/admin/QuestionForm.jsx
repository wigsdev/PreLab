import { useState, useEffect } from 'react';
import { Save, PlusCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

export default function QuestionForm({ initialData = null, onSubmit, isEditing = false }) {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        course: '',
        topic: '',
        text: '',
        explanation: '',
        options: [
            { text: '', is_correct: false },
            { text: '', is_correct: false },
            { text: '', is_correct: false },
            { text: '', is_correct: false }
        ]
    });

    // Load initial data if editing
    useEffect(() => {
        if (initialData) {
            setFormData({
                course: initialData.topic_data?.course || '', // Assumes backend sends enough info or we fetch topic to get course
                topic: initialData.topic || '',
                text: initialData.statement || '',
                explanation: initialData.explanation || '',
                options: initialData.options.length === 4 ? initialData.options : [
                    { text: '', is_correct: false },
                    { text: '', is_correct: false },
                    { text: '', is_correct: false },
                    { text: '', is_correct: false }
                ]
            });
        }
    }, [initialData]);

    // Load Courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api.get('/courses/');
                setCourses(response.data);
            } catch (error) {
                console.error("Error loading courses");
            }
        };
        fetchCourses();
    }, []);

    // Load Topics when Course changes
    useEffect(() => {
        if (formData.course) {
            const fetchTopics = async () => {
                try {
                    const response = await api.get('/topics/');
                    // Filter topics by selected course (frontend filtering for now, ideally backend filter)
                    const filtered = response.data.filter(t => t.course === parseInt(formData.course));
                    setTopics(filtered);
                } catch (error) {
                    console.error("Error loading topics");
                }
            };
            fetchTopics();
        } else {
            setTopics([]);
        }
    }, [formData.course]);

    // If initialData provides a topic but we don't know the course yet
    // We might need to fetch the topic details to set the course. 
    // BUT for now, let's assume the parent passes correct structure or we rely on the user to re-select if needed.
    // Ideally, initialData should include the course ID. 
    // Current serializer returns course_name and topic id. 
    // We might need to fetch the specific topic to know its course ID if not provided.
    // Let's patch this by fetching topic details if we have topic but no course.
    useEffect(() => {
        if (initialData && initialData.topic && !formData.course) {
            const fetchTopicDetails = async () => {
                try {
                    const response = await api.get(`/topics/${initialData.topic}/`);
                    setFormData(prev => ({ ...prev, course: response.data.course }));
                } catch (e) {
                    console.error("Error resolving course from topic");
                }
            };
            fetchTopicDetails();
        }
    }, [initialData, formData.course]);


    const handleOptionChange = (index, value) => {
        const newOptions = [...formData.options];
        newOptions[index].text = value;
        setFormData({ ...formData, options: newOptions });
    };

    const handleCorrectSelect = (index) => {
        const newOptions = formData.options.map((opt, i) => ({
            ...opt,
            is_correct: i === index
        }));
        setFormData({ ...formData, options: newOptions });
    };

    const handleSubmitLocal = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.topic || !formData.text) {
            toast.error("Faltan campos requeridos (Tema, Enunciado)");
            setLoading(false);
            return;
        }

        const correctOption = formData.options.find(o => o.is_correct);
        if (!correctOption) {
            toast.error("Selecciona una respuesta correcta");
            setLoading(false);
            return;
        }

        try {
            await onSubmit(formData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 pb-24">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                    {isEditing ? <EditIcon className="text-indigo-600" /> : <PlusCircle className="text-indigo-600 dark:text-indigo-400" />}
                    {isEditing ? 'Editar Pregunta' : 'Crear Pregunta'}
                </h1>
                <button
                    onClick={() => navigate('/admin/questions')}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} /> Volver
                </button>
            </div>

            <form onSubmit={handleSubmitLocal} className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Curso</label>
                        <div className="relative">
                            <select
                                value={formData.course}
                                onChange={(e) => setFormData({ ...formData, course: e.target.value, topic: '' })}
                                className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white appearance-none outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                            >
                                <option value="">Seleccionar Curso...</option>
                                {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Tema</label>
                        <div className="relative">
                            <select
                                value={formData.topic}
                                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white appearance-none outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium disabled:opacity-50"
                                disabled={!formData.course}
                            >
                                <option value="">Seleccionar Tema...</option>
                                {topics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Enunciado de la Pregunta</label>
                    <textarea
                        value={formData.text}
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                        className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white min-h-[120px] outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-lg font-medium resize-y"
                        placeholder="Ej: ¿Cuál es la capital de Francia?"
                    />
                </div>

                <div className="space-y-4">
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                        Opciones de Respuesta
                        <span className="normal-case font-normal ml-2 text-slate-400">(Marca la correcta con el círculo)</span>
                    </label>
                    <div className="grid gap-3">
                        {formData.options.map((opt, idx) => (
                            <div key={idx} className={`group flex items-center gap-3 p-2 rounded-xl border-2 transition-all ${opt.is_correct ? 'border-green-500 bg-green-50/50 dark:bg-green-900/10' : 'border-transparent hover:border-slate-200 dark:hover:border-slate-700'}`}>
                                <button
                                    type="button"
                                    onClick={() => handleCorrectSelect(idx)}
                                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${opt.is_correct ? 'bg-green-500 text-white shadow-lg shadow-green-500/30 scale-100' : 'bg-slate-100 dark:bg-slate-800 text-slate-300 hover:text-green-500 scale-90 hover:scale-100'}`}
                                >
                                    <CheckCircle2 size={20} />
                                </button>
                                <input
                                    type="text"
                                    value={opt.text}
                                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                                    className="flex-1 bg-transparent p-2 text-slate-800 dark:text-white outline-none placeholder:text-slate-300 font-medium"
                                    placeholder={`Opción ${String.fromCharCode(65 + idx)}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Retroalimentación (Explicación)</label>
                    <div className="p-1 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-100 dark:border-indigo-900/30">
                        <textarea
                            value={formData.explanation}
                            onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                            className="w-full p-4 rounded-lg bg-transparent text-slate-700 dark:text-slate-200 min-h-[80px] outline-none placeholder:text-slate-400/70"
                            placeholder="Explica al estudiante por qué esta es la respuesta correcta..."
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xl shadow-indigo-600/20 active:scale-95 transition-all flex items-center gap-2"
                    >
                        <Save size={20} />
                        {loading ? 'Guardando...' : (isEditing ? 'Actualizar Pregunta' : 'Guardar Pregunta')}
                    </button>
                </div>
            </form>
        </div>
    );
}

function EditIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
    );
}
