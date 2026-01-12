import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestion, updateQuestion } from '../../services/api';
import { toast } from 'react-hot-toast';
import QuestionForm from './QuestionForm';

export default function EditQuestionView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const data = await getQuestion(id);
                setQuestion(data);
            } catch {
                toast.error('Error al cargar la pregunta');
                navigate('/admin/questions');
            } finally {
                setLoading(false);
            }
        };
        fetchQuestion();
    }, [id, navigate]);

    const handleSubmit = async (formData) => {
        try {
            await updateQuestion(id, {
                topic: formData.topic,
                statement: formData.text,
                explanation: formData.explanation,
                options: formData.options,
            });
            toast.success('Pregunta actualizada exitosamente');
            navigate('/admin/questions');
        } catch (error) {
            toast.error('Error al actualizar la pregunta');
            throw error;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 text-slate-500">
                Cargando datos de la pregunta...
            </div>
        );
    }

    return <QuestionForm initialData={question} onSubmit={handleSubmit} isEditing={true} />;
}
