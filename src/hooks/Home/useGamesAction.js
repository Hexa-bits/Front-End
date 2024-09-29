// hooks/useGameActions.js
import { GAME_JOIN_URL } from '../../utils/Constants';

export const useGameActions = () => {
  const joinGame = async (gameId, playerId) => {
    try {
      const response = await fetch(GAME_JOIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          game_id: gameId,
          player_id: playerId,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al unirse a la partida: ${errorData.message || 'No se pudo unirse'}`);
      }

      const data = await response.json();
      console.log("Unido a la partida con éxito:", data);
      return data;
    } catch (error) {
      console.error("Error al unirse a la partida:", error);
      throw error;
    }
  };

  return { joinGame };
};
