import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Lobby from './Lobby';
import { useLobby } from '../hooks/useLobby';
import { LeaveGame } from '../../../../hooks/Lobby/leaveGame';
import { StartGame } from '../../../../hooks/Lobby/startGame';
import { useLocation } from 'react-router-dom';

// Mock de los hooks
vi.mock('../hooks/useLobby');
vi.mock('../hooks/LeaveGame');
vi.mock('../hooks/StartGame');
vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
}));

describe('Lobby Component', () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada prueba
    vi.clearAllMocks();
  });

  it('should render Lobby with game information and player list', () => {
    // Mock de useLocation para devolver gameId e isOwner
    vi.mocked(useLocation).mockReturnValue({
      state: { isOwner: true, gameId: 123 },
    });
    
    // Mock de useLobby para devolver datos  de juego
    vi.mocked(useLobby).mockReturnValue({
      players: ['Player 1', 'Player 2'],
      gameName: 'Test Game',
      maxPlayers: 4,
    });

    // Mock de LeaveGame y StartGame
    const mockLeaveGame = vi.fn();
    const mockStartGame = vi.fn();
    vi.mocked(LeaveGame).mockReturnValue(mockLeaveGame);
    vi.mocked(StartGame).mockReturnValue(mockStartGame);
    render(<Lobby />);
    expect(screen.getByText('Test Game')).toBeInTheDocument();
    expect(screen.getByText('Player 1')).toBeInTheDocument();
    expect(screen.getByText('Player 2')).toBeInTheDocument();
    expect(screen.getByText('Abandonar juego')).toBeInTheDocument();
    expect(screen.getByText('Iniciar juego')).toBeInTheDocument();
  });

  it('should not render LobbyButtons if not the owner', () => {
    // Mock de useLocation para devolver un usuario que no es el owner
    vi.mocked(useLocation).mockReturnValue({
      state: { isOwner: false, gameId: 123 },
    });

    vi.mocked(useLobby).mockReturnValue({
      players: ['Player 1', 'Player 2'],
      gameName: 'Test Game',
      maxPlayers: 4,
    });

    // Mock de LeaveGame
    const mockLeaveGame = vi.fn();
    vi.mocked(LeaveGame).mockReturnValue(mockLeaveGame);
    render(<Lobby />);
    expect(screen.queryByText('Iniciar juego')).not.toBeInTheDocument();
  });

  it('should call leaveGame when "Abandonar juego" is clicked', () => {
    // Mock de useLocation para devolver gameId e isOwner
    vi.mocked(useLocation).mockReturnValue({
      state: { isOwner: true, gameId: 123 },
    });

    vi.mocked(useLobby).mockReturnValue({
      players: ['Player 1', 'Player 2'],
      gameName: 'Test Game',
      maxPlayers: 4,
    });

    const mockLeaveGame = vi.fn();
    vi.mocked(LeaveGame).mockReturnValue(mockLeaveGame);
    render(<Lobby />);
    screen.getByText('Abandonar juego').click();
    expect(mockLeaveGame).toHaveBeenCalled();
  });

  it('should call startGame when "Iniciar juego" is clicked', () => {
    // Mock de useLocation para devolver gameId e isOwner
    vi.mocked(useLocation).mockReturnValue({
      state: { isOwner: true, gameId: 123 },
    });

    vi.mocked(useLobby).mockReturnValue({
      players: ['Player 1', 'Player 2'],
      gameName: 'Test Game',
      maxPlayers: 4,
    });

    const mockStartGame = vi.fn();
    vi.mocked(StartGame).mockReturnValue(mockStartGame);
    render(<Lobby />);
    screen.getByText('Iniciar juego').click();
    expect(mockStartGame).toHaveBeenCalled();
  });
});
