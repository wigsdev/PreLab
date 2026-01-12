import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import ResultsCard from '../ResultsCard';
import { AuthContext } from '../../context/AuthContext';
import * as api from '../../services/api';
import { MemoryRouter } from 'react-router-dom';

// Mock dependencies
vi.mock('../../services/api', () => ({
    saveExamResult: vi.fn().mockResolvedValue({}),
}));

vi.mock('canvas-confetti', () => ({
    default: vi.fn(),
}));

const renderWithAuth = (ui, { user = null } = {}) => {
    return render(
        <AuthContext.Provider value={{ user }}>
            <MemoryRouter>{ui}</MemoryRouter>
        </AuthContext.Provider>
    );
};

describe('ResultsCard', () => {
    const defaultProps = {
        score: 15,
        totalQuestions: 20,
        topicId: 1,
        courseId: 1,
        mode: 'course',
        questions: [{ id: 101 }],
        userAnswers: [{ selectedOptionId: 1, isCorrect: true }],
        onRetry: vi.fn(),
        onHome: vi.fn(),
        onReview: vi.fn(),
    };

    it('renders the score correctly', () => {
        renderWithAuth(<ResultsCard {...defaultProps} />);
        expect(screen.getByText('15')).toBeInTheDocument();
        expect(screen.getByText('de 20')).toBeInTheDocument();
        expect(screen.getByText('Resultados')).toBeInTheDocument();
    });

    it('shows guest message when not logged in', () => {
        renderWithAuth(<ResultsCard {...defaultProps} />, { user: null });
        expect(screen.getByText(/Modo Invitado/i)).toBeInTheDocument();
        expect(screen.getByText(/Crear Cuenta/i)).toBeInTheDocument();
    });

    it('triggers API save when logged in', async () => {
        const user = { id: 1, email: 'test@test.com' };
        renderWithAuth(<ResultsCard {...defaultProps} />, { user });

        // Check for loading or success state
        expect(screen.getByText(/Guardando resultado/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(api.saveExamResult).toHaveBeenCalledTimes(1);
            expect(api.saveExamResult).toHaveBeenCalledWith(
                expect.objectContaining({
                    score: 15,
                    total: 20,
                    answers: expect.any(Array),
                })
            );
        });

        expect(screen.getByText(/Resultado guardado/i)).toBeInTheDocument();
    });

    it('calls onRetry when button is clicked', () => {
        renderWithAuth(<ResultsCard {...defaultProps} />);
        fireEvent.click(screen.getByText(/Intentar de nuevo/i));
        expect(defaultProps.onRetry).toHaveBeenCalledTimes(1);
    });
});
