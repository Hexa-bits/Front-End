import { describe, it, vi, expect, beforeEach } from 'vitest';
import { renderHook, waitFor , act} from '@testing-library/react';
import { useLobby } from '../../hooks/Lobby/useLobby';

// Mock para useNavigate de React Router
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

describe('useLobby hook', () => {
  const gameId = '123';
  const mockFetch = vi.fn();
  let mockWs;

  beforeEach(() => {
    // Mock de fetch
    global.fetch = mockFetch;

    // Mock de WebSocket
    mockWs = {
      onmessage: null,
      onerror: null,
      close: vi.fn(),
    };

    global.WebSocket = vi.fn(() => mockWs);

    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  // const mockWebSocket = vi.fn();


  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debería obtener la información del lobby correctamente vía HTTP', async () => {
    const mockGameInfo = {
      name_players: ['Jugador 1', 'Jugador 2'],
      game_name: 'Partida Test',
      max_players: 4,
      start_owner: false,
      cancel_owner: false,
    };

    // Simula la respuesta de fetch
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockGameInfo,
    });

    const { result } = renderHook(() => useLobby(gameId));

    // Verificaciones
    await waitFor(() => {
      expect(result.current.players).toBe(mockGameInfo.name_players);
      expect(result.current.gameName).toBe(mockGameInfo.game_name);
      expect(result.current.maxPlayers).toBe(mockGameInfo.max_players);
      expect(result.current.activeGame).toBe(mockGameInfo.start_owner);
      expect(result.current.cancelGame).toBe(mockGameInfo.cancel_owner);
    });
  });

  it('debería manejar errores al obtener la información del lobby vía HTTP', async () => {
    // Simula un error en la respuesta de fetch
    mockFetch.mockResolvedValueOnce({
      ok: false,
      text: async () => 'Error al obtener información del juego.',
    });

    const consoleSpy = vi.spyOn(console, 'log');
    renderHook(() => useLobby(gameId));
    
    // Verificar que se haya registrado el error en la consola
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'http: Error al obtener información del juego. http: Error al obtener información del juego.'
      );
    });

    consoleSpy.mockRestore();
  });
});
