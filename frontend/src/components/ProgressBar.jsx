import clsx from 'clsx';

export default function ProgressBar({ total, currentIndex, userAnswers }) {
    return (
        <div className="w-full mx-auto mb-2 shrink-0">
            <div className="flex gap-1 h-1.5">
                {Array.from({ length: total }).map((_, i) => {
                    const isPast = i < currentIndex;
                    const isCurrent = i === currentIndex;
                    const answer = userAnswers[i];

                    let bgClass = 'bg-gray-200 dark:bg-slate-700'; // Pending

                    if (isPast && answer) {
                        bgClass = answer.isCorrect ? 'bg-green-500' : 'bg-red-500';
                    } else if (isCurrent) {
                        bgClass = 'bg-blue-500 animate-pulse';
                    }

                    return (
                        <div
                            key={i}
                            className={clsx(
                                'flex-1 rounded-full transition-all duration-300',
                                bgClass
                            )}
                        />
                    );
                })}
            </div>
        </div>
    );
}
