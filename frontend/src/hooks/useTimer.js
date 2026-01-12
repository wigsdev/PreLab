import { useState, useEffect } from 'react';

export function useTimer(initialSeconds, onTimeUp) {
    const [timeLeft, setTimeLeft] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeLeft]);

    useEffect(() => {
        if (timeLeft === 0 && isActive) {
            // Do not call setIsActive(false) here to avoid setState-in-effect warning.
            // The parent can handle the completion via onTimeUp.
            // Or we just let the parent stop it.
            if (onTimeUp) onTimeUp();
        }
    }, [timeLeft, isActive, onTimeUp]);

    const startTimer = () => setIsActive(true);
    const stopTimer = () => setIsActive(false);
    const resetTimer = (newSeconds) => {
        setIsActive(false);
        setTimeLeft(newSeconds || initialSeconds);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return { timeLeft, isActive, startTimer, stopTimer, resetTimer, formatTime };
}
