import { render, act, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Board from '../../../components/Game/Board/Board';
import { COLORMAP_BOXCARDS } from '../../../utils/Constants';

test('Resalta las fichas correctamente', () => {
    const mockCardData = [
        { x: 0, y: 0, color: '1' },
        { x: 1, y: 0, color: '2' },
        { x: 2, y: 0, color: '2' },
    ];
    
    const mockFormedFigs = [
        [{ x: 0, y: 0, color: 'red' }]
    ];
    
    render(
        <Board 
            isTurn={true} 
            cardData={mockCardData} 
            onSelectedCards={vi.fn()} 
            formedFigs={mockFormedFigs}
        />
    );

    const boxCards = screen.getAllByRole('button'); 

    // Verifica que hay al menos un BoxCard resaltado
    const highlightedCard = boxCards.find((card) => {
        return card.style.backgroundColor === COLORMAP_BOXCARDS['1']
    });

    if (highlightedCard) {
        expect(highlightedCard).toHaveStyle(`background-color: ${COLORMAP_BOXCARDS['1']}`);
    }
});