import { useState } from 'react';
import clsx from 'clsx';
import { CheckCircle, XCircle, ArrowRight, Flag } from 'lucide-react';
import ReportModal from './ui/ReportModal';
import MathText from './ui/MathText';

export default function QuestionCard({ question, onNext }) {
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    // Initialize shuffled options only once on mount.
    // Since the parent uses key={question.id}, this component remounts for each new question.
    const [shuffledOptions] = useState(() => {
        const opts = [...question.options];
        for (let i = opts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [opts[i], opts[j]] = [opts[j], opts[i]];
        }
        return opts;
    });

    const handleSelect = (optionId) => {
        if (isAnswered) return;
        setSelectedOptionId(optionId);
        setIsAnswered(true);
    };

    const getOptionStyle = (option) => {
        if (!isAnswered) {
            // Estado inicial: gris claro, hover azulito
            return 'border-gray-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-700 dark:text-slate-200';
        }

        if (option.is_correct) {
            // Siempre marcar la correcta en verde
            return 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 font-medium';
        }

        if (selectedOptionId === option.id && !option.is_correct) {
            // Si elegí esta y es incorrecta: rojo
            return 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300';
        }

        // Las demás quedan gris suave
        return 'border-gray-100 dark:border-slate-800 opacity-50 text-slate-500 dark:text-slate-600';
    };

    return (
        <div className="w-full max-w-none mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-none border border-gray-100 dark:border-slate-700 transition-colors duration-300 flex flex-col relative">
            {/* Modal de Reporte */}
            <ReportModal
                questionId={question.id}
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
            />

            {/* 1. Header: Dificultad y Tema */}
            <div className="bg-slate-50 dark:bg-slate-900/50 px-4 py-2.5 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center transition-colors shrink-0">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {question.topic_name}
                    </span>
                    <button
                        onClick={() => setIsReportModalOpen(true)}
                        className="text-slate-300 hover:text-red-400 dark:text-slate-600 dark:hover:text-red-400 transition-colors"
                        title="Reportar Error"
                    >
                        <Flag size={12} />
                    </button>
                </div>
                <span
                    className={clsx(
                        'text-[10px] px-2 py-0.5 rounded-full font-semibold border',
                        question.difficulty === 'BASICO'
                            ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
                            : question.difficulty === 'INTERMEDIO'
                              ? 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800'
                              : 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
                    )}
                >
                    {question.difficulty}
                </span>
            </div>

            {/* 2. Cuerpo: Enunciado e Imagen */}
            <div className="p-5 flex-1 overflow-y-auto custom-scrollbar">
                <div className="text-base text-slate-800 dark:text-slate-100 font-medium leading-relaxed mb-4">
                    <MathText text={question.statement} />
                </div>

                {question.image && (
                    <div className="mb-4 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700">
                        <img
                            src={question.image}
                            alt="Pregunta"
                            className="w-full h-auto max-h-40 object-contain bg-slate-50 dark:bg-slate-900"
                        />
                    </div>
                )}

                {/* 3. Opciones (Thumb Zone) */}
                <div className="space-y-2">
                    {shuffledOptions.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleSelect(option.id)}
                            disabled={isAnswered}
                            className={clsx(
                                'w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 relative flex items-center justify-between text-sm',
                                getOptionStyle(option)
                            )}
                        >
                            <span className="pr-6 w-full">
                                <MathText text={option.text} inline />
                            </span>
                            {isAnswered && option.is_correct && (
                                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                            )}
                            {isAnswered && selectedOptionId === option.id && !option.is_correct && (
                                <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* 4. Feedback y Botón Siguiente */}
            {isAnswered && (
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 border-t border-gray-100 dark:border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-300 transition-colors shrink-0">
                    <div className="mb-3">
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-0.5">
                            Explicación:
                        </h4>
                        <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                            <MathText
                                text={
                                    question.explanation ||
                                    'No hay explicación disponible para esta pregunta.'
                                }
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            const selectedOption = question.options.find(
                                (opt) => opt.id === selectedOptionId
                            );
                            const wasCorrect = selectedOption?.is_correct || false;

                            setIsAnswered(false);
                            setSelectedOptionId(null);
                            onNext(wasCorrect, selectedOptionId);
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold py-2.5 px-4 rounded-lg shadow-md shadow-blue-600/20 dark:shadow-none active:scale-95 transition-all flex items-center justify-center gap-2 text-sm"
                    >
                        Siguiente Pregunta
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
