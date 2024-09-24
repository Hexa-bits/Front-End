import { renderHook, act } from '@testing-library/react-hooks';
import useGames from '../hooks/Home/useGames';
import { HOME_URL } from '../../utils/Constants';
// Mock de fetch
global.fetch = jest.fn();

describe('useGames', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debe cargar los juegos correctamente', async () => {
        const mockGames = [
            { game_id: "1", game_name: "Juego 1", current_players: 1, max_players: 4 },
            { game_id: "2", game_name: "Juego 2", current_players: 2, max_players: 4 },
            { game_id: "3", game_name: "Juego 3", current_players: 3, max_players: 4 },
            { game_id: "4", game_name: "Juego 4", current_players: 4, max_players: 4 }
          ];

        fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockGames),
        });

        const { result, waitForNextUpdate } = renderHook(() => useGames());

        await waitForNextUpdate(); // Espera a que se actualice el estado después de la llamada

        expect(result.current.games).toEqual(mockGames);
        expect(fetch).toHaveBeenCalledWith(`${HOME_URL}`);
    });

    it('debe manejar errores correctamente', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        const { result, waitForNextUpdate } = renderHook(() => useGames());

        await waitForNextUpdate(); // Espera a que se actualice el estado después de la llamada

        expect(result.current.games).toEqual([]); // Asegúrate de que no haya juegos
        expect(fetch).toHaveBeenCalledWith(`${HOME_URL}`);
    });

    it('debe mostrar error una vez en consola', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        fetch.mockRejectedValueOnce(new Error('Network error'));

        const { result, waitForNextUpdate } = renderHook(() => useGames());

        await waitForNextUpdate(); // Espera a que se actualice el estado

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1); // Solo debe ser llamado una vez
        consoleErrorSpy.mockRestore();
    });
});
