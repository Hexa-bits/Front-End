import React from 'react';
import Lobby from '../../containers/App/components/Lobby/Lobby.jsx';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useGameIdUrl } from '../../hooks/Lobby/useGameId.js';
import { useLobby } from "../../hooks/Lobby/useLobby.js";

vi.mock('../../hooks/Lobby/useLobby.js', () => ({
  useLobby: vi.fn(),
}));
vi.mock('../../hooks/Lobby/useGameId.js', () => ({
  useGameIdUrl: vi.fn(),
}));
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn(),
    useNavigate: vi.fn(),
  };
});

// Importar después de realizar el mock
import { useLocation } from 'react-router-dom';

describe('Componente Lobby', () => {
  beforeEach(() => {
    useGameIdUrl.mockReturnValue('mockFullUrl');
    useLocation.mockReturnValue({
      state: {
        isOwner: true,
        gameId: 7,
      },
    });
  });

  it('Debería mostrar correctamente el lobby con los jugadores', () => {
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

  it('Debe mostrar los botones correctos para el owner y los jugadores', () => {
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
