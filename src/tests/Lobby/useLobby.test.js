import { renderHook, act } from '@testing-library/react-hooks';
import { useLobby } from '../../hooks/Lobby/useLobby';  // El hook que estás probando
import { vi } from 'vitest';
import { useNavigate } from 'react-router-dom';

// Mocks de constantes
const LOBBY_URL = 'http://mocked-lobby-url/';
const WS_LOBBY_URL = 'ws://mocked-lobby-ws/';
const HOME = '/home';
const GAME = '/game';

// Mock de useNavigate
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('useLobby Hook', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    // Limpiar y reiniciar mocks antes de cada prueba
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it('should fetch game info on mount and update state', async () => {
    // Simular respuesta de fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            name_players: ['Player 1', 'Player 2'],
            game_name: 'Test Game',
            max_players: 4,
            start_owner: false,
            cancel_owner: false,
          }),
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useLobby('1234'));

    // Esperar que el efecto useEffect se complete
    await waitForNextUpdate();
    expect(result.current.players).toEqual(['Player 1', 'Player 2']);
    expect(result.current.gameName).toBe('Test Game');
    expect(result.current.maxPlayers).toBe(4);
    expect(result.current.activeGame).toBe(false);

    // Verifica que se haya llamado al fetch con la URL correcta
    expect(fetch).toHaveBeenCalledWith(LOBBY_URL + '1234', {
      method: 'GET',
    });
  });

  it('should navigate to HOME if game is canceled via WebSocket', async () => {
    // Mock de WebSocket
    global.WebSocket = vi.fn(() => ({
      onopen: null,
      onmessage: null,
      onclose: null,
      onerror: null,
      close: vi.fn(),
    }));

    const mockWebSocket = new WebSocket(WS_LOBBY_URL + '1234');
    global.WebSocket.mockReturnValue(mockWebSocket);

    const { result, waitFor } = renderHook(() => useLobby('1234'));
    await result.current();
    // Simula mensaje de WebSocket indicando que el juego fue cancelado
    act(() => {
      mockWebSocket.onmessage({
        data: JSON.stringify({
          name_players: [],
          start_owner: false,
          cancel_owner: true,
        }),
      });
    });

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(HOME));
  });

  it('should navigate to GAME if game becomes active via WebSocket', async () => {
    // Mock de WebSocket
    global.WebSocket = vi.fn(() => ({
      onopen: null,
      onmessage: null,
      onclose: null,
      onerror: null,
      close: vi.fn(),
    }));

    const mockWebSocket = new WebSocket(WS_LOBBY_URL + '1234');
    global.WebSocket.mockReturnValue(mockWebSocket);

    const { result, waitFor } = renderHook(() => useLobby('1234'));
    await result.current();
    // Simula mensaje de WebSocket indicando que el juego ha iniciado
    act(() => {
      mockWebSocket.onmessage({
        data: JSON.stringify({
          name_players: [],
          start_owner: true,
          cancel_owner: false,
        }),
      });
    });

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(GAME));
  });

  afterEach(() => {
    // Restaurar mocks después de cada prueba
    vi.restoreAllMocks();
  });
});
