import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import ResultsCard from '../components/ResultsCard';
import ProgressBar from '../components/ProgressBar';
import ReviewList from '../components/ReviewList';
import Timer from '../components/Timer'; // Import UI
import { useExamEngine } from '../hooks/useExamEngine';
import { useTimer } from '../hooks/useTimer'; // Import Hook
import { Loader2, ArrowLeft, Flame } from 'lucide-react';

export default function ExamView() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isReviewing, setIsReviewing] = useState(false);
    const courseId = searchParams.get('course');
    const topicId = searchParams.get('topic'); // Optional future proofing
    const mode = searchParams.get('mode') || 'standard';

    const {
        questions,
        currentIndex,
        score,
        streak,
        userAnswers,
        isFinished,
        loading,
        error,
        startExam,
        handleNext,
        finishExam,
        resetExam // Aunque startExam reinicia, a veces es útil tener reset explícito
    } = useExamEngine();

    // Timer Configuration
    const initialTime = mode === 'simulation' ? 1800 : 600; // 30 mins vs 10 mins

    // We need to access setIsFinished from useExamEngine but it's internal.
    // Instead we can user a forced finish callback.
    // Wait, useExamEngine doesn't support "forceFinish". Let's assume we can just ignore for now
    // or better, if time is up, we just set isFinished(true) locally? 
    // No, useExamEngine owns the state.
    // Option: Add 'finishExam' to useExamEngine.

    // For now let's just use the timer for display and force navigate/finish.

    const { timeLeft, startTimer, stopTimer, formatTime } = useTimer(initialTime, () => {
        // Time Up Callback
        finishExam();
    });

    useEffect(() => {
        if (!loading && !isFinished && !isReviewing) {
            startTimer();
        } else {
            stopTimer();
        }
    }, [loading, isFinished, isReviewing]);

    useEffect(() => {
        // Si no hay params, carga random general (o error si prefieres)
        startExam({ courseId, topicId, mode });
    }, [courseId, topicId, mode]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-500 gap-2">
                <Loader2 className="animate-spin" /> Preparando preguntas...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 max-w-sm text-center">
                    <p className="font-bold">Error</p>
                    <p className="text-sm mt-1">{error}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-4 text-sm font-semibold bg-white border border-red-200 px-3 py-1 rounded hover:bg-gray-50"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    // Si no hay preguntas y no está cargando
    if (questions.length === 0 && !loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">No se encontraron preguntas</h2>
                    <p className="text-slate-500 mt-2">Intenta con otro curso o tema.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4 flex flex-col items-center justify-start max-w-md mx-auto">

            {/* Header View - Back Button & Progress */}
            {!isFinished && (
                <header className="w-full mb-6 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => navigate('/')}
                            className="p-2 -ml-2 text-slate-400 hover:text-slate-700 transition-colors rounded-full hover:bg-slate-100"
                            title="Salir del examen"
                        >
                            <ArrowLeft size={20} />
                        </button>

                        <Timer
                            timeString={formatTime(timeLeft)}
                            isWarning={timeLeft < 60}
                        />
                    </div>

                    <div className="text-right flex items-center gap-4">
                        {streak > 1 && (
                            <div className="flex items-center gap-1 text-orange-500 font-bold animate-in bounce-in duration-300">
                                <Flame className="w-6 h-6 fill-orange-500" />
                                <span className="text-2xl">x{streak}</span>
                            </div>
                        )}

                        <div>
                            <span className="text-3xl font-black text-blue-600">
                                {currentIndex + 1}
                            </span>
                            <span className="text-sm text-slate-400 font-bold">
                                /{questions.length}
                            </span>
                        </div>
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main className="w-full flex-1 flex items-center justify-center">
                {isFinished ? (
                    isReviewing ? (
                        <ReviewList
                            questions={questions}
                            userAnswers={userAnswers}
                            onHome={() => navigate('/')}
                        />
                    ) : (
                        <ResultsCard
                            score={score}
                            totalQuestions={questions.length}
                            onRetry={() => {
                                setIsReviewing(false);
                                startExam({ courseId, topicId, mode });
                            }}
                            onHome={() => navigate('/')}
                            onReview={() => setIsReviewing(true)}
                        />
                    )
                ) : (
                    <QuestionCard
                        key={questions[currentIndex].id}
                        question={questions[currentIndex]}
                        onNext={(isCorrect, selectedOptionId) => handleNext(isCorrect, selectedOptionId)}
                    />
                )}
            </main>

            {/* Smart Progress Bar */}
            {!isFinished && (
                <ProgressBar
                    total={questions.length}
                    currentIndex={currentIndex}
                    userAnswers={userAnswers}
                />
            )}
        </div>
    );
}
