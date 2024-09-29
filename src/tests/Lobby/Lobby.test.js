// Lobby.test.js
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Lobby from '../../containers/App/components/Lobby/Lobby.jsx';
import { useLobby } from "../../hooks/Lobby/useLobby.js";
import { useGameIdUrl } from '../../hooks/Lobby/useGameId';
import { BrowserRouter } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

jest.mock('../../hooks/Lobby/useLobby.js');
jest.mock('../../hooks/Lobby/useGameId.js');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
}));

describe('Lobby Component', () => {
    beforeEach(() => {
        useGameIdUrl.mockReturnValue('mockFullUrl');
        useLocation.mockReturnValue({
            state: {
                isOwner: true,
                gameId: 7,
            },
        });
    });

    it('should render the lobby correctly with players', () => {
        useLobby.mockReturnValue({
            players: ['Player1', 'Player2'],
            gameName: 'Test Game',
            maxPlayers: 4,
        });

        render(<Lobby />, { wrapper: BrowserRouter });

        expect(screen.getByText('Test Game')).toBeInTheDocument();
        expect(screen.getByText('Player1')).toBeInTheDocument();
        expect(screen.getByText('Player2')).toBeInTheDocument();
    });

    it('should display the correct buttons for owner and non-owner', () => {
        useLobby.mockReturnValue({
            players: ['Player1'],
            gameName: 'Test Game',
            maxPlayers: 4,
        });

        const { rerender } = render(<Lobby />, { wrapper: BrowserRouter });

        // Checking for owner
        expect(screen.getByText('Iniciar')).toBeInTheDocument();

        // Checking for non-owner
        useLocation.mockReturnValue({
            state: {
                isOwner: false,
                gameId: 7,
            },
        });
        rerender(<Lobby />);
        expect(screen.getByText('Abandonar')).toBeInTheDocument();
    });
});
