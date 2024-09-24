import { act, render } from '@testing-library/react';
import { useEffect, useState } from 'react';
import useGames from '../hooks/Home/useGames.js';
import { HOME_URL } from '../../utils/Constants.js';

global.fetch = jest.fn();

const TestComponent = ({ onRender }) => {
    const games = useGames();
    
    useEffect(() => {
        onRender(games);
    }, [games]);

    return null;
};

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

        let result = null;

        await act(async () => {
            render(<TestComponent onRender={games => (result = games)} />);
        });

        expect(result.games).toEqual(mockGames);
        expect(fetch).toHaveBeenCalledWith(`${HOME_URL}`);
    });

    it('debe manejar errores correctamente', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        let result = null;

        await act(async () => {
            render(<TestComponent onRender={games => (result = games)} />);
        });

        expect(result.games).toEqual([]); 
        expect(fetch).toHaveBeenCalledWith(`${HOME_URL}`);
    });

    it('debe mostrar error una vez en consola', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        fetch.mockRejectedValueOnce(new Error('Network error'));

        let result = null;

        await act(async () => {
            render(<TestComponent onRender={games => (result = games)} />);
        });

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1); 
        consoleErrorSpy.mockRestore();
    });
});
