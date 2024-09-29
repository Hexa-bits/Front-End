import { CONFIG_URL , LOBBY } from "../../utils/Constants.js";

async function create(game_name, max_players, navigate) {
  const id_user = parseInt(localStorage.getItem("id_user"),10); // Obtenemos el id del usuario

  try {
    const response = await fetch(CONFIG_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_user, game_name, max_players }),
    });

    if (!response.ok) {
      throw new Error("Error al enviar solicitud 'crear partida'.");
    }

    const data = await response.json();
    const game_id  = data.id;

    // Guardamos la información de la partida en el localStorage
    localStorage.setItem("game_name", game_name);
    localStorage.setItem("game_id", game_id);
    localStorage.setItem("max_players", max_players);

    alert(`Partida ${game_name} creada exitosamente con Id: ${game_id}`);

    // Navegamos a la página para unirse al juego
    const gameId = parseInt(game_id, 10);
    navigate(LOBBY, {state: {isOwner: true, gameId: gameId}});
  } catch (error) {
    alert("Error al crear partida. " + error.message);
  }
}

export { create };
