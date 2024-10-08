import { LeaveGame } from '../../hooks/Lobby/leaveGame'; 
import { describe, it, vi, expect } from 'vitest';
import { GAME_LEAVE_URL, HOME } from '../../utils/Constants';
import { closeWSInstance } from '../../services/WsGameInstance';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('../../services/WsGameInstance', () => ({
  closeWSInstance: vi.fn(),
}));

describe('LeaveGame function', () => {
  it('debería hacer la llamada para abandonar el juego y navegar', async () => {
    // Mock para localStorage y fetch
    const mockNavigate = vi.fn();
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
    const mockLocalStorage = {
      getItem: vi.fn((key) => {
        if (key === 'id_user') return '456'; 
        if (key === 'game_id') return '789';
        return null;
      }),
      removeItem: vi.fn(),
    };

    Object.defineProperty(global, 'localStorage', { value: mockLocalStorage });
    global.fetch = mockFetch;
    global.alert = vi.fn();

    const leaveGame = LeaveGame(mockNavigate);
    await leaveGame();

    // Verificaciones
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('id_user');
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('game_id');
    expect(mockFetch).toHaveBeenCalledWith(`${GAME_LEAVE_URL}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ game_id: 789, id_user: 456 }),
    });
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('game_id');
    expect(closeWSInstance).toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalledWith(
      'Jugador 456 abandonaste el juego 789 exitosamente'
    );
    expect(mockNavigate).toHaveBeenCalledWith(HOME);
  });

  it('debería manejar errores al intentar abandonar el juego', async () => {
    // Mock para localStorage y fetch que lanza error
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve('Error al abandonar el juego'),
      })
    );
    global.fetch = mockFetch;
    global.alert = vi.fn(); 
  
    const leaveGame = LeaveGame();
    await leaveGame();

    // Verificaciones
    expect(global.alert).toHaveBeenCalledWith(
      'No se pudo abandonar el juego. Error al abandonar el juego'
    );
  });
});
