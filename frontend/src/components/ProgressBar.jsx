import clsx from 'clsx';

export default function ProgressBar({ total, currentIndex, userAnswers }) {
    return (
        <div className="w-full max-w-md mx-auto mb-6">
            <div className="flex gap-1 h-2">
                {Array.from({ length: total }).map((_, i) => {
                    const isPast = i < currentIndex;
                    const isCurrent = i === currentIndex;
                    const answer = userAnswers[i];

                    let bgClass = "bg-gray-200"; // Pending

                    if (isPast && answer) {
                        bgClass = answer.isCorrect ? "bg-green-500" : "bg-red-500";
                    } else if (isCurrent) {
                        bgClass = "bg-blue-500 animate-pulse";
                    }

                    return (
                        <div
                            key={i}
                            className={clsx(
                                "flex-1 rounded-full transition-all duration-300",
                                bgClass
                            )}
                        />
                    );
                })}
            </div>
        </div>
    );
}
