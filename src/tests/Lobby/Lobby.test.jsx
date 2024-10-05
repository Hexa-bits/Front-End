import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Lobby from '../../containers/App/components/Lobby/Lobby'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { useLobby } from '../../hooks/Lobby/useLobby'; 


// Mock de dependencias
vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
  useNavigate: vi.fn(),
}));

vi.mock('../../hooks/Lobby/useLobby', () => ({
  useLobby: vi.fn(),
}));

vi.mock('../../components/Lobby/Card/LobbyCard', () => ({
  __esModule: true,
  default: () => <div data-testid="lobby-card" />,
}));

vi.mock('../../components/Lobby/List/LobbyList', () => ({
  __esModule: true,
  default: () => <div data-testid="lobby-list" />,
}));

vi.mock('../../components/Lobby//Buttons/LobbyButtons', () => ({
  __esModule: true,
  default: () => <div data-testid="lobby-buttons" />,
}));

describe('Lobby component', () => {
  it('renders correctly', () => {
    // Mocks
    const mockNavigate = vi.fn();
    const mockLocationState = { isOwner: true, gameId: '123' };
    const mockPlayers = ['Player1', 'Player2'];
    const mockGameName = 'Test Game';
    const mockMaxPlayers = 4;

    useNavigate.mockReturnValue(mockNavigate);
    useLocation.mockReturnValue({ state: mockLocationState });
    useLobby.mockReturnValue({
      players: mockPlayers,
      gameName: mockGameName,
      maxPlayers: mockMaxPlayers,
    });

    render(<Lobby />);
    // Verificaciones
    expect(screen.getByTestId('lobby-card')).toBeInTheDocument();
    expect(screen.getByTestId('lobby-list')).toBeInTheDocument();
    expect(screen.getByTestId('lobby-buttons')).toBeInTheDocument();
  });
});
