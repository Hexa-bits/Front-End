import { fetchGameInfo } from '../../hooks/Lobby/useFetch.js';
import '@testing-library/jest-dom'; 
import { describe, expect, jest } from '@jest/globals';

global.fetch = jest.fn();

describe('fetchGameInfo', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('fetches game info successfully', async () => {
        const mockData = { game_name: 'Test Game', name_players: [], max_players: 4 };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        const result = await fetchGameInfo('mocked-url');
        expect(result).toEqual(mockData);
        expect(fetch).toHaveBeenCalledWith('mocked-url', { method: 'GET' });
    });

    test('throws an error when response is not ok', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({}),
        });

        await expect(fetchGameInfo('mocked-url')).rejects.toThrow('Error al obtener información del juego.');
    });

    test('throws an error when fetch fails', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        await expect(fetchGameInfo('mocked-url')).rejects.toThrow('Network error');
    });
});
