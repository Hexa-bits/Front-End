import { render, screen } from '@testing-library/react';
import Board from '../../../components/Game/Board/Board';
import useSelectedCards from '../../../hooks/Game/Board/useSelectedCards';

vi.mock('../../../hooks/Game/Board/useSelectedCards');

describe('Board Component', () => {
    it('Renderiza el tablero con datos de cartas simulados y verifica el color', () => {
        // Mockear los datos de las cartas
        const mockCardData = [
            { x: 0, y: 0, color: 'red' },
            { x: 0, y: 1, color: 'blue' },
        ];

        useSelectedCards.mockReturnValue({
            selectedCards: [],
            handlerSelectedCard: vi.fn(),
        });

        render(<Board isTurn={true} cardData={mockCardData} />);

        // Obtener todas las cartas usando el role "button"
        const boxCards = screen.getAllByRole('button');
        
        expect(boxCards).toHaveLength(mockCardData.length);

        expect(boxCards[0]).toHaveStyle('background-color: #DC143C'); // Rojo Carmesí
        expect(boxCards[1]).toHaveStyle('background-color: #4169E1'); // Azul Real
    });
});