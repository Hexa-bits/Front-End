import { renderHook, act } from '@testing-library/react';
import { useNameTurnPlayerUrl_WS } from '../../../utils/logics/Game/useTurnPlayerUrls.js';
import getCurrentTurnPlayer from '../../../hooks/Game/TurnPlayer/getCurrentTurnPlayer.js';
import getTurnPlayer from '../../../hooks/Game/TurnPlayer/getTurnPlayer.js';

// Mockear las funciones necesarias
vi.mock('../../../hooks/Game/TurnPlayer/getTurnPlayer.js');
vi.mock('../../../utils/logics/Game/useTurnPlayerUrls.js', () => ({
    useNameTurnPlayerUrl_WS: vi.fn(),
}));

describe('Test para getCurrentTurnPlayer con WebSocket ', () => {
    const mockGameId = 'mockGameId';
    const mockUrl = 'ws://mockWebSocketUrl';
    const mockPlayerData = {
        playerId: 'mockPlayerId',
        namePlayer: 'Player1',
    };

    beforeEach(() => {
        // Configurar mocks antes de cada prueba
        localStorage.setItem('game_id', mockGameId);
        useNameTurnPlayerUrl_WS.mockReturnValue(mockUrl);
        getTurnPlayer.mockResolvedValue(mockPlayerData);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test('Se conecta al WebSocket y actualiza los datos del jugador.', async () => {
        const originalWebSocket = global.WebSocket;
        const mockWebSocket = {
            send: vi.fn(),
            close: vi.fn(),
            onmessage: null,
        };

        global.WebSocket = vi.fn(() => mockWebSocket);

        const { result } = renderHook(() => getCurrentTurnPlayer());

        // Esperar a que se complete el primer useEffect (fetch inicial)
        await act(async () => {
            await getTurnPlayer(mockGameId);
        });

        // Comprobar que los datos iniciales se establecieron correctamente
        expect(result.current.currentPlayer).toBe('Player1');
        expect(result.current.playerId).toBe('mockPlayerId');

        // Simular la llegada de un mensaje WebSocket
        const mockMessage = JSON.stringify({
            name_player: 'UpdatedPlayer',
            id_player: 'updatedPlayerId',
        });

        act(() => {
            if (mockWebSocket.onmessage) {
                mockWebSocket.onmessage({ data: mockMessage });
            }
        });

        // Verificar si los datos se actualizaron después del mensaje WebSocket
        expect(result.current.currentPlayer).toBe('UpdatedPlayer');
        expect(result.current.playerId).toBe('updatedPlayerId');

        // Restaurar el WebSocket original
        global.WebSocket = originalWebSocket;
    });
});
