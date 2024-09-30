import getTurnPlayer from '../../hooks/Game/getTurnPlayer';
import '@testing-library/jest-dom';

jest.mock("../../hooks/Game/useTurnPlayerUrl.js");

describe('getTurnPlayer', () => {
    it('Debería retornar los datos del jugador cuando la llamada a la API sea exitosa', async () => {
        const mockData = { id_player: 1, name_player: 'Player 1' };
        
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData)
            })
        );

        const result = await getTurnPlayer(1);
        expect(result).toEqual(mockData);
    });

    it('Debería retornar null cuando la llamada a la API falle', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false
            })
        );

        const result = await getTurnPlayer(1);
        expect(result).toBeNull();

        consoleErrorSpy.mockRestore();
    });

    it('Debería registrar un error cuando falle el fetch', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        global.fetch = jest.fn(() => Promise.reject(new Error('Fetch failed')));

        const result = await getTurnPlayer(1);
        expect(result).toBeNull();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching player turn:', expect.any(Error));

        consoleErrorSpy.mockRestore();
    });
});
