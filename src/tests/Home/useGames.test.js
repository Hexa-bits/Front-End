import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import useGames from '../../hooks/Home/useGames';
import { HOME_URL } from '../../utils/Constants';

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

        const { result } = renderHook(() => useGames());

        await waitFor(() => {
            expect(result.current.games).toEqual(mockGames);
        });

        expect(result.current.error).toBeNull(); // Verifica que no hay error
        expect(fetch).toHaveBeenCalledWith(`${HOME_URL}`);
    });

    it('debe manejar errores correctamente', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        fetch.mockRejectedValueOnce(new Error('Network error'));

        const { result } = renderHook(() => useGames());

        await waitFor(() => {
            expect(result.current.error).toBe('Network error');
        });

        expect(result.current.games).toEqual([]); // Asegúrate de que no haya juegos
        expect(fetch).toHaveBeenCalledWith(`${HOME_URL}`);
        expect(consoleErrorSpy).toHaveBeenCalled(); // Verifica que fue llamado
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1); // Solo debe ser llamado una vez

        consoleErrorSpy.mockRestore();
    });

    it('debe mostrar error una vez en consola', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        fetch.mockRejectedValueOnce(new Error('Network error'));

        const { result } = renderHook(() => useGames());

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalled(); // Verifica que fue llamado
            expect(consoleErrorSpy).toHaveBeenCalledTimes(1); // Solo debe ser llamado una vez
        });

        consoleErrorSpy.mockRestore();
    });
});