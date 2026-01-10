import { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionCard from './components/QuestionCard';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cargar preguntas al iniciar
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        // NOTA: Ajusta la URL si es necesario. Traemos todas las preguntas por ahora.
        const response = await axios.get('http://127.0.0.1:8000/api/questions/');
        setQuestions(response.data);
        setError(null);
      } catch (err) {
        console.error("Error cargando preguntas:", err);
        setError("No se pudo conectar con el servidor. ¿Está prendido el Backend?");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      alert("¡Simulacro Terminado! 🎉");
      // Aquí podríamos reiniciar o redirigir
      setCurrentIndex(0);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Cargando simulacro...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 max-w-sm text-center">
          <p className="font-bold">Error de Conexión</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">¡Ups! 🕸️</h2>
        <p className="text-slate-600">No hay preguntas cargadas en la base de datos todavía.</p>
        <p className="text-sm text-slate-400 mt-4">Ve al Admin Panel y agrega algunas.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 flex flex-col items-center justify-start">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          PreLab <span className="text-blue-600">v0.3</span>
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Pregunta {currentIndex + 1} de {questions.length}
        </p>
      </header>

      <main className="w-full max-w-md">
        <QuestionCard
          question={questions[currentIndex]}
          onNext={handleNext}
        />
      </main>
    </div>
  );
}

export default App;
