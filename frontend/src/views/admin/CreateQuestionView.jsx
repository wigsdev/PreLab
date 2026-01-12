import { useNavigate } from 'react-router-dom';
import { createQuestion } from '../../services/api';
import { toast } from 'react-hot-toast';
import QuestionForm from './QuestionForm';

export default function CreateQuestionView() {
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {
            await createQuestion({
                topic: formData.topic,
                statement: formData.text,
                image: null,
                explanation: formData.explanation,
                options: formData.options,
            });
            toast.success('Pregunta creada con éxito');
            navigate('/admin/questions');
        } catch (error) {
            toast.error('Error al crear la pregunta');
            throw error;
        }
    };

    return <QuestionForm onSubmit={handleSubmit} />;
}
