import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExamAttempt } from '../services/api';
import ReviewList from '../components/ReviewList';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function ExamReviewView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [attempt, setAttempt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttempt = async () => {
            try {
                const data = await getExamAttempt(id);
                setAttempt(data);
            } catch (err) {
                console.error(err);
                if (err.response && err.response.data && err.response.data.detail) {
                    setError(`Error: ${err.response.data.detail}`);
                } else {
                    setError("No se pudo cargar la revisión del examen.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchAttempt();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-500 animate-pulse gap-2">
                <Loader2 className="animate-spin" /> Cargando revisión...
            </div>
        );
    }

    if (error || !attempt) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 text-center">
                    <p className="font-bold">Error</p>
                    <p className="text-sm mt-1">{error || "Intento no encontrado"}</p>
                    <button onClick={() => navigate('/dashboard')} className="mt-4 text-xs font-bold underline">
                        Volver al Dashboard
                    </button>
                </div>
            </div>
        );
    }

    // Transform backend data to match ReviewList expectation
    // ReviewList expects: questions (array), userAnswers (array of {isCorrect, selectedOptionId})
    // Backend returns: answers (array of {question {options...}, selected_option_id, is_correct })

    // We need to reconstruct 'questions' and 'userAnswers' from attempt.answers

    // NOTE: ReviewList likely expects 'questions' to calculate 'shuffledOptions'.
    // If we re-use ReviewList, we need raw 'questions' objects.
    // Our 'ExamAttemptDetailSerializer' includes 'answers' which has 'question' (ID) but not full question object by default?
    // Wait, let's check serializer.
    // 'ExamAttemptAnswerSerializer' has 'question_statement' but NOT the full question object with options!
    // ISSUE: ReviewList needs OPTIONS to display which one was right/wrong.
    // I need to update 'ExamAttemptAnswerSerializer' to include full question details OR `ReviewList` needs to handle pre-computed text.

    // Let's assume ReviewList needs full Question object.
    // I should update the BACKEND serializer to include nested Question with Options.
    // OR create a custom Review component for History that relies on stored texts.
    // Given 'ExamAttemptAnswerSerializer' has 'question_statement' and 'correct_option_text', maybe it's enough for a simple list?
    // Let's check ReviewList.jsx content first (I'm viewing it in this turn).

    // Placeholder until I check ReviewList:
    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <header className="mb-6 flex items-center gap-4">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                    <ArrowLeft size={20} className="text-slate-500" />
                </button>
                <div>
                    <h1 className="text-2xl font-black text-slate-800 dark:text-white">
                        Revisión: {attempt.course_name || attempt.topic_name || "Simulacro"}
                    </h1>
                    <p className="text-slate-500 text-sm">
                        Nota: {attempt.score} / {attempt.total_questions} • {new Date(attempt.created_at).toLocaleDateString()}
                    </p>
                </div>
            </header>

            {/* If I can't reuse ReviewList easily, I'll map manually here based on available data */}
            <div className="space-y-4">
                {attempt.answers.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                        <p className="text-slate-500 dark:text-slate-400 font-medium">
                            No hay detalles disponibles para este examen.
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                            (Posiblemente realizado antes de la corrección del historial)
                        </p>
                    </div>
                ) : (
                    attempt.answers.map((ans, idx) => (
                        <div key={ans.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                            <div className="flex gap-4">
                                <span className="font-black text-slate-300 text-lg">#{idx + 1}</span>
                                <div className="flex-1">
                                    <p className="font-bold text-slate-800 dark:text-slate-200 mb-4">{ans.question_statement}</p>

                                    <div className="space-y-2 text-sm">
                                        <div className={`p-3 rounded-lg border flex justify-between ${ans.is_correct ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                                            <span className="font-semibold">Tu respuesta:</span>
                                            <span>{ans.selected_option_text || "No respondió"}</span>
                                            {ans.is_correct ? <CheckCircle size={16} /> : <XCircle size={16} />}
                                        </div>
                                        {!ans.is_correct && (
                                            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 dark:bg-slate-900/50 dark:border-slate-700 text-slate-600 dark:text-slate-400 flex justify-between">
                                                <span className="font-semibold">Correcta:</span>
                                                <span>{ans.correct_option_text}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )))}
            </div>
        </div>
    );
}

import { CheckCircle, XCircle } from 'lucide-react';
