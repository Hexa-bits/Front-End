import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from '../../containers/App/components/Game/Game.jsx';
import { getMovements } from '../../hooks/Game/getMovements.js';
import '@testing-library/jest-dom';

jest.mock('../../hooks/Game/getMovements.js');

describe('Game component', () => {
    beforeEach(() => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        getMovements.mockResolvedValue({ cards_ids: [1, 2, 3] });

        consoleSpy.mockRestore(); // Restaurar después de mockear el comportamiento
    });

    it('should render the Game component', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        render(<Game />);
        
        expect(screen.getByText('End Turn')).toBeInTheDocument();

        consoleSpy.mockRestore(); // Restaurar console.log
    });

    it('should call getMovements and update cardsIds when "End Turn" is clicked', async () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        render(<Game />);

        const endTurnButton = screen.getByText('End Turn');
        fireEvent.click(endTurnButton);

        expect(await screen.findByAltText('mov1')).toBeInTheDocument();
        expect(await screen.findByAltText('mov2')).toBeInTheDocument();
        expect(await screen.findByAltText('mov3')).toBeInTheDocument();

        consoleSpy.mockRestore(); // Restaurar console.log
    });
});
