import { useWinner } from '../../hooks/Game/useWinnerUrl.js';

// Simula la función useWinner para que devuelva una URL válida
vi.mock('../../hooks/Game/useWinnerUrl.js');

describe('Obtener Ganador', () => {
    let originalFetch;
    let consoleErrorSpy;

    beforeAll(() => {
        // Guarda la implementación original de fetch
        originalFetch = global.fetch;
    });

    beforeEach(() => {
        vi.clearAllMocks(); // Limpia los mocks antes de cada prueba
        consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore(); // Restaura console.error después de cada prueba
    });

    afterAll(() => {
        global.fetch = originalFetch; // Restaura la implementación original de fetch
    });

    const getWinner = async (gameId) => {
        const fullUrl = useWinner(gameId);

        try {
            const response = await fetch(fullUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Maneja el caso 204 No Content
            if (response.status === 204) {
                return false;
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (!data || Object.keys(data).length === 0) {
                return false;
            }

            return data;
        } catch (error) {
            console.error('Error fetching winner:', error);
            return false; 
        }
    };

    it('Debería retornar false cuando no hay ganador (204 No Content)', async () => {
        const gameId = '1';
        useWinner.mockReturnValue(`http://fake-url.com/game/winner?game_id=${gameId}`);
        
        // Simula la respuesta de fetch
        global.fetch = vi.fn(() =>
            Promise.resolve({
                status: 204,
            })
        );

        const result = await getWinner(gameId);

        expect(result).toBe(false); // Debe ser false porque no hay ganador
    });

    it('Debería retornar false cuando hay un error en la respuesta', async () => {
        const gameId = '1';
        useWinner.mockReturnValue(`http://fake-url.com/game/winner?game_id=${gameId}`);

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
                status: 500,
            })
        );

        const result = await getWinner(gameId);

        expect(result).toBe(false); // Debe ser false por el error
    });

    it('Debería retornar el ganador cuando la respuesta es válida', async () => {
        const mockWinner = { id_player: 1, name_player: 'Player 1' };
        const gameId = '1';
        useWinner.mockReturnValue(`http://fake-url.com/game/winner?game_id=${gameId}`);

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockWinner),
            })
        );

        const result = await getWinner(gameId);

        expect(result).toEqual(mockWinner); // Debe devolver el ganador
    });

    it('Debería retornar false cuando la respuesta es vacía', async () => {
        const gameId = '1';
        useWinner.mockReturnValue(`http://fake-url.com/game/winner?game_id=${gameId}`);

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}), // Respuesta vacía
            })
        );

        const result = await getWinner(gameId);

        expect(result).toBe(false); // Debe devolver false por respuesta vacía
    });

    it('Debería registrar un error cuando falle el fetch', async () => {
        const gameId = '1';
        useWinner.mockReturnValue(`http://fake-url.com/game/winner?game_id=${gameId}`);

        global.fetch = vi.fn(() => Promise.reject(new Error('Fetch failed')));

        const result = await getWinner(gameId);

        expect(result).toBe(false); // Debe devolver false por el error
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching winner:', expect.any(Error));
    });
});
