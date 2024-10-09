import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Lobby from '../../containers/App/components/Lobby/Lobby'; 
import { useLocation, useNavigate } from 'react-router-dom';
import useLobby from '../../hooks/Lobby/useLobby'; 


// Mock de dependencias
vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
  useNavigate: vi.fn(),
}));

vi.mock('../../hooks/Lobby/useLobby', () => ({
  __esModule: true,
  default: vi.fn(),  // Mockea la función por defecto correctamente
}));

vi.mock('../../components/Lobby/Card/LobbyCard', () => ({
  __esModule: true,
  default: ({ gameName, maxPlayers }) => (
    <div data-testid="lobby-card">
      <span>{gameName}</span>
      <span>{maxPlayers}</span>
    </div>
  ),
}));

vi.mock('../../components/Lobby/List/LobbyList', () => ({
  __esModule: true,
  default: ({ players }) => (
    <div data-testid="lobby-list">
      {players.map((player, index) => (
        <div key={index}>{player}</div>
      ))}
    </div>
  ),
}));

vi.mock('../../components/Lobby//Buttons/LobbyButtons', () => ({
  __esModule: true,
  default: ({ isOwner }) => (
    <div data-testid="lobby-buttons">
      {isOwner ? 
      <>
        <button>Abandonar</button>
        <button>Iniciar</button> 
      </>
        : <button>Abandonar</button>}
    </div>
  ),
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
      activeGame: false,
      cancelGame: false,
    });

    render(<Lobby />);
    // Verificaciones
    expect(screen.getByTestId('lobby-card')).toBeInTheDocument();
    expect(screen.getByTestId('lobby-list')).toBeInTheDocument();
    expect(screen.getByTestId('lobby-buttons')).toBeInTheDocument();

    expect(screen.getByText('Test Game')).toBeInTheDocument(); 
    expect(screen.getByText('4')).toBeInTheDocument(); 
    expect(screen.getByText('Player1')).toBeInTheDocument(); 
    expect(screen.getByText('Player2')).toBeInTheDocument(); 
    expect(screen.getByText('Abandonar')).toBeInTheDocument(); 
    expect(screen.getByText('Iniciar')).toBeInTheDocument();
  });

  it('renders correctly', () => {
    // Mocks
    const mockNavigate = vi.fn();
    const mockLocationState = { isOwner: false, gameId: '123' };
    const mockPlayers = ['Player1', 'Player2'];
    const mockGameName = 'Test Game';
    const mockMaxPlayers = 4;

    useNavigate.mockReturnValue(mockNavigate);
    useLocation.mockReturnValue({ state: mockLocationState });
    useLobby.mockReturnValue({
      players: mockPlayers,
      gameName: mockGameName,
      maxPlayers: mockMaxPlayers,
      activeGame: false,
      cancelGame: false,
    });

    render(<Lobby />);
    // Verificaciones
    expect(screen.getByTestId('lobby-card')).toBeInTheDocument();
    expect(screen.getByTestId('lobby-list')).toBeInTheDocument();
    expect(screen.getByTestId('lobby-buttons')).toBeInTheDocument();

    expect(screen.getByText('Abandonar')).toBeInTheDocument(); 
  });
});


