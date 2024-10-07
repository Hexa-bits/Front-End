import getTurnPlayer from '../../../hooks/Game/TurnPlayer/getTurnPlayer.js';
import { useNameTurnPlayerUrl } from '../../../utils/logics/Game/useTurnPlayerUrls.js';

// Mockear la función useNameTurnPlayerUrl y fetch
vi.mock('../../../utils/logics/Game/useTurnPlayerUrls.js', () => ({
    useNameTurnPlayerUrl: vi.fn(),
}));

describe('getTurnPlayer', () => {
    const mockGameId = 'mockGameId';
    const mockUrl = 'http://mockapi.com/turnPlayer';
    const mockResponseData = {
        id_player: 'mockPlayerId',
        name_player: 'Player1',
    };

    let consoleErrorSpy;

    beforeEach(() => {
        useNameTurnPlayerUrl.mockReturnValue(mockUrl);
        consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test('Debe hacer fetch para pedir por GET el playerId y namePlayer', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockResponseData,
        });

        const result = await getTurnPlayer(mockGameId);
        expect(result).toEqual({
            playerId: 'mockPlayerId',
            namePlayer: 'Player1',
        });
        expect(fetch).toHaveBeenCalledWith(mockUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });

    test('Gestionar errores de conexión de red.', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
        });

        const result = await getTurnPlayer(mockGameId);
        expect(result).toBe(null);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Error fetching player turn:'), expect.any(Error));
    });

    test('Gestionar errores de fetch.', async () => {
        global.fetch = vi.fn().mockRejectedValue(new Error('Fetch failed'));

        const result = await getTurnPlayer(mockGameId);

        expect(result).toBe(null);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Error fetching player turn:'), expect.any(Error));
    });
});
