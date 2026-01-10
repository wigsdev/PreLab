import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api, { createQuestion } from '../../services/api';
import { Save, PlusCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function CreateQuestionView() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);

    const [questionData, setQuestionData] = useState({
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

    useEffect(() => {
        if (user && !user.is_staff) {
            navigate('/dashboard');
        }

        const fetchCourses = async () => {
            try {
                const response = await api.get('/courses/');
                setCourses(response.data);
            } catch (error) {
                console.error("Error loading courses");
            }
        };
        fetchCourses();
    }, [user, navigate]);

    useEffect(() => {
        if (questionData.course) {
            const fetchTopics = async () => {
                try {
                    const response = await api.get('/topics/');
                    const filtered = response.data.filter(t => t.course === parseInt(questionData.course));
                    setTopics(filtered);
                } catch (error) {
                    console.error("Error loading topics");
                }
            };
            fetchTopics();
        } else {
            setTopics([]);
        }
    }, [questionData.course]);

    const handleOptionChange = (index, value) => {
        const newOptions = [...questionData.options];
        newOptions[index].text = value;
        setQuestionData({ ...questionData, options: newOptions });
    };

    const handleCorrectSelect = (index) => {
        const newOptions = questionData.options.map((opt, i) => ({
            ...opt,
            is_correct: i === index
        }));
        setQuestionData({ ...questionData, options: newOptions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!questionData.topic || !questionData.text) {
            toast.error("Faltan campos requeridos");
            setLoading(false);
            return;
        }

        const correctOption = questionData.options.find(o => o.is_correct);
        if (!correctOption) {
            toast.error("Selecciona una respuesta correcta");
            setLoading(false);
            return;
        }

        try {
            await createQuestion({
                topic: questionData.topic,
                text: questionData.text,
                image: null,
                explanation: questionData.explanation,
                options: questionData.options
            });
            toast.success("Pregunta creada con éxito");
            setQuestionData({
                ...questionData,
                text: '',
                explanation: '',
                options: [
                    { text: '', is_correct: false },
                    { text: '', is_correct: false },
                    { text: '', is_correct: false },
                    { text: '', is_correct: false }
                ]
            });
        } catch (error) {
            toast.error("Error al crear la pregunta");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 pb-24">
            <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <PlusCircle className="text-indigo-600 dark:text-indigo-400" /> Crear Pregunta
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Curso</label>
                        <select
                            value={questionData.course}
                            onChange={(e) => setQuestionData({ ...questionData, course: e.target.value })}
                            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                        >
                            <option value="">Seleccionar...</option>
                            {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Tema</label>
                        <select
                            value={questionData.topic}
                            onChange={(e) => setQuestionData({ ...questionData, topic: e.target.value })}
                            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                            disabled={!questionData.course}
                        >
                            <option value="">Seleccionar...</option>
                            {topics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Enunciado</label>
                    <textarea
                        value={questionData.text}
                        onChange={(e) => setQuestionData({ ...questionData, text: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white min-h-[100px]"
                        placeholder="Escribe la pregunta aquí..."
                    />
                </div>

                <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Opciones (Marca la correcta)</label>
                    {questionData.options.map((opt, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => handleCorrectSelect(idx)}
                                className={`p-3 rounded-full border transition-colors ${opt.is_correct ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 dark:border-slate-600 text-slate-300 hover:border-green-400'}`}
                            >
                                <CheckCircle2 size={20} />
                            </button>
                            <input
                                type="text"
                                value={opt.text}
                                onChange={(e) => handleOptionChange(idx, e.target.value)}
                                className="flex-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                placeholder={`Opción ${idx + 1}`}
                            />
                        </div>
                    ))}
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Explicación / Solucionario</label>
                    <textarea
                        value={questionData.explanation}
                        onChange={(e) => setQuestionData({ ...questionData, explanation: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white min-h-[80px]"
                        placeholder="Explica por qué la respuesta es correcta..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    <Save size={20} /> Guardar Pregunta
                </button>
            </form>
        </div>
    );
}
