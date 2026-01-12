import { useState } from 'react';
import axios from 'axios';

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

    const startExam = async ({ topicId = null, courseId = null, mode = 'standard' } = {}) => {
        setLoading(true);
        setIsFinished(false);
        setCurrentIndex(0);
        setScore(0);
        setStreak(0);
        setUserAnswers([]); // Reset answers
        setError(null);
        try {
            let url = 'http://127.0.0.1:8000/api/questions/';

            if (mode === 'simulation') {
                url += 'simulation/';
            } else {
                const params = [];
                if (topicId) params.push(`topic=${topicId}`);
                if (courseId) params.push(`course=${courseId}`);

                if (params.length > 0) {
                    url += `?${params.join('&')}`;
                }
            }

            const response = await axios.get(url);

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
    };

    const submitAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore((prev) => prev + 1);
        }

        // Pequeño delay para que el usuario vea el feedback visual (verde/rojo) antes de cambiar
        // Opcional: Esto lo maneja la UI con el botón "Siguiente", aquí solo cambiamos el índice.

        // NOTA: Como la QuestionCard tiene un botón de "Siguiente", esta función se llamará
        // cuando el usuario presione ese botón.

        // Mover lógica de avance al botón "Siguiente" fuera del submitAnswer o separar responsabilidades?
        // Según prompt: "Actualiza el puntaje y avanza al siguiente".
        // Lo haremos directo aquí:

        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            setIsFinished(true);
        }
    };

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
