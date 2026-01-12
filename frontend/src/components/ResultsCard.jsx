import { useEffect, useState, useRef } from 'react';
import { RotateCcw, Home, BookOpen, UserPlus, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { saveExamResult } from '../services/api';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import confetti from 'canvas-confetti';

export default function ResultsCard({
    score,
    totalQuestions,
    topicId,
    courseId,
    mode,
    questions,
    userAnswers,
    onRetry,
    onHome,
    onReview,
}) {
    const { user } = useAuth();
    const [saveStatus, setSaveStatus] = useState('idle'); // idle, saving, success, error
    const hasSaved = useRef(false); // Prevents Run-Twice in Strict Mode

    // Lógica de Persistencia (Side Effect)
    useEffect(() => {
        const saveResult = async () => {
            if (hasSaved.current) return;
            hasSaved.current = true;

            // Construir payload detallado de respuestas
            const answersPayload = userAnswers.map((ans, index) => ({
                question_id: questions[index].id,
                selected_option_id: ans.selectedOptionId,
                is_correct: ans.isCorrect,
            }));

            const historyItem = {
                date: new Date().toISOString(),
                score: score,
                total: totalQuestions,
                topic: topicId ? topicId : null,
                course: courseId ? courseId : null,
                exam_type: mode === 'simulation' ? 'INTEGRAL' : 'COURSE',
                correct_count: score, // Simplificación
                total_questions: totalQuestions,
                answers: answersPayload, // [NEW] Detailed Answers
            };

            if (user) {
                // Modo Autenticado: Guardar en Nube
                setSaveStatus('saving');
                try {
                    await saveExamResult(historyItem);
                    setSaveStatus('success');
                } catch (error) {
                    console.error('Error saving to cloud:', error);
                    setSaveStatus('error');
                    // Optional: revert hasSaved if we want to retry, but usually we don't for auto-save
                }
            } else {
                // Modo Invitado: Guardar en LocalStorage
                const storedHistory = localStorage.getItem('guest_history');
                let history = storedHistory ? JSON.parse(storedHistory) : [];
                history.push(historyItem);

                // Limitar a los últimos 10 para no llenar localStorage con detales
                if (history.length > 10) {
                    history = history.slice(-10);
                }

                localStorage.setItem('guest_history', JSON.stringify(history));
            }
        };

        saveResult();
        // Empty dependency array: Solo guarda al montar el componente (cuando termina el examen)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Mensaje Dinámico
    const percentage = (score / totalQuestions) * 100;

    useEffect(() => {
        if (percentage >= 80) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            });
        }
    }, [percentage]);

    let message = 'Sigue practicando 😐';
    let colorClass =
        'text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800';

    if (percentage >= 80) {
        // >15 de 20 es 75%
        message = '¡Eres un genio! 🚀';
        colorClass =
            'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800';
    } else if (percentage < 50) {
        colorClass =
            'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800';
    }

    return (
        <div className="w-full max-w-sm mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl dark:shadow-none overflow-hidden animate-in zoom-in duration-300 transition-colors">
            <div className="p-8 text-center">
                <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-6">
                    Resultados
                </h2>

                {/* Círculo de Nota */}
                <div
                    className={clsx(
                        'w-32 h-32 mx-auto rounded-full flex items-center justify-center border-4 mb-6 shadow-inner',
                        colorClass
                    )}
                >
                    <div>
                        <span className="text-4xl font-black block">{score}</span>
                        <span className="text-sm font-semibold opacity-70">
                            de {totalQuestions}
                        </span>
                    </div>
                </div>

                {/* Mensaje */}
                <div className={clsx('py-2 px-4 rounded-lg border font-bold mb-8', colorClass)}>
                    {message}
                </div>

                {/* Feedback de Guardado (Auth) o CTA (Guest) */}
                <div className="mb-6">
                    {user ? (
                        <div
                            className={`p-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                                saveStatus === 'saving'
                                    ? 'bg-slate-50 text-slate-500 dark:bg-slate-700/50 dark:text-slate-400'
                                    : saveStatus === 'success'
                                      ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                      : saveStatus === 'error'
                                        ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                                        : ''
                            }`}
                        >
                            {saveStatus === 'saving' && (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" /> Guardando
                                    resultado...
                                </>
                            )}
                            {saveStatus === 'success' && (
                                <>
                                    <CheckCircle className="w-4 h-4" /> Resultado guardado en tu
                                    nube personal
                                </>
                            )}
                            {saveStatus === 'error' &&
                                'No se pudo guardar en la nube (Error de red)'}
                        </div>
                    ) : (
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 p-4 rounded-xl text-left">
                            <p className="text-xs text-indigo-800 dark:text-indigo-300 mb-2 font-semibold flex items-center gap-1">
                                <UserPlus className="w-3.5 h-3.5" />
                                Modo Invitado
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-snug">
                                Este resultado solo vive en este dispositivo. Crea una cuenta gratis
                                para guardar tu progreso histórico.
                            </p>
                            <div className="flex gap-2">
                                <Link
                                    to="/register"
                                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2 px-3 rounded-lg text-center transition-colors"
                                >
                                    Crear Cuenta
                                </Link>
                                <Link
                                    to="/login"
                                    className="flex-1 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold py-2 px-3 rounded-lg text-center transition-colors"
                                >
                                    Ya tengo una
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Botones de Acción */}
                <div className="space-y-3">
                    <button
                        onClick={onRetry}
                        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-600/20 dark:shadow-none active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Intentar de nuevo
                    </button>

                    <button
                        onClick={onReview}
                        className="w-full bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-indigo-700 dark:text-indigo-300 font-bold py-3 px-6 rounded-xl border border-indigo-200 dark:border-slate-600 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <BookOpen className="w-5 h-5" />
                        Revisar Examen
                    </button>

                    <button
                        onClick={onHome} // Navegación controlada por el padre
                        className="w-full bg-white hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 text-slate-700 font-bold py-3 px-6 rounded-xl border border-gray-200 dark:border-slate-600 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <Home className="w-5 h-5" />
                        Volver al Inicio
                    </button>
                </div>
            </div>
        </div>
    );
}
