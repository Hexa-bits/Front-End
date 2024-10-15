import { CANCEL_TURN_URL } from "../../../utils/Constants.js";

//enviar id y nombre del jugador en turno
const postPlayer = async () => {
  const playerId = localStorage.getItem("player_id");

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

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export default postPlayer;
