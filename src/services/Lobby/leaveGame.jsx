import { closeWsGameInstance } from "../../services/WS/WsGameService.js";
import { HOME, GAME_LEAVE_URL } from "../../utils/Constants.js";

export const LeaveGame = async (navigate) => {
  const playerId = parseInt(localStorage.getItem("id_user"), 10);
  const gameId = parseInt(localStorage.getItem("game_id"), 10);

  try {
    const response = await fetch(GAME_LEAVE_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ game_id: gameId, id_user: playerId }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || response.statusText);
    }

    // (`Jugador ${playerId} abandonaste el juego ${gameId} exitosamente`);
    localStorage.removeItem("game_id");
    closeWsGameInstance();
    navigate(HOME);
  } catch (error) {
    alert("No se pudo abandonar el juego. " + error.message);
  }
};
