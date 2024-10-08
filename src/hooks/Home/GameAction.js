import { GAME_JOIN_URL } from '../../utils/Constants';

async function GameActions (gameId, playerId)  {
    try {
        const response = await fetch(GAME_JOIN_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({  game_id: gameId,
                                    player_id: playerId,})
            });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al unirse a la partida: ${errorData.message || 'No se pudo unirse'}`);
        }

        const data = await response.json();
        console.log("Unido a la partida con éxito:", data);
        localStorage.setItem('game_id', gameId);

        return data;
    } catch (error) {
        console.error("Error al unirse a la partida:", error);
        throw error;
    }
};

export default GameActions;