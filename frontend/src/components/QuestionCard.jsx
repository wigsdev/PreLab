import { useState, useMemo } from 'react';
import clsx from 'clsx';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export default function QuestionCard({ question, onNext }) {
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const shuffledOptions = useMemo(() => {
        const opts = [...question.options];
        for (let i = opts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [opts[i], opts[j]] = [opts[j], opts[i]];
        }
        return opts;
    }, [question.id, question.options]); // Re-shuffle only if question changes

    const handleSelect = (optionId) => {
        if (isAnswered) return;
        setSelectedOptionId(optionId);
        setIsAnswered(true);
    };

    const getOptionStyle = (option) => {
        if (!isAnswered) {
            // Estado inicial: gris claro, hover azulito
            return "border-gray-200 hover:border-blue-300 hover:bg-blue-50";
        }

        if (option.is_correct) {
            // Siempre marcar la correcta en verde
            return "border-green-500 bg-green-50 text-green-800 font-medium";
        }

        if (selectedOptionId === option.id && !option.is_correct) {
            // Si elegí esta y es incorrecta: rojo
            return "border-red-500 bg-red-50 text-red-800";
        }

        // Las demás quedan gris suave
        return "border-gray-100 opacity-50";
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">

            {/* 1. Header: Dificultad y Tema */}
            <div className="bg-slate-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {question.topic_name}
                </span>
                <span className={clsx(
                    "text-xs px-2 py-1 rounded-full font-semibold border",
                    question.difficulty === 'BASICO' ? "bg-green-100 text-green-700 border-green-200" :
                        question.difficulty === 'INTERMEDIO' ? "bg-yellow-100 text-yellow-700 border-yellow-200" :
                            "bg-red-100 text-red-700 border-red-200"
                )}>
                    {question.difficulty}
                </span>
            </div>

            {/* 2. Cuerpo: Enunciado e Imagen */}
            <div className="p-6">
                <p className="text-lg text-slate-800 font-medium leading-relaxed mb-6">
                    {question.statement}
                </p>

                {question.image && (
                    <div className="mb-6 rounded-lg overflow-hidden border border-gray-200">
                        <img
                            src={question.image}
                            alt="Pregunta"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}

                {/* 3. Opciones (Thumb Zone) */}
                <div className="space-y-3">
                    {shuffledOptions.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleSelect(option.id)}
                            disabled={isAnswered}
                            className={clsx(
                                "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 relative flex items-center justify-between",
                                getOptionStyle(option)
                            )}
                        >
                            <span className="pr-8">{option.text}</span>
                            {isAnswered && option.is_correct && <CheckCircle className="w-5 h-5 text-green-600" />}
                            {isAnswered && selectedOptionId === option.id && !option.is_correct && <XCircle className="w-5 h-5 text-red-600" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* 4. Feedback y Botón Siguiente */}
            {isAnswered && (
                <div className="bg-slate-50 p-6 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="mb-4">
                        <h4 className="text-sm font-bold text-slate-700 mb-1">Explicación:</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            {question.explanation || "No hay explicación disponible para esta pregunta."}
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
                            const wasCorrect = selectedOption?.is_correct || false;

                            setIsAnswered(false);
                            setSelectedOptionId(null);
                            onNext(wasCorrect, selectedOptionId);
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        Siguiente Pregunta
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
}
