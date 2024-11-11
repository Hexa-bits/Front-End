import { closeWsGameInstance } from "../../services/WS/WsGameService.js";
import { HOME, GAME_LEAVE_URL } from "../../utils/Constants.js";

export const LeaveGame = async (navigate) => {
  const playerId = parseInt(sessionStorage.getItem("player_id"), 10);
  const gameId = parseInt(sessionStorage.getItem("game_id"), 10);

  try {
    const response = await fetch(GAME_LEAVE_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ game_id: gameId, id_user: playerId }),
    });

    (`Jugador ${playerId} abandonaste el juego ${gameId} exitosamente`);
    sessionStorage.removeItem("game_id");
    sessionStorage.removeItem("game_name");
    closeWsGameInstance();
    navigate(HOME);

  } catch (error) {
    alert("Ocurrio un error. " + error.message + "Abandonando igualmente...");
  }
};
