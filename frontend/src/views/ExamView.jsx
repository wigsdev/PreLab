import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import ResultsCard from '../components/ResultsCard';
import ProgressBar from '../components/ProgressBar';
import ReviewList from '../components/ReviewList';
import Timer from '../components/Timer';
import QuestionSkeleton from '../components/ui/QuestionSkeleton'; // Skeleton Import
import { useExamEngine } from '../hooks/useExamEngine';
import { useTimer } from '../hooks/useTimer';
import { Loader2, ArrowLeft, Flame } from 'lucide-react';

export default function ExamView() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isReviewing, setIsReviewing] = useState(false);
    const courseId = searchParams.get('course');
    const topicId = searchParams.get('topic');
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
        resetExam
    } = useExamEngine();

    const initialTime = mode === 'simulation' ? 1800 : 600;

    const { timeLeft, startTimer, stopTimer, formatTime } = useTimer(initialTime, () => {
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
        startExam({ courseId, topicId, mode });
    }, [courseId, topicId, mode]);

    if (loading) {
        return (
            <div className="min-h-screen py-8 px-4 flex flex-col items-center justify-start max-w-md mx-auto">
                {/* Skeleton Header */}
                <div className="w-full mb-6 flex justify-between items-center animate-pulse">
                    <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                    <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>
                <div className="w-full flex-1 flex items-center justify-center">
                    <QuestionSkeleton />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg border border-red-200 dark:border-red-800 max-w-sm text-center">
                    <p className="font-bold">Error</p>
                    <p className="text-sm mt-1">{error}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-4 text-sm font-semibold bg-white dark:bg-slate-800 border border-red-200 dark:border-red-700 px-3 py-1 rounded hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
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
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">No se encontraron preguntas</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Intenta con otro curso o tema.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto pt-4 pb-2 px-4 flex flex-col min-h-[calc(100vh-70px)] justify-start">

            {/* Header View - Back Button & Progress */}
            {!isFinished && (
                <header className="w-full mb-4 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => navigate('/')}
                            className="p-1.5 -ml-2 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Salir del examen"
                        >
                            <ArrowLeft size={18} />
                        </button>

                        <Timer
                            timeString={formatTime(timeLeft)}
                            isWarning={timeLeft < 60}
                        />
                    </div>

                    <div className="text-right flex items-center gap-3">
                        {streak > 1 && (
                            <div className="flex items-center gap-1 text-orange-500 font-bold animate-in bounce-in duration-300">
                                <Flame className="w-5 h-5 fill-orange-500" />
                                <span className="text-xl">x{streak}</span>
                            </div>
                        )}

                        <div>
                            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                                {currentIndex + 1}
                            </span>
                            <span className="text-xs text-slate-400 dark:text-slate-500 font-bold">
                                /{questions.length}
                            </span>
                        </div>
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main className="w-full mb-6">
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
