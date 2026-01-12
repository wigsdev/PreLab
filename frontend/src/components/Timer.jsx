import { Clock } from 'lucide-react';
import clsx from 'clsx';

export default function Timer({ timeString, isWarning }) {
    return (
        <div
            className={clsx(
                'flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-sm font-bold shadow-sm border transition-colors',
                isWarning
                    ? 'bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 animate-pulse'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-gray-200 dark:border-slate-700'
            )}
        >
            <Clock className="w-4 h-4" />
            <span>{timeString}</span>
        </div>
    );
}
