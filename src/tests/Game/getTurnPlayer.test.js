import getTurnPlayer from '../../hooks/Game/getTurnPlayer';
import { useNameTurnPlayerUrl } from '../../hooks/Game/useTurnPlayerUrl';

// Mockear fetch y useNameTurnPlayerUrl
global.fetch = jest.fn();
jest.mock('../../hooks/Game/useTurnPlayerUrl');

describe('getTurnPlayer', () => {
  beforeEach(() => {
    jest.clearAllMocks();  // Limpiar mocks entre tests
  });

  test('debe retornar playerId y namePlayer cuando el fetch es exitoso', async () => {
    // Mock de la URL
    const mockUrl = 'http://fake-url.com/player-turn';
    useNameTurnPlayerUrl.mockReturnValue(mockUrl);

    // Mock de la respuesta del fetch
    const mockData = {
      id_player: 1,
      name_player: 'Player 1',
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const gameId = 123;
    const result = await getTurnPlayer(gameId);

    // Aserciones
    expect(fetch).toHaveBeenCalledWith(mockUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(result).toEqual({ playerId: mockData.id_player, namePlayer: mockData.name_player });
  });

  test('debe manejar errores si la respuesta de fetch no es exitosa', async () => {
    const mockUrl = 'http://fake-url.com/player-turn';
    useNameTurnPlayerUrl.mockReturnValue(mockUrl);

    // Simular un error en el fetch
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});  // Espiar el error

    const gameId = 123;
    const result = await getTurnPlayer(gameId);

    // Aserciones
    expect(fetch).toHaveBeenCalledWith(mockUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(result).toBeNull();  // Debe retornar null si hay error
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching player turn:', expect.any(Error));

    consoleSpy.mockRestore();  // Restaurar el comportamiento original de console.error
  });

  test('debe manejar excepciones durante el fetch', async () => {
    const mockUrl = 'http://fake-url.com/player-turn';
    useNameTurnPlayerUrl.mockReturnValue(mockUrl);

    // Simular un fetch que lanza una excepción
    fetch.mockRejectedValueOnce(new Error('Fetch failed'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});  // Espiar el error

    const gameId = 123;
    const result = await getTurnPlayer(gameId);

    // Aserciones
    expect(fetch).toHaveBeenCalledWith(mockUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(result).toBeNull();  // Debe retornar null si hay excepción
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching player turn:', expect.any(Error));

    consoleSpy.mockRestore();
  });
});
