import { CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';

export default function ReviewList({ questions, userAnswers, onHome }) {
    return (
        <div className="w-full max-w-2xl mx-auto py-8 px-4 animate-in fade-in duration-500">
            <header className="mb-8 text-center">
                <h2 className="text-3xl font-black text-slate-800">Revisión de Examen</h2>
                <p className="text-slate-500 mt-2">
                    Repasa tus respuestas y aprende de los errores.
                </p>
            </header>

            <div className="space-y-8">
                {questions.map((question, index) => {
                    const answer = userAnswers[index];
                    const wasCorrect = answer?.isCorrect;
                    const selectedId = answer?.selectedOptionId;

                    return (
                        <div
                            key={question.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                        >
                            {/* Header pregunta */}
                            <div
                                className={clsx(
                                    'px-6 py-4 flex items-center gap-3 border-b',
                                    wasCorrect
                                        ? 'bg-green-50 border-green-100'
                                        : 'bg-red-50 border-red-100'
                                )}
                            >
                                <div
                                    className={clsx(
                                        'w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shrink-0',
                                        wasCorrect ? 'bg-green-500' : 'bg-red-500'
                                    )}
                                >
                                    {index + 1}
                                </div>
                                <h3 className="font-bold text-slate-800 flex-1">
                                    {question.statement}
                                </h3>
                                {wasCorrect ? (
                                    <CheckCircle className="text-green-600 w-6 h-6 shrink-0" />
                                ) : (
                                    <XCircle className="text-red-600 w-6 h-6 shrink-0" />
                                )}
                            </div>

                            {/* Opciones */}
                            <div className="p-6 space-y-3 bg-white">
                                {question.options.map((opt) => {
                                    const isSelected = opt.id === selectedId;
                                    const isCorrectOpt = opt.is_correct;

                                    let style = 'border-gray-100 opacity-60'; // Default muted
                                    let icon = null;

                                    if (isCorrectOpt) {
                                        style =
                                            'border-green-500 bg-green-50 text-green-900 font-medium opacity-100';
                                        icon = (
                                            <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                                        );
                                    } else if (isSelected && !wasCorrect) {
                                        style = 'border-red-500 bg-red-50 text-red-900 opacity-100';
                                        icon = <XCircle className="w-4 h-4 text-red-600 ml-auto" />;
                                    } else if (isSelected && wasCorrect) {
                                        // Ya cubierto por isCorrectOpt, pero por si acaso
                                        style =
                                            'border-green-500 bg-green-50 text-green-900 font-medium opacity-100';
                                    }

                                    return (
                                        <div
                                            key={opt.id}
                                            className={clsx(
                                                'p-3 rounded-lg border flex items-center',
                                                style
                                            )}
                                        >
                                            <span className="text-sm">{opt.text}</span>
                                            {icon}
                                        </div>
                                    );
                                })}

                                {/* Explicación */}
                                {!wasCorrect && (
                                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg text-sm text-yellow-800 border border-yellow-100">
                                        <span className="font-bold block mb-1">
                                            💡 Explicación:
                                        </span>
                                        {question.explanation || 'Sin explicación.'}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-10 text-center">
                <button
                    onClick={onHome}
                    className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all"
                >
                    Volver al Inicio
                </button>
            </div>
        </div>
    );
}
