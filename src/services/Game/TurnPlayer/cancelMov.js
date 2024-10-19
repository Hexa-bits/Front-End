import { CANCEL_TURN_URL } from "../../../utils/Constants.js";

//enviar id y nombre del jugador en turno
const postPlayer = async (playerId, gameId) => {
  //const playerId = localStorage.getItem("player_id");

  try {
    const response = await fetch(CANCEL_TURN_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playerId,
      }),
    });

    if (response.status === 404) {
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
