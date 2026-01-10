import { useState, useEffect, useRef } from 'react';

export function useTimer(initialSeconds, onTimeUp) {
    const [timeLeft, setTimeLeft] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            if (onTimeUp) onTimeUp();
        }

        return () => clearInterval(intervalRef.current);
    }, [isActive, timeLeft, onTimeUp]);

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
