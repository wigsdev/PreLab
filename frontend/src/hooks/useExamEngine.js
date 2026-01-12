import { useState, useCallback } from 'react';
import api from '../services/api';

export function useExamEngine() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [streak, setStreak] = useState(0);

    const [userAnswers, setUserAnswers] = useState([]); // Array of { isCorrect: boolean, answered: true }

    // Algoritmo de Fisher-Yates para mezclar
    const shuffleArray = (array) => {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    const startExam = useCallback(
        async ({ topicId = null, courseId = null, mode = 'standard' } = {}) => {
            setLoading(true);
            setIsFinished(false);
            setCurrentIndex(0);
            setScore(0);
            setStreak(0);
            setUserAnswers([]); // Reset answers
            setError(null);
            try {
                let endpoint = '/questions/';
                const params = {};

                if (mode === 'simulation') {
                    endpoint += 'simulation/';
                } else {
                    if (topicId) params.topic = topicId;
                    if (courseId) params.course = courseId;
                }

                const response = await api.get(endpoint, { params });

                // En modo simulación, ya vienen ~30 preguntas.
                // Igual aplicamos shuffle por si acaso para mezclar el orden de los cursos
                // (aunque backend ya podría haberlo hecho, es seguro hacerlo aquí también).
                // Para modo standard, mantenemos el slice(0, 10).

                const shuffled = shuffleArray(response.data);

                const selected =
                    mode === 'simulation'
                        ? shuffled // Usa todas las que trajo (ej. 30)
                        : shuffled.slice(0, 10); // Solo 10 para práctica rápida

                setQuestions(selected);
            } catch (err) {
                console.error('Error fetching questions:', err);
                setError('Error al cargar el examen. Revisa tu conexión.');
            } finally {
                setLoading(false);
            }
        },
        []
    );

    // Wrapper para separar lógica de "Anotar punto" vs "Siguiente Pregunta"
    // Para UX, a veces queremos anotar el punto clickeando la opción,
    // pero avanzar clickeando "Siguiente".
    // Ajustaremos para que submitAnswer solo anote el score, y nextQuestion avance.
    // Pero para cumplir estrictamente el Prompt que agrupa la lógica:

    const handleNext = (wasCorrect, selectedOptionId) => {
        // Guardamos el resultado de esta pregunta con la opción elegida
        setUserAnswers((prev) => [...prev, { isCorrect: wasCorrect, selectedOptionId }]);

        // Si el usuario acertó la anterior, sumamos.
        if (wasCorrect) {
            setScore((s) => s + 1);
            setStreak((s) => s + 1); // Aumentar racha
        } else {
            setStreak(0); // Reiniciar racha :(
        }

        if (currentIndex < questions.length - 1) {
            setCurrentIndex((current) => current + 1);
        } else {
            setIsFinished(true);
        }
    };

    const resetExam = () => {
        setIsFinished(false);
        setCurrentIndex(0);
        setScore(0);
        setStreak(0);
        setUserAnswers([]);
        setQuestions([]); // Limpiar para obligar a recargar/restart
        // startExam(); // Podríamos llamar a startExam aquí o dejar que la UI lo invoque
    };

    const finishExam = () => {
        setIsFinished(true);
    };

    return {
        questions,
        currentIndex,
        score,
        streak,
        userAnswers, // Expose userAnswers
        isFinished,
        loading,
        error,
        startExam,
        handleNext, // Usamos handleNext en lugar de submitAnswer directo para mayor claridad en UI
        finishExam,
        resetExam,
    };
}
