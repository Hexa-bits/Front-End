import { renderHook, act } from '@testing-library/react';
import getCurrentTurnPlayer from '../../../hooks/Game/TurnPlayer/getCurrentTurnPlayer.js';
import getTurnPlayer from '../../../hooks/Game/TurnPlayer/getTurnPlayer.js';

vi.mock('../../../hooks/Game/TurnPlayer/getTurnPlayer.js');

describe('Test para getCurrentTurnPlayer', () => {
    const mockWebSocket = {
        send: vi.fn(),
        close: vi.fn(),
        onmessage: null,
    };

    beforeEach(() => {
        getTurnPlayer.mockResolvedValue({
            playerId: 'mockPlayerId',
            namePlayer: 'MockPlayer',
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test('Debería actualizarse con mensajes de WebSocket sin fetch de getTurnPlayer', async () => {
        const { result } = renderHook(() => getCurrentTurnPlayer(mockWebSocket));

        const mockMessage = 'Terminó turno';
        
        await act(async () => {
            if (mockWebSocket.onmessage) {
                mockWebSocket.onmessage({ data: mockMessage });
            }
        });

        expect(result.current.currentPlayer).toBe('MockPlayer');
        expect(result.current.playerId).toBe('mockPlayerId');
    });
});
