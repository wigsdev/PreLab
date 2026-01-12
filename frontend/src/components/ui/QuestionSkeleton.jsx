export default function QuestionSkeleton() {
    return (
        <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl dark:shadow-none border border-slate-200 dark:border-slate-700 p-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center mb-6">
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>

            {/* Question Text Skeleton */}
            <div className="space-y-3 mb-8">
                <div className="h-6 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>

            {/* Options Skeleton */}
            <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="h-16 w-full bg-slate-100 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-700"
                    ></div>
                ))}
            </div>
        </div>
    );
}
