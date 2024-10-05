// Test: useGameIdUrl Hook
import { useGameIdUrl } from '../../hooks/Lobby/useGameId';
import { LOBBY_URL } from '../../utils/Constants';

describe('useGameIdUrl Hook', () => {
    it('should construct the correct game URL', () => {
        const gameId = '12345';
        const url = useGameIdUrl(gameId);
        expect(url).toBe(`${LOBBY_URL}?game_id=12345`); 
    });
});
