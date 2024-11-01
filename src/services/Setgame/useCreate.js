import { CONFIG_URL , LOBBY } from "../../utils/Constants.js";

async function create(game_name, game_password, max_players, navigate) {
  const player_id = parseInt(sessionStorage.getItem("player_id"),10); 

  try {
    const response = await fetch(CONFIG_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_user: player_id, game_name, game_password, max_players }),
    });

    if (!response.ok) {
      throw new Error("Error al enviar solicitud 'crear partida'.");
    }

    const data = await response.json();
    const game_id  = data.id;

    sessionStorage.setItem('game_id', game_id);

    // Navegamos a la página para unirse al juego
    const gameId = parseInt(game_id, 10);
    navigate(LOBBY, {state: {isOwner: true, gameId: gameId}});
  } catch (error) {
    alert("Error al crear partida. " + error.message);
  }
}

export { create };