import { renderHook } from '@testing-library/react-hooks';
import { LeaveGame } from './leaveGame.jsx'; 
import { HOME, GAME_LEAVE_URL } from '../../utils/Constants.js';
import { vi } from 'vitest';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('LeaveGame Hook', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    // Limpiar mocks antes de cada prueba
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    // Mock de localStorage
    global.localStorage.setItem('id_user', '123');
    global.localStorage.setItem('game_id', '456');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    global.localStorage.clear();
  });

  it('should leave the game successfully and navigate to HOME', async () => {
    // Simular la respuesta del fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(''),
      })
    );

    const { result } = renderHook(() => LeaveGame());
    await result.current();

    // Verifica que se haya llamado a la API con los datos correctos
    expect(fetch).toHaveBeenCalledWith(GAME_LEAVE_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game_id: 456, id_user: 123 }),
    });

    expect(global.localStorage.getItem('game_id')).toBe(null);
    expect(mockNavigate).toHaveBeenCalledWith(HOME);
    expect(window.alert).toHaveBeenCalledWith(
      'Jugador 123 abandonaste el juego 456 exitosamente'
    );
  });

  it('should handle error when the API call fails', async () => {
    // Simular un error en la respuesta del fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve('Error al abandonar el juego'),
      })
    );

    const { result } = renderHook(() => LeaveGame());
    await result.current();

    // Verifica que se haya llamado al fetch con los datos correctos
    expect(fetch).toHaveBeenCalledWith(GAME_LEAVE_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game_id: 456, id_user: 123 }),
    });

    expect(window.alert).toHaveBeenCalledWith(
      'No se pudo abandonar el juego. Error al abandonar el juego'
    );
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should set active to false if it was true', async () => {
    // Simular la respuesta del fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(''),
      })
    );

    global.localStorage.setItem('active', 'true');
    const { result } = renderHook(() => LeaveGame());
    await result.current();
    expect(global.localStorage.getItem('active')).toBe('false');
  });
});
