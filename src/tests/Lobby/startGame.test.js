import { renderHook } from '@testing-library/react-hooks';
import { StartGame } from '../../hooks/Lobby/startGame.jsx';
import { GAME_START_URL, GAME } from '../../utils/Constants.js';
import { vi } from 'vitest';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('StartGame Hook', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    // Limpiar mocks antes de cada prueba
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    // Mock de localStorage
    global.localStorage.setItem('game_id', '456');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    global.localStorage.clear();
  });

  it('should start the game successfully and navigate to GAME', async () => {
    // Simular la respuesta del fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(''),
      })
    );

    const { result } = renderHook(() => StartGame());
    await result.current();

    // Verifica que se haya llamado a la API con los datos correctos
    expect(fetch).toHaveBeenCalledWith(GAME_START_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game_id: 456 }),
    });

    expect(global.localStorage.getItem('active')).toBe('true');
    expect(mockNavigate).toHaveBeenCalledWith(GAME);
    expect(console.log).toHaveBeenCalledWith('Juego 456 iniciado exitosamente');
  });

  it('should handle error when the API call fails', async () => {
    // Simular un error en la respuesta del fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve('Error al iniciar el juego'),
      })
    );

    const { result } = renderHook(() => StartGame());
    await result.current();

    // Verifica que se haya llamado al fetch con los datos correctos
    expect(fetch).toHaveBeenCalledWith(GAME_START_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game_id: 456 }),
    });

    expect(console.log).toHaveBeenCalledWith('No se pudo iniciar el juego. Error al iniciar el juego');
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should not call navigate if there is no game_id', async () => {
    global.localStorage.removeItem('game_id');

    // Simular la respuesta del fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(''),
      })
    );

    const { result } = renderHook(() => StartGame());
    await result.current();

    expect(fetch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(global.localStorage.getItem('active')).toBe(null);
  });
});
