import { CANCEL_MOV_URL } from "../../../utils/Constants.js";

//enviar id y nombre del jugador en turno
const postPlayer = async (player_id, game_id) => {
  //const playerId = sessionStorage.getItem("player_id");

  try {
    const response = await fetch(CANCEL_MOV_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player_id,
        game_id,
      }),
    });

    if (response.status === 404 || response.status === 400) {
      alert("No quedan movimientos por deshacer");
    }
    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      console.log("mov descartado con éxito");
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export default postPlayer;
