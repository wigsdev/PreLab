import { useEffect } from 'react';
import { RotateCcw, Home, BookOpen } from 'lucide-react';
import clsx from 'clsx';
import confetti from 'canvas-confetti';

export default function ResultsCard({ score, totalQuestions, onRetry, onHome, onReview }) {

    // Lógica de Persistencia (Side Effect)
    useEffect(() => {
        const saveResult = () => {
            const historyItem = {
                date: new Date().toISOString(),
                score: score,
                total: totalQuestions,
            };

            // Leer historial existente
            const storedHistory = localStorage.getItem('guest_history');
            let history = storedHistory ? JSON.parse(storedHistory) : [];

            // Agregar nuevo resultado y guardar
            history.push(historyItem);
            localStorage.setItem('guest_history', JSON.stringify(history));
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
                origin: { y: 0.6 }
            });
        }
    }, [percentage]);

    let message = "Sigue practicando 😐";
    let colorClass = "text-yellow-600 bg-yellow-50 border-yellow-200";

    if (percentage >= 80) { // >15 de 20 es 75%
        message = "¡Eres un genio! 🚀";
        colorClass = "text-green-600 bg-green-50 border-green-200";
    } else if (percentage < 50) {
        colorClass = "text-red-600 bg-red-50 border-red-200";
    }

    return (
        <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 text-center">
                <h2 className="text-2xl font-black text-slate-800 mb-6">Resultados</h2>

                {/* Círculo de Nota */}
                <div className={clsx(
                    "w-32 h-32 mx-auto rounded-full flex items-center justify-center border-4 mb-6 shadow-inner",
                    colorClass
                )}>
                    <div>
                        <span className="text-4xl font-black block">{score}</span>
                        <span className="text-sm font-semibold opacity-70">de {totalQuestions}</span>
                    </div>
                </div>

                {/* Mensaje */}
                <div className={clsx("py-2 px-4 rounded-lg border font-bold mb-8", colorClass)}>
                    {message}
                </div>

                {/* Botones de Acción */}
                <div className="space-y-3">
                    <button
                        onClick={onRetry}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Intentar de nuevo
                    </button>

                    <button
                        onClick={onReview}
                        className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold py-3 px-6 rounded-xl border border-indigo-200 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <BookOpen className="w-5 h-5" />
                        Revisar Examen
                    </button>

                    <button
                        onClick={onHome} // Navegación controlada por el padre
                        className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-xl border border-gray-200 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <Home className="w-5 h-5" />
                        Volver al Inicio
                    </button>
                </div>
            </div>
        </div>
    );
}
