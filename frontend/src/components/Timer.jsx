import { Clock } from 'lucide-react';
import clsx from 'clsx';

export default function Timer({ timeString, isWarning }) {
    return (
        <div className={clsx(
            "flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-sm font-bold shadow-sm border",
            isWarning
                ? "bg-red-50 text-red-600 border-red-200 animate-pulse"
                : "bg-white text-slate-700 border-gray-200"
        )}>
            <Clock className="w-4 h-4" />
            <span>{timeString}</span>
        </div>
    );
}
