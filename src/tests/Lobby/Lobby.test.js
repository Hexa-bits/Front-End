// Test: Lobby Component

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Lobby from '../../containers/App/components/Lobby/Lobby.jsx';
import { useLobby } from "../../hooks/Lobby/useLobby.js";
import { useGameIdUrl } from '../../hooks/Lobby/useGameId';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../hooks/Lobby/useLobby.js');
jest.mock('../../hooks/Lobby/useGameId.js');

describe('Lobby Component', () => {
    beforeEach(() => {
        useGameIdUrl.mockReturnValue('mockFullUrl');
    });

    it('should render the lobby correctly with players', () => {
        useLobby.mockReturnValue({
            players: ['Player1', 'Player2'],
            gameName: 'Test Game',
            maxPlayers: 4,
        });

        render(<Lobby isOwner={true} />, { wrapper: BrowserRouter });

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

        // checking for owner
        const { rerender } = render(<Lobby isOwner={true} />, { wrapper: BrowserRouter });
        expect(screen.getByText('Iniciar')).toBeInTheDocument();

        // Checking for non-owner
        rerender(<Lobby isOwner={false} />);
        expect(screen.getByText('Abandonar')).toBeInTheDocument();
    });
});
